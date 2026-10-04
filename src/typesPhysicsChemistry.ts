import type { PhysicsSimulationBlockData } from './components/physics/simulations/types';

export type { PhysicsSimulationBlockData };

export type PhysicsDomainId =
  | 'matter'      // المادة وتحولاتها — Matière et ses transformations
  | 'energy'      // الطاقة — Énergie
  | 'electricity' // الظواهر الكهربائية — Phénomènes électriques
  | 'optics'      // الظواهر الضوئية — Phénomènes lumineux
  | 'general';    // عام — Général

export interface TrilingualTerm {
  arabic: string;
  french: string;
  english?: string;
  explanation?: string;
  symbolOrFormula?: string;
}

export interface PhysicsDefinitionItem {
  id?: string;
  titleArabic: string;
  titleFrench?: string;
  titleEnglish?: string;
  contentArabic: string;
  contentFrench?: string;
  examples?: string[];
  note?: string;
}

export interface PhysicsObservationItem {
  id?: string;
  title: string;
  description: string;
  scientificHighlight?: string;
}

export interface PhysicsExperienceItem {
  id?: string;
  number?: string;
  titleArabic: string;
  titleFrench?: string;
  objective?: string;
  materials?: string[];
  protocolSteps: string[];
  observations: string[];
  interpretation: string[];
  conclusion?: string;
  chemicalEquation?: string;
  schemaType?:
    | 'water-electrolysis'
    | 'carbon-combustion'
    | 'butane-combustion'
    | 'conservation-mass'
    | 'energy-chain'
    | 'electric-circuit'
    | 'light-spectrum'
    | 'molecules-cpk'
    | 'custom-svg';
  schemaCaption?: string;
}

export interface PhysicsExplanationItem {
  id?: string;
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
  note?: string;
}

export interface PhysicsSchemaOrFigure {
  id: string;
  titleArabic: string;
  titleFrench?: string;
  type:
    | 'molecules-cpk'
    | 'water-electrolysis'
    | 'butane-combustion'
    | 'energy-chain'
    | 'electric-circuit'
    | 'light-spectrum'
    | 'atom-model'
    | 'c01-everyday-materials'
    | 'c01-water-to-entity-tree'
    | 'c01-water-molecule-atoms'
    | 'c01-o-vs-o2'
    | 'c01-chemical-species-water'
    | 'c01-entity-vs-species'
    | 'c01-dioxygen-example'
    | 'c01-flasks-system'
    | 'c01-three-concepts-chain'
    | 'c01-macro-vs-micro'
    | 'c01-three-boxes-abc'
    | 'c01-summary-chain'
    | 'c02-discovery-setup'
    | 'c02-electrolysis-apparatus'
    | 'c02-gas-identification-tests'
    | 'c02-physical-vs-chemical'
    | 'c02-molecular-rearrangement'
    | 'c02-scientific-methodology-chain'
    | 'c02-master-summary-diagram'
    | 'c03-discovery-setup'
    | 'c03-combustion-and-limewater-test'
    | 'c03-reactants-products-molecular'
    | 'c03-fire-triangle-and-air'
    | 'c03-master-summary-diagram'
    | 'c04-discovery-setup'
    | 'c04-complete-combustion-tests'
    | 'c04-incomplete-combustion-danger'
    | 'c04-microscopic-atom-conservation'
    | 'c04-microscopic-butane-atoms'
    | 'c04-master-summary-diagram'
    | 'c05-discovery-setup'
    | 'c05-coefficient-vs-subscript'
    | 'c05-water-synthesis-microscopic'
    | 'c05-butane-step-by-step'
    | 'c05-master-summary-diagram'
    | 'c06-discovery-setup'
    | 'c06-reaction-speeds-comparison'
    | 'c06-temperature-factor-micro'
    | 'c06-contact-surface-factor'
    | 'c06-mixture-and-catalyst'
    | 'c06-master-summary-diagram'
    | 'c07-discovery-setup'
    | 'c07-lamp-functional-chain'
    | 'c07-fan-and-hairdryer-parallel'
    | 'c07-functional-vs-energy-chain'
    | 'c07-master-summary-diagram'
    | 'c08-discovery-setup'
    | 'c08-energy-forms-and-lamp-conversion'
    | 'c08-lamp-energy-chain'
    | 'c08-fan-and-dynamo-energy-chains'
    | 'c08-master-summary-diagram'
    | 'c09-discovery-setup'
    | 'c09-three-devices-verification-activity'
    | 'c09-efficiency-mini-activity'
    | 'c09-schema-bilan-synthese'
    | 'c09-hydroelectric-energy-chain-svg'
    | 'c09-dynamo-components-vs-energy-schema'
    | 'c09-mistake-2-interactive'
    | 'c09-general-and-lamp-bilan'
    | 'c09-conservation-and-devices'
    | 'c09-efficiency-and-chain-vs-bilan'
    | 'c09-master-summary-diagram'
    | 'c10-discovery-setup'
    | 'c10-power-meaning-and-triangle'
    | 'c10-two-devices-comparison'
    | 'c10-chain-nominal-and-lamps'
    | 'c10-master-summary-diagram'
    | 'custom-diagram';
  caption?: string;
  annotations?: {
    labelArabic: string;
    labelFrench?: string;
    formula?: string;
    detail?: string;
  }[];
  chainNodes?: {
    actorArabic: string;
    actorFrench?: string;
    stateVerb?: string;
    energyForm?: string; // Ei, Ec, Ep, E_int
    transferNext?: string; // Wm, We, Q, Er
    transferLabel?: string;
  }[];
}

