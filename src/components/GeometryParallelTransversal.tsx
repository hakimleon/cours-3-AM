import React, { useState } from 'react';

type RelationMode = 'opposite' | 'corresponding' | 'alternate' | 'supp_comp';

interface AngleBadgeProps {
  pos: { x: number; y: number };
  label: string;
  active?: boolean;
  fillColor?: string;
  strokeColor?: string;
}

const CLASSIC_ARABIC_FONT = "'Tajawal', 'Segoe UI', Tahoma, sans-serif";
const CLEAN_LABEL_FONT = "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const AngleBadge: React.FC<AngleBadgeProps> = ({
  pos,
  label,
  active = false,
  fillColor = '#059669',
  strokeColor = '#a7f3d0',
}) => {
  return (
    <g>
      <circle
        cx={pos.x}
        cy={pos.y}
        r={active ? 17.5 : 15.5}
        fill={active ? fillColor : '#1e293b'}
        fillOpacity={active ? 0.92 : 0.95}
        stroke={active ? strokeColor : '#94a3b8'}
        strokeWidth={active ? 2.2 : 1.4}
      />
      <text
        x={pos.x}
        y={pos.y}
        fill={active ? '#ffffff' : '#f8fafc'}
        fontFamily={CLEAN_LABEL_FONT}
        fontSize={active ? '13.5' : '12.5'}
        fontWeight={active ? '600' : '400'}
        textAnchor="middle"
        dominantBaseline="central"
        direction="ltr"
      >
        {label}
      </text>
    </g>
  );
};

