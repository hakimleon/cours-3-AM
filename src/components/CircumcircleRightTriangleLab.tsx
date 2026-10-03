import React, { useState } from 'react';
import { formatTextWithSuperscripts } from './MathView';

export const CircumcircleRightTriangleLab: React.FC = () => {
  // Interactive controls for observation: hypotenuse length BC and position of vertex A on the circle
  const [bcLength, setBcLength] = useState<number>(10);
  const [angleDeg, setAngleDeg] = useState<number>(65);
  const [showCircle, setShowCircle] = useState<boolean>(true);

  const radiusVal = bcLength / 2;

  // SVG Geometry coordinates
  const cx = 260;
  const cy = 195;
  const R = 135;

  // Diameter [BC] horizontal: B on left, C on right, O at center
  const B = { x: cx - R, y: cy };
  const C = { x: cx + R, y: cy };

  // Point A on the upper semicircle
  const rad = ((180 - angleDeg) * Math.PI) / 180;
  const Ax = cx + R * Math.cos(rad);
  const Ay = cy - R * Math.sin(rad);

  // Right-angle square marker at A
  const vAB = { x: B.x - Ax, y: B.y - Ay };
  const dAB = Math.hypot(vAB.x, vAB.y);
  const uAB = { x: vAB.x / dAB, y: vAB.y / dAB };

  const vAC = { x: C.x - Ax, y: C.y - Ay };
  const dAC = Math.hypot(vAC.x, vAC.y);
  const uAC = { x: vAC.x / dAC, y: vAC.y / dAC };

  const sqSize = 16;
  const sqP1 = { x: Ax + uAB.x * sqSize, y: Ay + uAB.y * sqSize };
  const sqP2 = { x: sqP1.x + uAC.x * sqSize, y: sqP1.y + uAC.y * sqSize };
  const sqP3 = { x: Ax + uAC.x * sqSize, y: Ay + uAC.y * sqSize };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      {/* Synchronized Vis-à-Vis Layout: Schema Immediately Beside Text Reading, Link to Course 18 & Discovery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. LE SCHÉMA GÉOMÉTRIQUE EN VIS-À-VIS (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
          <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 mb-2">
            <span className="font-bold text-indigo-400">
              1. الشكل الهندسي : المثلث القائم ABC والدائرة المحيطة به (C)
            </span>
            <button
              type="button"
              onClick={() => setShowCircle(!showCircle)}
              className={`no-pdf px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                showCircle
                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {showCircle ? 'إخفاء الدائرة المحيطة (C)' : 'إظهار الدائرة المحيطة (C)'}
            </button>
          </div>

          <svg viewBox="0 0 520 350" className="w-full h-auto max-h-[320px] select-none">
            {/* Circumcircle (C) centered at O with radius R */}
            {showCircle && (
              <>
                <circle
                  cx={cx}
                  cy={cy}
                  r={R}
                  fill="#1e1b4b"
                  fillOpacity="0.25"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <text x={cx + R - 10} y={cy - R + 22} fill="#818cf8" fontSize="13" fontWeight="bold">
                  (C) الدائرة المحيطة
                </text>
              </>
            )}

            {/* Right Triangle ABC */}
            <polygon
              points={`${B.x},${B.y} ${C.x},${C.y} ${Ax},${Ay}`}
              fill="#0f172a"
              fillOpacity="0.8"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Hypotenuse / Diameter [BC] */}
            <line
              x1={B.x}
              y1={B.y}
              x2={C.x}
              y2={C.y}
              stroke="#10b981"
              strokeWidth="4"
            />

            {/* Radius / Median [OA] */}
            <line
              x1={cx}
              y1={cy}
              x2={Ax}
              y2={Ay}
              stroke="#f43f5e"
              strokeWidth="3"
              strokeDasharray="5 3"
            />

            {/* Right angle marker at A */}
            <polygon
              points={`${Ax},${Ay} ${sqP1.x},${sqP1.y} ${sqP2.x},${sqP2.y} ${sqP3.x},${sqP3.y}`}
              fill="#f59e0b"
              fillOpacity="0.35"
              stroke="#f59e0b"
              strokeWidth="1.5"
            />

            {/* Equality tick marks on OB, OC, OA (= R) */}
            <line
              x1={(B.x + cx) / 2 - 3}
              y1={cy - 7}
              x2={(B.x + cx) / 2 + 3}
              y2={cy + 7}
              stroke="#fde047"
              strokeWidth="2.5"
            />
            <line
              x1={(cx + C.x) / 2 - 3}
              y1={cy - 7}
              x2={(cx + C.x) / 2 + 3}
              y2={cy + 7}
              stroke="#fde047"
              strokeWidth="2.5"
            />
            <circle cx={(Ax + cx) / 2} cy={(Ay + cy) / 2} r="4" fill="#fde047" />

            {/* Vertices B, C, O, A */}
            <circle cx={B.x} cy={B.y} r="6" fill="#10b981" />
            <text x={B.x - 18} y={B.y + 5} fill="#34d399" fontSize="14" fontWeight="bold">
              B
            </text>

            <circle cx={C.x} cy={C.y} r="6" fill="#10b981" />
            <text x={C.x + 12} y={C.y + 5} fill="#34d399" fontSize="14" fontWeight="bold">
              C
            </text>

            <circle cx={cx} cy={cy} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            <text x={cx} y={cy + 24} fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">
              O (المركز ومنتصف [BC])
            </text>

            <circle cx={Ax} cy={Ay} r="6.5" fill="#fbbf24" />
            <text x={Ax} y={Ay - 14} fill="#fbbf24" fontSize="14" fontWeight="black" textAnchor="middle">
              A (90°)
            </text>

            {/* Radii labels */}
            <text x={(B.x + cx) / 2} y={cy - 12} fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              R = {radiusVal} cm
            </text>
            <text x={(cx + C.x) / 2} y={cy - 12} fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              R = {radiusVal} cm
            </text>
            <text
              x={(Ax + cx) / 2 + 24}
              y={(Ay + cy) / 2}
              fill="#fb7185"
              fontSize="12"
              fontWeight="bold"
            >
              OA = R = {radiusVal} cm
            </text>
          </svg>

          {/* Interactive sliders for observation */}
          <div className="no-pdf w-full mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-bold">طول الوتر (القطر [BC]):</span>
                <span className="font-mono text-white font-bold">{bcLength} cm</span>
              </div>
              <input
                type="range"
                min="6"
                max="20"
                step="2"
                value={bcLength}
                onChange={(e) => setBcLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400 font-bold">تحريك الرأس القائم A على القوس:</span>
                <span className="font-mono text-white font-bold">∠A = 90°</span>
              </div>
              <input
                type="range"
                min="30"
                max="150"
                step="5"
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 2, 3, 4: LECTURE DU SCHÉMA, CONTINUITÉ DU COURS 18 & DÉCOUVERTE EN VIS-À-VIS (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Reading & Identification of Symbols */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div className="text-xs font-black text-indigo-400">
              2. قراءة الشكل وتحديد العناصر الهندسية :
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              في الشكل المقابل، المثلث <strong className="text-white">ABC</strong> قائم في{' '}
              <strong className="text-amber-300">A</strong> وتحيط به الدائرة <strong className="text-indigo-300">(C)</strong>:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold shrink-0">
                  [BC]
                </span>
                <span>
                  <strong>وتر المثلث القائم وقطر الدائرة (C) :</strong> الضلع المقابل للزاوية القائمة A.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold shrink-0">
                  O
                </span>
                <span>
                  <strong>منتصف الوتر [BC] ومركز الدائرة (C) :</strong> يقع على الوتر نفسه وليس داخل المثلث.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold shrink-0">
                  R
                </span>
                <span>
                  {formatTextWithSuperscripts(
                    'نصف قطر الدائرة المحيطة : المسافة الثابتة من المركز O إلى الرؤوس الثلاثة (OA = OB = OC).'
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
