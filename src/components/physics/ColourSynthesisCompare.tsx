import React, { useState } from 'react';

/**
 * Comparaison interactive : synthèse additive (RVB) vs synthèse soustractive (CMJ) — Cours 19.
 * Lumières que l'on allume vs filtres que l'on superpose devant une lumière blanche.
 */

type Rgb = 'R' | 'V' | 'B';
type Cmj = 'C' | 'M' | 'J';

const RGB_META: Record<Rgb, { ar: string; hex: string }> = {
  R: { ar: 'أحمر', hex: '#DC2626' },
  V: { ar: 'أخضر', hex: '#16A34A' },
  B: { ar: 'أزرق', hex: '#2563EB' },
};

const CMJ_META: Record<Cmj, { ar: string; fr: string; hex: string; absorbs: Rgb }> = {
  C: { ar: 'سماوي', fr: 'Cyan', hex: '#06B6D4', absorbs: 'R' },
  M: { ar: 'أرجواني', fr: 'Magenta', hex: '#D946EF', absorbs: 'V' },
  J: { ar: 'أصفر', fr: 'Jaune', hex: '#EAB308', absorbs: 'B' },
};

const RGB_ALL: Rgb[] = ['R', 'V', 'B'];
const CMJ_ALL: Cmj[] = ['C', 'M', 'J'];

const ADDITIVE_RESULT: Record<string, { ar: string; hex: string }> = {
  RVB: { ar: 'أبيض', hex: '#F8FAFC' },
  RV: { ar: 'أصفر', hex: '#EAB308' },
  RB: { ar: 'أرجواني', hex: '#D946EF' },
  VB: { ar: 'سماوي', hex: '#06B6D4' },
  R: { ar: 'أحمر', hex: '#DC2626' },
  V: { ar: 'أخضر', hex: '#16A34A' },
  B: { ar: 'أزرق', hex: '#2563EB' },
};

const SUBTRACTIVE_RESULT: Record<string, { ar: string; hex: string }> = {
  '': { ar: 'أسود', hex: '#0F172A' },
  CM: { ar: 'أزرق', hex: '#2563EB' },
  CJ: { ar: 'أخضر', hex: '#16A34A' },
  MJ: { ar: 'أحمر', hex: '#DC2626' },
  C: { ar: 'سماوي', hex: '#06B6D4' },
  M: { ar: 'أرجواني', hex: '#D946EF' },
  J: { ar: 'أصفر', hex: '#EAB308' },
};

const Toggle: React.FC<{
  label: string;
  sub?: string;
  on: boolean;
  hex: string;
  onClick: () => void;
}> = ({ label, sub, on, hex, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-3 py-2 rounded-[10px] text-xs font-bold border-2 transition-all"
    style={
      on
        ? { backgroundColor: hex, borderColor: hex, color: '#FFFFFF' }
        : { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', color: '#475569' }
    }
  >
    {label}
    {sub ? <span className="block text-[10px] font-normal opacity-80">{sub}</span> : null}
  </button>
);

export const ColourSynthesisCompare: React.FC = () => {
  const [rgb, setRgb] = useState<Rgb[]>(['R', 'V', 'B']);
  const [cmj, setCmj] = useState<Cmj[]>(['C', 'M', 'J']);

  const toggle = <T extends string>(list: T[], set: (v: T[]) => void, key: T) => {
    set(list.includes(key) ? list.filter((x) => x !== key) : [...list, key]);
  };

  // additif : union des composantes allumées
  const addSet = rgb.slice().sort().join('');
  const addResult = ADDITIVE_RESULT[addSet] ?? { ar: 'أسود', hex: '#0F172A' };

  // soustractif : intersection des composantes laissées passer
  let alive: Rgb[] = [...RGB_ALL];
  cmj.forEach((k) => {
    const absorbed = CMJ_META[k].absorbs;
    alive = alive.filter((c) => c !== absorbed);
  });
  const subResult = SUBTRACTIVE_RESULT[cmj.slice().sort().join('')] ?? { ar: 'أسود', hex: '#0F172A' };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
      {/* Additif */}
      <div className="rounded-[14px] border-2 border-[#DC2626] bg-white p-4 space-y-3">
        <div className="text-center">
          <div className="text-sm font-bold text-[#DC2626]">التركيب الجمعي — Additif</div>
          <div className="text-[11px] text-[#64748B]">نُشعل أضواء ملوّنة (نبدأ من الظلام)</div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {RGB_ALL.map((c) => (
            <Toggle
              key={c}
              label={RGB_META[c].ar}
              on={rgb.includes(c)}
              hex={RGB_META[c].hex}
              onClick={() => toggle(rgb, setRgb, c)}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-[#94A3B8]">↓</div>

        <div
          className="rounded-[10px] p-3 text-center text-sm font-bold border-2"
          style={{
            backgroundColor: addResult.hex,
            borderColor: addResult.hex,
            color: addResult.hex === '#F8FAFC' ? '#0F172A' : '#FFFFFF',
          }}
        >
          {addResult.ar}
        </div>

        <div className="text-[11px] text-center text-[#64748B] font-mono" dir="ltr">
          {rgb.length ? rgb.map((c) => RGB_META[c].ar).join(' + ') + ' → ' + addResult.ar : 'لا ضوء'}
        </div>
        <div className="text-[11px] text-center text-[#7F1D1D]">يضيف مكوّنات ⟵ كلّما زاد عدد الأضواء زاد الناتج إضاءة</div>
      </div>

      {/* Soustractif */}
      <div className="rounded-[14px] border-2 border-[#0F766E] bg-white p-4 space-y-3">
        <div className="text-center">
          <div className="text-sm font-bold text-[#0F766E]">التركيب الطرحي — Soustractif</div>
          <div className="text-[11px] text-[#64748B]">نَرصّ مرشحات أمام ضوء أبيض (نبدأ من الأبيض)</div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {CMJ_ALL.map((k) => (
            <Toggle
              key={k}
              label={`${CMJ_META[k].ar} · ${CMJ_META[k].fr}`}
              sub={`يمتص ${RGB_META[CMJ_META[k].absorbs].ar}`}
              on={cmj.includes(k)}
              hex={CMJ_META[k].hex}
              onClick={() => toggle(cmj, setCmj, k)}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-[#94A3B8]">↓</div>

        <div
          className="rounded-[10px] p-3 text-center text-sm font-bold border-2"
          style={{ backgroundColor: subResult.hex, borderColor: subResult.hex, color: '#FFFFFF' }}
        >
          {subResult.ar}
        </div>

        <div className="text-[11px] text-center text-[#64748B] font-mono" dir="ltr">
          {cmj.length ? cmj.map((k) => CMJ_META[k].fr).join(' + ') + ' → ' + subResult.ar : 'لا ترشيح → أبيض'}
        </div>
        <div className="text-[11px] text-center text-[#14532D]">
          {alive.length ? (
            <>
              يطرح مكوّنات ⟵ الباقي: {alive.map((c) => RGB_META[c].ar).join(' + ')}
            </>
          ) : (
            <>يطرح مكوّنات ⟵ لم يبقَ أيّ مكوّن (أسود في النموذج المثالي)</>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColourSynthesisCompare;