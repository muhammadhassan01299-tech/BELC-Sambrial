import React, { useState } from 'react';
import {
  Play,
  Award,
  CheckCircle2,
  Quote,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  QrCode,
  FileText,
} from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface CampusGalleryProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const CampusGallery: React.FC<CampusGalleryProps> = ({ theme, isUrdu }) => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const isDark = theme === 'dark';

  return (
    <section id="campus" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 mb-3 border border-red-500/20">
            {isUrdu ? 'کیمپس اور طلبہ کی رائے' : 'Campus Atmosphere & Reviews'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {isUrdu ? (
              <span className="font-urdu leading-relaxed">حقیقی کلاس رومز اور طلبہ کے شاندار نتائج</span>
            ) : (
              <>Real Classroom Experience &amp; Student Transformations</>
            )}
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            } ${isUrdu ? 'font-urdu' : ''}`}
          >
            {isUrdu
              ? 'بی ایل سی سمبڑیال میں عملی تیاری، ہیڈ فونز لسننگ لیب اور طلبہ کے اعتماد میں اضافے کی تصویری جھلکیاں۔'
              : 'Direct glimpses from our interactive IELTS speaking sessions, listening lab, and verified student feedback.'}
          </p>
        </div>

        {/* Video / Campus Atmosphere Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: IELTS & Listening Lab */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between ${
              isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  Daily Batch 04:00 PM – 06:00 PM
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 font-bold">
                  Classroom Drills
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">Cambridge Listening &amp; Speaking Lab</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                Students wear individual headsets to simulate strict British Council &amp; IDP listening conditions, followed by immediate map and diagram analysis with Sir Qasim.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
              &quot;Individual feedback and question-by-question scoring.&quot;
            </div>
          </div>

          {/* Card 2: Hesitation to Confidence */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between ${
              isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Afternoon &amp; Evening Slots
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-bold">
                  Fluency Stage
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">From Hesitation to Fluency</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                Daily stage speaking, impromptu topic speeches, and mock job interviews help students eliminate fear and speak English effortlessly.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
              &quot;Respectful, encouraging environment for all candidates.&quot;
            </div>
          </div>

          {/* Card 3: Official TikTok Showcase Link */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border-zinc-800 shadow-xl`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  TikTok: {ACADEMY_DATA.identity.socials.tiktokHandle}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  Official Channel
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">Watch Live Academy Sessions</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Follow our official verified handle for daily English vocabulary tips, IELTS score announcements, and campus walk-through videos.
              </p>
            </div>
            <a
              href={ACADEMY_DATA.identity.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white transition-all shadow"
            >
              <span>Watch on TikTok</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Student Testimonials Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold tracking-tight text-center mb-8">
            {isUrdu ? 'طلبہ کے تاثرات اور کامیابی کی کہانیاں' : 'Verified Student Testimonials'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACADEMY_DATA.testimonials.map((test) => (
              <div
                key={test.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between ${
                  isDark
                    ? 'bg-zinc-900/40 border-zinc-800 text-zinc-300'
                    : 'bg-white border-zinc-200 text-zinc-700 shadow-sm'
                }`}
              >
                <div>
                  <Quote className="w-6 h-6 text-red-500/40 mb-3" />
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      isUrdu ? 'font-urdu' : ''
                    }`}
                    dir={isUrdu ? 'rtl' : 'ltr'}
                  >
                    &quot;{isUrdu ? test.urduQuote : test.quote}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {test.studentName}
                  </p>
                  <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold">
                    {test.exam}
                  </p>
                  <p className="text-[10px] text-zinc-500">{test.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Course Certificate Specimen Banner */}
        <div
          className={`p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
            isDark
              ? 'bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border-zinc-800'
              : 'bg-gradient-to-r from-zinc-50 via-white to-red-50/50 border-zinc-200'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Official BELC Course Certificate of Completion</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Authorized completion credential issued with institutional seal, security QR verification, and Director Muhammad Qasim’s signature.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCertificateModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>View Certificate Specimen</span>
          </button>
        </div>

        {/* Certificate Preview Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative max-w-2xl w-full p-6 sm:p-10 rounded-3xl bg-white text-zinc-900 border-4 border-amber-600/30 shadow-2xl overflow-hidden">
              {/* Outer Guilloche-style Certificate Border */}
              <div className="border-2 border-red-800 p-6 sm:p-8 rounded-xl relative">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">
                    CERTIFICATE OF ACHIEVEMENT
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-red-700">
                    BISMILLAH ENGLISH LANGUAGE CLUB
                  </h3>
                  <p className="text-[11px] font-semibold tracking-wider text-zinc-600 uppercase mt-0.5">
                    Sambrial, Sialkot, Punjab · Established 2015
                  </p>
                </div>

                {/* Body */}
                <div className="text-center space-y-3 mb-8">
                  <p className="text-xs text-zinc-500 italic">This is to officially certify that</p>
                  <p className="text-2xl font-serif font-bold text-zinc-900 underline decoration-red-600/40 decoration-1 underline-offset-8">
                    [Student Name Here]
                  </p>
                  <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed pt-2">
                    has successfully completed the comprehensive training program in{' '}
                    <strong className="text-zinc-900">IELTS Academic / AI Bootcamp Mastery</strong> with distinction and verified evaluation.
                  </p>
                </div>

                {/* Signatures & Seal */}
                <div className="flex items-end justify-between pt-6 border-t border-zinc-200 text-xs">
                  <div className="text-center">
                    <div className="font-serif font-bold italic text-zinc-800 text-sm mb-1">
                      Sir Muhammad Qasim
                    </div>
                    <div className="w-32 h-0.5 bg-zinc-400 mx-auto mb-1" />
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                      Managing Director
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-amber-600/70 bg-amber-50 flex items-center justify-center shadow-inner">
                      <ShieldCheck className="w-8 h-8 text-amber-700" />
                    </div>
                    <span className="text-[9px] uppercase font-bold text-amber-800 mt-1">
                      Official Seal
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <QrCode className="w-10 h-10 text-zinc-800" />
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      BELC-VERIFY-2026
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  Close Specimen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
