import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';
import { dbReady, initDb, listEnquiries, saveEnquiry } from './server/db.ts';

// Reads .env.local first (AI Studio style), then .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod');
const port = Number(process.env.PORT) || 3000;
const dataDir = path.resolve(process.env.DATA_DIR || path.join(__dirname, 'data'));

// Model names live in .env so you can change them without touching code
const CHAT_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
// Gemini Flash models understand audio directly, so the same model also transcribes speech
const TRANSCRIBE_MODEL = process.env.GEMINI_TRANSCRIBE_MODEL || CHAT_MODEL;

// Text-to-speech model for the Urdu welcome greeting (see /api/greeting-audio)
const TTS_MODELS = [process.env.GEMINI_TTS_MODEL, 'gemini-3.1-flash-tts-preview', 'gemini-2.5-flash-preview-tts'].filter(
  (m, i, a): m is string => Boolean(m) && a.indexOf(m) === i
);
const TTS_VOICE = process.env.GEMINI_TTS_VOICE || 'Kore';

const GEMINI_KEY = (process.env.GEMINI_API_KEY || '').trim();
const hasGeminiKey = () => GEMINI_KEY !== '' && GEMINI_KEY !== 'MY_GEMINI_API_KEY';

const ADMIN_KEY = (process.env.ADMIN_KEY || '').trim();

const app = express();
// Hosting platforms (Render, Railway, Vercel...) sit behind a proxy; this makes req.ip the real visitor
app.set('trust proxy', 1);
app.disable('x-powered-by');

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

// Basic security headers (small version of what the "helmet" package does)
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=(self)');
  next();
});

// Very small in-memory rate limiter: max N requests per window per visitor IP
function rateLimit(max: number, windowMs: number) {
  const hits = new Map<string, { count: number; reset: number }>();
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  }, windowMs).unref();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.reset < now) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return next();
    }
    entry.count += 1;
    if (entry.count > max) {
      return res.status(429).json({
        error: 'Too many requests. Please wait a minute and try again.',
        reply: 'Too many messages in a short time. Please wait a minute, or message Sir Muhammad Qasim directly on WhatsApp: +92 334 8073431.',
      });
    }
    next();
  };
}

const clean = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) : '';

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

// Body parsers: the voice endpoint needs a bigger limit than everything else
app.use('/api/transcribe', express.json({ limit: '12mb' }));
app.use(express.json({ limit: '100kb' }));

// ---------------------------------------------------------------------------
// AI counselor instructions (what the chatbot knows about BELC)
// ---------------------------------------------------------------------------
const BELC_SYSTEM_INSTRUCTION = `You are the official AI Academic Counselor and Virtual Assistant for Bismillah English Language Club (BELC), located on the 1st Floor, Kayseria Building on Main Wazirabad Road / Main Bazar, Sambrial, District Sialkot, Punjab, Pakistan.

BELC was established in 2015 by Founder & Managing Director Sir Muhammad Qasim (Senior IELTS & PTE Master Trainer).
Your role is to assist students, professionals, and prospective candidates with verified, accurate, and encouraging advice.

Programs & Services Offered:
1. IELTS Preparation (Academic & General):
   - Timings: 04:00 PM – 06:00 PM batch. Duration: 2 to 4 months.
   - Listening headphone lab, Cambridge practice tests, Task 1 & 2 writing structures, 1-on-1 speaking evaluations.
2. PTE Academic Masterclass:
   - Timings: Daily 04:00 PM batch.
   - Individual computer workstations, AI score calibration, proven templates.
3. Spoken English & Fluency Mastery:
   - Timings: Afternoon (02:00 PM – 04:00 PM) and Evening (04:00 PM – 06:00 PM).
   - Hesitation removal, pronunciation drills, job interview preparation.
4. Flagship 8-Week AI Bootcamp (Next-Gen 2026):
   - "Learn AI. Build with AI. Work with AI."
   - 5 Pillars: 1) Cinematic AI Video Generation (Midjourney, Runway, Kling, ElevenLabs), 2) Advanced Prompt Engineering, 3) "Vibe Coding" & Modern AI Software Development (Cursor, Windsurf), 4) AI Business Automations & Agents (Make, Zapier, n8n), 5) No-Code client projects & live portfolio deployment.
   - No prior coding required. Official BELC Certified AI Practitioner Diploma.
5. Computer & IT Programs:
   - Modern Office Management (MS Word, Excel, PowerPoint, fast typing, email etiquette).
   - Online Earning & Freelancing (Upwork, Fiverr client proposals & payment setups).
6. BELC Study Advisors:
   - Specialization: China Study Visa (MBBS Admissions WHO/PMDC recognized, Belt & Road engineering scholarships).
   - Global study abroad counseling for UK, Australia, Canada, and Europe.
   - Strict transparency: Legitimate university placement and visa file preparation only. Never guarantee 100% visa issuance.
7. Umrah Services:
   - Customized individual, family, and executive packages with confirmed air tickets, direct eVisas, luxury transport, and hotels near the Haramain.
   - Travel disclaimer: Rates and availability are subject to seasonal airline and hotel tariffs.

Tuition Fees Policy:
Fees are structured affordably depending on course duration (2 to 4 months) and package. Do not quote made-up fixed numbers; advise candidates to contact Sir Muhammad Qasim on WhatsApp (+92 334 8073431) or visit the academy in person for current batch discounts.

Academy Contacts:
- Phone & WhatsApp: +92 334 8073431
- Alternate Contact: +92 311 7763164
- Email: mqtaiyabi@gmail.com
- Hours: Monday to Saturday from 9:00 AM to 6:00 PM (Closed Sundays).

Tone & Language:
- Always be polite, respectful, and encouraging.
- If the user speaks in Urdu, respond fluently in Urdu (or Roman Urdu if they used Roman Urdu). If they ask in English, answer in polished English.
- Always include an invitation to chat with Sir Muhammad Qasim on WhatsApp (+92 334 8073431) for quick admissions assistance.`;

