import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
import { ACADEMY_DATA } from '../data/academy';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, theme }) => {
  // Close with the Escape key and stop the page behind from scrolling while the popup is open.
  // (Hooks must come BEFORE the early return below.)
  useEffect(() => {
    if (!type) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [type, onClose]);

  if (!type) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`relative max-w-2xl w-full max-h-[85vh] p-6 sm:p-8 rounded-3xl border shadow-2xl overflow-y-auto ${
          isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Privacy Policy</h3>
                <p className="text-xs text-zinc-500">BELC Sambrial — Last updated 2026</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <p>
                At <strong>Bismillah English Language Club (BELC) Sambrial</strong>, we respect the privacy of our students, prospective applicants, and visitors. This Privacy Policy outlines how we collect and use information submitted across our website and communication channels.
              </p>

              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                1. Information We Collect
              </h4>
              <p>
                When you submit an admission inquiry through our web form or chatbot, we collect your name, phone/WhatsApp number, email address, and program of interest. This data is solely used to respond to your inquiry and provide curriculum details.
              </p>

              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                2. WhatsApp &amp; Third-Party Communication
              </h4>
              <p>
                Direct clicks to WhatsApp connect you to our verified business communication desk. We do not sell, rent, or trade your contact details with any unauthorized third parties or marketing brokers.
              </p>

              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                3. Local Storage &amp; Preferences
              </h4>
              <p>
                We use browser localStorage exclusively to save your UI preferences (dark/light theme and Urdu/English language selection). No intrusive tracking or unauthorized fingerprinting is conducted.
              </p>

              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                4. Contact for Data Removal
              </h4>
              <p>
                If you wish to update or remove your contact information from our admissions records, please email us directly at <code>{ACADEMY_DATA.identity.email}</code>.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Terms of Service &amp; Disclaimers</h3>
                <p className="text-xs text-zinc-500">BELC Sambrial — Last updated 2026</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                1. Educational Nature of Programs
              </h4>
              <p>
                All courses offered at BELC (including IELTS, PTE, Spoken English, IT Fundamentals, and the 8-Week AI Bootcamp) are skill-development training programs. While we provide high-grade preparation materials and diagnostic mock evaluations, exam scores depend on student effort and third-party examination bodies (e.g. IDP, British Council, Pearson).
              </p>

              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                2. Study Visa Guidance Disclaimer (Strict Transparency)
              </h4>
              <p>
                BELC Study Advisors provides legitimate educational consulting, admissions guidance, and visa file preparation assistance. Visa issuance is solely within the sovereign jurisdiction of the respective foreign embassies and consulates. BELC does not offer or imply &quot;100% guaranteed visas&quot; or provide fabricated documentation.
              </p>

              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                3. Umrah Travel &amp; Seasonal Pricing
              </h4>
              <p>
                {ACADEMY_DATA.umrahServices.mandatoryDisclaimer}
              </p>

              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                4. Proprietary Academy Content
              </h4>
              <p>
                The BELC logo, course outlines, and materials are proprietary intellectual assets of Bismillah English Language Club, Sambrial. Unauthorized duplication or commercial rebranding is prohibited.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
