import {
  PhysicsSimulationParameter,
  SimulationPedagogicalContent,
  SimulationScientificModel,
} from '../types';
import { clampProgress } from '../useSimulationEngine';

export interface PowerConversionParams extends Record<string, number> {
  /** استطاعة الجهاز الأول P_A بالواط (W) */
  powerDeviceAWatts: number;
  /** استطاعة الجهاز الثاني P_B بالواط (W) */
  powerDeviceBWatts: number;
  /** مدة التشغيل الكلية t بالثانية (s) */
  operatingDurationSec: number;
}

export interface PowerConversionMetrics {
  /** الزمن المنقضي في التجربة (s) */
  elapsedSeconds: number;
  /** المدة الكلية المختارة للتجربة (s) */
  totalDurationSeconds: number;
  /** استطاعة الجهاز الأول P_A (W) */
  powerAWatts: number;
  /** استطاعة الجهاز الأول بالكيلوواط (kW) */
  powerAKilowatts: number;
  /** استطاعة الجهاز الثاني P_B (W) */
  powerBWatts: number;
  /** استطاعة الجهاز الثاني بالكيلوواط (kW) */
  powerBKilowatts: number;
  /** الطاقة المحوّلة في الجهاز الأول حتى اللحظة t بالجول (J) */
  energyAJoules: number;
  /** الطاقة المحوّلة في الجهاز الثاني حتى اللحظة t بالجول (J) */
  energyBJoules: number;
  /** الطاقة النهائية للجهاز الأول عند نهاية المدة t_tot (J) */
  finalEnergyAJoules: number;
  /** الطاقة النهائية للجهاز الثاني عند نهاية المدة t_tot (J) */
  finalEnergyBJoules: number;
  /** نسبة سرعة تحويل الطاقة بين الجهازين (P_B / P_A) */
  powerRatioBtoA: number;
  /** سرعة تحويل الطاقة في الجهاز الأول (J/s) */
  conversionRateAJoulesPerSec: number;
  /** سرعة تحويل الطاقة في الجهاز الثاني (J/s) */
  conversionRateBJoulesPerSec: number;
}

export const POWER_CONVERSION_PARAMETERS: PhysicsSimulationParameter[] = [
  {
    id: 'powerDeviceAWatts',
    labelArabic: 'استطاعة الجهاز الأول (P_A بالواط W)',
    labelFrench: 'Puissance de l’appareil A (P_A en W)',
    unit: 'W',
    min: 10,
    max: 1000,
    step: 10,
    defaultValue: 100,
    presets: [
      {
        labelArabic: 'مصباح LED (10 W)',
        labelFrench: 'LED (10 W)',
        value: 10,
      },
      {
        labelArabic: 'مصباح A (20 W)',
        labelFrench: 'Lampe A (20 W)',
        value: 20,
      },
      {
        labelArabic: 'جهاز A (100 W)',
        labelFrench: 'Appareil A (100 W)',
        value: 100,
      },
      {
        labelArabic: 'خلاط (300 W)',
        labelFrench: 'Mixeur (300 W)',
        value: 300,
      },
    ],
  },
  {
    id: 'powerDeviceBWatts',
    labelArabic: 'استطاعة الجهاز الثاني (P_B بالواط W)',
    labelFrench: 'Puissance de l’appareil B (P_B en W)',
    unit: 'W',
    min: 20,
    max: 2500,
    step: 10,
    defaultValue: 500,
    presets: [
      {
        labelArabic: 'مصباح B (100 W)',
        labelFrench: 'Lampe B (100 W)',
        value: 100,
      },
      {
        labelArabic: 'جهاز B (500 W)',
        labelFrench: 'Appareil B (500 W)',
        value: 500,
      },
      {
        labelArabic: 'مكواة (1500 W)',
        labelFrench: 'Fer à repasser (1500 W)',
        value: 1500,
      },
      {
        labelArabic: 'سخان كهربائي (2000 W)',
        labelFrench: 'Chauffe-eau (2000 W)',
        value: 2000,
      },
    ],
  },
  {
    id: 'operatingDurationSec',
    labelArabic: 'مدة التشغيل المشتركة (t بالثانية s)',
    labelFrench: 'Durée de fonctionnement (t en secondes)',
    unit: 's',
    min: 5,
    max: 120,
    step: 5,
    defaultValue: 10,
    presets: [
      {
        labelArabic: '10 ثوانٍ (10 s)',
        labelFrench: '10 s (Exemples 1 & 2)',
        value: 10,
      },
      {
        labelArabic: '20 ثانية (20 s)',
        labelFrench: '20 s (Exercice 1)',
        value: 20,
      },
      {
        labelArabic: 'دقيقة واحدة (60 s)',
        labelFrench: '1 min = 60 s',
        value: 60,
      },
      {
        labelArabic: 'دقيقتان (120 s)',
        labelFrench: '2 min = 120 s',
        value: 120,
      },
    ],
  },
];

