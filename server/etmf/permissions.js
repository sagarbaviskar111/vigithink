import { ROLES_DEFINITION } from '../../src/etmf/data/initialRolesData.js';

// Single source of truth: the same role -> permission matrix the UI uses.
const PERMISSIONS = Object.fromEntries(ROLES_DEFINITION.map(r => [r.id, r.permissions || {}]));

export const can = (user, key) => {
  if (!user) return false;
  if (user.roleId === 'system_admin') return true;
  return PERMISSIONS[user.roleId]?.[key] === true;
};

// ---------------------------------------------------------------------------
// Route rules. First matching rule wins. `perms` is "any of"; it may be a function of the request.
// Unmatched GET requests need 'view'; unmatched write requests are denied (default-deny).
// ---------------------------------------------------------------------------
const RULES = {
  '/documents': [
    ['GET', /^\/[^/]+\/download$/, ['download']],
    ['POST', /^\/upload$/, ['upload']],
    ['POST', /^\/$/, ['upload']],
    ['PUT', /^\/[^/]+\/metadata$/, ['upload', 'editMetadata']],
    ['PUT', /^\/[^/]+\/qc$/, (req) => (req.body?.qcStatus === 'Failed' ? ['reject'] : ['review'])],
    ['POST', /^\/[^/]+\/sign$/, ['part11Sign']],
    ['PUT', /^\/[^/]+\/checkout$/, ['version']],
    ['POST', /^\/[^/]+\/comments$/, ['comment']],
    ['POST', /^\/[^/]+\/(copy|move)$/, ['moveFile']],
    ['POST', /^\/[^/]+\/version$/, ['version']],
    ['DELETE', /^\/[^/]+$/, ['delete']],
  ],
  '/studies': [
    ['POST', /.*/, ['admin']],
    ['PUT', /.*/, ['admin']],
    ['DELETE', /.*/, ['admin']],
  ],
  '/folders': [
    ['POST', /^\/$/, ['upload']],
    ['PUT', /.*/, ['moveFile']],
    ['DELETE', /.*/, ['moveFile']],
  ],
  '/milestones': [
    ['POST', /.*/, ['editMetadata']],
    ['PUT', /.*/, ['editMetadata']],
  ],
  '/queries': [
    ['POST', /^\/$/, ['review']],
    ['PUT', /^\/[^/]+\/resolve$/, ['comment']],
  ],
  // Any signed-in user may append audit events from the UI; identity is stamped server-side.
  '/audit-logs': [
    ['POST', /.*/, ['view']],
  ],
};

// Inspectors are read-only: they may only comment on documents and write their own audit events.
const AUDITOR_WRITES = [['/documents', /^\/[^/]+\/comments$/], ['/audit-logs', /^\/$/]];

export const enforce = (mount) => (req, res, next) => {
  if (req.authUser?.roleId === 'auditor' && !['GET', 'HEAD'].includes(req.method)
    && !AUDITOR_WRITES.some(([m, re]) => m === mount && re.test(req.path))) {
    return res.status(403).json({ success: false, error: 'Inspector access is read-only.' });
  }
  const rule = (RULES[mount] || []).find(([method, re]) => method === req.method && re.test(req.path));
  let perms;
  if (rule) perms = typeof rule[2] === 'function' ? rule[2](req) : rule[2];
  else if (req.method === 'GET' || req.method === 'HEAD') perms = ['view'];
  else return res.status(403).json({ success: false, error: 'This action is not permitted.' });

  if (perms.some(key => can(req.authUser, key))) return next();
  return res.status(403).json({
    success: false,
    error: `Your role (${req.authUser?.title || req.authUser?.roleId}) does not have permission to perform this action.`
  });
};

// ---------------------------------------------------------------------------
// Study / country / site scope (4D scoping) - system_admin and tmf_manager see everything.
// ---------------------------------------------------------------------------
const isPrivileged = (u) => u?.roleId === 'system_admin' || u?.roleId === 'tmf_manager';
const restricted = (value) => value && value !== 'ALL';

export const docScopeQuery = (u) => {
  if (isPrivileged(u)) return {};
  const and = [];
  if (restricted(u.studyScope)) and.push({ study_id: u.studyScope });
  if (restricted(u.countryScope)) and.push({ country_code: { $in: [u.countryScope, 'GLOBAL', 'IND'] } });
  if (restricted(u.siteScope)) and.push({ site_id: { $in: [u.siteScope, 'CENTRAL', 'GLOBAL'] } });
  return and.length ? { $and: and } : {};
};

export const studyScopeQuery = (u, field = 'study_id') => {
  if (isPrivileged(u) || !restricted(u.studyScope)) return {};
  return { [field]: u.studyScope };
};

export const studyInScope = (u, studyId) => isPrivileged(u) || !restricted(u.studyScope) || !studyId || studyId === u.studyScope;

export const docInScope = (u, doc) => {
  if (isPrivileged(u)) return true;
  if (restricted(u.studyScope) && doc.study_id !== u.studyScope) return false;
  if (restricted(u.countryScope) && ![u.countryScope, 'GLOBAL', 'IND'].includes(doc.country_code)) return false;
  if (restricted(u.siteScope) && ![u.siteScope, 'CENTRAL', 'GLOBAL'].includes(doc.site_id)) return false;
  return true;
};

export const withScope = (filter, scope) => (Object.keys(scope).length ? { $and: [filter, scope] } : filter);
