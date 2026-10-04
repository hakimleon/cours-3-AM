import React, { useState } from 'react';
import {
  Sparkles,
  Atom,
  Boxes,
  AlertTriangle,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';
import { ChemPhysText } from './ChemPhysText';

/**
 * Bloc « L'essentiel » (أحتفظ بالأهم) — Cours 01
 * Formulations exactes du manuel scolaire de 3AM (Physique-Chimie).
 */
export const Course01EssentialBlock: React.FC = () => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  return (
    <section
      id="sec-pc-essential"
      aria-label="L'essentiel du cours"
      className="bg-[#FFFFFF] rounded-[18px] border-2 border-[#0F766E] p-4 sm:p-5 shadow-sm space-y-4 font-sans text-right scroll-mt-28"
      dir="rtl"
    >
      {/* 1. En-tête du bloc L'essentiel */}
      <div className="flex items-center justify-between border-b border-[#EAE2DA] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#0F766E] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-[#0F766E]">
                أحتفظ بالأهم
              </h2>
              <span className="text-xs font-mono text-[#6B6B6B]" dir="ltr">
                L'essentiel
              </span>
            </div>
            <p className="text-[11.5px] text-[#6B6B6B]">
              المفاهيم الأساسية المستخلصة من المنهاج والأنشطة
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-[8px] bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold">
          المستوى الأساسي المباشر
        </span>
      </div>

      {/* 2. Grille principale : الفرد الكيميائي & النوع الكيميائي */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* الفرد الكيميائي · Entité chimique */}
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-1.5">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0F766E]">
                <Atom className="w-4 h-4 text-[#0F766E]" />
                <span>الفرد الكيميائي</span>
              </div>
              <span className="text-[11px] font-mono text-[#6B6B6B]" dir="ltr">
                Entité chimique
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed">
              نسمي فردا كيميائيا كل دقيقة مجهرية (ذرة أو جزيء) مكونة للمادة.
            </p>
          </div>

          <div className="p-2 rounded-[8px] bg-white border border-[#E2D9D0] text-xs text-[#1A1A1A]">
            <span className="font-bold text-[#0F766E]">مثال:</span>{' '}
            <ChemPhysText text="جزيء ماء واحد H₂O، ذرة حديد Fe." />
          </div>
        </div>

        {/* النوع الكيميائي · Espèce chimique */}
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-1.5">
              <div className="flex items-center gap-2 font-bold text-sm text-[#0F766E]">
                <Boxes className="w-4 h-4 text-[#0F766E]" />
                <span>النوع الكيميائي</span>
              </div>
              <span className="text-[11px] font-mono text-[#6B6B6B]" dir="ltr">
                Espèce chimique
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed">
              هو مجموعة من الأفراد الكيميائية المتماثلة.
            </p>
          </div>

          <div className="p-2 rounded-[8px] bg-white border border-[#E2D9D0] text-xs text-[#1A1A1A]">
            <span className="font-bold text-[#0F766E]">مثال:</span>{' '}
            <ChemPhysText text="الماء (مجموعة جزيئات H₂O)، غاز ثنائي الأكسجين (مجموعة جزيئات O₂)، الحديد (مجموعة ذرات Fe)." />
          </div>
        </div>
      </div>

      {/* 3. العبارة المحورية للمستويين المجهري والعياني من المنهاج */}
      <div className="p-2.5 sm:p-3 rounded-[10px] bg-[#F0FDFA] border-2 border-[#99F6E4] text-center">
        <p className="text-xs sm:text-sm font-extrabold text-[#0F766E] leading-relaxed">
          الفرد الكيميائي يستعمل في المستوى المجهري بينما النوع الكيميائي يستعمل في المستوى العياني.
        </p>
      </div>

      {/* 4. Grille intermédiaire : الجملة الكيميائية & (أخطاء شائعة + أسئلة سريعة) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* الجملة الكيميائية · Système chimique */}
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-1.5">
              <div className="font-bold text-sm text-[#0F766E]">
                الجملة الكيميائية
              </div>
              <span className="text-[11px] font-mono text-[#6B6B6B]" dir="ltr">
                Système chimique
              </span>
            </div>

            <p className="text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed">
              مكونة من نوع كيميائي أو أكثر، حيث يتم وصفها على المستوى العياني بالإشارة إلى:
            </p>

            <ul className="pr-4 list-disc space-y-1.5 text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed">
              <li>طبيعة وكتلة مختلف الأنواع الكيميائية الموجودة.</li>
              <li>
                <ChemPhysText text="الحالة الفيزيائية للأنواع الكيميائية: سائل (l)، صلب (s)، غاز (g)، منحل في الماء (aq)." />
              </li>
              <li>
                <ChemPhysText text="درجة الحرارة T والضغط P، خاصة في حالة تحول كيميائي ينتج عنه غاز." />
              </li>
            </ul>
          </div>
        </div>

        {/* أخطاء شائعة + أسئلة سريعة */}
        <div className="space-y-3.5">
          {/* أخطاء شائعة · Erreurs fréquentes */}
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
              <li>
                <ChemPhysText text="O (ذرة) ≠ O₂ (جزيء من ذرتين)." />
              </li>
              <li>
                قطرة ماء وكأس ماء = نفس النوع الكيميائي، الفرق في عدد الأفراد فقط.
              </li>
              <li>
                لا نرى الذرات والجزيئات بالعين المجردة، نرى النوع الكيميائي.
              </li>
            </ul>
          </div>

          {/* أسئلة سريعة · Questions flash */}
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
              <li>قطرة ماء وبرميل ماء: نفس النوع الكيميائي؟</li>
              <li>
                <ChemPhysText text="هل O و O₂ نفس الفرد الكيميائي؟" />
              </li>
              <li>كأس ماء مالح: نوع كيميائي واحد أم جملة؟</li>
            </ol>

            {/* Bouton pour afficher / masquer les réponses */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAnswers(!showAnswers)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-[8px] bg-white border border-[#93C5FD] text-xs font-bold text-[#1D4ED8] hover:bg-[#DBEAFE]/40 transition-colors shadow-2xs cursor-pointer"
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

              {showAnswers && (
                <div className="mt-2 p-2.5 rounded-[8px] bg-white border border-[#93C5FD] text-xs text-[#1E3A8A] leading-relaxed flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#15803D]">الأجوبة : </span>
                    <ChemPhysText text="1) نعم، H₂O. 2) لا، ذرة وجزيء. 3) جملة (ماء + ملح)." />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