export interface PhysicsTableItem {
  id?: string;
  titleArabic: string;
  titleFrench?: string;
  subtitle?: string;
  headers: string[];
  rows: string[][];
  footerNote?: string;
}

export interface PhysicsFormulaItem {
  id?: string;
  titleArabic: string;
  titleFrench?: string;
  type: 'chemical-equation' | 'physical-law' | 'chemical-symbol';
  expression: string; // e.g. "2 H₂O(l) → 2 H₂(g) + O₂(g)" or LaTeX "E = P \\times t"
  latex?: string;
  reactants?: string;
  products?: string;
  unitsAndVariables?: {
    symbol: string;
    nameArabic: string;
    nameFrench?: string;
    unit: string;
  }[];
  conditionOrNote?: string;
}

export interface PhysicsExampleItem {
  id?: string;
  title: string;
  context: string;
  steps: {
    stepTitle: string;
    explanation: string;
    formulaOrChem?: string;
  }[];
  conclusion?: string;
}

export interface PhysicsActivityItem {
  id?: string;
  number?: string;
  titleArabic: string;
  titleFrench?: string;
  situation: string;
  documentsOrData?: string[];
  table?: PhysicsTableItem;
  schema?: PhysicsSchemaOrFigure;
  questions: string[];
  correction?: {
    answers: string[];
    synthesis?: string;
  };
}

export interface PhysicsApplicationQuestion {
  id: string;
  number: string;
  title: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  difficultyLabel?: string;
  prompt: string;
  subQuestions?: string[];
  formulaOrData?: string;
  hint?: string;
  correctionSteps: {
    title: string;
    explanation?: string;
    formulaOrChem?: string;
  }[];
  finalAnswer: string;
}

export interface PhysicsDiscoveryActivity {
  id: string;
  titleArabic: string;
  titleFrench?: string;
  /** Temps 1 : Situation concrète avec objets réels */
  situationConcrete: string;
  /** Liste des échantillons / situations réelles observées */
  situationsReelles?: string[];
  /** Temps 2 : Données ou observations comparatives à traiter */
  observationTable?: PhysicsTableItem;
  schema?: PhysicsSchemaOrFigure;
  /** Temps 3 : Questions guidées AVANT de nommer formellement les concepts */
  guidedQuestions?: string[];
  /** Indice discret (💡 مساعدة) sans donner la réponse */
  hint?: string;
  /** Corrigé affiché dans la section Exercices / Corrigés */
  correction?: {
    questionAnswers: string[];
    conclusion?: string;
  };
}

export interface PhysicsCommonMistakeItem {
  id?: string;
  title: string;
  incorrect: string;
  whyExplanation: string;
  correct: string;
  rule?: string;
}

