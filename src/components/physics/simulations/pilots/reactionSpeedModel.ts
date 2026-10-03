import {
  PhysicsSimulationParameter,
  SimulationPedagogicalContent,
  SimulationScientificModel,
} from '../types';
import { clampProgress } from '../useSimulationEngine';

export interface ReactionSpeedParams extends Record<string, number> {
  /** Température du milieu réactionnel en °C (10 °C à 60 °C) */
  temperatureCelsius: number;
  /** Facteur de division du réactif solide (1 = comprimé entier, 2 = fragments, 4 = poudre fine) */
  surfaceDivisionFactor: number;
}

export interface ReactionSpeedMetrics {
  /** Température active (°C) */
  temperatureCelsius: number;
  /** Facteur de surface de contact actif (1, 2 ou 4) */
  surfaceDivisionFactor: number;
  /** Multiplicateur de vitesse cinétique globale par rapport à l'état de référence (25 °C, comprimé ×1) */
  relativeSpeedMultiplier: number;
  /** Avancement de la réaction active (0 → 100 %) */
  advancementPercent: number;
  /** Avancement de la réaction témoin de référence (25 °C, comprimé ×1) (0 → 100 %) */
  referenceAdvancementPercent: number;
  /** Pourcentage de masse solide restante à dissoudre/réagir (100 → 0 %) */
  solidRemainingPercent: number;
  /** Volume de gaz dégagé dans l'expérience active (0 → 60 mL) */
  gasVolumeMl: number;
  /** Volume de gaz dégagé dans l'expérience témoin (0 → 60 mL) */
  referenceGasVolumeMl: number;
  /** Indice d'agitation thermique microscopique des particules (en % par rapport à 25 °C) */
  thermalAgitationIndex: number;
  /** Fréquence des chocs efficaces (التصادمات الفعالة / ثانية) */
  effectiveCollisionsPerSec: number;
  /** Durée estimée pour atteindre la fin de la réaction (en secondes) */
  estimatedCompletionSeconds: number;
  /** Indique si la réaction est en cours */
  isReacting: boolean;
}

export const REACTION_SPEED_PARAMETERS: PhysicsSimulationParameter[] = [
  {
    id: 'temperatureCelsius',
    labelArabic: 'العامل (1) : درجة حرارة الماء (Température du milieu)',
    labelFrench: 'Température T (°C) → Agitation thermique',
    unit: '°C',
    min: 10,
    max: 60,
    step: 5,
    defaultValue: 25,
    presets: [
      {
        value: 10,
        labelArabic: 'ماء بارد (10 °C)',
        labelFrench: '10 °C · Lent',
      },
      {
        value: 25,
        labelArabic: 'ماء معتدل مرجعي (25 °C)',
        labelFrench: '25 °C · Référence',
      },
      {
        value: 50,
        labelArabic: 'ماء ساخن (50 °C)',
        labelFrench: '50 °C · Rapide',
      },
    ],
  },
  {
    id: 'surfaceDivisionFactor',
    labelArabic: 'العامل (2) : سطح التلامس وتجزئة المتفاعل الصلب (Surface de contact)',
    labelFrench: 'État de division du solide → Particules exposées',
    unit: '×',
    min: 1,
    max: 4,
    step: 1,
    defaultValue: 1,
    presetsOnly: true,
    presets: [
      {
        value: 1,
        labelArabic: 'قرص كامل متماسك (Comprimé entier)',
        labelFrench: 'Surface ×1',
      },
      {
        value: 2,
        labelArabic: 'قرص مجزأ إلى قطع (Fragmenté)',
        labelFrench: 'Surface ×2',
      },
      {
        value: 4,
        labelArabic: 'مسحوق ناعم (Poudre fine)',
        labelFrench: 'Surface ×4',
      },
    ],
  },
];

/**
 * Calcule le facteur cinétique thermique f_T (égal à 1.00 pour T = 25 °C).
 */
