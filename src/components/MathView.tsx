import React, { useMemo } from 'react';
import katex from 'katex';
import { FUNDAMENTAL_CONCEPTS } from '../data/fundamentalConceptsData';
import { useConceptModal } from './ConceptReminderModal';

interface MathViewProps {
  math: string;
  block?: boolean;
  inline?: boolean;
  className?: string;
  id?: string;
}

const SUPERSCRIPT_MAP: Record<string, string> = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9',
  '⁺': '+',
  '⁻': '-',
  'ⁿ': 'n',
};

// Build sorted keyword lookup from longest to shortest
const KEYWORD_TO_CONCEPT_ID: { keyword: string; conceptId: string; termAr: string }[] = [];
FUNDAMENTAL_CONCEPTS.forEach((concept) => {
  concept.keywords.forEach((kw) => {
    KEYWORD_TO_CONCEPT_ID.push({
      keyword: kw,
      conceptId: concept.id,
      termAr: concept.termAr,
    });
  });
});
KEYWORD_TO_CONCEPT_ID.sort((a, b) => b.keyword.length - a.keyword.length);

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const CONCEPT_KEYWORDS_PATTERN = KEYWORD_TO_CONCEPT_ID.map((k) => escapeRegExp(k.keyword)).join('|');
const CONCEPT_REGEX = new RegExp(
  `(^|[\\s(«،:؛"'])([وفبلك]?)(${CONCEPT_KEYWORDS_PATTERN})(?=$|[\\s)»،.!:؛؟"'])`,
  'g'
);

const InteractiveConceptText: React.FC<{ text: string }> = ({ text }) => {
  const { openConceptById } = useConceptModal();

  const nodes = useMemo(() => {
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const regex = new RegExp(CONCEPT_REGEX.source, 'g');
    const seenConceptsInChunk = new Set<string>();

    while ((match = regex.exec(text)) !== null) {
      const leadingSep = match[1] || '';
      const arabicPrefix = match[2] || '';
      const matchedTerm = match[3];
      const fullMatchedWord = arabicPrefix + matchedTerm;
      const termStartIndex = match.index + leadingSep.length;

      if (termStartIndex > lastIndex) {
        result.push(text.slice(lastIndex, termStartIndex));
      }

      const found = KEYWORD_TO_CONCEPT_ID.find((k) => k.keyword === matchedTerm);
      // Highlight the first occurrence of each concept in a paragraph so it stays clean and readable
      if (found && !seenConceptsInChunk.has(found.conceptId)) {
        seenConceptsInChunk.add(found.conceptId);
        result.push(
          <span
            key={termStartIndex}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              openConceptById(found.conceptId);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                openConceptById(found.conceptId);
              }
            }}
            title={`اضغط للتذكير بتعريف وقاعدة: ${found.termAr}`}
            className="inline-flex items-baseline gap-1 px-1 py-0 mx-0.5 text-[#C94BA6] border-b border-dotted border-[#C94BA6] hover:bg-[#C94BA6]/10 font-bold cursor-pointer transition-colors rounded-xs"
          >
            <span>{fullMatchedWord}</span>
            <span className="text-[9px] font-bold text-[#C94BA6] leading-none">
              ؟
            </span>
          </span>
        );
      } else {
        result.push(fullMatchedWord);
      }

      lastIndex = termStartIndex + fullMatchedWord.length;
    }

    if (result.length === 0) {
      return text;
    }

    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }

    return result;
  }, [text, openConceptById]);

  return <>{nodes}</>;
};

/**
 * Converts any inline power expressions (with Unicode superscripts like 10⁻ⁿ, (-a)ⁿ, 10⁷⁺¹, (-1)²⁰²⁶
 * or caret powers like 10^-2, a^n) inside Arabic/French plain text into clean HTML <sup> elements
 * wrapped in an LTR math span, AND makes fundamental geometric/math concepts clickable.
 */
