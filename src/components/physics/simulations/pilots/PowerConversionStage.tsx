import React from 'react';
import { SimulationStageProps } from '../types';
import {
  PowerConversionMetrics,
  PowerConversionParams,
} from './powerConversionModel';
import { Zap, Activity, Clock, Gauge, ArrowUpRight } from 'lucide-react';

export const PowerConversionStage: React.FC<
  SimulationStageProps<PowerConversionMetrics, PowerConversionParams>
> = ({ state }) => {
  const { progress, metrics, representationMode } = state;

  const maxFinalEnergy = Math.max(
    1,
    metrics.finalEnergyAJoules,
    metrics.finalEnergyBJoules
  );

  const ratioFillA = Math.min(1, metrics.energyAJoules / maxFinalEnergy);
  const ratioFillB = Math.min(1, metrics.energyBJoules / maxFinalEnergy);

  return (
    <div className="w-full p-3 sm:p-5 space-y-4 select-none">

      {/* اللوحة البصرية الرئيسية : مقارنة الجهازين A و B + مثلث العلاقات الحي */}
      <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2 border-b border-[#F1ECE6]">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#D97706]" />
            <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              مقارنة سرعة تحويل الطاقة بين الجهازين (A) و (B) خلال نفس المدة الزمنية
            </span>
          </div>
          <div
            dir="ltr"
            className="px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#F59E0B] text-[11px] font-mono font-bold text-[#B45309]"
          >
            t = {metrics.elapsedSeconds} s / {metrics.totalDurationSeconds} s
          </div>
        </div>

        <svg
          viewBox="0 0 760 285"
          className="w-full h-auto"
          style={{ direction: 'ltr' }}
          role="img"
          aria-label="محاكاة مقارنة استطاعة تحويل الطاقة لجهازين A و B"
        >
          <rect
            x="4"
            y="4"
            width="752"
            height="277"
            rx="12"
            fill="#FAF7F4"
            stroke="#E5DDD5"
          />

          {/* ==================== الجهاز A (أعلى يسار) ==================== */}
          <g transform="translate(18, 18)">
            <rect
              x="0"
              y="0"
              width="475"
              height="116"
              rx="10"
              fill="#FFFFFF"
              stroke="#93C5FD"
              strokeWidth="2"
            />

            {/* بطاقة الصانع للجهاز A */}
            <rect
              x="12"
              y="12"
              width="136"
              height="92"
              rx="8"
              fill="#EFF6FF"
              stroke="#3B82F6"
              strokeWidth="1.5"
            />
            <text
              x="80"
              y="30"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#1E3A8A"
            >
              الجهاز (A) · Appareil A
            </text>
            <text
              x="80"
              y="54"
              textAnchor="middle"
              fontSize="18"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#1D4ED8"
            >
              P_A = {metrics.powerAWatts} W
            </text>
            <text
              x="80"
              y="73"
              textAnchor="middle"
              fontSize="10.5"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#2563EB"
            >
              ({metrics.powerAKilowatts} kW = {metrics.conversionRateAJoulesPerSec} J/s)
            </text>
            <text
              x="80"
              y="93"
              textAnchor="middle"
              fontSize="10"
              fill="#475569"
            >
              يحوّل {metrics.conversionRateAJoulesPerSec} J في كل ثانية
            </text>

            {/* شريط وعدّاد الطاقة المحوّلة E_A */}
            <text
              x="164"
              y="30"
              fontSize="12"
              fontWeight="bold"
              fill="#1E3A8A"
            >
              الطاقة المحوّلة E_A = P_A × t :
            </text>
            <text
              x="460"
              y="30"
              textAnchor="end"
              fontSize="15"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#1D4ED8"
            >
              {metrics.energyAJoules} J
            </text>

            {/* خلفية خزان الطاقة A */}
            <rect
              x="164"
              y="42"
              width="296"
              height="30"
              rx="8"
              fill="#E2E8F0"
              stroke="#CBD5E1"
            />
            <rect
              x="166"
              y="44"
              width={Math.max(0, Math.round(292 * ratioFillA))}
              height="26"
              rx="6"
              fill="#2563EB"
            />
            <text
              x="312"
              y="61"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              fill={ratioFillA > 0.45 ? '#FFFFFF' : '#1E293B'}
            >
              E_A = {metrics.powerAWatts} W × {metrics.elapsedSeconds} s = {metrics.energyAJoules} J
            </text>

            <text
              x="164"
              y="95"
              fontSize="11"
              fontFamily="monospace"
              fill="#475569"
            >
              الطاقة عند نهاية المدة ({metrics.totalDurationSeconds} s) : E_A(max) = {metrics.finalEnergyAJoules} J
            </text>
          </g>

          {/* ==================== الجهاز B (أسفل يسار) ==================== */}
          <g transform="translate(18, 148)">
            <rect
              x="0"
              y="0"
              width="475"
              height="116"
              rx="10"
              fill="#FFFFFF"
              stroke="#F59E0B"
              strokeWidth="2"
            />

            {/* بطاقة الصانع للجهاز B */}
            <rect
              x="12"
              y="12"
              width="136"
              height="92"
              rx="8"
              fill="#FFFBEB"
              stroke="#D97706"
              strokeWidth="1.5"
            />
            <text
              x="80"
              y="30"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#92400E"
            >
              الجهاز (B) · Appareil B
            </text>
            <text
              x="80"
              y="54"
              textAnchor="middle"
              fontSize="18"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#B45309"
            >
              P_B = {metrics.powerBWatts} W
            </text>
            <text
              x="80"
              y="73"
              textAnchor="middle"
              fontSize="10.5"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#D97706"
            >
              ({metrics.powerBKilowatts} kW = {metrics.conversionRateBJoulesPerSec} J/s)
            </text>
            <text
              x="80"
              y="93"
              textAnchor="middle"
              fontSize="10"
              fill="#78350F"
            >
              يحوّل {metrics.conversionRateBJoulesPerSec} J في كل ثانية
            </text>

            {/* شريط وعدّاد الطاقة المحوّلة E_B */}
            <text
              x="164"
              y="30"
              fontSize="12"
              fontWeight="bold"
              fill="#92400E"
            >
              الطاقة المحوّلة E_B = P_B × t :
            </text>
            <text
              x="460"
              y="30"
              textAnchor="end"
              fontSize="15"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#C2410C"
            >
              {metrics.energyBJoules} J
            </text>

            {/* خلفية خزان الطاقة B */}
            <rect
              x="164"
              y="42"
              width="296"
              height="30"
              rx="8"
              fill="#FDE68A"
              stroke="#F59E0B"
            />
            <rect
              x="166"
              y="44"
              width={Math.max(0, Math.round(292 * ratioFillB))}
              height="26"
              rx="6"
              fill="#EA580C"
            />
            <text
              x="312"
              y="61"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              fill={ratioFillB > 0.45 ? '#FFFFFF' : '#78350F'}
            >
              E_B = {metrics.powerBWatts} W × {metrics.elapsedSeconds} s = {metrics.energyBJoules} J
            </text>

            <text
              x="164"
              y="95"
              fontSize="11"
              fontFamily="monospace"
              fill="#78350F"
            >
              الطاقة عند نهاية المدة ({metrics.totalDurationSeconds} s) : E_B(max) = {metrics.finalEnergyBJoules} J
            </text>
          </g>

          {/* ==================== مثلث العلاقات الحي (يمين) ==================== */}
          <g transform="translate(508, 18)">
            <rect
              x="0"
              y="0"
              width="234"
              height="246"
              rx="10"
              fill="#FFFFFF"
              stroke="#D97706"
              strokeWidth="2"
            />
            <text
              x="117"
              y="24"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#92400E"
            >
              مثلث العلاقات (E , P , t)
            </text>

            {/* المثلث */}
            <polygon
              points="117,36 38,142 196,142"
              fill="#FFFBEB"
              stroke="#D97706"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <line
              x1="77"
              y1="88"
              x2="157"
              y2="88"
              stroke="#D97706"
              strokeWidth="2"
            />
            <line
              x1="117"
              y1="88"
              x2="117"
              y2="142"
              stroke="#D97706"
              strokeWidth="2"
            />

            <text
              x="117"
              y="72"
              textAnchor="middle"
              fontSize="18"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#15803D"
            >
              E (J)
            </text>
            <text
              x="88"
              y="122"
              textAnchor="middle"
              fontSize="16"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#B45309"
            >
              P (W)
            </text>
            <text
              x="117"
              y="120"
              textAnchor="middle"
              fontSize="13"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#D97706"
            >
              ×
            </text>
            <text
              x="146"
              y="122"
              textAnchor="middle"
              fontSize="16"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#1D4ED8"
            >
              t (s)
            </text>

            {/* العلاقات الثلاث + النسبة */}
            <rect
              x="14"
              y="154"
              width="206"
              height="36"
              rx="6"
              fill="#F0FDF4"
              stroke="#86EFAC"
            />
            <text
              x="117"
              y="170"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#166534"
            >
              P = E / t  |  E = P × t  |  t = E / P
            </text>
            <text
              x="117"
              y="184"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fill="#15803D"
            >
              1 W = 1 J / 1 s = 1 J/s
            </text>

            <rect
              x="14"
              y="198"
              width="206"
              height="36"
              rx="6"
              fill="#FFF7ED"
              stroke="#FDBA74"
            />
            <text
              x="117"
              y="214"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#9A3412"
            >
              نسبة الاستطاعتين (P_B / P_A) :
            </text>
            <text
              x="117"
              y="228"
              textAnchor="middle"
              fontSize="11.5"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#C2410C"
            >
              P_B / P_A = {metrics.powerRatioBtoA} ⟹ E_B = {metrics.powerRatioBtoA} × E_A
            </text>
          </g>
        </svg>
      </div>

      {/* بطاقات القياس الفوري الأربعة */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-[12px] bg-white border border-[#93C5FD] space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#1E3A8A]">
            <span>طاقة الجهاز الأول (E_A)</span>
            <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
          </div>
          <div
            dir="ltr"
            className="text-base sm:text-lg font-mono font-extrabold text-[#1D4ED8]"
          >
            {metrics.energyAJoules} J
          </div>
          <div dir="ltr" className="text-[10.5px] font-mono text-[#64748B]">
            P_A = {metrics.powerAWatts} W ({metrics.conversionRateAJoulesPerSec} J/s)
          </div>
        </div>

        <div className="p-3 rounded-[12px] bg-white border border-[#F59E0B] space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#92400E]">
            <span>طاقة الجهاز الثاني (E_B)</span>
            <Zap className="w-3.5 h-3.5 text-[#EA580C]" />
          </div>
          <div
            dir="ltr"
            className="text-base sm:text-lg font-mono font-extrabold text-[#C2410C]"
          >
            {metrics.energyBJoules} J
          </div>
          <div dir="ltr" className="text-[10.5px] font-mono text-[#78350F]">
            P_B = {metrics.powerBWatts} W ({metrics.conversionRateBJoulesPerSec} J/s)
          </div>
        </div>

        <div className="p-3 rounded-[12px] bg-white border border-[#86EFAC] space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#166534]">
            <span>مدة التشغيل (t)</span>
            <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
          </div>
          <div
            dir="ltr"
            className="text-base sm:text-lg font-mono font-extrabold text-[#15803D]"
          >
            {metrics.elapsedSeconds} s
          </div>
          <div dir="ltr" className="text-[10.5px] font-mono text-[#166534]">
            Sur t_total = {metrics.totalDurationSeconds} s
          </div>
        </div>

        <div className="p-3 rounded-[12px] bg-white border border-[#E2D9D0] space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#4A4A4A]">
            <span>نسبة السرعة (P_B / P_A)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D97706]" />
          </div>
          <div
            dir="ltr"
            className="text-base sm:text-lg font-mono font-extrabold text-[#B45309]"
          >
            × {metrics.powerRatioBtoA}
          </div>
          <div className="text-[10.5px] text-[#6B6B6B]">
            الاستطاعة تمثل سرعة تحويل الطاقة
          </div>
        </div>
      </div>

      {/* المنحنى البياني الديناميكي E = f(t) عند اختيار العرض المزدوج (both) */}
      {representationMode === 'both' && (
        <div className="bg-white rounded-[14px] border border-[#E2D9D0] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0F766E]" />
              <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                المنحنى البياني لتطور الطاقة المحوّلة بدلالة الزمن E = f(t) — الميل يمثل الاستطاعة P
              </span>
            </div>
            <span dir="ltr" className="text-xs font-mono font-bold text-[#0F766E]">
              P = E / t (Pente de la droite)
            </span>
          </div>

          <svg
            viewBox="0 0 680 210"
            className="w-full h-auto"
            style={{ direction: 'ltr' }}
            role="img"
            aria-label="منحنى الطاقة بدلالة الزمن E = P × t للجهازين A و B"
          >
            <rect
              x="0"
              y="0"
              width="680"
              height="210"
              rx="10"
              fill="#FAF7F4"
            />

            {/* المحاور */}
            <line
              x1="70"
              y1="175"
              x2="630"
              y2="175"
              stroke="#334155"
              strokeWidth="2"
            />
            <line
              x1="70"
              y1="175"
              x2="70"
              y2="22"
              stroke="#334155"
              strokeWidth="2"
            />

            {/* عناوين المحاور */}
            <text
              x="640"
              y="179"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#1E293B"
            >
              t (s)
            </text>
            <text
              x="65"
              y="15"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#1E293B"
            >
              E (J)
            </text>

            {/* خطوط الشبكة الأفقية */}
            {[0.25, 0.5, 0.75, 1].map((frac, idx) => {
              const y = 175 - frac * 140;
              const val = Math.round(maxFinalEnergy * frac);
              return (
                <g key={idx}>
                  <line
                    x1="70"
                    y1={y}
                    x2="620"
                    y2={y}
                    stroke="#E2E8F0"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="64"
                    y={y + 4}
                    textAnchor="end"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fill="#64748B"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* حساب إحداثيات المستقيمين الكاملين والحاليين */}
            {(() => {
              const xMax = 610;
              const widthPlot = xMax - 70;
              const heightPlot = 140;

              const yEndA =
                175 - (metrics.finalEnergyAJoules / maxFinalEnergy) * heightPlot;
              const yEndB =
                175 - (metrics.finalEnergyBJoules / maxFinalEnergy) * heightPlot;

              const xCurr = 70 + progress * widthPlot;
              const yCurrA =
                175 - (metrics.energyAJoules / maxFinalEnergy) * heightPlot;
              const yCurrB =
                175 - (metrics.energyBJoules / maxFinalEnergy) * heightPlot;

              return (
                <>
                  {/* المسار المرجعي المتقطع للجهازين */}
                  <line
                    x1="70"
                    y1="175"
                    x2={xMax}
                    y2={yEndA}
                    stroke="#93C5FD"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="70"
                    y1="175"
                    x2={xMax}
                    y2={yEndB}
                    stroke="#FDBA74"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />

                  {/* المسار الفعلي المرسوم حتى اللحظة t */}
                  <line
                    x1="70"
                    y1="175"
                    x2={xCurr}
                    y2={yCurrA}
                    stroke="#2563EB"
                    strokeWidth="3"
                  />
                  <line
                    x1="70"
                    y1="175"
                    x2={xCurr}
                    y2={yCurrB}
                    stroke="#EA580C"
                    strokeWidth="3"
                  />

                  {/* النقاط المتحركة */}
                  <circle cx={xCurr} cy={yCurrA} r="5" fill="#2563EB" />
                  <circle cx={xCurr} cy={yCurrB} r="5" fill="#EA580C" />

                  {/* تسمية المنحنيين */}
                  <text
                    x={xMax - 6}
                    y={Math.max(28, yEndB - 6)}
                    textAnchor="end"
                    fontSize="10.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="#C2410C"
                  >
                    Appareil B ({metrics.powerBWatts} W) → E_B = {metrics.finalEnergyBJoules} J
                  </text>
                  <text
                    x={xMax - 6}
                    y={Math.min(168, yEndA + 14)}
                    textAnchor="end"
                    fontSize="10.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="#1D4ED8"
                  >
                    Appareil A ({metrics.powerAWatts} W) → E_A = {metrics.finalEnergyAJoules} J
                  </text>

                  {/* تدريجة الزمن النهائي */}
                  <text
                    x={xMax}
                    y="192"
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="#334155"
                  >
                    t_max = {metrics.totalDurationSeconds} s
                  </text>
                </>
              );
            })()}
          </svg>
        </div>
      )}
    </div>
  );
};
