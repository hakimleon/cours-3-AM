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
          {/* Illustration principale de la situation de départ (LightBox) */}
          <ZoomableCourseImage
            src="/src/assets/images/c01_situation_depart_1790801006930.jpg"
            alt="مواد من الحياة اليومية: قطرة ماء وكأس ماء، مسمار حديد وقارورة غاز الأكسجين، وكأس ماء مع ملح وسكر"
            captionArabic="صورة توضيحية للعينات الحقيقية الثلاث المستعملة في وضعية الانطلاق"
            captionFrench="Eau (goutte vs verre) · Fer & Dioxygène · Eau salée et sucrée"
            courseBadge="الدرس 01"
          />

          {/* 3 cartes illustrées avec schémas SVG des échantillons (أ)، (ب)، (ج) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" dir="rtl">
            {/* العينة (أ) */}
            <div className="bg-white rounded-[10px] border border-[#E5DDD5] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F766E]">العينة (أ) : قطرة ماء vs كأس ماء</span>
                <ChemicalFormula formula="H₂O" size="sm" />
              </div>
              <svg viewBox="0 0 180 64" className="w-full h-14 bg-[#F0F9FF]/60 rounded-[8px] border border-[#BAE6FD]/60">
                {/* Water drop */}
                <path
                  d="M45 12 C45 12 31 29 31 39 C31 47 37 53 45 53 C53 53 59 47 59 39 C59 29 45 12 45 12 Z"
                  fill="#38BDF8"
                  stroke="#0284C7"
                  strokeWidth="1.5"
                />
                <text x="45" y="43" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">
                  قطرة
                </text>
                <text x="85" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284C7">
                  vs
                </text>
                {/* Glass of water */}
                <path d="M115 12 L120 52 L152 52 L157 12 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
                <path d="M117 24 L120 51 L152 51 L155 24 Z" fill="#38BDF8" opacity="0.65" />
                <text x="136" y="41" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#0369A1">
                  كأس ماء
                </text>
              </svg>
              <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                القطرة والكأس يحتويان على نفس السائل، لكن الكأس يضم عددًا أكبر بكثير من الوحدات المجهرية غير المرئية.
              </p>
            </div>

            {/* العينة (ب) */}
            <div className="bg-white rounded-[10px] border border-[#E5DDD5] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F766E]">العينة (ب) : الحديد وغاز الأكسجين</span>
                <span className="flex items-center gap-1">
                  <ChemicalFormula formula="Fe" size="sm" />
                  <ChemicalFormula formula="O₂" size="sm" />
                </span>
              </div>
              <svg viewBox="0 0 180 64" className="w-full h-14 bg-[#FAF7F4] rounded-[8px] border border-[#E5DDD5]">
                {/* Iron nail */}
                <rect x="22" y="28" width="48" height="6" rx="2" fill="#64748B" stroke="#334155" strokeWidth="1.2" />
                <rect x="18" y="23" width="6" height="16" rx="1.5" fill="#475569" />
                <polygon points="70,28 80,31 70,34" fill="#64748B" />
                <text x="48" y="49" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#334155">
                  مسمار حديد (Fe)
                </text>
                {/* O2 Flask */}
                <circle cx="135" cy="34" r="17" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.5" />
                <O2MiniSvg x={135} y={34} scale={0.65} />
                <text x="135" y="13" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#DC2626">
                  قارورة O₂
                </text>
              </svg>
              <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                مسمار الحديد يتكون من ذرات متماثلة (Fe)، بينما غاز الأكسجين في الهواء يتكون من جزيئات ثنائية الذرة (O₂).
              </p>
            </div>

            {/* العينة (ج) */}
            <div className="bg-white rounded-[10px] border border-[#E5DDD5] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C94BA6]">العينة (ج) : كأس ماء مالح ومحلى</span>
                <span className="flex items-center gap-1">
                  <ChemicalFormula formula="NaCl" size="sm" />
                  <ChemicalFormula formula="CO₂" size="sm" />
                </span>
              </div>
              <svg viewBox="0 0 180 64" className="w-full h-14 bg-[#F0FDFA]/60 rounded-[8px] border border-[#99F6E4]">
                {/* Beaker with water + salt + sugar */}
                <rect x="64" y="12" width="52" height="42" rx="4" fill="#E0F2FE" stroke="#0F766E" strokeWidth="1.5" />
                <circle cx="78" cy="34" r="3" fill="#0F766E" />
                <circle cx="94" cy="42" r="3" fill="#C94BA6" />
                <circle cx="104" cy="28" r="3" fill="#DC2626" />
                <rect x="82" y="25" width="8" height="8" rx="1.5" fill="#FFFFFF" stroke="#64748B" />
                <text x="32" y="28" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#0F766E">
                  ماء + ملح
                </text>
                <text x="148" y="28" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#C94BA6">
                  + سكر وهواء
                </text>
              </svg>
              <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
                عند إذابة الملح والسكر في الماء بوجود الهواء، تجتمع داخل نفس الكأس عدة مواد كيميائية مختلفة معًا.
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
              <line x1="-30" y1="-26" x2="-10" y2="-6" stroke="#334155" strokeWidth="2.5" />
              <line x1="-30" y1="26" x2="-10" y2="6" stroke="#334155" strokeWidth="2.5" />
              <circle cx="-38" cy="-34" r="13" fill="#F8FAFC" stroke="#475569" strokeWidth="1.8" />
              <text x="-38" y="-29" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                H
              </text>
              <circle cx="0" cy="0" r="17" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#DC2626" fontFamily="monospace">
                O
              </text>
              <circle cx="-38" cy="34" r="13" fill="#F8FAFC" stroke="#475569" strokeWidth="1.8" />
              <text x="-38" y="39" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                H
              </text>
              <H2OMiniSvg x={45} y={-4} scale={1.25} />
              <text x="5" y="64" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4A4A4A">
                ذرة أكسجين O + ذرتا هيدروجين 2H
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
                text: 'تجمع عدد هائل من الأفراد الكيميائية المتماثلة',
                accent: false,
              },
              {
                text: '2. النوع الكيميائي (Espèce chimique)',
                sub: 'المادة على المستوى العياني (الماء H₂O، غاز الأكسجين O₂)',
                accent: true,
              },
              {
                text: 'تواجد عدة أنواع كيميائية معًا في حيز محدد وحالة معينة',
                accent: false,
              },
              {
                text: '3. الجملة الكيميائية (Système chimique)',
                sub: 'مجموع الأنواع الكيميائية المدروسة (مثل: ماء + ملح + غاز O₂)',
                accent: true,
              },
            ].map((node, i, arr) => (
              <React.Fragment key={i}>
                <div
                  className={`w-full py-2 px-3.5 rounded-[10px] text-center border text-xs sm:text-sm ${
                    node.accent
                      ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                      : 'bg-white text-[#4A4A4A] border-[#E2D9D0] font-medium'
                  }`}
                >
                  <div>{node.text}</div>
                  {node.sub && (
                    <div className="text-[11px] font-normal text-[#CCFBF1] mt-0.5">{node.sub}</div>
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
    case 'c02-discovery-setup':
      return (
        <div className="p-3.5 rounded-[12px] bg-white border border-[#E2D9D0] space-y-3.5" dir="rtl">
          <ZoomableCourseImage
            src="/src/assets/images/c02_electrolyse_eau_1790802935276.jpg"
            alt="وضعية الانطلاق للدرس 02 : مقارنة تبخر الماء مع تجربة تمرير تيار كهربائي في الماء"
            captionArabic="صورة توضيحية : مقارنة بين تسخين الماء (تغير الحالة) وتمرير تيار كهربائي مستمر في وعاء به ماء مع أنبوبين منكسين"
            captionFrench="Électrolyse de l’eau (rapport 2 : 1) vs Changement d’état physique"
            courseBadge="الدرس 02"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* الحالة أ */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (أ) : تسخين الماء أو تجميده
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عندما نبخر الماء السائل أو نجمده، يتغير مظهره الفيزيائي فقط، وعند تكثيف البخار يعود ماءً سائلًا له نفس الصيغة.
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] flex items-center justify-between text-[11px] font-mono text-[#0F766E]" dir="ltr">
                <span>H₂O (liquide) ⇄ H₂O (vapeur)</span>
              </div>
            </div>

            {/* الحالة ب */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (ب) : تمرير تيار كهربائي في الماء
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عند غلق الدارة مع مولد كهربائي مستمر، تنطلق فقاعات غازية عند القطبين، ويتجمع في الأنبوب الأول حجم غاز يساوي ضعف حجم الأنبوب الثاني.
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] flex items-center justify-between text-[11px] font-mono text-[#C94BA6]" dir="ltr">
                <span>Volume (Tube 1) ≈ 2 × Volume (Tube 2)</span>
              </div>
            </div>

            {/* الحالة ج */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (ج) : اختبار الغازين المتجمعين
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  الغاز الأول (الأكبر حجمًا) يحدث فرقعة خفيفة عند تقريب عود ثقاب مشتعل، بينما الغاز الثاني (الأصغر حجمًا) يزيد من توهج عود ثقاب متوهج!
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] flex items-center justify-between text-[11px] font-mono text-[#0F766E]" dir="ltr">
                <span>Gaz 1 ≠ H₂O · Gaz 2 ≠ H₂O</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — 2. التركيب التجريبي، الملاحظة وجمع الغازين بنسبة 2 : 1
    // ========================================================================
    case 'c02-electrolysis-apparatus':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <svg viewBox="0 0 680 280" className="w-full max-w-2xl mx-auto h-auto" dir="ltr">
            <rect x="6" y="6" width="668" height="268" rx="14" fill="#FFFFFF" stroke="#E2D9D0" />

            {/* Electrolyzer vessel (وعاء يحتوي على الماء H₂O) */}
            <path
              d="M 200 60 L 200 182 Q 200 198 216 198 L 464 198 Q 480 198 480 182 L 480 60"
              fill="#E0F2FE"
              stroke="#0284C7"
              strokeWidth="2.5"
            />
            <line x1="200" y1="82" x2="480" y2="82" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 3" />

            {/* Left Inverted Tube: Electrode (-) -> Gas 1 (Larger volume = 2V) */}
            <rect x="246" y="24" width="56" height="145" rx="26" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.2" />
            {/* Gas 1 space (double height: y=26 to y=106 -> 80px of gas!) */}
            <rect x="248" y="26" width="52" height="80" rx="24" fill="#F0FDFA" />
            {/* Remaining water in tube 1 */}
            <rect x="248" y="106" width="52" height="63" fill="#BAE6FD" />
            <line x1="248" y1="106" x2="300" y2="106" stroke="#0F766E" strokeWidth="2" />

            {/* Rising bubbles in tube 1 */}
            <circle cx="270" cy="145" r="3.5" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.2" />
            <circle cx="278" cy="132" r="4" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.2" />
            <circle cx="268" cy="118" r="3.5" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.2" />

            {/* Right Inverted Tube: Electrode (+) -> Gas 2 (Smaller volume = 1V) */}
            <rect x="378" y="24" width="56" height="145" rx="26" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.2" />
            {/* Gas 2 space (single height: y=26 to y=66 -> 40px of gas!) */}
            <rect x="380" y="26" width="52" height="40" rx="20" fill="#EFF6FF" />
            {/* Remaining water in tube 2 */}
            <rect x="380" y="66" width="52" height="103" fill="#BAE6FD" />
            <line x1="380" y1="66" x2="432" y2="66" stroke="#0284C7" strokeWidth="2" />

            {/* Rising bubbles in tube 2 */}
            <circle cx="404" cy="145" r="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
            <circle cx="410" cy="120" r="3.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
            <circle cx="402" cy="92" r="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />

            {/* Electrodes */}
            <rect x="269" y="152" width="10" height="46" rx="3" fill="#334155" />
            <rect x="401" y="152" width="10" height="46" rx="3" fill="#334155" />

            {/* Wires to DC Generator */}
            <polyline
              points="274,198 274,238 316,238"
              fill="none"
              stroke="#0F766E"
              strokeWidth="2.5"
            />
            <polyline
              points="406,198 406,238 364,238"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.5"
            />

            {/* DC Generator (مولد كهربائي مستمر Générateur) */}
            <circle cx="340" cy="238" r="22" fill="#FAF7F4" stroke="#4A4A4A" strokeWidth="2.2" />
            <text x="340" y="243" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4A4A4A">
              G
            </text>
            <text x="300" y="230" fontSize="15" fontWeight="bold" fill="#0F766E">
              (−)
            </text>
            <text x="380" y="230" fontSize="15" fontWeight="bold" fill="#DC2626">
              (+)
            </text>
            <text x="340" y="268" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4A4A4A">
              مولد كهربائي مستمر (Générateur électrique)
            </text>

            {/* Left Callout : القطب الأول (-) — غاز 1 (حجم أكبر = 2V) */}
            <rect x="20" y="34" width="165" height="78" rx="10" fill="#F0FDFA" stroke="#0F766E" strokeWidth="1.5" />
            <text x="102" y="54" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F766E">
              القطب الأول (−) · Électrode
            </text>
            <text x="102" y="74" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4A4A4A">
              غاز 1 : حجم أكبر (2V)
            </text>
            <text x="102" y="94" textAnchor="middle" fontSize="11" fill="#0F766E">
              ضعف حجم الغاز الثاني
            </text>
            <line x1="185" y1="68" x2="246" y2="68" stroke="#0F766E" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Right Callout : القطب الثاني (+) — غاز 2 (حجم أصغر = 1V) */}
            <rect x="495" y="34" width="165" height="78" rx="10" fill="#EFF6FF" stroke="#0284C7" strokeWidth="1.5" />
            <text x="577" y="54" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0284C7">
              القطب الثاني (+) · Électrode
            </text>
            <text x="577" y="74" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4A4A4A">
              غاز 2 : حجم أصغر (1V)
            </text>
            <text x="577" y="94" textAnchor="middle" fontSize="11" fill="#0284C7">
              نصف حجم الغاز الأول
            </text>
            <line x1="434" y1="48" x2="495" y2="58" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Ratio Badge 2 : 1 */}
            <rect x="292" y="172" width="96" height="22" rx="6" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.2" />
            <text x="340" y="187" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">
              نسبة الحجوم 2 : 1
            </text>
            <text x="340" y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369A1">
              الماء (H₂O)
            </text>
          </svg>
        </div>
      );

    // ========================================================================
    // COURS 02 — 3. الكشف عن الغازين (H₂ و O₂) وبنية جزيء الماء كمادة مركبة
    // ========================================================================
    case 'c02-gas-identification-tests':
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]" dir="rtl">
          {/* Card A : الكشف عن غاز الهيدروجين H₂ */}
          <div className="p-3.5 rounded-[12px] bg-white border border-[#0F766E]/35 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold">
                  أ. الأنبوب ذو الحجم الأكبر (2V)
                </span>
                <ChemicalFormula formula="H2" size="sm" />
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
                الكشف عن ثنائي الهيدروجين (Dihydrogène)
              </h5>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                عند تقريب <strong>عود ثقاب مشتعل</strong> من فوهة الأنبوب، يحدث احتراق سريع ومميز مصحوب بـ<strong>فرقعة خفيفة (Pop)</strong>.
              </p>
            </div>
            <div className="p-2.5 rounded-[8px] bg-[#F0FDFA] border border-[#0F766E]/25 text-center">
              <div className="text-xs font-bold text-[#0F766E]">الغاز الناتج : ثنائي الهيدروجين</div>
              <div className="text-xs font-mono font-bold text-[#4A4A4A]" dir="ltr">
                Dihydrogène · الصيغة : H₂
              </div>
            </div>
          </div>

          {/* Card B : الكشف عن غاز الأكسجين O₂ */}
          <div className="p-3.5 rounded-[12px] bg-white border border-[#0284C7]/35 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-[#0284C7]/10 text-[#0284C7] text-xs font-bold">
                  ب. الأنبوب ذو الحجم الأصغر (1V)
                </span>
                <ChemicalFormula formula="O2" size="sm" />
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
                الكشف عن ثنائي الأكسجين (Dioxygène)
              </h5>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                عند تقريب <strong>عود ثقاب متوهج</strong> (على وشك الانطفاء)، يزداد توهجًا ويشتعل من جديد لأنه غاز يساعد على استمرار الاحتراق.
              </p>
            </div>
            <div className="p-2.5 rounded-[8px] bg-[#EFF6FF] border border-[#0284C7]/25 text-center">
              <div className="text-xs font-bold text-[#0284C7]">الغاز الناتج : ثنائي الأكسجين</div>
              <div className="text-xs font-mono font-bold text-[#4A4A4A]" dir="ltr">
                Dioxygène · الصيغة : O₂
              </div>
            </div>
          </div>

          {/* Card C : تركيب جزيء الماء H₂O (مادة مركبة) */}
          <div className="p-3.5 rounded-[12px] bg-white border border-[#C94BA6]/35 space-y-2.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-[#C94BA6]/10 text-[#C94BA6] text-xs font-bold">
                  ج. الماء مادة مركبة
                </span>
                <ChemicalFormula formula="H2O" size="sm" />
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
                مكونات الفرد الكيميائي للماء (Corps composé)
              </h5>
              <svg viewBox="0 0 180 86" className="w-full h-18 mx-auto" dir="ltr">
                <line x1="90" y1="30" x2="50" y2="64" stroke="#475569" strokeWidth="3" />
                <line x1="90" y1="30" x2="130" y2="64" stroke="#475569" strokeWidth="3" />
                <circle cx="90" cy="28" r="16" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
                <text x="90" y="33" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FFFFFF">
                  O
                </text>
                <circle cx="48" cy="64" r="12" fill="#FFFFFF" stroke="#475569" strokeWidth="1.8" />
                <text x="48" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E293B">
                  H
                </text>
                <circle cx="132" cy="64" r="12" fill="#FFFFFF" stroke="#475569" strokeWidth="1.8" />
                <text x="132" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E293B">
                  H
                </text>
              </svg>
            </div>
            <div className="p-2.5 rounded-[8px] bg-[#FAF7F4] border border-[#C94BA6]/25 text-center text-xs font-bold text-[#4A4A4A]">
              2 ذرتين هيدروجين (H) + 1 ذرة أكسجين (O)
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — 5. التمثيل الجزيئي وإعادة ترتيب الذرات (2 H₂O ⟶ 2 H₂ + O₂)
    // ========================================================================
    case 'c02-molecular-rearrangement':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <svg viewBox="0 0 680 210" className="w-full max-w-2xl mx-auto h-auto" dir="ltr">
            {/* Left Box : قبل التحول (2 H₂O) */}
            <rect x="14" y="14" width="245" height="182" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
            <text x="136" y="36" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284C7">
              قبل التحول : جزيئان من الماء (2 H₂O)
            </text>

            {/* Molecule 1 of H2O */}
            <g transform="translate(75, 92)">
              <line x1="0" y1="-16" x2="-26" y2="18" stroke="#475569" strokeWidth="2.8" />
              <line x1="0" y1="-16" x2="26" y2="18" stroke="#475569" strokeWidth="2.8" />
              <circle cx="0" cy="-16" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <text x="0" y="-11" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">O</text>
              <circle cx="-26" cy="18" r="11" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" />
              <text x="-26" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">H</text>
              <circle cx="26" cy="18" r="11" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" />
              <text x="26" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">H</text>
              <text x="0" y="46" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4A4A4A">H₂O</text>
            </g>

            {/* Molecule 2 of H2O */}
            <g transform="translate(195, 92)">
              <line x1="0" y1="-16" x2="-26" y2="18" stroke="#475569" strokeWidth="2.8" />
              <line x1="0" y1="-16" x2="26" y2="18" stroke="#475569" strokeWidth="2.8" />
              <circle cx="0" cy="-16" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <text x="0" y="-11" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">O</text>
              <circle cx="-26" cy="18" r="11" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" />
              <text x="-26" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">H</text>
              <circle cx="26" cy="18" r="11" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" />
              <text x="26" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">H</text>
              <text x="0" y="46" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4A4A4A">H₂O</text>
            </g>

            <text x="136" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6B6B6B">
              المجموع : 4 ذرات H + 2 ذرتان O
            </text>

            {/* Center Arrow : إعادة ترتيب الذرات */}
            <g transform="translate(340, 105)">
              <text x="0" y="-26" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#C94BA6">
                تحليل كهربائي
              </text>
              <line x1="-62" y1="0" x2="55" y2="0" stroke="#C94BA6" strokeWidth="3" />
              <polygon points="55,-6 68,0 55,6" fill="#C94BA6" />
              <text x="0" y="22" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#4A4A4A">
                إعادة ترتيب الذرات
              </text>
            </g>

            {/* Right Box : بعد التحول (2 H₂ + O₂) */}
            <rect x="421" y="14" width="245" height="182" rx="12" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.8" />
            <text x="543" y="36" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0F766E">
              بعد التحول : 2 H₂ + O₂
            </text>

            {/* 2 Molecules of H2 (H—H) */}
            <g transform="translate(485, 76)">
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#475569" strokeWidth="3" />
              <circle cx="-16" cy="0" r="11" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" />
              <text x="-16" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">H</text>
              <circle cx="16" cy="0" r="11" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" />
              <text x="16" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">H</text>
            </g>
            <g transform="translate(485, 114)">
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#475569" strokeWidth="3" />
              <circle cx="-16" cy="0" r="11" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" />
              <text x="-16" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">H</text>
              <circle cx="16" cy="0" r="11" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" />
              <text x="16" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">H</text>
              <text x="0" y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">
                2 H₂ (حجمان)
              </text>
            </g>

            {/* 1 Molecule of O2 (O=O) */}
            <g transform="translate(602, 95)">
              <line x1="-18" y1="-3" x2="18" y2="-3" stroke="#B91C1C" strokeWidth="2.5" />
              <line x1="-18" y1="3" x2="18" y2="3" stroke="#B91C1C" strokeWidth="2.5" />
              <circle cx="-18" cy="0" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <text x="-18" y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">O</text>
              <circle cx="18" cy="0" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <text x="18" y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">O</text>
              <text x="0" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#DC2626">
                1 O₂ (حجم واحد)
              </text>
            </g>

            <text x="543" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6B6B6B">
              المجموع : 4 ذرات H + 2 ذرتان O (انحفاظ الذرات)
            </text>
          </svg>
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
                desc: 'نمرر تيارًا كهربائيًا مستمرًا في الماء (H₂O).',
                color: 'border-[#0F766E] bg-white',
              },
              {
                step: '2. الملاحظة',
                fr: 'Observation',
                desc: 'انطلاق فقاعات غازية وتجمع غازين بنسبة حجوم 2 : 1.',
                color: 'border-[#0F766E] bg-white',
              },
              {
                step: '3. الكشف',
                fr: 'Identification',
                desc: 'أحدهما ثنائي الهيدروجين H₂ والآخر ثنائي الأكسجين O₂.',
                color: 'border-[#0284C7] bg-white',
              },
              {
                step: '4. التفسير',
                fr: 'Interprétation',
                desc: 'تفككت جزيئات الماء وأعيد ترتيب الذرات لتكوين أفراد جديدة.',
                color: 'border-[#C94BA6] bg-white',
              },
              {
                step: '5. الاستنتاج',
                fr: 'Conclusion',
                desc: 'الماء مركب كيميائي، والتحليل الكهربائي تحول كيميائي.',
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
                <p
                  className={`text-xs leading-relaxed ${
                    idx === 4 ? 'text-white font-semibold' : 'text-[#4A4A4A]'
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    // ========================================================================
    // COURS 02 — الخلاصة (الوحيدة في الدرس — RÈGLE 2) : مخطط الدرس الكامل
    // ========================================================================
    case 'c02-master-summary-diagram':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]" dir="rtl">
          <div className="max-w-lg mx-auto flex flex-col items-center space-y-2">
            <div className="w-full py-2 px-4 rounded-[10px] bg-[#0F766E] text-white font-bold text-xs sm:text-sm text-center">
              التحليل الكهربائي للماء (L’électrolyse de l’eau)
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#E2D9D0] text-center">
              <div className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
                الماء السائل النقي (مادة مركبة · Corps composé)
              </div>
              <div className="mt-0.5">
                <ChemicalFormula formula="H2O" size="sm" />
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#C94BA6]" />

            <div className="px-4 py-1 rounded-full bg-[#C94BA6]/10 border border-[#C94BA6]/30 text-xs font-bold text-[#C94BA6]">
              مرور تيار كهربائي مستمر (طاقة كهربائية)
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full grid grid-cols-2 gap-3">
              <div className="p-3 rounded-[10px] bg-white border border-[#0F766E] text-center space-y-1">
                <div className="text-xs font-bold text-[#0F766E]">ثنائي الهيدروجين (Dihydrogène)</div>
                <ChemicalFormula formula="H2" size="sm" />
                <div className="text-[11px] text-[#6B6B6B]">حجم مضاعف (2 حجوم) · يحدث فرقعة</div>
              </div>
              <div className="p-3 rounded-[10px] bg-white border border-[#0284C7] text-center space-y-1">
                <div className="text-xs font-bold text-[#0284C7]">ثنائي الأكسجين (Dioxygène)</div>
                <ChemicalFormula formula="O2" size="sm" />
                <div className="text-[11px] text-[#6B6B6B]">حجم واحد (1 حجم) · يزيد اللهب توهجًا</div>
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold">
                ظهور أنواع كيميائية جديدة  تحول كيميائي (Transformation chimique)
              </div>
              <div className="inline-block bg-white px-3 py-1 rounded-[8px] mt-1" dir="ltr">
                <ChemicalFormula formula="2 H2O -> 2 H2 + O2" size="md" />
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
            src="/src/assets/images/c03_combustion_carbone_1790805665478.jpg"
            alt="وضعية الانطلاق للدرس 03 : تسخين قطعة كربون وإدخالها في وعاء الهواء ثم الكشف بماء الجير"
            captionArabic="صورة توضيحية : مراحل تجربة إشعال قطعة الفحم (الكربون) في الهواء واختبار الغاز المتشكل بماء الجير"
            captionFrench="Combustion du carbone dans l’air et test à l’eau de chaux"
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
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-mono text-[#0F766E]" dir="ltr">
                Carbone incandescent + Air → Chaleur + Lumière
              </div>
            </div>

            {/* الملاحظة ب */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (ب) : تناقص قطعة الكربون وتوقف التوهج
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  أثناء الاحتراق يُستهلك جزء من قطعة الكربون الصلبة تدريجيًا، ثم ينطفئ التوهج عند نفاد الغاز المساعد على الاحتراق داخل القارورة المغلقة.
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-mono text-[#C94BA6]" dir="ltr">
                Consommation d’une partie du carbone
              </div>
            </div>

            {/* الملاحظة ج */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الملاحظة (ج) : اختبار الغاز المتشكل بماء الجير
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  عند تمرير الغاز الموجود في القارورة بعد انتهاء الاحتراق داخل أنبوب به ماء الجير الصافي، نلاحظ أن ماء الجير يصبح عكرًا (أبيض حليبيًا).
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-mono text-[#0F766E]" dir="ltr">
                Eau de chaux limpide → Eau de chaux trouble
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 03 — 2. التركيب التجريبي لاحتراق الكربون والكشف عن CO₂ بماء الجير
    // ========================================================================
    case 'c03-combustion-and-limewater-test':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <svg viewBox="0 0 680 250" className="w-full max-w-2xl mx-auto h-auto">
            <rect x="6" y="6" width="668" height="238" rx="14" fill="#FFFFFF" stroke="#E2D9D0" />

            {/* Stage 1 : احتراق الكربون في وعاء الهواء */}
            <rect x="24" y="20" width="290" height="210" rx="12" fill="#FAF7F4" stroke="#E5DDD5" />
            <text x="169" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0F766E">
              1. احتراق قطعة كربون متوهجة في الهواء
            </text>

            {/* Reaction Flask */}
            <rect x="109" y="68" width="120" height="122" rx="14" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2.2" />
            {/* Stopper & wire spoon */}
            <rect x="147" y="56" width="44" height="14" rx="4" fill="#64748B" />
            <line x1="169" y1="70" x2="169" y2="132" stroke="#334155" strokeWidth="2.5" />
            {/* Glowing Charcoal C */}
            <circle cx="169" cy="136" r="14" fill="#1E293B" stroke="#EF4444" strokeWidth="3" />
            <circle cx="169" cy="136" r="7" fill="#EF4444" />
            <text x="169" y="140" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">
              C
            </text>

            {/* Labels inside flask */}
            <text x="169" y="96" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0369A1">
              الهواء (ثنائي الأكسجين O₂)
            </text>
            <text x="169" y="175" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#DC2626">
              توهج + حرارة وضوء 🔥
            </text>
            <text x="169" y="212" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4A4A4A">
              استهلاك جزء من الكربون وتشكل غاز جديد
            </text>

            {/* Arrow between Stage 1 and Stage 2 */}
            <g transform="translate(340, 125)">
              <line x1="-18" y1="0" x2="14" y2="0" stroke="#0F766E" strokeWidth="3" />
              <polygon points="14,-6 25,0 14,6" fill="#0F766E" />
              <text x="2" y="-12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F766E">
                الغاز الناتج
              </text>
            </g>

            {/* Stage 2 : الكشف عن الغاز الناتج بماء الجير */}
            <rect x="372" y="20" width="284" height="210" rx="12" fill="#FAF7F4" stroke="#E5DDD5" />
            <text x="514" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0F766E">
              2. الكشف عن الغاز الناتج بماء الجير
            </text>

            {/* Beaker 1: Clear limewater */}
            <rect x="404" y="78" width="76" height="96" rx="10" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
            <rect x="406" y="112" width="72" height="60" rx="8" fill="#E0F2FE" />
            <text x="442" y="145" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0369A1">
              ماء الجير صافي
            </text>
            <text x="442" y="192" textAnchor="middle" fontSize="10.5" fill="#6B6B6B">
              قبل تمرير الغاز
            </text>

            {/* Small arrow */}
            <line x1="490" y1="126" x2="522" y2="126" stroke="#C94BA6" strokeWidth="2.5" />
            <polygon points="522,121 532,126 522,131" fill="#C94BA6" />
            <text x="508" y="114" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#C94BA6">
              + CO₂
            </text>

            {/* Beaker 2: Cloudy limewater (ماء الجير عكر) */}
            <rect x="542" y="78" width="84" height="96" rx="10" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.2" />
            <rect x="544" y="112" width="80" height="60" rx="8" fill="#E2E8F0" />
            <circle cx="566" cy="134" r="4" fill="#FFFFFF" />
            <circle cx="586" cy="150" r="5" fill="#FFFFFF" />
            <circle cx="602" cy="132" r="4" fill="#FFFFFF" />
            <text x="584" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">
              يصبح عكرًا!
            </text>
            <text x="584" y="192" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">
              دليل وجود CO₂
            </text>

            <text x="514" y="216" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#4A4A4A">
              ماء الجير (Eau de chaux) يتعكر بوجود ثنائي أكسيد الكربون (CO₂)
            </text>
          </svg>
        </div>
      );

    // ========================================================================
    // COURS 03 — 3. المتفاعلات والناتج والتمثيل الذري والجزيئي (C + O₂ ⟶ CO₂)
    // ========================================================================
    case 'c03-reactants-products-molecular':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <svg viewBox="0 0 680 215" className="w-full max-w-2xl mx-auto h-auto">
            {/* Left Box : قبل التحول — المتفاعلات (Réactifs : C + O₂) */}
            <rect x="14" y="14" width="250" height="186" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
            <text x="139" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284C7">
              قبل التحول : المتفاعلات (Réactifs)
            </text>

            {/* Carbon atom C */}
            <g transform="translate(76, 102)">
              <circle cx="0" cy="0" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#FFFFFF">
                C
              </text>
              <text x="0" y="38" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#4A4A4A">
                ذرة كربون (1 C)
              </text>
            </g>

            <text x="128" y="108" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#4A4A4A">
              +
            </text>

            {/* Dioxygen molecule O2 (O—O) */}
            <g transform="translate(192, 102)">
              <line x1="-17" y1="-3" x2="17" y2="-3" stroke="#B91C1C" strokeWidth="2.5" />
              <line x1="-17" y1="3" x2="17" y2="3" stroke="#B91C1C" strokeWidth="2.5" />
              <circle cx="-17" cy="0" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <text x="-17" y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">
                O
              </text>
              <circle cx="17" cy="0" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <text x="17" y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">
                O
              </text>
              <text x="0" y="38" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#4A4A4A">
                جزيء O₂ (2 O)
              </text>
            </g>

            <text x="139" y="182" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6B6B6B">
              المجموع قبل التحول : 1 ذرة C + 2 ذرتان O
            </text>

            {/* Center Arrow : احتراق وإعادة ترتيب الذرات */}
            <g transform="translate(342, 106)">
              <text x="0" y="-24" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#C94BA6">
                احتراق (Combustion)
              </text>
              <line x1="-60" y1="0" x2="52" y2="0" stroke="#C94BA6" strokeWidth="3" />
              <polygon points="52,-6 65,0 52,6" fill="#C94BA6" />
              <text x="0" y="22" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#4A4A4A">
                إعادة ترتيب الذرات
              </text>
            </g>

            {/* Right Box : بعد التحول — الناتج (Produit : CO₂) */}
            <rect x="416" y="14" width="250" height="186" rx="12" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.8" />
            <text x="541" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0F766E">
              بعد التحول : الناتج (Produit)
            </text>

            {/* CO2 Molecule (O — C — O) */}
            <g transform="translate(541, 102)">
              <line x1="-42" y1="-3" x2="42" y2="-3" stroke="#334155" strokeWidth="2.8" />
              <line x1="-42" y1="3" x2="42" y2="3" stroke="#334155" strokeWidth="2.8" />
              <circle cx="-42" cy="0" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <text x="-42" y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">
                O
              </text>
              <circle cx="0" cy="0" r="18" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#FFFFFF">
                C
              </text>
              <circle cx="42" cy="0" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
              <text x="42" y="5" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFFFFF">
                O
              </text>
              <text x="0" y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F766E">
                جزيء ثنائي أكسيد الكربون (CO₂)
              </text>
            </g>

            <text x="541" y="182" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6B6B6B">
              المجموع بعد التحول : 1 ذرة C + 2 ذرتان O (محفوظ)
            </text>
          </svg>
        </div>
      );

    // ========================================================================
    // COURS 03 — 4. محاكي مثلث الاحتراق التفاعلي (Triangle du feu) ودور ثنائي الأكسجين
    // ========================================================================
    case 'c03-fire-triangle-and-air':
      return <FireTriangleSimulator />;

    // ========================================================================
    // COURS 03 — الخلاصة (الوحيدة في الدرس — RÈGLE 2) : المخطط النهائي للدرس
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
              <div dir="ltr">
                <ChemicalFormula formula="C + O2" size="sm" />
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#C94BA6]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#0F766E] text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold text-[#0F766E]">
                الناتج (Produit) : غاز ثنائي أكسيد الكربون (Dioxyde de carbone)
              </div>
              <div dir="ltr">
                <ChemicalFormula formula="CO2" size="sm" />
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#E2D9D0] text-center text-xs sm:text-sm font-bold text-[#4A4A4A]">
              الكشف عن الغاز الناتج بـ«ماء الجير (Eau de chaux)» ← يصبح ماء الجير عكرًا
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold">
                نوع كيميائي جديد ظهر (CO₂) ← تحول كيميائي (Transformation chimique)
              </div>
              <div className="inline-block bg-white px-3.5 py-1 rounded-[8px] mt-1" dir="ltr">
                <ChemicalFormula formula="C + O2 -> CO2" size="md" />
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 04 — 1. النشاط الاستكشافي : مخطط مقارن لحالتي اشتغال موقد البوتان
    // ========================================================================
    case 'c04-discovery-setup':
      return (
        <div className="w-full" dir="rtl">
          <svg viewBox="0 0 680 265" className="w-full max-w-2xl mx-auto h-auto">
            <rect x="4" y="4" width="672" height="257" rx="14" fill="#FAF7F4" stroke="#E2D9D0" />

            {/* ================= RIGHT PANEL (RTL First) : الحالة (1) فتحة دخول الهواء مفتوحة ================= */}
            <g transform="translate(348, 14)">
              <rect x="0" y="0" width="314" height="237" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
              <rect x="12" y="10" width="290" height="28" rx="8" fill="#E0F2FE" />
              <text x="157" y="29" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369A1">
                الحالة (1) : فتحة دخول الهواء مفتوحة جيدًا
              </text>

              {/* Cold white porcelain saucer above flame */}
              <path d="M 92 64 Q 157 78 222 64" fill="none" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
              <text x="157" y="54" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">
                صحن أبيض بارد : قطرات ماء فقط (لا يوجد أثر أسود)
              </text>
              {/* Condensation droplets (clean) */}
              <circle cx="135" cy="73" r="3" fill="#38BDF8" />
              <circle cx="157" cy="75" r="3.2" fill="#38BDF8" />
              <circle cx="179" cy="73" r="3" fill="#38BDF8" />

              {/* Clean Blue Flame */}
              <path
                d="M 157 82 C 140 105 138 128 157 142 C 176 128 174 105 157 82 Z"
                fill="#0284C7"
                opacity="0.88"
              />
              <path
                d="M 157 98 C 148 112 148 128 157 138 C 166 128 166 112 157 98 Z"
                fill="#7DD3FC"
              />
              <text x="235" y="114" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284C7">
                لهب أزرق صافٍ
              </text>
              <text x="235" y="129" textAnchor="middle" fontSize="9.5" fill="#475569" fontFamily="monospace">
                Flamme bleue
              </text>

              {/* Burner tube & wide open air ring (virole) */}
              <rect x="143" y="142" width="28" height="54" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
              {/* Wide open air window */}
              <rect x="147" y="166" width="20" height="14" rx="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
              {/* Air arrows entering */}
              <line x1="108" y1="173" x2="142" y2="173" stroke="#0284C7" strokeWidth="2.2" />
              <polygon points="140,169 146,173 140,177" fill="#0284C7" />
              <text x="72" y="170" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369A1">
                دخول هواء وفير
              </text>
              <text x="72" y="183" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="monospace">
                Virole ouverte
              </text>

              {/* Burner base & gas inlet */}
              <rect x="117" y="196" width="80" height="12" rx="4" fill="#334155" />
              <text x="157" y="224" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F766E">
                وقود : غاز البوتان (C₄H₁₀) + هواء كافٍ
              </text>
            </g>

            {/* ================= LEFT PANEL (RTL Second) : الحالة (2) فتحة دخول الهواء شبه مغلقة ================= */}
            <g transform="translate(18, 14)">
              <rect x="0" y="0" width="314" height="237" rx="12" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.8" />
              <rect x="12" y="10" width="290" height="28" rx="8" fill="#FEF3C7" />
              <text x="157" y="29" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#B45309">
                الحالة (2) : فتحة دخول الهواء شبه مغلقة
              </text>

              {/* Cold white porcelain saucer above flame with black soot deposit */}
              <path d="M 92 64 Q 157 78 222 64" fill="none" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
              {/* Black soot layer on underside of saucer */}
              <ellipse cx="157" cy="72" rx="36" ry="5.5" fill="#0F172A" />
              <circle cx="128" cy="74" r="2.5" fill="#38BDF8" />
              <circle cx="186" cy="74" r="2.5" fill="#38BDF8" />
              <text x="157" y="54" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#92400E">
                صحن أبيض بارد : تتوضع طبقة سوداء (سخام) + قطرات ماء
              </text>

              {/* Soot particles rising */}
              <circle cx="148" cy="81" r="2.2" fill="#1E293B" />
              <circle cx="165" cy="79" r="2.5" fill="#1E293B" />
              <circle cx="157" cy="84" r="2" fill="#334155" />

              {/* Yellow / Orange Luminous Flame */}
              <path
                d="M 157 80 C 134 104 132 128 157 142 C 182 128 180 104 157 80 Z"
                fill="#F59E0B"
              />
              <path
                d="M 157 95 C 145 112 145 128 157 138 C 169 128 169 112 157 95 Z"
                fill="#FDE047"
              />
              <text x="236" y="114" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#B45309">
                لهب أصفر مضيء
              </text>
              <text x="236" y="129" textAnchor="middle" fontSize="9.5" fill="#475569" fontFamily="monospace">
                Flamme jaune
              </text>

              {/* Burner tube & nearly closed air ring */}
              <rect x="143" y="142" width="28" height="54" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
              {/* Narrow slit (almost closed) */}
              <rect x="154" y="166" width="5" height="14" rx="1" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.2" />
              <line x1="114" y1="173" x2="140" y2="173" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="72" y="170" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309">
                دخول هواء قليل
              </text>
              <text x="72" y="183" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="monospace">
                Virole quasi fermée
              </text>

              {/* Burner base */}
              <rect x="117" y="196" width="80" height="12" rx="4" fill="#334155" />
              <text x="157" y="224" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#B45309">
                وقود : غاز البوتان (C₄H₁₀) + هواء غير كافٍ
              </text>
            </g>
          </svg>
        </div>
      );

    // ========================================================================
    // COURS 04 — 2. الاحتراق التام للبوتان (C₄H₁₀) والكشف التجريبي عن الناتجين (H₂O و CO₂)
    // (تسلسل طبيعي من اليمين إلى اليسار RTL : مرحلة 1 على اليمين ⟵ مرحلة 2 على اليسار)
    // ========================================================================
    case 'c04-complete-combustion-tests':
      return (
        <div className="w-full space-y-3" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Test A : الكشف عن الماء H₂O بكبريتات النحاس اللامائية */}
            <div className="p-3.5 rounded-[12px] bg-white border border-[#0284C7]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#0284C7]">
                  <ChemPhysText text="أ. الكشف عن الماء (H₂O) : كبريتات النحاس اللامائية" />
                </span>
                <ChemicalFormula formula="H2O" size="sm" />
              </div>
              <svg viewBox="0 0 320 150" className="w-full max-w-[320px] mx-auto h-auto">
                {/* Step 1 (RIGHT side in RTL) : Inverted cold beaker over blue flame with mist */}
                <rect x="178" y="14" width="132" height="104" rx="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.6" />
                <path d="M 216 82 L 216 34 Q 216 28 222 28 L 266 28 Q 272 28 272 34 L 272 82" fill="#E0F2FE" fillOpacity="0.45" stroke="#0284C7" strokeWidth="1.8" />
                <circle cx="226" cy="42" r="2.3" fill="#0284C7" />
                <circle cx="244" cy="36" r="2.5" fill="#0284C7" />
                <circle cx="262" cy="42" r="2.3" fill="#0284C7" />
                <path d="M 244 80 C 237 90 237 98 244 104 C 251 98 251 90 244 80 Z" fill="#0284C7" />
                <text x="244" y="113" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#334155">
                  1. كأس مقلوبة (تشكل ضباب)
                </text>

                {/* Arrow pointing RTL (from right 170 to left 140) */}
                <line x1="170" y1="66" x2="142" y2="66" stroke="#0284C7" strokeWidth="2.4" />
                <polygon points="144,61 135,66 144,71" fill="#0284C7" />
                <text x="156" y="56" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#0284C7">
                  إضافة
                </text>

                {/* Step 2 (LEFT side in RTL) : Anhydrous CuSO4 turns from white to blue */}
                <rect x="10" y="14" width="126" height="104" rx="10" fill="#EFF6FF" stroke="#0284C7" strokeWidth="1.8" />
                <text x="73" y="32" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1D4ED8">
                  كبريتات النحاس اللامائية
                </text>
                <ellipse cx="73" cy="60" rx="42" ry="15" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
                <text x="73" y="58" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">
                  تتحول إلى زرقاء
                </text>
                <text x="73" y="70" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#DBEAFE">
                  أبيض ⟶ أزرق
                </text>
                <text x="73" y="98" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0284C7">
                  2. دليل تشكل الماء (H₂O)
                </text>

                <text x="160" y="138" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#475569">
                  كبريتات النحاس اللامائية : بيضاء ⟶ زرقاء (دليل تشكل H₂O)
                </text>
              </svg>
            </div>

            {/* Test B : الكشف عن ثنائي أكسيد الكربون CO₂ بماء الجير */}
            <div className="p-3.5 rounded-[12px] bg-white border border-[#0F766E]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-[#0F766E]">
                  <ChemPhysText text="ب. الكشف عن ثنائي أكسيد الكربون (CO₂) : ماء الجير" />
                </span>
                <ChemicalFormula formula="CO2" size="sm" />
              </div>
              <svg viewBox="0 0 320 150" className="w-full max-w-[320px] mx-auto h-auto">
                {/* Step 1 (RIGHT side in RTL) : Upright beaker + clear limewater */}
                <rect x="178" y="14" width="132" height="104" rx="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.6" />
                <path d="M 218 32 L 218 82 Q 218 88 224 88 L 264 88 Q 270 88 270 82 L 270 32" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.8" />
                <rect x="220" y="60" width="48" height="26" rx="3" fill="#E0F2FE" />
                <text x="244" y="77" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0369A1">
                  ماء جير صافي
                </text>
                <text x="244" y="106" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#334155">
                  1. سكب ورجّ الكأس
                </text>

                {/* Arrow pointing RTL (from right 170 to left 140) */}
                <line x1="170" y1="66" x2="142" y2="66" stroke="#0F766E" strokeWidth="2.4" />
                <polygon points="144,61 135,66 144,71" fill="#0F766E" />
                <text x="156" y="56" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#0F766E">
                  تفاعل
                </text>

                {/* Step 2 (LEFT side in RTL) : Cloudy limewater */}
                <rect x="10" y="14" width="126" height="104" rx="10" fill="#F0FDFA" stroke="#0F766E" strokeWidth="1.8" />
                <path d="M 42 32 L 42 82 Q 42 88 48 88 L 96 88 Q 102 88 102 82 L 102 32" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.8" />
                <rect x="44" y="56" width="56" height="30" rx="3" fill="#CBD5E1" />
                <text x="72" y="68" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0F172A">
                  يتعكر
                </text>
                <text x="72" y="80" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#475569">
                  (راسب حليبي)
                </text>
                <text x="72" y="106" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#0F766E">
                  2. دليل تشكل غاز (CO₂)
                </text>

                <text x="160" y="138" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#475569">
                  ماء الجير : رائق صافٍ ⟶ يتعكر (دليل تشكل CO₂)
                </text>
              </svg>
            </div>
          </div>

          <div className="p-3 rounded-[10px] bg-white border border-[#E5DDD5] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
            <span className="font-bold text-[#0F766E]">
              حصيلة الاحتراق التام لغاز البوتان (قبل موازنة المعادلة في الدرس 05) :
            </span>
            <div
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-[8px] bg-[#FAF7F4] border border-[#E2D9D0] font-bold text-[#1E293B]"
            >
              <span className="inline-flex items-center gap-1">
                <span dir="rtl">غاز البوتان</span>
                <span className="px-1.5 py-0.5 rounded bg-white text-[#0F766E] border border-[#0F766E]/20 text-xs font-mono" dir="ltr" style={{ unicodeBidi: 'isolate' }}>C₄H₁₀</span>
              </span>
              <span className="text-[#64748B] font-bold px-1 select-none" dir="ltr">+</span>
              <span className="inline-flex items-center gap-1">
                <span dir="rtl">ثنائي الأكسجين</span>
                <span className="px-1.5 py-0.5 rounded bg-white text-[#0F766E] border border-[#0F766E]/20 text-xs font-mono" dir="ltr" style={{ unicodeBidi: 'isolate' }}>O₂</span>
              </span>
              <span className="text-[#0F766E] font-bold text-base px-2 select-none" dir="ltr" style={{ unicodeBidi: 'isolate' }}>→</span>
              <span className="inline-flex items-center gap-1">
                <span dir="rtl">ثنائي أكسيد الكربون</span>
                <span className="px-1.5 py-0.5 rounded bg-white text-[#0F766E] border border-[#0F766E]/20 text-xs font-mono" dir="ltr" style={{ unicodeBidi: 'isolate' }}>CO₂</span>
              </span>
              <span className="text-[#64748B] font-bold px-1 select-none" dir="ltr">+</span>
              <span className="inline-flex items-center gap-1">
                <span dir="rtl">الماء</span>
                <span className="px-1.5 py-0.5 rounded bg-white text-[#0F766E] border border-[#0F766E]/20 text-xs font-mono" dir="ltr" style={{ unicodeBidi: 'isolate' }}>H₂O</span>
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
                  <ChemPhysText text="لهب أزرق صافٍ · يعكر غاز (CO₂) ماء الجير الصافي، ويزرّق الماء (H₂O) كبريتات النحاس اللامائية البيضاء." />
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
            src="/src/assets/images/c05_equilibrage_equation_1790807535324.jpg"
            alt="وضعية الانطلاق للدرس 05 : مقارنة معادلة غير موزونة ومعادلة موزونة في كفتي ميزان الذرات"
            captionArabic="صورة توضيحية : مقارنة بين كتابة غير موزونة (كفتا الميزان غير متعادلتين) ومعادلة موزونة تحترم انحفاظ الذرات"
            captionFrench="Équilibrer une équation de réaction chimique (Conservation des atomes)"
            courseBadge="الدرس 05"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* الحالة أ */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-[#0F766E]">
                  الحالة (أ) : احتراق الكربون (C + O₂ ⟶ CO₂)
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  في طرف المتفاعلات لدينا ذرة كربون واحدة (1 C) وذرتا أكسجين (2 O)، وفي طرف النواتج لدينا 1 C و 2 O: العددان متساويان مباشرة!
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-mono text-[#0F766E]" dir="ltr">
                1 C , 2 O = 1 C , 2 O (Équilibrée)
              </div>
            </div>

            {/* الحالة ب */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-amber-800">
                  الحالة (ب) : اصطناع الماء (H₂ + O₂ ⟶ H₂O ؟)
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  في المتفاعلات لدينا ذرتا أكسجين (2 O في O₂)، بينما في جزيء واحد من الماء (H₂O) توجد ذرة أكسجين واحدة فقط (1 O)!
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-mono text-amber-800" dir="ltr">
                2 O (réactifs) ≠ 1 O (produit)
              </div>
            </div>

            {/* الحالة ج */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-rose-800">
                  الحالة (ج) : احتراق البوتان (C₄H₁₀ + O₂ ⟶ CO₂ + H₂O ؟)
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  في المتفاعلات لدينا 4 ذرات C و 10 ذرات H، بينما كتبنا في النواتج جزيئًا واحدًا من CO₂ (1 C) وجزيئًا واحدًا من H₂O (2 H)!
                </p>
              </div>
              <div className="pt-1 border-t border-[#E5DDD5] text-[11px] font-mono text-rose-800" dir="ltr">
                4 C , 10 H ≠ 1 C , 2 H (Non équilibrée)
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 05 — 2. الفرق الحاسم بين المعامل الستوكيومتري (Coefficient) والمؤشر (Indice)
    // ========================================================================
    case 'c05-coefficient-vs-subscript':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <svg viewBox="0 0 680 215" className="w-full max-w-2xl mx-auto h-auto">
            <rect x="8" y="8" width="664" height="199" rx="14" fill="#FFFFFF" stroke="#E2D9D0" />

            {/* Central Big Formula : 2 H₂O */}
            <g transform="translate(340, 88)" dir="ltr">
              {/* Coefficient 2 */}
              <rect x="-86" y="-38" width="44" height="58" rx="10" fill="#F0FDFA" stroke="#0F766E" strokeWidth="2.5" />
              <text x="-64" y="4" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#0F766E" fontFamily="monospace">
                2
              </text>

              {/* H */}
              <text x="-18" y="4" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                H
              </text>

              {/* Subscript 2 */}
              <rect x="2" y="-12" width="28" height="36" rx="7" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
              <text x="16" y="15" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#DC2626" fontFamily="monospace">
                2
              </text>

              {/* O */}
              <text x="52" y="4" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#1E293B" fontFamily="monospace">
                O
              </text>
            </g>

            {/* Right Callout : المعامل الستوكيومتري (Coefficient) */}
            <rect x="22" y="24" width="206" height="118" rx="10" fill="#F0FDFA" stroke="#0F766E" strokeWidth="1.8" />
            <text x="125" y="46" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F766E">
              ✔ المعامل الستوكيومتري (2)
            </text>
            <text x="125" y="64" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F766E">
              Coefficient stœchiométrique
            </text>
            <text x="125" y="86" textAnchor="middle" fontSize="10.5" fill="#4A4A4A">
              يوضع أمام الصيغة ويمثل عدد الجزيئات
            </text>
            <text x="125" y="104" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F766E">
              (2 H₂O = جزيئان من الماء : 4 H و 2 O)
            </text>
            <text x="125" y="126" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#047857">
              ✔ يُسمح بتغييره أثناء الموازنة
            </text>

            {/* Left Callout : المؤشر (Indice) */}
            <rect x="452" y="24" width="206" height="118" rx="10" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.8" />
            <text x="555" y="46" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#DC2626">
              ❌ المؤشر الصغير (₂)
            </text>
            <text x="555" y="64" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DC2626">
              Indice (Subscript)
            </text>
            <text x="555" y="86" textAnchor="middle" fontSize="10.5" fill="#4A4A4A">
              يحدد عدد الذرات داخل الجزيء الواحد
            </text>
            <text x="555" y="104" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#B91C1C">
              (H₂O ≠ H₂O₂ الماء الأكسجيني)
            </text>
            <text x="555" y="126" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#DC2626">
              ❌ يمنع تغييره أثناء الموازنة!
            </text>

            {/* Bottom summary bar */}
            <rect x="22" y="154" width="636" height="38" rx="8" fill="#FAF7F4" stroke="#E5DDD5" />
            <text x="340" y="178" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#4A4A4A">
              قاعدة ذهبية : في 2 H₂O المعامل (2) يضرب كامل الصيغة  عدد ذرات H = 2×2 = 4 وعدد ذرات O = 2×1 = 2
            </text>
          </svg>
        </div>
      );

    // ========================================================================
    // COURS 05 — 3. التمثيل الجزيئي لموازنة معادلة اصطناع الماء (2 H₂ + O₂ ⟶ 2 H₂O)
    // ========================================================================
    case 'c05-water-synthesis-microscopic':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <svg viewBox="0 0 680 210" className="w-full max-w-2xl mx-auto h-auto">
            {/* Left : المتفاعلات (2 H₂ + O₂) */}
            <rect x="14" y="14" width="254" height="182" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
            <text x="141" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284C7">
              المتفاعلات (Réactifs) : 2 H₂ + O₂
            </text>

            {/* Two H2 molecules */}
            <g transform="translate(76, 86)">
              <circle cx="-10" cy="0" r="10" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
              <circle cx="10" cy="0" r="10" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
              <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">H₂</text>
            </g>
            <g transform="translate(76, 134)">
              <circle cx="-10" cy="0" r="10" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
              <circle cx="10" cy="0" r="10" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
              <text x="0" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">H₂</text>
            </g>

            <text x="132" y="114" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#4A4A4A">+</text>

            {/* One O2 molecule */}
            <g transform="translate(196, 108)">
              <circle cx="-13" cy="0" r="14" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.8" />
              <text x="-13" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">O</text>
              <circle cx="13" cy="0" r="14" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.8" />
              <text x="13" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">O</text>
              <text x="0" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#B91C1C">1 O₂</text>
            </g>

            <text x="141" y="182" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284C7">
              المجموع : 4 ذرات H و 2 ذرتان O
            </text>

            {/* Center Arrow */}
            <g transform="translate(340, 105)">
              <text x="0" y="-20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#C94BA6">
                إعادة ترتيب الذرات
              </text>
              <line x1="-56" y1="0" x2="48" y2="0" stroke="#C94BA6" strokeWidth="3" />
              <polygon points="48,-6 60,0 48,6" fill="#C94BA6" />
              <text x="0" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4A4A4A" dir="ltr">
                H₂ + H₂ + O₂ ⟶ H₂O + H₂O
              </text>
            </g>

            {/* Right : النواتج (2 H₂O) */}
            <rect x="412" y="14" width="254" height="182" rx="12" fill="#FFFFFF" stroke="#0F766E" strokeWidth="1.8" />
            <text x="539" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0F766E">
              النواتج (Produits) : 2 H₂O
            </text>

            <H2OMiniSvg x={495} y={96} scale={1.35} />
            <H2OMiniSvg x={585} y={96} scale={1.35} />
            <text x="495" y="136" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F766E">H₂O (1)</text>
            <text x="585" y="136" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0F766E">H₂O (2)</text>

            <text x="539" y="182" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F766E">
              المجموع : 4 ذرات H و 2 ذرتان O (متوازن ✓)
            </text>
          </svg>
        </div>
      );

    // ========================================================================
    // COURS 05 — 4. مراحل موازنة معادلة الاحتراق التام للبوتان خطوة بخطوة
    // ========================================================================
    case 'c05-butane-step-by-step':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3" dir="rtl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* الخطوة 1 : موازنة الكربون C */}
            <div className="p-3 rounded-[10px] bg-white border border-[#E5DDD5] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">
                  الخطوة 1 : موازنة الكربون (C)
                </span>
                <span className="text-xs font-mono font-bold text-[#0F766E]" dir="ltr">4 C = 4 C</span>
              </div>
              <p className="text-xs text-[#4A4A4A]">
                يوجد 4 ذرات C في جزيء <span dir="ltr" className="font-mono font-bold">C₄H₁₀</span>، فنضع المعامل <strong>4</strong> أمام <span dir="ltr" className="font-mono font-bold">CO₂</span>:
              </p>
              <div className="py-1 px-2.5 rounded bg-[#FAF7F4] border border-[#E5DDD5] text-center" dir="ltr">
                <ChemicalFormula formula="C4H10 + O2 -> 4 CO2 + H2O" size="sm" />
              </div>
            </div>

            {/* الخطوة 2 : موازنة الهيدروجين H */}
            <div className="p-3 rounded-[10px] bg-white border border-[#E5DDD5] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#0284C7] text-white text-xs font-bold">
                  الخطوة 2 : موازنة الهيدروجين (H)
                </span>
                <span className="text-xs font-mono font-bold text-[#0284C7]" dir="ltr">10 H = 5 × 2 H</span>
              </div>
              <p className="text-xs text-[#4A4A4A]">
                يوجد 10 ذرات H في <span dir="ltr" className="font-mono font-bold">C₄H₁₀</span>، فنضع المعامل <strong>5</strong> أمام <span dir="ltr" className="font-mono font-bold">H₂O</span>:
              </p>
              <div className="py-1 px-2.5 rounded bg-[#FAF7F4] border border-[#E5DDD5] text-center" dir="ltr">
                <ChemicalFormula formula="C4H10 + O2 -> 4 CO2 + 5 H2O" size="sm" />
              </div>
            </div>

            {/* الخطوة 3 : موازنة الأكسجين O */}
            <div className="p-3 rounded-[10px] bg-white border border-[#E5DDD5] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#C94BA6] text-white text-xs font-bold">
                  الخطوة 3 : حساب وموازنة الأكسجين (O)
                </span>
                <span className="text-xs font-mono font-bold text-[#C94BA6]" dir="ltr">8 + 5 = 13 O</span>
              </div>
              <p className="text-xs text-[#4A4A4A]">
                في النواتج: <span dir="ltr" className="font-mono">4×2 + 5×1 = 13 O</span>، فنضع الكسر <span dir="ltr" className="font-mono font-bold">13/2</span> أمام <span dir="ltr" className="font-mono font-bold">O₂</span>:
              </p>
              <div className="py-1 px-2.5 rounded bg-[#FAF7F4] border border-[#E5DDD5] text-center" dir="ltr">
                <ChemicalFormula formula="C4H10 + 13/2 O2 -> 4 CO2 + 5 H2O" size="sm" />
              </div>
            </div>

            {/* الخطوة 4 : ضرب المعاملات في 2 للحصول على أعداد صحيحة */}
            <div className="p-3 rounded-[10px] bg-[#F0FDFA] border-2 border-[#0F766E] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#0F766E] text-white text-xs font-bold">
                  الخطوة 4 : الضرب في 2 (معاملات صحيحة)
                </span>
                <span className="text-xs font-mono font-bold text-[#0F766E]" dir="ltr">8 C · 20 H · 26 O</span>
              </div>
              <p className="text-xs text-[#4A4A4A]">
                نضرب جميع معاملات المعادلة في <strong>2</strong> فنتحصل على المعادلة النهائية الموزونة:
              </p>
              <div className="py-1 px-2.5 rounded bg-white border border-[#0F766E]/40 text-center" dir="ltr">
                <ChemicalFormula formula="2 C4H10 + 13 O2 -> 8 CO2 + 10 H2O" size="sm" />
              </div>
            </div>
          </div>

          {/* Interactive Chemical Equation Balancer Lab */}
          <EquationBalancerTool />
        </div>
      );

    // ========================================================================
    // COURS 05 — الخلاصة (الوحيدة في الدرس — RÈGLE 2) : منهجية موازنة المعادلات الكيميائية
    // ========================================================================
    case 'c05-master-summary-diagram':
      return (
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0]" dir="rtl">
          <div className="max-w-xl mx-auto flex flex-col items-center space-y-2">
            <div className="w-full py-2 px-4 rounded-[10px] bg-[#0F766E] text-white font-bold text-xs sm:text-sm text-center">
              مبدأ موازنة معادلة التفاعل الكيميائي : انحفاظ الذرات نوعًا وعددًا
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2 px-4 rounded-[10px] bg-white border border-[#0284C7] text-center text-xs sm:text-sm font-bold text-[#0284C7]">
              عدد ذرات كل عنصر في المتفاعلات (Réactifs) = عدد ذرات العنصر نفسه في النواتج (Produits)
            </div>
            <ArrowDown className="w-4 h-4 text-[#C94BA6]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-[10px] bg-[#F0FDFA] border border-[#0F766E] text-center text-xs font-bold text-[#0F766E]">
                ✔ نغير فقط المعاملات الستوكيومترية الموضوعة أمام الصيغ الكيميائية
              </div>
              <div className="p-2.5 rounded-[10px] bg-rose-50 border border-rose-300 text-center text-xs font-bold text-rose-800">
                ❌ لا نغير أبدًا المؤشرات الصغيرة داخل الصيغ (H₂O ≠ H₂O₂)
              </div>
            </div>
            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1.5">
              <div className="text-xs sm:text-sm font-bold">
                المعادلتان المرجعيتان للحفظ بعد الموازنة :
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2" dir="ltr">
                <span className="bg-white px-3 py-1 rounded-[8px]">
                  <ChemicalFormula formula="2 H2 + O2 -> 2 H2O" size="sm" />
                </span>
                <span className="bg-white px-3 py-1 rounded-[8px]">
                  <ChemicalFormula formula="2 C4H10 + 13 O2 -> 8 CO2 + 10 H2O" size="sm" />
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    // ========================================================================
    // COURS 06 : العوامل المؤثرة في التفاعل الكيميائي
    // (Les facteurs influençant une réaction chimique)
    // ========================================================================

    case 'c06-discovery-setup':
      return (
        <div className="p-4 sm:p-6 bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] space-y-4">
          <ZoomableCourseImage
            src="/src/assets/images/c06_facteurs_reaction_1790808515013.jpg"
            alt="وضعية الانطلاق للدرس 06 : تأثير درجة الحرارة (ماء بارد مقابل ماء دافئ) وسطح التلامس (قرص كامل مقابل مسحوق) على سرعة التفاعل الكيميائي"
            captionArabic="الدرس 06 — وضعية الانطلاق : مقارنة تجريبية لتأثير درجة الحرارة (Température) وسطح التلامس (Surface de contact) على سرعة التفاعل الكيميائي"
            captionFrench="Cours 06 · Expériences comparatives : Température (Eau froide vs Eau tiède) et Surface de contact (Comprimé entier vs Poudre)"
            courseBadge="الدرس 06"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-right">
            <div className="bg-white rounded-[10px] p-3.5 border border-[#E2D9D0] space-y-1">
              <div className="text-xs font-bold text-[#6B6B6B]">
                1. اختلاف سرعة التحولات في الطبيعة
              </div>
              <div className="text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                احتراق الخشب أو الغاز يحدث <strong className="text-[#C2410C]">بسرعة</strong>، بينما صدأ الحديد يحدث <strong className="text-[#1D4ED8]">ببطء</strong> على مدى أيام.
              </div>
            </div>

            <div className="bg-[#FFF7ED] rounded-[10px] p-3.5 border border-[#FDBA74] space-y-1">
              <div className="text-xs font-bold text-[#C2410C]">
                2. تجربة درجة الحرارة (Température)
              </div>
              <div className="text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                القرص الفوار في <strong className="text-[#C2410C]">الماء الدافئ (50°C)</strong> يتفاعل ويفور أسرع بكثير منه في <strong className="text-[#1D4ED8]">الماء البارد (10°C)</strong>.
              </div>
            </div>

            <div className="bg-[#F0FDFA] rounded-[10px] p-3.5 border border-[#99F6E4] space-y-1">
              <div className="text-xs font-bold text-[#0F766E]">
                3. تجربة سطح التلامس (Surface de contact)
              </div>
              <div className="text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                <strong className="text-[#0F766E]">مسحوق القرص (Poudre)</strong> يتفاعل أسرع بكثير من <strong className="text-[#4A4A4A]">القرص الكامل المتماسك</strong> بنفس الكتلة.
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
              تصنيف التفاعلات الكيميائية حسب سرعة حدوثها (Vitesse de réaction)
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              لا تحدث جميع التحولات الكيميائية بنفس السرعة، بل تنقسم إلى ثلاث فئات زمنية
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Fast reaction */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#EA580C] space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C2410C]">1. تفاعل سريع</span>
                  <span className="text-[11px] font-mono font-bold text-[#C2410C]" dir="ltr">
                    Réaction rapide
                  </span>
                </div>
                <div className="text-xs text-[#2B2B2B] leading-relaxed">
                  يحدث في لحظات وجيزة (أجزاء من الثانية أو بضع ثوانٍ) بمجرد تلامس المتفاعلات وتوفر شروط التفاعل.
                </div>
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#FFF7ED] border border-[#FED7AA] text-[11px] text-[#9A3412] space-y-1">
                <div className="font-bold">أمثلة مألوفة :</div>
                <div>• احتراق غاز البوتان أو الورق أو الخشب.</div>
                <div>• فوران قرص فوار في ماء دافئ.</div>
              </div>
            </div>

            {/* Slow reaction */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#0284C7] space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0369A1]">2. تفاعل بطيء</span>
                  <span className="text-[11px] font-mono font-bold text-[#0369A1]" dir="ltr">
                    Réaction lente
                  </span>
                </div>
                <div className="text-xs text-[#2B2B2B] leading-relaxed">
                  يستغرق عدة دقائق أو ساعات أو أيام لكي نلاحظ تغير الجملة الكيميائية وتشكل النواتج.
                </div>
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#F0F9FF] border border-[#BAE6FD] text-[11px] text-[#0369A1] space-y-1">
                <div className="font-bold">أمثلة مألوفة :</div>
                <div>• تشكل صدأ الحديد في الهواء الرطب.</div>
                <div>• تخمر العجين أو هضم الأغذية.</div>
              </div>
            </div>

            {/* Very slow reaction */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#0F766E] space-y-2.5 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F766E]">3. تفاعل بطيء جدًا</span>
                  <span className="text-[11px] font-mono font-bold text-[#0F766E]" dir="ltr">
                    Réaction très lente
                  </span>
                </div>
                <div className="text-xs text-[#2B2B2B] leading-relaxed">
                  يمتد على مدى شهور أو سنوات طويلة بحيث لا نلاحظ تغيره بالعين المجردة في اللحظة نفسها.
                </div>
              </div>
              <div className="p-2.5 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-[11px] text-[#0F766E] space-y-1">
                <div className="font-bold">أمثلة مألوفة :</div>
                <div>• تآكل المعادن العميق عبر السنين.</div>
                <div>• التحولات الكيميائية الجيولوجية البطيئة.</div>
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
              العامل الأول : تأثير درجة الحرارة (Température) وتفسيره المجهري
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              مقارنة حركة الجسيمات والتصادمات الفعالة (Chocs efficaces) بين الماء البارد والماء الدافئ
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cold water */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#38BDF8] space-y-3">
              <div className="flex items-center justify-between border-b border-[#E0F2FE] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#0369A1]">
                  الكأس (A) : ماء بارد (Eau froide · 10°C)
                </span>
                <span className="text-[11px] font-bold text-[#0284C7]">تفاعل أبطأ</span>
              </div>

              <svg viewBox="0 0 260 125" className="w-full h-32 bg-[#F0F9FF] rounded-[10px] border border-[#BAE6FD]">
                {/* Beaker outline */}
                <path d="M 55 20 L 55 105 Q 55 112 65 112 L 195 112 Q 205 112 205 105 L 205 20" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
                {/* Water level */}
                <line x1="56" y1="35" x2="204" y2="35" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 2" />
                {/* Slow particles with short motion arrows */}
                <circle cx="95" cy="65" r="8" fill="#0284C7" />
                <line x1="95" y1="65" x2="108" y2="58" stroke="#0369A1" strokeWidth="2" />
                <circle cx="155" cy="60" r="8" fill="#0284C7" />
                <line x1="155" y1="60" x2="143" y2="68" stroke="#0369A1" strokeWidth="2" />
                <circle cx="125" cy="92" r="10" fill="#64748B" />
                <text x="125" y="95" textAnchor="middle" className="text-[8px] fill-white font-bold">قرص</text>
                {/* Few bubbles */}
                <circle cx="120" cy="48" r="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
                <circle cx="135" cy="44" r="2.5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
              </svg>

              <div className="text-xs text-[#2B2B2B] space-y-1 leading-relaxed">
                <div>• <strong>الملاحظة العيانية :</strong> فوران خفيف وانطلاق بطيء للفقاعات الغازية.</div>
                <div>• <strong>التفسير المجهري :</strong> درجة الحرارة منخفضة ⟵ حركة الجسيمات بطيئة ⟵ <strong>تصادمات فعالة قليلة</strong> في الثانية.</div>
              </div>
            </div>

            {/* Warm water */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#EA580C] space-y-3">
              <div className="flex items-center justify-between border-b border-[#FFEDD5] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#C2410C]">
                  الكأس (B) : ماء دافئ (Eau tiède · 50°C)
                </span>
                <span className="text-[11px] font-bold text-[#EA580C]">تفاعل أسرع بكثير</span>
              </div>

              <svg viewBox="0 0 260 125" className="w-full h-32 bg-[#FFF7ED] rounded-[10px] border border-[#FED7AA]">
                {/* Beaker outline */}
                <path d="M 55 20 L 55 105 Q 55 112 65 112 L 195 112 Q 205 112 205 105 L 205 20" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2.5" />
                <line x1="56" y1="35" x2="204" y2="35" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="4 2" />
                {/* Fast particles with long motion vectors and collision sparks */}
                <circle cx="88" cy="62" r="8" fill="#EA580C" />
                <line x1="88" y1="62" x2="115" y2="78" stroke="#C2410C" strokeWidth="2.5" />
                <circle cx="172" cy="58" r="8" fill="#EA580C" />
                <line x1="172" y1="58" x2="142" y2="78" stroke="#C2410C" strokeWidth="2.5" />
                <circle cx="105" cy="92" r="7" fill="#EA580C" />
                <line x1="105" y1="92" x2="122" y2="88" stroke="#C2410C" strokeWidth="2.5" />
                <circle cx="130" cy="90" r="9" fill="#64748B" />
                {/* Collision star */}
                <circle cx="130" cy="76" r="5" fill="#F59E0B" />
                {/* Many vigorous bubbles */}
                <circle cx="112" cy="52" r="3.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                <circle cx="128" cy="44" r="4" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                <circle cx="144" cy="50" r="3.5" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                <circle cx="120" cy="39" r="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
                <circle cx="138" cy="38" r="3" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.2" />
              </svg>

              <div className="text-xs text-[#2B2B2B] space-y-1 leading-relaxed">
                <div>• <strong>الملاحظة العيانية :</strong> فوران شديد وانطلاق غزير وسريع للغاز.</div>
                <div>• <strong>التفسير المجهري :</strong> ارتفاع الحرارة يزيد <strong>الاضطراب الحراري</strong> وسرعة الجسيمات ⟵ <strong>تصادمات فعالة كثيرة جدًا</strong>.</div>
              </div>
            </div>
          </div>

          {/* Microscopic causal chain */}
          <div className="bg-white rounded-[12px] p-3.5 border border-[#E2D9D0]">
            <div className="text-[11px] font-bold text-[#6B6B6B] text-center mb-2">
              السلسلة السببية للتفسير المجهري لتأثير درجة الحرارة :
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-[8px] bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C]">
                درجة الحرارة ↑ (Température ↑)
              </span>
              <span className="text-[#9A3412]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E]">
                حركة واضطراب الجسيمات ↑ (Agitation ↑)
              </span>
              <span className="text-[#9A3412]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E]">
                التصادمات الفعالة تزداد ↑ (Chocs efficaces ↑)
              </span>
              <span className="text-[#0F766E]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#0F766E] text-white">
                سرعة التفاعل تزداد ↑ (Vitesse ↑)
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
              العامل الثاني : تأثير سطح التلامس (Surface de contact — درجة تجزئة المتفاعلات)
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              مقارنة التفاعل على المستوى المجهري بين قطعة صلبة متماسكة ومسحوق مجزأ من المادة نفسها وبنفس الكتلة
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Whole solid piece */}
            <div className="bg-white rounded-[12px] p-4 border border-[#CBD5E1] space-y-3">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#334155]">
                  1. قطعة صلبة متماسكة (Comprimé entier / Bloc)
                </span>
                <span className="text-[11px] font-bold text-[#64748B]">سطح تلامس صغير</span>
              </div>

              <svg viewBox="0 0 260 120" className="w-full h-30 bg-[#F8FAFC] rounded-[10px] border border-[#E2E8F0]">
                {/* Compact block of 3x3 particles */}
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
                {/* Surrounding water/acid particles hitting only outer perimeter */}
                <circle cx="55" cy="60" r="6" fill="#0284C7" />
                <line x1="63" y1="60" x2="88" y2="60" stroke="#0284C7" strokeWidth="2" />
                <circle cx="205" cy="60" r="6" fill="#0284C7" />
                <line x1="197" y1="60" x2="172" y2="60" stroke="#0284C7" strokeWidth="2" />
                <text x="130" y="112" textAnchor="middle" className="text-[9px] fill-[#475569] font-bold">
                  الجسيمات الداخلية محجوبة لا تتصادم مباشرة
                </text>
              </svg>

              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                الجسيمات الموجودة على السطح الخارجي فقط هي المعرضة للتصادم مع المتفاعل الآخر، بينما تبقى الجسيمات الداخلية في قلب القطعة محجوبة حتى تتآكل الطبقات الخارجية.
              </div>
            </div>

            {/* Divided powder */}
            <div className="bg-white rounded-[12px] p-4 border-2 border-[#0F766E] space-y-3">
              <div className="flex items-center justify-between border-b border-[#CCFBF1] pb-2">
                <span className="text-xs sm:text-sm font-bold text-[#0F766E]">
                  2. مسحوق مجزأ (Poudre — نفس الكتلة)
                </span>
                <span className="text-[11px] font-bold text-[#0F766E]">سطح تلامس كبير جدًا</span>
              </div>

              <svg viewBox="0 0 260 120" className="w-full h-30 bg-[#F0FDFA] rounded-[10px] border border-[#99F6E4]">
                {/* Dispersed particles all exposed */}
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
                  جميع الجسيمات معرضة للتصادم المباشر في نفس اللحظة!
                </text>
              </svg>

              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                عند تفتيت المادة الصلبة إلى مسحوق، يزداد <strong>سطح التلامس (Surface de contact)</strong> بشكل هائل، فتتصادم جميع الجسيمات في آن واحد وتزداد سرعة التفاعل.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] p-3.5 border border-[#E2D9D0]">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E]">
                تجزئة المادة إلى مسحوق (Poudre)
              </span>
              <span className="text-[#0F766E]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E]">
                سطح التلامس يزداد ↑ (Surface de contact ↑)
              </span>
              <span className="text-[#0F766E]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C]">
                التصادمات الفعالة تزداد ↑
              </span>
              <span className="text-[#0F766E]">⟵</span>
              <span className="px-3 py-1.5 rounded-[8px] bg-[#0F766E] text-white">
                سرعة التفاعل تزداد ↑
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
              العامل الثالث : تركيب المزيج الابتدائي (تركيز/وفرة المتفاعلات) ودور الوسيط (Catalyseur)
            </div>
            <div className="text-[11px] text-[#6B6B6B]">
              تأثير نسبة جزيئات المتفاعلات على تواتر التصادمات الفعالة وتوجيه نواتج التفاعل
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-[12px] p-4 border border-[#E2D9D0] space-y-2">
              <div className="text-xs font-bold text-[#0369A1]">
                1. الاحتراق في الهواء العادي (21% O₂)
              </div>
              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                في الهواء، خُمس الجزيئات فقط هو ثنائي الأكسجين (<ChemicalFormula formula="O2" size="sm" />) والباقي أزوت غير متفاعل، لذلك تكون التصادمات الفعالة معتدلة والاحتراق أقل شدة.
              </div>
            </div>

            <div className="bg-[#FFF7ED] rounded-[12px] p-4 border border-[#FDBA74] space-y-2">
              <div className="text-xs font-bold text-[#C2410C]">
                2. الاحتراق في ثنائي الأكسجين النقي (100% O₂)
              </div>
              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                عند زيادة تركيز/وفرة <ChemicalFormula formula="O2" size="sm" /> في الحيز، تصبح التصادمات الفعالة غزيرة جدًا فيكون التوهج والاحتراق أسرع وأشد بكثير، كما توجه وفرة <ChemicalFormula formula="O2" size="sm" /> التفاعل نحو احتراق تام.
              </div>
            </div>

            <div className="bg-[#F0FDFA] rounded-[12px] p-4 border border-[#99F6E4] space-y-2">
              <div className="text-xs font-bold text-[#0F766E]">
                3. الوسيط / المحفز (Le catalyseur)
              </div>
              <div className="text-xs text-[#2B2B2B] leading-relaxed">
                مادة تُسرّع التفاعل الكيميائي (أو توجهه) دون أن تُستهلك في النهاية ودون أن تظهر في معادلة التفاعل (مثل الصودا في التحليل الكهربائي للماء والإنزيمات الحيوية).
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
              المخطط النهائي الشامل للدرس 06 : العوامل المؤثرة في التفاعل الكيميائي
            </div>
            <div className="text-xs text-[#6B6B6B]" dir="ltr">
              Schéma-bilan unique · Les facteurs influençant une réaction chimique
            </div>
          </div>

          <div className="max-w-xl mx-auto flex flex-col items-center space-y-2">
            <div className="w-full py-2.5 px-4 rounded-[10px] bg-white border-2 border-[#1D4ED8] text-center">
              <div className="text-xs sm:text-sm font-bold text-[#1D4ED8]">
                العوامل المؤثرة في سرعة وتوجيه التفاعل الكيميائي
              </div>
              <div className="text-[11px] text-[#4A4A4A]">
                1. درجة الحرارة (Température) · 2. سطح التلامس (Surface de contact) · 3. تركيب المزيج الابتدائي والوسيط
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#1D4ED8]" />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="py-2.5 px-3 rounded-[10px] bg-[#FFF7ED] border border-[#FDBA74] text-center">
                <div className="text-xs font-bold text-[#C2410C]">
                  رفع درجة الحرارة (Température ↑)
                </div>
                <div className="text-[11px] text-[#7C2D12] mt-0.5">
                  يزيد سرعة وحركة الجسيمات (الاضطراب الحراري ↑)
                </div>
              </div>
              <div className="py-2.5 px-3 rounded-[10px] bg-[#F0FDFA] border border-[#99F6E4] text-center">
                <div className="text-xs font-bold text-[#0F766E]">
                  زيادة سطح التلامس (مسحوق Poudre ↑)
                </div>
                <div className="text-[11px] text-[#115E59] mt-0.5">
                  يزيد عدد الجسيمات المعرضة للتصادم المباشر ↑
                </div>
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#FEF3C7] border border-[#F59E0B] text-center">
              <div className="text-xs sm:text-sm font-bold text-[#B45309]">
                التفسير المجهري المشترك : ازدياد التصادمات الفعالة (Chocs efficaces ↑)
              </div>
              <div className="text-[11px] text-[#78350F]">
                كلما زاد عدد التصادمات الفعالة بين الأفراد المتفاعلة في الثانية الواحدة، زادت سرعة التفاعل الكيميائي
              </div>
            </div>

            <ArrowDown className="w-4 h-4 text-[#0F766E]" />

            <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#0F766E] text-white text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold">
                القاعدة الذهبية للحفظ :
              </div>
              <div className="text-xs">
                درجة الحرارة ↑ أو سطح التلامس ↑ أو تركيز المتفاعلات ↑ ⟵ التصادمات الفعالة ↑ ⟵ سرعة التفاعل الكيميائي ↑
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




