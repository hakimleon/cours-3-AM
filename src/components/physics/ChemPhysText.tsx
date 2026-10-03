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
          <sub className="text-[0.68em] italic font-normal text-[#8C8C8C] ml-0.5">
            {statePart}
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
      style={{ unicodeBidi: 'isolate' }}
      className={`inline-flex flex-wrap items-baseline font-mono font-semibold text-[#2C3E50] tracking-tight ${sizeClass} ${className}`}
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
  '(?:\\d+\\s*)?(?:H₂O|CO₂|CO|O₂|H₂|N₂|Cl₂|CH₄|C₂H₆|C₃H₈|C₄H₁₀|Fe₃O₄|Fe₂O₃|CuO|ZnO|Al₂O₃|NaOH|HCl|AgNO₃|CuSO₄|BaCl₂|CaCO₃|H2O|CO2|O2|H2|N2|Cl2|CH4|C3H8|C4H10|Fe3O4|Fe2O3|Na⁺|Ca²⁺|Cu²⁺|Fe²⁺|Fe³⁺|Zn²⁺|Al³⁺|Ag⁺|Cl⁻|OH⁻|SO₄²⁻|CO₃²⁻|NO₃⁻|H⁺|H₃O⁺|Na\\+|Ca2\\+|Cu2\\+|Fe2\\+|Fe3\\+|Cl-|OH-|SO4\\^2-|CO3\\^2-)(?:\\((?:s|l|g|aq)\\))?';

const CHEM_TOKEN_REGEX = new RegExp(
  `(\\(\\s*${CHEM_CORE_PATTERN}\\s*\\)|\\b${CHEM_CORE_PATTERN})`,
  'g'
);

const PURE_PAREN_CHEM_REGEX = new RegExp(`^\\(\\s*(${CHEM_CORE_PATTERN})\\s*\\)$`);

