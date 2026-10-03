import React from 'react';
import { SimulationStageProps } from '../types';
import {
  CombustionMetrics,
  CombustionParams,
} from './completeIncompleteCombustionModel';
import { Eye, Sparkles, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

/**
 * Molécule de méthane CH₄ (1 C noir central + 4 H blancs périphériques)
 */
const CH4MoleculeSvg: React.FC<{ x: number; y: number; faded?: boolean }> = ({
  x,
  y,
  faded = false,
}) => (
  <g transform={`translate(${x}, ${y})`} opacity={faded ? 0.22 : 1}>
    <line x1="0" y1="0" x2="0" y2="-11" stroke="#475569" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="0" y2="11" stroke="#475569" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="-11" y2="0" stroke="#475569" strokeWidth="1.5" />
    <line x1="0" y1="0" x2="11" y2="0" stroke="#475569" strokeWidth="1.5" />
    <circle cx="0" cy="0" r="6.5" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2" />
    <text x="0" y="2.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#FFFFFF">
      C
    </text>
    <circle cx="0" cy="-11" r="4" fill="#FFFFFF" stroke="#475569" strokeWidth="1.1" />
    <circle cx="0" cy="11" r="4" fill="#FFFFFF" stroke="#475569" strokeWidth="1.1" />
    <circle cx="-11" cy="0" r="4" fill="#FFFFFF" stroke="#475569" strokeWidth="1.1" />
    <circle cx="11" cy="0" r="4" fill="#FFFFFF" stroke="#475569" strokeWidth="1.1" />
  </g>
);

/**
 * Molécule de dioxygène O₂ (2 atomes O rouges liés)
 */
const O2MoleculeSvg: React.FC<{ x: number; y: number; faded?: boolean }> = ({
  x,
  y,
  faded = false,
}) => (
  <g transform={`translate(${x}, ${y})`} opacity={faded ? 0.22 : 1}>
    <circle cx="-5.5" cy="0" r="5.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.1" />
    <circle cx="5.5" cy="0" r="5.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.1" />
    <text x="-5.5" y="2.2" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FFFFFF">
      O
    </text>
    <text x="5.5" y="2.2" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FFFFFF">
      O
    </text>
  </g>
);

/**
 * Molécule de dioxyde de carbone CO₂ (O=C=O linéaire)
 */
const CO2MoleculeSvg: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="-10" cy="0" r="5" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
    <circle cx="10" cy="0" r="5" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
    <circle cx="0" cy="0" r="6" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
    <text x="0" y="2.2" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FFFFFF">
      C
    </text>
  </g>
);

/**
 * Molécule de monoxyde de carbone CO (1 C noir + 1 O rouge)
 */
const COMoleculeSvg: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="-5" cy="0" r="5.8" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
    <circle cx="5.5" cy="0" r="5.2" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
    <text x="-5" y="2.2" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FFFFFF">
      C
    </text>
    <text x="5.5" y="2.2" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FFFFFF">
      O
    </text>
  </g>
);

/**
 * Molécule d'eau H₂O (1 O rouge + 2 H blancs)
 */
const H2OMoleculeSvg: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="0" cy="0" r="5.2" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
    <circle cx="-6" cy="4.5" r="3.6" fill="#FFFFFF" stroke="#475569" strokeWidth="1" />
    <circle cx="6" cy="4.5" r="3.6" fill="#FFFFFF" stroke="#475569" strokeWidth="1" />
  </g>
);

/**
 * Atome de carbone C solide (suie / هباب الفحم)
 */
const CarbonAtomSvg: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="0" cy="0" r="6.2" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.3" />
    <text x="0" y="2.4" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#FFFFFF">
      C
    </text>
  </g>
);

/**
 * Scène interactive du Cours 04 : الاحتراق التام والاحتراق غير التام للفحم الهيدروجيني
 */
export const CompleteIncompleteCombustionStage: React.FC<
  SimulationStageProps<CombustionMetrics, CombustionParams>
