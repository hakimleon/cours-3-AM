import React, { useState } from 'react';

/**
 * Triangle de la puissance (Cours 17).
 * Deux valeurs connues -> calcule la troisième (P = U × I, U = P / I, I = P / U).
 */

const fmt = (v: number, digits = 2) =>
  v
    .toFixed(digits)
    .replace('.', ',')
    .replace(/,?0+$/, '');

export const PowerTriangle: React.FC = () => {
  const [U, setU] = useState('12');
  const [I, setI] = useState('0,25');
  const [P, setP] = useState('');

  const u = parseFloat(U.replace(',', '.'));
  const i = parseFloat(I.replace(',', '.'));
  const p = parseFloat(P.replace(',', '.'));

  const hasU = !Number.isNaN(u);
  const hasI = !Number.isNaN(i);
  const hasP = !Number.isNaN(p);

  let missing: 'U' | 'I' | 'P' | null = null;
  let result: number | null = null;
  let formula = '';

  if (!hasP && hasU && hasI) {
    missing = 'P';
    result = u * i;
    formula = 'P = U × I';
  } else if (!hasU && hasP && hasI && i !== 0) {
    missing = 'U';
    result = p / i;
    formula = 'U = P / I';
  } else if (!hasI && hasP && hasU && u !== 0) {
    missing = 'I';
    result = p / u;
    formula = 'I = P / U';
  }

  const messages: Record<string, string> = {
    P: 'الاستطاعة هي حاصل ضرب التوتر في شدة التيار.',
    U: 'كلما زادت الاستطاعة عند نفس التيار، ارتفع التوتر بين الطرفين.',
    I: 'كلما زادت الاستطاعة عند نفس التوتر، زادت شدة التيار المارّ.',
  };

  const unit = missing === 'P' ? 'W' : missing === 'U' ? 'V' : 'A';

  return (
    <div className="space-y-5" dir="rtl">
      {/* Triangle */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 300 170" className="w-full max-w-[260px] h-auto">
          <polygon points="150,15 285,155 15,155" fill="#F6F0EB" stroke="#0F766E" strokeWidth="3" />
          <line x1="150" y1="15" x2="150" y2="155" stroke="#0F766E" strokeWidth="2" />
          <line x1="46" y1="107" x2="254" y2="107" stroke="#0F766E" strokeWidth="2" />

          <text
            x="150"
            y="70"
            textAnchor="middle"
            fill="#0F766E"
            fontSize="28"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            P
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
            U
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

          {missing === 'P' && (
            <circle cx="150" cy="70" r="26" fill="#DCFCE7" stroke="#15803D" strokeWidth="3" />
          )}
          {missing === 'U' && (
            <circle cx="102" cy="142" r="22" fill="#FEF3C7" stroke="#B45309" strokeWidth="3" />
          )}
          {missing === 'I' && (
            <circle cx="198" cy="142" r="22" fill="#DBEAFE" stroke="#0369A1" strokeWidth="3" />
          )}
        </svg>

        <div className="text-[11px] text-[#64748B] text-center mt-1">
          غطِّ الكمية المجهولة في المثلث لتعرف العلاقة
        </div>
      </div>

      {/* Champs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'التوتر U', unit: 'V', value: U, set: setU, color: '#B45309' },
          { label: 'شدة التيار I', unit: 'A', value: I, set: setI, color: '#0369A1' },
          { label: 'الاستطاعة P', unit: 'W', value: P, set: setP, color: '#15803D' },
        ].map((f) => (
          <label key={f.label} className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 space-y-1.5">
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
              {formula} = {fmt(result)} {unit}
            </div>
            <div className="text-xs">{messages[missing]}</div>
          </>
        ) : (
          <div className="text-xs">
            أدخل قيمتين واترك الثالثة فارغة، ثم اضغط على الزر لعرض النتيجة داخل المثلث.
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          if (result === null) return;
          const rounded = String(Number(result.toFixed(4)));
          if (missing === 'P') setP(rounded);
          if (missing === 'U') setU(rounded);
          if (missing === 'I') setI(rounded);
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

export default PowerTriangle;