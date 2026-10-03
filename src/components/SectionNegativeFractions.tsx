import React from 'react';
import { MathView } from './MathView';
import { FormulaBox } from './FormulaBox';
import { ShieldAlert } from 'lucide-react';

export const SectionNegativeFractions: React.FC = () => {
  return (
    <section id="sec-neg-fractions" className="scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          05
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          التعامل مع الكسور ذات الإشارات السالبة
        </h2>
      </div>

      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
        في السنة الثالثة متوسط، نتعامل مع الأعداد الناطقة والكسور التي تتضمن إشارات سالبة. القاعدة الجوهرية هي توحيد موضع الإشارة ورفعها إلى البسط أو وضعها أمام خط الكسر لتسهيل الحساب وتفادي الأخطاء.
      </p>

      {/* Primary formula for negative signs */}
      <FormulaBox
        type="secondary"
        title="قاعدة موضع الإشارة السالبة في الكسر"
        math="-\frac{a}{b} = \frac{-a}{b} = \frac{a}{-b} \quad \text{و} \quad \frac{-a}{-b} = \frac{a}{b}"
        condition="b \neq 0"
        note="من المستحسن دائماً جعل المقام موجباً بنقل إشارة الناقص إلى البسط قبل البدء بتوحيد المقامات."
      />

      {/* Negative fraction operation example */}
      <div className="my-6 p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          مثال تطبيقي مع كسر سالب
        </div>
        <div className="text-base sm:text-lg font-bold text-slate-800 text-center py-2">
          <MathView math="-\frac{4}{9} + \frac{1}{9} = \frac{-4 + 1}{9} = \frac{-3}{9} = -\frac{1}{3}" block />
        </div>
        <div className="text-xs text-slate-600 text-center mt-2 border-t border-slate-100 pt-2">
          رفعنا إشارة الناقص إلى البسط وحسبنا <span className="font-mono text-slate-800" dir="ltr">-4 + 1 = -3</span>، ثم اختزلنا بقسمة البسط والمقام على 3.
        </div>
      </div>

      {/* Subtraction rule: addition of opposite */}
      <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-indigo-950 block mb-0.5 font-bold">طرح كسر هو إضافة معاكسه:</strong>
          طرح كسر سالب يتحول تلقائياً إلى جمع: <MathView math="\frac{a}{b} - \left(-\frac{c}{b}\right) = \frac{a}{b} + \frac{c}{b} = \frac{a+c}{b}" />.
        </div>
      </div>
    </section>
  );
};
