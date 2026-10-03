import React, { useState } from 'react';

interface Course18DiagramProps {
  diagramId: string;
  progressive?: boolean;
}

const FIG_SHAPE = '#5B7BC0'; // --fig-shape : forme principale (bleu)
const FIG_MARK = '#F5A54A';  // --fig-mark  : éléments démontrés (orange)
const TEXT_COLOR = '#4A4A4A';

export const Course18Diagram: React.FC<Course18DiagramProps> = ({
  diagramId,
  progressive = true,
}) => {
  // Step 1 = base shape (tracé initial), Step 2 = demonstrated additions (ajouts / codages)
  const [step, setStep] = useState<1 | 2>(2);
  const showAdditions = !progressive || step === 2;

  const Wrapper: React.FC<{ caption: string; children: React.ReactNode }> = ({
    caption,
    children,
  }) => (
    <figure className="bg-[#F6F0EB]/55 border border-[#E5DDD5] rounded-[12px] p-3 flex flex-col items-center justify-center shrink-0 w-full sm:w-64">
      {progressive && (
        <div className="flex items-center gap-1 mb-2 bg-white px-1.5 py-1 rounded-lg border border-[#E5DDD5] text-[10px]">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-colors ${
              step === 1 ? 'bg-[#C94BA6] text-white' : 'text-[#4A4A4A] hover:text-[#C94BA6]'
            }`}
          >
            1. الشكل الأساسي
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-colors ${
              step === 2 ? 'bg-[#C94BA6] text-white' : 'text-[#4A4A4A] hover:text-[#C94BA6]'
            }`}
          >
            2. عناصر البرهان
          </button>
        </div>
      )}
      {children}
      <figcaption className="text-[11px] text-[#4A4A4A]/85 font-medium mt-1.5 text-center leading-snug">
        {caption}
      </figcaption>
    </figure>
  );

  switch (diagramId) {
    case 'ex-guided-1':
      return (
        <Wrapper caption="المثلث القائم EFG والوتر [FG] ومنتصفه I">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            {/* Base shape: Triangle EFG right at E */}
            <polygon
              points="45,115 45,30 195,115"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {/* Right angle at E(45,115) */}
            <polygon
              points="45,115 57,115 57,103 45,103"
              fill={FIG_MARK}
              fillOpacity="0.25"
              stroke={FIG_MARK}
              strokeWidth="1.5"
            />
            {showAdditions && (
              <>
                {/* Median EI and equality ticks in --fig-mark */}
                <line x1="45" y1="115" x2="120" y2="72.5" stroke={FIG_MARK} strokeWidth="2.5" />
                <circle cx="82.5" cy="51.25" r="3" fill={FIG_MARK} />
                <circle cx="157.5" cy="93.75" r="3" fill={FIG_MARK} />
                <circle cx="82.5" cy="93.75" r="3" fill={FIG_MARK} />
                <circle cx="120" cy="72.5" r="4" fill={FIG_MARK} />
                <text x="128" y="68" fill={FIG_MARK} fontSize="11" fontWeight="bold">
                  I
                </text>
                <text x="88" y="108" fill={FIG_MARK} fontSize="10" fontWeight="bold">
                  EI = 4.5 cm
                </text>
              </>
            )}
            <circle cx="45" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="28" y="122" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">E</text>
            <circle cx="45" cy="30" r="3.5" fill={FIG_SHAPE} />
            <text x="30" y="28" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">F</text>
            <circle cx="195" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="203" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">G</text>
          </svg>
        </Wrapper>
      );

    case 'ex-guided-2':
      return (
        <Wrapper caption="المثلث RST والمتوسط [SK] حيث SK = ½ RT = 5 cm">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <polygon
              points="30,115 210,115 95,35"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            <line x1="95" y1="35" x2="120" y2="115" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <>
                <line x1="95" y1="35" x2="120" y2="115" stroke={FIG_MARK} strokeWidth="2.5" />
                <circle cx="95" cy="35" r="6" fill={FIG_MARK} fillOpacity="0.25" stroke={FIG_MARK} strokeWidth="1.8" />
                <text x="76" y="24" fill={FIG_MARK} fontSize="11" fontWeight="bold">S (90°)</text>
                <text x="130" y="76" fill={FIG_MARK} fontSize="10" fontWeight="bold">SK = 5 cm</text>
              </>
            )}
            {!showAdditions && (
              <text x="88" y="24" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">S</text>
            )}
            <circle cx="30" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="16" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">R</text>
            <circle cx="210" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="216" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">T</text>
            <circle cx="120" cy="115" r="3.5" fill={FIG_MARK} />
            <text x="115" y="133" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">K</text>
            <text x="75" y="108" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">5 cm</text>
            <text x="165" y="108" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">5 cm</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l18-1':
      return (
        <Wrapper caption="المثلث القائم MNP في M والمنتصف O للوتر [NP]">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <polygon
              points="30,115 210,115 85,35"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <polygon
                  points="120,115 210,115 85,35"
                  fill={FIG_MARK}
                  fillOpacity="0.12"
                />
                <line x1="85" y1="35" x2="120" y2="115" stroke={FIG_MARK} strokeWidth="2.5" />
                <text x="82" y="84" fill={FIG_MARK} fontSize="10" fontWeight="bold">5.5 cm</text>
              </>
            )}
            <path d="M 182,115 A 28,28 0 0,1 186,101" fill="none" stroke={FIG_SHAPE} strokeWidth="2" />
            <text x="162" y="110" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">35°</text>
            <circle cx="85" cy="35" r="4" fill={FIG_SHAPE} />
            <text x="72" y="25" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">M (90°)</text>
            <circle cx="30" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="15" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">N</text>
            <circle cx="210" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="216" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">P</text>
            <circle cx="120" cy="115" r="4" fill={FIG_MARK} />
            <text x="116" y="133" fill={FIG_MARK} fontSize="11" fontWeight="bold">O</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l18-2':
      return (
        <Wrapper caption="المثلث ACD والنقطة B منتصف [AD] حيث BA = BC = BD">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <polygon
              points="30,115 210,115 150,37"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <line x1="120" y1="115" x2="150" y2="37" stroke={FIG_MARK} strokeWidth="2.5" />
                <circle cx="75" cy="115" r="3" fill={FIG_MARK} />
                <circle cx="165" cy="115" r="3" fill={FIG_MARK} />
                <circle cx="135" cy="76" r="3" fill={FIG_MARK} />
                <text x="114" y="75" fill={FIG_MARK} fontSize="10" fontWeight="bold">6.5</text>
              </>
            )}
            <circle cx="30" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="15" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">A</text>
            <circle cx="120" cy="115" r="4" fill={FIG_MARK} />
            <text x="115" y="133" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">B</text>
            <circle cx="210" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="216" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">D</text>
            <circle cx="150" cy="37" r="4" fill={FIG_SHAPE} />
            <text x="145" y="26" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">C</text>
            <text x="75" y="106" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">6.5</text>
            <text x="165" y="106" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">6.5</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l18-3':
      return (
        <Wrapper caption="المثلث القائم EHG في H والمتوسط [HM] المتعلق بالوتر [EG]">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <polygon
              points="25,115 215,115 85,30"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            <line x1="85" y1="30" x2="85" y2="115" stroke={FIG_SHAPE} strokeWidth="2" strokeDasharray="4,3" />
            <polygon
              points="85,115 96,115 96,104 85,104"
              fill={FIG_MARK}
              fillOpacity="0.25"
              stroke={FIG_MARK}
              strokeWidth="1.5"
            />
            {showAdditions && (
              <>
                <line x1="85" y1="115" x2="150" y2="72.5" stroke={FIG_MARK} strokeWidth="2.5" />
                <circle cx="150" cy="72.5" r="4" fill={FIG_MARK} />
                <text x="158" y="68" fill={FIG_MARK} fontSize="11" fontWeight="bold">M</text>
              </>
            )}
            <circle cx="85" cy="30" r="3.5" fill={FIG_SHAPE} />
            <text x="75" y="22" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">E</text>
            <circle cx="25" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="12" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">F</text>
            <circle cx="215" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="220" y="120" fill={TEXT_COLOR} fontSize="12" fontWeight="bold">G</text>
            <circle cx="85" cy="115" r="3.5" fill={FIG_MARK} />
            <text x="80" y="132" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">H</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l19-guided-1':
      return (
        <Wrapper caption="المثلث القائم EFG والدائرة المحيطة ذات القطر [FG] والمركز O">
          <svg dir="ltr" viewBox="0 0 240 155" className="w-full h-auto max-w-[230px]">
            <polygon
              points="64,82 176,82 92,33.5"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <circle
                  cx="120"
                  cy="82"
                  r="56"
                  fill="none"
                  stroke={FIG_MARK}
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <line x1="120" y1="82" x2="92" y2="33.5" stroke={FIG_MARK} strokeWidth="2.2" />
                <text x="120" y="128" fill={FIG_MARK} fontSize="10" fontWeight="bold" textAnchor="middle">
                  FG = 14 cm ⟹ R = 7 cm
                </text>
              </>
            )}
            <circle cx="64" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="48" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">F</text>
            <circle cx="176" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="183" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">G</text>
            <circle cx="120" cy="82" r="3.5" fill={FIG_MARK} />
            <text x="120" y="99" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="92" cy="33.5" r="4" fill={FIG_SHAPE} />
            <text x="82" y="23" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">E (90°)</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l19-guided-2':
      return (
        <Wrapper caption="الدائرة (C) ذات القطر [RT] والنقطة S المنتمية إليها">
          <svg dir="ltr" viewBox="0 0 240 155" className="w-full h-auto max-w-[230px]">
            <circle
              cx="120"
              cy="82"
              r="56"
              fill={FIG_SHAPE}
              fillOpacity="0.06"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            <line x1="64" y1="82" x2="176" y2="82" stroke={FIG_SHAPE} strokeWidth="2.4" />
            {showAdditions && (
              <>
                <line x1="64" y1="82" x2="148" y2="33.5" stroke={FIG_MARK} strokeWidth="2.2" />
                <line x1="176" y1="82" x2="148" y2="33.5" stroke={FIG_MARK} strokeWidth="2.2" />
                <circle cx="148" cy="33.5" r="6" fill={FIG_MARK} fillOpacity="0.25" stroke={FIG_MARK} strokeWidth="1.8" />
              </>
            )}
            <circle cx="64" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="48" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">R</text>
            <circle cx="176" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="183" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">T</text>
            <circle cx="120" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="120" y="98" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="148" cy="33.5" r="4" fill={FIG_MARK} />
            <text x="155" y="24" fill={FIG_MARK} fontSize="11" fontWeight="bold">S (90°)</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l19-1':
      return (
        <Wrapper caption="الدائرة (C) ذات المركز I والقطر [MN] والمثلث MNP">
          <svg dir="ltr" viewBox="0 0 240 155" className="w-full h-auto max-w-[230px]">
            <circle cx="120" cy="82" r="55" fill={FIG_SHAPE} fillOpacity="0.06" stroke={FIG_SHAPE} strokeWidth="1.8" />
            <polygon points="65,82 175,82 88,37" fill="#ffffff" fillOpacity="0.7" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <line x1="120" y1="82" x2="88" y2="37" stroke={FIG_MARK} strokeWidth="2.2" strokeDasharray="3 2" />
            )}
            <text x="80" y="76" fill={FIG_SHAPE} fontSize="9.5" fontWeight="bold">52°</text>
            <circle cx="65" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="48" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">M</text>
            <circle cx="175" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="182" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">N</text>
            <circle cx="120" cy="82" r="3.5" fill={FIG_MARK} />
            <text x="120" y="98" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">I (r = 4.5)</text>
            <circle cx="88" cy="37" r="4" fill={FIG_MARK} />
            <text x="78" y="26" fill={FIG_MARK} fontSize="11" fontWeight="bold">P</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l19-2':
      return (
        <Wrapper caption="المثلثان القائمان ABC و DBC المشتركان في الوتر [BC]">
          <svg dir="ltr" viewBox="0 0 240 155" className="w-full h-auto max-w-[230px]">
            <polygon points="64,78 176,78 95,28" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="1.8" />
            <polygon points="64,78 176,78 145,128" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="1.8" />
            <line x1="64" y1="78" x2="176" y2="78" stroke={FIG_MARK} strokeWidth="2.6" />
            {showAdditions && (
              <circle
                cx="120"
                cy="78"
                r="56"
                fill="none"
                stroke={FIG_MARK}
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            )}
            <circle cx="64" cy="78" r="3.5" fill={FIG_SHAPE} />
            <text x="48" y="82" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">B</text>
            <circle cx="176" cy="78" r="3.5" fill={FIG_SHAPE} />
            <text x="183" y="82" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">C</text>
            <circle cx="120" cy="78" r="3.5" fill={FIG_MARK} />
            <text x="120" y="71" fill={FIG_MARK} fontSize="10" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="95" cy="28" r="3.5" fill={FIG_SHAPE} />
            <text x="80" y="20" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">A (90°)</text>
            <circle cx="145" cy="128" r="3.5" fill={FIG_SHAPE} />
            <text x="152" y="142" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">D (90°)</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l19-3':
      return (
        <Wrapper caption="الدائرة (C) ذات القطر [AB] والمثلث AKB والمستقيم (OI)">
          <svg dir="ltr" viewBox="0 0 240 155" className="w-full h-auto max-w-[230px]">
            <circle cx="120" cy="82" r="56" fill={FIG_SHAPE} fillOpacity="0.06" stroke={FIG_SHAPE} strokeWidth="1.8" />
            <polygon points="64,82 176,82 100,30" fill="#ffffff" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <>
                <line x1="120" y1="82" x2="82" y2="56" stroke={FIG_MARK} strokeWidth="2.4" />
                <circle cx="82" cy="56" r="3.5" fill={FIG_MARK} />
                <text x="64" y="54" fill={FIG_MARK} fontSize="10" fontWeight="bold">I</text>
              </>
            )}
            <circle cx="64" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="48" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">A</text>
            <circle cx="176" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="183" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">B</text>
            <circle cx="120" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="120" y="98" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="100" cy="30" r="3.5" fill={FIG_MARK} />
            <text x="92" y="21" fill={FIG_MARK} fontSize="11" fontWeight="bold">K (90°)</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l20-guided-1':
      return (
        <Wrapper caption="المثلث القائم BCA في A (حساب طول الوتر [BC])">
          <svg dir="ltr" viewBox="0 0 240 150" className="w-full h-auto max-w-[230px]">
            <polygon
              points="50,118 50,32 190,118"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            <polygon
              points="50,118 63,118 63,105 50,105"
              fill={FIG_SHAPE}
              fillOpacity="0.2"
              stroke={FIG_SHAPE}
              strokeWidth="1.5"
            />
            {showAdditions && (
              <>
                <line x1="50" y1="32" x2="190" y2="118" stroke={FIG_MARK} strokeWidth="2.8" />
                <text x="135" y="68" fill={FIG_MARK} fontSize="11" fontWeight="bold" textAnchor="middle">
                  BC = 10 cm
                </text>
              </>
            )}
            <circle cx="50" cy="118" r="3.5" fill={FIG_SHAPE} />
            <text x="32" y="124" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">A</text>
            <circle cx="50" cy="32" r="3.5" fill={FIG_SHAPE} />
            <text x="34" y="30" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">B</text>
            <circle cx="190" cy="118" r="3.5" fill={FIG_SHAPE} />
            <text x="198" y="122" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">C</text>
            <text x="26" y="78" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">6 cm</text>
            <text x="120" y="134" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">8 cm</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l20-guided-2':
      return (
        <Wrapper caption="المثلث MNP القائم في N (حساب طول الضلع القائم [NP])">
          <svg dir="ltr" viewBox="0 0 240 150" className="w-full h-auto max-w-[230px]">
            <polygon
              points="35,115 205,115 95,34"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <line x1="95" y1="34" x2="205" y2="115" stroke={FIG_MARK} strokeWidth="2.8" />
                <text x="165" y="68" fill={FIG_MARK} fontSize="10.5" fontWeight="bold">NP = 12 cm</text>
              </>
            )}
            <circle cx="95" cy="34" r="4" fill={FIG_SHAPE} />
            <text x="80" y="23" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">N (90°)</text>
            <circle cx="35" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="18" y="120" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">M</text>
            <circle cx="205" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="212" y="120" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">P</text>
            <text x="48" y="70" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">5 cm</text>
            <text x="120" y="132" fill={FIG_SHAPE} fontSize="10.5" fontWeight="bold" textAnchor="middle">
              MP = 13 cm
            </text>
          </svg>
        </Wrapper>
      );

    case 'ex-l20-1':
      return (
        <Wrapper caption="المثلث القائم EFG في F (حساب طول الوتر [EG])">
          <svg dir="ltr" viewBox="0 0 240 150" className="w-full h-auto max-w-[230px]">
            <polygon
              points="185,115 185,32 45,115"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            <polygon
              points="185,115 172,115 172,102 185,102"
              fill={FIG_SHAPE}
              fillOpacity="0.2"
              stroke={FIG_SHAPE}
              strokeWidth="1.5"
            />
            {showAdditions && (
              <>
                <line x1="185" y1="32" x2="45" y2="115" stroke={FIG_MARK} strokeWidth="2.8" />
                <text x="102" y="65" fill={FIG_MARK} fontSize="11" fontWeight="bold" textAnchor="middle">EG = ?</text>
              </>
            )}
            <circle cx="185" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="193" y="122" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">F (90°)</text>
            <circle cx="185" cy="32" r="3.5" fill={FIG_SHAPE} />
            <text x="193" y="34" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">E</text>
            <circle cx="45" cy="115" r="3.5" fill={FIG_SHAPE} />
            <text x="28" y="120" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">G</text>
            <text x="210" y="76" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">9 cm</text>
            <text x="115" y="132" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">12 cm</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l20-2':
      return (
        <Wrapper caption="المثلث القائم RST في S والوتر [RT]">
          <svg dir="ltr" viewBox="0 0 240 150" className="w-full h-auto max-w-[230px]">
            <polygon
              points="48,116 48,42 200,116"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            <polygon
              points="48,116 60,116 60,104 48,104"
              fill={FIG_SHAPE}
              fillOpacity="0.2"
              stroke={FIG_SHAPE}
              strokeWidth="1.5"
            />
            {showAdditions && (
              <>
                <line x1="48" y1="116" x2="200" y2="116" stroke={FIG_MARK} strokeWidth="2.8" />
                <text x="124" y="133" fill={FIG_MARK} fontSize="10.5" fontWeight="bold" textAnchor="middle">ST = ?</text>
              </>
            )}
            <circle cx="48" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="32" y="122" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">S</text>
            <circle cx="48" cy="42" r="3.5" fill={FIG_SHAPE} />
            <text x="32" y="42" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">R</text>
            <circle cx="200" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="208" y="120" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">T</text>
            <text x="24" y="84" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">7 cm</text>
            <text x="135" y="68" fill={FIG_SHAPE} fontSize="10.5" fontWeight="bold" textAnchor="middle">RT = 25 cm</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l20-3':
      return (
        <Wrapper caption="المثلث القائم ABC في A والمتوسط [AO] والدائرة المحيطة">
          <svg dir="ltr" viewBox="0 0 240 155" className="w-full h-auto max-w-[230px]">
            <polygon
              points="64,82 176,82 98,30.5"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <circle
                  cx="120"
                  cy="82"
                  r="56"
                  fill="none"
                  stroke={FIG_MARK}
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                />
                <line x1="98" y1="30.5" x2="120" y2="82" stroke={FIG_MARK} strokeWidth="2.4" />
              </>
            )}
            <circle cx="64" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="48" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">B</text>
            <circle cx="176" cy="82" r="3.5" fill={FIG_SHAPE} />
            <text x="183" y="86" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">C</text>
            <circle cx="120" cy="82" r="3.5" fill={FIG_MARK} />
            <text x="120" y="99" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">O</text>
            <circle cx="98" cy="30.5" r="4" fill={FIG_SHAPE} />
            <text x="88" y="20" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">A (90°)</text>
            <text x="64" y="54" fill={FIG_SHAPE} fontSize="9.5" fontWeight="bold">15 cm</text>
            <text x="148" y="52" fill={FIG_SHAPE} fontSize="9.5" fontWeight="bold">20 cm</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l21-guided-1':
      return (
        <Wrapper caption="المثلث ABC (AB = 9 cm, AC = 12 cm, BC = 15 cm) قائم في A">
          <svg dir="ltr" viewBox="0 0 240 150" className="w-full h-auto max-w-[230px]">
            <polygon
              points="40,116 200,116 98,32"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <line x1="40" y1="116" x2="200" y2="116" stroke={FIG_MARK} strokeWidth="2.8" />
                <circle
                  cx="98"
                  cy="32"
                  r="7"
                  fill={FIG_MARK}
                  fillOpacity="0.28"
                  stroke={FIG_MARK}
                  strokeWidth="1.8"
                />
                <text x="98" y="19" fill={FIG_MARK} fontSize="11" fontWeight="bold" textAnchor="middle">
                  A (90°)
                </text>
              </>
            )}
            {!showAdditions && (
              <text x="98" y="21" fill={TEXT_COLOR} fontSize="11" fontWeight="bold" textAnchor="middle">
                A (؟)
              </text>
            )}
            <circle cx="40" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="24" y="121" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">B</text>
            <circle cx="200" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="207" y="121" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">C</text>
            <circle cx="98" cy="32" r="3.5" fill={showAdditions ? FIG_MARK : FIG_SHAPE} />
            <text x="53" y="68" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">9 cm</text>
            <text x="158" y="68" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">12 cm</text>
            <text
              x="120"
              y="134"
              fill={showAdditions ? FIG_MARK : FIG_SHAPE}
              fontSize="10.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              BC = 15 cm (أكبر ضلع)
            </text>
          </svg>
        </Wrapper>
      );

    case 'ex-l21-guided-2':
      return (
        <Wrapper caption="المثلث DEF (DE = 5 cm, DF = 6 cm, EF = 8 cm) غير قائم">
          <svg dir="ltr" viewBox="0 0 240 150" className="w-full h-auto max-w-[230px]">
            <polygon
              points="36,116 204,116 105,46"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <line x1="36" y1="116" x2="204" y2="116" stroke={FIG_MARK} strokeWidth="2.6" />
                <circle
                  cx="105"
                  cy="46"
                  r="7"
                  fill={FIG_MARK}
                  fillOpacity="0.22"
                  stroke={FIG_MARK}
                  strokeWidth="1.6"
                />
                <text x="105" y="32" fill={FIG_MARK} fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  D (≠ 90°)
                </text>
              </>
            )}
            {!showAdditions && (
              <text x="105" y="34" fill={TEXT_COLOR} fontSize="11" fontWeight="bold" textAnchor="middle">
                D (؟)
              </text>
            )}
            <circle cx="36" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="20" y="121" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">E</text>
            <circle cx="204" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="211" y="121" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">F</text>
            <circle cx="105" cy="46" r="3.5" fill={showAdditions ? FIG_MARK : FIG_SHAPE} />
            <text x="58" y="74" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">5 cm</text>
            <text x="165" y="74" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">6 cm</text>
            <text
              x="120"
              y="134"
              fill={showAdditions ? FIG_MARK : FIG_SHAPE}
              fontSize="10.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              EF = 8 cm (64 ≠ 61)
            </text>
          </svg>
        </Wrapper>
      );

    case 'ex-l21-1':
      return (
        <Wrapper caption="المثلث MNP (MN = 5 cm, NP = 12 cm, MP = 13 cm) قائم في N">
          <svg dir="ltr" viewBox="0 0 240 150" className="w-full h-auto max-w-[230px]">
            <polygon
              points="38,116 202,116 82,35"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <line x1="38" y1="116" x2="202" y2="116" stroke={FIG_MARK} strokeWidth="2.8" />
                <circle
                  cx="82"
                  cy="35"
                  r="7"
                  fill={FIG_MARK}
                  fillOpacity="0.28"
                  stroke={FIG_MARK}
                  strokeWidth="1.8"
                />
                <text x="82" y="21" fill={FIG_MARK} fontSize="11" fontWeight="bold" textAnchor="middle">
                  N (90°)
                </text>
              </>
            )}
            {!showAdditions && (
              <text x="82" y="22" fill={TEXT_COLOR} fontSize="11" fontWeight="bold" textAnchor="middle">
                N
              </text>
            )}
            <circle cx="38" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="20" y="121" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">M</text>
            <circle cx="202" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="209" y="121" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">P</text>
            <circle cx="82" cy="35" r="3.5" fill={showAdditions ? FIG_MARK : FIG_SHAPE} />
            <text x="45" y="72" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">5 cm</text>
            <text x="152" y="68" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">12 cm</text>
            <text
              x="120"
              y="134"
              fill={showAdditions ? FIG_MARK : FIG_SHAPE}
              fontSize="10.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              MP = 13 cm (أكبر ضلع)
            </text>
          </svg>
        </Wrapper>
      );

    case 'ex-l21-2':
      return (
        <Wrapper caption="الإطار الخشبي RST (RS = 1.5 m, ST = 2 m, RT = 2.5 m)">
          <svg dir="ltr" viewBox="0 0 240 150" className="w-full h-auto max-w-[230px]">
            <polygon
              points="52,116 52,32 192,116"
              fill={FIG_SHAPE}
              fillOpacity="0.08"
              stroke={FIG_SHAPE}
              strokeWidth="2.2"
            />
            {showAdditions && (
              <>
                <line x1="52" y1="32" x2="192" y2="116" stroke={FIG_MARK} strokeWidth="2.8" />
                <polygon
                  points="52,116 65,116 65,103 52,103"
                  fill={FIG_MARK}
                  fillOpacity="0.3"
                  stroke={FIG_MARK}
                  strokeWidth="1.6"
                />
              </>
            )}
            <circle cx="52" cy="116" r="3.5" fill={showAdditions ? FIG_MARK : FIG_SHAPE} />
            <text x="34" y="122" fill={showAdditions ? FIG_MARK : TEXT_COLOR} fontSize="11" fontWeight="bold">
              S {showAdditions ? '(90°)' : ''}
            </text>
            <circle cx="52" cy="32" r="3.5" fill={FIG_SHAPE} />
            <text x="34" y="32" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">R</text>
            <circle cx="192" cy="116" r="3.5" fill={FIG_SHAPE} />
            <text x="200" y="121" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">T</text>
            <text x="24" y="76" fill={FIG_SHAPE} fontSize="10" fontWeight="bold">1.5 m</text>
            <text x="122" y="133" fill={FIG_SHAPE} fontSize="10" fontWeight="bold" textAnchor="middle">
              2 m
            </text>
            <text
              x="135"
              y="66"
              fill={showAdditions ? FIG_MARK : FIG_SHAPE}
              fontSize="10.5"
              fontWeight="bold"
              textAnchor="middle"
            >
              RT = 2.5 m
            </text>
          </svg>
        </Wrapper>
      );

    case 'ex-l21-3':
      return (
        <Wrapper caption="الرباعي ABCD المكون من المثلثين القائمين ABC (في B) و ACD (في A)">
          <svg dir="ltr" viewBox="0 0 240 155" className="w-full h-auto max-w-[230px]">
            {/* Triangle ABC right at B(44,118) */}
            <polygon
              points="44,118 44,58 116,118"
              fill={FIG_SHAPE}
              fillOpacity="0.1"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {/* Right angle at B */}
            <polygon
              points="44,118 54,118 54,108 44,108"
              fill={FIG_SHAPE}
              fillOpacity="0.25"
              stroke={FIG_SHAPE}
              strokeWidth="1.4"
            />
            {/* Triangle ACD with AD and CD */}
            <polygon
              points="44,58 116,118 196,26"
              fill={FIG_SHAPE}
              fillOpacity="0.06"
              stroke={FIG_SHAPE}
              strokeWidth="2"
            />
            {showAdditions && (
              <>
                <line x1="44" y1="58" x2="116" y2="118" stroke={FIG_MARK} strokeWidth="2.6" />
                <line x1="116" y1="118" x2="196" y2="26" stroke={FIG_MARK} strokeWidth="2.6" strokeDasharray="4 2" />
                <circle
                  cx="44"
                  cy="58"
                  r="6.5"
                  fill={FIG_MARK}
                  fillOpacity="0.3"
                  stroke={FIG_MARK}
                  strokeWidth="1.8"
                />
                <text x="90" y="83" fill={FIG_MARK} fontSize="10" fontWeight="bold">
                  AC = 5 cm
                </text>
              </>
            )}
            <circle cx="44" cy="118" r="3.5" fill={FIG_SHAPE} />
            <text x="22" y="124" fill={TEXT_COLOR} fontSize="10.5" fontWeight="bold">B (90°)</text>
            <circle cx="44" cy="58" r="3.5" fill={showAdditions ? FIG_MARK : FIG_SHAPE} />
            <text x="16" y="56" fill={showAdditions ? FIG_MARK : TEXT_COLOR} fontSize="10.5" fontWeight="bold">
              A {showAdditions ? '(90°)' : ''}
            </text>
            <circle cx="116" cy="118" r="3.5" fill={FIG_SHAPE} />
            <text x="114" y="134" fill={TEXT_COLOR} fontSize="10.5" fontWeight="bold">C</text>
            <circle cx="196" cy="26" r="3.5" fill={FIG_SHAPE} />
            <text x="203" y="28" fill={TEXT_COLOR} fontSize="10.5" fontWeight="bold">D</text>
            <text x="24" y="92" fill={FIG_SHAPE} fontSize="9.5" fontWeight="bold">3 cm</text>
            <text x="80" y="132" fill={FIG_SHAPE} fontSize="9.5" fontWeight="bold">4 cm</text>
            <text x="112" y="34" fill={FIG_SHAPE} fontSize="9.5" fontWeight="bold">12 cm</text>
            <text x="176" y="82" fill={showAdditions ? FIG_MARK : FIG_SHAPE} fontSize="9.5" fontWeight="bold">
              13 cm
            </text>
          </svg>
        </Wrapper>
      );

    case 'ex-l10-guided-1':
    case 'ex-l10-1':
      return (
        <Wrapper caption="المثلثان ABC و DEF وتقايس الأضلاع الثلاثة (SSS)">
          <svg dir="ltr" viewBox="0 0 240 140" className="w-full h-auto max-w-[230px]">
            <polygon points="18,112 106,112 52,32" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            <polygon points="134,112 222,112 168,32" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <g stroke={FIG_MARK} strokeWidth="2">
                <line x1="31" y1="70" x2="39" y2="74" />
                <line x1="75" y1="68" x2="83" y2="64" />
                <line x1="78" y1="73" x2="86" y2="69" />
                <line x1="60" y1="107" x2="60" y2="117" />
                <line x1="65" y1="107" x2="65" y2="117" />
                <line x1="147" y1="70" x2="155" y2="74" />
                <line x1="191" y1="68" x2="199" y2="64" />
                <line x1="194" y1="73" x2="202" y2="69" />
                <line x1="176" y1="107" x2="176" y2="117" />
                <line x1="181" y1="107" x2="181" y2="117" />
              </g>
            )}
            <text x="52" y="24" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">A</text>
            <text x="10" y="122" fill={TEXT_COLOR} fontSize="10" fontWeight="bold">B</text>
            <text x="110" y="122" fill={TEXT_COLOR} fontSize="10" fontWeight="bold">C</text>
            <text x="168" y="24" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">D</text>
            <text x="126" y="122" fill={TEXT_COLOR} fontSize="10" fontWeight="bold">E</text>
            <text x="225" y="122" fill={TEXT_COLOR} fontSize="10" fontWeight="bold">F</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l10-guided-2':
    case 'ex-l10-2':
      return (
        <Wrapper caption="المثلثان ABC و DEF وتقايس ضلعين والزاوية المحصورة (SAS)">
          <svg dir="ltr" viewBox="0 0 240 140" className="w-full h-auto max-w-[230px]">
            <polygon points="18,112 106,112 52,32" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            <polygon points="134,112 222,112 168,32" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <>
                <path d="M 45 48 A 18 18 0 0 0 62 47" fill="none" stroke={FIG_MARK} strokeWidth="2.5" />
                <path d="M 161 48 A 18 18 0 0 0 178 47" fill="none" stroke={FIG_MARK} strokeWidth="2.5" />
                <line x1="31" y1="70" x2="39" y2="74" stroke={FIG_MARK} strokeWidth="2" />
                <line x1="147" y1="70" x2="155" y2="74" stroke={FIG_MARK} strokeWidth="2" />
              </>
            )}
            <text x="52" y="24" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">A (70°)</text>
            <text x="10" y="122" fill={TEXT_COLOR} fontSize="10" fontWeight="bold">B</text>
            <text x="110" y="122" fill={TEXT_COLOR} fontSize="10" fontWeight="bold">C</text>
            <text x="168" y="24" fill={TEXT_COLOR} fontSize="10" fontWeight="bold" textAnchor="middle">D (70°)</text>
            <text x="126" y="122" fill={TEXT_COLOR} fontSize="10" fontWeight="bold">E</text>
            <text x="225" y="122" fill={TEXT_COLOR} fontSize="10" fontWeight="bold">F</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l10-3':
      return (
        <Wrapper caption="الرباعي ABCD والقطر المشترك [AC]">
          <svg dir="ltr" viewBox="0 0 240 140" className="w-full h-auto max-w-[230px]">
            <polygon points="45,32 205,32 185,112 25,112" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <line x1="45" y1="32" x2="185" y2="112" stroke={FIG_MARK} strokeWidth="2.5" strokeDasharray="4 3" />
            )}
            <text x="38" y="24" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">A</text>
            <text x="210" y="24" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">B</text>
            <text x="192" y="122" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">C</text>
            <text x="12" y="122" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">D</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l11-guided-1':
    case 'ex-l11-1':
    case 'ex-l11-guided-2':
    case 'ex-l11-2':
    case 'ex-l11-3':
      return (
        <Wrapper caption="المستقيمان المتوازيان (d) و (d') والقاطع (Δ) في A و B">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <line x1="20" y1="45" x2="220" y2="45" stroke={FIG_SHAPE} strokeWidth="2.2" />
            <text x="28" y="36" fill={FIG_SHAPE} fontSize="11.5" fontWeight="bold">(d)</text>
            <line x1="20" y1="102" x2="220" y2="102" stroke={FIG_SHAPE} strokeWidth="2.2" />
            <text x="28" y="93" fill={FIG_SHAPE} fontSize="11.5" fontWeight="bold">(d')</text>
            <line x1="158" y1="14" x2="82" y2="132" stroke={FIG_SHAPE} strokeWidth="2" />
            <text x="166" y="22" fill={TEXT_COLOR} fontSize="11.5" fontWeight="bold">(Δ)</text>
            {showAdditions && (
              <>
                <circle cx="151" cy="36" r="7" fill={FIG_MARK} fillOpacity="0.3" stroke={FIG_MARK} strokeWidth="1.5" />
                <text x="165" y="39" fill={FIG_MARK} fontSize="11" fontWeight="bold">A1</text>
                <circle cx="125" cy="54" r="7" fill={FIG_MARK} fillOpacity="0.3" stroke={FIG_MARK} strokeWidth="1.5" />
                <text x="101" y="59" fill={FIG_MARK} fontSize="11" fontWeight="bold">A3</text>
                <circle cx="114" cy="93" r="7" fill={FIG_MARK} fillOpacity="0.3" stroke={FIG_MARK} strokeWidth="1.5" />
                <text x="128" y="96" fill={FIG_MARK} fontSize="11" fontWeight="bold">B1</text>
              </>
            )}
          </svg>
        </Wrapper>
      );

    case 'ex-l12-guided-1':
      return (
        <Wrapper caption="المثلث RST والمستقيم (EF) الموازي للضلع (ST)">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <polygon points="120,20 40,122 200,122" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <line x1="88" y1="61" x2="152" y2="61" stroke={FIG_MARK} strokeWidth="2.6" />
            )}
            <circle cx="120" cy="20" r="3.5" fill={FIG_SHAPE} />
            <text x="120" y="13" fill={TEXT_COLOR} fontSize="11" fontWeight="bold" textAnchor="middle">R</text>
            <circle cx="88" cy="61" r="3.5" fill={FIG_MARK} />
            <text x="72" y="58" fill={FIG_MARK} fontSize="11" fontWeight="bold">E</text>
            <circle cx="152" cy="61" r="3.5" fill={FIG_MARK} />
            <text x="160" y="58" fill={FIG_MARK} fontSize="11" fontWeight="bold">F</text>
            <circle cx="40" cy="122" r="3.5" fill={FIG_SHAPE} />
            <text x="25" y="126" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">S</text>
            <circle cx="200" cy="122" r="3.5" fill={FIG_SHAPE} />
            <text x="206" y="126" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">T</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l12-guided-2':
      return (
        <Wrapper caption="المثلث KLM والنقطتان P ∈ [KL] و Q ∈ [KM] لإثبات توازي (PQ) و (LM)">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <polygon points="95,20 36,122 204,122" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <line x1="70" y1="64" x2="142" y2="64" stroke={FIG_MARK} strokeWidth="2.6" />
            )}
            <circle cx="95" cy="20" r="3.5" fill={FIG_SHAPE} />
            <text x="95" y="13" fill={TEXT_COLOR} fontSize="11" fontWeight="bold" textAnchor="middle">K</text>
            <circle cx="70" cy="64" r="3.5" fill={FIG_MARK} />
            <text x="53" y="62" fill={FIG_MARK} fontSize="11" fontWeight="bold">P</text>
            <circle cx="142" cy="64" r="3.5" fill={FIG_MARK} />
            <text x="150" y="62" fill={FIG_MARK} fontSize="11" fontWeight="bold">Q</text>
            <circle cx="36" cy="122" r="3.5" fill={FIG_SHAPE} />
            <text x="22" y="126" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">L</text>
            <circle cx="204" cy="122" r="3.5" fill={FIG_SHAPE} />
            <text x="210" y="126" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">M</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l12-1':
      return (
        <Wrapper caption="قياس ارتفاع مروحة هوائية [SH] بواسطة الشاخص العمودي [DE] والظل من O">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            {/* Ground OH and sun ray OS */}
            <polygon points="28,120 202,120 202,24" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            {/* Right angle at H */}
            <polyline points="192,120 192,110 202,110" fill="none" stroke={FIG_SHAPE} strokeWidth="1.5" />
            {/* Vertical post DE */}
            <line x1="86" y1="120" x2="86" y2="88" stroke={showAdditions ? FIG_MARK : FIG_SHAPE} strokeWidth="2.6" />
            <circle cx="28" cy="120" r="3.5" fill={FIG_SHAPE} />
            <text x="15" y="124" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">O</text>
            <circle cx="86" cy="120" r="3" fill={FIG_MARK} />
            <text x="82" y="134" fill={FIG_MARK} fontSize="10.5" fontWeight="bold">E</text>
            <circle cx="86" cy="88" r="3" fill={FIG_MARK} />
            <text x="72" y="84" fill={FIG_MARK} fontSize="10.5" fontWeight="bold">D</text>
            <circle cx="202" cy="120" r="3.5" fill={FIG_SHAPE} />
            <text x="208" y="125" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">H</text>
            <circle cx="202" cy="24" r="3.5" fill={FIG_SHAPE} />
            <text x="208" y="26" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">S</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l12-2':
      return (
        <Wrapper caption="هيكل ذراع رافعة البناء UVW وعارضة التقوية [IJ] الموازية لـ [VW]">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <polygon points="34,96 204,30 184,122" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            {showAdditions && (
              <line x1="102" y1="70" x2="94" y2="106" stroke={FIG_MARK} strokeWidth="2.6" />
            )}
            <circle cx="34" cy="96" r="3.5" fill={FIG_SHAPE} />
            <text x="18" y="100" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">U</text>
            <circle cx="102" cy="70" r="3.5" fill={FIG_MARK} />
            <text x="96" y="60" fill={FIG_MARK} fontSize="11" fontWeight="bold">I</text>
            <circle cx="94" cy="106" r="3.5" fill={FIG_MARK} />
            <text x="88" y="122" fill={FIG_MARK} fontSize="11" fontWeight="bold">J</text>
            <circle cx="204" cy="30" r="3.5" fill={FIG_SHAPE} />
            <text x="210" y="32" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">V</text>
            <circle cx="184" cy="122" r="3.5" fill={FIG_SHAPE} />
            <text x="192" y="128" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">W</text>
          </svg>
        </Wrapper>
      );

    case 'ex-l12-3':
      return (
        <Wrapper caption="هيكل السقف الخشبي FNP والدعامة الأفقية [GH]">
          <svg dir="ltr" viewBox="0 0 240 145" className="w-full h-auto max-w-[230px]">
            <polygon points="120,24 30,118 210,118" fill={FIG_SHAPE} fillOpacity="0.08" stroke={FIG_SHAPE} strokeWidth="2" />
            <line x1="81" y1="65" x2="159" y2="65" stroke={showAdditions ? FIG_MARK : FIG_SHAPE} strokeWidth="2.5" />
            <circle cx="120" cy="24" r="3.5" fill={FIG_SHAPE} />
            <text x="120" y="16" fill={TEXT_COLOR} fontSize="11" fontWeight="bold" textAnchor="middle">F</text>
            <circle cx="81" cy="65" r="3.5" fill={FIG_MARK} />
            <text x="64" y="62" fill={FIG_MARK} fontSize="11" fontWeight="bold">G</text>
            <circle cx="159" cy="65" r="3.5" fill={FIG_MARK} />
            <text x="166" y="62" fill={FIG_MARK} fontSize="11" fontWeight="bold">H</text>
            <circle cx="30" cy="118" r="3.5" fill={FIG_SHAPE} />
            <text x="15" y="122" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">N</text>
            <circle cx="210" cy="118" r="3.5" fill={FIG_SHAPE} />
            <text x="216" y="122" fill={TEXT_COLOR} fontSize="11" fontWeight="bold">P</text>
          </svg>
        </Wrapper>
      );

    default:
      return null;
  }
};
