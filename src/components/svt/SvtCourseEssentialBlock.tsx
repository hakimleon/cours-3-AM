import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Mountain,
  Waves,
  Globe2,
  Layers,
  Sprout,
  ShieldCheck,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { SvtCourseEssential, SvtCourseEssentialItem, SvtSchemaOrFigure } from '../../typesSvt';
import { SeismicSummaryMechanismDiagram } from './SvtSchemas';

interface SvtCourseEssentialBlockProps {
  essential: SvtCourseEssential;
  primaryColor?: string;
}

const renderEssentialIcon = (iconName?: SvtCourseEssentialItem['icon']) => {
  switch (iconName) {
    case 'mountain':
      return <Mountain className="w-4 h-4" />;
    case 'activity':
      return <Waves className="w-4 h-4" />;
    case 'globe':
      return <Globe2 className="w-4 h-4" />;
    case 'layers':
      return <Layers className="w-4 h-4" />;
    case 'shield':
      return <ShieldCheck className="w-4 h-4" />;
    case 'info':
      return <Info className="w-4 h-4" />;
    case 'eye':
      return <Eye className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

export const SvtCourseEssentialBlock: React.FC<SvtCourseEssentialBlockProps> = ({
  essential,
  primaryColor = '#B45309',
}) => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  useEffect(() => {
    const handlePdfPrepare = () => setShowAnswers(true);
    const handlePdfDone = () => setShowAnswers(false);
    const handleBeforePrint = () => setShowAnswers(true);
    const handleAfterPrint = () => setShowAnswers(false);
    window.addEventListener('course-pdf-prepare', handlePdfPrepare);
    window.addEventListener('course-pdf-done', handlePdfDone);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePdfPrepare);
      window.removeEventListener('course-pdf-done', handlePdfDone);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const titleAr = essential.titleArabic || 'أحتفظ بالأهم';
  const badgeAr = essential.badgeArabic || 'المستوى الأساسي المباشر';
  const subtitleAr =
    essential.subtitleArabic || 'المفاهيم المحورية المستخلصة من أنشطة المنهاج الوزاري';

  return (
    <section
      id="sec-svt-essential"
      aria-label="أحتفظ بالأهم — المفاهيم المحورية للدرس"
      style={{ borderColor: primaryColor }}
      className="bg-[#FFFFFF] rounded-[18px] border-2 p-4 sm:p-5 shadow-sm space-y-4 font-sans text-right scroll-mt-28 break-inside-avoid"
      dir="rtl"
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-[#EAE2DA] pb-3">
        <div className="flex items-center gap-2.5">
          <span
            style={{ backgroundColor: primaryColor }}
            className="w-7 h-7 rounded-[8px] text-white font-bold text-xs flex items-center justify-center shrink-0"
          >
            1
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#4A4A4A] leading-tight">
                {titleAr}
              </h2>
              <span
                style={{
                  backgroundColor: `${primaryColor}14`,
                  color: primaryColor,
                  borderColor: `${primaryColor}30`,
                }}
                className="text-[11px] font-bold px-2 py-0.5 rounded-[6px] border"
              >
                {badgeAr}
              </span>
            </div>
            <p className="text-xs text-[#8C8C8C] mt-0.5">{subtitleAr}</p>
          </div>
        </div>
      </div>

      {essential.keyInsight && (
        <div
          style={{
            backgroundColor: `${primaryColor}0C`,
            borderColor: `${primaryColor}35`,
          }}
          className="p-3.5 rounded-[12px] border text-xs sm:text-sm font-semibold leading-relaxed flex items-start gap-2.5"
        >
          <span style={{ color: primaryColor }} className="text-base shrink-0 select-none">
            💡
          </span>
          <div className="text-[#4A4A4A]">
            <span style={{ color: primaryColor }} className="font-bold ml-1">
              الفكرة الجوهرية :
            </span>
            {essential.keyInsight}
          </div>
        </div>
      )}

      {/* 3. Essential Items — Les 9 puces exactes du brief, sans titre français, sans libellé anglais, sans légende */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {essential.items.map((item, idx) => {
          const num = item.number || idx + 1;
          const fullText = item.description || item.definition || item.title;
          return (
            <div
              key={item.id || idx}
              data-card-number={num}
              className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E5DDD5] flex items-start gap-3"
            >
              <span
                style={{ color: primaryColor }}
                className="w-6 h-6 rounded-full bg-white border border-[#E2D9D0] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
              >
                {num}
              </span>
              <p className="text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed font-medium">
                {fullText}
              </p>
            </div>
          );
        })}
      </div>

      {/* 3.b Schéma-bilan vectoriel intégré dans le bloc « أحتفظ بالأهم » — bloc atomique insécable */}
      <div id="sec-svt-schema-bilan-block" data-atomic-block="true" className="pdf-atomic-block pt-2">
        <SeismicSummaryMechanismDiagram />
      </div>

      {/* 4. Common Mistakes if present */}
      {essential.commonMistakes && essential.commonMistakes.length > 0 && (
        <div className="p-3.5 rounded-[12px] bg-rose-50/70 border border-rose-200 text-xs text-rose-950 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-rose-900">
            <span>⚠️ أخطاء شائعة يجب تفاديها :</span>
          </div>
          <ul className="list-disc pr-4 space-y-1 text-[11.5px] leading-relaxed">
            {essential.commonMistakes.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Flash Self-Check Questions (أسئلة التحقق السريع) */}
      {essential.flashQuestions && essential.flashQuestions.length > 0 && (
        <div className="pt-2 border-t border-[#EAE2DA] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#4A4A4A]">
              أسئلة التحقق السريع (اختبر استيعابك الفوري) :
            </span>
            <button
              type="button"
              onClick={() => setShowAnswers(!showAnswers)}
              className="no-pdf inline-flex items-center gap-1 text-[11px] font-bold text-[#B45309] hover:underline cursor-pointer"
            >
              {showAnswers ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>إخفاء الإجابات</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>إظهار الإجابات</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {essential.flashQuestions.map((fq, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-[10px] bg-white border border-[#E2D9D0] text-xs space-y-1"
              >
                <div className="font-bold text-[#4A4A4A]">
                  س{idx + 1} : {fq.question}
                </div>
                <div
                  className={`text-[#15803D] font-medium pt-1 border-t border-[#EAE2DA] text-[11px] leading-relaxed ${
                    showAnswers ? 'block' : 'hidden print:block pdf-export-mode:block'
                  }`}
                >
                  <span className="font-bold text-[#15803D]">الجواب : </span>
                  {fq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
