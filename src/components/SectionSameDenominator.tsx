import React from 'react';
import { MathView } from './MathView';
import { FormulaBox } from './FormulaBox';
import { VisualFractionModel } from './VisualFractionModel';

export const SectionSameDenominator: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Visual Concept Model */}
      <section id="sec-concept" className="scroll-mt-20">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            02
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            النموذج البصري: تجزئة الوحدة إلى أجزاء متساوية
          </h2>
        </div>
        <VisualFractionModel />
      </section>

      {/* Section Same Denominator */}
      <section id="sec-same-denom" className="scroll-mt-20">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
            03
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            كسران لهما نفس المقام
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
          عندما يكون للكسرين نفس المقام، فإن المقام المشترك يمثل حجم الجزء الواحد، ويبقى ثابتاً دون تغيير، بينما نجمع أو نطرح البسطين فقط.
        </p>

        {/* Primary Visual Formula Box */}
        <FormulaBox
          type="primary"
          title="القاعدة الأساسية (المقام المشترك)"
          math="\frac{a}{b} + \frac{c}{b} = \frac{a+c}{b} \quad \text{و} \quad \frac{a}{b} - \frac{c}{b} = \frac{a-c}{b}"
          condition="b \neq 0"
          note="نحتفظ بالمقام المشترك b في النتيجة، ونجمع أو نطرح البسطين a و c فقط دون جمع المقامات."
        />

        {/* Direct Immediate Example: Concept -> Example -> Interpretation */}
        <div className="my-6 p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
            مثال مباشر وتفسير بصري
          </div>

          <div className="text-lg sm:text-xl font-bold text-slate-900 text-center py-2">
            <MathView math="\frac{3}{7} + \frac{2}{7} = \frac{3 + 2}{7} = \frac{5}{7}" block />
          </div>

          {/* Interpretation box */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-600">
            <span className="font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-md">
              التفسير الرياضي:
            </span>
            <span className="font-bold text-indigo-900">
              3 أجزاء من 7 + جزءان من 7 = 5 أجزاء من 7
            </span>
            <span className="text-slate-400 text-xs">
              المقام 7 بقي ثابتاً
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
