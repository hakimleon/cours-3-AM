import React, { useState } from 'react';
import {
  SvtTrilingualTerm,
  SvtDefinitionItem,
  SvtObservationItem,
  SvtInvestigationItem,
  SvtSchemaOrFigure,
  SvtTableItem,
  SvtDiscoveryActivity,
  SvtCommonMistakeItem,
  SvtApplicationQuestion,
  SvtIllustrationItem,
} from '../../typesSvt';
import { SvtSchemaRenderer } from './SvtSchemas';
import { useSvtDomainTheme } from './svtThemeTokens';
import { ZoomableCourseImage } from '../ImageLightbox';
import {
  BookOpen,
  Eye,
  Languages,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Table2,
  HelpCircle,
  AlertTriangle,
  Compass,
  FileText,
  Images,
  Sparkles,
} from 'lucide-react';

// ============================================================================
// 1. TRILINGUAL TERM BOX (المصطلحات العلمية المعتمدة)
// ============================================================================
export const SvtTrilingualTermBox: React.FC<{
  terms: SvtTrilingualTerm[];
  title?: string;
}> = ({ terms, title = 'المصطلحات العلمية المعتمدة (العربية · Français · English)' }) => {
  const theme = useSvtDomainTheme();
  if (!terms || terms.length === 0) return null;

  return (
    <div className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5">
      <div
        style={{ color: theme.primaryHex }}
        className="flex items-center gap-2 mb-3 text-xs font-bold"
      >
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
              <span className="text-sm font-bold text-[#4A4A4A]">{t.arabic}</span>

              <div
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
                className="text-left space-y-0.5 pt-1 border-t border-[#E2D9D0]/70"
              >
                <div
                  style={{ color: theme.primaryHex }}
                  className="text-xs font-bold font-mono"
                >
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
                {t.explanation}
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
export const SvtDefinitionBlock: React.FC<{ data: SvtDefinitionItem }> = ({ data }) => {
  const theme = useSvtDomainTheme();

  return (
    <div
      style={{ borderRightColor: theme.primaryHex }}
      className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] border-r-4 p-5 space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 shrink-0" style={{ color: theme.primaryHex }} />
          <h3 className="text-base font-bold text-[#4A4A4A]">{data.titleArabic}</h3>
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
        {data.contentArabic}
      </p>

      {data.contentFrench && (
        <p
          dir="ltr"
          style={{ unicodeBidi: 'isolate' }}
          className="text-xs sm:text-sm text-[#4A4A4A]/80 bg-[#F6F0EB]/60 p-3 rounded-[10px] border border-[#E5DDD5] text-left leading-relaxed"
        >
          {data.contentFrench}
        </p>
      )}

      {data.examples && data.examples.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#8C8C8C]">أمثلة واقعية :</span>
          {data.examples.map((ex, i) => (
            <span
              key={i}
              className="text-xs font-medium bg-[#F6F0EB] text-[#4A4A4A] px-2.5 py-1 rounded-[8px] border border-[#E2D9D0]"
            >
              {ex}
            </span>
          ))}
        </div>
      )}

      {data.note && (
        <div className="text-xs text-[#8C8C8C] pt-1 leading-relaxed">
          💡 {data.note}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. SCIENTIFIC OBSERVATION BLOCK (ملاحظة ميدانية / وثائقية)
// ============================================================================
export const SvtObservationBlock: React.FC<{ data: SvtObservationItem }> = ({ data }) => {
  const theme = useSvtDomainTheme();

  return (
    <div className="my-4 bg-[#F6F0EB]/70 rounded-[14px] border border-[#E2D9D0] p-4 sm:p-5 space-y-2">
      <div
        style={{ color: theme.primaryHex }}
        className="flex items-center justify-between gap-2 text-xs font-bold"
      >
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 shrink-0" />
          <span>ملاحظة علمية ميدانية : {data.title}</span>
        </div>
        {data.documentSource && (
          <span className="text-[11px] font-mono text-[#8C8C8C] bg-white px-2 py-0.5 rounded border border-[#E2D9D0]">
            المصدر: {data.documentSource}
          </span>
        )}
      </div>
      <p className="text-sm text-[#4A4A4A] leading-[1.85]">{data.description}</p>
      {data.scientificHighlight && (
        <div className="p-2.5 rounded-[8px] bg-white border border-[#E5DDD5] text-xs font-semibold text-[#15803D] mt-2">
          ✨ {data.scientificHighlight}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 4. SCIENTIFIC INVESTIGATION / EXPERIMENTAL PROTOCOL BLOCK (نشاط استقصائي)
// ============================================================================
export const SvtInvestigationBlock: React.FC<{ data: SvtInvestigationItem }> = ({ data }) => {
  const theme = useSvtDomainTheme();

  return (
    <div
      style={{ borderColor: `${theme.primaryHex}40` }}
      className="my-6 bg-[#FFFFFF] rounded-[16px] border-2 p-5 sm:p-6 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5DDD5] pb-3">
        <div className="flex items-center gap-2.5">
          <div
            style={{ backgroundColor: theme.primaryHex }}
            className="w-8 h-8 rounded-[10px] text-white flex items-center justify-center shrink-0 shadow-2xs"
          >
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div style={{ color: theme.primaryHex }} className="text-[11px] font-bold">
              {data.number ? `نشاط استقصائي ${data.number}` : 'نشاط استقصائي واستغلال وثائق'}
            </div>
            <h3 className="text-base font-bold text-[#4A4A4A]">{data.titleArabic}</h3>
          </div>
        </div>

        {data.titleFrench && (
          <span
            dir="ltr"
            style={{
              color: theme.primaryHex,
              backgroundColor: theme.softBgHex,
            }}
            className="text-xs font-mono font-semibold px-2.5 py-1 rounded-[8px]"
          >
            {data.titleFrench}
          </span>
        )}
      </div>

      {data.objective && (
        <div className="text-xs sm:text-sm bg-[#F6F0EB]/60 p-3 rounded-[10px] border border-[#E2D9D0] text-[#4A4A4A]">
          <span style={{ color: theme.primaryHex }} className="font-bold ml-1">
            الهدف من النشاط :
          </span>
          {data.objective}
        </div>
      )}

      {data.materialsOrDocuments && data.materialsOrDocuments.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-[#8C8C8C]">
            السندات والوثائق المعتمدة :
          </div>
          <div className="flex flex-wrap gap-2">
            {data.materialsOrDocuments.map((m, idx) => (
              <span
                key={idx}
                className="text-xs bg-[#F6F0EB] text-[#4A4A4A] px-2.5 py-1 rounded-[8px] border border-[#E2D9D0]"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.schemaType && (
        <SvtSchemaRenderer
          schema={{
            id: `inv-schema-${data.id || '1'}`,
            titleArabic: data.schemaCaption || data.titleArabic,
            type: data.schemaType,
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Steps */}
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2">
          <div className="text-xs font-bold text-[#4A4A4A]">
            1. خطوات البحث والدراسة
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#4A4A4A] list-disc pr-4 leading-relaxed">
            {data.protocolSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>

        {/* Observations */}
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2">
          <div style={{ color: theme.primaryHex }} className="text-xs font-bold">
            2. الملاحظات والبيانات المسجلة
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#4A4A4A] list-disc pr-4 leading-relaxed">
            {data.observations.map((obs, i) => (
              <li key={i}>{obs}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interpretation & Conclusion */}
      <div
        style={{
          backgroundColor: `${theme.primaryHex}0A`,
          borderColor: `${theme.primaryHex}30`,
        }}
        className="p-4 rounded-[12px] border space-y-2"
      >
        <div style={{ color: theme.primaryHex }} className="text-xs font-bold">
          3. التفسير والاستنتاج العلمي
        </div>
        <ul className="space-y-1.5 text-xs sm:text-sm text-[#4A4A4A] list-disc pr-4 leading-relaxed">
          {data.interpretation.map((interp, i) => (
            <li key={i}>{interp}</li>
          ))}
        </ul>

        {data.conclusion && (
          <p
            style={{ color: theme.primaryHex }}
            className="text-xs sm:text-sm font-bold pt-2 border-t border-[#EAE2DA]"
          >
            {data.conclusion}
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 5. SCIENTIFIC TABLE BLOCK
// ============================================================================
export const SvtTableBlock: React.FC<{ data: SvtTableItem }> = ({ data }) => {
  const theme = useSvtDomainTheme();

  return (
    <div className="my-5 bg-[#FFFFFF] rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Table2 className="w-4 h-4" style={{ color: theme.primaryHex }} />
          <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            {data.titleArabic}
          </h4>
        </div>
        {data.titleFrench && (
          <span
            dir="ltr"
            className="text-xs font-mono font-medium text-[#475569]"
          >
            {data.titleFrench}
          </span>
        )}
      </div>

      {data.subtitle && (
        <p className="text-xs text-[#6B6B6B]">{data.subtitle}</p>
      )}

      <div className="overflow-x-auto rounded-[12px] border border-[#E2D9D0]">
        <table className="w-full text-right border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#F6F0EB] border-b border-[#E2D9D0] text-[#4A4A4A] font-bold">
              {data.headers.map((h, idx) => (
                <th key={idx} className="py-3 px-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE2DA]">
            {data.rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-[#F6F0EB]/40 transition-colors">
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className="py-3 px-4 text-[#4A4A4A] align-middle leading-relaxed"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.footerNote && (
        <p className="text-xs text-[#8C8C8C] pt-1">💡 {data.footerNote}</p>
      )}
    </div>
  );
};

// ============================================================================
// 6. SCIENTIFIC ILLUSTRATION BLOCK (Association d'illustrations ciblées)
// ============================================================================
export const SvtIllustrationBlock: React.FC<{
  illustration: SvtIllustrationItem;
}> = ({ illustration }) => {
  const theme = useSvtDomainTheme();

  return (
    <div className="my-5 bg-white rounded-[16px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: theme.primaryHex }}
            className="w-7 h-7 rounded-[8px] text-white flex items-center justify-center shrink-0 shadow-2xs"
          >
            <Images className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
              {illustration.titleArabic}
            </h4>
            <p className="text-[11px] text-[#8C8C8C] leading-none mt-0.5">
              الدور البيداغوجي : {illustration.pedagogicalRole}
            </p>
          </div>
        </div>

        {illustration.titleFrench && (
          <span
            dir="ltr"
            style={{ color: theme.primaryHex }}
            className="text-xs font-mono font-semibold"
          >
            {illustration.titleFrench}
          </span>
        )}
      </div>

      {illustration.imageSrc ? (
        <ZoomableCourseImage
          src={illustration.imageSrc}
          alt={illustration.alt}
          captionArabic={illustration.captionArabic}
          captionFrench={illustration.captionFrench}
          courseBadge={illustration.courseBadge || 'علوم الطبيعة والحياة'}
        />
      ) : illustration.schemaType ? (
        <SvtSchemaRenderer
          schema={{
            id: illustration.id,
            titleArabic: illustration.titleArabic,
            titleFrench: illustration.titleFrench,
            type: illustration.schemaType,
            caption: illustration.captionArabic,
          }}
        />
      ) : null}

      <div className="p-2.5 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] text-xs text-[#4A4A4A] flex items-center justify-between gap-2">
        <span className="font-semibold">{illustration.captionArabic}</span>
        {illustration.captionFrench && (
          <span dir="ltr" className="text-[11px] font-mono text-[#8C8C8C]">
            {illustration.captionFrench}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 7. DISCOVERY ACTIVITY (وضعية الانطلاق والاستكشاف)
// ============================================================================
export const SvtDiscoveryBlock: React.FC<{
  data: SvtDiscoveryActivity;
}> = ({ data }) => {
  const theme = useSvtDomainTheme();

  return (
    <div
      style={{ borderColor: theme.softBorderHex }}
      className="my-3 rounded-[16px] border bg-[#FAF7F4] p-4 sm:p-5 space-y-4 shadow-2xs"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D9D0] pb-2.5">
        <div className="flex items-center gap-2.5">
          <span
            style={{ backgroundColor: theme.primaryHex }}
            className="w-7 h-7 rounded-[8px] text-white font-bold text-xs flex items-center justify-center shrink-0"
          >
            1
          </span>
          <h2 className="text-base sm:text-lg font-bold text-[#4A4A4A]">
            {data.titleArabic}
          </h2>
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

      {/* 1. Situation concrète */}
      <div className="space-y-2.5">
        <div className="text-xs font-bold" style={{ color: theme.primaryHex }}>
          1. وضعية واقعية من المحيط الجيولوجي (Situation concrète) :
        </div>
        <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.85] whitespace-pre-line">
          {data.situationConcrete}
        </p>
        {data.situationsReelles && data.situationsReelles.length > 0 && (
          <ul className="space-y-1.5 pr-5 list-disc text-xs sm:text-sm text-[#4A4A4A] bg-white p-3.5 rounded-[10px] border border-[#E5DDD5]">
            {data.situationsReelles.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Associated Schema or Illustration if present */}
      {data.schema && <SvtSchemaRenderer schema={data.schema} />}
      {data.illustration && <SvtIllustrationBlock illustration={data.illustration} />}
      {data.observationTable && <SvtTableBlock data={data.observationTable} />}

      {/* 2. Questions guidées */}
      {data.guidedQuestions && data.guidedQuestions.length > 0 && (
        <div className="space-y-2 bg-white p-3.5 sm:p-4 rounded-[12px] border border-[#E5DDD5]">
          <div
            style={{ color: theme.primaryHex }}
            className="text-xs font-bold flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>2. التساؤلات والأسئلة الاستكشافية الموجهة (فكّر وفسّر) :</span>
          </div>
          <ol className="space-y-2 pr-5 list-decimal text-xs sm:text-sm text-[#4A4A4A] font-medium">
            {data.guidedQuestions.map((q, idx) => (
              <li key={idx} className="leading-relaxed">
                {q}
              </li>
            ))}
          </ol>

          {data.hint && (
            <div className="mt-2 p-2.5 rounded-[8px] bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              💡 <strong>إضاءة مساعدة : </strong> {data.hint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 8. COMMON MISTAKES BLOCK
// ============================================================================
export const SvtCommonMistakesBlock: React.FC<{
  items: SvtCommonMistakeItem[];
}> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-5 bg-white rounded-[16px] border border-rose-200 p-4 sm:p-5 space-y-3.5 shadow-2xs">
      <div className="flex items-center gap-2 text-rose-800 text-sm font-bold border-b border-rose-100 pb-2">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>احذر من الأخطاء والخلط المفاهيمي الشائع في هذا الدرس</span>
      </div>

      <div className="space-y-3">
        {items.map((m, idx) => (
          <div
            key={m.id || idx}
            className="p-3 rounded-[12px] bg-rose-50/50 border border-rose-200/80 space-y-2 text-xs"
          >
            <div className="font-bold text-rose-950 text-xs sm:text-[13px]">
              {idx + 1}. {m.title}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-2 rounded bg-white border border-rose-200 text-rose-800">
                <span className="font-bold text-rose-900">❌ الشائع الخاطئ : </span>
                {m.incorrect}
              </div>
              <div className="p-2 rounded bg-white border border-emerald-300 text-emerald-800">
                <span className="font-bold text-emerald-900">✅ التفسير العلمي الصحيح : </span>
                {m.correct}
              </div>
            </div>
            {m.whyExplanation && (
              <p className="text-[11.5px] text-[#4A4A4A] leading-relaxed pt-1">
                <strong>السبب العلمي : </strong> {m.whyExplanation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 9. APPLICATION QUESTION / EXERCISE WITH STEP-BY-STEP CORRECTION
// ============================================================================
export const SvtApplicationCard: React.FC<{
  question: SvtApplicationQuestion;
}> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSvtDomainTheme();

  return (
    <div className="application-enonce-group my-5 bg-white rounded-[16px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <div className="flex items-center gap-2">
          <span
            style={{ backgroundColor: theme.primaryHex }}
            className="w-7 h-7 rounded-[8px] text-white font-bold text-xs flex items-center justify-center shrink-0"
          >
            {question.number}
          </span>
          <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            {question.title}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {question.points && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-[8px] bg-amber-100 text-amber-900 border border-amber-300">
              {question.points}
            </span>
          )}
          {question.difficultyLabel && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {question.difficultyLabel}
            </span>
          )}
        </div>
      </div>

      {question.measuredObjectives && question.measuredObjectives.length > 0 && (
        <div className="text-[11px] font-mono text-[#8C8C8C]">
          الأهداف المقاسة : {question.measuredObjectives.join('، ')}
        </div>
      )}

      <p className="text-xs sm:text-sm text-[#4A4A4A] leading-[1.85] whitespace-pre-line">
        {question.prompt}
      </p>

      {question.documentOrData && (
        <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] text-xs text-[#4A4A4A] leading-relaxed">
          <strong>السند العلمي : </strong> {question.documentOrData}
        </div>
      )}

      {question.table && <SvtTableBlock data={question.table} />}

      {question.subQuestions && question.subQuestions.length > 0 && (
        <ol className="space-y-1.5 pr-5 list-decimal text-xs sm:text-sm text-[#4A4A4A] font-medium">
          {question.subQuestions.map((sq, idx) => (
            <li key={idx} className="leading-relaxed">
              {sq}
            </li>
          ))}
        </ol>
      )}

      {question.hint && (
        <div className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-[8px] border border-amber-200">
          💡 <strong>إرشاد منهجي : </strong> {question.hint}
        </div>
      )}

      {/* Solution Toggle */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{ borderColor: theme.primaryHex, color: theme.primaryHex }}
          className="no-pdf inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] border hover:opacity-90 hover:text-white hover:bg-current text-xs font-bold transition-all cursor-pointer"
        >
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{isOpen ? 'إخفاء عناصر الإجابة والحل' : 'عرض الحل والتصحيح النموذجي المفصل'}</span>
        </button>

        <div className={isOpen ? '' : 'hidden print:block pdf-export-mode:block'}>
          <div className="mt-3 p-4 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-3">
            {question.correctionSteps.map((st, idx) => (
              <div key={idx} className="space-y-1">
                <div
                  style={{ color: theme.primaryHex }}
                  className="text-xs font-bold flex items-center justify-between"
                >
                  <span>{idx + 1}. {st.title}</span>
                  {st.points && (
                    <span className="text-[11px] font-mono text-[#8C8C8C]">({st.points})</span>
                  )}
                </div>
                {st.explanation && (
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed whitespace-pre-line">
                    {st.explanation}
                  </p>
                )}
              </div>
            ))}

            <div
              style={{
                backgroundColor: `${theme.primaryHex}10`,
                borderColor: `${theme.primaryHex}35`,
                color: theme.primaryHex,
              }}
              className="p-3 rounded-[10px] border flex items-start gap-2 text-xs sm:text-sm font-bold"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="whitespace-pre-line leading-relaxed">
                <span>النتيجة والخلاصة المنهجية : </span>
                {question.finalAnswer}
              </div>
            </div>

            {question.commonMistake && (
              <div className="p-3 rounded-[10px] bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                  <span>خطأ شائع يجب تفاديه :</span>
                </span>
                <p className="text-[11.5px] leading-relaxed text-rose-800">
                  {question.commonMistake}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 10. EMBEDDED QUESTION BLOCK (سؤال مدمج مع إجابة قابلة للإظهار)
// ============================================================================
export const SvtEmbeddedQuestionBlock: React.FC<{
  question: string;
  answer: string;
  number?: string;
}> = ({ question, answer, number }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const theme = useSvtDomainTheme();

  return (
    <div className="my-4 p-4 rounded-[14px] bg-[#FAF7F4] border border-[#E5DDD5] space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            style={{ backgroundColor: theme.primaryHex }}
            className="px-2 py-0.5 rounded text-white text-[11px] font-bold shrink-0"
          >
            {number ? `سؤال مدمج ${number}` : 'سؤال مدمج'}
          </span>
          <h5 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
            {question}
          </h5>
        </div>

        <button
          type="button"
          onClick={() => setShowAnswer(!showAnswer)}
          style={{ color: theme.primaryHex }}
          className="no-pdf text-xs font-bold hover:underline shrink-0 cursor-pointer"
        >
          {showAnswer ? 'إخفاء الإجابة' : 'عرض الإجابة'}
        </button>
      </div>

      <div
        className={`p-3 rounded-[10px] bg-white border border-[#E2D9D0] text-xs sm:text-[13px] text-[#15803D] font-medium leading-relaxed ${
          showAnswer ? 'block' : 'hidden print:block pdf-export-mode:block'
        }`}
      >
        <span className="font-bold text-[#15803D]">الإجابة : </span>
        {answer}
      </div>
    </div>
  );
};