export function computeThermalFactor(temperatureCelsius: number): number {
  const clampedT = Math.max(10, Math.min(60, temperatureCelsius));
  // Loi monotone croissante : 0.45 à 10°C, 1.00 à 25°C, ~1.92 à 50°C
  return Number((0.45 + ((clampedT - 10) / 15) * 0.55).toFixed(3));
}

/**
 * Calcule le facteur cinétique lié à la surface de contact f_S (égal à 1.00 pour comprimé entier ×1).
 */
export function computeSurfaceFactor(surfaceDivisionFactor: number): number {
  if (surfaceDivisionFactor >= 4) return 2.2;
  if (surfaceDivisionFactor >= 2) return 1.5;
  return 1.0;
}

/**
 * Calcule l'avancement normalisé (0 à 100 %) selon une loi cinétique déterministe monotone
 * qui atteint 100 % à progress = 1 pour le cas de référence (k = 1).
 */
export function computeKineticAdvancementPercent(
  progress: number,
  rateMultiplier: number
): number {
  const p = clampProgress(progress);
  if (p <= 0) return 0;
  const k = Math.max(0.2, rateMultiplier);
  const effectiveProgress = Math.min(1, p * k);
  // Courbe cinétique réaliste (rapide au début, ralentissant à l'approche de l'épuisement du réactif)
  const raw = 1 - Math.pow(1 - effectiveProgress, 1.65);
  return Number((raw * 100).toFixed(1));
}

/**
 * Modèle scientifique pur et déterministe du Cours 06 :
 * « العوامل المؤثرة في التفاعل الكيميائي — Facteurs cinétiques (Température & Surface de contact) »
 */
export const reactionSpeedScientificModel: SimulationScientificModel<
  ReactionSpeedMetrics,
  ReactionSpeedParams
