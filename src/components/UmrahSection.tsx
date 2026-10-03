import React from 'react';
import {
  Compass,
  Building,
  Plane,
  Calendar,
  Check,
  AlertTriangle,
  MessageCircle,
  Clock,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';
import kaabaImage from '../assets/images/umrah_kaaba_belc_1791022942017.jpg';

interface UmrahSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const UmrahSection: React.FC<UmrahSectionProps> = ({ theme, isUrdu }) => {
  const isDark = theme === 'dark';
  const { umrahServices } = ACADEMY_DATA;

  return (
    <section id="umrah" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-3 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مقدس سفر کی سعادت' : 'Spiritual Travel Services'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {isUrdu ? (
              <span className="font-urdu leading-relaxed">{umrahServices.urduTitle}</span>
            ) : (
              <>{umrahServices.title}</>
            )}
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            } ${isUrdu ? 'font-urdu' : ''}`}
          >
            {isUrdu ? umrahServices.urduTagline : umrahServices.tagline}
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
            <Clock className="w-3 h-3 text-red-500" />
            <span>Last Updated Schedule: {umrahServices.lastUpdated}</span>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 border border-zinc-200 dark:border-zinc-800 h-64 sm:h-80 shadow-xl">
          <img
            src={kaabaImage}
            alt="Makkah Holy Kaaba Umrah Travel with BELC Sambrial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Transparent &amp; Verified Travel Assistance
              </p>
              <h3 className="text-xl sm:text-2xl font-bold mt-1">
                Bismillah English Language Club — Umrah Desk
              </h3>
              <p className="text-xs text-zinc-300 mt-1 max-w-xl">
                Serving the faithful of Sambrial, Sialkot, and surrounding areas with honest hotel bookings, direct visa issuance, and reliable ground transport.
              </p>
            </div>
            <a
              href={buildWhatsAppUrl('umrah')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{isUrdu ? 'پیکیج ریٹس معلوم کریں' : 'Custom Quote on WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Umrah Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {umrahServices.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {pkg.type}
                  </span>
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{pkg.duration}</span>
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight mb-4">{pkg.name}</h3>

                {/* Hotel Distance Specs */}
                <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 mb-6 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Building className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                        Makkah Mukarramah:
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400">{pkg.hotelMakkah}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Building className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                        Madinah Munawwarah:
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400">{pkg.hotelMadinah}</span>
                    </div>
                  </div>
                </div>

                {/* Inclusions List */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                    What Is Included:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Notice & CTA */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-zinc-500">Package Pricing:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    Contact us for current seasonal fee
                  </span>
                </div>

                <a
                  href={buildWhatsAppUrl('umrah')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isUrdu ? 'عمرہ پیکیج معلومات واٹس ایپ پر' : 'Enquire on WhatsApp'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Travel Disclaimer Box */}
        <div
          className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
            isDark
              ? 'bg-zinc-900/90 border-zinc-800 text-zinc-300'
              : 'bg-zinc-100 border-zinc-300 text-zinc-800'
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold block mb-1">
              {isUrdu ? 'لازمی سفری انتباہ (Mandatory Travel Disclaimer):' : 'Mandatory Travel Disclaimer:'}
            </span>
            <p className={isUrdu ? 'font-urdu' : ''} dir={isUrdu ? 'rtl' : 'ltr'}>
              {isUrdu ? umrahServices.urduMandatoryDisclaimer : umrahServices.mandatoryDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
