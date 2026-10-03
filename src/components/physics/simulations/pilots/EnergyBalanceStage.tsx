import React from 'react';
import { SimulationStageProps } from '../types';
import {
  EnergyBalanceMetrics,
  EnergyBalanceParams,
  getDeviceDescriptor,
} from './energyBalanceModel';
import { Zap, Activity, CheckCircle2, Gauge } from 'lucide-react';

/**
 * Scène interactive du Cours 09 : الحصيلة الطاقوية والمردود الطاقوي (η)
 * Affiche le diagramme de bilan énergétique quantitatif (Sankey 3AM), la vérification
 * de la conservation de l'énergie E_reçue = E_utile + E_dissipée et le calcul du rendement η.
 */
export const EnergyBalanceStage: React.FC<
  SimulationStageProps<EnergyBalanceMetrics, EnergyBalanceParams>
> = ({ state, pedagogy }) => {
  const { metrics, progress, elapsedTime, reducedMotion, status, history } =
    state;

  const descriptor = getDeviceDescriptor(metrics.deviceType);

  // Épaisseurs proportionnelles des flèches de flux (total = 64 px)
  const totalBandThickness = 64;
  const usefulThickness = Math.max(
    12,
    Math.round((metrics.efficiencyPercent / 100) * totalBandThickness)
  );
  const dissipatedThickness = Math.max(
    10,
    totalBandThickness - usefulThickness
  );

  // Déplacement des impulsions lumineuses le long du flux (si en cours et non reducedMotion)
  const pulseOffset =
    !reducedMotion && status === 'running' ? (elapsedTime * 65) % 100 : 45;

  // Dimensions du graphique dynamique (Énergie transférée = f(Temps))
  const chartWidth = 240;
  const chartHeight = 92;
  const chartX0 = 48;
  const chartY0 = 116;
  const maxChartEnergy = Math.max(100, metrics.nominalInputJoules);

  const inputPolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const val = pt.values.InputJ ?? 0;
      const y = chartY0 - (val / maxChartEnergy) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const usefulPolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const val = pt.values.UsefulJ ?? 0;
      const y = chartY0 - (val / maxChartEnergy) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const dissipatedPolylinePoints = history
    .map((pt) => {
      const x = chartX0 + pt.progress * chartWidth;
      const val = pt.values.DissipatedJ ?? 0;
      const y = chartY0 - (val / maxChartEnergy) * chartHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const currentChartX = chartX0 + progress * chartWidth;
  const currentChartYInput =
    chartY0 - (metrics.transferredInputJoules / maxChartEnergy) * chartHeight;
  const currentChartYUseful =
    chartY0 - (metrics.transferredUsefulJoules / maxChartEnergy) * chartHeight;
  const currentChartYDiss =
    chartY0 -
    (metrics.transferredDissipatedJoules / maxChartEnergy) * chartHeight;

  return (
    <div className="space-y-4">
      {/* ================================================================== */}
      {/* 1. DIAGRAMME QUANTITATIF DU BILAN ÉNERGÉTIQUE (SANKEY 3AM)         */}
      {/* ================================================================== */}
      <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D97706]">
            <Zap className="w-4 h-4 shrink-0" />
            <span>
              مخطط الحصيلة الطاقوية الكمي للجهاز : {descriptor.nameArabic}
            </span>
          </div>
          <span
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
            className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-[6px] bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309]"
          >
            {descriptor.nameFrench} · E_reçue = {metrics.nominalInputJoules} J · η
            = {metrics.efficiencyPercent}%
          </span>
        </div>

        <svg
          viewBox="0 0 680 295"
          role="img"
          aria-label="مخطط الحصيلة الطاقوية الكمي يوضح الطاقة المستقبلة وتفرعها إلى طاقة مفيدة وطاقة منتشرة مع حساب المردود"
          className="w-full max-w-2xl mx-auto h-auto select-none"
          style={{ direction: 'ltr' }}
        >
          <title>
            Bilan énergétique quantitatif — Conservation de l’énergie et rendement η
          </title>

          <rect
            x="4"
            y="4"
            width="672"
            height="287"
            rx="12"
            fill="#FAF7F4"
            stroke="#E2D9D0"
          />

          {/* ============================================================== */}
          {/* A. CARTE GAUCHE : ÉNERGIE REÇUE (E_reçue)                      */}
          {/* ============================================================== */}
          <rect
            x="16"
            y="64"
            width="160"
            height="112"
            rx="10"
            fill="#EFF6FF"
            stroke="#2563EB"
            strokeWidth="1.8"
          />
          <text
            x="96"
            y="84"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="#1E40AF"
          >
            الطاقة الداخلة (المستقبلة)
          </text>
          <text
            x="96"
            y="100"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#2563EB"
          >
            Énergie reçue (E_reçue)
          </text>
          <text
            x="96"
            y="128"
            textAnchor="middle"
            fontSize="19"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#1D4ED8"
          >
            {metrics.nominalInputJoules} J
          </text>
          <text
            x="96"
            y="148"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill="#1E3A8A"
          >
            {descriptor.inputFormArabic} (100%)
          </text>
          <text
            x="96"
            y="164"
            textAnchor="middle"
            fontSize="8.5"
            fontFamily="monospace"
            fill="#475569"
          >
            {descriptor.inputFormFrench}
          </text>

          {/* ============================================================== */}
          {/* B. FLUX ENTRANT PROPORTIONNEL (100% = 64 px)                   */}
          {/* ============================================================== */}
          <rect
            x="176"
            y="88"
            width="76"
            height={totalBandThickness}
            fill="#93C5FD"
            fillOpacity="0.55"
            stroke="#2563EB"
            strokeWidth="1.4"
          />
          {/* Impulsion sur le flux entrant */}
          {(status === 'running' || progress > 0) && (
            <circle
              cx={184 + (pulseOffset / 100) * 60}
              cy="120"
              r="5"
              fill="#1D4ED8"
            />
          )}
          <polygon points="246,112 258,120 246,128" fill="#1D4ED8" />

          {/* ============================================================== */}
          {/* C. SYSTÈME CONVERTISSEUR CENTRAL (BULLE / BOÎTE TECHNIQUE)     */}
          {/* ============================================================== */}
          <rect
            x="252"
            y="54"
            width="156"
            height="132"
            rx="14"
            fill="#FFFBEB"
            stroke="#D97706"
            strokeWidth="2.4"
          />
          <rect
            x="266"
            y="64"
            width="128"
            height="22"
            rx="6"
            fill="#FEF3C7"
          />
          <text
            x="330"
            y="79"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill="#92400E"
          >
            النظام المحول · Système
          </text>

          <text
            x="330"
            y="108"
            textAnchor="middle"
            fontSize="13"
            fontWeight="bold"
            fill="#1A1A1A"
          >
            {descriptor.nameArabic}
          </text>
          <text
            x="330"
            y="125"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#B45309"
          >
            {descriptor.nameFrench}
          </text>

          {/* Badge Rendement η au coeur du système */}
          <rect
            x="276"
            y="138"
            width="108"
            height="34"
            rx="8"
            fill="#D97706"
          />
          <text
            x="330"
            y="153"
            textAnchor="middle"
            fontSize="9"
            fontWeight="bold"
            fill="#FEF3C7"
          >
            المردود الطاقوي
          </text>
          <text
            x="330"
            y="167"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#FFFFFF"
          >
            η = {metrics.efficiencyPercent}%
          </text>

          {/* ============================================================== */}
          {/* D. BRANCHE SUPÉRIEURE : ÉNERGIE UTILE (E_utile)                */}
          {/* ============================================================== */}
          <path
            d={`M 408 ${110 - usefulThickness / 2} L 478 ${
              62 - usefulThickness / 2
            } L 478 ${62 + usefulThickness / 2} L 408 ${
              110 + usefulThickness / 2
            } Z`}
            fill="#86EFAC"
            fillOpacity="0.65"
            stroke="#15803D"
            strokeWidth="1.4"
          />
          <polygon points="472,55 484,62 472,69" fill="#15803D" />

          <rect
            x="484"
            y="18"
            width="180"
            height="92"
            rx="10"
            fill="#F0FDF4"
            stroke="#16A34A"
            strokeWidth="1.8"
          />
          <text
            x="574"
            y="37"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="#166534"
          >
            طاقة مفيدة (Énergie utile)
          </text>
          <text
            x="574"
            y="62"
            textAnchor="middle"
            fontSize="18"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#15803D"
          >
            E_utile = {metrics.nominalUsefulJoules} J
          </text>
          <text
            x="574"
            y="81"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="bold"
            fill="#14532D"
          >
            {descriptor.usefulFormArabic} ({metrics.efficiencyPercent}%)
          </text>
          <text
            x="574"
            y="97"
            textAnchor="middle"
            fontSize="8.5"
            fontFamily="monospace"
            fill="#166534"
          >
            {descriptor.usefulFormFrench}
          </text>

          {/* ============================================================== */}
          {/* E. BRANCHE INFÉRIEURE : ÉNERGIE DISSIPÉE (E_dissipée)          */}
          {/* ============================================================== */}
          <path
            d={`M 408 ${142 - dissipatedThickness / 2} L 478 ${
              174 - dissipatedThickness / 2
            } L 478 ${174 + dissipatedThickness / 2} L 408 ${
              142 + dissipatedThickness / 2
            } Z`}
            fill="#FDBA74"
            fillOpacity="0.65"
            stroke="#C2410C"
            strokeWidth="1.4"
          />
          <polygon points="472,167 484,174 472,181" fill="#C2410C" />

          <rect
            x="484"
            y="124"
            width="180"
            height="96"
            rx="10"
            fill="#FFF7ED"
            stroke="#EA580C"
            strokeWidth="1.8"
          />
          <text
            x="574"
            y="143"
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            fill="#9A3412"
          >
            طاقة منتشرة (Énergie dissipée)
          </text>
          <text
            x="574"
            y="168"
            textAnchor="middle"
            fontSize="18"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#C2410C"
          >
            E_dissipée = {metrics.nominalDissipatedJoules} J
          </text>
          <text
            x="574"
            y="186"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="bold"
            fill="#7C2D12"
          >
            {descriptor.dissipatedFormArabic} ({metrics.dissipatedPercent}%)
          </text>
          <text
            x="574"
            y="204"
            textAnchor="middle"
            fontSize="8.5"
            fontFamily="monospace"
            fill="#9A3412"
          >
            {descriptor.hasSoundBranch
              ? `Thermique: ${metrics.nominalThermalDissipatedJoules} J + Sonore: ${metrics.nominalSoundJoules} J`
              : `${descriptor.dissipatedFormFrench} (مبددة ≠ مختفية)`}
          </text>

          {/* ============================================================== */}
          {/* F. BANDEAU INFÉRIEUR : ÉQUATION DE CONSERVATION & RENDEMENT    */}
          {/* ============================================================== */}
          <rect
            x="16"
            y="232"
            width="648"
            height="48"
            rx="10"
            fill="#FFFFFF"
            stroke="#D97706"
            strokeWidth="1.6"
          />
          <text
            x="340"
            y="251"
            textAnchor="middle"
            fontSize="11.5"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#1A1A1A"
          >
            Conservation : E_reçue ({metrics.nominalInputJoules} J) = E_utile (
            {metrics.nominalUsefulJoules} J) + E_dissipée (
            {metrics.nominalDissipatedJoules} J)
          </text>
          <text
            x="340"
            y="269"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#B45309"
          >
            Rendement : η = (E_utile / E_reçue) × 100 = (
            {metrics.nominalUsefulJoules} / {metrics.nominalInputJoules}) × 100
            = {metrics.efficiencyPercent}%
          </text>
        </svg>

        {pedagogy.macroscopicWarningArabic && (
          <p className="text-xs text-[#92400E] bg-[#FFFBEB] rounded-[8px] px-3 py-2 border border-[#FDE68A] leading-relaxed">
            {pedagogy.macroscopicWarningArabic}
          </p>
        )}
      </div>

      {/* ================================================================== */}
      {/* 2. CARTES DE MESURES QUANTITATIVES & GRAPHIQUE CUMULÉ E = f(t)     */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* 4 Cartes de mesures en direct */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-2.5">
          {/* Carte 1 : Énergie reçue E_reçue */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1D4ED8]">
                الطاقة المستقبلة
              </span>
              <span
                dir="ltr"
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8]"
              >
                E_reçue
              </span>
            </div>
            <div
              dir="ltr"
              className="text-xl sm:text-2xl font-mono font-extrabold text-[#1D4ED8] my-1"
              data-testid="metric-e-recue"
            >
              {metrics.nominalInputJoules} J
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              المحولة آنيًا :{' '}
              <strong dir="ltr">{metrics.transferredInputJoules} J</strong>
            </div>
          </div>

          {/* Carte 2 : Énergie utile E_utile */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#15803D]">
                الطاقة المفيدة
              </span>
              <span
                dir="ltr"
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F0FDF4] text-[#15803D]"
              >
                E_utile
              </span>
            </div>
            <div
              dir="ltr"
              className="text-xl sm:text-2xl font-mono font-extrabold text-[#15803D] my-1"
              data-testid="metric-e-utile"
            >
              {metrics.nominalUsefulJoules} J
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              المحولة آنيًا :{' '}
              <strong dir="ltr">{metrics.transferredUsefulJoules} J</strong>
            </div>
          </div>

          {/* Carte 3 : Énergie dissipée E_dissipée */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C2410C]">
                الطاقة المنتشرة
              </span>
              <span
                dir="ltr"
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FFF7ED] text-[#C2410C]"
              >
                E_dissipée
              </span>
            </div>
            <div
              dir="ltr"
              className="text-xl sm:text-2xl font-mono font-extrabold text-[#C2410C] my-1"
              data-testid="metric-e-dissipee"
            >
              {metrics.nominalDissipatedJoules} J
            </div>
            <div className="text-[11px] text-[#6B6B6B] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#15803D] shrink-0" />
              <span>مبددة ≠ مختفية ({metrics.dissipatedPercent}%)</span>
            </div>
          </div>

          {/* Carte 4 : Rendement énergétique η */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B45309] flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" />
                <span>المردود الطاقوي</span>
              </span>
              <span
                dir="ltr"
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FFFBEB] text-[#B45309]"
              >
                η = {metrics.efficiencyDecimal}
              </span>
            </div>
            <div
              dir="ltr"
              className="text-xl sm:text-2xl font-mono font-extrabold text-[#B45309] my-1"
              data-testid="metric-efficiency"
            >
              {metrics.efficiencyPercent} %
            </div>
            {/* Barre de jauge visuelle */}
            <div
              className="w-full h-2 rounded-full bg-[#FED7AA] overflow-hidden flex"
              dir="ltr"
            >
              <div
                style={{ width: `${metrics.efficiencyPercent}%` }}
                className="h-full bg-[#16A34A]"
              />
            </div>
          </div>
        </div>

        {/* Graphique dynamique : Énergie transférée cumulée (J) en fonction du temps */}
        <div className="lg:col-span-6 bg-white rounded-[12px] border border-[#E2D9D0] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#F1ECE6] pb-1.5 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A]">
              <Activity className="w-3.5 h-3.5 text-[#D97706]" />
              <span>تطور الطاقات المحولة بدلالة الزمن (انحفاظ الطاقة)</span>
            </div>
            <span dir="ltr" className="text-[10px] font-mono text-[#6B6B6B]">
              E (J) = f(Temps)
            </span>
          </div>

          <svg
            viewBox="0 0 310 140"
            role="img"
            aria-label="منحنى بياني لتراكم الطاقة المستقبلة والطاقة المفيدة والطاقة المنتشرة بدلالة الزمن"
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
              x={chartX0 - 5}
              y={chartY0 + 3}
              textAnchor="end"
              fontSize="8"
              fontFamily="monospace"
              fill="#64748B"
            >
              0 J
            </text>
            <text
              x={chartX0 - 5}
              y={chartY0 - chartHeight / 2 + 3}
              textAnchor="end"
              fontSize="8"
              fontFamily="monospace"
              fill="#64748B"
            >
              {Math.round(maxChartEnergy / 2)} J
            </text>
            <text
              x={chartX0 - 5}
              y={chartY0 - chartHeight + 3}
              textAnchor="end"
              fontSize="8"
              fontFamily="monospace"
              fill="#64748B"
            >
              {maxChartEnergy} J
            </text>

            {/* Courbes E_reçue, E_utile, E_dissipée */}
            <polyline
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="2.4"
              points={inputPolylinePoints}
            />
            <polyline
              fill="none"
              stroke="#16A34A"
              strokeWidth="2.2"
              points={usefulPolylinePoints}
            />
            <polyline
              fill="none"
              stroke="#EA580C"
              strokeWidth="2.2"
              strokeDasharray="3 2"
              points={dissipatedPolylinePoints}
            />

            {/* Points courants */}
            <circle
              cx={currentChartX}
              cy={currentChartYInput}
              r="3.5"
              fill="#1D4ED8"
            />
            <circle
              cx={currentChartX}
              cy={currentChartYUseful}
              r="3.5"
              fill="#16A34A"
            />
            <circle
              cx={currentChartX}
              cy={currentChartYDiss}
              r="3.5"
              fill="#EA580C"
            />

            {/* Légende */}
            <g transform="translate(52, 12)">
              <circle cx="0" cy="0" r="3.5" fill="#1D4ED8" />
              <text
                x="6"
                y="3"
                fontSize="8"
                fontWeight="bold"
                fill="#1D4ED8"
              >
                E_reçue (100%)
              </text>

              <circle cx="84" cy="0" r="3.5" fill="#16A34A" />
              <text
                x="90"
                y="3"
                fontSize="8"
                fontWeight="bold"
                fill="#16A34A"
              >
                E_utile ({metrics.efficiencyPercent}%)
              </text>

              <circle cx="164" cy="0" r="3.5" fill="#EA580C" />
              <text
                x="170"
                y="3"
                fontSize="8"
                fontWeight="bold"
                fill="#EA580C"
              >
                E_dissipée ({metrics.dissipatedPercent}%)
              </text>
            </g>

            <text
              x={chartX0 + chartWidth / 2}
              y="135"
              textAnchor="middle"
              fontSize="8.5"
              fill="#64748B"
            >
              À chaque instant : E_reçue(t) = E_utile(t) + E_dissipée(t)
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