// ---------------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------------

// Hosting platforms ping this to check that the site is alive
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    gemini: hasGeminiKey(),
    database: dbReady(),
    email: Boolean(process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.SMTP_PASSWORD !== 'YOUR_APP_PASSWORD_HERE'),
  });
});

// ---- AI chatbot -----------------------------------------------------------
app.post('/api/chat', rateLimit(20, 60_000), async (req, res) => {
  try {
    const raw = req.body?.messages;
    if (!Array.isArray(raw) || raw.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!hasGeminiKey()) {
      return res.json({
        reply:
          'Assalam-o-Alaikum! Welcome to BELC Sambrial. For instant admissions, fees, and IELTS/AI batch timings, please message Sir Muhammad Qasim directly on WhatsApp at +92 334 8073431.',
      });
    }

    // Clean the history: last 12 messages, limited length, and Gemini needs the FIRST message to be from the user
    type Turn = { role: 'user' | 'model'; text: string };
    let turns: Turn[] = raw
      .slice(-12)
      .map((m: any): Turn => ({
        role: m?.role === 'assistant' || m?.role === 'model' ? 'model' : 'user',
        text: clean(m?.content, 1000),
      }))
      .filter((t) => t.text);

    while (turns.length && turns[0].role !== 'user') turns.shift();
    // merge consecutive messages of the same role (Gemini prefers alternating turns)
    turns = turns.reduce<Turn[]>((acc, t) => {
      const last = acc[acc.length - 1];
      if (last && last.role === t.role) last.text += '\n' + t.text;
      else acc.push({ ...t });
      return acc;
    }, []);

    if (!turns.length || turns[turns.length - 1].role !== 'user') {
      return res.status(400).json({ error: 'The last message must come from the user' });
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
      config: {
        systemInstruction: BELC_SYSTEM_INSTRUCTION,
        temperature: 0.6,
        maxOutputTokens: 700,
      },
    });

    return res.json({
      reply: response.text || 'Thank you for contacting BELC. Please reach us on WhatsApp at +92 334 8073431.',
    });
  } catch (error: any) {
    console.error('Chat error:', error?.message || error);
    // 200 on purpose: the website then shows the friendly message instead of an error screen
    return res.json({
      reply:
        'Assalam-o-Alaikum! For direct assistance regarding courses and admissions, please connect with Sir Muhammad Qasim on WhatsApp at +92 334 8073431.',
    });
  }
});

