import React from 'react';
import { Course } from '../types';
import { PhysicsChemistryCourse } from '../typesPhysicsChemistry';
import { SvtCourse } from '../typesSvt';
import {
  Maximize2,
  Minimize2,
  Menu,
  X,
  BookOpen,
  ChevronDown,
  Calendar,
  Compass,
  FileDown,
  Loader2,
  Atom,
  Calculator,
  LayoutGrid,
  Globe2,
  Mountain,
} from 'lucide-react';

interface TopBarProps {
  activeSubject?: 'math' | 'physics' | 'svt';
  onChangeSubject?: (subject: 'math' | 'physics' | 'svt') => void;
  currentCourse: Course;
  allCourses?: Course[];
  onSelectCourse?: (courseId: string) => void;
  progressPercentage: number;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenCourseSelector: () => void;
  onOpenCurriculum?: () => void;
  isCurriculumView?: boolean;
  onOpenTreatise?: () => void;
  isTreatiseView?: boolean;
  allCoursesCount?: number;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;

  // Physics-Chemistry module props
  physicsCourses?: PhysicsChemistryCourse[];
  currentPhysicsCourse?: PhysicsChemistryCourse;
  physicsViewMode?: 'home' | 'course';
  onOpenPhysicsHome?: () => void;
  onSelectPhysicsCourse?: (courseId: string) => void;

