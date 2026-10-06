import React, { useState, useEffect } from 'react';
import {
  TrilingualTerm,
  PhysicsDefinitionItem,
  PhysicsObservationItem,
  PhysicsExperienceItem,
  PhysicsExplanationItem,
  PhysicsSchemaOrFigure,
  PhysicsTableItem,
  PhysicsFormulaItem,
  PhysicsExampleItem,
  PhysicsActivityItem,
  PhysicsApplicationQuestion,
  PhysicsDiscoveryActivity,
  PhysicsCommonMistakeItem,
} from '../../typesPhysicsChemistry';
import { ChemPhysText, ChemicalFormula } from './ChemPhysText';
import { Course01SchemaRenderer } from './Course01Schemas';
import { usePhysicsDomainTheme } from './domainThemeTokens';
import { MathView } from '../MathView';
import {
  FlaskConical,
  Eye,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Languages,
  Atom,
  Zap,
  Table2,
  HelpCircle,
} from 'lucide-react';

// ============================================================================
// 1. TRILINGUAL TERM CARD & BILINGUAL BOX
// ============================================================================
export const TrilingualTermBox: React.FC<{
  terms: TrilingualTerm[];
  title?: string;
}> = ({ terms, title = 'المصطلحات العلمية المعتمدة (العربية · Français · English)' }) => {
  if (!terms || terms.length === 0) return null;

  return (
    <div className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#0F766E]">
        <Languages className="w-4 h-4" />
        <span>{title}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {terms.map((t, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-[12px] bg-[#F6F0EB]/60 border border-[#E2D9D0] flex flex-col justify-between gap-2"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[#4A4A4A]">{t.arabic}</span>
                {t.symbolOrFormula && (
                  <span className="px-2 py-0.5 rounded-[6px] bg-white border border-[#E2D9D0]">
                    <ChemicalFormula formula={t.symbolOrFormula} size="sm" />
                  </span>
                )}
              </div>

              <div
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
                className="text-left space-y-0.5 pt-1 border-t border-[#E2D9D0]/70"
              >
                <div className="text-xs font-bold text-[#0F766E] font-mono">
                  {t.french}
                </div>
                {t.english && (
                  <div className="text-[11px] font-medium text-[#8C8C8C] font-mono">
                    {t.english}
                  </div>
                )}
              </div>
            </div>

            {t.explanation && (
              <p className="text-xs text-[#4A4A4A]/85 leading-relaxed pt-1 border-t border-dashed border-[#E2D9D0]">
                <ChemPhysText text={t.explanation} />
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 2. DEFINITION BLOCK
// ============================================================================
export const PhysicsDefinitionBlock: React.FC<{ data: PhysicsDefinitionItem }> = ({ data }) => {
  const theme = usePhysicsDomainTheme();
  return (
    <div
      style={{ borderRightColor: theme.primaryHex }}
      className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] border-r-4 p-5 space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 shrink-0" style={{ color: theme.primaryHex }} />
          <h3 className="text-base font-bold text-[#4A4A4A]">
            <ChemPhysText text={data.titleArabic} />
          </h3>
        </div>

        {data.titleFrench && (
          <div
            dir="ltr"
            style={{
              unicodeBidi: 'isolate',
              color: theme.primaryHex,
              backgroundColor: theme.softBgHex,
              borderColor: theme.softBorderHex,
            }}
            className="text-xs font-mono font-semibold px-2.5 py-1 rounded-[8px] border"
          >
            {data.titleFrench}
          </div>
        )}
      </div>

      <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.9]">
        <ChemPhysText text={data.contentArabic} />
      </p>

      {data.contentFrench && (
        <p
          dir="ltr"
          style={{ unicodeBidi: 'isolate' }}
          className="text-xs sm:text-sm text-[#4A4A4A]/80 bg-[#F6F0EB]/60 p-3 rounded-[10px] border border-[#E5DDD5] text-left leading-relaxed"
        >
          <ChemPhysText text={data.contentFrench} />
        </p>
      )}

      {data.examples && data.examples.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#8C8C8C]">أمثلة :</span>
          {data.examples.map((ex, i) => (
            <span
              key={i}
              className="text-xs font-medium bg-[#F6F0EB] text-[#4A4A4A] px-2.5 py-1 rounded-[8px] border border-[#E2D9D0]"
            >
              <ChemPhysText text={ex} />
            </span>
          ))}
        </div>
      )}

      {data.note && (
        <div className="text-xs text-[#8C8C8C] pt-1">
          <ChemPhysText text={data.note} />
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. OBSERVATION BLOCK
// ============================================================================
export const PhysicsObservationBlock: React.FC<{ data: PhysicsObservationItem }> = ({ data }) => {
  return (
    <div className="my-4 bg-[#F6F0EB]/70 rounded-[14px] border border-[#E2D9D0] p-4 sm:p-5 space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
        <Eye className="w-4 h-4 shrink-0" />
        <span>ملاحظة علمية · Observation : {data.title}</span>
      </div>
      <p className="text-sm text-[#4A4A4A] leading-[1.85]">
        <ChemPhysText text={data.description} />
      </p>
      {data.scientificHighlight && (
        <div className="p-3 rounded-[10px] bg-white border border-[#E5DDD5] text-xs font-bold text-[#0F766E]">
          <ChemPhysText text={data.scientificHighlight} />
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 4. SCIENTIFIC SVG SCHEMAS & DIAGRAMS
// ============================================================================
export const PhysicsSchemaRenderer: React.FC<{ schema: PhysicsSchemaOrFigure }> = ({ schema }) => {
  const renderDiagramSvg = () => {
    switch (schema.type) {
      case 'molecules-cpk':
        return (
          <svg viewBox="0 0 680 210" className="w-full max-w-2xl mx-auto h-auto" dir="ltr">
            <rect x="4" y="4" width="672" height="202" rx="14" fill="#FAF7F4" stroke="#E2D9D0" />
            {/* H2O */}
            <g transform="translate(95, 95)">
              <circle cx="-26" cy="22" r="15" fill="#FFFFFF" stroke="#4A4A4A" strokeWidth="2" />
              <circle cx="26" cy="22" r="15" fill="#FFFFFF" stroke="#4A4A4A" strokeWidth="2" />
              <circle cx="0" cy="0" r="24" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">O</text>
              <text x="-26" y="26" textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">H</text>
              <text x="26" y="26" textAnchor="middle" fill="#333" fontSize="11" fontWeight="bold">H</text>
              <text x="0" y="65" textAnchor="middle" fill="#2C3E50" fontSize="13" fontWeight="bold" fontFamily="monospace">H₂O</text>
              <text x="0" y="84" textAnchor="middle" fill="#6B6B6B" fontSize="11">جزيء الماء (Eau)</text>
            </g>

            {/* CO2 */}
            <g transform="translate(260, 95)">
              <circle cx="-36" cy="0" r="22" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              <circle cx="36" cy="0" r="22" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              <circle cx="0" cy="0" r="23" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">C</text>
              <text x="-36" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">O</text>
              <text x="36" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">O</text>
              <text x="0" y="65" textAnchor="middle" fill="#2C3E50" fontSize="13" fontWeight="bold" fontFamily="monospace">CO₂</text>
              <text x="0" y="84" textAnchor="middle" fill="#6B6B6B" fontSize="11">ثنائي أكسيد الكربون</text>
            </g>

            {/* O2 */}
            <g transform="translate(425, 95)">
              <circle cx="-18" cy="0" r="22" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              <circle cx="18" cy="0" r="22" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
              <text x="-18" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">O</text>
              <text x="18" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">O</text>
              <text x="0" y="65" textAnchor="middle" fill="#2C3E50" fontSize="13" fontWeight="bold" fontFamily="monospace">O₂</text>
              <text x="0" y="84" textAnchor="middle" fill="#6B6B6B" fontSize="11">ثنائي الأكسجين</text>
            </g>

            {/* CH4 */}
            <g transform="translate(580, 95)">
              <circle cx="0" cy="-30" r="14" fill="#FFFFFF" stroke="#4A4A4A" strokeWidth="2" />
              <circle cx="-28" cy="18" r="14" fill="#FFFFFF" stroke="#4A4A4A" strokeWidth="2" />
              <circle cx="28" cy="18" r="14" fill="#FFFFFF" stroke="#4A4A4A" strokeWidth="2" />
              <circle cx="0" cy="0" r="23" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <circle cx="10" cy="26" r="14" fill="#FFFFFF" stroke="#4A4A4A" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">C</text>
              <text x="0" y="-26" textAnchor="middle" fill="#333" fontSize="10" fontWeight="bold">H</text>
              <text x="-28" y="22" textAnchor="middle" fill="#333" fontSize="10" fontWeight="bold">H</text>
              <text x="28" y="22" textAnchor="middle" fill="#333" fontSize="10" fontWeight="bold">H</text>
              <text x="0" y="65" textAnchor="middle" fill="#2C3E50" fontSize="13" fontWeight="bold" fontFamily="monospace">CH₄</text>
              <text x="0" y="84" textAnchor="middle" fill="#6B6B6B" fontSize="11">غاز الميثان (Méthane)</text>
            </g>
          </svg>
        );

      case 'water-electrolysis':
        return (
          <svg viewBox="0 0 600 240" className="w-full max-w-xl mx-auto h-auto" dir="ltr">
            <rect x="4" y="4" width="592" height="232" rx="14" fill="#FAF7F4" stroke="#E2D9D0" />
            {/* Electrolyzer vessel */}
            <path d="M 190 50 L 190 165 Q 190 180 205 180 L 395 180 Q 410 180 410 165 L 410 50" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
            {/* Inverted test tubes */}
            <rect x="230" y="30" width="44" height="125" rx="20" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
            <rect x="232" y="75" width="40" height="80" fill="#BAE6FD" />
            <rect x="326" y="30" width="44" height="125" rx="20" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
            <rect x="328" y="55" width="40" height="100" fill="#BAE6FD" />
            {/* Electrodes */}
            <line x1="252" y1="145" x2="252" y2="205" stroke="#334155" strokeWidth="4" />
            <line x1="348" y1="145" x2="348" y2="205" stroke="#334155" strokeWidth="4" />
            {/* Generator DC */}
            <line x1="252" y1="205" x2="285" y2="205" stroke="#334155" strokeWidth="2" />
            <line x1="348" y1="205" x2="315" y2="205" stroke="#334155" strokeWidth="2" />
            <circle cx="300" cy="205" r="15" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
            <text x="300" y="210" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F766E">G</text>
            <text x="235" y="200" fontSize="13" fontWeight="bold" fill="#DC2626">−</text>
            <text x="360" y="200" fontSize="13" fontWeight="bold" fill="#0284C7">+</text>
            {/* Labels */}
            <text x="115" y="58" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0F766E">غاز ثنائي الهيدروجين H₂</text>
            <text x="115" y="75" textAnchor="middle" fontSize="11" fill="#6B6B6B">(المهبط · Cathode −)</text>
            <line x1="175" y1="60" x2="230" y2="55" stroke="#0F766E" strokeWidth="1.5" strokeDasharray="3 3" />

            <text x="485" y="58" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0284C7">غاز ثنائي الأكسجين O₂</text>
            <text x="485" y="75" textAnchor="middle" fontSize="11" fill="#6B6B6B">(المصعد · Anode +)</text>
            <line x1="370" y1="45" x2="420" y2="55" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />

            <text x="300" y="172" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369A1">
              ماء مقطر + الصودا (NaOH)
            </text>
          </svg>
        );

      case 'energy-chain': {
        const nodes = schema.chainNodes && schema.chainNodes.length > 0
          ? schema.chainNodes
          : [
              {
                actorArabic: 'الماء المتساقط',
                actorFrench: 'Chute d’eau',
                stateVerb: 'يسقط',
                energyForm: 'Ep → Ec',
                transferNext: 'Wm',
                transferLabel: 'يدير',
              },
              {
                actorArabic: 'العنفة (التوربين)',
                actorFrench: 'Turbine',
                stateVerb: 'تدور',
                energyForm: 'Ec',
                transferNext: 'Wm',
                transferLabel: 'تدير',
              },
              {
                actorArabic: 'المنوب (الدينامو)',
                actorFrench: 'Alternateur',
                stateVerb: 'يدور',
                energyForm: 'Ec',
                transferNext: 'We',
                transferLabel: 'يغذي',
              },
              {
                actorArabic: 'المصباح',
                actorFrench: 'Lampe',
                stateVerb: 'يتوهج ويسخن',
                energyForm: 'Ei',
              },
            ];

        return (
          <div className="p-4 bg-[#FAF7F4] rounded-[14px] border border-[#E2D9D0] overflow-x-auto">
            <div className="flex items-center justify-center gap-2 min-w-[540px] py-3" dir="rtl">
              {nodes.map((node, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <div className="px-4 py-2.5 rounded-full bg-white border-2 border-[#0F766E] shadow-2xs text-center min-w-[115px]">
                      <div className="text-xs font-bold text-[#4A4A4A]">{node.actorArabic}</div>
                      {node.actorFrench && (
                        <div className="text-[10px] font-mono text-[#8C8C8C]" dir="ltr">
                          {node.actorFrench}
                        </div>
                      )}
                    </div>
                    <div className="mt-1.5 text-[11px] font-semibold text-[#0F766E]">
                      {node.stateVerb}
                    </div>
                    {node.energyForm && (
                      <div
                        dir="ltr"
                        className="mt-1 px-2 py-0.5 rounded bg-[#0F766E]/10 text-[#0F766E] font-mono font-bold text-xs"
                      >
                        {node.energyForm}
                      </div>
                    )}
                  </div>

                  {idx < nodes.length - 1 && (
                    <div className="flex flex-col items-center px-1">
                      <span className="text-[11px] font-bold text-[#4A4A4A] mb-0.5">
                        {node.transferLabel || '←'}
                      </span>
                      <div className="w-14 h-0.5 bg-[#C94BA6] relative">
                        <span className="absolute -left-1 -top-1.5 text-[#C94BA6] text-xs font-bold">
                          ◀
                        </span>
                      </div>
                      {node.transferNext && (
                        <span
                          dir="ltr"
                          className="mt-1 text-xs font-mono font-bold text-[#C94BA6]"
                        >
                          {node.transferNext}
                        </span>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      }

      default:
        if (
          schema.type.startsWith('c01-') ||
          schema.type.startsWith('c02-') ||
          schema.type.startsWith('c03-') ||
          schema.type.startsWith('c04-') ||
          schema.type.startsWith('c05-') ||
          schema.type.startsWith('c06-') ||
          schema.type.startsWith('c07-') ||
          schema.type.startsWith('c08-') ||
          schema.type.startsWith('c09-') ||
          schema.type.startsWith('c10-')
        ) {
          return <Course01SchemaRenderer type={schema.type} />;
        }
        return (
          <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] text-center text-xs text-[#6B6B6B]">
            رسم تخطيطي توضيحي : {schema.titleArabic}
          </div>
        );
    }
  };

  const theme = usePhysicsDomainTheme();
  const SchemaDomainIcon = theme.PrimaryIcon;

  return (
    <div className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SchemaDomainIcon className="w-4 h-4" style={{ color: theme.primaryHex }} />
          <h4 className="text-sm font-bold text-[#4A4A4A]">
            <ChemPhysText text={schema.titleArabic} />
          </h4>
        </div>
        {schema.titleFrench && (
          <span
            dir="ltr"
            style={{ unicodeBidi: 'isolate', color: theme.primaryHex }}
            className="text-xs font-mono font-semibold"
          >
            {schema.titleFrench}
          </span>
        )}
      </div>

      {renderDiagramSvg()}

      {schema.annotations && schema.annotations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          {schema.annotations.map((ann, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-[10px] bg-[#F6F0EB]/60 border border-[#E2D9D0] flex items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-bold text-[#4A4A4A]">{ann.labelArabic}</span>
                {ann.labelFrench && (
                  <span dir="ltr" className="text-[#8C8C8C] font-mono mr-1.5">
                    ({ann.labelFrench})
                  </span>
                )}
                {ann.detail && <p className="text-[11px] text-[#6B6B6B] mt-0.5">{ann.detail}</p>}
              </div>
              {ann.formula && (
                <div className="px-2 py-1 rounded bg-white border border-[#E2D9D0] shrink-0">
                  <ChemicalFormula formula={ann.formula} size="sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {schema.caption && (
        <p className="text-xs text-[#8C8C8C] text-center pt-1">
          <ChemPhysText text={schema.caption} />
        </p>
      )}
    </div>
  );
};

// ============================================================================
// 5. EXPERIENCE / LABORATORY PROTOCOL BLOCK
// ============================================================================
export const PhysicsExperienceBlock: React.FC<{ data: PhysicsExperienceItem }> = ({ data }) => {
  return (
    <div className="my-6 bg-[#FFFFFF] rounded-[16px] border-2 border-[#0F766E]/25 p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5DDD5] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#0F766E] text-white flex items-center justify-center shrink-0">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#0F766E]">
              {data.number ? `التجربة ${data.number} · Expérience ${data.number}` : 'نشاط تجريبي · Protocole expérimental'}
            </div>
            <h3 className="text-base font-bold text-[#4A4A4A]">
              <ChemPhysText text={data.titleArabic} />
            </h3>
          </div>
        </div>

        {data.titleFrench && (
          <span
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
            className="text-xs font-mono font-semibold text-[#0F766E] bg-[#0F766E]/8 px-2.5 py-1 rounded-[8px]"
          >
            {data.titleFrench}
          </span>
        )}
      </div>

      {data.objective && (
        <div className="text-xs sm:text-sm bg-[#F6F0EB]/60 p-3 rounded-[10px] border border-[#E2D9D0] text-[#4A4A4A]">
          <span className="font-bold text-[#0F766E] ml-1">الهدف من التجربة :</span>
          <ChemPhysText text={data.objective} />
        </div>
      )}

      {data.materials && data.materials.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-[#8C8C8C]">الوسائل والمواد المستعملة (Matériel & Réactifs) :</div>
          <div className="flex flex-wrap gap-2">
            {data.materials.map((m, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#F6F0EB] text-[#4A4A4A] px-2.5 py-1 rounded-[8px] border border-[#E2D9D0]"
              >
                <ChemPhysText text={m} />
              </span>
            ))}
          </div>
        </div>
      )}

      {data.schemaType && (
        <PhysicsSchemaRenderer
          schema={{
            id: `exp-schema-${data.id || '1'}`,
            titleArabic: data.schemaCaption || data.titleArabic,
            type:
              data.schemaType === 'water-electrolysis'
                ? 'water-electrolysis'
                : data.schemaType === 'energy-chain'
                ? 'energy-chain'
                : 'molecules-cpk',
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Protocol Steps */}
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2">
          <div className="text-xs font-bold text-[#4A4A4A]">
            1. خطوات العمل (Protocole)
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#4A4A4A] list-disc pr-4 leading-relaxed">
            {data.protocolSteps.map((step, i) => (
              <li key={i}>
                <ChemPhysText text={step} />
              </li>
            ))}
          </ul>
        </div>

        {/* Observations */}
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2">
          <div className="text-xs font-bold text-[#0F766E]">
            2. الملاحظات التجريبية (Observations)
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#4A4A4A] list-disc pr-4 leading-relaxed">
            {data.observations.map((obs, i) => (
              <li key={i}>
                <ChemPhysText text={obs} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interpretation & Conclusion */}
      <div className="p-4 rounded-[12px] bg-[#0F766E]/6 border border-[#0F766E]/25 space-y-2">
        <div className="text-xs font-bold text-[#0F766E]">
          3. التفسير والاستنتاج العلمي (Interprétation & Conclusion)
        </div>
        <ul className="space-y-1.5 text-xs sm:text-sm text-[#4A4A4A] list-disc pr-4 leading-relaxed">
          {data.interpretation.map((interp, i) => (
            <li key={i}>
              <ChemPhysText text={interp} />
            </li>
          ))}
        </ul>

        {data.chemicalEquation && (
          <div className="mt-3 p-3 rounded-[10px] bg-white border border-[#E2D9D0] text-center">
            <ChemicalFormula formula={data.chemicalEquation} size="lg" />
          </div>
        )}

        {data.conclusion && (
          <p className="text-xs sm:text-sm font-bold text-[#0F766E] pt-2 border-t border-[#0F766E]/15">
            <ChemPhysText text={data.conclusion} />
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 6. FORMULA / CHEMICAL EQUATION BLOCK
// ============================================================================
export const PhysicsFormulaBlock: React.FC<{ data: PhysicsFormulaItem }> = ({ data }) => {
  return (
    <div className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#C94BA6]" />
          <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            <ChemPhysText text={data.titleArabic} />
          </h4>
        </div>
        {data.titleFrench && (
          <span
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
            className="text-xs font-mono font-medium text-[#475569]"
          >
            {data.titleFrench}
          </span>
        )}
      </div>

      <div
        dir="ltr"
        style={{ unicodeBidi: 'isolate' }}
        className="w-full p-4 rounded-[12px] bg-[#F6F0EB] border border-[#E2D9D0] text-center overflow-x-auto"
      >
        {data.type === 'physical-law' && data.latex ? (
          <MathView math={data.latex} block />
        ) : (
          <ChemicalFormula formula={data.expression} size="lg" />
        )}
      </div>

      {data.unitsAndVariables && data.unitsAndVariables.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {data.unitsAndVariables.map((uv, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] flex items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-bold text-[#4A4A4A]">{uv.nameArabic}</span>
                {uv.nameFrench && (
                  <span dir="ltr" className="block text-[10px] font-mono text-[#8C8C8C]">
                    {uv.nameFrench}
                  </span>
                )}
              </div>
              <div dir="ltr" className="font-mono font-bold text-[#0F766E] bg-white px-2 py-1 rounded border border-[#E2D9D0]">
                {uv.symbol} ({uv.unit})
              </div>
            </div>
          ))}
        </div>
      )}

      {data.conditionOrNote && (
        <p className="text-xs text-[#6B6B6B] leading-relaxed">
          <ChemPhysText text={data.conditionOrNote} />
        </p>
      )}
    </div>
  );
};

// ============================================================================
// 7. SCIENTIFIC TABLE BLOCK
// ============================================================================
export const PhysicsTableBlock: React.FC<{ data: PhysicsTableItem }> = ({ data }) => {
  return (
    <div className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Table2 className="w-4 h-4 text-[#0F766E]" />
          <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            <ChemPhysText text={data.titleArabic} />
          </h4>
        </div>
        {data.titleFrench && (
          <span
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
            className="text-xs font-mono font-medium text-[#475569]"
          >
            {data.titleFrench}
          </span>
        )}
      </div>

      {data.subtitle && (
        <p className="text-xs text-[#6B6B6B]">
          <ChemPhysText text={data.subtitle} />
        </p>
      )}

      <div className="overflow-x-auto rounded-[12px] border border-[#E2D9D0]">
        <table className="w-full text-right border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#F6F0EB] border-b border-[#E2D9D0] text-[#4A4A4A] font-bold">
              {data.headers.map((h, idx) => (
                <th key={idx} className="py-3 px-4">
                  <ChemPhysText text={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE2DA]">
            {data.rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#F6F0EB]/40 transition-colors">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="py-3 px-4 text-[#4A4A4A] leading-relaxed">
                    <ChemPhysText text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.footerNote && (
        <p className="text-xs text-[#8C8C8C]">
          <ChemPhysText text={data.footerNote} />
        </p>
      )}
    </div>
  );
};

// ============================================================================
// 8. EXPLANATION & EXAMPLE BLOCKS
// ============================================================================
export const PhysicsExplanationBlock: React.FC<{ data: PhysicsExplanationItem }> = ({ data }) => {
  return (
    <div className="my-4 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-5 space-y-3">
      <h4 className="text-base font-bold text-[#4A4A4A]">
        <ChemPhysText text={data.title} />
      </h4>
      {data.paragraphs.map((p, idx) => (
        <p key={idx} className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.9]">
          <ChemPhysText text={p} />
        </p>
      ))}
      {data.bulletPoints && data.bulletPoints.length > 0 && (
        <ul className="space-y-1.5 pr-5 list-disc text-sm text-[#4A4A4A] leading-[1.85]">
          {data.bulletPoints.map((bp, i) => (
            <li key={i}>
              <ChemPhysText text={bp} />
            </li>
          ))}
        </ul>
      )}
      {data.note && (
        <div className="p-3 rounded-[10px] bg-[#F6F0EB]/70 border border-[#E2D9D0] text-xs text-[#4A4A4A]">
          <ChemPhysText text={data.note} />
        </div>
      )}
    </div>
  );
};

export const PhysicsExampleBlock: React.FC<{ data: PhysicsExampleItem }> = ({ data }) => {
  return (
    <div className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-5 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-[#C94BA6]">
        <span>مثال تطبيقي محلول · Exemple résolu</span>
      </div>
      <h4 className="text-base font-bold text-[#4A4A4A]">{data.title}</h4>
      <p className="text-sm text-[#4A4A4A] bg-[#F6F0EB]/60 p-3.5 rounded-[10px] border border-[#E2D9D0]">
        <ChemPhysText text={data.context} />
      </p>

      <div className="space-y-2.5 pt-1">
        {data.steps.map((st, idx) => (
          <div key={idx} className="p-3.5 rounded-[10px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-1.5">
            <div className="text-xs font-bold text-[#0F766E]">
              {idx + 1}. {st.stepTitle}
            </div>
            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
              <ChemPhysText text={st.explanation} />
            </p>
            {st.formulaOrChem && (
              <div className="p-2.5 rounded-[8px] bg-white border border-[#E2D9D0] text-center" dir="ltr">
                <ChemicalFormula formula={st.formulaOrChem} size="md" />
              </div>
            )}
          </div>
        ))}
      </div>

      {data.conclusion && (
        <div className="p-3 rounded-[10px] bg-[#0F766E]/8 border border-[#0F766E]/25 text-xs sm:text-sm font-bold text-[#0F766E]">
          <ChemPhysText text={data.conclusion} />
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 9. ACTIVITY & APPLICATION QUESTION CARDS (WITH TOGGLEABLE CORRECTION)
// ============================================================================
export const PhysicsActivityBlock: React.FC<{ data: PhysicsActivityItem }> = ({ data }) => {
  const [showCorrection, setShowCorrection] = useState(false);

  useEffect(() => {
    const handlePreparePdf = () => setShowCorrection(true);
    const handleDonePdf = () => setShowCorrection(false);
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    window.addEventListener('course-pdf-done', handleDonePdf);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePreparePdf);
      window.removeEventListener('course-pdf-done', handleDonePdf);
    };
  }, []);

  return (
    <div className="my-5 bg-[#FFFFFF] rounded-[16px] border border-[#E5DDD5] p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[8px] bg-[#0F766E] text-white text-xs font-bold">
            {data.number ? `نشاط ${data.number}` : 'نشاط بيداغوجي'}
          </span>
          <h3 className="text-base font-bold text-[#4A4A4A]">
            <ChemPhysText text={data.titleArabic} />
          </h3>
        </div>
        {data.titleFrench && (
          <span dir="ltr" className="text-xs font-mono font-medium text-[#475569]">
            {data.titleFrench}
          </span>
        )}
      </div>

      <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.85] bg-[#F6F0EB]/60 p-4 rounded-[12px] border border-[#E2D9D0]">
        <ChemPhysText text={data.situation} />
      </p>

      {data.table && <PhysicsTableBlock data={data.table} />}
      {data.schema && <PhysicsSchemaRenderer schema={data.schema} />}

      <div className="space-y-2">
        <div className="text-xs font-bold text-[#0F766E] flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4" />
          <span>التعليمات والأسئلة :</span>
        </div>
        <ol className="space-y-2 pr-5 list-decimal text-sm text-[#4A4A4A] font-medium">
          {data.questions.map((q, idx) => (
            <li key={idx} className="leading-relaxed">
              <ChemPhysText text={q} />
            </li>
          ))}
        </ol>
      </div>

      {data.correction && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowCorrection(!showCorrection)}
            className="no-pdf inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#0F766E] hover:opacity-95 text-white text-xs font-bold transition-all cursor-pointer"
          >
            {showCorrection ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>إخفاء الحل والتصحيح</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>إظهار الحل المفصل للنشاط</span>
              </>
            )}
          </button>

          {showCorrection && (
            <div className="mt-3 p-4 rounded-[12px] bg-[#F6F0EB]/70 border border-[#0F766E]/30 space-y-2">
              <div className="text-xs font-bold text-[#0F766E]">التصحيح النموذجي للنشاط :</div>
              <ol className="space-y-2 pr-5 list-decimal text-xs sm:text-sm text-[#4A4A4A]">
                {data.correction.answers.map((ans, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <ChemPhysText text={ans} />
                  </li>
                ))}
              </ol>
              {data.correction.synthesis && (
                <div className="p-3 mt-2 rounded-[10px] bg-white border border-[#E2D9D0] text-xs font-bold text-[#0F766E]">
                  <ChemPhysText text={data.correction.synthesis} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const PhysicsApplicationCard: React.FC<{ item: PhysicsApplicationQuestion }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handlePreparePdf = () => setIsOpen(true);
    const handleDonePdf = () => setIsOpen(false);
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    window.addEventListener('course-pdf-done', handleDonePdf);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePreparePdf);
      window.removeEventListener('course-pdf-done', handleDonePdf);
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-[8px] bg-[#0F766E] text-white font-bold text-xs flex items-center justify-center">
            {item.number}
          </span>
          <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            <ChemPhysText text={item.title} />
          </h4>
        </div>
        {item.difficultyLabel && (
          <span className="text-xs font-semibold text-[#8C8C8C]">{item.difficultyLabel}</span>
        )}
      </div>

      <p className="text-sm text-[#4A4A4A] leading-[1.85]">
        <ChemPhysText text={item.prompt} />
      </p>

      {item.subQuestions && item.subQuestions.length > 0 && (
        <ol className="space-y-1.5 pr-5 list-decimal text-xs sm:text-sm text-[#4A4A4A]">
          {item.subQuestions.map((sq, i) => (
            <li key={i}>
              <ChemPhysText text={sq} />
            </li>
          ))}
        </ol>
      )}

      {item.formulaOrData && (
        <div className="p-3 rounded-[10px] bg-[#F6F0EB]/70 border border-[#E2D9D0] text-center" dir="ltr">
          <ChemicalFormula formula={item.formulaOrData} size="md" />
        </div>
      )}

      <div className="pt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="no-pdf inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] border border-[#0F766E] text-[#0F766E] hover:bg-[#0F766E] hover:text-white text-xs font-bold transition-colors cursor-pointer"
        >
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{isOpen ? 'إخفاء التصحيح' : 'عرض الحل والتصحيح النموذجي'}</span>
        </button>

        {isOpen && (
          <div className="mt-3 p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3">
            {item.correctionSteps.map((st, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xs font-bold text-[#0F766E]">
                  {idx + 1}. <ChemPhysText text={st.title} />
                </div>
                {st.explanation && (
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed whitespace-pre-line">
                    <ChemPhysText text={st.explanation} />
                  </p>
                )}
                {st.formulaOrChem && (
                  <div
                    className={`p-2.5 rounded-[8px] bg-white border border-[#E2D9D0] text-center ${
                      /[\u0600-\u06FF]/.test(st.formulaOrChem)
                        ? 'text-xs sm:text-sm font-semibold text-[#1A1A1A] leading-relaxed'
                        : ''
                    }`}
                    dir={/[\u0600-\u06FF]/.test(st.formulaOrChem) ? 'rtl' : 'ltr'}
                  >
                    {/[\u0600-\u06FF]/.test(st.formulaOrChem) ? (
                      <ChemPhysText text={st.formulaOrChem} />
                    ) : (
                      <ChemicalFormula formula={st.formulaOrChem} size="md" />
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="p-3 rounded-[10px] bg-[#0F766E]/10 border border-[#0F766E]/25 flex items-start gap-2 text-xs sm:text-sm font-bold text-[#0F766E]">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="whitespace-pre-line leading-relaxed">
                <span className="font-bold">النتيجة النهائية : </span>
                <ChemPhysText text={item.finalAnswer} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 9B. DISCOVERY ACTIVITY (RÈGLE 1 : 3 TEMPS AVANT DE NOMMER LES CONCEPTS)
// ============================================================================
export const PhysicsDiscoveryBlock: React.FC<{
  data: PhysicsDiscoveryActivity;
  part?: 'all' | 'part1' | 'part2';
  isDiscoveryCompleted?: boolean;
  onCompleteDiscovery?: () => void;
}> = ({ data, part = 'all', isDiscoveryCompleted = false, onCompleteDiscovery }) => {
  const theme = usePhysicsDomainTheme();
  const showPart1 = part === 'all' || part === 'part1';
  const showPart2 = part === 'all' || part === 'part2';

  return (
    <div
      style={{ borderColor: theme.softBorderHex }}
      className="my-2 rounded-[14px] border bg-[#FAF7F4] p-4 sm:p-5 space-y-4"
    >
      {showPart1 && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9D0] pb-2.5">
            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: theme.primaryHex }}
                className="px-2.5 py-1 rounded-[8px] text-white text-xs font-bold"
              >
                نشاط استكشافي (3 مراحل)
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
                <ChemPhysText text={data.titleArabic} />
              </h3>
            </div>
            {data.titleFrench && (
              <span
                dir="ltr"
                style={{ color: theme.primaryHex }}
                className="text-xs font-mono font-semibold"
              >
                {data.titleFrench}
              </span>
            )}
          </div>

          {/* Temps 1 : Situation concrète avec objets réels + Illustration */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold" style={{ color: theme.primaryHex }}>
              1. وضعية ملموسة من الواقع المعيش (Situation concrète) :
            </div>
            <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.85] whitespace-pre-line">
              <ChemPhysText text={data.situationConcrete} />
            </p>
            {data.situationsReelles && data.situationsReelles.length > 0 && (
              <ul className="space-y-1.5 pr-5 list-disc text-xs sm:text-sm text-[#4A4A4A] bg-white p-3.5 rounded-[10px] border border-[#E5DDD5]">
                {data.situationsReelles.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <ChemPhysText text={item} />
                  </li>
                ))}
              </ul>
            )}
            {data.schema && <PhysicsSchemaRenderer schema={data.schema} />}
          </div>
        </>
      )}

      {showPart2 && (
        <>
          {/* Temps 2 : Données / Observations à traiter */}
          {data.observationTable && (
            <div className="space-y-2">
              <div className="text-xs font-bold" style={{ color: theme.primaryHex }}>
                2. معطيات وملاحظات تجريبية للمعالجة والمقارنة (Données & Observations) :
              </div>
              <PhysicsTableBlock data={data.observationTable} />
            </div>
          )}

          {/* Temps 3 : Questions guidées AVANT de nommer formellement les concepts */}
          <div className="space-y-2 bg-white p-3.5 sm:p-4 rounded-[12px] border border-[#E5DDD5]">
            <div className="text-xs font-bold text-[#C94BA6] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>3. أسئلة استكشافية موجهة (فكّر ولاحظ قبل تسمية المفاهيم) :</span>
            </div>
            <ol className="space-y-2 pr-5 list-decimal text-xs sm:text-sm text-[#4A4A4A] font-medium">
              {data.guidedQuestions?.map((q, idx) => (
                <li key={idx} className="leading-relaxed">
                  <ChemPhysText text={q} />
                </li>
              ))}
            </ol>
          </div>

          {data.hint && (
            <div className="flex items-baseline gap-2 text-xs text-[#4A4A4A] bg-white px-3.5 py-2.5 rounded-[10px] border border-[#E2D9D0]">
              <span className="font-bold shrink-0" style={{ color: theme.primaryHex }}>
                💡 مساعدة :
              </span>
              <span>
                <ChemPhysText text={data.hint} />
              </span>
            </div>
          )}

          {onCompleteDiscovery && (
            <div className="no-pdf pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2D9D0]">
              {!isDiscoveryCompleted ? (
                <button
                  type="button"
                  onClick={onCompleteDiscovery}
                  style={{ backgroundColor: theme.primaryHex }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] hover:opacity-95 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>أنهيت النشاط الاستكشافي (القسم 1) — متابعة الدرس وفتح مختصرات التنقل</span>
                </button>
              ) : (
                <div
                  style={{ color: theme.primaryHex }}
                  className="inline-flex items-center gap-2 text-xs font-bold"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم إنجاز وضعية الانطلاق — مختصرات التنقل والملخص مفتوحة الآن</span>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const PhysicsDiscoveryCorrectionCard: React.FC<{
  activity: PhysicsDiscoveryActivity;
}> = ({ activity }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handlePreparePdf = () => setIsOpen(true);
    const handleDonePdf = () => setIsOpen(false);
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    window.addEventListener('course-pdf-done', handleDonePdf);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePreparePdf);
      window.removeEventListener('course-pdf-done', handleDonePdf);
    };
  }, []);

  if (!activity.correction) return null;

  return (
    <div className="rounded-[14px] border border-[#0F766E]/35 bg-[#FFFFFF] overflow-hidden">
      <div className="px-4 py-3 bg-[#F6F0EB]/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-[6px] bg-[#0F766E] text-white font-bold text-xs flex items-center justify-center shrink-0"
            dir="ltr"
          >
            1
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#4A4A4A]">
            تصحيح النشاط الاستكشافي (وضعية الانطلاق)
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="no-pdf inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:opacity-80 cursor-pointer shrink-0"
        >
          <span>{isOpen ? 'إخفاء التصحيح' : 'عرض تصحيح النشاط الاستكشافي'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 space-y-2 text-xs sm:text-sm text-[#4A4A4A] leading-[1.85] border-t border-[#E5DDD5]">
          <ol className="space-y-1.5 pr-5 list-decimal">
            {activity.correction.questionAnswers?.map((ans, idx) => (
              <li key={idx}>
                <ChemPhysText text={ans} />
              </li>
            ))}
          </ol>
          {activity.correction.conclusion && (
            <div className="p-3 mt-2 rounded-[10px] bg-[#FAF7F4] border border-[#0F766E]/25 text-xs sm:text-sm font-semibold text-[#0F766E] whitespace-pre-line leading-relaxed">
              <ChemPhysText text={activity.correction.conclusion} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 9C. COMMON MISTAKES BLOCK (RÈGLE 3 : تنبيه بيداغوجي — خاطئ vs صحيح)
// ============================================================================
export const PhysicsCommonMistakesBlock: React.FC<{
  items: PhysicsCommonMistakeItem[];
}> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3.5 my-3">
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          className="rounded-[14px] border border-[#E5DDD5] bg-[#FFFFFF] p-4 space-y-3"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C94BA6]">
            <span className="px-2 py-0.5 rounded bg-[#C94BA6]/10 text-[#C94BA6] text-xs">
              تنبيه بيداغوجي {idx + 1}
            </span>
            <span>
              <ChemPhysText text={item.title} />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* الكتابة أو التفكير الخاطئ */}
            <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#C94BA6]/30 space-y-1.5">
              <div className="text-xs font-bold text-[#C94BA6] flex items-center gap-1.5">
                <span>✗</span>
                <span>الكتابة أو التفكير الخاطئ الشائع :</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#4A4A4A] line-through decoration-[#C94BA6] decoration-2 leading-relaxed">
                <ChemPhysText text={item.incorrect} />
              </div>
              <p className="text-xs text-[#4A4A4A]/90 leading-relaxed pt-1 border-t border-[#E5DDD5]">
                <strong className="text-[#C94BA6]">لماذا؟ </strong>
                <ChemPhysText text={item.whyExplanation} />
              </p>
            </div>

            {/* الطريقة العلمية الصحيحة */}
            <div className="p-3 rounded-[10px] bg-[#F0FDFA]/60 border border-[#0F766E]/35 space-y-1.5">
              <div className="text-xs font-bold text-[#0F766E] flex items-center gap-1.5">
                <span>✓</span>
                <span>الطريقة العلمية الصحيحة :</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#4A4A4A] leading-relaxed">
                <ChemPhysText text={item.correct} />
              </div>
              {item.rule && (
                <p className="text-xs text-[#4A4A4A] leading-relaxed pt-1 border-t border-[#0F766E]/20">
                  <strong className="text-[#0F766E]">القاعدة : </strong>
                  <ChemPhysText text={item.rule} />
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// 10. VOCABULARY TABLE & SUMMARY / POINTS ESSENTIELS
// ============================================================================
export const PhysicsVocabularyTable: React.FC<{ vocabulaire: TrilingualTerm[] }> = ({
  vocabulaire,
}) => {
  if (!vocabulaire || vocabulaire.length === 0) return null;

  const hasExplanationCol = vocabulaire.some((v) => !!(v.symbolOrFormula || v.explanation));

  return (
    <div className="bg-[#FFFFFF] rounded-[16px] border border-[#EAE2DA] p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
        <Languages className="w-4 h-4" />
        <span>المصطلحات العلمية الأساسية · Vocabulaire Scientifique (العربية · Français)</span>
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-[#E2D9D0]">
        <table className="w-full text-right border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#F6F0EB] border-b border-[#E2D9D0] text-[#4A4A4A] font-bold">
              <th className="py-2.5 px-3.5 text-right w-[24%]">المصطلح بالعربية</th>
              <th className="py-2.5 px-3.5 text-left font-mono w-[26%]" dir="ltr">
                Terme en Français
              </th>
              {hasExplanationCol && (
                <th className="py-2.5 px-3.5 text-right w-[50%]">الرمز / الشرح العلمي</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE2DA]">
            {vocabulaire.map((v, idx) => (
              <tr key={idx} className="hover:bg-[#F6F0EB]/40 transition-colors align-top">
                <td className="py-2.5 px-3.5 font-bold text-[#4A4A4A]">{v.arabic}</td>
                <td
                  className="py-2.5 px-3.5 font-mono text-left text-[#0F766E] font-semibold"
                  dir="ltr"
                >
                  {v.french}
                </td>
                {hasExplanationCol && (
                  <td className="py-2.5 px-3.5 text-[#4A4A4A] leading-relaxed">
                    <div className="flex flex-wrap items-center gap-2">
                      {v.symbolOrFormula && (
                        <span className="px-2 py-0.5 rounded bg-[#F6F0EB] border border-[#E2D9D0] shrink-0">
                          <ChemicalFormula formula={v.symbolOrFormula} size="sm" />
                        </span>
                      )}
                      {v.explanation && <span><ChemPhysText text={v.explanation} /></span>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PhysicsSummarySection: React.FC<{
  resume?: string[];
  pointsEssentiels: {
    number: number;
    title: string;
    description: string;
    formulaOrSymbol?: string;
  }[];
  summarySchema?: PhysicsSchemaOrFigure;
  ideeCle?: string;
  noteFinale?: string;
}> = ({ resume, pointsEssentiels, summarySchema, ideeCle, noteFinale }) => {
  const theme = usePhysicsDomainTheme();
  const gridColsClass =
    pointsEssentiels && pointsEssentiels.length === 4
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-3';

  return (
    <div className="bg-[#FFFFFF] rounded-[16px] border border-[#EAE2DA] p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-[#EAE2DA] pb-2.5">
        <div className="flex items-center gap-2">
          <span
            style={{ backgroundColor: theme.primaryHex }}
            className="w-7 h-7 rounded-[8px] text-white font-mono font-bold text-xs flex items-center justify-center"
          >
            ★
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#4A4A4A]">
            الخلاصة — أحتفظ بـ (À retenir)
          </h2>
        </div>
        <span
          dir="ltr"
          style={{ color: theme.primaryHex }}
          className="text-xs font-mono font-semibold"
        >
          Synthèse du cours
        </span>
      </div>

      {resume && resume.length > 0 && (
        <div className="space-y-2 bg-[#FAF7F4] p-4 rounded-[12px] border border-[#E5DDD5]">
          {resume.map((paragraph, idx) => (
            <p key={idx} className="text-sm text-[#4A4A4A] leading-[1.85]">
              <ChemPhysText text={paragraph} />
            </p>
          ))}
        </div>
      )}

      {pointsEssentiels && pointsEssentiels.length > 0 && (
        <div className={`grid ${gridColsClass} gap-3`}>
          {pointsEssentiels.map((pt) => (
            <div
              key={pt.number}
              className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E5DDD5] flex flex-col justify-between gap-2.5"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    style={{ backgroundColor: theme.primaryHex }}
                    className="w-5 h-5 rounded-[6px] text-white font-bold text-xs flex items-center justify-center shrink-0"
                  >
                    {pt.number}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">{pt.title}</h4>
                </div>
                <p className="text-xs text-[#4A4A4A]/90 leading-relaxed">
                  <ChemPhysText text={pt.description} />
                </p>
              </div>

              {pt.formulaOrSymbol && (
                <div className="p-2 rounded-[8px] bg-white border border-[#E2D9D0] text-center" dir="ltr">
                  <ChemicalFormula formula={pt.formulaOrSymbol} size="sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {summarySchema && (
        <div className="pt-1">
          <PhysicsSchemaRenderer schema={summarySchema} />
        </div>
      )}

      {(ideeCle || noteFinale) && (
        <div
          style={{ borderColor: theme.softBorderHex }}
          className="p-3.5 rounded-[12px] bg-[#FAF7F4] border space-y-2"
        >
          <div className="flex items-center gap-2 text-xs font-bold" style={{ color: theme.primaryHex }}>
            <Lightbulb className="w-4 h-4" />
            <span>{ideeCle ? 'الفكرة التي يجب أن تبقى في ذهن التلميذ :' : 'تنبيه أمني ووقائي :'}</span>
          </div>
          {ideeCle && (
            <blockquote
              style={{
                backgroundColor: theme.softBgHex,
                borderRightColor: theme.primaryHex,
              }}
              className="p-3 rounded-[10px] border-r-4 text-xs sm:text-sm font-bold text-[#4A4A4A] leading-[1.85]"
            >
              <ChemPhysText text={ideeCle} />
            </blockquote>
          )}
          {noteFinale && (
            <p className="text-xs text-[#6B6B6B] leading-relaxed">
              <ChemPhysText text={noteFinale} />
            </p>
          )}
        </div>
      )}
    </div>
  );
};

