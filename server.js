import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as xlsx from 'xlsx';
import OpenAI from 'openai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const DATA_DIR = path.join(__dirname, 'Data');
const EXCEL_FILE_PATH = path.join(DATA_DIR, 'Client_Inqury.xlsx');

// Ensure the directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// -------------------------
// EXCEL DATABASE LOGIC
// -------------------------
app.post('/api/contact', (req, res) => {
  const { name, email, phone, company, requirement, message } = req.body;

  try {
    const newLead = {
      Date: new Date().toISOString(),
      Name: name || '',
      Email: email || '',
      Phone: phone || '',
      Company: company || '',
      Service_Requirement: requirement || '',
      Message: message || ''
    };

    let workbook;
    let worksheet;

    // Load existing workbook or create a new one
    if (fs.existsSync(EXCEL_FILE_PATH)) {
      workbook = xlsx.readFile(EXCEL_FILE_PATH);
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(worksheet);
      data.push(newLead);
      worksheet = xlsx.utils.json_to_sheet(data);
      workbook.Sheets[workbook.SheetNames[0]] = worksheet;
    } else {
      workbook = xlsx.utils.book_new();
      worksheet = xlsx.utils.json_to_sheet([newLead]);
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Client_Inqury');
    }

    // Write file to disk
    xlsx.writeFile(workbook, EXCEL_FILE_PATH);
    
    console.log(`[+] New lead saved to Excel: ${name} (${email})`);
    res.status(200).json({ success: true, message: 'Data saved successfully to Excel sheet.' });

  } catch (error) {
    console.error('Error saving to Excel:', error);
    res.status(500).json({ success: false, error: 'Failed to write to Excel' });
  }
});

// -------------------------
// CHATBOT LOGIC (ChatGPT)
// -------------------------
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

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

app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required." });

  if (!openai) {
    let mockReply = "Hello! I'm the VigiThink life sciences assistant. How can I help you today?";
    const lower = message.toLowerCase();
    
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        mockReply = "Hi there! Welcome to VigiThink. How can we aid your clinical or safety operations today?";
    } else if (lower.includes('service') || lower.includes('what do you do') || lower.includes('offer')) {
        mockReply = "We offer comprehensive life sciences services across 6 master pillars: Pharmacovigilance, Medical Information, Regulatory Affairs, Medical Writing, Medical Affairs, and Quality Assurance. Would you like details on any specific area?";
    } else if (lower.includes('headquarter') || lower.includes('location') || lower.includes('where')) {
        mockReply = "We are headquartered globally in Pune, Maharashtra, India. Let us know if you'd like to schedule a visit or an online consultation!";
    } else if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('call')) {
        mockReply = "You can connect with our specialized team anytime at info@vigithink.com. Alternatively, you can use the 'Request a Quote' button or Contact page to submit your exact requirements directly to us.";
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
        mockReply = "Our pricing is dynamic and custom-tailored to your clinical or post-marketing volume. Please use the 'Request a Quote' button above, and our commercial team will give you a precise breakdown!";
    } else if (lower.includes('audit') || lower.includes('inspection')) {
        mockReply = "Absolutely. We provide end-to-end audit and inspection support, including mock inspections, CAPA plans, and regulatory authority liaison. Our teams routinely handle global standards with zero critical findings.";
    } else {
        mockReply = "I completely understand. While I'm still learning, our human PV experts would love to discuss this with you directly! Please drop an inquiry through our Contact page or email info@vigithink.com.";
    }

    // Simulate natural typing delay
    await new Promise(r => setTimeout(r, 1200));
    return res.json({ reply: mockReply });
  }

  // Actual OpenAI Implementation
  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 150
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI provider.' });
  }
});

app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`🚀 Backend Server active on port ${PORT}`);
  console.log(`=================================\n`);
});
