import React, { useState } from 'react';

/**
 * Banc de filtres colorés (Cours 19) — synthèse soustractive.
 * Lumière blanche + pile de filtres C / M / J -> composantes survivantes et couleur obtenue.
 */

type FilterKey = 'C' | 'M' | 'J';
type Rgb = 'R' | 'V' | 'B';

interface FilterDef {
  key: FilterKey;
  ar: string;
  fr: string;
  hex: string;
  /** composantes RGB laissées passer */
  passes: Rgb[];
  /** composante RGB absorbée (ou fortement atténuée) */
  absorbs: Rgb;
  line: string;
}

const FILTERS: FilterDef[] = [
  { key: 'C', ar: 'سماوي', fr: 'Cyan', hex: '#06B6D4', passes: ['V', 'B'], absorbs: 'R', line: 'أبيض − أحمر = سماوي' },
  { key: 'M', ar: 'أرجواني', fr: 'Magenta', hex: '#D946EF', passes: ['R', 'B'], absorbs: 'V', line: 'أبيض − أخضر = أرجواني' },
  { key: 'J', ar: 'أصفر', fr: 'Jaune', hex: '#EAB308', passes: ['R', 'V'], absorbs: 'B', line: 'أبيض − أزرق = أصفر' },
];

const RGB_META: Record<Rgb, { ar: string; hex: string }> = {
  R: { ar: 'أحمر', hex: '#DC2626' },
  V: { ar: 'أخضر', hex: '#16A34A' },
  B: { ar: 'أزرق', hex: '#2563EB' },
};

const RESULT_COLOR: Record<string, { ar: string; hex: string }> = {
  RV: { ar: 'أصفر', hex: '#EAB308' },
  VB: { ar: 'سماوي', hex: '#06B6D4' },
  RB: { ar: 'أرجواني', hex: '#D946EF' },
  R: { ar: 'أحمر', hex: '#DC2626' },
  V: { ar: 'أخضر', hex: '#16A34A' },
  B: { ar: 'أزرق', hex: '#2563EB' },
};

const ALL: Rgb[] = ['R', 'V', 'B'];

const Chip: React.FC<{ rgb: Rgb; crossed: boolean }> = ({ rgb, crossed }) => (
  <span
    className="px-2 py-1 rounded-[8px] text-[11px] font-bold border-2"
    style={{
      backgroundColor: crossed ? '#F1F5F9' : RGB_META[rgb].hex,
      borderColor: crossed ? '#CBD5E1' : RGB_META[rgb].hex,
      color: crossed ? '#94A3B8' : '#FFFFFF',
      textDecoration: crossed ? 'line-through' : 'none',
    }}
  >
    {RGB_META[rgb].ar}
  </span>
);

export const FilterChainLab: React.FC = () => {
  const [chain, setChain] = useState<FilterKey[]>([]);

  const toggle = (k: FilterKey) => {
    setChain((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  let alive: Rgb[] = [...ALL];
  const stages = chain.map((k) => {
    const def = FILTERS.find((f) => f.key === k)!;
    const before = [...alive];
    alive = alive.filter((c) => def.passes.includes(c));
    return { def, before, after: [...alive] };
  });

  const key = alive.slice().sort().join('');
  const result = RESULT_COLOR[key] ?? { ar: 'أسود (لا يبقى ضوء)', hex: '#0F172A' };

  const explanation =
    chain.length === 0
      ? 'لا يوجد مرشح: الضوء الأبيض يصل كما هو إلى العين.'
      : alive.length === 0
        ? 'كلّ المكوّنات الأساسية حُذفت: لا يصل ضوء إلى العين، فيبدو اللون أسوداً في النموذج المثالي.'
        : `المكوّنات المشتركة بين كلّ المرشحات هي ${alive
            .map((c) => RGB_META[c].ar)
            .join(' + ')}، لذلك يظهر الضوء ${result.ar}.`;

  return (
    <div className="space-y-4" dir="rtl">
      {/* Sélecteurs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#475569]">المرشحات الموضوعة أمام الضوء الأبيض:</span>
        {FILTERS.map((f) => {
          const on = chain.includes(f.key);
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => toggle(f.key)}
              className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border-2 transition-all ${
                on ? 'text-white' : 'bg-white text-[#475569] border-[#CBD5E1]'
              }`}
              style={on ? { backgroundColor: f.hex, borderColor: f.hex } : undefined}
            >
              {f.key} · {f.ar}
            </button>
          );
        })}
        {chain.length > 0 && (
          <button
            type="button"
            onClick={() => setChain([])}
            className="px-3 py-1.5 rounded-[10px] text-xs font-bold border-2 border-[#CBD5E1] bg-white text-[#64748B]"
          >
            إعادة الضبط
          </button>
        )}
      </div>

      {/* Chaîne visuelle */}
      <div className="rounded-[12px] border border-[#E2D9D0] bg-white p-3 sm:p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <span className="px-3 py-1.5 rounded-[10px] bg-[#0F172A] text-white text-xs font-bold">ضوء أبيض</span>
          {stages.length === 0 && <span className="text-[#94A3B8] text-xs">→ الشاشة (بلا ترشيح)</span>}
          {stages.map((s) => (
            <span key={s.def.key} className="flex items-center gap-2">
              <span className="text-[#94A3B8]">→</span>
              <span
                className="px-3 py-1.5 rounded-[10px] text-white text-xs font-bold border-2"
                style={{ backgroundColor: s.def.hex, borderColor: s.def.hex }}
              >
                {s.def.key} · {s.def.ar}
              </span>
            </span>
          ))}
          {stages.length > 0 && (
            <>
              <span className="text-[#94A3B8]">→</span>
              <span
                className="px-3 py-1.5 rounded-[10px] text-white text-xs font-bold"
                style={{ backgroundColor: result.hex, borderColor: result.hex }}
              >
                {result.ar}
              </span>
            </>
          )}
        </div>

        {/* Suivi des composantes */}
        {stages.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-14 shrink-0 font-bold text-[#475569]">الداخل</span>
              {ALL.map((c) => (
                <Chip key={c} rgb={c} crossed={false} />
              ))}
            </div>
            {stages.map((s) => (
              <div key={s.def.key} className="flex items-center gap-2 text-[11px]">
                <span className="w-14 shrink-0 font-bold" style={{ color: s.def.hex }}>
                  بعد {s.def.key}
                </span>
                {ALL.map((c) => (
                  <Chip key={c} rgb={c} crossed={!s.after.includes(c)} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`rounded-[12px] p-3 sm:p-4 border text-xs leading-relaxed text-center ${
          alive.length === 0
            ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#334155]'
            : 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]'
        }`}
      >
        {explanation}
      </div>
    </div>
  );
};

export default FilterChainLab;