import React, { useState, useMemo } from 'react';
import { SvtCourse, SvtDomainId } from '../../typesSvt';
import { SVT_DOMAINS } from '../../data/svtCoursesData';
import {
  getSvtDomainTheme,
  SvtDomainThemeProvider,
} from './svtThemeTokens';
import {
  Globe2,
  Search,
  Star,
  CheckCircle2,
  BookOpen,
  ChevronLeft,
  Mountain,
  FileDown,
  Layers,
  Sparkles,
} from 'lucide-react';

interface SvtModuleHomePageProps {
  courses: SvtCourse[];
  completedCourseIds: string[];
  favoriteCourseIds: string[];
  onSelectCourse: (courseId: string) => void;
  onToggleCompleted: (courseId: string) => void;
  onToggleFavorite: (courseId: string) => void;
  onExportCoursePdf?: (course: SvtCourse) => void;
  isExportingPdf?: boolean;
}

export const SvtModuleHomePage: React.FC<SvtModuleHomePageProps> = ({
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
  const [selectedDomain, setSelectedDomain] = useState<SvtDomainId | 'all'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  const progressStats = useMemo(() => {
    const total = courses.length;
    const completed = courses.filter((c) => completedCourseIds.includes(c.id)).length;
    const validated = courses.filter((c) => c.status === 'validated').length;
    const provisional = courses.filter((c) => c.status === 'provisional').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, validated, provisional, percentage };
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

  const renderCourseCard = (course: SvtCourse) => {
    const theme = getSvtDomainTheme(course.domaine);
    const DomainIcon = theme.PrimaryIcon;
    const isCompleted = completedCourseIds.includes(course.id);
    const isFavorite = favoriteCourseIds.includes(course.id);
    const isProvisional = course.status === 'provisional';
    const isValidated = course.status === 'validated';
    const isPopulated = isProvisional || isValidated || course.sections.length > 0;

    return (
      <div
        key={course.id}
        style={{
          borderColor: isCompleted ? theme.primaryHex : undefined,
        }}
        className="bg-[#FFFFFF] rounded-[16px] border border-[#EAE2DA] overflow-hidden flex flex-col justify-between transition-all group shadow-2xs hover:shadow-md"
      >
        {/* Accent bar */}
        <div
          className="h-2 w-full"
          style={{ background: theme.cardTopBarGradient }}
        />

        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            {/* Top row: Number + Domain + Actions */}
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
                      المقطع {theme.domainNumber} · {course.domaineNomArabe}
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
                {isValidated && (
                  <span className="px-2 py-0.5 rounded-[6px] bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                    درس معتمد ✓
                  </span>
                )}
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
                  <CheckCircle2
                    className={`w-4 h-4 ${isCompleted ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Course Title */}
            <div>
              <h3 className="text-base font-bold text-[#4A4A4A] group-hover:text-[#B45309] transition-colors leading-snug">
                {course.titreArabe}
              </h3>
              {course.titreFrancais && (
                <div
                  dir="ltr"
                  className="text-xs font-mono text-[#8C8C8C] mt-0.5 text-right"
                >
                  {course.titreFrancais}
                </div>
              )}
            </div>

            {/* Status / Objectives / Description */}
            {isProvisional && (
              <div className="p-2 rounded-[8px] bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold flex items-center gap-1.5">
                <span>⚠️</span>
                <span>محتوى تقني مؤقت (في انتظار اعتماد الدرس الرسمي من الأستاذ)</span>
              </div>
            )}

            {course.objectifs && course.objectifs.length > 0 ? (
              <ul className="space-y-1 text-xs text-[#6B6B6B] list-disc pr-4 pt-1">
                {course.objectifs.slice(0, 2).map((obj, i) => (
                  <li key={i} className="line-clamp-1">
                    {obj}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-2.5 rounded-[8px] bg-[#FAF7F4] border border-dashed border-[#E2D9D0] text-[11px] text-[#8C8C8C] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>جاهز لاستقبال محتوى الدرس المعتمد من الأستاذ...</span>
              </div>
            )}
          </div>

          {/* Bottom Card Actions */}
          <div className="pt-3 border-t border-[#EAE2DA] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onSelectCourse(course.id)}
              style={{
                backgroundColor: isPopulated ? theme.primaryHex : undefined,
                color: isPopulated ? '#FFFFFF' : '#4A4A4A',
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-[10px] text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                isPopulated
                  ? 'hover:opacity-95'
                  : 'bg-[#FAF7F4] hover:bg-[#F6F0EB] border border-[#E2D9D0]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>
                {isValidated
                  ? 'فتح ومطالعة الدرس'
                  : isProvisional
                  ? 'معاينة الهيكل التقني المؤقت'
                  : 'عرض هيكل الدرس'}
              </span>
              <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            </button>

            {onExportCoursePdf && isPopulated && (
              <button
                type="button"
                onClick={() => onExportCoursePdf(course)}
                disabled={isExportingPdf}
                title="تحميل بصيغة PDF"
                className="p-2 rounded-[10px] border border-[#E2D9D0] bg-[#FAF7F4] hover:bg-[#F6F0EB] text-[#4A4A4A] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                <FileDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-[20px] bg-linear-to-r from-[#B45309] via-[#D97706] to-[#15803D] text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 text-xs font-bold">
            <Globe2 className="w-3.5 h-3.5" />
            <span>علوم الطبيعة والحياة · 3AM (الجيل الثاني — الجزائر)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            برنامج علوم الطبيعة والحياة (SVT 3AM)
          </h1>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            فضاء تفاعلي متكامل لدراسة الديناميكية الداخلية والخارجية للكرة الأرضية، الزلازل وتكتونية الصفائح، واستغلال وحماية الموارد الطبيعية والتربة، مع رسومات ومخططات جيولوجية دقيقة.
          </p>

          {/* Quick Progress Badge */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-[8px] bg-white/20 backdrop-blur font-bold">
              مجموع الدروس : {progressStats.total}
            </span>
            <span className="px-3 py-1 rounded-[8px] bg-emerald-500/30 backdrop-blur font-bold">
              الدروس المكتملة : {progressStats.completed} ({progressStats.percentage}%)
            </span>
            <span className="px-3 py-1 rounded-[8px] bg-white/20 backdrop-blur font-bold">
              الدروس المعتمدة : {progressStats.validated}
            </span>
            <span className="px-3 py-1 rounded-[8px] bg-white/20 backdrop-blur font-bold">
              المقاطع البيداغوجية : 4 مقاطع رسمية
            </span>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="bg-white rounded-[16px] border border-[#E2D9D0] p-4 space-y-3.5 shadow-2xs">
        {/* Search row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-[#8C8C8C] absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن درس، مفهوم (الزلازل، البؤرة، الصفائح...) أو كلمة مفتاحية..."
              className="w-full pl-3 pr-10 py-2 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] text-xs sm:text-sm focus:outline-hidden focus:border-[#B45309]"
            />
          </div>

          <button
            type="button"
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-bold border transition-colors cursor-pointer ${
              onlyFavorites
                ? 'bg-amber-50 border-amber-300 text-[#B45309]'
                : 'bg-[#FAF7F4] border-[#E2D9D0] text-[#6B6B6B] hover:text-[#B45309]'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-[#B45309]' : ''}`} />
            <span>المفضلة فقط ({favoriteCourseIds.length})</span>
          </button>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedDomain('all')}
            className={`px-3 py-1.5 rounded-[9px] text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedDomain === 'all'
                ? 'bg-[#B45309] text-white shadow-2xs'
                : 'bg-[#FAF7F4] text-[#4A4A4A] border border-[#E2D9D0] hover:border-[#B45309]'
            }`}
          >
            جميع المقاطع ({courses.length})
          </button>

          {SVT_DOMAINS.map((dom, idx) => {
            const isSelected = selectedDomain === dom.id;
            const theme = getSvtDomainTheme(dom.id);
            const DomIcon = theme.PrimaryIcon;
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => setSelectedDomain(dom.id)}
                style={
                  isSelected
                    ? {
                        backgroundColor: theme.primaryHex,
                        color: '#FFFFFF',
                      }
                    : undefined
                }
                className={`px-3 py-1.5 rounded-[9px] text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'shadow-2xs'
                    : 'bg-[#FAF7F4] text-[#4A4A4A] border border-[#E2D9D0] hover:border-current'
                }`}
              >
                <DomIcon className="w-3.5 h-3.5" />
                <span>المقطع {idx + 1} : {dom.arabicName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => renderCourseCard(course))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-[16px] border border-[#E2D9D0] p-6 space-y-2">
          <p className="text-sm font-bold text-[#4A4A4A]">لا توجد دروس تطابق بحثك الحالي</p>
          <p className="text-xs text-[#8C8C8C]">
            جرّب تغيير كلمات البحث أو إلغاء تصفية المفضلة لعرض الدروس المتاحة.
          </p>
        </div>
      )}
    </div>
  );
};
