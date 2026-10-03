import {
  PhysicsSimulationParameter,
  SimulationPedagogicalContent,
  SimulationScientificModel,
} from '../types';
import { clampProgress } from '../useSimulationEngine';

export interface EnergyBalanceParams extends Record<string, number> {
  /** Identifiant de l'appareil étudié : 1 = المصباح (30%), 2 = المحرك (70%), 3 = السخان (90%), 4 = المروحة (65%) */
  deviceType: number;
  /** Énergie électrique totale reçue par le système (en Joules : 100 J à 2000 J) */
  totalInputEnergyJoules: number;
}

export interface EnergyDeviceDescriptor {
  id: number;
  nameArabic: string;
  nameFrench: string;
  efficiencyPercent: number;
  inputFormArabic: string;
  inputFormFrench: string;
  usefulFormArabic: string;
  usefulFormFrench: string;
  dissipatedFormArabic: string;
  dissipatedFormFrench: string;
  hasSoundBranch?: boolean;
  soundShareOfInputPercent?: number;
}

export const ENERGY_DEVICES: Record<number, EnergyDeviceDescriptor> = {
  1: {
    id: 1,
    nameArabic: 'مصباح كهربائي (Lampe)',
    nameFrench: 'Lampe électrique',
    efficiencyPercent: 30,
    inputFormArabic: 'طاقة كهربائية',
    inputFormFrench: 'Énergie électrique',
    usefulFormArabic: 'طاقة ضوئية (مفيدة)',
    usefulFormFrench: 'Énergie lumineuse (utile)',
    dissipatedFormArabic: 'طاقة حرارية (منتشرة)',
    dissipatedFormFrench: 'Énergie thermique (dissipée)',
  },
  2: {
    id: 2,
    nameArabic: 'محرك كهربائي (Moteur)',
    nameFrench: 'Moteur électrique',
    efficiencyPercent: 70,
    inputFormArabic: 'طاقة كهربائية',
    inputFormFrench: 'Énergie électrique',
    usefulFormArabic: 'طاقة حركية (مفيدة)',
    usefulFormFrench: 'Énergie cinétique (utile)',
    dissipatedFormArabic: 'طاقة حرارية (منتشرة)',
    dissipatedFormFrench: 'Énergie thermique (dissipée)',
  },
  3: {
    id: 3,
    nameArabic: 'سخان كهربائي (Chauffe-eau)',
    nameFrench: 'Chauffe-eau électrique',
    efficiencyPercent: 90,
    inputFormArabic: 'طاقة كهربائية',
    inputFormFrench: 'Énergie électrique',
    usefulFormArabic: 'طاقة حرارية لتسخين الماء (مفيدة)',
    usefulFormFrench: 'Énergie thermique utile (eau)',
    dissipatedFormArabic: 'طاقة منتشرة في الجو المحيط',
    dissipatedFormFrench: 'Pertes thermiques ambiantes',
  },
  4: {
    id: 4,
    nameArabic: 'مروحة كهربائية (Ventilateur)',
    nameFrench: 'Ventilateur électrique',
    efficiencyPercent: 65,
    inputFormArabic: 'طاقة كهربائية',
    inputFormFrench: 'Énergie électrique',
    usefulFormArabic: 'طاقة حركية للهواء (مفيدة)',
    usefulFormFrench: 'Énergie cinétique (air)',
    dissipatedFormArabic: 'طاقة حرارية + طاقة صوتية (منتشرة)',
    dissipatedFormFrench: 'Thermique (25%) + Sonore (10%)',
    hasSoundBranch: true,
    soundShareOfInputPercent: 10,
  },
};

