import {
  PhysicsSimulationParameter,
  SimulationPedagogicalContent,
  SimulationScientificModel,
} from '../types';
import { clampProgress } from '../useSimulationEngine';

export interface CombustionParams extends Record<string, number> {
  /** Ouverture de la virole d'air / disponibilité en dioxygène O₂ (20% à 100%) */
  oxygenSupplyPercent: number;
}

export interface CombustionMetrics {
  /** Ouverture effective de l'entrée d'air (%) */
  oxygenSupplyPercent: number;
  /** Régime de combustion : 'complete' (>= 80%), 'transition' (50%..79%), 'incomplete' (< 50%) */
  regime: 'complete' | 'transition' | 'incomplete';
  /** Quantité de dioxyde de carbone CO₂ produit (0 → 40 unités) */
  co2Produced: number;
  /** Quantité d'eau H₂O produite (0 → 80 unités) */
  h2oProduced: number;
  /** Quantité de monoxyde de carbone CO toxique produit (0 → 20 unités) */
  coProduced: number;
  /** Quantité de carbone solide C (suie / هباب الفحم) déposé (0 → 10 unités) */
  carbonSootProduced: number;
  /** Concentration de CO mesurée par le détecteur de sécurité (en ppm : 0 → 400 ppm) */
  coPpm: number;
  /** Niveau de trouble de l'eau de chaux (0 → 100 %) */
  limewaterTurbidityPercent: number;
  /** Niveau d'opacité du dépôt noir de suie sur la soucoupe (0 → 100 %) */
  sootDepositPercent: number;
  /** Nombre de molécules de méthane CH₄ restantes dans l'échantillon microscopique (4 → 0) */
  ch4Remaining: number;
  /** Nombre de molécules de dioxygène O₂ restantes dans l'échantillon microscopique */
  o2Remaining: number;
  /** Nombre initial de molécules O₂ dans l'échantillon microscopique (8 en complet, 6 en transition, 5 en incomplet) */
  o2InitialMicro: number;
  /** Molécules CO₂ formées dans l'échantillon microscopique */
  co2MicroCount: number;
  /** Molécules H₂O formées dans l'échantillon microscopique */
  h2oMicroCount: number;
  /** Molécules CO formées dans l'échantillon microscopique */
  coMicroCount: number;
  /** Atomes de carbone C (suie) formés dans l'échantillon microscopique */
  cMicroCount: number;
  /** Indique si le brûleur est allumé */
  isBurning: boolean;
}

export const COMBUSTION_PARAMETERS: PhysicsSimulationParameter[] = [
  {
    id: 'oxygenSupplyPercent',
    labelArabic: 'فتحة دخول الهواء في الموقد (وفرة ثنائي الأكسجين O₂)',
    labelFrench: 'Ouverture de la virole d’air (Disponibilité en dioxygène O₂)',
    unit: '%',
    min: 20,
    max: 100,
    step: 10,
    defaultValue: 100,
    presets: [
      {
        value: 100,
        labelArabic: 'فتحة مفتوحة كليًا — هواء وفير (احتراق تام)',
        labelFrench: '100% O₂ · Complète',
      },
      {
        value: 60,
        labelArabic: 'فتحة متوسطة — بداية نقص الأكسجين',
        labelFrench: '60% O₂ · Transition',
      },
      {
        value: 30,
        labelArabic: 'فتحة شبه مغلقة — هواء قليل (احتراق غير تام)',
        labelFrench: '30% O₂ · Incomplète',
      },
    ],
  },
];

/**
 * Détermine le régime de combustion à partir du pourcentage d'ouverture de l'air.
 */
export function getCombustionRegime(
  oxygenSupplyPercent: number
): 'complete' | 'transition' | 'incomplete' {
  if (oxygenSupplyPercent >= 80) return 'complete';
  if (oxygenSupplyPercent >= 50) return 'transition';
  return 'incomplete';
}

