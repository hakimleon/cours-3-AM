import {
  SvtCourse,
  SvtDomainId,
  SvtTrilingualTerm,
} from '../typesSvt';

export interface SvtDomainMeta {
  id: SvtDomainId;
  arabicName: string;
  frenchName: string;
  description: string;
}

export const SVT_DOMAINS: SvtDomainMeta[] = [
  {
    id: 'internal-geodynamics',
    arabicName: 'الديناميكية الداخلية للكرة الأرضية',
    frenchName: 'Dynamique interne du globe terrestre',
    description:
      'الزلازل وآثارها، انتشار الموجات الزلزالية، نشاط الظهرات المحيطية، تكتونية الصفائح والظواهر المرتبطة بها (الغوص، البراكين، تشكل الجبال).',
  },
  {
    id: 'external-geodynamics',
    arabicName: 'الديناميكية الخارجية للكرة الأرضية',
    frenchName: 'Dynamique externe du globe terrestre',
    description:
      'تغير وتطور المناظر الطبيعية تحت تأثير العوامل المناخية، آليات الحت والنقل والترسيب، ونشاط الإنسان في تعديل الطبيعة.',
  },
  {
    id: 'natural-resources',
    arabicName: 'استغلال الموارد الطبيعية الباطنية',
    frenchName: 'Exploitation des ressources naturelles souterraines',
    description:
      'المياه الجوفية، الثروات الطاقوية (البترول والغاز)، الموارد المنجمية، ودور الحكامة المستدامة في تسيير هذه الثروات.',
  },
  {
    id: 'soil-protection',
    arabicName: 'التربة ثروة طبيعية هشة',
    frenchName: 'Le sol, une ressource naturelle fragile',
    description:
      'مكونات التربة ونشأتها عبر الزمن، عوامل تدهور التربة والانجراف، والأساليب العلمية لحمايتها واستصلاحها.',
  },
];

/**
 * Fonction usine pour créer un emplacement de cours prêt à accueillir
 * le contenu exact fourni par l'utilisateur (sans altération).
 */
export function createSvtCourseSlot(
  num: number,
  domaine: SvtDomainId,
  domaineNomArabe: string,
  domaineNomFrancais: string,
  titreArabe: string,
  titreFrancais: string
): SvtCourse {
  const padded = String(num).padStart(2, '0');
  return {
    id: `svt-course-${padded}`,
    numero: padded,
    titre: `${titreArabe} (${titreFrancais})`,
    titreArabe,
    titreNeutreArabe: `الدرس ${padded} : ${titreArabe}`,
    sousTitreNeutre: `المقطع : ${domaineNomArabe} · علوم الطبيعة والحياة — السنة الثالثة متوسط (3AM)`,
    titreFrancais: `Chapitre ${padded} · ${titreFrancais}`,
    matiere: 'علوم الطبيعة والحياة — SVT',
    niveau: '3AM — السنة الثالثة متوسط',
    domaine,
    domaineNomArabe,
    domaineNomFrancais,
    duree: '60 د',
    status: 'awaiting_content',
    objectifs: [],
    prerequis: [],
    introduction: '',
    sections: [],
    definitions: [],
    illustrations: [],
    applications: [],
    vocabulaire: [],
    pointsEssentiels: [],
  };
}

