import React, { useState } from 'react';
import { MathView, formatTextWithSuperscripts } from './MathView';

interface PresetTriangle {
  id: string;
  label: string;
  vertices: [string, string, string]; // [RightOrOppositeVertex, Vertex2, Vertex3] where [Vertex2, Vertex3] is longest side
  side1Name: string;
  side1: number;
  side2Name: string;
  side2: number;
  longestName: string;
  longest: number;
}

const PRESETS: PresetTriangle[] = [
  {
    id: 'start-6-8-10',
    label: 'وضعية الانطلاق (6 , 8 , 10)',
    vertices: ['A', 'B', 'C'],
    side1Name: 'AB',
    side1: 6,
    side2Name: 'AC',
    side2: 8,
    longestName: 'BC',
    longest: 10,
  },
  {
    id: 'guided-9-12-15',
    label: 'مثال موجه 1 : قائم (9 , 12 , 15)',
    vertices: ['A', 'B', 'C'],
    side1Name: 'AB',
    side1: 9,
    side2Name: 'AC',
    side2: 12,
    longestName: 'BC',
    longest: 15,
  },
  {
    id: 'guided-5-6-8',
    label: 'مثال موجه 2 : غير قائم (5 , 6 , 8)',
    vertices: ['D', 'E', 'F'],
    side1Name: 'DE',
    side1: 5,
    side2Name: 'DF',
    side2: 6,
    longestName: 'EF',
    longest: 8,
  },
  {
    id: 'triple-5-12-13',
    label: 'ثلاثية شهيرة (5 , 12 , 13)',
    vertices: ['N', 'M', 'P'],
    side1Name: 'MN',
    side1: 5,
    side2Name: 'NP',
    side2: 12,
    longestName: 'MP',
    longest: 13,
  },
];

const FIG_SHAPE = '#5B7BC0'; // --fig-shape : forme principale (bleu)
const FIG_MARK = '#F5A54A';  // --fig-mark  : éléments démontrés (orange)
const TEXT_COLOR = '#4A4A4A';

