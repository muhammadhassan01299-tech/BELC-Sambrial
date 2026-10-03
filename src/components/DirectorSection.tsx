import React from 'react';
import {
  Award,
  BookOpen,
  CheckCircle,
  MessageCircle,
  Quote,
  Star,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface DirectorSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const DirectorSection: React.FC<DirectorSectionProps> = ({ theme, isUrdu }) => {
  const isDark = theme === 'dark';
  const { director } = ACADEMY_DATA;

  return (
    <section id="director" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-3xl border overflow-hidden p-8 sm:p-12 ${
            isDark
              ? 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border-zinc-800 shadow-2xl'
              : 'bg-gradient-to-br from-zinc-50 via-white to-red-50/40 border-zinc-200 shadow-xl'
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Director Photo with Glowing Frame & Orbit Effect */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group">
                {/* Glowing Animated Outer Ring */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-red-600 via-amber-500 to-rose-600 opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500 animate-pulse-subtle" />

                {/* Glass Inner Frame */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 dark:border-white/10 bg-zinc-900 shadow-2xl w-64 h-64 sm:w-80 sm:h-80">
                  <img
                    src={director.image}
                    alt={`${director.name} - Director BELC Sambrial`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 text-white text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-red-600/90 backdrop-blur-md border border-white/20 shadow">
                      Managing Director
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Founder of BELC Sambrial (Est. 2015)</span>
              </div>
            </div>

            {/* Director Biography & Vision */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 mb-3 border border-red-500/20 self-start">
                <Award className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'قیادت کا پیغام' : 'Director’s Desk'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                {isUrdu ? director.urduName : director.name}
              </h2>

              <p className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400 mb-4">
                {isUrdu ? director.urduTitle : `${director.title} — ${director.subTitle}`}
              </p>

              {/* Quote Box */}
              <div
                className={`relative p-5 rounded-2xl border mb-6 ${
                  isDark
                    ? 'bg-zinc-950/70 border-zinc-800 text-zinc-200'
                    : 'bg-white border-zinc-200 text-zinc-800'
                }`}
              >
                <Quote className="w-6 h-6 text-red-500/30 absolute top-3 right-3" />
                <p
                  className={`text-sm italic leading-relaxed ${
                    isUrdu ? 'font-urdu not-italic text-right text-base' : ''
                  }`}
                  dir={isUrdu ? 'rtl' : 'ltr'}
                >
                  &quot;{isUrdu ? director.urduQuote : director.quote}&quot;
                </p>
              </div>

              {/* Full Bio */}
              <p
                className={`text-sm sm:text-base leading-relaxed mb-6 ${
                  isDark ? 'text-zinc-300' : 'text-zinc-600'
                } ${isUrdu ? 'font-urdu' : ''}`}
                dir={isUrdu ? 'rtl' : 'ltr'}
              >
                {director.bio}
              </p>

              {/* Highlights checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {director.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Direct Booking CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl('ielts')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isUrdu ? 'سر قاسم سے واٹس ایپ پر رہنمائی لیں' : 'Schedule Consultation with Sir Qasim'}</span>
                </a>

                <a
                  href={`tel:${ACADEMY_DATA.identity.phone}`}
                  className={`px-5 py-3 rounded-xl font-semibold text-xs transition-all border ${
                    isDark
                      ? 'border-zinc-700 text-zinc-300 hover:text-white'
                      : 'border-zinc-300 text-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  Direct Campus Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
