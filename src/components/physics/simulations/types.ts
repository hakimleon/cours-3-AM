import React from 'react';

/**
 * Architecture générique du Simulation Framework 3AM Physique-Chimie
 * Module : العلوم الفيزيائية والتكنولوجيا — السنة الثالثة متوسط (Physique-Chimie 3AM)
 *
 * Séparation stricte des responsabilités :
 * 1. Contenu pédagogique déclaratif (SimulationPedagogicalContent)
 * 2. Modèle scientifique pur & déterministe (SimulationScientificModel<TMetrics, TParams>)
 * 3. État d'exécution & paramètres (SimulationRuntimeState<TMetrics, TParams>)
 * 4. Rendu graphique SVG / Scène (SimulationStageProps<TMetrics, TParams>)
 * 5. Contrôles, Paramètres & Accessibilité
 * 6. Feedback pédagogique (MANIPULER → OBSERVER → MESURER → COMPARER → CONCLURE)
 * 7. Registre centralisé extensible (SimulationRegistryEntry)
 */

/**
 * Identifiants des simulations enregistrées et actives dans le framework (Pilote + P0).
 */
export type RegisteredSimulationId =
  | 'electrolysis-water'             // Cours 02 : التحليل الكهربائي للماء (Laboratoire virtuel + Micro)
  | 'complete-incomplete-combustion' // Cours 04 : الاحتراق التام وغير التام للفحم الهيدروجيني (Paramètres + Micro)
  | 'reaction-speed'                 // Cours 06 : العوامل المؤثرة في التفاعل الكيميائي (Paramètres + Cinétique)
  | 'energy-balance'                 // Cours 09 : الحصيلة الطاقوية والمردود الطاقوي (Bilan quantitatif + Rendement)
  | 'power-energy-conversion';       // Cours 10 : استطاعة تحويل الطاقة (Puissance P = E/t, comparaison et graphe E=f(t))

/**
 * Identifiants réservés pour de futures extensions (P1/P2).
 */
export type FutureSimulationId =
  | 'carbon-combustion'
  | 'equation-balancing'
  | 'functional-chain'
  | 'energy-chain'
  | 'ohm-law'
  | 'light-dispersion';

export type SimulationId = RegisteredSimulationId | FutureSimulationId;

/**
 * Familles de simulations supportées par le framework (Section 5).
 */
export type SimulationCategory =
  | 'laboratory'          // A. Laboratoire virtuel
  | 'microscopic-model'   // B. Modèle microscopique
  | 'parameter-sim'       // C. Simulation de paramètres
  | 'technical-system'    // D. Système technique interactif
  | 'energy-chain-bilan'  // E. Chaîne & Bilan énergétique
  | 'dynamic-graph'       // F. Graphique dynamique
  | 'interactive-optics'; // G. Optique interactive

export type SimulationStatus = 'stopped' | 'running' | 'paused' | 'completed';

export type SimulationSpeed = 0.5 | 1 | 1.5 | 2;

export type SimulationRepresentationMode =
  | 'macroscopic' // المستوى العياني (التجربة المخبرية / الظاهرة العيانية)
  | 'microscopic' // المستوى المجهري المبسط (النموذج الجزيئي / الجسيمي)
  | 'both';       // عرض مزدوج متزامن (العياني + المجهري المبسط)

export type SimulationInteractionMode =
  | 'exploration' // وضع الاستكشاف الحر
  | 'guided';     // وضع الملاحظة الموجهة (أسئلة متدرجة)

/**
 * Option prédéfinie (palier) pour un paramètre scientifique manipulable.
 */
export interface PhysicsSimulationParameterOption {
  value: number;
  labelArabic: string;
  labelFrench?: string;
}

/**
 * Définition data-driven d'un paramètre scientifique manipulable par l'élève (Section 8).
 * Seuls les paramètres pédagogiquement pertinents sont exposés ici ; les constantes
 * scientifiques restent internes au modèle.
 */