export function formatTextWithSuperscripts(
  text?: string,
  enableConcepts: boolean = true
): React.ReactNode {
  if (!text) return null;

  // Match a base token followed by either Unicode superscripts or ^exponent
  const powerRegex = /((?:\(-?[a-zA-Z0-9]+\)|-?[a-zA-Z0-9]+))(?:([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿ]+)|\^(\{[^}]+\}|-?[a-zA-Z0-9+-]+))/g;

  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = powerRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      const plainSlice = text.slice(lastIdx, match.index);
      parts.push(
        enableConcepts ? (
          <InteractiveConceptText key={`txt-${lastIdx}`} text={plainSlice} />
        ) : (
          plainSlice
        )
      );
    }

    const base = match[1];
    const unicodeSup = match[2];
    const caretSup = match[3];

    const expText = unicodeSup
      ? unicodeSup
          .split('')
          .map((ch) => SUPERSCRIPT_MAP[ch] ?? ch)
          .join('')
      : caretSup.replace(/^\{|\}$/g, '');

    parts.push(
      <span
        key={`pow-${match.index}`}
        dir="ltr"
        className="inline-block font-serif whitespace-nowrap mx-0.5"
      >
        <span>{base}</span>
        <sup className="text-[0.76em] font-semibold leading-none ml-[1px]">{expText}</sup>
      </span>
    );

    lastIdx = powerRegex.lastIndex;
  }

  if (parts.length === 0) {
    return enableConcepts ? <InteractiveConceptText text={text} /> : text;
  }

  if (lastIdx < text.length) {
    const tailSlice = text.slice(lastIdx);
    parts.push(
      enableConcepts ? (
        <InteractiveConceptText key={`txt-${lastIdx}`} text={tailSlice} />
      ) : (
        tailSlice
      )
    );
  }

  return <>{parts}</>;
}

function renderKaTeXString(latex: string, displayMode: boolean = false): string {
  try {
    let cleanLatex = latex.trim().replace(/\\+$/, '').trim();

    // Normalize any accidental Unicode superscripts into proper LaTeX ^{...}
    cleanLatex = cleanLatex.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿ]+/g, (seq) => {
      const mapped = seq
        .split('')
        .map((ch) => SUPERSCRIPT_MAP[ch] ?? ch)
        .join('');
      return `^{${mapped}}`;
    });

    let rendered = katex.renderToString(cleanLatex, {
      displayMode,
      throwOnError: false,
      strict: false,
    });

    // If KaTeX produced an error span, suppress the bright red text color and technical parse error tooltip
    if (rendered.includes('katex-error')) {
      rendered = rendered
        .replace(/style="color:#cc0000;?"/g, 'style="color: inherit;"')
        .replace(/title="ParseError:[^"]*"/g, '');
    }

    // Fix KaTeX's composite \neq rendering in RTL and fallback font environments.
    rendered = rendered.replace(
      /<span class="mrel"><span class="mrel"><span class="mord katex-vbox">[\s\S]*?<span class="mrel">=<\/span><\/span>/g,
      '<span class="mrel" style="font-family: KaTeX_Main, serif, system-ui, sans-serif; font-size: 1.05em; line-height: 1;">≠</span>'
    );

    return rendered;
  } catch {
    return latex;
  }
}

/**
 * Splits a single clause at a middle top-level '=' if the clause is long and contains multiple '=' signs
 * (e.g. "BC^2 = AB^2 + AC^2 = 15^2 + 20^2 = 225 + 400 = 625").
 */
function splitLongEqualityChain(clause: string): string[] {
  if (clause.length <= 34) return [clause];

  const eqIndices: number[] = [];
  let braceDepth = 0;
  for (let i = 0; i < clause.length; i++) {
    const ch = clause[i];
    if (ch === '{') braceDepth++;
    else if (ch === '}') braceDepth = Math.max(0, braceDepth - 1);
    else if (
      ch === '=' &&
      braceDepth === 0 &&
      clause[i - 1] !== '!' &&
      clause[i - 1] !== '<' &&
      clause[i - 1] !== '>' &&
      clause[i + 1] !== '='
    ) {
      eqIndices.push(i);
    }
  }

  if (eqIndices.length < 2) return [clause];

  // Pick the '=' closest to the middle of the string (after the first '=')
  const mid = clause.length / 2;
  let splitEqIdx = eqIndices[1];
  let bestDist = Math.abs(splitEqIdx - mid);
  for (let k = 1; k < eqIndices.length; k++) {
    const dist = Math.abs(eqIndices[k] - mid);
    if (dist < bestDist) {
      bestDist = dist;
      splitEqIdx = eqIndices[k];
    }
  }

  const leftPart = clause.slice(0, splitEqIdx).trim();
  const rightPart = clause.slice(splitEqIdx).trim();
  if (!leftPart || !rightPart) return [clause];
  return [leftPart, rightPart];
}