// ---- Speech -> text (microphone button in the chatbot) --------------------
app.post('/api/transcribe', rateLimit(10, 60_000), async (req, res) => {
  try {
    const audioBase64 = typeof req.body?.audioBase64 === 'string' ? req.body.audioBase64 : '';
    if (!audioBase64) {
      return res.status(400).json({ error: 'audioBase64 is required' });
    }
    if (audioBase64.length > 11_000_000) {
      return res.status(413).json({ error: 'Recording is too long. Please keep it under one minute.' });
    }
    if (!hasGeminiKey()) {
      return res.status(503).json({ error: 'Voice input is not configured yet (GEMINI_API_KEY missing).' });
    }

    // Browsers send things like "audio/webm;codecs=opus" - Gemini wants just "audio/webm"
    const mimeType = clean(req.body?.mimeType, 60).split(';')[0] || 'audio/webm';

    const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
    const response = await ai.models.generateContent({
      model: TRANSCRIBE_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType, data: audioBase64 } },
            {
              text: 'Transcribe this spoken audio verbatim. The speaker uses English, Urdu or Roman Urdu. Return ONLY the spoken words, no commentary. If there is no speech, return an empty string.',
            },
          ],
        },
      ],
    });

    return res.json({ text: (response.text || '').trim() });
  } catch (error: any) {
    console.error('Transcription error:', error?.message || error);
    return res.status(500).json({ error: 'Could not understand the recording. Please type your question.' });
  }
});

// ---- Admission enquiry form -----------------------------------------------
const contactLimiter = rateLimit(5, 10 * 60_000);

async function sendEnquiryEmail(e: {
  name: string; phone: string; whatsapp: string; email: string; service: string; message: string;
}): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || SMTP_PASSWORD === 'YOUR_APP_PASSWORD_HERE') {
    return false; // e-mail not configured - the enquiry is still saved in the database
  }
  const portNumber = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: portNumber,
    secure: portNumber === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  const rows: [string, string][] = [
    ['Name', e.name],
    ['Phone', e.phone],
    ['WhatsApp', e.whatsapp || '-'],
    ['Email', e.email || '-'],
    ['Program', e.service],
    ['Message', e.message || '-'],
  ];

  await transporter.sendMail({
    from: `"BELC Website" <${SMTP_USER}>`,
    to: CONTACT_EMAIL || SMTP_USER,
    replyTo: e.email || undefined,
    subject: `New admission enquiry: ${e.name} - ${e.service}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html:
      '<h2>New admission enquiry</h2><table cellpadding="6" style="border-collapse:collapse">' +
      rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join('') +
      '</table>',
  });
  return true;
}

app.post('/api/contact', contactLimiter, async (req, res) => {
  const body = req.body || {};

  // Bots fill the hidden field. Pretend everything is fine and do nothing.
  if (clean(body.honeypot, 50)) return res.json({ ok: true });

  const enquiry = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 25),
    whatsapp: clean(body.whatsapp, 25),
    email: clean(body.email, 120),
    service: clean(body.service, 120) || 'General',
    message: clean(body.message, 1500),
  };

  if (enquiry.name.length < 2) {
    return res.status(400).json({ error: 'Please enter your full name.' });
  }
  if (!/^\+?[0-9][0-9\s-]{6,19}$/.test(enquiry.phone)) {
    return res.status(400).json({ error: 'Please enter a valid phone number (example: 0300-1234567).' });
  }
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    return res.status(400).json({ error: 'The email address does not look correct.' });
  }

  let saved = false;
  let mailed = false;

  try {
    saved = saveEnquiry({ ...enquiry, ip: req.ip || '' }) !== null;
  } catch (err) {
    console.error('[contact] database error:', err);
  }
  try {
    mailed = await sendEnquiryEmail(enquiry);
  } catch (err: any) {
    console.error('[contact] email error:', err?.message || err);
  }

  // Always keep a copy in the server log as the last safety net
  console.log(`[contact] new enquiry from ${enquiry.name} (${enquiry.phone}) saved=${saved} emailed=${mailed}`);

  if (!saved && !mailed) {
    return res.status(503).json({
      error: 'We could not store your enquiry right now. Please use the WhatsApp button below - it reaches us instantly.',
    });
  }
  return res.json({ ok: true });
});

// ---- Admin: see the enquiries -------------------------------------------
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!ADMIN_KEY) {
    return res.status(503).json({ error: 'Admin is disabled. Set ADMIN_KEY in your environment variables.' });
  }
  const given = String(req.headers['x-admin-key'] || '');
  if (given !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Wrong admin key.' });
  }
  next();
}

app.get('/api/admin/enquiries', rateLimit(30, 60_000), requireAdmin, (_req, res) => {
  res.json({ database: dbReady(), enquiries: listEnquiries(500) });
});

// Simple admin page (open  /admin  in the browser, type the ADMIN_KEY)
app.get('/admin', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.type('html').send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>BELC Admin - Enquiries</title>
<style>body{font-family:system-ui,sans-serif;margin:0;background:#0f172a;color:#e2e8f0}header{padding:16px 20px;background:#9f1239;font-weight:700}
main{padding:20px}input,button{padding:10px 14px;border-radius:8px;border:0;font-size:14px}button{background:#ef4444;color:#fff;cursor:pointer;font-weight:700;margin-left:6px}
table{width:100%;border-collapse:collapse;margin-top:16px;font-size:13px}th,td{padding:8px 10px;border-bottom:1px solid #334155;text-align:left;vertical-align:top}th{color:#fda4af}
a{color:#7dd3fc}.muted{color:#94a3b8}</style></head><body><header>BELC Sambrial - Admission Enquiries</header><main>
<div><input id="key" type="password" placeholder="Admin key"><button onclick="load()">Open</button><button onclick="csv()" style="background:#0ea5e9">Download CSV</button></div>
<p id="msg" class="muted"></p><div style="overflow-x:auto"><table id="t"></table></div></main>
<script>
let rows=[];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function load(){
  const key=document.getElementById('key').value;sessionStorage.setItem('k',key);
  const r=await fetch('/api/admin/enquiries',{headers:{'x-admin-key':key}});
  const d=await r.json();const msg=document.getElementById('msg');
  if(!r.ok){msg.textContent=d.error||'Error';return;}
  rows=d.enquiries;msg.textContent=d.database?(rows.length+' enquiries'):'Database is not available on this server.';
  document.getElementById('t').innerHTML='<tr><th>#</th><th>Date</th><th>Name</th><th>Phone</th><th>Program</th><th>Email</th><th>Message</th></tr>'+
  rows.map(e=>'<tr><td>'+e.id+'</td><td>'+esc(e.created_at)+'</td><td>'+esc(e.name)+'</td><td><a href="https://wa.me/'+esc(String(e.phone).replace(/\\D/g,'').replace(/^0/,'92'))+'" target="_blank">'+esc(e.phone)+'</a></td><td>'+esc(e.service)+'</td><td>'+esc(e.email)+'</td><td>'+esc(e.message)+'</td></tr>').join('');
}
function csv(){
  const h=['id','created_at','name','phone','whatsapp','email','service','message'];
  const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  const t=[h.join(',')].concat(rows.map(r=>h.map(k=>q(r[k])).join(','))).join('\\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='belc-enquiries.csv';a.click();
}
const k=sessionStorage.getItem('k');if(k){document.getElementById('key').value=k;load();}
</script></body></html>`);
});