export interface PhysicsSimulationParameter {
  id: string;
  labelArabic: string;
  labelFrench?: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  /** Paliers explicites (boutons de sélection rapide) en complément ou remplacement du curseur */
  presets?: PhysicsSimulationParameterOption[];
  /** Si true, affiche uniquement les boutons de paliers (sans slider continu) */
  presetsOnly?: boolean;
}

/**
 * Déclaration légère d'une simulation dans les données d'un cours (physicsChemistryCoursesData.ts).
 * Permet d'associer une simulation à une section sans embarquer la logique dans le fichier de cours.
 */
export interface PhysicsSimulationBlockData {
  id: string;
  simulationId: SimulationId;
  titleArabic?: string;
  titleFrench?: string;
  subtitleArabic?: string;
  positionLabel?: string;
  defaultRepresentation?: SimulationRepresentationMode;
  defaultInteractionMode?: SimulationInteractionMode;
}

/**
 * Point de mesure temporel ou paramétrique pour le graphique dynamique.
 */
export interface SimulationHistoryPoint {
  progress: number; // 0 .. 1
  elapsedSeconds: number;
  values: Record<string, number>;
}

/**
 * État dynamique générique du moteur de simulation.
 */
export interface SimulationRuntimeState<
  TMetrics = Record<string, number>,
  TParams extends Record<string, number> = Record<string, number>,
> {
  status: SimulationStatus;
  /** Progression normalisée entre 0 (état initial) et 1 (fin de l'expérience) */
  progress: number;
  /** Temps scientifique simulé (en secondes) */
  elapsedTime: number;
  /** Vitesse d'animation (0.5x, 1x, 1.5x, 2x) — ne modifie aucune loi scientifique */
  speed: SimulationSpeed;
  /** Niveau de représentation choisi par l'élève */
  representationMode: SimulationRepresentationMode;
  /** Mode d'interaction (exploration libre ou observation guidée) */
  interactionMode: SimulationInteractionMode;
  /** Indique si l'utilisateur ou le système préfère réduire les animations */
  reducedMotion: boolean;
  /** Index de l'étape active en mode observation guidée */
  guidedStepIndex: number;
  /** Paramètres scientifiques manipulables courants */
  params: TParams;
  /** Grandeurs mesurées calculées de manière déterministe par le modèle scientifique */
  metrics: TMetrics;
  /** Historique échantillonné pour le graphique temps réel */
  history: SimulationHistoryPoint[];
}

/**
 * Observation dynamique affichée dans la zone « ماذا تلاحظ؟ » en fonction de la progression
 * ou des paramètres actifs.
 */
export interface SimulationDynamicObservation {
  id: string;
  minProgress: number;
  titleArabic: string;
  titleFrench?: string;
  descriptionArabic: string;
  scientificFormula?: string;
}

/**
 * Question successive pour le mode « الملاحظة الموجهة — Observation guidée ».
 */
export interface SimulationGuidedQuestion {
  id: string;
  number: number;
  questionArabic: string;
  questionFrench?: string;
  /** Progression minimale conseillée pour observer la réponse dans la simulation */
  targetProgress: number;
  /** Paramètres optionnels à appliquer lors de l'inspection de cette étape guidée */
  targetParams?: Record<string, number>;
  observationHintArabic: string;
  answerArabic: string;
  formulaLtr?: string;
}

/**
 * Étape du bandeau de démarche scientifique (MANIPULER → OBSERVER → MESURER → COMPARER → CONCLURE).
 */
export interface SimulationScientificStep {
  step: number;
  ar: string;
  fr: string;
}

/**
 * Données de repli (Fallback) affichées automatiquement si la simulation interactive
 * ne peut pas être initialisée ou en cas d'erreur de rendu.
 */
export interface SimulationFallbackData {
  titleArabic: string;
  titleFrench: string;
  equationLtr: string;
  keyValues: {
    labelArabic: string;
    valueLtr: string;
  }[];
  shortExplanationArabic: string;
  staticSchemaType?: string;
}

