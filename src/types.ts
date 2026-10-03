export interface CourseSection {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
}

export type ExerciseDifficulty = 'basic' | 'intermediate' | 'advanced';

export interface ExerciseItem {
  id: string;
  number: string;
  title: string;
  difficulty: ExerciseDifficulty;
  difficultyLabel: string;
  prompt: string;
  mathExpression: string;
  diagramId?: string;
  hint?: string;
  solutionSteps: {
    title: string;
    explanation?: string;
    math: string;
  }[];
  finalAnswer: string;
}

export interface VocabularyItem {
  arabic: string;
  french: string;
  english?: string;
  meaning: string;
}

export interface DiscoveryActivity {
  /** 1. Situation concrète en une phrase, sans nommer la propriété */
  situation: string;
  /** 2. Données à calculer présentées en tableau */
  dataTable?: {
    headers: string[];
    rows: string[][];
  };
  /** Ou données présentées en liste */
  dataList?: string[];
  /** Schéma simple d'accompagnement pour les activités géométriques */
  diagramType?:
    | 'thales-nested'
    | 'converse-pythagoras'
    | 'pythagoras-squares'
    | 'circumcircle-right'
    | 'median-rectangle'
    | 'midsegment-triangle'
    | 'congruent-triangles';
  /** 3. Questions guidées dans l'ordre strict : Q1 (calcul/observation), Q2 (interprétation), Q3 optionnelle */
  questions: string[];
  /** 💡 مساعدة : indice discret (optionnel), jamais la réponse */
  hint?: string;
  /** (Obsolète — retiré par le micro-patch) */
  summaryBlanks?: {
    template: string;
    blanks: string[];
  };
  /** Corrigé des questions guidées (affiché UNIQUEMENT dans la section Corrigés, jamais juste après l'activité) */
  correction: {
    questionAnswers: string[];
    completedSummary?: string;
  };
}

export interface Course {
  id: string;
  number: string;
  arabicNumberTitle: string;
  title: string;
  topic: string;
  duration: string;
  level: string;
  heroDescription: string;
  objectives: string[];
  sections: CourseSection[];
  discoveryActivity?: DiscoveryActivity;
  primaryFormula: {
    title: string;
    math: string;
    condition?: string;
    note?: string;
  };
  secondaryFormulas?: {
    title: string;
    math: string;
    note?: string;
  }[];
  visualModelType?: 'number-line' | 'fraction-bars' | 'inverse-relation' | 'comparison-cross' | 'triangle-congruence' | 'parallel-transversal' | 'thales-triangle' | 'powers-of-ten' | 'powers-negative-positive' | 'scientific-notation' | 'relative-powers' | 'operation-priorities' | 'median-hypotenuse' | 'circumcircle-right-triangle' | 'pythagorean-theorem' | 'converse-pythagorean';
  visualModelData?: {
    title: string;
    subtitle: string;
    explanation: string;
  };
  beforeAfter?: {
    before: string;
    transformation: string;
    result: string;
    explanation?: string;
  };
  guidedExamples: {
    title: string;
    initialMath: string;
    diagramId?: string;
    steps: {
      stepNumber: string;
      title: string;
      detail?: string;
      math: string[];
    }[];
    conclusion?: string;
  }[];
  commonMistakes: {
    title: string;
    mistakeMath: string;
    whyExplanation: string;
    correctMath: string;
    note?: string;
  }[];
  exercises: ExerciseItem[];
  summaryRules: {
    number: number;
    title: string;
    desc: string;
    badgeText: string;
    math?: string;
  }[];
  keyTakeaways: {
    title: string;
    detail: string;
    formula: string;
  }[];
  mindmap: {
    title: string;
    rootNode: { title: string; math?: string };
    question: string;
    yesBranch: { label: string; steps: string[] };
    noBranch: { label: string; steps: string[] };
    terminal: string;
  };
  vocabulary: VocabularyItem[];
}
