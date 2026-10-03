import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  ChevronRight,
  X,
  MessageCircle,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { ACADEMY_DATA, StaffMember, buildWhatsAppUrl } from '../data/academy';

interface StaffSectionProps {
  theme: 'dark' | 'light';
  isUrdu: boolean;
}

export const StaffSection: React.FC<StaffSectionProps> = ({ theme, isUrdu }) => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const isDark = theme === 'dark';

  return (
    <section id="faculty" className="py-20 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 mb-3 border border-red-500/20">
            {isUrdu ? 'اساتذہ و رہبر' : 'Expert Instructors'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {isUrdu ? (
              <span className="font-urdu leading-relaxed">بی ایل سی کی سرشار فیکلٹی ٹیم</span>
            ) : (
              <>Academic Faculty &amp; Department Leads</>
            )}
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            } ${isUrdu ? 'font-urdu' : ''}`}
          >
            {isUrdu
              ? 'سر محمد قاسم کی نگرانی میں ہر مضمون کے ماہر اور تجربہ کار اساتذہ جو ہر طالب علم کی انفرادی صلاحیتوں کو نکھارتے ہیں۔'
              : 'Dedicated language mentors, computer trainers, and study advisors trained to deliver personalized student growth.'}
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMY_DATA.faculty.map((member) => (
            <div
              key={member.id}
              className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
              onClick={() => setSelectedStaff(member)}
            >
              {/* Avatar Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${member.avatarColor} text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform`}
                >
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 truncate">
                    {isUrdu ? member.urduName : member.name}
                  </h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold truncate">
                    {isUrdu ? member.urduRole : member.role}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    {member.department}
                  </p>
                </div>
              </div>

              {/* Qualification & Experience */}
              <div className="space-y-1.5 py-3 border-y border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="truncate">{member.qualification}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{member.experience}</span>
                </div>
              </div>

              {/* Bio Teaser */}
              <p
                className={`text-xs text-zinc-500 dark:text-zinc-400 mt-3 line-clamp-2 leading-relaxed ${
                  isUrdu ? 'font-urdu' : ''
                }`}
              >
                {member.bio}
              </p>

              {/* Modal Trigger */}
              <div className="mt-4 flex items-center justify-between text-xs font-bold text-red-600 dark:text-red-400 pt-2">
                <span>View Full Profile</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Faculty Detail Modal */}
        {selectedStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className={`relative max-w-lg w-full p-6 sm:p-8 rounded-3xl border shadow-2xl ${
                isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <button
                onClick={() => setSelectedStaff(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl ${selectedStaff.avatarColor} text-white flex items-center justify-center font-black text-xl shadow-lg`}
                >
                  {selectedStaff.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedStaff.name}</h3>
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                    {selectedStaff.role}
                  </p>
                  <p className="text-xs text-zinc-500">{selectedStaff.department}</p>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Academic Credential:</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {selectedStaff.qualification}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">Experience:</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {selectedStaff.experience}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Academic Focus &amp; Mentorship:
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {selectedStaff.bio}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire With Department</span>
                </a>
                <button
                  onClick={() => setSelectedStaff(null)}
                  className="px-4 py-2.5 rounded-xl font-semibold text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