/**
 * Contenu pédagogique déclaratif associé à une simulation.
 * Entièrement découplé d'un cours particulier.
 */
export interface SimulationPedagogicalContent {
  titleArabic: string;
  titleFrench: string;
  category?: SimulationCategory;
  levelBadge: string;
  objectiveArabic: string;
  macroscopicWarningArabic?: string;
  microscopicWarningArabic?: string;
  /** Modes de représentation supportés (par défaut : ['macroscopic', 'microscopic', 'both']) */
  supportedRepresentations?: SimulationRepresentationMode[];
  /** Étapes personnalisées de la démarche scientifique (5 étapes) */
  scientificSteps?: SimulationScientificStep[];
  /** Libellés personnalisés des contrôles (ex: "تشغيل التيار" vs "بدء التفاعل") */
  controlLabels?: {
    startArabic?: string;
    progressLabelArabic?: string;
    progressAriaLabel?: string;
  };
  equationLtr: string;
  /** Relation ou loi clé affichée en badge dans la zone de conclusion */
  keyRelationBadgeLtr?: string;
  /** Conservé par rétrocompatibilité avec le pilote Cours 02 */
  volumeRelationLtr?: string;
  dynamicObservations: SimulationDynamicObservation[];
  guidedQuestions: SimulationGuidedQuestion[];
  conclusionArabic: string[];
  conclusionFormulasLtr: string[];
  fallback: SimulationFallbackData;
}

/**
 * Modèle scientifique pur et déterministe d'une simulation.
 * Toutes les fonctions doivent être pures (sans effets de bord, sans JSX) afin de garantir
 * la reproductibilité mathématique et la testabilité unitaire.
 */
export interface SimulationScientificModel<
  TMetrics = Record<string, number>,
  TParams extends Record<string, number> = Record<string, number>,
> {
  /** Durée nominale (à vitesse 1x) d'un cycle complet de simulation en secondes */
  readonly nominalDurationSeconds: number;
  /** Liste déclarative des paramètres pédagogiques manipulables par l'élève (optionnel) */
  readonly parameters?: PhysicsSimulationParameter[];
  /** Retourne les valeurs initiales par défaut des paramètres (optionnel) */
  getInitialParameters?: () => TParams;
  /** Calcule l'état initial exact (progress = 0) */
  getInitialMetrics: (params?: TParams) => TMetrics;
  /** Calcule les grandeurs scientifiques déterministes pour une progression normalisée [0, 1] et des paramètres donnés */
  computeMetricsAtProgress: (progress: number, params?: TParams) => TMetrics;
  /** Extrait les valeurs numériques à tracer dans l'historique du graphique */
  extractHistoryValues: (metrics: TMetrics, params?: TParams) => Record<string, number>;
  /** Vérifie les invariants scientifiques (utilisé par les tests et assertions) */
  validateInvariants: (metrics: TMetrics, progress: number, params?: TParams) => boolean;
}

/**
 * Propriétés passées au composant de rendu graphique spécifique (Stage).
 */
export interface SimulationStageProps<
  TMetrics = Record<string, number>,
  TParams extends Record<string, number> = Record<string, number>,
> {
  state: SimulationRuntimeState<TMetrics, TParams>;
  pedagogy: SimulationPedagogicalContent;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onParameterChange?: (paramId: string, value: number) => void;
}

/**
 * Définition complète d'une entrée dans le registre central des simulations.
 */
export interface SimulationRegistryEntry<
  TMetrics = any,
  TParams extends Record<string, number> = any,
> {
  id: RegisteredSimulationId;
  courseNumero: string;
  pedagogy: SimulationPedagogicalContent;
  scientificModel: SimulationScientificModel<TMetrics, TParams>;
  StageComponent: React.ComponentType<SimulationStageProps<TMetrics, TParams>>;
}