> = {
  nominalDurationSeconds: 12,
  parameters: REACTION_SPEED_PARAMETERS,

  getInitialParameters(): ReactionSpeedParams {
    return {
      temperatureCelsius: 25,
      surfaceDivisionFactor: 1,
    };
  },

  getInitialMetrics(params?: ReactionSpeedParams): ReactionSpeedMetrics {
    const temperatureCelsius = params?.temperatureCelsius ?? 25;
    const surfaceDivisionFactor = params?.surfaceDivisionFactor ?? 1;
    const fT = computeThermalFactor(temperatureCelsius);
    const fS = computeSurfaceFactor(surfaceDivisionFactor);
    const relativeSpeedMultiplier = Number((fT * fS).toFixed(2));
    const thermalAgitationIndex = Math.round(fT * 100);
    const effectiveCollisionsPerSec = Math.round(12 * relativeSpeedMultiplier);
    const estimatedCompletionSeconds = Number(
      (12 / relativeSpeedMultiplier).toFixed(1)
    );

    return {
      temperatureCelsius,
      surfaceDivisionFactor,
      relativeSpeedMultiplier,
      advancementPercent: 0,
      referenceAdvancementPercent: 0,
      solidRemainingPercent: 100,
      gasVolumeMl: 0,
      referenceGasVolumeMl: 0,
      thermalAgitationIndex,
      effectiveCollisionsPerSec,
      estimatedCompletionSeconds,
      isReacting: false,
    };
  },

  computeMetricsAtProgress(
    rawProgress: number,
    params?: ReactionSpeedParams
  ): ReactionSpeedMetrics {
    const progress = clampProgress(rawProgress);
    const temperatureCelsius = params?.temperatureCelsius ?? 25;
    const surfaceDivisionFactor = params?.surfaceDivisionFactor ?? 1;

    if (progress === 0) {
      return this.getInitialMetrics({
        temperatureCelsius,
        surfaceDivisionFactor,
      });
    }

    const fT = computeThermalFactor(temperatureCelsius);
    const fS = computeSurfaceFactor(surfaceDivisionFactor);
    const relativeSpeedMultiplier = Number((fT * fS).toFixed(2));

    const advancementPercent = computeKineticAdvancementPercent(
      progress,
      relativeSpeedMultiplier
    );
    const referenceAdvancementPercent = computeKineticAdvancementPercent(
      progress,
      1.0
    );

    const solidRemainingPercent = Number(
      Math.max(0, 100 - advancementPercent).toFixed(1)
    );

    // Volume maximal de gaz CO₂ dégagé à 100 % d'avancement = 60 mL
    const gasVolumeMl = Number(((advancementPercent / 100) * 60).toFixed(1));
    const referenceGasVolumeMl = Number(
      ((referenceAdvancementPercent / 100) * 60).toFixed(1)
    );

    const thermalAgitationIndex = Math.round(fT * 100);
    const effectiveCollisionsPerSec = Math.round(
      12 * relativeSpeedMultiplier
    );

    const estimatedCompletionSeconds = Number(
      (12 / relativeSpeedMultiplier).toFixed(1)
    );

    return {
      temperatureCelsius,
      surfaceDivisionFactor,
      relativeSpeedMultiplier,
      advancementPercent,
      referenceAdvancementPercent,
      solidRemainingPercent,
      gasVolumeMl,
      referenceGasVolumeMl,
      thermalAgitationIndex,
      effectiveCollisionsPerSec,
      estimatedCompletionSeconds,
      isReacting: solidRemainingPercent > 0,
    };
  },

  validateInvariants(
    metrics: ReactionSpeedMetrics,
    progress: number
  ): boolean {
    const clamped = clampProgress(progress);
    // 1. Conservation du réactif : avancement (%) + solide restant (%) = 100 %
    const sumPercent = metrics.advancementPercent + metrics.solidRemainingPercent;
    if (Math.abs(sumPercent - 100) > 0.25) return false;

    // 2. Bornes physiques
    if (metrics.advancementPercent < 0 || metrics.advancementPercent > 100) {
      return false;
    }
    if (metrics.gasVolumeMl < 0 || metrics.gasVolumeMl > 60.1) {
      return false;
    }
    if (metrics.relativeSpeedMultiplier <= 0) {
      return false;
    }

    // 3. Cohérence de l'état initial
    if (clamped === 0) {
      if (metrics.advancementPercent !== 0 || metrics.solidRemainingPercent !== 100) {
        return false;
      }
    }

    // 4. Proportionnalité stricte volume de gaz / avancement
    const expectedGas = Number(((metrics.advancementPercent / 100) * 60).toFixed(1));
    if (Math.abs(metrics.gasVolumeMl - expectedGas) > 0.2) {
      return false;
    }

    return true;
  },

  extractHistoryValues(metrics: ReactionSpeedMetrics): Record<string, number> {
    return {
      Active: metrics.advancementPercent,
      Reference: metrics.referenceAdvancementPercent,
      GasMl: metrics.gasVolumeMl,
    };
  },
};

/**
 * Contenu pédagogique structuré du Cours 06 : العوامل المؤثرة في التفاعل الكيميائي
 */
