import {
  SimulationPedagogicalContent,
  SimulationScientificModel,
} from '../types';
import { clampProgress } from '../useSimulationEngine';

export interface ElectrolysisMetrics {
  /** Volume de dihydrogène H₂ collecté (en unités : 0 → 20) */
  volumeH2: number;
  /** Volume de dioxygène O₂ collecté (en unités : 0 → 10) */
  volumeO2: number;
  /** Rapport V(H₂) / V(O₂) — nul à t=0, strictement égal à 2 dès que V(O₂) > 0 */
  ratioH2ToO2: number | null;
  /** Nombre de paires (2 H₂O) dissociées dans le modèle microscopique simplifié (0 → 5) */
  dissociatedPairs: number;
  /** Molécules d'eau H₂O restantes dans l'échantillon microscopique (10 → 0) */
  waterMoleculesCount: number;
  /** Molécules de dihydrogène H₂ formées dans l'échantillon microscopique (0 → 10) */
  h2MoleculesCount: number;
  /** Molécules de dioxygène O₂ formées dans l'échantillon microscopique (0 → 5) */
  o2MoleculesCount: number;
  /** Indique si le courant électrique circule (interrupteur fermé) */
  isCurrentFlowing: boolean;
}

export const ELECTROLYSIS_MAX_VOLUME_O2 = 10; // 10 unités
export const ELECTROLYSIS_MAX_VOLUME_H2 = 20; // 20 unités (2 × 10)
export const ELECTROLYSIS_INITIAL_WATER_MOLECULES = 10; // 5 paires de (2 H₂O)

/**
 * Modèle scientifique déterministe de l'électrolyse de l'eau (Cours 02 — 3AM)
 * Équation-bilan : 2 H₂O → 2 H₂ + O₂
 * Relation volumique : V(H₂) : V(O₂) = 2 : 1  ⇔  volumeH2 = 2 × volumeO2
 */
export const electrolysisScientificModel: SimulationScientificModel<ElectrolysisMetrics> = {
  nominalDurationSeconds: 10,

  getInitialMetrics(): ElectrolysisMetrics {
    return {
      volumeH2: 0,
      volumeO2: 0,
      ratioH2ToO2: null,
      dissociatedPairs: 0,
      waterMoleculesCount: ELECTROLYSIS_INITIAL_WATER_MOLECULES,
      h2MoleculesCount: 0,
      o2MoleculesCount: 0,
      isCurrentFlowing: false,
    };
  },

  computeMetricsAtProgress(rawProgress: number): ElectrolysisMetrics {
    const progress = clampProgress(rawProgress);

    if (progress === 0) {
      return this.getInitialMetrics();
    }

    // Calcul déterministe de V(O₂) puis déduction exacte V(H₂) = 2 × V(O₂)
    // Garantit mathématiquement l'invariant volumeH2 = 2 * volumeO2 sans erreur d'arrondi
    const rawO2 = Math.round(progress * ELECTROLYSIS_MAX_VOLUME_O2 * 10) / 10;
    const volumeO2 = Math.max(0.1, rawO2);
    const volumeH2 = Number((2 * volumeO2).toFixed(1));
    const ratioH2ToO2 = volumeO2 > 0 ? volumeH2 / volumeO2 : null;

    // Modèle microscopique simplifié : 5 paires de (2 H₂O) -> jusqu'à 10 H₂ et 5 O₂
    const dissociatedPairs = Math.min(5, Math.floor(progress * 5 + 0.0001));
    const waterMoleculesCount = ELECTROLYSIS_INITIAL_WATER_MOLECULES - 2 * dissociatedPairs;
    const h2MoleculesCount = 2 * dissociatedPairs;
    const o2MoleculesCount = 1 * dissociatedPairs;

    return {
      volumeH2,
      volumeO2,
      ratioH2ToO2,
      dissociatedPairs,
      waterMoleculesCount,
      h2MoleculesCount,
      o2MoleculesCount,
      isCurrentFlowing: progress > 0 && progress < 1,
    };
  },

  extractHistoryValues(metrics: ElectrolysisMetrics): Record<string, number> {
    return {
      H2: metrics.volumeH2,
      O2: metrics.volumeO2,
    };
  },

  validateInvariants(metrics: ElectrolysisMetrics, progress: number): boolean {
    const clamped = clampProgress(progress);
    if (clamped === 0) {
      return (
        metrics.volumeH2 === 0 &&
        metrics.volumeO2 === 0 &&
        metrics.ratioH2ToO2 === null &&
        metrics.waterMoleculesCount === 10 &&
        metrics.h2MoleculesCount === 0 &&
        metrics.o2MoleculesCount === 0
      );
    }

    // 1. Relation volumique stricte : V(H₂) = 2 × V(O₂)
    const isVolumeRatioExact =
      metrics.volumeO2 > 0 &&
      Math.abs(metrics.volumeH2 - 2 * metrics.volumeO2) < 1e-9 &&
      Math.abs((metrics.ratioH2ToO2 ?? 0) - 2) < 1e-9;

    // 2. Conservation des atomes au niveau microscopique : 20 H et 10 O au total
    const totalH = 2 * metrics.waterMoleculesCount + 2 * metrics.h2MoleculesCount;
    const totalO = 1 * metrics.waterMoleculesCount + 2 * metrics.o2MoleculesCount;
    const isAtomConservationExact = totalH === 20 && totalO === 10;

    return isVolumeRatioExact && isAtomConservationExact;
  },
};

