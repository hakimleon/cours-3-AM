import React, { useState } from 'react';
import { getPropertiesForCourse } from '../data/geometryTreatisePart2';
import {
  GeometryPropertyItem,
  TreatiseStep,
  TreatiseLanguageMode,
} from '../data/geometryTreatiseTypes';
import { GeometryTreatiseDiagram } from './GeometryTreatiseDiagram';
import { Compass, ExternalLink, Copy, Check, Languages, ArrowUpRight } from 'lucide-react';
import { formatTextWithSuperscripts } from './MathView';

export interface CourseSectionPropertyItem {
  groupSubtitle?: string;
  conditionText?: string;
  statementText: string;
  mathLatex: string;
}

interface CourseGeometryTreatiseLinksProps {
  courseId: string;
  courseTitle: string;
  courseProperties?: CourseSectionPropertyItem[];
  onOpenTreatise: (propertyId?: number) => void;
}

/**
 * Normalise une formule mathématique (LaTeX ou texte) en une signature structurelle
 * indépendante du nom des points, des segments ou des droites :
 * - \frac{AM}{AB}, EF / EH, DI/DE  ──►  LEN/LEN
 * - (MN) // (BC), (IJ) \parallel (EF), (HK) // (GF), (vt) // (uy)  ──►  LINE//LINE
 * - (AB) ⊥ (AC), (d1) \perp (d2)  ──►  LINE⊥LINE
 * - BC² = BA² + AC², BC^2 = AB^2 + AC^2  ──►  LEN^2=LEN^2+LEN^2
 * - AM = BC ÷ 2, AM = \frac{1}{2}BC, IJ = AB ÷ 2  ──►  LEN=LEN/2
 */
