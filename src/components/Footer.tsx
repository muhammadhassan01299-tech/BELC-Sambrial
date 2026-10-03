import React from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
  ExternalLink,
} from 'lucide-react';
import { BelcLogo } from './BelcLogo';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface FooterProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme,
  isUrdu,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t transition-colors ${
        isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <BelcLogo theme={theme} size="md" variant="full-horizontal" />
            <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
              {ACADEMY_DATA.identity.tagline}. Established in 2015 under the visionary leadership of Sir Muhammad Qasim in Sambrial, Punjab.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href={ACADEMY_DATA.identity.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-red-500 font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 transition-all"
              >
                <span>TikTok: {ACADEMY_DATA.identity.socials.tiktokHandle}</span>
                <ExternalLink className="w-3 h-3 text-red-500" />
              </a>
            </div>
          </div>

          {/* Col 3: Academic Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
              Language &amp; Tech
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#courses" className="hover:text-red-600 transition-colors">
                  IELTS Academic &amp; General
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-red-600 transition-colors">
                  PTE Academic Lab
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-red-600 transition-colors">
                  Spoken English Fluency
                </a>
              </li>
              <li>
                <a href="#ai-bootcamp" className="font-semibold text-red-600 dark:text-red-400 hover:underline">
                  8-Week AI Bootcamp
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-red-600 transition-colors">
                  MS Office IT Management
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-red-600 transition-colors">
                  Online Earning &amp; Freelance
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Visa & Umrah */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
              Advisory &amp; Travel
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#visa" className="hover:text-red-600 transition-colors">
                  China MBBS Admissions
                </a>
              </li>
              <li>
                <a href="#visa" className="hover:text-red-600 transition-colors">
                  Belt &amp; Road Scholarships
                </a>
              </li>
              <li>
                <a href="#visa" className="hover:text-red-600 transition-colors">
                  UK / Global Study Abroad
                </a>
              </li>
              <li>
                <a href="#umrah" className="hover:text-red-600 transition-colors">
                  Customized Umrah Packages
                </a>
              </li>
              <li>
                <a href="#director" className="hover:text-red-600 transition-colors">
                  Sir Muhammad Qasim Profile
                </a>
              </li>
              <li>
                <a href="#faculty" className="hover:text-red-600 transition-colors">
                  Faculty &amp; Departments
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
              Sambrial Campus
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Kayseria Building 1st Floor, Sambrial, Sialkot</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>9:00 AM – 6:00 PM (Mon–Sat)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${ACADEMY_DATA.identity.phone}`} className="hover:underline">
                  {ACADEMY_DATA.identity.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-center sm:text-left">
            © {currentYear} BELC — Bismillah English Language Club, Sambrial. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              Terms &amp; Disclaimers
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
              title="Back to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
