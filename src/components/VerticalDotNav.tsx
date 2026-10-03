import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface VerticalDotNavProps {
  isUrdu: boolean;
  theme: 'dark' | 'light';
}

interface NavSection {
  id: string;
  label: string;
  urduLabel: string;
  highlight?: boolean;
}

export const VerticalDotNav: React.FC<VerticalDotNavProps> = ({ isUrdu, theme }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sections: NavSection[] = [
    { id: 'hero', label: 'Home', urduLabel: 'ہوم' },
    { id: 'about', label: 'About BELC', urduLabel: 'تعارف' },
    { id: 'courses', label: 'Courses & IT', urduLabel: 'کورسز' },
    { id: 'ai-bootcamp', label: 'AI Bootcamp', urduLabel: 'اے آئی بوٹ کیمپ', highlight: true },
    { id: 'visa', label: 'Study Visa', urduLabel: 'اسٹڈی ویزا' },
    { id: 'umrah', label: 'Umrah Desk', urduLabel: 'عمرہ سروسز' },
    { id: 'director', label: 'Sir Qasim', urduLabel: 'ڈائریکٹر' },
    { id: 'faculty', label: 'Faculty', urduLabel: 'اساتذہ' },
    { id: 'campus', label: 'Reviews', urduLabel: 'تاثرات' },
    { id: 'contact', label: 'Location & Contact', urduLabel: 'رابطہ' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec) {
          const top = sec.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <nav
      aria-label="Section Navigation"
      className={`fixed ${
        isUrdu ? 'right-5' : 'left-5'
      } top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2.5 p-2 rounded-full backdrop-blur-xl transition-all duration-300 ${
        isDark
          ? 'bg-zinc-950/70 border border-white/10 shadow-2xl shadow-black/80'
          : 'bg-white/80 border border-zinc-200 shadow-xl shadow-zinc-300/40'
      }`}
    >
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <div
            key={sec.id}
            className="relative flex items-center group cursor-pointer"
            onMouseEnter={() => setHoveredSection(sec.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* The Clickable Dot */}
            <button
              onClick={() => scrollTo(sec.id)}
              className={`relative flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? sec.highlight
                    ? 'w-4 h-4 bg-gradient-to-r from-red-600 to-amber-500 ring-4 ring-red-500/25 scale-110 shadow-lg'
                    : 'w-3.5 h-3.5 bg-red-600 ring-4 ring-red-500/20 scale-110'
                  : sec.highlight
                  ? 'w-2.5 h-2.5 bg-amber-500 hover:scale-125'
                  : isDark
                  ? 'w-2 h-2 bg-zinc-600 hover:bg-zinc-300 hover:scale-125'
                  : 'w-2 h-2 bg-zinc-400 hover:bg-zinc-700 hover:scale-125'
              }`}
              aria-label={`Jump to ${sec.label}`}
              title={isUrdu ? sec.urduLabel : sec.label}
            >
              {isActive && sec.highlight && (
                <Sparkles className="w-2.5 h-2.5 text-white animate-spin" />
              )}
            </button>

            {/* Flyout Label Tooltip on Hover */}
            {(isHovered || isActive) && (
              <div
                className={`absolute ${
                  isUrdu ? 'right-7' : 'left-7'
                } pointer-events-none whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all duration-200 backdrop-blur-md shadow-lg ${
                  isActive
                    ? 'bg-red-600 text-white shadow-red-600/30'
                    : isDark
                    ? 'bg-zinc-900/90 text-zinc-200 border border-zinc-700'
                    : 'bg-white/95 text-zinc-800 border border-zinc-200'
                }`}
              >
                <span>{isUrdu ? sec.urduLabel : sec.label}</span>
                {sec.highlight && (
                  <span className="ml-1.5 text-[9px] uppercase px-1 py-0.2 rounded bg-amber-400 text-black font-extrabold">
                    AI
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