export const ConversePythagoreanLab: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('start-6-8-10');
  const [constructionStep, setConstructionStep] = useState<1 | 2>(2);

  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];
  const [vTop, vLeft, vRight] = currentPreset.vertices;

  const sqLongest = currentPreset.longest * currentPreset.longest;
  const sqSide1 = currentPreset.side1 * currentPreset.side1;
  const sqSide2 = currentPreset.side2 * currentPreset.side2;
  const sumSquares = sqSide1 + sqSide2;
  const isRightTriangle = sqLongest === sumSquares;

  // Law of cosines to compute true angle at vTop in degrees for accurate SVG rendering
  const cosAngle =
    (sqSide1 + sqSide2 - sqLongest) / (2 * currentPreset.side1 * currentPreset.side2);
  const clampedCos = Math.max(-0.95, Math.min(0.95, cosAngle));
  const angleDeg = Math.round((Math.acos(clampedCos) * 180) / Math.PI);

  // Compute coordinates of triangle in SVG (280 x 175)
  // Base [vLeft, vRight] horizontal from x=45 to x=235 at y=135
  const xL = 45;
  const yL = 135;
  const xR = 235;
  const yR = 135;
  const basePx = xR - xL; // 190px represents currentPreset.longest

  const scale = basePx / currentPreset.longest;
  const r1 = currentPreset.side1 * scale;
  const r2 = currentPreset.side2 * scale;

  // Intersection of circle(vLeft, r1) and circle(vRight, r2)
  const d = basePx;
  const aProj = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const hProj = Math.sqrt(Math.max(16, r1 * r1 - aProj * aProj));
  const xT = xL + aProj;
  const yT = yL - hProj;

  return (
    <div className="my-6 rounded-[16px] border border-[#E5DDD5] bg-[#F6F0EB]/50 p-4 sm:p-6 space-y-6" dir="rtl">
      {/* Header + Preset Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DDD5] pb-4">
        <div>
          <div className="text-xs font-bold text-[#C94BA6]">
            وضعية الانطلاق والمحاكاة البصرية — عكس خاصية فيثاغورس
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#4A4A4A]">
            كيف نتحقق هل المثلث قائم الزاوية بمعرفة أطوال أضلاعه الثلاثة فقط؟
          </h3>
        </div>

        {/* Construction step toggle (Spec 4 - Figures progressives) */}
        <div className="no-pdf flex items-center gap-1 bg-white p-1 rounded-[10px] border border-[#E5DDD5] text-xs">
          <button
            type="button"
            onClick={() => setConstructionStep(1)}
            className={`px-2.5 py-1 rounded-[8px] font-bold cursor-pointer transition-colors ${
              constructionStep === 1
                ? 'bg-[#C94BA6] text-white'
                : 'text-[#4A4A4A] hover:text-[#C94BA6]'
            }`}
          >
            1. الشكل الأساسي (الأطوال)
          </button>
          <button
            type="button"
            onClick={() => setConstructionStep(2)}
            className={`px-2.5 py-1 rounded-[8px] font-bold cursor-pointer transition-colors ${
              constructionStep === 2
                ? 'bg-[#C94BA6] text-white'
                : 'text-[#4A4A4A] hover:text-[#C94BA6]'
            }`}
          >
            2. عناصر البرهان والنتيجة
          </button>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="no-pdf flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const active = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border transition-all cursor-pointer ${
                active
                  ? 'bg-[#C94BA6] text-white border-[#C94BA6]'
                  : 'bg-white text-[#4A4A4A] border-[#E5DDD5] hover:border-[#C94BA6]/50'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Figure + 4-Step Method */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Right in RTL (7 cols): Step-by-step discovery & verification */}
        <div className="md:col-span-7 space-y-3 text-sm text-[#4A4A4A] leading-[1.9]">
          <div className="p-3.5 rounded-[12px] bg-white border border-[#E5DDD5] space-y-2">
            <div className="font-bold text-[#C94BA6] text-xs">
              ① الخطوة 1 : تحديد أكبر ضلع في المثلث {vTop}
              {vLeft}
              {vRight}
            </div>
            <p className="text-xs sm:text-sm">
              في المثلث القائم يكون <strong>الوتر هو أكبر ضلع</strong>. لذا نبدأ دائماً بتحديد أطول ضلع من بين الأضلاع الثلاثة :
            </p>
            <div className="flex items-center justify-between gap-2 bg-[#F6F0EB]/60 px-3 py-1.5 rounded-[8px] border border-[#E5DDD5]">
              <div dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                <MathView math={`${currentPreset.longestName} = ${currentPreset.longest}\\text{ cm}`} />
              </div>
              <span className="text-[11px] text-[#8C8C8C]">
                [أكبر ضلع في المثلث {vTop}{vLeft}{vRight}]
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-[12px] bg-white border border-[#E5DDD5] space-y-2">
            <div className="font-bold text-[#C94BA6] text-xs">
              ② و ③ الخطوة 2 و 3 : الحساب المنفصل (دون وضع علامة = مسبقاً)
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 bg-[#F6F0EB]/60 px-3 py-1.5 rounded-[8px] border border-[#E5DDD5]">
                <div dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                  <MathView
                    math={`${currentPreset.longestName}^2 = ${currentPreset.longest}^2 = ${sqLongest}`}
                  />
                </div>
                <span className="text-[11px] text-[#8C8C8C]">[مربع أكبر ضلع لوحده]</span>
              </div>

              <div className="flex items-center justify-between gap-2 bg-[#F6F0EB]/60 px-3 py-1.5 rounded-[8px] border border-[#E5DDD5]">
                <div dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                  <MathView
                    math={`${currentPreset.side1Name}^2 + ${currentPreset.side2Name}^2 = ${currentPreset.side1}^2 + ${currentPreset.side2}^2 = ${sqSide1} + ${sqSide2} = ${sumSquares}`}
                  />
                </div>
                <span className="text-[11px] text-[#8C8C8C]">[مجموع مربعي الضلعين الآخرين]</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-[12px] bg-white border border-[#C94BA6]/40 space-y-1.5">
            <div className="font-bold text-[#C94BA6] text-xs">
              ④ الخطوة 4 : المقارنة والاستنتاج الهندسي
            </div>
            {isRightTriangle ? (
              <>
                <p className="text-xs sm:text-sm">
                  بما أن{' '}
                  <strong dir="ltr" className="inline-block">
                    {currentPreset.longestName}² = {currentPreset.side1Name}² + {currentPreset.side2Name}² = {sqLongest}
                  </strong>
                  ، فحسب <strong>عكس خاصية فيثاغورس</strong> :
                </p>
                <p className="font-bold text-[#4A4A4A] text-sm pt-1">
                  المثلث {vTop}{vLeft}{vRight} قائم الزاوية في الرأس {vTop} المقابل لأكبر ضلع [{currentPreset.longestName}] (أي <span dir="ltr">{vTop}̂ = 90°</span>).
                </p>
              </>
            ) : (
              <>
                <p className="text-xs sm:text-sm">
                  نلاحظ أن{' '}
                  <strong dir="ltr" className="inline-block">
                    {sqLongest} ≠ {sumSquares}
                  </strong>{' '}
                  أي أن{' '}
                  <strong dir="ltr" className="inline-block">
                    {currentPreset.longestName}² ≠ {currentPreset.side1Name}² + {currentPreset.side2Name}²
                  </strong>{' '}
                  (العلاقة غير محققة) :
                </p>
                <p className="font-bold text-[#4A4A4A] text-sm pt-1">
                  المثلث {vTop}{vLeft}{vRight} ليس مثلثاً قائم الزاوية.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Left in RTL (5 cols): Canonical SVG Figure (--fig-shape #5B7BC0 & --fig-mark #F5A54A) */}
        <div className="md:col-span-5">
          <figure className="bg-white border border-[#E5DDD5] rounded-[12px] p-4 flex flex-col items-center justify-center">
            <svg dir="ltr" viewBox="0 0 280 180" className="w-full max-w-[260px] h-auto">
              {/* Main triangle in --fig-shape (#5B7BC0) */}
              <polygon
                points={`${xL},${yL} ${xR},${yR} ${xT},${yT}`}
                fill={FIG_SHAPE}
                fillOpacity="0.08"
                stroke={FIG_SHAPE}
                strokeWidth="2.2"
              />

              {/* Step 2: Highlight longest side and demonstrated angle at vTop in --fig-mark (#F5A54A) */}
              {constructionStep === 2 && (
                <>
                  {/* Longest side highlighted in --fig-mark */}
                  <line
                    x1={xL}
                    y1={yL}
                    x2={xR}
                    y2={yR}
                    stroke={FIG_MARK}
                    strokeWidth="3.2"
                  />
                  {/* Angle marker at vTop */}
                  <circle
                    cx={xT}
                    cy={yT}
                    r="9"
                    fill={FIG_MARK}
                    fillOpacity="0.28"
                    stroke={FIG_MARK}
                    strokeWidth="1.8"
                  />
                  <text
                    x={xT}
                    y={yT - 14}
                    textAnchor="middle"
                    fill={FIG_MARK}
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {vTop} ({isRightTriangle ? '90°' : `≈ ${angleDeg}° ≠ 90°`})
                  </text>
                </>
              )}

              {constructionStep === 1 && (
                <text
                  x={xT}
                  y={yT - 10}
                  textAnchor="middle"
                  fill={TEXT_COLOR}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {vTop} (؟)
                </text>
              )}

              {/* Vertices */}
              <circle cx={xL} cy={yL} r="3.5" fill={FIG_SHAPE} />
              <text x={xL - 14} y={yL + 5} fill={TEXT_COLOR} fontSize="12" fontWeight="bold">
                {vLeft}
              </text>

              <circle cx={xR} cy={yR} r="3.5" fill={FIG_SHAPE} />
              <text x={xR + 8} y={yR + 5} fill={TEXT_COLOR} fontSize="12" fontWeight="bold">
                {vRight}
              </text>

              <circle cx={xT} cy={yT} r="4" fill={constructionStep === 2 ? FIG_MARK : FIG_SHAPE} />

              {/* Side length labels */}
              <text
                x={(xL + xT) / 2 - 18}
                y={(yL + yT) / 2 - 4}
                textAnchor="middle"
                fill={FIG_SHAPE}
                fontSize="11"
                fontWeight="bold"
              >
                {currentPreset.side1} cm
              </text>

              <text
                x={(xR + xT) / 2 + 22}
                y={(yR + yT) / 2 - 4}
                textAnchor="middle"
                fill={FIG_SHAPE}
                fontSize="11"
                fontWeight="bold"
              >
                {currentPreset.side2} cm
              </text>

              <text
                x={(xL + xR) / 2}
                y={yL + 20}
                textAnchor="middle"
                fill={constructionStep === 2 ? FIG_MARK : FIG_SHAPE}
                fontSize="11.5"
                fontWeight="bold"
              >
                أكبر ضلع : {currentPreset.longestName} = {currentPreset.longest} cm
              </text>
            </svg>

            <figcaption className="text-[11px] text-[#4A4A4A]/85 text-center mt-2 leading-snug">
              {formatTextWithSuperscripts(
                isRightTriangle
                  ? `المثلث ${vTop}${vLeft}${vRight} يحقق ${currentPreset.longestName}² = ${currentPreset.side1Name}² + ${currentPreset.side2Name}² فهو قائم في ${vTop}`
                  : `المثلث ${vTop}${vLeft}${vRight} فيه ${currentPreset.longestName}² ≠ ${currentPreset.side1Name}² + ${currentPreset.side2Name}² فهو غير قائم`
              )}
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Summary Comparison Card: Direct Pythagoras vs Converse Pythagoras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E5DDD5]">
        <div className="p-3.5 rounded-[12px] bg-white border border-[#E5DDD5] space-y-1">
          <div className="text-xs font-bold text-[#C94BA6]">
            أعرف أن المثلث قائم وأبحث عن طول ضلع؟
          </div>
          <p className="text-xs text-[#4A4A4A] leading-relaxed">
            ← أستعمل <strong>خاصية فيثاغورس المباشرة</strong> (الدرس 20) لحساب طول الضلع الثالث.
          </p>
        </div>

        <div className="p-3.5 rounded-[12px] bg-white border border-[#C94BA6] space-y-1">
          <div className="text-xs font-bold text-[#C94BA6]">
            لا أعرف هل هو قائم، لكن أعرف أطوال أضلاعه الثلاثة؟
          </div>
          <p className="text-xs text-[#4A4A4A] leading-relaxed">
            ← أستعمل <strong>عكس خاصية فيثاغورس</strong> (الدرس 21) للتحقق من وجود الزاوية القائمة.
          </p>
        </div>
      </div>
    </div>
  );
};
