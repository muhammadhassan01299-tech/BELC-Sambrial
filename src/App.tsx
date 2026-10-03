/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { AIBootcampSection } from './components/AIBootcampSection';
import { VisaSection } from './components/VisaSection';
import { UmrahSection } from './components/UmrahSection';
import { DirectorSection } from './components/DirectorSection';
import { StaffSection } from './components/StaffSection';
import { CampusGallery } from './components/CampusGallery';
import { ContactSection } from './components/ContactSection';
import { Chatbot } from './components/Chatbot';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModals';
import { SectionReveal } from './components/SectionReveal';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ScrollExtras } from './components/ScrollExtras';
import { ThunderCursorCanvas } from './components/ThunderCursorCanvas';
import { VerticalDotNav } from './components/VerticalDotNav';

export default function App() {
  // Read the saved theme BEFORE the first paint (no dark->light flash on reload)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('belc_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      /* private mode: ignore */
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const [isUrdu, setIsUrdu] = useState<boolean>(() => {
    try {
      return localStorage.getItem('belc_lang') === 'ur';
    } catch {
      return false;
    }
  });
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Put/remove the "dark" class on <html> and remember the choice
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('belc_theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // Keep <html lang/dir> in sync with the language switch and remember it
  useEffect(() => {
    document.documentElement.lang = isUrdu ? 'ur' : 'en';
    document.documentElement.dir = isUrdu ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('belc_lang', isUrdu ? 'ur' : 'en');
    } catch {
      /* ignore */
    }
  }, [isUrdu]);

  return (
    <div
      // "isolate" is the important part: without it the solid page colour was painted
      // on TOP of the background layer and hid it (that is why it looked plain black/white).
      className={`min-h-screen relative isolate transition-colors duration-300 ${
        theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
      }`}
      dir={isUrdu ? 'rtl' : 'ltr'}
    >
      {/* Animated background: gradient, particles, thunder, floating pencils/pens/books */}
      <AnimatedBackground theme={theme} />

      {/* Scroll progress bar + back-to-top button */}
      <ScrollExtras isUrdu={isUrdu} />

      {/* Interactive Lightning & Thunder Spark Cursor Trail */}
      <ThunderCursorCanvas />

      {/* Vertical Dot-Navigation Sidebar */}
      <VerticalDotNav isUrdu={isUrdu} theme={theme} />

      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        isUrdu={isUrdu}
        setIsUrdu={setIsUrdu}
      />

      <main>
        {/* Hero Section with Integrated Urdu Voice Assistant */}
        <SectionReveal>
          <HeroSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* About Section: Story, Mission, Facilities */}
        <SectionReveal>
          <AboutSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* English & Computer Courses with Syllabus & Inquiries */}
        <SectionReveal>
          <CoursesSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* Flagship Futuristic 8-Week AI Bootcamp */}
        <SectionReveal>
          <AIBootcampSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* Study Visa Assistance (China MBBS & Global) */}
        <SectionReveal>
          <VisaSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* Spiritual Umrah Services & Seasonal Packages */}
        <SectionReveal>
          <UmrahSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* Director Sir Muhammad Qasim Section */}
        <SectionReveal>
          <DirectorSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* Faculty & Department Leads */}
        <SectionReveal>
          <StaffSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* Campus Atmosphere, Student Testimonials & Certificate Specimen */}
        <SectionReveal>
          <CampusGallery theme={theme} isUrdu={isUrdu} />
        </SectionReveal>

        {/* Campus Location, Google Map & Admission Inquiry Form */}
        <SectionReveal>
          <ContactSection theme={theme} isUrdu={isUrdu} />
        </SectionReveal>
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        isUrdu={isUrdu}
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
      />

      {/* Floating Smart Chatbot (Verified KB with direct WhatsApp escalation) */}
      <Chatbot theme={theme} isUrdu={isUrdu} />

      {/* Sticky Floating WhatsApp Action with Quick Topics */}
      <WhatsAppFloating isUrdu={isUrdu} />

      {/* Privacy Policy and Terms Modals */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
        theme={theme}
      />
    </div>
  );
}
