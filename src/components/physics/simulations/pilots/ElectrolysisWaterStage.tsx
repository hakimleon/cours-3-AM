import React from 'react';
import { SimulationStageProps } from '../types';
import {
  ElectrolysisMetrics,
  ELECTROLYSIS_MAX_VOLUME_H2,
} from './electrolysisWaterModel';
import { Eye, Sparkles, Activity } from 'lucide-react';

/**
 * Dessin SVG d'une molécule d'eau H₂O (CPK simplifié niveau 3AM)
 */
const WaterMoleculeSvg: React.FC<{ x: number; y: number; faded?: boolean }> = ({
  x,
  y,
  faded = false,
}) => (
  <g transform={`translate(${x}, ${y})`} opacity={faded ? 0.22 : 1}>
    <line x1="0" y1="-4" x2="-11" y2="8" stroke="#475569" strokeWidth="2" />
    <line x1="0" y1="-4" x2="11" y2="8" stroke="#475569" strokeWidth="2" />
    <circle cx="0" cy="-4" r="9" fill="#DC2626" stroke="#991B1B" strokeWidth="1.4" />
    <text x="0" y="-1" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#FFFFFF" fontFamily="monospace">
      O
    </text>
    <circle cx="-11" cy="8" r="6.5" fill="#FFFFFF" stroke="#334155" strokeWidth="1.4" />
    <text x="-11" y="10.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
      H
    </text>
    <circle cx="11" cy="8" r="6.5" fill="#FFFFFF" stroke="#334155" strokeWidth="1.4" />
    <text x="11" y="10.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
      H
    </text>
  </g>
);

/**
 * Dessin SVG d'une molécule de dihydrogène H₂ (2 atomes H liés)
 */
const H2MoleculeSvg: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="-6.5" cy="0" r="6.8" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.6" />
    <circle cx="6.5" cy="0" r="6.8" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.6" />
    <text x="-6.5" y="2.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#0F766E" fontFamily="monospace">
      H
    </text>
    <text x="6.5" y="2.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#0F766E" fontFamily="monospace">
      H
    </text>
  </g>
);

/**
 * Dessin SVG d'une molécule de dioxygène O₂ (2 atomes O liés)
 */
const O2MoleculeSvg: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="-7.5" cy="0" r="8.2" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
    <circle cx="7.5" cy="0" r="8.2" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
    <text x="-7.5" y="3" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FFFFFF" fontFamily="monospace">
      O
    </text>
    <text x="7.5" y="3" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FFFFFF" fontFamily="monospace">
      O
    </text>
  </g>
);

