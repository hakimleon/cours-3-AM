import React, { useState, useEffect } from 'react';
import { Course } from '../types';

const MATH_DISCOVERY_UNLOCKED_STORAGE_KEY = 'math_3am_discovery_unlocked_v1';
import { StepByStepExample } from './StepByStepExample';
import { CommonMistakeBox } from './CommonMistakeBox';
import { SectionExercises } from './SectionExercises';
import { CourseContinuity } from './CourseContinuity';
import { AlgebraVisualDiscoveryLab } from './AlgebraVisualDiscoveryLab';
import { GeometryTriangleCongruence } from './GeometryTriangleCongruence';
import { GeometryParallelTransversal } from './GeometryParallelTransversal';
import { GeometryThalesLab } from './GeometryThalesLab';
import { PowersOfTenLab } from './PowersOfTenLab';
import { ExponentsPositiveNegativeLab } from './ExponentsPositiveNegativeLab';
import { ScientificNotationLab } from './ScientificNotationLab';
import { RelativePowerLab } from './RelativePowerLab';
import { OperationPrioritiesLab } from './OperationPrioritiesLab';
import { CircumcircleRightTriangleLab } from './CircumcircleRightTriangleLab';
import { MedianHypotenuseLab } from './MedianHypotenuseLab';
import { PythagoreanTheoremLab } from './PythagoreanTheoremLab';
import { ConversePythagoreanLab } from './ConversePythagoreanLab';
import { MathView, formatTextWithSuperscripts } from './MathView';
import { CourseGeometryTreatiseLinks } from './CourseGeometryTreatiseLinks';
import { DiscoveryActivitySection } from './DiscoveryActivitySection';
import { getCourseDiscoveryActivity } from '../data/discoveryActivitiesData';
import {
  SectionTitle,
  TypedBlock,
  AccentBulletItem,
  NumberedPropertyRow,
  PdfDownloadSvgIcon,
  CourseQuickQuiz,
  CourseDecisionTree,
} from './SchoolMouvBlocks';

interface CourseSectionsRendererProps {
  course: Course;
  allCourses: Course[];
  onSelectCourse: (courseId: string) => void;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
  onOpenTreatise?: (propertyId?: number) => void;
}

type TopTabMode = 'cours' | 'video' | 'quiz' | 'exercices' | 'defis';

