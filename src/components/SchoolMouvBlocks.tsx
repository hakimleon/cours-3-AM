import React, { useState } from 'react';
import { Course } from '../types';
import { MathView, formatTextWithSuperscripts } from './MathView';

export type TypedBlockKind = 'definition' | 'propriete' | 'exemple' | 'astuce' | 'aretenir';

const BLOCK_LABELS: Record<TypedBlockKind, string> = {
  definition: 'تعريف',
  propriete: 'خاصية',
  exemple: 'مثال تطبيقي',
  astuce: 'طريقة وتنبيه',
  aretenir: 'ما يجب أن أتذكره',
};

/**
 * Custom fine-line SVG icons (28px, stroke --accent #C94BA6, single icon per block type across all courses)
 */
export const BlockTypeSvgIcon: React.FC<{ kind: TypedBlockKind }> = ({ kind }) => {
  switch (kind) {
    case 'definition':
      // Livre ouvert (Open book, fine line)
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C94BA6"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M14 7.5C11.8 5.8 8.2 5.3 4.5 6.2V21.2C8.2 20.3 11.8 20.8 14 22.5C16.2 20.8 19.8 20.3 23.5 21.2V6.2C19.8 5.3 16.2 5.8 14 7.5Z" />
          <path d="M14 7.5V22.5" />
          <path d="M7.5 10.5H11" />
          <path d="M7.5 14H11" />
          <path d="M17 10.5H20.5" />
          <path d="M17 14H20.5" />
        </svg>
      );

    case 'propriete':
      // Balance d'équilibre géométrique (Fine-line scale / geometric theorem balance)
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C94BA6"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M14 4.5V22.5" />
          <path d="M9 22.5H19" />
          <path d="M5.5 9.5H22.5" />
          <path d="M6.5 9.5L4 15.5H9L6.5 9.5Z" />
          <path d="M21.5 9.5L19 15.5H24L21.5 9.5Z" />
          <circle cx="14" cy="7" r="1.5" />
        </svg>
      );

    case 'exemple':
      // Loupe (Magnifying glass, fine line)
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C94BA6"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <circle cx="12.5" cy="12.5" r="7" />
          <path d="M17.8 17.8L23.2 23.2" />
          <path d="M10 12.5H15" />
          <path d="M12.5 10V15" />
        </svg>
      );

    case 'astuce':
      // Ampoule (Lightbulb, fine line)
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C94BA6"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M10.5 18.5C9.1 17.2 8 15.3 8 13C8 9.7 10.7 7 14 7C17.3 7 20 9.7 20 13C20 15.3 18.9 17.2 17.5 18.5L16.8 20.5H11.2L10.5 18.5Z" />
          <path d="M11.5 23H16.5" />
          <path d="M14 3.2V4.8" />
          <path d="M6.2 6.2L7.4 7.4" />
          <path d="M21.8 6.2L20.6 7.4" />
        </svg>
      );

    case 'aretenir':
      // Marque-page avec coche (Bookmark check, fine line)
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          stroke="#C94BA6"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M7.5 4.5H20.5V23.5L14 19L7.5 23.5V4.5Z" />
          <path d="M11 12L13.2 14.2L17.5 9.8" />
        </svg>
      );
  }
};

/**
 * Custom fine-line PDF Download Icon (icon-only for top of course card)
 */
export const PdfDownloadSvgIcon: React.FC<{ isExporting?: boolean }> = ({ isExporting }) => {
  if (isExporting) {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C94BA6"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="animate-spin"
      >
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    );
  }
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C94BA6"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <polyline points="14 3 14 8 19 8" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <polyline points="9.5 14.5 12 17 14.5 14.5" />
    </svg>
  );
};

/**
 * Section Heading Component (Spec 4 - Titre de section):
 * Cercle --accent (32 px, bordure 2 px) contenant le numéro (chiffres latins),
 * suivi du titre, avec un soulignement --accent court (40 px × 3 px) sous le début du titre.
 */