/**
 * Modèle scientifique pur et déterministe du Cours 10 :
 * « استطاعة تحويل الطاقة — Puissance de conversion de l’énergie »
 *
 * Lois fondamentales vérifiées à tout instant :
 *   P = E / t   ⟺   E = P × t   ⟺   t = E / P
 *   1 W = 1 J/s   |   1 kW = 1000 W
 */
export const powerConversionScientificModel: SimulationScientificModel<
  PowerConversionMetrics,
  PowerConversionParams
> = {
  nominalDurationSeconds: 10,
  parameters: POWER_CONVERSION_PARAMETERS,

  getInitialParameters(): PowerConversionParams {
    return {
      powerDeviceAWatts: 100,
      powerDeviceBWatts: 500,
      operatingDurationSec: 10,
    };
  },

  getInitialMetrics(params?: PowerConversionParams): PowerConversionMetrics {
    return this.computeMetricsAtProgress(0, params);
  },

  computeMetricsAtProgress(
    rawProgress: number,
    params?: PowerConversionParams
  ): PowerConversionMetrics {
    const p = clampProgress(rawProgress);
    const activeParams: PowerConversionParams = params ?? {
      powerDeviceAWatts: 100,
      powerDeviceBWatts: 500,
      operatingDurationSec: 10,
    };

    const powerAWatts = Math.max(
      1,
      Number(activeParams.powerDeviceAWatts) || 100
    );
    const powerBWatts = Math.max(
      1,
      Number(activeParams.powerDeviceBWatts) || 500
    );
    const totalDurationSeconds = Math.max(
      1,
      Number(activeParams.operatingDurationSec) || 10
    );

    const elapsedSeconds = Number((p * totalDurationSeconds).toFixed(1));
    const energyAJoules = Math.round(powerAWatts * elapsedSeconds);
    const energyBJoules = Math.round(powerBWatts * elapsedSeconds);

    const finalEnergyAJoules = Math.round(powerAWatts * totalDurationSeconds);
    const finalEnergyBJoules = Math.round(powerBWatts * totalDurationSeconds);

    const powerAKilowatts = Number((powerAWatts / 1000).toFixed(3));
    const powerBKilowatts = Number((powerBWatts / 1000).toFixed(3));
    const powerRatioBtoA = Number((powerBWatts / powerAWatts).toFixed(2));

    return {
      elapsedSeconds,
      totalDurationSeconds,
      powerAWatts,
      powerAKilowatts,
      powerBWatts,
      powerBKilowatts,
      energyAJoules,
      energyBJoules,
      finalEnergyAJoules,
      finalEnergyBJoules,
      powerRatioBtoA,
      conversionRateAJoulesPerSec: powerAWatts,
      conversionRateBJoulesPerSec: powerBWatts,
    };
  },

  validateInvariants(metrics: PowerConversionMetrics): boolean {
    if (metrics.powerAWatts <= 0 || metrics.powerBWatts <= 0) return false;
    if (metrics.totalDurationSeconds <= 0) return false;

    const expectedFinalA = Math.round(
      metrics.powerAWatts * metrics.totalDurationSeconds
    );
    const expectedFinalB = Math.round(
      metrics.powerBWatts * metrics.totalDurationSeconds
    );
    if (metrics.finalEnergyAJoules !== expectedFinalA) return false;
    if (metrics.finalEnergyBJoules !== expectedFinalB) return false;

    if (
      Math.abs(
        metrics.energyAJoules - metrics.powerAWatts * metrics.elapsedSeconds
      ) > 1
    ) {
      return false;
    }
    if (
      Math.abs(
        metrics.energyBJoules - metrics.powerBWatts * metrics.elapsedSeconds
      ) > 1
    ) {
      return false;
    }

    return true;
  },

  extractHistoryValues(
    metrics: PowerConversionMetrics
  ): Record<string, number> {
    return {
      EnergyAJ: metrics.energyAJoules,
      EnergyBJ: metrics.energyBJoules,
      ElapsedSec: metrics.elapsedSeconds,
    };
  },
};