export const ElectrolysisWaterStage: React.FC<SimulationStageProps<ElectrolysisMetrics>> = ({
  state,
  pedagogy,
}) => {
  const { metrics, progress, elapsedTime, status, representationMode, reducedMotion, history } = state;

  // Calcul des hauteurs de gaz dans les deux tubes gradués (max 20 unités = 100px)
  // Tube hauteur utile = 120px (de y=36 à y=156). 20 unités = 100px (5px par unité)
  const PIXELS_PER_UNIT = 5;
  const gasHeightH2 = Math.min(100, metrics.volumeH2 * PIXELS_PER_UNIT); // 0 -> 100px
  const gasHeightO2 = Math.min(100, metrics.volumeO2 * PIXELS_PER_UNIT); // 0 -> 50px

  const tubeTopY = 36;
  const tubeBottomY = 156;
  const tubeTotalHeight = tubeBottomY - tubeTopY; // 120px

  const waterTopH2 = tubeTopY + gasHeightH2;
  const waterHeightH2 = Math.max(0, tubeTotalHeight - gasHeightH2);

  const waterTopO2 = tubeTopY + gasHeightO2;
  const waterHeightO2 = Math.max(0, tubeTotalHeight - gasHeightO2);

  const isCircuitClosed = status === 'running' || progress > 0;
  const showBubbles = status === 'running' || (progress > 0 && progress < 1);

  // Décalage cyclique léger pour l'ascension des bulles (désactivé si reducedMotion ou paused)
  const bubblePhase = !reducedMotion && status === 'running' ? (elapsedTime * 38) % 48 : 0;

  // Positions de base des bulles de H2 (plus nombreuses : 6 bulles) et O2 (3 bulles)
  const h2BubbleOffsets = [0, 8, 16, 24, 32, 40];
  const o2BubbleOffsets = [0, 16, 32];

  const showMacro = representationMode === 'macroscopic' || representationMode === 'both';
  const showMicro = representationMode === 'microscopic' || representationMode === 'both';

  // Construction des coordonnées du graphique dynamique Volume = f(Temps)
  // Zone de tracé SVG : x de 44 à 294 (largeur 250px), y de 22 à 122 (hauteur 100px)
  const chartX0 = 44;
  const chartY0 = 122;
  const chartWidth = 246;
  const chartHeight = 96;

  const h2PolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const vH2 = pt.values.H2 ?? 0;
      const y = chartY0 - (vH2 / ELECTROLYSIS_MAX_VOLUME_H2) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const o2PolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const vO2 = pt.values.O2 ?? 0;
      const y = chartY0 - (vO2 / ELECTROLYSIS_MAX_VOLUME_H2) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const currentChartX = chartX0 + progress * chartWidth;
  const currentChartYH2 = chartY0 - (metrics.volumeH2 / ELECTROLYSIS_MAX_VOLUME_H2) * chartHeight;
  const currentChartYO2 = chartY0 - (metrics.volumeO2 / ELECTROLYSIS_MAX_VOLUME_H2) * chartHeight;

  return (
    <div className="space-y-4">
      {/* 1. NIVEAU MACROSCOPIQUE : Schéma interactif de l'électrolyseur */}
      {showMacro && (
        <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
              <Eye className="w-4 h-4 shrink-0" />
              <span>المستوى العياني (التجربة المخبرية) · Niveau macroscopique</span>
            </div>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-[6px] bg-[#FAF7F4] border border-[#E2D9D0] text-[#4A4A4A]"
            >
              2 H₂O(l) → 2 H₂(g) + O₂(g)
            </span>
          </div>

          <svg
            viewBox="0 0 680 286"
            role="img"
            aria-label="محاكاة تجربة التحليل الكهربائي للماء: أنبوب غاز ثنائي الهيدروجين H2 بحجم مضاعف وأنبوب غاز ثنائي الأكسجين O2 بنصف الحجم"
            className="w-full max-w-2xl mx-auto h-auto select-none"
            style={{ direction: 'ltr' }}
          >
            <title>Électrolyse de l’eau — Simulation interactive (V(H₂) = 2 × V(O₂))</title>
            <desc>
              Schéma interactif montrant une cuve contenant de l’eau, deux électrodes reliées à un générateur continu,
              et deux tubes gradués collectant le dihydrogène H₂ (2 volumes) et le dioxygène O₂ (1 volume).
            </desc>

            <defs>
              {/* Motif hachuré léger pour distinguer H₂ de O₂ sans dépendre uniquement de la couleur (Accessibilité) */}
              <pattern id="h2-gas-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#CCFBF1" />
                <path d="M 0 8 L 8 0" stroke="#0F766E" strokeWidth="0.6" strokeOpacity="0.28" />
              </pattern>
              <pattern id="o2-gas-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#E0F2FE" />
                <circle cx="4" cy="4" r="1" fill="#0284C7" fillOpacity="0.32" />
              </pattern>
              <clipPath id="left-tube-clip">
                <rect x="244" y="36" width="56" height="120" rx="26" />
              </clipPath>
              <clipPath id="right-tube-clip">
                <rect x="380" y="36" width="56" height="120" rx="26" />
              </clipPath>
            </defs>

            {/* Fond général */}
            <rect x="4" y="4" width="672" height="278" rx="12" fill="#FAF7F4" stroke="#E2D9D0" />

            {/* Cuve d'électrolyse (وعاء التحليل الكهربائي) */}
            <path
              d="M 196 72 L 196 184 Q 196 198 212 198 L 468 198 Q 484 198 484 184 L 484 72"
              fill="#BAE6FD"
              fillOpacity="0.65"
              stroke="#0284C7"
              strokeWidth="2.5"
            />
            {/* Surface de l'eau dans la cuve */}
            <line
              x1="198"
              y1="92"
              x2="482"
              y2="92"
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="340" y="138" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369A1">
              ماء + وسائط ناقلة (H₂O)
            </text>

            {/* ============================================================ */}
            {/* TUBE GAUCHE : Cathode (−) → Dihydrogène H₂ (0 → 20 unités)   */}
            {/* ============================================================ */}
            <g clipPath="url(#left-tube-clip)">
              {/* Zone de gaz H₂ accumulé en haut du tube */}
              <rect
                x="244"
                y={tubeTopY}
                width="56"
                height={gasHeightH2}
                fill="url(#h2-gas-pattern)"
              />
              {/* Zone d'eau restante dans le tube */}
              <rect
                x="244"
                y={waterTopH2}
                width="56"
                height={waterHeightH2}
                fill="#7DD3FC"
                fillOpacity="0.75"
              />
              {/* Ménisque / interface gaz-eau */}
              {metrics.volumeH2 > 0 && (
                <line
                  x1="244"
                  y1={waterTopH2}
                  x2="300"
                  y2={waterTopH2}
                  stroke="#0F766E"
                  strokeWidth="2.2"
                />
              )}

              {/* Bulles ascendantes de H₂ (2x plus nombreuses) */}
              {showBubbles &&
                h2BubbleOffsets.map((offset, idx) => {
                  const rawY = 148 - ((bubblePhase + offset) % 48);
                  const clampedY = Math.max(waterTopH2 + 5, rawY);
                  if (clampedY >= 152 || clampedY <= waterTopH2 + 3) return null;
                  const bx = 262 + (idx % 3) * 10;
                  return (
                    <circle
                      key={`h2-b-${idx}`}
                      cx={bx}
                      cy={clampedY}
                      r={idx % 2 === 0 ? 3.5 : 2.8}
                      fill="#FFFFFF"
                      stroke="#0F766E"
                      strokeWidth="1.3"
                    />
                  );
                })}
            </g>

            {/* Contour et graduations du tube H₂ */}
            <rect
              x="244"
              y={tubeTopY}
              width="56"
              height={tubeTotalHeight}
              rx="26"
              fill="none"
              stroke="#0F766E"
              strokeWidth="2.2"
            />
            {/* Graduations 5, 10, 15, 20 unités sur le tube H₂ */}
            {[5, 10, 15, 20].map((unitVal) => {
              const gy = tubeTopY + unitVal * PIXELS_PER_UNIT;
              return (
                <g key={`grad-h2-${unitVal}`}>
                  <line x1="244" y1={gy} x2="253" y2={gy} stroke="#0F766E" strokeWidth="1.3" />
                  <text x="239" y={gy + 3} textAnchor="end" fontSize="8.5" fontFamily="monospace" fontWeight="bold" fill="#0F766E">
                    {unitVal}
                  </text>
                </g>
              );
            })}

            {/* ============================================================ */}
            {/* TUBE DROIT : Anode (+) → Dioxygène O₂ (0 → 10 unités)        */}
            {/* ============================================================ */}
            <g clipPath="url(#right-tube-clip)">
              {/* Zone de gaz O₂ accumulé en haut du tube */}
              <rect
                x="380"
                y={tubeTopY}
                width="56"
                height={gasHeightO2}
                fill="url(#o2-gas-pattern)"
              />
              {/* Zone d'eau restante dans le tube */}
              <rect
                x="380"
                y={waterTopO2}
                width="56"
                height={waterHeightO2}
                fill="#7DD3FC"
                fillOpacity="0.75"
              />
              {/* Ménisque / interface gaz-eau */}
              {metrics.volumeO2 > 0 && (
                <line
                  x1="380"
                  y1={waterTopO2}
                  x2="436"
                  y2={waterTopO2}
                  stroke="#0284C7"
                  strokeWidth="2.2"
                />
              )}

              {/* Bulles ascendantes de O₂ */}
              {showBubbles &&
                o2BubbleOffsets.map((offset, idx) => {
                  const rawY = 148 - ((bubblePhase + offset) % 48);
                  const clampedY = Math.max(waterTopO2 + 5, rawY);
                  if (clampedY >= 152 || clampedY <= waterTopO2 + 3) return null;
                  const bx = 398 + (idx % 3) * 10;
                  return (
                    <circle
                      key={`o2-b-${idx}`}
                      cx={bx}
                      cy={clampedY}
                      r={idx % 2 === 0 ? 3.2 : 2.6}
                      fill="#FFFFFF"
                      stroke="#0284C7"
                      strokeWidth="1.3"
                    />
                  );
                })}
            </g>

            {/* Contour et graduations du tube O₂ */}
            <rect
              x="380"
              y={tubeTopY}
              width="56"
              height={tubeTotalHeight}
              rx="26"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.2"
            />
            {[5, 10, 15, 20].map((unitVal) => {
              const gy = tubeTopY + unitVal * PIXELS_PER_UNIT;
              return (
                <g key={`grad-o2-${unitVal}`}>
                  <line x1="427" y1={gy} x2="436" y2={gy} stroke="#0284C7" strokeWidth="1.3" />
                  <text x="441" y={gy + 3} textAnchor="start" fontSize="8.5" fontFamily="monospace" fontWeight="bold" fill="#0284C7">
                    {unitVal}
                  </text>
                </g>
              );
            })}

            {/* Électrodes (المسريان الكهربائيان) */}
            <rect x="267" y="152" width="10" height="46" rx="3" fill="#334155" />
            <rect x="403" y="152" width="10" height="46" rx="3" fill="#334155" />

            {/* Circuit électrique et Générateur DC */}
            <polyline
              points="272,198 272,242 314,242"
              fill="none"
              stroke="#0F766E"
              strokeWidth="2.5"
            />
            <polyline
              points="408,198 408,242 366,242"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.5"
            />

            {/* Générateur électrique G */}
            <circle
              cx="340"
              cy="242"
              r="20"
              fill={isCircuitClosed ? '#F0FDFA' : '#FFFFFF'}
              stroke={isCircuitClosed ? '#0F766E' : '#64748B'}
              strokeWidth="2.2"
            />
            <text x="340" y="247" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E293B">
              G
            </text>
            <text x="296" y="234" fontSize="14" fontWeight="bold" fill="#0F766E">
              (−)
            </text>
            <text x="382" y="234" fontSize="14" fontWeight="bold" fill="#DC2626">
              (+)
            </text>
            <text x="340" y="274" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#475569">
              {isCircuitClosed
                ? 'مولد تيار مستمر (الدارة مغلقة : يمر التيار)'
                : 'مولد تيار مستمر (الدارة مفتوحة : اضغط تشغيل ▶)'}
            </text>

            {/* Encart d'identification Gauche : Dihydrogène H₂ */}
            <rect
              x="16"
              y="32"
              width="196"
              height="94"
              rx="10"
              fill="#F0FDFA"
              stroke="#0F766E"
              strokeWidth="1.6"
            />
            <text x="114" y="52" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F766E">
              غاز ثنائي الهيدروجين (H₂)
            </text>
            <text x="114" y="69" textAnchor="middle" fontSize="10.5" fill="#475569">
              عند القطب السالب (−) · Cathode
            </text>
            <rect x="34" y="78" width="160" height="36" rx="7" fill="#FFFFFF" stroke="#99F6E4" />
            <text x="114" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace" fill="#0F766E">
              Volume H₂ : {metrics.volumeH2.toFixed(1)} u
            </text>
            <text x="114" y="108" textAnchor="middle" fontSize="9.5" fill="#0F766E">
              {metrics.volumeH2 > 0 ? 'حجم مضاعف (2V)' : 'الحالة الابتدائية (0)'}
            </text>
            <line
              x1="212"
              y1="68"
              x2="244"
              y2="68"
              stroke="#0F766E"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />

            {/* Encart d'identification Droit : Dioxygène O₂ */}
            <rect
              x="468"
              y="32"
              width="196"
              height="94"
              rx="10"
              fill="#EFF6FF"
              stroke="#0284C7"
              strokeWidth="1.6"
            />
            <text x="566" y="52" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0284C7">
              غاز ثنائي الأكسجين (O₂)
            </text>
            <text x="566" y="69" textAnchor="middle" fontSize="10.5" fill="#475569">
              عند القطب الموجب (+) · Anode
            </text>
            <rect x="486" y="78" width="160" height="36" rx="7" fill="#FFFFFF" stroke="#BAE6FD" />
            <text x="566" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace" fill="#0284C7">
              Volume O₂ : {metrics.volumeO2.toFixed(1)} u
            </text>
            <text x="566" y="108" textAnchor="middle" fontSize="9.5" fill="#0284C7">
              {metrics.volumeO2 > 0 ? 'نصف حجم الهيدروجين (1V)' : 'الحالة الابتدائية (0)'}
            </text>
            <line
              x1="436"
              y1="56"
              x2="468"
              y2="68"
              stroke="#0284C7"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />

            {/* Badge central de rapport volumique 2 : 1 */}
            <rect
              x="284"
              y="168"
              width="112"
              height="24"
              rx="7"
              fill="#FFFFFF"
              stroke="#0F766E"
              strokeWidth="1.5"
            />
            <text
              x="340"
              y="184"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
              fill="#0F766E"
            >
              {metrics.volumeO2 > 0 ? 'V(H₂) : V(O₂) = 2 : 1' : 'H₂ : 0 | O₂ : 0'}
            </text>
          </svg>
        </div>
      )}

      {/* 2. NIVEAU MICROSCOPIQUE SIMPLIFIÉ (Section 9) */}
      {showMicro && (
        <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-3.5 sm:p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2410C]">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>المستوى المجهري المبسط (النموذج الجزيئي) · Niveau microscopique simplifié</span>
            </div>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono font-bold text-[#C2410C] bg-[#FFF7ED] px-2.5 py-0.5 rounded-[6px] border border-[#FDBA74]"
            >
              2 H₂O → 2 H₂ + O₂
            </span>
          </div>

          {/* Avertissement scientifique obligatoire (Section 9) */}
          <div className="p-2.5 rounded-[10px] bg-[#FFFBEB] border border-[#FCD34D] text-xs font-semibold text-[#92400E]">
            {pedagogy.microscopicWarningArabic}
          </div>

          <svg
            viewBox="0 0 680 175"
            role="img"
            aria-label="التمثيل الجزيئي المبسط لتفكك جزيئات الماء H2O إلى جزيئات ثنائي الهيدروجين H2 وثنائي الأكسجين O2"
            className="w-full max-w-2xl mx-auto h-auto"
            style={{ direction: 'ltr' }}
          >
            <rect x="4" y="4" width="672" height="167" rx="12" fill="#FAF7F4" stroke="#E2D9D0" />

            {/* Boîte Gauche : Molécules d'eau H₂O dans le récipient (10 -> 0) */}
            <rect x="16" y="16" width="250" height="143" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
            <text x="141" y="34" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0284C7">
              المتفاعلات : جزيئات الماء (H₂O)
            </text>
            <text x="141" y="48" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#475569">
              Restantes : {metrics.waterMoleculesCount} H₂O (Dissociées : {metrics.dissociatedPairs * 2})
            </text>

            {/* Grille de 10 molécules H₂O (5 paires) */}
            {Array.from({ length: 10 }).map((_, idx) => {
              const col = idx % 5;
              const row = Math.floor(idx / 5);
              const mx = 42 + col * 48;
              const my = 78 + row * 42;
              const isDissociated = idx < metrics.dissociatedPairs * 2;
              return <WaterMoleculeSvg key={`w-mol-${idx}`} x={mx} y={my} faded={isDissociated} />;
            })}

            {/* Flèche centrale de réarrangement atomique */}
            <g transform="translate(320, 88)">
              <text x="0" y="-18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F766E">
                إعادة ترتيب الذرات
              </text>
              <line x1="-38" y1="0" x2="32" y2="0" stroke="#0F766E" strokeWidth="2.5" />
              <polygon points="32,-5 42,0 32,5" fill="#0F766E" />
              <text x="0" y="18" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fontWeight="bold" fill="#475569">
                2 H₂O → 2 H₂ + O₂
              </text>
            </g>

            {/* Boîte Droite : Molécules formées (2 H₂ pour 1 O₂) */}
            <rect x="374" y="16" width="290" height="143" rx="10" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.5" />
            <text x="519" y="34" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0F766E">
              النواتج : {metrics.h2MoleculesCount} جزيئات H₂ + {metrics.o2MoleculesCount} جزيئات O₂
            </text>

            {/* Sous-colonne H₂ (jusqu'à 10 molécules) */}
            <rect x="386" y="44" width="136" height="104" rx="8" fill="#F0FDFA" stroke="#99F6E4" />
            <text x="454" y="59" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F766E">
              ثنائي الهيدروجين ({metrics.h2MoleculesCount} H₂)
            </text>
            {Array.from({ length: metrics.h2MoleculesCount }).map((_, idx) => {
              const col = idx % 2;
              const row = Math.floor(idx / 2);
              const mx = 424 + col * 58;
              const my = 74 + row * 16;
              return <H2MoleculeSvg key={`h2-mol-${idx}`} x={mx} y={my} />;
            })}
            {metrics.h2MoleculesCount === 0 && (
              <text x="454" y="102" textAnchor="middle" fontSize="9.5" fill="#64748B">
                0 جزيء H₂
              </text>
            )}

            {/* Sous-colonne O₂ (jusqu'à 5 molécules) */}
            <rect x="532" y="44" width="120" height="104" rx="8" fill="#EFF6FF" stroke="#BAE6FD" />
            <text x="592" y="59" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0284C7">
              ثنائي الأكسجين ({metrics.o2MoleculesCount} O₂)
            </text>
            {Array.from({ length: metrics.o2MoleculesCount }).map((_, idx) => {
              const mx = 592;
              const my = 74 + idx * 16;
              return <O2MoleculeSvg key={`o2-mol-${idx}`} x={mx} y={my} />;
            })}
            {metrics.o2MoleculesCount === 0 && (
              <text x="592" y="102" textAnchor="middle" fontSize="9.5" fill="#64748B">
                0 جزيء O₂
              </text>
            )}
          </svg>
        </div>
      )}

      {/* 3. MESURES EN TEMPS RÉEL (Section 10) & GRAPHIQUE DYNAMIQUE (Section 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Mesures quantitatives en temps réel */}
        <div
          className="lg:col-span-6 bg-white rounded-[14px] border border-[#E2D9D0] p-4 space-y-3 flex flex-col justify-between"
          aria-live="polite"
        >
          <div className="flex items-center justify-between border-b border-[#F1ECE6] pb-2">
            <span className="text-xs font-bold text-[#1A1A1A]">
              القياسات الكمية الحية · Mesures en temps réel
            </span>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono text-[#6B6B6B]"
            >
              t = {elapsedTime.toFixed(1)} s ({Math.round(progress * 100)}%)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Carte H₂ */}
            <div className="p-3 rounded-[10px] bg-[#F0FDFA] border border-[#99F6E4] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F766E]">ثنائي الهيدروجين</span>
                <span
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate' }}
                  className="px-2 py-0.5 rounded bg-white border border-[#99F6E4] font-mono text-xs font-bold text-[#0F766E]"
                >
                  H₂
                </span>
              </div>
              <div
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
                className="text-sm sm:text-base font-mono font-bold text-[#115E59] text-left pt-1"
                data-testid="metric-volume-h2"
              >
                Volume : {metrics.volumeH2.toFixed(1)} unités
              </div>
              <div className="text-[11px] text-[#0F766E]">
                الحجم المتجمع : {metrics.volumeH2.toFixed(1)} وحدة
              </div>
            </div>

            {/* Carte O₂ */}
            <div className="p-3 rounded-[10px] bg-[#EFF6FF] border border-[#BAE6FD] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0284C7]">ثنائي الأكسجين</span>
                <span
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate' }}
                  className="px-2 py-0.5 rounded bg-white border border-[#BAE6FD] font-mono text-xs font-bold text-[#0284C7]"
                >
                  O₂
                </span>
              </div>
              <div
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
                className="text-sm sm:text-base font-mono font-bold text-[#1E40AF] text-left pt-1"
                data-testid="metric-volume-o2"
              >
                Volume : {metrics.volumeO2.toFixed(1)} unités
              </div>
              <div className="text-[11px] text-[#0284C7]">
                الحجم المتجمع : {metrics.volumeO2.toFixed(1)} وحدة
              </div>
            </div>
          </div>

          {/* Carte Rapport V(H₂) : V(O₂) = 2 : 1 */}
          <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-bold text-[#4A4A4A]">
              النسبة الحجمية (Rapport volumique) :
            </div>
            <div
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-xs sm:text-sm font-mono font-bold text-[#0F766E] bg-white px-3 py-1 rounded-[8px] border border-[#0F766E]/30"
              data-testid="metric-ratio"
            >
              {metrics.ratioH2ToO2 !== null
                ? `H₂ : O₂ = 2 : 1 (V(H₂)/V(O₂) = ${metrics.ratioH2ToO2.toFixed(0)})`
                : 'H₂ : O₂ = 0 : 0 (الحالة الابتدائية)'}
            </div>
          </div>
        </div>

        {/* Graphique dynamique Volume = f(Temps) (Section 11) */}
        <div className="lg:col-span-6 bg-white rounded-[14px] border border-[#E2D9D0] p-4 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A4A]">
              <Activity className="w-4 h-4 text-[#0F766E]" />
              <span>تطور الحجمين بدلالة الزمن · Volume = f(Temps)</span>
            </div>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono font-semibold text-[#0F766E]"
            >
              Pente H₂ = 2 × Pente O₂
            </span>
          </div>

          <svg
            viewBox="0 0 320 148"
            role="img"
            aria-label="منحنى بياني يوضح تزايد حجم الهيدروجين H2 بسرعة مضاعفة مقارنة بحجم الأكسجين O2"
            className="w-full h-auto mx-auto"
            style={{ direction: 'ltr' }}
          >
            <rect x="2" y="2" width="316" height="144" rx="10" fill="#FAF7F4" stroke="#E2D9D0" />

            {/* Grille horizontale : 0, 10, 20 unités */}
            <line x1={chartX0} y1={chartY0} x2={chartX0 + chartWidth} y2={chartY0} stroke="#94A3B8" strokeWidth="1.4" />
            <line
              x1={chartX0}
              y1={chartY0 - chartHeight / 2}
              x2={chartX0 + chartWidth}
              y2={chartY0 - chartHeight / 2}
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <line
              x1={chartX0}
              y1={chartY0 - chartHeight}
              x2={chartX0 + chartWidth}
              y2={chartY0 - chartHeight}
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Axe vertical Volume */}
            <line x1={chartX0} y1={chartY0 - chartHeight - 6} x2={chartX0} y2={chartY0} stroke="#94A3B8" strokeWidth="1.4" />
            <text x="38" y={chartY0 + 3} textAnchor="end" fontSize="9" fontFamily="monospace" fill="#475569">
              0
            </text>
            <text
              x="38"
              y={chartY0 - chartHeight / 2 + 3}
              textAnchor="end"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#0284C7"
            >
              10
            </text>
            <text
              x="38"
              y={chartY0 - chartHeight + 3}
              textAnchor="end"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#0F766E"
            >
              20
            </text>
            <text x="14" y="16" fontSize="8.5" fontWeight="bold" fill="#475569">
              Volume (u)
            </text>
            <text x={chartX0 + chartWidth} y="138" textAnchor="end" fontSize="8.5" fontWeight="bold" fill="#475569">
              Temps →
            </text>

            {/* Courbe H₂ (trait plein vert émeraude) */}
            {history.length > 1 && (
              <polyline
                fill="none"
                stroke="#0F766E"
                strokeWidth="2.4"
                points={h2PolylinePoints}
              />
            )}
            <circle cx={currentChartX} cy={currentChartYH2} r="4" fill="#0F766E" />
            <text
              x={Math.min(285, currentChartX + 8)}
              y={Math.max(24, currentChartYH2 - 4)}
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#0F766E"
            >
              H₂ ({metrics.volumeH2.toFixed(0)})
            </text>

            {/* Courbe O₂ (trait tireté bleu avec marqueur carré pour accessibilité) */}
            {history.length > 1 && (
              <polyline
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.2"
                strokeDasharray="5 3"
                points={o2PolylinePoints}
              />
            )}
            <rect
              x={currentChartX - 3.5}
              y={currentChartYO2 - 3.5}
              width="7"
              height="7"
              fill="#0284C7"
            />
            <text
              x={Math.min(285, currentChartX + 8)}
              y={Math.min(118, currentChartYO2 + 11)}
              fontSize="9.5"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#0284C7"
            >
              O₂ ({metrics.volumeO2.toFixed(0)})
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
