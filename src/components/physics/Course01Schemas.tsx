import React from 'react';
import { ChemicalFormula, ChemPhysText } from './ChemPhysText';
import { ArrowDown, Lightbulb, Flame } from 'lucide-react';
import { ZoomableCourseImage } from '../ImageLightbox';
import { FireTriangleSimulator } from './FireTriangleSimulator';
import { EquationBalancerTool } from './EquationBalancerTool';
import {
  Course09DiscoveryInteractive,
  Course09ThreeDevicesTableActivity,
  Course09EfficiencyMiniActivity,
  Course09SchemaBilanSynthese,
  HydroelectricEnergyChainSvg,
  DynamoComponentsVsEnergySchema,
  Course09Mistake2Interactive,
} from './Course09InteractiveComponents';

/**
 * Helper SVG: Miniature CPK Water Molecule (H₂O)
 */
const H2OMiniSvg: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <circle cx="-12" cy="9.5" r="7.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.6" />
    <circle cx="12" cy="9.5" r="7.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.6" />
    <circle cx="0" cy="0" r="11" fill="#DC2626" stroke="#991B1B" strokeWidth="1.6" />
    <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
      O
    </text>
    <text x="-12" y="12.5" textAnchor="middle" fill="#1E293B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
      H
    </text>
    <text x="12" y="12.5" textAnchor="middle" fill="#1E293B" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
      H
    </text>
  </g>
);

/**
 * Helper SVG: Miniature CPK Dioxygen Molecule (O₂)
 */
const O2MiniSvg: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    <circle cx="-8" cy="0" r="9.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
    <circle cx="8" cy="0" r="9.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
    <text x="-8" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
      O
    </text>
    <text x="8" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
      O
    </text>
  </g>
);