export interface EnergyBalanceMetrics {
  /** Identifiant de l'appareil actif (1..4) */
  deviceType: number;
  /** Rendement énergétique η en % (ex: 30, 70, 90, 65) */
  efficiencyPercent: number;
  /** Rendement énergétique η en valeur décimale (ex: 0.30, 0.70, 0.90, 0.65) */
  efficiencyDecimal: number;
  /** Pourcentage dissipé (100 - η) */
  dissipatedPercent: number;
  /** Énergie totale paramétrée à l'entrée (E_reçue nominale en J) */
  nominalInputJoules: number;
  /** Énergie utile totale correspondante (E_utile nominale en J) */
  nominalUsefulJoules: number;
  /** Énergie dissipée totale correspondante (E_dissipée nominale en J) */
  nominalDissipatedJoules: number;
  /** Énergie sonore dissipée (uniquement pour le ventilateur, en J) */
  nominalSoundJoules: number;
  /** Énergie thermique dissipée pure (en J) */
  nominalThermalDissipatedJoules: number;
  /** Énergie reçue transférée à l'instant t (progress * nominalInputJoules) */
  transferredInputJoules: number;
  /** Énergie utile transférée à l'instant t */
  transferredUsefulJoules: number;
  /** Énergie dissipée transférée à l'instant t */
  transferredDissipatedJoules: number;
  /** Indique si le convertisseur est en fonctionnement */
  isOperating: boolean;
}

export const ENERGY_BALANCE_PARAMETERS: PhysicsSimulationParameter[] = [
  {
    id: 'deviceType',
    labelArabic: 'الجهاز المحول للطاقة (Système convertisseur étudié)',
    labelFrench: 'Sélectionner l’appareil pour étudier son bilan énergétique',
    min: 1,
    max: 4,
    step: 1,
    defaultValue: 1,
    presetsOnly: true,
    presets: [
      {
        value: 1,
        labelArabic: 'مصباح كهربائي (η = 30%)',
        labelFrench: 'Lampe · 30%',
      },
      {
        value: 2,
        labelArabic: 'محرك كهربائي (η = 70%)',
        labelFrench: 'Moteur · 70%',
      },
      {
        value: 3,
        labelArabic: 'سخان كهربائي (η = 90%)',
        labelFrench: 'Chauffe-eau · 90%',
      },
      {
        value: 4,
        labelArabic: 'مروحة كهربائية (η = 65%)',
        labelFrench: 'Ventilateur · 65%',
      },
    ],
  },
  {
    id: 'totalInputEnergyJoules',
    labelArabic: 'الطاقة الكهربائية المستقبلة الكلية (E_reçue بالجول J)',
    labelFrench: 'Énergie reçue par le système (E_reçue en Joules)',
    unit: 'J',
    min: 100,
    max: 2000,
    step: 50,
    defaultValue: 100,
    presets: [
      {
        value: 100,
        labelArabic: '100 J (مثال المصباح)',
        labelFrench: '100 J',
      },
      {
        value: 500,
        labelArabic: '500 J (مثال المحرك)',
        labelFrench: '500 J',
      },
      {
        value: 800,
        labelArabic: '800 J (تمرين المحرك)',
        labelFrench: '800 J',
      },
      {
        value: 2000,
        labelArabic: '2000 J (نشاط السخان)',
        labelFrench: '2000 J',
      },
    ],
  },
];

export function getDeviceDescriptor(deviceType: number): EnergyDeviceDescriptor {
  const key = Math.round(deviceType);
  return ENERGY_DEVICES[key] ?? ENERGY_DEVICES[1];
}

/**
 * Modèle scientifique pur et déterministe du Cours 09 :
 * « الحصيلة الطاقوية والمردود الطاقوي — Bilan énergétique et Rendement (η) »
 *
 * Loi fondamentale vérifiée à tout instant :
 *   E_reçue = E_utile + E_dissipée
 *   η (%) = (E_utile / E_reçue) × 100
 */
export const energyBalanceScientificModel: SimulationScientificModel<
  EnergyBalanceMetrics,
  EnergyBalanceParams
