import React, { useState } from 'react';

/**
 * Composant interactif : Banc de mesure des lois de Kirchhoff (Cours 14).
 * L'élève choisit où brancher l'ampèremètre / le voltmètre et lit les valeurs.
 */

type CircuitMode = 'series' | 'parallel';

const SERIES_POINTS: { id: string; label: string; I: number }[] = [
  { id: 'p1', label: 'قبل المصباح 1', I: 0.3 },
  { id: 'p2', label: 'بين المصباحين', I: 0.3 },
  { id: 'p3', label: 'بعد المصباح 2', I: 0.3 },
];

const PARALLEL_POINTS: { id: string; label: string; I: number }[] = [
  { id: 'main', label: 'المسار الرئيسي (قبل التفرع)', I: 0.5 },
  { id: 'b1', label: 'الفرع 1', I: 0.2 },
  { id: 'b2', label: 'الفرع 2', I: 0.3 },
];

const fmt = (v: number) => v.toFixed(2).replace('.', ',');

export const CircuitLawsInteractive: React.FC = () => {
  const [mode, setMode] = useState<CircuitMode>('series');
  const [amp, setAmp] = useState<string>('p1');
  const [volt, setVolt] = useState<string>('u_gen');

  const points = mode === 'series' ? SERIES_POINTS : PARALLEL_POINTS;
  const ampData = points.find((p) => p.id === amp) ?? points[0];

  const voltages: Record<string, { label: string; U: number }> =
    mode === 'series'
      ? {
          u_gen: { label: 'توتر المولد', U: 9 },
          u1: { label: 'توتر المصباح 1', U: 4 },
          u2: { label: 'توتر المصباح 2', U: 5 },
        }
      : {
          u_gen: { label: 'توتر المولد', U: 6 },
          u1: { label: 'توتر الفرع 1', U: 6 },
          u2: { label: 'توتر الفرع 2', U: 6 },
        };

  const voltData = voltages[volt] ?? voltages.u_gen;

  const conclusion =
    mode === 'series'
      ? 'شدة التيار هي نفسها في جميع نقاط المسار الواحد، أما التوترات فتتوزّع ومجموعها يساوي توتر المولد.'
      : 'التوتر هو نفسه بين الفروع المتّصلة بين نفس النقطتين، أما شدة التيار فتتوزّع على الفروع.';

  return (
    <div className="space-y-5" dir="rtl">
      {/* Choix du type de circuit */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-bold text-[#4A4A4A]">نوع التوصيل :</span>
        <button
          type="button"
          onClick={() => {
            setMode('series');
            setAmp('p1');
            setVolt('u_gen');
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
            mode === 'series'
              ? 'bg-[#1E40AF] text-white border-[#1E40AF]'
              : 'bg-white text-[#1E40AF] border-[#93C5FD] hover:bg-[#EFF6FF]'
          }`}
        >
          على التسلسل
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('parallel');
            setAmp('main');
            setVolt('u_gen');
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
            mode === 'parallel'
              ? 'bg-[#15803D] text-white border-[#15803D]'
              : 'bg-white text-[#15803D] border-[#86EFAC] hover:bg-[#F0FDF4]'
          }`}
        >
          على التفرع
        </button>
      </div>

      {/* Schéma */}
      <div className="w-full overflow-x-auto flex justify-center">
        <svg
          viewBox="0 0 900 260"
          className="w-full min-w-[560px] max-w-[900px] h-auto"
          role="img"
          aria-label={mode === 'series' ? 'دارة على التسلسل' : 'دارة على التفرع'}
        >
          {mode === 'series' ? (
            <>
              <polyline
                points="260,70 260,190 640,190 640,70"
                fill="none"
                stroke="#0F766E"
                strokeWidth="3"
              />
              <rect x="244" y="180" width="32" height="14" rx="2" fill="#fff" stroke="#334155" strokeWidth="2" />
              <text x="260" y="191" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">+ −</text>

              <circle cx="380" cy="70" r="15" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
              <text x="380" y="76" textAnchor="middle" fontSize="15" fontFamily="sans-serif">💡</text>
              <circle cx="520" cy="70" r="15" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
              <text x="520" y="76" textAnchor="middle" fontSize="15" fontFamily="sans-serif">💡</text>

              {/* points de mesure */}
              {[
                { x: 320, label: 'p1' },
                { x: 450, label: 'p2' },
                { x: 580, label: 'p3' },
              ].map((p) => {
                const active = amp === p.label;
                return (
                  <g key={p.label}>
                    <circle
                      cx={p.x}
                      cy="70"
                      r={active ? 17 : 9}
                      fill={active ? '#FFFFFF' : '#F1F5F9'}
                      stroke={active ? '#1E40AF' : '#64748B'}
                      strokeWidth={active ? 3 : 2}
                    />
                    <text
                      x={p.x}
                      y={active ? 77 : 75}
                      textAnchor="middle"
                      fill={active ? '#1E40AF' : '#64748B'}
                      fontSize={active ? 17 : 10}
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      {active ? 'A' : ''}
                    </text>
                  </g>
                );
              })}
            </>
          ) : (
            <>
              <polyline
                points="200,130 200,50 700,50"
                fill="none"
                stroke="#0F766E"
                strokeWidth="3"
              />
              <polyline
                points="200,130 200,210 700,210"
                fill="none"
                stroke="#0F766E"
                strokeWidth="3"
              />
              <polyline points="700,50 700,130" fill="none" stroke="#0F766E" strokeWidth="3" />
              <polyline
                points="700,130 760,130 760,90"
                fill="none"
                stroke="#0F766E"
                strokeWidth="3"
              />
              <rect x="748" y="182" width="30" height="14" rx="2" fill="#fff" stroke="#334155" strokeWidth="2" />
              <text x="763" y="193" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">+ −</text>
              <polyline points="763,182 763,130 700,130" fill="none" stroke="#0F766E" strokeWidth="3" />

              <circle cx="330" cy="50" r="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
              <text x="330" y="56" textAnchor="middle" fontSize="14" fontFamily="sans-serif">💡</text>
              <circle cx="560" cy="50" r="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
              <text x="560" y="56" textAnchor="middle" fontSize="14" fontFamily="sans-serif">💡</text>

              <circle cx="200" cy="130" r="6" fill="#15803D" />
              <circle cx="700" cy="130" r="6" fill="#15803D" />

              {[
                { x: 150, y: 130, label: 'main' },
                { x: 430, y: 50, label: 'b1' },
                { x: 430, y: 210, label: 'b2' },
              ].map((p) => {
                const active = amp === p.label;
                return (
                  <g key={p.label}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={active ? 17 : 9}
                      fill={active ? '#FFFFFF' : '#F1F5F9'}
                      stroke={active ? '#1E40AF' : '#64748B'}
                      strokeWidth={active ? 3 : 2}
                    />
                    <text
                      x={p.x}
                      y={active ? p.y + 7 : p.y + 4}
                      textAnchor="middle"
                      fill={active ? '#1E40AF' : '#64748B'}
                      fontSize={active ? 17 : 10}
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      {active ? 'A' : ''}
                    </text>
                  </g>
                );
              })}
            </>
          )}
        </svg>
      </div>

      {/* Sélecteur ampèremètre */}
      <div className="bg-white rounded-[12px] border border-[#93C5FD] p-3 sm:p-4 space-y-2">
        <div className="text-xs font-bold text-[#1E40AF]">موضع الأمبيرمتر (يقيس شدة التيار)</div>
        <div className="flex flex-wrap gap-2">
          {points.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setAmp(p.id)}
              className={`px-3 py-1.5 rounded-[10px] text-[11px] font-bold border transition-all ${
                amp === p.id
                  ? 'bg-[#1E40AF] text-white border-[#1E40AF]'
                  : 'bg-[#EFF6FF] text-[#1E40AF] border-[#93C5FD] hover:bg-[#DBEAFE]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="text-sm font-bold text-[#1E40AF]">
          القراءة : I = {fmt(ampData.I)} A
        </div>
      </div>

      {/* Sélecteur voltmètre */}
      <div className="bg-white rounded-[12px] border border-[#86EFAC] p-3 sm:p-4 space-y-2">
        <div className="text-xs font-bold text-[#15803D]">موضع الفولطمتر (يقيس التوتر بين نقطتين)</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(voltages).map(([id, v]) => (
            <button
              key={id}
              type="button"
              onClick={() => setVolt(id)}
              className={`px-3 py-1.5 rounded-[10px] text-[11px] font-bold border transition-all ${
                volt === id
                  ? 'bg-[#15803D] text-white border-[#15803D]'
                  : 'bg-[#F0FDF4] text-[#15803D] border-[#86EFAC] hover:bg-[#DCFCE7]'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="text-sm font-bold text-[#15803D]">
          القراءة : U = {fmt(voltData.U)} V
        </div>
      </div>

      <div
        className={`rounded-[12px] p-3 sm:p-4 border text-xs leading-relaxed ${
          mode === 'series'
            ? 'bg-[#EFF6FF] border-[#93C5FD] text-[#1E3A8A]'
            : 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]'
        }`}
      >
        <strong>ماذا نلاحظ؟</strong> {conclusion}
      </div>
    </div>
  );
};

export default CircuitLawsInteractive;