export const reactionSpeedPedagogicalContent: SimulationPedagogicalContent = {
  titleArabic:
    'محاكاة تفاعلية : تأثير درجة الحرارة وسطح التلامس على سرعة التفاعل الكيميائي',
  titleFrench:
    'Facteurs cinétiques : Température (T) & Surface de contact (Chocs efficaces)',
  category: 'parameter-sim',
  levelBadge: '3AM · الميدان 01 : المادة وتحولاتها · الدرس 06',
  objectiveArabic:
    'غير درجة حرارة الماء (10°C، 25°C، 50°C) وحالة تجزئة القرص الفوار (قرص كامل، مجزأ، مسحوق)، ثم راقب حركة الجسيمات، عدد التصادمات الفعالة في الثانية، ومنحنى تقدم التفاعل مقارنة بالتجربة الشاهدة.',
  macroscopicWarningArabic:
    'تنبيه علمي : رفع درجة الحرارة أو سحق المتفاعل الصلب إلى مسحوق يسرّع التفاعل الكيميائي (يقلل مدته الزمنية)، لكنه لا يغير كمية النواتج النهائية عند استهلاك نفس الكتلة.',
  microscopicWarningArabic:
    'ملاحظة على النموذج المجهري : تزداد سرعة التفاعل الكيميائي كلما زاد عدد «التصادمات الفعالة (Chocs efficaces)» في الثانية الواحدة بين جسيمات المتفاعلات.',
  supportedRepresentations: ['macroscopic', 'microscopic', 'both'],
  scientificSteps: [
    { step: 1, ar: '1. اضبط T وسطح التلامس', fr: '1. Régler T & Surface' },
    { step: 2, ar: '2. راقب الفوران والتصادمات', fr: '2. Observer chocs' },
    { step: 3, ar: '3. قِس زمن التفاعل', fr: '3. Mesurer durée' },
    { step: 4, ar: '4. قارن بالمنحنى الشاهد', fr: '4. Comparer courbes' },
    { step: 5, ar: '5. استنتج دور العاملين', fr: '5. Conclure' },
  ],
  controlLabels: {
    startArabic: 'بدء التفاعل الكيميائي (Démarrer)',
    progressLabelArabic: 'تقدم الزمن التجريبي ومقارنة التفاعل مع الكأس الشاهد',
    progressAriaLabel: 'شريط تقدم التفاعل الكيميائي ومقارنة العوامل الحركية',
  },
  equationLtr:
    'Température ↑ ou Surface (Poudre) ↑  ⟹  Chocs efficaces / s ↑  ⟹  Vitesse de réaction ↑',
  keyRelationBadgeLtr: 'T ↑ , Surface ↑  ⟹  Chocs efficaces ↑  ⟹  Durée ↓',
  dynamicObservations: [
    {
      id: 'obs-c06-init',
      minProgress: 0,
      titleArabic: 'الحالة الابتدائية : ضبط العوامل الحركية قبل بدء التفاعل',
      titleFrench: 'État initial (t = 0 s) : Choix des facteurs cinétiques',
      descriptionArabic:
        'اختر درجة حرارة الماء (10°C بارد، 25°C معتدل، 50°C ساخن) وحالة المتفاعل الصلب (قرص كامل ×1 أو مسحوق ناعم ×4)، ثم اضغط على «بدء التفاعل» لمقارنة تجربتك مع الكأس الشاهد (25°C، قرص كامل).',
      scientificFormula: 'État témoin : T = 25 °C , Comprimé entier (Surface ×1)',
    },
    {
      id: 'obs-c06-agitation',
      minProgress: 0.15,
      titleArabic: 'انطلاق الفوران وتأثير الاضطراب الحراري وسطح التلامس',
      titleFrench: 'Agitation thermique et fréquence des chocs efficaces',
      descriptionArabic:
        'على المستوى العياني ينطلق غاز CO₂ على شكل فقاعات؛ وعلى المستوى المجهري نلاحظ أن رفع درجة الحرارة يزيد سرعة الجسيمات، بينما سحق القرص إلى مسحوق يعرّض عددًا أكبر من الجسيمات للتصادم في نفس اللحظة.',
      scientificFormula: 'Fréquence des chocs efficaces ∝ Agitation (T) × Surface exposée (S)',
    },
    {
      id: 'obs-c06-curve',
      minProgress: 0.5,
      titleArabic: 'مقارنة منحنى التقدم مع التجربة الشاهدة',
      titleFrench: 'Comparaison cinétique des courbes d’avancement',
      descriptionArabic:
        'لاحظ في البيان أنه كلما كان العاملان أكبر (ماء ساخن 50°C أو مسحوق ×4)، كان منحنى تقدم التفاعل أشد ميلًا ووصل إلى نهاية التفاعل (100%) في مدة زمنية أقصر.',
      scientificFormula: 'Pente de la courbe x(t) ↑  ⟺  Vitesse de réaction ↑',
    },
    {
      id: 'obs-c06-final',
      minProgress: 0.95,
      titleArabic: 'نهاية التحول : نفس الحجم النهائي للغاز في زمن مختلف',
      titleFrench: 'État final : Même quantité finale mais durée différente',
      descriptionArabic:
        'عند استهلاك نفس كمية المتفاعل الصلب كليًا، نحصل على نفس الحجم النهائي من الغاز (60 mL)، لكن التفاعل السريع يبلغ هذه النهاية في ثوانٍ قليلة بينما يستغرق التفاعل البارد وقتًا أطول.',
      scientificFormula: 'V_final(CO₂) = 60 mL (identique)  |  t_final dépend de T et S',
    },
  ],
  guidedQuestions: [
    {
      id: 'gq-c06-01',
      number: 1,
      questionArabic:
        'اضبط درجة الحرارة على 50°C (ماء ساخن) مع الإبقاء على قرص كامل (×1). ماذا تلاحظ مقارنة بالكأس الشاهد (25°C)؟',
      questionFrench: 'Quel est l’effet d’une élévation de température (50 °C vs 25 °C) ?',
      targetProgress: 0.5,
      targetParams: { temperatureCelsius: 50, surfaceDivisionFactor: 1 },
      observationHintArabic:
        'راقب شدة الفوران في الكأسين، وسرعة حركة الجسيمات في النافذة المجهرية، وعدد التصادمات الفعالة في الثانية.',
      answerArabic:
        'في الماء الساخن (50°C) يكون الفوران أشد ويختفي القرص أسرع؛ لأن ارتفاع درجة الحرارة يزيد من الاضطراب الحراري للجسيمات فيرتفع عدد التصادمات الفعالة في الثانية.',
      formulaLtr: 'Température T ↑  ⟹  Agitation thermique ↑  ⟹  Chocs efficaces ↑',
    },
    {
      id: 'gq-c06-02',
      number: 2,
      questionArabic:
        'اضبط درجة الحرارة على 10°C (ماء بارد). كيف تتغير سرعة التفاعل والمدة اللازمة لاختفاء القرص؟',
      questionFrench: 'Que se passe-t-il dans l’eau froide (10 °C) ?',
      targetProgress: 0.5,
      targetParams: { temperatureCelsius: 10, surfaceDivisionFactor: 1 },
      observationHintArabic:
        'قارن المنحنى الأخضر (10°C) بالمنحنى المتقطع الشاهد (25°C) في الرسم البياني.',
      answerArabic:
        'عند خفض درجة الحرارة إلى 10°C، تبطؤ حركة الجسيمات ويقل عدد التصادمات الفعالة في الثانية، فتتباطأ سرعة التفاعل وتزداد مدته الزمنية (وهو مبدأ حفظ الأغذية في الثلاجة).',
      formulaLtr: 'T = 10 °C  ⟹  Agitation ↓  ⟹  Réaction lente',
    },
    {
      id: 'gq-c06-03',
      number: 3,
      questionArabic:
        'ثبّت درجة الحرارة عند 25°C، ثم غيّر حالة المتفاعل الصلب من «قرص كامل (×1)» إلى «مسحوق ناعم (×4)». ماذا تلاحظ؟',
      questionFrench: 'Quel est l’effet de la division du solide en poudre (Surface ×4) à 25 °C ?',
      targetProgress: 0.45,
      targetParams: { temperatureCelsius: 25, surfaceDivisionFactor: 4 },
      observationHintArabic:
        'لاحظ في النافذة المجهرية كيف أصبحت حبيبات المتفاعل الصلب موزعة ومعرضة للماء من كل الجهات.',
      answerArabic:
        'في حالة المسحوق الناعم (Poudre)، يحدث فوران فوري وينتهي التفاعل بسرعة كبيرة؛ لأن تجزئة المادة الصلبة زادت من «سطح التلامس (Surface de contact)» بين المتفاعلات.',
      formulaLtr: 'Poudre (Surface ×4)  ⟹  Particules exposées ↑  ⟹  Vitesse ↑',
    },
    {
      id: 'gq-c06-04',
      number: 4,
      questionArabic:
        'ماذا يحدث عندما نجمع بين العاملين معًا: ماء ساخن (50°C) + مسحوق ناعم (×4)؟',
      questionFrench: 'Que se passe-t-il en combinant T = 50 °C et Poudre fine (×4) ?',
      targetProgress: 0.35,
      targetParams: { temperatureCelsius: 50, surfaceDivisionFactor: 4 },
      observationHintArabic:
        'راقب عداد التصادمات الفعالة في الثانية والزمن المقدر لانتهاء التفاعل.',
      answerArabic:
        'تبلغ سرعة التفاعل قيمتها القصوى وينتهي التفاعل في بضع ثوانٍ فقط، لأن كلا العاملين (الحرارة العالية وسطح التلامس الكبير) يضاعفان وتيرة التصادمات الفعالة.',
      formulaLtr: 'T = 50 °C + Poudre (×4)  ⟹  Vitesse maximale (t_fin ≈ 2.8 s)',
    },
    {
      id: 'gq-c06-05',
      number: 5,
      questionArabic:
        'ما القانون العلمي الذي نستخلصه حول العوامل المؤثرة في سرعة التفاعل الكيميائي؟',
      questionFrench: 'Quelle conclusion scientifique générale peut-on formuler ?',
      targetProgress: 1.0,
      observationHintArabic:
        'اربط بين العوامل العيانية (درجة الحرارة، سطح التلامس) والتفسير المجهري (التصادمات الفعالة).',
      answerArabic:
        'تزداد سرعة التفاعل الكيميائي برفع درجة الحرارة أو بزيادة سطح التلامس (تجزئة المتفاعل الصلب)، ويفسر ذلك مجهريًا بازدياد عدد التصادمات الفعالة بين جسيمات المتفاعلات في وحدة الزمن.',
      formulaLtr: 'T ↑ , Surface ↑  ⟹  Fréquence des chocs efficaces ↑  ⟹  Vitesse ↑',
    },
  ],
  conclusionArabic: [
    'العامل الأول (درجة الحرارة Température) : رفع درجة حرارة الجملة الكيميائية يزيد من الاضطراب الحراري للجسيمات، فيزداد عدد التصادمات الفعالة في الثانية وتزداد سرعة التفاعل.',
    'العامل الثاني (سطح التلامس Surface de contact) : تجزئة المتفاعل الصلب أو سحقه إلى مسحوق يزيد من المساحة المعرضة للتفاعل، فتتصادم الجسيمات بوتيرة أكبر وتزداد سرعة التفاعل.',
    'التفسير المجهري الموحد : لكي يحدث التفاعل الكيميائي وتتفكك الروابط لتتشكل نواتج جديدة، لا بد من حدوث «تصادمات فعالة (Chocs efficaces)» بين الأفراد الكيميائية المتفاعلة.',
  ],
  conclusionFormulasLtr: [
    'Température (T) ↑  ⟹  Agitation thermique ↑  ⟹  Chocs efficaces ↑  ⟹  Vitesse ↑',
    'Surface de contact (S) ↑ (Poudre)  ⟹  Chocs efficaces ↑  ⟹  Vitesse ↑',
  ],
  fallback: {
    titleArabic: 'ملخص العوامل الحركية المؤثرة في سرعة التفاعل الكيميائي',
    titleFrench: 'Facteurs cinétiques : Température et Surface de contact',
    equationLtr: 'T ↑ ou Surface ↑  ⟹  Chocs efficaces ↑  ⟹  Vitesse de réaction ↑',
    keyValues: [
      {
        labelArabic: 'أثر رفع درجة الحرارة (T ↑)',
        valueLtr: 'Agitation thermique ↑ → Vitesse ↑',
      },
      {
        labelArabic: 'أثر تجزئة الصلب إلى مسحوق (S ↑)',
        valueLtr: 'Surface de contact ↑ → Vitesse ↑',
      },
      {
        labelArabic: 'التفسير المجهري المشترك',
        valueLtr: 'Augmentation des chocs efficaces / s',
      },
    ],
    shortExplanationArabic:
      'تزداد سرعة التفاعل الكيميائي كلما ارتفعت درجة الحرارة أو زاد سطح التلامس بين المتفاعلات (مسحوق بدل قطعة متماسكة) نتيجة ازدياد عدد التصادمات الفعالة بين الجسيمات في الثانية الواحدة.',
    staticSchemaType: 'c06-temperature-factor-micro',
  },
};
