import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Calendar,
  Monitor,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Award,
} from 'lucide-react';
import { ACADEMY_DATA, Course, buildWhatsAppUrl } from '../data/academy';

interface CoursesSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ theme, isUrdu }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'english' | 'computer'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isDark = theme === 'dark';

  // Only display english & computer in this section, as AI Bootcamp has its own dedicated futuristic section
  const filteredCourses = ACADEMY_DATA.courses
    .filter((c) => c.category !== 'ai')
    .filter((c) => (activeFilter === 'all' ? true : c.category === activeFilter));

  return (
    <section id="courses" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 mb-3 border border-red-500/20">
              {isUrdu ? 'تعلیمی پروگرامز' : 'Academic Curriculum'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {isUrdu ? (
                <span className="font-urdu leading-relaxed">انگلش اور کمپیوٹر کورسز</span>
              ) : (
                <>Language &amp; Digital Skills Programs</>
              )}
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
              {isUrdu
                ? 'پروفیشنل اور مصدقہ کورسز جو آپ کی تعلیمی اور کیریئر کی ضروریات کو پورا کرتے ہیں۔'
                : 'Intensive, practical training designed to achieve guaranteed score benchmarks and workplace fluency.'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {isUrdu ? 'تمام کورسز' : 'All Programs'}
            </button>
            <button
              onClick={() => setActiveFilter('english')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'english'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {isUrdu ? 'انگلش لینگویج' : 'English Language'}
            </button>
            <button
              onClick={() => setActiveFilter('computer')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'computer'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {isUrdu ? 'کمپیوٹر و آئی ٹی' : 'Computer & IT'}
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isExpanded = expandedId === course.id;

            return (
              <div
                key={course.id}
                className={`flex flex-col justify-between rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                  course.popular
                    ? isDark
                      ? 'bg-zinc-900/90 border-red-500/40 shadow-red-950/20'
                      : 'bg-white border-red-300 shadow-red-100'
                    : isDark
                    ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {/* Card Top */}
                <div className="p-6">
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                      {course.category === 'english' ? 'English Division' : 'IT Division'}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      {course.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold tracking-tight mb-2">
                    {isUrdu ? course.urduTitle : course.title}
                  </h3>

                  {/* Short Description */}
                  <p
                    className={`text-xs sm:text-sm mb-4 leading-relaxed ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    } ${isUrdu ? 'font-urdu' : ''}`}
                    dir={isUrdu ? 'rtl' : 'ltr'}
                  >
                    {isUrdu ? course.urduShortDesc : course.shortDesc}
                  </p>

                  {/* Metadata Specs */}
                  <div className="space-y-2 py-3 border-y border-zinc-100 dark:border-zinc-800/80 text-xs">
                    <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-red-500" />
                        <span>Duration:</span>
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {course.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span>Timings:</span>
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {course.timing}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Mode:</span>
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-right">
                        {course.mode}
                      </span>
                    </div>
                  </div>

                  {/* Modules Accordion */}
                  <div className="mt-4">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : course.id)}
                      className="flex items-center justify-between w-full text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Syllabus Details' : 'View Syllabus Breakdown'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 pt-3 space-y-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 animate-in fade-in duration-200">
                        <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                          Key Modules Covered:
                        </p>
                        <ul className="space-y-1.5">
                          {course.modules.map((mod, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{mod}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2">
                          <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                            Included Privileges:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {course.features.map((feat, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Fee Notice & CTA */}
                <div className="p-6 pt-0 mt-2">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400">Tuition Fee:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      {course.feeNotice}
                    </span>
                  </div>

                  <a
                    href={buildWhatsAppUrl('course', course.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{isUrdu ? 'فیس و شیڈول کی معلومات واٹس ایپ پر' : 'Inquire on WhatsApp'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