// ---- Urdu welcome greeting as a real audio file ------------------------------
// Many phones/PCs have no Urdu voice, so the server makes the audio once with Gemini TTS,
// saves it as a .wav file and every visitor then plays that same file.
// Want the academy's OWN recording instead? Put  greeting.mp3  inside the "public" folder.
// Keep this text the same as scriptUrdu in src/data/academy.ts
const GREETING_URDU =
  'بسم اللہ انگلش لینگویج کلب سمبڑیال میں خوش آمدید۔ سر محمد قاسم اور ماہر اساتذہ کی زیرِ نگرانی آئیلٹس، پی ٹی ای، سپوکن انگلش، جدید اے آئی بوٹ کیمپ، اسٹڈی ویزا اور عمرہ سروسز کے لیے ہم آپ کی خدمت میں حاضر ہیں۔ مزید معلومات کے لیے واٹس ایپ پر رابطہ کریں۔';

const staticRoot = path.resolve(__dirname, isProd ? 'dist' : 'public');

// Raw 16-bit PCM audio from Gemini -> normal .wav file that every browser can play
function pcmToWav(pcm: Buffer, sampleRate: number): Buffer {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // fmt chunk size
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28); // byte rate
  header.writeUInt16LE(2, 32); // block align
  header.writeUInt16LE(16, 34); // bits per sample
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

let greetingPending: Promise<string> | null = null;

