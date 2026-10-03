import React, { useState, useMemo } from 'react';
import { OFFICIAL_CURRICULUM, CurriculumTerm, CurriculumItem } from '../data/curriculumData';
import { Course } from '../types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  Layers,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Compass,
  FileCheck,
  Palmtree,
  Award
} from 'lucide-react';

interface CurriculumProgressPageProps {
  allCourses: Course[];
  onSelectCourse: (courseId: string) => void;
  onBackToCourse: () => void;
}

export const CurriculumProgressPage: React.FC<CurriculumProgressPageProps> = ({
  allCourses,
  onSelectCourse,
  onBackToCourse,
}) => {
  const [selectedTerm, setSelectedTerm] = useState<'all' | 'term1' | 'term2' | 'term3'>('all');
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'numerical' | 'geometric' | 'data'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyImplemented, setOnlyImplemented] = useState<boolean>(false);

  // Statistics
  const stats = useMemo(() => {
    let totalItems = 0;
    let implementedItems = 0;
    let term1Total = 0;
    let term1Done = 0;

    OFFICIAL_CURRICULUM.forEach((t) => {
      t.weeks.forEach((w) => {
        w.items.forEach((item) => {
          if (item.domain !== 'exam') {
            totalItems++;
            if (item.implemented) implementedItems++;
            if (t.termId === 'term1') {
              term1Total++;
              if (item.implemented) term1Done++;
            }
          }
        });
      });
    });

    return {
      totalItems,
      implementedItems,
      term1Percentage: Math.round((term1Done / term1Total) * 100),
      totalCoursesCount: allCourses.length,
    };
  }, [allCourses]);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return OFFICIAL_CURRICULUM.filter((t) => {
      if (selectedTerm !== 'all' && t.termId !== selectedTerm) return false;
      return true;
    }).map((term) => {
      const filteredWeeks = term.weeks.map((week) => {
        const filteredItems = week.items.filter((item) => {
          if (onlyImplemented && !item.implemented) return false;
          if (selectedDomain !== 'all' && item.domain !== selectedDomain && item.domain !== 'integration') {
            return false;
          }
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchesTitle = item.title.toLowerCase().includes(q);
            const matchesNotes = item.notes ? item.notes.toLowerCase().includes(q) : false;
            if (!matchesTitle && !matchesNotes) return false;
          }
          return true;
        });

        return {
          ...week,
          items: filteredItems,
        };
      }).filter((w) => w.isVacation || w.items.length > 0);

      return {
        ...term,
        weeks: filteredWeeks,
      };
    }).filter((t) => t.weeks.length > 0);
  }, [selectedTerm, selectedDomain, searchQuery, onlyImplemented]);

  const getDomainBadge = (domain: string) => {
    switch (domain) {
      case 'numerical':
        return { label: 'أنشطة عددية', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'geometric':
        return { label: 'أنشطة هندسية', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'data':
        return { label: 'تنظيم معطيات وتناسبية', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'integration':
        return { label: 'إدماج وتقويم', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'exam':
        return { label: 'امتحان رسمي', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      default:
        return { label: 'عام', color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24 text-slate-800" dir="rtl">
      {/* Top sticky sub-header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToCourse}
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للدرس الحالي</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-xs text-slate-400 hidden sm:inline">المنهاج الوزاري الرسمي 3AM</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{allCourses.length} درساً تفاعلياً مكتملة</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-l from-indigo-900 via-indigo-950 to-slate-950 text-white py-12 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 border border-white/15 text-xs font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>الجمهورية الجزائرية الديمقراطية الشعبية · وزارة التربية الوطنية</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              التدرج السنوي للتعلمات في مادة الرياضيات
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              خارطة الطريق الرسمية للجيل الثاني (السنة الثالثة متوسط) مقسمة على الفصول الثلاثة والأسابيع التعليمية،
              مربوطة مباشرة بالدروس التفاعلية والمعامل الرقمية المتاحة داخل التطبيق.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <span className="text-[11px] text-slate-300 block mb-1">الدروس التفاعلية المنجزة</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">{allCourses.length}</span>
              <span className="text-[10px] text-slate-300 block mt-0.5">معامل تفاعلية متقدمة</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <span className="text-[11px] text-slate-300 block mb-1">تغطية الفصل الأول</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {stats.term1Percentage}%
              </span>
              <span className="text-[10px] text-slate-300 block mt-0.5">سبتمبر، أكتوبر ومنتصف نوفمبر</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <span className="text-[11px] text-slate-300 block mb-1">المحاور التعليمية</span>
              <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">3</span>
              <span className="text-[10px] text-slate-300 block mt-0.5">فصول دراسية شاملة</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <span className="text-[11px] text-slate-300 block mb-1">مطابقة المنهاج</span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-300 font-mono">100%</span>
              <span className="text-[10px] text-slate-300 block mt-0.5">تدرج الجيل الثاني الرسمي</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Filter & Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-8 space-y-8">
        {/* Filter Controls Card */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          {/* Term Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>اختر الفصل الدراسي:</span>
            </span>

            <div className="flex bg-slate-100 p-1 rounded-2xl flex-wrap gap-1">
              <button
                type="button"
                onClick={() => setSelectedTerm('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTerm === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                البرنامج كاملاً (3 فصول)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTerm('term1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTerm === 'term1'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الفصل الأول (سبتمبر — نوفمبر)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTerm('term2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTerm === 'term2'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الفصل الثاني (جانفي — مارس)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTerm('term3')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTerm === 'term3'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الفصل الثالث (أفريل — ماي)
              </button>
            </div>
          </div>

          {/* Secondary Filters: Domain, Status & Search */}
          <div className="grid md:grid-cols-3 gap-3 pt-1">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مورد، درس، خاصية..."
                className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-indigo-500 focus:outline-hidden transition-all"
              />
            </div>

            {/* Domain Selector */}
            <div className="flex bg-slate-50 border border-slate-200 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedDomain('all')}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedDomain === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                كل الميادين
              </button>
              <button
                type="button"
                onClick={() => setSelectedDomain('numerical')}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedDomain === 'numerical' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                أنشطة عددية
              </button>
              <button
                type="button"
                onClick={() => setSelectedDomain('geometric')}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedDomain === 'geometric' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                أنشطة هندسية
              </button>
            </div>

            {/* Status Checkbox */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl w-full hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={onlyImplemented}
                  onChange={(e) => setOnlyImplemented(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 accent-indigo-600"
                />
                <span>عرض الدروس المتوفرة بالتطبيق فقط ({allCourses.length})</span>
              </label>
            </div>
          </div>
        </div>

        {/* Curriculum Timeline Render */}
        <div className="space-y-10">
          {filteredTerms.map((term) => (
            <div
              key={term.termId}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden"
            >
              {/* Term Header */}
              <div
                className={`p-6 sm:p-7 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  term.termId === 'term1'
                    ? 'bg-gradient-to-l from-indigo-50/70 to-slate-50'
                    : term.termId === 'term2'
                    ? 'bg-gradient-to-l from-emerald-50/70 to-slate-50'
                    : 'bg-gradient-to-l from-amber-50/70 to-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${term.badgeColor}`}
                    >
                      {term.termTitle}
                    </span>
                    <span className="text-xs font-medium text-slate-500">الفترة: {term.period}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {term.termArabicSubtitle}
                  </h2>
                </div>

                {(term.termId === 'term1' || term.termId === 'term2') && (
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 text-xs font-bold text-indigo-700">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>إجمالي الدروس المتوفرة: {allCourses.length} درساً تفاعلياً</span>
                  </div>
                )}
              </div>

              {/* Weeks List */}
              <div className="divide-y divide-slate-100">
                {term.weeks.map((week, wIdx) => {
                  if (week.isVacation) {
                    return (
                      <div
                        key={wIdx}
                        className="p-5 bg-amber-50/40 flex items-center justify-between gap-4 text-amber-900"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                            <Palmtree className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold">{week.vacationTitle}</span>
                            <span className="text-[11px] text-amber-700/80 block">
                              فترة عطلة مدرسية مبرمجة في التدرج الوزاري
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-100/70">
                          {week.month}
                        </span>
                      </div>
                    );
                  }

                  if (week.isExam) {
                    return (
                      <div
                        key={wIdx}
                        className="p-5 bg-rose-50/50 flex items-center justify-between gap-4 text-rose-950"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold">
                              {week.items[0]?.title || 'فترة الاختبارات الرسمية'}
                            </span>
                            <span className="text-[11px] text-rose-700/80 block">
                              تقييم ختامي شامل لكفاءات الفصل
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800">
                          {week.month} · الأسبوع {week.weekNumber}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div key={wIdx} className="p-5 sm:p-6 space-y-3 hover:bg-slate-50/50 transition-colors">
                      {/* Week & Month Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-600" />
                          <span className="text-xs font-bold text-slate-800">
                            {week.month} — الأسبوع {week.weekNumber}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {week.items.length} موارد / أنشطة
                        </span>
                      </div>

                      {/* Items in Week */}
                      <div className="space-y-2.5">
                        {week.items.map((item) => {
                          const badge = getDomainBadge(item.domain);
                          const linkedCourse = item.linkedCourseId
                            ? allCourses.find((c) => c.id === item.linkedCourseId)
                            : null;

                          return (
                            <div
                              key={item.id}
                              className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                item.implemented
                                  ? 'bg-white border-emerald-200 hover:border-emerald-300 shadow-xs'
                                  : 'bg-slate-50/70 border-slate-200/80'
                              }`}
                            >
                              <div className="space-y-1.5 max-w-2xl">
                                <div className="flex items-center gap-2 flex-wrap">
                                  {(item.courseNumber || linkedCourse?.number) && (
                                    <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded-md bg-indigo-600 text-white shadow-2xs">
                                      الدرس {item.courseNumber || linkedCourse?.number}
                                    </span>
                                  )}
                                  <span
                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.color}`}
                                  >
                                    {badge.label}
                                  </span>

                                  {item.implemented ? (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>متاح في التطبيق ({linkedCourse?.arabicNumberTitle || 'درس تفاعلي'})</span>
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>مقرر في التدرج ({item.courseNumber ? `الدرس ${item.courseNumber}` : 'خطة التطوير'})</span>
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                  {item.courseNumber ? `${item.courseNumber}. ${item.title}` : item.title}
                                </p>

                                {item.notes && (
                                  <p className="text-[11px] text-slate-500">{item.notes}</p>
                                )}
                              </div>

                              {/* Action Link for Implemented items */}
                              {item.implemented && item.linkedCourseId && (
                                <button
                                  type="button"
                                  onClick={() => onSelectCourse(item.linkedCourseId!)}
                                  className="self-start sm:self-center px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 hover:scale-105 active:scale-95"
                                >
                                  <span>افتح الدرس التفاعلي</span>
                                  <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