// Map each course to its prerequisite courses for clickable prerequisite links (Spec 3.1)
const PREREQUISITE_COURSES_MAP: Record<string, { courseIds: string[]; extraNote: string }> = {
  'lesson-01': {
    courseIds: [],
    extraNote: 'تعريف العدد النسبي، المسافة إلى الصفر، وتعليم النقاط على المستقيم المدرج.',
  },
  'lesson-02': {
    courseIds: ['lesson-01'],
    extraNote: 'قاعدة الإشارات في جداء عددين نسبيين ومفهوم القسمة الإقليدية والعشرية.',
  },
  'lesson-03': {
    courseIds: ['lesson-02'],
    extraNote: 'الفرق بين معاكس عدد نسبي ومقلوب عدد غير معدوم.',
  },
  'lesson-04': {
    courseIds: ['lesson-02', 'lesson-03'],
    extraNote: 'ضرب كسرين ومقلوب كسر غير معدوم.',
  },
  'lesson-05': {
    courseIds: ['lesson-03', 'lesson-04'],
    extraNote: 'توحيد المقامات والجداء المتصالب لمقارنة الكسور.',
  },
  'lesson-06': {
    courseIds: ['lesson-01', 'lesson-05'],
    extraNote: 'توحيد مقامي كسرين وجمع البسطين مع الاحتفاظ بالمقام المشترك.',
  },
  'lesson-07': {
    courseIds: ['lesson-02', 'lesson-05'],
    extraNote: 'مفهوم الكسر وحاصل القسمة وتعيين إشارة عدد ناطق.',
  },
  'lesson-08': {
    courseIds: ['lesson-06', 'lesson-07'],
    extraNote: 'توحيد المقامات وقواعد جمع وطرح الأعداد النسبية.',
  },
  'lesson-09': {
    courseIds: ['lesson-04', 'lesson-07'],
    extraNote: 'قاعدة الإشارات ومقلوب عدد ناطق غير معدوم.',
  },
  'lesson-10': {
    courseIds: [],
    extraNote: 'عناصر المثلث (الأضلاع والزوايا) وإنشاء مثلث بمعرفة أطوال أضلاعه أو زواياه.',
  },
  'lesson-11': {
    courseIds: ['lesson-10'],
    extraNote: 'الزوايا المتقابلة بالرأس، الزاويتان المتتامتان (90°) والمتكاملتان (180°)، والتوازي والتعامد.',
  },
  'lesson-12': {
    courseIds: ['lesson-10', 'lesson-11'],
    extraNote: 'التوازي في المثلث، مستقيم المنتصفين، وتناسبية الأطوال والجداء المتصالب.',
  },
  'lesson-13': {
    courseIds: ['lesson-02'],
    extraNote: 'الضرب في 10، 100، 1000 وإزاحة الفاصلة العشرية.',
  },
  'lesson-14': {
    courseIds: ['lesson-03', 'lesson-13'],
    extraNote: 'خواص قوى العدد 10 ومفهوم المقلوب لربط الأس السالب بالأس الموجب.',
  },
  'lesson-15': {
    courseIds: ['lesson-13', 'lesson-14'],
    extraNote: 'كتابة عدد عشري على شكل جداء عدد محصور بين 1 و 10 في قوة للعدد 10.',
  },
  'lesson-16': {
    courseIds: ['lesson-02', 'lesson-14'],
    extraNote: 'قاعدة إشارات الجداء وتعميم مفهوم الأس والأساس على الأعداد النسبية.',
  },
  'lesson-17': {
    courseIds: ['lesson-14', 'lesson-16'],
    extraNote: 'أولويات العمليات الحسابية (الأقواس، ثم القوى، ثم الضرب والقسمة، ثم الجمع والطرح).',
  },
  'lesson-18': {
    courseIds: ['lesson-10', 'lesson-11'],
    extraNote: 'تعريف المثلث القائم والوتر، المتوسط في المثلث، وخواص أقطار المستطيل.',
  },
  'lesson-19': {
    courseIds: ['lesson-18'],
    extraNote: 'خاصية المتوسط المتعلق بالوتر في المثلث القائم وتعريف الدائرة المحيطة بالمثلث.',
  },
  'lesson-20': {
    courseIds: ['lesson-16', 'lesson-18', 'lesson-19'],
    extraNote: 'المثلث القائم وتعيين الوتر، مربع عدد موجب، والجذر التربيعي.',
  },
  'lesson-21': {
    courseIds: ['lesson-16', 'lesson-19', 'lesson-20'],
    extraNote: 'خاصية فيثاغورس المباشرة، حساب مربع طول ضلع، وتحديد أكبر ضلع في المثلث (الوتر المرشح).',
  },
};

