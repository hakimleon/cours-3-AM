export type SvtDomainId =
  | 'internal-geodynamics' // المقطع 1: الديناميكية الداخلية للكرة الأرضية
  | 'external-geodynamics' // المقطع 2: الديناميكية الخارجية للكرة الأرضية
  | 'natural-resources'    // المقطع 3: استغلال الموارد الطبيعية الباطنية
  | 'soil-protection'      // المقطع 4: التربة ثروة طبيعية هشة
  | 'general';

export interface SvtTrilingualTerm {
  arabic: string;
  french: string;
  english?: string;
  explanation?: string;
}

export interface SvtDefinitionItem {
  id?: string;
  titleArabic: string;
  titleFrench?: string;
  contentArabic: string;
  contentFrench?: string;
  examples?: string[];
  note?: string;
}

export interface SvtObservationItem {
  id?: string;
  title: string;
  description: string;
  scientificHighlight?: string;
  documentSource?: string;
}

export interface SvtInvestigationItem {
  id?: string;
  number?: string;
  titleArabic: string;
  titleFrench?: string;
  objective?: string;
  materialsOrDocuments?: string[];
  protocolSteps: string[];
  observations: string[];
  interpretation: string[];
  conclusion?: string;
  schemaType?: SvtSchemaOrFigure['type'];
  schemaCaption?: string;
}

export interface SvtSchemaOrFigure {
  id: string;
  titleArabic: string;
  titleFrench?: string;
  type:
    | 'seismic-focus-epicenter'
    | 'seismic-foyer-epicenter'
    | 'seismogram-waves'
    | 'seismic-intensity-scale'
    | 'seismic-summary-mechanism'
    | 'tectonic-plates'
    | 'subduction-zone'
    | 'rift-ridge'
    | 'volcano-mechanism'
    | 'strata-fold-fault'
    | 'custom-svg'
    | 'custom-image';
  imageSrc?: string;
  caption?: string;
  annotations?: {
    labelArabic: string;
    labelFrench?: string;
    detail?: string;
  }[];
}

export interface SvtIllustrationItem {
  id: string;
  titleArabic: string;
  titleFrench?: string;
  targetSectionId?: string;
  imageSrc?: string;
  schemaType?: SvtSchemaOrFigure['type'];
  alt: string;
  captionArabic: string;
  captionFrench?: string;
  pedagogicalRole: string; // e.g. 'تبيان العلاقة بين البؤرة، المركز السطحي، والموجات الزلزالية'
  courseBadge?: string;
}

export interface SvtTableItem {
  id?: string;
  titleArabic: string;
  titleFrench?: string;
  subtitle?: string;
  headers: string[];
  rows: string[][];
  footerNote?: string;
}

export interface SvtDiscoveryActivity {
  id: string;
  titleArabic: string;
  titleFrench?: string;
  /** Temps 1 : Situation concrète basée sur un fait réel ou géologique */
  situationConcrete: string;
  situationsReelles?: string[];
  observationTable?: SvtTableItem;
  schema?: SvtSchemaOrFigure;
  illustration?: SvtIllustrationItem;
  /** Temps 2 : Questions guidées d'exploration */
  guidedQuestions?: string[];
  hint?: string;
  conclusion?: string;
  /** Corrigé affiché */
  correction?: {
    questionAnswers: string[];
    conclusion?: string;
  };
}

export interface SvtCourseEssentialItem {
  id?: string;
  number?: number;
  title?: string;
  titleArabic?: string;
  titleFrench?: string;
  icon?: 'mountain' | 'activity' | 'globe' | 'shield' | 'layers' | 'eye' | 'info';
  definition?: string;
  description?: string;
  example?: string;
}

export interface SvtCourseEssential {
  title?: string;
  titleArabic?: string; // Défaut: 'أحتفظ بالأهم'
  titleFrench?: string; // Défaut: "L'essentiel"
  badgeArabic?: string; // Défaut: 'المفاهيم المحورية للدرس'
  subtitleArabic?: string;
  takeaway?: string;
  items: SvtCourseEssentialItem[];
  keyInsight?: string;
  commonMistakes?: string[];
  flashQuestions?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface SvtCommonMistakeItem {
  id?: string;
  title: string;
  incorrect: string;
  whyExplanation: string;
  correct: string;
  rule?: string;
}

export interface SvtApplicationQuestion {
  id: string;
  number: string;
  title: string;
  points?: string;
  measuredObjectives?: string[];
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  difficultyLabel?: string;
  prompt: string;
  subQuestions?: string[];
  documentOrData?: string;
  table?: SvtTableItem;
  hint?: string;
  correctionSteps: {
    title: string;
    explanation?: string;
    points?: string;
  }[];
  finalAnswer: string;
  commonMistake?: string;
}

export type SvtContentBlock =
  | { kind: 'paragraph'; title?: string; text: string; note?: string }
  | { kind: 'bullets'; title?: string; items: string[]; ordered?: boolean }
  | { kind: 'quote'; text: string }
  | { kind: 'discovery'; data: SvtDiscoveryActivity }
  | { kind: 'definition'; data: SvtDefinitionItem }
  | { kind: 'bilingual-box'; terms: SvtTrilingualTerm[]; title?: string }
  | { kind: 'observation'; data: SvtObservationItem }
  | { kind: 'investigation'; data: SvtInvestigationItem }
  | { kind: 'schema'; data: SvtSchemaOrFigure }
  | { kind: 'illustration'; data: SvtIllustrationItem }
  | { kind: 'table'; data: SvtTableItem }
  | { kind: 'common-mistakes'; items: SvtCommonMistakeItem[] }
  | { kind: 'embedded-question'; question: string; answer: string; number?: string }
  | { kind: 'callout'; variant: 'important' | 'warning' | 'method' | 'note'; title: string; content: string };

export interface SvtCourseSection {
  id: string;
  number: string;
  titleArabic: string;
  titleFrench?: string;
  shortLabel?: string;
  blocks: SvtContentBlock[];
}

export interface SvtCourse {
  id: string;
  numero: string; // '01', '02', ...
  titre: string;
  titreArabe: string;
  titreNeutreArabe?: string;
  sousTitreNeutre?: string;
  titreFrancais?: string;
  matiere: string; // 'علوم الطبيعة والحياة — SVT'
  niveau: string; // '3AM — السنة الثالثة متوسط'
  domaine: SvtDomainId;
  domaineNomArabe: string;
  domaineNomFrancais: string;
  duree?: string;
  status: 'validated' | 'provisional' | 'awaiting_content';

  objectifs: string[];
  prerequis?: string[];
  introduction?: string;
  essential?: SvtCourseEssential;
  discoveryActivity?: SvtDiscoveryActivity;
  sections: SvtCourseSection[];
  illustrations?: SvtIllustrationItem[];
  commonMistakes?: SvtCommonMistakeItem[];
  definitions?: SvtDefinitionItem[];
  applications?: SvtApplicationQuestion[];
  vocabulaire: SvtTrilingualTerm[];
  resume?: string[];
  ideeCle?: string;
  summaryFlowchart?: string[];
  synthesisText?: string;
  teacherNotes?: {
    documentarySources?: string[];
    qualityNotes?: Array<{ topic: string; status: string; observation: string }>;
    objectiveCoverage?: Array<{ objective: string; courseElements: string; evaluation: string }>;
    limits?: string[];
    verdict?: string;
  };
  pointsEssentiels: {
    number: number;
    title: string;
    description: string;
  }[];
}
