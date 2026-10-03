import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Globe,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { BelcLogo } from './BelcLogo';
import { ACADEMY_DATA, buildWhatsAppUrl } from '../data/academy';

interface NavbarProps {
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  isUrdu: boolean;
  setIsUrdu: (u: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, isUrdu, setIsUrdu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: isUrdu ? 'تعارف' : 'About', href: '#about' },
    { label: isUrdu ? 'کورسز' : 'Courses', href: '#courses' },
    { label: isUrdu ? 'اے آئی بوٹ کیمپ' : 'AI Bootcamp', href: '#ai-bootcamp', highlight: true },
    { label: isUrdu ? 'اسٹڈی ویزا' : 'Study Visa', href: '#visa' },
    { label: isUrdu ? 'عمرہ سروسز' : 'Umrah', href: '#umrah' },
    { label: isUrdu ? 'ڈائریکٹر' : 'Director', href: '#director' },
    { label: isUrdu ? 'فیکلٹی' : 'Faculty', href: '#faculty' },
    { label: isUrdu ? 'رابطہ' : 'Contact', href: '#contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 shadow-xl'
            : 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <BelcLogo theme={theme} size="md" variant="full-horizontal" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5" dir="ltr">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  link.highlight
                    ? 'text-red-600 dark:text-red-400 hover:bg-red-500/10'
                    : isDark
                    ? 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                    : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Tools */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={() => setIsUrdu(!isUrdu)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                isDark
                  ? 'border-zinc-700 text-zinc-200 hover:border-red-500 hover:bg-zinc-800'
                  : 'border-zinc-300 text-zinc-700 hover:border-red-500 hover:bg-zinc-100'
              }`}
              title="Toggle Urdu / English Language"
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span>{isUrdu ? 'English' : 'اردو'}</span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-all border cursor-pointer ${
                isDark
                  ? 'border-zinc-800 text-amber-400 hover:bg-zinc-800'
                  : 'border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
              aria-label="Toggle dark/light theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Call Button */}
            <a
              href={`tel:${ACADEMY_DATA.identity.phone}`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                isDark
                  ? 'border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500'
                  : 'border-zinc-300 text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden lg:inline">{ACADEMY_DATA.identity.phone}</span>
              <span className="lg:hidden">Call</span>
            </a>

            {/* WhatsApp Direct CTA */}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{isUrdu ? 'واٹس ایپ رابطہ' : 'WhatsApp'}</span>
            </a>
          </div>

          {/* Mobile Hamburger & Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Top Corner WhatsApp Button for Mobile */}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/30 active:scale-95"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="text-[11px]">Chat</span>
            </a>

            <button
              onClick={() => setIsUrdu(!isUrdu)}
              className="px-2 py-1.5 rounded-lg text-xs font-bold border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200"
            >
              {isUrdu ? 'EN' : 'اردو'}
            </button>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-4 pt-3 pb-6 border-b transition-all ${
            isDark ? 'bg-zinc-950/98 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex flex-col space-y-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  link.highlight
                    ? 'bg-red-600/10 text-red-600 dark:text-red-400 font-bold border border-red-500/20'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <a
              href={`tel:${ACADEMY_DATA.identity.phone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs border border-zinc-300 dark:border-zinc-700"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>Call BELC</span>
            </a>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