// Returns the path of the greeting .wav (creates it with Gemini the first time)
function getGreetingFile(): Promise<string> {
  if (greetingPending) return greetingPending;

  greetingPending = (async () => {
    // file name changes when the text/voice changes, so edits are picked up automatically
    const tag = Buffer.from(GREETING_URDU + TTS_VOICE).reduce((h, b) => (h * 31 + b) >>> 0, 7).toString(16);
    const file = path.join(dataDir, `greeting-ur-${tag}.wav`);
    if (fs.existsSync(file)) return file;

    const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
    const prompt = `Read the following in clear, warm, professional Urdu with a natural Pakistani accent, at a calm welcoming pace:\n\n${GREETING_URDU}`;

    let lastError: unknown = null;
    for (const model of TTS_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: TTS_VOICE } } },
          } as any,
        });
        const part: any = response.candidates?.[0]?.content?.parts?.find((p: any) => p?.inlineData?.data);
        if (!part) throw new Error('No audio came back from ' + model);

        const raw = Buffer.from(part.inlineData.data, 'base64');
        const mime = String(part.inlineData.mimeType || '');
        const rate = Number(/rate=(\d+)/.exec(mime)?.[1]) || 24000;
        const wav = mime.includes('wav') ? raw : pcmToWav(raw, rate);

        fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(file, wav);
        console.log(`[tts] Urdu greeting created with ${model} (${Math.round(wav.length / 1024)} KB)`);
        return file;
      } catch (err: any) {
        lastError = err;
        console.warn(`[tts] ${model} failed:`, err?.message || err);
      }
    }
    throw lastError || new Error('Text-to-speech failed');
  })();

  // if it failed, allow a new try on the next request
  greetingPending.catch(() => {
    greetingPending = null;
  });
  return greetingPending;
}

app.get('/api/greeting-audio', rateLimit(30, 60_000), async (_req, res) => {
  try {
    // 1) the academy's own recording (public/greeting.mp3 or .wav) always wins
    for (const name of ['greeting.mp3', 'greeting.wav', 'greeting.m4a']) {
      const own = path.join(staticRoot, name);
      if (fs.existsSync(own)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return res.sendFile(own);
      }
    }
    // 2) otherwise the Gemini-made file
    if (!hasGeminiKey()) return res.status(503).json({ error: 'No greeting audio available.' });
    const file = await getGreetingFile();
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.type('audio/wav').sendFile(file); // sendFile also supports Range requests (needed by Safari)
  } catch (err: any) {
    console.error('Greeting audio error:', err?.message || err);
    return res.status(503).json({ error: 'Greeting audio is not available right now.' });
  }
});

// Unknown /api/... URLs must return JSON, not the website
app.all('/api/*', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ---------------------------------------------------------------------------
// Website files: Vite dev server (development) or the built /dist folder (production)
// ---------------------------------------------------------------------------
async function start() {
  await initDb(dataDir);

  // Prepare the Urdu greeting audio in the background
  if (hasGeminiKey()) {
    getGreetingFile().catch(() => console.warn('[tts] Could not prepare greeting audio (voice will use the device voice instead).'));
  }

  if (isProd) {
    const dist = path.resolve(__dirname, 'dist');
    if (!fs.existsSync(path.join(dist, 'index.html'))) {
      console.error('\n[error] The "dist" folder is missing. Run  npm run build  first, then  npm start.\n');
      process.exit(1);
    }
    app.use('/assets', express.static(path.join(dist, 'assets'), { maxAge: '1y', immutable: true }));
    app.use(express.static(dist, { maxAge: '1h' }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(dist, 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  // JSON errors (for example a broken request body) instead of an HTML error page
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err?.type === 'entity.too.large') return res.status(413).json({ error: 'Request is too large.' });
    if (err instanceof SyntaxError) return res.status(400).json({ error: 'Invalid request.' });
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`\nBELC website running (${isProd ? 'production' : 'development'})`);
    console.log(`  Open:      http://localhost:${port}`);
    console.log(`  Chatbot:   ${hasGeminiKey() ? 'Gemini ON (' + CHAT_MODEL + ')' : 'Gemini key missing -> WhatsApp fallback replies'}`);
    console.log(`  Database:  ${dbReady() ? 'SQLite ready in ' + dataDir : 'not available'}`);
    console.log(`  Admin:     ${ADMIN_KEY ? 'http://localhost:' + port + '/admin' : 'disabled (set ADMIN_KEY to enable)'}\n`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});