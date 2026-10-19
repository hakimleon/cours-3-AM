import React, { useState } from 'react';

/**
 * Laboratoire d'analyse de la lumière blanche par un prisme (Cours 18).
 * Lumière incidente blanche ou monochromatique -> spectre (ou bande unique) sur l'écran.
 */

type ColorKey = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet';

interface Band {
  key: ColorKey;
  ar: string;
  hex: string;
  /** déviation relative, en pixels vers le bas sur l'écran */
  offset: number;
}

const BANDS: Band[] = [
  { key: 'red', ar: 'أحمر', hex: '#DC2626', offset: 12 },
  { key: 'orange', ar: 'برتقالي', hex: '#EA580C', offset: 34 },
  { key: 'yellow', ar: 'أصفر', hex: '#FACC15', offset: 56 },
  { key: 'green', ar: 'أخضر', hex: '#16A34A', offset: 78 },
  { key: 'blue', ar: 'أزرق', hex: '#2563EB', offset: 100 },
  { key: 'violet', ar: 'بنفسجي', hex: '#7C3AED', offset: 122 },
];

const byKey = (k: ColorKey) => BANDS.find((b) => b.key === k)!;

export const PrismSpectrumLab: React.FC = () => {
  const [incoming, setIncoming] = useState<ColorKey | 'white'>('white');
  const [showWhy, setShowWhy] = useState(false);

  const isWhite = incoming === 'white';
  const activeBands: Band[] = isWhite ? BANDS : [byKey(incoming as ColorKey)];

  const message = isWhite
    ? 'الضوء الأبيض مركّب: تتفرّق مكوّناته بعد الموشور، فيظهر طيف ضوئي متدرّج.'
    : `الضوء ${byKey(incoming as ColorKey).ar} مركّب ضوئي واحد: لا ينحلّ إلى طيف، فالموشور ينحرفه ويبقيه لوناً واحداً.`;

  const why = isWhite
    ? 'اختلاف زاوية الانحراف بين المكوّنات ⟵ انفصال الألوان ⟵ ظهور الطيف.'
    : 'مكوّن ضوئي واحد ⟵ انحراف واحد ⟵ شريط واحد على الشاشة.';

  return (
    <div className="space-y-4" dir="rtl">
      {/* Sélecteur */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#475569]">الضوء الداخل إلى الموشور:</span>
        <button
          type="button"
          onClick={() => setIncoming('white')}
          className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border-2 transition-all ${
            isWhite
              ? 'bg-[#0F172A] text-white border-[#0F172A]'
              : 'bg-white text-[#475569] border-[#CBD5E1]'
          }`}
        >
          أبيض
        </button>
        {BANDS.map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => setIncoming(b.key)}
            className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border-2 transition-all ${
              !isWhite && incoming === b.key
                ? 'text-white'
                : 'bg-white text-[#475569] border-[#CBD5E1]'
            }`}
            style={
              !isWhite && incoming === b.key ? { backgroundColor: b.hex, borderColor: b.hex } : undefined
            }
          >
            {b.ar}
          </button>
        ))}
      </div>

      {/* Scène SVG */}
      <svg viewBox="0 0 470 270" className="w-full h-auto">
        {/* écran */}
        <rect x="404" y="10" width="18" height="250" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />

        {/* faisceau incident */}
        <polyline
          points="30,135 214,135"
          stroke={isWhite ? '#0F172A' : byKey(incoming as ColorKey).hex}
          strokeWidth="4"
          fill="none"
        />
        <polygon points="26,130 44,135 26,140" fill={isWhite ? '#0F172A' : byKey(incoming as ColorKey).hex} />
        <text x="34" y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155" fontFamily="sans-serif">
          {isWhite ? 'أبيض' : byKey(incoming as ColorKey).ar}
        </text>

        {/* prisme */}
        <polygon points="214,70 214,200 290,135" fill="#E0F2FE" stroke="#0F766E" strokeWidth="3" />

        {/* faisceaux émergents */}
        {activeBands.map((b) => (
          <React.Fragment key={b.key}>
            <polyline
              points="288,135 404,135 + b.offset - b.offset"
              stroke={b.hex}
              strokeWidth="2.5"
              fill="none"
            />
            <polyline
              points={`288,135 404,${145 + b.offset}`}
              stroke={b.hex}
              strokeWidth="2.5"
              fill="none"
            />
            <rect
              x="406"
              y={140 + b.offset - 6}
              width="14"
              height="12"
              rx="2"
              fill={b.hex}
            />
          </React.Fragment>
        ))}

        {/* legend on the screen */}
        {activeBands.map((b, i) => (
          <text
            key={b.key}
            x="394"
            y={140 + b.offset + 4}
            textAnchor="end"
            fontSize="10"
            fontWeight="bold"
            fill="#334155"
            fontFamily="sans-serif"
            opacity={i === 0 && !isWhite ? 1 : 0.9}
          >
            {b.ar}
          </text>
        ))}

        <text x="413" y="270" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569" fontFamily="sans-serif">
          الشاشة
        </text>
      </svg>

      {/* Bandeau message */}
      <div
        className={`rounded-[12px] p-3 sm:p-4 border text-xs leading-relaxed text-center ${
          isWhite
            ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]'
            : 'bg-[#FFFBEB] border-[#FCD34D] text-[#78350F]'
        }`}
      >
        {message}
      </div>

      <button
        type="button"
        onClick={() => setShowWhy((v) => !v)}
        className="w-full py-2 rounded-[10px] text-xs font-bold bg-[#0F766E] text-white hover:opacity-95 transition-all"
      >
        {showWhy ? 'إخفاء التفسير' : 'اعرض التفسير'}
      </button>

      {showWhy && (
        <div className="rounded-[12px] border border-[#E2D9D0] bg-[#FAF7F4] p-3 sm:p-4 text-xs text-[#475569] leading-relaxed">
          {why}
        </div>
      )}
    </div>
  );
};

export default PrismSpectrumLab;