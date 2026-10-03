# 🎓 BELC Sambrial — Premium Academy Website

Bismillah English Language Club (BELC) Sambrial ki website.
**Technology:** React + Vite + Tailwind (website), Express (server), SQLite (database), Google Gemini (AI chatbot).

Ye README **bilkul beginner** ke liye hai. Har step aaram se follow karein. 🙂

---

## 📑 Index

1. [Is website mein kya kya hai](#1-is-website-mein-kya-kya-hai)
2. [Kya kya fix aur add hua](#2-kya-kya-fix-aur-add-hua)
3. [Computer par zaroori cheezein install karein](#3-computer-par-zaroori-cheezein-install-karein)
4. [Local (apne computer par) run karein](#4-local-apne-computer-par-run-karein)
5. [Gemini AI key lagana (free)](#5-gemini-ai-key-lagana-free)
6. [Contact form ki email setup (Gmail)](#6-contact-form-ki-email-setup-gmail)
7. [Admin page — enquiries dekhna](#7-admin-page--enquiries-dekhna)
8. [Database kaise kaam karti hai](#8-database-kaise-kaam-karti-hai)
9. [Git aur GitHub par upload karna](#9-git-aur-github-par-upload-karna)
10. [Website online host karna (Free aur Paid)](#10-website-online-host-karna-free-aur-paid)
11. [Apna domain (www.yourname.com) lagana](#11-apna-domain-wwwyournamecom-lagana)
12. [Content change karna (fees, phone, courses, photos)](#12-content-change-karna)
13. [Aksar aane wale masail (Troubleshooting)](#13-aksar-aane-wale-masail-troubleshooting)
14. [Folder structure](#14-folder-structure)

---

## 1) Is website mein kya kya hai

- 🏠 Home, About, Courses, 8-Week AI Bootcamp, Study Visa, Umrah, Director, Faculty, Reviews, Contact sections
- 🌐 **English / Urdu** switch (Urdu mein RTL layout) — choice yaad rehti hai
- 🌙☀️ **Dark / Light** mode — choice yaad rehti hai
- ⚡ **Animated background:** bijli (thunder) + flash, ghoomte hue particles, upar tairte hue pencil / pen / books / graduation cap / ruler
- 🤖 **AI Counselor chatbot** (type ya microphone se bol kar) — Gemini se chalta hai
- 🔊 Urdu audio greeting (browser ki awaz se)
- 📝 **Admission enquiry form** → database mein save + academy ki email par bhi jati hai
- 🔐 **/admin page** — saari enquiries dekhein aur CSV (Excel) download karein
- 💬 WhatsApp floating button + har section mein WhatsApp links
- 🔝 Scroll progress bar aur "Back to top" button
- 🔎 SEO: FAQ structured data, sitemap, robots.txt, favicon

---

## 2) Kya kya fix aur add hua

### 🐞 Bugs jo fix hue

| # | Masla | Fix |
|---|-------|-----|
| 1 | **Background bilkul black/white tha** — page ka solid rang background layer ke **upar** paint ho raha tha, is liye animation nazar hi nahi aati thi | Stacking-context fix (`isolate`) + naya animated background |
| 2 | **Dark/Light button adha kaam karta tha** — Tailwind v4 mein `dark:` classes sirf computer ki setting dekhti hain | `@custom-variant dark` add kiya, ab button se poori site badalti hai |
| 3 | **Images production mein toot jati** (`/src/assets/...` sirf dev mein chalta hai) | Images ab proper `import` se aati hain; size 800KB → ~150KB |
| 4 | **Contact form fake tha** (sirf 0.6 sec ka timer, data kahin nahi jata tha) | Ab `/api/contact` par jata hai, database mein save + email |
| 5 | Contact form ki default service dropdown ki list mein hi nahi thi | Sahi default value |
| 6 | **Chatbot Gemini ko pehla message "model" ka bhej raha tha** (Gemini error deta hai) | Welcome message hata kar sahi history bheji jati hai |
| 7 | **Microphone ke baad purani chat history use hoti thi** (stale closure bug) | `useRef` se hamesha latest history |
| 8 | Microphone ka `audio/webm;codecs=opus` format Gemini ko reject hota tha | Server mime type saaf karta hai |
| 9 | `gemini-3.5-transcribe` naam Google ki model list mein nahi hai | Ab wohi chat model audio samajhta hai; naam `.env` se badal sakte hain |
| 10 | Voice greeting: **Mute button kuch nahi karta tha**, Replay kabhi kabhi resume ho jata tha | Dono theek |
| 11 | `animate-in`, `fade-in`, `no-scrollbar` classes exist hi nahi karti thin (plugin install nahi tha) | Chhoti CSS add ki, ab animations chalte hain |
| 12 | `npm start` production mein nahi chalta tha (`NODE_ENV` set nahi hota) aur Windows par problem | `npm start` ab seedha production mode mein chalta hai |
| 13 | `tsx` devDependency tha → hosting par `npm start` fail ho sakta tha | `dependencies` mein move |
| 14 | `tsconfig` mein Node types nahi the → `npm run lint` fail | Fix |
| 15 | Language switch par `<html lang/dir>` update nahi hota tha | Ab hota hai |
| 16 | Popup (Privacy/Terms) Escape se band nahi hota tha | Escape + background scroll lock |
| 17 | Navbar ke neeche section ka title chhup jata tha | `scroll-margin-top` |

### ✨ Naye features

- Real database (SQLite) + email notification + admin page + CSV export
- Spam protection: hidden honeypot field + rate limit (ek visitor 10 min mein 5 form, chat mein 20 msg/min)
- Server-side validation (naam, phone, email)
- Basic security headers
- `/api/health` (hosting ke liye)
- Scroll progress bar, back-to-top, favicon, sitemap, robots.txt
- Enquiry ke success screen par WhatsApp button pehle se mojood tha — ab real submit ke baad dikhta hai

> ⚠️ **Zaroori note:** Ye project mere paas internet ke baghair check hua (npm install / build chal nahi sakta tha). Maine code ki syntax check ki aur database module ka real test kiya, lekin **pehli baar aap khud `npm install` aur `npm run dev` chalayen** (section 4). Agar koi error aaye to uska screenshot/text bhej dein, main theek kar dunga.

---

## 3) Computer par zaroori cheezein install karein

1. **Node.js 22 (LTS)** → https://nodejs.org → "LTS" download karein → Next, Next, Finish.
   Check karein: Command Prompt kholein aur likhein
   ```
   node -v
   ```
   Jawab `v22...` (ya us se bara) hona chahiye. **v18 / v20 nahi chalega** (database ke liye 22 chahiye).
2. **VS Code** (code editor) → https://code.visualstudio.com
3. **Git** → https://git-scm.com/downloads (default options ke saath install)

---

## 4) Local (apne computer par) run karein

1. Zip ko **Extract** karein (Right click → Extract All). Folder ka naam masalan `belc-sambrial`.
2. VS Code kholein → **File → Open Folder** → `belc-sambrial` select karein.
3. Menu: **Terminal → New Terminal**.
4. Ye commands **ek ek karke** chalayen:

```bash
npm install
```
(2–5 minute lag sakte hain. Internet chahiye.)

5. Settings file banayein:
   - Windows: `copy .env.example .env`
   - Mac/Linux: `cp .env.example .env`

   Phir VS Code mein `.env` file kholein aur values bharein (sections 5, 6, 7 dekhein). Pehli dafa **kuch na bharein to bhi website chalegi** (chatbot WhatsApp wala jawab dega).

6. Website chalayein:

```bash
npm run dev
```

7. Browser mein kholein: **http://localhost:3000** 🎉

Band karne ke liye terminal mein `Ctrl + C`.

### Production jaisa test (build)

```bash
npm run build
npm start
```
Phir se http://localhost:3000 par dekhein. Hosting par bhi yehi commands chalti hain.

---

## 5) Gemini AI key lagana (free)

1. https://aistudio.google.com/apikey par Google account se login karein.
2. **Create API key** dabayein, key copy karein.
3. `.env` file mein:
   ```
   GEMINI_API_KEY="yahan-apni-key-paste-karein"
   ```
4. Server band karke dobara `npm run dev` chalayein. Terminal mein likha aana chahiye: `Chatbot: Gemini ON`.

🔒 Key **sirf server** par rehti hai (browser ko nahi dikhti). Key kisi ko na dein, GitHub par na daalein. Free plan ki limits hoti hain; zyada visitors hon to Google ki pricing page dekhein.

Agar Google kabhi model ka naam badal de to `.env` mein `GEMINI_MODEL="naya-naam"` likh dein (naam yahan milte hain: https://ai.google.dev/gemini-api/docs/models).

---

## 6) Contact form ki email setup (Gmail)

Jab koi student form bharta hai to academy ki email par message aata hai. Iske liye Gmail ka **App Password** chahiye:

1. Us Gmail account (`mqtaiyabi@gmail.com`) mein **2-Step Verification ON** karein: https://myaccount.google.com/security
2. Phir https://myaccount.google.com/apppasswords kholein, naam likhein `BELC website`, **Create** dabayein.
3. 16 letters ka password milega (spaces hata kar likhein).
4. `.env` mein:
   ```
   SMTP_USER="mqtaiyabi@gmail.com"
   SMTP_PASSWORD="abcdabcdabcdabcd"
   CONTACT_EMAIL="mqtaiyabi@gmail.com"
   ```
5. Server restart karein, website par form bhar kar test karein. Email **Spam** folder mein bhi dekh lein.

> Email na bhi set ho to enquiry **database mein save** hoti hai aur admin page par nazar aati hai.

---

## 7) Admin page — enquiries dekhna

1. `.env` mein ek lamba random password likhein:
   ```
   ADMIN_KEY="MeraBohatLambaPassword2026!"
   ```
2. Server restart karein.
3. Browser mein kholein: **http://localhost:3000/admin** (online ho to `https://aapka-domain.com/admin`)
4. Wohi key likhein → **Open**. Table mein saari enquiries aa jayengi, phone number par click karein to seedha WhatsApp khulega.
5. **Download CSV** se Excel file mil jati hai.

---

## 8) Database kaise kaam karti hai

**Database = data ka sanduq.** Yahan har enquiry (naam, phone, program, message) save hoti hai.

Is project mein **SQLite** use hui hai:
- Koi alag software install nahi karna.
- Poori database **ek file** hai: `data/belc.sqlite` (pehli dafa server chalne par khud ban jati hai).
- Is file ko copy kar lein = backup ✅.
- Dekhne ke liye free tool: **DB Browser for SQLite** (https://sqlitebrowser.org) — file open karein, table `enquiries`.

### ⚠️ Hosting aur database — ye zaroor samajh lein

| Hosting | SQLite file ka kya hota hai |
|---------|-----------------------------|
| **Apna VPS / paid server** (disk permanent) | ✅ File hamesha rehti hai |
| **Free hosting** (Render free, etc.) | ❌ Disk **temporary** hota hai. Redeploy / restart par file ud sakti hai |

Free hosting par bhi aap safe rehte hain, kyunke **har enquiry email par bhi jati hai** (section 6). Is liye **free hosting par email zaroor set karein.**

### Permanent online database chahiye (free plan ke saath)?
Ye free options hain (har ek ka free plan hota hai, shartein badalti rehti hain):
- **Neon** (PostgreSQL) — https://neon.tech
- **Supabase** (PostgreSQL) — https://supabase.com
- **Turso** (SQLite online) — https://turso.tech
- **MongoDB Atlas** — https://mongodb.com/atlas

Inme se kisi par shift karna ho to bas `server/db.ts` file badalni hoti hai (3 functions: `initDb`, `saveEnquiry`, `listEnquiries`). Baqi website same rehti hai. Chahein to mujhse kehein, main aapke liye Neon/Supabase version bana dunga.

---

## 9) Git aur GitHub par upload karna

**Git** = code ka "save history" tool. **GitHub** = online jagah jahan code rakha jata hai (hosting ke liye bhi chahiye).

### Pehli dafa (sirf ek baar)

1. https://github.com par free account banayein.
2. **New repository** dabayein → Name: `belc-sambrial` → **Private** (ya Public) → "Add README" ka tick **na** lagayein → Create.
3. VS Code terminal mein (project folder ke andar):

```bash
git config --global user.name "Aapka Naam"
git config --global user.email "aapki-email@gmail.com"

git init
git add .
git commit -m "First version of BELC website"
git branch -M main
git remote add origin https://github.com/AAPKA-USERNAME/belc-sambrial.git
git push -u origin main
```
(Push par browser login mang sakta hai — login kar dein.)

### Baad mein har tabdeeli ke baad

```bash
git add .
git commit -m "Fees update kiye"
git push
```

### 🔒 Safety check
- `.env` file **GitHub par nahi jati** (`.gitignore` rok deta hai). Github par repository kholein aur confirm karein ke `.env` nazar **nahi** aa rahi.
- Agar galti se key upload ho jaye to foran Google AI Studio se **key delete karke nayi banayein** aur Gmail App Password bhi dobara banayein.

---

## 10) Website online host karna (Free aur Paid)

> ⚠️ Is website ke saath **ek server** (Express) bhi hai (chatbot, form, database). Is liye sirf "static hosting" (GitHub Pages, Netlify drop) kaafi nahi. Aisi hosting chahiye jo **Node.js** chalaye.

Har jagah ye 3 cheezein same hain:

| Cheez | Value |
|-------|-------|
| Build command | `npm install && npm run build` |
| Start command | `npm start` |
| Node version | 22 |

Environment variables (hosting ke dashboard mein daalni hain — `.env` file upload nahi hoti):
`GEMINI_API_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_EMAIL`, `ADMIN_KEY`

### 🅰️ FREE: Render.com (beginner ke liye sab se aasan)

1. Pehle code GitHub par daalein (section 9).
2. https://render.com → GitHub se Sign up.
3. **New + → Web Service** → apni `belc-sambrial` repository select karein.
4. Settings:
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. **Environment Variables** mein upar wali values daalein, plus `NODE_VERSION` = `22`.
6. **Create Web Service** dabayein. 3–6 minute baad link milega: `https://belc-sambrial.onrender.com`
7. Health check ke liye `https://...onrender.com/api/health` kholein — `ok: true` aana chahiye.

Free plan ki baatein (shartein badal sakti hain, Render ki site dekhein):
- Kuch der koi visitor na aaye to site "so" jati hai; agla visitor pehli dafa 30–60 sec intezar karta hai.
- Disk temporary hai (section 8) — **email zaroor set karein.**

### 🅱️ Free/Trial alternatives
- **Railway** (https://railway.app) — aasan, magar aam tor par sirf trial credit milta hai.
- **Fly.io**, **Koyeb** — free/trial tiers badalte rehte hain, unki site check karein.

### 💰 PAID (professional, asli business website ke liye behtar)

**Option 1: VPS (DigitalOcean / Hetzner / Contabo / Hostinger VPS)** — har mahine chhoti si fees; poora control; SQLite file permanent.

Ubuntu server par (SSH se connect karke):
```bash
# 1) Node 22 install
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# 2) Code download
git clone https://github.com/AAPKA-USERNAME/belc-sambrial.git
cd belc-sambrial
nano .env          # apni values likhein (Ctrl+O, Enter, Ctrl+X)
npm install
npm run build

# 3) Hamesha chalta rakhne ke liye
sudo npm install -g pm2
pm2 start "npm start" --name belc
pm2 save
pm2 startup        # jo command dikhaye wo chala dein
```
Nginx se domain jodna (file `/etc/nginx/sites-available/belc`):
```nginx
server {
  server_name aapka-domain.com www.aapka-domain.com;
  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/belc /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
# Free HTTPS (padlock):
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d aapka-domain.com -d www.aapka-domain.com
```
Update karne ke liye server par: `git pull && npm install && npm run build && pm2 restart belc`

**Option 2: Paid Render / Railway plan** — disk (persistent storage) add kar ke `DATA_DIR` us disk ki taraf kar dein.

### Kaun sa chunein?
- Seekhna / test karna → **Render Free**
- Asli business website, domain ke saath → **VPS** (ya paid Render + disk)

---

## 11) Apna domain (www.yourname.com) lagana

1. Domain kharidein (Namecheap, GoDaddy, Cloudflare, Hostinger…). `.com` aam tor par saal ke chand dollar; `.pk` ke liye Pakistani registrars (PKNIC reseller) dekhein.
2. **Render par:** Service → **Settings → Custom Domains → Add** → domain likhein → Render jo **CNAME / A record** batayega wo domain ke **DNS settings** mein daal dein. HTTPS khud lag jata hai.
3. **VPS par:** domain ke DNS mein **A record** → server ka IP. Phir upar wala `certbot` command.
4. DNS ko 5 minute se 24 ghante lag sakte hain.
5. Phir 2 files mein `YOUR-DOMAIN.com` badal dein:
   - `public/robots.txt`
   - `public/sitemap.xml`
   - aur `index.html` mein `belcsambrial.com` wali jagah (FAQ structured data) apne asli domain se.
6. https://search.google.com/search-console par site add karein taake Google par aaye.

---

## 12) Content change karna

| Kya badalna hai | Kahan |
|-----------------|-------|
| Phone, WhatsApp, email, address, timings, map | `src/data/academy.ts` → `identity` |
| Courses, fees text, faculty, Umrah, visa, FAQs | `src/data/academy.ts` |
| Director ki photo | `src/assets/images/director_...jpg` (naam wohi rakhein ya `academy.ts` ke import mein naam badlein) |
| Hero aur Umrah ki photo | `src/assets/images/` |
| Chatbot ko kya aata hai / uska andaz | `server.ts` → `BELC_SYSTEM_INSTRUCTION` |
| Facebook / Instagram / YouTube links | `src/data/academy.ts` → `socials` (abhi placeholder hain, asli links daalein) |
| Background ki raftar / bijli ka waqfa | `src/components/AnimatedBackground.tsx` (`nextStrike = now + 5000 + ...` ms) |
| Rang | Tailwind classes (`red-600` → `blue-600` waghera) |

Tabdeeli ke baad: `git add . && git commit -m "update" && git push` — Render khud dobara deploy kar deta hai.

---

## 13) Aksar aane wale masail (Troubleshooting)

| Masla | Hal |
|-------|-----|
| `node -v` v22 se kam dikhata hai | Node 22 LTS dobara install karein, terminal band karke naya kholein |
| `'npm' is not recognized` | Node install ke baad VS Code / PC restart |
| `npm install` ke dauran error | Internet check karein; `node_modules` folder aur `package-lock.json` delete karke dobara `npm install` |
| `Port 3000 is already in use` | `.env` mein `PORT=3001` likhein |
| Chatbot sirf WhatsApp wala jawab deta hai | `GEMINI_API_KEY` sahi bharein; restart; terminal mein "Gemini ON" dekhein |
| Chatbot error / purani model | `.env` mein `GEMINI_MODEL` Google ki model list ke mutabiq badlein |
| Microphone kaam nahi karta | Sirf `localhost` ya **https** par chalta hai; browser mein mic permission Allow karein |
| Urdu awaaz nahi aati | Aap ke device mein Urdu voice install nahi; "Transcript" button se likha hua matn parh sakte hain |
| Form bharne par error | Phone number sahi likhein (`0300-1234567`); terminal ke messages dekhein |
| Email nahi aati | Normal password nahi, **App Password** chahiye; 2-Step Verification ON hona zaroori; Spam folder |
| `/admin` "disabled" kehta hai | `.env` mein `ADMIN_KEY` set karein aur restart |
| `The "dist" folder is missing` | Pehle `npm run build`, phir `npm start` |
| Render par site khulne mein der | Free plan so jata hai, pehla visit slow hota hai |
| Background nazar nahi aata | Windows "Animation effects" band to nahi? (`prefers-reduced-motion` ON ho to animation band rehti hai — ye accessibility ke liye jaan boojh kar hai) |
| Phone slow hai | Animation phone par khud kam particles/items use karti hai |

---

## 14) Folder structure

```
belc-sambrial/
├── server.ts              ← Express server: chatbot, voice, form, admin, website serve
├── server/db.ts           ← Database (SQLite)
├── index.html             ← Website ka pehla page, SEO data
├── package.json           ← Libraries aur commands
├── vite.config.ts         ← Build tool settings
├── .env.example           ← Settings ka namoona (copy karke .env banayein)
├── .nvmrc                 ← Node version (22)
├── public/                ← favicon, robots.txt, sitemap.xml
├── data/                  ← (khud banta hai) belc.sqlite database
└── src/
    ├── main.tsx           ← Start point
    ├── App.tsx            ← Saare sections yahan jure hain, theme/language
    ├── index.css          ← Global styles + animations
    ├── data/academy.ts    ← 📌 Saara content (courses, phone, faculty…)
    ├── assets/images/     ← Photos
    └── components/
        ├── AnimatedBackground.tsx   ← ⚡ thunder, particles, pencils/books
        ├── ThunderCursorCanvas.tsx  ← mouse ke peeche bijli
        ├── Chatbot.tsx, VoiceAssistant.tsx, ContactSection.tsx
        ├── Navbar.tsx, VerticalDotNav.tsx, ScrollExtras.tsx, Footer.tsx
        └── Hero / About / Courses / AIBootcamp / Visa / Umrah / Director / Staff / Campus sections
```

### Useful commands

| Command | Kaam |
|---------|------|
| `npm install` | Libraries download |
| `npm run dev` | Development mode (live reload) |
| `npm run build` | Production files banata hai (`dist/`) |
| `npm start` | Production server chalata hai (pehle build) |
| `npm run lint` | Code mein type errors check |

---

Allah aap ke kaam mein barkat de. 🤲 Koi masla aaye to error ka text mujhe bhej dein.