> = {
  nominalDurationSeconds: 10,
  parameters: ENERGY_BALANCE_PARAMETERS,

  getInitialParameters(): EnergyBalanceParams {
    return {
      deviceType: 1,
      totalInputEnergyJoules: 100,
    };
  },

  getInitialMetrics(params?: EnergyBalanceParams): EnergyBalanceMetrics {
    return this.computeMetricsAtProgress(0, params);
  },

  computeMetricsAtProgress(
    rawProgress: number,
    params?: EnergyBalanceParams
  ): EnergyBalanceMetrics {
    const progress = clampProgress(rawProgress);
    const deviceType = params?.deviceType ?? 1;
    const descriptor = getDeviceDescriptor(deviceType);
    const nominalInputJoules = Math.max(
      100,
      Math.min(2000, params?.totalInputEnergyJoules ?? 100)
    );

    const efficiencyPercent = descriptor.efficiencyPercent;
    const efficiencyDecimal = Number((efficiencyPercent / 100).toFixed(2));
    const dissipatedPercent = 100 - efficiencyPercent;

    const nominalUsefulJoules = Number(
      ((nominalInputJoules * efficiencyPercent) / 100).toFixed(1)
    );
    const nominalDissipatedJoules = Number(
      (nominalInputJoules - nominalUsefulJoules).toFixed(1)
    );

    const soundShare = descriptor.soundShareOfInputPercent ?? 0;
    const nominalSoundJoules = descriptor.hasSoundBranch
      ? Number(((nominalInputJoules * soundShare) / 100).toFixed(1))
      : 0;
    const nominalThermalDissipatedJoules = Number(
      (nominalDissipatedJoules - nominalSoundJoules).toFixed(1)
    );

    const transferredInputJoules = Number(
      (progress * nominalInputJoules).toFixed(1)
    );
    const transferredUsefulJoules = Number(
      ((transferredInputJoules * efficiencyPercent) / 100).toFixed(1)
    );
    const transferredDissipatedJoules = Number(
      (transferredInputJoules - transferredUsefulJoules).toFixed(1)
    );

    return {
      deviceType: descriptor.id,
      efficiencyPercent,
      efficiencyDecimal,
      dissipatedPercent,
      nominalInputJoules,
      nominalUsefulJoules,
      nominalDissipatedJoules,
      nominalSoundJoules,
      nominalThermalDissipatedJoules,
      transferredInputJoules,
      transferredUsefulJoules,
      transferredDissipatedJoules,
      isOperating: progress > 0,
    };
  },

  validateInvariants(metrics: EnergyBalanceMetrics): boolean {
    // 1. Principe de conservation de l'énergie sur le bilan nominal : E_reçue = E_utile + E_dissipée
    const nominalSum =
      metrics.nominalUsefulJoules + metrics.nominalDissipatedJoules;
    if (Math.abs(nominalSum - metrics.nominalInputJoules) > 0.2) {
      return false;
    }

    // 2. Principe de conservation sur l'énergie transférée cumulée à tout instant t
    const transferredSum =
      metrics.transferredUsefulJoules + metrics.transferredDissipatedJoules;
    if (Math.abs(transferredSum - metrics.transferredInputJoules) > 0.2) {
      return false;
    }

    // 3. Conservation des sous-branches dissipées (Thermique + Sonore = Dissipée totale)
    const dissBranchesSum =
      metrics.nominalThermalDissipatedJoules + metrics.nominalSoundJoules;
    if (Math.abs(dissBranchesSum - metrics.nominalDissipatedJoules) > 0.2) {
      return false;
    }

    // 4. Bornes physiques du rendement énergétique : 0 < η < 100 %
    if (metrics.efficiencyPercent <= 0 || metrics.efficiencyPercent >= 100) {
      return false;
    }
    if (metrics.efficiencyPercent + metrics.dissipatedPercent !== 100) {
      return false;
    }

    // 5. Cohérence du calcul η = (E_utile / E_reçue) * 100
    const computedEta =
      (metrics.nominalUsefulJoules / metrics.nominalInputJoules) * 100;
    if (Math.abs(computedEta - metrics.efficiencyPercent) > 0.5) {
      return false;
    }

    return true;
  },

  extractHistoryValues(metrics: EnergyBalanceMetrics): Record<string, number> {
    return {
      InputJ: metrics.transferredInputJoules,
      UsefulJ: metrics.transferredUsefulJoules,
      DissipatedJ: metrics.transferredDissipatedJoules,
    };
  },
};

/**
 * Contenu pédagogique structuré du Cours 09 : الحصيلة الطاقوية (Le bilan énergétique)
 */
