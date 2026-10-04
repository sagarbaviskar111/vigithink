import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import OpenAI from 'openai';
import { rateLimit } from './server/rateLimit.js';
import { mountEtmf } from './server/etmf/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');
// Behind nginx: trust the first proxy so req.ip (rate limiting, audit trail) is the real client IP
app.set('trust proxy', Number(process.env.TRUST_PROXY ?? 1));

const PORT = Number(process.env.PORT) || 3001;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',').map(o => o.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Same-origin / proxied / server-to-server requests have no Origin header
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error('Origin not allowed by CORS'));
  }
}));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
// eTMF routes parse their own (larger) bodies
const jsonParser = express.json({ limit: '20kb' });
app.use((req, res, next) => (req.path.startsWith('/api/etmf') ? next() : jsonParser(req, res, next)));

const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });
const chatLimiter = rateLimit({ windowMs: 60 * 1000, max: 20 });

const DATA_DIR = path.join(__dirname, 'Data');
const EXCEL_FILE_PATH = path.join(DATA_DIR, 'Client_Inqury.xlsx');
const SERVICES = ['', 'General Inquiry', 'Pharmacovigilance', 'Medical Information', 'Regulatory Affairs', 'Medical Writing', 'Medical Affairs', 'Quality Assurance'];

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Chat providers, tried in order: Gemini -> Groq -> OpenAI. If none is configured (or all fail) built-in replies are used.
// All three expose an OpenAI-compatible API, so one SDK covers them.
const AI_PROVIDERS = [
  process.env.GEMINI_API_KEY && {
    name: 'gemini',
    client: new OpenAI({ apiKey: process.env.GEMINI_API_KEY, baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/' }),
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    maxTokens: 600 // Gemini 2.5 counts internal reasoning tokens too
  },
  process.env.GROQ_API_KEY && {
    name: 'groq',
    client: new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1' }),
    model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
    maxTokens: 600
  },
  process.env.OPENAI_API_KEY && {
    name: 'openai',
    client: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    maxTokens: 150
  }
].filter(Boolean);

// -------------------------
// CONTACT / LEADS (Excel store)
// -------------------------

// Neutralise Excel formula injection (cells starting with = + - @ tab CR)
const cleanCell = (value, max) => {
  const str = String(value ?? '').trim().slice(0, max);
  return /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Serialise writes so concurrent requests can't corrupt the workbook
let writeQueue = Promise.resolve();
const appendLead = (lead) => {
  const task = writeQueue.then(() => {
    let workbook;
    if (fs.existsSync(EXCEL_FILE_PATH)) {
      workbook = xlsx.readFile(EXCEL_FILE_PATH);
      const sheetName = workbook.SheetNames[0];
      const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      rows.push(lead);
      workbook.Sheets[sheetName] = xlsx.utils.json_to_sheet(rows);
    } else {
      workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet([lead]), 'Client_Inqury');
    }
    xlsx.writeFile(workbook, EXCEL_FILE_PATH);
  });
  writeQueue = task.catch(() => {});
  return task;
};

app.post('/api/contact', contactLimiter, async (req, res) => {
  const body = req.body || {};
  const name = cleanCell(body.name, 100);
  const email = cleanCell(body.email, 150);
  const requirement = cleanCell(body.requirement, 60);

  if (!name) return res.status(400).json({ success: false, error: 'Name is required.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ success: false, error: 'A valid email is required.' });
  if (!SERVICES.includes(requirement)) return res.status(400).json({ success: false, error: 'Invalid service selection.' });

  const lead = {
    Date: new Date().toISOString(),
    Name: name,
    Email: email,
    Phone: cleanCell(body.phone, 30),
    Company: cleanCell(body.company, 150),
    Service_Requirement: requirement,
    Message: cleanCell(body.message, 2000)
  };

  try {
    await appendLead(lead);
    console.log('[+] New lead saved');
    res.status(200).json({ success: true, message: 'Your inquiry has been received.' });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ success: false, error: 'Could not save your inquiry. Please try again later.' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', ai: AI_PROVIDERS.length ? AI_PROVIDERS.map(p => p.name) : false }));

// -------------------------
// CHATBOT LOGIC (ChatGPT)
// -------------------------

// The System Prompt holds the "Memory" of the Boat
const SYSTEM_PROMPT = `
You are the official AI Chat Agent for VigiThink Life Sciences.
VigiThink is a premier global Life Sciences CRO and drug safety service provider based in Pune, Maharashtra, India.
Tagline: "Where Safety Meets Regulatory Intelligence".

SERVICES PROVIDED (You must know these deeply):
1. Pharmacovigilance: End-to-end clinical and post-marketing drug safety solutions.
2. Medical Information: Integrated 24/7 global response centers natively handling inquiries.
3. Regulatory Affairs: Strategic global guidance from clinical development to post-approval.
4. Medical Writing: Clinical, scientific, and regulatory document authoring.
5. Medical Affairs: Bridging the gap via KOL engagement and robust literature surveillance.
6. Quality Assurance: Uncompromising GxP auditing, mock inspections, and QMS coverage.

COMPETITIVE ADVANTAGE (Why Choose VigiThink?):
- Specialized Medical Depth: QPPVs & MDs lead all engagements directly (unlike mega CROs or IT firms).
- Implementation Speed: Agile onboarding in < 4 weeks.
- AI-Native Workflows: Built from the ground up for modern automation.
- Cost Efficiency: Highly targeted. Pay for medical output, not overhead.

PROVEN IMPACT & CASE STUDIES:
- 30% Reduced Turnaround Time (using AI pre-processing for a top-tier oncology sponsor).
- 99.9% Compliance Accuracy (achieved zero critical findings in latest EMA and FDA mock regulatory inspections).
- 10k+ Monthly Cases Scaled (managed peak inflow seamlessly via automated triage).

TONE & BEHAVIOR:
- Professional, helpful, corporate, yet highly approachable.
- Keep answers relatively concise but pack them with the facts above when relevant.
- You must ONLY use the provided information about VigiThink Life Sciences. If you do not know the answer, politely redirect to contact info.
- Contact email: info@vigithink.com. For direct quotes, urge them to use the "Request a Consultation" form.
`;

// Word-boundary matching so "this"/"which" no longer trigger the greeting
const MOCK_RULES = [
  [/\b(hi|hello|hey)\b/, "Hi there! Welcome to VigiThink. How can we aid your clinical or safety operations today?"],
  [/service|what do you do|offer/, "We offer comprehensive life sciences services across 6 master pillars: Pharmacovigilance, Medical Information, Regulatory Affairs, Medical Writing, Medical Affairs, and Quality Assurance. Would you like details on any specific area?"],
  [/headquarter|location|where/, "We are headquartered in Pune, Maharashtra, India. Let us know if you'd like to schedule a visit or an online consultation!"],
  [/contact|email|phone|call/, "You can connect with our team anytime at info@vigithink.com. Alternatively, you can use the 'Request a Quote' button or Contact page to submit your requirements directly to us."],
  [/price|cost|quote/, "Our pricing is custom-tailored to your clinical or post-marketing volume. Please use the 'Request a Quote' button above, and our commercial team will give you a precise breakdown."],
  [/audit|inspection/, "We provide audit and inspection support, including mock inspections, CAPA plans, and regulatory authority liaison. Please contact us for details."]
];
const MOCK_FALLBACK = "Thanks for your question! Our experts would love to discuss this with you directly. Please drop an inquiry through our Contact page or email info@vigithink.com.";

// Only accept plain user/assistant turns from the client (blocks injected system prompts)
const sanitizeHistory = (history) => {
  if (!Array.isArray(history)) return [];
  return history
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-10)
    .map(m => ({ role: m.role, content: m.content.slice(0, 1000) }));
};

app.post('/api/chat', chatLimiter, async (req, res) => {
  const { message, conversationHistory } = req.body || {};

  if (typeof message !== 'string' || !message.trim()) return res.status(400).json({ error: 'Message is required.' });
  if (message.length > 1000) return res.status(400).json({ error: 'Message is too long.' });

  const mockReply = async () => {
    const lower = message.toLowerCase();
    const rule = MOCK_RULES.find(([re]) => re.test(lower));
    await new Promise(r => setTimeout(r, 600));
    return res.json({ reply: rule ? rule[1] : MOCK_FALLBACK, mock: true });
  };

  if (AI_PROVIDERS.length === 0) return mockReply();

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...sanitizeHistory(conversationHistory),
    { role: 'user', content: message.trim() }
  ];

  for (const provider of AI_PROVIDERS) {
    try {
      const response = await provider.client.chat.completions.create({
        model: provider.model,
        messages,
        temperature: 0.7,
        max_tokens: provider.maxTokens
      });
      const reply = response.choices[0]?.message?.content?.trim();
      if (reply) return res.json({ reply, provider: provider.name });
      console.error(`AI provider ${provider.name} returned an empty reply`);
    } catch (error) {
      console.error(`AI provider ${provider.name} error:`, error?.status || '', error?.message || error);
    }
  }

  // Every provider failed: degrade to the built-in answers instead of an error
  return mockReply();
});

// eTMF tool (login-protected, MongoDB backed)
mountEtmf(app);

// Serve the production build (multi-page: marketing site + /etmf tool)
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get(/^\/etmf(\/.*)?$/, (req, res) => res.sendFile(path.join(DIST_DIR, 'etmf', 'index.html')));
  app.get(/^(?!\/api).*/,(req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.message === 'Origin not allowed by CORS') return res.status(403).json({ error: err.message });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request too large.' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON.' });
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, process.env.HOST || '0.0.0.0', () => {
  console.log(`Backend Server active on port ${PORT} (chat: ${AI_PROVIDERS.length ? AI_PROVIDERS.map(p => `${p.name}/${p.model}`).join(' -> ') : 'mock replies - set GEMINI_API_KEY / GROQ_API_KEY / OPENAI_API_KEY for AI'})`);
});
