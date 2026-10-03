import React from 'react';
import {
  MessageCircle,
  ArrowRight,
  Phone,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  Cpu,
  MapPin,
} from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';
import { VoiceAssistant } from './VoiceAssistant';
import labImage from '../assets/images/belc_modern_lab_1791022926016.jpg';

interface HeroSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, isUrdu }) => {
  const isDark = theme === 'dark';

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 dark:bg-red-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Storytelling Content */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Local Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 mb-6">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'سمبڑیال، سیالکوٹ کا معروف تعلیمی ادارہ' : 'Established 2015 · Sambrial, Sialkot'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">10+ Years</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
              {isUrdu ? (
                <span className="font-urdu block leading-[1.6] text-right" dir="rtl">
                  انگلش میں روانی حاصل کریں، <span className="text-red-600">اے آئی اور ٹیکنالوجی</span> سیکھیں اور روشن مستقبل بنائیں
                </span>
              ) : (
                <>
                  Speak Fluent English. <br />
                  <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                    Master Modern AI.
                  </span> <br />
                  Open Global Doors.
                </>
              )}
            </h1>

            {/* Descriptive Narrative */}
            <p
              className={`text-base sm:text-lg mb-8 leading-relaxed max-w-2xl ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              } ${isUrdu ? 'text-right font-urdu leading-loose' : ''}`}
              dir={isUrdu ? 'rtl' : 'ltr'}
            >
              {isUrdu
                ? 'بسم اللہ انگلش لینگویج کلب (بی ایل سی) سمبڑیال میں سر محمد قاسم کی زیرِ نگرانی آئیلٹس، پی ٹی ای، اسپوکن انگلش، 8 ہفتوں کا جدید اے آئی بوٹ کیمپ، کمپیوٹر کورسز، چائنا ایم بی بی ایس اسٹڈی ویزا اور عمرہ رہنمائی کے لیے ایک بااعتماد نام ہے۔'
                : 'Bismillah English Language Club (BELC) is Sambrial’s premier institution for IELTS & PTE success (7.0+ Band), Spoken English fluency, practical Computer & Freelancing courses, our flagship 8-Week AI Bootcamp, and trusted China MBBS admissions.'}
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{isUrdu ? 'واٹس ایپ پر رابطہ کریں' : 'Talk on WhatsApp'}</span>
              </a>

              <a
                href="#courses"
                className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all border cursor-pointer ${
                  isDark
                    ? 'border-zinc-700 text-zinc-100 hover:border-red-500 hover:bg-zinc-800'
                    : 'border-zinc-300 text-zinc-900 hover:border-red-500 hover:bg-zinc-50'
                }`}
              >
                <span>{isUrdu ? 'کورسز کی تفصیل' : 'Explore Courses'}</span>
                <ArrowRight className="w-4 h-4 text-red-500" />
              </a>

              <a
                href={`tel:${ACADEMY_DATA.identity.phone}`}
                className={`flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all text-zinc-600 dark:text-zinc-400 hover:text-red-600 cursor-pointer`}
              >
                <Phone className="w-4 h-4" />
                <span>{isUrdu ? 'فون کال' : 'Call Now'}</span>
              </a>
            </div>

            {/* Integrated Voice Greeting Player */}
            <div className="max-w-xl">
              <VoiceAssistant theme={theme} isUrdu={isUrdu} />
            </div>
          </div>

          {/* Right Column: Visual Showcase & Real Campus Atmosphere */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Visual Card with Real Campus Lab */}
            <div
              className={`relative rounded-3xl overflow-hidden border p-3 ${
                isDark
                  ? 'bg-zinc-900/80 border-zinc-800 shadow-2xl shadow-black/80'
                  : 'bg-white border-zinc-200 shadow-xl shadow-zinc-300/40'
              }`}
            >
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden group">
                <img
                  src={labImage}
                  alt="BELC Sambrial High-Tech Language Lab and Classrooms"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{isUrdu ? 'ایڈمشن اوپن ہیں' : 'New Batches Enrolling'}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase font-bold tracking-wider text-red-400 mb-0.5">
                    Kayseria Building, 1st Floor
                  </p>
                  <h3 className="text-lg font-bold leading-tight">
                    BELC Multimedia & Audio Listening Lab
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Equipped for IELTS Listening headphones, PTE software & AI workstations
                  </p>
                </div>
              </div>

              {/* Quick Academy Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div
                  className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                    isDark ? 'bg-zinc-950 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <Award className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold leading-tight">IELTS 7.0+ Band</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Target Score Strategy</p>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                    isDark ? 'bg-zinc-950 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <Cpu className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold leading-tight">AI & Vibe Coding</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">8-Week Hands-on</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Director Note Snapshot */}
            <div
              className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
                isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100/80 border-zinc-200'
              }`}
            >
              <img
                src={ACADEMY_DATA.director.image}
                alt="Sir Muhammad Qasim - Director BELC Sambrial"
                className="w-12 h-12 rounded-full object-cover border-2 border-red-500 shadow-md"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {ACADEMY_DATA.director.name}
                </p>
                <p className="text-[11px] text-red-600 dark:text-red-400 font-medium">
                  {ACADEMY_DATA.director.title}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                  &quot;Every student receives direct personal mentorship.&quot;
                </p>
              </div>
              <a
                href="#director"
                className="shrink-0 text-xs font-bold text-red-600 hover:underline px-2"
              >
                Profile &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Verified Stats Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">2015</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {isUrdu ? 'قیام: 10 سال سے مسلسل خدمات' : 'Established in Sambrial'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">2,500+</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {isUrdu ? 'کامیاب اور مطمئن طلبہ' : 'Graduated Students'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">7.0+</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {isUrdu ? 'آئیلٹس ٹارگٹ بینڈ اسکورز' : 'Proven IELTS Band Scores'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight">100%</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  {isUrdu ? 'عملی کمپیوٹر اور اسپیچ پریکٹس' : 'Practical Hands-on Drills'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