/**
 * Contenu pédagogique déclaratif du pilote Cours 02 : التحليل الكهربائي للماء (Électrolyse de l'eau)
 */
export const electrolysisPedagogicalContent: SimulationPedagogicalContent = {
  titleArabic: 'محاكاة تفاعلية : التحليل الكهربائي للماء',
  titleFrench: 'Simulation interactive · Électrolyse de l’eau',
  category: 'laboratory',
  levelBadge: 'السنة الثالثة متوسط — 3AM',
  objectiveArabic:
    'ملاحظة انطلاق الفقاعات الغازية عند القطبين، قياس حجمي الغازين المتجمعين (H₂ و O₂) في الزمن الحقيقي، واكتشاف النسبة الحجمية (2 : 1) وعلاقتها بمعادلة التفاعل الكيميائي.',
  macroscopicWarningArabic:
    'المستوى العياني (ما نراه بالعين المجردة في المخبر) : وعاء التحليل، الماء، القطبان الكهربائيان، تصاعد الفقاعات، وتجمع الغازين في الأنبوبين المنكسين.',
  microscopicWarningArabic:
    'تنبيه علمي مهم : التمثيل الجزيئي أدناه هو نموذج تفسيري مبسط (الجزيئات H₂O و H₂ و O₂ صغيرة جدًا ولا تُرى بالعين المجردة في الواقع).',
  scientificSteps: [
    { step: 1, ar: '1. شغّل وجرّب', fr: 'Manipuler' },
    { step: 2, ar: '2. لاحظ الفقاعات', fr: 'Observer' },
    { step: 3, ar: '3. قِس الحجمين', fr: 'Mesurer' },
    { step: 3, ar: '4. قارن (2 : 1)', fr: 'Comparer' },
    { step: 4, ar: '5. استنتج المعادلة', fr: 'Conclure' },
  ],
  controlLabels: {
    startArabic: 'تشغيل التيار (Démarrer)',
    progressLabelArabic:
      'تقدم التفاعل التجريبي (يمكنك أيضًا تحريك المؤشر للمقارنة عند أي لحظة) :',
    progressAriaLabel: 'شريط تقدم التحليل الكهربائي',
  },
  equationLtr: '2 H₂O → 2 H₂ + O₂',
  keyRelationBadgeLtr: 'V(H₂) = 2 × V(O₂)',
  volumeRelationLtr: 'V(H₂) : V(O₂) = 2 : 1',

  dynamicObservations: [
    {
      id: 'obs-initial',
      minProgress: 0,
      titleArabic: 'الحالة الابتدائية (قبل تشغيل التيار الكهربائي)',
      titleFrench: 'État initial (Circuit ouvert)',
      descriptionArabic:
        'الدارة الكهربائية مفتوحة: الأنبوبان المنكسان مملوءان بالماء بالكامل، ولا توجد أي فقاعات غازية (حجم H₂ = 0 وحدة، وحجم O₂ = 0 وحدة).',
      scientificFormula: 'V(H₂) = 0 · V(O₂) = 0',
    },
    {
      id: 'obs-bubbles-start',
      minProgress: 0.02,
      titleArabic: 'بداية التحليل الكهربائي : ظهور الفقاعات الغازية',
      titleFrench: 'Apparition des bulles gazeuses aux électrodes',
      descriptionArabic:
        'عند غلق الدارة وتشغيل المولد الكهربائي، نلاحظ تصاعد فقاعات غازية بجوار كل قطب كهربائي، مع تصاعد عدد أكبر من الفقاعات عند القطب السالب (−).',
      scientificFormula: 'H₂O (ماء) ⟶ غازان منطلقان',
    },
    {
      id: 'obs-volume-comparison',
      minProgress: 0.35,
      titleArabic: 'مقارنة حجمي الغازين أثناء التجمع',
      titleFrench: 'Comparaison progressive des volumes',
      descriptionArabic:
        'يتجمع الغاز في أعلى كل أنبوب دافعًا الماء نحو الأسفل. لاحظ أن حجم غاز الهيدروجين (H₂) المتجمع أكبر من حجم غاز الأكسجين (O₂)، ويزداد بسرعة مضاعفة.',
      scientificFormula: 'V(H₂) = 2 × V(O₂)',
    },
    {
      id: 'obs-completed',
      minProgress: 0.9,
      titleArabic: 'النتيجة الكمية النهائية : النسبة الحجمية الثابتة (2 : 1)',
      titleFrench: 'Rapport volumique constant 2 : 1',
      descriptionArabic:
        'حجم غاز ثنائي الهيدروجين (H₂ = 20 وحدة) يساوي ضعف حجم غاز ثنائي الأكسجين (O₂ = 10 وحدات). يفسر ذلك بأن تفكك جزيئين من الماء (2 H₂O) ينتج جزيئين من H₂ مقابل جزيء واحد من O₂.',
      scientificFormula: '2 H₂O → 2 H₂ + O₂  |  V(H₂) : V(O₂) = 2 : 1',
    },
  ],

  guidedQuestions: [
    {
      id: 'gq-1',
      number: 1,
      questionArabic: 'ماذا تلاحظ عند تشغيل التيار؟',
      questionFrench: '1. Que remarques-tu à la mise sous tension ?',
      targetProgress: 0.15,
      observationHintArabic: 'اضغط على زر «تشغيل (▶)» وراقب ما يظهر بجوار القطبين الكهربائيين المغمورين في الماء.',
      answerArabic:
        'عند تشغيل التيار الكهربائي تنطلق فقاعات غازية عند القطبين الكهربائيين وتصعد نحو أعلى الأنبوبين المنكسين.',
    },
    {
      id: 'gq-2',
      number: 2,
      questionArabic: 'أين تتشكل الفقاعات؟',
      questionFrench: '2. Où se forment les bulles ?',
      targetProgress: 0.25,
      observationHintArabic: 'انظر إلى أسفل كل أنبوب اختبار حيث يوجد المسريان (القطبان الكهربائيان + و −).',
      answerArabic:
        'تتشكل الفقاعات الغازية مباشرة على سطح القطبين الكهربائيين (المهبط − والمصعد +) ثم تصعد داخل الأنبوبين.',
    },
    {
      id: 'gq-3',
      number: 3,
      questionArabic: 'هل كمية الغازين متساوية؟',
      questionFrench: '3. Les quantités des deux gaz sont-elles égales ?',
      targetProgress: 0.5,
      observationHintArabic: 'قارن مستوى الماء وحجم الغاز المحجوز في أعلى الأنبوب الأول (−) والأنبوب الثاني (+).',
      answerArabic:
        'لا، كمية (حجم) الغازين المتجمعين في الأنبوبين غير متساوية؛ أحدهما يمتلئ بالغاز أسرع من الآخر.',
    },
    {
      id: 'gq-4',
      number: 4,
      questionArabic: 'أي غاز حجمه أكبر؟',
      questionFrench: '4. Quel gaz occupe le plus grand volume ?',
      targetProgress: 0.75,
      observationHintArabic: 'اقرأ قيمتي الحجم في لوحة القياسات الحية أو على تدريجات الأنبوبين.',
      answerArabic:
        'لاحظ أن حجم غاز ثنائي الهيدروجين (H₂) المتجمع عند القطب السالب (−) أكبر من حجم غاز ثنائي الأكسجين (O₂) المتجمع عند القطب الموجب (+).',
      formulaLtr: 'V(H₂) > V(O₂)',
    },
    {
      id: 'gq-5',
      number: 5,
      questionArabic: 'ما النسبة بين حجمي الغازين؟',
      questionFrench: '5. Quel est le rapport entre les volumes des deux gaz ?',
      targetProgress: 1.0,
      observationHintArabic: 'قارن العددين المسجلين لحجم H₂ وحجم O₂ (مثلاً: 20 وحدة مقابل 10 وحدات).',
      answerArabic:
        'حجم الهيدروجين يساوي تقريبًا ضعف حجم الأكسجين، أي أن النسبة بين حجمي الغازين هي 2 : 1 وفق المعادلة 2 H₂O → 2 H₂ + O₂.',
      formulaLtr: 'V(H₂) : V(O₂) = 2 : 1',
    },
  ],

  conclusionArabic: [
    'لاحظ أن حجم غاز الهيدروجين أكبر من حجم غاز الأكسجين.',
    'حجم الهيدروجين يساوي تقريبًا ضعف حجم الأكسجين.',
    'تُفسَّر هذه النسبة الحجمية (2 : 1) بأن تفكك جزيئين من الماء (2 H₂O) يعطي جزيئين من ثنائي الهيدروجين (2 H₂) وجزيئًا واحدًا من ثنائي الأكسجين (O₂).',
  ],

  conclusionFormulasLtr: [
    'V(H₂) : V(O₂) = 2 : 1',
    '2 H₂O → 2 H₂ + O₂',
  ],

  fallback: {
    titleArabic: 'تجربة التحليل الكهربائي للماء (عرض ثابت احتياطي)',
    titleFrench: 'Électrolyse de l’eau (Schéma statique de secours)',
    equationLtr: '2 H₂O → 2 H₂ + O₂',
    keyValues: [
      { labelArabic: 'غاز ثنائي الهيدروجين (H₂)', valueLtr: 'Volume = 20 unités (2V)' },
      { labelArabic: 'غاز ثنائي الأكسجين (O₂)', valueLtr: 'Volume = 10 unités (1V)' },
      { labelArabic: 'النسبة الحجمية الثابتة', valueLtr: 'V(H₂) : V(O₂) = 2 : 1' },
    ],
    shortExplanationArabic:
      'عند تمرير تيار كهربائي مستمر في الماء، يتفكك الماء (H₂O) لينتج غاز ثنائي الهيدروجين (H₂) وغاز ثنائي الأكسجين (O₂) بحيث يكون حجم الهيدروجين ضعف حجم الأكسجين.',
    staticSchemaType: 'c02-electrolysis-apparatus',
  },
};