export const Course01SchemaRenderer: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    // ========================================================================
    // 1. النشاط الاستكشافي : صورة توضيحية + رسوم العينات الثلاث الملموسة
    // ========================================================================
    case 'c01-everyday-materials':
      return (
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3">
          {/* Illustration panoramique vectorielle construite (remplace l'image IA) */}
          <div className="bg-white rounded-[10px] border border-[#E5DDD5] p-3 space-y-2">
            <svg viewBox="0 0 600 110" className="w-full h-auto bg-[#FBFBFA] rounded-[8px] border border-[#EAE2DA]">
              {/* Situation A: Water drop & Beaker */}
              <g transform="translate(100, 10)">
                <rect x="-85" y="0" width="170" height="90" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1" />
                {/* Droplet */}
                <path d="M-45 22 C-45 22 -58 40 -58 50 C-58 58 -52 64 -45 64 C-38 64 -32 58 -32 50 C-32 40 -45 22 -45 22 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                {/* Glass */}
                <path d="M22 24 L27 68 L63 68 L68 24 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
                <path d="M24 38 L27 67 L63 67 L66 38 Z" fill="#38BDF8" opacity="0.65" />
              </g>

              {/* Situation B: Iron nail & Closed O2 Flask */}
              <g transform="translate(300, 10)">
                <rect x="-85" y="0" width="170" height="90" rx="8" fill="#FAF7F4" stroke="#E5DDD5" strokeWidth="1" />
                {/* Iron nail */}
                <rect x="-65" y="44" width="45" height="5" rx="1.5" fill="#64748B" stroke="#334155" strokeWidth="1.2" />
                <rect x="-68" y="39" width="4.5" height="15" rx="1" fill="#475569" />
                <polygon points="-20,44 -12,46.5 -20,49" fill="#64748B" />
                {/* O2 Flask with 2 bonded atoms */}
                <g transform="translate(42, 14)">
                  <rect x="-5" y="0" width="10" height="3" rx="1" fill="#475569" />
                  <rect x="-3" y="3" width="6" height="5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
                  <path d="M-3 8 L-15 36 C-15 39 -12 41 -9 41 L9 41 C12 41 15 39 15 36 L3 8 Z" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.3" />
                  {/* Diatomic O2 (2 atoms only) */}
                  <g transform="translate(0, 26) scale(0.6)">
                    <line x1="-5" y1="-2" x2="5" y2="-2" stroke="#991B1B" strokeWidth="1.5" />
                    <line x1="-5" y1="2" x2="5" y2="2" stroke="#991B1B" strokeWidth="1.5" />
                    <circle cx="-7.5" cy="0" r="7.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
                    <circle cx="7.5" cy="0" r="7.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
                    <text x="-7.5" y="2.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="monospace">O</text>
                    <text x="7.5" y="2.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" fontFamily="monospace">O</text>
                  </g>
                </g>
              </g>

              {/* Situation C: Mixture Beaker */}
              <g transform="translate(500, 10)">
                <rect x="-85" y="0" width="170" height="90" rx="8" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="1" />
                <rect x="-26" y="20" width="52" height="48" rx="4" fill="#E0F2FE" stroke="#0F766E" strokeWidth="1.5" />
                <circle cx="-12" cy="46" r="3" fill="#0F766E" />
                <circle cx="5" cy="52" r="3" fill="#C94BA6" />
                <circle cx="14" cy="38" r="3" fill="#DC2626" />
                <rect x="-6" y="34" width="7" height="7" rx="1.5" fill="#FFFFFF" stroke="#64748B" />
              </g>
            </svg>
          </div>

          {/* Légendes détaillées pour chaque échantillon en HTML bien espacées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1" dir="rtl">
            <div className="p-3 bg-white rounded-[10px] border border-[#E5DDD5] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F766E]">العينة (أ) : قطرة ماء vs كأس ماء</span>
                <ChemicalFormula formula="H₂O" size="sm" />
              </div>
              <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                القطرة والكأس يحتويان على نفس السائل، لكن الكأس يضم عددًا أكبر بكثير من الوحدات المجهرية غير المرئية بالعين المجردة.
              </p>
            </div>

            <div className="p-3 bg-white rounded-[10px] border border-[#E5DDD5] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F766E]">العينة (ب) : مسمار حديد وقارورة غاز الأكسجين</span>
                <span className="flex items-center gap-1.5">
                  <ChemicalFormula formula="Fe" size="sm" />
                  <span className="text-[#CBD5E1]">·</span>
                  <ChemicalFormula formula="O₂" size="sm" />
                </span>
              </div>
              <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                مسمار الحديد يتكون من ذرات متماثلة (Fe)، بينما غاز الأكسجين في الهواء يتكون من جزيئات ثنائية الذرة (O₂).
              </p>
            </div>

            <div className="p-3 bg-white rounded-[10px] border border-[#E5DDD5] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C94BA6]">العينة (ج) : كأس ماء مالح ومحلى</span>
                <span className="flex items-center gap-1.5">
                  <ChemicalFormula formula="H₂O" size="sm" />
                  <span className="text-[#CBD5E1]">·</span>
                  <ChemicalFormula formula="NaCl" size="sm" />
                </span>
              </div>
              <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                عند إذابة الملح والسكر في الماء بوجود الهواء الملامس، تجتمع داخل نفس الكأس عدة مواد كيميائية مختلفة معًا.
              </p>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // 2. من المادة إلى الفرد الكيميائي + بنية جزيء الماء والفرق بين O و O₂ و H₂O
    // ========================================================================
    case 'c01-water-to-entity-tree':
      return (
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]">
          <svg viewBox="0 0 650 185" className="w-full max-w-2xl mx-auto h-auto" dir="ltr">
            <rect x="3" y="3" width="644" height="179" rx="10" fill="#FFFFFF" stroke="#E5DDD5" />

            {/* Panel 1: Glass of water -> H2O tree */}
            <g transform="translate(115, 16)">
              <rect x="-55" y="4" width="110" height="36" rx="8" fill="#F0FDFA" stroke="#0F766E" strokeWidth="1.8" />
              <text x="0" y="19" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0F766E">
                كمية من الماء (H₂O)
              </text>
              <text x="0" y="33" textAnchor="middle" fontSize="9.5" fill="#6B6B6B">
                تتكون من وحدات مجهرية
              </text>

              <line x1="0" y1="40" x2="0" y2="58" stroke="#0F766E" strokeWidth="1.8" />
              <line x1="-52" y1="58" x2="52" y2="58" stroke="#0F766E" strokeWidth="1.8" />
              <line x1="-52" y1="58" x2="-52" y2="74" stroke="#0F766E" strokeWidth="1.8" />
              <line x1="52" y1="58" x2="52" y2="74" stroke="#0F766E" strokeWidth="1.8" />

              {/* Left H2O */}
              <rect x="-95" y="74" width="86" height="38" rx="8" fill="#FAF7F4" stroke="#E2D9D0" />
              <H2OMiniSvg x={-70} y={91} scale={0.85} />
              <text x="-35" y="97" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                H₂O
              </text>
              <line x1="-52" y1="112" x2="-52" y2="124" stroke="#0F766E" strokeWidth="1.8" />
              <rect x="-98" y="124" width="92" height="32" rx="6" fill="#0F766E" />
              <text x="-52" y="138" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#FFFFFF">
                فرد كيميائي
              </text>
              <text x="-52" y="150" textAnchor="middle" fontSize="8.5" fill="#CCFBF1" fontFamily="monospace">
                Entité chimique
              </text>

              {/* Right H2O */}
              <rect x="9" y="74" width="86" height="38" rx="8" fill="#FAF7F4" stroke="#E2D9D0" />
              <H2OMiniSvg x={34} y={91} scale={0.85} />
              <text x="69" y="97" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                H₂O
              </text>
              <line x1="52" y1="112" x2="52" y2="124" stroke="#0F766E" strokeWidth="1.8" />
              <rect x="6" y="124" width="92" height="32" rx="6" fill="#0F766E" />
              <text x="52" y="138" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#FFFFFF">
                فرد كيميائي
              </text>
              <text x="52" y="150" textAnchor="middle" fontSize="8.5" fill="#CCFBF1" fontFamily="monospace">
                Entité chimique
              </text>
            </g>

            <line x1="230" y1="18" x2="230" y2="167" stroke="#E5DDD5" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Panel 2: Structure of 1 H2O molecule (H - O - H) */}
            <g transform="translate(335, 92)">
              <text x="0" y="-62" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0F766E">
                بنية جزيء الماء H₂O
              </text>
              {/* Chemical bonds to central O */}
              <line x1="0" y1="-8" x2="-26" y2="18" stroke="#334155" strokeWidth="2.5" />
              <line x1="0" y1="-8" x2="26" y2="18" stroke="#334155" strokeWidth="2.5" />
              {/* Central Oxygen atom (O) */}
              <circle cx="0" cy="-8" r="17" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              <text x="0" y="-3" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FFFFFF" fontFamily="monospace">
                O
              </text>
              {/* Left Hydrogen atom (H) */}
              <circle cx="-28" cy="20" r="12.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.8" />
              <text x="-28" y="24.5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                H
              </text>
              {/* Right Hydrogen atom (H) */}
              <circle cx="28" cy="20" r="12.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.8" />
              <text x="28" y="24.5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                H
              </text>
              <text x="0" y="52" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F766E">
                جزيء ماء واحد (فرد كيميائي)
              </text>
              <text x="0" y="66" textAnchor="middle" fontSize="9.5" fill="#4A4A4A">
                ذرة أكسجين مركزية (O) + ذرتا هيدروجين (2H)
              </text>
            </g>

            <line x1="440" y1="18" x2="440" y2="167" stroke="#E5DDD5" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Panel 3: O (Atom) ≠ O2 (Molecule) */}
            <g transform="translate(545, 92)">
              <text x="0" y="-62" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#C94BA6">
                ذرة الأكسجين O ≠ جزيء الأكسجين O₂
              </text>
              <g transform="translate(-52, -8)">
                <circle cx="0" cy="0" r="16" fill="#DC2626" stroke="#991B1B" strokeWidth="1.8" />
                <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  O
                </text>
                <text x="0" y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">
                  ذرة أكسجين (O)
                </text>
              </g>
              <text x="-4" y="0" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#C94BA6">
                ≠
              </text>
              <g transform="translate(48, -8)">
                <circle cx="-11" cy="0" r="15" fill="#DC2626" stroke="#991B1B" strokeWidth="1.8" />
                <circle cx="11" cy="0" r="15" fill="#DC2626" stroke="#991B1B" strokeWidth="1.8" />
                <text x="-11" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  O
                </text>
                <text x="11" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  O
                </text>
                <text x="0" y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#C94BA6">
                  جزيء أكسجين (O₂)
                </text>
              </g>
              <text x="0" y="64" textAnchor="middle" fontSize="10.5" fill="#6B6B6B">
                العدد الصغير ₂ يعني ارتباط ذرتين من O
              </text>
            </g>
          </svg>
        </div>
      );

    // ========================================================================
    // 3. النوع الكيميائي (مجموعة أفراد متماثلة : الماء H₂O وغاز الأكسجين O₂)
    // ========================================================================
    case 'c01-chemical-species-water':
      return (
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]">
          <svg viewBox="0 0 650 165" className="w-full max-w-2xl mx-auto h-auto" dir="ltr">
            <rect x="3" y="3" width="644" height="159" rx="10" fill="#FFFFFF" stroke="#E5DDD5" />

            {/* Left Half: H₂O ... H₂O -> Espèce chimique : Eau */}
            <g transform="translate(15, 14)">
              {[42, 112, 182, 252].map((cx, idx) => (
                <g key={idx}>
                  <rect x={cx - 30} y="6" width="60" height="50" rx="8" fill="#FAF7F4" stroke="#E2D9D0" strokeWidth="1.5" />
                  <H2OMiniSvg x={cx} y="24" scale={0.9} />
                  <text x={cx} y="50" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                    H₂O
                  </text>
                  <line x1={cx} y1="56" x2={cx} y2="78" stroke="#0F766E" strokeWidth="2" />
                </g>
              ))}
              <line x1="42" y1="78" x2="252" y2="78" stroke="#0F766E" strokeWidth="2.2" />
              <line x1="147" y1="78" x2="147" y2="94" stroke="#0F766E" strokeWidth="2.2" />
              <rect x="32" y="94" width="230" height="44" rx="10" fill="#0F766E" />
              <text x="147" y="113" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#FFFFFF">
                النوع الكيميائي : الماء
              </text>
              <text x="147" y="130" textAnchor="middle" fontSize="10.5" fill="#CCFBF1" fontFamily="monospace">
                Espèce chimique : Eau (H₂O)
              </text>
            </g>

            <line x1="325" y1="16" x2="325" y2="150" stroke="#E5DDD5" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Right Half: O₂ ... O₂ -> Espèce chimique : Gaz dioxygène */}
            <g transform="translate(340, 14)">
              {[42, 112, 182, 252].map((cx, idx) => (
                <g key={idx}>
                  <rect x={cx - 30} y="6" width="60" height="50" rx="8" fill="#FAF7F4" stroke="#E2D9D0" strokeWidth="1.5" />
                  <O2MiniSvg x={cx} y="25" scale={0.85} />
                  <text x={cx} y="50" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                    O₂
                  </text>
                  <line x1={cx} y1="56" x2={cx} y2="78" stroke="#C94BA6" strokeWidth="2" />
                </g>
              ))}
              <line x1="42" y1="78" x2="252" y2="78" stroke="#C94BA6" strokeWidth="2.2" />
              <line x1="147" y1="78" x2="147" y2="94" stroke="#C94BA6" strokeWidth="2.2" />
              <rect x="32" y="94" width="230" height="44" rx="10" fill="#C94BA6" />
              <text x="147" y="113" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#FFFFFF">
                النوع الكيميائي : غاز الأكسجين
              </text>
              <text x="147" y="130" textAnchor="middle" fontSize="10.5" fill="#FCE7F3" fontFamily="monospace">
                Espèce chimique : Dioxygène (O₂)
              </text>
            </g>
          </svg>
        </div>
      );

    // ========================================================================
    // 4. المستوى العياني مقابل المستوى المجهري (Macroscopique vs Microscopique)
    // ========================================================================
    case 'c01-macro-vs-micro':
      return (
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="rtl">
            {/* المستوى العياني */}
            <div className="bg-white rounded-[10px] border border-[#E5DDD5] p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#0F766E]">1. المستوى العياني</span>
                <span dir="ltr" className="text-[11px] font-mono font-bold text-[#0F766E] bg-[#0F766E]/10 px-2 py-0.5 rounded">
                  Échelle macroscopique
                </span>
              </div>
              <p className="text-xs text-[#4A4A4A] font-semibold">
                ما نستطيع ملاحظته بالحواس أو قياسه بأدوات القياس :
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {['لون المادة', 'حالتها الفيزيائية', 'حجمها وكتلتها', 'درجة حرارتها'].map((item, i) => (
                  <div key={i} className="p-2 rounded-[6px] bg-[#FAF7F4] border border-[#E2D9D0] font-medium text-[#4A4A4A]">
                    • {item}
                  </div>
                ))}
              </div>
              <div className="text-[11px] font-bold text-[#0F766E]">
                ← نصف المادة بـ : النوع الكيميائي (Espèce chimique) والجملة الكيميائية (Système chimique)
              </div>
            </div>

            {/* المستوى المجهري */}
            <div className="bg-white rounded-[10px] border border-[#E5DDD5] p-3.5 space-y-2">
              <div className="flex items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#C94BA6]">2. المستوى المجهري</span>
                <span dir="ltr" className="text-[11px] font-mono font-bold text-[#C94BA6] bg-[#C94BA6]/10 px-2 py-0.5 rounded">
                  Échelle microscopique
                </span>
              </div>
              <p className="text-xs text-[#4A4A4A] font-semibold">
                ما لا نستطيع رؤيته مباشرة بالعين المجردة :
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  'الذرات (Atomes)',
                  'الجزيئات (Molécules)',
                  'دقائق مجهرية (ذرات وجزيئات)',
                  'الأفراد الكيميائية (Entités)',
                ].map((item, i) => (
                  <div key={i} className="p-2 rounded-[6px] bg-[#FAF7F4] border border-[#E2D9D0] font-medium text-[#4A4A4A]">
                    • {item}
                  </div>
                ))}
              </div>
              <div className="text-[11px] font-bold text-[#C94BA6]">
                ← نصف المادة بـ : الفرد الكيميائي (Entité chimique : ذرة، جزيء)
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // 5. الجملة الكيميائية : مقارنة الأوعية والعلب الثلاث A و B و C
    // ========================================================================
    case 'c01-three-boxes-abc':
    case 'c01-flasks-system':
      return (
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]">
          <svg viewBox="0 0 660 178" className="w-full max-w-2xl mx-auto h-auto" dir="ltr">
            <rect x="3" y="3" width="654" height="172" rx="10" fill="#FFFFFF" stroke="#E5DDD5" />

            {/* Box A: O₂ only */}
            <g transform="translate(112, 20)">
              <text x="0" y="10" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#DC2626">
                العلبة A (غاز الأكسجين فقط)
              </text>
              <rect x="-82" y="18" width="164" height="88" rx="10" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" />
              <O2MiniSvg x={-38} y={44} scale={0.95} />
              <O2MiniSvg x={38} y={44} scale={0.95} />
              <O2MiniSvg x={0} y={82} scale={0.95} />
              <text x="0" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4A4A4A">
                تحتوي على جزيئات O₂ فقط
              </text>
              <text x="0" y="142" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#DC2626">
                نوع كيميائي واحد : O₂
              </text>
            </g>

            {/* Box B: Pure water H₂O */}
            <g transform="translate(330, 20)">
              <text x="0" y="10" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0284C7">
                العلبة B (ماء نقي فقط)
              </text>
              <rect x="-82" y="18" width="164" height="88" rx="10" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.8" />
              <H2OMiniSvg x={-38} y={42} scale={0.95} />
              <H2OMiniSvg x={38} y={42} scale={0.95} />
              <H2OMiniSvg x={0} y={80} scale={0.95} />
              <text x="0" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4A4A4A">
                تحتوي على جزيئات H₂O فقط
              </text>
              <text x="0" y="142" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0284C7">
                نوع كيميائي واحد : الماء H₂O
              </text>
            </g>

            {/* Box C: H₂O + O₂ */}
            <g transform="translate(548, 20)">
              <text x="0" y="10" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0F766E">
                العلبة C (ماء + غاز O₂ / ملح)
              </text>
              <rect x="-82" y="18" width="164" height="88" rx="10" fill="#F0FDFA" stroke="#0F766E" strokeWidth="1.8" />
              <H2OMiniSvg x={-42} y={42} scale={0.9} />
              <O2MiniSvg x={38} y={44} scale={0.9} />
              <O2MiniSvg x={-35} y={82} scale={0.9} />
              <H2OMiniSvg x={38} y={78} scale={0.9} />
              <text x="0" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4A4A4A">
                تحتوي على H₂O و O₂ معًا
              </text>
              <text x="0" y="142" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0F766E">
                عدة أنواع كيميائية : H₂O و O₂
              </text>
            </g>
          </svg>
        </div>
      );

    // ========================================================================
    // 6. الخلاصة (الوحيدة في الدرس — RÈGLE 2) : السلسلة العمودية للمفاهيم الثلاثة
    // ========================================================================
    case 'c01-summary-chain':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]">
          <div className="max-w-md mx-auto flex flex-col items-center space-y-1.5" dir="rtl">
            {[
              {
                text: '1. الفرد الكيميائي (Entité chimique)',
                sub: 'دقيقة مجهرية واحدة (ذرة Fe، جزيء H₂O)',
                accent: true,
              },
              {
                text: 'مجموعة من الأفراد الكيميائية المتماثلة',
                accent: false,
              },
              {
                text: '2. النوع الكيميائي (Espèce chimique)',
                sub: 'المادة على المستوى العياني (الماء H₂O، غاز الأكسجين O₂)',
                accent: true,
              },
              {
                text: 'مكونة من نوع كيميائي أو أكثر',
                sub: 'وصف عياني: طبيعة وكتلة الأنواع، حالتها الفيزيائية (s, l, g, aq)، درجة الحرارة T والضغط P',
                accent: false,
              },
              {
                text: '3. الجملة الكيميائية (Système chimique)',
                sub: 'مكونة من نوع كيميائي أو أكثر (طبيعة وكتلة الأنواع، حالتها الفيزيائية، T و P)',
                accent: true,
              },
            ].map((node, i, arr) => (
              <React.Fragment key={i}>
                <div
                  className={`w-full py-2 px-3.5 rounded-[10px] text-center border text-xs sm:text-sm ${
                    node.accent
                      ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold shadow-2xs'
                      : 'bg-white text-[#1A1A1A] border-[#CBD5E1] font-semibold'
                  }`}
                >
                  <div className={node.accent ? 'text-white' : 'text-[#0F766E] font-bold'}>{node.text}</div>
                  {node.sub && (
                    <div
                      className={`text-[11px] mt-1 leading-relaxed ${
                        node.accent
                          ? 'text-[#CCFBF1] font-medium'
                          : 'text-[#334155] font-normal bg-[#F8FAFC] p-1.5 rounded-[6px] border border-[#E2E8F0]'
                      }`}
                    >
                      {node.sub}
                    </div>
                  )}
                </div>
                {i < arr.length - 1 && (
                  <ArrowDown className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — 1. النشاط الاستكشافي : صورة توضيحية + 3 وضعيات ملاحظة (دون حرق المفاهيم)
    // ========================================================================
    // COURS 02 — 1. النشاط الاستكشافي : صورة توضيحية + 3 وضعيات ملاحظة (دون حرق المفاهيم)
    // ========================================================================
    case 'c02-discovery-setup':
      return (
        <div className="p-3.5 rounded-[12px] bg-white border border-[#E2D9D0] space-y-3.5" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c02_montage_depart_1791665805212.jpg"
            alt="وضعية الانطلاق للدرس 02 : تجربة التحليل الكهربائي للماء في وعاء التحليل دون كشف طبيعة الغازين"
            captionArabic="صورة توضيحية لوضعية الانطلاق : وعاء التحليل الكهربائي به ماء وNaOH مع أنبوبين منكّسين يجمعان غازين عديمي اللون غير معروفين مسبقًا، وتوصيل صحيح للمولد (+ أحمر و − أسود دون تقاطع أسلاك)"
            captionFrench="Dispositif d’électrolyse au départ (câblage direct + et − sans croisement, gaz incolores non encore identifiés)"
            courseBadge="الدرس 02"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* الحالة أ */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (أ) : تسخين الماء وتبريده
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عند تسخين الماء يتبخر، وعند تبريده يتكاثف ويعود ماءً سائلًا له نفس الخواص؛ إنه تغير فيزيائي يبقى فيه الماء دون تغير في طبيعته.
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] flex items-center justify-between text-[11px] font-mono text-[#0F766E]" dir="ltr">
                <span>ماء (سائل) ⇄ ماء (بخار)</span>
              </div>
            </div>

            {/* الحالة ب */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (ب) : إضافة NaOH وتوصيل الدارة
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  نملأ وعاء التحليل بالماء ونضيف قليلًا من هيدروكسيد الصوديوم NaOH لتسهيل مرور التيار، وننكس أنبوبي اختبار فوق القطبين.
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] flex items-center justify-between text-[11px] font-mono text-[#0F766E]" dir="ltr">
                <span>ماء + NaOH(aq)</span>
              </div>
            </div>

            {/* الحالة ج */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (ج) : انطلاق فقاعات وتناقص مستوى الماء
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عند غلق القاطعة، يتوهج المصباح وتنطلق فقاعات غازية لنوعين كيميائيين جديدين ويبدأ مستوى الماء في التناقص داخل أنبوبي الاختبار.
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] flex items-center justify-between text-[11px] font-mono text-[#0F766E]" dir="ltr">
                <span>ظهور نوعين غازيين جديدين</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — 2. التركيب التجريبي : وعاء التحليل، الأقطاب، المولد والمصباح
    // ========================================================================
    case 'c02-electrolysis-apparatus':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3.5" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c02_montage_complet_1791665853524.jpg"
            alt="التركيب التجريبي للتحليل الكهربائي للماء : وعاء التحليل، الأنابيب، القواطع والمولد"
            captionArabic="التركيب التجريبي الكامل للتحليل الكهربائي للماء : القطب الموجب (+) للمولد موصول بالمسرى (+) والقطب السالب (−) موصول بالمسرى (−) دون تقاطع أسلاك، والغازان هما O₂ عند القطب الموجب و H₂ عند القطب السالب"
            captionFrench="Montage expérimental complet : câblage direct (+ rouge et − noir sans croisement, O₂ au pôle + et H₂ au pôle −)"
            courseBadge="الدرس 02"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-[8px] bg-white border border-[#E2D9D0]">
              <span className="font-bold text-[#0F766E] block">المولد الكهربائي</span>
              <span className="text-[#6B6B6B] text-[11px]">تيار مستمر (+ أحمر / − أسود)</span>
            </div>
            <div className="p-2.5 rounded-[8px] bg-white border border-[#E2D9D0]">
              <span className="font-bold text-[#0F766E] block">المصباح والقاطعة</span>
              <span className="text-[#6B6B6B] text-[11px]">دلالة على مرور التيار</span>
            </div>
            <div className="p-2.5 rounded-[8px] bg-white border border-[#E2D9D0]">
              <span className="font-bold text-[#0F766E] block">ماء + هيدروكسيد الصوديوم</span>
              <span className="text-[#6B6B6B] text-[11px]">NaOH لتسهيل مرور التيار</span>
            </div>
            <div className="p-2.5 rounded-[8px] bg-white border border-[#E2D9D0]">
              <span className="font-bold text-[#0F766E] block">أنبوبا اختبار</span>
              <span className="text-[#6B6B6B] text-[11px]">لجمع الغازين الناتجين</span>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — 3. الكشف عن الغازين الناتجين بواسطة عود الثقاب
    // ========================================================================
    case 'c02-gas-identification-tests':
      return (
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3.5" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c02_test_sans_mains_1791666998520.jpg"
            alt="اختبارا الكشف عن غازي ثنائي الهيدروجين وثنائي الأكسجين بواسطة عود الثقاب المشتعل والمتوهج"
            captionArabic="الكشف التجريبي عن الغازين عديمي اللون : تقريب عود ثقاب مشتعل يحدث فرقعة خفيفة (H₂)، وتقريب عود متوهج بدون لهب يزداد توهجًا (O₂)"
            captionFrench="Tests d’identification des deux gaz incolores : tison enflammé (H₂) et tison incandescent sans flamme (O₂)"
            courseBadge="الدرس 02"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Card A : الكشف عن غاز الهيدروجين H₂ */}
            <div className="p-3.5 rounded-[12px] bg-white border border-[#0F766E]/35 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold">
                    الغاز الأول
                  </span>
                  <ChemicalFormula formula="H2" size="sm" />
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
                  الكشف عن غاز ثنائي الهيدروجين (Dihydrogène)
                </h5>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عند تقريب <strong>عود ثقاب مشتعل</strong> من فوهة الأنبوب، يحدث احتراق سريع ومميز مصحوب بـ<strong>فرقعة خفيفة</strong>.
                </p>
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#F0FDFA] border border-[#0F766E]/25 text-center">
                <div className="text-xs font-bold text-[#0F766E]">النوع الكيميائي : ثنائي الهيدروجين</div>
                <div className="text-xs font-mono font-bold text-[#4A4A4A]" dir="ltr">
                  الصيغة : H₂ · Dihydrogène
                </div>
              </div>
            </div>

            {/* Card B : الكشف عن غاز الأكسجين O₂ */}
            <div className="p-3.5 rounded-[12px] bg-white border border-[#0284C7]/35 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#0284C7]/10 text-[#0284C7] text-xs font-bold">
                    الغاز الثاني
                  </span>
                  <ChemicalFormula formula="O2" size="sm" />
                </div>
                <h5 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
                  الكشف عن غاز ثنائي الأكسجين (Dioxygène)
                </h5>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عند تقريب <strong>عود ثقاب متوهج</strong> (جمرة بدون لهب) من فوهة الأنبوب، يزداد توهجًا ويشتعل اللهب من جديد لأنه غاز يساعد على الاحتراق.
                </p>
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#EFF6FF] border border-[#0284C7]/25 text-center">
                <div className="text-xs font-bold text-[#0284C7]">النوع الكيميائي : ثنائي الأكسجين</div>
                <div className="text-xs font-mono font-bold text-[#4A4A4A]" dir="ltr">
                  الصيغة : O₂ · Dioxygène
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — 5. نموذج التفاعل الكيميائي : المتفاعلات والنواتج
    // ========================================================================
    case 'c02-molecular-rearrangement':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="p-3 rounded-[10px] bg-white border border-[#0F766E] text-center space-y-2">
              <div className="text-xs font-bold text-[#0F766E]">نموذج التفاعل الكيميائي للتحليل الكهربائي للماء</div>
              <div className="py-2 text-center" dir="ltr">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-[10px] bg-[#FAF7F4] border-2 border-[#0F766E]/40 shadow-xs text-sm sm:text-base font-bold text-[#1A1A1A]">
                  <span className="font-sans text-[#0F766E]">ماء (<span className="chem-state-l">l</span>)</span>
                  <span className="text-lg font-bold text-[#0F766E] px-1 select-none">⟶</span>
                  <span className="font-sans text-[#0284C7]">ثنائي الهيدروجين (g) + ثنائي الأكسجين (g)</span>
                </div>
              </div>
              <div className="text-[11px] text-[#6B6B6B]">
                التفاعل الكيميائي يفسر تحول الأنواع الكيميائية وتشكل أنواع جديدة ولا يبرز الأنواع التي لا تشارك في التحول.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-[10px] bg-white border border-[#E2D9D0] space-y-1">
                <div className="font-bold text-[#0F766E]">المتفاعلات (المواد المختفية) :</div>
                <div className="text-[#4A4A4A] font-semibold">• الماء H₂O(<span className="chem-state-l">l</span>)</div>
                <div className="text-[11px] text-[#6B6B6B]">نوع كيميائي يختفي أثناء مرور التيار الكهربائي.</div>
              </div>
              <div className="p-3 rounded-[10px] bg-white border border-[#E2D9D0] space-y-1">
                <div className="font-bold text-[#0284C7]">النواتج (المواد المتشكلة) :</div>
                <div className="text-[#4A4A4A] font-semibold">• ثنائي الهيدروجين H₂(g) + ثنائي الأكسجين O₂(g)</div>
                <div className="text-[11px] text-[#6B6B6B]">نوعان كيميائيان غازيان جديدان ظهرا في نهاية التحول.</div>
              </div>
            </div>

            <div className="p-2.5 rounded-[8px] bg-[#F0FDFA] border border-[#0F766E]/20 text-xs text-[#0F766E] text-center font-bold">
              ملاحظة أساسية : هيدروكسيد الصوديوم NaOH(aq) لا يتغير، ويسهل مرور التيار، فلا يظهر في نواتج التفاعل.
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — 6. المنهجية العلمية : تجربة → ملاحظة → كشف → تفسير → استنتاج
    // ========================================================================
    case 'c02-scientific-methodology-chain':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]" dir="rtl">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {[
              {
                step: '1. التجربة',
                fr: 'Expérience',
                desc: 'نمرر تيارًا كهربائيًا مستمرًا في ماء أضيف إليه قليل من NaOH.',
                color: 'border-[#0F766E] bg-white',
              },
              {
                step: '2. الملاحظة',
                fr: 'Observation',
                desc: 'توهج المصباح، انطلاق فقاعات غازية وتناقص مستوى الماء في الأنبوبين.',
                color: 'border-[#0F766E] bg-white',
              },
              {
                step: '3. الكشف',
                fr: 'Identification',
                desc: 'الكشف بعود الثقاب: فرقعة لثنائي الهيدروجين H₂ وزيادة لهب لثنائي الأكسجين O₂.',
                color: 'border-[#0284C7] bg-white',
              },
              {
                step: '4. التفسير',
                fr: 'Interprétation',
                desc: 'تحول النوع الكيميائي (الماء) وتشكل نوعين جديدين دون أن يتغير NaOH.',
                color: 'border-[#C94BA6] bg-white',
              },
              {
                step: '5. الاستنتاج',
                fr: 'Conclusion',
                desc: 'التحليل الكهربائي تحول كيميائي ينمذج بالتفاعل: ماء (l) ⟶ ثنائي الهيدروجين (g) + ثنائي الأكسجين (g).',
                color: 'border-[#0F766E] bg-[#0F766E] text-white',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-[10px] border ${item.color} flex flex-col justify-between gap-1.5`}
              >
                <div>
                  <div
                    className={`text-xs font-bold ${
                      idx === 4 ? 'text-white' : 'text-[#0F766E]'
                    }`}
                  >
                    {item.step}
                  </div>
                  <div
                    dir="ltr"
                    className={`text-[10px] font-mono ${
                      idx === 4 ? 'text-[#CCFBF1]' : 'text-[#8C8C8C]'
                    }`}
                  >
                    {item.fr}
                  </div>
                </div>
                <div
                  className={`text-xs leading-relaxed ${
                    idx === 4 ? 'text-white font-semibold' : 'text-[#4A4A4A]'
                  }`}
                >
                  <ChemPhysText text={item.desc} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — الخلاصة : مخطط الدرس الكامل للتحليل الكهربائي للماء
    // ========================================================================
    case 'c02-master-summary-diagram':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]" dir="rtl">
          <div className="max-w-lg mx-auto flex flex-col items-center space-y-2">
            <div className="w-full py-2 px-4 rounded-[10px] bg-[#0F766E] text-white font-bold text-xs sm:text-sm text-center">
              التحول الكيميائي : التحليل الكهربائي للماء
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#E2D9D0] text-center space-y-0.5">
              <div className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
                الحالة الابتدائية : ماء (<span className="chem-state-l">l</span>) مع هيدروكسيد الصوديوم NaOH(aq)
              </div>
              <div className="text-[11px] text-[#6B6B6B]">
                المتفاعل : الماء H₂O(<span className="chem-state-l">l</span>) · هيدروكسيد الصوديوم يسهل مرور التيار
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#C94BA6]" />

            <div className="px-4 py-1 rounded-full bg-[#C94BA6]/10 border border-[#C94BA6]/30 text-xs font-bold text-[#C94BA6]">
              الحالة الانتقالية : تعريض الماء لتيار كهربائي مستمر (ظهور فقاعات غازية)
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full grid grid-cols-2 gap-3">
              <div className="p-3 rounded-[10px] bg-white border border-[#0F766E] text-center space-y-1">
                <div className="text-xs font-bold text-[#0F766E]">ثنائي الهيدروجين (Dihydrogène)</div>
                <ChemicalFormula formula="H2" size="sm" />
                <div className="text-[11px] text-[#6B6B6B]">ناتج جديد · نكشف عنه بفرقعة خفيفة مع عود الثقاب</div>
              </div>
              <div className="p-3 rounded-[10px] bg-white border border-[#0284C7] text-center space-y-1">
                <div className="text-xs font-bold text-[#0284C7]">ثنائي الأكسجين (Dioxygène)</div>
                <ChemicalFormula formula="O2" size="sm" />
                <div className="text-[11px] text-[#6B6B6B]">ناتج جديد · نكشف عنه بزيادة توهج عود الثقاب</div>
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold">
                نموذج التفاعل الكيميائي (الحالة النهائية)
              </div>
              <div
                className="inline-block bg-white text-[#1A1A1A] font-bold px-3 py-1.5 rounded-[8px] mt-1 text-xs sm:text-sm shadow-xs"
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
              >
                <span className="font-sans text-[#0F766E]">ماء (<span className="chem-state-l">l</span>)</span>
                <span className="text-sm font-bold text-[#0F766E] px-1.5 select-none shrink-0">⟶</span>
                <span className="font-sans text-[#0284C7]">ثنائي الهيدروجين (g) + ثنائي الأكسجين (g)</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 03 — 1. النشاط الاستكشافي : صورة توضيحية قابلة للتكبير + 3 ملاحظات تجريبية
    // ========================================================================
    case 'c03-discovery-setup':
      return (
        <div className="p-3.5 rounded-[12px] bg-white border border-[#E2D9D0] space-y-3.5" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c03_depart_montage_1791751750620.jpg"
            alt="وضعية الانطلاق للدرس 03 : تسخين قطعة كربون وإدخالها في وعاء به وفرة من الهواء ثم اختبار الغاز برائق الكلس الصافي"
            captionArabic="صورة توضيحية لوضعية الانطلاق : تسخين قطعة كربون بمصدر حراري وإدخالها في قارورة تحتوي على وفرة من الهواء (ثنائي الأكسجين كافٍ لحدوث احتراق تام)، وتمرير الغاز المتشكل إلى أنبوب اختبار به رائق الكلس الصافي دون الكشف المسبق عن طبيعة الغازين"
            captionFrench="Dispositif expérimental au départ : combustion du carbone avec apport suffisant d’air et test au réactif limpide (sans révéler les gaz)"
            courseBadge="الدرس 03"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* الملاحظة أ */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (أ) : تسخين قطعة الفحم وإدخالها في الهواء
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عند تسخين قطعة صغيرة من الفحم (الكربون) بمصدر حراري تصبح متوهجة (🔴)، وعند إدخالها في قارورة الهواء تزداد توهجًا وتبعث حرارة وضوءًا.
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-sans font-bold text-[#0F766E]" dir="ltr">
                كربون متوهج + هواء ⟶ حرارة + ضوء
              </div>
            </div>

            {/* الملاحظة ب */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (ب) : تناقص قطعة الكربون وتوقف التوهج
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  أثناء الاحتراق يُستهلك جزء من قطعة الكربون الصلبة تدريجيًا، ثم ينطفئ التوهج عند استهلاك الغاز المساعد على الاحتراق داخل القارورة المغلقة.
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-sans font-bold text-[#C94BA6]" dir="ltr">
                تناقص واستهلاك قطعة الكربون
              </div>
            </div>

            {/* الملاحظة ج */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (ج) : اختبار الغاز المتشكل برائق الكلس
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عند تمرير الغاز الموجود في القارورة بعد انتهاء الاحتراق داخل أنبوب به رائق الكلس الصافي، نلاحظ أن رائق الكلس يتعكّر (يصبح أبيض حليبيًا).
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-sans font-bold text-[#0F766E]" dir="ltr">
                رائق الكلس صافٍ ⟶ رائق الكلس عكر
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 03 — 2. التركيب التجريبي الكامل لاحتراق الكربون والكشف برائق الكلس
    // ========================================================================
    case 'c03-combustion-and-limewater-test':
      return (
        <div className="p-3.5 rounded-[12px] bg-white border border-[#E2D9D0] space-y-3.5" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c03_experience_complete_1791752857884.jpg"
            alt="احتراق الكربون داخل قارورة تحتوي على هواء كافٍ والكشف عن ثنائي أكسيد الكربون برائق الكلس"
            captionArabic="احتراق الكربون داخل قارورة تحتوي على هواء كافٍ (وفرة من ثنائي الأكسجين)، وتشكل ثنائي أكسيد الكربون الذي يعكر رائق الكلس"
            captionFrench="combustion du carbone dans l'air (dioxygène en quantité suffisante)"
            courseBadge="الدرس 03"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-1.5">
              <div className="text-xs font-bold text-[#0F766E]">
                1. احتراق الكربون في غاز ثنائي الأكسجين
              </div>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                يتفاعل الكربون مع غاز ثنائي الأكسجين بعد التسخين الأولي، ويتوهج بشدة مع انبعاث حرارة وضوء وتشكل غاز جديد عديم اللون.
              </p>
              <div className="text-[11px] font-sans font-bold text-[#0F766E]" dir="ltr">
                كربون (s) + ثنائي الأكسجين (g)
              </div>
            </div>

            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-1.5">
              <div className="text-xs font-bold text-[#0F766E]">
                2. الكشف عن الناتج برائق الكلس
              </div>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                الغاز الناتج هو غاز ثنائي أكسيد الكربون (CO₂)، ويُكشف عنه تجريبيًا بتعكر رائق الكلس الذي كان صافيًا قبل التجربة.
              </p>
              <div className="text-[11px] font-sans font-bold text-[#0284C7]" dir="ltr">
                ثنائي أكسيد الكربون (g) ← يعكّر رائق الكلس
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 03 — 3. المتفاعلات والناتج : الربط بين النوع الكيميائي والفرد الكيميائي
    // ========================================================================
    case 'c03-reactants-products-molecular':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <div className="text-center space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-[#0F766E]">
              الربط بين المستوى العياني (النوع الكيميائي) والمستوى المجهري (الفرد الكيميائي)
            </h4>
            <p className="text-[11.5px] text-[#6B6B6B]">
              المتفاعلات تستهلك وتتحول إلى ناتج جديد، وثنائي الأزوت في الهواء لا يشارك في التحول
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
            {/* المتفاعلات */}
            <div className="p-3.5 rounded-[10px] bg-white border border-[#0284C7]/40 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0284C7] flex items-center justify-between">
                  <span>المتفاعلات (قبل التحول)</span>
                  <span className="text-[10.5px] font-mono">Réactifs</span>
                </div>
                <div className="space-y-2 pt-1">
                  <div className="p-2 rounded-[8px] bg-[#F0F9FF] border border-[#BAE6FD] text-xs">
                    <div className="font-bold text-[#0369A1]">الكربون (نوع عياني)</div>
                    <div className="text-[#4A4A4A] text-[11px] flex items-center gap-1.5 mt-0.5">
                      <span>الفرد المجهري : ذرة الكربون</span>
                      <span className="px-1.5 py-0.2 rounded bg-white font-mono font-bold text-[#0284C7] border border-[#BAE6FD]" dir="ltr">C</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-[8px] bg-[#F0F9FF] border border-[#BAE6FD] text-xs">
                    <div className="font-bold text-[#0369A1]">ثنائي الأكسجين (نوع عياني)</div>
                    <div className="text-[#4A4A4A] text-[11px] flex items-center gap-1.5 mt-0.5">
                      <span>الفرد المجهري : جزيء O₂</span>
                      <span className="px-1.5 py-0.2 rounded bg-white font-mono font-bold text-[#0284C7] border border-[#BAE6FD]" dir="ltr">O₂</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-[#0369A1] font-semibold pt-1 border-t border-[#E0F2FE]">
                يُستهلكان أثناء التحول
              </div>
            </div>

            {/* سهم التحول */}
            <div className="p-3 rounded-[10px] bg-white border border-[#E2D9D0] flex flex-col items-center justify-center text-center space-y-2">
              <div className="text-xs font-bold text-[#C94BA6]">
                نموذج التحول الكيميائي
              </div>
              <div
                style={{ height: 'auto', overflow: 'visible' }}
                className="p-2 rounded-[8px] bg-[#FDF2F8] border border-[#FBCFE8] w-full text-center overflow-visible"
              >
                <div
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap', overflow: 'visible', height: 'auto' }}
                  className="font-bold font-sans text-xs sm:text-[13px] text-[#831843] whitespace-nowrap leading-normal"
                >
                  كربون (s) + ثنائي الأكسجين (g) ⟶ ثنائي أكسيد الكربون (g)
                </div>
              </div>
              <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                تفاعل احتراق يحتاج حرارة (تسخين أولي) لبدئه. ثنائي الأزوت N₂ الموجود في الهواء لا يشارك فلا يظهر في النموذج.
              </p>
            </div>

            {/* النواتج */}
            <div className="p-3.5 rounded-[10px] bg-white border border-[#0F766E]/40 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E] flex items-center justify-between">
                  <span>الناتج (بعد التحول)</span>
                  <span className="text-[10.5px] font-mono">Produit</span>
                </div>
                <div className="p-2 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-xs space-y-1 pt-1">
                  <div className="font-bold text-[#0F766E]">ثنائي أكسيد الكربون (نوع عياني)</div>
                  <div className="text-[#4A4A4A] text-[11px] flex items-center gap-1.5 mt-0.5">
                    <span>الفرد المجهري : جزيء CO₂</span>
                    <span className="px-1.5 py-0.2 rounded bg-white font-mono font-bold text-[#0F766E] border border-[#99F6E4]" dir="ltr">CO₂</span>
                  </div>
                </div>
                <div className="p-2 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-[11px] text-[#991B1B]">
                  الكشف التجريبي : يعكّر رائق الكلس الصافي
                </div>
              </div>
              <div className="text-[11px] text-[#0F766E] font-semibold pt-1 border-t border-[#CCFBF1]">
                نوع كيميائي جديد لم يكن موجودًا
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 03 — 4. محاكي مثلث الحريق التفاعلي (Triangle du feu) ودور ثنائي الأكسجين
    // ========================================================================
    case 'c03-fire-triangle-and-air':
      return <FireTriangleSimulator />;

    // ========================================================================
    // COURS 03 — الخلاصة : المخطط النهائي للدرس
    // ========================================================================
    case 'c03-master-summary-diagram':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]" dir="rtl">
          <div className="max-w-lg mx-auto flex flex-col items-center space-y-2">
            <div className="w-full py-2 px-4 rounded-[10px] bg-[#0F766E] text-white font-bold text-xs sm:text-sm text-center">
              احتراق الكربون في الهواء (La combustion du carbone dans l’air)
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#0284C7] text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold text-[#0284C7]">
                المتفاعلات (Réactifs) : الكربون + ثنائي الأكسجين
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-[#0284C7]" dir="ltr">
                <span className="px-2 py-0.5 rounded bg-[#F0F9FF] border border-[#BAE6FD]">C</span>
                <span>+</span>
                <span className="px-2 py-0.5 rounded bg-[#F0F9FF] border border-[#BAE6FD]">O₂</span>
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#C94BA6]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#0F766E] text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold text-[#0F766E]">
                الناتج (Produit) : غاز ثنائي أكسيد الكربون (Dioxyde de carbone)
              </div>
              <div className="flex items-center justify-center text-xs font-mono font-bold text-[#0F766E]" dir="ltr">
                <span className="px-2 py-0.5 rounded bg-[#F0FDFA] border border-[#99F6E4]">CO₂</span>
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#E2D9D0] text-center text-xs sm:text-sm font-bold text-[#4A4A4A]">
              الكشف عن الغاز الناتج بـ«رائق الكلس» ← يتعكّر رائق الكلس
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1.5">
              <div className="text-xs sm:text-sm font-bold">
                نموذج التفاعل الكيميائي لاحتراق الكربون
              </div>
              <div
                className="inline-block bg-white px-3.5 py-1.5 rounded-[8px] text-[#0F766E] font-bold text-xs sm:text-sm shadow-xs select-all font-sans whitespace-nowrap overflow-x-auto max-w-full"
                dir="ltr"
                style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}
              >
                كربون (s) + ثنائي الأكسجين (g) ⟶ ثنائي أكسيد الكربون (g)
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 04 — 1. النشاط الاستكشافي : مقارنة حالتي اشتغال موقد البوتان (صورة واقعية)
    // ========================================================================
    case 'c04-discovery-setup':
      return (
        <div className="w-full space-y-3" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c04_burners_comparison_1791830547041.jpg"
            alt="مقارنة تجريبية لموقد غاز البوتان بحسب حالة فتحة دخول الهواء"
            captionArabic="مقارنة بين حالتي اشتغال موقد البوتان : فتحة هواء مفتوحة (لهب أزرق صافٍ وقطرات ماء) مقابل فتحة شبه مغلقة (لهب أصفر مضيء وترسب السخام الأسود)"
            captionFrench="Comparaison des deux modes de fonctionnement du brûleur au butane (Virole ouverte vs quasi-fermée)"
            courseBadge="الدرس 04"
          />
        </div>
      );

    // ========================================================================
    // COURS 04 — 2. الاحتراق التام للبوتان : الكشف عن ناتجيه الماء ورائق الكلس (صورة واقعية)
    // ========================================================================
    case 'c04-complete-combustion-tests':
      return (
        <div className="w-full space-y-3" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c04_exp_setup_1791831264477.jpg"
            alt="الكشف التجريبي عن ناتجي الاحتراق التام لغاز البوتان : تكاثف قطرات الماء على الجدار البارد وتعكر رائق الكلس"
            captionArabic="الكشف التجريبي عن ناتجي الاحتراق التام : كأس باردة منكسة وممسوكة بملقط معدني أعلى اللهب الأزرق مع تكاثف قطرات ماء، ومقارنة رائق الكلس (صافٍ) مع رائق الكلس (عكر)"
            captionFrench="Tests d’identification des produits de combustion complète : Buée/gouttelettes d’eau et comparaison de l’eau de chaux (limpide vs trouble)"
            courseBadge="الدرس 04"
          />

          <div className="p-3.5 rounded-[12px] bg-white border border-[#E5DDD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="font-bold text-[#0F766E] shrink-0 text-center sm:text-right">
              نموذج التفاعل الكيميائي لاحتراق البوتان التام :
            </span>
            <div
              dir="ltr"
              style={{ unicodeBidi: 'isolate', overflow: 'visible', height: 'auto' }}
              className="flex flex-col items-center justify-center text-center font-sans font-bold leading-normal overflow-visible text-xs text-[#1A1A1A] py-2 px-4 rounded-[10px] bg-[#FAF7F4] border border-[#0F766E]/30 w-full sm:w-auto"
            >
              <span className="text-[#0F766E] text-center whitespace-normal break-words leading-snug">
                <ChemicalFormula formula="بوتان (g) + ثنائي الأكسجين (g)" size="sm" />
              </span>
              <span className="text-[#0F766E] font-bold text-sm my-0.5 select-none leading-none">
                ⟶
              </span>
              <span className="text-[#0284C7] text-center whitespace-normal break-words leading-snug">
                <ChemicalFormula formula="ثنائي أكسيد الكربون (g) + ماء (g)" size="sm" />
              </span>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 04 — 3. بطاقة تمييز النواتج والوقاية من غاز أحادي أكسيد الكربون (CO)
    // ========================================================================
    case 'c04-incomplete-combustion-danger':
      return (
        <div className="w-full space-y-3" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* بطاقة تمييز الناتجان الخاصان بالاحتراق غير التام */}
            <div className="p-4 rounded-[12px] bg-white border border-amber-300 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-amber-900">
                    النواتج المميزة للاحتراق غير التام
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-bold">
                    <ChemPhysText text="عند نقص (O₂)" />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 rounded-[10px] bg-rose-50 border border-rose-200 text-center space-y-1">
                    <div className="text-xs font-bold text-rose-800">أحادي أكسيد الكربون</div>
                    <ChemicalFormula formula="CO" size="sm" />
                    <div className="text-[11px] text-rose-700 font-bold">غاز سام جدًا وغير مرئي</div>
                  </div>
                  <div className="p-2.5 rounded-[10px] bg-slate-100 border border-slate-300 text-center space-y-1">
                    <div className="text-xs font-bold text-slate-800">الكربون (السخام)</div>
                    <ChemicalFormula formula="C" size="sm" />
                    <div className="text-[11px] text-slate-700 font-bold">جسيمات صلبة سوداء</div>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-[8px] bg-amber-50 text-[11px] text-amber-950 font-semibold text-center border border-amber-200">
                <ChemPhysText text="المادتان المميزتان للاحتراق غير التام مقارنة بالاحتراق التام هما غاز أحادي أكسيد الكربون (CO) والسخام (C)." />
              </div>
            </div>

            {/* بطاقة الوقاية من غاز CO */}
            <div className="p-4 rounded-[12px] bg-rose-50/70 border-2 border-rose-300 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-rose-800">
                    <ChemPhysText text="⚠️ بطاقة الوقاية من غاز أحادي أكسيد الكربون (CO)" />
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold">
                    عديم اللون والرائحة
                  </span>
                </div>
                <ul className="space-y-1.5 pr-4 list-disc text-xs text-rose-950 leading-relaxed">
                  <li>
                    <ChemPhysText text="التهوية الدائمة : عدم سدّ منافذ وفتحات تهوية الغرف لضمان توفر ثنائي الأكسجين (O₂)." />
                  </li>
                  <li>
                    <ChemPhysText text="الصيانة الدورية : فحص ومراقبة مواقد التدفئة ومسخنات الماء وقنوات صرف الغازات." />
                  </li>
                  <li>
                    <ChemPhysText text="عند الاشتباه : تهوية المكان فورًا ومغادرته، ثم الاتصال بالحماية المدنية (14)." />
                  </li>
                </ul>
              </div>

              <div className="p-2 rounded-[8px] bg-white border border-rose-300 text-[11px] font-bold text-[#0F766E] text-center">
                <ChemPhysText text="🛡️ التهوية الكافية تحول دون تشكل غاز (CO) السام وتضمن احتراقًا تامًا آمنًا." />
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 04 — 4. النموذج المجهري : مثال مبسط لحفظ الذرات وإعادة ترتيبها — احتراق الميثان
    // ========================================================================
    case 'c04-microscopic-atom-conservation':
    case 'c04-microscopic-butane-atoms':
      return (
        <div className="w-full" dir="rtl">
          <svg viewBox="0 0 680 245" className="w-full max-w-2xl mx-auto h-auto">
            {/* ================= RIGHT BOX (RTL Before) : قبل التحول (المتفاعلات) ================= */}
            <rect x="378" y="10" width="290" height="158" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
            <text x="523" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0284C7">
              قبل التحول : المتفاعلات (Réactifs)
            </text>

            {/* 1 Molecule of CH4 (1 black C + 4 white H) */}
            <g transform="translate(595, 84)">
              <line x1="0" y1="-22" x2="0" y2="22" stroke="#64748B" strokeWidth="2" />
              <line x1="-22" y1="0" x2="22" y2="0" stroke="#64748B" strokeWidth="2" />
              <circle cx="0" cy="0" r="14" fill="#1E293B" />
              <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">C</text>
              <circle cx="0" cy="-24" r="8.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.6" />
              <text x="0" y="-21" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1E293B">H</text>
              <circle cx="0" cy="24" r="8.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.6" />
              <text x="0" y="27" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1E293B">H</text>
              <circle cx="-24" cy="0" r="8.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.6" />
              <text x="-24" y="3" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1E293B">H</text>
              <circle cx="24" cy="0" r="8.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.6" />
              <text x="24" y="3" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1E293B">H</text>
              <text x="0" y="45" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F172A">
                1 جزيء CH₄
              </text>
            </g>

            <text x="526" y="88" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#64748B">+</text>

            {/* 2 Molecules of O2 (4 red O atoms) */}
            <g transform="translate(450, 64)">
              <circle cx="-11" cy="0" r="11" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
              <circle cx="11" cy="0" r="11" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
              <text x="-11" y="3.5" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">O</text>
              <text x="11" y="3.5" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">O</text>

              <circle cx="-11" cy="32" r="11" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
              <circle cx="11" cy="32" r="11" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
              <text x="-11" y="35.5" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">O</text>
              <text x="11" y="35.5" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">O</text>

              <text x="0" y="64" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#B91C1C">
                2 جزيئان O₂
              </text>
            </g>

            {/* Reactant atom tally */}
            <rect x="392" y="138" width="262" height="22" rx="6" fill="#E0F2FE" />
            <text x="523" y="153" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0369A1">
              الحصيلة قبل التحول : 1 ذرة C · 4 ذرات H · 4 ذرات O
            </text>

            {/* ================= CENTER ARROW (RTL : right to left) ================= */}
            <g transform="translate(340, 86)">
              <text x="0" y="-18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#C94BA6">
                إعادة ترتيب
              </text>
              <line x1="28" y1="0" x2="-20" y2="0" stroke="#C94BA6" strokeWidth="3" />
              <polygon points="-20,-6 -32,0 -20,6" fill="#C94BA6" />
              <text x="0" y="18" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#475569">
                انحفاظ الذرات
              </text>
            </g>

            {/* ================= LEFT BOX (RTL After) : بعد التحول (النواتج) ================= */}
            <rect x="12" y="10" width="290" height="158" rx="12" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.8" />
            <text x="157" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F766E">
              بعد التحول (احتراق تام) : النواتج (Produits)
            </text>

            {/* 1 Molecule of CO2 (O-C-O) */}
            <g transform="translate(226, 82)">
              <circle cx="-21" cy="0" r="10.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.4" />
              <circle cx="21" cy="0" r="10.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="13" fill="#1E293B" />
              <text x="0" y="4" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#FFFFFF">C</text>
              <text x="-21" y="3.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF">O</text>
              <text x="21" y="3.5" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF">O</text>
              <text x="0" y="46" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F172A">
                1 جزيء CO₂
              </text>
            </g>

            <text x="158" y="88" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#64748B">+</text>

            {/* 2 Molecules of H2O */}
            <g transform="translate(86, 64)">
              <H2OMiniSvg x={0} y={0} scale={1.05} />
              <H2OMiniSvg x={0} y={32} scale={1.05} />
              <text x="0" y="64" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0284C7">
                2 جزيئان H₂O
              </text>
            </g>

            {/* Product atom tally */}
            <rect x="26" y="138" width="262" height="22" rx="6" fill="#CCFBF1" />
            <text x="157" y="153" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F766E">
              الحصيلة بعد التحول : 1 ذرة C · 4 ذرات H · 4 ذرات O ✓
            </text>

            {/* ================= BOTTOM STRIP : ماذا يحدث عند نقص ثنائي الأكسجين O₂؟ ================= */}
            <rect x="12" y="178" width="656" height="56" rx="10" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />

            {/* Zone droite : تنبيه نقص ثنائي الأكسجين */}
            <text x="552" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400E">
              🟠 عند نقص ثنائي الأكسجين (O₂) :
            </text>
            <text x="552" y="220" textAnchor="middle" fontSize="10" fill="#78350F">
              لا تكفي ذرات O فيتشكل أيضًا :
            </text>

            <line x1="440" y1="188" x2="440" y2="224" stroke="#FDE68A" strokeWidth="1.5" />

            {/* Zone centrale : جزيء CO */}
            <g transform="translate(382, 206)">
              <circle cx="-10" cy="0" r="9.5" fill="#1E293B" />
              <circle cx="10" cy="0" r="9.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.2" />
              <text x="-10" y="3.5" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#FFFFFF">C</text>
              <text x="10" y="3.5" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#FFFFFF">O</text>
            </g>
            <text x="305" y="201" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B91C1C">
              جزيء أحادي أكسيد الكربون
            </text>
            <text x="305" y="219" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#DC2626">
              غاز سام (CO)
            </text>

            <line x1="230" y1="188" x2="230" y2="224" stroke="#FDE68A" strokeWidth="1.5" />

            {/* Zone gauche : سخام الكربون C */}
            <g transform="translate(175, 206)">
              <circle cx="-8" cy="3" r="6.5" fill="#0F172A" />
              <circle cx="2" cy="-4" r="7" fill="#1E293B" />
              <circle cx="10" cy="4" r="6.5" fill="#0F172A" />
            </g>
            <text x="96" y="201" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A">
              سخام صلب (C)
            </text>
            <text x="96" y="219" textAnchor="middle" fontSize="9.5" fill="#475569">
              جسيمات كربون سوداء
            </text>
          </svg>
        </div>
      );

    // ========================================================================
    // COURS 04 — 5. مخطط التمييز بين النوع الكيميائي والفرد الكيميائي لاحتراق البوتان
    // ========================================================================
    case 'c04-species-entities-cards':
      return (
        <div className="p-4 rounded-[14px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3.5" dir="rtl">
          {/* Header didactique bilingue */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9D0] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
              <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                المستويان المتكاملان لوصف الجملة الكيميائية في احتراق البوتان
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#0F766E]" dir="ltr">
              Espèces (Macroscopique) vs Entités (Microscopique)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Card 1 : قبل التحول (المتفاعلات) */}
            <div className="p-3.5 rounded-[12px] bg-white border border-[#0284C7]/40 space-y-2.5 flex flex-col justify-between shadow-2xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0284C7]">قبل التحول (المتفاعلات)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-[#0284C7]" dir="ltr">Réactifs</span>
                </div>
                {/* عياني */}
                <div className="p-2 rounded-[8px] bg-[#F0F9FF] border border-sky-200 space-y-1">
                  <div className="text-[10px] font-bold text-[#0369A1]">المستوى العياني (النوع الكيميائي):</div>
                  <div className="text-xs font-bold text-[#1E293B]">غاز البوتان + غاز ثنائي الأكسجين</div>
                </div>
                {/* مجهري */}
                <div className="p-2 rounded-[8px] bg-white border border-[#0284C7]/30 space-y-1">
                  <div className="text-[10px] font-bold text-[#0284C7]">المستوى المجهري (الفرد الكيميائي):</div>
                  <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold" dir="ltr">
                    <span className="px-1.5 py-0.5 rounded bg-sky-50 text-[#0284C7] border border-sky-200">C₄H₁₀</span>
                    <span className="text-[#64748B]">+</span>
                    <span className="px-1.5 py-0.5 rounded bg-sky-50 text-[#0284C7] border border-sky-200">O₂</span>
                  </div>
                </div>
              </div>
              <div className="text-[10.5px] text-[#475569] leading-relaxed pt-1 border-t border-sky-100">
                ثنائي الأزوت N₂ الموجود في الهواء لا يشارك في التحول فلا يُذكر بين المتفاعلات.
              </div>
            </div>

            {/* Card 2 : نواتج الاحتراق التام */}
            <div className="p-3.5 rounded-[12px] bg-white border border-[#0F766E]/40 space-y-2.5 flex flex-col justify-between shadow-2xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F766E]">نواتج الاحتراق التام (بوفرة O₂)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-[#0F766E]" dir="ltr">Complète</span>
                </div>
                {/* عياني */}
                <div className="p-2 rounded-[8px] bg-[#F0FDFA] border border-teal-200 space-y-1">
                  <div className="text-[10px] font-bold text-[#0F766E]">المستوى العياني (النوع الكيميائي):</div>
                  <div className="text-xs font-bold text-[#1E293B]">غاز ثنائي أكسيد الكربون + الماء</div>
                </div>
                {/* مجهري */}
                <div className="p-2 rounded-[8px] bg-white border border-[#0F766E]/30 space-y-1">
                  <div className="text-[10px] font-bold text-[#0F766E]">المستوى المجهري (الفرد الكيميائي):</div>
                  <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold" dir="ltr">
                    <span className="px-1.5 py-0.5 rounded bg-teal-50 text-[#0F766E] border border-teal-200">CO₂</span>
                    <span className="text-[#64748B]">+</span>
                    <span className="px-1.5 py-0.5 rounded bg-teal-50 text-[#0F766E] border border-teal-200">H₂O</span>
                  </div>
                </div>
              </div>
              <div className="text-[10.5px] text-[#475569] leading-relaxed pt-1 border-t border-teal-100">
                يتشكل ناتجان فقط: CO₂ (يعكّر رائق الكلس) والماء H₂O (يتكاثف على الأسطح الباردة).
              </div>
            </div>

            {/* Card 3 : نواتج الاحتراق غير التام */}
            <div className="p-3.5 rounded-[12px] bg-white border border-amber-400 space-y-2.5 flex flex-col justify-between shadow-2xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800">نواتج الاحتراق غير التام (بنقص O₂)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900" dir="ltr">Incomplète</span>
                </div>
                {/* عياني */}
                <div className="p-2 rounded-[8px] bg-[#FFFBEB] border border-amber-200 space-y-1">
                  <div className="text-[10px] font-bold text-amber-800">المستوى العياني (النوع الكيميائي):</div>
                  <div className="text-xs font-bold text-[#1E293B]">CO₂ + ماء + أحادي أكسيد الكربون + سخام</div>
                </div>
                {/* مجهري */}
                <div className="p-2 rounded-[8px] bg-white border border-amber-300 space-y-1">
                  <div className="text-[10px] font-bold text-amber-800">المستوى المجهري (الفرد الكيميائي):</div>
                  <div className="flex items-center gap-1 flex-wrap text-xs font-bold" dir="ltr">
                    <span className="px-1 py-0.5 rounded bg-teal-50 text-[#0F766E] border border-teal-200 text-[11px]">CO₂</span>
                    <span className="px-1 py-0.5 rounded bg-sky-50 text-[#0284C7] border border-sky-200 text-[11px]">H₂O</span>
                    <span className="px-1 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[11px]">CO</span>
                    <span className="px-1 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300 text-[11px]">C</span>
                  </div>
                </div>
              </div>
              <div className="text-[10.5px] text-[#475569] leading-relaxed pt-1 border-t border-amber-100">
                ينتج أحادي أكسيد الكربون السام (CO) وجسيمات السخام السوداء (C) بسبب عدم كفاية O₂.
              </div>
            </div>
          </div>

          {/* Bandeau de synthèse pédagogique */}
          <div className="p-2.5 rounded-[10px] bg-white border border-[#E2D9D0] flex items-center justify-between gap-2 text-xs">
            <span className="font-bold text-[#0F766E]">نموذج التفاعل الكيميائي لاحتراق البوتان التام :</span>
            <div
              dir="ltr"
              style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}
              className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#FAF7F4] border border-[#0F766E]/30 font-bold text-xs text-[#1A1A1A] whitespace-nowrap overflow-x-auto max-w-full shrink-0"
            >
              <ChemicalFormula formula="بوتان (g) + ثنائي الأكسجين (g) ⟶ ثنائي أكسيد الكربون (g) + ماء (g)" size="sm" />
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 04 — المخطط التحصيلي للدرس : مقارنة شاملة بين الاحتراق التام وغير التام
    // ========================================================================
    case 'c04-master-summary-diagram':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]" dir="rtl">
          <div className="max-w-2xl mx-auto flex flex-col items-center space-y-2.5">
            {/* Teal banner with high-contrast pills (WCAG AA >= 4.5:1) */}
            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white font-bold text-xs sm:text-sm text-center">
              <div className="flex flex-wrap items-center justify-center gap-1.5 leading-relaxed">
                <span>احتراق فحم هيدروجيني (مثل البوتان</span>
                <span className="inline-flex items-baseline px-2 py-0.5 rounded-[6px] bg-white text-[#0F766E] font-bold text-xs shadow-xs" dir="ltr">
                  <ChemicalFormula formula="C4H10" size="sm" className="text-[#0F766E] font-bold" />
                </span>
                <span>) بوجود ثنائي الأكسجين (</span>
                <span className="inline-flex items-baseline px-2 py-0.5 rounded-[6px] bg-white text-[#0F766E] font-bold text-xs shadow-xs" dir="ltr">
                  <ChemicalFormula formula="O2" size="sm" className="text-[#0F766E] font-bold" />
                </span>
                <span>) من الهواء</span>
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Branch 1 : الاحتراق التام */}
              <div className="p-3.5 rounded-[12px] bg-white border-2 border-[#0284C7] space-y-2 text-center">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0284C7] text-xs font-bold">
                  <ChemPhysText text="↓ كمية ثنائي الأكسجين (O₂) المتاحة كافية" />
                </div>
                <div className="text-sm font-bold text-[#0284C7]">
                  <ChemPhysText text="🔵 احتراق تام (Combustion complète)" />
                </div>
                <div className="py-1.5 px-3 rounded-[8px] bg-[#F0F9FF] border border-sky-200 text-xs font-bold text-[#0369A1]">
                  <ChemPhysText text="الناتجان المتشكلان : ثنائي أكسيد الكربون (CO₂) + الماء (H₂O)" />
                </div>
                <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                  <ChemPhysText text="لهب أزرق صافٍ · يعكر غاز (CO₂) رائق الكلس الصافي، ويتكاثف الماء (H₂O) على شكل قطرات ندى على الجدار البارد للكأس." />
                </p>
              </div>

              {/* Branch 2 : الاحتراق غير التام */}
              <div className="p-3.5 rounded-[12px] bg-white border-2 border-amber-500 space-y-2 text-center">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                  <ChemPhysText text="↓ كمية ثنائي الأكسجين (O₂) المتاحة غير كافية" />
                </div>
                <div className="text-sm font-bold text-amber-800">
                  <ChemPhysText text="🟠 احتراق غير تام (Combustion incomplète)" />
                </div>
                <div className="py-1.5 px-3 rounded-[8px] bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                  <ChemPhysText text="المواد المتشكلة : أحادي أكسيد الكربون (CO) + الكربون/السخام (C) + ثنائي أكسيد الكربون (CO₂) + الماء (H₂O)" />
                </div>
                <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                  <ChemPhysText text="لهب أصفر/برتقالي · يتشكل غاز أحادي أكسيد الكربون السام (CO) وجسيمات الكربون الصلبة السوداء (السخام C) حسب ظروف الاحتراق." />
                </p>
              </div>
            </div>

            {/* Prevention banner at the bottom of the schema */}
            <div className="w-full p-2.5 rounded-[10px] bg-rose-50 border border-rose-300 flex items-center justify-center gap-2 text-xs font-bold text-rose-900 text-center">
              <span className="shrink-0 text-sm">⚠️</span>
              <span>
                <ChemPhysText text="للوقاية من التسمم بغاز أحادي أكسيد الكربون (CO) الخفي : احرص دائمًا على تهوية المنازل وصيانة مواقد الغاز؛ وعند الشك غادر المكان فورًا واتصل بالحماية المدنية (14)." />
              </span>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 05 — 1. النشاط الاستكشافي : صورة توضيحية قابلة للتكبير + 3 وضعيات مقارنة
    // ========================================================================
    case 'c05-discovery-setup':
      return (
        <div className="p-3.5 rounded-[12px] bg-white border border-[#E2D9D0] space-y-3.5" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c05_balance_parfaite_1791924387470.jpg"
            alt="وضعية الانطلاق للدرس 05 : مقارنة كتابة غير موزونة ومعادلة موزونة على كفتي ميزان الذرات"
            captionArabic="صورة توضيحية : مقارنة بين كتابة غير موزونة (كفتا الميزان غير متعادلتين) ومعادلة موزونة تحترم انحفاظ نوع الذرات وعددها"
            captionFrench="Équilibrer une équation de réaction chimique (Conservation des atomes)"
            courseBadge="الدرس 05"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* الحالة أ */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الحالة (أ) : احتراق الكربون
                </div>
                <div className="py-2 px-2 rounded bg-white border border-[#E2D9D0] flex flex-col items-center justify-center text-center font-sans font-bold" dir="ltr">
                  <span className="text-[#0F766E] text-xs leading-tight whitespace-nowrap">
                    <ChemicalFormula formula="C(s) + O2(g)" size="xs" />
                  </span>
                  <span className="text-[#0F766E] font-bold text-xs my-0.5 select-none leading-none">
                    ⟶
                  </span>
                  <span className="text-[#0284C7] text-xs leading-tight whitespace-nowrap">
                    <ChemicalFormula formula="CO2(g)" size="xs" />
                  </span>
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  في طرف المتفاعلات لدينا 1 ذرة C و 2 ذرتان O، وفي طرف النواتج لدينا 1 ذرة C و 2 ذرتان O: نوع الذرات وعددها متساويان مباشرة!
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-sans font-bold text-[#0F766E] text-center" dir="rtl">
                معادلة موزونة منذ البداية ✓
              </div>
            </div>

            {/* الحالة ب */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-amber-800">
                  الحالة (ب) : تكوين الماء
                </div>
                <div className="py-2 px-2 rounded bg-white border border-[#E2D9D0] flex flex-col items-center justify-center text-center font-sans font-bold" dir="ltr">
                  <span className="text-[#0F766E] text-xs leading-tight whitespace-nowrap">
                    <ChemicalFormula formula="H2(g) + O2(g)" size="xs" />
                  </span>
                  <span className="text-[#0F766E] font-bold text-xs my-0.5 select-none leading-none">
                    ⟶
                  </span>
                  <span className="text-[#0284C7] text-xs leading-tight whitespace-nowrap">
                    <ChemicalFormula formula="H2O(l)" size="xs" />
                  </span>
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  في المتفاعلات لدينا 2 ذرتان O في ثنائي الأكسجين، بينما في جزيء الماء الواحد توجد 1 ذرة O فقط: كفتا الميزان غير متعادلتين!
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-sans font-bold text-amber-800 text-center" dir="rtl">
                كتابة غير موزونة (2 ≠ 1) ❌
              </div>
            </div>

            {/* الحالة ج */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-rose-800">
                  الحالة (ج) : احتراق غاز البوتان
                </div>
                <div className="py-2 px-2 rounded bg-white border border-[#E2D9D0] flex flex-col items-center justify-center text-center font-sans font-bold" dir="ltr">
                  <span className="text-[#0F766E] text-xs leading-tight whitespace-nowrap">
                    <ChemicalFormula formula="C4H10(g) + O2(g)" size="xs" />
                  </span>
                  <span className="text-[#0F766E] font-bold text-xs my-0.5 select-none leading-none">
                    ⟶
                  </span>
                  <span className="text-[#0284C7] text-xs leading-tight whitespace-nowrap">
                    <ChemicalFormula formula="CO2(g) + H2O(l)" size="xs" />
                  </span>
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  في المتفاعلات لدينا 4 ذرات C و 10 ذرات H، بينما كتبنا في النواتج ذرة C واحدة وذرتا H فقط: اختلال في نوع الذرات وعددها!
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-sans font-bold text-rose-800 text-center" dir="rtl">
                كتابة غير موزونة تحتاج موازنة ❌
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 05 — 2. الفرق الحاسم بين المعامل الستوكومتري (Coefficient) والمؤشر (Indice)
    // ========================================================================
    case 'c05-coefficient-vs-subscript':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <svg viewBox="0 0 680 220" className="w-full max-w-2xl mx-auto h-auto">
            <rect x="8" y="8" width="664" height="204" rx="14" fill="#FFFFFF" stroke="#E2D9D0" />

            {/* Central Big Formula : 2 H₂O */}
            <g transform="translate(340, 88)">
              {/* Coefficient 2 */}
              <rect x="-86" y="-38" width="44" height="58" rx="10" fill="#F0FDFA" stroke="#0F766E" strokeWidth="2.5" />
              <text x="-64" y="6" textAnchor="middle" fontSize="38" fontWeight="bold" fill="#0F766E" fontFamily="system-ui, -apple-system, sans-serif">
                2
              </text>

              {/* H */}
              <text x="-18" y="6" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#1E293B" fontFamily="system-ui, -apple-system, sans-serif">
                H
              </text>

              {/* Subscript 2 */}
              <rect x="2" y="-12" width="28" height="36" rx="7" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
              <text x="16" y="16" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#DC2626" fontFamily="system-ui, -apple-system, sans-serif">
                2
              </text>

              {/* O */}
              <text x="52" y="6" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#1E293B" fontFamily="system-ui, -apple-system, sans-serif">
                O
              </text>
            </g>

            {/* Right Callout : المعامل الستوكومتري */}
            <rect x="22" y="24" width="216" height="118" rx="10" fill="#F0FDFA" stroke="#0F766E" strokeWidth="1.8" />
            <text x="130" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0F766E">
              ✔ المعامل الستوكومتري (2)
            </text>
            <text x="130" y="74" textAnchor="middle" fontSize="11" fill="#4A4A4A">
              يوضع أمام الصيغة الكيميائية
            </text>
            <text x="130" y="94" textAnchor="middle" fontSize="11" fill="#4A4A4A">
              يضرب كل ذرات الصيغة :
            </text>
            <text x="130" y="112" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0F766E">
              2H₂O = 4 ذرات H و 2 ذرتا O
            </text>
            <text x="130" y="132" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857">
              ✔ نغيّره لموازنة المعادلة
            </text>

            {/* Left Callout : المؤشر الصغير */}
            <rect x="442" y="24" width="216" height="118" rx="10" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" />
            <text x="550" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#DC2626">
              ❌ المؤشر الصغير (₂)
            </text>
            <text x="550" y="74" textAnchor="middle" fontSize="11" fill="#4A4A4A">
              جزء من هوية الفرد الكيميائي
            </text>
            <text x="550" y="94" textAnchor="middle" fontSize="11" fill="#4A4A4A">
              يحدد عدد الذرات داخل الجزيء
            </text>
            <text x="550" y="112" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#B91C1C">
              تغيير المؤشر يعني نوعًا مختلفًا عن الماء
            </text>
            <text x="550" y="132" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#DC2626">
              ❌ لا نغيّره أبدًا!
            </text>

            {/* Bottom summary bar */}
            <rect x="22" y="156" width="636" height="42" rx="8" fill="#FAF7F4" stroke="#E5DDD5" />
            <text x="340" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4A4A4A">
              القاعدة الأساسية : نوازن المعادلة بتغيير المعاملات فقط، ولا نغيّر المؤشرات أبدًا
            </text>
          </svg>
        </div>
      );

    // ========================================================================
    // COURS 05 — 3. النموذج الجزيئي بالتراص الحبيبي لموازنة معادلة تكوين الماء
    // ========================================================================
    case 'c05-water-synthesis-microscopic':
      return (
        <div className="p-3.5 rounded-[12px] bg-white border border-[#E2D9D0] space-y-3" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c05_boules_pate_1791923086179.jpg"
            alt="النموذج الجزيئي بالتراص الحبيبي لاصطناع الماء الموزون : 2H₂(g) + O₂(g) ⟶ 2H₂O(l)"
            captionArabic="النموذج الجزيئي بالتراص الحبيبي (كرات المعجون) لاصطناع الماء الموزون : 2H₂(g) + O₂(g) ⟶ 2H₂O(l) دون عصي ربط، مع انحفاظ نوع الذرات وعددها"
            captionFrench="Modèle moléculaire de l'équation équilibrée : 2 H₂(g) + O₂(g) ⟶ 2 H₂O(l)"
            courseBadge="الدرس 05"
          />

          <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2">
            <div className="text-xs font-bold text-[#0F766E]">
              قراءة المعادلة الموزونة بالنموذج الجزيئي المجهري :
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded bg-white border border-[#E2D9D0] text-center space-y-1">
                <span className="font-bold text-[#0284C7] block">المتفاعلات</span>
                <span dir="ltr" className="font-sans font-bold text-xs block text-[#1E293B]">2H₂(g) + O₂(g)</span>
                <span className="text-[11px] text-[#4A4A4A] block">4 ذرات H بيضاء + ذرتا O حمراوان</span>
              </div>
              <div className="p-2 rounded bg-white border border-[#E2D9D0] text-center space-y-1 flex flex-col justify-center">
                <span className="font-bold text-[#C94BA6] block">إعادة ترتيب الذرات</span>
                <span className="font-bold text-base block text-[#C94BA6]">⟶</span>
                <span className="text-[11px] text-[#6B6B6B] block">لا تُفقد ذرة ولا تُنشأ</span>
              </div>
              <div className="p-2 rounded bg-white border border-[#E2D9D0] text-center space-y-1">
                <span className="font-bold text-[#0F766E] block">النواتج</span>
                <span dir="ltr" className="font-sans font-bold text-xs block text-[#1E293B]">2H₂O(l)</span>
                <span className="text-[11px] text-[#4A4A4A] block">4 ذرات H بيضاء + ذرتا O حمراوان</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 05 — 4. مراحل موازنة معادلة احتراق البوتان خطوة بخطوة
    // ========================================================================
    case 'c05-butane-step-by-step':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* الخطوة 1 : موازنة الكربون C */}
            <div className="p-3.5 rounded-[10px] bg-white border border-[#E5DDD5] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1 border-b border-[#E5DDD5]/60">
                <span className="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold shrink-0">
                  الخطوة 1 : موازنة الكربون (C)
                </span>
                <bdi dir="ltr" style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }} className="text-xs font-sans font-bold text-[#0F766E] whitespace-nowrap">
                  4 C = 4 C
                </bdi>
              </div>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                يوجد 4 ذرات C في جزيء <bdi dir="ltr" className="font-sans font-bold">C₄H₁₀</bdi>، فنضع المعامل <strong>4</strong> أمام <bdi dir="ltr" className="font-sans font-bold">CO₂</bdi>:
              </p>
              <div className="py-2 px-2 rounded bg-[#FAF7F4] border border-[#E5DDD5] flex flex-col items-center justify-center text-center font-sans font-bold" dir="ltr">
                <span className="text-[#0F766E] text-xs leading-tight whitespace-nowrap">
                  <ChemicalFormula formula="C4H10(g) + O2(g)" size="xs" />
                </span>
                <span className="text-[#0F766E] font-bold text-xs my-0.5 select-none leading-none">
                  ⟶
                </span>
                <span className="text-[#0284C7] text-xs leading-tight whitespace-nowrap">
                  <ChemicalFormula formula="4 CO2(g) + H2O(l)" size="xs" />
                </span>
              </div>
            </div>

            {/* الخطوة 2 : موازنة الهيدروجين H */}
            <div className="p-3.5 rounded-[10px] bg-white border border-[#E5DDD5] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1 border-b border-[#E5DDD5]/60">
                <span className="px-2 py-0.5 rounded bg-[#0284C7] text-white text-xs font-bold shrink-0">
                  الخطوة 2 : موازنة الهيدروجين (H)
                </span>
                <bdi dir="ltr" style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }} className="text-xs font-sans font-bold text-[#0284C7] whitespace-nowrap">
                  10 H = 5 × 2 H
                </bdi>
              </div>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                يوجد 10 ذرات H في <bdi dir="ltr" className="font-sans font-bold">C₄H₁₀</bdi>، فنضع المعامل <strong>5</strong> أمام <bdi dir="ltr" className="font-sans font-bold">H₂O</bdi>:
              </p>
              <div className="py-2 px-2 rounded bg-[#FAF7F4] border border-[#E5DDD5] flex flex-col items-center justify-center text-center font-sans font-bold" dir="ltr">
                <span className="text-[#0F766E] text-xs leading-tight whitespace-nowrap">
                  <ChemicalFormula formula="C4H10(g) + O2(g)" size="xs" />
                </span>
                <span className="text-[#0F766E] font-bold text-xs my-0.5 select-none leading-none">
                  ⟶
                </span>
                <span className="text-[#0284C7] text-xs leading-tight whitespace-nowrap">
                  <ChemicalFormula formula="4 CO2(g) + 5 H2O(l)" size="xs" />
                </span>
              </div>
            </div>

            {/* الخطوة 3 : موازنة الأكسجين O */}
            <div className="p-3.5 rounded-[10px] bg-white border border-[#E5DDD5] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1 border-b border-[#E5DDD5]/60">
                <span className="px-2 py-0.5 rounded bg-[#C94BA6] text-white text-xs font-bold shrink-0">
                  الخطوة 3 : موازنة الأكسجين (خطوة مؤقتة)
                </span>
                <bdi dir="ltr" style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }} className="text-xs font-sans font-bold text-[#C94BA6] whitespace-nowrap">
                  8 + 5 = 13 O
                </bdi>
              </div>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                في النواتج: <bdi dir="ltr" style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }} className="font-sans font-bold text-[#1E293B] whitespace-nowrap">(4 × 2) + (5 × 1) = 8 + 5 = 13 O</bdi>، فنضع الكسر <bdi dir="ltr" className="font-sans font-bold">13/2</bdi> أمام <bdi dir="ltr" className="font-sans font-bold">O₂</bdi> كخطوة مؤقتة:
              </p>
              <div className="py-2 px-2 rounded bg-[#FAF7F4] border border-[#E5DDD5] flex flex-col items-center justify-center text-center font-sans font-bold" dir="ltr">
                <span className="text-[#0F766E] text-xs leading-tight whitespace-nowrap">
                  <ChemicalFormula formula="C4H10(g) + 13/2 O2(g)" size="xs" />
                </span>
                <span className="text-[#0F766E] font-bold text-xs my-0.5 select-none leading-none">
                  ⟶
                </span>
                <span className="text-[#0284C7] text-xs leading-tight whitespace-nowrap">
                  <ChemicalFormula formula="4 CO2(g) + 5 H2O(l)" size="xs" />
                </span>
              </div>
            </div>

            {/* الخطوة 4 : ضرب المعاملات في 2 للحصول على أعداد طبيعية */}
            <div className="p-3.5 rounded-[10px] bg-[#F0FDFA] border-2 border-[#0F766E] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1 border-b border-[#0F766E]/20">
                <span className="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold shrink-0">
                  الخطوة 4 : الضرب في 2 (معاملات طبيعية نهائية)
                </span>
                <bdi dir="ltr" style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }} className="text-xs font-sans font-bold text-[#0F766E] whitespace-nowrap">
                  8 C · 20 H · 26 O
                </bdi>
              </div>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                نضرب جميع معاملات المعادلة في <strong>2</strong> للحصول على أصغر أعداد طبيعية:
              </p>
              <div className="py-2 px-2 rounded bg-white border border-[#0F766E]/40 flex flex-col items-center justify-center text-center font-sans font-bold" dir="ltr">
                <span className="text-[#0F766E] text-xs leading-tight whitespace-nowrap">
                  <ChemicalFormula formula="2 C4H10(g) + 13 O2(g)" size="xs" />
                </span>
                <span className="text-[#0F766E] font-bold text-xs my-0.5 select-none leading-none">
                  ⟶
                </span>
                <span className="text-[#0284C7] text-xs leading-tight whitespace-nowrap">
                  <ChemicalFormula formula="8 CO2(g) + 10 H2O(l)" size="xs" />
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Chemical Equation Balancer Lab */}
          <EquationBalancerTool />
        </div>
      );

    // ========================================================================
    // COURS 05 — الخلاصة : منهجية موازنة المعادلات الكيميائية
    // ========================================================================
    case 'c05-master-summary-diagram':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]" dir="rtl">
          <div className="max-w-xl mx-auto flex flex-col items-center space-y-2">
            <div className="w-full py-2 px-4 rounded-[10px] bg-[#0F766E] text-white font-bold text-xs sm:text-sm text-center">
              مبدأ موازنة معادلة التفاعل الكيميائي : انحفاظ نوع الذرات وعددها
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#0284C7] text-center text-xs sm:text-sm font-bold text-[#0284C7]">
              نوع الذرات وعددها في المتفاعلات = نوع الذرات وعددها في النواتج
            </div>
            <ArrowDown className="w-4 h-4 text-[#C94BA6]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-[10px] bg-[#F0FDFA] border border-[#0F766E] text-center text-xs font-bold text-[#0F766E]">
                ✔ نغيّر فقط المعاملات الستوكومترية (أصغر الأعداد الطبيعية) أمام الصيغ
              </div>
              <div className="p-2.5 rounded-[10px] bg-rose-50 border border-rose-300 text-center text-xs font-bold text-rose-800">
                ❌ لا نغيّر أبدًا المؤشرات داخل الصيغ الكيميائية
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1.5">
              <div className="text-xs sm:text-sm font-bold">
                المعادلتان المرجعيتان للحفظ بالمعاملات والحالات الفيزيائية :
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2" dir="ltr">
                <span className="bg-white px-3 py-1 rounded-[8px] text-xs">
                  <ChemicalFormula formula="2 H2(g) + O2(g) -> 2 H2O(l)" size="sm" />
                </span>
                <span className="bg-white px-3 py-1 rounded-[8px] text-xs">
                  <ChemicalFormula formula="2 C4H10(g) + 13 O2(g) -> 8 CO2(g) + 10 H2O(l)" size="sm" />
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 06 : العوامل المؤثرة في التحوّل الكيميائي
    // (Les facteurs influençant une transformation chimique)
    // ========================================================================

    case 'c06-discovery-setup':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4">
          <ZoomableCourseImage
            src="/src/assets/images/c06_facteurs_reaction_1790808515013.jpg"
            alt="وضعية الانطلاق للدرس 06 : تأثير درجة الحرارة وسطح التلامس على سرعة التحوّل الكيميائي"
            captionArabic="الدرس 06 — وضعية الانطلاق : مقارنة تجريبية لتأثير درجة الحرارة وسطح التلامس على سرعة التحوّل الكيميائي"
            captionFrench="Cours 06 · Expériences comparatives : Température (10 °C vs 50 °C) et Surface de contact (Comprimé entier vs Poudre)"
            courseBadge="الدرس 06"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-right">
            <div className="bg-white rounded-[10px] p-3.5 border border-[#E2D9D0] space-y-1">
              <div className="text-xs font-bold text-[#6B6B6B]">
                1. اختلاف سرعة التحوّلات في الطبيعة
              </div>
              <div className="text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                احتراق الخشب أو الغاز يحدث <strong className="text-[#C2410C]">بسرعة</strong>، بينما صدأ الحديد يحدث <strong className="text-[#1D4ED8]">ببطء</strong> على مدى أيام أو أسابيع.
              </div>
            </div>

            <div className="bg-[#FFF7ED] rounded-[10px] p-3.5 border border-[#FDBA74] space-y-1">
              <div className="text-xs font-bold text-[#C2410C]">
                2. تجربة درجة الحرارة
              </div>
              <div className="text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                القرص الفوار في <strong className="text-[#C2410C]">الماء الدافئ (<bdi dir="ltr" style={{ whiteSpace: 'nowrap' }}>50 °C</bdi>)</strong> يفور ويتفاعل أسرع بكثير منه في <strong className="text-[#1D4ED8]">الماء البارد (<bdi dir="ltr" style={{ whiteSpace: 'nowrap' }}>10 °C</bdi>)</strong>.
              </div>
            </div>

            <div className="bg-[#F0FDFA] rounded-[10px] p-3.5 border border-[#99F6E4] space-y-1">
              <div className="text-xs font-bold text-[#0F766E]">
                3. تجربة سطح التلامس
              </div>
              <div className="text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                <strong className="text-[#0F766E]">مسحوق القرص</strong> يتفاعل أسرع بكثير من <strong className="text-[#4A4A4A]">القرص الكامل المتماسك</strong> بنفس الكتلة.
              </div>
            </div>
          </div>
        </div>
      );

    case 'c06-reaction-speeds-comparison':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              تصنيف التحوّلات الكيميائية حسب سرعتها
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              تختلف سرعة التحوّلات الكيميائية، وتنقسم إلى صنفين رئيسيين حسب المدة اللازمة لحدوثها
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Fast transformation */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#EA580C] space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C2410C]">1. تحوّل سريع</span>
                  <span className="text-[11px] font-mono font-bold text-[#C2410C]" dir="ltr">
                    Transformation rapide
                  </span>
                </div>
                <div className="text-xs text-[#2B2B2B] leading-relaxed">
                  يحدث في لحظات وجيزة أو بضع ثوانٍ بمجرد تلامس المتفاعلات وتوفر الشروط اللازمة.
                </div>
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#FFF7ED] border border-[#FED7AA] text-[11px] text-[#9A3412] space-y-1">
                <div className="font-bold">أمثلة من المنهاج :</div>
                <div>• احتراق شمعة.</div>
                <div>• احتراق الغاز.</div>
                <div>• قرص فوار في الماء.</div>
              </div>
            </div>

            {/* Slow transformation */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#0284C7] space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0369A1]">2. تحوّل بطيء</span>
                  <span className="text-[11px] font-mono font-bold text-[#0369A1]" dir="ltr">
                    Transformation lente
                  </span>
                </div>
                <div className="text-xs text-[#2B2B2B] leading-relaxed">
                  يستغرق عدة ساعات أو أيام لكي تبرز نواتجه وتتغير الجملة الكيميائية.
                </div>
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#F0F9FF] border border-[#BAE6FD] text-[11px] text-[#0369A1] space-y-1">
                <div className="font-bold">أمثلة من المنهاج :</div>
                <div>• صدأ الحديد.</div>
                <div>• تحوّل الحليب إلى رايب.</div>
                <div>• تشكّل زنجارة النحاس.</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'c06-temperature-factor-micro':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-5">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              العامل الأول : تأثير درجة الحرارة وتفسيره المجهري
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              مقارنة اضطراب حركة الأفراد الكيميائية والتصادمات بينها في الماء البارد والماء الدافئ
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cold water */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#38BDF8] space-y-3">
              <div className="flex items-center justify-between border-b border-[#E0F2FE] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#0369A1]">
                  الكأس (A) : ماء بارد (<bdi dir="ltr" style={{ whiteSpace: 'nowrap' }}>10 °C</bdi>)
                </span>
                <span className="text-[11px] font-bold text-[#0284C7]">تحوّل أبطأ</span>
              </div>

              <svg viewBox="0 0 260 125" className="w-full h-32 bg-[#F0F9FF] rounded-[10px] border border-[#BAE6FD]">
                <path d="M 55 20 L 55 105 Q 55 112 65 112 L 195 112 Q 205 112 205 105 L 205 20" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
                <line x1="56" y1="35" x2="204" y2="35" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="95" cy="65" r="8" fill="#0284C7" />
                <line x1="95" y1="65" x2="108" y2="58" stroke="#0369A1" strokeWidth="2" />
                <circle cx="155" cy="60" r="8" fill="#0284C7" />
                <line x1="155" y1="60" x2="143" y2="68" stroke="#0369A1" strokeWidth="2" />
                <circle cx="125" cy="92" r="10" fill="#64748B" />
                <text x="125" y="95" textAnchor="middle" className="text-[8px] fill-white font-bold">قرص</text>
                <circle cx="120" cy="48" r="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
                <circle cx="135" cy="44" r="2.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
              </svg>

              <div className="text-xs text-[#2B2B2B] space-y-1 leading-relaxed">
                <div>• <strong>الملاحظة العيانية :</strong> فوران خفيف وانطلاق بطيء للفقاعات الغازية.</div>
                <div>• <strong>التفسير المجهري :</strong> درجة الحرارة منخفضة ⟵ اضطراب الأفراد الكيميائية بطيء ⟵ <strong>تصادمات قليلة</strong> بين الأفراد الكيميائية.</div>
              </div>
            </div>

            {/* Warm water */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#EA580C] space-y-3">
              <div className="flex items-center justify-between border-b border-[#FFEDD5] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#C2410C]">
                  الكأس (B) : ماء دافئ (<bdi dir="ltr" style={{ whiteSpace: 'nowrap' }}>50 °C</bdi>)
                </span>
                <span className="text-[11px] font-bold text-[#EA580C]">تحوّل أسرع بكثير</span>
              </div>

              <svg viewBox="0 0 260 125" className="w-full h-32 bg-[#FFF7ED] rounded-[10px] border border-[#FED7AA]">
                <path d="M 55 20 L 55 105 Q 55 112 65 112 L 195 112 Q 205 112 205 105 L 205 20" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2.5" />
                <line x1="56" y1="35" x2="204" y2="35" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="88" cy="62" r="8" fill="#EA580C" />
                <line x1="88" y1="62" x2="115" y2="78" stroke="#C2410C" strokeWidth="2.5" />
                <circle cx="172" cy="58" r="8" fill="#EA580C" />
                <line x1="172" y1="58" x2="142" y2="78" stroke="#C2410C" strokeWidth="2.5" />
                <circle cx="105" cy="92" r="7" fill="#EA580C" />
                <line x1="105" y1="92" x2="122" y2="88" stroke="#C2410C" strokeWidth="2.5" />
                <circle cx="130" cy="90" r="9" fill="#64748B" />
                <circle cx="130" cy="76" r="5" fill="#F59E0B" />
                <circle cx="112" cy="52" r="3.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                <circle cx="128" cy="44" r="4" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                <circle cx="144" cy="50" r="3.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                <circle cx="120" cy="39" r="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                <circle cx="138" cy="38" r="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
              </svg>

              <div className="text-xs text-[#2B2B2B] space-y-1 leading-relaxed">
                <div>• <strong>الملاحظة العيانية :</strong> فوران شديد وانطلاق غزير وسريع للغاز.</div>
                <div>• <strong>التفسير المجهري :</strong> ارتفاع الحرارة يزيد <strong>اضطراب حركة الأفراد الكيميائية</strong> ⟵ <strong>تصادمات كثيرة جدًا</strong> بين الأفراد الكيميائية.</div>
              </div>
            </div>
          </div>

          {/* Microscopic vertical causal chain with ↓ */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E2D9D0]">
            <div className="text-[11px] font-bold text-[#6B6B6B] text-center mb-3">
              السلسلة السببية المجهرية لتأثير درجة الحرارة :
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 max-w-sm mx-auto text-center font-sans">
              <span className="w-full py-1.5 px-3 rounded-[8px] bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] font-bold text-xs">
                درجة الحرارة ↑
              </span>
              <span className="text-[#C2410C] font-bold text-sm select-none">↓</span>
              <span className="w-full py-1.5 px-3 rounded-[8px] bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-bold text-xs">
                اضطراب (حركة) الأفراد الكيميائية ↑
              </span>
              <span className="text-[#92400E] font-bold text-sm select-none">↓</span>
              <span className="w-full py-1.5 px-3 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E] font-bold text-xs">
                التصادمات بين الأفراد الكيميائية ↑
              </span>
              <span className="text-[#0F766E] font-bold text-sm select-none">↓</span>
              <span className="w-full py-1.5 px-3 rounded-[8px] bg-[#0F766E] text-white font-bold text-xs">
                سرعة التحوّل الكيميائي ↑
              </span>
            </div>
          </div>
        </div>
      );

    case 'c06-contact-surface-factor':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-5">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              العامل الثاني : تأثير سطح التلامس (تجزئة المتفاعلات)
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              مقارنة التحوّل على المستوى المجهري بين قطعة صلبة متماسكة ومسحوق مجزأ من المادة نفسها وبنفس الكتلة
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Whole solid piece */}
            <div className="bg-white rounded-[12px] p-4 border border-[#CBD5E1] space-y-3">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#334155]">
                  1. قطعة صلبة متماسكة
                </span>
                <span className="text-[11px] font-bold text-[#64748B]">سطح تلامس صغير</span>
              </div>

              <svg viewBox="0 0 260 120" className="w-full h-30 bg-[#F8FAFC] rounded-[10px] border border-[#E2E8F0]">
                <g transform="translate(95, 30)">
                  {[0, 1, 2].map((r) =>
                    [0, 1, 2].map((c) => (
                      <circle
                        key={`${r}-${c}`}
                        cx={c * 22 + 12}
                        cy={r * 22 + 12}
                        r="10"
                        fill={r === 1 && c === 1 ? '#94A3B8' : '#475569'}
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    ))
                  )}
                </g>
                <circle cx="55" cy="60" r="6" fill="#0284C7" />
                <line x1="63" y1="60" x2="88" y2="60" stroke="#0284C7" strokeWidth="2" />
                <circle cx="205" cy="60" r="6" fill="#0284C7" />
                <line x1="197" y1="60" x2="172" y2="60" stroke="#0284C7" strokeWidth="2" />
                <text x="130" y="112" textAnchor="middle" className="text-[9px] fill-[#475569] font-bold">
                  الأفراد الكيميائية الداخلية محجوبة لا تتصادم مباشرة
                </text>
              </svg>

              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                الأفراد الكيميائية الموجودة على السطح الخارجي فقط هي المعرضة للتصادم مع المتفاعل الآخر، بينما تبقى الأفراد الداخلية محجوبة حتى تتآكل الطبقات الخارجية.
              </div>
            </div>

            {/* Divided powder */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#0F766E] space-y-3">
              <div className="flex items-center justify-between border-b border-[#CCFBF1] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#0F766E]">
                  2. مسحوق مجزأ (بنفس الكتلة)
                </span>
                <span className="text-[11px] font-bold text-[#0F766E]">سطح تلامس كبير جدًا</span>
              </div>

              <svg viewBox="0 0 260 120" className="w-full h-30 bg-[#F0FDFA] rounded-[10px] border border-[#99F6E4]">
                {[
                  { x: 55, y: 38 },
                  { x: 105, y: 32 },
                  { x: 155, y: 36 },
                  { x: 205, y: 40 },
                  { x: 75, y: 76 },
                  { x: 130, y: 72 },
                  { x: 185, y: 78 },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="9" fill="#0F766E" />
                    <circle cx={pt.x - 16} cy={pt.y - 8} r="4.5" fill="#0284C7" />
                    <line
                      x1={pt.x - 11}
                      y1={pt.y - 5}
                      x2={pt.x - 6}
                      y2={pt.y - 2}
                      stroke="#EA580C"
                      strokeWidth="2"
                    />
                  </g>
                ))}
                <text x="130" y="112" textAnchor="middle" className="text-[9px] fill-[#0F766E] font-bold">
                  جميع الأفراد الكيميائية معرضة للتصادم المباشر في نفس اللحظة!
                </text>
              </svg>

              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                عند تجزئة المادة الصلبة إلى مسحوق، يكبر <strong>سطح التلامس</strong> بشكل هائل، فتتصادم معظم الأفراد الكيميائية في آن واحد وتزداد سرعة التحوّل.
              </div>
            </div>
          </div>

          {/* Microscopic vertical causal chain with ↓ */}
          <div className="bg-white rounded-[12px] p-4 border border-[#E2D9D0]">
            <div className="text-[11px] font-bold text-[#6B6B6B] text-center mb-3">
              السلسلة السببية المجهرية لتأثير سطح التلامس :
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 max-w-sm mx-auto text-center font-sans">
              <span className="w-full py-1.5 px-3 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E] font-bold text-xs">
                تجزئة المتفاعل الصلب إلى مسحوق
              </span>
              <span className="text-[#0F766E] font-bold text-sm select-none">↓</span>
              <span className="w-full py-1.5 px-3 rounded-[8px] bg-[#CCFBF1] border border-[#5EEAD4] text-[#0D9488] font-bold text-xs">
                سطح التلامس ↑
              </span>
              <span className="text-[#0D9488] font-bold text-sm select-none">↓</span>
              <span className="w-full py-1.5 px-3 rounded-[8px] bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] font-bold text-xs">
                التصادمات بين الأفراد الكيميائية ↑
              </span>
              <span className="text-[#C2410C] font-bold text-sm select-none">↓</span>
              <span className="w-full py-1.5 px-3 rounded-[8px] bg-[#0F766E] text-white font-bold text-xs">
                سرعة التحوّل الكيميائي ↑
              </span>
            </div>
          </div>
        </div>
      );

    case 'c06-mixture-and-catalyst':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              العامل الثالث : تركيب المزيج الابتدائي وعوامل أخرى
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              تأثير وفرة المتفاعلات وعوامل الضغط والوسيط والضوء في سرعة وتوجيه التحوّل الكيميائي
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-[12px] p-4 border border-[#E2D9D0] space-y-2">
              <div className="text-xs font-bold text-[#0369A1]">
                1. الاحتراق في الهواء (حوالي 20 % O₂ و 80 % غاز ثنائي الأزوت)
              </div>
              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                في الهواء، خُمس الأفراد الكيميائية فقط هو ثنائي الأكسجين (<ChemicalFormula formula="O2" size="sm" />) والباقي غاز ثنائي الأزوت، لذلك تكون التصادمات معتدلة والاحتراق أقل سرعة.
              </div>
            </div>

            <div className="bg-[#FFF7ED] rounded-[12px] p-4 border border-[#FDBA74] space-y-2">
              <div className="text-xs font-bold text-[#C2410C]">
                2. الاحتراق في ثنائي الأكسجين النقي (100% O₂)
              </div>
              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                عند توفر <ChemicalFormula formula="O2" size="sm" /> النقي، يكون عدد أفراده أكبر بحوالي خمس مرات في وحدة الحجم، فتزداد التصادمات بين الأفراد الكيميائية ويشتعل الفحم بلهب أشد وسرعة أكبر، كما يوجه التحوّل نحو احتراق تام.
              </div>
            </div>

            <div className="bg-[#F0FDFA] rounded-[12px] p-4 border border-[#99F6E4] space-y-2">
              <div className="text-xs font-bold text-[#0F766E]">
                3. عوامل أخرى (الضغط، الوسيط، الضوء)
              </div>
              <div className="text-xs text-[#2B2B2B] leading-relaxed space-y-1">
                <div>• <strong>الضغط :</strong> زيادة الضغط تُنقص المسافة بين الأفراد الكيميائية فتزداد التصادمات.</div>
                <div>• <strong>الوسيط :</strong> نوع كيميائي يساعد على حدوث التحوّل الكيميائي دون أن يظهر في النواتج (مثل إضافة الصود في التحليل الكهربائي للماء).</div>
                <div>• <strong>الضوء :</strong> تحتاج بعض التحوّلات إلى الضوء لحدوثها أو تسريعها، مثل التركيب الضوئي عند النباتات.</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'c06-master-summary-diagram':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border-2 border-[#0F766E] space-y-4">
          <div className="text-center space-y-1">
            <div className="text-sm sm:text-base font-bold text-[#0F766E]">
              المخطط النهائي الشامل للدرس 06 : العوامل المؤثرة في التحوّل الكيميائي
            </div>
            <div className="text-xs text-[#6B6B6B]" dir="ltr">
              Schéma-bilan unique · Les facteurs influençant une transformation chimique
            </div>
          </div>

          <div className="max-w-xl mx-auto flex flex-col items-center space-y-2">
            <div className="w-full py-2.5 px-4 rounded-[10px] bg-white border-2 border-[#1D4ED8] text-center">
              <div className="text-xs sm:text-sm font-bold text-[#1D4ED8]">
                العوامل المؤثرة في سرعة وتوجيه التحوّل الكيميائي
              </div>
              <div className="text-[11px] text-[#4A4A4A] mt-0.5">
                1. درجة الحرارة · 2. سطح التلامس · 3. تركيب المزيج الابتدائي · عوامل أخرى (الضغط، الوسيط، الضوء)
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#1D4ED8]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="py-2.5 px-3 rounded-[10px] bg-[#FFF7ED] border border-[#FDBA74] text-center">
                <div className="text-xs font-bold text-[#C2410C]">
                  رفع درجة الحرارة ↑
                </div>
                <div className="text-[11px] text-[#7C2D12] mt-0.5">
                  يزيد اضطراب حركة الأفراد الكيميائية ↑
                </div>
              </div>
              <div className="py-2.5 px-3 rounded-[10px] bg-[#F0FDFA] border border-[#99F6E4] text-center">
                <div className="text-xs font-bold text-[#0F766E]">
                  زيادة سطح التلامس (تجزئة المسحوق ↑)
                </div>
                <div className="text-[11px] text-[#115E59] mt-0.5">
                  يزيد عدد الأفراد الكيميائية المعرضة للتصادم ↑
                </div>
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#FEF3C7] border border-[#F59E0B] text-center">
              <div className="text-xs sm:text-sm font-bold text-[#B45309]">
                التفسير المجهري المشترك : ازدياد التصادمات بين الأفراد الكيميائية
              </div>
              <div className="text-[11px] text-[#78350F] mt-0.5">
                تتصادم الأفراد الكيميائية للمتفاعلات فتتحطم إلى ذرات منفردة تتحد من جديد لتعطي أفرادًا جديدة
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold">
                الفكرة الأساسية للحفظ :
              </div>
              <div className="text-xs leading-relaxed">
                كل عامل يزيد عدد التصادمات بين الأفراد الكيميائية للمتفاعلات يزيد سرعة التحوّل، وتركيب المزيج الابتدائي يوجّه النواتج أيضًا.
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 07 : السلسلة الوظيفية (La chaîne fonctionnelle) — PATCH PÉDAGOGIQUE
    // ========================================================================

    case 'c07-discovery-setup':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4">
          <ZoomableCourseImage
            src="/src/assets/images/c07_chaine_fonctionnelle_1790809652050.jpg"
            alt="وضعية الانطلاق للدرس 07 : تحليل جهاز مصباح الجيب والمروحة الكهربائية للوصول إلى مفهوم السلسلة الوظيفية"
            captionArabic="الدرس 07 — وضعية الانطلاق : كيف تتعاون عناصر جهاز تقني مألوف (مصباح الجيب أو المروحة الكهربائية) لتحقيق النتيجة المطلوبة؟"
            captionFrench="Cours 07 · Du système technique familier (lampe de poche, ventilateur) au besoin de la chaîne fonctionnelle"
            courseBadge="الدرس 07"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-right">
            <div className="bg-white rounded-[10px] p-3.5 border border-[#E2D9D0] space-y-1">
              <div className="text-xs font-bold text-[#1D4ED8]">المرحلة 1 : وضعية ملموسة</div>
              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                نستعمل جهازًا مألوفًا مثل <strong>مصباح الجيب (Lampe de poche)</strong> للحصول على نتيجة محددة: <strong>إنتاج الضوء</strong>.
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3.5 border border-[#E2D9D0] space-y-1">
              <div className="text-xs font-bold text-[#C2410C]">المرحلة 2 : السؤال الإشكالي</div>
              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                الجهاز ليس مجرد قائمة قطع! <strong>كيف تتعاون عدة عناصر في الجهاز لتحقيق الوظيفة المطلوبة؟</strong>
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3.5 border border-[#E2D9D0] space-y-1">
              <div className="text-xs font-bold text-[#0F766E]">المرحلة 3 : تحليل المثال</div>
              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                نحدد العناصر (بطارية، قاطع، موصلات، مصباح) ونسأل: <strong>ماذا يفعل كل عنصر؟</strong>
              </div>
            </div>

            <div className="bg-[#FFFBEB] rounded-[10px] p-3.5 border border-[#FCD34D] space-y-1">
              <div className="text-xs font-bold text-[#B45309]">المرحلة 4 و 5 : ظهور المفهوم</div>
              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                لتمثيل تسلسل هذه الوظائف المتعاونة نحتاج إلى <strong>السلسلة الوظيفية (Chaîne fonctionnelle)</strong>.
              </div>
            </div>
          </div>
        </div>
      );

    case 'c07-lamp-functional-chain':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-5">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              المخطط البيداغوجي الإلزامي (نموذج التشغيل — Modèle de fonctionnement) : مصباح الجيب
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              لا نكتفي بكتابة أسماء العناصر وحدها، بل نربط كل عنصر بالوظيفة التقنية التي ينجزها لتحقيق الهدف المطلوب
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: From target goal to collaborating elements */}
            <div className="bg-white rounded-[12px] p-4 border border-[#CBD5E1] space-y-3 flex flex-col justify-between">
              <div className="space-y-1 border-b border-[#F1F5F9] pb-2 text-center">
                <div className="text-xs sm:text-sm font-bold text-[#1E40AF]">
                  1. من الهدف المطلوب إلى العناصر المتدخلة
                </div>
                <div className="text-[11px] text-[#64748B]">
                  كيف تساهم العناصر تدريجيًا في تحقيق النتيجة؟
                </div>
              </div>

              <div className="max-w-xs mx-auto w-full flex flex-col items-center space-y-1.5 py-2">
                <div className="w-full py-2 px-3 rounded-[8px] bg-[#EFF6FF] border border-[#93C5FD] text-center text-xs font-bold text-[#1E40AF]">
                  الهدف المطلوب (الوظيفة العامة)
                </div>
                <ArrowDown className="w-4 h-4 text-[#1E40AF]" />
                <div className="w-full py-2 px-3 rounded-[8px] bg-[#FEF3C7] border border-[#F59E0B] text-center text-xs font-bold text-[#B45309]">
                  الحصول على الضوء (إضاءة المكان)
                </div>
                <ArrowDown className="w-4 h-4 text-[#B45309]" />
                <div className="w-full py-2 px-3 rounded-[8px] bg-white border-2 border-[#D97706] text-center text-xs font-bold text-[#1A1A1A]">
                  المصباح (Lampe)
                </div>
                <div className="text-xs font-bold text-[#0F766E]">↑ يتغذى عبر الموصلات من ↑</div>
                <div className="w-full py-2 px-3 rounded-[8px] bg-white border-2 border-[#0284C7] text-center text-xs font-bold text-[#1A1A1A]">
                  القاطع / المفتاح (Interrupteur)
                </div>
                <div className="text-xs font-bold text-[#0F766E]">↑ يستمد الطاقة من ↑</div>
                <div className="w-full py-2 px-3 rounded-[8px] bg-white border-2 border-[#EA580C] text-center text-xs font-bold text-[#1A1A1A]">
                  البطارية (Pile)
                </div>
              </div>
            </div>

            {/* Right: Complete pedagogical functional model (Element + Function) */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#0F766E] space-y-3 flex flex-col justify-between">
              <div className="space-y-1 border-b border-[#CCFBF1] pb-2 text-center">
                <div className="text-xs sm:text-sm font-bold text-[#0F766E]">
                  2. النموذج الوظيفي الكامل (العنصر + وظيفته التقنية)
                </div>
                <div className="text-[11px] text-[#115E59]">
                  التمثيل البيداغوجي الكامل للسلسلة الوظيفية لمصباح الجيب
                </div>
              </div>

              <div className="max-w-xs mx-auto w-full flex flex-col items-center space-y-1 py-1">
                <div className="w-full py-1.5 px-3 rounded-[8px] bg-[#FFF7ED] border border-[#FDBA74] text-center text-xs font-bold text-[#C2410C]">
                  البطارية (Pile)
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#EA580C]" />
                <div className="w-full py-1 px-3 rounded-[6px] bg-[#FFEDD5] text-center text-[11px] font-semibold text-[#9A3412]">
                  توفير الطاقة الكهربائية (Fournir l’énergie électrique)
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#0284C7]" />
                <div className="w-full py-1.5 px-3 rounded-[8px] bg-[#F0F9FF] border border-[#BAE6FD] text-center text-xs font-bold text-[#0369A1]">
                  القاطع (Interrupteur)
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#0284C7]" />
                <div className="w-full py-1 px-3 rounded-[6px] bg-[#E0F2FE] text-center text-[11px] font-semibold text-[#075985]">
                  التحكم (Commander le fonctionnement)
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#0F766E]" />
                <div className="w-full py-1.5 px-3 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-center text-xs font-bold text-[#0F766E]">
                  الموصلات / الأسلاك (Conducteurs)
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#0F766E]" />
                <div className="w-full py-1 px-3 rounded-[6px] bg-[#CCFBF1] text-center text-[11px] font-semibold text-[#115E59]">
                  نقل الطاقة (Transmettre l’énergie)
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#D97706]" />
                <div className="w-full py-1.5 px-3 rounded-[8px] bg-[#FFFBEB] border border-[#FCD34D] text-center text-xs font-bold text-[#B45309]">
                  المصباح (Lampe)
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#0F766E]" />
                <div className="w-full py-1.5 px-3 rounded-[8px] bg-[#0F766E] text-white text-center text-xs font-bold">
                  تحويل الطاقة ⟵ ضوء (إضاءة المكان)
                </div>
              </div>
            </div>
          </div>

          {/* Element vs Function & Global vs Technical Function cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="bg-white rounded-[10px] p-3.5 border border-[#CBD5E1] space-y-1">
              <div className="text-xs font-bold text-[#1E293B]">
                التمييز 1 : العنصر التقني (Élément) ≠ الوظيفة (Fonction)
              </div>
              <div className="text-xs text-[#475569] leading-relaxed">
                • <strong>العنصر التقني = مَن يقوم بالدور؟</strong> (مثال: المصباح).<br />
                • <strong>الوظيفة = ماذا يفعل؟</strong> (مثال: تحويل الطاقة الكهربائية إلى ضوء وحرارة).
              </div>
            </div>
            <div className="bg-[#F0FDFA] rounded-[10px] p-3.5 border border-[#99F6E4] space-y-1">
              <div className="text-xs font-bold text-[#0F766E]">
                التمييز 2 : الوظيفة العامة (Globale) ≠ الوظيفة التقنية (Technique)
              </div>
              <div className="text-xs text-[#115E59] leading-relaxed">
                • <strong>الوظيفة العامة :</strong> الخدمة المنتظرة من الجهاز ككل (إضاءة المكان).<br />
                • <strong>الوظيفة التقنية :</strong> الدور الذي ينجزه كل عنصر للمساهمة في الوظيفة العامة.
              </div>
            </div>
          </div>
        </div>
      );

    case 'c07-fan-and-hairdryer-parallel':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              مثال تطبيقي : تحليل النظام التقني لـ « المروحة الكهربائية (Ventilateur électrique) »
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              الوظيفة العامة (Fonction globale) : تحريك الهواء (Mettre l’air en mouvement / Déplacer de l’air)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-[10px] p-3.5 border-2 border-[#EA580C] text-center space-y-1">
              <div className="text-xs font-bold text-[#C2410C]">1. مصدر كهربائي</div>
              <div className="text-[11px] font-mono text-[#9A3412]" dir="ltr">Source électrique</div>
              <div className="text-xs font-semibold text-[#1A1A1A] pt-1 border-t border-[#FFEDD5]">
                توفير الطاقة (Fournir l’énergie)
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3.5 border-2 border-[#0284C7] text-center space-y-1">
              <div className="text-xs font-bold text-[#0369A1]">2. القاطع / المفتاح</div>
              <div className="text-[11px] font-mono text-[#075985]" dir="ltr">Interrupteur</div>
              <div className="text-xs font-semibold text-[#1A1A1A] pt-1 border-t border-[#E0F2FE]">
                التحكم (Commander)
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3.5 border-2 border-[#0F766E] text-center space-y-1">
              <div className="text-xs font-bold text-[#0F766E]">3. المحرك الكهربائي</div>
              <div className="text-[11px] font-mono text-[#115E59]" dir="ltr">Moteur</div>
              <div className="text-xs font-semibold text-[#1A1A1A] pt-1 border-t border-[#CCFBF1]">
                إنتاج حركة (Produire un mouvement)
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3.5 border-2 border-[#D97706] text-center space-y-1">
              <div className="text-xs font-bold text-[#B45309]">4. المروحة / الشفرات</div>
              <div className="text-[11px] font-mono text-[#92400E]" dir="ltr">Hélice</div>
              <div className="text-xs font-semibold text-[#1A1A1A] pt-1 border-t border-[#FEF3C7]">
                تحريك الهواء (Mettre l’air en mouvement)
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] p-4 border border-[#E2D9D0] space-y-2">
            <div className="text-xs font-bold text-[#0F766E] text-center">
              تمثيل السلسلة الوظيفية للمروحة الكهربائية :
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-[8px] bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C]">
                مصدر الطاقة (توفير الطاقة)
              </span>
              <span className="text-[#0F766E]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1]">
                القاطع (التحكم)
              </span>
              <span className="text-[#0F766E]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E]">
                المحرك (إنتاج حركة)
              </span>
              <span className="text-[#0F766E]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#FFFBEB] border border-[#FCD34D] text-[#B45309]">
                المروحة / الشفرات
              </span>
              <span className="text-[#0F766E]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#0F766E] text-white">
                تحريك الهواء
              </span>
            </div>
            <div className="text-[11px] font-mono text-center text-[#64748B]" dir="ltr">
              Source ⟶ Commande ⟶ Moteur ⟶ Hélice ⟶ Déplacement de l’air
            </div>
          </div>
        </div>
      );

    case 'c07-functional-vs-energy-chain':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              الربط مع الدرس القادم (الدرس 08) : من السلسلة الوظيفية إلى السلسلة الطاقوية
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              لماذا ننتقل بعد دراسة السلسلة الوظيفية إلى دراسة السلسلة الطاقوية في الدرس 08؟
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#0F766E] space-y-2.5">
              <div className="text-xs sm:text-sm font-bold text-[#0F766E]">
                1. في هذا الدرس (الدرس 07) : السلسلة الوظيفية (La chaîne fonctionnelle)
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-xs font-bold text-[#115E59]">
                نهتم بالسؤال : « ماذا يفعل كل عنصر؟ » (Que fait chaque élément ?)
              </div>
              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                نحدد عناصر النظام التقني والوظيفة التقنية التي ينجزها كل عنصر للوصول إلى الوظيفة العامة (مثلاً: توفير الطاقة ⟵ التحكم ⟵ نقل الطاقة ⟵ تحويلها لإضاءة المكان).
              </div>
            </div>

            <div className="bg-white rounded-[12px] p-4 border-2 border-[#D97706] space-y-2.5">
              <div className="text-xs sm:text-sm font-bold text-[#B45309]">
                2. في الدرس القادم (الدرس 08) : السلسلة الطاقوية (La chaîne énergétique)
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#FFFBEB] border border-[#FCD34D] text-xs font-bold text-[#92400E]">
                نطرح سؤالًا جديدًا : « ماذا يحدث للطاقة أثناء تشغيل الجهاز؟ »
              </div>
              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                للإجابة عن سؤال كيف تخزن الطاقة وكيف تنتقل وتتحول بين عناصر الجهاز، نحتاج في <strong>الدرس 08</strong> إلى دراسة <strong>السلسلة الطاقوية (La chaîne énergétique)</strong>.
              </div>
            </div>
          </div>
        </div>
      );

    case 'c07-master-summary-diagram':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border-2 border-[#0F766E] space-y-4">
          <div className="text-center space-y-1">
            <div className="text-sm sm:text-base font-bold text-[#0F766E]">
              المخطط الشامل النهائي للدرس 07 : التدرج المنطقي لبناء السلسلة الوظيفية
            </div>
            <div className="text-xs text-[#6B6B6B]" dir="ltr">
              Schéma-bilan unique · De l’appareil réel à la chaîne fonctionnelle et transition vers le Cours 08
            </div>
          </div>

          <div className="max-w-xl mx-auto flex flex-col items-center space-y-2">
            <div className="w-full py-2 px-4 rounded-[10px] bg-white border-2 border-[#1D4ED8] text-center">
              <div className="text-xs sm:text-sm font-bold text-[#1D4ED8]">
                1. جهاز تقني حقيقي (Appareil réel / Système technique)
              </div>
              <div className="text-[11px] text-[#4A4A4A]">
                مصباح الجيب (Lampe de poche) · المروحة الكهربائية (Ventilateur électrique)
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#1D4ED8]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-[#EFF6FF] border border-[#93C5FD] text-center">
              <div className="text-xs sm:text-sm font-bold text-[#1E40AF]">
                2. ما النتيجة التي نريد الحصول عليها؟ ⟵ الوظيفة العامة (Fonction globale)
              </div>
              <div className="text-[11px] text-[#1E3A8A]">
                مثال : إضاءة المكان (في المصباح) · تحريك الهواء (في المروحة)
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="py-2.5 px-3 rounded-[10px] bg-white border border-[#99F6E4] text-center space-y-1">
                <div className="text-xs font-bold text-[#0F766E]">
                  3. ما العناصر المشاركة؟
                </div>
                <div className="text-[11px] font-semibold text-[#115E59] bg-[#F0FDFA] py-1 px-2 rounded-[6px]">
                  العناصر التقنية (Éléments) = « مَن يقوم بالدور؟ »
                </div>
              </div>

              <div className="py-2.5 px-3 rounded-[10px] bg-white border border-[#FDBA74] text-center space-y-1">
                <div className="text-xs font-bold text-[#C2410C]">
                  4. ماذا يفعل كل عنصر؟
                </div>
                <div className="text-[11px] font-semibold text-[#7C2D12] bg-[#FFF7ED] py-1 px-2 rounded-[6px]">
                  الوظائف التقنية (Fonctions) = « ماذا يفعل؟ »
                </div>
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold">
                5. كيف نمثل هذا التنظيم؟ ⟵ السلسلة الوظيفية (La chaîne fonctionnelle)
              </div>
              <div className="text-xs">
                البطارية (توفير الطاقة) ⟵ القاطع (التحكم) ⟵ الموصلات (النقل) ⟵ المصباح (التحويل إلى ضوء)
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#D97706]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-[#FFFBEB] border border-[#F59E0B] text-center">
              <div className="text-xs font-bold text-[#B45309]">
                والخطوة القادمة (الدرس 08) : ماذا يحدث للطاقة؟ ⟵ السلسلة الطاقوية (La chaîne énergétique)
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 08 : السلسلة الطاقوية (La chaîne énergétique)
    // ========================================================================

    case 'c08-discovery-setup':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4">
          <ZoomableCourseImage
            src="/src/assets/images/c08_chaine_energetique_1790882813396.jpg"
            alt="وضعية الانطلاق للدرس 08 : انتقال الطاقة وتحولها من البطارية إلى المصباح الكهربائي ثم الوسط الخارجي (السلسلة الطاقوية)"
            captionArabic="الدرس 08 — وضعية الانطلاق : من أين تأتي الطاقة في مصباح الجيب؟ وكيف تنتقل وتتحول دون أن تختفي؟"
            captionFrench="Cours 08 · De la pile à la lampe et au milieu extérieur : stockage, transfert et transformation d’énergie"
            courseBadge="الدرس 08"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-right">
            <div className="bg-white rounded-[10px] p-3.5 border border-[#E2D9D0] space-y-1">
              <div className="text-xs font-bold text-[#C2410C]">1. من أين تأتي الطاقة؟</div>
              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                تأتي من <strong>البطارية (La pile)</strong> التي تخزن <strong>طاقة كيميائية (طاقة داخلية Ei)</strong> جاهزة للتحويل عند غلق الدارة.
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3.5 border border-[#E2D9D0] space-y-1">
              <div className="text-xs font-bold text-[#0369A1]">2. كيف تنتقل إلى المصباح؟</div>
              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                تنتقل من البطارية إلى المصباح عبر الأسلاك على شكل <strong>طاقة كهربائية (تحويل كهربائي We)</strong>.
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3.5 border border-[#E2D9D0] space-y-1">
              <div className="text-xs font-bold text-[#0F766E]">3. ماذا يحدث داخل المصباح؟</div>
              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                يحوّل المصباح الطاقة الكهربائية إلى <strong>طاقة ضوئية مفيدة (Er)</strong> و<strong>طاقة حرارية (Q)</strong>.
              </div>
            </div>

            <div className="bg-[#FFFBEB] rounded-[10px] p-3.5 border border-[#FCD34D] space-y-1">
              <div className="text-xs font-bold text-[#B45309]">4. هل تختفي الطاقة بعدها؟</div>
              <div className="text-xs text-[#1A1A1A] leading-relaxed">
                <strong>لا تختفي الطاقة!</strong> بل تنتشر في <strong>الوسط الخارجي (Milieu extérieur)</strong> على شكل ضوء وحرارة.
              </div>
            </div>
          </div>
        </div>
      );

    case 'c08-energy-forms-and-lamp-conversion':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-5">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              أشكال الطاقة (Formes d’énergie) وتحولاتها في المصباح والمحرك الكهربائي
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              الطاقة لا تختفي، بل تتحول من شكل إلى آخر مع تمييز التحويل المفيد عن التحويل الحراري الضائع في الوسط الخارجي
            </div>
          </div>

          {/* 6 Energy Forms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-white rounded-[10px] p-3 border border-[#BAE6FD] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0369A1]">1. طاقة كهربائية</span>
                <span className="text-[11px] font-mono font-bold text-[#0284C7]" dir="ltr">Énergie électrique (We)</span>
              </div>
              <div className="text-[11px] text-[#475569]">
                تنتقل عبر الأسلاك الكهربائية لتشغيل الأجهزة (المصباح، المحرك، المكواة).
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3 border border-[#FDE68A] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#B45309]">2. طاقة ضوئية (إشعاعية)</span>
                <span className="text-[11px] font-mono font-bold text-[#D97706]" dir="ltr">Énergie lumineuse (Er)</span>
              </div>
              <div className="text-[11px] text-[#475569]">
                تصدر عن الأجسام المضيئة كالشمس والمصباح الكهربائي المشتعل.
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3 border border-[#FECACA] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#B91C1C]">3. طاقة حرارية</span>
                <span className="text-[11px] font-mono font-bold text-[#DC2626]" dir="ltr">Énergie thermique (Q)</span>
              </div>
              <div className="text-[11px] text-[#475569]">
                تظهر على شكل سخونة أو حرارة تنتشر في الوسط الخارجي.
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3 border border-[#99F6E4] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F766E]">4. طاقة حركية</span>
                <span className="text-[11px] font-mono font-bold text-[#0D9488]" dir="ltr">Énergie cinétique (Ec)</span>
              </div>
              <div className="text-[11px] text-[#475569]">
                يمتلكها كل جسم في حالة حركة (دوران المحرك، شفرات المروحة، تدفق الماء).
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3 border border-[#FDBA74] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C2410C]">5. طاقة كيميائية (داخلية)</span>
                <span className="text-[11px] font-mono font-bold text-[#EA580C]" dir="ltr">Énergie chimique (Ei)</span>
              </div>
              <div className="text-[11px] text-[#475569]">
                مخزنة داخل البطارية، الوقود (الغاز والبنزين)، أو الأغذية.
              </div>
            </div>

            <div className="bg-white rounded-[10px] p-3 border border-[#CBD5E1] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#334155]">6. طاقة كامنة / نووية</span>
                <span className="text-[11px] font-mono font-bold text-[#475569]" dir="ltr">Énergie potentielle (Ep) / nucléaire</span>
              </div>
              <div className="text-[11px] text-[#475569]">
                الطاقة الكامنة الثقالية (ماء السد المرتفع) والمرونية، والطاقة النووية في المفاعلات.
              </div>
            </div>
          </div>

          {/* Energy transformation diagrams: Lamp & Motor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
            {/* Example 1: Lamp */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#D97706] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#B45309] text-center border-b border-[#FEF3C7] pb-2">
                مثال 1 : مخطط تحويل الطاقة في المصباح الكهربائي (Lampe électrique)
              </div>

              <div className="flex flex-col items-center space-y-2 py-1">
                <div className="px-4 py-1.5 rounded-[8px] bg-[#E0F2FE] border border-[#7DD3FC] text-xs font-bold text-[#0369A1]">
                  طاقة كهربائية واردة (Énergie électrique — We)
                </div>
                <ArrowDown className="w-4 h-4 text-[#0284C7]" />
                <div className="w-44 py-2.5 px-4 rounded-[999px] bg-[#FFFBEB] border-2 border-[#D97706] text-center">
                  <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">مصباح كهربائي</div>
                  <div className="text-[11px] font-mono text-[#92400E]" dir="ltr">Lampe électrique</div>
                </div>
                <ArrowDown className="w-4 h-4 text-[#D97706]" />
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-[8px] bg-[#ECFDF5] border border-[#6EE7B7] text-center space-y-0.5">
                    <div className="text-xs font-bold text-[#047857]">طاقة ضوئية (Er)</div>
                    <div className="text-[11px] font-semibold text-[#065F46]">تحويل مفيد (إضاءة المكان)</div>
                  </div>
                  <div className="p-2.5 rounded-[8px] bg-[#FEF2F2] border border-[#FCA5A5] text-center space-y-0.5">
                    <div className="text-xs font-bold text-[#B91C1C]">طاقة حرارية (Q)</div>
                    <div className="text-[11px] font-semibold text-[#991B1B]">تحويل غير مفيد (تنتشر في الوسط)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: Electric Motor */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#0F766E] space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#0F766E] text-center border-b border-[#CCFBF1] pb-2">
                مثال 2 : مخطط تحويل الطاقة في المحرك الكهربائي (Moteur électrique)
              </div>

              <div className="flex flex-col items-center space-y-2 py-1">
                <div className="px-4 py-1.5 rounded-[8px] bg-[#E0F2FE] border border-[#7DD3FC] text-xs font-bold text-[#0369A1]">
                  طاقة كهربائية واردة (Énergie électrique — We)
                </div>
                <ArrowDown className="w-4 h-4 text-[#0284C7]" />
                <div className="w-44 py-2.5 px-4 rounded-[999px] bg-[#F0FDFA] border-2 border-[#0F766E] text-center">
                  <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">محرك كهربائي</div>
                  <div className="text-[11px] font-mono text-[#115E59]" dir="ltr">Moteur électrique</div>
                </div>
                <ArrowDown className="w-4 h-4 text-[#0F766E]" />
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-[8px] bg-[#ECFDF5] border border-[#6EE7B7] text-center space-y-0.5">
                    <div className="text-xs font-bold text-[#047857]">طاقة حركية / ميكانيكية (Ec / W)</div>
                    <div className="text-[11px] font-semibold text-[#065F46]">تحويل مفيد (إحداث دوران)</div>
                  </div>
                  <div className="p-2.5 rounded-[8px] bg-[#FEF2F2] border border-[#FCA5A5] text-center space-y-0.5">
                    <div className="text-xs font-bold text-[#B91C1C]">طاقة حرارية (Q)</div>
                    <div className="text-[11px] font-semibold text-[#991B1B]">تحويل غير مفيد (سخونة المحرك)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'c08-lamp-energy-chain':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-5">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              تمثيل السلسلة الطاقوية لمصباح الجيب ومقارنتها مع السلسلة الوظيفية (الدرس 07 مقابل الدرس 08)
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              نحتفظ بنفس الجمل المتفاعلة، ونستبدل أفعال الوظائف بأنماط تخزين الطاقة (تحت الفقاعة) وأنماط تحويلها (فوق السهم)
            </div>
          </div>

          {/* 1. Reminder of Functional Chain (Course 07) */}
          <div className="bg-white rounded-[12px] p-4 border border-[#CBD5E1] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1F5F9] pb-2">
              <span className="text-xs font-bold text-[#475569]">
                أولًا — تذكير بالسلسلة الوظيفية لنفس الجهاز (الدرس 07 : ماذا يفعل كل عنصر؟)
              </span>
              <span className="text-[11px] font-mono text-[#64748B]" dir="ltr">
                Chaîne fonctionnelle (Cours 07)
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 py-1">
              <div className="flex flex-col items-center space-y-1">
                <div className="px-4 py-2 rounded-[999px] bg-[#F8FAFC] border-2 border-[#64748B] text-xs font-bold text-[#1E293B]">
                  البطارية (Pile)
                </div>
                <span className="text-[11px] font-semibold text-[#475569]">تتفرغ (تزود بالطاقة)</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-[#0369A1]">تغذي (نقل وتحكم)</span>
                <span className="text-base font-bold text-[#0369A1]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div className="px-4 py-2 rounded-[999px] bg-[#F8FAFC] border-2 border-[#64748B] text-xs font-bold text-[#1E293B]">
                  المصباح (Lampe)
                </div>
                <span className="text-[11px] font-semibold text-[#475569]">يتوهج (يحول الطاقة)</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-[#B45309]">يضيء ويسخن</span>
                <span className="text-base font-bold text-[#B45309]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div className="px-4 py-2 rounded-[999px] bg-[#F8FAFC] border-2 border-[#64748B] text-xs font-bold text-[#1E293B]">
                  الوسط الخارجي (Milieu extérieur)
                </div>
                <span className="text-[11px] font-semibold text-[#475569]">يُضاء ويسخن</span>
              </div>
            </div>
          </div>

          {/* 2. Complete Energy Chain (Course 08) */}
          <div className="bg-white rounded-[12px] p-4 border-2 border-[#0F766E] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#CCFBF1] pb-2">
              <span className="text-xs sm:text-sm font-bold text-[#0F766E]">
                ثانيًا — السلسلة الطاقوية الكاملة لمصباح الجيب (الدرس 08 : ماذا يحدث للطاقة؟)
              </span>
              <span className="text-[11px] font-mono font-bold text-[#0F766E]" dir="ltr">
                Chaîne énergétique (Cours 08)
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 py-2">
              {/* Node 1: Battery */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="px-5 py-2.5 rounded-[999px] bg-[#FFF7ED] border-2 border-[#EA580C] text-center">
                  <div className="text-xs sm:text-sm font-bold text-[#C2410C]">البطارية</div>
                  <div className="text-[10px] font-mono text-[#9A3412]" dir="ltr">Pile</div>
                </div>
                <div className="px-2.5 py-1 rounded-[6px] bg-[#FFEDD5] border border-[#FDBA74] text-center">
                  <div className="text-[11px] font-bold text-[#9A3412]">طاقة كيميائية / داخلية</div>
                  <div className="text-[11px] font-mono font-bold text-[#C2410C]" dir="ltr">Ei</div>
                </div>
              </div>

              {/* Transfer 1: Electrical */}
              <div className="flex flex-col items-center px-1">
                <div className="px-2.5 py-1 rounded-[6px] bg-[#E0F2FE] border border-[#7DD3FC] text-center mb-1">
                  <div className="text-[11px] font-bold text-[#0369A1]">طاقة كهربائية (تحويل كهربائي)</div>
                  <div className="text-[11px] font-mono font-bold text-[#0284C7]" dir="ltr">We</div>
                </div>
                <span className="text-lg font-bold text-[#0284C7]">⟵</span>
              </div>

              {/* Node 2: Lamp */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="px-5 py-2.5 rounded-[999px] bg-[#FFFBEB] border-2 border-[#D97706] text-center">
                  <div className="text-xs sm:text-sm font-bold text-[#B45309]">المصباح</div>
                  <div className="text-[10px] font-mono text-[#92400E]" dir="ltr">Lampe</div>
                </div>
                <div className="px-2.5 py-1 rounded-[6px] bg-[#FEF3C7] border border-[#FCD34D] text-center">
                  <div className="text-[11px] font-bold text-[#92400E]">طاقة داخلية</div>
                  <div className="text-[11px] font-mono font-bold text-[#B45309]" dir="ltr">Ei</div>
                </div>
              </div>

              {/* Transfer 2: Radiation + Thermal */}
              <div className="flex flex-col items-center px-1">
                <div className="px-2.5 py-1 rounded-[6px] bg-[#ECFDF5] border border-[#6EE7B7] text-center mb-1">
                  <div className="text-[11px] font-bold text-[#047857]">ضوئية مفيدة (Er)</div>
                </div>
                <span className="text-lg font-bold text-[#0F766E]">⟵</span>
                <div className="px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FCA5A5] text-center mt-1">
                  <div className="text-[11px] font-bold text-[#B91C1C]">+ حرارية ضائعة (Q)</div>
                </div>
              </div>

              {/* Node 3: External Environment */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="px-5 py-2.5 rounded-[999px] bg-[#F0FDFA] border-2 border-[#0F766E] text-center">
                  <div className="text-xs sm:text-sm font-bold text-[#0F766E]">الوسط الخارجي</div>
                  <div className="text-[10px] font-mono text-[#115E59]" dir="ltr">Milieu extérieur</div>
                </div>
                <div className="px-2.5 py-1 rounded-[6px] bg-[#CCFBF1] border border-[#5EEAD4] text-center">
                  <div className="text-[11px] font-bold text-[#115E59]">طاقة داخلية (تزداد)</div>
                  <div className="text-[11px] font-mono font-bold text-[#0F766E]" dir="ltr">Ei</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#F1F5F9]">
              <div className="bg-[#F8FAFC] rounded-[8px] p-2.5 border border-[#E2E8F0] text-xs text-[#334155]">
                <strong className="text-[#0F766E]">تحت كل فقاعة (الجملة) :</strong> نكتب شكل الطاقة المخزنة في الجملة (<span dir="ltr" className="font-mono font-bold">Ec, Ep, Ei</span>).
              </div>
              <div className="bg-[#F8FAFC] rounded-[8px] p-2.5 border border-[#E2E8F0] text-xs text-[#334155]">
                <strong className="text-[#0369A1]">فوق كل سهم (الانتقال) :</strong> نكتب نمط تحويل الطاقة بين الجملتين (<span dir="ltr" className="font-mono font-bold">W, We, Er, Q</span>).
              </div>
            </div>
          </div>
        </div>
      );

    case 'c08-fan-and-dynamo-energy-chains':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-5">
          <div className="text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
              أمثلة تطبيقية للسلسلة الطاقوية : المروحة الكهربائية وإضاءة مصباح بتدفق الماء
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              تتبع مسار الطاقة من المصدر الأولي إلى الوسط الخارجي مع تحديد التحويلات المفيدة والحرارية الضائعة
            </div>
          </div>

          {/* Chain 1: Electric Fan */}
          <div className="bg-white rounded-[12px] p-4 border-2 border-[#0284C7] space-y-3">
            <div className="text-xs sm:text-sm font-bold text-[#0369A1] border-b border-[#E0F2FE] pb-2">
              المثال التطبيقي 1 : السلسلة الطاقوية للمروحة الكهربائية (Ventilateur électrique)
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold py-1">
              <div className="flex flex-col items-center space-y-1">
                <span className="px-3.5 py-2 rounded-[999px] bg-[#FFF7ED] border-2 border-[#EA580C] text-[#C2410C]">
                  البطارية / المصدر
                </span>
                <span className="text-[11px] text-[#9A3412] bg-[#FFEDD5] px-2 py-0.5 rounded">طاقة كيميائية (Ei)</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#0284C7]" dir="ltr">We (كهربائي)</span>
                <span className="text-base text-[#0284C7]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="px-3.5 py-2 rounded-[999px] bg-[#F0FDFA] border-2 border-[#0F766E] text-[#0F766E]">
                  المحرك الكهربائي
                </span>
                <span className="text-[11px] text-[#115E59] bg-[#CCFBF1] px-2 py-0.5 rounded">طاقة حركية (Ec)</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#0F766E]" dir="ltr">W (ميكانيكي)</span>
                <span className="text-base text-[#0F766E]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="px-3.5 py-2 rounded-[999px] bg-[#EFF6FF] border-2 border-[#2563EB] text-[#1D4ED8]">
                  المروحة / الشفرات
                </span>
                <span className="text-[11px] text-[#1E40AF] bg-[#DBEAFE] px-2 py-0.5 rounded">طاقة حركية (Ec)</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#B45309]" dir="ltr">W (مفيد) + Q (حراري)</span>
                <span className="text-base text-[#B45309]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="px-3.5 py-2 rounded-[999px] bg-[#FFFBEB] border-2 border-[#D97706] text-[#B45309]">
                  الهواء / الوسط الخارجي
                </span>
                <span className="text-[11px] text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded">طاقة حركية + داخلية (Ec + Ei)</span>
              </div>
            </div>
          </div>

          {/* Chain 2: Hydroelectric / Falling Water + Turbine + Alternator + Lamp */}
          <div className="bg-white rounded-[12px] p-4 border-2 border-[#0F766E] space-y-3">
            <div className="text-xs sm:text-sm font-bold text-[#0F766E] border-b border-[#CCFBF1] pb-2">
              المثال التطبيقي 2 : إضاءة مصباح بواسطة تدفق الماء (عنفة + منوب/دينامو — Turbine + Alternateur)
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold py-1">
              <div className="flex flex-col items-center space-y-1">
                <span className="px-3 py-1.5 rounded-[999px] bg-[#EFF6FF] border-2 border-[#0284C7] text-[#0369A1]">
                  الماء المتدفق
                </span>
                <span className="text-[10px] text-[#075985] bg-[#E0F2FE] px-2 py-0.5 rounded">Epp + Ec</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#0F766E]" dir="ltr">W</span>
                <span className="text-sm text-[#0F766E]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="px-3 py-1.5 rounded-[999px] bg-[#F0FDFA] border-2 border-[#0F766E] text-[#0F766E]">
                  العنفة (Turbine)
                </span>
                <span className="text-[10px] text-[#115E59] bg-[#CCFBF1] px-2 py-0.5 rounded">Ec</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#0F766E]" dir="ltr">W</span>
                <span className="text-sm text-[#0F766E]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="px-3 py-1.5 rounded-[999px] bg-[#FFF7ED] border-2 border-[#EA580C] text-[#C2410C]">
                  المنوب (Alternateur)
                </span>
                <span className="text-[10px] text-[#9A3412] bg-[#FFEDD5] px-2 py-0.5 rounded">Ec</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#0284C7]" dir="ltr">We</span>
                <span className="text-sm text-[#0284C7]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="px-3 py-1.5 rounded-[999px] bg-[#FFFBEB] border-2 border-[#D97706] text-[#B45309]">
                  المصباح (Lampe)
                </span>
                <span className="text-[10px] text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded">Ei</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono text-[#B91C1C]" dir="ltr">Er + Q</span>
                <span className="text-sm text-[#B91C1C]">⟵</span>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="px-3 py-1.5 rounded-[999px] bg-[#F8FAFC] border-2 border-[#475569] text-[#1E293B]">
                  الوسط الخارجي
                </span>
                <span className="text-[10px] text-[#334155] bg-[#E2E8F0] px-2 py-0.5 rounded">Ei</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'c08-master-summary-diagram':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border-2 border-[#0F766E] space-y-4">
          <div className="text-center space-y-1">
            <div className="text-sm sm:text-base font-bold text-[#0F766E]">
              المخطط الشامل النهائي للدرس 08 : الحوصلة الكاملة للسلسلة الطاقوية
            </div>
            <div className="text-xs text-[#6B6B6B]" dir="ltr">
              Schéma-bilan unique · Formes d’énergie, modes de stockage (Ec, Ep, Ei), modes de transfert (W, We, Er, Q) et chaîne énergétique
            </div>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col items-center space-y-2.5">
            <div className="w-full py-2.5 px-4 rounded-[10px] bg-white border-2 border-[#1D4ED8] text-center space-y-0.5">
              <div className="text-xs sm:text-sm font-bold text-[#1D4ED8]">
                1. الطاقة (Énergie) : المقدرة على إحداث تغيير أو إنجاز فعل
              </div>
              <div className="text-[11px] text-[#475569]">
                الأشكال المألوفة : كهربائية · ضوئية (إشعاعية) · حرارية · حركية · كيميائية (داخلية) · كامنة · نووية
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#1D4ED8]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-[10px] bg-white border border-[#99F6E4] text-center space-y-1">
                <div className="text-xs font-bold text-[#0F766E]">
                  2. أنماط تخزين الطاقة (تحت الفقاعة)
                </div>
                <div className="text-[11px] font-semibold text-[#115E59] bg-[#F0FDFA] py-1.5 px-2 rounded-[6px]" dir="ltr">
                  Ec (Cinétique) · Ep (Potentielle : Epp, Epe) · Ei (Interne / Chimique)
                </div>
              </div>

              <div className="p-3 rounded-[10px] bg-white border border-[#BAE6FD] text-center space-y-1">
                <div className="text-xs font-bold text-[#0369A1]">
                  3. أنماط تحويل الطاقة (فوق السهم)
                </div>
                <div className="text-[11px] font-semibold text-[#075985] bg-[#F0F9FF] py-1.5 px-2 rounded-[6px]" dir="ltr">
                  W (Mécanique) · We (Électrique) · Er (Rayonnement) · Q (Thermique)
                </div>
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold">
                4. النموذج المرجعي للسلسلة الطاقوية (مصباح الجيب)
              </div>
              <div className="text-xs">
                البطارية (Ei) ──[تحويل كهربائي We]──► المصباح (Ei) ──[إشعاعي مفيد Er + حراري غير مفيد Q]──► الوسط الخارجي (Ei)
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#D97706]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-[#FFFBEB] border border-[#F59E0B] text-center">
              <div className="text-xs font-bold text-[#B45309]">
                والخطوة القادمة (الدرس 09) : كم تبلغ كمية الطاقة المفيدة والمنتشرة وما مردود الجهاز؟ ⟵ الحصيلة الطاقوية (Le bilan énergétique)
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 09 : الحصيلة الطاقوية (Le bilan énergétique)
    // ========================================================================
    case 'c09-discovery-setup':
      return <Course09DiscoveryInteractive />;

    case 'c09-three-devices-verification-activity':
      return <Course09ThreeDevicesTableActivity />;

    case 'c09-efficiency-mini-activity':
      return <Course09EfficiencyMiniActivity />;

    case 'c09-hydroelectric-energy-chain-svg':
      return <HydroelectricEnergyChainSvg />;

    case 'c09-dynamo-components-vs-energy-schema':
      return <DynamoComponentsVsEnergySchema />;

    case 'c09-mistake-2-interactive':
      return <Course09Mistake2Interactive />;

    case 'c09-schema-bilan-synthese':
    case 'c09-master-summary-diagram':
      return <Course09SchemaBilanSynthese />;

    case 'c09-general-and-lamp-bilan':
      return (
        <div className="p-4 sm:p-5 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4" dir="rtl">
          <div className="text-center space-y-1">
            <div className="text-sm sm:text-base font-bold text-[#0F766E]">
              التمثيل العام للحصيلة الطاقوية وتطبيقها على المصباح الكهربائي
            </div>
            <div className="text-xs text-[#6B6B6B]" dir="ltr">
              Modèle général du bilan énergétique (E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub>)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. التمثيل العام للحصيلة الطاقوية */}
            <div className="bg-white p-4 rounded-[12px] border-2 border-[#0F766E] space-y-3 flex flex-col justify-between">
              <div className="text-xs font-bold text-[#0F766E] text-center border-b border-[#99F6E4] pb-2">
                أ. التمثيل العام للحصيلة الطاقوية (Modèle général)
              </div>

              <div className="flex flex-col items-center space-y-2 py-1">
                <div className="px-3.5 py-1.5 rounded-[8px] bg-[#EFF6FF] border border-[#93C5FD] text-center">
                  <div className="text-xs font-bold text-[#1D4ED8]">الطاقة المستقبلة (الداخلة)</div>
                  <div className="text-[11px] font-bold text-[#1E40AF]" dir="ltr">
                    E<sub>r</sub>
                  </div>
                </div>

                <ArrowDown className="w-4 h-4 text-[#0F766E]" />

                <div className="px-6 py-2.5 rounded-[10px] bg-[#F0FDFA] border-2 border-[#0F766E] text-center">
                  <div className="text-xs sm:text-sm font-extrabold text-[#0F766E]">النظام (Système)</div>
                  <div className="text-[10px] text-[#115E59]">محوّل طاقوي في حالة اشتغال</div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 w-full pt-1">
                  <div className="p-2.5 rounded-[8px] bg-[#F0FDF4] border border-[#86EFAC] text-center">
                    <div className="text-xs font-bold text-[#15803D]">▼ طاقة مفيدة (E<sub>u</sub>)</div>
                    <div className="text-[10px] text-[#166534]">تحقق الغرض المطلوب</div>
                  </div>
                  <div className="p-2.5 rounded-[8px] bg-[#FEF2F2] border border-[#FCA5A5] text-center">
                    <div className="text-xs font-bold text-[#B91C1C]">▼ طاقة متبددة (E<sub>d</sub>)</div>
                    <div className="text-[10px] text-[#991B1B]">تنتشر في الوسط المحيط</div>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-center text-xs font-bold text-[#0F766E]">
                معادلة الانحفاظ : E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub>
              </div>
            </div>

            {/* 2. الحصيلة الطاقوية للمصباح (100 J = 20 J + 80 J) */}
            <div className="bg-white p-4 rounded-[12px] border-2 border-[#0F766E] space-y-3 flex flex-col justify-between">
              <div className="text-xs font-bold text-[#0F766E] text-center border-b border-[#99F6E4] pb-2">
                ب. تطبيق الحصيلة على المصباح الكهربائي (100 J)
              </div>

              <div className="flex flex-col items-center space-y-2 py-1">
                <div className="px-3.5 py-1.5 rounded-[8px] bg-[#EFF6FF] border border-[#93C5FD] text-center">
                  <div className="text-xs font-bold text-[#1D4ED8]">
                    طاقة كهربائية مستقبلة (<span dir="ltr">E<sub>r</sub> = 100 J</span>)
                  </div>
                </div>

                <ArrowDown className="w-4 h-4 text-[#0F766E]" />

                <div className="px-5 py-2 rounded-[999px] bg-[#F0FDFA] border-2 border-[#0F766E] text-center">
                  <div className="text-xs sm:text-sm font-extrabold text-[#0F766E]">مصباح كهربائي (Lampe)</div>
                  <div className="text-[10px] text-[#115E59]" dir="ltr">
                    E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 w-full pt-1">
                  <div className="p-2.5 rounded-[8px] bg-[#F0FDF4] border border-[#86EFAC] text-center">
                    <div className="text-xs font-bold text-[#15803D]">▼ طاقة ضوئية مفيدة</div>
                    <div className="text-xs font-bold text-[#166534]" dir="ltr">
                      E<sub>u</sub> = 20 J
                    </div>
                  </div>
                  <div className="p-2.5 rounded-[8px] bg-[#FEF2F2] border border-[#FCA5A5] text-center">
                    <div className="text-xs font-bold text-[#B91C1C]">▼ طاقة حرارية متبددة</div>
                    <div className="text-xs font-bold text-[#991B1B]" dir="ltr">
                      E<sub>d</sub> = 80 J
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-center text-xs font-bold text-[#0F766E]">
                التحقق الحسابي : 100 J = 20 J + 80 J (محققة تمامًا)
              </div>
            </div>
          </div>
        </div>
      );

    case 'c09-conservation-and-devices':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-5">
          <div className="text-center space-y-1">
            <div className="text-sm sm:text-base font-bold text-[#B45309]">
              تطبيق مبدأ انحفاظ الطاقة على أجهزة مختلفة (المصباح · المحرك · المروحة)
            </div>
            <div className="text-xs text-[#6B6B6B]" dir="ltr">
              Conservation de l’énergie : Lampe (100 J), Moteur électrique (500 J) et Ventilateur (transferts multiples)
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 1. المصباح */}
            <div className="bg-white p-4 rounded-[12px] border border-[#FDE68A] space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#FEF3C7] pb-2">
                <span className="text-xs font-bold text-[#B45309]">1. المصباح الكهربائي (Lampe)</span>
                <span dir="ltr" className="px-2 py-0.5 rounded bg-[#FFFBEB] text-[#D97706] font-mono text-xs font-bold">
                  100 J
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1.5 text-xs">
                <div className="px-3 py-1 rounded bg-[#EFF6FF] text-[#1D4ED8] font-bold" dir="ltr">
                  E_reçue = 100 J (كهربائية)
                </div>
                <ArrowDown className="w-4 h-4 text-[#D97706]" />
                <div className="px-4 py-1.5 rounded-[8px] bg-[#FFFBEB] border border-[#F59E0B] font-bold text-[#B45309]">
                  مصباح (Lampe)
                </div>
                <div className="grid grid-cols-2 gap-2 w-full pt-1">
                  <div className="p-2 rounded bg-[#F0FDF4] border border-[#BBF7D0] text-center">
                    <div className="font-mono font-bold text-[#15803D]" dir="ltr">30 J</div>
                    <div className="text-[11px] text-[#166534]">ضوء (مفيدة)</div>
                  </div>
                  <div className="p-2 rounded bg-[#FEF2F2] border border-[#FECACA] text-center">
                    <div className="font-mono font-bold text-[#B91C1C]" dir="ltr">70 J</div>
                    <div className="text-[11px] text-[#991B1B]">حرارة (منتشرة)</div>
                  </div>
                </div>
                <div className="w-full pt-1 text-center font-mono text-xs font-bold text-[#B45309]" dir="ltr">
                  100 J = 30 J + 70 J
                </div>
              </div>
            </div>

            {/* 2. المحرك الكهربائي */}
            <div className="bg-white p-4 rounded-[12px] border border-[#99F6E4] space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#CCFBF1] pb-2">
                <span className="text-xs font-bold text-[#0F766E]">2. المحرك الكهربائي (Moteur)</span>
                <span dir="ltr" className="px-2 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] font-mono text-xs font-bold">
                  500 J
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1.5 text-xs">
                <div className="px-3 py-1 rounded bg-[#EFF6FF] text-[#1D4ED8] font-bold" dir="ltr">
                  E_reçue = 500 J (كهربائية)
                </div>
                <ArrowDown className="w-4 h-4 text-[#0F766E]" />
                <div className="px-4 py-1.5 rounded-[8px] bg-[#F0FDFA] border border-[#14B8A6] font-bold text-[#0F766E]">
                  محرك (Moteur)
                </div>
                <div className="grid grid-cols-2 gap-2 w-full pt-1">
                  <div className="p-2 rounded bg-[#F0FDF4] border border-[#BBF7D0] text-center">
                    <div className="font-mono font-bold text-[#15803D]" dir="ltr">350 J</div>
                    <div className="text-[11px] text-[#166534]">حركية (مفيدة)</div>
                  </div>
                  <div className="p-2 rounded bg-[#FEF2F2] border border-[#FECACA] text-center">
                    <div className="font-mono font-bold text-[#B91C1C]" dir="ltr">150 J</div>
                    <div className="text-[11px] text-[#991B1B]">حرارية (منتشرة)</div>
                  </div>
                </div>
                <div className="w-full pt-1 text-center font-mono text-xs font-bold text-[#0F766E]" dir="ltr">
                  E_thermique = 500 − 350 = 150 J
                </div>
              </div>
            </div>

            {/* 3. المروحة (عدة أشكال) */}
            <div className="bg-white p-4 rounded-[12px] border border-[#BAE6FD] space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#E0F2FE] pb-2">
                <span className="text-xs font-bold text-[#0369A1]">3. المروحة (Ventilateur)</span>
                <span className="px-2 py-0.5 rounded bg-[#F0F9FF] text-[#0369A1] text-[11px] font-bold">
                  3 طاقات ناتجة
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1.5 text-xs">
                <div className="px-3 py-1 rounded bg-[#EFF6FF] text-[#1D4ED8] font-bold">
                  طاقة كهربائية مستقبلة
                </div>
                <ArrowDown className="w-4 h-4 text-[#0369A1]" />
                <div className="px-4 py-1.5 rounded-[8px] bg-[#F0F9FF] border border-[#0284C7] font-bold text-[#0369A1]">
                  المروحة (Ventilateur)
                </div>
                <div className="grid grid-cols-3 gap-1.5 w-full pt-1">
                  <div className="p-1.5 rounded bg-[#F0FDF4] border border-[#BBF7D0] text-center">
                    <div className="font-bold text-[#15803D] text-[11px]">حركية</div>
                    <div className="text-[10px] text-[#166534]">مفيدة</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#FFFBEB] border border-[#FDE68A] text-center">
                    <div className="font-bold text-[#B45309] text-[11px]">صوتية</div>
                    <div className="text-[10px] text-[#92400E]">منتشرة</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#FEF2F2] border border-[#FECACA] text-center">
                    <div className="font-bold text-[#B91C1C] text-[11px]">حرارية</div>
                    <div className="text-[10px] text-[#991B1B]">منتشرة</div>
                  </div>
                </div>
                <div className="w-full pt-1 text-center text-[11px] font-semibold text-[#0369A1]">
                  الحصيلة لا تقتصر دائمًا على «مفيدة + حرارة فقط»
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'c09-efficiency-and-chain-vs-bilan':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-5">
          <div className="text-center space-y-1">
            <div className="text-sm sm:text-base font-bold text-[#B45309]">
              المردود الطاقوي (η) والفرق بين السلسلة الطاقوية والحصيلة الطاقوية
            </div>
            <div className="text-xs text-[#6B6B6B]" dir="ltr">
              Rendement énergétique η = (E_utile / E_reçue) × 100 · Comparaison Chaîne vs Bilan énergétique
            </div>
          </div>

          {/* 1. مقارنة المردود الطاقوي لثلاثة أجهزة */}
          <div className="bg-white p-4 rounded-[12px] border border-[#FDE68A] space-y-3">
            <div className="text-xs font-bold text-[#B45309]">
              أ. أمثلة مقارنة للمردود الطاقوي (لماذا لا يساوي المردود 100% في الأجهزة الحقيقية؟)
            </div>

            <div className="space-y-3">
              {/* مصباح 30% */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-bold text-[#1A1A1A]">
                    1. مصباح كهربائي (يستقبل 100 J ← يعطي 30 J ضوء + 70 J حرارة)
                  </span>
                  <span dir="ltr" className="font-mono font-extrabold text-[#D97706]">
                    η = (30 / 100) × 100 = 30%
                  </span>
                </div>
                <div className="w-full h-3 rounded-[999px] bg-[#FEE2E2] overflow-hidden flex" dir="ltr">
                  <div className="h-full bg-[#16A34A]" style={{ width: '30%' }} title="30% Utile" />
                  <div className="h-full bg-[#EF4444]" style={{ width: '70%' }} title="70% Dissipée" />
                </div>
              </div>

              {/* محرك 80% */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-bold text-[#1A1A1A]">
                    2. محرك كهربائي (يستقبل 100 J ← يعطي 80 J حركة + 20 J حرارة)
                  </span>
                  <span dir="ltr" className="font-mono font-extrabold text-[#0F766E]">
                    η = (80 / 100) × 100 = 80%
                  </span>
                </div>
                <div className="w-full h-3 rounded-[999px] bg-[#FEE2E2] overflow-hidden flex" dir="ltr">
                  <div className="h-full bg-[#16A34A]" style={{ width: '80%' }} title="80% Utile" />
                  <div className="h-full bg-[#EF4444]" style={{ width: '20%' }} title="20% Dissipée" />
                </div>
              </div>

              {/* سخان 90% */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <span className="font-bold text-[#1A1A1A]">
                    3. سخان كهربائي (يستقبل 2000 J ← يعطي 1800 J حرارة مفيدة + 200 J طاقة أخرى)
                  </span>
                  <span dir="ltr" className="font-mono font-extrabold text-[#15803D]">
                    η = (1800 / 2000) × 100 = 90%
                  </span>
                </div>
                <div className="w-full h-3 rounded-[999px] bg-[#FEE2E2] overflow-hidden flex" dir="ltr">
                  <div className="h-full bg-[#16A34A]" style={{ width: '90%' }} title="90% Utile" />
                  <div className="h-full bg-[#EF4444]" style={{ width: '10%' }} title="10% Dissipée" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. المقارنة بين السلسلة الطاقوية والحصيلة الطاقوية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-[12px] bg-white border-2 border-[#0284C7] space-y-2 text-center">
              <div className="text-xs font-bold text-[#0369A1]">
                السلسلة الطاقوية (الدرس 08 — Chaîne énergétique)
              </div>
              <div className="text-[11px] text-[#475569]">
                توضح <strong>نوع وأشكال الطاقة</strong> وكيف تتحول (دراسة كيفية)
              </div>
              <div className="p-3 rounded-[8px] bg-[#F0F9FF] text-xs font-bold text-[#075985] space-y-1">
                <div>طاقة كهربائية (We)</div>
                <div>↓</div>
                <div className="inline-block px-3 py-1 rounded bg-white border border-[#0284C7]">محرك (Moteur)</div>
                <div>↙ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↘</div>
                <div>طاقة حركية &nbsp;+&nbsp; طاقة حرارية</div>
              </div>
            </div>

            <div className="p-4 rounded-[12px] bg-white border-2 border-[#D97706] space-y-2 text-center">
              <div className="text-xs font-bold text-[#B45309]">
                الحصيلة الطاقوية (الدرس 09 — Bilan énergétique)
              </div>
              <div className="text-[11px] text-[#475569]">
                تضيف <strong>كميات الطاقة بالجول (J)</strong> ومردود التحويل (دراسة كمية)
              </div>
              <div className="p-3 rounded-[8px] bg-[#FFFBEB] text-xs font-bold text-[#92400E] space-y-1">
                <div dir="ltr" className="font-mono">500 J (طاقة كهربائية)</div>
                <div>↓</div>
                <div className="inline-block px-3 py-1 rounded bg-white border border-[#D97706]">محرك (η = 70%)</div>
                <div>↙ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↘</div>
                <div dir="ltr" className="font-mono">350 J (حركية) + 150 J (حرارية)</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'c09-master-summary-diagram':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border-2 border-[#D97706] space-y-4">
          <div className="text-center space-y-1">
            <div className="text-sm sm:text-base font-bold text-[#B45309]">
              خريطة المفاهيم الشاملة للدرس 09 : الحصيلة الطاقوية والمردود الطاقوي
            </div>
            <div className="text-xs text-[#6B6B6B]" dir="ltr">
              Carte mentale · Bilan énergétique, conservation de l’énergie et rendement η
            </div>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col items-center space-y-2.5">
            {/* العقدة الرئيسية */}
            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#D97706] text-white text-center space-y-0.5">
              <div className="text-xs sm:text-sm font-extrabold">
                الحصيلة الطاقوية (Le bilan énergétique)
              </div>
              <div className="text-[11px] text-[#FEF3C7]">
                دراسة كمية للطاقة الداخلة إلى النظام والطاقات الناتجة عنه وفق مبدأ انحفاظ الطاقة
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#D97706]" />

            {/* الفرعان الأساسيان : الطاقة المستقبلة والطاقة الناتجة */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-[10px] bg-white border-2 border-[#2563EB] text-center space-y-1">
                <div className="text-xs font-bold text-[#1D4ED8]">
                  1. الطاقة المستقبلة (الداخلة)
                </div>
                <div className="text-xs font-mono font-bold text-[#1E40AF] bg-[#EFF6FF] py-1 px-2 rounded" dir="ltr">
                  Énergie reçue (E_reçue)
                </div>
                <div className="text-[11px] text-[#475569]">
                  الطاقة التي يستقبلها النظام من المصدر الخارجي
                </div>
              </div>

              <div className="p-3 rounded-[10px] bg-white border-2 border-[#0F766E] text-center space-y-1">
                <div className="text-xs font-bold text-[#0F766E]">
                  2. الطاقات الناتجة (الخارجة)
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <div className="p-1.5 rounded bg-[#F0FDF4] border border-[#86EFAC]">
                    <div className="text-[11px] font-bold text-[#15803D]">طاقة مفيدة</div>
                    <div className="text-[10px] font-mono text-[#166534]" dir="ltr">E_utile</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#FEF2F2] border border-[#FCA5A5]">
                    <div className="text-[11px] font-bold text-[#B91C1C]">طاقة منتشرة</div>
                    <div className="text-[10px] font-mono text-[#991B1B]" dir="ltr">E_dissipée</div>
                  </div>
                </div>
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            {/* مبدأ انحفاظ الطاقة */}
            <div className="w-full py-2.5 px-4 rounded-[10px] bg-white border-2 border-[#16A34A] text-center space-y-1.5">
              <div className="text-xs font-bold text-[#15803D]">
                3. مبدأ انحفاظ الطاقة (Principe de conservation de l'énergie)
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#166534]">
                « الطاقة لا تفنى ولا تُستحدث من العدم، وإنما تنتقل أو تتحول من شكل إلى آخر »
              </div>
              <div className="text-sm font-mono font-extrabold text-[#0F766E]" dir="ltr">
                E_r = E_u + E_d
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#D97706]" />

            {/* المردود الطاقوي */}
            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#FFFBEB] border-2 border-[#F59E0B] text-center space-y-1">
              <div className="text-xs font-bold text-[#B45309]">
                4. المردود الطاقوي (Le rendement énergétique η)
              </div>
              <div className="text-sm font-mono font-extrabold text-[#92400E]" dir="ltr">
                η (%) = (E_utile / E_reçue) × 100
              </div>
              <div className="text-[11px] text-[#78350F]">
                تنبيه أساسي : الطاقة المنتشرة (المبددة) <strong>≠</strong> طاقة مختفية، بل هي طاقة تحولت إلى أشكال أخرى (كالحرارة) وانتقلت إلى الوسط.
              </div>
            </div>
          </div>
        </div>
      );

    // =========================================================================
    // COURS 10 : استطاعة تحويل الطاقة (Puissance de conversion de l’énergie)
    // =========================================================================

    case 'c10-discovery-setup':
      return (
        <div className="bg-[#FAF7F4] rounded-[14px] border border-[#E2D9D0] p-4 sm:p-5 space-y-4">
          <div className="text-center space-y-1">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B] text-xs font-bold">
              وضعية الانطلاق — مقارنة سرعة تحويل الطاقة بين جهازين
            </span>
            <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
              مصباح LED (10 W) مقابل سخان كهربائي (2000 W) خلال نفس المدة الزمنية
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* الجهاز 1 : مصباح LED 10 W */}
            <div className="bg-white rounded-[12px] border-2 border-[#93C5FD] p-4 space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[#EFF6FF] pb-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#2563EB]" />
                  <span className="text-sm font-bold text-[#1E3A8A]">
                    الجهاز (1) : مصباح LED اقتصادي
                  </span>
                </div>
                <span
                  dir="ltr"
                  className="px-2.5 py-0.5 rounded-[6px] bg-[#EFF6FF] border border-[#93C5FD] font-mono text-xs font-extrabold text-[#1D4ED8]"
                >
                  P₁ = 10 W
                </span>
              </div>

              <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#475569]">في كل ثانية واحدة (1 s) :</span>
                  <span dir="ltr" className="font-mono font-bold text-[#1D4ED8]">
                    E₁ = 10 J / s
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#E2E8F0] overflow-hidden" dir="ltr">
                  <div className="h-full bg-[#2563EB]" style={{ width: '6%' }} />
                </div>
                <p className="text-[11px] text-[#64748B] pt-1">
                  يحوّل كمية صغيرة من الطاقة الكهربائية في كل ثانية (سرعة تحويل صغيرة).
                </p>
              </div>
            </div>

            {/* الجهاز 2 : سخان كهربائي 2000 W */}
            <div className="bg-white rounded-[12px] border-2 border-[#F59E0B] p-4 space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-[#FEF3C7] pb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#EA580C]" />
                  <span className="text-sm font-bold text-[#9A3412]">
                    الجهاز (2) : سخان كهربائي
                  </span>
                </div>
                <span
                  dir="ltr"
                  className="px-2.5 py-0.5 rounded-[6px] bg-[#FFFBEB] border border-[#F59E0B] font-mono text-xs font-extrabold text-[#B45309]"
                >
                  P₂ = 2000 W
                </span>
              </div>

              <div className="p-3 rounded-[10px] bg-[#FFFBEB] border border-[#FDE68A] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#78350F]">في كل ثانية واحدة (1 s) :</span>
                  <span dir="ltr" className="font-mono font-bold text-[#C2410C]">
                    E₂ = 2000 J / s
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#FDE68A] overflow-hidden" dir="ltr">
                  <div className="h-full bg-[#EA580C]" style={{ width: '100%' }} />
                </div>
                <p className="text-[11px] text-[#92400E] pt-1">
                  يحوّل كمية كبيرة جدًا من الطاقة (200 ضعف مصباح LED!) خلال كل ثانية.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-[10px] bg-[#FFFBEB] border-2 border-[#D97706] text-center space-y-1">
            <div className="text-xs sm:text-sm font-bold text-[#92400E]">
              الإشكالية العلمية : كيف نعبّر فيزيائيًا عن «سرعة تحويل الجهاز للطاقة»؟
            </div>
            <div className="text-xs font-semibold text-[#1A1A1A]">
              المقدار الفيزيائي الذي يقيس سرعة (معدل) تحويل الطاقة في وحدة الزمن هو :{' '}
              <strong className="text-[#B45309]">الاستطاعة — La puissance (P)</strong>.
            </div>
          </div>
        </div>
      );

    case 'c10-power-meaning-and-triangle':
      return (
        <div className="bg-[#FAF7F4] rounded-[14px] border border-[#E2D9D0] p-4 sm:p-5 space-y-5">
          {/* القسم أ : الشكل 1 — معنى الاستطاعة */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
              <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                الشكل 1 — المعنى الفيزيائي للاستطاعة (سرعة تحويل الطاقة)
              </span>
              <span dir="ltr" className="text-xs font-mono font-bold text-[#D97706]">
                P = E / t
              </span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="px-5 py-2 rounded-[10px] bg-[#FFFBEB] border-2 border-[#D97706] text-xs sm:text-sm font-bold text-[#92400E]">
                تحويل الطاقة (Conversion d’énergie)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-1">
                {/* استطاعة كبيرة */}
                <div className="p-3.5 rounded-[10px] bg-[#FFF7ED] border-2 border-[#EA580C] text-center space-y-1.5">
                  <div className="text-xs font-bold text-[#9A3412]">
                    طاقة كبيرة في زمن قصير
                  </div>
                  <ArrowDown className="w-4 h-4 text-[#EA580C] mx-auto" />
                  <div className="px-3 py-1.5 rounded-[8px] bg-[#EA580C] text-white text-xs sm:text-sm font-bold">
                    استطاعة كبيرة (Grande puissance)
                  </div>
                  <div dir="ltr" className="text-[11px] font-mono text-[#9A3412]">
                    Ex : Chauffe-eau (2000 W = 2000 J/s)
                  </div>
                </div>

                {/* استطاعة صغيرة */}
                <div className="p-3.5 rounded-[10px] bg-[#EFF6FF] border-2 border-[#3B82F6] text-center space-y-1.5">
                  <div className="text-xs font-bold text-[#1E3A8A]">
                    طاقة صغيرة في زمن طويل
                  </div>
                  <ArrowDown className="w-4 h-4 text-[#2563EB] mx-auto" />
                  <div className="px-3 py-1.5 rounded-[8px] bg-[#2563EB] text-white text-xs sm:text-sm font-bold">
                    استطاعة صغيرة (Faible puissance)
                  </div>
                  <div dir="ltr" className="text-[11px] font-mono text-[#1E40AF]">
                    Ex : Lampe LED (10 W = 10 J/s)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* القسم ب : قراءة بطاقة الجهاز (1 W = 1 J/s) + الشكل 2 (مثلث العلاقات) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* بطاقة الجهاز الكهربائي */}
            <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-4 space-y-3 flex flex-col justify-between">
              <div className="text-xs sm:text-sm font-bold text-[#1A1A1A] border-b border-[#F1ECE6] pb-2">
                كيف نقرأ الاستطاعة المكتوبة على بطاقة الجهاز؟
              </div>

              <div className="mx-auto w-full max-w-[240px] p-3.5 rounded-[10px] bg-[#1E293B] text-white border-2 border-[#475569] text-center space-y-1 shadow-xs">
                <div className="text-[10px] text-[#94A3B8] font-mono">
                  PLAQUE SIGNALÉTIQUE · بطاقة الصانع
                </div>
                <div className="text-xs font-bold text-[#F8FAFC]">
                  سخان كهربائي · Chauffe-eau
                </div>
                <div
                  dir="ltr"
                  className="text-lg font-mono font-extrabold text-[#FBBF24] tracking-wider"
                >
                  2000 W
                </div>
              </div>

              <div className="p-3 rounded-[10px] bg-[#FFFBEB] border border-[#F59E0B] text-center space-y-1">
                <div dir="ltr" className="text-xs sm:text-sm font-mono font-extrabold text-[#B45309]">
                  1 W = 1 J/s   ⟹   2000 W = 2000 J/s
                </div>
                <p className="text-xs text-[#78350F]">
                  أي أن السخان يحوّل حوالي <strong>2000 جول من الطاقة في كل ثانية</strong> عندما يعمل باستطاعته الاسمية.
                </p>
              </div>
            </div>

            {/* الشكل 2 : مثلث العلاقات بين E و P و t */}
            <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-4 space-y-3 flex flex-col justify-between">
              <div className="text-xs sm:text-sm font-bold text-[#1A1A1A] border-b border-[#F1ECE6] pb-2">
                الشكل 2 — مثلث العلاقات بين الطاقة (E) والاستطاعة (P) والزمن (t)
              </div>

              <svg
                viewBox="0 0 320 150"
                className="w-full max-w-[300px] mx-auto h-auto select-none"
                style={{ direction: 'ltr' }}
                role="img"
                aria-label="مثلث العلاقات بين الطاقة E والاستطاعة P والزمن t"
              >
                {/* Triangle */}
                <polygon
                  points="160,12 52,136 268,136"
                  fill="#FFFBEB"
                  stroke="#D97706"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Ligne horizontale de division (E / P×t) */}
                <line
                  x1="104"
                  y1="76"
                  x2="216"
                  y2="76"
                  stroke="#D97706"
                  strokeWidth="2.2"
                />
                {/* Ligne verticale entre P et t */}
                <line
                  x1="160"
                  y1="76"
                  x2="160"
                  y2="136"
                  stroke="#D97706"
                  strokeWidth="2"
                />

                {/* Sommet : E (J) */}
                <text
                  x="160"
                  y="54"
                  textAnchor="middle"
                  fontSize="22"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#15803D"
                >
                  E
                </text>
                <text
                  x="160"
                  y="69"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#166534"
                >
                  (Joule · J)
                </text>

                {/* Base gauche : P (W) */}
                <text
                  x="122"
                  y="112"
                  textAnchor="middle"
                  fontSize="20"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#B45309"
                >
                  P
                </text>
                <text
                  x="122"
                  y="128"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#92400E"
                >
                  (Watt · W)
                </text>

                {/* Symbole × */}
                <circle cx="160" cy="106" r="9" fill="#D97706" />
                <text
                  x="160"
                  y="110"
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#FFFFFF"
                >
                  ×
                </text>

                {/* Base droite : t (s) */}
                <text
                  x="198"
                  y="112"
                  textAnchor="middle"
                  fontSize="20"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#1D4ED8"
                >
                  t
                </text>
                <text
                  x="198"
                  y="128"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                  fill="#1E40AF"
                >
                  (seconde · s)
                </text>
              </svg>

              <div
                dir="ltr"
                className="grid grid-cols-3 gap-2 text-center font-mono text-xs font-extrabold"
              >
                <div className="p-2 rounded-[8px] bg-[#F0FDF4] border border-[#86EFAC] text-[#15803D]">
                  E = P × t
                </div>
                <div className="p-2 rounded-[8px] bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309]">
                  P = E / t
                </div>
                <div className="p-2 rounded-[8px] bg-[#EFF6FF] border border-[#93C5FD] text-[#1D4ED8]">
                  t = E / P
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'c10-two-devices-comparison':
      return (
        <div className="bg-[#FAF7F4] rounded-[14px] border border-[#E2D9D0] p-4 sm:p-5 space-y-5">
          {/* الشكل 3 : مقارنة جهازين خلال نفس الزمن (10 s) */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1ECE6] pb-2">
              <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                الشكل 3 — مقارنة جهازين (A و B) يعملان خلال نفس المدة الزمنية (t = 10 s)
              </span>
              <span
                dir="ltr"
                className="px-2.5 py-0.5 rounded bg-[#EFF6FF] border border-[#93C5FD] font-mono text-xs font-bold text-[#1D4ED8]"
              >
                Même durée : t = 10 s
              </span>
            </div>

            <div className="space-y-3">
              {/* الجهاز A : 100 W */}
              <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#CBD5E1] space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                  <span className="text-[#1E3A8A]">
                    الجهاز (A) : استطاعته P_A = 100 W خلال t = 10 s
                  </span>
                  <span dir="ltr" className="font-mono text-sm text-[#1D4ED8]">
                    E_A = 100 × 10 = 1000 J
                  </span>
                </div>
                <div className="w-full h-4 rounded-full bg-[#E2E8F0] overflow-hidden p-0.5" dir="ltr">
                  <div
                    className="h-full rounded-full bg-[#2563EB] flex items-center justify-end pr-2 text-[9px] font-mono font-bold text-white"
                    style={{ width: '20%' }}
                  >
                    1000 J
                  </div>
                </div>
              </div>

              {/* الجهاز B : 500 W */}
              <div className="p-3 rounded-[10px] bg-[#FFFBEB] border border-[#F59E0B] space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                  <span className="text-[#92400E]">
                    الجهاز (B) : استطاعته P_B = 500 W خلال t = 10 s
                  </span>
                  <span dir="ltr" className="font-mono text-sm text-[#C2410C]">
                    E_B = 500 × 10 = 5000 J
                  </span>
                </div>
                <div className="w-full h-4 rounded-full bg-[#FDE68A] overflow-hidden p-0.5" dir="ltr">
                  <div
                    className="h-full rounded-full bg-[#EA580C] flex items-center justify-end pr-2 text-[9px] font-mono font-bold text-white"
                    style={{ width: '100%' }}
                  >
                    5000 J (5 × E_A)
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-[8px] bg-[#F0FDF4] border border-[#86EFAC] text-center text-xs font-bold text-[#166534]">
              الاستنتاج : عند تساوي الزمن (<span dir="ltr">t_A = t_B</span>)، الجهاز ذو الاستطاعة الأكبر (
              <span dir="ltr">P_B &gt; P_A</span>) يحوّل كمية أكبر من الطاقة (
              <span dir="ltr">E_B &gt; E_A</span>).
            </div>
          </div>

          {/* الشكل 4 : مخطط العلاقة بين الزمن والجهاز وتحويل الطاقة والاستطاعة */}
          <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-4 space-y-3">
            <div className="text-xs sm:text-sm font-bold text-[#1A1A1A] border-b border-[#F1ECE6] pb-2">
              الشكل 4 — التسلسل المفاهيمي للعلاقة بين الزمن (t) والطاقة المحوّلة (E) والاستطاعة (P)
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-1">
              <div className="px-3.5 py-2 rounded-[10px] bg-[#EFF6FF] border border-[#93C5FD] text-center">
                <div className="text-xs font-bold text-[#1E3A8A]">المدة الزمنية</div>
                <div dir="ltr" className="text-xs font-mono font-bold text-[#1D4ED8]">
                  Temps t (s)
                </div>
              </div>

              <span className="text-[#D97706] font-bold">⟵</span>

              <div className="px-4 py-2 rounded-[10px] bg-[#FFFBEB] border-2 border-[#D97706] text-center">
                <div className="text-xs font-bold text-[#92400E]">الجهاز الكهربائي</div>
                <div dir="ltr" className="text-[11px] font-mono text-[#B45309]">
                  Appareil électrique
                </div>
              </div>

              <span className="text-[#D97706] font-bold">⟵</span>

              <div className="px-3.5 py-2 rounded-[10px] bg-[#F0FDF4] border border-[#86EFAC] text-center">
                <div className="text-xs font-bold text-[#166534]">تحويل الطاقة</div>
                <div dir="ltr" className="text-xs font-mono font-bold text-[#15803D]">
                  Énergie E (J)
                </div>
              </div>

              <span className="text-[#D97706] font-bold">⟵</span>

              <div className="px-4 py-2 rounded-[10px] bg-[#EA580C] text-white text-center shadow-2xs">
                <div className="text-xs font-bold">الاستطاعة P</div>
                <div dir="ltr" className="text-xs font-mono font-extrabold">
                  P = E / t (W)
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'c10-chain-nominal-and-lamps':
      return (
        <div className="bg-[#FAF7F4] rounded-[14px] border border-[#E2D9D0] p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 1. الشكل 5 : الاستطاعة في السلسلة الطاقوية */}
            <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-4 space-y-2.5 flex flex-col justify-between">
              <div className="text-xs font-bold text-[#1A1A1A] border-b border-[#F1ECE6] pb-1.5">
                الشكل 5 — الاستطاعة في السلسلة الطاقوية
              </div>

              <div className="flex flex-col items-center space-y-1.5 text-xs py-1">
                <div className="px-3 py-1 rounded bg-[#EFF6FF] border border-[#93C5FD] font-bold text-[#1D4ED8]">
                  طاقة كهربائية (E)
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#D97706]" />
                <div className="px-4 py-2 rounded-full bg-[#FFFBEB] border-2 border-[#D97706] text-center">
                  <div className="font-bold text-[#92400E]">مصباح · Lampe</div>
                  <div dir="ltr" className="text-[10.5px] font-mono font-bold text-[#B45309]">
                    Puissance P = E / t
                  </div>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-[#D97706]" />
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#F0FDF4] border border-[#86EFAC] text-[11px] font-bold text-[#15803D]">
                    طاقة ضوئية
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#FFF7ED] border border-[#FDBA74] text-[11px] font-bold text-[#C2410C]">
                    طاقة حرارية
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#4A4A4A] bg-[#FAF7F4] p-2 rounded border border-[#E2D9D0]">
                <strong>الاستطاعة (P)</strong> تصف سرعة (معدل) حدوث هذا التحويل الطاقوي في كل ثانية.
              </p>
            </div>

            {/* 2. الاستطاعة الاسمية (220 V / 1500 W) */}
            <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-4 space-y-2.5 flex flex-col justify-between">
              <div className="text-xs font-bold text-[#1A1A1A] border-b border-[#F1ECE6] pb-1.5">
                الاستطاعة الاسمية (Puissance nominale)
              </div>

              <div className="p-3 rounded-[10px] bg-[#1E293B] text-white text-center space-y-1 font-mono" dir="ltr">
                <div className="text-xs text-[#94A3B8]">INDICATIONS DU FABRICANT</div>
                <div className="text-base font-bold text-[#38BDF8]">220 V ~ 50 Hz</div>
                <div className="text-lg font-extrabold text-[#FBBF24]">P_nom = 1500 W</div>
              </div>

              <p className="text-[11px] text-[#4A4A4A] bg-[#FAF7F4] p-2 rounded border border-[#E2D9D0]">
                القيمة <strong dir="ltr">1500 W</strong> هي <strong>الاستطاعة الاسمية</strong> التي يحوّل بها الجهاز الطاقة عندما يشتغل في شروط التشغيل النظامية المحددة من طرف الصانع (<span dir="ltr">220 V</span>).
              </p>
            </div>

            {/* 3. تجربة فكرية : مصباحان 20 W و 100 W لمدة دقيقة */}
            <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-4 space-y-2.5 flex flex-col justify-between">
              <div className="text-xs font-bold text-[#1A1A1A] border-b border-[#F1ECE6] pb-1.5">
                تجربة فكرية : مصباحان خلال دقيقة (t = 60 s)
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-[8px] bg-[#EFF6FF] border border-[#93C5FD] space-y-1">
                  <div className="text-xs font-bold text-[#1E3A8A]">المصباح A</div>
                  <div dir="ltr" className="font-mono text-xs font-extrabold text-[#1D4ED8]">
                    P_A = 20 W
                  </div>
                  <div dir="ltr" className="font-mono text-[11px] text-[#475569]">
                    E_A = 1200 J
                  </div>
                </div>

                <div className="p-2.5 rounded-[8px] bg-[#FFFBEB] border-2 border-[#F59E0B] space-y-1">
                  <div className="text-xs font-bold text-[#92400E]">المصباح B</div>
                  <div dir="ltr" className="font-mono text-xs font-extrabold text-[#B45309]">
                    P_B = 100 W
                  </div>
                  <div dir="ltr" className="font-mono text-[11px] font-bold text-[#C2410C]">
                    E_B = 6000 J
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#166534] bg-[#F0FDF4] p-2 rounded border border-[#86EFAC]">
                بما أن <strong dir="ltr">t_A = t_B = 60 s</strong> و <strong dir="ltr">P_B &gt; P_A</strong> فإن <strong dir="ltr">E_B &gt; E_A</strong> (المصباح B يحوّل طاقة أكبر).
              </p>
            </div>
          </div>
        </div>
      );

    case 'c10-master-summary-diagram':
      return (
        <div className="bg-[#FAF7F4] rounded-[14px] border-2 border-[#D97706] p-4 sm:p-5 space-y-4">
          <div className="text-center space-y-1">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B] text-xs font-bold">
              خريطة المفاهيم الشاملة — الدرس 10 (ختام الميدان 02 : الطاقة)
            </span>
            <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
              استطاعة تحويل الطاقة (Puissance de conversion de l’énergie — P = E / t)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 1. المفهوم والتعريف */}
            <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3.5 space-y-2">
              <div className="text-xs font-bold text-[#B45309] border-b border-[#F1ECE6] pb-1.5">
                1. مفهوم الاستطاعة (La puissance P)
              </div>
              <p className="text-xs text-[#1A1A1A] leading-relaxed">
                هي <strong>كمية الطاقة المحوّلة خلال وحدة الزمن</strong>، وتعبّر عن <strong>سرعة تحويل الجهاز للطاقة</strong>.
              </p>
              <div className="p-2 rounded bg-[#FFFBEB] border border-[#FDE68A] text-[11px] font-bold text-[#92400E]">
                تنبيه : الاستطاعة (P) ≠ الطاقة (E)
              </div>
            </div>

            {/* 2. العلاقات الرياضية الثلاث */}
            <div className="bg-white rounded-[12px] border-2 border-[#D97706] p-3.5 space-y-2 text-center">
              <div className="text-xs font-bold text-[#B45309] border-b border-[#F1ECE6] pb-1.5">
                2. العلاقات الرياضية الأساسية
              </div>
              <div dir="ltr" className="p-2 rounded bg-[#FFFBEB] font-mono text-base font-extrabold text-[#B45309]">
                P = E / t
              </div>
              <div dir="ltr" className="grid grid-cols-2 gap-1.5 font-mono text-xs font-bold">
                <div className="p-1.5 rounded bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]">
                  E = P × t
                </div>
                <div className="p-1.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-[#93C5FD]">
                  t = E / P
                </div>
              </div>
            </div>

            {/* 3. الوحدات الدولية والمضاعفات */}
            <div className="bg-white rounded-[12px] border border-[#E2D9D0] p-3.5 space-y-2">
              <div className="text-xs font-bold text-[#1D4ED8] border-b border-[#F1ECE6] pb-1.5">
                3. الوحدات الدولية والمضاعفات
              </div>
              <ul className="space-y-1 text-xs text-[#1A1A1A]">
                <li>
                  • الطاقة <strong dir="ltr">E</strong> : الجول (<strong dir="ltr">Joule — J</strong>)
                </li>
                <li>
                  • الزمن <strong dir="ltr">t</strong> : الثانية (<strong dir="ltr">seconde — s</strong>)
                </li>
                <li>
                  • الاستطاعة <strong dir="ltr">P</strong> : الواط (<strong dir="ltr">Watt — W</strong>)
                </li>
              </ul>
              <div dir="ltr" className="p-1.5 rounded bg-[#EFF6FF] border border-[#93C5FD] text-center font-mono text-[11px] font-bold text-[#1E40AF]">
                1 W = 1 J/s | 1 kW = 1000 W
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};




