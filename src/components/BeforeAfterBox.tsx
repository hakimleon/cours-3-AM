import React, { useState } from 'react';
import { MathView } from './MathView';
import { ArrowLeft, ArrowDown, Sparkles, CheckCircle2, FileSpreadsheet, LayoutGrid, ListOrdered } from 'lucide-react';

interface BeforeAfterBoxProps {
  id?: string;
  before: string;
  transformation: string;
  result: string;
  explanation?: string;
}

/**
 * Parses transformation string into distinct steps if it contains numbered steps (e.g., 1) ... 2) ...)
 * or explicit multi-line math separators.
 */
function parseTransformationSteps(raw: string): string[] {
  if (!raw) return [];

  // Match explicit step numbering like "1) ", "2) ", etc., preceded by start, \quad, newline or semicolon
  const stepRegex = /(?:^|\\quad\s*|\n\s*|;\s*)([1-9])\)\s+/g;
  const matches: { index: number; stepNum: number; length: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = stepRegex.exec(raw)) !== null) {
    matches.push({ index: match.index, stepNum: parseInt(match[1], 10), length: match[0].length });
  }

  // Verify that matches form a consecutive sequence: 1, 2, 3...
  if (matches.length > 1 && matches[0].stepNum === 1) {
    let isConsecutive = true;
    for (let i = 1; i < matches.length; i++) {
      if (matches[i].stepNum !== matches[i - 1].stepNum + 1) {
        isConsecutive = false;
        break;
      }
    }

    if (isConsecutive) {
      const steps: string[] = [];
      for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index + matches[i].length;
        const end = i + 1 < matches.length ? matches[i + 1].index : raw.length;
        let part = raw.slice(start, end).trim();
        // Remove trailing \quad or \
        part = part.replace(/\\quad\s*$/, '').trim();
        steps.push(part);
      }
      return steps;
    }
  }

  // Check for explicit newlines or double-backslash line breaks (outside of \frac or \text)
  if (raw.includes('\n')) {
    const lines = raw.split('\n').map((s) => s.trim()).filter(Boolean);
    if (lines.length > 1) return lines;
  }

  return [raw];
}

/**
 * Parses math parts for givens (before) and result if they contain distinct comma-quad clauses
 */
function parseMathParts(raw: string): string[] {
  if (!raw) return [];
  const steps = parseTransformationSteps(raw);
  if (steps.length > 1) return steps;

  // If separated by comma followed by \quad
  if (raw.includes(', \\quad') || raw.includes(',\\quad')) {
    const parts = raw.split(/,\s*\\quad\s*/).map((s) => s.trim()).filter(Boolean);
    if (parts.length > 1 && parts.every((p) => p.length < 50)) {
      return parts;
    }
  }

  return [raw];
}