export function normalizeFormulaStructure(raw: string): string {
  if (!raw) return '';
  let s = raw
    // Fractions LaTeX \frac{1}{2}BC -> BC/2
    .replace(/\\frac\{1\}\{2\}\s*([A-Z]{2})/g, '$1/2')
    .replace(/½\s*([A-Z]{2})/g, '$1/2')
    // Fractions LaTeX de longueurs \frac{AM}{AB} -> AM/AB
    .replace(/\\frac\{\s*([A-Z]{2})\s*\}\{\s*([A-Z]{2})\s*\}/g, '$1/$2')
    // Opérateurs de parallélisme et perpendicularité
    .replace(/\\parallel/g, '//')
    .replace(/\\perp/g, '⊥')
    .replace(/\\implies|\\iff|⟹|⟺/g, '=>')
    // Exposants carrés
    .replace(/\^2|\^\{2\}|²/g, '^2')
    // Division par 2
    .replace(/÷\s*2/g, '/2')
    // Droites entre parenthèses : (MN), (BC), (HK), (GF), (vt), (uy), (d1), (d') -> LINE
    .replace(/\([A-Za-z0-9'Δ]+\)/g, 'LINE')
    // Angles LaTeX \widehat{A_1} ou 3 lettres xAz, vGw, zEy -> ANG
    .replace(/\\widehat\{[^}]+\}/g, 'ANG')
    .replace(/\b[a-z][A-Z][a-z]\b/g, 'ANG')
    // Longueurs de segments à 2 lettres majuscules (AB, AM, EF, EH, DI, DE, etc.) -> LEN
    .replace(/\b[A-Z]{2}'?\b/g, 'LEN')
    // Nettoyage des espaces
    .replace(/\s+/g, '');

  return s;
}

type FormulaArchetype =
  | 'THALES_DIRECT_3_RATIOS'
  | 'THALES_CONVERSE_2_RATIOS'
  | 'MIDPOINT_LINE_PARALLEL'
  | 'MIDPOINT_LINE_HALF_LENGTH'
  | 'MIDPOINT_LINE_CONVERSE'
  | 'PYTHAGORAS_DIRECT_SQUARES'
  | 'PYTHAGORAS_CONVERSE_SQUARES'
  | 'RIGHT_MEDIAN_DIRECT_HALF'
  | 'RIGHT_MEDIAN_CONVERSE_HALF'
  | 'RIGHT_CIRCUMCIRCLE_DIRECT'
  | 'RIGHT_CIRCUMCIRCLE_CONVERSE'
  | 'PARALLEL_ALT_INT_ANGLES'
  | 'PARALLEL_CORR_ANGLES'
  | 'VERTICALLY_OPPOSITE_ANGLES';

/**
 * Extrait l'archétype mathématique d'une propriété de l'annexe (indépendamment des lettres choisies)
 * en analysant la structure de ses hypothèses et de sa formule de conclusion.
 */
function getAnnexPropertyArchetype(prop: GeometryPropertyItem): FormulaArchetype | null {
  const fullText = `${prop.hypothesesAr.join(' ')} ${prop.statementAr} ${prop.conclusionAr}`;
  const normConclusion = normalizeFormulaStructure(prop.conclusionAr);
  const normStatement = normalizeFormulaStructure(prop.statementAr);
  const normHyp = normalizeFormulaStructure(prop.hypothesesAr.join(' '));

  // 1. Thalès direct : 3 rapports égaux de longueurs (LEN/LEN=LEN/LEN=LEN/LEN)
  // Ex: #50 (EF/EH = EG/EK = GF/HK ou AB/AM = AC/AN = BC/MN)
  if (
    normConclusion.includes('LEN/LEN=LEN/LEN=LEN/LEN') ||
    normStatement.includes('LEN/LEN=LEN/LEN=LEN/LEN')
  ) {
    return 'THALES_DIRECT_3_RATIOS';
  }

  // 2. Réciproque de Thalès : égalité de 2 rapports (LEN/LEN=LEN/LEN) en hypothèse => parallélisme (LINE//LINE)
  // Ex: #14 (AM/AB = AN/AC => (MN)//(BC))
  if (
    (normHyp.includes('LEN/LEN=LEN/LEN') || normStatement.includes('LEN/LEN=LEN/LEN')) &&
    normConclusion.includes('LINE//LINE')
  ) {
    return 'THALES_CONVERSE_2_RATIOS';
  }

  // 3. Droite des milieux (structure distincte : milieu / rapport fixe 1/2)
  // Ex: #12 (2 milieux => parallèle), #49 (2 milieux => IJ = AB/2), #6 (1 milieu + parallèle => 2e milieu)
  if (fullText.includes('مستقيم المنتصفين') || (fullText.includes('منتصف') && !fullText.includes('الوتر'))) {
    if (normConclusion.includes('LEN=LEN/2')) return 'MIDPOINT_LINE_HALF_LENGTH';
    if (normConclusion.includes('LINE//LINE')) return 'MIDPOINT_LINE_PARALLEL';
    return 'MIDPOINT_LINE_CONVERSE';
  }

  // 4. Pythagore direct vs réciproque : structure LEN^2=LEN^2+LEN^2
  if (normConclusion.includes('LEN^2=LEN^2+LEN^2')) {
    return 'PYTHAGORAS_DIRECT_SQUARES';
  }
  if (
    normHyp.includes('LEN^2=LEN^2+LEN^2') &&
    (fullText.includes('قائم') || normConclusion.includes('LINE⊥LINE'))
  ) {
    return 'PYTHAGORAS_CONVERSE_SQUARES';
  }

  // 5. Médiane relative à l'hypoténuse : direct vs réciproque (structure LEN=LEN/2 avec الوتر / المتوسط)
  if (fullText.includes('المتوسط') && normConclusion.includes('LEN=LEN/2')) {
    return 'RIGHT_MEDIAN_DIRECT_HALF';
  }
  if (
    fullText.includes('المتوسط') &&
    normHyp.includes('LEN=LEN/2') &&
    (fullText.includes('قائم') || normConclusion.includes('LINE⊥LINE'))
  ) {
    return 'RIGHT_MEDIAN_CONVERSE_HALF';
  }

  // 6. Cercle circonscrit au triangle rectangle : direct (#5) vs réciproque (#22)
  if (fullText.includes('الدائرة المحيطة بالمثلث القائم') && fullText.includes('منتصف الوتر')) {
    return 'RIGHT_CIRCUMCIRCLE_DIRECT';
  }
  if (
    (fullText.includes('قطراً للدائرة') || fullText.includes('قطرها')) &&
    ( prop.conclusionAr.includes('قائم') || normConclusion.includes('LINE⊥LINE') )
  ) {
    return 'RIGHT_CIRCUMCIRCLE_CONVERSE';
  }

  // 7. Angles et parallélisme : alternes-internes (#9), correspondants (#10), opposés par le sommet (#59)
  if (fullText.includes('متبادلتان داخلياً') && normConclusion.includes('LINE//LINE')) {
    return 'PARALLEL_ALT_INT_ANGLES';
  }
  if (fullText.includes('متماثلتان') && normConclusion.includes('LINE//LINE')) {
    return 'PARALLEL_CORR_ANGLES';
  }
  if (fullText.includes('متقابلتان بالرأس') && normConclusion.includes('ANG=ANG')) {
    return 'VERTICALLY_OPPOSITE_ANGLES';
  }

  return null;
}

/**
 * Extrait les archétypes mathématiques démontrés dans chacune des sections 1 et 2 du cours,
 * à partir de leurs formules (indépendamment des lettres A, B, C, M, N ou D, E, F, I, J).
 */
function getCourseSectionArchetypes(
  courseId: string,
  sectionProp: CourseSectionPropertyItem,
  sectionIndex: number
): FormulaArchetype[] {
  const archetypes: FormulaArchetype[] = [];
  const normMath = normalizeFormulaStructure(sectionProp.mathLatex);
  const fullSectionText = `${sectionProp.groupSubtitle || ''} ${sectionProp.conditionText || ''} ${sectionProp.statementText}`;

  // Détection par structure de formule normalisée (indépendante des lettres)
  if (normMath.includes('LEN/LEN=LEN/LEN=LEN/LEN')) {
    archetypes.push('THALES_DIRECT_3_RATIOS');
  }
  if (normMath.includes('LEN/LEN=LEN/LEN=>LINE//LINE')) {
    archetypes.push('THALES_CONVERSE_2_RATIOS');
  }
  if (normMath.includes('LEN^2=LEN^2+LEN^2')) {
    if (courseId === 'lesson-21' && sectionIndex === 0) {
      archetypes.push('PYTHAGORAS_CONVERSE_SQUARES');
    } else {
      archetypes.push('PYTHAGORAS_DIRECT_SQUARES');
    }
  }
  if (courseId === 'lesson-21' && sectionIndex >= 1) {
    // La Section 2 du Cours 21 couvre aussi le lien avec Pythagore direct et la contraposée
    archetypes.push('PYTHAGORAS_DIRECT_SQUARES');
  }
  if (normMath.includes('LEN=LEN/2') || normMath.includes('LEN/2=LEN')) {
    if (fullSectionText.includes('المتوسط') || courseId === 'lesson-18') {
      if (sectionIndex === 0) {
        archetypes.push('RIGHT_MEDIAN_DIRECT_HALF');
      } else {
        archetypes.push('RIGHT_MEDIAN_CONVERSE_HALF');
      }
    }
    if (fullSectionText.includes('الدائرة') || courseId === 'lesson-19') {
      if (sectionIndex === 0) {
        archetypes.push('RIGHT_CIRCUMCIRCLE_DIRECT');
      }
    }
  }
  if (
    courseId === 'lesson-19' &&
    sectionIndex >= 1 &&
    (fullSectionText.includes('قطر') || normMath.includes('90'))
  ) {
    archetypes.push('RIGHT_CIRCUMCIRCLE_CONVERSE');
  }
  if (
    courseId === 'lesson-11' &&
    normMath.includes('LINE//LINE') &&
    normMath.includes('ANG=ANG')
  ) {
    archetypes.push(
      'PARALLEL_ALT_INT_ANGLES',
      'PARALLEL_CORR_ANGLES',
      'VERTICALLY_OPPOSITE_ANGLES'
    );
  }

  return archetypes;
}

export interface AnnexDuplicateMatch {
  sectionNumber: 1 | 2;
  sectionAnchor: '#sec-concept' | '#sec-property';
  sectionRefLabel: string;
  courseFormulaLatex: string;
  lettersRenamedNote?: string;
}

/**
 * RÈGLE 4 (CORRIGÉE) — Vérification systématique par la structure de la formule :
 * Pour chaque carte de l'annexe :
 * "Cette formule, une fois les lettres remplacées par celles du cours, est-elle déjà apparue
 * dans les sections 1 ou 2 ?"
 * → Oui : renvoi court ("انظر القسم X"), quel que soit son numéro dans la banque des 69 propriétés
 *         (ex. dans le Cours 12 : خاصية 50 ET خاصية 14 deviennent toutes deux des renvois courts,
 *         tandis que les propriétés 6, 12, 49 sur la droite des milieux ont une structure
 *         mathématique différente — rapport fixe 1/2 — et sont développées en pleine carte).
 * → Non : carte complète.
 */
export function matchAnnexPropertyToCourseBody(
  prop: GeometryPropertyItem,
  courseId: string,
  courseProperties: CourseSectionPropertyItem[]
): AnnexDuplicateMatch | null {
  const propArchetype = getAnnexPropertyArchetype(prop);
  if (!propArchetype) return null;

  for (let idx = 0; idx < courseProperties.length; idx++) {
    const secProp = courseProperties[idx];
    const secArchetypes = getCourseSectionArchetypes(courseId, secProp, idx);

    if (secArchetypes.includes(propArchetype)) {
      const sectionNumber: 1 | 2 = idx === 0 ? 1 : 2;
      const sectionAnchor = idx === 0 ? '#sec-concept' : '#sec-property';
      const propNumInCourse = idx + 1;

      // Vérifier si les lettres des points ont changé entre l'annexe et le cours
      const extractPointLetters = (str: string) =>
        Array.from(new Set((str.match(/\b[A-Z]{2}\b/g) || []).join('').split('')))
          .sort()
          .join('');
      const annexLetters = extractPointLetters(`${prop.conclusionAr} ${prop.hypothesesAr.join(' ')}`);
      const courseLetters = extractPointLetters(
        `${secProp.mathLatex} ${secProp.conditionText || ''} ${secProp.statementText}`
      );
      const hasRenamedPoints =
        Boolean(annexLetters && courseLetters) && annexLetters !== courseLetters;

      return {
        sectionNumber,
        sectionAnchor,
        sectionRefLabel: `انظر القسم ${sectionNumber}، الخاصية ${propNumInCourse} (${prop.titleAr})`,
        courseFormulaLatex: secProp.mathLatex,
        lettersRenamedNote: hasRenamedPoints
          ? `نفس البنية الرياضية لفرع القسم ${sectionNumber} بتغيير تسمية النقط (${prop.conclusionAr})`
          : `نفس الصيغة الرياضية المبرهنة في القسم ${sectionNumber} (${prop.conclusionAr})`,
      };
    }
  }

  return null;
}

export const CourseGeometryTreatiseLinks: React.FC<CourseGeometryTreatiseLinksProps> = ({
  courseId,
  courseTitle,
  courseProperties = [],
  onOpenTreatise,
}) => {
  const linkedProperties = getPropertiesForCourse(courseId);
  const [stepsMap, setStepsMap] = useState<Record<number, TreatiseStep>>({});
  const [lang, setLang] = useState<TreatiseLanguageMode>('ar');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (linkedProperties.length === 0) return null;

  // Appliquer la vérification structurelle de formule à CHACUNE des propriétés liées (sans s'arrêter au 1er doublon)
  const matchesByPropId: Record<number, AnnexDuplicateMatch> = {};
  for (const prop of linkedProperties) {
    const match = matchAnnexPropertyToCourseBody(prop, courseId, courseProperties);
    if (match) {
      matchesByPropId[prop.id] = match;
    }
  }

  // 1. Tous les doublons de structure de formule (même avec lettres de points différentes) -> Renvoi court
  const alreadyCoveredProps = linkedProperties.filter((p) => Boolean(matchesByPropId[p.id]));
  // 2. Seules les propriétés dont la structure mathématique est absente des Sections 1-2 -> Carte complète
  const complementaryNewProps = linkedProperties.filter((p) => !matchesByPropId[p.id]);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section
      id="sec-treatise-links"
      className="my-6 rounded-[16px] border border-[#EAE2DA] bg-[#FFFFFF] p-5 sm:p-6 space-y-4"
      dir="rtl"
    >
      {/* En-tête de l'annexe */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5DDD5] pb-3.5">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 text-[#C94BA6] text-xs font-bold">
            <Compass className="w-4 h-4" />
            <span>إحالات مرجعية ومكملات من دليل البرهان (69 خاصية)</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            الخواص المرتبطة بدرس «{courseTitle}» (دون تكرار الصيغ المبرهنة في القسمين 1 و2)
          </h3>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {complementaryNewProps.length > 0 && (
            <div className="no-pdf flex items-center gap-1 bg-[#F6F0EB] p-1 rounded-[10px] border border-[#E2D9D0] text-[11px] font-bold">
              <Languages className="w-3.5 h-3.5 text-[#C94BA6] mr-1" />
              {(['ar', 'bilingual', 'fr'] as TreatiseLanguageMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLang(mode)}
                  className={`px-2 py-0.5 rounded-[6px] cursor-pointer ${
                    lang === mode ? 'bg-[#C94BA6] text-white' : 'text-[#4A4A4A]'
                  }`}
                >
                  {mode === 'ar' ? 'عربي' : mode === 'bilingual' ? 'AR+FR' : 'FR'}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => onOpenTreatise(linkedProperties[0]?.id)}
            className="no-pdf px-3 py-1.5 rounded-[10px] bg-[#C94BA6] hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 transition-opacity cursor-pointer"
          >
            <span>فتح الدليل الكامل (69)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. RENVOIS COURTS pour TOUTES les propriétés dont la structure de formule figure déjà en Section 1 ou 2 (même si les lettres changent) */}
      {alreadyCoveredProps.length > 0 && (
        <div className="bg-[#F6F0EB]/55 rounded-[12px] p-3.5 border border-[#E5DDD5] space-y-2">
          <div className="text-xs font-bold text-[#8C8C8C]">
            خواص مطابقة في بنيتها الرياضية لما ورد في القسمين 1 و2 (إحالة مختصرة دون إعادة البطاقة) :
          </div>
          <ul className="space-y-2 text-xs sm:text-sm">
            {alreadyCoveredProps.map((prop) => {
              const refInfo = matchesByPropId[prop.id];
              return (
                <li
                  key={prop.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-1.5 border-b last:border-b-0 border-[#E5DDD5]/70"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[#4A4A4A]">
                    <span
                      className="w-5 h-5 rounded-full border border-[#C94BA6] text-[#C94BA6] font-bold text-[11px] flex items-center justify-center shrink-0"
                      dir="ltr"
                    >
                      {prop.id}
                    </span>
                    <span className="font-semibold">خاصية {prop.id} :</span>
                    <a
                      href={refInfo.sectionAnchor}
                      className="text-[#C94BA6] font-bold hover:underline"
                    >
                      {refInfo.sectionRefLabel}
                    </a>
                    {refInfo.lettersRenamedNote && (
                      <span className="text-[11px] text-[#8C8C8C]">
                        — {formatTextWithSuperscripts(refInfo.lettersRenamedNote)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenTreatise(prop.id)}
                    className="no-pdf text-[11px] font-bold text-[#C94BA6] hover:underline inline-flex items-center gap-0.5 cursor-pointer shrink-0"
                  >
                    <span>بطاقة المرجع #{prop.id}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 2. CARTES COMPLÈTES UNIQUEMENT pour les propriétés dont la structure mathématique est absente du corps du cours */}
      {complementaryNewProps.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="text-xs font-bold text-[#C94BA6]">
            خواص إضافية ذات بنية رياضية مكملة غير واردة في القسمين 1 و2 (مثل مستقيم المنتصفين بنسبة ½) :
          </div>

          <div className="space-y-3">
            {complementaryNewProps.map((prop) => {
              const currentStep = stepsMap[prop.id] || 4;
              return (
                <div
                  key={prop.id}
                  className="bg-white rounded-[12px] border border-[#E5DDD5] overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[#E5DDD5]"
                >
                  {/* Right: Property statement */}
                  <div className="lg:col-span-4 p-3.5 bg-[#F6F0EB]/40 flex flex-col justify-between space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C94BA6]">
                          <span
                            className="w-5 h-5 rounded-full border-2 border-[#C94BA6] flex items-center justify-center text-[11px]"
                            dir="ltr"
                          >
                            {prop.id}
                          </span>
                          <span>خاصية مكملة — {prop.titleAr}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenTreatise(prop.id)}
                          className="no-pdf text-[11px] font-bold text-[#C94BA6] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>في المرجع</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>

                      {(lang === 'ar' || lang === 'bilingual') && (
                        <p className="text-xs sm:text-[13px] font-bold text-[#4A4A4A] leading-[1.75]">
                          {formatTextWithSuperscripts(prop.statementAr)}
                        </p>
                      )}

                      {(lang === 'fr' || lang === 'bilingual') && (
                        <p dir="ltr" className="text-xs text-[#4A4A4A]/80 leading-relaxed text-left">
                          {prop.statementFr}
                        </p>
                      )}
                    </div>

                    <div className="text-[11px] text-[#4A4A4A] bg-white px-2.5 py-1.5 rounded-[8px] border border-[#E5DDD5]">
                      <strong>المعطيات :</strong>{' '}
                      {formatTextWithSuperscripts(prop.hypothesesAr.join(' · '))}
                    </div>
                  </div>

                  {/* Center: Interactive 4-step SVG diagram */}
                  <div className="lg:col-span-4 p-2.5 flex items-center justify-center bg-white">
                    <GeometryTreatiseDiagram
                      propertyId={prop.id}
                      step={currentStep}
                      onStepChange={(s) => setStepsMap((prev) => ({ ...prev, [prop.id]: s }))}
                      showStepControls={true}
                      lang={lang}
                      captionAr={prop.figureCaptionAr}
                      captionFr={prop.figureCaptionFr}
                    />
                  </div>

                  {/* Left: Official Proof Template */}
                  <div className="lg:col-span-4 p-3.5 flex flex-col justify-between space-y-2 bg-white">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#C94BA6]">
                          نموذج التحرير الرسمي للبرهان
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(prop.id, prop.proofTemplateAr)}
                          className="no-pdf text-[11px] text-[#4A4A4A] hover:text-[#C94BA6] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === prop.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#C94BA6]" />
                              <span>تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>نسخ</span>
                            </>
                          )}
                        </button>
                      </div>

                      {(lang === 'ar' || lang === 'bilingual') && (
                        <div className="p-2.5 rounded-[8px] bg-[#F6F0EB]/60 border border-[#E5DDD5] text-xs text-[#4A4A4A] leading-[1.75]">
                          {formatTextWithSuperscripts(prop.proofTemplateAr)}
                        </div>
                      )}

                      {(lang === 'fr' || lang === 'bilingual') && (
                        <div
                          dir="ltr"
                          className="p-2 rounded-[8px] bg-[#F6F0EB]/35 border border-[#E5DDD5] text-[11px] text-[#4A4A4A]/85 leading-relaxed text-left"
                        >
                          {prop.proofTemplateFr}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#E5DDD5]">
                      <span className="text-[#8C8C8C]">النتيجة :</span>
                      <span className="font-bold text-[#C94BA6]">
                        {formatTextWithSuperscripts(prop.conclusionAr)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
