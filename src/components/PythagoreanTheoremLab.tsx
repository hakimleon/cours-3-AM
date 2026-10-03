import React, { useState } from 'react';
import { formatTextWithSuperscripts } from './MathView';

interface PythagoreanTheoremLabProps {
  data?: {
    title?: string;
    subtitle?: string;
    explanation?: string;
  };
}

export const PythagoreanTheoremLab: React.FC<PythagoreanTheoremLabProps> = () => {
  // Interactive legs BA and CA for visual observation of the 3 squares
  const [legBA, setLegBA] = useState<number>(3);
  const [legCA, setLegCA] = useState<number>(4);
  const [showGridTiles, setShowGridTiles] = useState<boolean>(true);

  const areaBA = legBA * legBA;
  const areaCA = legCA * legCA;
  const areaBC = areaBA + areaCA;
  const hypBC = Math.sqrt(areaBC);
  const isExactInteger = Number.isInteger(hypBC);
  const formattedBC = isExactInteger ? String(hypBC) : hypBC.toFixed(2);

  // Auto-scaling geometry for SVG canvas
  const svgW = 520;
  const svgH = 340;
  const totalUnitW = 2 * legBA + legCA;
  const totalUnitH = legBA + 2 * legCA;
  const scale = Math.min(250 / totalUnitW, 225 / totalUnitH);

  const aPx = legBA * scale;
  const bPx = legCA * scale;

  const figW = 2 * aPx + bPx;
  const figH = aPx + 2 * bPx;
  const minX = (svgW - figW) / 2;
  const minY = (svgH - figH) / 2;

  const xA = minX + aPx;
  const yA = minY + aPx + bPx;

  const xB = xA;
  const yB = yA - aPx;

  const xC = xA + bPx;
  const yC = yA;

  // Outward square on hypotenuse [BC]
  const xCPrime = xC + aPx;
  const yCPrime = yC - bPx;
  const xBPrime = xB + aPx;
  const yBPrime = yB - bPx;

  const renderSquareGrid = (
    p0: [number, number],
    p1: [number, number],
    p2: [number, number],
    p3: [number, number],
    n: number,
    strokeColor: string
  ) => {
    if (!showGridTiles || n > 15 || !Number.isInteger(n)) return null;
    const lines = [];
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const x1 = p0[0] + t * (p1[0] - p0[0]);
      const y1 = p0[1] + t * (p1[1] - p0[1]);
      const x2 = p3[0] + t * (p2[0] - p3[0]);
      const y2 = p3[1] + t * (p2[1] - p3[1]);
      lines.push(
        <line
          key={`g1-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={strokeColor}
          strokeOpacity="0.28"
          strokeWidth="1"
        />
      );
      const x3 = p0[0] + t * (p3[0] - p0[0]);
      const y3 = p0[1] + t * (p3[1] - p0[1]);
      const x4 = p1[0] + t * (p2[0] - p1[0]);
      const y4 = p1[1] + t * (p2[1] - p1[1]);
      lines.push(
        <line
          key={`g2-${i}`}
          x1={x3}
          y1={y3}
          x2={x4}
          y2={y4}
          stroke={strokeColor}
          strokeOpacity="0.28"
          strokeWidth="1"
        />
      );
    }
    return lines;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      {/* Synchronized Vis-à-Vis Layout: Schema Immediately Beside Text Reading, Link to Courses 18-19 & Discovery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. LE SCHÉMA GÉOMÉTRIQUE EN VIS-À-VIS (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
          <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 mb-2">
            <span className="font-bold text-emerald-400">
              1. الشكل الهندسي : المثلث القائم BCA والمربعات المنشأة على أضلاعه
            </span>
            <button
              type="button"
              onClick={() => setShowGridTiles(!showGridTiles)}
              className={`no-pdf px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                showGridTiles
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {showGridTiles ? 'إخفاء شبكة المربعات (cm²)' : 'إظهار شبكة المربعات (cm²)'}
            </button>
          </div>

          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px] select-none">
            {/* Square on BA (Left of AB) */}
            <polygon
              points={`${xA},${yA} ${xB},${yB} ${xB - aPx},${yB} ${xA - aPx},${yA}`}
              fill="#0ea5e9"
              fillOpacity="0.18"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {renderSquareGrid(
              [xA, yA],
              [xB, yB],
              [xB - aPx, yB],
              [xA - aPx, yA],
              legBA,
              '#38bdf8'
            )}
            <text
              x={xA - aPx / 2}
              y={yA - aPx / 2 - 5}
              fill="#7dd3fc"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              BA² = {legBA}²
            </text>
            <text
              x={xA - aPx / 2}
              y={yA - aPx / 2 + 12}
              fill="#ffffff"
              fontSize="13"
              fontWeight="black"
              textAnchor="middle"
            >
              {areaBA} cm²
            </text>

            {/* Square on CA (Below AC) */}
            <polygon
              points={`${xA},${yA} ${xC},${yC} ${xC},${yC + bPx} ${xA},${yA + bPx}`}
              fill="#a855f7"
              fillOpacity="0.18"
              stroke="#c084fc"
              strokeWidth="2"
            />
            {renderSquareGrid(
              [xA, yA],
              [xC, yC],
              [xC, yC + bPx],
              [xA, yA + bPx],
              legCA,
              '#c084fc'
            )}
            <text
              x={xA + bPx / 2}
              y={yA + bPx / 2 - 5}
              fill="#d8b4fe"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              CA² = {legCA}²
            </text>
            <text
              x={xA + bPx / 2}
              y={yA + bPx / 2 + 12}
              fill="#ffffff"
              fontSize="13"
              fontWeight="black"
              textAnchor="middle"
            >
              {areaCA} cm²
            </text>

            {/* Square on Hypotenuse BC (Outward top-right) */}
            <polygon
              points={`${xB},${yB} ${xC},${yC} ${xCPrime},${yCPrime} ${xBPrime},${yBPrime}`}
              fill="#10b981"
              fillOpacity="0.2"
              stroke="#34d399"
              strokeWidth="2.5"
            />
            {isExactInteger &&
              renderSquareGrid(
                [xB, yB],
                [xC, yC],
                [xCPrime, yCPrime],
                [xBPrime, yBPrime],
                hypBC,
                '#34d399'
              )}
            <text
              x={(xB + xC + xCPrime + xBPrime) / 4}
              y={(yB + yC + yCPrime + yBPrime) / 4 - 5}
              fill="#6ee7b7"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              BC² (مربع الوتر)
            </text>
            <text
              x={(xB + xC + xCPrime + xBPrime) / 4}
              y={(yB + yC + yCPrime + yBPrime) / 4 + 13}
              fill="#ffffff"
              fontSize="14"
              fontWeight="black"
              textAnchor="middle"
            >
              {areaBC} cm²
            </text>

            {/* Central Right Triangle BCA */}
            <polygon
              points={`${xA},${yA} ${xB},${yB} ${xC},${yC}`}
              fill="#0f172a"
              fillOpacity="0.9"
              stroke="#f8fafc"
              strokeWidth="2.5"
            />

            {/* Hypotenuse [BC] highlighted */}
            <line x1={xB} y1={yB} x2={xC} y2={yC} stroke="#10b981" strokeWidth="3.5" />

            {/* Right angle marker at A */}
            <polygon
              points={`${xA},${yA} ${xA + Math.min(14, bPx * 0.35)},${yA} ${
                xA + Math.min(14, bPx * 0.35)
              },${yA - Math.min(14, aPx * 0.35)} ${xA},${yA - Math.min(14, aPx * 0.35)}`}
              fill="#f43f5e"
              fillOpacity="0.35"
              stroke="#f43f5e"
              strokeWidth="1.5"
            />

            {/* Vertices */}
            <circle cx={xA} cy={yA} r="5.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.5" />
            <text x={xA - 14} y={yA + 16} fill="#fda4af" fontSize="13" fontWeight="black">
              A (90°)
            </text>

            <circle cx={xB} cy={yB} r="5.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
            <text x={xB - 14} y={yB - 8} fill="#38bdf8" fontSize="13" fontWeight="black">
              B
            </text>

            <circle cx={xC} cy={yC} r="5.5" fill="#c084fc" stroke="#0f172a" strokeWidth="1.5" />
            <text x={xC + 10} y={yC + 14} fill="#c084fc" fontSize="13" fontWeight="black">
              C
            </text>
          </svg>

          {/* Sliders for interactive observation */}
          <div className="no-pdf w-full mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-sky-400 font-bold">طول الضلع القائم الأول BA:</span>
                <span className="font-mono text-white font-bold">{legBA} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={legBA}
                onChange={(e) => setLegBA(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-purple-400 font-bold">طول الضلع القائم الثاني CA:</span>
                <span className="font-mono text-white font-bold">{legCA} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={legCA}
                onChange={(e) => setLegCA(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>
        </div>

        {/* 2 & 3: LECTURE DU SCHÉMA, IDENTIFICATION DU TRIANGLE & DÉCOUVERTE EN VIS-À-VIS (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Reading & Identification of Elements */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div className="text-xs font-black text-emerald-400">
              2. قراءة الشكل وتحديد الوتر والضلعين القائمين :
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              قبل أي حساب في المثلث القائم <strong className="text-white">BCA</strong>، نحدد الزاوية القائمة أولاً دون الاعتماد على مظهر الرسم:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold shrink-0">
                  A
                </span>
                <span>
                  <strong>رأس الزاوية القائمة (90°) :</strong> يلتقي عنده الضلعان القائمان{' '}
                  <span className="font-mono text-sky-300">[BA]</span> و{' '}
                  <span className="font-mono text-purple-300">[CA]</span>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold shrink-0">
                  [BC]
                </span>
                <span>
                  <strong>الوتر (أطول ضلع) :</strong> الضلع المقابل للزاوية القائمة A (القطعة التي لا تحتوي حرف الرأس القائم).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold shrink-0">
                  cm² / cm
                </span>
                <span>
                  <strong>التمييز بين المساحة والطول :</strong>{' '}
                  {formatTextWithSuperscripts(
                    'المربعات BA², CA², BC² تمثل مساحات بـ cm²، والجذر التربيعي يعيدنا إلى وحدة الطول cm.'
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
