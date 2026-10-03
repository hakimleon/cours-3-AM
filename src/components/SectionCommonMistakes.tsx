import React from 'react';
import { CommonMistakeBox } from './CommonMistakeBox';

export const SectionCommonMistakes: React.FC = () => {
  return (
    <section id="section-common-mistakes" className="mb-14 scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-sm font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
          07
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          أخطاء شائعة ومطبات يجب الحذر منها
        </h2>
      </div>

      <p className="text-base text-slate-600 leading-relaxed mb-6">
        العديد من الأخطاء في الامتحانات تتكرر بسبب التسرع أو خلط القواعد. حلّل هذه الأخطاء بدقة حتى لا تقع فيها.
      </p>

      {/* Mistake 1 (Prompt primary requirement) */}
      <CommonMistakeBox
        title="الخطأ الأول: جمع البسطين والمقامين معًا مباشرة"
        mistakeMath="\frac{1}{2} + \frac{1}{3} \neq \frac{1+1}{2+3} = \frac{2}{5}"
        whyExplanation="لأن المقامين مختلفان ولا يعبران عن نفس حجم الأجزاء، وبالتالي لا يمكن جمع البسطين والمقامين مباشرة كما لو كانت أعداداً منفصلة."
        correctMath="\frac{1}{2} + \frac{1}{3} = \frac{3}{6} + \frac{2}{6} = \frac{3+2}{6} = \frac{5}{6}"
        note="نوحد المقامات أولاً دائمًا قبل أي عملية جمع أو طرح."
      />

      {/* Mistake 2: Adding denominators when equal */}
      <CommonMistakeBox
        title="الخطأ الثاني: جمع المقامات المتساوية"
        mistakeMath="\frac{3}{7} + \frac{2}{7} \neq \frac{3+2}{7+7} = \frac{5}{14}"
        whyExplanation="المقام يعبر عن وحدة القياس والتجزئة في الكل. عندما تكون التجزئة متساوية، نجمع عدد الأجزاء فقط ونحافظ على المقام 7 دون مضاعفته."
        correctMath="\frac{3}{7} + \frac{2}{7} = \frac{3+2}{7} = \frac{5}{7}"
        note="المقام المشترك يبقى ثابتًا ولا يُجمع ولا يُطرح أبدًا."
      />

      {/* Mistake 3: Multiplying only the numerator */}
      <CommonMistakeBox
        title="الخطأ الثالث: ضرب البسط ونسيان المقام عند التوحيد"
        mistakeMath="\frac{2}{5} \rightarrow \frac{2 \times 3}{5} = \frac{6}{5} \quad (\text{تغيرت قيمة الكسر})"
        whyExplanation="للحفاظ على تكافؤ الكسر، يجب ضرب كل من البسط والمقام في نفس العدد غير المعدوم تماماً."
        correctMath="\frac{2}{5} = \frac{2 \times 3}{5 \times 3} = \frac{6}{15}"
        note="كل عملية على البسط تتطلب نفس العملية بالضبط على المقام."
      />
    </section>
  );
};