// ============================================================================
// COURS 01 VALIDÉ : الزلازل ظاهرة طبيعية (علوم الطبيعة والحياة 3AM الجزائر)
// Source officielle fournie par l'utilisateur (Kiteb el-madrassi + Molakhas)
// ============================================================================
const COURSE_01_SVT: SvtCourse = {
  id: 'svt-course-01',
  numero: '01',
  titre: 'الدرس 01 : الزلازل ظاهرة طبيعية',
  titreArabe: 'الزلازل ظاهرة طبيعية',
  titreNeutreArabe: 'الدرس 01 : الزلازل ظاهرة طبيعية',
  sousTitreNeutre:
    'المقطع 1 : الديناميكية الداخلية للكرة الأرضية · علوم الطبيعة والحياة — السنة الثالثة متوسط (3AM) — الجزائر',
  titreFrancais: 'Les séismes, un phénomène naturel',
  matiere: 'علوم الطبيعة والحياة — SVT',
  niveau: '3AM — السنة الثالثة متوسط',
  domaine: 'internal-geodynamics',
  domaineNomArabe: 'الديناميكية الداخلية للكرة الأرضية',
  domaineNomFrancais: 'Dynamique interne du globe terrestre',
  duree: '60 د',
  status: 'validated',

  // 2. أهداف التعلم
  objectifs: [
    'تعريف الزلزال وتحديد بعض خصائصه.',
    'وصف آثار الزلازل على سطح الأرض واستخلاص المعلومات من الصور والوثائق.',
    'تحديد البؤرة والمركز السطحي وتمثيل انتشار الأمواج الزلزالية.',
    'شرح دور جهاز تسجيل الزلازل والتعرف على مبدأ تقدير مقدار الزلزال.',
    'التمييز بين مقدار الزلزال وشدته، واقتراح سلوكات وقائية مناسبة.',
  ],

  prerequis: [
    'مفهوم القشرة الأرضية والطبقات الصخرية.',
    'التمييز بين الظواهر الجيولوجية البطيئة والظواهر المفاجئة السريعة.',
  ],

  introduction: '',

  // 1. وضعية الانطلاق والتساؤل العلمي (ص 9 من الكتاب المدرسي)
  discoveryActivity: {
    id: 'disc-svt-01',
    titleArabic: 'وضعية الانطلاق والتساؤل العلمي',
    titleFrench: 'Situation de départ et questionnement scientifique',
    situationConcrete:
      'تتعرض الجزائر سنويا للعديد من الهزات الأرضية، معظم هذه الهزات لا يشعر بها السكان لضعف شدتها. إلا أن بعضها ذات شدات قوية تسبب تشوهات على مستوى سطح الأرض وخسائر مادية وبشرية متفاوتة.',
    guidedQuestions: [
      'فيم تتمثل مظاهر الزلزال على سطح الأرض؟',
      'ما أهم خصائص الزلزال؟',
    ],
    hint: 'الإشكالية: فيم تتمثل مظاهر الزلزال على سطح الأرض؟ وما أهم خصائص الزلزال؟',
    conclusion:
      'الزلزال ظاهرة طبيعية باطنية تتجلى على السطح في شكل اهتزازات أرضية متفاوتة الشدة وتسجل بأجهزة خاصة.',
  },

  // 2. أقسام التعمق
  sections: [
    {
      id: 'sec-svt-01-docs',
      number: 'أ',
      titleArabic: 'أ. ملاحظة واستغلال الوثائق',
      titleFrench: 'Observation et exploitation des documents',
      shortLabel: 'أ. ملاحظة واستغلال الوثائق',
      blocks: [
        {
          kind: 'paragraph',
          text: 'تُظهر دراسة آثار الزلازل على المناطق العمرانية وخارجها تشققات وتصدعات في الصخور والطرق، وتضرر المباني والمنشآت أو انهيارها، إلى جانب تسجيل اهتزازات بواسطة أجهزة الرصد الزلزالي.',
        },
        {
          kind: 'bullets',
          title: 'نستخلص من هذه الملاحظات ما يأتي :',
          items: [
            'يمكن أن يحدث الزلزال تشوهات وتشققات في سطح الأرض.',
            'قد تتضرر المباني والمنشآت، وتختلف الأضرار من مكان إلى آخر.',
            'لا تكفي صور الأضرار وحدها لتحديد مقدار الزلزال بدقة؛ لذلك نحتاج إلى أجهزة تسجيل وطرق قياس مناسبة.',
          ],
        },
        {
          kind: 'embedded-question',
          number: 'سؤال مدمج',
          question: 'ما الظاهرتان اللتان يمكن ملاحظتهما في صور آثار الزلازل؟',
          answer: 'اهتزاز الأرض وتشققها، وتضرر بعض المباني والمنشآت.',
        },
      ],
    },
    {
      id: 'sec-svt-01-def',
      number: 'ب',
      titleArabic: 'ب. تعريف الزلزال وخصائصه',
      titleFrench: 'Définition du séisme et caractéristiques',
      shortLabel: 'ب. تعريف الزلزال وخصائصه',
      blocks: [
        {
          kind: 'definition',
          data: {
            titleArabic: 'تعريف الزلزال (Le séisme)',
            titleFrench: 'Définition du séisme',
            contentArabic:
              'الزلزال ظاهرة طبيعية تتمثل في اهتزازات مفاجئة لسطح الأرض ناتجة عن تحرر الطاقة داخل الأرض وانتشارها على شكل أمواج زلزالية.',
          },
        },
        {
          kind: 'paragraph',
          text: 'تختلف الزلازل من حيث آثارها ومدتها وشدتها.',
        },
        {
          kind: 'bullets',
          title: 'ومن خصائصها :',
          items: [
            'الهزات: اهتزازات تنتشر في الصخور وفي مختلف الاتجاهات انطلاقاً من منطقة حدوث الزلزال.',
            'المدة: غالباً ما تستمر الهزة الرئيسية مدة قصيرة، وقد تتبعها هزات ثانوية.',
            'الارتدادات: هزات تلي الهزة الرئيسية، وقد تتناقص قوتها تدريجياً.',
            'الأضرار: تتفاوت حسب خصائص الزلزال، وعمق مصدره، وطبيعة الصخور والتربة، ومتانة المباني، وعوامل أخرى.',
          ],
        },
        {
          kind: 'callout',
          variant: 'note',
          title: 'ملاحظة هامة',
          content:
            'ليس كل زلزال مدمراً؛ فقد تكون بعض الزلازل ضعيفة ولا يشعر بها الإنسان، بينما تتسبب زلازل أخرى في أضرار كبيرة.',
        },
        {
          kind: 'embedded-question',
          number: 'سؤال مدمج 2',
          question: 'هل يمكن أن يحدث زلزال دون أن يشعر به الإنسان؟ علّل إجابتك.',
          answer:
            'نعم، فقد تكون الاهتزازات ضعيفة جداً، ويمكن لأجهزة التسجيل رصدها حتى عندما لا يشعر بها الإنسان.',
        },
      ],
    },
    {
      id: 'sec-svt-01-propagation',
      number: 'ج',
      titleArabic: 'ج. كيف تنتشر الاهتزازات الزلزالية؟',
      titleFrench: 'Propagation des vibrations sismiques',
      shortLabel: 'ج. انتشار الاهتزازات',
      blocks: [
        {
          kind: 'paragraph',
          text: 'لفهم حدوث الزلزال، نميز بين ثلاثة عناصر أساسية :',
        },
        {
          kind: 'bullets',
          items: [
            '1. البؤرة الزلزالية (البؤرة): المنطقة الموجودة داخل الأرض التي ينطلق منها النشاط الزلزالي المرتبط بحدوث الزلزال.',
            '2. المركز السطحي: النقطة الموجودة على سطح الأرض مباشرة فوق البؤرة.',
            '3. الأمواج الزلزالية: اهتزازات تنتشر من منطقة البؤرة عبر الصخور، وتنقل الطاقة الزلزالية.',
          ],
        },
        {
          kind: 'paragraph',
          text: 'عندما تصل الأمواج الزلزالية إلى سطح الأرض، يحدث الاهتزاز الذي قد يؤدي إلى تشقق الصخور وتضرر المنشآت.\nتكون الأضرار غالباً أكبر قرب المركز السطحي في ظروف متشابهة، لكنها لا تعتمد على المسافة وحدها؛ إذ تؤثر فيها أيضاً عمق البؤرة وطريقة بناء المنشآت.',
        },
        {
          kind: 'illustration',
          data: {
            id: 'ill-svt-01-foyer-epicenter',
            titleArabic: 'مخطط جيولوجي دقيق : البؤرة، المركز السطحي، وانتشار الأمواج الزلزالية',
            titleFrench: 'Coupe géologique : Foyer, épicentre et ondes sismiques',
            schemaType: 'seismic-foyer-epicenter',
            alt: 'رسم تخطيطي للبؤرة والمركز السطحي وانتشار الأمواج',
            captionArabic:
              'مخطط علمي يوضح موقع البؤرة في باطن الأرض والمركز السطحي شاقولياً فوقها وانتشار الأمواج في كافة الاتجاهات',
            pedagogicalRole: 'توضيح العلاقة الهندسية بين البؤرة والمركز السطحي ومسار انتشار الأمواج',
            courseBadge: 'الدرس 01',
          },
        },
        {
          kind: 'embedded-question',
          number: 'سؤال مدمج 3',
          question: 'ما الفرق بين البؤرة والمركز السطحي؟',
          answer:
            'البؤرة توجد داخل الأرض وتنطلق منها الأمواج الزلزالية، أما المركز السطحي فهو النقطة على سطح الأرض الواقعة عمودياً فوق البؤرة.',
        },
      ],
    },
    {
      id: 'sec-svt-01-recording',
      number: 'د',
      titleArabic: 'د. كيف يسجل العلماء الزلازل؟',
      titleFrench: 'Enregistrement des séismes par les scientifiques',
      shortLabel: 'د. تسجيل الزلازل',
      blocks: [
        {
          kind: 'paragraph',
          text: 'يستعمل العلماء جهازاً يسمى مسجل الزلازل أو السيسموغراف لتسجيل الاهتزازات الأرضية.\nيتضمن التسجيل الزلزالي منحنى يسمى السجل الزلزالي، ويبين تغير حركة الأرض مع الزمن.',
        },
        {
          kind: 'bullets',
          title: 'ويساعد تحليل هذا التسجيل على :',
          items: [
            'الكشف عن وصول الاهتزازات الزلزالية.',
            'دراسة خصائص الموجات المسجلة.',
            'المساهمة في تحديد خصائص الزلزال وتقدير مقداره.',
          ],
        },
        {
          kind: 'paragraph',
          text: 'تختلف التسجيلات بحسب الاهتزازات التي تصل إلى الجهاز وموقعه بالنسبة إلى الزلزال.',
        },
        {
          kind: 'illustration',
          data: {
            id: 'ill-svt-01-seismogram',
            titleArabic: 'السجل الزلزالي (السيسموغرام) : تسجيل حركة الأرض والموجات الزلزالية بدلالة الزمن',
            titleFrench: 'Sismogramme : tracé de l’enregistrement sismique',
            schemaType: 'seismogram-waves',
            alt: 'السجل الزلزالي',
            captionArabic:
              'منحنى بياني ناتج عن مسجل الزلازل يبين وصول الأمواج الزلزالية وتغير سعة الاهتزاز مع مرور الثواني',
            captionFrench: 'Sismogramme illustrant l’arrivée des ondes et la variation d’amplitude',
            pedagogicalRole: 'التعرف على شكل السجل الزلزالي ومبدأ عمل مسجل الزلازل',
            courseBadge: 'الدرس 01',
          },
        },
        {
          kind: 'callout',
          variant: 'important',
          title: 'تمييز جوهري',
          content:
            'ومن المهم التمييز بين الجهاز والتسجيل: مسجل الزلازل هو الجهاز، أما السجل الزلزالي فهو المنحنى الناتج عن التسجيل.',
        },
      ],
    },
    {
      id: 'sec-svt-01-magnitude-intensity',
      number: 'هـ',
      titleArabic: 'هـ. كيف نقدر مقدار الزلزال وشدته؟',
      titleFrench: 'Estimation de la magnitude et de l’intensité',
      shortLabel: 'هـ. المقدار والشدة',
      blocks: [
        {
          kind: 'paragraph',
          text: 'من الضروري التمييز بين مفهومين :',
        },
        {
          kind: 'definition',
          data: {
            titleArabic: 'مقدار الزلزال — Magnitude',
            titleFrench: 'La Magnitude',
            contentArabic:
              'يعبر عن الطاقة المحررة في البؤرة، ويُقدَّر انطلاقاً من تسجيلات أجهزة قياس الزلازل بسلم ريشتر (مثل: زلزال زموري، 2003، المقدار 6.6). لكل زلزال مقدار محدد يعبر عن طاقته المحررة في المصدر.',
          },
        },
        {
          kind: 'definition',
          data: {
            titleArabic: 'شدة الزلزال — Intensité',
            titleFrench: 'L’Intensité',
            contentArabic:
              'تصف آثار الزلزال والخسائر الملاحظة في مكان معين، وتُقاس بسلم MSK ذي 12 درجة بالأرقام الرومانية، وتتناقص كلما ابتعدنا عن المركز السطحي.',
          },
        },
        {
          kind: 'illustration',
          data: {
            id: 'ill-svt-01-intensity-scale',
            titleArabic: 'مقارنة الشدة (الآثار والأضرار الملاحظة) والمقدار (الطاقة المحررة على سلم ريشتر)',
            titleFrench: 'Échelle d’intensité et magnitude sismique',
            schemaType: 'seismic-intensity-scale',
            alt: 'مقياس الشدة والمقدار',
            captionArabic:
              'مقارنة توضيحية بين تقدير شدة الزلزال من خلال المعاينة الميدانية وقياس مقداره بواسطة التسجيلات',
            captionFrench: 'Comparaison entre intensité et magnitude',
            pedagogicalRole: 'توضيح الفرق بين المقدار والشدة',
            courseBadge: 'الدرس 01',
          },
        },
        {
          kind: 'callout',
          variant: 'warning',
          title: 'تنبيه علمي',
          content:
            'المقدار والشدة ليسا مترادفين: المقدار يتعلق بمصدر الزلزال، والشدة تصف آثاره في موقع معين.',
        },
      ],
    },
    {
      id: 'sec-svt-01-isoseismal',
      number: 'و',
      titleArabic: 'و. ماذا نستنتج من منحنيات تساوي الشدة؟',
      titleFrench: 'Courbes isoséistes et distribution géographique',
      shortLabel: 'و. منحنيات تساوي الشدة',
      blocks: [
        {
          kind: 'paragraph',
          text: 'يمكن تمثيل المناطق التي لها الشدة الزلزالية نفسها على خريطة، ثم وصل النقاط ذات الشدة المتساوية بخطوط تسمى منحنيات تساوي الشدة الزلزالية.\nتساعد هذه المنحنيات على إظهار توزيع آثار الزلزال جغرافياً، وتحديد المناطق التي سجلت فيها شدة أكبر أو أقل.',
        },
        {
          kind: 'callout',
          variant: 'note',
          title: 'استنتاج جغرافي',
          content:
            'ولا تعني هذه المنحنيات أن مقدار الزلزال يتغير من مكان إلى آخر؛ بل إنها تمثل اختلاف الشدة والآثار حسب الموقع.',
        },
      ],
    },
    {
      id: 'sec-svt-01-safety',
      number: 'ز',
      titleArabic: 'ز. الزلازل والسلامة والوقاية',
      titleFrench: 'Séismes et consignes de sécurité',
      shortLabel: 'ز. السلامة والوقاية',
      blocks: [
        {
          kind: 'paragraph',
          title: 'إرشادات السلامة والوقاية',
          text: 'لا يمكن التنبؤ بموعد ومكان حدوث الزلزال بدقة مسبقة. لذلك ترتكز الوقاية في المنهاج على السلوكات الاستباقية للحد من الأضرار :',
        },
        {
          kind: 'bullets',
          items: [
            'تشييد المباني والمنشآت وفق القواعد الهندسية المقاومة للزلازل.',
            'التعرف مسبقاً على مخارج ومنافذ النجدة والإخلاء.',
            'التدرب على قواعد السلامة والإسعافات الأولية.',
          ],
        },
        {
          kind: 'callout',
          variant: 'note',
          title: 'تعليمات وإرشادات السلامة الإضافية',
          content:
            '• أثناء الهزة: الاحتماء فوراً تحت طاولة متينة، حماية الرأس باليدين، والابتعاد عن النوافذ والمباني المتصدعة، وعدم استعمال المصاعد الكهربائية.\n• بعد توقف الهزة:\n- إخلاء المبنى بهدوء (مكمل بيداغوجي)\n- قطع شبكات الغاز والكهرباء (مكمل بيداغوجي)\n- اتباع توجيهات فرق الإنقاذ وتجنب العودة إلى البنايات المتضررة (مكمل بيداغوجي)',
        },
      ],
    },
  ],

  // 6. مخطط تلخيصي
  summaryFlowchart: [
    'تصدع الصخور وتحرر الطاقة',
    'انتشار الأمواج الزلزالية من البؤرة',
    'اهتزاز سطح الأرض',
    'التسجيل (مسجل الزلازل والسجل الزلزالي) · دراسة الآثار (الشدة والأضرار حسب المنطقة)',
  ],

  // 7. الحصيلة النهائية — خلاصة
  synthesisText:
    'الزلزال ظاهرة طبيعية تنتج عن تحرر الطاقة داخل الأرض وانتشارها على شكل أمواج زلزالية. تنطلق الأمواج من البؤرة، ويقع المركز السطحي فوقها مباشرة. يسجل مسجل الزلازل الاهتزازات ويساعد السجل الزلزالي على دراسة الزلزال وتقدير مقداره. ويختلف مقدار الزلزال عن شدته؛ فالمقدار يرتبط بمصدر الزلزال، بينما تصف الشدة آثاره في منطقة معينة. وتساهم إجراءات الوقاية والبناء المقاوم للزلازل في الحد من الخسائر.',

  // 8. أحتفظ بالأهم (L'essentiel)
  essential: {
    title: 'أحتفظ بالأهم',
    titleArabic: 'أحتفظ بالأهم',
    titleFrench: "L'essentiel du cours",
    takeaway:
      'الزلزال تحرر مفاجئ للطاقة في البؤرة ينتشر كأمواج نحو السطح، ويُسجَّل بجهاز مسجل الزلازل.',
    items: [
      {
        number: 1,
        title: 'الزلزال',
        description:
          'الزلزال: ظاهرة طبيعية تتجلى في هزات أرضية سريعة ومتكررة، متباينة الشدة، تنتشر على شكل أمواج زلزالية.',
      },
      {
        number: 2,
        title: 'البؤرة',
        description: 'البؤرة: موقع داخل الأرض تنشأ فيه الأمواج الزلزالية.',
      },
      {
        number: 3,
        title: 'المركز السطحي',
        description:
          'المركز السطحي: النقطة الواقعة على سطح الأرض عمودياً فوق البؤرة، وهي المنطقة الأكثر تضرراً.',
      },
      {
        number: 4,
        title: 'الأمواج الزلزالية',
        description: 'الأمواج الزلزالية: تنتشر من البؤرة في جميع الاتجاهات.',
      },
      {
        number: 5,
        title: 'مسجل الزلازل',
        description:
          'مسجل الزلازل: جهاز يسجل الاهتزازات الأرضية. السجل الزلزالي هو المنحنى الناتج عن التسجيل، والجهاز ليس هو التسجيل.',
      },
      {
        number: 6,
        title: 'مقدار الزلزال (Magnitude)',
        description:
          'مقدار الزلزال (Magnitude): الطاقة المحررة في البؤرة، يُقدَّر انطلاقاً من التسجيلات بسلم ريشتر.',
      },
      {
        number: 7,
        title: 'شدة الزلزال (Intensité)',
        description:
          'شدة الزلزال (Intensité): آثاره في مكان معين، تُقاس بسلم MSK ذي 12 درجة بالأرقام الرومانية، وتتناقص كلما ابتعدنا عن المركز السطحي.',
      },
      {
        number: 8,
        title: 'المقدار والشدة ليسا مترادفين',
        description:
          'المقدار والشدة ليسا مترادفين: المقدار يتعلق بمصدر الزلزال، والشدة تصف آثاره في موقع معين.',
      },
      {
        number: 9,
        title: 'الوقاية',
        description: 'الوقاية: تقلل من الخسائر ولا تمنع حدوث الزلزال.',
      },
    ],
    flashQuestions: [
      {
        question: 'ما الفرق بين البؤرة والمركز السطحي؟',
        answer:
          'البؤرة موقع داخل الأرض تنشأ فيه الأمواج الزلزالية، أما المركز السطحي فهو النقطة الواقعة على سطح الأرض عمودياً فوق البؤرة، وهي الأكثر تضرراً.',
      },
      {
        question: 'هل المقدار والشدة مترادفان؟',
        answer:
          'المقدار والشدة ليسا مترادفين؛ المقدار يتعلق بمصدر الزلزال، والشدة تصف آثاره في موقع معين.',
      },
      {
        question: 'ما الفرق بين مسجل الزلازل والسجل الزلزالي؟',
        answer:
          'مسجل الزلازل هو الجهاز الذي يسجل الاهتزازات الأرضية، أما السجل الزلزالي فهو المنحنى البياني الناتج عن التسجيل، والجهاز ليس هو التسجيل.',
      },
    ],
  },

  pointsEssentiels: [
    {
      number: 1,
      title: 'الزلزال',
      description:
        'ظاهرة طبيعية تتجلى في هزات أرضية سريعة ومتكررة، متباينة الشدة، تنتشر على شكل أمواج زلزالية.',
    },
    {
      number: 2,
      title: 'البؤرة',
      description: 'موقع داخل الأرض تنشأ فيه الأمواج الزلزالية.',
    },
    {
      number: 3,
      title: 'المركز السطحي',
      description:
        'النقطة الواقعة على سطح الأرض عمودياً فوق البؤرة، وهي المنطقة الأكثر تضرراً.',
    },
    {
      number: 4,
      title: 'الأمواج الزلزالية',
      description: 'تنتشر من البؤرة في جميع الاتجاهات.',
    },
    {
      number: 5,
      title: 'مسجل الزلازل',
      description:
        'جهاز يسجل الاهتزازات الأرضية. السجل الزلزالي هو المنحنى الناتج عن التسجيل، والجهاز ليس هو التسجيل.',
    },
    {
      number: 6,
      title: 'مقدار الزلزال (Magnitude)',
      description:
        'الطاقة المحررة في البؤرة، يُقدَّر انطلاقاً من التسجيلات بسلم ريشتر.',
    },
    {
      number: 7,
      title: 'شدة الزلزال (Intensité)',
      description:
        'آثاره في مكان معين، تُقاس بسلم MSK ذي 12 درجة بالأرقام الرومانية، وتتناقص كلما ابتعدنا عن المركز السطحي.',
    },
    {
      number: 8,
      title: 'المقدار والشدة ليسا مترادفين',
      description:
        'المقدار يتعلق بمصدر الزلزال، والشدة تصف آثاره في موقع معين.',
    },
    {
      number: 9,
      title: 'الوقاية',
      description: 'تقلل من الخسائر ولا تمنع حدوث الزلزال.',
    },
  ],

  // 9. المصطلحات العلمية
  vocabulaire: [
    {
      arabic: 'الزلزال',
      french: 'Séisme',
      explanation: 'اهتزاز مفاجئ للأرض.',
    },
    {
      arabic: 'البؤرة الزلزالية',
      french: 'Foyer sismique',
      explanation: 'منطقة داخل الأرض ينطلق منها النشاط الزلزالي.',
    },
    {
      arabic: 'المركز السطحي',
      french: 'Épicentre',
      explanation: 'نقطة السطح الواقعة عمودياً فوق البؤرة.',
    },
    {
      arabic: 'الأمواج الزلزالية',
      french: 'Ondes sismiques',
      explanation: 'اهتزازات تنتشر وتنقل الطاقة الزلزالية.',
    },
    {
      arabic: 'مسجل الزلازل',
      french: 'Sismographe',
      explanation: 'جهاز تسجيل الاهتزازات الأرضية.',
    },
    {
      arabic: 'السجل الزلزالي',
      french: 'Sismogramme',
      explanation: 'منحنى التسجيل الزلزالي.',
    },
    {
      arabic: 'مقدار الزلزال',
      french: 'Magnitude',
      explanation: 'مقياس لحجم الزلزال المرتبط بالطاقة المحررة.',
    },
    {
      arabic: 'شدة الزلزال',
      french: 'Intensité sismique',
      explanation: 'وصف تأثير الزلزال في مكان معين.',
    },
    {
      arabic: 'منحنيات تساوي الشدة',
      french: 'Courbes isoséistes',
      explanation: 'خطوط تصل بين مناطق ذات شدة زلزالية متساوية.',
    },
  ],

  // 10. تمارين تطبيقية والتحضير لشهادة التعليم المتوسط BEM
  applications: [
    {
      id: 'exo-svt-01-app-direct',
      number: '1',
      title: 'التمرين الأول — تطبيق مباشر',
      points: '4 نقاط',
      difficulty: 'basic',
      difficultyLabel: 'مباشر',
      measuredObjectives: ['1', '3', '4'],
      prompt: 'أجب عن الأسئلة الآتية :',
      subQuestions: [
        '1. عرّف الزلزال. (1 ن)',
        '2. سمِّ المنطقة الموجودة داخل الأرض التي ينطلق منها النشاط الزلزالي. (1 ن)',
        '3. ما اسم النقطة الموجودة على السطح عمودياً فوق هذه المنطقة؟ (1 ن)',
        '4. اذكر وظيفة مسجل الزلازل. (1 ن)',
      ],
      correctionSteps: [
        {
          title: '1. تعريف الزلزال (1 ن)',
          explanation:
            'الزلزال ظاهرة طبيعية تتمثل في اهتزازات مفاجئة للأرض ناتجة عن تحرر الطاقة وانتشار الأمواج الزلزالية.',
          points: '1 ن',
        },
        {
          title: '2. تسمية المنطقة داخل الأرض (1 ن)',
          explanation: 'البؤرة الزلزالية.',
          points: '1 ن',
        },
        {
          title: '3. تسمية النقطة على السطح (1 ن)',
          explanation: 'المركز السطحي.',
          points: '1 ن',
        },
        {
          title: '4. وظيفة مسجل الزلازل (1 ن)',
          explanation:
            'تسجيل اهتزازات الأرض، أي الهزات الزلزالية، على شكل سجلات يُحلَّل بها مقدار الزلزال.',
          points: '1 ن',
        },
      ],
      finalAnswer:
        '1. الزلزال اهتزازات مفاجئة للأرض ناتجة عن تحرر الطاقة · 2. البؤرة الزلزالية · 3. المركز السطحي · 4. تسجيل اهتزازات الأرض، أي الهزات الزلزالية، على شكل سجلات يُحلَّل بها مقدار الزلزال.',
      commonMistake:
        'الخلط بين البؤرة والمركز السطحي. البؤرة داخل الأرض، أما المركز السطحي فعلى سطحها.',
    },
    {
      id: 'exo-svt-01-doc-analysis',
      number: '2',
      title: 'التمرين الثاني — تحليل وثيقة',
      points: '6 نقاط',
      difficulty: 'intermediate',
      difficultyLabel: 'تحليل وثيقة',
      measuredObjectives: ['2', '4', '5'],
      prompt: 'نعرض الجدول الآتي، وهو مثال تعليمي افتراضي وليس بيانات زلزال حقيقي :',
      table: {
        titleArabic: 'جدول الآثار الملاحظة بعد الزلزال حسب المناطق',
        headers: ['المنطقة', 'الملاحظات بعد الزلزال'],
        rows: [
          ['أ', 'أضرار كبيرة في بعض المباني'],
          ['ب', 'تشققات محدودة في بعض الجدران'],
          ['ج', 'لم تُسجل أضرار واضحة'],
        ],
      },
      subQuestions: [
        '1. رتّب المناطق حسب شدة الآثار الملاحظة، من الأكبر إلى الأصغر. (2 ن)',
        '2. هل يكفي هذا الجدول لتحديد مقدار الزلزال بدقة؟ علّل. (2 ن)',
        '3. اذكر جهازاً يمكن استعماله لتسجيل الاهتزازات الزلزالية. (2 ن)',
      ],
      correctionSteps: [
        {
          title: '1. ترتيب المناطق حسب شدة الآثار الملاحظة (2 ن)',
          explanation: 'المنطقة أ، ثم ب، ثم ج، وفق الآثار الموصوفة في الجدول.',
          points: '2 ن',
        },
        {
          title: '2. التعليل بخصوص كفاية الجدول (2 ن)',
          explanation:
            'لا؛ فالجدول يصف آثار الزلزال في مناطق مختلفة، ولا يقدم التسجيلات والبيانات اللازمة لتقدير المقدار.',
          points: '2 ن',
        },
        {
          title: '3. ذكر الجهاز المستعمل (2 ن)',
          explanation: 'مسجل الزلازل (السيسموغراف).',
          points: '2 ن',
        },
      ],
      finalAnswer:
        '1. أ ثم ب ثم ج · 2. لا يكفي لأن الجدول يصف الشدة (الآثار) ولا يعطي بيانات الطاقة المسجلة · 3. مسجل الزلازل (السيسموغراف).',
      commonMistake:
        'اعتبار المنطقة التي سجلت أكبر أضرار هي بالضرورة المنطقة التي يوجد فيها أكبر مقدار للزلزال. الأضرار تتأثر بالمسافة عن المركز السطحي، وعمق البؤرة، ومتانة المباني.',
    },
    {
      id: 'exo-svt-01-integration',
      number: '3',
      title: 'التمرين الثالث — وضعية إدماجية',
      points: '10 نقاط',
      difficulty: 'advanced',
      difficultyLabel: 'وضعية إدماجية',
      measuredObjectives: ['2', '4', '5'],
      prompt:
        'بعد حدوث زلزال، لاحظ تلميذ أن جهازاً خاصاً سجّل اهتزازات الأرض، وأن الأضرار كانت متفاوتة بين منطقتين. قال زميله: «إذا اختلفت الأضرار بين المنطقتين، فهذا يعني أن مقدار الزلزال مختلف».',
      subQuestions: [
        '1. حدّد الجهاز الذي يسجل الاهتزازات. (2 ن)',
        '2. فسّر سبب إمكان اختلاف الأضرار بين منطقتين رغم حدوث الزلزال نفسه. (3 ن)',
        '3. وضّح الخطأ في عبارة الزميل، مع التمييز بين مقدار الزلزال وشدته. (3 ن)',
        '4. اقترح إجراءين للوقاية من أخطار الزلازل. (2 ن)',
      ],
      correctionSteps: [
        {
          title: '1. تحديد الجهاز (2 ن)',
          explanation: 'مسجل الزلازل.',
          points: '2 ن',
        },
        {
          title: '2. تفسير اختلاف الأضرار بين المنطقتين (3 ن)',
          explanation:
            'يمكن أن تختلف الأضرار بسبب المسافة عن المركز السطحي، وعمق البؤرة، ومتانة المباني.',
          points: '3 ن',
        },
        {
          title: '3. توضيح الخطأ والتمييز بين المقدار والشدة (3 ن)',
          explanation:
            'الخطأ هو اعتبار اختلاف الأضرار دليلاً على اختلاف مقدار الزلزال. مقدار الزلزال يتعلق بمصدره والطاقة المحررة، أما الشدة فتصف آثاره في موقع معين، وقد تختلف من منطقة إلى أخرى للزلزال نفسه.',
          points: '3 ن',
        },
        {
          title: '4. اقتراح إجراءين للوقاية (2 ن)',
          explanation:
            'مثالان: بناء منشآت مقاومة للزلازل، والتعرف على تعليمات الإخلاء والسلامة واتباعها.',
          points: '2 ن',
        },
      ],
      finalAnswer:
        '1. مسجل الزلازل · 2. اختلاف المسافة عن المركز السطحي وعمق البؤرة ومتانة المباني · 3. المقدار يرتبط بمصدر الطاقة والشدة تصف التأثير الموضعي · 4. مبانٍ مضادة للزلازل واتباع إرشادات السلامة.',
      commonMistake:
        'استعمال كلمتي «المقدار» و«الشدة» على أنهما مترادفتان. التصحيح هو ربط المقدار بمصدر الزلزال، والشدة بآثاره في موقع معين.',
    },
  ],
};