> = ({ state, pedagogy, onParameterChange }) => {
  const {
    metrics,
    progress,
    elapsedTime,
    representationMode,
    reducedMotion,
    status,
    history,
  } = state;

  const showMacro = representationMode === 'macroscopic' || representationMode === 'both';
  const showMicro = representationMode === 'microscopic' || representationMode === 'both';

  const isComplete = metrics.regime === 'complete';
  const isIncomplete = metrics.regime === 'incomplete';
  const isFlameActive = progress > 0 || status === 'running';

  // Animation douce de la flamme et des particules de suie (désactivée en reducedMotion)
  const flameFlicker =
    !reducedMotion && status === 'running'
      ? Math.sin(elapsedTime * 14) * 3
      : 0;
  const sootPhase = !reducedMotion ? (elapsedTime * 28) % 36 : 16;

  // Dimensions du graphique dynamique (Produits formés = f(Temps))
  const chartWidth = 240;
  const chartHeight = 92;
  const chartX0 = 46;
  const chartY0 = 116;
  const maxChartY = 40;

  const co2PolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const vCo2 = pt.values.CO2 ?? 0;
      const y = chartY0 - (vCo2 / maxChartY) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const imbrulesPolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const vImb = pt.values.Imbrules ?? 0;
      const y = chartY0 - (vImb / maxChartY) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const currentChartX = chartX0 + progress * chartWidth;
  const currentChartYCo2 =
    chartY0 - (metrics.co2Produced / maxChartY) * chartHeight;
  const currentImbrules = Number(
    (metrics.coProduced + metrics.carbonSootProduced).toFixed(1)
  );
  const currentChartYImb =
    chartY0 - (currentImbrules / maxChartY) * chartHeight;

  return (
    <div className="space-y-4">
      {/* ================================================================== */}
      {/* 1. NIVEAU MACROSCOPIQUE : Brûleur, Flamme et 3 Tests chimiques      */}
      {/* ================================================================== */}
      {showMacro && (
        <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
              <Eye className="w-4 h-4 shrink-0" />
              <span>
                المستوى العياني (التجربة المخبرية : الموقد، اللهب والكواشف) · Niveau macroscopique
              </span>
            </div>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-[6px] border ${
                isComplete
                  ? 'bg-[#EFF6FF] border-[#93C5FD] text-[#1D4ED8]'
                  : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'
              }`}
            >
              {isComplete
                ? 'Combustion complète (Flamme bleue · O₂ suffisant)'
                : 'Combustion incomplète (Flamme jaune · O₂ insuffisant)'}
            </span>
          </div>

          <svg
            viewBox="0 0 680 300"
            role="img"
            aria-label="محاكاة احتراق الفحم الهيدروجيني في الموقد مع ضبط فتحة دخول الهواء والكشف عن النواتج"
            className="w-full max-w-2xl mx-auto h-auto select-none"
            style={{ direction: 'ltr' }}
          >
            <title>
              Combustion complète vs incomplète — Rôle de la disponibilité en dioxygène O₂
            </title>

            <defs>
              <linearGradient id="blue-flame-grad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="yellow-flame-grad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#EA580C" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.95" />
                <stop offset="85%" stopColor="#FDE047" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Fond du laboratoire */}
            <rect
              x="4"
              y="4"
              width="672"
              height="292"
              rx="12"
              fill="#FAF7F4"
              stroke="#E2D9D0"
            />

            {/* ============================================================ */}
            {/* ENCART GAUCHE : Réglage de la virole d'air & État de la flamme */}
            {/* ============================================================ */}
            <rect
              x="16"
              y="20"
              width="192"
              height="136"
              rx="10"
              fill={isComplete ? '#EFF6FF' : '#FFFBEB'}
              stroke={isComplete ? '#2563EB' : '#D97706'}
              strokeWidth="1.6"
            />
            <text
              x="112"
              y="40"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="bold"
              fill={isComplete ? '#1D4ED8' : '#B45309'}
            >
              {isComplete
                ? 'احتراق تام (وفرة O₂)'
                : isIncomplete
                ? 'احتراق غير تام (نقص O₂)'
                : 'حالة انتقالية (بداية نقص O₂)'}
            </text>
            <text x="112" y="56" textAnchor="middle" fontSize="10" fill="#475569">
              فتحة التهوية : {metrics.oxygenSupplyPercent}% O₂
            </text>

            <rect
              x="28"
              y="66"
              width="168"
              height="44"
              rx="7"
              fill="#FFFFFF"
              stroke={isComplete ? '#BFDBFE' : '#FDE68A'}
            />
            <text
              x="112"
              y="83"
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="bold"
              fill={isComplete ? '#1D4ED8' : '#D97706'}
            >
              {isComplete
                ? '🔵 لهب أزرق صافٍ وشديد الحرارة'
                : '🟡 لهب أصفر مضيء ومدخّن'}
            </text>
            <text x="112" y="99" textAnchor="middle" fontSize="9.5" fill="#475569">
              {isComplete
                ? 'كل ذرات الكربون تتحول إلى CO₂'
                : 'توهج ذرات الكربون (C) غير المحترقة'}
            </text>

            {/* Boutons rapides dans le SVG pour basculer O₂ 100% vs 30% */}
            {onParameterChange && (
              <g
                className="cursor-pointer"
                onClick={() =>
                  onParameterChange(
                    'oxygenSupplyPercent',
                    isComplete ? 30 : 100
                  )
                }
              >
                <rect
                  x="28"
                  y="118"
                  width="168"
                  height="28"
                  rx="6"
                  fill={isComplete ? '#1D4ED8' : '#D97706'}
                />
                <text
                  x="112"
                  y="136"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#FFFFFF"
                >
                  {isComplete
                    ? 'اضغط هنا لغلق فتحة الهواء (30%)'
                    : 'اضغط هنا لفتح فتحة الهواء (100%)'}
                </text>
              </g>
            )}

            {/* ============================================================ */}
            {/* DISPOSITIF CENTRAL : Brûleur Bunsen + Virole + Flamme + Coupelle */}
            {/* ============================================================ */}
            {/* Coupelle / Bécher inversé au-dessus de la flamme */}
            <path
              d="M 264 68 Q 332 42 400 68"
              fill="none"
              stroke="#475569"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <text
              x="332"
              y="34"
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="bold"
              fill="#334155"
            >
              قعر إناء بارد + كبريتات النحاس اللامائية (CuSO₄)
            </text>

            {/* Pastille de CuSO₄ anhydre (blanche à t=0, bleue dès que H₂O se forme) */}
            <rect
              x="292"
              y="44"
              width="80"
              height="16"
              rx="5"
              fill={metrics.h2oProduced > 2 ? '#2563EB' : '#FFFFFF'}
              stroke="#1E40AF"
              strokeWidth="1.3"
            />
            <text
              x="332"
              y="55"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="bold"
              fill={metrics.h2oProduced > 2 ? '#FFFFFF' : '#1E293B'}
            >
              {metrics.h2oProduced > 2
                ? 'CuSO₄ أزرق (وجود الماء H₂O)'
                : 'CuSO₄ أبيض (الحالة الابتدائية)'}
            </text>

            {/* Gouttelettes de buée d'eau (H₂O) sous la coupelle */}
            {metrics.h2oProduced > 5 && (
              <g>
                <circle cx="282" cy="67" r="3" fill="#38BDF8" />
                <circle cx="296" cy="64" r="2.5" fill="#38BDF8" />
                <circle cx="368" cy="64" r="2.5" fill="#38BDF8" />
                <circle cx="382" cy="67" r="3" fill="#38BDF8" />
              </g>
            )}

            {/* Dépôt noir de suie (Carbone C) sous la coupelle en combustion incomplète */}
            {metrics.sootDepositPercent > 0 && (
              <g opacity={Math.min(1, 0.25 + metrics.sootDepositPercent / 100)}>
                <path
                  d="M 284 68 Q 332 52 380 68"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth={2 + (metrics.sootDepositPercent / 100) * 6}
                  strokeLinecap="round"
                />
                <text
                  x="332"
                  y="83"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="bold"
                  fill="#0F172A"
                >
                  ⚫ طبقة سوداء : الكربون / السخام (C)
                </text>
              </g>
            )}

            {/* FLAMME DU BRÛLEUR */}
            {isFlameActive ? (
              isComplete ? (
                /* Flamme bleue nette et chaude (Combustion complète) */
                <g>
                  <path
                    d={`M 314 182 Q 302 135 ${332 + flameFlicker * 0.5} 98 Q 362 135 350 182 Z`}
                    fill="url(#blue-flame-grad)"
                  />
                  {/* Cône bleu pâle interne */}
                  <path
                    d="M 322 182 Q 320 152 332 134 Q 344 152 342 182 Z"
                    fill="#E0F2FE"
                    fillOpacity="0.85"
                  />
                </g>
              ) : (
                /* Flamme jaune-orangée vacillante + suie (Combustion incomplète) */
                <g>
                  <path
                    d={`M 310 182 Q 292 125 ${332 + flameFlicker} 72 Q 372 125 354 182 Z`}
                    fill="url(#yellow-flame-grad)"
                  />
                  <path
                    d={`M 320 182 Q 312 145 ${332 - flameFlicker * 0.5} 105 Q 352 145 344 182 Z`}
                    fill="#FEF08A"
                    fillOpacity="0.8"
                  />
                  {/* Particules de suie C et CO qui montent */}
                  {[0, 12, 24].map((offset, idx) => {
                    const py = 118 - ((sootPhase + offset) % 42);
                    const px = 320 + idx * 12;
                    return (
                      <circle
                        key={idx}
                        cx={px}
                        cy={py}
                        r="3"
                        fill="#0F172A"
                        opacity="0.85"
                      />
                    );
                  })}
                </g>
              )
            ) : (
              <text
                x="332"
                y="142"
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="bold"
                fill="#64748B"
              >
                الموقد منطفئ (اضغط «إشعال الموقد ▶»)
              </text>
            )}

            {/* Cheminée métallique du brûleur */}
            <rect
              x="316"
              y="182"
              width="32"
              height="62"
              rx="4"
              fill="#64748B"
              stroke="#334155"
              strokeWidth="2"
            />

            {/* Virole de réglage d'air (ouverture proportionnelle à oxygenSupplyPercent) */}
            <rect
              x="310"
              y="214"
              width="44"
              height="20"
              rx="4"
              fill="#CBD5E1"
              stroke="#1E293B"
              strokeWidth="1.8"
            />
            {/* Fenêtre d'entrée d'air O₂ dans la virole */}
            <rect
              x="318"
              y="218"
              width={Math.max(4, (metrics.oxygenSupplyPercent / 100) * 28)}
              height="12"
              rx="2"
              fill={isComplete ? '#2563EB' : '#DC2626'}
            />
            <text
              x="256"
              y="227"
              textAnchor="end"
              fontSize="10"
              fontWeight="bold"
              fill={isComplete ? '#1D4ED8' : '#B91C1C'}
            >
              دخول O₂ ({metrics.oxygenSupplyPercent}%) →
            </text>

            {/* Socle du brûleur et arrivée de gaz (CH₄ / C₄H₁₀) */}
            <path
              d="M 288 268 L 308 244 L 356 244 L 376 268 Z"
              fill="#475569"
              stroke="#1E293B"
              strokeWidth="2"
            />
            <text
              x="332"
              y="284"
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="bold"
              fill="#1E293B"
            >
              موقد غاز (فحم هيدروجيني : ميثان CH₄ / بوتان C₄H₁₀)
            </text>

            {/* ============================================================ */}
            {/* DROITE HAUT : Capteur de Monoxyde de Carbone (CO)            */}
            {/* ============================================================ */}
            <rect
              x="446"
              y="20"
              width="218"
              height="108"
              rx="10"
              fill={metrics.coPpm > 0 ? '#FEF2F2' : '#F0FDF4'}
              stroke={metrics.coPpm > 0 ? '#DC2626' : '#16A34A'}
              strokeWidth="1.8"
            />
            <text
              x="555"
              y="40"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="bold"
              fill={metrics.coPpm > 0 ? '#B91C1C' : '#15803D'}
            >
              كاشف أحادي أكسيد الكربون (CO)
            </text>
            <rect
              x="462"
              y="48"
              width="186"
              height="34"
              rx="6"
              fill="#FFFFFF"
              stroke={metrics.coPpm > 0 ? '#FCA5A5' : '#86EFAC'}
            />
            <text
              x="555"
              y="69"
              textAnchor="middle"
              fontSize="12.5"
              fontFamily="monospace"
              fontWeight="bold"
              fill={metrics.coPpm > 0 ? '#DC2626' : '#15803D'}
            >
              CO : {metrics.coPpm} ppm
            </text>
            <text
              x="555"
              y="98"
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill={metrics.coPpm > 0 ? '#B91C1C' : '#15803D'}
            >
              {metrics.coPpm > 0
                ? '⚠️ خطر! انبعاث غاز CO السام القاتل'
                : '✓ 0 ppm : لا ينطلق غاز CO السام'}
            </text>
            <text x="555" y="114" textAnchor="middle" fontSize="9" fill="#475569">
              (غاز عديم اللون والرائحة يسبب الاختناق)
            </text>

            {/* ============================================================ */}
            {/* DROITE BAS : Flacon d'Eau de chaux (Test de CO₂)             */}
            {/* ============================================================ */}
            <rect
              x="446"
              y="142"
              width="218"
              height="132"
              rx="10"
              fill="#FFFFFF"
              stroke="#0F766E"
              strokeWidth="1.6"
            />
            <text
              x="555"
              y="162"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="bold"
              fill="#0F766E"
            >
              اختبار ماء الجير (Eau de chaux)
            </text>

            {/* Bécher d'eau de chaux qui se trouble avec CO₂ */}
            <rect
              x="466"
              y="174"
              width="64"
              height="76"
              rx="6"
              fill="#F8FAFC"
              stroke="#475569"
              strokeWidth="1.8"
            />
            <rect
              x="468"
              y="196"
              width="60"
              height="52"
              rx="4"
              fill={
                metrics.limewaterTurbidityPercent > 15
                  ? '#E2E8F0'
                  : '#BAE6FD'
              }
              fillOpacity={
                metrics.limewaterTurbidityPercent > 15
                  ? Math.min(0.95, 0.45 + metrics.limewaterTurbidityPercent / 140)
                  : 0.45
              }
            />
            {metrics.limewaterTurbidityPercent > 15 && (
              <g>
                <circle cx="486" cy="216" r="4" fill="#FFFFFF" opacity="0.85" />
                <circle cx="504" cy="228" r="5" fill="#FFFFFF" opacity="0.85" />
                <circle cx="496" cy="238" r="3.5" fill="#FFFFFF" opacity="0.85" />
              </g>
            )}

            <text
              x="592"
              y="196"
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="bold"
              fill="#0F766E"
            >
              {metrics.limewaterTurbidityPercent > 15
                ? 'ماء الجير تعكّر!'
                : 'ماء الجير صافٍ'}
            </text>
            <text x="592" y="214" textAnchor="middle" fontSize="9.5" fill="#475569">
              {metrics.limewaterTurbidityPercent > 15
                ? 'دليل تشكل غاز CO₂'
                : 'بانتظار انطلاق CO₂'}
            </text>
            <text
              x="592"
              y="234"
              textAnchor="middle"
              fontSize="10.5"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#0F766E"
            >
              CO₂ : {metrics.co2Produced.toFixed(1)} u
            </text>
          </svg>
        </div>
      )}

      {/* ================================================================== */}
      {/* 2. NIVEAU MICROSCOPIQUE SIMPLIFIÉ (Conservation des atomes C, H, O) */}
      {/* ================================================================== */}
      {showMicro && (
        <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-3.5 sm:p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2410C]">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                المستوى المجهري المبسط (إعادة ترتيب الذرات C و H و O) · Niveau microscopique simplifié
              </span>
            </div>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono font-bold text-[#C2410C] bg-[#FFF7ED] px-2.5 py-0.5 rounded-[6px] border border-[#FDBA74]"
            >
              {isComplete
                ? '4 CH₄ + 8 O₂ → 4 CO₂ + 8 H₂O'
                : isIncomplete
                ? '4 CH₄ + 6 O₂ → 1 CO₂ + 2 CO + 1 C + 8 H₂O'
                : '4 CH₄ + 7 O₂ → 2 CO₂ + 2 CO + 8 H₂O'}
            </span>
          </div>

          {pedagogy.microscopicWarningArabic && (
            <div className="p-2.5 rounded-[10px] bg-[#FFFBEB] border border-[#FCD34D] text-xs font-semibold text-[#92400E]">
              {pedagogy.microscopicWarningArabic}
            </div>
          )}

          <svg
            viewBox="0 0 680 190"
            role="img"
            aria-label="التمثيل الجزيئي المبسط لاحتراق الميثان بوفرة أو بنقص ثنائي الأكسجين مع انحفاظ الذرات"
            className="w-full max-w-2xl mx-auto h-auto"
            style={{ direction: 'ltr' }}
          >
            <rect
              x="4"
              y="4"
              width="672"
              height="182"
              rx="12"
              fill="#FAF7F4"
              stroke="#E2D9D0"
            />

            {/* Boîte Gauche : Réactifs (4 CH₄ + O₂ disponibles) */}
            <rect
              x="14"
              y="14"
              width="258"
              height="162"
              rx="10"
              fill="#FFFFFF"
              stroke="#0284C7"
              strokeWidth="1.5"
            />
            <text
              x="143"
              y="32"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#0284C7"
            >
              المتفاعلات : 4 CH₄ + {metrics.o2InitialMicro} O₂
            </text>
            <text
              x="143"
              y="46"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="monospace"
              fill="#475569"
            >
              Atomes initiaux : 4 C · 16 H · {metrics.o2InitialMicro * 2} O
            </text>

            {/* 4 molécules CH₄ */}
            {[0, 1, 2, 3].map((idx) => {
              const mx = 48 + idx * 62;
              const my = 78;
              const reacted = idx >= metrics.ch4Remaining;
              return (
                <CH4MoleculeSvg
                  key={`ch4-${idx}`}
                  x={mx}
                  y={my}
                  faded={reacted}
                />
              );
            })}

            {/* Molécules O₂ disponibles (8, 7 ou 6) */}
            {Array.from({ length: metrics.o2InitialMicro }).map((_, idx) => {
              const col = idx % 4;
              const row = Math.floor(idx / 4);
              const mx = 52 + col * 60;
              const my = 124 + row * 28;
              const reacted = idx >= metrics.o2Remaining;
              return (
                <O2MoleculeSvg
                  key={`o2-${idx}`}
                  x={mx}
                  y={my}
                  faded={reacted}
                />
              );
            })}

            {/* Flèche centrale */}
            <g transform="translate(318, 95)">
              <text
                x="0"
                y="-16"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="bold"
                fill="#0F766E"
              >
                انحفاظ الذرات
              </text>
              <line
                x1="-34"
                y1="0"
                x2="28"
                y2="0"
                stroke="#0F766E"
                strokeWidth="2.4"
              />
              <polygon points="28,-5 38,0 28,5" fill="#0F766E" />
              <text
                x="0"
                y="16"
                textAnchor="middle"
                fontSize="8.5"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#475569"
              >
                4 C · 16 H · {metrics.o2InitialMicro * 2} O
              </text>
            </g>

            {/* Boîte Droite : Produits formés */}
            <rect
              x="366"
              y="14"
              width="300"
              height="162"
              rx="10"
              fill="#FFFFFF"
              stroke={isComplete ? '#0F766E' : '#DC2626'}
              strokeWidth="1.5"
            />
            <text
              x="516"
              y="32"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill={isComplete ? '#0F766E' : '#B91C1C'}
            >
              النواتج المتشكلة : {metrics.co2MicroCount} CO₂ + {metrics.h2oMicroCount} H₂O
              {metrics.coMicroCount > 0 ? ` + ${metrics.coMicroCount} CO` : ''}
              {metrics.cMicroCount > 0 ? ` + ${metrics.cMicroCount} C` : ''}
            </text>

            {/* Sous-boîte Produits carbonés (CO₂, CO, C) */}
            <rect
              x="378"
              y="42"
              width="138"
              height="122"
              rx="8"
              fill="#FAF7F4"
              stroke="#E2D9D0"
            />
            <text
              x="447"
              y="56"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="bold"
              fill="#1E293B"
            >
              نواتج الكربون (4 C)
            </text>

            {/* Molécules CO₂ */}
            {Array.from({ length: metrics.co2MicroCount }).map((_, idx) => (
              <g key={`co2-${idx}`}>
                <CO2MoleculeSvg x={415} y={74 + idx * 20} />
                <text
                  x="458"
                  y={77 + idx * 20}
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#0F766E"
                >
                  CO₂
                </text>
              </g>
            ))}

            {/* Molécules CO (si incomplet) */}
            {Array.from({ length: metrics.coMicroCount }).map((_, idx) => {
              const rowY = 74 + (metrics.co2MicroCount + idx) * 20;
              return (
                <g key={`co-${idx}`}>
                  <COMoleculeSvg x={415} y={rowY} />
                  <text
                    x="462"
                    y={rowY + 3}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="#DC2626"
                  >
                    CO (سام!)
                  </text>
                </g>
              );
            })}

            {/* Atomes C suie (si incomplet) */}
            {Array.from({ length: metrics.cMicroCount }).map((_, idx) => {
              const rowY =
                74 +
                (metrics.co2MicroCount + metrics.coMicroCount + idx) * 20;
              return (
                <g key={`c-soot-${idx}`}>
                  <CarbonAtomSvg x={415} y={rowY} />
                  <text
                    x="462"
                    y={rowY + 3}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="#0F172A"
                  >
                    C (سخام)
                  </text>
                </g>
              );
            })}

            {/* Sous-boîte Molécules d'eau H₂O */}
            <rect
              x="524"
              y="42"
              width="130"
              height="122"
              rx="8"
              fill="#EFF6FF"
              stroke="#BAE6FD"
            />
            <text
              x="589"
              y="56"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="bold"
              fill="#0284C7"
            >
              بخار الماء ({metrics.h2oMicroCount} H₂O)
            </text>
            {Array.from({ length: metrics.h2oMicroCount }).map((_, idx) => {
              const col = idx % 2;
              const row = Math.floor(idx / 2);
              return (
                <H2OMoleculeSvg
                  key={`h2o-${idx}`}
                  x={562 + col * 54}
                  y={74 + row * 22}
                />
              );
            })}
          </svg>
        </div>
      )}

      {/* ================================================================== */}
      {/* 3. MESURES EN TEMPS RÉEL & GRAPHIQUE DYNAMIQUE                      */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Mesures quantitatives */}
        <div
          className="lg:col-span-6 bg-white rounded-[14px] border border-[#E2D9D0] p-4 space-y-3 flex flex-col justify-between"
          aria-live="polite"
        >
          <div className="flex items-center justify-between border-b border-[#F1ECE6] pb-2">
            <span className="text-xs font-bold text-[#1A1A1A]">
              حصيلة النواتج المتشكلة · Produits formés en temps réel
            </span>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono text-[#6B6B6B]"
            >
              O₂ = {metrics.oxygenSupplyPercent}% | {Math.round(progress * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* CO₂ */}
            <div className="p-2.5 rounded-[10px] bg-[#F0FDFA] border border-[#99F6E4] space-y-0.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F766E]">
                <span>ثنائي أكسيد الكربون</span>
                <span dir="ltr" className="font-mono">
                  CO₂
                </span>
              </div>
              <div
                dir="ltr"
                className="text-sm font-mono font-extrabold text-[#115E59]"
                data-testid="metric-co2"
              >
                {metrics.co2Produced.toFixed(1)} u
              </div>
              <div className="text-[10.5px] text-[#0F766E]">
                يعكر ماء الجير ({metrics.limewaterTurbidityPercent}%)
              </div>
            </div>

            {/* H₂O */}
            <div className="p-2.5 rounded-[10px] bg-[#EFF6FF] border border-[#BAE6FD] space-y-0.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#0284C7]">
                <span>بخار الماء</span>
                <span dir="ltr" className="font-mono">
                  H₂O
                </span>
              </div>
              <div
                dir="ltr"
                className="text-sm font-mono font-extrabold text-[#1E40AF]"
                data-testid="metric-h2o"
              >
                {metrics.h2oProduced.toFixed(1)} u
              </div>
              <div className="text-[10.5px] text-[#0284C7]">
                يلون CuSO₄ بالأزرق
              </div>
            </div>

            {/* CO (Monoxyde de carbone) */}
            <div
              className={`p-2.5 rounded-[10px] border space-y-0.5 ${
                metrics.coProduced > 0
                  ? 'bg-[#FEF2F2] border-[#FCA5A5]'
                  : 'bg-[#FAF7F4] border-[#E2D9D0]'
              }`}
            >
              <div
                className={`flex items-center justify-between text-xs font-bold ${
                  metrics.coProduced > 0 ? 'text-[#B91C1C]' : 'text-[#475569]'
                }`}
              >
                <span>أحادي أكسيد الكربون</span>
                <span dir="ltr" className="font-mono">
                  CO
                </span>
              </div>
              <div
                dir="ltr"
                className={`text-sm font-mono font-extrabold ${
                  metrics.coProduced > 0 ? 'text-[#DC2626]' : 'text-[#475569]'
                }`}
                data-testid="metric-co"
              >
                {metrics.coProduced.toFixed(1)} u ({metrics.coPpm} ppm)
              </div>
              <div
                className={`text-[10.5px] font-semibold ${
                  metrics.coProduced > 0 ? 'text-[#B91C1C]' : 'text-[#64748B]'
                }`}
              >
                {metrics.coProduced > 0 ? '⚠️ غاز سام خانق!' : '0 (احتراق تام آمن)'}
              </div>
            </div>

            {/* C (Suie / Carbone) */}
            <div
              className={`p-2.5 rounded-[10px] border space-y-0.5 ${
                metrics.carbonSootProduced > 0
                  ? 'bg-[#FFFBEB] border-[#FDE68A]'
                  : 'bg-[#FAF7F4] border-[#E2D9D0]'
              }`}
            >
              <div
                className={`flex items-center justify-between text-xs font-bold ${
                  metrics.carbonSootProduced > 0
                    ? 'text-[#B45309]'
                    : 'text-[#475569]'
                }`}
              >
                <span>الكربون (السخام)</span>
                <span dir="ltr" className="font-mono">
                  C
                </span>
              </div>
              <div
                dir="ltr"
                className="text-sm font-mono font-extrabold text-[#1E293B]"
                data-testid="metric-soot"
              >
                {metrics.carbonSootProduced.toFixed(1)} u
              </div>
              <div className="text-[10.5px] text-[#78350F]">
                {metrics.carbonSootProduced > 0
                  ? 'طبقة سوداء على الإناء'
                  : '0 (لا يوجد سخام أسود)'}
              </div>
            </div>
          </div>

          {/* Diagnostic sécurité */}
          <div
            className={`p-2.5 rounded-[10px] border flex items-center gap-2 text-xs font-bold ${
              isComplete
                ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#15803D]'
                : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'
            }`}
          >
            {isComplete ? (
              <>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  احتراق تام آمن : وفرة O₂ ({metrics.oxygenSupplyPercent}%) تمنع تشكل غاز CO السام والسخام C.
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  احتراق غير تام خطير : نقص O₂ ({metrics.oxygenSupplyPercent}%) يسبب انبعاث غاز CO السام وترسب السخام C!
                </span>
              </>
            )}
          </div>
        </div>

        {/* Graphique dynamique comparant CO₂ vs (CO + C) */}
        <div className="lg:col-span-6 bg-white rounded-[14px] border border-[#E2D9D0] p-4 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A]">
              <Activity className="w-4 h-4 text-[#0F766E]" />
              <span>تطور النواتج الكربونية : CO₂ مقابل (CO + C)</span>
            </div>
            <span
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="text-[11px] font-mono font-semibold text-[#0F766E]"
            >
              O₂ = {metrics.oxygenSupplyPercent}%
            </span>
          </div>

          <svg
            viewBox="0 0 320 148"
            role="img"
            aria-label="منحنى بياني يوضح كمية CO2 مقارنة بنواتج الاحتراق غير التام CO + C"
            className="w-full h-auto mx-auto"
            style={{ direction: 'ltr' }}
          >
            <rect
              x="2"
              y="2"
              width="316"
              height="144"
              rx="10"
              fill="#FAF7F4"
              stroke="#E2D9D0"
            />

            {/* Grille horizontale */}
            <line
              x1={chartX0}
              y1={chartY0}
              x2={chartX0 + chartWidth}
              y2={chartY0}
              stroke="#94A3B8"
              strokeWidth="1.4"
            />
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

            {/* Axe vertical */}
            <line
              x1={chartX0}
              y1={chartY0 - chartHeight - 6}
              x2={chartX0}
              y2={chartY0}
              stroke="#94A3B8"
              strokeWidth="1.4"
            />
            <text
              x="38"
              y={chartY0 + 3}
              textAnchor="end"
              fontSize="9"
              fontFamily="monospace"
              fill="#475569"
            >
              0
            </text>
            <text
              x="38"
              y={chartY0 - chartHeight / 2 + 3}
              textAnchor="end"
              fontSize="9"
              fontFamily="monospace"
              fill="#475569"
            >
              20
            </text>
            <text
              x="38"
              y={chartY0 - chartHeight + 3}
              textAnchor="end"
              fontSize="9"
              fontFamily="monospace"
              fill="#0F766E"
            >
              40
            </text>
            <text x="12" y="16" fontSize="8.5" fontWeight="bold" fill="#475569">
              Quantité (u)
            </text>
            <text
              x={chartX0 + chartWidth}
              y="138"
              textAnchor="end"
              fontSize="8.5"
              fontWeight="bold"
              fill="#475569"
            >
              Temps →
            </text>

            {/* Courbe CO₂ */}
            {history.length > 1 && (
              <polyline
                fill="none"
                stroke="#0F766E"
                strokeWidth="2.4"
                points={co2PolylinePoints}
              />
            )}
            <circle cx={currentChartX} cy={currentChartYCo2} r="4" fill="#0F766E" />
            <text
              x={Math.min(265, currentChartX + 6)}
              y={Math.max(22, currentChartYCo2 - 5)}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#0F766E"
            >
              CO₂ ({metrics.co2Produced.toFixed(0)})
            </text>

            {/* Courbe CO + C (imbrûlés) */}
            {history.length > 1 && (
              <polyline
                fill="none"
                stroke="#DC2626"
                strokeWidth="2.2"
                strokeDasharray="5 3"
                points={imbrulesPolylinePoints}
              />
            )}
            <rect
              x={currentChartX - 3.5}
              y={currentChartYImb - 3.5}
              width="7"
              height="7"
              fill="#DC2626"
            />
            <text
              x={Math.min(255, currentChartX + 6)}
              y={Math.min(115, currentChartYImb + 12)}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#DC2626"
            >
              CO+C ({currentImbrules.toFixed(0)})
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
