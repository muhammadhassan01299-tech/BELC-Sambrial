/**
 * BELC - Bismillah English Language Club, Sambrial
 * Centralized Academy Data Architecture
 * All business details, courses, faculty, packages, and translations.
 */

import directorImage from '../assets/images/director_muhammad_qasim_1791022906171.jpg';

export interface Course {
  id: string;
  category: 'english' | 'computer' | 'ai';
  title: string;
  urduTitle: string;
  badge: string;
  duration: string;
  timing: string;
  mode: string;
  feeNotice: string;
  shortDesc: string;
  urduShortDesc: string;
  modules: string[];
  features: string[];
  popular?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  urduRole: string;
  qualification: string;
  department: string;
  experience: string;
  bio: string;
  avatarColor: string;
  initials: string;
}

export interface VisaProgram {
  id: string;
  country: string;
  title: string;
  badge: string;
  programs: string[];
  benefits: string[];
  description: string;
}

export interface UmrahPackage {
  id: string;
  name: string;
  duration: string;
  type: string;
  hotelMakkah: string;
  hotelMadinah: string;
  inclusions: string[];
  disclaimer: string;
  lastUpdated: string;
}

export const ACADEMY_DATA = {
  identity: {
    officialName: 'Bismillah English Language Club',
    shortName: 'BELC Sambrial',
    tagline: 'Leading Academy for Language Excellence, Computer Skills, AI & Study Abroad',
    urduTagline: 'انگلش لینگویج، کمپیوٹر، آرٹیفیشل انٹیلیجنس اور اسٹڈی ویزا کا بااعتماد ادارہ',
    establishedYear: 2015,
    city: 'Sambrial',
    district: 'Sialkot',
    province: 'Punjab, Pakistan',
    address: '1st Floor, Kayseria Building, Main Bazar / Wazirabad Road, Sambrial, Sialkot, Punjab',
    urduAddress: 'فرسٹ فلور، قیصریہ بلڈنگ، سمبڑیال، ضلع سیالکوٹ، پنجاب',
    googleMapsUrl: 'https://www.google.com/maps/@32.4782092,74.3522176,16z',
    googleMapsEmbed: 'https://maps.google.com/maps?q=32.4782092,74.3522176&z=16&output=embed',
    operatingHours: 'Monday – Saturday: 9:00 AM to 6:00 PM (Closed Sundays)',
    urduHours: 'پیر تا ہفتہ: صبح 9:00 بجے تا شام 6:00 بجے',
    phone: '+92 334 8073431',
    whatsapp: '+92 334 8073431',
    rawWhatsapp: '923348073431',
    alternatePhone: '+92 311 7763164',
    rawAlternatePhone: '923117763164',
    email: 'mqtaiyabi@gmail.com',
    socials: {
      tiktok: 'https://www.tiktok.com/@belc_sambrial',
      tiktokHandle: '@belc_sambrial',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
    },
  },

  director: {
    name: 'Sir Muhammad Qasim',
    urduName: 'سر محمد قاسم',
    title: 'Founder & Managing Director',
    subTitle: 'Senior IELTS & PTE Master Trainer | Study Abroad Advisor',
    urduTitle: 'بانی و مینیجنگ ڈائریکٹر، سینئر آئیلٹس و پی ٹی ای ٹرینر',
    experience: '10+ Years of Academic & Language Leadership',
    image: directorImage,
    quote: 'Our goal at BELC is to break language barriers, impart real technical skills, and open global opportunities for the youth of Sambrial and beyond.',
    urduQuote: 'ہمارا مقصد سمبڑیال کے نوجوانوں کو زبان کی رکاوٹوں سے نکال کر جدید ٹیکنالوجی اور عالمی مواقع سے ہمکنار کرنا ہے۔',
    bio: 'Sir Muhammad Qasim is an esteemed language pedagogue and mentor who established BELC in 2015. Under his direct personal supervision, thousands of students from Sambrial, Daska, Wazirabad, and Sialkot have achieved 7.0+ IELTS band scores, cleared PTE Academic with flying colours, and secured study visas for MBBS and top global degrees in China, the UK, and Europe.',
    highlights: [
      'Personal attention and individualized diagnostic feedback for every student',
      'Over a decade of trusted coaching in listening, reading, writing, and speaking',
      'Specialized expertise in China MBBS admissions & foreign university placement',
      'Pioneer of cutting-edge AI & Vibe Coding curriculum in Sambrial',
    ],
  },

  voiceAssistant: {
    language: 'ur-PK',
    scriptUrdu: 'بسم اللہ انگلش لینگویج کلب سمبڑیال میں خوش آمدید۔ سر محمد قاسم اور ماہر اساتذہ کی زیرِ نگرانی آئیلٹس، پی ٹی ای، سپوکن انگلش، جدید اے آئی بوٹ کیمپ، اسٹڈی ویزا اور عمرہ سروسز کے لیے ہم آپ کی خدمت میں حاضر ہیں۔ مزید معلومات کے لیے واٹس ایپ پر رابطہ کریں۔',
    scriptEnglish: 'Welcome to Bismillah English Language Club (BELC) Sambrial. Under the supervision of Sir Muhammad Qasim and expert faculty, we offer IELTS, PTE, Spoken English, AI Bootcamp, Study Visa assistance, and Umrah services. Feel free to contact us on WhatsApp.',
  },

  courses: [
    {
      id: 'ielts-prep',
      category: 'english',
      title: 'IELTS Preparation (Academic & General)',
      urduTitle: 'آئیلٹس تیاری (اکیڈمک اور جنرل)',
      badge: 'Most Popular',
      duration: '2 to 4 Months (Flexible)',
      timing: '04:00 PM – 06:00 PM Batch',
      mode: 'Onsite Multimedia Lab + Online Batches',
      feeNotice: 'Contact us for current fee',
      shortDesc: 'Comprehensive preparation for high band scores (7.0+) covering all 4 modules with weekly mock exams and audio listening drills.',
      urduShortDesc: 'سننے، پڑھنے، لکھنے اور بولنے کی مکمل تربیت، ہفتہ وار ٹیسٹ اور برٹش کونسل پیٹرن پر تیاری۔',
      modules: [
        'Listening: Dedicated headphone lab & accent training',
        'Reading: Skimming, scanning & speed analysis techniques',
        'Writing: Task 1 graph/letter structures & Task 2 band-8 essays',
        'Speaking: One-on-one interview drills & hesitation removal',
      ],
      features: [
        'Authentic Cambridge practice tests',
        'Individual band evaluation & feedback',
        'Air-conditioned smart classroom',
        'BELC Course Completion Certificate',
      ],
      popular: true,
    },
    {
      id: 'pte-academic',
      category: 'english',
      title: 'PTE Academic Masterclass',
      urduTitle: 'پی ٹی ای اکیڈمک ماسٹرکلاس',
      badge: 'High Success Rate',
      duration: '2 to 4 Months',
      timing: 'Daily 04:00 PM Batch',
      mode: 'Onsite Computerized Lab + Online',
      feeNotice: 'Contact us for current fee',
      shortDesc: 'Complete Pearson Test of English training on specialized software with AI-scoring algorithm tips and proven speaking templates.',
      urduShortDesc: 'کمپیوٹر بیسڈ ٹیسٹ کے جدید ترین اسکورنگ الگورتھم کے مطابق مستند سافٹ ویئر پر پریکٹس۔',
      modules: [
        'Speaking: Read Aloud, Repeat Sentence & Describe Image tricks',
        'Writing: Summarize Written Text & Write Essay templates',
        'Reading: Fill in the Blanks, Re-order Paragraph mastery',
        'Listening: Write from Dictation & Highlight Incorrect Words',
      ],
      features: [
        'Individual computer terminals for each student',
        'AI speech scoring calibration',
        'Extensive prediction materials',
        'Flexible practice slots',
      ],
      popular: true,
    },
    {
      id: 'spoken-english',
      category: 'english',
      title: 'Spoken English & Fluency Mastery',
      urduTitle: 'اسپوکن انگلش و خود اعتمادی',
      badge: 'Zero to Fluent',
      duration: '2 to 3 Months',
      timing: 'Afternoon: 02:00 PM – 04:00 PM | Evening: 04:00 PM – 06:00 PM',
      mode: 'Onsite Interactive Classroom',
      feeNotice: 'Contact us for current fee',
      shortDesc: 'Eliminate hesitation and build fluent conversation skills for interviews, professional workplaces, and everyday global communication.',
      urduShortDesc: 'جھجھک اور ڈر کا خاتمہ، روزمرہ گفتگو، انٹرویو سکلز اور پبلک اسپیکنگ کی عملی پریکٹس۔',
      modules: [
        'Daily conversational drills & role-play dialogues',
        'Practical English grammar without tedious memorization',
        'Correct pronunciation, accent reduction & tone modulation',
        'Job interview preparation & public presentation skills',
      ],
      features: [
        'Interactive stage presentations',
        'Friendly supportive learning culture',
        'Separate and comfortable batches',
        'BELC Spoken English Certificate',
      ],
    },
    {
      id: 'toefl-duolingo',
      category: 'english',
      title: 'TOEFL & Duolingo English Test (DET)',
      urduTitle: 'ٹافل اور ڈولنگو ٹیسٹ پریپ',
      badge: 'Fast-Track',
      duration: '1 to 2 Months Fast-Track',
      timing: 'Flexible Lab Schedule',
      mode: 'Onsite Lab + Hybrid',
      feeNotice: 'Contact us for current fee',
      shortDesc: 'Fast-track preparation for international university admissions accepting Duolingo and TOEFL iBT exams.',
      urduShortDesc: 'ڈولنگو اور ٹافل کے تیز رفتار اسکور کے لیے مخصوص کمپیوٹر ٹیسٹ پریکٹس۔',
      modules: [
        'Duolingo adaptive test algorithm mastery',
        'Production subscore enhancement (Speaking/Writing)',
        'TOEFL integrated speaking and listening tasks',
        'Timed computer mock tests',
      ],
      features: [
        'Rapid preparation strategies',
        'Computer lab with high-speed internet',
        'Personalized score targets (115+ DET / 90+ TOEFL)',
        'BELC Test Certificate',
      ],
    },
    {
      id: 'ai-bootcamp-flagship',
      category: 'ai',
      title: '8-Week Flagship AI Bootcamp',
      urduTitle: '8 ہفتوں کا جدید اے آئی بوٹ کیمپ',
      badge: 'Next-Gen 2026',
      duration: '8 Weeks (Intensive Hands-on)',
      timing: 'Special Weekend & Evening Cohorts',
      mode: 'Onsite High-Tech Lab + Live Cloud Workspaces',
      feeNotice: 'Contact us for current fee (Limited Seats)',
      shortDesc: 'Learn AI. Build with AI. Work with AI. Master AI video generation, prompt engineering, vibe coding, AI agents, and no-code apps.',
      urduShortDesc: 'ویڈیو جنریشن، پرامپٹ انجینئرنگ، وائب کوڈنگ، آٹومیشن اور بغیر کوڈنگ سافٹ ویئر بنانا سیکھیں۔',
      modules: [
        'Week 1–2: Advanced Prompt Engineering with ChatGPT, Gemini & Claude models',
        'Week 3–4: Cinematic AI Video Generation (Midjourney, Runway, Kling & ElevenLabs)',
        'Week 5–6: "Vibe Coding" & Modern AI Software Development with Cursor & Windsurf',
        'Week 7: AI Automation, Business Agents & No-Code workflows (Make, n8n, Zapier)',
        'Week 8: Capstone Project: Launch your live web app / monetized digital product',
      ],
      features: [
        'Zero coding background required to start',
        'Build real-world client-ready software and media',
        'High-spec computer lab access in Sambrial',
        'BELC Certified AI Practitioner Diploma',
      ],
      popular: true,
    },
    {
      id: 'office-management',
      category: 'computer',
      title: 'Modern Office Management & IT Basics',
      urduTitle: 'ماڈرن آفس مینجمنٹ و کمپیوٹر کورس',
      badge: 'Job Ready',
      duration: '2 to 3 Months',
      timing: 'Morning & Afternoon Batches',
      mode: 'Onsite Practical Lab',
      feeNotice: 'Contact us for current fee',
      shortDesc: 'Hands-on training in MS Word, Excel, PowerPoint, professional email drafting, fast typing, and modern cloud office tools.',
      urduShortDesc: 'مائیکروسافٹ آفس، تیز ترین ٹائپنگ، دفتری خط و کتابت اور کمپیوٹر کا بنیادی علم۔',
      modules: [
        'MS Word: Reports, formatting, certificates & legal documentation',
        'MS Excel: Data analysis, accounting formulas, charts & bookkeeping',
        'MS PowerPoint: Professional business and educational pitch decks',
        'Touch typing speed building & internet safety essentials',
      ],
      features: [
        'Dedicated PC per student',
        '100% practical assignments',
        'Government & private job preparation',
        'BELC IT Diploma Certificate',
      ],
    },
    {
      id: 'online-earning',
      category: 'computer',
      title: 'Online Earning & Freelancing Mastery',
      urduTitle: 'آن لائن ارننگ و فری لانسنگ',
      badge: 'High ROI',
      duration: '2 to 3 Months',
      timing: 'Evening Batches',
      mode: 'Onsite Mentorship + Online',
      feeNotice: 'Contact us for current fee',
      shortDesc: 'Turn your computer and English skills into international income on Upwork, Fiverr, and remote work marketplaces.',
      urduShortDesc: 'اپ ورک اور فائیور پر پروفائل بنانا، انٹرنیشنل کلائنٹس سے پروجیکٹس لینا اور ڈالر کمانا۔',
      modules: [
        'Fiverr & Upwork profile optimization and portfolio showcase',
        'Writing winning client proposals that win contracts',
        'Client communication in fluent professional English',
        'Payment gateways, Payoneer setup & local bank withdrawals',
      ],
      features: [
        'Live client proposal reviews',
        'Account approval assistance',
        'Real-time mentorship from active freelancers',
        'BELC Freelancing Certificate',
      ],
    },
  ],

  visaServices: [
    {
      id: 'china-mbbs',
      country: 'China',
      title: 'China Study Visa & MBBS / Engineering Admissions',
      urduTitle: 'چائنا اسٹڈی ویزا اور ایم بی بی ایس داخلے',
      badge: 'Direct Admission Assistance',
      description: 'Specialized admission guidance and visa processing for WHO/PMDC-recognized medical universities and scholarship-backed engineering institutes in China.',
      urduDescription: 'ڈاکٹر بننے کا خواب پورا کریں — پی ایم ڈی سی اور ڈبلیو ایچ او سے منظور شدہ یونیورسٹیز میں کم خرچ پر داخلہ۔',
      programs: [
        'MBBS in English Medium (WHO / PMDC Recognized)',
        'BSc Engineering & Computer Science (Belt & Road Scholarships)',
        'Master’s & Doctoral Degree Full Scholarships',
        'Foundation Language Programs',
      ],
      benefits: [
        'Affordable tuition fees compared to private colleges in Pakistan',
        'High visa success record through official university invitations (JW202)',
        'Halal food facilities and safe, modern international hostels',
        'Complete end-to-end guidance by Sir Muhammad Qasim',
      ],
    },
    {
      id: 'global-study-abroad',
      country: 'UK, Australia, Canada, Europe',
      title: 'Global University Admissions & Visa Guidance',
      urduTitle: 'برطانیہ، آسٹریلیا، کینیڈا و یورپ اسٹڈی ویزا رہنمائی',
      badge: 'Expert Advisory',
      description: 'Transparent profile evaluation, university selection, Statement of Purpose (SOP) vetting, and comprehensive visa file preparation.',
      urduDescription: 'انٹرنیشنل یونیورسٹیوں میں داخلہ، ایس او پی رائٹنگ اور مکمل ویزا فائل تیار کرنے کی قانونی رہنمائی۔',
      programs: [
        'Undergraduate & Postgraduate Degree Programs',
        'Fast-Track Foundation & Pre-Master Pathways',
        'Spouse and Dependent Study Visa Guidance',
      ],
      benefits: [
        'Direct alignment with your IELTS / PTE scores from BELC',
        'Transparent documentation review without false claims',
        'Mock embassy interview preparation with Sir Qasim',
        'Assistance with bank statement and affidavit requirements',
      ],
    },
  ],

  visaDisclaimer: 'Disclaimer: BELC Study Advisors provides legitimate educational consulting, admissions guidance, and visa file preparation. Visa issuance authority rests solely with the sovereign embassies and consulates of the respective countries. We do not provide immigration guarantees or fabricate documentation.',
  urduVisaDisclaimer: 'وضاحت: بی ایل سی اسٹڈی ایڈوائزرز صرف تعلیمی مشاورت، داخلے اور ویزا فائل کی رہنمائی فراہم کرتا ہے۔ ویزا کا اجرا مکمل طور پر متعلقہ سفارت خانے کے صوابدید پر ہوتا ہے۔ ہم کوئی غیر قانونی دعویٰ نہیں کرتے۔',

  umrahServices: {
    title: 'Customized Spiritual Umrah Services',
    urduTitle: 'مقدس عمرہ پیکیجز و رہنمائی',
    tagline: 'Comfortable, transparent, and spiritually enriching Umrah travel for you and your family.',
    urduTagline: 'آپ کے اور آپ کی فیملی کے لیے شفاف، پرسکون اور معیاری عمرہ انتظامات۔',
    lastUpdated: 'Season 2026',
    packages: [
      {
        id: 'umrah-custom',
        name: 'Customized Individual & Family Umrah',
        duration: '15 / 21 / 28 Days Flexible',
        type: 'Tailored to your budget',
        hotelMakkah: '3★ / 4★ / 5★ Hotels near Haram (Clock Tower / Ajyad / Ibrahim Khalil)',
        hotelMadinah: 'Walking distance hotels near Markazia / Masjid an-Nabawi',
        inclusions: [
          'Direct Umrah eVisa issuance',
          'Confirmed Return Air Tickets (Lahore/Sialkot to Jeddah/Madinah)',
          'Air-conditioned private or shared luxury transport',
          'Historical Ziyarat tours in Makkah & Madinah with guide',
          '24/7 dedicated local assistance in Saudi Arabia',
        ],
        disclaimer: 'Hotels and flight seats are subject to availability at the time of booking.',
        lastUpdated: 'October 2026',
      },
      {
        id: 'umrah-vip',
        name: 'VIP Executive Umrah Experience',
        duration: '10 to 15 Days',
        type: '5-Star Luxury',
        hotelMakkah: 'Clock Tower / Front-line Haram view 5★ Hotels',
        hotelMadinah: 'Northern Central 5★ Luxury suites facing Nabawi courtyard',
        inclusions: [
          'Priority VIP Visa clearance',
          'Private GMC / High-end SUV transfers airport & intercity',
          'Buffet breakfast included at hotel suites',
          'Exclusive private Ziyarat with experienced scholar',
          'Special wheelchair & elderly assistance if required',
        ],
        disclaimer: 'Rates vary based on peak seasons (Ramadan / Rabi ul Awwal / Winter vacations).',
        lastUpdated: 'October 2026',
      },
    ],
    mandatoryDisclaimer: 'Mandatory Travel Notice: Prices, flight availability, hotel proximity, and travel arrangements may change due to seasonal airline tariffs, Saudi regulatory updates, and currency fluctuations. Please confirm the latest verified details with BELC before final booking.',
    urduMandatoryDisclaimer: 'ضروری سفری نوٹ: فلائٹس، ہوٹلز کی دوری اور نرخ سیزن کے مطابق تبدیل ہو سکتے ہیں۔ حتمی بکنگ سے قبل بی ایل سی ٹیم سے موجودہ شیڈول اور ریٹس کی تصدیق لازماً فرمائیں۔',
  },

  faculty: [
    {
      id: 'staff-1',
      name: 'Faculty Lead — IELTS Academic',
      urduName: 'سینئر آئیلٹس انسٹرکٹر',
      role: 'Senior IELTS Academic Trainer',
      urduRole: 'ہیڈ آف آئیلٹس ڈیپارٹمنٹ',
      department: 'English Language Division',
      qualification: 'M.A. English, Certified IELTS Specialist',
      experience: '7+ Years Teaching Experience',
      bio: 'Specialist in Reading comprehension hacks and Task 2 analytical essay structuring. Known for patient student mentorship and diagnostic score auditing.',
      avatarColor: 'bg-red-600',
      initials: 'IA',
    },
    {
      id: 'staff-2',
      name: 'Faculty Lead — PTE Computerized',
      urduName: 'پی ٹی ای ٹرینر',
      role: 'PTE Academic Specialist',
      urduRole: 'پی ٹی ای لیب کوآرڈینیٹر',
      department: 'English Language Division',
      qualification: 'PTE 85+ Scorer, M.Sc. IT',
      experience: '5+ Years Lab Mentoring',
      bio: 'Expert in computerized microphone phonetics, oral fluency scoring models, and Pearson mock test predictive grading.',
      avatarColor: 'bg-zinc-800',
      initials: 'PT',
    },
    {
      id: 'staff-3',
      name: 'Faculty Lead — Spoken English',
      urduName: 'اسپوکن انگلش ٹرینر',
      role: 'Spoken English & Communication Coach',
      urduRole: 'کمیونیکیشن و پرسنالٹی کوچ',
      department: 'Language & Fluency Club',
      qualification: 'M.A. English Linguistics',
      experience: '6+ Years Stage & Fluency Coaching',
      bio: 'Passionate coach committed to eliminating stage fright, stuttering, and mother-tongue influence (MTI) through everyday interactive dialogues.',
      avatarColor: 'bg-red-700',
      initials: 'SE',
    },
    {
      id: 'staff-4',
      name: 'Faculty Lead — AI & Vibe Coding',
      urduName: 'اے آئی و ٹیک لیڈ',
      role: 'AI Bootcamp Lead & Prompt Engineer',
      urduRole: 'آرٹیفیشل انٹیلیجنس مینٹور',
      department: 'Next-Gen Technology Hub',
      qualification: 'BS Software Engineering / AI Certified',
      experience: '4+ Years AI Workflows & Full-Stack',
      bio: 'Leading Sambrial’s first hands-on AI Bootcamp. Mentors students on Midjourney, ElevenLabs video production, Cursor vibe coding, and autonomous agents.',
      avatarColor: 'bg-zinc-900',
      initials: 'AI',
    },
    {
      id: 'staff-5',
      name: 'Faculty Lead — IT & Office Management',
      urduName: 'آفس مینجمنٹ انسٹرکٹر',
      role: 'Computer Applications Instructor',
      urduRole: 'آئی ٹی و کمپیوٹر انسٹرکٹر',
      department: 'IT & Digital Skills',
      qualification: 'BS Information Technology',
      experience: '5+ Years Practical Lab Training',
      bio: 'Hands-on supervisor for MS Office suite, advanced Excel data formulas, professional business correspondence, and typing accuracy.',
      avatarColor: 'bg-red-800',
      initials: 'IT',
    },
    {
      id: 'staff-6',
      name: 'Student Admissions & Visa Desk',
      urduName: 'اسٹوڈنٹ ایڈوائزر',
      role: 'Admissions & Study Abroad Coordinator',
      urduRole: 'ایڈمشن و اسٹوڈنٹ کوآرڈینیٹر',
      department: 'BELC Study Advisors',
      qualification: 'MBA Marketing / Career Counselor',
      experience: '6+ Years Student Counseling',
      bio: 'Dedicated counselor assisting candidates with China MBBS scholarships, document attestation, university choices, and WhatsApp student inquiries.',
      avatarColor: 'bg-neutral-800',
      initials: 'AD',
    },
  ],

  campusFeatures: [
    {
      title: 'Dedicated Audio Listening Lab',
      urduTitle: 'آڈیو لسننگ لیب',
      desc: 'Equipped with individual high-definition headsets for real exam-condition IELTS & PTE listening practice.',
    },
    {
      title: 'High-Tech Computer Terminals',
      urduTitle: 'جدید کمپیوٹر ٹرمینلز',
      desc: 'Modern machines running PTE simulation engines, typing software, and AI cloud workspaces.',
    },
    {
      title: 'Air-Conditioned Modern Classrooms',
      urduTitle: 'ایئر کنڈیشنڈ کلاس رومز',
      desc: 'Comfortable, temperature-controlled environment with smart LED screens for interactive lectures.',
    },
    {
      title: 'Uninterrupted Power Backup',
      urduTitle: 'مسلسل بجلی کی فراہمی',
      desc: 'Heavy-duty solar and generator backup so your tests and lectures are never interrupted.',
    },
    {
      title: 'Kayseria Building 1st Floor',
      urduTitle: 'مرکزی اور محفوظ لوکیشن',
      desc: 'Prime central location in Sambrial, easily accessible for male and female students across Sambrial, Daska & Sialkot.',
    },
    {
      title: 'Regular Cambridge Mock Exams',
      urduTitle: 'ہفتہ وار مکمل ماک ٹیسٹ',
      desc: 'Weekly real-time exam simulations evaluated by Sir Muhammad Qasim with detailed score breakdowns.',
    },
  ],

  testimonials: [
    {
      id: 'test-1',
      studentName: 'Ali Raza',
      exam: 'IELTS Academic — Band 7.5',
      location: 'Sambrial',
      quote: 'I had severe hesitation in speaking and was scared of IELTS writing. Sir Qasim gave me personal attention in the 4:00 PM batch. I achieved Band 7.5 on my first attempt and got accepted into a UK university!',
      urduQuote: 'سر قاسم کی ذاتی رہنمائی اور ڈیلی پریکٹس کی بدولت میں نے پہلی ہی کوشش میں 7.5 بینڈ حاصل کیا۔',
    },
    {
      id: 'test-2',
      studentName: 'Dr. Usman Tariq',
      exam: 'China MBBS Admissions (BELC Study Advisors)',
      location: 'Sambrial / Sialkot',
      quote: 'BELC Study Advisors made my dream of studying MBBS in China a reality. Transparent processing with zero hidden charges. Today I am studying at an international medical university with full hostel and halal food facilities.',
      urduQuote: 'بی ایل سی نے بغیر کسی فراڈ یا چھپے چارجز کے میرا چائنا ایم بی بی ایس کا ویزا اور داخلہ ممکن بنایا۔',
    },
    {
      id: 'test-3',
      studentName: 'Hamza Nadeem',
      exam: 'PTE Academic — 79 Overall',
      location: 'Daska / Sambrial',
      quote: 'The computerized lab and AI scoring tips at BELC are unmatched in the entire region. The templates for Read Aloud and Describe Image worked like magic on exam day.',
      urduQuote: 'سمبڑیال میں اتنی شاندار پی ٹی ای لیب اور سر قاسم کا پڑھانے کا طریقہ واقعی لاجواب ہے۔',
    },
    {
      id: 'test-4',
      studentName: 'Zainab Bibi',
      exam: 'Spoken English & Fluency',
      location: 'Sambrial',
      quote: 'The environment at BELC is extremely respectful and encouraging for female students. My confidence grew within three weeks, and I can now speak English comfortably in job interviews.',
      urduQuote: 'طالبات کے لیے بی ایل سی کا ماحول انتہائی پروقار اور محفوظ ہے۔ تین ہفتوں میں میری جھجھک بالکل ختم ہو گئی۔',
    },
  ],

  faqs: [
    {
      question: 'Where is BELC located in Sambrial?',
      urduQuestion: 'بی ایل سی سمبڑیال میں کہاں واقع ہے؟',
      answer: 'BELC is located on the 1st Floor of the Kayseria Building on Main Wazirabad Road / Main Bazar, Sambrial, District Sialkot. You can open our Google Maps link directly for navigation.',
      urduAnswer: 'بی ایل سی سمبڑیال میں مین وزیرآباد روڈ پر قیصریہ بلڈنگ کے فرسٹ فلور پر واقع ہے۔ آپ گوگل میپس کے ذریعے باآسانی آ سکتے ہیں۔',
    },
    {
      question: 'What are the class timings for IELTS and Spoken English?',
      urduQuestion: 'آئیلٹس اور اسپوکن انگلش کے اوقات کیا ہیں؟',
      answer: 'Our main IELTS batch runs from 04:00 PM to 06:00 PM. Spoken English is offered in two convenient slots: Afternoon (02:00 PM – 04:00 PM) and Evening (04:00 PM – 06:00 PM). PTE classes start daily at 04:00 PM.',
      urduAnswer: 'آئیلٹس کی کلاس شام 4:00 تا 6:00 بجے ہوتی ہے۔ اسپوکن انگلش دوپہر 2:00 تا 4:00 اور شام 4:00 تا 6:00 بجے جبکہ پی ٹی ای شام 4:00 بجے ہے۔',
    },
    {
      question: 'What is the course fee structure?',
      urduQuestion: 'کورسز کی فیس کیا ہے؟',
      answer: 'We maintain highly affordable fee structures customized per student requirements and package durations. Please click the WhatsApp button or visit our campus for the latest fee details and active student concessions.',
      urduAnswer: 'ہماری فیس انتہائی مناسب ہے جو کورس کے دورانیے پر منحصر ہے۔ موجودہ فیس کے لیے واٹس ایپ پر رابطہ کریں یا اکیڈمی تشریف لائیں۔',
    },
    {
      question: 'What does the 8-Week AI Bootcamp cover?',
      urduQuestion: '8 ہفتوں کے اے آئی بوٹ کیمپ میں کیا سکھایا جاتا ہے؟',
      answer: 'The AI Bootcamp is an intensive hands-on program covering: 1) Advanced Prompt Engineering, 2) AI Video Generation (Midjourney/Runway/ElevenLabs), 3) Vibe Coding with AI coding assistants, 4) Business AI Automations, and 5) No-Code client project deployments.',
      urduAnswer: 'اس میں اے آئی ویڈیو جنریشن، پرامپٹ انجینئرنگ، وائب کوڈنگ (سافٹ ویئر میکنگ)، آٹومیشنز اور بغیر کوڈنگ کے انٹرنیشنل پروجیکٹس بنانا سکھایا جاتا ہے۔',
    },
    {
      question: 'How can I apply for China MBBS Study Visa through BELC?',
      urduQuestion: 'چائنا ایم بی بی ایس اسٹڈی ویزا کے لیے بی ایل سی سے کیسے رابطہ کریں؟',
      answer: 'You can meet Sir Muhammad Qasim directly at BELC Study Advisors with your educational transcripts (FSc Pre-Medical) or send your documents over WhatsApp (+92 334 8073431) for free preliminary evaluation.',
      urduAnswer: 'آپ اپنے ایف ایس سی پری میڈیکل کے رزلٹ کے ساتھ سر قاسم سے اکیڈمی میں مل سکتے ہیں یا واٹس ایپ پر ڈاکومنٹس بھیج کر مفت رہنمائی حاصل کر سکتے ہیں۔',
    },
    {
      question: 'Do you offer certificates upon course completion?',
      urduQuestion: 'کیا کورس مکمل ہونے پر سرٹیفکیٹ دیا جاتا ہے؟',
      answer: 'Yes! Every student who successfully completes their course and passes our internal evaluations is awarded an official, verifiable BELC Certificate of Completion.',
      urduAnswer: 'جی ہاں! کورس مکمل کرنے اور اندرونی ٹیسٹ پاس کرنے والے ہر طالب علم کو بی ایل سی کا باقاعدہ تصدیق شدہ سرٹیفکیٹ دیا جاتا ہے۔',
    },
  ],
};