// ============================================================================
// EMPLACEMENTS DE COURS PRÊTS POUR LE PROGRAMME SVT 3AM
// L'utilisateur fournira les cours rédigés au fur et à mesure
// ============================================================================
export const SVT_COURSES: SvtCourse[] = [
  COURSE_01_SVT,
  createSvtCourseSlot(
    2,
    'internal-geodynamics',
    'الديناميكية الداخلية للكرة الأرضية',
    'Dynamique interne du globe terrestre',
    'الدرس 02 : أمواج الزلازل وبنية الكرة الأرضية',
    'Ondes sismiques et structure interne du globe'
  ),
  createSvtCourseSlot(
    3,
    'internal-geodynamics',
    'الديناميكية الداخلية للكرة الأرضية',
    'Dynamique interne du globe terrestre',
    'الدرس 03 : نشاط الظهرات المحيطية وتمدد قاع المحيط',
    'Activité des dorsales océaniques et expansion'
  ),
  createSvtCourseSlot(
    4,
    'internal-geodynamics',
    'الديناميكية الداخلية للكرة الأرضية',
    'Dynamique interne du globe terrestre',
    'الدرس 04 : تكتونية الصفائح وحركات التباعد والتقارب',
    'Tectonique des plaques : convergence et divergence'
  ),
  createSvtCourseSlot(
    5,
    'internal-geodynamics',
    'الديناميكية الداخلية للكرة الأرضية',
    'Dynamique interne du globe terrestre',
    'الدرس 05 : ظاهرة الغوص والنشاط البركاني الانفجاري',
    'Subduction et volcanisme explosif'
  ),
  createSvtCourseSlot(
    6,
    'internal-geodynamics',
    'الديناميكية الداخلية للكرة الأرضية',
    'Dynamique interne du globe terrestre',
    'الدرس 06 : تشكل السلاسل الجبلية (الأطلس والهملايا)',
    'Formation des chaînes de montagnes'
  ),
  createSvtCourseSlot(
    7,
    'internal-geodynamics',
    'الديناميكية الداخلية للكرة الأرضية',
    'Dynamique interne du globe terrestre',
    'الدرس 07 : الإجراءات الوقائية والتنبؤ بالمخاطر الجيولوجية',
    'Prévention des risques sismiques et volcaniques'
  ),
  createSvtCourseSlot(
    8,
    'external-geodynamics',
    'الديناميكية الخارجية للكرة الأرضية',
    'Dynamique externe du globe terrestre',
    'الدرس 08 : تنوع المناظر الطبيعية وعلاقتها بطبيعة الصخور',
    'Paysages géologiques et diversité des roches'
  ),
  createSvtCourseSlot(
    9,
    'external-geodynamics',
    'الديناميكية الخارجية للكرة الأرضية',
    'Dynamique externe du globe terrestre',
    'الدرس 09 : أثر العوامل المناخية (الماء، الرياح، الحرارة) على الصخور',
    'Altération des roches par les facteurs climatiques'
  ),
  createSvtCourseSlot(
    10,
    'external-geodynamics',
    'الديناميكية الخارجية للكرة الأرضية',
    'Dynamique externe du globe terrestre',
    'الدرس 10 : آليات الحت والنقل والترسيب وتغير التضاريس',
    'Érosion, transport et sédimentation'
  ),
  createSvtCourseSlot(
    11,
    'external-geodynamics',
    'الديناميكية الخارجية للكرة الأرضية',
    'Dynamique externe du globe terrestre',
    'الدرس 11 : دور الإنسان في تطور المناظر الطبيعية وحمايتها',
    'Impact de l’Homme sur les paysages'
  ),
  createSvtCourseSlot(
    12,
    'natural-resources',
    'استغلال الموارد الطبيعية الباطنية',
    'Exploitation des ressources naturelles souterraines',
    'الدرس 12 : الموارد المائية الباطنية وأهميتها الاستراتيجية',
    'Ressources en eau souterraine et nappes'
  ),
  createSvtCourseSlot(
    13,
    'natural-resources',
    'استغلال الموارد الطبيعية الباطنية',
    'Exploitation des ressources naturelles souterraines',
    'الدرس 13 : المحروقات في الجزائر (البترول والغاز) ومراحل تشكلها',
    'Hydrocarbures en Algérie : pétrole et gaz'
  ),
  createSvtCourseSlot(
    14,
    'soil-protection',
    'التربة ثروة طبيعية هشة',
    'Le sol, une ressource naturelle fragile',
    'الدرس 14 : منشأ التربة ومكوناتها الحيوية والمعدنية',
    'Origine, composition et profils du sol'
  ),
  createSvtCourseSlot(
    15,
    'soil-protection',
    'التربة ثروة طبيعية هشة',
    'Le sol, une ressource naturelle fragile',
    'الدرس 15 : حماية التربة من الانجراف والتصحر والتلوث',
    'Préservation du sol contre l’érosion et la désertification'
  ),
];
