import React from 'react';
import { TreatiseStep } from '../data/geometryTreatiseTypes';

interface GeometryTreatiseDiagramProps {
  propertyId: number;
  step?: TreatiseStep;
  onStepChange?: (step: TreatiseStep) => void;
  showStepControls?: boolean;
  lang?: 'ar' | 'fr' | 'bilingual';
  captionAr?: string;
  captionFr?: string;
}

export const GeometryTreatiseDiagram: React.FC<GeometryTreatiseDiagramProps> = ({
  propertyId,
  step = 4,
  onStepChange,
  showStepControls = true,
  lang = 'ar',
  captionAr,
  captionFr,
}) => {
  const showHyp = step >= 2;
  const showReason = step >= 3;
  const showConc = step >= 4;

  // Classic thin serif style for geometric point labels (as requested by user)
  const ptStyle: React.SVGProps<SVGTextElement> = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '14px',
    fill: '#1e293b',
  };

  const hypColor = '#5B7BC0'; // --fig-shape : forme principale (bleu)
  const reasonColor = '#F5A54A'; // --fig-mark : éléments démontrés (orange)
  const concColor = '#F5A54A'; // --fig-mark : éléments démontrés (orange)
  const baseStroke = '#5B7BC0';

  // Helper to draw a small cross mark at a point
  const CrossPoint = ({ x, y, color = '#1e293b' }: { x: number; y: number; color?: string }) => (
    <g stroke={color} strokeWidth="1.5">
      <line x1={x - 3.5} y1={y - 3.5} x2={x + 3.5} y2={y + 3.5} />
      <line x1={x - 3.5} y1={y + 3.5} x2={x + 3.5} y2={y - 3.5} />
    </g>
  );

  // Helper to draw double tick mark on a segment midpoint
  const TickMark = ({
    x1,
    y1,
    x2,
    y2,
    count = 2,
    color = '#dc2626',
  }: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    count?: 1 | 2 | 3;
    color?: string;
  }) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;
    const halfTick = 4.5;
    const spacing = 3.5;

    if (count === 3) {
      return (
        <circle cx={mx} cy={my} r={4} fill="none" stroke={color} strokeWidth="1.5" />
      );
    }

    const offsets = count === 1 ? [0] : [-spacing / 2, spacing / 2];
    return (
      <g stroke={color} strokeWidth="1.5">
        {offsets.map((off, idx) => (
          <line
            key={idx}
            x1={mx + ux * off - nx * halfTick}
            y1={my + uy * off - ny * halfTick}
            x2={mx + ux * off + nx * halfTick}
            y2={my + uy * off + ny * halfTick}
          />
        ))}
      </g>
    );
  };

  // Render specific figure matching the PDF middle column for all 69 properties
  const renderFigure = () => {
    switch (propertyId) {
      // 1, 3, 40: Segment with midpoint O
      case 1:
      case 3:
      case 40: {
        const rightLabel = propertyId === 1 ? 'B' : "A'";
        const isMidHyp = propertyId === 40;
        return (
          <g>
            <line
              x1="45"
              y1="100"
              x2="195"
              y2="45"
              stroke={showConc && !isMidHyp ? concColor : baseStroke}
              strokeWidth="2"
            />
            <CrossPoint x={55} y={96.3} />
            <CrossPoint x={185} y={48.7} />
            <CrossPoint
              x={120}
              y={72.5}
              color={showConc ? concColor : showHyp ? hypColor : '#1e293b'}
            />
            {(showHyp || showConc) && (
              <>
                <TickMark
                  x1={55}
                  y1={96.3}
                  x2={120}
                  y2={72.5}
                  count={2}
                  color={isMidHyp ? (showConc ? concColor : hypColor) : hypColor}
                />
                <TickMark
                  x1={120}
                  y1={72.5}
                  x2={185}
                  y2={48.7}
                  count={2}
                  color={isMidHyp ? (showConc ? concColor : hypColor) : hypColor}
                />
              </>
            )}
            <text x="36" y="106" {...ptStyle}>A</text>
            <text x="110" y="63" {...ptStyle} fill={showConc ? concColor : '#1e293b'}>O</text>
            <text x="195" y="50" {...ptStyle}>{rightLabel}</text>
          </g>
        );
      }

      // 4, 18, 63: Segment [AB] or [MM'] and its perpendicular bisector (d)
      case 4:
      case 18:
      case 63: {
        const leftPt = propertyId === 63 ? 'M' : 'A';
        const rightPt = propertyId === 63 ? "M'" : 'B';
        return (
          <g>
            {/* Segment */}
            <line x1="55" y1="68" x2="175" y2="92" stroke={baseStroke} strokeWidth="1.8" />
            {/* Bisector (d) */}
            <line
              x1="129"
              y1="20"
              x2="101"
              y2="132"
              stroke={showConc && propertyId === 63 ? concColor : '#d97706'}
              strokeWidth="2"
            />
            {/* Right angle at O (115, 80) */}
            {(showHyp || showConc) && (
              <polygon
                points="115,80 123,81.6 124.6,73.6 116.6,72"
                fill={propertyId === 18 && showConc ? '#d1fae5' : '#fef3c7'}
                stroke={propertyId === 18 && showConc ? concColor : hypColor}
                strokeWidth="1.3"
              />
            )}
            {(showHyp || showConc) && (
              <>
                <TickMark x1={55} y1={68} x2={115} y2={80} count={2} color={propertyId === 4 && showConc ? concColor : hypColor} />
                <TickMark x1={115} y1={80} x2={175} y2={92} count={2} color={propertyId === 4 && showConc ? concColor : hypColor} />
              </>
            )}
            <CrossPoint x={55} y={68} />
            <CrossPoint x={175} y={92} />
            <text x="38" y="72" {...ptStyle}>{leftPt}</text>
            <text x="182" y="97" {...ptStyle}>{rightPt}</text>
            {propertyId !== 63 && <text x="100" y="96" {...ptStyle}>O</text>}
            <text x="135" y="34" {...ptStyle} fill="#b45309">(d)</text>
          </g>
        );
      }

      // 5, 22: Right triangle inscribed in a circle
      case 5:
      case 22: {
        const isProp5 = propertyId === 5;
        return (
          <g>
            <circle
              cx="120"
              cy="72"
              r="48"
              fill="none"
              stroke={showHyp ? hypColor : baseStroke}
              strokeWidth="1.6"
            />
            {isProp5 ? (
              <>
                {/* A(86,106), B(168,72), C(86,38) -> BC passes through O(120,72)? Let's make diameter BC: B(166,85), C(74,59), A(85,105) */}
                <polygon
                  points="85,105 166,85 74,59"
                  fill="#ecfccb"
                  fillOpacity="0.45"
                  stroke="#65a30d"
                  strokeWidth="1.8"
                />
                {/* Right angle at A(85,105) */}
                {showHyp && (
                  <polygon
                    points="85,105 93,103 91,95 83,97"
                    fill="#84cc16"
                    stroke="#4d7c0f"
                    strokeWidth="1.2"
                  />
                )}
                <CrossPoint x={120} y={72} color={showConc ? concColor : hypColor} />
                {showConc && (
                  <>
                    <TickMark x1={74} y1={59} x2={120} y2={72} count={2} color={concColor} />
                    <TickMark x1={120} y1={72} x2={166} y2={85} count={2} color={concColor} />
                  </>
                )}
                <text x="68" y="114" {...ptStyle}>A</text>
                <text x="172" y="90" {...ptStyle}>B</text>
                <text x="58" y="58" {...ptStyle}>C</text>
                <text x="116" y="64" {...ptStyle} fill={showConc ? concColor : '#1e293b'}>O</text>
                <text x="155" y="34" {...ptStyle}>(C)</text>
              </>
            ) : (
              <>
                {/* Diameter AB: A(74,85), B(166,59), C(98,29) */}
                <polygon
                  points="74,85 166,59 98,29"
                  fill="#fce7f3"
                  fillOpacity="0.45"
                  stroke="#be185d"
                  strokeWidth="1.8"
                />
                <CrossPoint x={120} y={72} />
                {showHyp && (
                  <>
                    <TickMark x1={74} y1={85} x2={120} y2={72} count={2} color={hypColor} />
                    <TickMark x1={120} y1={72} x2={166} y2={59} count={2} color={hypColor} />
                  </>
                )}
                {showConc && (
                  <polygon
                    points="98,29 94,37 102,41 106,33"
                    fill="#10b981"
                    stroke={concColor}
                    strokeWidth="1.2"
                  />
                )}
                <text x="58" y="92" {...ptStyle}>A</text>
                <text x="172" y="63" {...ptStyle}>B</text>
                <text x="93" y="22" {...ptStyle}>C</text>
              </>
            )}
          </g>
        );
      }

      // 6, 12, 49: Midsegment theorem in triangle ABC (I midpoint of [AC], J midpoint of [BC])
      case 6:
      case 12:
      case 49: {
        return (
          <g>
            {/* Triangle ABC: C(95,22), A(65,112), B(180,92) */}
            <polygon
              points="95,22 65,112 180,92"
              fill="none"
              stroke={baseStroke}
              strokeWidth="1.8"
            />
            {/* Line (IJ) through I(80,67) and J(137.5,57) */}
            <line
              x1="52"
              y1="72"
              x2="168"
              y2="51.7"
              stroke={propertyId === 12 && showConc ? concColor : '#be123c'}
              strokeWidth="2"
            />
            {/* Tick marks on [AC] */}
            {(showHyp || showConc) && (
              <>
                <TickMark x1={95} y1={22} x2={80} y2={67} count={2} color={hypColor} />
                <TickMark x1={80} y1={67} x2={65} y2={112} count={2} color={hypColor} />
              </>
            )}
            {/* Tick marks on [BC] */}
            {((propertyId !== 6 && showHyp) || (propertyId === 6 && showConc)) && (
              <>
                <TickMark
                  x1={95}
                  y1={22}
                  x2={137.5}
                  y2={57}
                  count={3}
                  color={propertyId === 6 ? concColor : hypColor}
                />
                <TickMark
                  x1={137.5}
                  y1={57}
                  x2={180}
                  y2={92}
                  count={3}
                  color={propertyId === 6 ? concColor : hypColor}
                />
              </>
            )}
            <text x="90" y="16" {...ptStyle}>C</text>
            <text x="50" y="118" {...ptStyle}>A</text>
            <text x="186" y="96" {...ptStyle}>B</text>
            <text x="64" y="63" {...ptStyle}>I</text>
            <text x="138" y="48" {...ptStyle}>J</text>
            {propertyId === 6 && <text x="36" y="69" {...ptStyle} fill="#be123c">(d)</text>}
          </g>
        );
      }

      // 7, 15: Two parallel lines (d1), (d2) and a perpendicular transversal (d3)
      case 7:
      case 15: {
        const isProp7 = propertyId === 7;
        return (
          <g>
            {/* (d1) and (d2) */}
            <line
              x1="50"
              y1="68"
              x2="175"
              y2="42"
              stroke={isProp7 && showConc ? concColor : '#d97706'}
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="98"
              x2="175"
              y2="72"
              stroke={isProp7 && showConc ? concColor : '#d97706'}
              strokeWidth="2"
            />
            {/* (d3) perpendicular */}
            <line x1="102" y1="18" x2="124" y2="124" stroke={baseStroke} strokeWidth="1.8" />
            {/* Right angle 1 at (110, 55.5) */}
            {showHyp && (
              <polygon
                points="110,55.5 117.8,53.9 116.2,46.1 108.4,47.7"
                fill="#fde68a"
                stroke="#b45309"
                strokeWidth="1.2"
              />
            )}
            {/* Right angle 2 at (116.2, 84.8) */}
            {((isProp7 && showHyp) || (!isProp7 && showConc)) && (
              <polygon
                points="116.2,84.8 124,83.2 122.4,75.4 114.6,77"
                fill={!isProp7 && showConc ? '#a7f3d0' : '#fde68a'}
                stroke={!isProp7 && showConc ? concColor : '#b45309'}
                strokeWidth="1.2"
              />
            )}
            <text x="180" y="44" {...ptStyle}>(d₁)</text>
            <text x="180" y="75" {...ptStyle}>(d₂)</text>
            <text x="72" y="28" {...ptStyle}>(d₃)</text>
          </g>
        );
      }

      // 8: Three parallel lines (d1), (d2), (d3)
      case 8: {
        return (
          <g>
            <line x1="45" y1="95" x2="125" y2="38" stroke="#06b6d4" strokeWidth="2" />
            <line x1="75" y1="95" x2="155" y2="38" stroke="#be185d" strokeWidth="2" strokeDasharray="5,3" />
            <line
              x1="115"
              y1="95"
              x2="195"
              y2="38"
              stroke={showConc ? concColor : '#881337'}
              strokeWidth="2.2"
            />
            <text x="90" y="32" {...ptStyle}>(d₁)</text>
            <text x="132" y="32" {...ptStyle}>(d₂)</text>
            <text x="142" y="108" {...ptStyle}>(d₃)</text>
          </g>
        );
      }

      // 9, 10: Two lines cut by a transversal (alternate interior / corresponding angles)
      case 9:
      case 10: {
        const isAlt = propertyId === 9;
        return (
          <g>
            {/* Lines (vt) and (uy) */}
            <line
              x1="45"
              y1="62"
              x2="190"
              y2="50"
              stroke={showConc ? concColor : baseStroke}
              strokeWidth="1.8"
            />
            <line
              x1="45"
              y1="98"
              x2="190"
              y2="86"
              stroke={showConc ? concColor : baseStroke}
              strokeWidth="1.8"
            />
            {/* Transversal (zw) */}
            <line x1="75" y1="118" x2="175" y2="22" stroke={baseStroke} strokeWidth="1.8" />
            {/* Angle sectors at G(138, 54) and E(101, 93) */}
            {(showHyp || showReason) && (
              <>
                {/* Sector at G */}
                <path
                  d="M 138,54 L 122,55.3 A 16,16 0 0,0 126.8,65.2 Z"
                  fill="#f59e0b"
                  fillOpacity="0.7"
                  stroke="#b45309"
                />
                {/* Sector at E */}
                {isAlt ? (
                  <path
                    d="M 101,93 L 117,91.7 A 16,16 0 0,0 112.2,81.8 Z"
                    fill="#f59e0b"
                    fillOpacity="0.7"
                    stroke="#b45309"
                  />
                ) : (
                  <path
                    d="M 101,93 L 85,94.3 A 16,16 0 0,0 89.8,104.2 Z"
                    fill="#f59e0b"
                    fillOpacity="0.7"
                    stroke="#b45309"
                  />
                )}
              </>
            )}
            <text x="34" y="64" {...ptStyle}>v</text>
            <text x="195" y="54" {...ptStyle}>t</text>
            <text x="34" y="100" {...ptStyle}>u</text>
            <text x="195" y="90" {...ptStyle}>y</text>
            <text x="176" y="20" {...ptStyle}>z</text>
            <text x="64" y="125" {...ptStyle}>w</text>
            <text x="118" y="45" {...ptStyle}>G</text>
            <text x="108" y="110" {...ptStyle}>E</text>
          </g>
        );
      }

      // 13: Two lines (AD) and (BC) symmetric with respect to O
      case 13: {
        return (
          <g>
            <line x1="65" y1="70" x2="175" y2="18" stroke={showConc ? concColor : baseStroke} strokeWidth="1.8" />
            <line x1="65" y1="118" x2="175" y2="66" stroke={showConc ? concColor : baseStroke} strokeWidth="1.8" />
            {/* Dashed symmetry lines through O(120, 68) */}
            <line x1="85" y1="108.5" x2="155" y2="27.5" stroke={hypColor} strokeWidth="1.3" strokeDasharray="4,3" />
            <line x1="95" y1="55.8" x2="145" y2="80.2" stroke={hypColor} strokeWidth="1.3" strokeDasharray="4,3" />
            <CrossPoint x={120} y={68} color={hypColor} />
            <text x="74" y="122" {...ptStyle}>A</text>
            <text x="156" y="24" {...ptStyle}>B</text>
            <text x="80" y="53" {...ptStyle}>C</text>
            <text x="150" y="92" {...ptStyle}>D</text>
            <text x="124" y="79" {...ptStyle}>O</text>
          </g>
        );
      }

      // 14, 50: Thalès butterfly / triangle configuration
      case 14:
      case 50: {
        const isProp14 = propertyId === 14;
        return (
          <g>
            {/* Top horizontal line and bottom horizontal line */}
            <line
              x1="55"
              y1="36"
              x2="185"
              y2="36"
              stroke={isProp14 && showConc ? concColor : '#65a30d'}
              strokeWidth="2"
            />
            <line
              x1="55"
              y1="104"
              x2="185"
              y2="104"
              stroke={isProp14 && showConc ? concColor : '#65a30d'}
              strokeWidth="2"
            />
            {/* Two intersecting secants at A/E (120, 66) */}
            <line x1="68" y1="18" x2="178" y2="118" stroke={baseStroke} strokeWidth="1.7" />
            <line x1="168" y1="18" x2="64" y2="118" stroke={baseStroke} strokeWidth="1.7" />
            {isProp14 ? (
              <>
                <text x="72" y="31" {...ptStyle}>M</text>
                <text x="138" y="31" {...ptStyle}>N</text>
                <text x="126" y="68" {...ptStyle}>A</text>
                <text x="72" y="118" {...ptStyle}>C</text>
                <text x="155" y="118" {...ptStyle}>B</text>
              </>
            ) : (
              <>
                <text x="72" y="31" {...ptStyle}>H</text>
                <text x="138" y="31" {...ptStyle}>K</text>
                <text x="126" y="68" {...ptStyle}>E</text>
                <text x="72" y="118" {...ptStyle}>G</text>
                <text x="155" y="118" {...ptStyle}>F</text>
              </>
            )}
          </g>
        );
      }

      // 19: Circle (C) with tangent (d) at T and radius [OT]
      case 19: {
        return (
          <g>
            <circle cx="105" cy="64" r="38" fill="none" stroke={baseStroke} strokeWidth="1.7" />
            {/* Radius OT to T(132, 91) */}
            <line x1="105" y1="64" x2="132" y2="91" stroke={hypColor} strokeWidth="1.6" strokeDasharray="4,3" />
            {/* Tangent (d) perpendicular to OT at T(132, 91) */}
            <line x1="94" y1="129" x2="174" y2="49" stroke="#d97706" strokeWidth="2" />
            {(showHyp || showConc) && (
              <polygon
                points="132,91 125,84 132,77 139,84"
                fill={showConc ? '#a7f3d0' : '#fde68a'}
                stroke={showConc ? concColor : '#b45309'}
                strokeWidth="1.2"
              />
            )}
            <CrossPoint x={105} y={64} />
            <text x="90" y="70" {...ptStyle}>O</text>
            <text x="137" y="104" {...ptStyle}>T</text>
            <text x="82" y="122" {...ptStyle} fill="#b45309">(d)</text>
            <text x="135" y="24" {...ptStyle}>(C)</text>
          </g>
        );
      }

      // 20, 51, 56: Right triangle ABC at A
      case 20:
      case 51:
      case 56: {
        const isProp20 = propertyId === 20;
        return (
          <g>
            {/* Triangle ABC right at A(78, 98), C(66, 36), B(178, 76) */}
            <polygon
              points="78,98 66,36 178,76"
              fill={isProp20 ? '#fce7f3' : '#e0f2fe'}
              fillOpacity="0.55"
              stroke={isProp20 ? '#be185d' : '#0284c7'}
              strokeWidth="1.8"
            />
            {((!isProp20 && showHyp) || (isProp20 && showConc)) && (
              <polygon
                points="78,98 76,88 86,86 88,96"
                fill={isProp20 ? '#10b981' : '#0284c7'}
                stroke={isProp20 ? concColor : '#0369a1'}
                strokeWidth="1.2"
              />
            )}
            <text x="68" y="114" {...ptStyle}>A</text>
            <text x="184" y="80" {...ptStyle}>B</text>
            <text x="54" y="34" {...ptStyle}>C</text>
          </g>
        );
      }

      // 21, 52: Right triangle ABC with median [AM] to hypotenuse [BC]
      case 21:
      case 52: {
        const isProp21 = propertyId === 21;
        return (
          <g>
            {/* A(78, 98), C(66, 36), B(178, 76), M(122, 56) */}
            <polygon
              points="78,98 66,36 178,76"
              fill="#ecfccb"
              fillOpacity="0.5"
              stroke="#65a30d"
              strokeWidth="1.8"
            />
            <line
              x1="78"
              y1="98"
              x2="122"
              y2="56"
              stroke={ !isProp21 && showConc ? concColor : '#65a30d'}
              strokeWidth="1.8"
            />
            {(showHyp || showConc) && (
              <>
                <TickMark x1={66} y1={36} x2={122} y2={56} count={2} color="#be123c" />
                <TickMark x1={122} y1={56} x2={178} y2={76} count={2} color="#be123c" />
                <TickMark
                  x1={78}
                  y1={98}
                  x2={122}
                  y2={56}
                  count={2}
                  color={!isProp21 && showConc ? concColor : '#be123c'}
                />
              </>
            )}
            {((!isProp21 && showHyp) || (isProp21 && showConc)) && (
              <polygon
                points="78,98 76,88 86,86 88,96"
                fill={isProp21 ? '#10b981' : '#84cc16'}
                stroke={isProp21 ? concColor : '#4d7c0f'}
                strokeWidth="1.2"
              />
            )}
            <text x="68" y="114" {...ptStyle}>A</text>
            <text x="184" y="80" {...ptStyle}>B</text>
            <text x="54" y="34" {...ptStyle}>C</text>
            <text x="120" y="47" {...ptStyle}>M</text>
          </g>
        );
      }

      // 2, 11, 23, 24, 25, 26, 27, 28, 29, 43, 54: Parallelogram ABCD
      case 2:
      case 11:
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
      case 28:
      case 29:
      case 43:
      case 54: {
        const showDiag = [2, 24, 28].includes(propertyId);
        const showAngles = [27, 54].includes(propertyId);
        const showArrows = propertyId === 29;
        return (
          <g>
            {/* Parallelogram: A(62,96), B(154,82), C(178,32), D(86,46) */}
            <polygon
              points="62,96 154,82 178,32 86,46"
              fill={propertyId === 2 ? '#f5d0fe' : '#e0f2fe'}
              fillOpacity="0.45"
              stroke={showConc ? concColor : baseStroke}
              strokeWidth="1.8"
            />
            {showDiag && (
              <>
                <line x1="62" y1="96" x2="178" y2="32" stroke={baseStroke} strokeWidth="1.4" strokeDasharray={propertyId === 2 ? '4,3' : undefined} />
                <line x1="86" y1="46" x2="154" y2="82" stroke={baseStroke} strokeWidth="1.4" strokeDasharray={propertyId === 2 ? '4,3' : undefined} />
                {(showHyp || showConc) && (
                  <>
                    <TickMark x1={62} y1={96} x2={120} y2={64} count={2} color="#be123c" />
                    <TickMark x1={120} y1={64} x2="178" y2="32" count={2} color="#be123c" />
                    <TickMark x1={86} y1={46} x2={120} y2={64} count={3} color="#be123c" />
                    <TickMark x1={120} y1={64} x2={154} y2={82} count={3} color="#be123c" />
                  </>
                )}
                {(propertyId === 2 || propertyId === 28) && (
                  <text x="116" y="57" {...ptStyle}>O</text>
                )}
              </>
            )}
            {(propertyId === 25 || propertyId === 26 || propertyId === 43) && (showHyp || showConc) && (
              <>
                <TickMark x1={62} y1={96} x2={154} y2={82} count={2} color="#be123c" />
                <TickMark x1={86} y1={46} x2={178} y2={32} count={2} color="#be123c" />
                {(propertyId === 26 || propertyId === 43) && (
                  <>
                    <TickMark x1={62} y1={96} x2={86} y2={46} count={3} color="#be123c" />
                    <TickMark x1={154} y1={82} x2={178} y2={32} count={3} color="#be123c" />
                  </>
                )}
              </>
            )}
            {showAngles && (showHyp || showConc) && (
              <>
                <circle cx="69" cy="88" r="6" fill="#f59e0b" fillOpacity="0.6" />
                <circle cx="171" cy="40" r="6" fill="#f59e0b" fillOpacity="0.6" />
                <circle cx="91" cy="52" r="6" fill="#0284c7" fillOpacity="0.6" />
                <circle cx="149" cy="76" r="6" fill="#0284c7" fillOpacity="0.6" />
              </>
            )}
            {showArrows && (
              <>
                <line x1="62" y1="96" x2="154" y2="82" stroke="#d97706" strokeWidth="2.4" />
                <line x1="86" y1="46" x2="178" y2="32" stroke="#d97706" strokeWidth="2.4" />
              </>
            )}
            <text x="46" y="104" {...ptStyle}>A</text>
            <text x="160" y="92" {...ptStyle}>B</text>
            <text x="183" y="34" {...ptStyle}>{propertyId === 29 ? 'D' : 'C'}</text>
            <text x="72" y="42" {...ptStyle}>{propertyId === 29 ? 'C' : 'D'}</text>
          </g>
        );
      }

      // 16, 30, 31, 32, 39, 44: Rhombus (معيّن) ABCD
      case 16:
      case 30:
      case 31:
      case 32:
      case 39:
      case 44: {
        const showDiag = [16, 31, 39].includes(propertyId);
        const showSides = [30, 32, 44].includes(propertyId);
        return (
          <g>
            {/* Rhombus: A(120,98), B(182,66), C(120,34), D(58,66) */}
            <polygon
              points="120,98 182,66 120,34 58,66"
              fill="#f5d0fe"
              fillOpacity="0.35"
              stroke={showConc ? concColor : baseStroke}
              strokeWidth="1.8"
            />
            {showDiag && (
              <>
                <line x1="120" y1="98" x2="120" y2="34" stroke={baseStroke} strokeWidth="1.5" />
                <line x1="58" y1="66" x2="182" y2="66" stroke={baseStroke} strokeWidth="1.5" />
                {(propertyId === 16 || propertyId === 31) && (showHyp || showConc) && (
                  <rect
                    x="120"
                    y="57"
                    width="9"
                    height="9"
                    fill="#fde68a"
                    stroke={propertyId === 16 && showConc ? concColor : '#b45309'}
                    strokeWidth="1.2"
                  />
                )}
                {propertyId === 39 && (showHyp || showConc) && (
                  <>
                    <TickMark x1={120} y1={98} x2={120} y2={66} count={2} color="#be123c" />
                    <TickMark x1={120} y1={66} x2={120} y2={34} count={2} color="#be123c" />
                    <TickMark x1={58} y1={66} x2={120} y2={66} count={2} color="#be123c" />
                    <TickMark x1={120} y1={66} x2={182} y2={66} count={2} color="#be123c" />
                  </>
                )}
              </>
            )}
            {showSides && (showHyp || showConc) && (
              <>
                <TickMark x1={120} y1={34} x2={182} y2={66} count={2} color="#be123c" />
                <TickMark x1={58} y1={66} x2={120} y2={34} count={2} color="#be123c" />
                {propertyId !== 32 && (
                  <>
                    <TickMark x1={120} y1={98} x2={182} y2={66} count={2} color="#be123c" />
                    <TickMark x1={58} y1={66} x2={120} y2={98} count={2} color="#be123c" />
                  </>
                )}
              </>
            )}
            <text x="116" y="114" {...ptStyle}>A</text>
            <text x="188" y="70" {...ptStyle}>B</text>
            <text x="116" y="27" {...ptStyle}>C</text>
            <text x="42" y="70" {...ptStyle}>D</text>
          </g>
        );
      }

      // 17, 33, 34, 35, 36, 37, 38, 45: Rectangle or Square ABCD
      case 17:
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 45: {
        const isSquareShape = [36, 37, 38].includes(propertyId);
        const x1 = isSquareShape ? 82 : 66;
        const x2 = isSquareShape ? 158 : 174;
        const y1 = 34;
        const y2 = 98;
        const showDiag = [34, 38, 45].includes(propertyId);
        return (
          <g>
            <rect
              x={x1}
              y={y1}
              width={x2 - x1}
              height={y2 - y1}
              fill="#e0f2fe"
              fillOpacity="0.45"
              stroke={showConc ? concColor : baseStroke}
              strokeWidth="1.8"
            />
            {showDiag && (
              <>
                <line x1={x1} y1={y2} x2={x2} y2={y1} stroke={baseStroke} strokeWidth="1.5" />
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={baseStroke} strokeWidth="1.5" />
                {(propertyId === 34 || propertyId === 45) && (showHyp || showConc) && (
                  <>
                    <TickMark x1={x1} y1={y2} x2={120} y2={66} count={2} color="#be123c" />
                    <TickMark x1={120} y1={66} x2={x2} y2={y1} count={2} color="#be123c" />
                    <TickMark x1={x1} y1={y1} x2={120} y2={66} count={2} color="#be123c" />
                    <TickMark x1={120} y1={66} x2={x2} y2={y2} count={2} color="#be123c" />
                  </>
                )}
                {propertyId === 38 && (showHyp || showConc) && (
                  <polygon
                    points="120,66 126,60 120,54 114,60"
                    fill="#fde68a"
                    stroke="#b45309"
                    strokeWidth="1.2"
                  />
                )}
              </>
            )}
            {(propertyId === 17 || propertyId === 33 || propertyId === 35 || propertyId === 37) && (showHyp || showConc) && (
              <>
                <rect x={x1} y={y2 - 8} width="8" height="8" fill="none" stroke="#1e293b" strokeWidth="1.2" />
                {(propertyId === 17 || propertyId === 33) && (
                  <>
                    <rect x={x2 - 8} y={y2 - 8} width="8" height="8" fill="none" stroke="#1e293b" strokeWidth="1.2" />
                    <rect x={x2 - 8} y={y1} width="8" height="8" fill="none" stroke="#1e293b" strokeWidth="1.2" />
                  </>
                )}
              </>
            )}
            {propertyId === 36 && (showHyp || showConc) && (
              <>
                <TickMark x1={x1} y1={y1} x2={x1} y2={y2} count={2} color="#be123c" />
                <TickMark x1={x1} y1={y2} x2={x2} y2={y2} count={2} color="#be123c" />
              </>
            )}
            <text x={x1 - 14} y={y2 + 6} {...ptStyle}>A</text>
            <text x={x2 + 6} y={y2 + 6} {...ptStyle}>B</text>
            <text x={x2 + 6} y={y1 + 4} {...ptStyle}>C</text>
            <text x={x1 - 14} y={y1 + 4} {...ptStyle}>D</text>
          </g>
        );
      }

      // 41, 42, 57, 58, 64, 69: Isosceles or Equilateral triangle ABC
      case 41:
      case 42:
      case 57:
      case 58:
      case 64:
      case 69: {
        const isEqui = propertyId === 42 || propertyId === 58;
        const showBisector = propertyId === 69;
        return (
          <g>
            {/* Triangle ABC: C(120, 26), A(76, 102), B(164, 102) */}
            <polygon
              points="120,26 76,102 164,102"
              fill={isEqui ? '#e0f2fe' : '#fce7f3'}
              fillOpacity="0.45"
              stroke={baseStroke}
              strokeWidth="1.8"
            />
            {(showHyp || showConc) && (
              <>
                <TickMark x1={120} y1={26} x2={76} y2={102} count={2} color="#be123c" />
                <TickMark x1={120} y1={26} x2={164} y2={102} count={2} color="#be123c" />
                {isEqui && <TickMark x1={76} y1={102} x2={164} y2={102} count={2} color="#be123c" />}
              </>
            )}
            {(propertyId === 57 || propertyId === 58) && (showHyp || showConc) && (
              <>
                <path d="M 76,102 L 88,102 A 12,12 0 0,0 82,91.6 Z" fill="#be185d" fillOpacity="0.6" />
                <path d="M 164,102 L 158,91.6 A 12,12 0 0,0 152,102 Z" fill="#be185d" fillOpacity="0.6" />
                {propertyId === 58 && (
                  <path d="M 120,26 L 114,36.4 A 12,12 0 0,0 126,36.4 Z" fill="#be185d" fillOpacity="0.6" />
                )}
              </>
            )}
            {showBisector && (
              <>
                <line x1="120" y1="26" x2="120" y2="102" stroke={concColor} strokeWidth="2" />
                <rect x="120" y="94" width="8" height="8" fill="#a7f3d0" stroke={concColor} strokeWidth="1.2" />
                <TickMark x1={76} y1={102} x2={120} y2={102} count={1} color={concColor} />
                <TickMark x1={120} y1={102} x2={164} y2={102} count={1} color={concColor} />
                <text x="115" y="116" {...ptStyle}>M</text>
              </>
            )}
            <text x="116" y="20" {...ptStyle}>C</text>
            <text x="60" y="106" {...ptStyle}>A</text>
            <text x="170" y="106" {...ptStyle}>B</text>
          </g>
        );
      }

      // 46: Two points A and B on a circle of centre O
      case 46: {
        return (
          <g>
            <circle cx="115" cy="68" r="42" fill="#fce7f3" fillOpacity="0.35" stroke={baseStroke} strokeWidth="1.7" />
            <line x1="115" y1="68" x2="145" y2="38" stroke={showConc ? concColor : baseStroke} strokeWidth="1.7" />
            <line x1="115" y1="68" x2="138" y2="103" stroke={showConc ? concColor : baseStroke} strokeWidth="1.7" />
            {showConc && (
              <>
                <TickMark x1={115} y1={68} x2={145} y2={38} count={2} color={concColor} />
                <TickMark x1={115} y1={68} x2={138} y2={103} count={2} color={concColor} />
              </>
            )}
            <CrossPoint x={115} y={68} />
            <text x="100" y="74" {...ptStyle}>O</text>
            <text x="150" y="36" {...ptStyle}>B</text>
            <text x="144" y="112" {...ptStyle}>A</text>
          </g>
        );
      }

      // 47: Point M on the perpendicular bisector of [AB]
      case 47: {
        return (
          <g>
            <line x1="58" y1="84" x2="178" y2="108" stroke={baseStroke} strokeWidth="1.8" />
            <line x1="132" y1="20" x2="108" y2="124" stroke="#d97706" strokeWidth="1.8" />
            {/* Point M(126, 46) */}
            <line x1="58" y1="84" x2="126" y2="46" stroke={showConc ? concColor : baseStroke} strokeWidth="1.5" strokeDasharray="4,3" />
            <line x1="178" y1="108" x2="126" y2="46" stroke={showConc ? concColor : baseStroke} strokeWidth="1.5" strokeDasharray="4,3" />
            <polygon points="118,96 125,97.4 126.4,90.4 119.4,89" fill="none" stroke="#1e293b" strokeWidth="1.2" />
            <TickMark x1={58} y1={84} x2={118} y2={96} count={1} color="#be123c" />
            <TickMark x1={118} y1={96} x2={178} y2={108} count={1} color="#be123c" />
            <CrossPoint x={126} y={46} />
            <text x="44" y="88" {...ptStyle}>A</text>
            <text x="182" y="116" {...ptStyle}>B</text>
            <text x="104" y="112" {...ptStyle}>O</text>
            <text x="134" y="48" {...ptStyle}>M</text>
          </g>
        );
      }

      // 48, 60, 67, 68: Angle bisector [OB) of xOy / COD
      case 48:
      case 60:
      case 67:
      case 68: {
        const showPerp = propertyId === 48 || propertyId === 68;
        return (
          <g>
            {/* Vertex O(58, 92), Ray Ox to (165, 24), Ray Oy to (175, 102), Bisector OB to (172, 62) */}
            <line x1="58" y1="92" x2="165" y2="24" stroke={baseStroke} strokeWidth="1.8" />
            <line x1="58" y1="92" x2="175" y2="102" stroke={baseStroke} strokeWidth="1.8" />
            <line
              x1="58"
              y1="92"
              x2="172"
              y2="62"
              stroke={showConc ? concColor : '#0284c7'}
              strokeWidth="2"
            />
            {showPerp && (
              <>
                {/* B(134, 72), C(118, 54), D(131, 98) */}
                <line x1="134" y1="72" x2="118" y2="54" stroke="#be123c" strokeWidth="1.5" strokeDasharray="3,2" />
                <line x1="134" y1="72" x2="131" y2="98" stroke="#be123c" strokeWidth="1.5" strokeDasharray="3,2" />
                <text x="106" y="48" {...ptStyle}>C</text>
                <text x="126" y="114" {...ptStyle}>D</text>
              </>
            )}
            <text x="42" y="96" {...ptStyle}>O</text>
            <text x="142" y="69" {...ptStyle}>B</text>
            <text x="168" y="24" {...ptStyle}>{propertyId === 67 ? 'C' : 'x'}</text>
            <text x="178" y="106" {...ptStyle}>{propertyId === 67 ? 'D' : 'y'}</text>
          </g>
        );
      }

      // 53: Centroid G (intersection of medians in triangle ABC)
      case 53: {
        return (
          <g>
            {/* A(96,24), B(56,104), C(184,104) */}
            <polygon points="96,24 56,104 184,104" fill="#fce7f3" fillOpacity="0.35" stroke={baseStroke} strokeWidth="1.8" />
            {/* Medians: A'=(120,104), B'=(140,64), C'=(76,64), G=(112,77.3) */}
            <line x1="96" y1="24" x2="120" y2="104" stroke="#be123c" strokeWidth="1.7" />
            <line x1="56" y1="104" x2="140" y2="64" stroke={baseStroke} strokeWidth="1.3" strokeDasharray="4,3" />
            <line x1="184" y1="104" x2="76" y2="64" stroke={baseStroke} strokeWidth="1.3" strokeDasharray="4,3" />
            <text x="91" y="18" {...ptStyle}>A</text>
            <text x="42" y="108" {...ptStyle}>B</text>
            <text x="190" y="108" {...ptStyle}>C</text>
            <text x="116" y="119" {...ptStyle}>A'</text>
            <text x="146" y="64" {...ptStyle}>B'</text>
            <text x="58" y="64" {...ptStyle}>C'</text>
            <text x="115" y="74" {...ptStyle} fill={concColor}>G</text>
          </g>
        );
      }

      // 55: Sum of angles in triangle ABC = 180°
      case 55: {
        return (
          <g>
            <polygon points="65,34 85,102 182,86" fill="#e0f2fe" fillOpacity="0.45" stroke={baseStroke} strokeWidth="1.8" />
            <circle cx="71" cy="44" r="7" fill="#0284c7" fillOpacity="0.5" />
            <circle cx="91" cy="96" r="7" fill="#0284c7" fillOpacity="0.5" />
            <circle cx="170" cy="85" r="7" fill="#0284c7" fillOpacity="0.5" />
            <text x="53" y="32" {...ptStyle}>C</text>
            <text x="76" y="118" {...ptStyle}>A</text>
            <text x="188" y="90" {...ptStyle}>B</text>
          </g>
        );
      }

      // 59: Vertically opposite angles
      case 59: {
        return (
          <g>
            <line x1="50" y1="50" x2="190" y2="94" stroke={baseStroke} strokeWidth="1.8" />
            <line x1="50" y1="90" x2="190" y2="54" stroke={baseStroke} strokeWidth="1.8" />
            <path d="M 120,72 L 100,65.7 A 21,21 0 0,0 100,77.1 Z" fill="#f59e0b" fillOpacity="0.7" />
            <path d="M 120,72 L 140,78.3 A 21,21 0 0,0 140,66.9 Z" fill="#f59e0b" fillOpacity="0.7" />
            <text x="116" y="63" {...ptStyle}>A</text>
            <text x="38" y="52" {...ptStyle}>z</text>
            <text x="38" y="94" {...ptStyle}>x</text>
            <text x="195" y="54" {...ptStyle}>y</text>
            <text x="195" y="98" {...ptStyle}>t</text>
          </g>
        );
      }

      // 61, 62: Inscribed angles / central angle in a circle
      case 61:
      case 62: {
        const isProp61 = propertyId === 61;
        return (
          <g>
            <circle cx="120" cy="68" r="46" fill="none" stroke="#0d9488" strokeWidth="1.7" />
            {isProp61 ? (
              <>
                {/* A(135,111), C(82,94), B(102,25), D(152,35) */}
                <polyline points="82,94 102,25 135,111" fill="none" stroke="#d97706" strokeWidth="1.6" />
                <polyline points="82,94 152,35 135,111" fill="none" stroke="#be123c" strokeWidth="1.6" />
                <text x="136" y="124" {...ptStyle}>A</text>
                <text x="66" y="98" {...ptStyle}>C</text>
                <text x="96" y="19" {...ptStyle}>B</text>
                <text x="158" y="34" {...ptStyle}>D</text>
              </>
            ) : (
              <>
                {/* Central angle at D(120,68), B(95,29), A(76,82), C(158,94) */}
                <polyline points="76,82 95,29 158,94" fill="none" stroke="#0d9488" strokeWidth="1.6" />
                <polyline points="76,82 120,68 158,94" fill="none" stroke="#be123c" strokeWidth="1.7" />
                <text x="60" y="86" {...ptStyle}>A</text>
                <text x="86" y="23" {...ptStyle}>B</text>
                <text x="164" y="98" {...ptStyle}>C</text>
                <text x="112" y="62" {...ptStyle}>D</text>
              </>
            )}
          </g>
        );
      }

      // 65, 66: Altitude (الارتفاع) or Median (المتوسط) in triangle ABC
      case 65:
      case 66: {
        const isAltitude = propertyId === 65;
        return (
          <g>
            {/* C(102,24), A(62,102), B(178,102) */}
            <polygon points="102,24 62,102 178,102" fill="#e0f2fe" fillOpacity="0.45" stroke={baseStroke} strokeWidth="1.8" />
            {isAltitude ? (
              <>
                <line x1="102" y1="16" x2="102" y2="112" stroke={concColor} strokeWidth="2" />
                <rect x="102" y="94" width="8" height="8" fill="#0284c7" stroke="#0369a1" strokeWidth="1.2" />
                <text x="98" y="118" {...ptStyle}>D</text>
              </>
            ) : (
              <>
                {/* Midpoint D(120, 102) */}
                <line x1="102" y1="24" x2="120" y2="102" stroke={concColor} strokeWidth="2" />
                <TickMark x1={62} y1={102} x2={120} y2={102} count={2} color="#65a30d" />
                <TickMark x1={120} y1={102} x2={178} y2={102} count={2} color="#65a30d" />
                <text x="116" y="118" {...ptStyle}>D</text>
              </>
            )}
            <text x="96" y="18" {...ptStyle}>C</text>
            <text x="46" y="106" {...ptStyle}>A</text>
            <text x="184" y="106" {...ptStyle}>B</text>
          </g>
        );
      }

      default:
        return null;
    }
  };

  const stepsLabels: { id: TreatiseStep; ar: string; fr: string }[] = [
    { id: 1, ar: '1. الشكل', fr: '1. Figure' },
    { id: 2, ar: '2. المعطيات', fr: '2. Hypothèses' },
    { id: 3, ar: '3. الخاصية', fr: '3. Raisonnement' },
    { id: 4, ar: '4. النتيجة', fr: '4. Conclusion' },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-white rounded-xl border border-slate-200/90 p-2 flex flex-col items-center justify-center shadow-2xs">
        <svg
          viewBox="0 0 240 132"
          className="w-full max-w-[235px] h-auto select-none"
          role="img"
          aria-label={captionAr || `خاصية ${propertyId}`}
        >
          {renderFigure()}
        </svg>

        {(captionAr || captionFr) && (
          <div className="text-[11px] font-medium text-slate-600 text-center px-2 pb-1 leading-tight">
            {lang === 'fr' ? captionFr : lang === 'bilingual' ? `${captionAr} · ${captionFr}` : captionAr}
          </div>
        )}
      </div>

      {showStepControls && onStepChange && (
        <div className="flex items-center justify-center gap-1 mt-2 flex-wrap" dir="rtl">
          {stepsLabels.map((s) => {
            const active = step === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onStepChange(s.id)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'fr' ? s.fr : s.ar}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
