import React from 'react';
import { MathView } from './MathView';
import { BeforeAfterBox } from './BeforeAfterBox';
import { Compass } from 'lucide-react';

export const SectionDifferentDenominators: React.FC = () => {
  return (
    <section id="sec-diff-denom" className="scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
          04
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          كسران مقامهما مختلفان (توحيد المقامات)
        </h2>
      </div>

      <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
        لا يمكن جمع أو طرح كسرين إلا إذا كان لهما نفس المقام. عندما يختلف المقامان، يجب <strong className="text-slate-900 font-bold">توحيد المقامات</strong> أولاً بالبحث عن مضاعف مشترك أصغر لكتابة كسور مكافئة، ثم تطبيق قاعدة المقام المشترك.
      </p>

      {/* Before / Transformation / After visual box */}
      <div className="mb-6">
        <BeforeAfterBox
          before="\frac{1}{2} + \frac{1}{3}"
          transformation="\frac{3}{6} + \frac{2}{6}"
          result="\frac{5}{6}"
          explanation="المضاعف المشترك الأصغر للعددين 2 و 3 هو 6. نضرب بسط ومقام الكسر الأول في 3، وبسط ومقام الكسر الثاني في 2، ثم نجمع البسطين."
        />
      </div>

      {/* Two Cases of Denominators */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        {/* Case 1: One denominator is a multiple of the other */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-indigo-700">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                الحالة الأولى
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              مقام أحدهما مضاعف لمقام الآخر
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              يكفي تحويل كسر واحد فقط بضرب بسطه ومقامه في العدد المناسب ليصبح مساوياً للمقام الأكبر (هنا نضرب في <span className="font-semibold text-slate-800">3</span> لأن <MathView math="4 \times 3 = 12" />).
            </p>
          </div>

          <div className="bg-slate-50/90 rounded-xl border border-slate-200 p-4 flex flex-col justify-between">
            <div className="w-full text-center py-2">
              <MathView
                math="\begin{gathered} \frac{3}{4} + \frac{5}{12} = \frac{3 \times 3}{4 \times 3} + \frac{5}{12} \\[6pt] = \frac{9}{12} + \frac{5}{12} = \frac{14}{12} = \mathbf{\frac{7}{6}} \end{gathered}"
                block
              />
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">النتيجة بعد الاختزال:</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg inline-flex items-center">
                <MathView math="\mathbf{\frac{7}{6}}" />
              </span>
            </div>
          </div>
        </div>

        {/* Case 2: Neither is a multiple of the other */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2.5 text-indigo-700">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                الحالة العامة
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              المقامان ليس أحدهما مضاعفاً للآخر
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              نبحث عن المضاعف المشترك الأصغر للمقامين ونحوّل كلا الكسرين معاً لكتابة كسرين مكافئين (المضاعف المشترك للعددين 5 و 3 هو <span className="font-semibold text-slate-800">15</span>).
            </p>
          </div>

          <div className="bg-slate-50/90 rounded-xl border border-slate-200 p-4 flex flex-col justify-between">
            <div className="w-full text-center py-2">
              <MathView
                math="\begin{gathered} \frac{2}{5} - \frac{1}{3} = \frac{2 \times 3}{5 \times 3} - \frac{1 \times 5}{3 \times 5} \\[6pt] = \frac{6}{15} - \frac{5}{15} = \mathbf{\frac{1}{15}} \end{gathered}"
                block
              />
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">النتيجة النهائية:</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg inline-flex items-center">
                <MathView math="\mathbf{\frac{1}{15}}" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
