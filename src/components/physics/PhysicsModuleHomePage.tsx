import React, { useState, useMemo } from 'react';
import {
  PhysicsChemistryCourse,
  PhysicsDomainId,
} from '../../typesPhysicsChemistry';
import {
  PHYSICS_DOMAINS,
  SPECIMEN_TRILINGUAL_TERMS,
  SPECIMEN_FORMULAS_SHOWCASE,
} from '../../data/physicsChemistryCoursesData';
import { ChemicalFormula } from './ChemPhysText';
import {
  TrilingualTermBox,
  PhysicsSchemaRenderer,
} from './PhysicsChemistryBlocks';
import {
  getDomainTheme,
  DomainPatternSvg,
  PhysicsDomainThemeTokens,
} from './domainThemeTokens';
import {
  Atom,
  Search,
  Star,
  CheckCircle2,
  BookOpen,
  ChevronLeft,
  FlaskConical,
  Eye,
  EyeOff,
  FileDown,
  Loader2,
  Layers,
} from 'lucide-react';

interface PhysicsModuleHomePageProps {
  courses: PhysicsChemistryCourse[];
  completedCourseIds: string[];
  favoriteCourseIds: string[];
  onSelectCourse: (courseId: string) => void;
  onToggleCompleted: (courseId: string) => void;
  onToggleFavorite: (courseId: string) => void;
  onExportCoursePdf?: (course: PhysicsChemistryCourse) => void;
  isExportingPdf?: boolean;
}

