import React, { useState } from 'react';
import { MathView } from './MathView';

interface AlgebraVisualDiscoveryLabProps {
  courseId: string;
}

export const AlgebraVisualDiscoveryLab: React.FC<AlgebraVisualDiscoveryLabProps> = ({ courseId }) => {
  // Course 01 & 08: Number line state
  const [startVal, setStartVal] = useState<number>(-3);
  const [stepVal, setStepVal] = useState<number>(4);

  // Course 02: Division inverse check state
  const [divA, setDivA] = useState<number>(-24);
  const [divB, setDivB] = useState<number>(-6);

  // Course 03: Reciprocal vs Opposite state
  const [numP, setNumP] = useState<number>(-3);
  const [denQ, setDenQ] = useState<number>(4);

  // Course 04 & 09: Fraction division / multiplication state
  const [fracA, setFracA] = useState<number>(3);
  const [fracB, setFracB] = useState<number>(4);
  const [fracC, setFracC] = useState<number>(2);
  const [fracD, setFracD] = useState<number>(5);

  // Course 05: Fraction comparison state
  const [compMode, setCompMode] = useState<'same-den' | 'same-num' | 'diff'>('same-num');

  // Course 06: Fraction addition common denominator state
  const [subdivide, setSubdivide] = useState<boolean>(true);

  // Course 07: Rational number sign positioning
  const [ratNum, setRatNum] = useState<number>(-12);
  const [ratDen, setRatDen] = useState<number>(-18);

  // =========================================================
  // COURSE 01: حساب مجموع عددين نسبيين
  // =========================================================
  if (courseId === 'lesson-01') {
    const endVal = startVal + stepVal;
    const ticks = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
    const toX = (v: number) => 260 + v * 28;
    const fmt = (v: number) => (v > 0 ? `+${v}` : `${v}`);

    const x0 = toX(0);
    const xStart = toX(startVal);
    const xEnd = toX(endVal);

    // Arrowhead helper pointing from x1 to x2 at height y
    const renderArrowHead = (x1: number, x2: number, y: number, color: string) => {
      if (x1 === x2) return null;
      const dir = x2 > x1 ? 1 : -1;
      return (
        <polygon
          points={`${x2},${y} ${x2 - dir * 8},${y - 4.5} ${x2 - dir * 8},${y + 4.5}`}
          fill={color}
        />
      );
    };

    // Unit jump arches from startVal to endVal so the student can count the exact steps of b
    const stepCount = Math.abs(stepVal);
    const stepDir = stepVal >= 0 ? 1 : -1;
    const unitJumps = Array.from({ length: stepCount }, (_, i) => {
      const u1 = startVal + i * stepDir;
      const u2 = startVal + (i + 1) * stepDir;
      const ux1 = toX(u1);
      const ux2 = toX(u2);
      const umid = (ux1 + ux2) / 2;
      return `M ${ux1} 64 Q ${umid} 48 ${ux2} 64`;
    });

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 1. Left Column (7 cols): Main Number-Line Card + Separate Sliders Card Underneath */}
          <div className="lg:col-span-7 space-y-4">
            {/* CORE CARD: Only Title + Graduated Number Line + Final Result */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-7 flex flex-col items-center space-y-6">
              <div className="w-full text-right">
                <h3 className="text-xs sm:text-sm font-semibold text-indigo-400">
                  1. التمثيل البصري : جمع عددين نسبيين كإزاحتين على المحور المدرج
                </h3>
              </div>

              <svg
                dir="ltr"
                viewBox="0 0 520 205"
                className="w-full h-auto max-h-[235px] select-none"
                style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
              >
                {/* BAND 1 (y = 26): Pure LTR badge for 2nd displacement b (never reverses signs) */}
                <g>
                  <rect
                    x={(xStart + xEnd) / 2 - 34}
                    y="12"
                    width="68"
                    height="22"
                    rx="6"
                    fill="#1e1b4b"
                    stroke="#6366f1"
                    strokeWidth="1.2"
                  />
                  <text
                    x={(xStart + xEnd) / 2}
                    y="23"
                    fill="#c7d2fe"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                    dominantBaseline="central"
                    direction="ltr"
                  >
                    {`b = ${fmt(stepVal)}`}
                  </text>
                </g>

                {/* BAND 2 (y = 64): Second vector (from a to a + b) with unit step hops + arrowhead */}
                {unitJumps.map((dPath, idx) => (
                  <path
                    key={idx}
                    d={dPath}
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                    opacity="0.75"
                  />
                ))}
                <line
                  x1={xStart}
                  y1="64"
                  x2={xEnd}
                  y2="64"
                  stroke="#818cf8"
                  strokeWidth="2.5"
                />
                <circle cx={xStart} cy="64" r="3.5" fill="#818cf8" />
                {renderArrowHead(xStart, xEnd, 64, '#818cf8')}

                {/* Vertical projection lines connecting the 2 vectors to the axis */}
                <line
                  x1={xStart}
                  y1="64"
                  x2={xStart}
                  y2="154"
                  stroke="#f59e0b"
                  strokeWidth="1.3"
                  strokeDasharray="3 3"
                  opacity="0.65"
                />
                <line
                  x1={xEnd}
                  y1="64"
                  x2={xEnd}
                  y2="154"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  opacity="0.8"
                />

                {/* BAND 3 (y = 104): First vector from 0 to a (startVal) with arrowhead */}
                <line
                  x1={x0}
                  y1="104"
                  x2={xStart}
                  y2="104"
                  stroke="#f59e0b"
                  strokeWidth="3"
                />
                <circle cx={x0} cy="104" r="3.5" fill="#94a3b8" />
                {renderArrowHead(x0, xStart, 104, '#f59e0b')}

                {/* BAND 4 (y = 126): Pure LTR badge for 1st number a */}
                <g>
                  <rect
                    x={(x0 + xStart) / 2 - 32}
                    y="114"
                    width="64"
                    height="21"
                    rx="6"
                    fill="#451a03"
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                  />
                  <text
                    x={(x0 + xStart) / 2}
                    y="124.5"
                    fill="#fde68a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                    dominantBaseline="central"
                    direction="ltr"
                  >
                    {`a = ${fmt(startVal)}`}
                  </text>
                </g>

                {/* BAND 5 (y = 154..186): Main Graduated Axis */}
                <line x1="20" y1="154" x2="500" y2="154" stroke="#64748b" strokeWidth="2" />
                <polygon points="504,154 494,149 494,159" fill="#64748b" />
                <polygon points="16,154 26,149 26,159" fill="#64748b" />

                {/* Ticks & regular-weight LTR numbers (-8 to +8) */}
                {ticks.map((t) => {
                  const x = toX(t);
                  const isZero = t === 0;
                  const isStart = t === startVal;
                  const isEnd = t === endVal;
                  return (
                    <g key={t}>
                      <line
                        x1={x}
                        y1={isZero ? 142 : 148}
                        x2={x}
                        y2={isZero ? 166 : 160}
                        stroke={isZero ? '#f8fafc' : isStart ? '#fbbf24' : isEnd ? '#10b981' : '#475569'}
                        strokeWidth={isZero || isStart || isEnd ? '2.5' : '1.5'}
                      />
                      <text
                        x={x}
                        y="184"
                        fill={isZero ? '#ffffff' : isStart ? '#fbbf24' : isEnd ? '#34d399' : '#94a3b8'}
                        fontSize={isZero || isStart || isEnd ? '12' : '10.5'}
                        fontWeight="400"
                        textAnchor="middle"
                        direction="ltr"
                      >
                        {fmt(t)}
                      </text>
                    </g>
                  );
                })}

                {/* Result point on axis */}
                <circle cx={xEnd} cy="154" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
              </svg>

              {/* 5. Clearly separated Final Result block showing the full addition equality */}
              <div className="w-full pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm sm:text-base font-semibold text-slate-200">
                  المجموع :
                </span>
                <div
                  dir="ltr"
                  className="text-sm sm:text-base font-semibold bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl tracking-wide"
                  style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
                >
                  <span className="text-amber-400">({fmt(startVal)})</span>
                  <span className="text-slate-400"> + </span>
                  <span className="text-indigo-400">({fmt(stepVal)})</span>
                  <span className="text-slate-300"> = </span>
                  <span className="text-emerald-400">{fmt(endVal)}</span>
                </div>
              </div>
            </div>

            {/* SEPARATE INTERACTIVE SLIDERS CARD UNDERNEATH */}
            <div className="no-pdf bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-normal">
                  <span className="text-amber-300">العدد النسبي الأول (a):</span>
                  <span className="font-mono text-amber-300" dir="ltr">
                    {fmt(startVal)}
                  </span>
                </div>
                <input
                  dir="ltr"
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={startVal}
                  onChange={(e) => setStartVal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-normal">
                  <span className="text-indigo-300">العدد النسبي الثاني (b):</span>
                  <span className="font-mono text-indigo-300" dir="ltr">
                    {fmt(stepVal)}
                  </span>
                </div>
                <input
                  dir="ltr"
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={stepVal}
                  onChange={(e) => setStepVal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Reading (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2.5">
              <div className="text-xs font-semibold text-indigo-400">2. قراءة المحور المدرج :</div>
              <p className="text-xs font-normal text-slate-300 leading-relaxed">
                كل عدد نسبي يتكون من <span className="text-white">إشارة</span> تحدد اتجاه الحركة (يميناً للموجب، يساراً للسالب) ومن <span className="text-amber-300">مسافة إلى الصفر</span> تسمى القيمة المطلقة.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // COURSE 02: حاصل قسمة عددين نسبيين
  // =========================================================
  if (courseId === 'lesson-02') {
    const quotient = divA / divB;
    const sameSign = (divA > 0 && divB > 0) || (divA < 0 && divB < 0);

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 1. Synchronized Vis-à-Vis SVG Schema (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-bold text-indigo-400">
                1. المخطط العكسي : القسمة كعملية عكسية للضرب
              </span>
              <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${sameSign ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {sameSign ? 'نفس الإشارة  حاصل موجب (+)' : 'إشارتان مختلفتان  حاصل سالب (-)'}
              </span>
            </div>

            <svg viewBox="0 0 520 205" className="w-full h-auto max-h-[215px] select-none">
              {/* Dividend Box a */}
              <rect x="35" y="65" width="120" height="64" rx="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
              <text x="95" y="90" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">المقسوم (a)</text>
              <text x="95" y="115" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle" dir="ltr">
                {divA > 0 ? `+${divA}` : divA}
              </text>

              {/* Divisor Box b */}
              <rect x="200" y="65" width="120" height="64" rx="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="260" y="90" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">المقسوم عليه (b ≠ 0)</text>
              <text x="260" y="115" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle" dir="ltr">
                {divB > 0 ? `+${divB}` : divB}
              </text>

              {/* Quotient Box c */}
              <rect x="365" y="65" width="120" height="64" rx="14" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
              <text x="425" y="90" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">حاصل القسمة (c)</text>
              <text x="425" y="115" fill="#34d399" fontSize="18" fontWeight="black" textAnchor="middle" dir="ltr">
                {quotient > 0 ? `+${quotient}` : quotient}
              </text>

              {/* Top Arrow: Division */}
              <path d="M 155 75 Q 260 20 365 75" fill="none" stroke="#818cf8" strokeWidth="2.5" />
              <text x="260" y="38" fill="#818cf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                عملية القسمة : a ÷ b = c
              </text>

              {/* Bottom Arrow: Multiplication verification */}
              <path d="M 365 125 Q 260 185 155 125" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />
              <text x="260" y="178" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                التحقق بالضرب العكسي : c × b = a
              </text>
            </svg>

            <div className="no-pdf w-full mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-center gap-2">
              {[
                { a: -24, b: -6, label: '(-24) ÷ (-6)' },
                { a: -24, b: 6, label: '(-24) ÷ (+6)' },
                { a: 24, b: -6, label: '(+24) ÷ (-6)' },
                { a: 24, b: 6, label: '(+24) ÷ (+6)' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDivA(item.a);
                    setDivB(item.b);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    divA === item.a && divB === item.b
                      ? 'bg-indigo-600 border-indigo-400 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                  dir="ltr"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Reading (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-indigo-400">2. قراءة المخطط العكسي :</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                البحث عن حاصل القسمة <span dir="ltr" className="font-mono text-white">a ÷ b</span> يعادل تماماً طرح السؤال: <strong className="text-amber-300">« ما هو العدد c الذي إذا ضربناه في b أعطانا a؟ »</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // COURSE 03: مقلوب عدد غير معدوم
  // =========================================================
  if (courseId === 'lesson-03') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 1. Synchronized Vis-à-Vis SVG Schema (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-bold text-indigo-400">
                1. الشكل المقارن : المقلوب (جداء = 1) مقابل المعاكس (مجموع = 0)
              </span>
            </div>

            <svg viewBox="0 0 520 215" className="w-full h-auto max-h-[225px] select-none">
              {/* Center Original Fraction */}
              <rect x="195" y="18" width="130" height="54" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
              <text x="260" y="38" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">العدد الأصلي غير المعدوم</text>
              <text x="260" y="61" fill="#ffffff" fontSize="17" fontWeight="black" textAnchor="middle" dir="ltr">
                {numP}/{denQ}
              </text>

              {/* Left Branch: Reciprocal (المقلوب) */}
              <line x1="215" y1="72" x2="125" y2="115" stroke="#10b981" strokeWidth="2.5" />
              <rect x="25" y="115" width="205" height="82" rx="14" fill="#064e3b" fillOpacity="0.6" stroke="#10b981" strokeWidth="2" />
              <text x="127" y="138" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">
                المقلوب (يحفظ الإشارة ويقلب الكسر)
              </text>
              <text x="127" y="163" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle" dir="ltr">
                {numP < 0 ? `-${denQ}/${Math.abs(numP)}` : `${denQ}/${numP}`}
              </text>
              <text x="127" y="185" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" dir="ltr">
                ({numP}/{denQ}) × ({numP < 0 ? `-${denQ}/${Math.abs(numP)}` : `${denQ}/${numP}`}) = +1
              </text>

              {/* Right Branch: Opposite (المعاكس) */}
              <line x1="305" y1="72" x2="395" y2="115" stroke="#f59e0b" strokeWidth="2.5" />
              <rect x="290" y="115" width="205" height="82" rx="14" fill="#451a03" fillOpacity="0.6" stroke="#f59e0b" strokeWidth="2" />
              <text x="392" y="138" fill="#fcd34d" fontSize="12" fontWeight="bold" textAnchor="middle">
                المعاكس (يعكس الإشارة ويحفظ الكسر)
              </text>
              <text x="392" y="163" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle" dir="ltr">
                {-numP > 0 ? `+${-numP}/${denQ}` : `${-numP}/${denQ}`}
              </text>
              <text x="392" y="185" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" dir="ltr">
                ({numP}/{denQ}) + ({-numP > 0 ? `+${-numP}/${denQ}` : `${-numP}/${denQ}`}) = 0
              </text>
            </svg>

            <div className="no-pdf w-full mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-center gap-2">
              {[
                { p: -3, q: 4, label: '-3/4' },
                { p: 5, q: 2, label: '+5/2' },
                { p: -7, q: 1, label: '-7 = -7/1' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setNumP(item.p);
                    setDenQ(item.q);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    numP === item.p && denQ === item.q
                      ? 'bg-indigo-600 border-indigo-400 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                  dir="ltr"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Reading (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-indigo-400">2. قراءة الشكل المقارن :</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                انطلاقاً من نفس الكسر <span dir="ltr" className="font-mono text-white">{numP}/{denQ}</span>، لدينا عمليتان مختلفتان تماماً: <strong className="text-emerald-300">المقلوب</strong> مرتبط بالضرب والعدد المحايد <span dir="ltr" className="font-mono">1</span>، بينما <strong className="text-amber-300">المعاكس</strong> مرتبط بالجمع والعدد المحايد <span dir="ltr" className="font-mono">0</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // COURSE 04 & COURSE 09: قسمة كسرين / ضرب وقسمة الأعداد الناطقة
  // =========================================================
  if (courseId === 'lesson-04' || courseId === 'lesson-09') {
    const prodNum = fracA * fracD;
    const prodDen = fracB * fracC;

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 1. Synchronized Vis-à-Vis SVG Schema (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-bold text-indigo-400">
                1. المخطط البصري : تحويل القسمة إلى ضرب في مقلوب الكسر الثاني
              </span>
            </div>

            <svg viewBox="0 0 520 210" className="w-full h-auto max-h-[220px] select-none">
              {/* First Fraction (Kept) */}
              <rect x="25" y="45" width="110" height="110" rx="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
              <text x="80" y="68" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">الكسر الأول (ثابت)</text>
              <text x="80" y="96" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle">{fracA}</text>
              <line x1="55" y1="106" x2="105" y2="106" stroke="#818cf8" strokeWidth="2.5" />
              <text x="80" y="130" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle">{fracB}</text>

              {/* Operation transform */}
              <circle cx="170" cy="100" r="22" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
              <text x="170" y="96" fill="#fcd34d" fontSize="13" fontWeight="bold" textAnchor="middle">÷ ⟶ ×</text>
              <text x="170" y="112" fill="#c7d2fe" fontSize="9" textAnchor="middle">نحول لضرب</text>

              {/* Second Fraction (Inverted) */}
              <rect x="215" y="45" width="125" height="110" rx="14" fill="#451a03" fillOpacity="0.6" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="277" y="68" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">مقلوب الثاني (d/c)</text>
              <text x="277" y="96" fill="#34d399" fontSize="18" fontWeight="black" textAnchor="middle">{fracD}</text>
              <line x1="250" y1="106" x2="305" y2="106" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="277" y="130" fill="#fb7185" fontSize="18" fontWeight="black" textAnchor="middle">{fracC}</text>

              {/* Equals */}
              <text x="362" y="106" fill="#ffffff" fontSize="22" fontWeight="black" textAnchor="middle">=</text>

              {/* Result */}
              <rect x="385" y="45" width="115" height="110" rx="14" fill="#064e3b" fillOpacity="0.7" stroke="#10b981" strokeWidth="2.5" />
              <text x="442" y="68" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">النتيجة</text>
              <text x="442" y="96" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle">{prodNum}</text>
              <line x1="415" y1="106" x2="470" y2="106" stroke="#10b981" strokeWidth="2.5" />
              <text x="442" y="130" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle">{prodDen}</text>
            </svg>

            <div className="no-pdf w-full mt-2 pt-2 border-t border-slate-800 flex flex-wrap justify-center gap-2">
              {[
                { a: 3, b: 4, c: 2, d: 5, label: '(3/4) ÷ (2/5)' },
                { a: 10, b: 9, c: 5, d: 6, label: '(10/9) ÷ (5/6)' },
                { a: -4, b: 7, c: 3, d: 5, label: '(-4/7) ÷ (3/5)' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFracA(item.a);
                    setFracB(item.b);
                    setFracC(item.c);
                    setFracD(item.d);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                    fracA === item.a && fracC === item.c
                      ? 'bg-indigo-600 border-indigo-400 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                  dir="ltr"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Reading (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-indigo-400">2. قراءة المخطط :</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                العملية تمر بثلاث مراحل متزامنة: <strong className="text-white">الكسر الأول يبقى ثابتاً</strong>، رمز القسمة يتحول إلى <strong className="text-amber-300">ضرب (×)</strong>، والكسر الثاني يُستبدل بـ <strong className="text-emerald-300">مقلوبه</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // COURSE 05: مقارنة كسرين
  // =========================================================
  if (courseId === 'lesson-05') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 1. Synchronized Vis-à-Vis SVG Schema (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 mb-3">
              <span className="font-bold text-indigo-400">
                1. التمثيل البصري لمقارنة كسرين بأشرطة التجزئة
              </span>
              <div className="no-pdf flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setCompMode('same-den')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${
                    compMode === 'same-den' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  نفس المقام (5/8 و 3/8)
                </button>
                <button
                  type="button"
                  onClick={() => setCompMode('same-num')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${
                    compMode === 'same-num' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  نفس البسط (3/5 و 3/8)
                </button>
                <button
                  type="button"
                  onClick={() => setCompMode('diff')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer ${
                    compMode === 'diff' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  مقامان مختلفان (2/3 و 5/6)
                </button>
              </div>
            </div>

            <svg viewBox="0 0 520 200" className="w-full h-auto max-h-[210px] select-none">
              {compMode === 'same-den' && (
                <>
                  <text x="480" y="38" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="end">الكسر الأول: 5/8 (5 أجزاء من 8)</text>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <rect key={i} x={40 + i * 50} y="48" width="48" height="34" rx="4" fill={i < 5 ? '#10b981' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))}
                  <text x="480" y="118" fill="#818cf8" fontSize="13" fontWeight="bold" textAnchor="end">الكسر الثاني: 3/8 (3 أجزاء من 8)</text>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <rect key={i} x={40 + i * 50} y="128" width="48" height="34" rx="4" fill={i < 3 ? '#6366f1' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))}
                  <text x="240" y="188" fill="#fcd34d" fontSize="14" fontWeight="black" textAnchor="middle" dir="ltr">5/8 &gt; 3/8 (لأن 5 &gt; 3)</text>
                </>
              )}

              {compMode === 'same-num' && (
                <>
                  <text x="480" y="38" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="end">الكسر الأول: 3/5 (الواحد مقسم إلى 5 أجزاء كبيرة)</text>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <rect key={i} x={40 + i * 80} y="48" width="78" height="34" rx="4" fill={i < 3 ? '#10b981' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))}
                  <text x="480" y="118" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="end">الكسر الثاني: 3/8 (الواحد مقسم إلى 8 أجزاء أصغر)</text>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <rect key={i} x={40 + i * 50} y="128" width="48" height="34" rx="4" fill={i < 3 ? '#f43f5e' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))}
                  <text x="240" y="188" fill="#fcd34d" fontSize="14" fontWeight="black" textAnchor="middle" dir="ltr">3/5 &gt; 3/8 (لأن المقام 5 &lt; 8)</text>
                </>
              )}

              {compMode === 'diff' && (
                <>
                  <text x="480" y="38" fill="#818cf8" fontSize="13" fontWeight="bold" textAnchor="end">الكسر الأول: 2/3 = 4/6 (بعد تقسيم كل ثلث إلى جزأين)</text>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <rect key={i} x={40 + i * 66} y="48" width="64" height="34" rx="4" fill={i < 4 ? '#6366f1' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))}
                  <text x="480" y="118" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="end">الكسر الثاني: 5/6 (5 أجزاء من 6)</text>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <rect key={i} x={40 + i * 66} y="128" width="64" height="34" rx="4" fill={i < 5 ? '#10b981' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))}
                  <text x="240" y="188" fill="#fcd34d" fontSize="14" fontWeight="black" textAnchor="middle" dir="ltr">2/3 = 4/6 &lt; 5/6</text>
                </>
              )}
            </svg>
          </div>

          {/* 2. Reading (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-indigo-400">2. قراءة الأشرطة البصرية :</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                الشريطان لهما <strong className="text-white">نفس الطول الكلي (الوحدة 1)</strong>. المقام يحدد عدد أجزاء التجزئة (حجم الجزء الواحد)، والبسط يحدد عدد الأجزاء الملونة المأخوذة.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // COURSE 06 & COURSE 08: جمع وطرح كسرين / الأعداد الناطقة
  // =========================================================
  if (courseId === 'lesson-06' || courseId === 'lesson-08') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 1. Synchronized Vis-à-Vis SVG Schema (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
            <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 mb-3">
              <span className="font-bold text-indigo-400">
                1. النموذج البصري : لماذا نوحد المقامات قبل الجمع أو الطرح؟
              </span>
              <button
                type="button"
                onClick={() => setSubdivide(!subdivide)}
                className="no-pdf px-3 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold cursor-pointer"
              >
                {subdivide ? 'عرض قبل التوحيد (1/2 + 1/3)' : 'توحيد التجزئة إلى أجزاء متساوية (3/6 + 2/6)'}
              </button>
            </div>

            <svg viewBox="0 0 520 205" className="w-full h-auto max-h-[215px] select-none">
              {/* Bar 1: 1/2 = 3/6 */}
              <text x="480" y="34" fill="#818cf8" fontSize="12" fontWeight="bold" textAnchor="end">
                {subdivide ? 'الكسر الأول بعد التوحيد: 1/2 = 3/6' : 'الكسر الأول: 1/2 (نصف الوحدة)'}
              </text>
              {subdivide
                ? Array.from({ length: 6 }).map((_, i) => (
                    <rect key={i} x={40 + i * 70} y="42" width="68" height="28" rx="4" fill={i < 3 ? '#6366f1' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))
                : Array.from({ length: 2 }).map((_, i) => (
                    <rect key={i} x={40 + i * 210} y="42" width="208" height="28" rx="4" fill={i < 1 ? '#6366f1' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))}

              {/* Bar 2: 1/3 = 2/6 */}
              <text x="480" y="96" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="end">
                {subdivide ? 'الكسر الثاني بعد التوحيد: 1/3 = 2/6' : 'الكسر الثاني: 1/3 (ثلث الوحدة)'}
              </text>
              {subdivide
                ? Array.from({ length: 6 }).map((_, i) => (
                    <rect key={i} x={40 + i * 70} y="104" width="68" height="28" rx="4" fill={i < 2 ? '#f59e0b' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <rect key={i} x={40 + i * 140} y="104" width="138" height="28" rx="4" fill={i < 1 ? '#f59e0b' : '#1e293b'} stroke="#475569" strokeWidth="1.5" />
                  ))}

              {/* Sum Bar: 5/6 */}
              <text x="480" y="158" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="end">
                المجموع الموحد: 3/6 + 2/6 = 5/6 (5 أجزاء متساوية من 6)
              </text>
              {Array.from({ length: 6 }).map((_, i) => (
                <rect
                  key={i}
                  x={40 + i * 70}
                  y="166"
                  width="68"
                  height="28"
                  rx="4"
                  fill={i < 3 ? '#6366f1' : i < 5 ? '#f59e0b' : '#1e293b'}
                  stroke="#10b981"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          {/* 2. Reading (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-indigo-400">2. قراءة التجزئة البصرية :</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                لا يمكن جمع <strong className="text-indigo-300">نصف (1/2)</strong> مع <strong className="text-amber-300">ثلث (1/3)</strong> مباشرة لأن القطعتين مختلفتان في الحجم! بتقسيم كل نصف إلى 3 أجزاء وكل ثلث إلى جزأين، تصبح كل القطع من فئة <strong className="text-emerald-300">السدس (1/6)</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // COURSE 07: الأعداد الناطقة (المفهوم، الإشارة والاختزال)
  // =========================================================
  const isPositiveRat = (ratNum > 0 && ratDen > 0) || (ratNum < 0 && ratDen < 0);
  const absNum = Math.abs(ratNum);
  const absDen = Math.abs(ratDen);
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const g = gcd(absNum, absDen);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. Synchronized Vis-à-Vis SVG Schema (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-300 mb-2">
            <span className="font-bold text-indigo-400">
              1. المخطط البصري : كتابة العدد الناطق بمقام طبيعي موجب واختزاله
            </span>
          </div>

          <svg viewBox="0 0 520 205" className="w-full h-auto max-h-[215px] select-none">
            {/* Step 1: Raw Rational */}
            <rect x="20" y="50" width="130" height="105" rx="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
            <text x="85" y="72" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">الكتابة الأصلية</text>
            <text x="85" y="98" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle" dir="ltr">{ratNum}</text>
            <line x1="55" y1="108" x2="115" y2="108" stroke="#818cf8" strokeWidth="2.5" />
            <text x="85" y="132" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle" dir="ltr">{ratDen}</text>

            <text x="170" y="108" fill="#818cf8" fontSize="20" fontWeight="bold" textAnchor="middle">⟶</text>

            {/* Step 2: Sign standardization */}
            <rect x="190" y="50" width="140" height="105" rx="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="260" y="72" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">ضبط الإشارة والمقام الموجب</text>
            <text x="260" y="98" fill="#ffffff" fontSize="17" fontWeight="black" textAnchor="middle" dir="ltr">
              {isPositiveRat ? `+${absNum}` : `-${absNum}`}
            </text>
            <line x1="225" y1="108" x2="295" y2="108" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="260" y="132" fill="#34d399" fontSize="17" fontWeight="black" textAnchor="middle" dir="ltr">
              {absDen} (÷{g})
            </text>

            <text x="350" y="108" fill="#10b981" fontSize="20" fontWeight="bold" textAnchor="middle">⟶</text>

            {/* Step 3: Irreducible form */}
            <rect x="370" y="50" width="130" height="105" rx="14" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
            <text x="435" y="72" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">الشكل المختزل النهائي</text>
            <text x="435" y="98" fill="#34d399" fontSize="18" fontWeight="black" textAnchor="middle" dir="ltr">
              {isPositiveRat ? `+${absNum / g}` : `-${absNum / g}`}
            </text>
            <line x1="405" y1="108" x2="465" y2="108" stroke="#10b981" strokeWidth="2.5" />
            <text x="435" y="132" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle" dir="ltr">
              {absDen / g}
            </text>
          </svg>

          <div className="no-pdf w-full mt-2 pt-2 border-t border-slate-800 flex flex-wrap justify-center gap-2">
            {[
              { n: -12, d: -18, label: '(-12)/(-18)' },
              { n: 14, d: -35, label: '14/(-35)' },
              { n: -15, d: 25, label: '(-15)/25' },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setRatNum(item.n);
                  setRatDen(item.d);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                  ratNum === item.n && ratDen === item.d
                    ? 'bg-indigo-600 border-indigo-400 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
                dir="ltr"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Reading (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-black text-indigo-400">2. قراءة المخطط :</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              العدد الناطق هو حاصل قسمة عدد نسبي <span dir="ltr" className="font-mono text-white">a</span> على عدد نسبي غير معدوم <span dir="ltr" className="font-mono text-white">b</span>. لتسهيل أي عملية حسابية عليه، نجعل <strong className="text-emerald-300">مقامه عدداً طبيعياً موجباً دوماً</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
