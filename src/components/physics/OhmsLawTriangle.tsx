import React, { useState } from 'react';

/**
 * Triangle d'Ohm interactif (Cours 15).
 * Deux valeurs connues -> calcule la troisième et met à jour le triangle.
 */

const fmt = (v: number, digits = 2) =>
  v
    .toFixed(digits)
    .replace('.', ',')
    .replace(/,?0+$/, '');

export const OhmsLawTriangle: React.FC = () => {
  const [U, setU] = useState('12');
  const [R, setR] = useState('60');
  const [I, setI] = useState('');

  const u = parseFloat(U.replace(',', '.'));
  const r = parseFloat(R.replace(',', '.'));
  const i = parseFloat(I.replace(',', '.'));

  const hasU = !Number.isNaN(u);
  const hasR = !Number.isNaN(r);
  const hasI = !Number.isNaN(i);

  // Determine which variable is missing
  let missing: 'U' | 'R' | 'I' | null = null;
  let result: number | null = null;
  let formula = '';

  if (!hasI && hasU && hasR && r !== 0) {
    missing = 'I';
    result = u / r;
    formula = 'I = U / R';
  } else if (!hasR && hasU && hasI && i !== 0) {
    missing = 'R';
    result = u / i;
    formula = 'R = U / I';
  } else if (!hasU && hasR && hasI) {
    missing = 'U';
    result = r * i;
    formula = 'U = R × I';
  }

  const messages: Record<string, string> = {
    I: 'المقاومة الأكبر ⟵ شدة التيار أصغر عند نفس التوتر.',
    R: 'كلما زادت شدة التيار عند نفس التوتر، انقصت المقاومة.',
    U: 'التوتر هو حاصل ضرب المقاومة في شدة التيار.',
  };

  return (
    <div className="space-y-5" dir="rtl">
      {/* Triangle */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 300 170" className="w-full max-w-[260px] h-auto">
          <polygon
            points="150,15 285,155 15,155"
            fill="#F6F0EB"
            stroke="#0F766E"
            strokeWidth="3"
          />
          {/* divider */}
          <line x1="150" y1="15" x2="150" y2="155" stroke="#0F766E" strokeWidth="2" />
          <line x1="46" y1="107" x2="254" y2="107" stroke="#0F766E" strokeWidth="2" />

          <text
            x="150"
            y="70"
            textAnchor="middle"
            fill="#0F766E"
            fontSize="30"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            U
          </text>
          <text
            x="102"
            y="142"
            textAnchor="middle"
            fill="#B45309"
            fontSize="26"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            R
          </text>
          <text
            x="198"
            y="142"
            textAnchor="middle"
            fill="#0369A1"
            fontSize="26"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            I
          </text>

          {missing === 'I' && (
            <circle cx="198" cy="142" r="22" fill="#DBEAFE" stroke="#0369A1" strokeWidth="3" />
          )}
          {missing === 'R' && (
            <circle cx="102" cy="142" r="22" fill="#FEF3C7" stroke="#B45309" strokeWidth="3" />
          )}
          {missing === 'U' && (
            <circle cx="150" cy="70" r="26" fill="#DCFCE7" stroke="#15803D" strokeWidth="3" />
          )}
        </svg>

        <div className="text-[11px] text-[#64748B] text-center mt-1">
          غطِّ الكمية المجهولة في المثلث لتعرف العلاقة
        </div>
      </div>

      {/* Champs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'التوتر U', unit: 'V', value: U, set: setU, color: '#15803D' },
          { label: 'المقاومة R', unit: 'Ω', value: R, set: setR, color: '#B45309' },
          { label: 'شدة التيار I', unit: 'A', value: I, set: setI, color: '#0369A1' },
        ].map((f) => (
          <label
            key={f.label}
            className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 space-y-1.5"
          >
            <span className="block text-xs font-bold" style={{ color: f.color }}>
              {f.label}
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                inputMode="decimal"
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="w-full px-2 py-1.5 rounded-[8px] border border-[#CBD5E1] text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                style={{ color: f.color }}
              />
              <span className="text-xs font-bold text-[#64748B] shrink-0">{f.unit}</span>
            </div>
          </label>
        ))}
      </div>

      {/* Résultat */}
      <div
        className={`rounded-[12px] p-3 sm:p-4 border text-sm space-y-1 ${
          result !== null
            ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]'
            : 'bg-[#F6F0EB] border-[#E2D9D0] text-[#64748B]'
        }`}
      >
        {result !== null && missing ? (
          <>
            <div className="font-mono font-bold" dir="ltr" style={{ fontSize: '1rem' }}>
              {formula} = {fmt(result)}{' '}
              {missing === 'I' ? 'A' : missing === 'R' ? 'Ω' : 'V'}
            </div>
            <div className="text-xs">{messages[missing]}</div>
          </>
        ) : (
          <div className="text-xs">
            أدخل قيمتين واترك الثالثة فارغة، ثم اضغط على الزر لعرض النتيجة داخل المثلث.
          </div>
        )}
      </div>

      {/* Vérification de cohérence */}
      <button
        type="button"
        onClick={() => {
          if (missing === 'I' && result !== null) setI(String(Number(result.toFixed(4))));
          if (missing === 'R' && result !== null) setR(String(Number(result.toFixed(4))));
          if (missing === 'U' && result !== null) setU(String(Number(result.toFixed(4))));
        }}
        disabled={result === null}
        className={`w-full py-2 rounded-[10px] text-xs font-bold transition-all ${
          result === null
            ? 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
            : 'bg-[#0F766E] text-white hover:opacity-95'
        }`}
      >
        اعرض النتيجة داخل المثلث
      </button>
    </div>
  );
};

export default OhmsLawTriangle;