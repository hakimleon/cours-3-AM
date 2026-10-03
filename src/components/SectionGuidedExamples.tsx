import React from 'react';
import { StepByStepExample } from './StepByStepExample';

export const SectionGuidedExamples: React.FC = () => {
  return (
    <section id="section-guided-examples" className="mb-14 scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-sm font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
          06
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          أمثلة محلولة خطوة بخطوة (تطبيق منهجي)
        </h2>
      </div>

      <p className="text-base text-slate-600 leading-relaxed mb-6">
        تابع طريقة التفكير المنظمة في حل العمليات دون تسرع؛ كل خطوة تقودك بثقة إلى النتيجة الصحيحة المبسطة.
      </p>

      {/* Guided Example 1 (Directly from prompt requirements) */}
      <StepByStepExample
        title="طرح كسرين مع توحيد المقامات"
        initialMath="\frac{5}{6} - \frac{1}{4}"
        steps={[
          {
            stepNumber: '01',
            title: 'البحث عن مقام مشترك أصغر',
            detail: 'نبحث عن أصغر مضاعف مشترك للعددين 6 و 4.',
            math: ['6 \\rightarrow 12', '4 \\rightarrow 12'],
          },
          {
            stepNumber: '02',
            title: 'تحويل الكسرين إلى كسرين مكافئين',
            detail: 'نضرب بسط ومقام الكسر الأول في 2، وبسط ومقام الكسر الثاني في 3.',
            math: ['\\frac{5}{6} = \\frac{5 \\times 2}{6 \\times 2} = \\frac{10}{12}', '\\frac{1}{4} = \\frac{1 \\times 3}{4 \\times 3} = \\frac{3}{12}'],
          },
          {
            stepNumber: '03',
            title: 'إجراء عملية الطرح مع الاحتفاظ بالمقام',
            detail: 'نطرح البسطين 10 - 3 ونحتفظ بالمقام 12.',
            math: ['\\frac{10}{12} - \\frac{3}{12} = \\frac{10 - 3}{12} = \\frac{7}{12}'],
          },
          {
            stepNumber: '04',
            title: 'فحص قابلية الاختزال',
            detail: 'الكسر غير قابل للاختزال لأن العددين 7 و 12 أوليان فيما بينهما.',
            math: ['\\text{الكسر الناتج غير قابل للاختزال}'],
          },
        ]}
        conclusion="\frac{7}{12}"
      />

      {/* Guided Example 2: Integer with fraction */}
      <StepByStepExample
        title="طرح كسر من عدد صحيح طبيعي"
        initialMath="2 - \frac{3}{7}"
        steps={[
          {
            stepNumber: '01',
            title: 'كتابة العدد الطبيعي على شكل كسر مقامه 1',
            detail: 'كل عدد طبيعي هو كسر بسطه العدد نفسه ومقامه 1.',
            math: ['2 = \\frac{2}{1}'],
          },
          {
            stepNumber: '02',
            title: 'توحيد المقامات مع المقام 7',
            detail: 'نضرب بسط ومقام الكسر الأول في 7.',
            math: ['\\frac{2}{1} = \\frac{2 \\times 7}{1 \\times 7} = \\frac{14}{7}'],
          },
          {
            stepNumber: '03',
            title: 'إجراء عملية الطرح',
            detail: 'نطرح البسطين مع الاحتفاظ بالمقام 7.',
            math: ['\\frac{14}{7} - \\frac{3}{7} = \\frac{14 - 3}{7} = \\frac{11}{7}'],
          },
        ]}
        conclusion="\frac{11}{7}"
      />
    </section>
  );
};
