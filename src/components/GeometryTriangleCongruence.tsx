import React, { useState } from 'react';

export const GeometryTriangleCongruence: React.FC = () => {
  const [activeCase, setActiveCase] = useState<'sss' | 'sas' | 'saa'>('sas');
  const [overlap, setOverlap] = useState<number>(0);

  // Base triangle ABC on left (x: 40..210) and triangle DEF on right (x: 310..480), moving towards ABC by overlap%
  const shiftX = (overlap / 100) * 260;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. LE SCHÉMA GÉOMÉTRIQUE EN VIS-À-VIS (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
          <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 mb-3">
            <span className="font-bold text-indigo-400">
              1. الشكل الهندسي : التطابق بالتراكب بين المثلثين ABC و DEF
            </span>
            <div className="no-pdf flex gap-1.5">
              {[
                { id: 'sss' as const, label: 'حالة 3 أضلاع (SSS)' },
                { id: 'sas' as const, label: 'ضلعان وزاوية محصورة (SAS)' },
                { id: 'saa' as const, label: 'زاويتان وضلع (SAA)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCase(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                    activeCase === tab.id
                      ? 'bg-indigo-600 border-indigo-400 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 520 245" className="w-full h-auto max-h-[250px] select-none">
            {/* Fixed Triangle ABC */}
            <polygon
              points="55,190 215,190 105,60"
              fill="#1e1b4b"
              fillOpacity="0.6"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <text x="105" y="46" fill="#818cf8" fontSize="13" fontWeight="bold" textAnchor="middle">A</text>
            <text x="42" y="198" fill="#818cf8" fontSize="13" fontWeight="bold">B</text>
            <text x="223" y="198" fill="#818cf8" fontSize="13" fontWeight="bold">C</text>

            {/* Markings on ABC according to activeCase */}
            {(activeCase === 'sss' || activeCase === 'sas') && (
              <>
                {/* Tick on AB */}
                <line x1="74" y1="122" x2="86" y2="128" stroke="#34d399" strokeWidth="2.5" />
                {/* Double tick on AC */}
                <line x1="152" y1="118" x2="164" y2="112" stroke="#fbbf24" strokeWidth="2.5" />
                <line x1="156" y1="124" x2="168" y2="118" stroke="#fbbf24" strokeWidth="2.5" />
              </>
            )}
            {(activeCase === 'sss' || activeCase === 'saa') && (
              <>
                {/* Triple tick on BC */}
                <line x1="130" y1="183" x2="130" y2="197" stroke="#fb7185" strokeWidth="2.5" />
                <line x1="136" y1="183" x2="136" y2="197" stroke="#fb7185" strokeWidth="2.5" />
                <line x1="142" y1="183" x2="142" y2="197" stroke="#fb7185" strokeWidth="2.5" />
              </>
            )}
            {activeCase === 'sas' && (
              <path d="M 96 83 A 26 26 0 0 0 122 80" fill="none" stroke="#f43f5e" strokeWidth="3" />
            )}
            {activeCase === 'saa' && (
              <>
                <path d="M 77 190 A 22 22 0 0 0 65 170" fill="none" stroke="#34d399" strokeWidth="2.5" />
                <path d="M 193 190 A 22 22 0 0 1 199 173" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
              </>
            )}

            {/* Moving Triangle DEF */}
            <g transform={`translate(${-shiftX}, 0)`}>
              <polygon
                points="315,190 475,190 365,60"
                fill="#064e3b"
                fillOpacity="0.45"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray={overlap === 100 ? 'none' : '6 3'}
                strokeLinejoin="round"
              />
              <text x="365" y="46" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">D</text>
              <text x="300" y="198" fill="#34d399" fontSize="13" fontWeight="bold">E</text>
              <text x="483" y="198" fill="#34d399" fontSize="13" fontWeight="bold">F</text>

              {(activeCase === 'sss' || activeCase === 'sas') && (
                <>
                  <line x1="334" y1="122" x2="346" y2="128" stroke="#34d399" strokeWidth="2.5" />
                  <line x1="412" y1="118" x2="424" y2="112" stroke="#fbbf24" strokeWidth="2.5" />
                  <line x1="416" y1="124" x2="428" y2="118" stroke="#fbbf24" strokeWidth="2.5" />
                </>
              )}
              {(activeCase === 'sss' || activeCase === 'saa') && (
                <>
                  <line x1="390" y1="183" x2="390" y2="197" stroke="#fb7185" strokeWidth="2.5" />
                  <line x1="396" y1="183" x2="396" y2="197" stroke="#fb7185" strokeWidth="2.5" />
                  <line x1="402" y1="183" x2="402" y2="197" stroke="#fb7185" strokeWidth="2.5" />
                </>
              )}
              {activeCase === 'sas' && (
                <path d="M 356 83 A 26 26 0 0 0 382 80" fill="none" stroke="#f43f5e" strokeWidth="3" />
              )}
              {activeCase === 'saa' && (
                <>
                  <path d="M 337 190 A 22 22 0 0 0 325 170" fill="none" stroke="#34d399" strokeWidth="2.5" />
                  <path d="M 453 190 A 22 22 0 0 1 459 173" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                </>
              )}
            </g>

            <text x="260" y="232" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">
              {overlap === 100
                ? 'انطباق تام! الرؤوس المتناظرة: D مع A ، و E مع B ، و F مع C'
                : 'اسحب المؤشر لمطابقة المثلث DEF فوق المثلث ABC'}
            </text>
          </svg>

          <div className="no-pdf w-full mt-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-emerald-400 font-bold">إزاحة المثلث DEF لاختبار التطابق بالتراكب:</span>
              <span className="font-mono text-white font-bold">{overlap}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={overlap}
              onChange={(e) => setOverlap(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* 2. LECTURE DU SCHÉMA EN VIS-À-VIS (5 cols) — sans redondance avec la propriété */}
        <div className="lg:col-span-5">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="text-xs font-black text-indigo-400">
              2. قراءة الشكل وتحديد العناصر المتناظرة :
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              في المثلثين <strong className="text-white">ABC</strong> و <strong className="text-emerald-300">DEF</strong>، الرموز المتماثلة على الشكل تدل على العناصر المتقايسة مثنى مثنى: الرأس <strong className="text-white">A</strong> يناظر <strong className="text-emerald-300">D</strong>، والضلع <strong className="text-white">[AB]</strong> يناظر <strong className="text-emerald-300">[DE]</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
