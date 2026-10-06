import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Atom,
  Boxes,
  Flame,
  Zap,
  Scale,
  FlaskConical,
  AlertTriangle,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { ChemPhysText } from './ChemPhysText';
import { PhysicsCourseEssential, PhysicsCourseEssentialItem } from '../../typesPhysicsChemistry';

interface CourseEssentialBlockProps {
  essential: PhysicsCourseEssential;
  primaryColor?: string;
}

const renderEssentialIcon = (iconName?: PhysicsCourseEssentialItem['icon']) => {
  switch (iconName) {
    case 'atom':
      return <Atom className="w-4 h-4" />;
    case 'boxes':
      return <Boxes className="w-4 h-4" />;
    case 'flask':
      return <FlaskConical className="w-4 h-4" />;
    case 'flame':
      return <Flame className="w-4 h-4" />;
    case 'zap':
      return <Zap className="w-4 h-4" />;
    case 'scale':
      return <Scale className="w-4 h-4" />;
    case 'alert':
      return <AlertTriangle className="w-4 h-4" />;
    case 'info':
      return <Info className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

/**
 * Composant générique « أحتفظ بالأهم » (L'essentiel du cours)
 * Conforme au gabarit général Physique-Chimie 3AM :
 * - Lit un champ `essential` défini dans les données du cours.
 * - Formulations exactes du manuel (caractère par caractère).
 * - Calibré pour tenir sur 1 page A4 au maximum.
 */
export const CourseEssentialBlock: React.FC<CourseEssentialBlockProps> = ({
  essential,
  primaryColor = '#0F766E',
}) => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  useEffect(() => {
    const handlePdfPrepare = () => setShowAnswers(true);
    const handlePdfDone = () => setShowAnswers(false);
    window.addEventListener('course-pdf-prepare', handlePdfPrepare);
    window.addEventListener('course-pdf-done', handlePdfDone);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePdfPrepare);
      window.removeEventListener('course-pdf-done', handlePdfDone);
    };
  }, []);

  const titleAr = essential.titleArabic || 'أحتفظ بالأهم';
  const titleFr = essential.titleFrench || "L'essentiel";
  const badgeAr = essential.badgeArabic || 'المستوى الأساسي المباشر';
  const subtitleAr =
    essential.subtitleArabic || 'المفاهيم الأساسية المستخلصة من المنهاج والأنشطة';

  return (
    <section
      id="sec-pc-essential"
      aria-label="L'essentiel du cours"
      style={{ borderColor: primaryColor }}
      className="bg-[#FFFFFF] rounded-[18px] border-2 p-4 sm:p-5 shadow-sm space-y-4 font-sans text-right scroll-mt-28"
      dir="rtl"
    >
      {/* 1. En-tête du bloc L'essentiel */}
      <div className="flex items-center justify-between border-b border-[#EAE2DA] pb-3">
        <div className="flex items-center gap-2.5">
          <div
            style={{ backgroundColor: primaryColor }}
            className="w-8 h-8 rounded-[10px] text-white flex items-center justify-center shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                style={{ color: primaryColor }}
                className="text-base sm:text-lg font-extrabold"
              >
                {titleAr}
              </h2>
              <span className="text-xs font-mono text-[#6B6B6B]" dir="ltr">
                {titleFr}
              </span>
            </div>
            <p className="text-[11.5px] text-[#6B6B6B]">{subtitleAr}</p>
          </div>
        </div>

        <span
          style={{
            backgroundColor: `${primaryColor}15`,
            borderColor: `${primaryColor}30`,
            color: primaryColor,
          }}
          className="px-2.5 py-1 rounded-[8px] border text-xs font-bold"
        >
          {badgeAr}
        </span>
      </div>

      {/* 2. Grille principale des notions / définitions */}
      {essential.items && essential.items.length > 0 && (
        <div
          className={`grid grid-cols-1 ${
            essential.items.length > 1 ? 'md:grid-cols-2' : ''
          } gap-3.5`}
        >
          {essential.items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-1.5">
                  <div
                    style={{ color: primaryColor }}
                    className="flex items-center gap-2 font-bold text-sm"
                  >
                    {renderEssentialIcon(item.icon)}
                    <span>{item.titleArabic}</span>
                  </div>
                  {item.titleFrench && (
                    <span className="text-[11px] font-mono text-[#6B6B6B]" dir="ltr">
                      {item.titleFrench}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed whitespace-pre-line">
                  <ChemPhysText text={item.definition} />
                </p>
              </div>

              {item.example && (
                <div className="p-2 rounded-[8px] bg-white border border-[#E2D9D0] text-xs text-[#1A1A1A]">
                  <span style={{ color: primaryColor }} className="font-bold">
                    مثال:{' '}
                  </span>
                  <ChemPhysText text={item.example} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 3. العبارة المحورية من المنهاج (Key Insight) */}
      {essential.keyInsight && (
        <div
          style={{
            backgroundColor: `${primaryColor}0D`,
            borderColor: `${primaryColor}40`,
          }}
          className="p-2.5 sm:p-3 rounded-[10px] border-2 text-center"
        >
          <p
            style={{ color: primaryColor }}
            className="text-xs sm:text-sm font-extrabold leading-relaxed"
          >
            <ChemPhysText text={essential.keyInsight} />
          </p>
        </div>
      )}

      {/* 4. Grille intermédiaire : الجملة الكيميائية / الشروط + (أخطاء شائعة + أسئلة سريعة) */}
      {(essential.systemDescription ||
        essential.commonMistakes ||
        essential.flashQuestions) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* الجملة الكيميائية أو الشروط المعيارية */}
          {essential.systemDescription ? (
            <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-1.5">
                  <div style={{ color: primaryColor }} className="font-bold text-sm">
                    {essential.systemDescription.titleArabic}
                  </div>
                  {essential.systemDescription.titleFrench && (
                    <span className="text-[11px] font-mono text-[#6B6B6B]" dir="ltr">
                      {essential.systemDescription.titleFrench}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed">
                  <ChemPhysText text={essential.systemDescription.description} />
                </p>

                {essential.systemDescription.points &&
                  essential.systemDescription.points.length > 0 && (
                    <ul className="pr-4 list-disc space-y-1.5 text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed">
                      {essential.systemDescription.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <ChemPhysText text={pt} />
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          ) : (
            <div />
          )}

          {/* أخطاء شائعة + أسئلة سريعة */}
          <div className="space-y-3.5">
            {/* أخطاء شائعة · Erreurs fréquentes */}
            {essential.commonMistakes && essential.commonMistakes.length > 0 && (
              <div className="p-3.5 rounded-[12px] bg-[#FEF2F2] border border-[#FCA5A5] space-y-2">
                <div className="flex items-center justify-between border-b border-[#FECACA] pb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#991B1B]">
                    <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                    <span>أخطاء شائعة</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#991B1B]" dir="ltr">
                    Erreurs fréquentes
                  </span>
                </div>

                <ul className="pr-4 list-disc space-y-1 text-xs text-[#7F1D1D] leading-relaxed">
                  {essential.commonMistakes.map((cm, cIdx) => (
                    <li key={cIdx}>
                      <ChemPhysText text={cm} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* أسئلة سريعة · Questions flash */}
            {essential.flashQuestions && essential.flashQuestions.length > 0 && (
              <div className="p-3.5 rounded-[12px] bg-[#EFF6FF] border border-[#BFDBFE] space-y-2">
                <div className="flex items-center justify-between border-b border-[#DBEAFE] pb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E40AF]">
                    <HelpCircle className="w-4 h-4 text-[#2563EB]" />
                    <span>أسئلة سريعة</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-[#1E40AF]" dir="ltr">
                    Questions flash
                  </span>
                </div>

                <ol className="pr-4 list-decimal space-y-1 text-xs text-[#1E3A8A] leading-relaxed">
                  {essential.flashQuestions.map((fq, fIdx) => (
                    <li key={fIdx}>
                      <ChemPhysText text={fq.question} />
                    </li>
                  ))}
                </ol>

                {/* Bouton pour afficher / masquer les réponses */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="no-pdf print:hidden w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-[8px] bg-white border border-[#93C5FD] text-xs font-bold text-[#1D4ED8] hover:bg-[#DBEAFE]/40 transition-colors shadow-2xs cursor-pointer"
                  >
                    {showAnswers ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>إخفاء الأجوبة</span>
                        <ChevronUp className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>الأجوبة (مخفية، تظهر بنقرة)</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div
                    className={`${
                      showAnswers ? 'flex' : 'hidden print:flex pdf-export-mode:flex'
                    } mt-2 p-2.5 rounded-[8px] bg-white border border-[#93C5FD] text-xs text-[#1E3A8A] leading-relaxed items-start gap-1.5`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-bold text-[#15803D]">الأجوبة : </span>
                      {essential.flashQuestions.map((fq, aIdx) => (
                        <div key={aIdx} className="leading-snug">
                          <span className="font-bold">{aIdx + 1}) </span>
                          <ChemPhysText text={fq.answer} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
