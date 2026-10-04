import React, { useState, useEffect } from 'react';
import { CourseSection, Course } from '../types';
import { ChevronLeft, Layers, Calendar, Compass, FileDown, Loader2, Lock } from 'lucide-react';

const MATH_DISCOVERY_UNLOCKED_STORAGE_KEY = 'math_3am_discovery_unlocked_v1';

interface CourseSidebarProps {
  currentCourse: Course;
  allCourses: Course[];
  onSelectCourse: (courseId: string) => void;
  sections: CourseSection[];
  activeSectionId: string;
  onSelectSection: (sectionId: string) => void;
  progressPercentage: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenCourseSelector: () => void;
  onOpenCurriculum?: () => void;
  onOpenTreatise?: () => void;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  currentCourse,
  allCourses,
  onSelectCourse,
  sections,
  activeSectionId,
  onSelectSection,
  isOpenMobile,
  onCloseMobile,
  onOpenCourseSelector,
  onOpenCurriculum,
  onOpenTreatise,
  onExportPdf,
  isExportingPdf = false,
}) => {
  const [unlockedMathDiscoveryIds, setUnlockedMathDiscoveryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(MATH_DISCOVERY_UNLOCKED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const syncUnlocked = () => {
      try {
        const saved = localStorage.getItem(MATH_DISCOVERY_UNLOCKED_STORAGE_KEY);
        setUnlockedMathDiscoveryIds(saved ? JSON.parse(saved) : []);
      } catch {
        // ignore
      }
    };
    window.addEventListener('math-discovery-unlocked-change', syncUnlocked);
    return () => window.removeEventListener('math-discovery-unlocked-change', syncUnlocked);
  }, []);

  const isDiscoveryCompleted = unlockedMathDiscoveryIds.includes(currentCourse.id);
  const visibleSections = isDiscoveryCompleted ? sections : sections.slice(0, 1);

  const currentIndex = allCourses.findIndex((c) => c.id === currentCourse.id);
  const prevCourse = currentIndex > 0 ? allCourses[currentIndex - 1] : null;
  const nextCourse =
    currentIndex >= 0 && currentIndex < allCourses.length - 1
      ? allCourses[currentIndex + 1]
      : null;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sticky Sommaire à côté de la carte (à droite en RTL) */}
      <aside
        id="course-sidebar"
        dir="rtl"
        className={`fixed lg:sticky top-[118px] right-0 z-30 w-64 sm:w-68 h-[calc(100vh-128px)] bg-[#F6F0EB] lg:bg-transparent p-5 lg:py-2 lg:px-0 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 shrink-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl border-l border-[#E5DDD5]' : 'translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Sommaire Header */}
          <div>
            <div className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wider mb-3 px-1">
              عناصر الدرس
            </div>

            {/* Filet vertical clair à droite avec section active en --accent (#C94BA6) */}
            <nav className="relative border-r-2 border-[#E2D9D0] space-y-1">
              {visibleSections.map((section, idx) => {
                const isActive = activeSectionId === section.id;
                const rawNum = String(section.number ?? idx).trim();
                const numClean =
                  rawNum === '0' || rawNum === '00'
                    ? '0'
                    : rawNum.replace(/^0+/, '') || String(idx);

                return (
                  <button
                    key={section.id}
                    id={`nav-item-${section.id}`}
                    type="button"
                    onClick={() => {
                      onSelectSection(section.id);
                      onCloseMobile();
                    }}
                    className={`relative w-full text-right pr-4 pl-2 py-2 text-xs sm:text-[13px] transition-all flex items-baseline gap-2 cursor-pointer -mr-[2px] border-r-2 ${
                      isActive
                        ? 'border-[#C94BA6] text-[#C94BA6] font-bold'
                        : 'border-transparent text-[#4A4A4A]/80 hover:text-[#C94BA6] font-medium'
                    }`}
                  >
                    <span className="font-bold shrink-0" dir="ltr">
                      {numClean}.
                    </span>
                    <span className="leading-snug">{section.title}</span>
                  </button>
                );
              })}

              {!isDiscoveryCompleted && sections.length > 1 && (
                <div className="mr-2 mt-2 p-2.5 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] text-[11px] text-[#6B6B6B] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#C94BA6]">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>مختصرات الفهرس مقفلة مؤقتًا</span>
                  </div>
                  <p className="leading-relaxed">
                    أكمل أولًا <strong>النشاط الاستكشافي (القسم 0)</strong> لفتح بقية أقسام الدرس والحوصلة.
                  </p>
                </div>
              )}
            </nav>
          </div>

          {/* Navigation entre les cours */}
          <div className="pt-4 border-t border-[#E2D9D0] space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-[#8C8C8C]">
              <span>الدرس {currentCourse.number} من {allCourses.length}</span>
              <button
                type="button"
                onClick={onOpenCourseSelector}
                className="font-bold text-[#C94BA6] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>كل الدروس</span>
                <ChevronLeft className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                disabled={!prevCourse}
                onClick={() => {
                  if (prevCourse) {
                    onSelectCourse(prevCourse.id);
                    onCloseMobile();
                  }
                }}
                className={`px-2.5 py-1.5 rounded-[10px] text-[11px] font-bold border text-center transition-all ${
                  prevCourse
                    ? 'bg-white border-[#E2D9D0] text-[#4A4A4A] hover:border-[#C94BA6] hover:text-[#C94BA6] cursor-pointer'
                    : 'bg-white/40 border-[#E2D9D0]/50 text-[#8C8C8C]/50 cursor-not-allowed'
                }`}
              >
                {prevCourse ? `→ الدرس ${prevCourse.number}` : 'بداية الدروس'}
              </button>
              <button
                type="button"
                disabled={!nextCourse}
                onClick={() => {
                  if (nextCourse) {
                    onSelectCourse(nextCourse.id);
                    onCloseMobile();
                  }
                }}
                className={`px-2.5 py-1.5 rounded-[10px] text-[11px] font-bold border text-center transition-all ${
                  nextCourse
                    ? 'bg-white border-[#E2D9D0] text-[#4A4A4A] hover:border-[#C94BA6] hover:text-[#C94BA6] cursor-pointer'
                    : 'bg-white/40 border-[#E2D9D0]/50 text-[#8C8C8C]/50 cursor-not-allowed'
                }`}
              >
                {nextCourse ? `الدرس ${nextCourse.number} ←` : 'آخر درس'}
              </button>
            </div>
          </div>
        </div>

        {/* Liens de référence et export PDF en bas du sommaire */}
        <div className="pt-4 mt-6 border-t border-[#E2D9D0] space-y-2">
          {onExportPdf && (
            <button
              type="button"
              onClick={() => {
                onCloseMobile();
                onExportPdf();
              }}
              disabled={isExportingPdf}
              className="w-full flex items-center justify-between p-2.5 rounded-[12px] bg-[#C94BA6] hover:opacity-90 text-white transition-all cursor-pointer disabled:opacity-60"
            >
              <div className="flex items-center gap-2">
                {isExportingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                <span className="text-xs font-bold">
                  {isExportingPdf ? 'جاري تجهيز ملف PDF...' : `تحميل الدرس ${currentCourse.number} بصيغة PDF`}
                </span>
              </div>
              <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded" dir="ltr">
                PDF
              </span>
            </button>
          )}

          {onOpenTreatise && (
            <button
              type="button"
              onClick={() => {
                onCloseMobile();
                onOpenTreatise();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-[12px] bg-white hover:bg-[#C94BA6]/5 border border-[#E2D9D0] hover:border-[#C94BA6] text-[#4A4A4A] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C94BA6]" />
                <div className="text-right">
                  <div className="text-xs font-bold text-[#4A4A4A] group-hover:text-[#C94BA6]">
                    مرجع البرهان الهندسي (69)
                  </div>
                </div>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-[#C94BA6]" />
            </button>
          )}

          {onOpenCurriculum && (
            <button
              type="button"
              onClick={() => {
                onCloseMobile();
                onOpenCurriculum();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-[12px] bg-white hover:bg-[#C94BA6]/5 border border-[#E2D9D0] hover:border-[#C94BA6] text-[#4A4A4A] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C94BA6]" />
                <div className="text-right">
                  <div className="text-xs font-bold text-[#4A4A4A] group-hover:text-[#C94BA6]">
                    التدرج السنوي للمنهاج
                  </div>
                </div>
              </div>
              <ChevronLeft className="w-3.5 h-3.5 text-[#C94BA6]" />
            </button>
          )}

          <button
            type="button"
            onClick={onOpenCourseSelector}
            className="w-full flex items-center justify-between p-2.5 rounded-[12px] bg-white hover:bg-[#C94BA6]/5 border border-[#E2D9D0] hover:border-[#C94BA6] text-[#4A4A4A] transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#C94BA6]" />
              <span className="text-xs font-semibold">فهرس الدروس ({allCourses.length})</span>
            </div>
            <span className="text-[11px] font-bold text-[#C94BA6]">عرض ←</span>
          </button>
        </div>
      </aside>
    </>
  );
};
