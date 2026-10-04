import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from './models/User.js';

// In production JWT_SECRET must be set. In dev an ephemeral secret is generated (sessions end on restart).
// Read lazily: ES module imports are evaluated before dotenv.config() runs in server.js.
let secret;
const getSecret = () => {
  secret = secret || process.env.JWT_SECRET;
  if (!secret) {
    secret = crypto.randomBytes(48).toString('hex');
    console.warn('[eTMF] JWT_SECRET is not set - using a temporary secret. Set JWT_SECRET in .env so logins survive restarts.');
  }
  return secret;
};


export const isHashed = (value) => typeof value === 'string' && /^\$2[aby]\$/.test(value);
export const hashPassword = (plain) => bcrypt.hash(plain, 10);
export const verifyPassword = (plain, stored) => {
  if (typeof plain !== 'string' || !stored) return Promise.resolve(false);
  return isHashed(stored) ? bcrypt.compare(plain, stored) : Promise.resolve(false);
};

export const signToken = (user) => jwt.sign({ sub: user.id }, getSecret(), { expiresIn: process.env.ETMF_TOKEN_TTL || '8h' });

export const publicUser = (doc) => {
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  delete obj.password;
  delete obj.__v;
  return obj;
};

// Verifies the Bearer token, loads the live user (so deactivation / role changes apply immediately)
// and stamps the authenticated identity onto the request so audit trails cannot be spoofed by the client.
export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, error: 'Authentication required.' });

    let payload;
    try {
      payload = jwt.verify(token, getSecret());
    } catch {
      return res.status(401).json({ success: false, error: 'Session expired. Please log in again.' });
    }

    const user = await User.findOne({ id: payload.sub });
    if (!user || user.isActive === false) {
      return res.status(401).json({ success: false, error: 'Account not found or deactivated.' });
    }

    const me = publicUser(user);
    req.authUser = me;
    req.headers['x-user-id'] = me.id;
    req.headers['x-user-name'] = me.name;
    req.headers['x-user-role'] = me.roleId;
    if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
      req.body.user = me;
      req.body.adminUser = me;
    }
    next();
  } catch (err) {
    console.error('[eTMF auth]', err);
    res.status(500).json({ success: false, error: 'Authentication failed.' });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.authUser || !roles.includes(req.authUser.roleId)) {
    return res.status(403).json({ success: false, error: 'You do not have permission to perform this action.' });
  }
  next();
};

export const escapeRegex = (str) => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
