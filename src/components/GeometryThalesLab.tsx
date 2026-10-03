import React, { useState } from 'react';

/**
 * Figure interactive de lecture pour le Cours 12 (Thalès)
 * Conforme à la Règle 1 (Anti-redondance) et au Design SchoolMouv :
 * Présente uniquement la figure dynamique et la lecture des éléments géométriques,
 * sans dupliquer l'énoncé de la propriété ni ajouter de bloc "اكتشاف الفكرة" redondant.
 */
export const GeometryThalesLab: React.FC = () => {
  const [scaleK, setScaleK] = useState<number>(0.5);

  // Triangle ABC coordinates
  const A = { x: 220, y: 26 };
  const B = { x: 55, y: 176 };
  const C = { x: 385, y: 176 };

  // M on [AB] and N on [AC] with ratio scaleK = AM / AB = AN / AC
  const M = {
    x: A.x + scaleK * (B.x - A.x),
    y: A.y + scaleK * (B.y - A.y),
  };
  const N = {
    x: A.x + scaleK * (C.x - A.x),
    y: A.y + scaleK * (C.y - A.y),
  };

  const abVal = 12;
  const acVal = 15;
  const bcVal = 18;

  const amVal = Number((abVal * scaleK).toFixed(1));
  const anVal = Number((acVal * scaleK).toFixed(1));
  const mnVal = Number((bcVal * scaleK).toFixed(1));

  return (
    <figure
      dir="rtl"
      className="bg-[#F6F0EB]/50 border border-[#E5DDD5] rounded-[16px] p-4 sm:p-5 my-4 space-y-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Schéma géométrique (7 cols) */}
        <div className="md:col-span-7 bg-[#FFFFFF] border border-[#E5DDD5] rounded-[12px] p-3 flex flex-col items-center">
          <svg
            dir="ltr"
            viewBox="0 0 440 205"
            className="w-full h-auto max-h-[195px] select-none"
          >
            {/* Grand triangle ABC (--fig-shape #5B7BC0) */}
            <polygon
              points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
              fill="#5B7BC0"
              fillOpacity="0.06"
              stroke="#5B7BC0"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Petit triangle AMN */}
            <polygon
              points={`${A.x},${A.y} ${M.x},${M.y} ${N.x},${N.y}`}
              fill="#F5A54A"
              fillOpacity="0.10"
              stroke="#5B7BC0"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Droite parallèle (MN) et base (BC) en --fig-mark (#F5A54A) */}
            <line
              x1={M.x - 18}
              y1={M.y}
              x2={N.x + 18}
              y2={N.y}
              stroke="#F5A54A"
              strokeWidth="2.6"
              strokeDasharray="5 3"
            />
            <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#F5A54A" strokeWidth="2.8" />

            {/* Sommets */}
            <circle cx={A.x} cy={A.y} r="4" fill="#5B7BC0" />
            <text
              x={A.x}
              y={A.y - 8}
              fill="#4A4A4A"
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
            >
              A
            </text>

            <circle cx={M.x} cy={M.y} r="4" fill="#F5A54A" />
            <text x={M.x - 18} y={M.y - 5} fill="#F5A54A" fontSize="12" fontWeight="bold">
              M
            </text>

            <circle cx={N.x} cy={N.y} r="4" fill="#F5A54A" />
            <text x={N.x + 10} y={N.y - 5} fill="#F5A54A" fontSize="12" fontWeight="bold">
              N
            </text>

            <circle cx={B.x} cy={B.y} r="4" fill="#5B7BC0" />
            <text x={B.x - 15} y={B.y + 5} fill="#4A4A4A" fontSize="12" fontWeight="bold">
              B
            </text>

            <circle cx={C.x} cy={C.y} r="4" fill="#5B7BC0" />
            <text x={C.x + 8} y={C.y + 5} fill="#4A4A4A" fontSize="12" fontWeight="bold">
              C
            </text>

            {/* Mesures dynamiques */}
            <text
              x={(A.x + M.x) / 2 - 30}
              y={(A.y + M.y) / 2}
              fill="#5B7BC0"
              fontSize="11"
              fontWeight="bold"
            >
              AM = {amVal}
            </text>
            <text
              x={(A.x + N.x) / 2 + 10}
              y={(A.y + N.y) / 2}
              fill="#5B7BC0"
              fontSize="11"
              fontWeight="bold"
            >
              AN = {anVal}
            </text>
            <text
              x={A.x}
              y={M.y - 6}
              fill="#F5A54A"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              MN = {mnVal}
            </text>
            <text
              x={A.x}
              y={B.y + 18}
              fill="#4A4A4A"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
            >
              BC = {bcVal} cm (AB = {abVal} , AC = {acVal})
            </text>
          </svg>

          <div className="no-pdf w-full mt-2 pt-2 border-t border-[#E5DDD5]">
            <div className="flex justify-between text-xs mb-1 text-[#4A4A4A]">
              <span className="font-bold text-[#C94BA6]">تحريك المستقيم الموازي (MN) :</span>
              <span dir="ltr" className="font-bold text-[#C94BA6]">
                AM/AB = AN/AC = MN/BC = {scaleK}
              </span>
            </div>
            <input
              type="range"
              min="0.25"
              max="0.75"
              step="0.25"
              value={scaleK}
              onChange={(e) => setScaleK(Number(e.target.value))}
              className="w-full h-1.5 bg-[#E5DDD5] rounded-lg appearance-none cursor-pointer accent-[#C94BA6]"
            />
          </div>
        </div>

        {/* Lecture directe de la figure (5 cols) — sans redondance avec la propriété */}
        <div className="md:col-span-5 space-y-2 text-xs sm:text-sm text-[#4A4A4A] leading-[1.85]">
          <div className="font-bold text-[#C94BA6]">قراءة الشكل الهندسي :</div>
          <ul className="space-y-1.5 pr-1">
            <li className="flex items-baseline gap-2">
              <span className="w-[4px] h-[4px] rounded-full bg-[#C94BA6] shrink-0 translate-y-[-3px]" />
              <span>
                <strong>A</strong> هو الرأس المشترك للمثلثين <strong>AMN</strong> و{' '}
                <strong>ABC</strong>.
              </span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="w-[4px] h-[4px] rounded-full bg-[#C94BA6] shrink-0 translate-y-[-3px]" />
              <span>
                النقط <strong dir="ltr">A, M, B</strong> والنقط{' '}
                <strong dir="ltr">A, N, C</strong> في استقامية وبنفس الترتيب.
              </span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="w-[4px] h-[4px] rounded-full bg-[#C94BA6] shrink-0 translate-y-[-3px]" />
              <span>
                المستقيم <strong dir="ltr">(MN)</strong> يوازي حامل الضلع{' '}
                <strong dir="ltr">(BC)</strong>.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <figcaption className="text-xs text-[#8C8C8C] text-center">
        الشكل التوضيحي : المثلثان المتداخلان AMN و ABC مع توازي المستقيمين (MN) و (BC)
      </figcaption>
    </figure>
  );
};