/**
 * Un bloc pédagogique flexible permettant de respecter l'ordre exact
 * et les formulations exactes des 20 cours fournis par l'utilisateur.
 */
export type PhysicsContentBlock =
  | { kind: 'paragraph'; title?: string; text: string; note?: string }
  | { kind: 'bullets'; title?: string; items: string[]; ordered?: boolean }
  | { kind: 'quote'; text: string }
  | { kind: 'discovery'; data: PhysicsDiscoveryActivity }
  | { kind: 'definition'; data: PhysicsDefinitionItem }
  | { kind: 'bilingual-box'; terms: TrilingualTerm[]; title?: string }
  | { kind: 'observation'; data: PhysicsObservationItem }
  | { kind: 'experience'; data: PhysicsExperienceItem }
  | { kind: 'explanation'; data: PhysicsExplanationItem }
  | { kind: 'schema'; data: PhysicsSchemaOrFigure }
  | { kind: 'table'; data: PhysicsTableItem }
  | { kind: 'formula'; data: PhysicsFormulaItem }
  | { kind: 'example'; data: PhysicsExampleItem }
  | { kind: 'activity'; data: PhysicsActivityItem }
  | { kind: 'common-mistakes'; items: PhysicsCommonMistakeItem[] }
  | { kind: 'simulation'; data: PhysicsSimulationBlockData }
  | { kind: 'callout'; variant: 'important' | 'warning' | 'method' | 'note'; title: string; content: string };

export interface PhysicsCourseSection {
  id: string;
  number: string;
  titleArabic: string;
  titleFrench?: string;
  shortLabel?: string;
  blocks: PhysicsContentBlock[];
}

/**
 * Modèle de données complet d'un cours de Physique-Chimie 3AM (Cours 01 -> Cours 20)
 * Conforme à la section 5 du cahier des charges et au Patch de corrections structurelles.
 */
export interface PhysicsChemistryCourse {
  id: string;
  numero: string; // '01' .. '20'
  titre: string; // Titre principal affiché
  titreArabe: string;
  /** Titre neutre en tête de cours (sans nommer les concepts cibles avant l'activité de découverte) */
  titreNeutreArabe?: string;
  /** Sous-titre neutre en tête de cours (ex. numéro du chapitre, domaine, niveau) */
  sousTitreNeutre?: string;
  titreFrancais?: string;
  titreAnglais?: string;
  sousTitresBilingues?: {
    arabe: string;
    francais: string;
  }[];
  matiere: string; // 'العلوم الفيزيائية والتكنولوجيا'
  niveau: string; // '3AM — السنة الثالثة متوسط'
  domaine: PhysicsDomainId;
  domaineNomArabe: string;
  domaineNomFrancais: string;
  duree?: string;
  status: 'populated' | 'awaiting_content';

  // Champs pédagogiques structurés (Section 5 + Patch)
  objectifs: string[];
  prerequis?: string[];
  introduction?: string;
  discoveryActivity?: PhysicsDiscoveryActivity;
  sections: PhysicsCourseSection[];
  commonMistakes?: PhysicsCommonMistakeItem[];
  simulations?: PhysicsSimulationBlockData[];

  // Collections structurées optionnelles ou complémentaires aux sections
  definitions?: PhysicsDefinitionItem[];
  observations?: PhysicsObservationItem[];
  experiences?: PhysicsExperienceItem[];
  explications?: PhysicsExplanationItem[];
  schemas?: PhysicsSchemaOrFigure[];
  figures?: PhysicsSchemaOrFigure[];
  tableaux?: PhysicsTableItem[];
  formules?: PhysicsFormulaItem[];
  exemples?: PhysicsExampleItem[];
  activites?: PhysicsActivityItem[];
  applications?: PhysicsApplicationQuestion[];
  questions?: string[];
  correction?: string[];
  vocabulaire: TrilingualTerm[];
  resume?: string[];
  ideeCle?: string;
  noteFinale?: string;
  pointsEssentiels: {
    number: number;
    title: string;
    description: string;
    formulaOrSymbol?: string;
  }[];
}

