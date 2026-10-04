import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { BookOpen, CheckCircle, Clock, X, ChevronLeft, Search, ArrowUpDown, Sparkles, FileDown } from 'lucide-react';

interface CourseSelectorModalProps {
  courses: Course[];
  currentCourseId: string;
  onSelectCourse: (courseId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onExportCoursePdf?: (course: Course) => void;
  isExportingPdf?: boolean;
}

export const CourseSelectorModal: React.FC<CourseSelectorModalProps> = ({
  courses,
  currentCourseId,
  onSelectCourse,
  isOpen,
  onClose,
  onExportCoursePdf,
  isExportingPdf = false,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reverseOrder, setReverseOrder] = useState<boolean>(false);

  const filteredCourses = useMemo<Course[]>(() => {
    const filtered = courses.filter((c) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.arabicNumberTitle.toLowerCase().includes(q) ||
        c.number.includes(q) ||
        c.topic.toLowerCase().includes(q)
      );
    });
    return reverseOrder ? [...filtered].reverse() : filtered;
  }, [courses, searchQuery, reverseOrder]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  فهرس دروس الرياضيات · 3AM ({courses.length} درساً)
                </h2>
                <p className="text-xs text-slate-500">
                  اختر الدرس الذي ترغب في مطالعته ودراسته وفق التدرج البيداغوجي (01 ← 20)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Order Controls */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث برقم الدرس (مثلاً 18، 19، 20...) أو العنوان..."
                className="w-full pr-9 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-indigo-500 focus:outline-hidden"
              />
            </div>
            <button
              type="button"
              onClick={() => setReverseOrder(!reverseOrder)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 shrink-0"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600" />
              <span>{reverseOrder ? 'الأحدث أولاً (20 ← 01)' : 'الترتيب البيداغوجي (01 ← 20)'}</span>
            </button>
          </div>

          {/* Quick Jump to Geometry Lessons (18, 19, 20) */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] font-bold text-indigo-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>المثلث القائم والدائرة (18 — 20):</span>
            </span>
            {['lesson-18', 'lesson-19', 'lesson-20'].map((id) => {
              const c = courses.find((item) => item.id === id);
              if (!c) return null;
              const active = c.id === currentCourseId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    onSelectCourse(c.id);
                    onClose();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-indigo-50/70 text-indigo-800 border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  {c.number} — {c.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="p-5 overflow-y-auto space-y-3">
          {filteredCourses.map((course) => {
            const isSelected = course.id === currentCourseId;

            return (
              <div
                key={course.id}
                className={`w-full text-right p-4 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/10'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectCourse(course.id);
                    onClose();
                  }}
                  className="flex items-start gap-3.5 text-right flex-1 min-w-0 cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}
                  >
                    {course.number}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-400">
                        {course.arabicNumberTitle}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-indigo-600 font-medium">
                        {course.topic}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                      {course.heroDescription}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-2 shrink-0">
                  {onExportCoursePdf && (
                    <button
                      type="button"
                      disabled={isExportingPdf}
                      onClick={(e) => {
                        e.stopPropagation();
                        onExportCoursePdf(course);
                      }}
                      title={`تحميل الدرس ${course.number} بصيغة PDF`}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  )}

                  <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>

                  {isSelected ? (
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> قيد الدراسة
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCourse(course.id);
                        onClose();
                      }}
                      className="p-1 text-slate-300 group-hover:text-slate-600"
                    >
                      <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
          <span>المنهاج الجزائري الرسمي · السنة الثالثة متوسط</span>
          <span className="font-semibold text-slate-700">
            {courses.length} درساً تفاعلياً متوفراً (01 ← 20)
          </span>
        </div>
      </div>
    </div>
  );
};
