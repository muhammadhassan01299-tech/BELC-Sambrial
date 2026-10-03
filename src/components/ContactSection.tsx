import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface ContactSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme, isUrdu }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    service: 'IELTS Preparation (Academic & General)',
    message: '',
    honeypot: '', // bot trap
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (formData.honeypot) {
      return; // Silent fail for bots
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg(
        isUrdu ? 'براہ کرم اپنا نام اور فون نمبر لکھیں۔' : 'Please fill in your name and contact phone number.'
      );
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Sends the enquiry to our server (saved in the database + e-mailed to the academy)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again or use the WhatsApp button.');
        return;
      }
      setSubmitted(true);
    } catch {
      setErrorMsg('Could not reach the server. Please check your internet or use the WhatsApp button.');
    } finally {
      setLoading(false);
    }
  };

  const servicesList = [
    'IELTS Preparation (Academic & General)',
    'PTE Academic Masterclass',
    'Spoken English & Fluency',
    '8-Week AI Bootcamp (Vibe Coding & Video Gen)',
    'Computer & IT Office Management',
    'Online Earning & Freelancing',
    'China MBBS & Study Abroad Visa',
    'Umrah Services & Packages',
  ];

  return (
    <section id="contact" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 mb-3 border border-red-500/20">
            {isUrdu ? 'کیمپس اور رابطہ' : 'Visit Us or Get in Touch'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {isUrdu ? (
              <span className="font-urdu leading-relaxed">ہم سے رابطہ کریں یا اکیڈمی تشریف لائیں</span>
            ) : (
              <>Connect with BELC Sambrial</>
            )}
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            } ${isUrdu ? 'font-urdu' : ''}`}
          >
            {isUrdu
              ? 'سر محمد قاسم اور فیکلٹی سے مشورے کے لیے تشریف لائیں یا فوری واٹس ایپ میسج کریں۔'
              : 'Our admissions desk is open Monday to Saturday. Walk into our Sambrial campus or drop us a quick WhatsApp inquiry.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Academy Location, Contact Cards, and Interactive Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Contact Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Address */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-2 text-red-600 dark:text-red-400">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Campus Address</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {ACADEMY_DATA.identity.address}
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">Sambrial, Sialkot, Punjab</p>
              </div>

              {/* Card 2: Hours */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-2 text-blue-600 dark:text-blue-400">
                  <Clock className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Opening Hours</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  9:00 AM – 6:00 PM
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">Monday through Saturday (Sunday Off)</p>
              </div>

              {/* Card 3: Direct Phone & WhatsApp */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-2 text-emerald-600 dark:text-emerald-400">
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Direct WhatsApp</span>
                </div>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline block"
                >
                  {ACADEMY_DATA.identity.whatsapp}
                </a>
                <p className="text-[11px] text-zinc-500 mt-1">Instant Admissions Chat</p>
              </div>

              {/* Card 4: Official Email */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-2 text-amber-600 dark:text-amber-400">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Email Inquiry</span>
                </div>
                <a
                  href={`mailto:${ACADEMY_DATA.identity.email}`}
                  className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-red-500 truncate block"
                >
                  {ACADEMY_DATA.identity.email}
                </a>
                <p className="text-[11px] text-zinc-500 mt-1">Director’s Office</p>
              </div>
            </div>

            {/* Interactive Google Map Embed */}
            <div
              className={`rounded-3xl overflow-hidden border p-3 ${
                isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
              }`}
            >
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden">
                <iframe
                  title="BELC Sambrial Google Maps Location"
                  src={ACADEMY_DATA.identity.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="flex items-center justify-between pt-3 px-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Kayseria 1st Floor, Sambrial
                </span>
                <a
                  href={ACADEMY_DATA.identity.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Enquiry Form */}
          <div className="lg:col-span-6">
            <div
              className={`p-8 sm:p-10 rounded-3xl border h-full flex flex-col justify-between ${
                isDark
                  ? 'bg-zinc-900/90 border-zinc-800 shadow-xl'
                  : 'bg-white border-zinc-200 shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold tracking-tight">Send an Admission Enquiry</h3>
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                    Response within 24h
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  Fill in your details below and our admissions coordinator will get in touch with you.
                </p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        Inquiry Received!
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 max-w-sm mx-auto">
                        Thank you for reaching out to BELC Sambrial. To speed up your response, you can immediately send your details to Sir Muhammad Qasim on WhatsApp:
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${ACADEMY_DATA.identity.rawWhatsapp}?text=${encodeURIComponent(
                        `Assalam-o-Alaikum! My name is ${formData.name}. I submitted an enquiry for ${formData.service}. Please share details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow transition-all hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Continue on WhatsApp Now</span>
                    </a>

                    <div>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            whatsapp: '',
                            email: '',
                            service: 'IELTS Preparation (Academic & General)',
                            message: '',
                            honeypot: '',
                          });
                        }}
                        className="text-xs text-zinc-400 hover:underline cursor-pointer"
                      >
                        Submit another enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot hidden input */}
                    <input
                      type="text"
                      name="belc_website_code"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ali Hassan"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-red-500 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 0300-1234567"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-red-500 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                          WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="Same as phone or alternate"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-red-500 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="yourname@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-red-500 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Program of Interest *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-red-500 text-zinc-900 dark:text-zinc-100 cursor-pointer"
                      >
                        {servicesList.map((srv, idx) => (
                          <option key={idx} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Your Message / Questions
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your target IELTS band or questions..."
                        className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-red-500 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="disabled:opacity-70 disabled:cursor-wait w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Admission Enquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Privacy footnote */}
              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2 text-[11px] text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Your contact details are strictly confidential and only used by BELC admissions.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
