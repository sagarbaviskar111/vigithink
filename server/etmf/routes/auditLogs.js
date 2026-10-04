import express from 'express';
import { studyScopeQuery } from '../permissions.js';
import { AuditLog } from '../models/AuditLog.js';

const router = express.Router();

// GET /api/audit-logs - Query immutable audit trail events
router.get('/', async (req, res) => {
  try {
    const { study_id, target_id, action, limit = 100 } = req.query;
    const filter = {};

    if (study_id && study_id !== 'ALL') filter.study_id = study_id;
    if (target_id) filter.target_id = target_id;
    if (action && action !== 'ALL') filter.action = action;

    const scope = studyScopeQuery(req.authUser);
    const scoped = Object.keys(scope).length ? { $and: [filter, { $or: [scope, { study_id: 'GLOBAL' }] }] } : filter;
    const logs = await AuditLog.find(scoped)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({ success: true, count: logs.length, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/audit-logs - Record Part 11 compliant audit log
router.post('/', async (req, res) => {
  try {
    const me = req.authUser;
    const log = new AuditLog({
      ...req.body,
      user_id: me.id,
      user_name: me.name,
      user_role: me.roleId,
      ip_address: req.ip,
      id: req.body.id || `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    });
    const saved = await log.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