export const BeforeAfterBox: React.FC<BeforeAfterBoxProps> = ({
  id,
  before,
  transformation,
  result,
  explanation,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');

  const transformationSteps = parseTransformationSteps(transformation);
  const beforeParts = parseMathParts(before);
  const resultParts = parseMathParts(result);

  return (
    <div
      id={id}
      className="my-6 p-5 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
    >
      {/* Box Header with View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
              المعالجة المنهجية خطوة بخطوة
            </span>
            {transformationSteps.length > 1 && (
              <span className="bg-indigo-50 text-indigo-700 font-bold text-[11px] px-2 py-0.5 rounded-full border border-indigo-200/70">
                {transformationSteps.length} مراحل مفصلة
              </span>
            )}
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-800 mt-1">
            تسلسل خطوات الحل: المعطيات ← التحويل والتطبيق ← النتيجة النهائية
          </h3>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'cards'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>البطاقات المتجاورة</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'timeline'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>المسار المفصل</span>
          </button>
        </div>
      </div>

      {/* MODE 1: Wide Cards Grid (Every formula card is >= 280px wide; Transformation spans full width) */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 lg:gap-5 items-stretch">
          {/* Card 1: Avant / Givens (>= 280px) */}
          <div className="min-w-[280px] p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 flex flex-col justify-between transition-all hover:border-slate-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-200 text-slate-700 font-mono font-bold text-xs px-2.5 py-0.5 rounded-md">
                    01
                  </span>
                  <span className="text-xs font-bold text-slate-700">المعطيات الأولية</span>
                </div>
                <FileSpreadsheet className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-500 mb-3 font-medium">الحالة الأصلية للمسألة أو العملية</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 min-h-[90px] flex flex-col justify-center items-center gap-1.5 text-center my-1 shadow-2xs overflow-x-auto max-w-full">
              {beforeParts.length > 1 ? (
                <div className="space-y-1.5 w-full">
                  {beforeParts.map((part, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60 text-xs sm:text-sm font-semibold text-slate-800 overflow-x-auto whitespace-nowrap scrollbar-thin"
                      dir="ltr"
                    >
                      <MathView math={part} />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="w-full text-center text-sm sm:text-base font-bold text-slate-800 overflow-x-auto whitespace-nowrap py-1 scrollbar-thin"
                  dir="ltr"
                >
                  <MathView math={before} block />
                </div>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
              <span>نقطة الانطلاق</span>
              <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
                <span>تطبيق القاعدة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: Result (>= 280px beside Givens on wide screens) */}
          <div className="min-w-[280px] p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 flex flex-col justify-between transition-all hover:border-emerald-300 md:order-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-md">
                    03
                  </span>
                  <span className="text-xs font-bold text-emerald-900">النتيجة النهائية / الاستنتاج</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <p className="text-[11px] text-emerald-700/90 mb-3 font-medium">الناتج المبسط أو البرهان التام</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-emerald-200/80 p-3.5 min-h-[90px] flex flex-col justify-center items-center gap-1.5 text-center my-1 shadow-2xs overflow-x-auto max-w-full">
              {resultParts.length > 1 ? (
                <div className="space-y-1.5 w-full">
                  {resultParts.map((part, idx) => (
                    <div
                      key={idx}
                      className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 text-xs sm:text-sm font-bold text-emerald-950 overflow-x-auto whitespace-nowrap scrollbar-thin"
                      dir="ltr"
                    >
                      <MathView math={part} />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="w-full text-center text-sm sm:text-base md:text-lg font-bold text-emerald-950 leading-normal overflow-x-auto whitespace-nowrap py-1 scrollbar-thin"
                  dir="ltr"
                >
                  <MathView math={result} block />
                </div>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-700">
              <span>الحل المعتمد</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>مؤطر ودقيق</span>
              </span>
            </div>
          </div>

          {/* Card 2: Transformation (Full Width col-span-full so multi-step equations fit on a single line) */}
          <div className="col-span-full min-w-[280px] p-4 sm:p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 flex flex-col justify-between transition-all hover:border-indigo-300 md:order-2">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-600 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-md">
                    02
                  </span>
                  <span className="text-xs font-bold text-indigo-900">
                    خطوة التحويل والتطبيق · صلب المعالجة
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              </div>
              <p className="text-[11px] text-indigo-700/90 mb-3 font-medium">
                تطبيق المبرهنة، تفكيك العمليات أو فحص الشروط الهندسية والحسابية
              </p>
            </div>

            {/* Content - Step by Step or Single View */}
            <div className="bg-white rounded-xl border border-indigo-100 p-3 sm:p-4 min-h-[90px] flex flex-col justify-center items-center my-1 shadow-2xs overflow-x-auto max-w-full">
              {transformationSteps.length > 1 ? (
                <div className="space-y-2 w-full">
                  {transformationSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-indigo-50/40 hover:bg-indigo-50/70 transition-colors rounded-lg border border-indigo-100/90 p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 text-indigo-950"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center font-mono shadow-2xs">
                        {idx + 1}
                      </span>
                      <div
                        className="flex-1 text-center font-semibold text-xs sm:text-sm md:text-base overflow-x-auto whitespace-nowrap py-0.5 scrollbar-thin"
                        dir="ltr"
                      >
                        <MathView math={step} inline />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="w-full text-center text-sm sm:text-base md:text-lg font-bold text-indigo-900 leading-normal overflow-x-auto whitespace-nowrap py-1 scrollbar-thin"
                  dir="ltr"
                >
                  <MathView math={transformation} block />
                </div>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-indigo-100 flex items-center justify-between text-xs text-indigo-700">
              <span className="font-medium">
                {transformationSteps.length > 1
                  ? `${transformationSteps.length} خطوات متتالية`
                  : 'معالجة مباشرة'}
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <span>نستنتج الحل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: Timeline Pipeline View (Spacious linear sequence) */
        <div className="space-y-4">
          {/* Stage 1: Givens */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                01
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-800">المعطيات والانطلاق</h4>
                <p className="text-xs text-slate-500">الحالة الأصلية للمسألة المعطاة</p>
              </div>
            </div>
            <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-800 overflow-x-auto whitespace-nowrap max-w-full" dir="ltr">
              <MathView math={before} />
            </div>
          </div>

          {/* Transition indicator */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-indigo-600 py-1">
            <ArrowDown className="w-4 h-4 text-indigo-500" />
            <span>نطبق المبرهنة وقواعد الحساب خطوة بخطوة</span>
          </div>

          {/* Stage 2: Transformation Steps */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                  02
                </span>
                <div>
                  <h4 className="text-sm font-bold text-indigo-950">خطوات التحويل والتطبيق المنهجي</h4>
                  <p className="text-xs text-indigo-700/80">تطبيق القواعد وفحص الشروط الهندسية والحسابية</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-100/70 px-2.5 py-1 rounded-full">
                {transformationSteps.length} {transformationSteps.length > 1 ? 'مراحل' : 'مرحلة'}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {transformationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-indigo-100 p-3 sm:p-4 flex items-center gap-3 shadow-2xs"
                >
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                    {idx + 1}
                  </span>
                  <div className="flex-1 text-center font-bold text-sm sm:text-base text-indigo-950 overflow-x-auto whitespace-nowrap py-0.5" dir="ltr">
                    <MathView math={step} inline />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transition indicator */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 py-1">
            <ArrowDown className="w-4 h-4 text-emerald-500" />
            <span>استنتاج النتيجة الرياضية النهائية المعتمدة</span>
          </div>

          {/* Stage 3: Result */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                03
              </span>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">النتيجة النهائية / الاستنتاج</h4>
                <p className="text-xs text-emerald-700/80">البرهان التام والحل المؤطر</p>
              </div>
            </div>
            <div className="bg-white px-5 py-3 rounded-xl border border-emerald-200 font-bold text-emerald-950 text-base sm:text-lg overflow-x-auto whitespace-nowrap max-w-full shadow-2xs" dir="ltr">
              <MathView math={result} />
            </div>
          </div>
        </div>
      )}

      {/* Methodological Explanation */}
      {explanation && (
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/80 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-sm font-bold mt-0.5 shadow-2xs">
            💡
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-bold text-slate-800 text-xs sm:text-sm block mb-1">
              الشرح المنهجي لمراحل الحل:
            </span>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <MathView math={explanation} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