export const GeometryParallelTransversal: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState<number>(62);
  const [mode, setMode] = useState<RelationMode>('opposite');

  const rad = (angleDeg * Math.PI) / 180;
  const pA = { x: 285, y: 78 };
  const pB = { x: 285 - 108 / Math.tan(rad), y: 186 };

  const dx = 135 * Math.cos(rad);
  const dy = 135 * Math.sin(rad);

  // Generous radius from vertex so the 4 badges around A and B are well separated and 100% legible
  const bisAcute = rad / 2;
  const bisObtuse = (rad + Math.PI) / 2;
  const rLabel = 38;

  const getSectorPos = (center: { x: number; y: number }, sector: 1 | 2 | 3 | 4) => {
    switch (sector) {
      case 1: // Top-Right (acute = angleDeg)
        return {
          x: center.x + rLabel * Math.cos(bisAcute),
          y: center.y - rLabel * Math.sin(bisAcute),
        };
      case 2: // Top-Left (obtuse = 180 - angleDeg)
        return {
          x: center.x + rLabel * Math.cos(bisObtuse),
          y: center.y - rLabel * Math.sin(bisObtuse),
        };
      case 3: // Bottom-Left (acute = angleDeg, opposite to 1)
        return {
          x: center.x - rLabel * Math.cos(bisAcute),
          y: center.y + rLabel * Math.sin(bisAcute),
        };
      case 4: // Bottom-Right (obtuse = 180 - angleDeg, opposite to 2)
        return {
          x: center.x - rLabel * Math.cos(bisObtuse),
          y: center.y + rLabel * Math.sin(bisObtuse),
        };
    }
  };

  const A1 = getSectorPos(pA, 1);
  const A2 = getSectorPos(pA, 2);
  const A3 = getSectorPos(pA, 3);
  const A4 = getSectorPos(pA, 4);

  const B1 = getSectorPos(pB, 1);
  const B2 = getSectorPos(pB, 2);
  const B3 = getSectorPos(pB, 3);
  const B4 = getSectorPos(pB, 4);

  const renderBadge = (pos: { x: number; y: number }, id: string) => {
    if (mode === 'opposite') {
      if (id === 'A1' || id === 'A3') {
        return (
          <AngleBadge
            key={id}
            pos={pos}
            label={id}
            active
            fillColor="#7e22ce"
            strokeColor="#e9d5ff"
          />
        );
      }
      if (id === 'B1' || id === 'B3') {
        return (
          <AngleBadge
            key={id}
            pos={pos}
            label={id}
            active
            fillColor="#be185d"
            strokeColor="#fbcfe8"
          />
        );
      }
    } else if (mode === 'corresponding') {
      if (id === 'A1' || id === 'B1') {
        return (
          <AngleBadge
            key={id}
            pos={pos}
            label={id}
            active
            fillColor="#059669"
            strokeColor="#a7f3d0"
          />
        );
      }
    } else if (mode === 'alternate') {
      if (id === 'A3' || id === 'B1') {
        return (
          <AngleBadge
            key={id}
            pos={pos}
            label={id}
            active
            fillColor="#e11d48"
            strokeColor="#fecdd3"
          />
        );
      }
      if (id === 'A1' || id === 'B3') {
        return (
          <AngleBadge
            key={id}
            pos={pos}
            label={id}
            active
            fillColor="#0284c7"
            strokeColor="#bae6fd"
          />
        );
      }
    } else if (mode === 'supp_comp') {
      if (id === 'A4') {
        return (
          <AngleBadge
            key={id}
            pos={pos}
            label={id}
            active
            fillColor="#d97706"
            strokeColor="#fde68a"
          />
        );
      }
      if (id === 'B1' || id === 'A1') {
        return (
          <AngleBadge
            key={id}
            pos={pos}
            label={id}
            active
            fillColor="#059669"
            strokeColor="#a7f3d0"
          />
        );
      }
    }

    return <AngleBadge key={id} pos={pos} label={id} />;
  };

  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4 font-normal"
      style={{ fontFamily: CLASSIC_ARABIC_FONT }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. LE SCHÉMA GÉOMÉTRIQUE EN VIS-À-VIS (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Main Visual Figure Card */}
          <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col items-center">
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-sm sm:text-base font-semibold text-indigo-300">
                1. الشكل الهندسي التفاعلي : المستقيمان (d) و (d') والقاطع (Δ)
              </span>
              <span
                dir="ltr"
                className="text-xs sm:text-sm text-amber-200 bg-amber-500/15 border border-amber-400/40 px-3 py-1 rounded-lg font-normal"
                style={{ fontFamily: CLEAN_LABEL_FONT }}
              >
                A1 = {angleDeg}° &nbsp;|&nbsp; A4 = {180 - angleDeg}°
              </span>
            </div>

            {/* Pure LTR SVG so (d'), (Δ), and all coordinates never flip or overlap */}
            <svg
              dir="ltr"
              viewBox="0 0 500 250"
              className="w-full h-auto max-h-[260px] select-none my-1"
            >
              {/* Interior Zone subtle background */}
              <rect x="35" y="78" width="430" height="108" fill="#1e293b" fillOpacity="0.35" />

              {/* Parallel Line (d) */}
              <line x1="35" y1="78" x2="465" y2="78" stroke="#818cf8" strokeWidth="3" />
              <text
                x="50"
                y="62"
                fill="#c7d2fe"
                fontFamily={CLEAN_LABEL_FONT}
                fontSize="16"
                fontWeight="500"
                direction="ltr"
              >
                (d)
              </text>

              {/* Parallel Line (d') */}
              <line x1="35" y1="186" x2="465" y2="186" stroke="#34d399" strokeWidth="3" />
              <text
                x="50"
                y="170"
                fill="#a7f3d0"
                fontFamily={CLEAN_LABEL_FONT}
                fontSize="16"
                fontWeight="500"
                direction="ltr"
              >
                (d')
              </text>

              {/* Transversal Line (Δ) */}
              <line
                x1={pA.x + dx * 0.52}
                y1={pA.y - dy * 0.52}
                x2={pB.x - dx * 0.52}
                y2={pB.y + dy * 0.52}
                stroke="#fbbf24"
                strokeWidth="2.8"
              />
              <text
                x={pA.x + dx * 0.52 + 12}
                y={pA.y - dy * 0.52 + 6}
                fill="#fde68a"
                fontFamily={CLEAN_LABEL_FONT}
                fontSize="16"
                fontWeight="500"
                textAnchor="start"
                direction="ltr"
              >
                (Δ)
              </text>

              {/* Right angle square markers when angleDeg === 90 */}
              {angleDeg === 90 && (
                <>
                  <rect
                    x={pA.x}
                    y={pA.y - 15}
                    width="15"
                    height="15"
                    fill="#fbbf24"
                    fillOpacity="0.25"
                    stroke="#fde68a"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={pB.x}
                    y={pB.y - 15}
                    width="15"
                    height="15"
                    fill="#fbbf24"
                    fillOpacity="0.25"
                    stroke="#fde68a"
                    strokeWidth="1.5"
                  />
                </>
              )}

              {/* All 8 angle badges with high contrast and clear separation */}
              {renderBadge(A1, 'A1')}
              {renderBadge(A2, 'A2')}
              {renderBadge(A3, 'A3')}
              {renderBadge(A4, 'A4')}
              {renderBadge(B1, 'B1')}
              {renderBadge(B2, 'B2')}
              {renderBadge(B3, 'B3')}
              {renderBadge(B4, 'B4')}

              {/* Intersection vertices A and B */}
              <circle cx={pA.x} cy={pA.y} r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx={pB.x} cy={pB.y} r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
            </svg>

            {/* DEDICATED HTML RESULT BANNER (outside SVG so Arabic & LTR Math never scramble) */}
            <div className="w-full mt-4 bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center space-y-1.5">
              {mode === 'opposite' && (
                <>
                  <div className="text-xs sm:text-sm text-purple-200 font-normal">
                    الزاويتان المتقابلتان بالرأس متقايستان دائماً (دون شرط توازي) :
                  </div>
                  <div
                    dir="ltr"
                    className="text-sm sm:text-base font-semibold text-white tracking-wide"
                    style={{ fontFamily: CLEAN_LABEL_FONT }}
                  >
                    ∠A1 = ∠A3 = {angleDeg}° &nbsp;&nbsp;|&nbsp;&nbsp; ∠B1 = ∠B3 = {angleDeg}°
                  </div>
                </>
              )}

              {mode === 'corresponding' && (
                <>
                  <div className="text-xs sm:text-sm text-emerald-200 font-normal">
                    الزاويتان المتماثلتان (في نفس الجهة من القاطع، خارجية وداخلية) متقايستان عند التوازي :
                  </div>
                  <div
                    dir="ltr"
                    className="text-sm sm:text-base font-semibold text-emerald-300 tracking-wide"
                    style={{ fontFamily: CLEAN_LABEL_FONT }}
                  >
                    (d) ∥ (d') &nbsp;⟺&nbsp; ∠A1 = ∠B1 = {angleDeg}°
                  </div>
                </>
              )}

              {mode === 'alternate' && (
                <>
                  <div className="text-xs sm:text-sm text-sky-200 font-normal">
                    الزاويتان المتبادلتان داخلياً (A3, B1) والمتبادلتان خارجياً (A1, B3) متقايستان عند التوازي :
                  </div>
                  <div
                    dir="ltr"
                    className="text-sm sm:text-base font-semibold text-white tracking-wide"
                    style={{ fontFamily: CLEAN_LABEL_FONT }}
                  >
                    <span className="text-rose-300">∠A3 = ∠B1 = {angleDeg}°</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span className="text-sky-300">∠A1 = ∠B3 = {angleDeg}°</span>
                  </div>
                </>
              )}

              {mode === 'supp_comp' && (
                <>
                  <div className="text-xs sm:text-sm text-amber-200 font-normal">
                    زاوية مستقيمة على القاطع (Δ) ومنه الزاويتان الداخليتان من نفس الجهة متكاملتان (مجموعهما 180°) :
                  </div>
                  <div
                    dir="ltr"
                    className="text-sm sm:text-base font-semibold text-amber-300 tracking-wide"
                    style={{ fontFamily: CLEAN_LABEL_FONT }}
                  >
                    ∠A1 + ∠A4 = 180° &nbsp;⟹&nbsp; ∠B1 + ∠A4 = {angleDeg}° + {180 - angleDeg}° = 180°
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Separate Interactive Controls Card Below Figure */}
          <div className="no-pdf bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div>
              <div className="text-xs text-slate-400 mb-2 font-normal">
                اختر نوع العلاقة الزاوية لإبرازها على الشكل :
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'opposite' as const, label: '1. متقابلتان بالرأس (A1 و A3)' },
                  { id: 'corresponding' as const, label: '2. متماثلتان (A1 و B1)' },
                  { id: 'alternate' as const, label: '3. متبادلتان داخلياً وخارجياً' },
                  { id: 'supp_comp' as const, label: '4. متكاملتان (180°) ومتتامتان (90°)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMode(tab.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-normal border text-right transition-all cursor-pointer ${
                      mode === tab.id
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-xs'
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-2 font-normal">
                  <span className="text-slate-300">تغيير ميل القاطع (Δ) :</span>
                  <span
                    dir="ltr"
                    className="text-amber-300"
                    style={{ fontFamily: CLEAN_LABEL_FONT }}
                  >
                    {angleDeg}°
                  </span>
                </div>
                <input
                  type="range"
                  min="44"
                  max="90"
                  step="2"
                  value={angleDeg}
                  onChange={(e) => setAngleDeg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setAngleDeg(angleDeg === 90 ? 62 : 90);
                  setMode('supp_comp');
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-normal bg-amber-500/15 border border-amber-400/40 text-amber-200 hover:bg-amber-500/25 transition-colors shrink-0 cursor-pointer"
              >
                {angleDeg === 90 ? 'إرجاع القاطع مائلاً (62°)' : 'اختبار حالة التعامد (90°)'}
              </button>
            </div>
          </div>
        </div>

        {/* 2. MOURAJA3A SARI3A (PRÉREQUIS 2AM) & LECTURE DU SCHÉMA EN VIS-À-VIS (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/90 border border-indigo-500/35 rounded-2xl p-5 space-y-3.5">
            <div className="text-sm sm:text-base font-semibold text-indigo-300">
              مراجعة سريعة (مكتسبات السنة الثانية متوسط) :
            </div>
            <ul className="text-xs sm:text-sm text-slate-200 space-y-3 leading-relaxed font-normal">
              <li>
                • <span className="text-purple-300">الزاويتان المتقابلتان بالرأس :</span> تشتركان في الرأس وضلعا إحداهما امتداد لضلعَي الأخرى (مثل{' '}
                <span dir="ltr" className="text-white px-1" style={{ fontFamily: CLEAN_LABEL_FONT }}>
                  A1, A3
                </span>
                )، وهما متقايستان دائماً دون أي شرط توازي.
              </li>
              <li>
                • <span className="text-amber-300">الزاويتان المتتامتان والمتكاملتان :</span> المتتامتان مجموع قيسيهما{' '}
                <span dir="ltr" className="text-white" style={{ fontFamily: CLEAN_LABEL_FONT }}>
                  90°
                </span>{' '}
                (زاوية قائمة)، والمتكاملتان مجموع قيسيهما{' '}
                <span dir="ltr" className="text-white" style={{ fontFamily: CLEAN_LABEL_FONT }}>
                  180°
                </span>{' '}
                (زاوية مستقيمة على خط واحد مثل{' '}
                <span dir="ltr" className="text-white" style={{ fontFamily: CLEAN_LABEL_FONT }}>
                  ∠A1 + ∠A4 = 180°
                </span>
                ).
              </li>
              <li>
                • <span className="text-emerald-300">الزوايا المرتبطة بالقاطع (Δ) على الشكل :</span>
                <div className="mt-2 pr-3 space-y-2 text-xs sm:text-[13px] text-slate-300 border-r-2 border-slate-700">
                  <div>
                    <span className="text-emerald-300">متماثلتان :</span> في نفس الجهة من القاطع، إحداهما خارجية والأخرى داخلية (
                    <span dir="ltr" className="text-white" style={{ fontFamily: CLEAN_LABEL_FONT }}>
                      A1, B1
                    </span>
                    ).
                  </div>
                  <div>
                    <span className="text-rose-300">متبادلتان داخلياً :</span> في جهتين مختلفتين من القاطع وداخل الحيز بين المستقيمين (
                    <span dir="ltr" className="text-white" style={{ fontFamily: CLEAN_LABEL_FONT }}>
                      A3, B1
                    </span>
                    ).
                  </div>
                  <div>
                    <span className="text-sky-300">متبادلتان خارجياً :</span> في جهتين مختلفتين من القاطع وخارج الحيز بين المستقيمين (
                    <span dir="ltr" className="text-white" style={{ fontFamily: CLEAN_LABEL_FONT }}>
                      A1, B3
                    </span>
                    ).
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
