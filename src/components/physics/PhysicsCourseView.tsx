import React, { useState, useEffect } from 'react';
import {
  PhysicsChemistryCourse,
  PhysicsContentBlock,
  PhysicsCourseSection,
} from '../../typesPhysicsChemistry';
import {
  SPECIMEN_TRILINGUAL_TERMS,
  SPECIMEN_FORMULAS_SHOWCASE,
} from '../../data/physicsChemistryCoursesData';
import { ChemPhysText, ChemicalFormula } from './ChemPhysText';
import {
  TrilingualTermBox,
  PhysicsDefinitionBlock,
  PhysicsObservationBlock,
  PhysicsExperienceBlock,
  PhysicsExplanationBlock,
  PhysicsSchemaRenderer,
  PhysicsTableBlock,
  PhysicsFormulaBlock,
  PhysicsExampleBlock,
  PhysicsActivityBlock,
  PhysicsApplicationCard,
  PhysicsDiscoveryBlock,
  PhysicsDiscoveryCorrectionCard,
  PhysicsCommonMistakesBlock,
  PhysicsVocabularyTable,
  PhysicsSummarySection,
} from './PhysicsChemistryBlocks';
import { SimulationScientifique } from './simulations/SimulationScientifique';
import {
  getDomainTheme,
  DomainPatternSvg,
  PhysicsDomainThemeProvider,
} from './domainThemeTokens';
import {
  EnergyInteractiveChainSimulator,
  EnergyCircuitAndConverterBlock,
  EnergyKeyFormulaBlock,
  EnergyAttentionUnitsBox,
} from './EnergySpecificComponents';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Star,
  LayoutGrid,
  FlaskConical,
  ListChecks,
  Languages,
  FileDown,
  Loader2,
  Lock,
} from 'lucide-react';
import { CourseEssentialBlock } from './CourseEssentialBlock';

const PC_DISCOVERY_UNLOCKED_STORAGE_KEY = 'pc_3am_discovery_unlocked_v1';

/**
 * BUG 1 Guard : Aucune section du sommaire ne doit pouvoir être publiée sans contenu.
 * Déclenche une erreur explicite au rendu / preview si une section est vide.
 */
function assertSectionNotEmpty(sec: PhysicsCourseSection, courseNumero: string): void {
  if (!sec.blocks || sec.blocks.length === 0) {
    throw new Error(
      `[Erreur Physique-Chimie Cours ${courseNumero}] La section "${sec.number}. ${sec.titleArabic}" (${sec.id}) ne contient aucun bloc de contenu.`
    );
  }
  const hasValidBlock = sec.blocks.some((b) => {
    if (b.kind === 'paragraph') return b.text.trim().length > 0;
    if (b.kind === 'bullets') return b.items.length > 0;
    if (b.kind === 'quote') return b.text.trim().length > 0;
    if (b.kind === 'common-mistakes') return b.items.length > 0;
    return true;
  });
  if (!hasValidBlock) {
    throw new Error(
      `[Erreur Physique-Chimie Cours ${courseNumero}] La section "${sec.number}. ${sec.titleArabic}" (${sec.id}) a des blocs vides.`
    );
  }
}