  // SVT module props
  svtCourses?: SvtCourse[];
  currentSvtCourse?: SvtCourse;
  svtViewMode?: 'home' | 'course';
  onOpenSvtHome?: () => void;
  onSelectSvtCourse?: (courseId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeSubject = 'math',
  onChangeSubject,
  currentCourse,
  allCourses = [],
  onSelectCourse,
  isSidebarOpen,
  onToggleSidebar,
  isFullscreen,
  onToggleFullscreen,
  onOpenCourseSelector,
  onOpenCurriculum,
  isCurriculumView,
  onOpenTreatise,
  isTreatiseView,
  allCoursesCount = 21,
  onExportPdf,
  isExportingPdf = false,
  physicsCourses = [],
  currentPhysicsCourse,
  physicsViewMode = 'home',
  onOpenPhysicsHome,
  onSelectPhysicsCourse,
  svtCourses = [],
  currentSvtCourse,
  svtViewMode = 'home',
  onOpenSvtHome,
  onSelectSvtCourse,
}) => {
  const isPhysics = activeSubject === 'physics';
  const isSvt = activeSubject === 'svt';
  const isMath = activeSubject === 'math';

  const shouldShowMobileSidebarToggle =
    (isMath && !isCurriculumView && !isTreatiseView) ||
    (isPhysics && physicsViewMode === 'course') ||
    (isSvt && svtViewMode === 'course');

  return (
    <header
      id="main-topbar"
      dir="rtl"
      className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur border-b border-[#E2D9D0] transition-colors"
    >
      {/* Main Top Row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Right side (RTL Start): Mobile Menu toggle + Subject Switcher + Course identification */}
        <div className="flex items-center gap-2.5 min-w-0">
          {shouldShowMobileSidebarToggle && (
            <button
              id="btn-toggle-mobile-sidebar"
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-[#4A4A4A] hover:text-[#B45309] rounded-lg transition-colors cursor-pointer"
              aria-label="القائمة"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {/* Subject Module Switcher (Mathématiques 3AM | Physique-Chimie 3AM | SVT 3AM) */}
          {onChangeSubject && (
            <div className="flex items-center bg-[#F6F0EB] p-1 rounded-[12px] border border-[#E2D9D0] shrink-0 overflow-x-auto max-w-[280px] sm:max-w-none">
              <button
                type="button"
                onClick={() => onChangeSubject('math')}
                className={`px-2.5 py-1.5 rounded-[9px] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isMath
                    ? 'bg-[#C94BA6] text-white shadow-2xs'
                    : 'text-[#4A4A4A] hover:text-[#C94BA6]'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 shrink-0" />
                <span>الرياضيات</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeSubject('physics')}
                className={`px-2.5 py-1.5 rounded-[9px] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isPhysics
                    ? 'bg-[#0F766E] text-white shadow-2xs'
                    : 'text-[#4A4A4A] hover:text-[#0F766E]'
                }`}
              >
                <Atom className="w-3.5 h-3.5 shrink-0" />
                <span>الفيزياء</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeSubject('svt')}
                className={`px-2.5 py-1.5 rounded-[9px] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isSvt
                    ? 'bg-[#B45309] text-white shadow-2xs'
                    : 'text-[#4A4A4A] hover:text-[#B45309]'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5 shrink-0" />
                <span>علوم الطبيعة والحياة (SVT)</span>
              </button>
            </div>
          )}

          {/* Current Course Identification */}
          {isMath ? (
            <button
              id="btn-open-course-selector"
              type="button"
              onClick={onOpenCourseSelector}
              className="hidden sm:flex items-center gap-2.5 text-right py-1 px-2 hover:bg-[#F6F0EB] rounded-[12px] transition-all group min-w-0 cursor-pointer"
              title="تبديل الدرس"
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-[#C94BA6] text-[#C94BA6] font-bold text-xs flex items-center justify-center shrink-0"
                dir="ltr"
              >
                {String(currentCourse.number).replace(/^0+/, '') || currentCourse.number}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-[#8C8C8C] font-medium leading-none flex items-center gap-1">
                  <span>الرياضيات 3AM</span>
                  <span>·</span>
                  <span className="text-[#C94BA6] font-bold">{currentCourse.arabicNumberTitle}</span>
                </div>
                <div className="text-sm font-bold text-[#4A4A4A] leading-tight mt-1 flex items-center gap-1.5">
                  <span className="truncate max-w-[150px] md:max-w-xs">{currentCourse.title}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#C94BA6] shrink-0" />
                </div>
              </div>
            </button>
          ) : isPhysics ? (
            currentPhysicsCourse && (
              <button
                type="button"
                onClick={onOpenPhysicsHome}
                className="hidden sm:flex items-center gap-2.5 text-right py-1 px-2 hover:bg-[#F6F0EB] rounded-[12px] transition-all group min-w-0 cursor-pointer"
                title="العلوم الفيزيائية والتكنولوجيا — Physique-Chimie 3AM"
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-[#0F766E] text-[#0F766E] font-mono font-bold text-xs flex items-center justify-center shrink-0"
                  dir="ltr"
                >
                  {currentPhysicsCourse.numero}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-[#8C8C8C] font-medium leading-none flex items-center gap-1">
                    <span>العلوم الفيزيائية والتكنولوجيا</span>
                    <span>·</span>
                    <span className="text-[#0F766E] font-mono font-bold" dir="ltr">
                      Physique-Chimie 3AM
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#4A4A4A] leading-tight mt-1 flex items-center gap-1.5">
                    <span className="truncate max-w-[150px] md:max-w-xs">
                      {physicsViewMode === 'home'
                        ? 'فهرس الدروس (20 درساً)'
                        : currentPhysicsCourse.titreArabe}
                    </span>
                  </div>
                </div>
              </button>
            )
          ) : (
            currentSvtCourse && (
              <button
                type="button"
                onClick={onOpenSvtHome}
                className="hidden sm:flex items-center gap-2.5 text-right py-1 px-2 hover:bg-[#F6F0EB] rounded-[12px] transition-all group min-w-0 cursor-pointer"
                title="علوم الطبيعة والحياة — SVT 3AM"
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-[#B45309] text-[#B45309] font-mono font-bold text-xs flex items-center justify-center shrink-0"
                  dir="ltr"
                >
                  {currentSvtCourse.numero}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-[#8C8C8C] font-medium leading-none flex items-center gap-1">
                    <span>علوم الطبيعة والحياة</span>
                    <span>·</span>
                    <span className="text-[#B45309] font-mono font-bold" dir="ltr">
                      SVT 3AM
                    </span>
                  </div>
                  <div className="text-sm font-bold text-[#4A4A4A] leading-tight mt-1 flex items-center gap-1.5">
                    <span className="truncate max-w-[150px] md:max-w-xs">
                      {svtViewMode === 'home'
                        ? 'فهرس الدروس والمقاطع'
                        : currentSvtCourse.titreArabe}
                    </span>
                  </div>
                </div>
              </button>
            )
          )}
        </div>

        {/* Left side (RTL End): Module-specific utility actions */}
        <div className="flex items-center gap-2 shrink-0">
          {isMath ? (
            <>
              {onExportPdf && (
                <button
                  id="btn-export-course-pdf"
                  type="button"
                  onClick={onExportPdf}
                  disabled={isExportingPdf}
                  title={`تحميل الدرس ${currentCourse.number} بصيغة PDF`}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[10px] bg-[#C94BA6] hover:opacity-90 text-white border border-[#C94BA6] transition-all cursor-pointer disabled:opacity-60"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FileDown className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {isExportingPdf ? 'جاري التحميل...' : 'حفظ PDF'}
                  </span>
                  <span className="sm:hidden">PDF</span>
                </button>
              )}

              {onOpenTreatise && (
                <button
                  type="button"
                  onClick={onOpenTreatise}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[10px] border transition-all cursor-pointer ${
                    isTreatiseView
                      ? 'bg-[#C94BA6] text-white border-[#C94BA6]'
                      : 'bg-white hover:bg-[#C94BA6]/10 text-[#C94BA6] border-[#C94BA6]/40'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">مرجع خواص الهندسة (69)</span>
                  <span className="sm:hidden">خواص (69)</span>
                </button>
              )}

              {onOpenCurriculum && (
                <button
                  type="button"
                  onClick={onOpenCurriculum}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[10px] border transition-all cursor-pointer ${
                    isCurriculumView
                      ? 'bg-[#C94BA6] text-white border-[#C94BA6]'
                      : 'bg-white hover:bg-[#C94BA6]/10 text-[#C94BA6] border-[#C94BA6]/40'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">التدرج السنوي</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenCourseSelector}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C94BA6] bg-white hover:bg-[#C94BA6]/10 border border-[#C94BA6]/40 px-2.5 py-1.5 rounded-[10px] transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>الدروس ({allCoursesCount})</span>
              </button>
            </>
          ) : isPhysics ? (
            <>
              {onExportPdf && currentPhysicsCourse && (
                <button
                  id="btn-export-physics-pdf"
                  type="button"
                  onClick={onExportPdf}
                  disabled={isExportingPdf}
                  title={`حفظ الدرس ${currentPhysicsCourse.numero} بصيغة PDF`}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[10px] bg-[#0F766E] hover:opacity-90 text-white border border-[#0F766E] transition-all cursor-pointer disabled:opacity-60"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FileDown className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {isExportingPdf
                      ? 'جاري التحميل...'
                      : `حفظ الدرس ${currentPhysicsCourse.numero} PDF`}
                  </span>
                  <span className="sm:hidden">PDF</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenPhysicsHome}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[10px] border transition-all cursor-pointer ${
                  physicsViewMode === 'home'
                    ? 'bg-[#0F766E] text-white border-[#0F766E]'
                    : 'bg-white hover:bg-[#0F766E]/10 text-[#0F766E] border-[#0F766E]/40'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>الرئيسية ({physicsCourses.length})</span>
              </button>
            </>
          ) : (
            <>
              {onExportPdf && currentSvtCourse && (
                <button
                  id="btn-export-svt-pdf"
                  type="button"
                  onClick={onExportPdf}
                  disabled={isExportingPdf}
                  title={`حفظ الدرس ${currentSvtCourse.numero} بصيغة PDF`}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[10px] bg-[#B45309] hover:opacity-90 text-white border border-[#B45309] transition-all cursor-pointer disabled:opacity-60"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FileDown className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {isExportingPdf
                      ? 'جاري التحميل...'
                      : `حفظ الدرس ${currentSvtCourse.numero} PDF`}
                  </span>
                  <span className="sm:hidden">PDF</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenSvtHome}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-[10px] border transition-all cursor-pointer ${
                  svtViewMode === 'home'
                    ? 'bg-[#B45309] text-white border-[#B45309]'
                    : 'bg-white hover:bg-[#B45309]/10 text-[#B45309] border-[#B45309]/40'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>فهرس SVT ({svtCourses.length})</span>
              </button>
            </>
          )}

          <button
            id="btn-toggle-fullscreen"
            type="button"
            onClick={onToggleFullscreen}
            className="hidden sm:flex p-2 text-[#4A4A4A] hover:text-[#B45309] rounded-lg transition-colors cursor-pointer"
            title={isFullscreen ? 'الخروج من ملء الشاشة' : 'ملء الشاشة'}
            aria-label="ملء الشاشة"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Lesson Switcher Bar for Mathématiques */}
      {isMath && !isCurriculumView && onSelectCourse && allCourses.length > 0 && (
        <div className="bg-[#F6F0EB]/80 border-t border-[#E2D9D0] px-4 sm:px-6 py-1.5 overflow-x-auto">
          <div className="max-w-6xl mx-auto flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[11px] font-bold text-[#8C8C8C] ml-1 shrink-0">
              دروس الرياضيات :
            </span>
            {allCourses.map((c) => {
              const isCurrent = c.id === currentCourse.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectCourse(c.id)}
                  title={`${c.arabicNumberTitle}: ${c.title}`}
                  className={`px-2 py-0.5 rounded-[8px] text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#C94BA6] text-white'
                      : 'bg-white text-[#4A4A4A] border border-[#E2D9D0] hover:border-[#C94BA6] hover:text-[#C94BA6]'
                  }`}
                  dir="ltr"
                >
                  {Number(c.number)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Lesson Switcher Bar for Physique-Chimie */}
      {isPhysics && onSelectPhysicsCourse && physicsCourses.length > 0 && (
        <div className="bg-[#F6F0EB]/80 border-t border-[#E2D9D0] px-4 sm:px-6 py-1.5 overflow-x-auto">
          <div className="max-w-6xl mx-auto flex items-center gap-1.5 whitespace-nowrap">
            <button
              type="button"
              onClick={onOpenPhysicsHome}
              className={`px-2.5 py-0.5 rounded-[8px] text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                physicsViewMode === 'home'
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-white text-[#4A4A4A] border border-[#E2D9D0] hover:border-[#0F766E] hover:text-[#0F766E]'
              }`}
            >
              فهرس الوحدة
            </button>
            <span className="text-[11px] font-bold text-[#8C8C8C] mx-1 shrink-0">
              الدروس (01 ← 20) :
            </span>
            {physicsCourses.map((pc) => {
              const isCurrent =
                physicsViewMode === 'course' &&
                currentPhysicsCourse &&
                pc.id === currentPhysicsCourse.id;
              return (
                <button
                  key={pc.id}
                  type="button"
                  onClick={() => onSelectPhysicsCourse(pc.id)}
                  title={`${pc.titreArabe} (${pc.domaineNomFrancais})`}
                  className={`px-2 py-0.5 rounded-[8px] text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-white text-[#4A4A4A] border border-[#E2D9D0] hover:border-[#0F766E] hover:text-[#0F766E]'
                  }`}
                  dir="ltr"
                >
                  {pc.numero}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Lesson Switcher Bar for SVT 3AM */}
      {isSvt && onSelectSvtCourse && svtCourses.length > 0 && (
        <div className="bg-[#F6F0EB]/80 border-t border-[#E2D9D0] px-4 sm:px-6 py-1.5 overflow-x-auto">
          <div className="max-w-6xl mx-auto flex items-center gap-1.5 whitespace-nowrap">
            <button
              type="button"
              onClick={onOpenSvtHome}
              className={`px-2.5 py-0.5 rounded-[8px] text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                svtViewMode === 'home'
                  ? 'bg-[#B45309] text-white'
                  : 'bg-white text-[#4A4A4A] border border-[#E2D9D0] hover:border-[#B45309] hover:text-[#B45309]'
              }`}
            >
              فهرس المقاطع
            </button>
            <span className="text-[11px] font-bold text-[#8C8C8C] mx-1 shrink-0">
              دروس علوم الطبيعة والحياة :
            </span>
            {svtCourses.map((sc) => {
              const isCurrent =
                svtViewMode === 'course' &&
                currentSvtCourse &&
                sc.id === currentSvtCourse.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => onSelectSvtCourse(sc.id)}
                  title={`${sc.titreArabe} (${sc.domaineNomFrancais})`}
                  className={`px-2 py-0.5 rounded-[8px] text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#B45309] text-white'
                      : 'bg-white text-[#4A4A4A] border border-[#E2D9D0] hover:border-[#B45309] hover:text-[#B45309]'
                  }`}
                  dir="ltr"
                >
                  {sc.numero}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
