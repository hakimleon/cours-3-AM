import React from 'react';
import { MathView } from '../MathView';

const SUBSCRIPT_MAP: Record<string, string> = {
  '₀': '0',
  '₁': '1',
  '₂': '2',
  '₃': '3',
  '₄': '4',
  '₅': '5',
  '₆': '6',
  '₇': '7',
  '₈': '8',
  '₉': '9',
};

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
  '⁻': '−',
};

/**
 * Normalizes Unicode subscripts/superscripts in a chemical token into explicit HTML <sub> and <sup>
 * and parses standard chemical formula syntax (e.g. H2O, H₂O, CO2, CO₂, Na+, Na⁺, Ca2+, Ca²⁺, SO4^2-, SO₄²⁻, Fe3O4, Cu(OH)2).
 */
export const ChemicalFormula: React.FC<{
  formula: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ formula, className = '', size = 'md' }) => {
  // If formula is verbal Arabic reaction equation (e.g. carbon combustion, water electrolysis, etc.)
  if (/[\u0600-\u06FF]/.test(formula) && (formula.includes('⟶') || formula.includes('→'))) {
    const sizeClasses =
      size === 'sm'
        ? 'text-[0.78em] sm:text-[0.82em] gap-1'
        : size === 'lg'
        ? 'text-sm sm:text-base gap-2'
        : 'text-xs sm:text-sm gap-1.5';
    const arrowSizeClass = size === 'sm' ? 'text-[0.85em] px-0.5' : 'text-base px-1';

    const parts = formula.split(/⟶|→/);
    const lhsRaw = parts[0]?.trim() || '';
    const rhsRaw = parts[1]?.trim() || '';

    const renderVerbalTerm = (term: string, termColor: string, key: string) => {
      const cleanTerm = term.trim();
      const stateMatch = cleanTerm.match(/\s*\((s|l|g|aq)\)$/i);
      const statePart = stateMatch ? stateMatch[1].toLowerCase() : '';
      const namePart = stateMatch
        ? cleanTerm.slice(0, cleanTerm.length - stateMatch[0].length).trim()
        : cleanTerm;

      return (
        <span
          key={key}
          className={`font-sans ${termColor} inline-flex items-center gap-0.5 whitespace-nowrap shrink-0`}
          dir="ltr"
        >
          <span>{namePart}</span>
          {statePart && (
            <span className="font-sans text-[0.85em] font-semibold text-[#6B6B6B]" dir="ltr">
              {' '}({statePart === 'l' ? <span className="chem-state-l font-serif italic font-bold">l</span> : statePart})
            </span>
          )}
        </span>
      );
    };

    const renderVerbalSide = (sideStr: string, sideColor: string, sidePrefix: string) => {
      const tokens = sideStr.split(/\s*\+\s*/);
      return (
        <span
          className="font-sans inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          dir="ltr"
        >
          {tokens.map((tok, idx) => (
            <React.Fragment key={`${sidePrefix}-${idx}`}>
              {idx > 0 && <span className="text-[#6B6B6B] font-bold px-0.5 shrink-0">+</span>}
              {renderVerbalTerm(tok, sideColor, `${sidePrefix}-term-${idx}`)}
            </React.Fragment>
          ))}
        </span>
      );
    };

    return (
      <span
        dir="ltr"
        style={{
          unicodeBidi: 'isolate',
          whiteSpace: 'nowrap',
          overflow: 'visible',
          height: 'auto',
          lineHeight: 'normal',
        }}
        className={`inline-flex items-center justify-center max-w-full font-bold font-sans leading-normal text-center whitespace-nowrap overflow-visible h-auto ${sizeClasses} ${className}`}
      >
        {renderVerbalSide(lhsRaw, 'text-[#0F766E]', 'lhs')}
        <span className={`font-bold text-[#0F766E] select-none shrink-0 leading-normal ${arrowSizeClass}`}>⟶</span>
        {renderVerbalSide(rhsRaw, 'text-[#0284C7]', 'rhs')}
      </span>
    );
  }

  // Split chemical equation into tokens by spaces around + and arrows (→, ->, ⟶)
  const normalized = formula
    .replace(/->|⟶/g, ' → ')
    .replace(/\s*→\s*/g, ' → ');

  // Render a single chemical token (like "2H₂O(l)", "Ca²⁺", "SO₄²⁻", "CO2", "Na+", "Cu(OH)2(s)")
  const renderSingleToken = (token: string, keyPrefix: string): React.ReactNode => {
    const trimmed = token.trim();
    if (!trimmed) return null;

    if (trimmed === '+' || trimmed === '→' || trimmed === '=') {
      return (
        <span
          key={keyPrefix}
          dir="ltr"
          style={{ unicodeBidi: 'isolate' }}
          className={`mx-1.5 font-bold select-none ${
            trimmed === '→' ? 'text-[#0F766E] px-1 text-base' : 'text-[#6B6B6B]'
          }`}
        >
          {trimmed}
        </span>
      );
    }

    // Extract trailing physical state: (s), (l), (g), (aq)
    let mainPart = trimmed;
    let statePart = '';
    const stateMatch = mainPart.match(/\((s|l|g|aq)\)$/i);
    if (stateMatch) {
      statePart = stateMatch[0].toLowerCase();
      mainPart = mainPart.slice(0, mainPart.length - statePart.length).trim();
    }

    // Extract leading stoichiometric coefficient (e.g. "2" in "2H2O" or "2 H2O")
    let coeff = '';
    const coeffMatch = mainPart.match(/^(\d+(?:\/\d+)?)\s*(?=[A-Z(])/);
    if (coeffMatch) {
      coeff = coeffMatch[1];
      mainPart = mainPart.slice(coeffMatch[0].length);
    }

    // Convert explicit caret charge syntax like SO4^2- or Ca^2+ or Fe^3+
    let explicitCharge = '';
    const caretChargeMatch = mainPart.match(/\^(\d*[+-])$/);
    if (caretChargeMatch) {
      explicitCharge = caretChargeMatch[1].replace('-', '−');
      mainPart = mainPart.slice(0, mainPart.length - caretChargeMatch[0].length);
    } else {
      // Check for trailing ion charge without caret: e.g. Na+, Cl-, OH-, Ca2+, Cu2+, Fe3+, Al3+, SO42-, CO32-
      // Special known polyatomic ions with ASCII digits:
      const polyIonMatch = mainPart.match(/^(SO4|CO3|NO3|PO4|NH4|H3O)(\d*[+-])$/);
      if (polyIonMatch) {
        mainPart = polyIonMatch[1];
        explicitCharge = polyIonMatch[2].replace('-', '−');
      } else {
        const simpleIonMatch = mainPart.match(/^([A-Z][a-z]?|OH)(\d*[+-])$/);
        if (simpleIonMatch) {
          mainPart = simpleIonMatch[1];
          explicitCharge = simpleIonMatch[2].replace('-', '−');
        }
      }
    }

    // Now parse character by character for Unicode subscripts/superscripts and ASCII digits after element/parenthesis
    const nodes: React.ReactNode[] = [];
    let i = 0;
    while (i < mainPart.length) {
      const ch = mainPart[i];

      // Unicode subscript sequence
      if (SUBSCRIPT_MAP[ch]) {
        let subStr = '';
        while (i < mainPart.length && SUBSCRIPT_MAP[mainPart[i]]) {
          subStr += SUBSCRIPT_MAP[mainPart[i]];
          i++;
        }
        nodes.push(
          <sub key={`${keyPrefix}-sub-${i}`} className="text-[0.74em] leading-none font-bold select-all">
            {subStr}
          </sub>
        );
        continue;
      }

      // Unicode superscript sequence
      if (SUPERSCRIPT_MAP[ch]) {
        let supStr = '';
        while (i < mainPart.length && SUPERSCRIPT_MAP[mainPart[i]]) {
          supStr += SUPERSCRIPT_MAP[mainPart[i]];
          i++;
        }
        nodes.push(
          <sup
            key={`${keyPrefix}-sup-${i}`}
            className="text-[0.72em] leading-none font-bold text-[#0F766E] ml-[0.5px]"
          >
            {supStr}
          </sup>
        );
        continue;
      }

      // ASCII digits following an atom symbol or closing parenthesis -> subscript
      if (/\d/.test(ch) && i > 0 && /[A-Za-z)]/.test(mainPart[i - 1])) {
        let numStr = '';
        while (i < mainPart.length && /\d/.test(mainPart[i])) {
          numStr += mainPart[i];
          i++;
        }
        nodes.push(
          <sub key={`${keyPrefix}-asub-${i}`} className="text-[0.74em] leading-none font-bold">
            {numStr}
          </sub>
        );
        continue;
      }

      // Regular character sequence
      let plainStr = '';
      while (
        i < mainPart.length &&
        !SUBSCRIPT_MAP[mainPart[i]] &&
        !SUPERSCRIPT_MAP[mainPart[i]] &&
        !(/\d/.test(mainPart[i]) && i > 0 && /[A-Za-z)]/.test(mainPart[i - 1]))
      ) {
        plainStr += mainPart[i];
        i++;
      }
      nodes.push(<span key={`${keyPrefix}-txt-${i}`}>{plainStr}</span>);
    }

    return (
      <span
        key={keyPrefix}
        dir="ltr"
        style={{ unicodeBidi: 'isolate' }}
        className="inline-flex items-baseline"
      >
        {coeff && (
          <span className="font-bold text-[#C94BA6] mr-0.5">{coeff}</span>
        )}
        <span>{nodes}</span>
        {explicitCharge && (
          <sup className="text-[0.72em] leading-none font-bold text-[#0F766E] ml-[0.5px]">
            {explicitCharge}
          </sup>
        )}
        {statePart && (
          <sub className="text-[0.68em] italic font-normal text-[#8C8C8C] ml-0.5" dir="ltr">
            {statePart === '(l)' ? (
              <span>(<span className="chem-state-l">l</span>)</span>
            ) : (
              statePart
            )}
          </sub>
        )}
      </span>
    );
  };

  // Split equation keeping "+ " and "→" separated
  const parts = normalized.split(/(\s+\+\s+|\s*→\s*|\s+=\s+)/g).filter(Boolean);

  const sizeClass =
    size === 'lg'
      ? 'text-base sm:text-lg'
      : size === 'sm'
      ? 'text-xs'
      : 'text-sm';

    return (
      <span
        dir="ltr"
        style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}
        className={`inline-flex items-baseline font-sans font-bold text-[#1E293B] whitespace-nowrap ${sizeClass} ${className}`}
      >
      {parts.map((part, idx) => {
        const clean = part.trim();
        if (clean === '+' || clean === '→' || clean === '=') {
          return renderSingleToken(clean, `op-${idx}`);
        }
        // Further split if multiple space-separated tokens like "2 H2O (l)"
        const mergedState = clean
          .replace(/^(\d+)\s+([A-Z])/g, '$1$2')
          .replace(/\s+\((s|l|g|aq)\)/gi, '($1)');
        return renderSingleToken(mergedState, `tok-${idx}`);
      })}
    </span>
  );
};

