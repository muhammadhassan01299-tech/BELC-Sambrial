import React from 'react';
import {
  GraduationCap,
  Globe2,
  FileCheck2,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  Plane,
  Building2,
  ShieldAlert,
} from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface VisaSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const VisaSection: React.FC<VisaSectionProps> = ({ theme, isUrdu }) => {
  const isDark = theme === 'dark';

  return (
    <section id="visa" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 mb-3 border border-red-500/20">
            {isUrdu ? 'اسٹڈی ویزا و داخلہ رہنمائی' : 'BELC Study Advisors'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {isUrdu ? (
              <span className="font-urdu leading-relaxed">چائنا اور بین الاقوامی اسٹڈی ویزا کنسلٹنسی</span>
            ) : (
              <>China MBBS &amp; Global Study Abroad Assistance</>
            )}
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            } ${isUrdu ? 'font-urdu' : ''}`}
          >
            {isUrdu
              ? 'سر محمد قاسم کی زیرِ نگرانی چائنا کے تصدیق شدہ میڈیکل اور انجینئرنگ کالجز میں کم خرچ پر داخلے اور قانونی ویزا فائل تیاری۔'
              : 'Transparent academic evaluation, certified document processing, and university admissions guidance without misleading claims.'}
          </p>
        </div>

        {/* Visa Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {ACADEMY_DATA.visaServices.map((prog) => (
            <div
              key={prog.id}
              className={`flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${
                isDark
                  ? 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    <Globe2 className="w-4 h-4" />
                    <span>{prog.country}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {prog.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                  {isUrdu ? prog.urduTitle : prog.title}
                </h3>

                <p
                  className={`text-xs sm:text-sm mb-6 leading-relaxed ${
                    isDark ? 'text-zinc-300' : 'text-zinc-600'
                  } ${isUrdu ? 'font-urdu' : ''}`}
                  dir={isUrdu ? 'rtl' : 'ltr'}
                >
                  {isUrdu ? prog.urduDescription : prog.description}
                </p>

                {/* Sub-Programs Offered */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Key Academic Programs:
                  </h4>
                  <ul className="space-y-2">
                    {prog.programs.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                        <GraduationCap className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-zinc-800 dark:text-zinc-200 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlights / Benefits */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Service Standards:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {prog.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl('visa')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isUrdu ? 'اسٹڈی ویزا کنسلٹیشن واٹس ایپ پر' : 'Inquire with Visa Advisor on WhatsApp'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Factual Visa Disclaimer Box */}
        <div
          className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
            isDark
              ? 'bg-amber-950/20 border-amber-900/40 text-amber-200'
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}
        >
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold block mb-1">
              {isUrdu ? 'ضروری قانونی وضاحت (Legal Notice):' : 'Mandatory Transparency Notice:'}
            </span>
            <p className={isUrdu ? 'font-urdu' : ''} dir={isUrdu ? 'rtl' : 'ltr'}>
              {isUrdu ? ACADEMY_DATA.urduVisaDisclaimer : ACADEMY_DATA.visaDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