export const CourseSectionsRenderer: React.FC<CourseSectionsRendererProps> = ({
  course,
  allCourses,
  onSelectCourse,
  onExportPdf,
  isExportingPdf,
  onOpenTreatise,
}) => {
  const [activeTab, setActiveTab] = useState<TopTabMode>('cours');
  const [unlockedMathDiscoveryIds, setUnlockedMathDiscoveryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(MATH_DISCOVERY_UNLOCKED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const discoveryActivity = getCourseDiscoveryActivity(course);
  const isMathDiscoveryCompleted = unlockedMathDiscoveryIds.includes(course.id);

  useEffect(() => {
    try {
      localStorage.setItem(
        MATH_DISCOVERY_UNLOCKED_STORAGE_KEY,
        JSON.stringify(unlockedMathDiscoveryIds)
      );
      window.dispatchEvent(new CustomEvent('math-discovery-unlocked-change'));
    } catch {
      // ignore storage errors
    }
  }, [unlockedMathDiscoveryIds]);

  const handleCompleteMathDiscovery = () => {
    if (!unlockedMathDiscoveryIds.includes(course.id)) {
      setUnlockedMathDiscoveryIds((prev) => [...prev, course.id]);
    }
    setTimeout(() => {
      document.getElementById('sec-concept')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const isGeometryCourse = [
    'lesson-10',
    'lesson-11',
    'lesson-12',
    'lesson-18',
    'lesson-19',
    'lesson-20',
    'lesson-21',
  ].includes(course.id);

  const prereqInfo = PREREQUISITE_COURSES_MAP[course.id] || {
    courseIds: [],
    extraNote: course.objectives[0] || '',
  };
  const linkedPrereqCourses = prereqInfo.courseIds
    .map((id) => allCourses.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c));

  const renderVisualDiscoveryLab = () => {
    switch (course.id) {
      case 'lesson-01':
      case 'lesson-02':
      case 'lesson-03':
      case 'lesson-04':
      case 'lesson-05':
      case 'lesson-06':
      case 'lesson-07':
      case 'lesson-08':
      case 'lesson-09':
        return <AlgebraVisualDiscoveryLab courseId={course.id} />;
      case 'lesson-10':
        return <GeometryTriangleCongruence />;
      case 'lesson-11':
        return <GeometryParallelTransversal />;
      case 'lesson-12':
        return <GeometryThalesLab />;
      case 'lesson-13':
        return <PowersOfTenLab />;
      case 'lesson-14':
        return <ExponentsPositiveNegativeLab />;
      case 'lesson-15':
        return <ScientificNotationLab />;
      case 'lesson-16':
        return <RelativePowerLab />;
      case 'lesson-17':
        return <OperationPrioritiesLab />;
      case 'lesson-18':
        return <MedianHypotenuseLab data={course.visualModelData} />;
      case 'lesson-19':
        return <CircumcircleRightTriangleLab />;
      case 'lesson-20':
        return <PythagoreanTheoremLab data={course.visualModelData} />;
      case 'lesson-21':
        return <ConversePythagoreanLab />;
      default:
        return <AlgebraVisualDiscoveryLab courseId={course.id} />;
    }
  };

  // Build numbered properties list for Section 2 (Spec 4 - Propriétés numérotées)
  const buildPropertiesList = () => {
    if (course.id === 'lesson-18') {
      return [
        {
          groupSubtitle: 'أولاً : الخاصية المباشرة (حساب طول المتوسط والوتر)',
          conditionText: 'إذا كان المثلث ABC قائماً في A وكان M منتصف الوتر [BC]،',
          statementText:
            'فإن طول المتوسط [AM] المتعلق بالوتر يساوي نصف طول الوتر [BC] (لأن إتمام المثلث بالتناظر المركزي يعطي مستطيلاً قطراه متقايسان ومتناصفان).',
          mathLatex: 'AM = \\frac{1}{2}BC = BM = CM',
        },
        {
          groupSubtitle: 'ثانياً : الخاصية العكسية (إثبات أن المثلث قائم الزاوية)',
          conditionText: 'إذا كان في مثلث ABC طول المتوسط [AM] مساوياً لنصف طول الضلع [BC]،',
          statementText:
            'فإن هذا المثلث قائم الزاوية في الرأس A المقابل للضلع [BC].',
          mathLatex: 'AM = \\frac{1}{2}BC \\implies \\widehat{BAC} = 90^{\\circ}',
        },
      ];
    }

    if (course.id === 'lesson-19') {
      return [
        {
          groupSubtitle: 'أولاً : الخاصية المباشرة (مركز ونصف قطر الدائرة المحيطة)',
          conditionText: 'إذا كان المثلث ABC قائماً في A،',
          statementText:
            'فإن وتره [BC] هو قطر للدائرة (C) المحيطة به، ومركزها O هو منتصف الوتر [BC]، ونصف قطرها R يساوي نصف طول الوتر.',
          mathLatex: 'R = OA = OB = OC = \\frac{1}{2}BC',
        },
        {
          groupSubtitle: 'ثانياً : الخاصية العكسية (إثبات التعامد في الدائرة)',
          conditionText: 'إذا كان الضلع [BC] قطراً للدائرة (C) وكانت النقطة A تنتمي إلى (C)،',
          statementText:
            'فإن المثلث ABC قائم الزاوية في الرأس A المقابل للقطر [BC].',
          mathLatex: 'A \\in (C) \\implies \\widehat{BAC} = 90^{\\circ}',
        },
      ];
    }

    if (course.id === 'lesson-20') {
      return [
        {
          groupSubtitle: 'أولاً : خاصية فيثاغورس وحساب طول الوتر (بجمع المربعين)',
          conditionText: 'إذا كان المثلث BCA قائماً في A (حيث [BC] هو الوتر)،',
          statementText:
            'فإن مربع طول الوتر يساوي مجموع مربعي طولي الضلعين القائمين.',
          mathLatex: 'BC^2 = BA^2 + CA^2 \\implies BC = \\sqrt{BA^2 + CA^2}',
        },
        {
          groupSubtitle: 'ثانياً : حساب طول ضلع قائم مجهول (بطرح المربعين)',
          conditionText: 'إذا علمنا طول الوتر [BC] وطول أحد الضلعين القائمين [CA] في المثلث القائم BCA،',
          statementText:
            'فإن مربع طول الضلع القائم المجهول يساوي مربع طول الوتر مطروحاً منه مربع طول الضلع القائم المعلوم.',
          mathLatex: 'BA^2 = BC^2 - CA^2 \\implies BA = \\sqrt{BC^2 - CA^2}',
        },
      ];
    }

    if (course.id === 'lesson-21') {
      return [
        {
          groupSubtitle: 'أولاً : خاصية عكس فيثاغورس (إثبات أن المثلث قائم الزاوية)',
          conditionText:
            'إذا كان في مثلث ABC (حيث [BC] هو أكبر أضلاعه) مربع طول أكبر ضلع يساوي مجموع مربعي طولي الضلعين الآخرين،',
          statementText:
            'فإن المثلث ABC قائم الزاوية في الرأس A المقابل لأكبر ضلع [BC]، ويكون الضلع [BC] هو الوتر.',
          mathLatex: 'BC^2 = AB^2 + AC^2 \\implies \\widehat{A} = 90^{\\circ} \\iff (AB) \\perp (AC)',
        },
        {
          groupSubtitle: 'ثانياً : طريقة العمل عند عدم تحقق المساواة (إثبات أن المثلث غير قائم)',
          conditionText:
            'إذا حسبنا في مثلث DEF مربع أكبر ضلع [EF] لوحده، ومجموع مربعي الضلعين الآخرين DE² + DF² لوحده، فوجدنا أنهما غير متساويين،',
          statementText:
            'فإن العلاقة غير محققة، وبالتالي نستنتج أن المثلث DEF ليس مثلثاً قائم الزاوية.',
          mathLatex: 'EF^2 \\neq DE^2 + DF^2 \\implies \\text{المثلث } DEF \\text{ غير قائم}',
        },
      ];
    }

    const list = [
      {
        groupSubtitle: `الخاصية الأساسية — ${course.primaryFormula.title}`,
        conditionText: course.primaryFormula.condition,
        statementText:
          course.primaryFormula.note ||
          'بتطبيق القاعدة القانونية على المعطيات نحصل على المساواة الرياضية التالية :',
        mathLatex: course.primaryFormula.math,
      },
    ];

    if (course.secondaryFormulas && course.secondaryFormulas.length > 0) {
      course.secondaryFormulas.forEach((sec) => {
        list.push({
          groupSubtitle: sec.title,
          conditionText: undefined,
          statementText: sec.note || sec.title,
          mathLatex: sec.math,
        });
      });
    }

    return list;
  };

  const propertiesList = buildPropertiesList();

  const handleTabClick = (tab: TopTabMode) => {
    setActiveTab(tab);
    if (tab === 'video') {
      document.getElementById('sec-concept')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'exercices' || tab === 'defis') {
      setTimeout(() => {
        document.getElementById('sec-exercises')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. BARRE D'ONGLETS EN HAUT : Déverrouillée uniquement après complétion de la Section 0 (Activité de découverte) */}
      {isMathDiscoveryCompleted && (
        <nav
          aria-label="تبويبات الدرس"
          className="no-pdf grid grid-cols-5 gap-2 sm:gap-3 max-w-[760px] mx-auto"
        >
          {[
            {
              id: 'cours' as TopTabMode,
              label: 'الدرس',
              sub: 'Cours',
              svg: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C94BA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              ),
            },
            {
              id: 'video' as TopTabMode,
              label: 'استكشاف',
              sub: 'Vidéo / Lab',
              svg: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C94BA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ),
            },
            {
              id: 'quiz' as TopTabMode,
              label: 'كويز',
              sub: 'Quiz',
              svg: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C94BA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              ),
            },
            {
              id: 'exercices' as TopTabMode,
              label: 'تمارين',
              sub: 'Exercices',
              svg: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C94BA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              ),
            },
            {
              id: 'defis' as TopTabMode,
              label: 'تحديات',
              sub: 'Défis',
              svg: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C94BA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              ),
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`bg-[#FFFFFF] rounded-[16px] py-2.5 px-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                  isActive
                    ? 'border-[#C94BA6] shadow-xs ring-1 ring-[#C94BA6]/30'
                    : 'border-transparent hover:border-[#C94BA6]/40 opacity-85 hover:opacity-100'
                }`}
              >
                {tab.svg}
                <span className="text-xs sm:text-sm font-bold text-[#C94BA6] leading-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      )}

      {/* 2. CARTE BLANCHE CENTRALE (--bg-card: #FFFFFF, border-radius: var(--radius) = 16px) */}
      <article
        dir="rtl"
        className="relative bg-[#FFFFFF] rounded-[16px] shadow-2xs border border-[#EAE2DA] px-5 sm:px-10 md:px-14 py-8 sm:py-11 max-w-[760px] mx-auto"
      >
        {/* Bouton « Télécharger en PDF » en haut de la carte */}
        {onExportPdf && (
          <button
            type="button"
            onClick={onExportPdf}
            disabled={isExportingPdf}
            title="تحميل الدرس بصيغة PDF"
            aria-label="تحميل الدرس بصيغة PDF"
            className="no-pdf absolute top-5 left-5 px-3 h-10 rounded-full border border-[#C94BA6]/45 bg-[#FFFFFF] hover:border-[#C94BA6] hover:bg-[#C94BA6]/10 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <PdfDownloadSvgIcon isExporting={isExportingPdf} />
            <span className="text-xs font-bold text-[#C94BA6]">
              {isExportingPdf ? 'جاري الحفظ...' : 'حفظ PDF'}
            </span>
          </button>
        )}

        {/* Colonne étroite centrale max-width: var(--content-max) (640px), line-height: 1.9 */}
        <div
          id="course-card-inner"
          className="max-w-[640px] mx-auto space-y-10 text-[#4A4A4A] leading-[1.9]"
        >
          {/* EN-TÊTE DE LA FICHE DE COURS (Anti-Spoiler : Titre + Sous-titre neutre uniquement -> directement Section 0 : Activité de découverte) */}
          <header id="sec-obj" className="scroll-mt-24 pl-10 border-b border-[#E5DDD5] pb-6">
            <div className="text-xs font-bold text-[#C94BA6] mb-1">
              الدرس <span dir="ltr">{course.number}</span> · الرياضيات — السنة الثالثة متوسط (3AM)
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#4A4A4A] leading-snug">
              {formatTextWithSuperscripts(course.title, false)}
            </h1>
          </header>

          {/* Si l'onglet Quiz est sélectionné (après déverrouillage), afficher le Quiz */}
          {isMathDiscoveryCompleted && activeTab === 'quiz' && <CourseQuickQuiz course={course} />}

          {/* SECTION 0 : النشاط الاستكشافي (Directement après l'en-tête, sans objectifs ni résumé préalable) */}
          <DiscoveryActivitySection
            courseId={course.id}
            activity={discoveryActivity}
            isDiscoveryCompleted={isMathDiscoveryCompleted}
            onCompleteDiscovery={handleCompleteMathDiscovery}
          />

          {/* SECTION 1 : التعريف، التمثيل البصري والخاصية الأساسية */}
          <section id="sec-concept" className="scroll-mt-24 space-y-6">
            {/* المكتسبات القبلية الواجب استحضارها (placée après l'activité de découverte) */}
            <div aria-label="المكتسبات القبلية" className="space-y-2 text-[15px]">
              <div className="italic font-semibold text-[#4A4A4A]">
                المكتسبات القبلية الواجب استحضارها :
              </div>
              <ul className="space-y-1.5 pr-2 text-[#4A4A4A]">
                {linkedPrereqCourses.map((prevC) => (
                  <AccentBulletItem key={prevC.id} italic>
                    <span>مراجعة درس : </span>
                    <button
                      type="button"
                      onClick={() => onSelectCourse(prevC.id)}
                      className="text-[#C94BA6] font-semibold underline decoration-dotted underline-offset-4 hover:opacity-80 cursor-pointer"
                    >
                      الدرس {prevC.number} — {prevC.title}
                    </button>
                  </AccentBulletItem>
                ))}
                <AccentBulletItem italic>
                  {formatTextWithSuperscripts(prereqInfo.extraNote)}
                </AccentBulletItem>
              </ul>
            </div>

            <SectionTitle number={1} title="التعريف، قراءة الشكل والخاصية الأساسية" />

            {/* 1.1 Définition du vocabulaire */}
            <TypedBlock kind="definition" customLabel="تعريف ومفاهيم أساسية">
              <ul className="space-y-2">
                {course.vocabulary.map((voc, vIdx) => (
                  <AccentBulletItem key={vIdx}>
                    <strong>{formatTextWithSuperscripts(voc.arabic)}</strong>{' '}
                    <span className="text-xs text-[#8C8C8C]" dir="ltr">
                      ({voc.french})
                    </span>{' '}
                    : {formatTextWithSuperscripts(voc.meaning)}.
                  </AccentBulletItem>
                ))}
              </ul>
            </TypedBlock>

            {/* 1.2 Lecture de la figure */}
            <div className="my-4">{renderVisualDiscoveryLab()}</div>

            {/* 1.3 Énoncé officiel unique de la propriété principale avec sa formule */}
            {propertiesList[0] && (
              <TypedBlock
                kind="propriete"
                customLabel={isGeometryCourse ? 'الخاصية الأساسية' : 'القاعدة الأساسية'}
              >
                <NumberedPropertyRow
                  number={1}
                  groupSubtitle={propertiesList[0].groupSubtitle}
                  conditionText={propertiesList[0].conditionText}
                  statementText={propertiesList[0].statementText}
                  mathLatex={propertiesList[0].mathLatex}
                  courseId={course.id}
                  propIndex={0}
                />
              </TypedBlock>
            )}
          </section>

          {/* SECTION 2 : التبرير الرياضي والخاصية العكسية / النتائج (Règle 1 : justification + réciproque uniquement, sans reformuler la propriété 1) */}
          <section id="sec-property" className="scroll-mt-24 space-y-6">
            <SectionTitle
              number={2}
              title={
                propertiesList.length > 1
                  ? 'التبرير الرياضي والخاصية العكسية'
                  : 'التبرير الرياضي وشروط التطبيق'
              }
            />

            <TypedBlock
              kind="propriete"
              customLabel={
                propertiesList.length > 1
                  ? 'لماذا تصح الخاصية؟ والخاصية العكسية المرتبطة بها'
                  : 'التبرير الرياضي وشروط التطبيق'
              }
            >
              {/* Démonstration / Justification concise (pourquoi c'est vrai — Règle 1) */}
              <div className="bg-[#F6F0EB]/55 rounded-[12px] p-3.5 border border-[#E5DDD5] text-sm text-[#4A4A4A] leading-[1.85] mb-3">
                <strong className="text-[#C94BA6]">التبرير الرياضي (لماذا تصح هذه القاعدة؟) : </strong>
                <span>
                  {formatTextWithSuperscripts(
                    ({
                      'lesson-01':
                        'عندما يكون للعددين نفس الإشارة تتحرك الإزاحتان على المستقيم المدرج في نفس الاتجاه فتتراكم المسافتان بالجمع، وعندما تختلف الإشارتان تتعاكس الإزاحتان فنطرح المسافتين ونأخذ إشارة الأبعد عن الصفر.',
                      'lesson-02':
                        'بما أن القسمة a ÷ b = c تكافئ الضرب العكسي c × b = a، فإن قاعدة إشارات القسمة تتطابق حتماً مع قاعدة إشارات الضرب، وتستحيل القسمة على 0 لعدم وجود عدد يحقق c × 0 = a (مع a ≠ 0).',
                      'lesson-03':
                        'لأن جداء العدد في مقلوبه يساوي +1 (عدد موجب)، ولكي يكون الجداء موجباً يجب أن يكون للعدد ومقلوبه نفس الإشارة دوماً.',
                      'lesson-04':
                        'قسمة الكسر a/b على الكسر غير المعدوم c/d تعني ضرب الكسر الأول في مقلوب الكسر الثاني d/c، وذلك بتحويل القسمة إلى ضرب كما ثبت في درس المقلوب.',
                      'lesson-05':
                        'توحيد المقامات يجعل الكسرين مقسمين إلى أجزاء متساوية الحجم من نفس الوحدة، فتؤول المقارنة مباشرة إلى مقارنة عدد الأجزاء (البسطين).',
                      'lesson-06':
                        'لا يمكن جمع أو طرح أجزاء مختلفة الحجم إلا بعد تقسيمها إلى نفس الوحدة الكسرية (المقام المشترك)، وحينها نجمع أو نطرح عدد الأجزاء مع بقاء المقام المشترك ثابتاً.',
                      'lesson-07':
                        'ضرب بسط ومقام العدد الناطق في (-1) لا يغير قيمته الكسرية، مما يسمح بجعل المقام عدداً طبيعياً موجباً دوماً وحصر الإشارة في البسط.',
                      'lesson-08':
                        'بعد كتابة الأعداد الناطقة بمقامات موجبة وتوحيدها، تتحول العملية إلى جمع أو طرح بسطين نسبيين، حيث طرح عدد ناطق يعادل جمع معاكسه.',
                      'lesson-09':
                        'تعميم ضرب وقسمة الكسور على الأعداد الناطقة يخضع لقاعدة الإشارات أولاً ثم الاختزال المسبق للعوامل المشتركة قبل الضرب.',
                      'lesson-10':
                        'تقايس ثلاثة عناصر مرتبة (SSS أو SAS أو ASA) يفرض تطابق المثلثين كلياً بالانسحاب أو الدوران أو التناظر المحوري، مما يثبت تقايس بقية العناصر المتماثلة.',
                      'lesson-11':
                        'توازي المستقيمين يحفظ نفس الميل مع القاطع فتتطابق الزاويتان المتماثلتان بالانسحاب، ومنهما تنتج مساواة الزوايا المتبادلة داخلياً وخارجياً بالتقابل بالرأس.',
                      'lesson-12':
                        'المستقيم الموازي لضلع في مثلث يصنع مع القاطعين زوايا متماثلة متقايسة، فيكون المثلث الصغير تصغيراً أو تكبيراً للمثلث الكبير بنفس معامل التناسب k على الأضلاع الثلاثة.',
                      'lesson-13':
                        'ضم مجموعتي عوامل العدد 10 عند الضرب يجمع عدد العوامل، واختزال عوامل البسط والمقام عند القسمة يطرح عدد العوامل.',
                      'lesson-14':
                        'الانتقال خطوة نحو اليسار في سلم قوى 10 يقابل القسمة على 10، مما يبرر أن الأس السالب 10⁻ⁿ هو مقلوب القوة الموجبة 1/10ⁿ وليس عدداً سالباً.',
                      'lesson-15':
                        'إزاحة الفاصلة بـ n مرتبة تعادل الضرب أو القسمة على 10ⁿ، ومقارنة المعامل a بالعدد 5 تحدد أقرب قوة للعدد 10 كرتبة مقدار.',
                      'lesson-16':
                        'في قوة عدد سالب (-a)ⁿ، تجمع العوامل السالبة مثنى مثنى يعطي جداءً موجباً إذا كان الأس n زوجياً، وتبقى إشارة سالبة وحيدة إذا كان الأس n فردياً.',
                      'lesson-17':
                        'القوة جداء مكرر مدمج في أساسه فيجب فكه قبل الضرب، والضرب جمع مكرر فيجب إنجازه قبل الجمع والطرح، بينما الأقواس تعزل ما بداخلها كوحدة أولى.',
                      'lesson-18':
                        'بإتمام المثلث القائم ABC بنظيره بالنسبة إلى منتصف الوتر M نحصل على مستطيل قطراه [BC] و [AD] متقايسان ومتناصفان في M، ومنه AM = ½ BC.',
                      'lesson-19':
                        'بما أن منتصف الوتر O يبعد بنفس المسافة عن الرؤوس الثلاثة (OA = OB = OC = ½ BC حسب خاصية المتوسط)، فإن الدائرة ذات المركز O والقطر [BC] تشمل حتماً الرؤوس الثلاثة.',
                      'lesson-20':
                        'مساحة المربع المنشأ على الوتر في المثلث القائم تساوي مجموع مساحتي المربعين المنشأين على الضلعين القائمين، وهو ما يربط أطوال الأضلاع الثلاثة بعلاقة المربعات.',
                      'lesson-21':
                        'إذا تحققت مساواة مربع أكبر ضلع لمجموع مربعي الضلعين الآخرين في مثلث ABC، فإنه يطابق بمقياس SSS مثلثاً قائماً له نفس الضلعين القائمين، فتكون الزاوية المقابلة لأكبر ضلع قائمة (90°).',
                    } as Record<string, string>)[course.id] ||
                      course.objectives[0]?.replace(/^التهيئة\s*:\s*/, '') ||
                      course.heroDescription
                  )}
                </span>
              </div>

              {/* Propriété réciproque ou secondaire uniquement (sans répéter propertiesList[0]) */}
              {propertiesList.length > 1 && (
                <div className="divide-y divide-[#E5DDD5] pt-2">
                  {propertiesList.slice(1).map((prop, sIdx) => (
                    <NumberedPropertyRow
                      key={sIdx + 1}
                      number={sIdx + 2}
                      groupSubtitle={prop.groupSubtitle}
                      conditionText={prop.conditionText}
                      statementText={prop.statementText}
                      mathLatex={prop.mathLatex}
                      courseId={course.id}
                      propIndex={sIdx + 1}
                    />
                  ))}
                </div>
              )}
            </TypedBlock>
          </section>

          {/* SECTION 3 : تطبيقات وأمثلة موجهة (Application : Énoncé / Correction) */}
          {course.guidedExamples && course.guidedExamples.length > 0 && (
            <section id="sec-guided-examples" className="scroll-mt-24 space-y-6">
              <SectionTitle
                number={3}
                title={course.sections[2]?.title || 'تطبيقات وأمثلة محلولة خطوة بخطوة'}
              />

              <div className="space-y-6">
                {course.guidedExamples.map((example, idx) => (
                  <StepByStepExample
                    key={idx}
                    title={example.title}
                    initialMath={example.initialMath}
                    diagramId={example.diagramId}
                    steps={example.steps}
                    conclusion={example.conclusion}
                  />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 4 : طرائق وتنبيهات لتفادي الأخطاء الشائعة (Bloc typé Astuce) */}
          {course.commonMistakes && course.commonMistakes.length > 0 && (
            <section id="sec-common-mistakes" className="scroll-mt-24 space-y-6">
              <SectionTitle
                number={4}
                title={course.sections[3]?.title || 'طرائق وتنبيهات حول الأخطاء الشائعة'}
              />

              <div className="space-y-4">
                {course.commonMistakes.map((mistake, idx) => (
                  <CommonMistakeBox
                    key={idx}
                    title={mistake.title}
                    mistakeMath={mistake.mistakeMath}
                    whyExplanation={mistake.whyExplanation}
                    correctMath={mistake.correctMath}
                    note={mistake.note}
                  />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 5 : تمارين تطبيقية وتحديات + تصحيح النشاط الاستكشافي (Énoncé / Correction) */}
          <section id="sec-exercises" className="scroll-mt-24 space-y-6">
            <SectionTitle
              number={5}
              title={course.sections[4]?.title || 'تمارين تدريبية وتحديات مع التصحيح'}
            />

            <SectionExercises
              exercises={course.exercises}
              discoveryActivity={discoveryActivity}
              initialFilter={activeTab === 'defis' ? 'advanced' : 'all'}
            />
          </section>

          {/* 4. SECTION 6 : UN SEUL BLOC DE RÉSUMÉ SOUS FORME DE SCHÉMA / ARBRE DE DÉCISION (Règle 2) */}
          <section id="sec-summary" className="scroll-mt-24 space-y-5 pt-2 border-t border-[#E5DDD5]">
            <SectionTitle number={6} title="حوصلة الدرس (مخطط قرار)" />

            <CourseDecisionTree course={course} propertiesList={propertiesList} />
          </section>
        </div>
      </article>

      {/* Fiches de propriétés de référence liées au traité (69 propriétés) à la toute fin du cours */}
      <div className="max-w-[760px] mx-auto space-y-6">
        {isGeometryCourse && onOpenTreatise && (
          <CourseGeometryTreatiseLinks
            courseId={course.id}
            courseTitle={course.title}
            courseProperties={propertiesList}
            onOpenTreatise={onOpenTreatise}
          />
        )}

        {/* Navigation vers le cours précédent / suivant */}
        <CourseContinuity
          currentCourse={course}
          allCourses={allCourses}
          onSelectCourse={onSelectCourse}
        />
      </div>
    </div>
  );
};
