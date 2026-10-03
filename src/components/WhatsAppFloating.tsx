import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, Sparkles } from 'lucide-react';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface WhatsAppFloatingProps {
  isUrdu: boolean;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({ isUrdu }) => {
  const [showOptions, setShowOptions] = useState(false);

  const quickTopics = [
    {
      title: 'IELTS / PTE Preparation',
      urdu: 'آئیلٹس و پی ٹی ای داخلہ',
      url: buildWhatsAppUrl('ielts'),
    },
    {
      title: '8-Week AI Bootcamp',
      urdu: 'اے آئی بوٹ کیمپ داخلہ',
      url: buildWhatsAppUrl('ai-bootcamp'),
    },
    {
      title: 'China MBBS / Study Visa',
      urdu: 'چائنا اسٹڈی ویزا رہنمائی',
      url: buildWhatsAppUrl('visa'),
    },
    {
      title: 'Umrah Package Inquiry',
      urdu: 'عمرہ پیکیج معلومات',
      url: buildWhatsAppUrl('umrah'),
    },
    {
      title: 'General Admission / Fees',
      urdu: 'عام معلومات و فیس تفصیلات',
      url: buildWhatsAppUrl(),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Topic Popover */}
      {showOptions && (
        <div className="mb-3 w-72 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 text-zinc-900 dark:text-zinc-100">
          <div className="flex items-center justify-between p-3.5 bg-emerald-600 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 fill-current" />
              <div>
                <h4 className="text-xs font-bold leading-tight">BELC WhatsApp Desk</h4>
                <p className="text-[10px] text-emerald-100">Click a topic to chat directly</p>
              </div>
            </div>
            <button
              onClick={() => setShowOptions(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white cursor-pointer"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2 space-y-1">
            {quickTopics.map((topic, i) => (
              <a
                key={i}
                href={topic.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowOptions(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                <span>{isUrdu ? topic.urdu : topic.title}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
          </div>

          <div className="p-2 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-center text-zinc-400">
            Directly connected to Sir Muhammad Qasim
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center gap-2.5 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Chat with BELC on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current animate-bounce" />
          <span className="hidden sm:inline">
            {isUrdu ? 'واٹس ایپ پر رابطہ' : 'Chat on WhatsApp'}
          </span>
        </button>

        {/* Unread badge dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] font-bold text-white items-center justify-center">
            1
          </span>
        </span>
      </div>
    </div>
  );
};