export const energyBalancePedagogicalContent: SimulationPedagogicalContent = {
  titleArabic:
    'محاكاة تفاعلية : الحصيلة الطاقوية، انحفاظ الطاقة والمردود الطاقوي (η)',
  titleFrench:
    'Bilan énergétique quantitatif (E_reçue = E_utile + E_dissipée) & Rendement η',
  category: 'energy-chain-bilan',
  levelBadge: '3AM · الميدان 02 : الطاقة · الدرس 09',
  objectiveArabic:
    'اختر الجهاز المحول للطاقة (مصباح، محرك، سخان، مروحة) واضبط كمية الطاقة الكهربائية المستقبلة (E_reçue بالجول J)، ثم تتبع تفرع الطاقة إلى طاقة مفيدة وطاقة منتشرة وتحقق من مبدأ انحفاظ الطاقة وحساب المردود η.',
  macroscopicWarningArabic:
    'قاعدة علمية ذهبية : الطاقة المنتشرة (المبددة على شكل حرارة أو صوت) لم تختفِ من الوجود، بل انتقلت إلى الوسط الخارجي؛ ويبقى المجموع محفوظًا دائمًا: E_reçue = E_utile + E_dissipée.',
  supportedRepresentations: ['macroscopic'],
  scientificSteps: [
    { step: 1, ar: '1. اختر الجهاز و E_reçue', fr: '1. Choisir appareil & E' },
    { step: 2, ar: '2. تتبع تفرع الطاقة', fr: '2. Flux utile/dissipé' },
    { step: 3, ar: '3. قِس المقادير بالجول (J)', fr: '3. Mesurer en Joules' },
    { step: 4, ar: '4. تحقق من انحفاظ الطاقة', fr: '4. Vérifier bilan' },
    { step: 5, ar: '5. احسب المردود η (%)', fr: '5. Calculer η (%)' },
  ],
  controlLabels: {
    startArabic: 'تشغيل الجهاز وتتبع التحويل (Démarrer)',
    progressLabelArabic: 'نسبة الطاقة المحولة عبر الجهاز خلال مدة التشغيل',
    progressAriaLabel: 'شريط تقدم التحويل الطاقوي وتراكم الطاقة بالجول',
  },
  equationLtr:
    'E_reçue = E_utile + E_dissipée   |   η (%) = (E_utile / E_reçue) × 100',
  keyRelationBadgeLtr: 'E_reçue = E_utile + E_dissipée',
  dynamicObservations: [
    {
      id: 'obs-c09-init',
      minProgress: 0,
      titleArabic: 'تحديد الطاقة الداخلة والطاقات الناتجة للجهاز المختار',
      titleFrench: 'Identification de l’énergie reçue et des énergies transférées',
      descriptionArabic:
        'يستقبل الجهاز المختار طاقة كهربائية (E_reçue) من المصدر، ويحولها إلى جزء مفيد يحقق الوظيفة المطلوبة (E_utile) وجزء ينتشر في الوسط الخارجي (E_dissipée).',
      scientificFormula: 'E_reçue (J) ⟶ [Système] ⟶ E_utile (J) + E_dissipée (J)',
    },
    {
      id: 'obs-c09-flow',
      minProgress: 0.2,
      titleArabic: 'تناسب عرض أسهم التدفق مع كميات الطاقة بالجول (J)',
      titleFrench: 'Proportionnalité des flux d’énergie (Diagramme de bilan)',
      descriptionArabic:
        'لاحظ في مخطط الحصيلة الطاقوية أن سمك السهم الأخضر (الطاقة المفيدة) وسمك السهم الأحمر/البرتقالي (الطاقة المنتشرة) يتناسبان بدقة مع نسبة كل طاقة، وأن مجموعهما يساوي عرض سهم الطاقة الداخلة.',
      scientificFormula: 'Largeur(E_reçue) = Largeur(E_utile) + Largeur(E_dissipée)',
    },
    {
      id: 'obs-c09-conservation',
      minProgress: 0.55,
      titleArabic: 'التحقق الآني من مبدأ انحفاظ الطاقة أثناء التشغيل',
      titleFrench: 'Vérification continue de la conservation de l’énergie',
      descriptionArabic:
        'في كل لحظة من التشغيل، تبقى الطاقة المستقبلة مساوية تمامًا لمجموع الطاقة المفيدة والطاقة المنتشرة. فالطاقة لا تختفي ولا تظهر من العدم.',
      scientificFormula: 'À tout instant t : E_reçue(t) = E_utile(t) + E_dissipée(t)',
    },
    {
      id: 'obs-c09-efficiency',
      minProgress: 0.9,
      titleArabic: 'حساب المردود الطاقوي (η) ومقارنة نجاعة الأجهزة',
      titleFrench: 'Calcul du rendement énergétique η (%)',
      descriptionArabic:
        'يعبر المردود الطاقوي η عن النسبة المئوية للطاقة المستقبلة التي تحولت فعليًا إلى طاقة مفيدة: فالمصباح العادي مردوده 30%، والمحرك 70%، والسخان الكهربائي 90%.',
      scientificFormula: 'η (%) = (E_utile / E_reçue) × 100 < 100%',
    },
  ],
  guidedQuestions: [
    {
      id: 'gq-c09-01',
      number: 1,
      questionArabic:
        'اختر «مصباح كهربائي (η = 30%)» واضبط الطاقة المستقبلة على 100 J. كم تبلغ الطاقة الضوئية المفيدة وكم تبلغ الطاقة الحرارية المنتشرة؟',
      questionFrench:
        'Pour une lampe recevant 100 J (η = 30%), quelles sont les valeurs de E_utile et E_dissipée ?',
      targetProgress: 1.0,
      targetParams: { deviceType: 1, totalInputEnergyJoules: 100 },
      observationHintArabic:
        'اقرأ القيم على فرعي المخطط الطاقوي: الفرع العلوي الأخضر (E_utile) والفرع السفلي البرتقالي (E_dissipée).',
      answerArabic:
        'يستقبل المصباح E_reçue = 100 J، فيحول E_utile = 30 J إلى طاقة ضوئية مفيدة، بينما تنتشر E_dissipée = 100 − 30 = 70 J على شكل طاقة حرارية في الوسط.',
      formulaLtr: '100 J (électrique) = 30 J (lumineuse utile) + 70 J (thermique dissipée)',
    },
    {
      id: 'gq-c09-02',
      number: 2,
      questionArabic:
        'اختر الآن «محرك كهربائي (η = 70%)» واضبط الطاقة المستقبلة على 500 J. احسب الطاقة الحركية المفيدة والطاقة الحرارية المنتشرة.',
      questionFrench:
        'Pour le moteur électrique recevant 500 J (η = 70%), calculez E_cinétique et E_thermique.',
      targetProgress: 1.0,
      targetParams: { deviceType: 2, totalInputEnergyJoules: 500 },
      observationHintArabic:
        'تحقق من معادلة الحصيلة الطاقوية للمحرك الكهربائي عند 500 J.',
      answerArabic:
        'المحرك يستقبل 500 J من الطاقة الكهربائية، فيعطي 350 J من الطاقة الحركية المفيدة، وينتشر الباقي (500 − 350 = 150 J) على شكل طاقة حرارية.',
      formulaLtr: '500 J = 350 J (cinétique utile) + 150 J (thermique dissipée)',
    },
    {
      id: 'gq-c09-03',
      number: 3,
      questionArabic:
        'يقول تلميذ: «في المحرك السابق، الـ 150 J التي لم تتحول إلى حركة قد اختفت من الوجود!». هل قوله صحيح؟',
      questionFrench:
        'Les 150 J d’énergie thermique dans le moteur ont-ils disparu ?',
      targetProgress: 1.0,
      targetParams: { deviceType: 2, totalInputEnergyJoules: 500 },
      observationHintArabic:
        'تذكر نص مبدأ انحفاظ الطاقة والفرق بين «طاقة منتشرة» و«طاقة مختفية».',
      answerArabic:
        'قوله خاطئ؛ فالطاقة لا تختفي ولا تفنى (مبددة ≠ مختفية)، بل تحولت الـ 150 J إلى طاقة حرارية وانتقلت إلى الوسط الخارجي، ويبقى المجموع محفوظًا: 350 J + 150 J = 500 J.',
      formulaLtr: 'Énergie dissipée ≠ Énergie disparue  |  E_reçue = E_utile + E_dissipée',
    },
    {
      id: 'gq-c09-04',
      number: 4,
      questionArabic:
        'اختر «سخان كهربائي (η = 90%)» واضبط الطاقة المستقبلة على 2000 J (النشاط التطبيقي 1). ما هي الطاقة المفيدة هنا وكم تبلغ قيمتها؟',
      questionFrench:
        'Pour un chauffe-eau électrique recevant 2000 J (η = 90%), quelle est l’énergie utile ?',
      targetProgress: 1.0,
      targetParams: { deviceType: 3, totalInputEnergyJoules: 2000 },
      observationHintArabic:
        'انتبه: ما هي الوظيفة المطلوبة من السخان الكهربائي؟',
      answerArabic:
        'في السخان الكهربائي، الطاقة الحرارية المستعملة لتسخين الماء هي نفسها الطاقة المفيدة! وتبلغ قيمتها E_utile = 1800 J، بينما تنتشر E_autre = 200 J خارج الماء، ومردوده η = (1800 / 2000) × 100 = 90%.',
      formulaLtr: '2000 J = 1800 J (thermique utile) + 200 J (dissipée)  ⟹  η = 90%',
    },
    {
      id: 'gq-c09-05',
      number: 5,
      questionArabic:
        'اختر «مروحة كهربائية (η = 65%)» عند 1000 J. لماذا نلاحظ ثلاثة فروع للطاقة الخارجة؟',
      questionFrench:
        'Pourquoi le bilan du ventilateur comporte-t-il trois énergies sortantes ?',
      targetProgress: 1.0,
      targetParams: { deviceType: 4, totalInputEnergyJoules: 1000 },
      observationHintArabic:
        'لاحظ فروع الطاقة الخارجة من المروحة في المخطط (حركية + حرارية + صوتية).',
      answerArabic:
        'لأن الحصيلة الطاقوية لا تقتصر دائمًا على فرعين فقط؛ فالمروحة تحول 650 J إلى طاقة حركية مفيدة للهواء، بينما تتوزع الطاقة المنتشرة (350 J) بين طاقة حرارية (250 J) وطاقة صوتية (100 J).',
      formulaLtr: '1000 J = 650 J (cinétique) + 250 J (thermique) + 100 J (sonore)',
    },
  ],
  conclusionArabic: [
    'الحصيلة الطاقوية (Le bilan énergétique) : دراسة كمية تتبع الطاقة الداخلة إلى النظام (E_reçue) وتفرعها إلى طاقة مفيدة (E_utile) وطاقة منتشرة في الوسط (E_dissipée).',
    'مبدأ انحفاظ الطاقة : الطاقة لا تختفي ولا تظهر من العدم، وإنما تتحول أو تنتقل، فتتحقق دائمًا المساواة: E_reçue = E_utile + E_dissipée.',
    'المردود الطاقوي (η) : يساوي النسبة بين الطاقة المفيدة والطاقة المستقبلة η (%) = (E_utile / E_reçue) × 100، وهو أصغر من 100% في الأجهزة الحقيقية لوجود تحويلات غير مرغوب فيها (حرارة، صوت، احتكاك).',
  ],
  conclusionFormulasLtr: [
    'E_reçue = E_utile + E_dissipée   (en Joules, J)',
    'η = E_utile / E_reçue   ⟹   η (%) = (E_utile / E_reçue) × 100',
  ],
  fallback: {
    titleArabic: 'ملخص الحصيلة الطاقوية ومبدأ انحفاظ الطاقة والمردود η',
    titleFrench: 'Bilan énergétique, conservation et rendement η',
    equationLtr: 'E_reçue = E_utile + E_dissipée  |  η (%) = (E_utile / E_reçue) × 100',
    keyValues: [
      { labelArabic: 'مصباح كهربائي (100 J)', valueLtr: '30 J utile + 70 J dissipée (η = 30%)' },
      { labelArabic: 'محرك كهربائي (500 J)', valueLtr: '350 J utile + 150 J dissipée (η = 70%)' },
      { labelArabic: 'سخان كهربائي (2000 J)', valueLtr: '1800 J utile + 200 J dissipée (η = 90%)' },
    ],
    shortExplanationArabic:
      'وفق مبدأ انحفاظ الطاقة، فإن الطاقة المستقبلة من طرف أي جهاز تساوي مجموع الطاقة المفيدة والطاقة المنتشرة في الوسط، ويعبر المردود η عن نسبة الطاقة المفيدة.',
    staticSchemaType: 'c09-general-and-lamp-bilan',
  },
};
