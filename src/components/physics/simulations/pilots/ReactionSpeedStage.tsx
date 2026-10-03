import React from 'react';
import { SimulationStageProps } from '../types';
import {
  ReactionSpeedMetrics,
  ReactionSpeedParams,
} from './reactionSpeedModel';
import { Eye, Sparkles, Activity, Thermometer, Layers } from 'lucide-react';

/**
 * Scène interactive du Cours 06 : العوامل المؤثرة في التفاعل الكيميائي
 * Compare en temps réel le Bécher Témoin (25 °C, Comprimé entier ×1) et le Bécher Expérimental
 * réglé par l'élève (Température T & Surface de contact S), avec modèle microscopique des chocs efficaces.
 */
export const ReactionSpeedStage: React.FC<
  SimulationStageProps<ReactionSpeedMetrics, ReactionSpeedParams>
> = ({ state, pedagogy }) => {
  const {
    metrics,
    progress,
    elapsedTime,
    representationMode,
    reducedMotion,
    status,
    history,
  } = state;

  const showMacro =
    representationMode === 'macroscopic' || representationMode === 'both';
  const showMicro =
    representationMode === 'microscopic' || representationMode === 'both';

  const isCold = metrics.temperatureCelsius < 20;
  const isHot = metrics.temperatureCelsius >= 40;
  const solidScale = Math.max(0, metrics.solidRemainingPercent / 100);
  const refSolidScale = Math.max(
    0,
    (100 - metrics.referenceAdvancementPercent) / 100
  );

  // Déphasage d'animation des bulles et particules (désactivé en reducedMotion)
  const animPhase =
    !reducedMotion && status === 'running'
      ? (elapsedTime * 22 * metrics.relativeSpeedMultiplier) % 44
      : 18;
  const refAnimPhase =
    !reducedMotion && status === 'running' ? (elapsedTime * 22) % 44 : 18;

  // Dimensions du graphique dynamique (Avancement % = f(Temps))
  const chartWidth = 240;
  const chartHeight = 92;
  const chartX0 = 46;
  const chartY0 = 116;

  const activePolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const val = pt.values.Active ?? 0;
      const y = chartY0 - (val / 100) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const refPolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const val = pt.values.Reference ?? 0;
      const y = chartY0 - (val / 100) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const currentChartX = chartX0 + progress * chartWidth;
  const currentChartYActive =
    chartY0 - (metrics.advancementPercent / 100) * chartHeight;
  const currentChartYRef =
    chartY0 - (metrics.referenceAdvancementPercent / 100) * chartHeight;

  const surfaceLabelFr =
    metrics.surfaceDivisionFactor >= 4
      ? 'Poudre fine (×4)'
      : metrics.surfaceDivisionFactor >= 2
      ? 'Fragmenté (×2)'
      : 'Comprimé entier (×1)';

  return (
    <div className="space-y-4">
      {/* ================================================================== */}
      {/* 1. NIVEAU MACROSCOPIQUE : Bécher Témoin vs Bécher Expérimental     */}
      {/* ================================================================== */}
      {showMacro && (
        <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
              <Eye className="w-4 h-4 shrink-0" />
              <span>
                المستوى العياني (مقارنة الكأس الشاهد مع الكأس المضبوط) · Niveau macroscopique
              </span>
            </div>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-[6px] bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F766E]"
            >
              T = {metrics.temperatureCelsius} °C · {surfaceLabelFr} · Vitesse ×
              {metrics.relativeSpeedMultiplier}
            </span>
          </div>

          <svg
            viewBox="0 0 680 285"
            role="img"
            aria-label="مقارنة تفاعل القرص الفوار في الكأس الشاهد والكأس التجريبي حسب درجة الحرارة وسطح التلامس"
            className="w-full max-w-2xl mx-auto h-auto select-none"
            style={{ direction: 'ltr' }}
          >
            <title>
              Comparaison cinétique : Bécher Témoin (25 °C, Comprimé ×1) vs Bécher Expérimental
            </title>

            <rect
              x="4"
              y="4"
              width="672"
              height="277"
              rx="12"
              fill="#FAF7F4"
              stroke="#E2D9D0"
            />

            {/* ============================================================ */}
            {/* BÉCHER A (GAUCHE) : EXPÉRIENCE TÉMOIN (25 °C · Comprimé ×1)  */}
            {/* ============================================================ */}
            <g transform="translate(24, 18)">
              <rect
                x="0"
                y="0"
                width="296"
                height="248"
                rx="10"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />
              <rect
                x="0"
                y="0"
                width="296"
                height="32"
                rx="10"
                fill="#F1F5F9"
              />
              <text
                x="148"
                y="20"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#334155"
              >
                الكأس الشاهد (A) · Témoin (25 °C · Comprimé ×1)
              </text>

              {/* Corps du bécher témoin */}
              <rect
                x="56"
                y="58"
                width="136"
                height="148"
                rx="8"
                fill="#E0F2FE"
                fillOpacity="0.65"
                stroke="#475569"
                strokeWidth="2.2"
              />
              {/* Niveau d'eau */}
              <line
                x1="58"
                y1="82"
                x2="190"
                y2="82"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Comprimé entier au fond du bécher témoin */}
              {refSolidScale > 0.02 && (
                <g
                  transform={`translate(124, 192) scale(${Math.max(
                    0.2,
                    refSolidScale
                  )})`}
                >
                  <rect
                    x="-28"
                    y="-10"
                    width="56"
                    height="12"
                    rx="6"
                    fill="#F8FAFC"
                    stroke="#64748B"
                    strokeWidth="1.8"
                  />
                  <text
                    x="0"
                    y="-1"
                    textAnchor="middle"
                    fontSize="7.5"
                    fontWeight="bold"
                    fill="#334155"
                  >
                    Comprimé
                  </text>
                </g>
              )}

              {/* Bulles d'effervescence (Témoin) */}
              {progress > 0 && refSolidScale > 0 && (
                <g fill="#0284C7" fillOpacity="0.55">
                  <circle cx="105" cy={175 - refAnimPhase} r="3.2" />
                  <circle cx="124" cy={160 - ((refAnimPhase + 14) % 40)} r="3.8" />
                  <circle cx="142" cy={178 - ((refAnimPhase + 26) % 40)} r="3.0" />
                  <circle cx="116" cy={135 - refAnimPhase * 0.7} r="3.5" />
                  <circle cx="134" cy={128 - refAnimPhase * 0.6} r="2.8" />
                </g>
              )}

              {/* Indicateurs numériques du Bécher A */}
              <rect
                x="202"
                y="64"
                width="82"
                height="54"
                rx="8"
                fill="#F8FAFC"
                stroke="#CBD5E1"
              />
              <text
                x="243"
                y="81"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="bold"
                fill="#64748B"
              >
                التقدم (A)
              </text>
              <text
                x="243"
                y="104"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fontFamily="monospace"
                fill="#334155"
              >
                {metrics.referenceAdvancementPercent.toFixed(0)}%
              </text>

              <rect
                x="202"
                y="128"
                width="82"
                height="54"
                rx="8"
                fill="#F8FAFC"
                stroke="#CBD5E1"
              />
              <text
                x="243"
                y="145"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="bold"
                fill="#64748B"
              >
                حجم الغاز
              </text>
              <text
                x="243"
                y="168"
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="bold"
                fontFamily="monospace"
                fill="#0284C7"
              >
                {metrics.referenceGasVolumeMl.toFixed(1)} mL
              </text>

              <text
                x="148"
                y="230"
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#475569"
              >
                المدة المرجعية التامة : t_réf = 12.0 s
              </text>
            </g>

            {/* ============================================================ */}
            {/* BÉCHER B (DROITE) : EXPÉRIENCE ACTIVE (T °C · Surface ×S)    */}
            {/* ============================================================ */}
            <g transform="translate(360, 18)">
              <rect
                x="0"
                y="0"
                width="296"
                height="248"
                rx="10"
                fill="#FFFFFF"
                stroke={isHot ? '#F59E0B' : isCold ? '#38BDF8' : '#0F766E'}
                strokeWidth="2"
              />
              <rect
                x="0"
                y="0"
                width="296"
                height="32"
                rx="10"
                fill={isHot ? '#FEF3C7' : isCold ? '#E0F2FE' : '#ECFDF5'}
              />
              <text
                x="148"
                y="20"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill={isHot ? '#B45309' : isCold ? '#0369A1' : '#0F766E'}
              >
                الكأس التجريبي (B) · ({metrics.temperatureCelsius} °C ·{' '}
                {surfaceLabelFr})
              </text>

              {/* Corps du bécher expérimental */}
              <rect
                x="56"
                y="58"
                width="136"
                height="148"
                rx="8"
                fill={isHot ? '#FEF3C7' : isCold ? '#DBEAFE' : '#CCFBF1'}
                fillOpacity="0.68"
                stroke="#0F766E"
                strokeWidth="2.4"
              />
              <line
                x1="58"
                y1="82"
                x2="190"
                y2="82"
                stroke="#0F766E"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Thermomètre latéral */}
              <rect
                x="30"
                y="68"
                width="10"
                height="112"
                rx="5"
                fill="#FFFFFF"
                stroke="#64748B"
                strokeWidth="1.3"
              />
              <circle
                cx="35"
                cy="182"
                r="8"
                fill={isHot ? '#EF4444' : isCold ? '#0284C7' : '#10B981'}
              />
              <rect
                x="32.5"
                y={175 - ((metrics.temperatureCelsius - 10) / 50) * 92}
                width="5"
                height={((metrics.temperatureCelsius - 10) / 50) * 92 + 6}
                rx="2.5"
                fill={isHot ? '#EF4444' : isCold ? '#0284C7' : '#10B981'}
              />
              <text
                x="35"
                y="204"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="bold"
                fontFamily="monospace"
                fill={isHot ? '#B91C1C' : isCold ? '#0369A1' : '#0F766E'}
              >
                {metrics.temperatureCelsius}°C
              </text>

              {/* Représentation du réactif solide selon surfaceDivisionFactor (1, 2 ou 4) */}
              {solidScale > 0.02 && (
                <g
                  transform={`translate(124, 192) scale(${Math.max(
                    0.2,
                    solidScale
                  )})`}
                >
                  {metrics.surfaceDivisionFactor === 1 && (
                    <g>
                      <rect
                        x="-28"
                        y="-10"
                        width="56"
                        height="12"
                        rx="6"
                        fill="#FFFFFF"
                        stroke="#0F766E"
                        strokeWidth="1.8"
                      />
                      <text
                        x="0"
                        y="-1"
                        textAnchor="middle"
                        fontSize="7.5"
                        fontWeight="bold"
                        fill="#0F766E"
                      >
                        ×1
                      </text>
                    </g>
                  )}

                  {metrics.surfaceDivisionFactor === 2 && (
                    <g fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.6">
                      <rect x="-38" y="-9" width="22" height="10" rx="4" />
                      <rect x="-10" y="-9" width="20" height="10" rx="4" />
                      <rect x="16" y="-9" width="22" height="10" rx="4" />
                    </g>
                  )}

                  {metrics.surfaceDivisionFactor >= 4 && (
                    <g fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.4">
                      {[
                        -44, -34, -24, -14, -4, 6, 16, 26, 36, 44, -39, -19, 1,
                        21, 39,
                      ].map((dx, i) => (
                        <circle
                          key={i}
                          cx={dx}
                          cy={i > 9 ? -9 : -3}
                          r="3.3"
                        />
                      ))}
                    </g>
                  )}
                </g>
              )}

              {/* Bulles d'effervescence proportionnelles à la vitesse de réaction */}
              {progress > 0 && solidScale > 0 && (
                <g fill="#0F766E" fillOpacity="0.68">
                  {Array.from({
                    length: Math.min(
                      16,
                      Math.max(3, Math.round(5 * metrics.relativeSpeedMultiplier))
                    ),
                  }).map((_, idx) => {
                    const bx = 72 + ((idx * 19) % 104);
                    const by =
                      176 - ((animPhase + idx * 11) % 86);
                    const br = 2.6 + (idx % 3) * 0.9;
                    return <circle key={idx} cx={bx} cy={by} r={br} />;
                  })}
                </g>
              )}

              {/* Indicateurs numériques du Bécher B */}
              <rect
                x="202"
                y="64"
                width="82"
                height="54"
                rx="8"
                fill="#ECFDF5"
                stroke="#6EE7B7"
              />
              <text
                x="243"
                y="81"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="bold"
                fill="#047857"
              >
                التقدم (B)
              </text>
              <text
                x="243"
                y="104"
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fontFamily="monospace"
                fill="#0F766E"
              >
                {metrics.advancementPercent.toFixed(0)}%
              </text>

              <rect
                x="202"
                y="128"
                width="82"
                height="54"
                rx="8"
                fill="#ECFDF5"
                stroke="#6EE7B7"
              />
              <text
                x="243"
                y="145"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="bold"
                fill="#047857"
              >
                حجم الغاز
              </text>
              <text
                x="243"
                y="168"
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="bold"
                fontFamily="monospace"
                fill="#0F766E"
              >
                {metrics.gasVolumeMl.toFixed(1)} mL
              </text>

              <text
                x="148"
                y="230"
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#0F766E"
              >
                المدة المقدرة لانتهاء التفاعل : t_fin ≈{' '}
                {metrics.estimatedCompletionSeconds} s
              </text>
            </g>
          </svg>

          {pedagogy.macroscopicWarningArabic && (
            <p className="text-xs text-[#4A4A4A] bg-[#FAF7F4] rounded-[8px] px-3 py-2 border border-[#E2D9D0] leading-relaxed">
              {pedagogy.macroscopicWarningArabic}
            </p>
          )}
        </div>
      )}

      {/* ================================================================== */}
      {/* 2. NIVEAU MICROSCOPIQUE : Agitation thermique & Chocs efficaces    */}
      {/* ================================================================== */}
      {showMicro && (
        <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#B45309]">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                المستوى المجهري المبسط (الاضطراب الحراري والتصادمات الفعالة) · Modèle microscopique
              </span>
            </div>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-2.5 py-0.5 rounded-[6px] border border-[#FDE68A]"
            >
              Chocs efficaces ≈ {metrics.effectiveCollisionsPerSec} / s · Agitation{' '}
              {metrics.thermalAgitationIndex}%
            </span>
          </div>

          <svg
            viewBox="0 0 680 185"
            role="img"
            aria-label="النموذج المجهري لحركة الجسيمات والتصادمات الفعالة حسب درجة الحرارة وسطح التلامس"
            className="w-full max-w-2xl mx-auto h-auto select-none"
            style={{ direction: 'ltr' }}
          >
            <title>
              Modèle microscopique : Agitation thermique et fréquence des chocs efficaces
            </title>

            <rect
              x="4"
              y="4"
              width="672"
              height="177"
              rx="12"
              fill="#FFFBEB"
              stroke="#FDE68A"
            />

            {/* Zone gauche : Fenêtre microscopique des collisions */}
            <rect
              x="16"
              y="16"
              width="400"
              height="152"
              rx="10"
              fill="#FFFFFF"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            <text
              x="216"
              y="34"
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="bold"
              fill="#92400E"
            >
              نافذة التصادمات المجهرية ({metrics.temperatureCelsius} °C ·{' '}
              {surfaceLabelFr})
            </text>

            {/* Particules du réactif solide (compact ×1 vs fragmenté ×2 vs poudre ×4) */}
            {metrics.surfaceDivisionFactor === 1 && (
              <g transform="translate(216, 112)">
                <rect
                  x="-54"
                  y="-18"
                  width="108"
                  height="36"
                  rx="8"
                  fill="#CCFBF1"
                  stroke="#0F766E"
                  strokeWidth="1.8"
                />
                {[-38, -19, 0, 19, 38].map((dx, i) => (
                  <g key={i}>
                    <circle
                      cx={dx}
                      cy="-7"
                      r="6.5"
                      fill="#0F766E"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                    <circle
                      cx={dx}
                      cy="7"
                      r="6.5"
                      fill="#14B8A6"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                  </g>
                ))}
                <text
                  x="0"
                  y="30"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#0F766E"
                >
                  قرص متماسك : الجسيمات الداخلية محجوبة عن التصادم
                </text>
              </g>
            )}

            {metrics.surfaceDivisionFactor === 2 && (
              <g transform="translate(216, 110)">
                {[-65, 0, 65].map((cxCluster, cIdx) => (
                  <g key={cIdx} transform={`translate(${cxCluster}, 0)`}>
                    <rect
                      x="-22"
                      y="-14"
                      width="44"
                      height="28"
                      rx="6"
                      fill="#CCFBF1"
                      stroke="#0F766E"
                      strokeWidth="1.5"
                    />
                    <circle cx="-9" cy="-5" r="5.5" fill="#0F766E" />
                    <circle cx="9" cy="-5" r="5.5" fill="#0F766E" />
                    <circle cx="-9" cy="6" r="5.5" fill="#14B8A6" />
                    <circle cx="9" cy="6" r="5.5" fill="#14B8A6" />
                  </g>
                ))}
                <text
                  x="0"
                  y="30"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#0F766E"
                >
                  قطع مجزأة (×2) : زيادة سطح التلامس المعرض للتصادمات
                </text>
              </g>
            )}

            {metrics.surfaceDivisionFactor >= 4 && (
              <g transform="translate(216, 102)">
                {[
                  { x: -120, y: -14 },
                  { x: -82, y: 6 },
                  { x: -45, y: -10 },
                  { x: -8, y: 10 },
                  { x: 32, y: -12 },
                  { x: 70, y: 8 },
                  { x: 112, y: -8 },
                  { x: -100, y: 18 },
                  { x: -24, y: -18 },
                  { x: 54, y: 18 },
                  { x: 96, y: 14 },
                ].map((pt, i) => (
                  <g key={i} transform={`translate(${pt.x}, ${pt.y})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r="6"
                      fill="#0F766E"
                      stroke="#99F6E4"
                      strokeWidth="1.5"
                    />
                    {/* Halo de choc efficace */}
                    <circle
                      cx="0"
                      cy="0"
                      r="10"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                    />
                  </g>
                ))}
                <text
                  x="0"
                  y="40"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#0F766E"
                >
                  مسحوق ناعم (×4) : جميع الحبيبات معرضة للتصادم المباشر في آن واحد!
                </text>
              </g>
            )}

            {/* Particules du liquide en agitation thermique avec vecteurs vitesse */}
            {[
              { x: 66, y: 62, vx: 14, vy: 8 },
              { x: 132, y: 56, vx: 12, vy: 12 },
              { x: 198, y: 64, vx: -10, vy: 14 },
              { x: 268, y: 58, vx: 14, vy: 10 },
              { x: 342, y: 66, vx: -14, vy: 9 },
              { x: 88, y: 112, vx: 15, vy: -6 },
              { x: 338, y: 114, vx: -15, vy: -7 },
            ].map((p, idx) => {
              const vScale = metrics.thermalAgitationIndex / 100;
              const dx = p.vx * vScale;
              const dy = p.vy * vScale;
              return (
                <g key={idx} transform={`translate(${p.x}, ${p.y})`}>
                  <line
                    x1="0"
                    y1="0"
                    x2={dx}
                    y2={dy}
                    stroke={isHot ? '#DC2626' : '#2563EB'}
                    strokeWidth="2"
                  />
                  <circle
                    cx={dx}
                    cy={dy}
                    r="2.2"
                    fill={isHot ? '#DC2626' : '#2563EB'}
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="5.2"
                    fill={isHot ? '#EF4444' : '#3B82F6'}
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* Zone droite : Compteur explicite de Chocs efficaces & Loi microscopique */}
            <rect
              x="428"
              y="16"
              width="236"
              height="152"
              rx="10"
              fill="#FFFFFF"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            <text
              x="546"
              y="38"
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="bold"
              fill="#92400E"
            >
              عداد التصادمات الفعالة (Chocs efficaces)
            </text>

            <rect
              x="444"
              y="48"
              width="204"
              height="48"
              rx="8"
              fill="#FEF3C7"
              stroke="#F59E0B"
            />
            <text
              x="546"
              y="67"
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fontFamily="monospace"
              fill="#B45309"
            >
              {metrics.effectiveCollisionsPerSec} chocs / s
            </text>
            <text
              x="546"
              y="86"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="bold"
              fill="#78350F"
            >
              مؤشر الاضطراب الحراري : {metrics.thermalAgitationIndex}%
            </text>

            <text
              x="546"
              y="116"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="bold"
              fill="#0F766E"
            >
              سرعة التفاعل النسبية : ×{metrics.relativeSpeedMultiplier}
            </text>
            <text
              x="546"
              y="136"
              textAnchor="middle"
              fontSize="9"
              fill="#475569"
            >
              كلما زادت درجة الحرارة أو تجزئة الصلب،
            </text>
            <text
              x="546"
              y="152"
              textAnchor="middle"
              fontSize="9"
              fontWeight="bold"
              fill="#B45309"
            >
              تضاعف عدد التصادمات الفعالة في الثانية!
            </text>
          </svg>

          {pedagogy.microscopicWarningArabic && (
            <p className="text-xs text-[#92400E] bg-[#FFFBEB] rounded-[8px] px-3 py-2 border border-[#FDE68A] leading-relaxed">
              {pedagogy.microscopicWarningArabic}
            </p>
          )}
        </div>
      )}

      {/* ================================================================== */}
      {/* 3. MESURES EN TEMPS RÉEL & GRAPHIQUE CINÉTIQUE COMPARATIF          */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Cartes de mesures en direct */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-2.5">
          {/* Carte 1 : Température & Agitation */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0F766E] flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span>درجة الحرارة</span>
              </span>
              <span
                dir="ltr"
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#ECFDF5] text-[#0F766E]"
              >
                Température
              </span>
            </div>
            <div
              dir="ltr"
              className="text-xl sm:text-2xl font-mono font-extrabold text-[#0F766E] my-1"
              data-testid="metric-temperature"
            >
              {metrics.temperatureCelsius} °C
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              اضطراب الجسيمات :{' '}
              <strong dir="ltr">{metrics.thermalAgitationIndex}%</strong>
            </div>
          </div>

          {/* Carte 2 : Surface de contact & Solide restant */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1D4ED8] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>سطح التلامس</span>
              </span>
              <span
                dir="ltr"
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8]"
              >
                Surface ×{metrics.surfaceDivisionFactor}
              </span>
            </div>
            <div
              dir="ltr"
              className="text-xl sm:text-2xl font-mono font-extrabold text-[#1D4ED8] my-1"
              data-testid="metric-advancement"
            >
              {metrics.advancementPercent.toFixed(0)} %
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              المتفاعل المتبقي :{' '}
              <strong dir="ltr">
                {metrics.solidRemainingPercent.toFixed(0)}%
              </strong>
            </div>
          </div>

          {/* Carte 3 : Chocs efficaces / s */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
            <span className="text-xs font-bold text-[#B45309]">
              التصادمات الفعالة (Chocs / s)
            </span>
            <div
              dir="ltr"
              className="text-base sm:text-lg font-mono font-extrabold text-[#B45309] my-1"
              data-testid="metric-collisions"
            >
              {metrics.effectiveCollisionsPerSec} chocs/s
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              سرعة نسبية :{' '}
              <strong dir="ltr">×{metrics.relativeSpeedMultiplier}</strong>
            </div>
          </div>

          {/* Carte 4 : Volume de gaz dégagé & Durée */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
            <span className="text-xs font-bold text-[#4A4A4A]">
              حجم الغاز المنطلق ومدة التفاعل
            </span>
            <div
              dir="ltr"
              className="text-base sm:text-lg font-mono font-extrabold text-[#0F766E] my-1"
            >
              V = {metrics.gasVolumeMl.toFixed(1)} mL
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              زمن النهاية المقدر :{' '}
              <strong dir="ltr">≈ {metrics.estimatedCompletionSeconds} s</strong>
            </div>
          </div>
        </div>

        {/* Graphique dynamique : Courbe Active vs Courbe Témoin */}
        <div className="lg:col-span-6 bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#F1ECE6] pb-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A]">
              <Activity className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>منحنى تقدم التفاعل x(t) مقارنة بالشاهد</span>
            </div>
            <span dir="ltr" className="text-[10px] font-mono text-[#6B6B6B]">
              Avancement (%) = f(Temps)
            </span>
          </div>

          <svg
            viewBox="0 0 310 140"
            role="img"
            aria-label="منحنى بياني لتقدم التفاعل الكيميائي بدلالة الزمن مقارنة بالتجربة الشاهدة"
            className="w-full h-auto"
            style={{ direction: 'ltr' }}
          >
            {/* Grille horizontale */}
            <line
              x1={chartX0}
              y1={chartY0 - chartHeight}
              x2={chartX0 + chartWidth}
              y2={chartY0 - chartHeight}
              stroke="#E2E8F0"
              strokeDasharray="3 3"
            />
            <line
              x1={chartX0}
              y1={chartY0 - chartHeight / 2}
              x2={chartX0 + chartWidth}
              y2={chartY0 - chartHeight / 2}
              stroke="#E2E8F0"
              strokeDasharray="3 3"
            />

            {/* Axes */}
            <line
              x1={chartX0}
              y1={chartY0}
              x2={chartX0 + chartWidth + 8}
              y2={chartY0}
              stroke="#475569"
              strokeWidth="1.5"
            />
            <line
              x1={chartX0}
              y1={chartY0}
              x2={chartX0}
              y2={chartY0 - chartHeight - 8}
              stroke="#475569"
              strokeWidth="1.5"
            />

            {/* Graduations Y */}
            <text
              x={chartX0 - 6}
              y={chartY0 + 3}
              textAnchor="end"
              fontSize="8.5"
              fontFamily="monospace"
              fill="#64748B"
            >
              0%
            </text>
            <text
              x={chartX0 - 6}
              y={chartY0 - chartHeight / 2 + 3}
              textAnchor="end"
              fontSize="8.5"
              fontFamily="monospace"
              fill="#64748B"
            >
              50%
            </text>
            <text
              x={chartX0 - 6}
              y={chartY0 - chartHeight + 3}
              textAnchor="end"
              fontSize="8.5"
              fontFamily="monospace"
              fill="#64748B"
            >
              100%
            </text>

            {/* Courbe Témoin (25 °C, ×1) en pointillés gris/ardoise */}
            <polyline
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeDasharray="4 3"
              points={refPolylinePoints}
            />
            {/* Courbe Expérimentale Active (T °C, ×S) */}
            <polyline
              fill="none"
              stroke="#0F766E"
              strokeWidth="2.6"
              points={activePolylinePoints}
            />

            {/* Marqueurs courants */}
            <circle
              cx={currentChartX}
              cy={currentChartYRef}
              r="3.2"
              fill="#64748B"
            />
            <circle
              cx={currentChartX}
              cy={currentChartYActive}
              r="4"
              fill="#0F766E"
            />

            {/* Légende */}
            <g transform="translate(56, 12)">
              <circle cx="0" cy="0" r="3.5" fill="#0F766E" />
              <text
                x="7"
                y="3"
                fontSize="8.5"
                fontWeight="bold"
                fill="#0F766E"
              >
                Expérience B ({metrics.temperatureCelsius}°C, ×
                {metrics.surfaceDivisionFactor})
              </text>

              <circle cx="148" cy="0" r="3.5" fill="#64748B" />
              <text
                x="155"
                y="3"
                fontSize="8.5"
                fontWeight="bold"
                fill="#64748B"
              >
                Témoin A (25°C, ×1)
              </text>
            </g>

            <text
              x={chartX0 + chartWidth / 2}
              y="135"
              textAnchor="middle"
              fontSize="8.5"
              fill="#64748B"
            >
              Progression temporelle t (0 → 12 s)
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
