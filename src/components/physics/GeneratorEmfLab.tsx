import React, { useState } from 'react';

/**
 * Laboratoire du générateur réel (Cours 16).
 * L'élève fait varier E, r et I et observe U = E - r.I.
 */

const fmt = (v: number, d = 2) => {
  const s = v.toFixed(d).replace('.', ',');
  return s.replace(/,?0+$/, '');
};

export const GeneratorEmfLab: React.FC = () => {
  const [E, setE] = useState(6);
  const [r, setR] = useState(1);
  const [I, setI] = useState(2);

  const U = E - r * I;
  const isOpen = I === 0;
  const drop = r * I;

  return (
    <div className="space-y-5" dir="rtl">
      {/* Schéma du générateur réel */}
      <div className="w-full overflow-x-auto flex justify-center">
        <svg
          viewBox="0 0 860 300"
          className="w-full min-w-[600px] max-w-[860px] h-auto"
          role="img"
          aria-label="نموذج المولد الحقيقي: مصدر مثالي ومقاومة داخلية"
        >
          <defs>
            <marker id="gl16" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 Z" fill="currentColor" />
            </marker>
          </defs>

          {/* circuit extérieur */}
          <polyline
            points="200,80 200,40 660,40 660,230 200,230 200,190"
            fill="none"
            stroke="#0F766E"
            strokeWidth="3"
            markerEnd="url(#gl16)"
          />

          {/* Générateur réel : E en série avec r */}
          <circle cx="200" cy="112" r="34" fill="#FFFFFF" stroke="#B45309" strokeWidth="3" />
          <text x="200" y="122" textAnchor="middle" fill="#B45309" fontSize="26" fontWeight="bold" fontFamily="sans-serif">
            E
          </text>
          <polyline points="200,146 200,190" fill="none" stroke="#B45309" strokeWidth="3" />

          <rect x="176" y="190" width="48" height="0" fill="none" />
          <circle cx="200" cy="190" r="0" fill="none" />
          <rect x="182" y="162" width="36" height="26" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          <text x="200" y="181" textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
            r
          </text>

          {/* Lampe */}
          <circle cx="430" cy="40" r="17" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          <text x="430" y="47" textAnchor="middle" fontSize="16" fontFamily="sans-serif">💡</text>

          {/* Annotations */}
          <text x="112" y="116" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold" fontFamily="sans-serif">+</text>
          <text x="288" y="116" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold" fontFamily="sans-serif">−</text>

          {/* Fleche de tension U entre les bornes */}
          <line x1="252" y1="100" x2="252" y2="124" stroke="#0369A1" strokeWidth="2.5" markerEnd="url(#gl16)" />
          <text x="266" y="116" fill="#0369A1" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
            U = {fmt(U)} V
          </text>

          {/* Fleche I */}
          <text x="530" y="26" textAnchor="middle" fill="#0F766E" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
            I = {fmt(I, 1)} A
          </text>

          {/* Chute interne */}
          {drop > 0 && (
            <text x="200" y="285" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
              chute interne r·I = {fmt(drop)} V
            </text>
          )}
        </svg>
      </div>

      {/* Contrôles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            label: 'القوة المحركة E',
            unit: 'V',
            val: E,
            set: setE,
            min: 0,
            max: 12,
            step: 0.5,
            color: '#B45309',
          },
          {
            label: 'المقاومة الداخلية r',
            unit: 'Ω',
            val: r,
            set: setR,
            min: 0,
            max: 4,
            step: 0.5,
            color: '#D97706',
          },
          {
            label: 'شدة التيار I',
            unit: 'A',
            val: I,
            set: setI,
            min: 0,
            max: 8,
            step: 0.5,
            color: '#0369A1',
          },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] border border-[#E2D9D0] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold" style={{ color: c.color }}>
                {c.label}
              </span>
              <span className="text-sm font-bold font-mono" style={{ color: c.color }}>
                {fmt(c.val, 1)} {c.unit}
              </span>
            </div>
            <input
              type="range"
              min={c.min}
              max={c.max}
              step={c.step}
              value={c.val}
              onChange={(e) => c.set(parseFloat(e.target.value))}
              className="w-full accent-[#0F766E]"
            />
          </div>
        ))}
      </div>

      {/* Résultat */}
      <div
        className={`rounded-[12px] p-3 sm:p-4 border space-y-2 ${
          isOpen ? 'bg-[#F0FDF4] border-[#86EFAC]' : 'bg-[#EFF6FF] border-[#93C5FD]'
        }`}
      >
        <div className="font-mono font-bold text-lg text-center" dir="ltr" style={{ color: isOpen ? '#15803D' : '#1E40AF' }}>
          U = E − r·I = {fmt(E, 1)} − {fmt(r, 1)}×{fmt(I, 1)} = {fmt(U)} V
        </div>
        <div className="text-xs text-center leading-relaxed" style={{ color: isOpen ? '#14532D' : '#1E3A8A' }}>
          {isOpen
            ? 'الدارة مفتوحة : لا يمرّ أي تيار، إذن U = E. لهذا يمكن قياس القوة المحركة الكهربائية في هذه الحالة.'
            : drop > 0
              ? 'المولد الحقيقي لا يحافظ على توتره : جزء من التوتر يسقط داخله على شكل r·I، فيصبح U أصغر من E.'
              : 'المقاومة الداخلية معدومة (مولد مثالي) : التوتر بين القطبين يساوي دائماً القوة المحركة.'}
        </div>
      </div>
    </div>
  );
};

export default GeneratorEmfLab;