import React, { useState, useEffect } from 'react';
import {
  SvtCourse,
  SvtCourseSection,
  SvtContentBlock,
} from '../../typesSvt';
import {
  SvtTrilingualTermBox,
  SvtDefinitionBlock,
  SvtObservationBlock,
  SvtInvestigationBlock,
  SvtTableBlock,
  SvtDiscoveryBlock,
  SvtCommonMistakesBlock,
  SvtApplicationCard,
  SvtIllustrationBlock,
  SvtEmbeddedQuestionBlock,
} from './SvtBlocks';
import { SvtSchemaRenderer } from './SvtSchemas';
import { SvtCourseEssentialBlock } from './SvtCourseEssentialBlock';
import {
  getSvtDomainTheme,
  SvtDomainThemeProvider,
} from './svtThemeTokens';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Star,
  Globe2,
  Mountain,
  Layers,
  Languages,
  FileDown,
  Loader2,
  X,
  ListChecks,
  AlertTriangle,
} from 'lucide-react';

interface SvtCourseViewProps {
  course: SvtCourse;
  allCourses: SvtCourse[];
  completedCourseIds: string[];
  favoriteCourseIds: string[];
  onSelectCourse: (courseId: string) => void;
  onBackToModuleHome: () => void;
  onToggleCompleted: (courseId: string) => void;
  onToggleFavorite: (courseId: string) => void;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
  isSidebarOpenMobile: boolean;
  onCloseMobileSidebar: () => void;
}