export const powerConversionPedagogicalContent: SimulationPedagogicalContent = {
  titleArabic:
    'محاكاة تفاعلية : استطاعة تحويل الطاقة ومقارنة جهازين (P = E / t و E = P × t)',
  titleFrench:
    'Puissance de conversion d’énergie (P = E / t), comparaison d’appareils & graphe E = f(t)',
  category: 'dynamic-graph',
  levelBadge: '3AM · الميدان 02 : الطاقة · الدرس 10',
  objectiveArabic:
    'اضبط استطاعة الجهازين (P_A و P_B بالواط W) ومدة التشغيل المشتركة (t بالثانية s)، ثم شغّل المحاكاة لمقارنة سرعة تحويل الطاقة في كل ثانية (1 W = 1 J/s) والتحقق من مثلث العلاقات (E = P × t) ومنحنى تطور الطاقة E = f(t).',
  macroscopicWarningArabic:
    'قاعدة علمية أساسية : الاستطاعة (P) لا تمثل كمية الطاقة وحدها، بل تعبّر عن سرعة تحويل الطاقة في وحدة الزمن (P = E / t حيث 1 W = 1 J/s).',
  supportedRepresentations: ['macroscopic', 'both'],
  scientificSteps: [
    { step: 1, ar: '1. اضبط P_A و P_B و t', fr: '1. Régler P_A, P_B et t' },
    { step: 2, ar: '2. لاحظ سرعة التحويل (J/s)', fr: '2. Observer débit (J/s)' },
    { step: 3, ar: '3. قِس الطاقة المحوّلة E (J)', fr: '3. Mesurer E = P × t' },
    { step: 4, ar: '4. قارن الجهازين والمنحنى', fr: '4. Comparer E_A et E_B' },
    { step: 5, ar: '5. استنتج العلاقة P = E / t', fr: '5. Conclure P = E / t' },
  ],
  controlLabels: {
    startArabic: 'تشغيل الجهازين ومقارنة التحويل (Démarrer)',
    progressLabelArabic: 'تقدم مدة التشغيل الزمنية t (بالثواني s)',
    progressAriaLabel: 'شريط تقدم مدة التشغيل الزمنية وتراكم الطاقة المحولة بالجول',
  },
  equationLtr:
    'P = E / t   ⟺   E = P × t   ⟺   t = E / P   (1 W = 1 J/s)',
  keyRelationBadgeLtr: 'P = E / t  |  E = P × t',
  dynamicObservations: [
    {
      id: 'obs-c10-init',
      minProgress: 0,
      titleArabic: 'قراءة بطاقة الجهازين (الاستطاعة الاسمية بالواط W)',
      titleFrench: 'Lecture de la puissance nominale des deux appareils (1 W = 1 J/s)',
      descriptionArabic:
        'الاستطاعة المسجلة على كل جهاز بالواط (W) تبين كمية الطاقة بالجول (J) التي يحوّلها الجهاز في كل ثانية واحدة من الاشتغال العادي.',
      scientificFormula: '1 W = 1 J / 1 s = 1 J/s   |   1 kW = 1000 W',
    },
    {
      id: 'obs-c10-rate',
      minProgress: 0.2,
      titleArabic: 'ملاحظة فرق سرعة تحويل الطاقة في كل ثانية',
      titleFrench: 'Comparaison de la vitesse de conversion d’énergie',
      descriptionArabic:
        'أثناء التشغيل، يمتلئ خزان الطاقة للجهاز ذي الاستطاعة الأكبر بسرعة أكبر في كل ثانية تمرّ، لأن الاستطاعة تعبّر عن سرعة تحويل الطاقة.',
      scientificFormula: 'E_A(t) = P_A × t   et   E_B(t) = P_B × t',
    },
    {
      id: 'obs-c10-graph',
      minProgress: 0.55,
      titleArabic: 'التناسب الطردي بين الطاقة المحوّلة (E) والزمن (t)',
      titleFrench: 'Proportionnalité de l’énergie avec le temps : graphe E = f(t)',
      descriptionArabic:
        'في المنحنى البياني E = f(t)، تتزايد الطاقة المحوّلة خطيًا مع الزمن، ويمثل ميل المستقيم (معامل التوجيه) استطاعة الجهاز P = E / t.',
      scientificFormula: 'Pente de E(t) = E / t = P (en W)',
    },
    {
      id: 'obs-c10-final',
      minProgress: 0.9,
      titleArabic: 'المقارنة النهائية عند نهاية المدة الزمنية (t)',
      titleFrench: 'Bilan comparatif en fin de durée de fonctionnement',
      descriptionArabic:
        'عند تساوي مدة التشغيل (t)، يحوّل الجهاز ذو الاستطاعة الأكبر كمية أكبر من الطاقة، وتكون نسبة الطاقتين مساوية تمامًا لنسبة الاستطاعتين.',
      scientificFormula: 'Pour une même durée t : E_B / E_A = P_B / P_A',
    },
  ],
  guidedQuestions: [
    {
      id: 'gq-c10-01',
      number: 1,
      questionArabic:
        'ماذا تعني الدلالة «2000 W» المكتوبة على بطاقة سخان كهربائي مقارنة بمصباح LED دلالته «10 W»؟',
      questionFrench:
        'Que signifie l’indication « 2000 W » sur un chauffe-eau comparée à une lampe LED de « 10 W » ?',
      targetProgress: 1.0,
      targetParams: {
        powerDeviceAWatts: 10,
        powerDeviceBWatts: 2000,
        operatingDurationSec: 10,
      },
      observationHintArabic:
        'اقرأ معدل التحويل في الثانية الواحدة (J/s) على بطاقة كل جهاز.',
      answerArabic:
        'الدلالة 2000 W تعني أن السخان يحوّل 2000 جول في كل ثانية (2000 J/s)، بينما مصباح LED (10 W) يحوّل 10 جول فقط في كل ثانية (10 J/s). فالسخان يحوّل الطاقة بسرعة تعادل 200 ضعف سرعة المصباح!',
      formulaLtr: '1 W = 1 J/s  ⟹  2000 W = 2000 J/s (contre 10 J/s pour la LED)',
    },
    {
      id: 'gq-c10-02',
      number: 2,
      questionArabic:
        'اضبط الجهاز (A) على 100 W والجهاز (B) على 500 W ومدة التشغيل على t = 10 s (الشكل 3). كم تبلغ الطاقة المحوّلة في كل جهاز؟',
      questionFrench:
        'Pour P_A = 100 W et P_B = 500 W pendant t = 10 s, quelle est l’énergie convertie par chaque appareil ?',
      targetProgress: 1.0,
      targetParams: {
        powerDeviceAWatts: 100,
        powerDeviceBWatts: 500,
        operatingDurationSec: 10,
      },
      observationHintArabic:
        'طبّق العلاقة E = P × t لكل جهاز عند نهاية الثواني العشر.',
      answerArabic:
        'خلال t = 10 s، يحوّل الجهاز الأول طاقة E_A = 100 × 10 = 1000 J، بينما يحوّل الجهاز الثاني طاقة E_B = 500 × 10 = 5000 J (أي 5 أضعاف طاقة الجهاز الأول).',
      formulaLtr: 'E_A = 100 × 10 = 1000 J  |  E_B = 500 × 10 = 5000 J',
    },
    {
      id: 'gq-c10-03',
      number: 3,
      questionArabic:
        'اختر «مصباح A (20 W)» و«مصباح B (100 W)» لمدة دقيقة واحدة (1 min). كيف نحسب طاقة كل مصباح بالجول؟',
      questionFrench:
        'Deux lampes (20 W et 100 W) fonctionnent pendant 1 minute. Comment calculer leur énergie en Joules ?',
      targetProgress: 1.0,
      targetParams: {
        powerDeviceAWatts: 20,
        powerDeviceBWatts: 100,
        operatingDurationSec: 60,
      },
      observationHintArabic:
        'انتبه للوحدات الدولية: يجب تحويل الدقيقة إلى ثوانٍ (1 min = 60 s) قبل الضرب.',
      answerArabic:
        'نحوّل أولًا الزمن إلى الثواني: t = 1 min = 60 s. ثم نحسب: للمصباح الأول E_A = 20 × 60 = 1200 J، وللمصباح الثاني E_B = 100 × 60 = 6000 J.',
      formulaLtr: 't = 1 min = 60 s  ⟹  E_A = 1200 J  et  E_B = 6000 J',
    },
    {
      id: 'gq-c10-04',
      number: 4,
      questionArabic:
        'جهاز استطاعته P = 500 W حوّل طاقة قدرها E = 10 000 J. كيف نجد مدة اشتغاله الزمنية t انطلاقًا من مثلث العلاقات؟',
      questionFrench:
        'Un appareil de puissance P = 500 W a converti E = 10 000 J. Quelle est sa durée de fonctionnement t ?',
      targetProgress: 1.0,
      targetParams: {
        powerDeviceAWatts: 100,
        powerDeviceBWatts: 500,
        operatingDurationSec: 20,
      },
      observationHintArabic:
        'من مثلث العلاقات: لإيجاد الزمن t نقسم الطاقة E على الاستطاعة P.',
      answerArabic:
        'نستعمل العلاقة المستخرجة من المثلث: t = E / P = 10 000 / 500 = 20 s. إذن اشتغل الجهاز لمدة 20 ثانية.',
      formulaLtr: 't = E / P = 10 000 / 500 = 20 s',
    },
    {
      id: 'gq-c10-05',
      number: 5,
      questionArabic:
        'ما الفرق الجوهري بين مفهوم «الطاقة (E)» ومفهوم «الاستطاعة (P)»؟',
      questionFrench:
        'Quelle est la différence fondamentale entre l’énergie (E) et la puissance (P) ?',
      targetProgress: 1.0,
      observationHintArabic:
        'قارن بين وحدة الطاقة (J) ووحدة الاستطاعة (W = J/s).',
      answerArabic:
        'الطاقة (E) هي الكمية الكلية المحوّلة وتُقاس بالجول (J)، أما الاستطاعة (P) فهي سرعة تحويل هذه الطاقة في وحدة الزمن وتُقاس بالواط (W).',
      formulaLtr: 'Puissance = Énergie / Temps   ⟺   P = E / t',
    },
  ],
  conclusionArabic: [
    'الاستطاعة (La puissance P) هي كمية الطاقة المحوّلة خلال وحدة الزمن، وتعبّر عن سرعة تحويل الجهاز للطاقة.',
    'العلاقات الرياضية الثلاث من مثلث العلاقات هي: P = E / t (لحساب الاستطاعة)، و E = P × t (لحساب الطاقة)، و t = E / P (لحساب الزمن).',
    'في الجملة الدولية: الطاقة E بالجول (J)، والزمن t بالثانية (s) حيث (1 min = 60 s)، والاستطاعة P بالواط (W) حيث (1 W = 1 J/s و 1 kW = 1000 W).',
  ],
  conclusionFormulasLtr: [
    'P = E / t   |   E = P × t   |   t = E / P',
    '1 W = 1 J/s   |   1 kW = 1000 W   |   1 min = 60 s',
  ],
  fallback: {
    titleArabic: 'ملخص استطاعة تحويل الطاقة ومثلث العلاقات (P , E , t)',
    titleFrench: 'Synthèse de la puissance de conversion d’énergie (P = E / t)',
    equationLtr: 'P = E / t   ⟺   E = P × t   ⟺   t = E / P',
    keyValues: [
      { labelArabic: 'مصباح LED (10 W خلال 10 s)', valueLtr: 'E = 10 × 10 = 100 J (10 J/s)' },
      { labelArabic: 'جهاز B (500 W خلال 10 s)', valueLtr: 'E = 500 × 10 = 5000 J (500 J/s)' },
      { labelArabic: 'سخان (2000 W = 2 kW خلال 10 s)', valueLtr: 'E = 2000 × 10 = 20 000 J' },
    ],
    shortExplanationArabic:
      'الاستطاعة P تعبّر عن سرعة تحويل الطاقة في وحدة الزمن (1 W = 1 J/s). خلال نفس المدة الزمنية t، الجهاز ذو الاستطاعة الأكبر يحوّل طاقة أكبر وفق العلاقة E = P × t.',
    staticSchemaType: 'c10-power-meaning-and-triangle',
  },
};