/**
 * Modèle scientifique déterministe de la combustion complète et incomplète (Cours 04 — 3AM).
 *
 * Modèle microscopique sur un échantillon de 4 molécules d'hydrocarbure (CH₄) :
 * - Combustion complète (O₂ >= 80%, 8 O₂ disponibles = 16 atomes O) :
 *   Chaque CH₄ réagit avec 2 O₂ → 1 CO₂ + 2 H₂O.
 *   Bilan à 100% : 4 CH₄ + 8 O₂ → 4 CO₂ + 8 H₂O (4 C, 16 H, 16 O conservés).
 * - Combustion intermédiaire (50% <= O₂ < 80%, 6 O₂ disponibles = 12 atomes O) :
 *   Étapes 1 & 2 : 2 CH₄ + 4 O₂ → 2 CO₂ + 4 H₂O
 *   Étapes 3 & 4 : 2 CH₄ + 2 O₂ → 2 C (suie) + 4 H₂O
 *   (ou avec CO : 1 CO₂ + 2 CO + 1 C + 8 H₂O pour 6.5 O₂ ; ici avec nombres entiers de molécules O₂ :
 *    avec 7 O₂ = 14 atomes O : 2 CO₂ (4 O) + 2 CO (2 O) + 8 H₂O (8 O) = 14 atomes O !).
 * - Combustion incomplète (O₂ < 50%, 6 O₂ disponibles = 12 atomes O) :
 *   Étape 1 : 1 CH₄ + 2 O₂ → 1 CO₂ + 2 H₂O (4 O utilisés)
 *   Étape 2 : 1 CH₄ + 1.5 O₂ ... Pour travailler uniquement avec des nombres entiers de molécules O₂ :
 *   Prenons un échantillon de 4 CH₄ :
 *   - En régime complet (8 O₂ = 16 O) :
 *     k=1: +1 CO₂, +2 H₂O (-2 O₂)
 *     k=2: +1 CO₂, +2 H₂O (-2 O₂)
 *     k=3: +1 CO₂, +2 H₂O (-2 O₂)
 *     k=4: +1 CO₂, +2 H₂O (-2 O₂)
 *     Total à k=4 : 4 CO₂ + 8 H₂O (0 O₂ restant, 16 O = 4×2 + 8×1).
 *   - En régime de transition (7 O₂ = 14 O) :
 *     k=1: +1 CO₂, +2 H₂O (-2 O₂)
 *     k=2: +1 CO₂, +2 H₂O (-2 O₂)
 *     k=3..4 (paire): 2 CH₄ + 3 O₂ → 2 CO + 4 H₂O (-3 O₂)
 *   - En régime incomplet (6 O₂ = 12 O) :
 *     k=1: 1 CH₄ + 2 O₂ → 1 CO₂ + 2 H₂O (-2 O₂, 4 O)
 *     k=2..3: 2 CH₄ + 3 O₂ → 2 CO + 4 H₂O (-3 O₂, 6 O)
 *     k=4: 1 CH₄ + 1 O₂ → 1 C (suie) + 2 H₂O (-1 O₂, 2 O)
 *     Total à k=4 : 1 CO₂ + 2 CO + 1 C + 8 H₂O !
 *     Vérification atomique stricte à k=4 :
 *     - Carbone : 1 (dans CO₂) + 2 (dans CO) + 1 (dans C) = 4 atomes C !
 *     - Hydrogène : 8 × 2 (dans H₂O) = 16 atomes H !
 *     - Oxygène : 1×2 (CO₂) + 2×1 (CO) + 8×1 (H₂O) = 2 + 2 + 8 = 12 atomes O = 6 molécules O₂ !
 */
export const completeIncompleteCombustionModel: SimulationScientificModel<
  CombustionMetrics,
  CombustionParams
