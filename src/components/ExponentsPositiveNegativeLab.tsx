import React, { useState } from 'react';
import { MathView } from './MathView';

export const ExponentsPositiveNegativeLab: React.FC = () => {
  const [expN, setExpN] = useState<number>(-2);

  const scaleItems = [
    { n: -3, fracLatex: '\\frac{1}{10^3} = \\frac{1}{1000}', fracLabel: '1/1000', dec: '0.001' },
    { n: -2, fracLatex: '\\frac{1}{10^2} = \\frac{1}{100}', fracLabel: '1/100', dec: '0.01' },
    { n: -1, fracLatex: '\\frac{1}{10^1} = \\frac{1}{10}', fracLabel: '1/10', dec: '0.1' },
    { n: 0, fracLatex: '1', fracLabel: '1', dec: '1' },
    { n: 1, fracLatex: '10', fracLabel: '10', dec: '10' },
    { n: 2, fracLatex: '100', fracLabel: '100', dec: '100' },
    { n: 3, fracLatex: '1000', fracLabel: '1000', dec: '1000' },
  ];

  const activeItem = scaleItems.find((s) => s.n === expN) || scaleItems[1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. Left Column (7 cols): Core Visual Scale Card + Separate Slider Card Underneath */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="w-full text-right">
              <h3 className="text-xs sm:text-sm font-semibold text-indigo-400">
                1. سلم القوى المتناظر : القسمة المتكررة على 10 والمرور إلى الأس السالب
              </h3>
            </div>

            <svg
              dir="ltr"
              viewBox="0 0 520 145"
              className="w-full h-auto max-h-[165px] select-none"
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              {/* Axis line */}
              <line x1="30" y1="75" x2="490" y2="75" stroke="#475569" strokeWidth="2" />

              {scaleItems.map((item, idx) => {
                const x = 45 + idx * 71;
                const isSelected = item.n === expN;
                const isZeroExp = item.n === 0;
                return (
                  <g key={item.n}>
                    {/* Fraction representation above */}
                    <text
                      x={x}
                      y="28"
                      fill={item.n < 0 ? '#fda4af' : item.n === 0 ? '#6ee7b7' : '#a5b4fc'}
                      fontSize="10.5"
                      fontWeight="400"
                      textAnchor="middle"
                      direction="ltr"
                    >
                      {item.fracLabel}
                    </text>

                    {/* Node circle on scale */}
                    <circle
                      cx={x}
                      cy="75"
                      r={isSelected ? 21 : 16}
                      fill={isSelected ? '#4f46e5' : isZeroExp ? '#065f46' : '#1e293b'}
                      stroke={isSelected ? '#fbbf24' : isZeroExp ? '#10b981' : '#64748b'}
                      strokeWidth={isSelected ? 2.5 : 1.4}
                    />

                    {/* Crisp 10^n with proper SVG superscript tspan */}
                    <text
                      x={x}
                      y="79"
                      fill="#ffffff"
                      fontSize={isSelected ? '12.5' : '11'}
                      fontWeight={isSelected ? '600' : '400'}
                      textAnchor="middle"
                      direction="ltr"
                    >
                      10
                      <tspan dy="-5" fontSize={isSelected ? '9.5' : '8.5'}>
                        {item.n}
                      </tspan>
                    </text>

                    {/* Decimal representation below */}
                    <text
                      x={x}
                      y="122"
                      fill={isSelected ? '#fde047' : '#cbd5e1'}
                      fontSize={isSelected ? '12' : '10.5'}
                      fontWeight={isSelected ? '600' : '400'}
                      textAnchor="middle"
                      direction="ltr"
                    >
                      {item.dec}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* KaTeX Result Box outside SVG for textbook-grade exponent rendering */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-center space-y-2">
              <div dir="ltr">
                <MathView
                  math={`10^{${activeItem.n}} = ${activeItem.fracLatex} = ${activeItem.dec} > 0`}
                  block
                  className="text-emerald-300 text-base sm:text-lg font-semibold"
                />
              </div>
              <div className="text-xs font-normal text-slate-300 flex flex-wrap items-center justify-center gap-2">
                <span>وقاعدة جمع الأسس تبقى صالحة مع الأسس النسبية :</span>
                <span
                  dir="ltr"
                  className="bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded-lg"
                >
                  <MathView
                    math={`10^4 \\times 10^{${activeItem.n}} = 10^{4 + (${activeItem.n})} = 10^{${4 + activeItem.n}}`}
                    className="text-amber-300 text-xs sm:text-sm"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Separate Interactive Slider Card Underneath */}
          <div className="no-pdf bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex justify-between text-xs font-normal">
              <span className="text-amber-300">اختر الأس الصحيح النسبي (n) على السلم:</span>
              <span className="font-mono text-amber-300" dir="ltr">
                n = {expN}
              </span>
            </div>
            <input
              dir="ltr"
              type="range"
              min="-3"
              max="3"
              step="1"
              value={expN}
              onChange={(e) => setExpN(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* 2. Reading in Vis-à-Vis (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="text-xs font-semibold text-indigo-400">
              2. قراءة سلم القوى :
            </div>
            <p className="text-xs font-normal text-slate-300 leading-relaxed">
              نقطة الارتكاز الوسطى هي{' '}
              <MathView math="10^0 = 1" className="text-emerald-300" />. كل خطوة نحو اليمين تضرب في{' '}
              <span dir="ltr" className="font-mono text-white">10</span> (أس موجب)، وكل خطوة نحو اليسار تقسم على{' '}
              <span dir="ltr" className="font-mono text-white">10</span> (أس سالب).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