export const SvtCourseView: React.FC<SvtCourseViewProps> = ({
  course,
  allCourses,
  completedCourseIds,
  favoriteCourseIds,
  onSelectCourse,
  onBackToModuleHome,
  onToggleCompleted,
  onToggleFavorite,
  onExportPdf,
  isExportingPdf = false,
  isSidebarOpenMobile,
  onCloseMobileSidebar,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'lesson' | 'activities' | 'exercises'>('all');
  // Split sections according to the imperative pedagogical template:
  // 1. Situation de départ (discoveryActivity)
  // 2. Observation et exploitation des documents (observationSection)
  // 3. Bloc « أحتفظ بالأهم » (essential)
  // 4. Exercices visibles (applications)
  // 5. Accordéon « للتعمق » (deepenSections + flowchart + synthesis + vocab + teacherNotes)
  const observationSection =
    course.sections.find(
      (sec) => sec.id === 'sec-svt-01-docs' || sec.titleArabic.includes('ملاحظة الوثائق')
    ) || (course.sections.length > 0 && course.sections[0].shortLabel?.includes('ملاحظة') ? course.sections[0] : null);

  const deepenSections = observationSection
    ? course.sections.filter((s) => s.id !== observationSection.id)
    : course.sections;

  const [activeSectionId, setActiveSectionId] = useState<string>('sec-svt-discovery');
  // Accordion « للتعمق » is collapsed by default on the web, and always open in PDF export
  const [isDeepenExpanded, setIsDeepenExpanded] = useState<boolean>(false);

  const theme = getSvtDomainTheme(course.domaine);
  const DomainIcon = theme.PrimaryIcon;
  const isCompleted = completedCourseIds.includes(course.id);
  const isFavorite = favoriteCourseIds.includes(course.id);

  // Compute previous and next courses
  const currentIndex = allCourses.findIndex((c) => c.id === course.id);
  const prevCourse = currentIndex > 0 ? allCourses[currentIndex - 1] : null;
  const nextCourse = currentIndex < allCourses.length - 1 ? allCourses[currentIndex + 1] : null;

  useEffect(() => {
    setActiveSectionId('sec-svt-discovery');
    setIsDeepenExpanded(false);
    window.scrollTo({ top: 0 });
  }, [course.id]);

  useEffect(() => {
    const handlePreparePdf = () => {
      setActiveTab('all');
      setIsDeepenExpanded(true);
    };
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    window.addEventListener('beforeprint', handlePreparePdf);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePreparePdf);
      window.removeEventListener('beforeprint', handlePreparePdf);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    onCloseMobileSidebar();

    const isDeepenTarget =
      deepenSections.some((s) => s.id === id) ||
      id === 'sec-svt-deepen-accordion';

    if (isDeepenTarget) {
      setIsDeepenExpanded(true);
    }

    setTimeout(
      () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      isDeepenTarget ? 60 : 0
    );
  };

  const renderContentBlock = (block: SvtContentBlock, idx: number) => {
    switch (block.kind) {
      case 'paragraph':
        return (
          <div key={idx} className="my-4 space-y-2">
            {block.title && (
              <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
                {block.title}
              </h4>
            )}
            <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.9] whitespace-pre-line">
              {block.text}
            </p>
            {block.note && (
              <p className="text-xs text-[#8C8C8C] leading-relaxed">💡 {block.note}</p>
            )}
          </div>
        );

      case 'bullets':
        return (
          <div key={idx} className="my-4 space-y-2">
            {block.title && (
              <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
                {block.title}
              </h4>
            )}
            <ul
              className={`space-y-1.5 pr-5 text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.85] ${
                block.ordered ? 'list-decimal' : 'list-disc'
              }`}
            >
              {block.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        );

      case 'quote':
        return (
          <blockquote
            key={idx}
            style={{ borderRightColor: theme.primaryHex }}
            className="my-4 p-4 rounded-[12px] bg-[#FAF7F4] border-r-4 text-sm font-semibold text-[#4A4A4A] leading-relaxed"
          >
            {block.text}
          </blockquote>
        );

      case 'discovery':
        return <SvtDiscoveryBlock key={idx} data={block.data} />;

      case 'definition':
        return <SvtDefinitionBlock key={idx} data={block.data} />;

      case 'bilingual-box':
        return (
          <SvtTrilingualTermBox
            key={idx}
            terms={block.terms}
            title={block.title}
          />
        );

      case 'observation':
        return <SvtObservationBlock key={idx} data={block.data} />;

      case 'investigation':
        return <SvtInvestigationBlock key={idx} data={block.data} />;

      case 'schema':
        return <SvtSchemaRenderer key={idx} schema={block.data} />;

      case 'illustration':
        return <SvtIllustrationBlock key={idx} illustration={block.data} />;

      case 'table':
        return <SvtTableBlock key={idx} data={block.data} />;

      case 'common-mistakes':
        return <SvtCommonMistakesBlock key={idx} items={block.items} />;

      case 'embedded-question':
        return (
          <SvtEmbeddedQuestionBlock
            key={idx}
            question={block.question}
            answer={block.answer}
            number={block.number}
          />
        );

      case 'callout':
        return (
          <div
            key={idx}
            className={`my-4 p-4 rounded-[14px] border space-y-1.5 ${
              block.variant === 'important'
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : block.variant === 'warning'
                ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
              <span>📌 {block.title}</span>
            </div>
            <p className="text-xs sm:text-[13.5px] leading-relaxed">{block.content}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <SvtDomainThemeProvider domainId={course.domaine}>
      <div
        id="svt-course-container"
        dir="rtl"
        className="max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 flex items-start gap-8"
      >
        {/* ========================================================================= */}
        {/* 1. STICKY SIDEBAR (Sommaire à droite en RTL)                             */}
        {/* ========================================================================= */}
        <aside
          id="svt-course-sidebar"
          className={`fixed inset-y-0 right-0 z-50 w-72 bg-white sm:rounded-[18px] border-l sm:border border-[#E2D9D0] p-4 flex flex-col justify-between shadow-xl sm:shadow-2xs transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:h-[calc(100vh-100px)] lg:sticky lg:top-20 shrink-0 ${
            isSidebarOpenMobile ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-4 overflow-y-auto pr-1">
            {/* Sidebar Top: Back button & Close on mobile */}
            <div className="flex items-center justify-between border-b border-[#EAE2DA] pb-3">
              <button
                type="button"
                onClick={onBackToModuleHome}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A4A4A] hover:text-[#B45309] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
                <span>فهرس الدروس</span>
              </button>

              <button
                type="button"
                onClick={onCloseMobileSidebar}
                className="lg:hidden p-1.5 rounded-lg text-[#8C8C8C] hover:text-[#4A4A4A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Course Info */}
            <div className="space-y-1">
              <div
                style={{ color: theme.primaryHex }}
                className="text-[11px] font-bold flex items-center gap-1"
              >
                <DomainIcon className="w-3.5 h-3.5 shrink-0" />
                <span>المقطع {theme.domainNumber} · {course.domaineNomArabe}</span>
              </div>
              <div className="text-sm font-bold text-[#4A4A4A] leading-snug line-clamp-2">
                الدرس {course.numero} : {course.titreArabe}
              </div>
            </div>

            {/* Navigation Sections list */}
            <div className="space-y-1 pt-2 border-t border-[#EAE2DA]">
              <div className="text-[11px] font-bold text-[#8C8C8C] mb-1.5">
                فهرس أقسام الدرس :
              </div>

              {/* 1. وضعية الانطلاق والتساؤل العلمي */}
              {course.discoveryActivity && (
                <button
                  type="button"
                  onClick={() => scrollToSection('sec-svt-discovery')}
                  className={`w-full text-right px-2.5 py-1.5 rounded-[8px] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    activeSectionId === 'sec-svt-discovery'
                      ? 'bg-amber-100/70 text-[#B45309]'
                      : 'hover:bg-[#FAF7F4] text-[#4A4A4A]'
                  }`}
                >
                  <span className="truncate">1. وضعية الانطلاق والتساؤل</span>
                  <span className="text-[10px] opacity-70">1</span>
                </button>
              )}

              {/* 2. ملاحظة الوثائق واستغلالها */}
              {observationSection && (
                <button
                  type="button"
                  onClick={() => scrollToSection(observationSection.id)}
                  className={`w-full text-right px-2.5 py-1.5 rounded-[8px] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    activeSectionId === observationSection.id
                      ? 'bg-amber-100/70 text-[#B45309]'
                      : 'hover:bg-[#FAF7F4] text-[#4A4A4A]'
                  }`}
                >
                  <span className="truncate">2. ملاحظة واستغلال الوثائق</span>
                  <span className="text-[10px] opacity-70">2</span>
                </button>
              )}

              {/* 3. أحتفظ بالأهم */}
              {course.essential && (
                <button
                  type="button"
                  onClick={() => scrollToSection('sec-svt-essential')}
                  className={`w-full text-right px-2.5 py-1.5 rounded-[8px] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    activeSectionId === 'sec-svt-essential'
                      ? 'bg-amber-100/70 text-[#B45309]'
                      : 'hover:bg-[#FAF7F4] text-[#4A4A4A]'
                  }`}
                >
                  <span className="flex items-center gap-1 truncate text-[#B45309]">
                    <Sparkles className="w-3 h-3" />
                    <span>3. أحتفظ بالأهم (L'essentiel)</span>
                  </span>
                  <span className="text-[10px] opacity-70">★</span>
                </button>
              )}

              {/* 4. تمارين تطبيقية والـ BEM */}
              {course.applications && course.applications.length > 0 && (
                <button
                  type="button"
                  onClick={() => scrollToSection('sec-svt-exercises')}
                  className={`w-full text-right px-2.5 py-1.5 rounded-[8px] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    activeSectionId === 'sec-svt-exercises'
                      ? 'bg-amber-100/70 text-[#B45309]'
                      : 'hover:bg-[#FAF7F4] text-[#4A4A4A]'
                  }`}
                >
                  <span className="truncate">4. التمارين والتحضير للـ BEM</span>
                  <span className="text-[10px] opacity-70">4</span>
                </button>
              )}

              {/* 5. للتعمق في المفاهيم والمخططات */}
              <button
                type="button"
                onClick={() => scrollToSection('sec-svt-deepen-accordion')}
                className={`w-full text-right px-2.5 py-1.5 rounded-[8px] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  activeSectionId === 'sec-svt-deepen-accordion' ||
                  deepenSections.some((s) => s.id === activeSectionId)
                    ? 'bg-amber-100/70 text-[#B45309]'
                    : 'hover:bg-[#FAF7F4] text-[#4A4A4A]'
                }`}
              >
                <span className="flex items-center gap-1 truncate">
                  <BookOpen className="w-3 h-3 text-[#B45309]" />
                  <span>5. للتعمق (المفاهيم والمخططات)</span>
                </span>
                <span className="text-[10px] opacity-70">5</span>
              </button>

              {/* Sous-sections de l'accordéon si déplié */}
              {isDeepenExpanded && (
                <div className="mr-3 pr-2 border-r-2 border-amber-200 space-y-1">
                  {deepenSections.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-right px-2 py-1 rounded-[6px] text-[11px] font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        activeSectionId === sec.id
                          ? 'bg-amber-50 text-[#B45309] font-bold'
                          : 'hover:bg-[#FAF7F4] text-[#6B6B6B]'
                      }`}
                    >
                      <span className="truncate">{sec.shortLabel || sec.titleArabic}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* 6. الحصيلة الشاملة ومعجم المصطلحات */}
              <button
                type="button"
                onClick={() => scrollToSection('sec-svt-synthesis-vocab')}
                className={`w-full text-right px-2.5 py-1.5 rounded-[8px] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  activeSectionId === 'sec-svt-synthesis-vocab' ||
                  activeSectionId === 'sec-svt-flowchart' ||
                  activeSectionId === 'sec-svt-synthesis' ||
                  activeSectionId === 'sec-svt-vocab'
                    ? 'bg-amber-100/70 text-[#B45309]'
                    : 'hover:bg-[#FAF7F4] text-[#4A4A4A]'
                }`}
              >
                <span className="flex items-center gap-1 truncate">
                  <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                  <span>6. الحصيلة الشاملة والمعجم</span>
                </span>
                <span className="text-[10px] opacity-70">6</span>
              </button>
            </div>
          </div>

          {/* Sidebar Footer: Completion & Favorite toggles */}
          <div className="pt-3 border-t border-[#EAE2DA] space-y-2">
            <button
              type="button"
              onClick={() => onToggleCompleted(course.id)}
              style={
                isCompleted
                  ? {
                      backgroundColor: `${theme.primaryHex}18`,
                      borderColor: `${theme.primaryHex}55`,
                      color: theme.primaryHex,
                    }
                  : undefined
              }
              className={`w-full py-2 px-3 rounded-[10px] text-xs font-bold flex items-center justify-center gap-2 border transition-colors cursor-pointer ${
                isCompleted
                  ? ''
                  : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#4A4A4A] hover:bg-[#F6F0EB]'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'fill-current' : ''}`} />
              <span>{isCompleted ? 'درس مكتمل ✓' : 'تحديد كدرس مكتمل'}</span>
            </button>

            {onExportPdf && (
              <button
                type="button"
                onClick={onExportPdf}
                disabled={isExportingPdf}
                className="w-full py-2 px-3 rounded-[10px] text-xs font-bold flex items-center justify-center gap-2 bg-[#FAF7F4] hover:bg-[#F6F0EB] text-[#4A4A4A] border border-[#E2D9D0] transition-colors cursor-pointer disabled:opacity-50"
              >
                {isExportingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileDown className="w-3.5 h-3.5" />
                )}
                <span>{isExportingPdf ? 'جاري التحميل...' : 'حفظ كملف PDF'}</span>
              </button>
            )}
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isSidebarOpenMobile && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs lg:hidden"
            onClick={onCloseMobileSidebar}
          />
        )}

        {/* ========================================================================= */}
        {/* 2. MAIN COURSE VIEWPORT                                                   */}
        {/* ========================================================================= */}
        <main id="svt-course-main-content" className="flex-1 min-w-0 space-y-6">
          {/* Warning banner if course content is provisional */}
          {course.status === 'provisional' && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-[18px] p-4 sm:p-5 text-amber-950 text-xs sm:text-sm space-y-2 shadow-2xs">
              <div className="font-bold flex items-center gap-2 text-amber-900 text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-700" />
                <span>محتوى تقني مؤقت للاختبار والمعاينة — في انتظار اعتماد الدرس الرسمي</span>
              </div>
              <p className="leading-relaxed text-amber-900/90 text-xs sm:text-[13px]">
                هذا المحتوى نموذج تقني أولي مخصص لاختبار البنية البرمجية والمخططات التفاعلية، ولم يتم اعتماده كمرجع بيداغوجي رسمي بعد. سيتم استبداله بالكامل بالنص المعتمد فور تزويدنا به من طرف الأستاذ.
              </p>
            </div>
          )}

          {/* A. Hero Header Box */}
          <div id="svt-course-header" className="bg-white rounded-[20px] border border-[#E5DDD5] p-5 sm:p-7 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-3">
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: theme.primaryHex }}
                  className="px-2.5 py-1 rounded-[8px] text-white text-xs font-bold"
                >
                  الدرس {course.numero}
                </span>
                <span
                  style={{ color: theme.primaryHex }}
                  className="text-xs font-bold flex items-center gap-1"
                >
                  <DomainIcon className="w-3.5 h-3.5" />
                  <span>المقطع {theme.domainNumber} : {course.domaineNomArabe}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(course.id)}
                  title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                  className={`p-1.5 rounded-[8px] border transition-colors cursor-pointer ${
                    isFavorite
                      ? 'bg-amber-50 border-amber-300 text-[#B45309]'
                      : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#8C8C8C] hover:text-[#B45309]'
                  }`}
                >
                  <Star className={`w-4 h-4 ${isFavorite ? 'fill-[#B45309]' : ''}`} />
                </button>


                <span
                  dir="ltr"
                  className="text-xs font-mono font-bold text-[#8C8C8C]"
                >
                  3AM · SVT
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#4A4A4A] leading-tight">
                {course.titreArabe}
              </h1>
              {course.titreFrancais && (
                <div
                  dir="ltr"
                  className="text-xs sm:text-sm font-mono text-[#8C8C8C] mt-1 text-right"
                >
                  {course.titreFrancais}
                </div>
              )}
            </div>

            {/* Pedagogical Objectives */}
            {course.objectifs && course.objectifs.length > 0 && (
              <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2">
                <div
                  style={{ color: theme.primaryHex }}
                  className="text-xs font-bold flex items-center gap-1.5"
                >
                  <ListChecks className="w-4 h-4" />
                  <span>الأهداف التعليمية التعلمية لهذا الدرس :</span>
                </div>
                <ul className="space-y-1.5 pr-5 list-disc text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                  {course.objectifs.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* ÉTAPE 1 : وضعية الانطلاق والتساؤل العلمي (Situation de départ & questions) */}
          {/* ========================================================================= */}
          {course.discoveryActivity && (
            <div id="sec-svt-discovery" className="scroll-mt-24">
              <SvtDiscoveryBlock data={course.discoveryActivity} />
            </div>
          )}

          {/* ========================================================================= */}
          {/* ÉTAPE 2 : ملاحظة واستغلال الوثائق (Observation et exploitation des docs)   */}
          {/* ========================================================================= */}
          {observationSection && (
            <section
              id={observationSection.id}
              className="bg-white rounded-[18px] border border-[#E5DDD5] p-5 sm:p-6 shadow-2xs scroll-mt-24 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    style={{ backgroundColor: theme.primaryHex }}
                    className="w-7 h-7 rounded-[8px] text-white font-bold text-xs flex items-center justify-center shrink-0"
                  >
                    2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#4A4A4A]">
                    {observationSection.titleArabic}
                  </h2>
                </div>

                {observationSection.titleFrench && (
                  <span
                    dir="ltr"
                    style={{ color: theme.primaryHex }}
                    className="text-xs font-mono font-semibold"
                  >
                    {observationSection.titleFrench}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {observationSection.blocks.map((block, idx) => renderContentBlock(block, idx))}
              </div>
            </section>
          )}

          {/* ========================================================================= */}
          {/* ÉTAPE 3 : Bloc « أحتفظ بالأهم » (L'essentiel)                             */}
          {/* ========================================================================= */}
          {course.essential && (
            <div id="sec-svt-essential" className="scroll-mt-24">
              <SvtCourseEssentialBlock
                essential={course.essential}
                primaryColor={theme.primaryHex}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* ÉTAPE 4 : Exercices visibles directement (Application & BEM)              */}
          {/* ========================================================================= */}
          {course.applications && course.applications.length > 0 && (
            <div id="sec-svt-exercises" className="scroll-mt-24 space-y-4">
              <div className="bg-white rounded-[16px] border border-[#E5DDD5] p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                  <h3 className="text-base font-bold text-[#4A4A4A]">
                    4. تمارين تطبيقية والتحضير لشهادة التعليم المتوسط (BEM)
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#8C8C8C]">
                  {course.applications.length} تمارين نموذجية مع التصحيح المفصل
                </span>
              </div>

              {course.applications.map((app) => (
                <SvtApplicationCard key={app.id} question={app} />
              ))}
            </div>
          )}

          {/* ========================================================================= */}
          {/* ÉTAPE 5 : Accordéon « للتعمق » (replié sur web, ouvert dans le PDF)        */}
          {/* ========================================================================= */}
          <div id="sec-svt-deepen-accordion" className="scroll-mt-24 space-y-4">
            <div className="bg-white p-4 sm:p-5 rounded-[16px] border border-[#E2D9D0] shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" style={{ color: theme.primaryHex }} />
                  <h3 className="text-base sm:text-lg font-bold text-[#4A4A4A]">
                    5. للتعمق واستيعاب المادة بالتفصيل
                  </h3>
                </div>
                <p className="text-xs text-[#8C8C8C]">
                  الشروحات النظرية الموسعة، المخطط الجيولوجي للبؤرة والمركز السطحي، السجل الزلزالي، مقارنة المقدار والشدة، منحنيات تساوي الشدة، الوقاية والحصيلة
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDeepenExpanded(!isDeepenExpanded)}
                className="no-pdf inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-xs font-bold bg-amber-50 hover:bg-amber-100 text-[#B45309] border border-amber-200 transition-colors cursor-pointer"
              >
                {isDeepenExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>طي التفاصيل</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>فتح التفاصيل والمفاهيم المعمقة</span>
                  </>
                )}
              </button>
            </div>

            {/* Contenu dépliable : replié par défaut sur le web, toujours déplié à l'impression / PDF */}
            <div className={isDeepenExpanded ? 'space-y-6' : 'hidden print:block pdf-export-mode:block'}>
              {deepenSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-[18px] border border-[#E5DDD5] p-5 sm:p-6 shadow-2xs scroll-mt-24 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        style={{ backgroundColor: theme.primaryHex }}
                        className="w-7 h-7 rounded-[8px] text-white font-bold text-xs flex items-center justify-center shrink-0"
                      >
                        {section.number}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-[#4A4A4A]">
                        {section.titleArabic}
                      </h2>
                    </div>

                    {section.titleFrench && (
                      <span
                        dir="ltr"
                        style={{ color: theme.primaryHex }}
                        className="text-xs font-mono font-semibold"
                      >
                        {section.titleFrench}
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    {section.blocks.map((block, idx) => renderContentBlock(block, idx))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ÉTAPE 6 : الحصيلة الشاملة ومعجم المصطلحات المعتمدة                         */}
          {/* ========================================================================= */}
          <div id="sec-svt-synthesis-vocab" className="scroll-mt-24 space-y-5">
            <div className="bg-white rounded-[16px] border border-[#E5DDD5] p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  style={{ backgroundColor: theme.primaryHex }}
                  className="w-7 h-7 rounded-[8px] text-white font-bold text-xs flex items-center justify-center shrink-0"
                >
                  6
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#4A4A4A]">
                  6. الحصيلة الشاملة ومعجم المصطلحات العلمية المعتمدة
                </h3>
              </div>
              <span className="text-xs font-bold text-[#8C8C8C]">
                خلاصة المنهاج الوزاري الرسمي
              </span>
            </div>

            {/* Summary Flowchart */}
            {course.summaryFlowchart && course.summaryFlowchart.length > 0 && (
              <div
                id="sec-svt-flowchart"
                data-atomic-block="true"
                className="pdf-atomic-block scroll-mt-24 bg-white rounded-[18px] border border-[#E5DDD5] p-5 sm:p-6 shadow-2xs space-y-4"
              >
                <div className="flex items-center gap-2 border-b border-[#EAE2DA] pb-2.5">
                  <Sparkles className="w-4 h-4 text-[#B45309]" />
                  <h3 className="text-base font-bold text-[#4A4A4A]">
                    المخطط التلخيصي لمسار الظاهرة الزلزالية
                  </h3>
                </div>

                {/* 1. Chaîne causale principale : de droite à gauche en arabe (RTL) */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#8C8C8C]">
                    مسار الظاهرة من المصدر الباطني إلى السطح (قراءة من اليمين إلى اليسار) :
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-2 text-center">
                    {/* Étape 1 : à droite */}
                    <div className="p-3.5 rounded-[12px] bg-red-50/90 border border-red-300 text-xs sm:text-sm font-bold text-red-950 shadow-2xs leading-relaxed">
                      <span className="block text-[10px] text-red-700 font-semibold mb-0.5">1. البؤرة في العمق</span>
                      {course.summaryFlowchart[0]}
                    </div>

                    {/* Flèche droite -> gauche */}
                    <div className="text-red-500 font-black text-2xl select-none flex items-center justify-center">
                      <span className="hidden md:inline">←</span>
                      <span className="md:hidden">↓</span>
                    </div>

                    {/* Étape 2 : au milieu */}
                    <div className="p-3.5 rounded-[12px] bg-orange-50/90 border border-orange-300 text-xs sm:text-sm font-bold text-orange-950 shadow-2xs leading-relaxed">
                      <span className="block text-[10px] text-orange-700 font-semibold mb-0.5">2. في باطن الأرض</span>
                      {course.summaryFlowchart[1]}
                    </div>

                    {/* Flèche droite -> gauche */}
                    <div className="text-orange-500 font-black text-2xl select-none flex items-center justify-center">
                      <span className="hidden md:inline">←</span>
                      <span className="md:hidden">↓</span>
                    </div>

                    {/* Étape 3 : à gauche */}
                    <div className="p-3.5 rounded-[12px] bg-amber-50/90 border border-amber-300 text-xs sm:text-sm font-bold text-amber-950 shadow-2xs leading-relaxed">
                      <span className="block text-[10px] text-amber-700 font-semibold mb-0.5">3. على السطح والمركز السطحي</span>
                      {course.summaryFlowchart[2]}
                    </div>
                  </div>
                </div>

                {/* 2. Connecteur vers le bloc « التسجيل » relié à la chaîne */}
                <div className="pt-2 border-t border-dashed border-[#EAE2DA] space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-sky-700 text-xs font-bold">
                    <span>↓</span>
                    <span>الرصد والقياس العلمي المترتب على الظاهرة</span>
                    <span>↓</span>
                  </div>

                  <div className="p-3.5 rounded-[12px] bg-sky-50/90 border border-sky-300 text-xs sm:text-sm font-bold text-sky-950 text-center shadow-2xs leading-relaxed max-w-[620px] mx-auto">
                    <span className="block text-[11px] text-sky-800 font-bold mb-1">
                      مسار التسجيل والتقييم (مسجل الزلازل ➔ السجل الزلزالي ➔ المقدار والشدة) :
                    </span>
                    {course.summaryFlowchart[3] || 'التسجيل العلمي (مسجل الزلازل والسجل الزلزالي) · تقدير المقدار ودراسة الشدة'}
                  </div>
                </div>
              </div>
            )}

            {/* Synthesis Text */}
            {course.synthesisText && (
              <div id="sec-svt-synthesis" className="scroll-mt-24 bg-white rounded-[18px] border-2 border-emerald-400 p-5 sm:p-6 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold border-b border-emerald-100 pb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-[#4A4A4A]">
                    الحصيلة النهائية — خلاصة الدرس
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-[1.95] whitespace-pre-line bg-[#FAF7F4] p-4 rounded-[12px] border border-[#E5DDD5]">
                  {course.synthesisText}
                </p>
              </div>
            )}

            {/* Scientific Vocabulary Glossary */}
            {course.vocabulaire && course.vocabulaire.length > 0 && (
              <div id="sec-svt-vocab" className="scroll-mt-24">
                <SvtTrilingualTermBox
                  terms={course.vocabulaire}
                  title="المصطلحات العلمية المعتمدة (عربي · Français · تعريف مبسط)"
                />
              </div>
            )}
          </div>

          {/* G. Bottom Next/Previous Course Navigator */}
          <div className="pt-6 border-t border-[#EAE2DA] flex flex-wrap items-center justify-between gap-3">
            {prevCourse ? (
              <button
                type="button"
                onClick={() => onSelectCourse(prevCourse.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-white hover:bg-[#FAF7F4] border border-[#E2D9D0] text-xs font-bold text-[#4A4A4A] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
                <div className="text-right">
                  <div className="text-[10px] text-[#8C8C8C]">الدرس السابق</div>
                  <div>الدرس {prevCourse.numero} : {prevCourse.titreArabe}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextCourse ? (
              <button
                type="button"
                onClick={() => onSelectCourse(nextCourse.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-white hover:bg-[#FAF7F4] border border-[#E2D9D0] text-xs font-bold text-[#4A4A4A] transition-colors cursor-pointer"
              >
                <div className="text-left">
                  <div className="text-[10px] text-[#8C8C8C]">الدرس القادم</div>
                  <div>الدرس {nextCourse.numero} : {nextCourse.titreArabe}</div>
                </div>
                <ChevronLeft className="w-4 h-4 shrink-0" />
              </button>
            ) : (
              <div />
            )}
          </div>

          {/* Footer note */}
          <footer className="mt-8 pt-6 pb-10 border-t border-[#E2D9D0] text-center text-xs text-[#8C8C8C]">
            <p className="mb-1 font-semibold text-[#4A4A4A]">
              المنهاج الرسمي للجمهورية الجزائرية الديمقراطية الشعبية · علوم الطبيعة والحياة (SVT 3AM)
            </p>
            <p>الجيل الثاني — وزارة التربية الوطنية</p>
          </footer>
        </main>
      </div>

    </SvtDomainThemeProvider>
  );
};