/**
 * Splits a LaTeX expression at top-level (braceDepth === 0) separators and implication arrows
 * (\quad ; \quad, \; , \;, \implies, \iff, \Longrightarrow, \Longleftrightarrow)
 * so multi-part formulas stay on one line when space allows and wrap cleanly without clipping in narrow boxes.
 */
function splitTopLevelMathClauses(latex: string): string[] {
  const cleaned = latex.trim().replace(/\\+$/, '').trim();
  const rawClauses: string[] = [];
  let current = '';
  let braceDepth = 0;
  let i = 0;

  while (i < cleaned.length) {
    const ch = cleaned[i];
    if (ch === '{') {
      braceDepth++;
      current += ch;
      i++;
      continue;
    }
    if (ch === '}') {
      braceDepth = Math.max(0, braceDepth - 1);
      current += ch;
      i++;
      continue;
    }

    if (braceDepth === 0) {
      const rest = cleaned.slice(i);

      // 1. Check top-level spaced separators like \quad ; \quad or \; , \;
      const sepMatch = rest.match(
        /^(?:\\quad|\\;|\\,|\s)*(?:([;,])(?:\\quad|\\;|\\,|\s)+|\\quad\s+)/
      );
      if (sepMatch && sepMatch[0].length > 1 && current.trim().length > 0) {
        const punct = sepMatch[1] ? ` ${sepMatch[1]}` : '';
        rawClauses.push((current + punct).trim());
        current = '';
        i += sepMatch[0].length;
        continue;
      }

      // 2. Check top-level logical arrows (\implies, \iff, \Longrightarrow, \Longleftrightarrow, \Rightarrow, \Leftrightarrow)
      const arrowMatch = rest.match(
        /^(\\implies|\\iff|\\Longrightarrow|\\Longleftrightarrow|\\Rightarrow|\\Leftrightarrow)\b/
      );
      if (arrowMatch && current.trim().length > 0) {
        rawClauses.push(current.trim());
        current = arrowMatch[1] + ' ';
        i += arrowMatch[1].length;
        continue;
      }
    }

    current += ch;
    i++;
  }

  if (current.trim().length > 0) {
    rawClauses.push(current.trim());
  }

  const baseClauses = rawClauses.length > 0 ? rawClauses : [cleaned];
  const finalClauses: string[] = [];
  for (const cl of baseClauses) {
    finalClauses.push(...splitLongEqualityChain(cl));
  }
  return finalClauses;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  block = false,
  className = '',
  id,
}) => {
  const hasArabic = useMemo(() => {
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(math || '');
  }, [math]);

  if (!math) return null;

  const hasCustomTextColor = /\btext-(white|slate|emerald|indigo|amber|rose|sky|purple|yellow)/.test(
    className
  );
  const defaultColorClass = hasCustomTextColor ? '' : 'text-slate-900';

  // Case 1: Pure math without any Arabic characters
  if (!hasArabic) {
    const clauses = splitTopLevelMathClauses(math);

    if (block) {
      return (
        <div
          id={id}
          className={`math-ltr w-full max-w-full py-1.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 select-all ${defaultColorClass} ${className}`}
          dir="ltr"
        >
          {clauses.map((clause, cIdx) => {
            const html = renderKaTeXString(`\\displaystyle ${clause}`, false);
            return (
              <span
                key={cIdx}
                className="katex-inline px-1"
                dir="ltr"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          })}
        </div>
      );
    }

    if (clauses.length > 1) {
      return (
        <span
          id={id}
          className={`math-ltr inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 max-w-full px-1 select-all ${defaultColorClass} ${className}`}
          dir="ltr"
        >
          {clauses.map((clause, cIdx) => {
            const html = renderKaTeXString(clause, false);
            return (
              <span
                key={cIdx}
                className="katex-inline px-0.5"
                dir="ltr"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          })}
        </span>
      );
    }

    const html = renderKaTeXString(math, false);
    return (
      <span
        id={id}
        className={`katex-inline math-ltr max-w-full whitespace-nowrap px-1 select-all ${defaultColorClass} ${className}`}
        dir="ltr"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Case 2: Contains Arabic characters.
  // Normalize \text{...} wrappers and TeX spaces to prevent KaTeX font metric crash on Arabic
  let text = math.replace(/\\text\{([^\}]+)\}/g, ' $1 ');
  text = text.replace(/\\quad/g, '   ').replace(/\\;/g, ' ').replace(/\\,/g, ' ');

  const hasMathCommands = /\\[a-zA-Z]+|[=<>+\-×÷^_{}\[\]]/.test(text);

  // Pure Arabic text without math commands
  if (!hasMathCommands) {
    if (block) {
      return (
        <div
          id={id}
          className={`py-2 font-medium font-arabic leading-relaxed ${hasCustomTextColor ? '' : 'text-slate-800'} ${className}`}
          dir="rtl"
        >
          {text.trim()}
        </div>
      );
    }
    return (
      <span
        id={id}
        className={`font-medium font-arabic px-0.5 leading-relaxed ${hasCustomTextColor ? '' : 'text-slate-800'} ${className}`}
        dir="rtl"
      >
        {text.trim()}
      </span>
    );
  }

  // Case 3: Mixed Arabic and Math commands
  const arabicBlockRegex = /([\u0600-\u06FF]+(?:[\s،؛؟:]+[\u0600-\u06FF]+)*)/g;
  const segments: { isMath: boolean; content: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = arabicBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const mathSegment = text.slice(lastIndex, match.index).trim();
      if (mathSegment) {
        segments.push({ isMath: true, content: mathSegment });
      }
    }
    const arabicSegment = match[1].trim();
    if (arabicSegment) {
      segments.push({ isMath: false, content: arabicSegment });
    }
    lastIndex = arabicBlockRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    const mathSegment = text.slice(lastIndex).trim();
    if (mathSegment) {
      segments.push({ isMath: true, content: mathSegment });
    }
  }

  const isMathDeduction = (() => {
    if (/(\\implies|\\iff|\\to|\\rightarrow|\\impliedby|\\Longleftarrow|\\longrightarrow)/.test(math)) {
      return true;
    }
    if (segments.length > 0 && segments[0].isMath) {
      return true;
    }
    if (/[=<>≤≥≠≈]|\\[a-zA-Z]*(?:frac|times|div|le|ge|neq|approx|equiv|parallel|perp|cong)\b/.test(math)) {
      const totalArabicWords = segments
        .filter((s) => !s.isMath)
        .map((s) => s.content.trim())
        .join(' ')
        .split(/\s+/)
        .filter(Boolean).length;
      if (totalArabicWords <= 4) {
        return true;
      }
    }
    return false;
  })();

  const containerDir = isMathDeduction ? 'ltr' : 'rtl';

  if (block) {
    return (
      <div
        id={id}
        className={`w-full max-w-full py-1.5 ${defaultColorClass} ${isMathDeduction ? 'math-ltr' : ''} ${className}`}
        dir={containerDir}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 w-full px-1">
          {segments.map((seg, idx) => {
            if (!seg.isMath) {
              return (
                <span
                  key={idx}
                  className={`font-arabic font-medium px-0.5 shrink-0 whitespace-nowrap ${hasCustomTextColor ? '' : 'text-slate-800'}`}
                  dir="auto"
                >
                  {seg.content}
                </span>
              );
            }
            const clauses = splitTopLevelMathClauses(seg.content);
            return (
              <React.Fragment key={idx}>
                {clauses.map((cl, cIdx) => {
                  const html = renderKaTeXString(`\\displaystyle ${cl}`, false);
                  return (
                    <span
                      key={`${idx}-${cIdx}`}
                      className="katex-inline math-ltr px-0.5 select-all shrink-0"
                      dir="ltr"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <span
      id={id}
      className={`max-w-full inline-flex flex-wrap items-center gap-1 ${defaultColorClass} align-middle ${className}`}
      dir={containerDir}
    >
      {segments.map((seg, idx) => {
        if (!seg.isMath) {
          return (
            <span
              key={idx}
              className={`font-arabic font-medium px-0.5 shrink-0 whitespace-nowrap ${hasCustomTextColor ? '' : 'text-slate-800'}`}
              dir="auto"
            >
              {seg.content}
            </span>
          );
        }
        const html = renderKaTeXString(seg.content, false);
        return (
          <span
            key={idx}
            className="katex-inline math-ltr px-1 select-all shrink-0 whitespace-nowrap"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
};