/**
 * Builds a formatted WhatsApp link with pre-filled enquiry message
 */
export function buildWhatsAppUrl(service?: string, courseTitle?: string): string {
  const phone = ACADEMY_DATA.identity.rawWhatsapp;
  let text = `Assalam-o-Alaikum BELC Sambrial! I am interested in admission & details.`;

  if (service === 'course' && courseTitle) {
    text = `Assalam-o-Alaikum Sir Qasim! I would like to get fee and schedule details for the "${courseTitle}" course at BELC Sambrial.`;
  } else if (service === 'ai-bootcamp') {
    text = `Assalam-o-Alaikum! I want to enroll in the 8-Week AI Bootcamp (Vibe Coding, AI Video Gen, Prompt Engineering) at BELC. Please share seat availability and batch dates.`;
  } else if (service === 'ielts') {
    text = `Assalam-o-Alaikum! I want to join the IELTS / PTE preparation batch at BELC Sambrial. Please guide me regarding timings and current fee.`;
  } else if (service === 'visa') {
    text = `Assalam-o-Alaikum! I am contacting BELC Study Advisors regarding China MBBS / Global Study Abroad admission and visa guidance.`;
  } else if (service === 'umrah') {
    text = `Assalam-o-Alaikum BELC! I want to inquire about customized Umrah packages, flight dates, and Makkah/Madinah hotel arrangements.`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