export const PhysicsModuleHomePage: React.FC<PhysicsModuleHomePageProps> = ({
  courses,
  completedCourseIds,
  favoriteCourseIds,
  onSelectCourse,
  onToggleCompleted,
  onToggleFavorite,
  onExportCoursePdf,
  isExportingPdf = false,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<PhysicsDomainId | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [showSpecimen, setShowSpecimen] = useState<boolean>(false);

  const progressStats = useMemo(() => {
    const total = courses.length;
    const completed = courses.filter((c) => completedCourseIds.includes(c.id)).length;
    const populated = courses.filter((c) => c.status === 'populated').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, populated, percentage };
  }, [courses, completedCourseIds]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (selectedDomain !== 'all' && course.domaine !== selectedDomain) {
        return false;
      }
      if (onlyFavorites && !favoriteCourseIds.includes(course.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = course.numero.toLowerCase().includes(q);
        const matchesTitle = course.titre.toLowerCase().includes(q);
        const matchesAr = course.titreArabe.toLowerCase().includes(q);
        const matchesFr = (course.titreFrancais || '').toLowerCase().includes(q);
        const matchesDom =
          course.domaineNomArabe.toLowerCase().includes(q) ||
          course.domaineNomFrancais.toLowerCase().includes(q);
        if (!matchesNum && !matchesTitle && !matchesAr && !matchesFr && !matchesDom) {
          return false;
        }
      }
      return true;
    });
  }, [courses, selectedDomain, onlyFavorites, favoriteCourseIds, searchQuery]);

  // Rendu d'une carte de cours stylisée dynamiquement par les tokens de son domaine
  const renderCourseCard = (course: PhysicsChemistryCourse) => {
    const theme = getDomainTheme(course.domaine);
    const DomainIcon = theme.PrimaryIcon;
    const isCompleted = completedCourseIds.includes(course.id);
    const isFavorite = favoriteCourseIds.includes(course.id);
    const isPopulated = course.status === 'populated' || course.sections.length > 0;

    return (
      <div
        key={course.id}
        style={{
          borderColor: isCompleted ? theme.primaryHex : undefined,
        }}
        className="bg-[#FFFFFF] rounded-[16px] border border-[#EAE2DA] overflow-hidden flex flex-col justify-between transition-all group shadow-2xs hover:shadow-md"
      >
        {/* Top accent bar aux couleurs du domaine */}
        <div
          className="h-2 w-full"
          style={{ background: theme.cardTopBarGradient }}
        />

        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            {/* Top row: Course Number + Domain + Actions */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  dir="ltr"
                  style={{ backgroundColor: theme.primaryHex }}
                  className="w-9 h-9 rounded-[10px] text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs"
                >
                  {course.numero}
                </span>
                <div>
                  <div
                    style={{ color: theme.primaryHex }}
                    className="text-xs font-bold flex items-center gap-1"
                  >
                    <DomainIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      الميدان {theme.domainNumber} · {course.domaineNomArabe}
                    </span>
                  </div>
                  <div
                    dir="ltr"
                    className="text-[11px] font-mono text-[#8C8C8C] text-right"
                  >
                    {course.domaineNomFrancais}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(course.id)}
                  title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                  className={`p-1.5 rounded-[8px] border transition-colors cursor-pointer ${
                    isFavorite
                      ? 'bg-[#C94BA6]/10 border-[#C94BA6]/30 text-[#C94BA6]'
                      : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#8C8C8C] hover:text-[#C94BA6]'
                  }`}
                >
                  <Star className={`w-4 h-4 ${isFavorite ? 'fill-[#C94BA6]' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => onToggleCompleted(course.id)}
                  title={isCompleted ? 'تحديد كغير مكتمل' : 'تحديد كدرس مكتمل'}
                  style={
                    isCompleted
                      ? {
                          backgroundColor: `${theme.primaryHex}18`,
                          borderColor: `${theme.primaryHex}55`,
                          color: theme.primaryHex,
                        }
                      : undefined
                  }
                  className={`p-1.5 rounded-[8px] border transition-colors cursor-pointer ${
                    isCompleted
                      ? ''
                      : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#8C8C8C] hover:text-[#4A4A4A]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Course Titles */}
            <div className="space-y-1 pt-1">
              <h3 className="text-base font-bold text-[#1A1A1A] transition-colors">
                {course.titreArabe}
              </h3>
              {course.titreFrancais && (
                <div
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate', color: theme.darkTextHex }}
                  className="text-xs font-mono font-medium text-right opacity-85"
                >
                  {course.titreFrancais}
                </div>
              )}
            </div>

            {/* Sous-titres bilingues ou statut */}
            {course.sousTitresBilingues && course.sousTitresBilingues.length > 0 ? (
              <div
                style={{
                  backgroundColor: theme.softBgHex,
                  borderColor: theme.softBorderHex,
                }}
                className="p-2.5 rounded-[10px] border text-[11px] space-y-1"
              >
                {course.sousTitresBilingues.slice(0, 2).map((st, i) => (
                  <div
                    key={i}
                    style={{ color: theme.darkTextHex }}
                    className="flex items-center justify-between gap-2 font-medium"
                  >
                    <span className="truncate">• {st.arabe}</span>
                  </div>
                ))}
              </div>
            ) : course.introduction ? (
              <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                {course.introduction}
              </p>
            ) : (
              <div className="p-2.5 rounded-[10px] bg-[#FAF7F4] border border-dashed border-[#E2D9D0] text-[11px] text-[#8C8C8C] leading-relaxed">
                قالب الدرس {course.numero} مهيأ ومستعد لاستيراد المحتوى العلمي الرسمي كاملاً.
              </div>
            )}
          </div>

          {/* Card Footer CTA */}
          <div className="pt-3 border-t border-[#EAE2DA] flex items-center justify-between gap-2">
            <span
              style={isPopulated ? { color: theme.darkTextHex } : undefined}
              className="text-[11px] font-semibold text-[#8C8C8C]"
            >
              {isPopulated
                ? `${course.sections.length} أقسام علمية متكاملة`
                : `بانتظار المحتوى (${course.numero}/20)`}
            </span>

            <div className="flex items-center gap-2">
              {onExportCoursePdf && (
                <button
                  type="button"
                  disabled={isExportingPdf}
                  onClick={() => onExportCoursePdf(course)}
                  title={`حفظ الدرس ${course.numero} بصيغة PDF`}
                  style={{
                    borderColor: `${theme.primaryHex}55`,
                    color: theme.primaryHex,
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] border bg-[#FAF7F4] hover:opacity-90 text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <FileDown className="w-3 h-3" />
                  )}
                  <span>PDF</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onSelectCourse(course.id)}
                style={{ backgroundColor: theme.primaryHex }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[9px] text-xs font-bold text-white hover:opacity-95 transition-opacity cursor-pointer shadow-2xs"
              >
                <span>فتح الدرس {course.numero}</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Rendu de la bannière d'en-tête et de la carte de présentation d'un domaine
  const renderDomainHeroAndPresentation = (
    theme: PhysicsDomainThemeTokens,
    domainCourses: PhysicsChemistryCourse[],
    isCompactView: boolean = false
  ) => {
    const PrimaryIcon = theme.PrimaryIcon;
    const SecondaryIcon = theme.SecondaryIcon;
    const TertiaryIcon = theme.TertiaryIcon;

    const completedInDomain = domainCourses.filter((c) =>
      completedCourseIds.includes(c.id)
    ).length;
    const populatedInDomain = domainCourses.filter(
      (c) => c.status === 'populated' || c.sections.length > 0
    ).length;
    const domainProgressPercent =
      domainCourses.length > 0
        ? Math.round((completedInDomain / domainCourses.length) * 100)
        : 0;

    return (
      <div className="space-y-4">
        {/* 1. Bannière d'en-tête propre au domaine (avec dégradé, motif SVG et les 3 pictos) */}
        <div
          style={{ background: theme.headerGradient }}
          className="relative overflow-hidden rounded-[20px] p-5 sm:p-7 text-white shadow-sm"
        >
          <DomainPatternSvg domainId={theme.id} />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
                <span className="px-2.5 py-1 rounded-[8px] bg-white/20 backdrop-blur-xs font-mono" dir="ltr">
                  Domaine {theme.domainNumber} · Cours {theme.courseRange}
                </span>
                <span>·</span>
                <span>{populatedInDomain} من {domainCourses.length} دروس متوفرة</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                {theme.arabicFullTitle}
              </h2>
              <div
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
                className="text-xs sm:text-sm font-mono font-semibold text-white/90 text-right"
              >
                {theme.frenchFullTitle}
              </div>

              <p className="text-xs sm:text-sm text-white/95 leading-[1.85] pt-1">
                {theme.bannerDescriptionAr}
              </p>

              {/* Les 3 pictogrammes thématiques du domaine (ex: Éclair, Pile, Soleil pour Énergie) */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {[PrimaryIcon, SecondaryIcon, TertiaryIcon].map((IconComp, idx) => {
                  const lbl = theme.iconLabels[idx];
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white/15 backdrop-blur-xs border border-white/25 text-xs font-semibold"
                    >
                      <IconComp className="w-4 h-4 shrink-0" />
                      <span>{lbl?.ar}</span>
                      <span className="text-[10px] font-mono opacity-85" dir="ltr">
                        ({lbl?.fr})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Encart de progression spécifique au domaine */}
            <div className="bg-black/20 backdrop-blur-xs rounded-[16px] border border-white/25 p-4 sm:p-5 min-w-[250px] space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>تقدمك في {theme.arabicName}</span>
                <span className="font-mono text-sm" dir="ltr">
                  {completedInDomain} / {domainCourses.length} ({domainProgressPercent}%)
                </span>
              </div>

              <div className="w-full h-2.5 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(4, domainProgressPercent)}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-white/85">
                  الدروس ({theme.courseRange})
                </span>
                {isCompactView ? (
                  <button
                    type="button"
                    onClick={() => setSelectedDomain(theme.id)}
                    className="px-3 py-1 rounded-[8px] bg-white text-xs font-bold transition-transform hover:scale-102 cursor-pointer"
                    style={{ color: theme.primaryHex }}
                  >
                    عرض صفحة الميدان {theme.domainNumber} ←
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedDomain('all')}
                    className="px-3 py-1 rounded-[8px] bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    كل الميادين (20)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Carte de présentation détaillée du domaine (affichée en vue dédiée du domaine ou pour le Domaine 02 Énergie) */}
        {(!isCompactView || theme.id === 'energy') && (
          <div
            style={{
              background: theme.cardSubtleGradient,
              borderColor: theme.softBorderHex,
            }}
            className="rounded-[16px] border-2 p-4 sm:p-5 space-y-4 shadow-2xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-3">
              <div className="flex items-center gap-2">
                <PrimaryIcon className="w-5 h-5" style={{ color: theme.primaryHex }} />
                <h3
                  className="text-sm sm:text-base font-bold"
                  style={{ color: theme.darkTextHex }}
                >
                  بطاقة تقديم {theme.arabicFullTitle} — الكفاءات والرموز المرجعية
                </h3>
              </div>
              <span
                dir="ltr"
                style={{ color: theme.primaryHex }}
                className="text-xs font-mono font-bold"
              >
                {theme.frenchFullTitle}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {theme.presentationBullets.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[12px] p-3.5 border border-[#EAE2DA] space-y-1.5"
                >
                  <div
                    style={{ color: theme.primaryHex }}
                    className="text-xs font-bold flex items-center gap-1.5"
                  >
                    <span
                      dir="ltr"
                      style={{ backgroundColor: theme.softBgHex, borderColor: theme.softBorderHex }}
                      className="w-5 h-5 rounded-full border flex items-center justify-center font-mono text-[11px]"
                    >
                      {i + 1}
                    </span>
                    <span>الكفاءة {i + 1}</span>
                  </div>
                  <p className="text-xs text-[#1A1A1A] leading-relaxed font-medium">
                    {item.ar}
                  </p>
                  <p
                    dir="ltr"
                    className="text-[11px] font-mono text-[#6B6B6B] text-right pt-0.5"
                  >
                    {item.fr}
                  </p>
                </div>
              ))}
            </div>

            {/* Unités & Symboles repères du domaine */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {theme.keyUnitsAndSymbols.map((u, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: theme.softBorderHex,
                  }}
                  className="px-3.5 py-2.5 rounded-[10px] border flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1A1A1A]">{u.labelAr}</div>
                    <div className="text-[10px] font-mono text-[#6B6B6B]" dir="ltr">
                      {u.labelFr}
                    </div>
                  </div>
                  <span
                    dir="ltr"
                    style={{
                      backgroundColor: theme.softBgHex,
                      color: theme.primaryHex,
                      borderColor: theme.softBorderHex,
                    }}
                    className="px-2.5 py-1 rounded-[8px] border font-mono font-bold text-xs shrink-0"
                  >
                    {u.symbol}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8" dir="rtl">
      {/* 1. MODULE HERO HEADER */}
      <section className="bg-[#FFFFFF] rounded-[20px] border border-[#EAE2DA] p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE2DA] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
              <Atom className="w-4 h-4" />
              <span>المنهاج الرسمي للجيل الثاني · السنة الثالثة متوسط</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4A4A] tracking-tight">
              العلوم الفيزيائية والتكنولوجيا
            </h1>
            <div
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-base sm:text-lg font-mono font-bold text-[#0F766E] text-right"
            >
              Physique-Chimie — 3AM
            </div>
            <p className="text-sm sm:text-[15px] text-[#4A4A4A]/85 max-w-3xl leading-[1.85] pt-1">
              فضاء بيداغوجي تفاعلي مخصص لدروس العلوم الفيزيائية والتكنولوجيا للسنة الثالثة متوسط (20 درساً متكاملاً)،
              مع هوية بصرية خاصة بكل ميدان: <strong>المادة وتحولاتها</strong> (أخضر مخبري) و<strong>الطاقة</strong> (برتقالي/ذهبي طاقوي).
            </p>
          </div>

          {/* Quick Module Badge */}
          <div className="bg-[#F6F0EB] rounded-[16px] border border-[#E2D9D0] p-4 sm:p-5 shrink-0 min-w-[230px] space-y-2">
            <div className="text-xs font-bold text-[#8C8C8C]">الرصيد البيداغوجي للمادة</div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0F766E]" dir="ltr">
                01 → 20
              </span>
              <span className="text-xs font-bold text-[#4A4A4A]">20 درساً منهجياً</span>
            </div>
            <div className="text-[11px] text-[#6B6B6B] pt-1 border-t border-[#E2D9D0]">
              4 ميادين بهويات بصرية مميزة : المادة · الطاقة · الكهرباء · الضوء
            </div>
          </div>
        </div>

        {/* 2. PROGRESSION GLOBALE DU MODULE */}
        <div className="bg-[#FAF7F4] rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
              <span className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
                متابعة التقدم العام في دروس الفيزياء والكيمياء (3AM)
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-[#4A4A4A] font-semibold">
                الدروس المنجزة :{' '}
                <strong className="font-mono text-[#0F766E]" dir="ltr">
                  {progressStats.completed} / {progressStats.total}
                </strong>
              </span>
              <span className="text-[#8C8C8C]">·</span>
              <span className="text-[#4A4A4A] font-semibold">
                المفضلة :{' '}
                <strong className="font-mono text-[#C94BA6]" dir="ltr">
                  {favoriteCourseIds.length}
                </strong>
              </span>
              <span className="text-[#8C8C8C]">·</span>
              <span className="font-mono font-bold text-[#0F766E]" dir="ltr">
                {progressStats.percentage}%
              </span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-[#E5DDD5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F766E] transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(2, progressStats.percentage)}%` }}
            />
          </div>
        </div>
      </section>

      {/* 3. BARRE DE RECHERCHE ET SÉLECTEUR DE DOMAINE AUX COULEURS DE CHAQUE DOMAINE */}
      <section className="bg-[#FFFFFF] rounded-[16px] border border-[#EAE2DA] p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C8C8C] absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن درس بالرقم (01 — 20)، العنوان بالعربية أو الفرنسية، أو الميدان..."
              className="w-full pr-10 pl-4 py-2.5 bg-[#FAF7F4] border border-[#E2D9D0] rounded-[12px] text-xs sm:text-sm text-[#4A4A4A] focus:bg-white focus:border-[#0F766E] focus:outline-hidden transition-colors"
            />
          </div>

          {/* Favorites & Specimen buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-3.5 py-2 rounded-[10px] text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                onlyFavorites
                  ? 'bg-[#C94BA6] text-white border-[#C94BA6]'
                  : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0] hover:border-[#C94BA6]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : ''}`} />
              <span>المفضلة ({favoriteCourseIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSpecimen(!showSpecimen)}
              className="px-3.5 py-2 rounded-[10px] text-xs font-bold border border-[#E2D9D0] bg-[#FAF7F4] hover:border-[#0F766E] text-[#0F766E] flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              {showSpecimen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showSpecimen ? 'إخفاء معاينة القوالب' : 'معاينة القوالب العلمية'}</span>
            </button>
          </div>
        </div>

        {/* Domain Filter Tabs (avec les couleurs et icônes propres à chaque domaine) */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#EAE2DA]">
          <button
            type="button"
            onClick={() => setSelectedDomain('all')}
            className={`px-3.5 py-2 rounded-[10px] text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedDomain === 'all'
                ? 'bg-[#1E293B] text-white shadow-2xs'
                : 'bg-[#F6F0EB]/80 text-[#4A4A4A] hover:bg-[#EAE2DA]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>كل الميادين (20 درساً)</span>
          </button>

          {PHYSICS_DOMAINS.map((dom) => {
            const isActive = selectedDomain === dom.id;
            const domTheme = getDomainTheme(dom.id);
            const DomIcon = domTheme.PrimaryIcon;
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => setSelectedDomain(dom.id)}
                style={
                  isActive
                    ? {
                        backgroundColor: domTheme.primaryHex,
                        borderColor: domTheme.primaryHex,
                        color: '#FFFFFF',
                      }
                    : {
                        backgroundColor: domTheme.softBgHex,
                        borderColor: domTheme.softBorderHex,
                        color: domTheme.darkTextHex,
                      }
                }
                className="px-3.5 py-2 rounded-[10px] border text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-2xs hover:opacity-95"
              >
                <DomIcon className="w-3.5 h-3.5 shrink-0" />
                <span>
                  الميدان {domTheme.domainNumber} : {dom.arabicName}
                </span>
                <span className="opacity-85 font-mono text-[11px]" dir="ltr">
                  ({domTheme.courseRange})
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. APERÇU TECHNIQUE OPTIONNEL */}
      {showSpecimen && (
        <section className="bg-[#FFFFFF] rounded-[16px] border border-[#EAE2DA] p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-[#0F766E]" />
              <h2 className="text-base font-bold text-[#4A4A4A]">
                معاينة نظام العرض العلمي ثنائي/ثلاثي اللغات والترميز الكيميائي
              </h2>
            </div>
            <span dir="ltr" className="text-xs font-mono text-[#0F766E] font-semibold">
              RTL Arabic + LTR Scientific Formulas & Terminology
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {SPECIMEN_FORMULAS_SHOWCASE.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[12px] bg-[#FAF7F4] border border-[#E5DDD5] flex flex-col items-center justify-center gap-1.5 text-center"
              >
                <span className="text-[11px] text-[#6B6B6B] font-medium">{item.label}</span>
                <div className="px-2.5 py-1 rounded-[8px] bg-white border border-[#E2D9D0]">
                  <ChemicalFormula formula={item.formula} size="md" />
                </div>
              </div>
            ))}
          </div>

          <TrilingualTermBox terms={SPECIMEN_TRILINGUAL_TERMS} />

          <PhysicsSchemaRenderer
            schema={{
              id: 'specimen-cpk',
              titleArabic: 'التمثيل الجزيئي بالألوان الاصطلاحية للذرات (Modèles moléculaires CPK)',
              titleFrench: 'H₂O · CO₂ · O₂ · CH₄',
              type: 'molecules-cpk',
            }}
          />
        </section>
      )}

      {/* 5. VUE PAR DOMAINE : BANNIÈRE PROPRE, CARTE DE PRÉSENTATION & GRILLE DES COURS AUX COULEURS DU DOMAINE */}
      {selectedDomain !== 'all' ? (
        <section className="space-y-6">
          {renderDomainHeroAndPresentation(
            getDomainTheme(selectedDomain),
            courses.filter((c) => c.domaine === selectedDomain),
            false
          )}

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <BookOpen
                  className="w-5 h-5"
                  style={{ color: getDomainTheme(selectedDomain).primaryHex }}
                />
                <span>
                  قائمة دروس {getDomainTheme(selectedDomain).arabicFullTitle} ({filteredCourses.length} دروس)
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => renderCourseCard(course))}
            </div>
          </div>
        </section>
      ) : (
        <div className="space-y-10">
          {PHYSICS_DOMAINS.map((dom) => {
            const domTheme = getDomainTheme(dom.id);
            const domainCourses = filteredCourses.filter((c) => c.domaine === dom.id);
            if (domainCourses.length === 0) return null;

            return (
              <section key={dom.id} className="space-y-5">
                {renderDomainHeroAndPresentation(
                  domTheme,
                  courses.filter((c) => c.domaine === dom.id),
                  true
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {domainCourses.map((course) => renderCourseCard(course))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