// Full parenthetical containing Latin/French terms (including em-dash —, en-dash –, subscripts, ≠, arrows)
const LATIN_PARENTHETICAL_REGEX =
  /(\([A-Za-zÀ-ÿ0-9₀-₉⁰-⁹⁺⁻\s,.'’/+—–\-:=≠→⟶]+\))/g;

// Full chemical reaction equation with arrow (e.g. "CH₄ + 2 O₂ → CO₂ + 2 H₂O", "CH₄ + 2 O₂ ⟶ CO₂ + 2 H₂O", or "C + O₂ → CO₂")
const INLINE_CHEM_EQUATION_REGEX =
  /(\(?(?:(?:\d+(?:\/\d+)?|\d+)\s*)?[A-Z][A-Za-z0-9₀-₉⁰-⁹⁺⁻()]*(?:\s*\+\s*(?:(?:\d+(?:\/\d+)?|\d+)\s*)?[A-Z][A-Za-z0-9₀-₉⁰-⁹⁺⁻()]*)*\s*(?:⟶|→)\s*(?:(?:\d+(?:\/\d+)?|\d+)\s*)?[A-Z][A-Za-z0-9₀-₉⁰-⁹⁺⁻()]*(?:\s*\+\s*(?:(?:\d+(?:\/\d+)?|\d+)\s*)?[A-Z][A-Za-z0-9₀-₉⁰-⁹⁺⁻()]*)*\)?)/g;

/**
 * Renders bilingual/trilingual scientific text (RTL Arabic + isolated LTR chemical formulas,
 * LaTeX math $...$, units, and French/English scientific terms).
 */
export const ChemPhysText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = '' }) => {
  if (!text) return null;

  const ENERGY_OR_UNIT_REGEX =
    /\b(E_[a-zA-Z0-9]+)\b|((?:\d+(?:\.\d+)?)\s*(?:kJ|J|W|kW|Wh|kWh|%))(?!\w)/g;

  const renderEnhancedPlainTokens = (plainText: string, subKey: string) => {
    const parts = plainText.split(ENERGY_OR_UNIT_REGEX);
    return parts.map((part, pIdx) => {
      if (!part) return null;
      if (part.startsWith('E_')) {
        const subscript = part.slice(2);
        return (
          <span
            key={`${subKey}-e-${pIdx}`}
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
            key={`${subKey}-u-${pIdx}`}
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
            className="inline-block font-semibold text-[#0F766E] mx-0.5"
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={`${subKey}-txt-${pIdx}`}>{part}</React.Fragment>;
    });
  };

  const renderChemicalAndPlainTokens = (segment: string, keyPrefix: string) => {
    const chemParts = segment.split(CHEM_TOKEN_REGEX);
    return chemParts.map((sub, cIdx) => {
      if (!sub) return null;
      if (cIdx % 2 === 1) {
        const parenMatch = sub.match(PURE_PAREN_CHEM_REGEX);
        const cleanFormula = parenMatch ? parenMatch[1].trim() : sub.trim();
        return (
          <span
            key={`${keyPrefix}-chem-${cIdx}`}
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
            className="inline-flex items-baseline px-1.5 py-0.5 mx-0.5 rounded-[6px] bg-[#0F766E]/8 border border-[#0F766E]/20"
          >
            <ChemicalFormula formula={cleanFormula} size="sm" />
          </span>
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

        // 2. Isolate full chemical equations (e.g. CH₄ + 2 O₂ ⟶ CO₂ + 2 H₂O) in strict LTR
        const eqSegments = part.split(INLINE_CHEM_EQUATION_REGEX);
        return (
          <React.Fragment key={`eq-${mIdx}`}>
            {eqSegments.map((eqSeg, eqIdx) => {
              if (!eqSeg) return null;

              if (eqIdx % 2 === 1) {
                const trimmed = eqSeg.trim();
                const isWrappedInParens = trimmed.startsWith('(') && trimmed.endsWith(')');
                const cleanEq = isWrappedInParens ? trimmed.slice(1, -1).trim() : trimmed;

                const equationNode = (
                  <span
                    key={`chemeq-${mIdx}-${eqIdx}`}
                    dir="ltr"
                    style={{ unicodeBidi: 'isolate' }}
                    className="inline-flex items-baseline px-2 py-0.5 mx-1 rounded-[6px] bg-[#FAF7F4] border border-[#E2D9D0] text-[#1E293B]"
                  >
                    <ChemicalFormula formula={cleanEq} size="sm" />
                  </span>
                );

                if (isWrappedInParens) {
                  return (
                    <React.Fragment key={`chemeq-wrap-${mIdx}-${eqIdx}`}>
                      <span>(</span>
                      {equationNode}
                      <span>)</span>
                    </React.Fragment>
                  );
                }
                return equationNode;
              }

              // 3. Isolate parenthetical French/Latin segments BEFORE splitting standalone formulas
              const latinSegments = eqSeg.split(LATIN_PARENTHETICAL_REGEX);
              return (
                <React.Fragment key={`p-${mIdx}-${eqIdx}`}>
                  {latinSegments.map((seg, lIdx) => {
                    if (!seg) return null;

              if (seg.startsWith('(') && seg.endsWith(')')) {
                // If it's a pure chemical formula in parentheses like "(O₂)" or "(CO₂)" or "(CO)",
                // render it directly as a chemical formula pill without redundant outer parentheses
                const pureChem = seg.match(PURE_PAREN_CHEM_REGEX);
                if (pureChem) {
                  return (
                    <span
                      key={`pchem-${mIdx}-${lIdx}`}
                      dir="ltr"
                      style={{ unicodeBidi: 'isolate' }}
                      className="inline-flex items-baseline px-1.5 py-0.5 mx-0.5 rounded-[6px] bg-[#0F766E]/8 border border-[#0F766E]/20"
                    >
                      <ChemicalFormula formula={pureChem[1].trim()} size="sm" />
                    </span>
                  );
                }

                // Otherwise, if it contains French/Latin letters, isolate the whole parenthetical in LTR
                if (/[A-Za-zÀ-ÿ]/.test(seg)) {
                  return (
                    <span
                      key={`lat-${mIdx}-${lIdx}`}
                      dir="ltr"
                      style={{ unicodeBidi: 'isolate' }}
                      className="inline-block font-medium text-[#0F766E] mx-0.5"
                    >
                      {seg}
                    </span>
                  );
                }
              }

              // 4. For remaining text segments, format standalone or parenthesized chemical tokens
              return (
                <React.Fragment key={`seg-${mIdx}-${eqIdx}-${lIdx}`}>
                  {renderChemicalAndPlainTokens(seg, `s-${mIdx}-${eqIdx}-${lIdx}`)}
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
