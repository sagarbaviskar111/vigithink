import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/User.js';
import { seedDatabase } from './data/seeder.js';
import { requireAuth, requireRole, hashPassword, isHashed } from './auth.js';
import { rateLimit } from '../rateLimit.js';
import { enforce } from './permissions.js';

import documentsRouter from './routes/documents.js';
import studiesRouter from './routes/studies.js';
import auditLogsRouter from './routes/auditLogs.js';
import milestonesRouter from './routes/milestones.js';
import queriesRouter from './routes/queries.js';
import reportsRouter from './routes/reports.js';
import systemRouter from './routes/system.js';
import usersRouter from './routes/users.js';
import foldersRouter from './routes/folders.js';

// One-off migration: hash any legacy plaintext passwords found in the users collection
const hashLegacyPasswords = async () => {
  const users = await User.find({});
  let migrated = 0;
  for (const user of users) {
    if (user.password && !isHashed(user.password)) {
      user.password = await hashPassword(user.password);
      await user.save();
      migrated += 1;
    }
  }
  if (migrated) console.log(`[eTMF] Hashed ${migrated} legacy plaintext password(s).`);
};

// Create the first administrator from env on an empty users collection
const bootstrapAdmin = async () => {
  if (await User.countDocuments() > 0) return;
  const email = process.env.ETMF_ADMIN_EMAIL;
  const password = process.env.ETMF_ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('[eTMF] No users exist. Set ETMF_ADMIN_EMAIL and ETMF_ADMIN_PASSWORD in .env to create the first admin.');
    return;
  }
  await User.create({
    id: 'usr_admin',
    name: process.env.ETMF_ADMIN_NAME || 'System Administrator',
    loginId: email,
    email,
    password: await hashPassword(password),
    roleId: 'system_admin',
    title: 'System Administrator',
    studyScope: 'ALL',
    countryScope: 'ALL',
    siteScope: 'ALL',
    accessPrinciple: 'Full administrative access'
  });
  console.log(`[eTMF] Created first administrator: ${email}`);
};

export const mountEtmf = (app) => {
  const router = express.Router();
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[eTMF] MONGODB_URI is not set - the eTMF tool is disabled.');
    router.use((req, res) => res.status(503).json({ success: false, error: 'eTMF is not configured on this server.' }));
    app.use('/api/etmf', router);
    return;
  }

  mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 })
    .then(async () => {
      console.log(`[eTMF] Connected to MongoDB: ${mongoose.connection.host}/${mongoose.connection.name}`);
      await hashLegacyPasswords();
      await bootstrapAdmin();
      await seedDatabase();
    })
    .catch((err) => console.error('[eTMF] MongoDB connection failed:', err.message));

  router.use(express.json({ limit: '5mb' }));
  router.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, error: 'eTMF database is not available. Please try again shortly.' });
    }
    next();
  });

  // Brute-force protection on login, then authentication for everything else
  const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: 'Too many login attempts. Please try again in 15 minutes.' });
  router.use('/users/login', loginLimiter);
  router.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/users/login') return next();
    return requireAuth(req, res, next);
  });

  // User administration is limited to system administrators (reading the list is open to signed-in users)
  router.use('/users', (req, res, next) => {
    if (req.method === 'GET' || (req.method === 'POST' && req.path === '/login')) return next();
    return requireRole('system_admin')(req, res, next);
  });

  // System maintenance: admins only, and destructive actions must be explicitly enabled
  router.use('/system', requireRole('system_admin'), (req, res, next) => {
    const destructive = req.method === 'POST' && (req.path === '/clear-data' || req.path === '/reset-demo');
    if (destructive && process.env.ETMF_ALLOW_DESTRUCTIVE !== 'true') {
      return res.status(403).json({ success: false, error: 'Destructive system actions are disabled on this server.' });
    }
    next();
  });

  router.use('/documents', enforce('/documents'), documentsRouter);
  router.use('/studies', enforce('/studies'), studiesRouter);
  router.use('/audit-logs', enforce('/audit-logs'), auditLogsRouter);
  router.use('/milestones', enforce('/milestones'), milestonesRouter);
  router.use('/queries', enforce('/queries'), queriesRouter);
  router.use('/reports', enforce('/reports'), reportsRouter);
  router.use('/system', systemRouter);
  router.use('/users', usersRouter);
  router.use('/folders', enforce('/folders'), foldersRouter);

  router.get('/health', (req, res) => res.json({ status: 'OK', application: 'VigiThink eTMF API' }));

  router.use((req, res) => res.status(404).json({ success: false, error: 'Not found' }));
  // eslint-disable-next-line no-unused-vars
  router.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') return res.status(413).json({ success: false, error: 'Request too large.' });
    if (err.type === 'entity.parse.failed') return res.status(400).json({ success: false, error: 'Invalid JSON.' });
    if (err.name === 'MulterError' || err.code === 'UNSUPPORTED_FILE_TYPE') return res.status(400).json({ success: false, error: err.message });
    console.error('[eTMF Server Error]', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  });

  app.use('/api/etmf', router);
};