export const SectionTitle: React.FC<{
  number: number | string;
  title: string;
  id?: string;
}> = ({ number, title, id }) => {
  const raw = String(number).trim();
  const numLabel = raw === '0' || raw === '00' ? '0' : raw.replace(/^0+/, '') || '1';
  return (
    <div id={id} className="scroll-mt-24 mb-6 pt-2">
      <div className="flex items-start gap-3.5">
        <span
          className="w-[32px] h-[32px] rounded-full border-2 border-[#C94BA6] text-[#C94BA6] font-bold text-sm flex items-center justify-center shrink-0 mt-0.5"
          dir="ltr"
        >
          {numLabel}
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-[#4A4A4A] leading-snug">
            {formatTextWithSuperscripts(title, false)}
          </h2>
          {/* Short underline (40px x 3px) under the start of the title */}
          <div className="w-[40px] h-[3px] bg-[#C94BA6] mt-2 rounded-full" />
        </div>
      </div>
    </div>
  );
};

/**
 * Typed Block Component (Spec 4 - Bloc typé : Définition, Propriété, Exemple, Astuce, À retenir):
 * - En-tête : icône SVG trait fin --accent (28 px) + nom du bloc en --accent, semi-gras.
 * - Corps : rail pointillé vertical --accent (3px dotted var(--accent)), décalé sous l'icône ;
 *   contenu indenté à côté du rail (en RTL : rail à droite).
 */
export const TypedBlock: React.FC<{
  kind: TypedBlockKind;
  customLabel?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ kind, customLabel, children, className = '' }) => {
  const label = customLabel || BLOCK_LABELS[kind];
  return (
    <div className={`my-6 ${className}`} dir="rtl">
      {/* En-tête */}
      <div className="flex items-center gap-2.5 mb-2">
        <BlockTypeSvgIcon kind={kind} />
        <span className="text-[#C94BA6] font-semibold text-base tracking-normal">
          {label}
        </span>
      </div>

      {/* Corps avec rail pointillé vertical --accent décalé sous l'icône (28px / 2 ≈ 13px) */}
      <div
        className="mr-[13px] pr-5 py-1 space-y-3 text-[#4A4A4A] text-[15px] leading-[1.9]"
        style={{ borderRight: '3px dotted var(--accent)' }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Discreet 4px --accent bullet item (Spec 4 - Puces)
 */
export const AccentBulletItem: React.FC<{
  children: React.ReactNode;
  italic?: boolean;
}> = ({ children, italic = false }) => (
  <li className={`flex items-baseline gap-2.5 ${italic ? 'italic' : ''}`}>
    <span className="w-[4px] h-[4px] rounded-full bg-[#C94BA6] shrink-0 translate-y-[-3px]" />
    <span className="flex-1 min-w-0 leading-[1.9]">{children}</span>
  </li>
);

/**
 * Dedicated canonical figure for each course's properties using ONLY:
 * --fig-shape (#5B7BC0, blue: main shape)
 * --fig-mark (#F5A54A, orange: demonstrated elements / diagonals / medians / heights / right angles)
 * Plus Latin letters for points and strict caption correspondence.
 */
export const CanonicalPropertyFigure: React.FC<{
  courseId: string;
  propIndex: number; // 0 = direct / primary, 1 = converse / secondary
  caption?: string;
}> = ({ courseId, propIndex, caption }) => {
  const shapeColor = '#5B7BC0';
  const markColor = '#F5A54A';
  const labelColor = '#4A4A4A';

  const renderSvg = () => {
    switch (courseId) {
      case 'lesson-18':
        // Median to hypotenuse in right triangle ABC (right at A, M midpoint of [BC])
        if (propIndex === 0) {
          return (
            <svg dir="ltr" viewBox="0 0 220 135" className="w-full max-w-[210px] h-auto">
              {/* Right triangle ABC in --fig-shape */}
              <polygon
                points="42,106 42,28 182,106"
                fill="#5B7BC0"
                fillOpacity="0.08"
                stroke={shapeColor}
                strokeWidth="2"
              />
              {/* Right angle mark at A(42,106) */}
              <polyline
                points="42,94 54,94 54,106"
                fill="none"
                stroke={shapeColor}
                strokeWidth="1.6"
              />
              {/* Demonstrated Median [AM] in --fig-mark (#F5A54A) to M(112,67) */}
              <line x1="42" y1="106" x2="112" y2="67" stroke={markColor} strokeWidth="2.5" />
              {/* Equality ticks on BM, MC, and AM in --fig-mark */}
              <line x1="74" y1="42" x2="80" y2="52" stroke={markColor} strokeWidth="1.8" />
              <line x1="144" y1="81" x2="150" y2="91" stroke={markColor} strokeWidth="1.8" />
              <line x1="74" y1="82" x2="80" y2="91" stroke={markColor} strokeWidth="1.8" />
              {/* Points A, B, C, M */}
              <circle cx="42" cy="106" r="3" fill={shapeColor} />
              <text x="27" y="112" fill={labelColor} fontSize="12" fontWeight="bold">A</text>
              <circle cx="42" cy="28" r="3" fill={shapeColor} />
              <text x="27" y="28" fill={labelColor} fontSize="12" fontWeight="bold">B</text>
              <circle cx="182" cy="106" r="3" fill={shapeColor} />
              <text x="188" y="112" fill={labelColor} fontSize="12" fontWeight="bold">C</text>
              <circle cx="112" cy="67" r="3.5" fill={markColor} />
              <text x="118" y="62" fill={markColor} fontSize="12" fontWeight="bold">M</text>
            </svg>
          );
        }
        return (
          <svg dir="ltr" viewBox="0 0 220 135" className="w-full max-w-[210px] h-auto">
            {/* Triangle ABC in --fig-shape */}
            <polygon
              points="32,106 188,106 90,32"
              fill="#5B7BC0"
              fillOpacity="0.08"
              stroke={shapeColor}
              strokeWidth="2"
            />
            {/* Median AM from A(90,32) to M(110,106) */}
            <line x1="90" y1="32" x2="110" y2="106" stroke={shapeColor} strokeWidth="2" />
            {/* Equality ticks given (BM = MC = AM) */}
            <line x1="70" y1="101" x2="70" y2="111" stroke={shapeColor} strokeWidth="1.8" />
            <line x1="150" y1="101" x2="150" y2="111" stroke={shapeColor} strokeWidth="1.8" />
            <line x1="95" y1="69" x2="105" y2="69" stroke={shapeColor} strokeWidth="1.8" />
            {/* Demonstrated right angle at A(90,32) in --fig-mark (#F5A54A) */}
            <circle cx="90" cy="32" r="6" fill={markColor} fillOpacity="0.25" stroke={markColor} strokeWidth="1.8" />
            <text x="84" y="21" fill={markColor} fontSize="12" fontWeight="bold">A (90°)</text>
            <text x="18" y="112" fill={labelColor} fontSize="12" fontWeight="bold">B</text>
            <text x="194" y="112" fill={labelColor} fontSize="12" fontWeight="bold">C</text>
            <circle cx="110" cy="106" r="3" fill={shapeColor} />
            <text x="105" y="124" fill={labelColor} fontSize="12" fontWeight="bold">M</text>
          </svg>
        );

      case 'lesson-19':
        // Circumcircle of right triangle ABC (center O midpoint of [BC])
        if (propIndex === 0) {
          return (
            <svg dir="ltr" viewBox="0 0 220 140" className="w-full max-w-[210px] h-auto">
              {/* Right triangle ABC in --fig-shape */}
              <polygon
                points="58,74 162,74 88,28"
                fill="#5B7BC0"
                fillOpacity="0.08"
                stroke={shapeColor}
                strokeWidth="2"
              />
              {/* Demonstrated Circumcircle (C) and radius OA in --fig-mark */}
              <circle
                cx="110"
                cy="74"
                r="52"
                fill="none"
                stroke={markColor}
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line x1="110" y1="74" x2="88" y2="28" stroke={markColor} strokeWidth="2" />
              {/* Equality ticks on OB, OC, OA */}
              <line x1="84" y1="69" x2="84" y2="79" stroke={markColor} strokeWidth="1.8" />
              <line x1="136" y1="69" x2="136" y2="79" stroke={markColor} strokeWidth="1.8" />
              <circle cx="58" cy="74" r="3" fill={shapeColor} />
              <text x="43" y="78" fill={labelColor} fontSize="12" fontWeight="bold">B</text>
              <circle cx="162" cy="74" r="3" fill={shapeColor} />
              <text x="168" y="78" fill={labelColor} fontSize="12" fontWeight="bold">C</text>
              <circle cx="88" cy="28" r="3" fill={shapeColor} />
              <text x="76" y="20" fill={labelColor} fontSize="12" fontWeight="bold">A</text>
              <circle cx="110" cy="74" r="3.5" fill={markColor} />
              <text x="106" y="92" fill={markColor} fontSize="12" fontWeight="bold">O</text>
            </svg>
          );
        }
        return (
          <svg dir="ltr" viewBox="0 0 220 140" className="w-full max-w-[210px] h-auto">
            {/* Given Circle (C) with diameter [BC] in --fig-shape */}
            <circle cx="110" cy="74" r="52" fill="#5B7BC0" fillOpacity="0.06" stroke={shapeColor} strokeWidth="2" />
            <line x1="58" y1="74" x2="162" y2="74" stroke={shapeColor} strokeWidth="2.2" />
            {/* Triangle sides AB, AC and demonstrated right angle at A in --fig-mark */}
            <line x1="58" y1="74" x2="134" y2="28" stroke={markColor} strokeWidth="2.2" />
            <line x1="162" y1="74" x2="134" y2="28" stroke={markColor} strokeWidth="2.2" />
            <circle cx="134" cy="28" r="5" fill={markColor} fillOpacity="0.25" stroke={markColor} strokeWidth="1.8" />
            <text x="128" y="18" fill={markColor} fontSize="12" fontWeight="bold">A (90°)</text>
            <text x="43" y="78" fill={labelColor} fontSize="12" fontWeight="bold">B</text>
            <text x="168" y="78" fill={labelColor} fontSize="12" fontWeight="bold">C</text>
            <circle cx="110" cy="74" r="3" fill={shapeColor} />
            <text x="106" y="91" fill={labelColor} fontSize="12" fontWeight="bold">O</text>
          </svg>
        );

      case 'lesson-20':
        // Pythagorean theorem in right triangle BCA right at A
        if (propIndex === 0) {
          return (
            <svg dir="ltr" viewBox="0 0 220 135" className="w-full max-w-[210px] h-auto">
              {/* Right triangle BCA in --fig-shape */}
              <polygon
                points="46,106 46,28 176,106"
                fill="#5B7BC0"
                fillOpacity="0.08"
                stroke={shapeColor}
                strokeWidth="2"
              />
              <polyline points="46,94 58,94 58,106" fill="none" stroke={shapeColor} strokeWidth="1.6" />
              {/* Demonstrated hypotenuse [BC] in --fig-mark */}
              <line x1="46" y1="28" x2="176" y2="106" stroke={markColor} strokeWidth="2.8" />
              <text x="30" y="112" fill={labelColor} fontSize="12" fontWeight="bold">A</text>
              <text x="30" y="28" fill={labelColor} fontSize="12" fontWeight="bold">B</text>
              <text x="182" y="112" fill={labelColor} fontSize="12" fontWeight="bold">C</text>
              <text x="122" y="60" fill={markColor} fontSize="11" fontWeight="bold">BC² = BA² + CA²</text>
            </svg>
          );
        }
        return (
          <svg dir="ltr" viewBox="0 0 220 135" className="w-full max-w-[210px] h-auto">
            <polygon
              points="46,106 46,28 176,106"
              fill="#5B7BC0"
              fillOpacity="0.08"
              stroke={shapeColor}
              strokeWidth="2"
            />
            <polyline points="46,94 58,94 58,106" fill="none" stroke={shapeColor} strokeWidth="1.6" />
            {/* Demonstrated missing leg [BA] in --fig-mark */}
            <line x1="46" y1="106" x2="46" y2="28" stroke={markColor} strokeWidth="2.8" />
            <text x="30" y="112" fill={labelColor} fontSize="12" fontWeight="bold">A</text>
            <text x="30" y="28" fill={markColor} fontSize="12" fontWeight="bold">B</text>
            <text x="182" y="112" fill={labelColor} fontSize="12" fontWeight="bold">C</text>
            <text x="115" y="64" fill={markColor} fontSize="11" fontWeight="bold">BA² = BC² - CA²</text>
          </svg>
        );

      case 'lesson-21':
        // Converse of Pythagorean theorem (propIndex 0: BC² = AB² + AC² => right at A; propIndex 1: EF² != DE² + DF² => not right)
        if (propIndex === 0) {
          return (
            <svg dir="ltr" viewBox="0 0 220 135" className="w-full max-w-[210px] h-auto">
              {/* Triangle ABC with 3 known sides in --fig-shape */}
              <polygon
                points="34,106 186,106 88,30"
                fill="#5B7BC0"
                fillOpacity="0.08"
                stroke={shapeColor}
                strokeWidth="2"
              />
              {/* Longest side [BC] and demonstrated right angle at A in --fig-mark */}
              <line x1="34" y1="106" x2="186" y2="106" stroke={markColor} strokeWidth="2.6" />
              <circle cx="88" cy="30" r="6" fill={markColor} fillOpacity="0.28" stroke={markColor} strokeWidth="1.8" />
              <text x="88" y="18" fill={markColor} fontSize="11.5" fontWeight="bold" textAnchor="middle">
                A (90°)
              </text>
              <text x="20" y="112" fill={labelColor} fontSize="12" fontWeight="bold">B</text>
              <text x="192" y="112" fill={labelColor} fontSize="12" fontWeight="bold">C</text>
              <text x="46" y="64" fill={shapeColor} fontSize="10" fontWeight="bold">6 cm</text>
              <text x="150" y="64" fill={shapeColor} fontSize="10" fontWeight="bold">8 cm</text>
              <text x="110" y="124" fill={markColor} fontSize="10.5" fontWeight="bold" textAnchor="middle">
                BC = 10 cm (أكبر ضلع)
              </text>
            </svg>
          );
        }
        return (
          <svg dir="ltr" viewBox="0 0 220 135" className="w-full max-w-[210px] h-auto">
            {/* Non-right triangle DEF (5, 6, 8) */}
            <polygon
              points="34,106 186,106 96,42"
              fill="#5B7BC0"
              fillOpacity="0.08"
              stroke={shapeColor}
              strokeWidth="2"
            />
            <line x1="34" y1="106" x2="186" y2="106" stroke={markColor} strokeWidth="2.4" />
            <circle cx="96" cy="42" r="5.5" fill={markColor} fillOpacity="0.22" stroke={markColor} strokeWidth="1.6" />
            <text x="96" y="29" fill={markColor} fontSize="11" fontWeight="bold" textAnchor="middle">
              D (≠ 90°)
            </text>
            <text x="20" y="112" fill={labelColor} fontSize="12" fontWeight="bold">E</text>
            <text x="192" y="112" fill={labelColor} fontSize="12" fontWeight="bold">F</text>
            <text x="52" y="70" fill={shapeColor} fontSize="10" fontWeight="bold">5 cm</text>
            <text x="152" y="70" fill={shapeColor} fontSize="10" fontWeight="bold">6 cm</text>
            <text x="110" y="124" fill={markColor} fontSize="10.5" fontWeight="bold" textAnchor="middle">
              EF² = 64 ≠ 61
            </text>
          </svg>
        );

      case 'lesson-10':
        // Triangle congruence ABC and A'B'C'
        return (
          <svg dir="ltr" viewBox="0 0 220 130" className="w-full max-w-[210px] h-auto">
            <polygon points="18,104 96,104 48,30" fill="#5B7BC0" fillOpacity="0.08" stroke={shapeColor} strokeWidth="2" />
            <polygon points="124,104 202,104 154,30" fill="#F5A54A" fillOpacity="0.1" stroke={markColor} strokeWidth="2" />
            <text x="45" y="22" fill={labelColor} fontSize="11" fontWeight="bold">A</text>
            <text x="10" y="116" fill={labelColor} fontSize="11" fontWeight="bold">B</text>
            <text x="96" y="116" fill={labelColor} fontSize="11" fontWeight="bold">C</text>
            <text x="150" y="22" fill={markColor} fontSize="11" fontWeight="bold">A'</text>
            <text x="116" y="116" fill={markColor} fontSize="11" fontWeight="bold">B'</text>
            <text x="202" y="116" fill={markColor} fontSize="11" fontWeight="bold">C'</text>
          </svg>
        );

      case 'lesson-11':
        // Parallel lines (d) // (d') cut by transversal (Δ)
        return (
          <svg dir="ltr" viewBox="0 0 220 130" className="w-full max-w-[210px] h-auto">
            <line x1="20" y1="42" x2="200" y2="42" stroke={shapeColor} strokeWidth="2.2" />
            <line x1="20" y1="92" x2="200" y2="92" stroke={shapeColor} strokeWidth="2.2" />
            <line x1="145" y1="14" x2="75" y2="118" stroke={markColor} strokeWidth="2" />
            <circle cx="126" cy="42" r="8" fill={markColor} fillOpacity="0.25" />
            <circle cx="93" cy="92" r="8" fill={markColor} fillOpacity="0.25" />
            <text x="25" y="34" fill={shapeColor} fontSize="11" fontWeight="bold">(d)</text>
            <text x="25" y="84" fill={shapeColor} fontSize="11" fontWeight="bold">(d')</text>
            <text x="152" y="24" fill={markColor} fontSize="11" fontWeight="bold">(Δ)</text>
            <text x="134" y="36" fill={labelColor} fontSize="11" fontWeight="bold">A</text>
            <text x="102" y="86" fill={labelColor} fontSize="11" fontWeight="bold">B</text>
          </svg>
        );

      case 'lesson-12':
        // Thales theorem: propIndex 0 = ABC with (MN) // (BC), propIndex 1 = DEF with (IJ) // (EF)
        if (propIndex === 0) {
          return (
            <svg dir="ltr" viewBox="0 0 220 135" className="w-full max-w-[210px] h-auto">
              <polygon points="110,20 36,112 184,112" fill="#5B7BC0" fillOpacity="0.08" stroke={shapeColor} strokeWidth="2" />
              <line x1="65" y1="66" x2="155" y2="66" stroke={markColor} strokeWidth="2.5" />
              <text x="106" y="14" fill={labelColor} fontSize="11" fontWeight="bold">A</text>
              <text x="50" y="68" fill={markColor} fontSize="11" fontWeight="bold">M</text>
              <text x="162" y="68" fill={markColor} fontSize="11" fontWeight="bold">N</text>
              <text x="22" y="116" fill={labelColor} fontSize="11" fontWeight="bold">B</text>
              <text x="190" y="116" fill={labelColor} fontSize="11" fontWeight="bold">C</text>
            </svg>
          );
        }
        return (
          <svg dir="ltr" viewBox="0 0 220 135" className="w-full max-w-[210px] h-auto">
            <polygon points="88,20 34,112 188,112" fill="#5B7BC0" fillOpacity="0.08" stroke={shapeColor} strokeWidth="2" />
            <line x1="66" y1="58" x2="128" y2="58" stroke={markColor} strokeWidth="2.5" />
            <text x="84" y="14" fill={labelColor} fontSize="11" fontWeight="bold">D</text>
            <text x="50" y="60" fill={markColor} fontSize="11" fontWeight="bold">I</text>
            <text x="135" y="60" fill={markColor} fontSize="11" fontWeight="bold">J</text>
            <text x="20" y="116" fill={labelColor} fontSize="11" fontWeight="bold">E</text>
            <text x="194" y="116" fill={labelColor} fontSize="11" fontWeight="bold">F</text>
          </svg>
        );

      default:
        // Algebraic / Numerical schema in --fig-shape (#5B7BC0) and --fig-mark (#F5A54A)
        return (
          <svg dir="ltr" viewBox="0 0 220 115" className="w-full max-w-[210px] h-auto">
            <rect
              x="16"
              y="18"
              width="78"
              height="52"
              rx="8"
              fill="#5B7BC0"
              fillOpacity="0.08"
              stroke={shapeColor}
              strokeWidth="1.8"
            />
            <text x="55" y="48" textAnchor="middle" fill={shapeColor} fontSize="12" fontWeight="bold">
              المعطيات (a, b)
            </text>
            <line x1="98" y1="44" x2="122" y2="44" stroke={markColor} strokeWidth="2.2" />
            <polygon points="124,44 117,40 117,48" fill={markColor} />
            <rect
              x="126"
              y="18"
              width="78"
              height="52"
              rx="8"
              fill="#F5A54A"
              fillOpacity="0.12"
              stroke={markColor}
              strokeWidth="1.8"
            />
            <text x="165" y="48" textAnchor="middle" fill={markColor} fontSize="12" fontWeight="bold">
              النتيجة
            </text>
            <line x1="30" y1="92" x2="190" y2="92" stroke={shapeColor} strokeWidth="1.5" />
            <circle cx="110" cy="92" r="3.5" fill={markColor} />
            <text x="110" y="108" textAnchor="middle" fill={labelColor} fontSize="10" fontWeight="bold">
              0
            </text>
          </svg>
        );
    }
  };

  const defaultCaption = (() => {
    switch (courseId) {
      case 'lesson-18':
        return propIndex === 0
          ? 'المثلث ABC قائم في A و [AM] المتوسط المتعلق بالوتر [BC]'
          : 'المثلث ABC فيه AM = BM = CM = ½ BC إذن هو قائم في A';
      case 'lesson-19':
        return propIndex === 0
          ? 'الدائرة (C) المحيطة بالمثلث القائم ABC مركزها O منتصف الوتر [BC]'
          : 'النقطة A تنتمي إلى الدائرة (C) ذات القطر [BC] إذن المثلث ABC قائم في A';
      case 'lesson-20':
        return propIndex === 0
          ? 'المثلث BCA قائم في A و [BC] هو الوتر المقابل للزاوية القائمة'
          : 'حساب طول الضلع القائم [BA] بمعلومية الوتر [BC] والضلع [CA]';
      case 'lesson-21':
        return propIndex === 0
          ? 'المثلث ABC يحقق BC² = AB² + AC² إذن هو قائم الزاوية في A'
          : 'المثلث DEF فيه EF² ≠ DE² + DF² إذن هو غير قائم الزاوية';
      case 'lesson-10':
        return "تقايس المثلثين ABC و A'B'C' بتقايس العناصر المتماثلة";
      case 'lesson-11':
        return "المستقيمان المتوازيان (d) و (d') والقاطع (Δ) في النقطتين A و B";
      case 'lesson-12':
        return propIndex === 0
          ? 'المثلث ABC والمستقيم (MN) الموازي للضلع (BC)'
          : 'المثلث DEF وتساوي النسبتين DI/DE = DJ/DF يثبت توازي (IJ) و (EF)';
      default:
        return caption || 'تمثيل العلاقة الرياضية بين المعطيات والنتيجة';
    }
  })();

  return (
    <figure className="flex flex-col items-center justify-center p-3 rounded-[12px] bg-[#F6F0EB]/50 border border-[#E5DDD5]">
      {renderSvg()}
      <figcaption className="text-[11px] text-[#4A4A4A]/80 text-center mt-1.5 leading-snug">
        {defaultCaption}
      </figcaption>
    </figure>
  );
};

/**
 * Numbered Property Row (Spec 4 - Propriétés numérotées):
 * Grille 2 colonnes : d'un côté cercle --accent avec numéro + énoncé « Si… alors… »,
 * de l'autre côté la figure associée.
 * Regrouper par type d'information avec un sous-titre gras.
 */
export const NumberedPropertyRow: React.FC<{
  number: number;
  groupSubtitle?: string;
  conditionText?: string;
  statementText: string;
  mathLatex: string;
  courseId: string;
  propIndex: number;
}> = ({
  number,
  groupSubtitle,
  conditionText,
  statementText,
  mathLatex,
  courseId,
  propIndex,
}) => {
  return (
    <div className="py-3 first:pt-0 last:pb-0 space-y-3">
      {groupSubtitle && (
        <h4 className="font-bold text-[#4A4A4A] text-sm sm:text-[15px] mb-2">
          {formatTextWithSuperscripts(groupSubtitle)}
        </h4>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Right column in RTL (7 cols): Circle --accent with number + statement */}
        <div className="md:col-span-7 min-w-0">
          <div className="flex items-start gap-3">
            <span
              className="w-[26px] h-[26px] rounded-full border-2 border-[#C94BA6] text-[#C94BA6] font-bold text-xs flex items-center justify-center shrink-0 mt-1"
              dir="ltr"
            >
              {number}
            </span>
            <div className="flex-1 min-w-0 text-[14.5px] text-[#4A4A4A] leading-[1.9]">
              {conditionText && (
                <div className="font-bold text-[#4A4A4A] mb-1">
                  {formatTextWithSuperscripts(conditionText)}
                </div>
              )}
              <p>{formatTextWithSuperscripts(statementText)}</p>
            </div>
          </div>
        </div>

        {/* Left column in RTL (5 cols): Associated Figure */}
        <div className="md:col-span-5 min-w-0">
          <CanonicalPropertyFigure
            courseId={courseId}
            propIndex={propIndex}
            caption={groupSubtitle}
          />
        </div>
      </div>

      {/* Full-width Formula Box so long formulas (with roots, fractions, implications) never truncate */}
      <div
        className="w-full px-4 py-2.5 rounded-[10px] bg-[#F6F0EB]/60 border border-[#E5DDD5] text-center"
        dir="ltr"
        style={{ unicodeBidi: 'isolate' }}
      >
        <MathView math={mathLatex} block />
      </div>
    </div>
  );
};

/**
 * Interactive Quick Quiz Tab Content (for the "كويز / Quiz" tab in the top bar)
 */
export const CourseQuickQuiz: React.FC<{ course: Course }> = ({ course }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const questions = [
    {
      q: `ما هي العلاقة الرياضية الصحيحة الموافقة لقاعدة درس «${course.title}»؟`,
      options: [
        course.primaryFormula.math,
        course.commonMistakes[0]?.mistakeMath || 'a + b = 0',
        course.commonMistakes[1]?.mistakeMath || 'a - b = 1',
      ],
      correctIdx: 0,
      explanation: course.primaryFormula.note || 'تطبيق مباشر للخاصية الأساسية في الدرس.',
    },
    ...(course.commonMistakes.slice(0, 2).map((m, idx) => ({
      q: `أي الكتابتين التاليتين صحيحة لتفادي الخطأ الشائع (${m.title})؟`,
      options: idx % 2 === 0 ? [m.mistakeMath, m.correctMath] : [m.correctMath, m.mistakeMath],
      correctIdx: idx % 2 === 0 ? 1 : 0,
      explanation: m.whyExplanation,
    })) || []),
  ];

  return (
    <TypedBlock kind="exemple" customLabel="كويز التقييم الذاتي السريع">
      <div className="space-y-5">
        {questions.map((item, qIdx) => {
          const chosen = selectedAnswers[qIdx];
          return (
            <div key={qIdx} className="p-4 rounded-[12px] bg-[#F6F0EB]/60 border border-[#E5DDD5] space-y-3">
              <div className="font-bold text-[#4A4A4A] text-sm flex items-start gap-2">
                <span
                  className="w-6 h-6 rounded-full border-2 border-[#C94BA6] text-[#C94BA6] text-xs flex items-center justify-center shrink-0 mt-0.5"
                  dir="ltr"
                >
                  {qIdx + 1}
                </span>
                <span>{formatTextWithSuperscripts(item.q, false)}</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {item.options.map((optLatex, oIdx) => {
                  const isSelected = chosen === oIdx;
                  const isCorrect = oIdx === item.correctIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [qIdx]: oIdx,
                        }))
                      }
                      className={`w-full p-2.5 rounded-[10px] border text-center transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#C94BA6] bg-[#C94BA6]/10 font-bold'
                          : 'border-[#E5DDD5] bg-white hover:border-[#C94BA6]/50'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#C94BA6]" dir="ltr">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <div className="flex-1 overflow-x-auto" dir="ltr">
                        <MathView math={optLatex} />
                      </div>
                      {showResults && isSelected && (
                        <span className="text-xs font-bold text-[#C94BA6]">
                          {isCorrect ? '✓ صحيح' : '✗ راجع القاعدة'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {showResults && chosen !== undefined && (
                <p className="text-xs text-[#4A4A4A]/85 pt-2 border-t border-[#E5DDD5]">
                  <strong>التعليل : </strong>
                  {formatTextWithSuperscripts(item.explanation)}
                </p>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => setShowResults(true)}
          className="px-5 py-2 rounded-[12px] bg-[#C94BA6] text-white text-xs font-bold cursor-pointer hover:opacity-90 transition-opacity"
        >
          تحقق من الإجابات
        </button>
      </div>
    </TypedBlock>
  );
};

/**
 * RÈGLE 2 — Un seul bloc de résumé par cours, sous forme de schéma / arbre de décision (Section 6) :
 * Remplace tout texte récapitulatif et toute liste "À retenir" par un arbre de décision visuel unique.
 */
export const CourseDecisionTree: React.FC<{
  course: Course;
  propertiesList: {
    groupSubtitle?: string;
    conditionText?: string;
    statementText: string;
    mathLatex: string;
  }[];
}> = ({ course, propertiesList }) => {
  const prop1 = propertiesList[0];
  const prop2 = propertiesList[1];

  const DECISION_QUESTIONS: Record<string, string> = {
    'lesson-01': 'ما هي علاقة الإشارتين بين العددين النسبيين المراد جمعهما؟',
    'lesson-02': 'ما هي علاقة الإشارتين بين العددين في عملية الضرب أو القسمة؟',
    'lesson-03': 'هل نبحث عن معاكس العدد أم عن مقلوبه؟',
    'lesson-04': 'ما هي العملية المطلوبة بين الكسرين؟',
    'lesson-05': 'هل للكسرين نفس المقام أم مقامان مختلفان؟',
    'lesson-06': 'هل المقامان موحدان قبل الجمع أو الطرح؟',
    'lesson-07': 'ما هي إشارتا البسط والمقام في العدد الناطق a/b؟',
    'lesson-08': 'كيف نجمع أو نطرح عددين ناطقين بمقامين مختلفين؟',
    'lesson-09': 'هل العملية بين العددين الناطقين ضرب أم قسمة؟',
    'lesson-10': 'ما هي العناصر الثلاثة المتقايسة المعطاة في المثلثين؟',
    'lesson-11': 'هل التوازي معطى لحساب الزوايا أم نبحث عن إثبات التوازي؟',
    'lesson-12': 'في مثلث يقطعه مستقيم : هل التوازي معطى أم مطلوب إثباته؟',
    'lesson-13': 'هل أس قوة العدد 10 موجب (10ⁿ) أم سالب (10⁻ⁿ)؟',
    'lesson-14': 'ما هي العملية الجارية على قوى العدد 10؟',
    'lesson-15': 'كيف نحول عدداً عشرياً إلى كتابة علمية a × 10ⁿ (مع 1 ≤ a < 10)؟',
    'lesson-16': 'في قوة عدد سالب (-a)ⁿ : هل الأس n زوجي أم فردي؟',
    'lesson-17': 'ما هو ترتيب الأولوية في سلسلة عمليات تتضمن قوى وأقواساً؟',
    'lesson-18': 'ما هو المعطى في المسألة حول المثلث والمتوسط المتعلق بالضلع الأكبر؟',
    'lesson-19': 'هل المثلث قائم في المعطيات أم مرسوم في دائرة أحد أضلاعه قطر لها؟',
    'lesson-20': 'في مثلث قائم معلوم فيه ضلعان : ما هو الضلع المجهول المراد حسابه؟',
    'lesson-21': 'الأضلاع الثلاثة معلومة (أكبرها BC) : قارن BC² مع AB² + AC²',
  };

  const questionText =
    DECISION_QUESTIONS[course.id] ||
    course.mindmap?.question ||
    'ما هي طبيعة المعطيات والمطلوب في السؤال؟';

  const leftBranch = {
    condition:
      prop1?.conditionText ||
      course.summaryRules?.[0]?.title ||
      'الحالة الأولى (تطبيق مباشر)',
    action: prop1?.groupSubtitle || course.summaryRules?.[0]?.badgeText || 'الخاصية المباشرة',
    math: prop1?.mathLatex || course.primaryFormula.math,
  };

  const rightBranch = {
    condition:
      prop2?.conditionText ||
      course.summaryRules?.[1]?.title ||
      'الحالة الثانية (الخاصية العكسية / المكملة)',
    action: prop2?.groupSubtitle || course.summaryRules?.[1]?.badgeText || 'الخاصية العكسية',
    math:
      prop2?.mathLatex ||
      course.secondaryFormulas?.[0]?.math ||
      course.summaryRules?.[1]?.math ||
      course.primaryFormula.math,
  };

  return (
    <div
      dir="rtl"
      className="rounded-[16px] border border-[#E5DDD5] bg-[#F6F0EB]/45 p-4 sm:p-6 space-y-3"
    >
      {/* Nœud racine : Question de décision */}
      <div className="max-w-md mx-auto bg-[#FFFFFF] border-2 border-[#C94BA6] rounded-[12px] px-4 py-2.5 text-center shadow-2xs">
        <div className="text-[11px] font-bold text-[#C94BA6] mb-0.5">سؤال التوجيه والاختيار</div>
        <div className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
          {formatTextWithSuperscripts(questionText, false)}
        </div>
      </div>

      {/* Flèches de bifurcation SVG */}
      <div className="flex justify-center">
        <svg dir="ltr" viewBox="0 0 320 34" className="w-64 h-8 overflow-visible">
          <path
            d="M 160,0 L 160,12 L 65,12 L 65,28"
            fill="none"
            stroke="#C94BA6"
            strokeWidth="2"
          />
          <polygon points="65,33 60,25 70,25" fill="#C94BA6" />
          <path
            d="M 160,0 L 160,12 L 255,12 L 255,28"
            fill="none"
            stroke="#C94BA6"
            strokeWidth="2"
          />
          <polygon points="255,33 250,25 260,25" fill="#C94BA6" />
        </svg>
      </div>

      {/* Deux branches de décision */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Branche 1 (Droite en RTL — Propriété directe) */}
        <div className="bg-[#FFFFFF] rounded-[12px] border-t-4 border-t-[#5B7BC0] border border-[#E5DDD5] p-3.5 flex flex-col justify-between space-y-2.5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B7BC0]">
              <span
                className="w-5 h-5 rounded-full border border-[#5B7BC0] flex items-center justify-center text-[11px]"
                dir="ltr"
              >
                1
              </span>
              <span>{formatTextWithSuperscripts(leftBranch.action, false)}</span>
            </div>
            <p className="text-xs text-[#4A4A4A] leading-[1.75]">
              {formatTextWithSuperscripts(leftBranch.condition, false)}
            </p>
          </div>

          <div
            className="w-full px-2.5 py-1.5 rounded-[8px] bg-[#F6F0EB]/70 border border-[#E5DDD5] text-center text-xs"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            <MathView math={leftBranch.math} block />
          </div>
        </div>

        {/* Branche 2 (Gauche en RTL — Propriété réciproque / Cas 2) */}
        <div className="bg-[#FFFFFF] rounded-[12px] border-t-4 border-t-[#F5A54A] border border-[#E5DDD5] p-3.5 flex flex-col justify-between space-y-2.5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5A54A]">
              <span
                className="w-5 h-5 rounded-full border border-[#F5A54A] flex items-center justify-center text-[11px]"
                dir="ltr"
              >
                2
              </span>
              <span>{formatTextWithSuperscripts(rightBranch.action, false)}</span>
            </div>
            <p className="text-xs text-[#4A4A4A] leading-[1.75]">
              {formatTextWithSuperscripts(rightBranch.condition, false)}
            </p>
          </div>

          <div
            className="w-full px-2.5 py-1.5 rounded-[8px] bg-[#F6F0EB]/70 border border-[#E5DDD5] text-center text-xs"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            <MathView math={rightBranch.math} block />
          </div>
        </div>
      </div>
    </div>
  );
};