// Regex matching standalone chemical formulas / ions (optionally wrapped in parentheses like "(O₂)" or "(CO)")
const CHEM_CORE_PATTERN =
  '(?:\\d+(?:\\/\\d+)?\\s*)?(?:H₂O₂|H2O2|Al₂O₃|Al2O3|Fe₂O₃|Fe2O3|Fe₃O₄|Fe3O4|C₄H₁₀|C4H10|C₃H₈|C3H8|C₂H₆|C2H6|CH₄|CH4|H₂O|H2O|CO₂|CO2|CO|O₂|O2|H₂|H2|H₄|H4|ZnO|CuO|AgNO₃|CuSO₄|BaCl₂|CaCO₃|NaOH|N₂|N2)(?:[₀-₉⁰-⁹⁺⁻]+)?(?:\\((?:s|l|g|aq)\\))?';

const CHEM_TOKEN_REGEX = new RegExp(
  `(\\(\\s*${CHEM_CORE_PATTERN}\\s*\\)|\\b${CHEM_CORE_PATTERN})`,
  'g'
);

const PURE_PAREN_CHEM_REGEX = new RegExp(`^\\(\\s*(${CHEM_CORE_PATTERN})\\s*\\)$`);

// Full parenthetical containing Latin/French terms or math expressions (including em-dash —, en-dash –, subscripts, ≠, arrows, ×, ·)
const LATIN_PARENTHETICAL_REGEX =
  /(\([A-Za-zÀ-ÿ0-9₀-₉⁰-⁹⁺⁻\s,.'’/+—–\-:=≠→⟶×·•*÷]+\))/g;

// Composite arithmetic expressions like "(4 × 2) + (5 × 1) = 8 + 5 = 13" or "(8 × 2) + (10 × 1) = 16 + 10 = 26" or "(s) , (g) , (l) , (aq)"
const COMPOSITE_CALC_REGEX =
  /((?:\(\s*s\s*\)\s*,\s*\(\s*g\s*\)\s*,\s*\(\s*l\s*\)\s*,\s*\(\s*aq\s*\))|(?:\(?\s*\d+\s*×\s*\d+\s*\)?\s*\+\s*\(?\s*\d+\s*×\s*\d+\s*\)?(?:\s*=\s*[\d\s+=]+)?)|(?:\b\d+\s*×\s*\d+\s*\+\s*\d+\s*×\s*\d+\s*(?:=\s*\d+)?))/g;

// Full chemical reaction equation with arrow (e.g. "CH₄ + 2 O₂ → CO₂ + 2 H₂O", "CH₄ + 2 O₂ ⟶ CO₂ + 2 H₂O", or "C + O₂ → CO₂")
const INLINE_CHEM_EQUATION_REGEX =
  /(\(?(?:(?:\d+(?:\/\d+)?|\d+)\s*)?[A-Z][A-Za-z0-9₀-₉⁰-⁹⁺⁻()]*(?:\s*\+\s*(?:(?:\d+(?:\/\d+)?|\d+)\s*)?[A-Z][A-Za-z0-9₀-₉⁰-⁹⁺⁻()]*)*\s*(?:⟶|→)\s*(?:(?:\d+(?:\/\d+)?|\d+)\s*)?[A-Z][A-Za-z0-9₀-₉⁰-⁹⁺⁻()]*(?:\s*\+\s*(?:(?:\d+(?:\/\d+)?|\d+)\s*)?[A-Z][A-Za-z0-9₀-₉⁰-⁹⁺⁻()]*)*\)?)/g;

// Full Arabic verbal chemical reaction equations with arrow (e.g. "بوتان (g) + ثنائي الأكسجين (g) ⟶ ثنائي أكسيد الكربون (g) + ماء (g)")
const ARABIC_VERBAL_EQ_REGEX =
  /((?:بوتان|ميثان|بروبان|غاز البوتان|غاز الميثان|غاز البروبان|كربون|فحم|هيدروكربون|ماء|ثنائي الأكسجين|ثنائي الهيدروجين|ثنائي أكسيد الكربون|أحادي أكسيد الكربون|سخام|أكسيد الحديد)(?:\s*\([slgaq]+\))?(?:\s*\+\s*(?:بوتان|ميثان|بروبان|غاز البوتان|غاز الميثان|غاز البروبان|كربون|فحم|هيدروكربون|ماء|ثنائي الأكسجين|ثنائي الهيدروجين|ثنائي أكسيد الكربون|أحادي أكسيد الكربون|سخام|أكسيد الحديد)(?:\s*\([slgaq]+\))?)*\s*(?:⟶|→)\s*(?:بوتان|ميثان|بروبان|غاز البوتان|غاز الميثان|غاز البروبان|كربون|فحم|هيدروكربون|ماء|ثنائي الأكسجين|ثنائي الهيدروجين|ثنائي أكسيد الكربون|أحادي أكسيد الكربون|سخام|أكسيد الحديد)(?:\s*\([slgaq]+\))?(?:\s*\+\s*(?:بوتان|ميثان|بروبان|غاز البوتان|غاز الميثان|غاز البروبان|كربون|فحم|هيدروكربون|ماء|ثنائي الأكسجين|ثنائي الهيدروجين|ثنائي أكسيد الكربون|أحادي أكسيد الكربون|سخام|أكسيد الحديد)(?:\s*\([slgaq]+\))?)*)/g;

// Helper to render distinct lowercase l for liquid physical state (l)
const renderStateInText = (str: string): React.ReactNode => {
  if (!str || !str.includes('(l)')) return str;
  const parts = str.split(/(\(l\))/i);
  return parts.map((p, idx) => {
    if (/^\(l\)$/i.test(p)) {
      return (
        <span key={idx} dir="ltr" className="inline-flex items-baseline">
          (<span className="chem-state-l">l</span>)
        </span>
      );
    }
    return <React.Fragment key={idx}>{p}</React.Fragment>;
  });
};

/**
 * Renders bilingual/trilingual scientific text (RTL Arabic + isolated LTR chemical formulas,
 * LaTeX math $...$, units, and French/English scientific terms).
 */
const INLINE_CALC_OR_COUNT_REGEX =
  /((?:\(\s*[slgaq]\s*\)\s*,\s*\(\s*[slgaq]\s*\)\s*,\s*\(\s*[slgaq]\s*\)\s*,\s*\(\s*[slgaq]\s*\))|(?:\(\s*\d+\s*×\s*\d+\s*\)\s*\+\s*\(\s*\d+\s*×\s*\d+\s*\)(?:\s*=\s*[\d\s+=]+)?)|(?:\b\d+\s*(?:ذرة|ذرات|ذرتا)?\s*[A-Z][a-z0-9₀-₉]*(?:\s*·\s*\d+\s*(?:ذرة|ذرات|ذرتا)?\s*[A-Z][a-z0-9₀-₉]*)+)|(?:\b\d+\s*[A-Z]\s*=\s*[\d\s×*+A-Z]+)|(?:\b\d+\s*×\s*\d+\s*(?:\+\s*\d+\s*×\s*\d+\s*)?=\s*\d+)|(?:\b\d+\s*×\s*\d+\s*\+\s*\d+\s*×\s*\d+)|(?:\(\s*[\d\s×*+=\-–—/≠().]+\s*\)))/g;

export const ChemPhysText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split text by newlines so multi-line table cells and notes break naturally
  if (text.includes('\n')) {
    const lines = text.split('\n');
    return (
      <span className={className}>
        {lines.map((line, lIdx) => (
          <React.Fragment key={lIdx}>
            {lIdx > 0 && <br />}
            <ChemPhysText text={line} />
          </React.Fragment>
        ))}
      </span>
    );
  }

  const ENERGY_OR_UNIT_REGEX =
    /\b(E_[a-zA-Z0-9]+)\b|((?:\d+(?:\.\d+)?)\s*(?:kJ|J|W|kW|Wh|kWh|%))(?!\w)/g;

  const renderEnhancedPlainTokens = (plainText: string, subKey: string) => {
    // 1. First split by inline calculations, counts, and equalities
    const calcParts = plainText.split(INLINE_CALC_OR_COUNT_REGEX);
    return calcParts.map((cPart, cIdx) => {
      if (!cPart) return null;

      if (
        /^(?:\(\s*[slgaq]\s*\)\s*,\s*\(\s*[slgaq]\s*\)|\(\s*\d+\s*×\s*\d+\s*\)\s*\+\s*\(\s*\d+\s*×\s*\d+\s*\)|\d+\s*(?:ذرة|ذرات|ذرتا)?\s*[A-Z][a-z0-9₀-₉]*\s*·|\d+\s*[A-Z]\s*=|\d+\s*×\s*\d+|\(\s*[\d\s×*+=\-–—/≠().]+\s*\))/.test(
          cPart.trim()
        )
      ) {
        return (
          <bdi
            key={`${subKey}-calc-${cIdx}`}
            dir="ltr"
            style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}
            className="inline-block whitespace-nowrap font-sans font-bold text-[#1E293B] mx-0.5"
          >
            {renderStateInText(cPart)}
          </bdi>
        );
      }

      // 2. Then split by Energy units or subscript tokens
      const parts = cPart.split(ENERGY_OR_UNIT_REGEX);
      return parts.map((part, pIdx) => {
        if (!part) return null;
        if (part.startsWith('E_')) {
          const subscript = part.slice(2);
          return (
            <span
              key={`${subKey}-${cIdx}-e-${pIdx}`}
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="inline-flex items-baseline font-bold text-[#0F766E] mx-0.5"
            >
              E<sub className="font-bold text-[0.75em] leading-none ml-[0.5px]">{subscript}</sub>
            </span>
          );
        }
        if (/^(?:\d+(?:\.\d+)?)\s*(?:kJ|J|W|kW|Wh|kWh|%)$/.test(part.trim())) {
          return (
            <span
              key={`${subKey}-${cIdx}-u-${pIdx}`}
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
              className="inline-block font-semibold text-[#0F766E] mx-0.5"
            >
              {part}
            </span>
          );
        }
        if (part.includes('(l)')) {
          return (
            <React.Fragment key={`${subKey}-${cIdx}-txt-${pIdx}`}>
              {renderStateInText(part)}
            </React.Fragment>
          );
        }
        return <React.Fragment key={`${subKey}-${cIdx}-txt-${pIdx}`}>{part}</React.Fragment>;
      });
    });
  };

  const renderChemicalAndPlainTokens = (segment: string, keyPrefix: string) => {
    // If the segment represents a chemical reaction equation with an arrow (verbal or symbolic), isolate strictly in LTR
    if (
      (segment.includes('⟶') || segment.includes('→')) &&
      segment.length < 140 &&
      !segment.startsWith('•') &&
      !segment.startsWith('-')
    ) {
      const parts = segment.split(/⟶|→/);
      if (parts.length === 2 && parts[0].trim() && parts[1].trim()) {
        return (
          <bdi
            key={keyPrefix}
            dir="ltr"
            style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 my-0.5 rounded-[8px] bg-[#FAF7F4] border border-[#0F766E]/30 font-bold text-xs sm:text-sm text-[#1A1A1A] whitespace-nowrap"
          >
            <span className="font-sans text-[#0F766E]">{renderStateInText(parts[0].trim())}</span>
            <span className="text-sm font-bold text-[#0F766E] px-0.5 select-none">⟶</span>
            <span className="font-sans text-[#0284C7]">{renderStateInText(parts[1].trim())}</span>
          </bdi>
        );
      }
    }

    const chemParts = segment.split(CHEM_TOKEN_REGEX);
    return chemParts.map((sub, cIdx) => {
      if (!sub) return null;
      if (cIdx % 2 === 1) {
        const parenMatch = sub.match(PURE_PAREN_CHEM_REGEX);
        const cleanFormula = parenMatch ? parenMatch[1].trim() : sub.trim();
        return (
          <bdi
            key={`${keyPrefix}-chem-${cIdx}`}
            dir="ltr"
            style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}
            className="inline-flex items-baseline px-1.5 py-0.5 mx-0.5 rounded-[6px] bg-[#0F766E]/8 border border-[#0F766E]/20 whitespace-nowrap"
          >
            <ChemicalFormula formula={cleanFormula} size="sm" />
          </bdi>
        );
      }
      return renderEnhancedPlainTokens(sub, `${keyPrefix}-sub-${cIdx}`);
    });
  };

  // 1. First split by inline LaTeX math $...$
  const mathParts = text.split(/(\$[^$]+\$)/g);

  return (
    <span className={className}>
      {mathParts.map((part, mIdx) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const latex = part.slice(1, -1);
          return <MathView key={`m-${mIdx}`} math={latex} className="mx-1" />;
        }

        // 2. Isolate full Arabic verbal chemical equations (e.g. ماء (l) ⟶ ثنائي الهيدروجين (g) + ثنائي الأكسجين (g)) in strict LTR
        const arabicEqSegments = part.split(ARABIC_VERBAL_EQ_REGEX);
        return (
          <React.Fragment key={`ar-wrap-${mIdx}`}>
            {arabicEqSegments.map((arSeg, arIdx) => {
              if (!arSeg) return null;

              if (arIdx % 2 === 1) {
                const parts = arSeg.trim().split(/⟶|→/);
                const lhs = parts[0]?.trim();
                const rhs = parts[1]?.trim();
                return (
                  <span
                    key={`ar-eq-${mIdx}-${arIdx}`}
                    dir="ltr"
                    style={{
                      unicodeBidi: 'isolate',
                      overflow: 'visible',
                      height: 'auto',
                      lineHeight: 'normal',
                    }}
                    className="inline-flex flex-wrap items-center justify-center gap-1 px-2 py-1 mx-0.5 my-1 rounded-[8px] bg-[#FAF7F4] border border-[#0F766E]/30 font-bold font-sans text-[10px] sm:text-[11px] md:text-xs text-[#1A1A1A] select-all shadow-xs overflow-visible h-auto max-w-full leading-normal"
                  >
                    <span className="font-sans text-[#0F766E] whitespace-nowrap leading-normal" dir="ltr" style={{ overflow: 'visible', height: 'auto' }}>
                      {renderStateInText(lhs)}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans text-[#0284C7] leading-normal" dir="ltr">
                      <span className="text-[11px] sm:text-xs font-bold text-[#0F766E] px-0.5 select-none shrink-0 leading-normal">
                        ⟶
                      </span>
                      <span className="whitespace-nowrap" dir="ltr" style={{ overflow: 'visible', height: 'auto' }}>
                        {renderStateInText(rhs)}
                      </span>
                    </span>
                  </span>
                );
              }

              // 3. Isolate symbolic chemical equations (e.g. CH₄ + 2 O₂ ⟶ CO₂ + 2 H₂O) in strict LTR
              const eqSegments = arSeg.split(INLINE_CHEM_EQUATION_REGEX);
              return (
                <React.Fragment key={`eq-${mIdx}-${arIdx}`}>
                  {eqSegments.map((eqSeg, eqIdx) => {
                    if (!eqSeg) return null;

                    if (eqIdx % 2 === 1) {
                      const trimmed = eqSeg.trim();
                      const isWrappedInParens = trimmed.startsWith('(') && trimmed.endsWith(')');
                      const cleanEq = isWrappedInParens ? trimmed.slice(1, -1).trim() : trimmed;

                      const equationNode = (
                        <span
                          key={`chemeq-${mIdx}-${arIdx}-${eqIdx}`}
                          dir="ltr"
                          style={{ unicodeBidi: 'isolate' }}
                          className="inline-flex items-baseline px-2 py-0.5 mx-1 rounded-[6px] bg-[#FAF7F4] border border-[#E2D9D0] text-[#1E293B]"
                        >
                          <ChemicalFormula formula={cleanEq} size="sm" />
                        </span>
                      );

                      if (isWrappedInParens) {
                        return (
                          <React.Fragment key={`chemeq-wrap-${mIdx}-${arIdx}-${eqIdx}`}>
                            <span>(</span>
                            {equationNode}
                            <span>)</span>
                          </React.Fragment>
                        );
                      }
                      return equationNode;
                    }

                    // 4. Isolate composite arithmetic calculations as whole units first
                    const compositeCalcSegments = eqSeg.split(COMPOSITE_CALC_REGEX);
                    return (
                      <React.Fragment key={`comp-wrap-${mIdx}-${arIdx}-${eqIdx}`}>
                        {compositeCalcSegments.map((cSeg, cIdx) => {
                          if (!cSeg) return null;

                          if (cIdx % 2 === 1) {
                            return (
                              <bdi
                                key={`comp-calc-${mIdx}-${arIdx}-${eqIdx}-${cIdx}`}
                                dir="ltr"
                                style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}
                                className="inline-block font-sans font-bold text-[#1E293B] whitespace-nowrap mx-0.5"
                              >
                                {renderStateInText(cSeg)}
                              </bdi>
                            );
                          }

                          // 5. Isolate parenthetical French/Latin segments BEFORE splitting standalone formulas
                          const latinSegments = cSeg.split(LATIN_PARENTHETICAL_REGEX);
                          return (
                            <React.Fragment key={`p-${mIdx}-${arIdx}-${eqIdx}-${cIdx}`}>
                              {latinSegments.map((seg, lIdx) => {
                                if (!seg) return null;

                                if (seg.startsWith('(') && seg.endsWith(')')) {
                                  // If it's a pure chemical formula in parentheses like "(O₂)" or "(CO₂)" or "(CO)",
                                  // render it directly as a chemical formula pill without redundant outer parentheses
                                  const pureChem = seg.match(PURE_PAREN_CHEM_REGEX);
                                  if (pureChem) {
                                    return (
                                      <span
                                        key={`pchem-${mIdx}-${arIdx}-${lIdx}`}
                                        dir="ltr"
                                        style={{ unicodeBidi: 'isolate' }}
                                        className="inline-flex items-baseline px-1.5 py-0.5 mx-0.5 rounded-[6px] bg-[#0F766E]/8 border border-[#0F766E]/20"
                                      >
                                        <ChemicalFormula formula={pureChem[1].trim()} size="sm" />
                                      </span>
                                    );
                                  }

                                  // Otherwise, if it contains French/Latin letters or math operators/numbers, isolate the whole parenthetical in LTR
                                  if (/[A-Za-zÀ-ÿ0-9×*+=\-–—/≠().·]/.test(seg)) {
                                    return (
                                      <bdi
                                        key={`lat-${mIdx}-${arIdx}-${lIdx}`}
                                        dir="ltr"
                                        style={{ unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}
                                        className="inline-block font-sans font-bold text-[#1E293B] whitespace-nowrap mx-0.5"
                                      >
                                        {renderStateInText(seg)}
                                      </bdi>
                                    );
                                  }
                                }

                                // 6. For remaining text segments, format standalone or parenthesized chemical tokens
                                return (
                                  <React.Fragment key={`seg-${mIdx}-${arIdx}-${eqIdx}-${cIdx}-${lIdx}`}>
                                    {renderChemicalAndPlainTokens(seg, `s-${mIdx}-${arIdx}-${eqIdx}-${cIdx}-${lIdx}`)}
                                  </React.Fragment>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
})}
    </span>
  );
};