> = {
  nominalDurationSeconds: 10,
  parameters: COMBUSTION_PARAMETERS,

  getInitialParameters(): CombustionParams {
    return {
      oxygenSupplyPercent: 100,
    };
  },

  getInitialMetrics(params?: CombustionParams): CombustionMetrics {
    const oxygenSupplyPercent = params?.oxygenSupplyPercent ?? 100;
    const regime = getCombustionRegime(oxygenSupplyPercent);
    const o2InitialMicro = regime === 'complete' ? 8 : regime === 'transition' ? 7 : 6;

    return {
      oxygenSupplyPercent,
      regime,
      co2Produced: 0,
      h2oProduced: 0,
      coProduced: 0,
      carbonSootProduced: 0,
      coPpm: 0,
      limewaterTurbidityPercent: 0,
      sootDepositPercent: 0,
      ch4Remaining: 4,
      o2Remaining: o2InitialMicro,
      o2InitialMicro,
      co2MicroCount: 0,
      h2oMicroCount: 0,
      coMicroCount: 0,
      cMicroCount: 0,
      isBurning: false,
    };
  },

  computeMetricsAtProgress(
    rawProgress: number,
    params?: CombustionParams
  ): CombustionMetrics {
    const progress = clampProgress(rawProgress);
    const oxygenSupplyPercent = params?.oxygenSupplyPercent ?? 100;
    const regime = getCombustionRegime(oxygenSupplyPercent);

    if (progress === 0) {
      return this.getInitialMetrics({ oxygenSupplyPercent });
    }

    // 1. Grandeurs continues macroscopiques (proportionnelles à progress)
    // Fraction de complétude alpha dans [0, 1] basée sur oxygenSupplyPercent
    const completenessFactor = Math.min(
      1,
      Math.max(0, (oxygenSupplyPercent - 20) / 60)
    );
    const incompletenessFactor = 1 - completenessFactor;

    const h2oProduced = Number((progress * 80).toFixed(1));
    const co2Produced = Number(
      (progress * (10 + 30 * completenessFactor)).toFixed(1)
    );
    const coProduced = Number((progress * 20 * incompletenessFactor).toFixed(1));
    const carbonSootProduced = Number(
      (progress * 10 * incompletenessFactor).toFixed(1)
    );

    const coPpm = Math.round(progress * 400 * incompletenessFactor);
    const limewaterTurbidityPercent = Math.min(
      100,
      Math.round((co2Produced / 40) * 100)
    );
    const sootDepositPercent = Math.min(
      100,
      Math.round((carbonSootProduced / 10) * 100)
    );

    // 2. Modèle microscopique discret (par paliers conservant strictement les atomes C, H et O)
    // 2 paliers discrets : palier 1 (progress >= 0.35 -> 2 CH₄ réagissent), palier 2 (progress >= 0.8 -> 4 CH₄ réagissent)
    const stage = progress >= 0.8 ? 2 : progress >= 0.35 ? 1 : 0;

    let o2InitialMicro = 8;
    let ch4Remaining = 4;
    let o2Remaining = 8;
    let co2MicroCount = 0;
    let h2oMicroCount = 0;
    let coMicroCount = 0;
    let cMicroCount = 0;

    if (regime === 'complete') {
      o2InitialMicro = 8;
      if (stage === 1) {
        // 2 CH₄ + 4 O₂ → 2 CO₂ + 4 H₂O
        ch4Remaining = 2;
        o2Remaining = 4;
        co2MicroCount = 2;
        h2oMicroCount = 4;
      } else if (stage === 2) {
        // 4 CH₄ + 8 O₂ → 4 CO₂ + 8 H₂O
        ch4Remaining = 0;
        o2Remaining = 0;
        co2MicroCount = 4;
        h2oMicroCount = 8;
      }
    } else if (regime === 'transition') {
      o2InitialMicro = 7;
      if (stage === 1) {
        // 2 CH₄ + 4 O₂ → 2 CO₂ + 4 H₂O
        ch4Remaining = 2;
        o2Remaining = 3;
        co2MicroCount = 2;
        h2oMicroCount = 4;
      } else if (stage === 2) {
        // + 2 CH₄ + 3 O₂ → 2 CO + 4 H₂O
        ch4Remaining = 0;
        o2Remaining = 0;
        co2MicroCount = 2;
        coMicroCount = 2;
        h2oMicroCount = 8;
      }
    } else {
      // regime === 'incomplete' (6 O₂ = 12 atomes O disponibles)
      o2InitialMicro = 6;
      if (stage === 1) {
        // 2 CH₄ + 3 O₂ → 1 CO₂ + 1 C + 4 H₂O (6 atomes O utilisés)
        ch4Remaining = 2;
        o2Remaining = 3;
        co2MicroCount = 1;
        cMicroCount = 1;
        h2oMicroCount = 4;
      } else if (stage === 2) {
        // + 2 CH₄ + 3 O₂ → 2 CO + 4 H₂O (6 atomes O utilisés)
        // Bilan total : 1 CO₂ + 2 CO + 1 C + 8 H₂O
        ch4Remaining = 0;
        o2Remaining = 0;
        co2MicroCount = 1;
        coMicroCount = 2;
        cMicroCount = 1;
        h2oMicroCount = 8;
      } else {
        o2Remaining = 6;
      }
    }

    return {
      oxygenSupplyPercent,
      regime,
      co2Produced,
      h2oProduced,
      coProduced,
      carbonSootProduced,
      coPpm,
      limewaterTurbidityPercent,
      sootDepositPercent,
      ch4Remaining,
      o2Remaining,
      o2InitialMicro,
      co2MicroCount,
      h2oMicroCount,
      coMicroCount,
      cMicroCount,
      isBurning: progress > 0 && progress < 1,
    };
  },

  extractHistoryValues(metrics: CombustionMetrics): Record<string, number> {
    return {
      CO2: metrics.co2Produced,
      Imbrules: Number((metrics.coProduced + metrics.carbonSootProduced).toFixed(1)),
    };
  },

  validateInvariants(
    metrics: CombustionMetrics,
    progress: number,
    params?: CombustionParams
  ): boolean {
    const clamped = clampProgress(progress);
    const oxygen = params?.oxygenSupplyPercent ?? metrics.oxygenSupplyPercent;

    if (clamped === 0) {
      return (
        metrics.co2Produced === 0 &&
        metrics.h2oProduced === 0 &&
        metrics.coProduced === 0 &&
        metrics.carbonSootProduced === 0 &&
        metrics.ch4Remaining === 4
      );
    }

    // 1. Conservation stricte des atomes dans le modèle microscopique :
    // Total C = 4, Total H = 16, Total O = 2 * o2InitialMicro
    const totalC =
      metrics.ch4Remaining +
      metrics.co2MicroCount +
      metrics.coMicroCount +
      metrics.cMicroCount;
    const totalH = 4 * metrics.ch4Remaining + 2 * metrics.h2oMicroCount;
    const totalO =
      2 * metrics.o2Remaining +
      2 * metrics.co2MicroCount +
      1 * metrics.coMicroCount +
      1 * metrics.h2oMicroCount;

    const isAtomConservationExact =
      totalC === 4 && totalH === 16 && totalO === 2 * metrics.o2InitialMicro;

    // 2. Cohérence chimique du régime :
    // Si O₂ >= 80% (combustion complète), aucun CO ni carbone C ne doit être formé
    const isRegimeCoherent =
      oxygen >= 80
        ? metrics.coProduced === 0 &&
          metrics.carbonSootProduced === 0 &&
          metrics.coMicroCount === 0 &&
          metrics.cMicroCount === 0
        : metrics.coProduced > 0 && metrics.carbonSootProduced > 0;

    return isAtomConservationExact && isRegimeCoherent;
  },
};

