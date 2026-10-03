import React, { useState } from 'react';
import { formatTextWithSuperscripts } from './MathView';

interface MedianHypotenuseLabProps {
  data?: {
    title?: string;
    subtitle?: string;
    explanation?: string;
  };
}

export const MedianHypotenuseLab: React.FC<MedianHypotenuseLabProps> = () => {
  // Schema & Observation controls: Hypotenuse length BC and vertex A position along semicircle
  const [bcLength, setBcLength] = useState<number>(12);
  const [angleParam, setAngleParam] = useState<number>(60); // 30 to 150 degrees
  const [showRectangleGhost, setShowRectangleGhost] = useState<boolean>(false);

  const halfHypotenuse = bcLength / 2;

  // SVG Geometry for Schema
  const cx = 270;
  const cy = 210;
  const radiusPx = 145;

  const xB = cx - radiusPx;
  const yB = cy;
  const xC = cx + radiusPx;
  const yC = cy;
  const xM = cx;
  const yM = cy;

  const rad = ((180 - angleParam) * Math.PI) / 180;
  const xA = cx + radiusPx * Math.cos(rad);
  const yA = cy - radiusPx * Math.sin(rad);

  // Symmetric point A' across M (completing rectangle AB A' C for discovery step)
  const xAPrime = 2 * xM - xA;
  const yAPrime = 2 * yM - yA;

  // Right-angle square at A
  const vAB = { x: xB - xA, y: yB - yA };
  const dAB = Math.hypot(vAB.x, vAB.y);
  const uAB = { x: vAB.x / dAB, y: vAB.y / dAB };

  const vAC = { x: xC - xA, y: yC - yA };
  const dAC = Math.hypot(vAC.x, vAC.y);
  const uAC = { x: vAC.x / dAC, y: vAC.y / dAC };

  const sq = 16;
  const sqP1 = { x: xA + uAB.x * sq, y: yA + uAB.y * sq };
  const sqP2 = { x: sqP1.x + uAC.x * sq, y: sqP1.y + uAC.y * sq };
  const sqP3 = { x: xA + uAC.x * sq, y: yA + uAC.y * sq };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      {/* Synchronized Vis-à-Vis Layout: Schema Immediately Beside Text Reading & Identification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. LE SCHÉMA GÉOMÉTRIQUE EN VIS-À-VIS (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
          <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 mb-2">
            <span className="font-bold text-emerald-400">
              1. الشكل الهندسي : المثلث ABC القائم في A والمتوسط [AM]
            </span>
            <button
              type="button"
              onClick={() => setShowRectangleGhost(!showRectangleGhost)}
              className={`no-pdf px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                showRectangleGhost
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {showRectangleGhost
                ? "إخفاء النقطة النظيرة A'"
                : 'إظهار إنشاء المستطيل (التناظر المركزي)'}
            </button>
          </div>

          <svg viewBox="0 0 540 310" className="w-full h-auto max-h-[300px]">
            {/* Optional Ghost Rectangle for Discovery Step */}
            {showRectangleGhost && (
              <g>
                <polygon
                  points={`${xA},${yA} ${xB},${yB} ${xAPrime},${yAPrime} ${xC},${yC}`}
                  fill="#f59e0b"
                  fillOpacity="0.06"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                />
                <line
                  x1={xM}
                  y1={yM}
                  x2={xAPrime}
                  y2={yAPrime}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
                <circle cx={xAPrime} cy={yAPrime} r="5" fill="#f59e0b" />
                <text x={xAPrime + 10} y={yAPrime + 15} fill="#fbbf24" fontSize="12" fontWeight="bold">
                  A&apos; (نظيرة A بالنسبة إلى M)
                </text>
              </g>
            )}

            {/* Triangle ABC */}
            <polygon
              points={`${xB},${yB} ${xC},${yC} ${xA},${yA}`}
              fill="#0f172a"
              fillOpacity="0.75"
              stroke="#94a3b8"
              strokeWidth="2.5"
            />

            {/* Hypotenuse halves [BM] and [MC] */}
            <line x1={xB} y1={yB} x2={xM} y2={yM} stroke="#10b981" strokeWidth="4" />
            <line x1={xM} y1={yM} x2={xC} y2={yC} stroke="#10b981" strokeWidth="4" />

            {/* Median [AM] */}
            <line x1={xA} y1={yA} x2={xM} y2={yM} stroke="#f43f5e" strokeWidth="3.5" />

            {/* Right angle square at vertex A */}
            <polygon
              points={`${xA},${yA} ${sqP1.x},${sqP1.y} ${sqP2.x},${sqP2.y} ${sqP3.x},${sqP3.y}`}
              fill="#f43f5e"
              fillOpacity="0.3"
              stroke="#f43f5e"
              strokeWidth="1.5"
            />

            {/* Equal length tick marks on [BM], [MC], and [AM] */}
            <line
              x1={(xB + xM) / 2 - 3}
              y1={yB - 7}
              x2={(xB + xM) / 2 + 3}
              y2={yB + 7}
              stroke="#fde047"
              strokeWidth="2.5"
            />
            <line
              x1={(xM + xC) / 2 - 3}
              y1={yC - 7}
              x2={(xM + xC) / 2 + 3}
              y2={yC + 7}
              stroke="#fde047"
              strokeWidth="2.5"
            />
            <circle cx={(xA + xM) / 2} cy={(yA + yM) / 2} r="4" fill="#fde047" />

            {/* Vertices B, C, M, A */}
            <circle cx={xB} cy={yB} r="6" fill="#10b981" />
            <text x={xB - 18} y={yB + 20} fill="#34d399" fontSize="14" fontWeight="bold">
              B
            </text>

            <circle cx={xC} cy={yC} r="6" fill="#10b981" />
            <text x={xC + 10} y={yC + 20} fill="#34d399" fontSize="14" fontWeight="bold">
              C
            </text>

            <circle cx={xM} cy={yM} r="6" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
            <text x={xM - 6} y={yM + 24} fill="#fb7185" fontSize="13" fontWeight="bold">
              M (منتصف [BC])
            </text>

            <circle cx={xA} cy={yA} r="6.5" fill="#fbbf24" />
            <text x={xA - 10} y={yA - 14} fill="#fbbf24" fontSize="14" fontWeight="black">
              A (الزاوية القائمة)
            </text>

            {/* Segment Labels */}
            <text x={(xB + xM) / 2} y={yB - 12} fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              BM = {halfHypotenuse} cm
            </text>
            <text x={(xM + xC) / 2} y={yC - 12} fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              MC = {halfHypotenuse} cm
            </text>
            <text
              x={(xA + xM) / 2 + 18}
              y={(yA + yM) / 2}
              fill="#fb7185"
              fontSize="13"
              fontWeight="black"
            >
              AM = {halfHypotenuse} cm
            </text>
          </svg>

          {/* Sliders for interactive observation */}
          <div className="no-pdf w-full mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-bold">تغيير طول الوتر [BC]:</span>
                <span className="font-mono text-white font-bold">{bcLength} cm</span>
              </div>
              <input
                type="range"
                min="6"
                max="24"
                step="2"
                value={bcLength}
                onChange={(e) => setBcLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400 font-bold">تغيير موضع الرأس القائم A:</span>
                <span className="font-mono text-white font-bold">∠A = 90°</span>
              </div>
              <input
                type="range"
                min="30"
                max="150"
                step="5"
                value={angleParam}
                onChange={(e) => setAngleParam(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 2, 3, 4: LECTURE DU SCHÉMA, IDENTIFICATION DES POINTS & RAPPEL MINIMAL EN VIS-À-VIS (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Reading & Identification merged cleanly */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div className="text-xs font-black text-emerald-400">
              2. قراءة الشكل وتحديد العناصر (مدلول الحروف) :
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              في المثلث <strong className="text-white">ABC</strong> المقابل، نعيّن العناصر الهندسية الأربعة قبل صياغة أي علاقة:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold shrink-0">
                  A
                </span>
                <span>
                  <strong>رأس الزاوية القائمة (90°) :</strong> نقطة تعامد الضلعين القائمين [AB] و [AC].
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold shrink-0">
                  [BC]
                </span>
                <span>
                  <strong>الوتر :</strong> الضلع المقابل للزاوية القائمة A (أطول ضلع في المثلث).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold shrink-0">
                  M
                </span>
                <span>
                  <strong>منتصف الوتر [BC] :</strong> يقسم الوتر إلى قطعتين متقايستين [BM] و [MC].
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold shrink-0">
                  [AM]
                </span>
                <span>
                  <strong>المتوسط المتعلق بالوتر :</strong> القطعة الواصلة بين الرأس القائم A ومنتصف الوتر M.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
