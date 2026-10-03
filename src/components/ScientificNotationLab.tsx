import React, { useState } from 'react';
import { MathView } from './MathView';

export const ScientificNotationLab: React.FC = () => {
  const [presetIdx, setPresetIdx] = useState<number>(0);

  const presets = [
    {
      label: 'عدد كبير : 384 000 000',
      rawLatex: '384\\,000\\,000',
      a: 3.84,
      n: 8,
      shiftText: 'إزاحة الفاصلة 8 مراتب لليسار ⟵ أس موجب (+8)',
      orderExp: 8,
      compareLatex: '3.84 < 5 \\implies 10^8',
    },
    {
      label: 'عدد كبير : 72 000 000',
      rawLatex: '72\\,000\\,000',
      a: 7.2,
      n: 7,
      shiftText: 'إزاحة الفاصلة 7 مراتب لليسار ⟵ أس موجب (+7)',
      orderExp: 8,
      compareLatex: '7.2 \\ge 5 \\implies 10^{7+1} = 10^8',
    },
    {
      label: 'عدد صغير : 0.000064',
      rawLatex: '0.000064',
      a: 6.4,
      n: -5,
      shiftText: 'إزاحة الفاصلة 5 مراتب لليمين ⟵ أس سالب (-5)',
      orderExp: -4,
      compareLatex: '6.4 \\ge 5 \\implies 10^{-5+1} = 10^{-4}',
    },
  ];

  const current = presets[presetIdx];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. Left Column (7 cols): Core Visual Card + Separate Controls Card Underneath */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="w-full text-right">
              <h3 className="text-xs sm:text-sm font-semibold text-indigo-400">
                1. المخطط البصري : إزاحة الفاصلة العشرية وميزان المقارنة بالعدد 5
              </h3>
            </div>

            {/* Step 1: Decimal Shift */}
            <div className="bg-indigo-950/55 border border-indigo-500/45 rounded-2xl p-4 text-center space-y-2">
              <div className="text-xs font-normal text-indigo-300">
                {current.shiftText}
              </div>
              <div
                className="bg-slate-950/80 border border-indigo-500/30 rounded-xl py-2 px-3"
                dir="ltr"
              >
                <MathView
                  math={`${current.rawLatex} = ${current.a} \\times 10^{${current.n}}`}
                  block
                  className="text-white text-base sm:text-lg font-semibold"
                />
              </div>
            </div>

            {/* Step 2: Scientific Notation vs Order of Magnitude */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Exact Scientific Notation */}
              <div className="bg-emerald-950/45 border border-emerald-500/50 rounded-2xl p-4 text-center space-y-2">
                <div className="text-xs font-normal text-emerald-300">
                  الكتابة العلمية (مساواة دقيقة)
                </div>
                <div className="py-1" dir="ltr">
                  <MathView
                    math={`${current.a} \\times 10^{${current.n}}`}
                    block
                    className="text-white text-base sm:text-xl font-semibold"
                  />
                </div>
                <div className="text-[11px] font-normal text-emerald-300/90">
                  رقم واحد غير معدوم قبل الفاصلة (<span dir="ltr">1 ≤ a &lt; 10</span>)
                </div>
              </div>

              {/* Order of Magnitude */}
              <div className="bg-amber-950/45 border border-amber-500/50 rounded-2xl p-4 text-center space-y-2">
                <div className="text-xs font-normal text-amber-300">
                  رتبة المقدار (أقرب قوة للعدد 10)
                </div>
                <div className="py-1" dir="ltr">
                  <MathView
                    math={`10^{${current.orderExp}}`}
                    block
                    className="text-amber-300 text-base sm:text-xl font-semibold"
                  />
                </div>
                <div className="text-[11px] font-normal text-amber-200/90" dir="ltr">
                  <MathView math={current.compareLatex} className="text-amber-200 text-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Separate Interactive Presets Card Underneath */}
          <div className="no-pdf bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-2.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPresetIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-normal border transition-all cursor-pointer ${
                  presetIdx === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Reading in Vis-à-Vis (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="text-xs font-semibold text-indigo-400">
              2. قراءة المخطط المزدوج :
            </div>
            <p className="text-xs font-normal text-slate-300 leading-relaxed">
              الأعداد الفلكية أو المجهرية تحتوي على أصفار كثيرة يصعب قراءتها. لذلك نكتبها على شكل جداء لمعامل عشري{' '}
              <span dir="ltr" className="font-serif italic text-white">a</span> محصور بين 1 و 10 في قوة للعدد 10:{' '}
              <MathView math="a \times 10^n" className="text-white" />.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