export const completeIncompleteCombustionPedagogy: SimulationPedagogicalContent = {
  titleArabic:
    'محاكاة تفاعلية : الاحتراق التام والاحتراق غير التام للفحم الهيدروجيني',
  titleFrench:
    'Simulation interactive · Combustion complète et incomplète d’un hydrocarbure',
  category: 'parameter-sim',
  levelBadge: 'السنة الثالثة متوسط — 3AM · الدرس 04',
  objectiveArabic:
    'التحكم في فتحة دخول الهواء (وفرة ثنائي الأكسجين O₂) في الموقد، وملاحظة أثرها المباشر على لون اللهب، النواتج المتشكلة (CO₂ و H₂O مقابل CO السام والسخام C)، وانحفاظ الذرات.',
  macroscopicWarningArabic:
    'المستوى العياني : راقب تغير لون اللهب (أزرق نظيف أم أصفر مدخن)، تعكر ماء الجير، تلون كبريتات النحاس اللامائية، ظهور السخام الأسود (C)، وإنذار كاشف أحادي أكسيد الكربون (CO).',
  microscopicWarningArabic:
    'تنبيه علمي مهم : التمثيل الجزيئي أدناه هو نموذج تفسيري مبسط لـ 4 جزيئات من الفحم الهيدروجيني (CH₄) يوضح كيف يؤدي نقص جزيئات O₂ إلى عدم تحول كل ذرات الكربون إلى CO₂، فتظهر جزيئات CO وذرات الكربون C مع بقاء عدد الذرات محفوظًا.',
  scientificSteps: [
    { step: 1, ar: '1. اضبط فتحة الهواء (O₂)', fr: 'Paramétrer O₂' },
    { step: 2, ar: '2. شغّل ولاحظ اللهب', fr: 'Observer la flamme' },
    { step: 3, ar: '3. اكشف عن النواتج', fr: 'Tester CO₂/H₂O/CO/C' },
    { step: 3, ar: '4. قارن الحالتين', fr: 'Complète vs Incomplète' },
    { step: 4, ar: '5. استنتج دور O₂', fr: 'Conclure' },
  ],
  controlLabels: {
    startArabic: 'إشعال الموقد (Démarrer la combustion)',
    progressLabelArabic:
      'تقدم الاحتراق في الزمن (يمكنك تغيير وفرة O₂ في الأعلى في أي لحظة للمقارنة) :',
    progressAriaLabel: 'شريط تقدم الاحتراق',
  },
  equationLtr: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O',
  keyRelationBadgeLtr: 'O₂ suffisant → CO₂ + H₂O | O₂ insuffisant → CO + C + CO₂ + H₂O',

  dynamicObservations: [
    {
      id: 'obs-c04-init',
      minProgress: 0,
      titleArabic: 'الحالة الابتدائية : ضبط فتحة دخول الهواء (ثنائي الأكسجين O₂)',
      titleFrench: 'État initial : Réglage de l’admission d’air (O₂)',
      descriptionArabic:
        'قبل إشعال الموقد، اختر وفرة ثنائي الأكسجين (O₂) من لوحة العوامل العلمية: فتحة مفتوحة (100% — هواء وفير) أو فتحة شبه مغلقة (30% — هواء قليل)، ثم اضغط على «إشعال الموقد».',
      scientificFormula: 'Hydrocarbure (C, H) + Dioxygène (O₂) ⟶ ?',
    },
    {
      id: 'obs-c04-flame',
      minProgress: 0.05,
      titleArabic: 'ملاحظة مظهر ولون اللهب بحسب وفرة ثنائي الأكسجين (O₂)',
      titleFrench: 'Observation de la couleur de la flamme (Bleue vs Jaune)',
      descriptionArabic:
        'عندما يكون O₂ وفيرًا (100%) يكون اللهب أزرق صافٍ وشديد الحرارة؛ أما عند خفض O₂ (30%) فيتحول اللهب إلى أصفر/برتقالي مضيء بسبب توهج دقائق الكربون الصلبة غير المحترقة.',
      scientificFormula: 'O₂ وفير ⟶ لهب أزرق   |   O₂ قليل ⟶ لهب أصفر',
    },
    {
      id: 'obs-c04-tests',
      minProgress: 0.35,
      titleArabic: 'الكشف التجريبي عن النواتج المتشكلة',
      titleFrench: 'Tests d’identification des produits formés',
      descriptionArabic:
        'في الحالتين يتشكل بخار الماء H₂O (تتلون كبريتات النحاس اللامائية بالأزرق) ويتعكر ماء الجير بوجود CO₂. لكن في حالة نقص O₂ يترسب السخام الأسود (C) على قعر الإناء وينطلق غاز أحادي أكسيد الكربون السام (CO)!',
      scientificFormula: 'H₂O (CuSO₄ bleu) + CO₂ (Eau de chaux trouble) [+ CO + C si O₂ insuffisant]',
    },
    {
      id: 'obs-c04-complete',
      minProgress: 0.8,
      titleArabic: 'المقارنة النهائية وانحفاظ الذرات (C, H, O)',
      titleFrench: 'Bilan final et conservation des atomes',
      descriptionArabic:
        'كمية ثنائي الأكسجين (O₂) المتاحة هي العامل الحاسم الذي يوجه التفاعل: في الاحتراق التام تتحول كل ذرات الكربون إلى CO₂، بينما في الاحتراق غير التام لا يكفي الأكسجين فينتج CO السام والكربون C.',
      scientificFormula: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O (احتراق تام)',
    },
  ],

  guidedQuestions: [
    {
      id: 'gq-c04-1',
      number: 1,
      questionArabic:
        'اضبط وفرة ثنائي الأكسجين على 100% (هواء وفير) وشغّل الموقد: ما لون اللهب وما النواتج المتشكلة؟',
      questionFrench:
        '1. Avec 100% de O₂ (air abondant), quelle est la couleur de la flamme et quels sont les produits ?',
      targetProgress: 0.85,
      targetParams: { oxygenSupplyPercent: 100 },
      observationHintArabic:
        'اضغط على زر «معاينة هذه المرحلة» لضبط O₂ على 100% وراقب لون اللهب، ماء الجير، كبريتات النحاس، وكاشف CO.',
      answerArabic:
        'عندما يكون ثنائي الأكسجين وفيرًا (100%) يكون اللهب أزرق، ويتشكل ناتجان فقط هما: ثنائي أكسيد الكربون (CO₂ الذي يعكر ماء الجير) والماء (H₂O)، ولا يتشكل لا سخام (0 C) ولا غاز سام (0 ppm CO). هذا احتراق تام.',
      formulaLtr: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O',
    },
    {
      id: 'gq-c04-2',
      number: 2,
      questionArabic:
        'اخفض الآن وفرة ثنائي الأكسجين إلى 30% (فتحة الهواء شبه مغلقة): ماذا يحدث للون اللهب ولقعر الإناء؟',
      questionFrench:
        '2. En réduisant O₂ à 30% (virole quasi fermée), que se passe-t-il pour la flamme et la soucoupe ?',
      targetProgress: 0.85,
      targetParams: { oxygenSupplyPercent: 30 },
      observationHintArabic:
        'اضغط على «معاينة هذه المرحلة» لضبط O₂ على 30% ولاحظ تغير اللهب والطبقة المترسبة على الإناء.',
      answerArabic:
        'يصبح اللهب أصفر/برتقاليًا وأقل حرارة، وتترسب طبقة سوداء من الكربون (السخام / هباب الفحم C) على قعر الإناء مع انطلاق إنذار غاز أحادي أكسيد الكربون السام (CO). هذا احتراق غير تام.',
      formulaLtr: 'Hydrocarbure + O₂ (insuffisant) → CO + C + CO₂ + H₂O',
    },
    {
      id: 'gq-c04-3',
      number: 3,
      questionArabic:
        'انتقل إلى المستوى المجهري المبسط (Micro) عند 30% من O₂: لماذا ظهر الكربون (C) وأحادي أكسيد الكربون (CO)؟',
      questionFrench:
        '3. Au niveau microscopique (30% O₂), pourquoi CO et C apparaissent-ils ?',
      targetProgress: 0.85,
      targetParams: { oxygenSupplyPercent: 30 },
      observationHintArabic:
        'قارن عدد ذرات الأكسجين (O) المتوفرة في المتفاعلات بعدد ذرات الكربون (C) والهيدروجين (H).',
      answerArabic:
        'لأن عدد جزيئات ثنائي الأكسجين (O₂) غير كافٍ لتزويد كل ذرة كربون بذرتي أكسجين لتكوين CO₂؛ فتكتفي بعض ذرات الكربون بذرة أكسجين واحدة مكونةً غاز CO السام، وتبقى ذرات كربون أخرى دون أكسجين فتترسب على شكل فحم أسود (C).',
      formulaLtr: '4 CH₄ + 6 O₂ → 1 CO₂ + 2 CO + 1 C + 8 H₂O',
    },
    {
      id: 'gq-c04-4',
      number: 4,
      questionArabic:
        'لماذا يشكل الاحتراق غير التام خطرًا قاتلًا في المنازل خلال فصل الشتاء؟ وكيف نتجنبه؟',
      questionFrench:
        '4. Pourquoi la combustion incomplète est-elle mortelle et comment la prévenir ?',
      targetProgress: 1.0,
      targetParams: { oxygenSupplyPercent: 30 },
      observationHintArabic:
        'انظر إلى شاشة كاشف غاز CO في المحاكاة وخصائص هذا الغاز.',
      answerArabic:
        'لأنه ينتج غاز أحادي أكسيد الكربون (CO)، وهو غاز سام جدًا وعديم اللون والرائحة والطعم يسبب الاختناق والموت؛ ولتجنبه يجب ضمان التهوية الجيدة للمنزل وصيانة مداخن ومواقد التدفئة ليظل الاحتراق تامًا (لهب أزرق).',
      formulaLtr: 'CO = Monoxyde de carbone (Gaz toxique inodore et incolore)',
    },
    {
      id: 'gq-c04-5',
      number: 5,
      questionArabic:
        'ما الاستنتاج العلمي العام حول العامل المتحكم في طبيعة احتراق الفحم الهيدروجيني؟',
      questionFrench:
        '5. Quelle conclusion scientifique générale tire-t-on sur le facteur gouvernant la combustion ?',
      targetProgress: 1.0,
      targetParams: { oxygenSupplyPercent: 100 },
      observationHintArabic:
        'اربط بين وفرة ثنائي الأكسجين (O₂) ونوع الاحتراق ونواتجه.',
      answerArabic:
        'تتوقف طبيعة احتراق الفحم الهيدروجيني على وفرة ثنائي الأكسجين (O₂): فإذا كان كافيًا كان الاحتراق تامًا (ينتج CO₂ و H₂O فقط)، وإذا كان غير كافٍ كان الاحتراق غير تام (ينتج CO السام والسخام C بالإضافة إلى CO₂ و H₂O).',
      formulaLtr: 'Facteur déterminant : Disponibilité du dioxygène (O₂)',
    },
  ],

  conclusionArabic: [
    'يتوقف نوع احتراق الفحم الهيدروجيني على كمية (وفرة) غاز ثنائي الأكسجين (O₂) المتاحة.',
    'الاحتراق التام (وفرة O₂) : يتميز بلهب أزرق وينتج عنه فقط غاز ثنائي أكسيد الكربون (CO₂) والماء (H₂O).',
    'الاحتراق غير التام (نقص O₂) : يتميز بلهب أصفر وينتج عنه، بالإضافة إلى الماء و CO₂، الكربون الأسود (السخام C) وغاز أحادي أكسيد الكربون السام (CO).',
  ],

  conclusionFormulasLtr: [
    'O₂ suffisant (Complète) : CH₄ + 2 O₂ → CO₂ + 2 H₂O',
    'O₂ insuffisant (Incomplète) → CO (toxique) + C (suie) + CO₂ + H₂O',
  ],

  fallback: {
    titleArabic: 'مقارنة الاحتراق التام والاحتراق غير التام للفحم الهيدروجيني',
    titleFrench: 'Combustion complète et incomplète d’un hydrocarbure',
    equationLtr: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O',
    keyValues: [
      { labelArabic: 'احتراق تام (وفرة O₂)', valueLtr: 'Flamme bleue → CO₂ + H₂O' },
      { labelArabic: 'احتراق غير تام (نقص O₂)', valueLtr: 'Flamme jaune → CO + C + CO₂ + H₂O' },
      { labelArabic: 'الوقاية', valueLtr: 'Aération suffisante (Éviter CO)' },
    ],
    shortExplanationArabic:
      'عند وفرة ثنائي الأكسجين يحترق الفحم الهيدروجيني احتراقًا تامًا بلهب أزرق منتجًا CO₂ والماء، وعند نقص ثنائي الأكسجين يصبح الاحتراق غير تام بلهب أصفر وينتج غاز CO السام والسخام C.',
    staticSchemaType: 'c04-complete-vs-incomplete',
  },
};

export const completeIncompleteCombustionPedagogicalContent =
  completeIncompleteCombustionPedagogy;

