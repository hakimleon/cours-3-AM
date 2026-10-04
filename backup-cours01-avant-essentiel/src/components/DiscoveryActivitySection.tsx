import React, { useState, useEffect } from 'react';
import { DiscoveryActivity } from '../types';
import { SectionTitle } from './SchoolMouvBlocks';
import { formatTextWithSuperscripts } from './MathView';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Schémas géométriques simples accompagnant l'activité de découverte (Section 0)
 * Conformes aux tokens SchoolMouv : --fig-shape (#5B7BC0) et --fig-mark (#F5A54A), points en lettres latines, dir="ltr".
 */
const DiscoverySchematicDiagram: React.FC<{
  diagramType: NonNullable<DiscoveryActivity['diagramType']>;
}> = ({ diagramType }) => {
  switch (diagramType) {
    case 'thales-nested':
      // Deux triangles emboîtés AMN et ABC avec (MN) // (BC)
      return (
        <figure className="flex flex-col items-center justify-center bg-[#F6F0EB]/55 rounded-[12px] p-3 border border-[#E5DDD5]">
          <svg dir="ltr" viewBox="0 0 230 145" className="w-full max-w-[220px] h-auto">
            {/* Triangle principal ABC (--fig-shape #5B7BC0) */}
            <polygon
              points="45,22 25,122 195,122"
              fill="#5B7BC0"
              fillOpacity="0.06"
              stroke="#5B7BC0"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Segment parallèle [MN] (--fig-mark #F5A54A) */}
            <line
              x1="37"
              y1="62"
              x2="105"
              y2="62"
              stroke="#F5A54A"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Points */}
            <circle cx="45" cy="22" r="3" fill="#5B7BC0" />
            <circle cx="25" cy="122" r="3" fill="#5B7BC0" />
            <circle cx="195" cy="122" r="3" fill="#5B7BC0" />
            <circle cx="37" cy="62" r="3" fill="#F5A54A" />
            <circle cx="105" cy="62" r="3" fill="#F5A54A" />
            {/* Noms des sommets */}
            <text x="41" y="14" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              A
            </text>
            <text x="11" y="128" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              B
            </text>
            <text x="202" y="128" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              C
            </text>
            <text x="20" y="65" fill="#F5A54A" fontSize="12" fontWeight="bold">
              M
            </text>
            <text x="112" y="60" fill="#F5A54A" fontSize="12" fontWeight="bold">
              N
            </text>
            {/* Indication (MN) // (BC) */}
            <text x="125" y="38" fill="#4A4A4A" fontSize="10.5" fontWeight="bold">
              (MN) // (BC)
            </text>
          </svg>
          <figcaption className="text-[11px] text-[#4A4A4A]/80 mt-1 text-center">
            مثلثان متداخلان AMN و ABC حيث (MN) // (BC)
          </figcaption>
        </figure>
      );

    case 'converse-pythagoras':
      // Triangle ABC de côtés 6 cm, 8 cm, 10 cm avec angle Â à tester (?)
      return (
        <figure className="flex flex-col items-center justify-center bg-[#F6F0EB]/55 rounded-[12px] p-3 border border-[#E5DDD5]">
          <svg dir="ltr" viewBox="0 0 230 140" className="w-full max-w-[220px] h-auto">
            <polygon
              points="45,112 45,28 190,112"
              fill="#5B7BC0"
              fillOpacity="0.06"
              stroke="#5B7BC0"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Plus grand côté [BC] mis en évidence */}
            <line x1="45" y1="28" x2="190" y2="112" stroke="#F5A54A" strokeWidth="2.4" />
            {/* Point d'interrogation sur l'angle A */}
            <path
              d="M 45,94 A 18,18 0 0,1 63,112"
              fill="none"
              stroke="#F5A54A"
              strokeWidth="1.8"
              strokeDasharray="3 2"
            />
            <text x="58" y="98" fill="#F5A54A" fontSize="12" fontWeight="bold">
              ?
            </text>
            {/* Labels */}
            <text x="29" y="122" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              A
            </text>
            <text x="30" y="24" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              B
            </text>
            <text x="196" y="120" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              C
            </text>
            <text x="8" y="74" fill="#5B7BC0" fontSize="10.5" fontWeight="bold">
              6 cm
            </text>
            <text x="105" y="128" fill="#5B7BC0" fontSize="10.5" fontWeight="bold">
              8 cm
            </text>
            <text x="122" y="62" fill="#F5A54A" fontSize="10.5" fontWeight="bold">
              10 cm
            </text>
          </svg>
          <figcaption className="text-[11px] text-[#4A4A4A]/80 mt-1 text-center">
            المثلث ABC علمت أطوال أضلاعه الثلاثة فقط
          </figcaption>
        </figure>
      );

    case 'pythagoras-squares':
      return (
        <figure className="flex flex-col items-center justify-center bg-[#F6F0EB]/55 rounded-[12px] p-3 border border-[#E5DDD5]">
          <svg dir="ltr" viewBox="0 0 230 140" className="w-full max-w-[220px] h-auto">
            <polygon
              points="45,112 45,28 190,112"
              fill="#5B7BC0"
              fillOpacity="0.06"
              stroke="#5B7BC0"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Angle droit en A */}
            <polyline
              points="45,98 59,98 59,112"
              fill="none"
              stroke="#F5A54A"
              strokeWidth="2"
            />
            <line x1="45" y1="28" x2="190" y2="112" stroke="#F5A54A" strokeWidth="2.4" />
            <text x="29" y="122" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              A
            </text>
            <text x="30" y="24" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              B
            </text>
            <text x="196" y="120" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              C
            </text>
            <text x="122" y="62" fill="#F5A54A" fontSize="10.5" fontWeight="bold">
              الوتر [BC]
            </text>
          </svg>
          <figcaption className="text-[11px] text-[#4A4A4A]/80 mt-1 text-center">
            مثلث ABC قائم الزاوية في A ووتره [BC]
          </figcaption>
        </figure>
      );

    case 'circumcircle-right':
      return (
        <figure className="flex flex-col items-center justify-center bg-[#F6F0EB]/55 rounded-[12px] p-3 border border-[#E5DDD5]">
          <svg dir="ltr" viewBox="0 0 230 145" className="w-full max-w-[220px] h-auto">
            <circle
              cx="115"
              cy="75"
              r="56"
              fill="none"
              stroke="#5B7BC0"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <polygon
              points="59,75 171,75 85,28"
              fill="#5B7BC0"
              fillOpacity="0.06"
              stroke="#5B7BC0"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <line
              x1="115"
              y1="75"
              x2="85"
              y2="28"
              stroke="#F5A54A"
              strokeWidth="2.2"
              strokeDasharray="3 2"
            />
            <circle cx="115" cy="75" r="3.2" fill="#F5A54A" />
            <text x="75" y="21" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              A
            </text>
            <text x="44" y="79" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              B
            </text>
            <text x="176" y="79" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              C
            </text>
            <text x="112" y="92" fill="#F5A54A" fontSize="12" fontWeight="bold">
              O
            </text>
          </svg>
          <figcaption className="text-[11px] text-[#4A4A4A]/80 mt-1 text-center">
            المثلث القائم ABC في A ومنتصف الوتر O
          </figcaption>
        </figure>
      );

    case 'median-rectangle':
      return (
        <figure className="flex flex-col items-center justify-center bg-[#F6F0EB]/55 rounded-[12px] p-3 border border-[#E5DDD5]">
          <svg dir="ltr" viewBox="0 0 230 140" className="w-full max-w-[220px] h-auto">
            {/* Rectangle ABDC */}
            <rect
              x="40"
              y="25"
              width="150"
              height="90"
              fill="#5B7BC0"
              fillOpacity="0.05"
              stroke="#5B7BC0"
              strokeWidth="1.8"
              strokeDasharray="4 3"
            />
            {/* Triangle ABC */}
            <polygon
              points="40,115 40,25 190,115"
              fill="#5B7BC0"
              fillOpacity="0.09"
              stroke="#5B7BC0"
              strokeWidth="2"
            />
            {/* Diagonale AD et médiane AM */}
            <line
              x1="40"
              y1="115"
              x2="190"
              y2="25"
              stroke="#F5A54A"
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
            <line x1="40" y1="115" x2="115" y2="70" stroke="#F5A54A" strokeWidth="2.5" />
            <circle cx="115" cy="70" r="3.2" fill="#F5A54A" />
            <text x="25" y="123" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              A
            </text>
            <text x="25" y="24" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              B
            </text>
            <text x="195" y="123" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              C
            </text>
            <text x="195" y="24" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              D
            </text>
            <text x="112" y="60" fill="#F5A54A" fontSize="12" fontWeight="bold">
              M
            </text>
          </svg>
          <figcaption className="text-[11px] text-[#4A4A4A]/80 mt-1 text-center">
            المستطيل ABDC وتقاطع قطريه [BC] و [AD] في M
          </figcaption>
        </figure>
      );

    case 'midsegment-triangle':
      return (
        <figure className="flex flex-col items-center justify-center bg-[#F6F0EB]/55 rounded-[12px] p-3 border border-[#E5DDD5]">
          <svg dir="ltr" viewBox="0 0 230 140" className="w-full max-w-[220px] h-auto">
            <polygon
              points="105,20 30,120 195,120"
              fill="#5B7BC0"
              fillOpacity="0.06"
              stroke="#5B7BC0"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <line x1="67.5" y1="70" x2="150" y2="70" stroke="#F5A54A" strokeWidth="2.5" />
            <circle cx="67.5" cy="70" r="3" fill="#F5A54A" />
            <circle cx="150" cy="70" r="3" fill="#F5A54A" />
            <text x="101" y="14" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              A
            </text>
            <text x="16" y="125" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              B
            </text>
            <text x="201" y="125" fill="#4A4A4A" fontSize="12" fontWeight="bold">
              C
            </text>
            <text x="50" y="72" fill="#F5A54A" fontSize="12" fontWeight="bold">
              M
            </text>
            <text x="157" y="72" fill="#F5A54A" fontSize="12" fontWeight="bold">
              N
            </text>
          </svg>
          <figcaption className="text-[11px] text-[#4A4A4A]/80 mt-1 text-center">
            M منتصف [AB] و N منتصف [AC] في المثلث ABC
          </figcaption>
        </figure>
      );

    case 'congruent-triangles':
      return (
        <figure className="flex flex-col items-center justify-center bg-[#F6F0EB]/55 rounded-[12px] p-3 border border-[#E5DDD5]">
          <svg dir="ltr" viewBox="0 0 230 130" className="w-full max-w-[220px] h-auto">
            <polygon
              points="40,25 20,105 105,105"
              fill="#5B7BC0"
              fillOpacity="0.08"
              stroke="#5B7BC0"
              strokeWidth="2"
            />
            <polygon
              points="145,25 125,105 210,105"
              fill="#F5A54A"
              fillOpacity="0.08"
              stroke="#F5A54A"
              strokeWidth="2"
            />
            <text x="36" y="19" fill="#4A4A4A" fontSize="11" fontWeight="bold">
              A
            </text>
            <text x="12" y="116" fill="#4A4A4A" fontSize="11" fontWeight="bold">
              B
            </text>
            <text x="104" y="116" fill="#4A4A4A" fontSize="11" fontWeight="bold">
              C
            </text>
            <text x="140" y="19" fill="#4A4A4A" fontSize="11" fontWeight="bold">
              A&apos;
            </text>
            <text x="118" y="116" fill="#4A4A4A" fontSize="11" fontWeight="bold">
              B&apos;
            </text>
            <text x="208" y="116" fill="#4A4A4A" fontSize="11" fontWeight="bold">
              C&apos;
            </text>
          </svg>
          <figcaption className="text-[11px] text-[#4A4A4A]/80 mt-1 text-center">
            مطابقة مثلثين مرسومين بنفس المعطيات الثلاثة
          </figcaption>
        </figure>
      );
  }
};