interface PhysicsCourseViewProps {
  course: PhysicsChemistryCourse;
  allCourses: PhysicsChemistryCourse[];
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

export const PhysicsCourseView: React.FC<PhysicsCourseViewProps> = ({
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
  const [activeTab, setActiveTab] = useState<'all' | 'lesson' | 'activities' | 'summary'>('all');
  const [activeSectionId, setActiveSectionId] = useState<string>(
    course.sections[0]?.id || 'sec-pc-summary'
  );
  const [unlockedDiscoveryIds, setUnlockedDiscoveryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(PC_DISCOVERY_UNLOCKED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Récupération automatique des tokens de thème du domaine actif (Matière #0F766E vs Énergie #D97706/#EA580C, etc.)
  const theme = getDomainTheme(course.domaine);
  const PrimaryIcon = theme.PrimaryIcon;
  const SecondaryIcon = theme.SecondaryIcon;
  const TertiaryIcon = theme.TertiaryIcon;

  // Cours appartenant au même domaine (pour la barre de progression et le repère visuel du domaine)
  const domainCourses = allCourses.filter((c) => c.domaine === course.domaine);
  const completedInDomain = domainCourses.filter((c) =>
    completedCourseIds.includes(c.id)
  ).length;
  const domainProgressPercent =
    domainCourses.length > 0
      ? Math.round((completedInDomain / domainCourses.length) * 100)
      : 0;

  useEffect(() => {
    setActiveSectionId(course.sections[0]?.id || 'sec-pc-summary');
  }, [course.id, course.sections]);

  useEffect(() => {
    try {
      localStorage.setItem(PC_DISCOVERY_UNLOCKED_STORAGE_KEY, JSON.stringify(unlockedDiscoveryIds));
    } catch {
      // ignore storage errors
    }
  }, [unlockedDiscoveryIds]);

  // Niveau « L'essentiel » vs bloc repliable « للتعمق » (Pour approfondir) — Gabarit générique
  const [isDeepenExpanded, setIsDeepenExpanded] = useState<boolean>(!course.essential);

  useEffect(() => {
    setIsDeepenExpanded(!course.essential);
  }, [course.id, course.essential]);

  useEffect(() => {
    const handlePreparePdf = () => {
      setActiveTab('all');
      setIsDeepenExpanded(true);
    };
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    return () => window.removeEventListener('course-pdf-prepare', handlePreparePdf);
  }, []);

  // Strict validation on populated courses (BUG 1)
  if (course.status === 'populated') {
    if (!course.sections || course.sections.length === 0) {
      throw new Error(
        `[Erreur Physique-Chimie Cours ${course.numero}] Le cours publié ne contient aucune section.`
      );
    }
    course.sections.forEach((sec) => assertSectionNotEmpty(sec, course.numero));
  }

  const currentIndex = allCourses.findIndex((c) => c.id === course.id);
  const prevCourse = currentIndex > 0 ? allCourses[currentIndex - 1] : null;
  const nextCourse =
    currentIndex >= 0 && currentIndex < allCourses.length - 1
      ? allCourses[currentIndex + 1]
      : null;

  const prevTheme = prevCourse ? getDomainTheme(prevCourse.domaine) : null;
  const nextTheme = nextCourse ? getDomainTheme(nextCourse.domaine) : null;

  const isCompleted = completedCourseIds.includes(course.id);
  const isFavorite = favoriteCourseIds.includes(course.id);
  const isDiscoveryCompleted =
    unlockedDiscoveryIds.includes(course.id) || isCompleted;

  const handleCompleteDiscovery = () => {
    if (!unlockedDiscoveryIds.includes(course.id)) {
      setUnlockedDiscoveryIds((prev) => [...prev, course.id]);
    }
    const secondSec = course.sections[1];
    if (secondSec) {
      setActiveSectionId(secondSec.id);
      setTimeout(() => {
        document.getElementById(secondSec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  const hasContent =
    course.status === 'populated' ||
    course.sections.length > 0 ||
    course.objectifs.length > 0 ||
    (course.definitions && course.definitions.length > 0) ||
    (course.experiences && course.experiences.length > 0);

  // Extract discovery activity from course or from section 1 if present
  const discoveryActivity =
    course.discoveryActivity ||
    (course.sections
      .flatMap((s) => s.blocks)
      .find((b) => b.kind === 'discovery') as
      | { kind: 'discovery'; data: NonNullable<PhysicsChemistryCourse['discoveryActivity']> }
      | undefined)?.data;

  const hasExercisesSection =
    (course.applications && course.applications.length > 0) ||
    (course.activites && course.activites.length > 0) ||
    !!discoveryActivity;

  const exercisesSecNum = course.sections.length + 1;
  const summarySecNum = course.sections.length + (hasExercisesSection ? 2 : 1);

  const handleJumpToSection = (secId: string) => {
    setActiveSectionId(secId);
    if (course.essential && secId !== 'sec-pc-essential' && secId !== 'sec-pc-exercises') {
      setIsDeepenExpanded(true);
    }
    if (activeTab !== 'all') {
      setActiveTab('all');
      setTimeout(() => {
        const el = document.getElementById(secId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      setTimeout(() => {
        const el = document.getElementById(secId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
    }
  };

  const renderBlock = (block: PhysicsContentBlock, idx: number) => {
    switch (block.kind) {
      case 'paragraph':
        return (
          <div key={idx} className="my-2.5 space-y-1">
            {block.title && (
              <h4
                style={{ color: theme.primaryHex }}
                className="text-sm sm:text-base font-bold"
              >
                <ChemPhysText text={block.title} />
              </h4>
            )}
            <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.9] whitespace-pre-line">
              <ChemPhysText text={block.text} />
            </p>
            {block.note && (
              <div className="p-2.5 rounded-[10px] bg-[#F6F0EB]/70 border border-[#E2D9D0] text-xs text-[#6B6B6B]">
                <ChemPhysText text={block.note} />
              </div>
            )}
          </div>
        );

      case 'quote':
        return (
          <blockquote
            key={idx}
            style={{
              backgroundColor: theme.softBgHex,
              borderRightColor: theme.primaryHex,
            }}
            className="my-3 p-3.5 rounded-[12px] border-r-4 text-sm sm:text-base font-bold text-[#4A4A4A] leading-[1.85]"
          >
            <ChemPhysText text={block.text} />
          </blockquote>
        );

      case 'bullets':
        return (
          <div key={idx} className="my-2.5 space-y-1.5">
            {block.title && (
              <h4 className="text-sm font-bold text-[#4A4A4A]">
                <ChemPhysText text={block.title} />
              </h4>
            )}
            {block.ordered ? (
              <ol className="space-y-1 pr-5 list-decimal text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.8]">
                {block.items.map((item, i) => (
                  <li key={i}>
                    <ChemPhysText text={item} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="space-y-1 pr-5 list-disc text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.8]">
                {block.items.map((item, i) => (
                  <li key={i}>
                    <ChemPhysText text={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'discovery':
        return <PhysicsDiscoveryBlock key={idx} data={block.data} />;

      case 'definition':
        return <PhysicsDefinitionBlock key={idx} data={block.data} />;

      case 'bilingual-box':
        return <TrilingualTermBox key={idx} terms={block.terms} title={block.title} />;

      case 'observation':
        return <PhysicsObservationBlock key={idx} data={block.data} />;

      case 'experience':
        return <PhysicsExperienceBlock key={idx} data={block.data} />;

      case 'explanation':
        return <PhysicsExplanationBlock key={idx} data={block.data} />;

      case 'schema':
        return <PhysicsSchemaRenderer key={idx} schema={block.data} />;

      case 'table':
        return <PhysicsTableBlock key={idx} data={block.data} />;

      case 'formula':
        return <PhysicsFormulaBlock key={idx} data={block.data} />;

      case 'example':
        return <PhysicsExampleBlock key={idx} data={block.data} />;

      case 'activity':
        return <PhysicsActivityBlock key={idx} data={block.data} />;

      case 'common-mistakes':
        return <PhysicsCommonMistakesBlock key={idx} items={block.items} />;

      case 'simulation':
        return (
          <div key={idx} className="my-4 p-1.5 pb-6">
            <SimulationScientifique blockData={block.data} />
          </div>
        );

      case 'callout':
        return (
          <div
            key={idx}
            style={
              block.variant !== 'warning' && block.variant !== 'important'
                ? {
                    backgroundColor: theme.softBgHex,
                    borderColor: theme.softBorderHex,
                  }
                : undefined
            }
            className={`my-3 p-3.5 rounded-[12px] border space-y-1 ${
              block.variant === 'warning'
                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                : block.variant === 'important'
                ? 'bg-[#C94BA6]/8 border-[#C94BA6]/30 text-[#4A4A4A]'
                : 'text-[#4A4A4A]'
            }`}
          >
            <div className="text-xs font-bold" style={{ color: theme.primaryHex }}>
              {block.title}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              <ChemPhysText text={block.content} />
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderExercisesBlock = () => {
    if (!hasExercisesSection || (activeTab !== 'all' && activeTab !== 'activities')) {
      return null;
    }
    return (
      <section
        id="sec-pc-exercises"
        className="bg-[#FFFFFF] rounded-[18px] border border-[#EAE2DA] p-5 sm:p-6 space-y-4 scroll-mt-28"
      >
        <div className="section-lead-group space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
            <div className="flex items-center gap-2.5">
              <span
                dir="ltr"
                style={{ backgroundColor: theme.primaryHex }}
                className="w-7 h-7 rounded-[8px] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs"
              >
                {course.essential ? <ListChecks className="w-4 h-4" /> : exercisesSecNum}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                تمارين تطبيقية ووضعيات سياقية مع التصحيح
              </h2>
            </div>
            <span
              dir="ltr"
              style={{ color: theme.primaryHex }}
              className="text-xs font-mono font-semibold"
            >
              Exercices contextualisés & Corrigés
            </span>
          </div>

          {!course.essential && (
            discoveryActivity && course.id !== 'pc-course-09' ? (
              <PhysicsDiscoveryCorrectionCard activity={discoveryActivity} />
            ) : (
              course.applications?.[0] && (
                <PhysicsApplicationCard item={course.applications[0]} />
              )
            )
          )}
        </div>

        {course.activites &&
          course.activites.length > 0 &&
          !course.sections.some((s) => s.blocks.some((b) => b.kind === 'activity')) &&
          course.activites.map((act, i) => <PhysicsActivityBlock key={i} data={act} />)}

        {course.applications &&
          course.applications
            .slice(
              course.essential
                ? 0
                : (discoveryActivity && course.id !== 'pc-course-09' ? 0 : 1)
            )
            .map((app) => <PhysicsApplicationCard key={app.id} item={app} />)}
      </section>
    );
  };

  return (
    <PhysicsDomainThemeProvider domainId={course.domaine}>
      <div
        className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 flex items-start gap-8"
        dir="rtl"
      >
        {/* Mobile Backdrop */}
        {isSidebarOpenMobile && (
          <div
            className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 lg:hidden transition-opacity"
            onClick={onCloseMobileSidebar}
          />
        )}

        {/* 1. STICKY SIDEBAR (À DROITE EN RTL) AUX COULEURS DU DOMAINE */}
        <aside
          className={`fixed lg:sticky top-[118px] right-0 z-30 w-64 sm:w-68 h-[calc(100vh-128px)] bg-[#F6F0EB] lg:bg-transparent p-5 lg:py-2 lg:px-0 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 shrink-0 ${
            isSidebarOpenMobile
              ? 'translate-x-0 shadow-2xl border-l border-[#E5DDD5]'
              : 'translate-x-full'
          }`}
        >
          <div className="space-y-4">
            {/* Back to Physics Home */}
            <button
              type="button"
              onClick={() => {
                onCloseMobileSidebar();
                onBackToModuleHome();
              }}
              style={{
                borderColor: theme.softBorderHex,
                color: theme.primaryHex,
              }}
              className="w-full flex items-center justify-between p-3 rounded-[12px] bg-[#FFFFFF] border text-xs font-bold transition-all cursor-pointer shadow-2xs hover:opacity-90"
            >
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                <span>الرئيسية للفيزياء والكيمياء</span>
              </div>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Encart Repère Visuel du Domaine dans la Sidebar */}
            <div
              style={{
                backgroundColor: theme.softBgHex,
                borderColor: theme.softBorderHex,
              }}
              className="rounded-[12px] border p-3 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  style={{ color: theme.darkTextHex }}
                  className="text-xs font-bold flex items-center gap-1.5"
                >
                  <PrimaryIcon className="w-4 h-4 shrink-0" style={{ color: theme.primaryHex }} />
                  <span>
                    الميدان {theme.domainNumber} : {theme.arabicName}
                  </span>
                </div>
                <span
                  dir="ltr"
                  style={{ color: theme.primaryHex }}
                  className="text-[11px] font-mono font-bold"
                >
                  {completedInDomain}/{domainCourses.length}
                </span>
              </div>

              {/* Barre de progression du domaine */}
              <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden border border-black/5">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.max(6, domainProgressPercent)}%`,
                    backgroundColor: theme.primaryHex,
                  }}
                />
              </div>

              {/* Puce de navigation rapide vers les cours du même domaine */}
              <div className="flex items-center gap-1 flex-wrap pt-0.5">
                {domainCourses.map((dc) => {
                  const isCurrent = dc.id === course.id;
                  const isDone = completedCourseIds.includes(dc.id);
                  return (
                    <button
                      key={dc.id}
                      type="button"
                      onClick={() => {
                        onSelectCourse(dc.id);
                        onCloseMobileSidebar();
                      }}
                      title={dc.titreArabe}
                      style={
                        isCurrent
                          ? {
                              backgroundColor: theme.primaryHex,
                              color: '#FFFFFF',
                              borderColor: theme.primaryHex,
                            }
                          : isDone
                          ? {
                              backgroundColor: '#FFFFFF',
                              color: theme.primaryHex,
                              borderColor: theme.primaryHex,
                            }
                          : undefined
                      }
                      className={`px-2 py-0.5 rounded-[6px] text-[11px] font-mono font-bold border transition-all cursor-pointer ${
                        !isCurrent && !isDone
                          ? 'bg-white/80 border-[#E2D9D0] text-[#6B6B6B] hover:text-[#1A1A1A]'
                          : ''
                      }`}
                      dir="ltr"
                    >
                      {dc.numero}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sommaire du cours */}
            <div>
              <div className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wider mb-2 px-1">
                عناصر الدرس {course.numero}
              </div>

              <nav className="relative border-r-2 border-[#E2D9D0] space-y-0.5 max-h-[42vh] overflow-y-auto pl-1">
                {course.sections.length > 0 ? (
                  <>
                    {/* Liens spécifiques en-tête pour Cours 01 : L'essentiel puis Exercices */}
                    {course.id === 'pc-course-01' && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            handleJumpToSection('sec-pc-essential');
                            onCloseMobileSidebar();
                          }}
                          style={
                            activeSectionId === 'sec-pc-essential'
                              ? {
                                  borderRightColor: '#0F766E',
                                  color: '#0F766E',
                                }
                              : undefined
                          }
                          className={`relative w-full text-right pr-3.5 pl-2 py-1.5 text-xs transition-all flex items-baseline gap-2 cursor-pointer -mr-[2px] border-r-2 ${
                            activeSectionId === 'sec-pc-essential'
                              ? 'font-bold'
                              : 'border-transparent text-[#4A4A4A]/80 hover:text-[#1A1A1A] font-medium'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 shrink-0 self-center text-[#0F766E]" />
                          <span className="leading-snug truncate">أحتفظ بالأهم (L'essentiel)</span>
                        </button>

                        {course.id !== 'pc-course-01' && hasExercisesSection && (
                          <button
                            type="button"
                            onClick={() => {
                              handleJumpToSection('sec-pc-exercises');
                              onCloseMobileSidebar();
                            }}
                            style={
                              activeSectionId === 'sec-pc-exercises'
                                ? {
                                    borderRightColor: '#0F766E',
                                    color: '#0F766E',
                                  }
                                : undefined
                            }
                            className={`relative w-full text-right pr-3.5 pl-2 py-1.5 text-xs transition-all flex items-baseline gap-2 cursor-pointer -mr-[2px] border-r-2 ${
                              activeSectionId === 'sec-pc-exercises'
                                ? 'font-bold'
                                : 'border-transparent text-[#4A4A4A]/80 hover:text-[#1A1A1A] font-medium'
                            }`}
                          >
                            <span className="font-bold shrink-0 font-mono text-[#0F766E]" dir="ltr">
                              ★
                            </span>
                            <span className="leading-snug">تمارين تطبيقية ووضعيات مع الحل</span>
                          </button>
                        )}
                      </>
                    )}

                    {/* Toujours afficher la Section 1 (Activité de découverte) */}
                    {course.sections
                      .slice(0, isDiscoveryCompleted ? course.sections.length : 1)
                      .map((sec) => {
                        const isActive = activeSectionId === sec.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              handleJumpToSection(sec.id);
                              onCloseMobileSidebar();
                            }}
                            style={
                              isActive
                                ? {
                                    borderRightColor: theme.primaryHex,
                                    color: theme.primaryHex,
                                  }
                                : undefined
                            }
                            className={`relative w-full text-right pr-3.5 pl-2 py-1.5 text-xs transition-all flex items-baseline gap-2 cursor-pointer -mr-[2px] border-r-2 ${
                              isActive
                                ? 'font-bold'
                                : 'border-transparent text-[#4A4A4A]/80 hover:text-[#1A1A1A] font-medium'
                            }`}
                          >
                            <span className="font-bold shrink-0 font-mono" dir="ltr">
                              {sec.number}.
                            </span>
                            <span className="leading-snug truncate">{sec.titleArabic}</span>
                          </button>
                        );
                      })}

                    {!isDiscoveryCompleted && course.sections.length > 1 ? (
                      <div className="mr-2 mt-2 p-2.5 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] text-[11px] text-[#6B6B6B] space-y-1.5">
                        <div
                          style={{ color: theme.primaryHex }}
                          className="flex items-center gap-1.5 font-bold"
                        >
                          <Lock className="w-3.5 h-3.5 shrink-0" />
                          <span>مختصرات الفهرس مقفلة مؤقتًا</span>
                        </div>
                        <p className="leading-relaxed">
                          أكمل أولًا <strong>وضعية الانطلاق (القسم 1)</strong> لاكتشاف المفاهيم بنفسك وفتح جميع أقسام الفهرس والملخص.
                        </p>
                      </div>
                    ) : (
                      <>
                        {hasExercisesSection && (
                          <button
                            type="button"
                            onClick={() => {
                              handleJumpToSection('sec-pc-exercises');
                              onCloseMobileSidebar();
                            }}
                            style={
                              activeSectionId === 'sec-pc-exercises'
                                ? {
                                    borderRightColor: theme.primaryHex,
                                    color: theme.primaryHex,
                                  }
                                : undefined
                            }
                            className={`relative w-full text-right pr-3.5 pl-2 py-1.5 text-xs transition-all flex items-baseline gap-2 cursor-pointer -mr-[2px] border-r-2 ${
                              activeSectionId === 'sec-pc-exercises'
                                ? 'font-bold'
                                : 'border-transparent text-[#4A4A4A]/80 hover:text-[#1A1A1A] font-medium'
                            }`}
                          >
                            <span className="font-bold shrink-0 font-mono" dir="ltr">
                              {exercisesSecNum}.
                            </span>
                            <span className="leading-snug">تمارين تطبيقية ووضعيات مع الحل</span>
                          </button>
                        )}

                        {(course.pointsEssentiels.length > 0 || course.vocabulaire.length > 0) && (
                          <button
                            type="button"
                            onClick={() => {
                              handleJumpToSection('sec-pc-summary');
                              onCloseMobileSidebar();
                            }}
                            style={
                              activeSectionId === 'sec-pc-summary'
                                ? {
                                    borderRightColor: theme.primaryHex,
                                    color: theme.primaryHex,
                                  }
                                : undefined
                            }
                            className={`relative w-full text-right pr-3.5 pl-2 py-1.5 text-xs transition-all flex items-baseline gap-2 cursor-pointer -mr-[2px] border-r-2 ${
                              activeSectionId === 'sec-pc-summary'
                                ? 'font-bold'
                                : 'border-transparent text-[#4A4A4A]/80 hover:text-[#1A1A1A] font-medium'
                            }`}
                          >
                            <span className="font-bold shrink-0 font-mono" dir="ltr">
                              {summarySecNum}.
                            </span>
                            <span className="leading-snug">الخلاصة والمصطلحات الأساسية</span>
                          </button>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="pr-3.5 py-2 text-xs text-[#8C8C8C]">
                    بانتظار استيراد أقسام الدرس {course.numero}
                  </div>
                )}
              </nav>
            </div>

            {/* Navigation Précédent / Suivant */}
            <div className="pt-3 border-t border-[#E2D9D0] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#8C8C8C]">
                <span>الدرس {course.numero} من {allCourses.length}</span>
                <button
                  type="button"
                  onClick={onBackToModuleHome}
                  style={{ color: theme.primaryHex }}
                  className="font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>كل الدروس (20)</span>
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
                      onCloseMobileSidebar();
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-[10px] text-[11px] font-bold border text-center transition-all ${
                    prevCourse
                      ? 'bg-white border-[#E2D9D0] text-[#4A4A4A] hover:border-[#4A4A4A] cursor-pointer'
                      : 'bg-white/40 border-[#E2D9D0]/50 text-[#8C8C8C]/50 cursor-not-allowed'
                  }`}
                >
                  {prevCourse ? `→ الدرس ${prevCourse.numero}` : 'بداية الدروس'}
                </button>
                <button
                  type="button"
                  disabled={!nextCourse}
                  onClick={() => {
                    if (nextCourse) {
                      onSelectCourse(nextCourse.id);
                      onCloseMobileSidebar();
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-[10px] text-[11px] font-bold border text-center transition-all ${
                    nextCourse
                      ? 'bg-white border-[#E2D9D0] text-[#4A4A4A] hover:border-[#4A4A4A] cursor-pointer'
                      : 'bg-white/40 border-[#E2D9D0]/50 text-[#8C8C8C]/50 cursor-not-allowed'
                  }`}
                >
                  {nextCourse ? `الدرس ${nextCourse.numero} ←` : 'آخر درس'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Actions: Export PDF, Mark Completed & Favorite */}
          <div className="pt-4 mt-4 border-t border-[#E2D9D0] space-y-2">
            {onExportPdf && (
              <button
                type="button"
                onClick={onExportPdf}
                disabled={isExportingPdf}
                style={{
                  backgroundColor: theme.primaryHex,
                  borderColor: theme.primaryHex,
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-[12px] text-xs font-bold border hover:opacity-95 text-white transition-all cursor-pointer disabled:opacity-60"
              >
                {isExportingPdf ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                <span>
                  {isExportingPdf
                    ? `جاري حفظ الدرس ${course.numero} PDF...`
                    : `حفظ الدرس ${course.numero} بصيغة PDF`}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onToggleCompleted(course.id)}
              style={
                isCompleted
                  ? {
                      backgroundColor: theme.softBgHex,
                      color: theme.primaryHex,
                      borderColor: theme.primaryHex,
                    }
                  : undefined
              }
              className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-[12px] text-xs font-bold border transition-all cursor-pointer ${
                isCompleted
                  ? ''
                  : 'bg-white text-[#4A4A4A] border-[#E2D9D0] hover:border-[#4A4A4A]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'تم إنجاز هذا الدرس ✓' : 'تحديد الدرس كمكتمل'}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleFavorite(course.id)}
              className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-[12px] text-xs font-bold border transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-[#C94BA6]/15 text-[#C94BA6] border-[#C94BA6]'
                  : 'bg-white text-[#4A4A4A] border-[#E2D9D0] hover:border-[#C94BA6] hover:text-[#C94BA6]'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-[#C94BA6]' : ''}`} />
              <span>{isFavorite ? 'مضاف إلى المفضلة' : 'إضافة الدرس للمفضلة'}</span>
            </button>
          </div>
        </aside>

        {/* 2. MAIN COURSE CONTENT */}
        <main id="physics-course-main-content" className="flex-1 min-w-0 space-y-5">
          {/* A. BANDEAU DE REPÈRE VISUEL DU DOMAINE + EN-TÊTE DU COURS */}
          <section
            id="physics-course-header"
            className="bg-[#FFFFFF] rounded-[18px] border border-[#EAE2DA] overflow-hidden shadow-2xs"
          >
            {/* Bannière supérieure propre au domaine (Dégradé + Motif SVG + Pictos Éclair/Pile/Soleil pour Énergie) */}
            <div
              style={{ background: theme.headerGradient }}
              className="relative overflow-hidden px-5 py-4 text-white"
            >
              <DomainPatternSvg domainId={course.domaine} />

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[10px] bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center shrink-0">
                    <PrimaryIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span>{theme.arabicFullTitle}</span>
                      <span className="opacity-75">·</span>
                      <span className="font-mono text-[11px]" dir="ltr">
                        الدروس {theme.courseRange}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-white/90" dir="ltr">
                      {theme.frenchFullTitle}
                    </div>
                  </div>
                </div>

                {/* Les 3 icônes repères du domaine + Progression dans le domaine */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-white/15 border border-white/25 text-[11px] font-semibold">
                    <PrimaryIcon className="w-3.5 h-3.5" />
                    <SecondaryIcon className="w-3.5 h-3.5" />
                    <TertiaryIcon className="w-3.5 h-3.5" />
                    <span>هوية {theme.arabicName}</span>
                  </div>

                  <div className="px-3 py-1 rounded-[8px] bg-black/20 border border-white/25 text-xs font-bold flex items-center gap-2">
                    <span>تقدم الميدان :</span>
                    <span className="font-mono" dir="ltr">
                      {completedInDomain}/{domainCourses.length} ({domainProgressPercent}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corps de l'en-tête du cours */}
            <div className="p-5 sm:p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  style={{ color: theme.primaryHex }}
                  className="flex items-center gap-2 text-xs font-bold"
                >
                  <span
                    dir="ltr"
                    style={{ backgroundColor: theme.primaryHex }}
                    className="px-2.5 py-0.5 rounded-[6px] text-white font-mono"
                  >
                    الدرس {course.numero}
                  </span>
                  <span>·</span>
                  <span>
                    {(course.sousTitreNeutre ||
                      `الميدان : ${course.domaineNomArabe} — السنة الثالثة متوسط (3AM)`).replace(
                      /^المجال/,
                      'الميدان'
                    )}
                  </span>
                </div>

                <div className="no-pdf flex items-center gap-2 flex-wrap">
                  {onExportPdf && (
                    <button
                      type="button"
                      onClick={onExportPdf}
                      disabled={isExportingPdf}
                      title={`حفظ الدرس ${course.numero} بصيغة PDF`}
                      style={{
                        backgroundColor: theme.primaryHex,
                        borderColor: theme.primaryHex,
                      }}
                      className="px-3 py-1.5 rounded-[10px] text-xs font-bold border text-white hover:opacity-90 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
                    >
                      {isExportingPdf ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FileDown className="w-3.5 h-3.5" />
                      )}
                      <span>{isExportingPdf ? 'جاري التحميل...' : 'حفظ الدرس PDF'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onToggleFavorite(course.id)}
                    className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                      isFavorite
                        ? 'bg-[#C94BA6]/10 border-[#C94BA6] text-[#C94BA6]'
                        : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#4A4A4A] hover:border-[#C94BA6]'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#C94BA6]' : ''}`} />
                    <span>المفضلة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleCompleted(course.id)}
                    style={
                      isCompleted
                        ? {
                            backgroundColor: theme.softBgHex,
                            borderColor: theme.primaryHex,
                            color: theme.primaryHex,
                          }
                        : undefined
                    }
                    className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCompleted
                        ? ''
                        : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#4A4A4A] hover:border-[#4A4A4A]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'مكتمل' : 'تحديد كمكتمل'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A]">
                  الدرس {course.numero}:{' '}
                  <ChemPhysText text={course.titreNeutreArabe || course.titreArabe} />
                </h1>
                <div
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate', color: theme.primaryHex }}
                  className="text-xs sm:text-sm font-mono font-semibold text-right"
                >
                  {`Cours ${course.numero} · ${course.domaineNomFrancais} — Physique-Chimie 3AM`}
                </div>
              </div>

              {/* Boutons de raccourci : Déverrouillés UNIQUEMENT après complétion de la Section 1 (Activité de découverte) */}
              {isDiscoveryCompleted && (
                <div className="no-pdf flex items-center gap-2 pt-2.5 border-t border-[#EAE2DA] overflow-x-auto">
                  {(
                    [
                      { id: 'all', label: 'عرض الدرس كاملاً', Icon: BookOpen },
                      { id: 'lesson', label: 'الشرح والمفاهيم', Icon: FlaskConical },
                      { id: 'activities', label: 'تمارين ووضعيات', Icon: ListChecks },
                      { id: 'summary', label: 'الخلاصة والمصطلحات', Icon: Languages },
                    ] as const
                  ).map(({ id, label, Icon }) => {
                    const isTabActive = activeTab === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setActiveTab(id);
                          if (course.id === 'pc-course-01') {
                            setIsDeepenExpanded(true);
                          }
                        }}
                        style={
                          isTabActive
                            ? { backgroundColor: theme.primaryHex, color: '#FFFFFF' }
                            : undefined
                        }
                        className={`px-3.5 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                          isTabActive
                            ? 'shadow-2xs'
                            : 'bg-[#F6F0EB] text-[#4A4A4A] hover:bg-[#EAE2DA]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* B. BLOC L'ESSENTIEL (GÉNÉRIQUE POUR TOUT COURS AVEC CHAMP ESSENTIAL) */}
          {course.essential && (
            <CourseEssentialBlock
              essential={course.essential}
              primaryColor={theme.primaryHex}
            />
          )}

          {/* C. EXERCICES CONTEXTUALISÉS & CORRIGÉS (VISIBLE PAR DÉFAUT SOUS L'ESSENTIEL, AVANT « للتعمق ») */}
          {course.essential && renderExercisesBlock()}

          {/* D. BOUTON ACCORDÉON « للتعمق » (REPLIÉ PAR DÉFAUT POUR TOUT COURS AVEC CHAMP ESSENTIAL) */}
          {course.essential && (
            <button
              type="button"
              onClick={() => setIsDeepenExpanded(!isDeepenExpanded)}
              style={{
                borderColor: isDeepenExpanded ? theme.primaryHex : '#E2D9D0',
              }}
              className="w-full flex items-center justify-between p-4 sm:p-5 rounded-[18px] bg-[#FFFFFF] border-2 shadow-2xs transition-all text-right group cursor-pointer no-pdf"
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    backgroundColor: isDeepenExpanded ? theme.primaryHex : theme.softBgHex,
                    color: isDeepenExpanded ? '#FFFFFF' : theme.primaryHex,
                  }}
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      style={{ color: isDeepenExpanded ? theme.primaryHex : '#1A1A1A' }}
                      className="text-base sm:text-lg font-bold transition-colors"
                    >
                      للتعمق
                    </h3>
                    <span className="text-[11px] font-mono text-[#6B6B6B]" dir="ltr">
                      Pour approfondir
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B6B]">
                    {isDeepenExpanded
                      ? 'انقر لطي المحتوى المفصل'
                      : 'انقر لعرض الشرح المفصل، وضعية الانطلاق، التجارب، والمعجم الكامل'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline-block px-3 py-1 rounded-[8px] bg-[#FAF7F4] border border-[#E2D9D0] text-xs font-semibold text-[#4A4A4A]">
                  {isDeepenExpanded ? 'معروض' : 'محتوى كامل'}
                </span>
                <div
                  style={{
                    backgroundColor: isDeepenExpanded ? theme.primaryHex : '#FAF7F4',
                    color: isDeepenExpanded ? '#FFFFFF' : '#4A4A4A',
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  {isDeepenExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>
          )}

          {/* E. CONTENU DÉTAILLÉ DU COURS (REPLIÉ PAR DÉFAUT POUR COURS AVEC ESSENTIAL, DIRECT POUR LES AUTRES) */}
          {(!course.essential || isDeepenExpanded) && (
            <div className="space-y-5">
              {/* Course Content or Ready Slot Architecture View */}
              {!hasContent ? (
            <section className="bg-[#FFFFFF] rounded-[18px] border border-[#EAE2DA] p-6 space-y-5">
              <div
                style={{
                  backgroundColor: theme.softBgHex,
                  borderColor: theme.softBorderHex,
                }}
                className="p-4 rounded-[14px] border space-y-2"
              >
                <div
                  style={{ color: theme.primaryHex }}
                  className="flex items-center gap-2 text-sm font-bold"
                >
                  <PrimaryIcon className="w-5 h-5" />
                  <span>
                    هيكل الدرس {course.numero} ({theme.arabicName}) جاهز لاستقبال المحتوى الكامل
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-[1.85]">
                  تم تجهيز البنية البرمجية والبيداغوجية للدرس <strong>{course.numero}</strong> ضمن{' '}
                  <strong>{theme.arabicFullTitle}</strong> بهويته البصرية وأدواته التفاعلية الخاصة.
                </p>
              </div>

              {course.domaine === 'energy' ? (
                <div className="space-y-4">
                  <EnergyKeyFormulaBlock />
                  <EnergyAttentionUnitsBox />
                  <EnergyInteractiveChainSimulator defaultMode="both" defaultSystem="lamp" />
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-[#4A4A4A]">
                    معاينة حية للعرض العلمي ثنائي/ثلاثي اللغات والرموز الكيميائية داخل الدرس :
                  </h3>
                  <TrilingualTermBox terms={SPECIMEN_TRILINGUAL_TERMS} />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SPECIMEN_FORMULAS_SHOWCASE.map((f, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] text-center space-y-1"
                      >
                        <div className="text-[11px] text-[#6B6B6B]">{f.label}</div>
                        <ChemicalFormula formula={f.formula} size="md" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ) : (
            <>
              {/* LESSON SECTIONS (Each section groups its header WITH its first block so the title is never orphaned!) */}
              {(activeTab === 'all' || activeTab === 'lesson') &&
                course.sections.map((sec, secIdx) => {
                  // A section gets the overall simulation frame only if it is explicitly a dedicated simulation section
                  const isDedicatedSimulationSection =
                    (sec.blocks.length === 1 && sec.blocks[0].kind === 'simulation') ||
                    sec.titleArabic.includes('المحاكاة') ||
                    sec.titleArabic.includes('محاكي') ||
                    sec.blocks.some(
                      (b) =>
                        b.kind === 'schema' &&
                        (b.data.type === 'c03-fire-triangle-and-air' ||
                          b.data.type === 'c05-butane-step-by-step')
                    ) ||
                    (course.domaine === 'energy' &&
                      secIdx === 2 &&
                      (course.id === 'pc-course-07' || course.id === 'pc-course-08'));

                  return (
                    <React.Fragment key={sec.id}>
                      <section
                        id={sec.id}
                        className="rounded-[18px] p-5 sm:p-6 space-y-3.5 scroll-mt-28 transition-colors bg-[#FFFFFF] border border-[#EAE2DA]"
                      >
                        {/* Lead group: Section Header + First Block kept together for clean PDF pagination (fixes Bug 1) */}
                        <div className="section-lead-group space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
                            <div className="flex items-center gap-2.5">
                              <span
                                dir="ltr"
                                style={{
                                  backgroundColor: theme.primaryHex,
                                }}
                                className="w-7 h-7 rounded-[8px] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0"
                              >
                                {sec.number}
                              </span>
                              <h2 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                                <ChemPhysText text={sec.titleArabic} />
                              </h2>
                            </div>
                            {sec.titleFrench && (
                              <span
                                dir="ltr"
                                style={{
                                  unicodeBidi: 'isolate',
                                  color: theme.primaryHex,
                                }}
                                className="text-xs font-mono font-semibold"
                              >
                                {sec.titleFrench}
                              </span>
                            )}
                          </div>

                        {sec.blocks[0] &&
                          (sec.blocks[0].kind === 'discovery' ? (
                            <PhysicsDiscoveryBlock
                              data={sec.blocks[0].data}
                              part="part1"
                              isDiscoveryCompleted={isDiscoveryCompleted}
                              onCompleteDiscovery={handleCompleteDiscovery}
                            />
                          ) : (
                            renderBlock(sec.blocks[0], 0)
                          ))}
                      </div>

                      {sec.blocks[0]?.kind === 'discovery' && (
                        <PhysicsDiscoveryBlock
                          data={sec.blocks[0].data}
                          part="part2"
                          isDiscoveryCompleted={isDiscoveryCompleted}
                          onCompleteDiscovery={handleCompleteDiscovery}
                        />
                      )}

                      {/* Pour cours avec essential : Corrigé de l'activité exploratoire directement dans la Section 1 de « للتعمق » */}
                      {course.essential && secIdx === 0 && discoveryActivity && (
                        <div className="pt-2">
                          <PhysicsDiscoveryCorrectionCard activity={discoveryActivity} />
                        </div>
                      )}

                      {/* Remaining blocks as direct children for granular PDF pagination */}
                      {sec.blocks.slice(1).map((b, bIdx) => renderBlock(b, bIdx + 1))}

                      {/* COMPOSANTS SPÉCIFIQUES AU DOMAINE 02 (ÉNERGIE) INTÉGRÉS DANS LES COURS D'ÉNERGIE */}
                      {course.domaine === 'energy' && course.id === 'pc-course-10' && secIdx === 1 && (
                        <EnergyCircuitAndConverterBlock />
                      )}

                      {course.domaine === 'energy' && secIdx === 2 && (
                        <>
                          {(course.id === 'pc-course-07' || course.id === 'pc-course-08') && (
                            <EnergyInteractiveChainSimulator
                              defaultMode={course.id === 'pc-course-07' ? 'functional' : 'both'}
                              defaultSystem="lamp"
                            />
                          )}
                          {course.id === 'pc-course-10' && (
                            <>
                              <EnergyKeyFormulaBlock />
                              <EnergyAttentionUnitsBox />
                            </>
                          )}
                        </>
                      )}
                    </section>
                  </React.Fragment>
                  );
                })}

              {/* EXERCISES POUR LES COURS SANS CHAMP ESSENTIAL (Puisque les cours avec essential les affichent au-dessus de « للتعمق ») */}
              {!course.essential && renderExercisesBlock()}

              {/* SUMMARY, SCHEMATIC DIAGRAM & BILINGUAL VOCABULARY */}
              {(activeTab === 'all' || activeTab === 'summary') && (
                <div id="sec-pc-summary" className="space-y-5 scroll-mt-28">
                  <PhysicsSummarySection
                    resume={course.resume}
                    pointsEssentiels={course.pointsEssentiels}
                    summarySchema={course.schemas?.[0]}
                    ideeCle={course.ideeCle}
                    noteFinale={course.noteFinale}
                  />

                  <PhysicsVocabularyTable vocabulaire={course.vocabulaire} />
                </div>
              )}
            </>
          )}
            </div>
          )}

          {/* 3. CONTINUITÉ PÉDAGOGIQUE (PRÉCÉDENT / SUIVANT AVEC REPÈRE DE DOMAINE) */}
          <section
            id="sec-continuity"
            className="no-pdf bg-[#FFFFFF] rounded-[16px] border border-[#EAE2DA] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 className="text-base font-bold text-[#1A1A1A]">
                مواصلة المسار التعليمي (الدرس {course.numero} من {allCourses.length})
              </h2>
              <span
                style={{
                  backgroundColor: theme.softBgHex,
                  color: theme.primaryHex,
                  borderColor: theme.softBorderHex,
                }}
                className="px-3 py-1 rounded-[8px] border text-xs font-bold"
              >
                الميدان {theme.domainNumber} : {course.domaineNomArabe} · {course.domaineNomFrancais}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {prevCourse && prevTheme ? (
                <button
                  type="button"
                  onClick={() => onSelectCourse(prevCourse.id)}
                  style={{
                    borderColor: prevTheme.softBorderHex,
                    backgroundColor: prevTheme.softBgHex,
                  }}
                  className="p-4 rounded-[12px] border text-right flex flex-col justify-between transition-all hover:shadow-xs cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-[#6B6B6B] font-semibold">
                        الدرس السابق ({prevCourse.numero})
                      </span>
                      <span
                        style={{ color: prevTheme.primaryHex }}
                        className="font-bold"
                      >
                        الميدان {prevTheme.domainNumber} : {prevCourse.domaineNomArabe}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">
                      {prevCourse.titreArabe}
                    </h3>
                  </div>
                  <div
                    style={{ color: prevTheme.primaryHex }}
                    className="mt-3 text-xs font-bold"
                  >
                    → الانتقال إلى الدرس {prevCourse.numero}
                  </div>
                </button>
              ) : (
                <div className="p-4 rounded-[12px] border border-dashed border-[#E2D9D0] flex items-center justify-center text-xs text-[#8C8C8C]">
                  هذا هو الدرس الأول (01) في وحدة الفيزياء والكيمياء
                </div>
              )}

              {nextCourse && nextTheme ? (
                <button
                  type="button"
                  onClick={() => onSelectCourse(nextCourse.id)}
                  style={{
                    borderColor: nextTheme.softBorderHex,
                    backgroundColor: nextTheme.softBgHex,
                  }}
                  className="p-4 rounded-[12px] border text-right flex flex-col justify-between transition-all hover:shadow-xs cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-[#6B6B6B] font-semibold">
                        الدرس الموالي ({nextCourse.numero})
                      </span>
                      <span
                        style={{ color: nextTheme.primaryHex }}
                        className="font-bold"
                      >
                        الميدان {nextTheme.domainNumber} : {nextCourse.domaineNomArabe}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">
                      {nextCourse.titreArabe}
                    </h3>
                  </div>
                  <div
                    style={{ color: nextTheme.primaryHex }}
                    className="mt-3 text-xs font-bold"
                  >
                    الانتقال إلى الدرس {nextCourse.numero} ←
                  </div>
                </button>
              ) : (
                <div className="p-4 rounded-[12px] border border-dashed border-[#E2D9D0] flex items-center justify-center text-xs text-[#8C8C8C]">
                  نهاية سلسلة الدروس (20 / 20)
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </PhysicsDomainThemeProvider>
  );
};
