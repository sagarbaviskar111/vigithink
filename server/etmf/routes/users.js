import express from 'express';
import { User } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';
import { ROLES_DEFINITION, ROTATION_SCHEDULE } from '../../../src/etmf/data/initialRolesData.js';
import { hashPassword, verifyPassword, signToken, publicUser, escapeRegex } from '../auth.js';

const router = express.Router();

const MIN_PASSWORD_LENGTH = 8;

const logUserAudit = async (adminUser, action, targetId, targetTitle, oldVal, newVal, reason) => {
  try {
    const log = new AuditLog({
      id: `aud_usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      user_id: adminUser?.id || 'unknown',
      user_name: adminUser?.name || 'Unknown',
      user_role: adminUser?.roleId || 'unknown',
      action,
      target_type: 'USER_RBAC',
      target_id: targetId,
      target_title: targetTitle,
      study_id: 'GLOBAL',
      old_value: oldVal || 'N/A',
      new_value: newVal || 'N/A',
      reason: reason || 'RBAC / User Credential Governance Action'
    });
    await log.save();
  } catch (e) {
    console.error('[AuditLog Error]', e);
  }
};

const serverError = (res, err) => {
  console.error('[eTMF users]', err);
  res.status(500).json({ success: false, error: 'Internal server error.' });
};

// GET /api/etmf/users - list users (password hashes are never returned)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: 1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    serverError(res, err);
  }
});

// GET /api/etmf/users/me - current session user
router.get('/me', (req, res) => res.json({ success: true, data: req.authUser }));

// POST /api/etmf/users/login - public endpoint
router.post('/login', async (req, res) => {
  try {
    const { loginInput, password } = req.body || {};
    if (typeof loginInput !== 'string' || !loginInput.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter Login ID or Email.' });
    }
    if (typeof password !== 'string' || !password) {
      return res.status(400).json({ success: false, error: 'Please enter your password.' });
    }

    const exact = new RegExp(`^${escapeRegex(loginInput.trim())}$`, 'i');
    const user = await User.findOne({ $or: [{ loginId: exact }, { email: exact }] });

    // Same message for unknown user and wrong password (no account enumeration)
    if (!user || !(await verifyPassword(password, user.password))) {
      await logUserAudit(
        user ? publicUser(user) : { id: 'anonymous', name: 'Unknown', roleId: 'none' },
        'USER_LOGIN_FAILED',
        loginInput.trim().slice(0, 100),
        user ? user.name : 'Unknown account',
        'Logged Out',
        'Login rejected',
        'Failed authentication attempt'
      );
      return res.status(401).json({ success: false, error: 'Invalid Login ID / Email or password.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, error: 'Your account has been deactivated. Please contact the System Administrator.' });
    }

    const me = publicUser(user);
    await logUserAudit(me, 'USER_LOGIN_SUCCESS', user.loginId, `${user.name} (${user.title})`, 'Logged Out', `Logged In as ${user.roleId}`, 'Authenticated into VigiThink eTMF');

    res.json({ success: true, data: me, token: signToken(user) });
  } catch (err) {
    serverError(res, err);
  }
});

// POST /api/etmf/users - create user (system_admin only, enforced in index.js)
router.post('/', async (req, res) => {
  try {
    const { name, loginId, email, password, mobile, course, position, roleId, trainingRole,
      studyScope, countryScope, siteScope, assignedSite, primaryResponsibility, adminUser } = req.body;

    if (!name || !loginId || !password) {
      return res.status(400).json({ success: false, error: 'Name, Login ID, and Password are required.' });
    }
    if (String(password).trim().length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({ success: false, error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
    }

    const exact = new RegExp(`^${escapeRegex(loginId.trim())}$`, 'i');
    if (await User.findOne({ $or: [{ loginId: exact }, { email: exact }] })) {
      return res.status(409).json({ success: false, error: 'A user with this Login ID already exists.' });
    }

    const roleObj = ROLES_DEFINITION.find(r => r.id === (roleId || 'cra')) || ROLES_DEFINITION[3];
    const newId = `usr_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now().toString().slice(-4)}`;

    const saved = await new User({
      id: newId,
      name,
      loginId: loginId.trim(),
      email: (email || loginId).trim(),
      password: await hashPassword(String(password).trim()),
      mobile: mobile || '',
      course: course || 'Clinical Research & Pharmacovigilance',
      position: position || 'Student',
      roleId: roleObj.id,
      trainingRole: trainingRole || `${roleObj.name} – Rotation 1`,
      organization: 'Clinidea Education',
      title: roleObj.name,
      studyScope: studyScope || roleObj.scopeDefaults.study || 'CLIN-001',
      countryScope: countryScope || roleObj.scopeDefaults.country || 'India',
      siteScope: siteScope || roleObj.scopeDefaults.site || 'ALL',
      assignedSite: assignedSite || siteScope || 'ALL',
      primaryResponsibility: primaryResponsibility || roleObj.description,
      accessPrinciple: roleObj.id === 'system_admin' ? 'Full administrative access' : 'Least privilege; role-based access',
      isActive: true
    }).save();

    await logUserAudit(adminUser, 'USER_CREDENTIAL_CREATED', saved.loginId, `${saved.name} (${saved.title})`, 'None',
      `Role: ${saved.roleId} | Scope: ${saved.studyScope} / ${saved.siteScope}`, 'Created new user credential in eTMF RBAC');

    res.status(201).json({ success: true, data: publicUser(saved) });
  } catch (err) {
    serverError(res, err);
  }
});

// PUT /api/etmf/users/:id - update user (system_admin only)
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });

    const oldRole = user.roleId;
    const { name, loginId, email, password, mobile, course, position, roleId, trainingRole, studyScope,
      countryScope, siteScope, assignedSite, primaryResponsibility, isActive, adminUser } = req.body;

    if (name !== undefined) user.name = name;
    if (loginId !== undefined) user.loginId = loginId;
    if (email !== undefined) user.email = email;
    if (typeof password === 'string' && password.trim() !== '') {
      if (password.trim().length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ success: false, error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
      }
      user.password = await hashPassword(password.trim());
    }
    if (mobile !== undefined) user.mobile = mobile;
    if (course !== undefined) user.course = course;
    if (position !== undefined) user.position = position;

    if (roleId !== undefined) {
      const roleObj = ROLES_DEFINITION.find(r => r.id === roleId);
      if (!roleObj) return res.status(400).json({ success: false, error: 'Invalid role.' });
      user.roleId = roleId;
      user.title = roleObj.name;
      if (!trainingRole) user.trainingRole = `${roleObj.name}`;
    }

    if (trainingRole !== undefined) user.trainingRole = trainingRole;
    if (studyScope !== undefined) user.studyScope = studyScope;
    if (countryScope !== undefined) user.countryScope = countryScope;
    if (siteScope !== undefined) user.siteScope = siteScope;
    if (assignedSite !== undefined) user.assignedSite = assignedSite;
    if (primaryResponsibility !== undefined) user.primaryResponsibility = primaryResponsibility;
    if (isActive !== undefined) {
      if (isActive === false && user.id === req.authUser.id) {
        return res.status(400).json({ success: false, error: 'You cannot deactivate your own account.' });
      }
      user.isActive = isActive;
    }

    const updated = await user.save();

    await logUserAudit(adminUser, oldRole !== updated.roleId ? 'USER_ROLE_CHANGED' : 'USER_CREDENTIAL_UPDATED', updated.loginId, `${updated.name}`,
      `Role: ${oldRole}`, `Role: ${updated.roleId} | Scope: ${updated.studyScope}/${updated.siteScope} | Active: ${updated.isActive}`,
      'Administrator updated user role/credentials');

    res.json({ success: true, data: publicUser(updated) });
  } catch (err) {
    serverError(res, err);
  }
});

// PUT /api/etmf/users/:id/toggle-active
router.put('/:id/toggle-active', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });
    if (user.id === req.authUser.id) {
      return res.status(400).json({ success: false, error: 'You cannot deactivate your own account.' });
    }

    user.isActive = !user.isActive;
    const saved = await user.save();

    await logUserAudit(req.body.adminUser, saved.isActive ? 'USER_ACCOUNT_ACTIVATED' : 'USER_ACCOUNT_DEACTIVATED', saved.loginId, saved.name,
      `Active: ${!saved.isActive}`, `Active: ${saved.isActive}`, 'User account status toggled by System Administrator');

    res.json({ success: true, data: publicUser(saved) });
  } catch (err) {
    serverError(res, err);
  }
});

// DELETE /api/etmf/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ success: false, error: 'User not found.' });
    if (user.id === req.authUser.id) {
      return res.status(400).json({ success: false, error: 'You cannot delete your own account.' });
    }

    await User.deleteOne({ id: req.params.id });

    await logUserAudit(req.body?.adminUser, 'USER_CREDENTIAL_DELETED', user.loginId, user.name, `Role: ${user.roleId}`, 'DELETED',
      'User credential permanently removed by System Administrator');

    res.json({ success: true, message: `User ${user.name} (${user.loginId}) deleted successfully.` });
  } catch (err) {
    serverError(res, err);
  }
});

// POST /api/etmf/users/apply-rotation
router.post('/apply-rotation', async (req, res) => {
  try {
    const { rotationName, adminUser } = req.body;
    const rotObj = ROTATION_SCHEDULE.find(r => r.rotation === rotationName);
    if (!rotObj) return res.status(400).json({ success: false, error: 'Invalid rotation selected.' });

    for (const [userId, assignment] of Object.entries(rotObj.assignments)) {
      const user = await User.findOne({ id: userId });
      if (user) {
        const roleDef = ROLES_DEFINITION.find(r => r.id === assignment.roleId);
        user.roleId = assignment.roleId;
        user.title = roleDef ? roleDef.name : assignment.label;
        user.trainingRole = `${assignment.label} – ${rotObj.rotation} (${rotObj.weeks})`;
        if (assignment.roleId === 'cra' || assignment.roleId === 'site_user') {
          user.siteScope = user.assignedSite || 'Site 001 - AIIMS RPC Eye Centre, New Delhi';
        } else {
          user.siteScope = 'ALL';
        }
        await user.save();
      }
    }

    await logUserAudit(adminUser, 'ROTATION_MATRIX_APPLIED', rotObj.rotation, `${rotObj.rotation} (${rotObj.weeks})`, 'Previous Rotation',
      `Applied ${rotObj.rotation}: ${rotObj.objective}`, 'Batch role rotation executed for 6 students');

    const allUsers = await User.find({}).select('-password').sort({ createdAt: 1 });
    res.json({ success: true, message: `${rotObj.rotation} (${rotObj.weeks}) applied successfully to all 6 students!`, data: allUsers });
  } catch (err) {
    serverError(res, err);
  }
});

export default router;