/**
 * SECTION 0 — النشاط الاستكشافي (Activité de découverte obligatoire)
 * Placée immédiatement avant la section Définition/Cours.
 * Structure en 3 temps :
 * 1. Situation concrète en une phrase (sans nommer la propriété).
 * 2. Données à calculer en tableau ou en liste (+ schéma simple si géométrique).
 * 3. Questions guidées dans l'ordre strict (1. calcul/observation, 2. interprétation) + 💡 مساعدة optionnel.
 * La Section 0 se termine directement après les questions guidées (sans bilan à trous).
 * Le corrigé n'apparaît JAMAIS ici, mais uniquement dans la section Corrigés (#sec-exercises).
 */
export const DiscoveryActivitySection: React.FC<{
  courseId: string;
  activity: DiscoveryActivity;
  isDiscoveryCompleted?: boolean;
  onCompleteDiscovery?: () => void;
}> = ({ activity, isDiscoveryCompleted = false, onCompleteDiscovery }) => {
  return (
    <section
      id="sec-discovery"
      aria-label="النشاط الاستكشافي"
      className="scroll-mt-24 space-y-5 pb-4 border-b border-[#E5DDD5]"
    >
      {/* Titre de la Section 0 */}
      <SectionTitle number={0} title="النشاط الاستكشافي" />

      {/* 1. Situation concrète en une phrase, sans nommer la propriété */}
      <p className="text-[15px] text-[#4A4A4A] leading-[1.9]">
        {formatTextWithSuperscripts(activity.situation)}
      </p>

      {/* 2. Données à calculer (tableau ou liste + schéma géométrique éventuel) */}
      <div
        className={
          activity.diagramType
            ? 'grid grid-cols-1 md:grid-cols-12 gap-4 items-center'
            : 'space-y-3'
        }
      >
        <div className={activity.diagramType ? 'md:col-span-8 overflow-x-auto' : 'overflow-x-auto'}>
          {activity.dataTable && (
            <table className="w-full border-collapse text-xs sm:text-sm text-center border border-[#E5DDD5] rounded-[12px] overflow-hidden">
              <thead>
                <tr className="bg-[#F6F0EB] text-[#4A4A4A] font-bold border-b border-[#E5DDD5]">
                  {activity.dataTable.headers.map((header, hIdx) => (
                    <th
                      key={hIdx}
                      className="py-2.5 px-2.5 border-l last:border-l-0 border-[#E5DDD5]"
                    >
                      {formatTextWithSuperscripts(header, false)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DDD5] bg-[#FFFFFF]">
                {activity.dataTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#F6F0EB]/35 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`py-2 px-2.5 border-l last:border-l-0 border-[#E5DDD5] ${
                          cIdx === 0 ? 'font-semibold text-[#4A4A4A] bg-[#F6F0EB]/25' : 'text-[#4A4A4A]'
                        }`}
                      >
                        {formatTextWithSuperscripts(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activity.dataList && activity.dataList.length > 0 && (
            <ul className="space-y-1.5 pr-2 text-sm text-[#4A4A4A]">
              {activity.dataList.map((item, idx) => (
                <li key={idx} className="flex items-baseline gap-2.5">
                  <span className="w-[4px] h-[4px] rounded-full bg-[#C94BA6] shrink-0 translate-y-[-3px]" />
                  <span>{formatTextWithSuperscripts(item)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {activity.diagramType && (
          <div className="md:col-span-4">
            <DiscoverySchematicDiagram diagramType={activity.diagramType} />
          </div>
        )}
      </div>

      {/* 3. Questions guidées dans l'ordre strict : 1. Calcul/observation, 2. Interprétation */}
      <ol className="space-y-2.5 text-[15px] text-[#4A4A4A] leading-[1.9]">
        {activity.questions.map((question, qIdx) => (
          <li key={qIdx} className="flex items-baseline gap-2.5">
            <span className="font-bold text-[#C94BA6] shrink-0" dir="ltr">
              {qIdx + 1}.
            </span>
            <span className="flex-1">{formatTextWithSuperscripts(question)}</span>
          </li>
        ))}
      </ol>

      {/* 💡 مساعدة : Indice discret (Coup de pouce), jamais la réponse */}
      {activity.hint && (
        <div className="flex items-baseline gap-2 text-xs sm:text-sm text-[#4A4A4A]/90 bg-[#F6F0EB]/60 px-3.5 py-2.5 rounded-[12px] border border-[#E5DDD5]">
          <span className="font-bold text-[#C94BA6] shrink-0">💡 مساعدة :</span>
          <span>{formatTextWithSuperscripts(activity.hint)}</span>
        </div>
      )}

      {onCompleteDiscovery && (
        <div className="no-pdf pt-2 flex flex-wrap items-center justify-between gap-3">
          {!isDiscoveryCompleted ? (
            <button
              type="button"
              onClick={onCompleteDiscovery}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#C94BA6] hover:opacity-95 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
            >
              <span>✓</span>
              <span>أنهيت النشاط الاستكشافي (القسم 0) — متابعة الدرس وفتح مختصرات التنقل</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C94BA6]">
              <span>✓</span>
              <span>تم إنجاز النشاط الاستكشافي — مختصرات التنقل مفتوحة الآن</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

/**
 * Carte du corrigé de l'activité de découverte (Q1, Q2).
 * Affichée UNIQUEMENT dans la section Corrigés / Exercices (#sec-exercises),
 * jamais juste après l'activité.
 */
export const DiscoveryActivityCorrectionCard: React.FC<{
  activity: DiscoveryActivity;
  defaultOpen?: boolean;
}> = ({ activity, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div
      id="sec-discovery-correction"
      dir="rtl"
      className="scroll-mt-24 rounded-[16px] border border-[#C94BA6]/35 bg-[#FFFFFF] overflow-hidden"
    >
      <div className="px-5 py-3.5 bg-[#F6F0EB]/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-[26px] h-[26px] rounded-full border-2 border-[#C94BA6] text-[#C94BA6] font-bold text-xs flex items-center justify-center shrink-0"
            dir="ltr"
          >
            0
          </span>
          <span className="font-bold text-sm sm:text-base text-[#4A4A4A]">
            تصحيح النشاط الاستكشافي (القسم 0)
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="no-pdf inline-flex items-center gap-1.5 text-xs font-bold text-[#C94BA6] hover:opacity-80 cursor-pointer shrink-0"
        >
          <span>{isOpen ? 'إخفاء التصحيح' : 'عرض تصحيح النشاط'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="p-5 space-y-2 text-sm sm:text-[15px] text-[#4A4A4A] leading-[1.9] border-t border-[#E5DDD5]">
          {/* Réponses aux questions guidées (Q1, Q2) uniquement */}
          <div className="text-xs font-bold text-[#C94BA6]">الإجابة عن أسئلة النشاط :</div>
          <ol className="space-y-1.5">
            {activity.correction.questionAnswers.map((ans, idx) => (
              <li key={idx} className="flex items-baseline gap-2">
                <span className="font-bold text-[#C94BA6] shrink-0" dir="ltr">
                  {idx + 1}.
                </span>
                <span>{formatTextWithSuperscripts(ans)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};
