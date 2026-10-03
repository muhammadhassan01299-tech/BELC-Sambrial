import React from 'react';
import {
  Compass,
  Target,
  Sparkles,
  BookOpen,
  ShieldCheck,
  CheckCircle,
  Headphones,
  Monitor,
  Zap,
  Building,
} from 'lucide-react';
import { ACADEMY_DATA } from '../data/academy';

interface AboutSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme, isUrdu }) => {
  const isDark = theme === 'dark';

  const storyPillars = [
    {
      icon: <Target className="w-5 h-5 text-red-500" />,
      title: isUrdu ? 'ہم کون ہیں (Who We Are)' : 'Who We Are',
      desc: isUrdu
        ? 'بسم اللہ انگلش لینگویج کلب (بی ایل سی) سمبڑیال کا اولین اور مستند تعلیمی و تدریسی ادارہ ہے جو 2015 سے علاقے کے طلبہ کو عالمی سطح کی زبان اور آئی ٹی مہارتیں فراہم کر رہا ہے۔'
        : 'Founded in 2015 under the visionary leadership of Sir Muhammad Qasim, BELC Sambrial has grown into the region’s premier hub for language fluency, standardized test preparation, and modern tech skills.',
    },
    {
      icon: <Compass className="w-5 h-5 text-blue-500" />,
      title: isUrdu ? 'ہمارا مشن (Our Mission)' : 'Our Mission',
      desc: isUrdu
        ? 'ہر طالبعلم کی ذاتی رہنمائی کر کے اس کی جھجھک ختم کرنا، اعلیٰ بینڈ اسکور حاصل کروانا، اور بین الاقوامی تعلیم و روزگار کے دروازے کھولنا۔'
        : 'To empower every student in Sambrial, Daska, and Sialkot with practical English communication, verified test credentials, and future-proof digital tools to thrive globally.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: isUrdu ? 'ہمارا وژن (Our Vision)' : 'Our Vision',
      desc: isUrdu
        ? 'سمبڑیال کو اعلیٰ تعلیمی اور تکنیکی صلاحیتوں کا مرکز بنانا جہاں ہر نوجوان بغیر کسی خوف کے انگلش بول سکے اور جدید اے آئی سے فائدہ اٹھا سکے۔'
        : 'To bridge the gap between local potential and international opportunities through disciplined pedagogy, state-of-the-art audio/computer labs, and genuine mentorship.',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      title: isUrdu ? 'ہم کیا سکھاتے ہیں (What We Teach)' : 'What We Teach',
      desc: isUrdu
        ? 'آئیلٹس، پی ٹی ای، اسپوکن انگلش، جدید 8 ہفتوں کا اے آئی بوٹ کیمپ، آفس مینجمنٹ اور چائنا ایم بی بی ایس اسٹڈی ویزا رہنمائی۔'
        : 'Result-oriented IELTS & PTE coaching, Spoken English fluency, MS Office IT certification, high-leverage AI workflows, and transparent China MBBS university guidance.',
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 mb-3 border border-red-500/20">
            {isUrdu ? 'ہمارا تعارف اور فلسفہ' : 'About BELC Sambrial'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {isUrdu ? (
              <span className="font-urdu leading-relaxed">
                ایک دہائی پر محیط اعتماد اور شاندار تعلیمی روایات
              </span>
            ) : (
              <>
                A Decade of Educational Excellence in Sambrial
              </>
            )}
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            } ${isUrdu ? 'font-urdu' : ''}`}
          >
            {isUrdu
              ? '2015 سے قائم، بی ایل سی نے ہزاروں طلبہ کو انگلش اور جدید ٹیکنالوجی میں خود کفیل بنایا ہے۔ ہم دعووں پر نہیں بلکہ طلبہ کے حقیقی رزلٹس پر یقین رکھتے ہیں۔'
              : 'Established in 2015, Bismillah English Language Club is rooted in personalized training, diagnostic feedback, and modern multimedia learning facilities.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {storyPillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 shadow-lg'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight">{pillar.title}</h3>
              </div>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-zinc-300' : 'text-zinc-600'
                } ${isUrdu ? 'font-urdu' : ''}`}
                dir={isUrdu ? 'rtl' : 'ltr'}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose BELC / Campus Facilities Showcase */}
        <div
          className={`p-8 sm:p-10 rounded-3xl border ${
            isDark
              ? 'bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border-zinc-800'
              : 'bg-gradient-to-br from-zinc-50 via-white to-red-50/30 border-zinc-200'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-red-600 dark:text-red-400">
                {isUrdu ? 'جدید سہولیات' : 'Infrastructure'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                {isUrdu ? 'بی ایل سی کیمپس کی نمایاں خصوصیات' : 'Why Students Choose BELC'}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <Building className="w-4 h-4 text-red-500" />
              <span>Kayseria Building 1st Floor, Sambrial</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_DATA.campusFeatures.map((feat, idx) => (
              <div key={idx} className="flex gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {isUrdu ? feat.urduTitle : feat.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
