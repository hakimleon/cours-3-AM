export interface CurriculumItem {
  id: string;
  courseNumber?: string;
  title: string;
  domain: 'numerical' | 'geometric' | 'data' | 'integration' | 'exam' | 'vacation';
  linkedCourseId?: string;
  implemented: boolean;
  notes?: string;
}

export interface CurriculumWeek {
  weekNumber: number;
  month: string;
  isVacation?: boolean;
  isExam?: boolean;
  vacationTitle?: string;
  items: CurriculumItem[];
}

export interface CurriculumTerm {
  termId: 'term1' | 'term2' | 'term3';
  termTitle: string;
  termArabicSubtitle: string;
  period: string;
  color: string;
  badgeColor: string;
  weeks: CurriculumWeek[];
}

export const OFFICIAL_CURRICULUM: CurriculumTerm[] = [
  // ==========================================
  // الفصل الأول
  // ==========================================
  {
    termId: 'term1',
    termTitle: 'الفصل الأول',
    termArabicSubtitle: 'الأعداد النسبية، الكسور، تقايس المثلثات، قوى 10 والكتابة العلمية',
    period: 'سبتمبر — نوفمبر',
    color: 'indigo',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    weeks: [
      {
        weekNumber: 3,
        month: 'سبتمبر',
        items: [
          {
            id: 't1-w3-1',
            title: 'تقويم تشخيصي للمكتسبات القبلية',
            domain: 'integration',
            implemented: true,
            notes: 'تشخيص مكتسبات 2AM في الأعداد النسبية والهندسة',
          },
        ],
      },
      {
        weekNumber: 4,
        month: 'سبتمبر',
        items: [
          {
            id: 't1-w4-0',
            title: 'الوضعية الانطلاقية الأم (المقطع 1: الأعداد النسبية)',
            domain: 'integration',
            implemented: true,
          },
          {
            id: 't1-w4-1',
            title: 'حساب جداء عددين نسبيين ومراجعة قواعد الإشارات',
            domain: 'numerical',
            linkedCourseId: 'lesson-01',
            implemented: true,
          },
          {
            id: 't1-w4-2',
            title: 'حساب جداء عدة أعداد نسبية وإشارة الجداء بعدد العوامل السالبة',
            domain: 'numerical',
            linkedCourseId: 'lesson-01',
            implemented: true,
          },
        ],
      },
      {
        weekNumber: 1,
        month: 'أكتوبر',
        items: [
          {
            id: 't1-w1-1',
            title: 'حساب حاصل قسمة عددين نسبيين',
            domain: 'numerical',
            linkedCourseId: 'lesson-02',
            implemented: true,
          },
          {
            id: 't1-w1-2',
            title: 'تعيين مقلوب عدد غير معدوم (a × 1/a = 1)',
            domain: 'numerical',
            linkedCourseId: 'lesson-03',
            implemented: true,
          },
          {
            id: 't1-w1-3',
            title: 'قسمة كسرين (الضرب في مقلوب الكسر الثاني)',
            domain: 'numerical',
            linkedCourseId: 'lesson-04',
            implemented: true,
          },
          {
            id: 't1-w1-4',
            title: 'مقارنة كسرين وتوحيد المقامات',
            domain: 'numerical',
            linkedCourseId: 'lesson-05',
            implemented: true,
          },
        ],
      },
      {
        weekNumber: 2,
        month: 'أكتوبر',
        items: [
          {
            id: 't1-w2-1',
            title: 'جمع وطرح كسرين (بنفس المقام وبمقامات مختلفة)',
            domain: 'numerical',
            linkedCourseId: 'lesson-06',
            implemented: true,
          },
          {
            id: 't1-w2-2',
            title: 'التعرف على العدد الناطق وإشارته وموقعه',
            domain: 'numerical',
            linkedCourseId: 'lesson-07',
            implemented: true,
          },
          {
            id: 't1-w2-3',
            title: 'حساب مجموع وفرق وجداء وحاصل قسمة عددين ناطقين',
            domain: 'numerical',
            linkedCourseId: 'lesson-08',
            implemented: true,
          },
        ],
      },
      {
        weekNumber: 3,
        month: 'أكتوبر',
        items: [
          {
            id: 't1-w3-int-1',
            title: 'وضعية تعلم الإدماج وحل الوضعية الانطلاقية للأعداد الناطقة',
            domain: 'integration',
            implemented: true,
          },
          {
            id: 't1-w3-int-2',
            title: 'وضعية تقويمية ومعالجة بيداغوجية للأخطاء الشائعة',
            domain: 'integration',
            implemented: true,
          },
        ],
      },
      {
        weekNumber: 4,
        month: 'أكتوبر',
        items: [
          {
            id: 't1-w4-geom-0',
            title: 'الوضعية الانطلاقية الأم (المقطع 2: المثلثات والتحويلات)',
            domain: 'integration',
            implemented: true,
          },
          {
            id: 't1-w4-geom-1',
            title: 'معرفة حالات تقايس المثلثات واستعمالها في البراهين البسيطة',
            domain: 'geometric',
            linkedCourseId: 'lesson-10',
            implemented: true,
          },
          {
            id: 't1-w4-geom-2',
            title: 'معرفة خواص مستقيم المنتصفين واستعمالها في البراهين البسيطة',
            domain: 'geometric',
            linkedCourseId: 'lesson-11',
            implemented: true,
          },
          {
            id: 't1-w4-geom-3',
            title: 'تناسبية أطوال الأضلاع لمثلثين يقطعهما قاطعان متوازيان (خاصية طاليس في المثلث)',
            domain: 'geometric',
            linkedCourseId: 'lesson-12',
            implemented: true,
          },
          {
            id: 't1-w4-geom-4',
            title: 'تعريف وإنشاء المستقيمات الخاصة في المثلث (المتوسطات، المنصفات، المحاور، والارتفاعات)',
            domain: 'geometric',
            implemented: false,
            notes: 'مقرر إدراجه بالمعمل التفاعلي الهندسي',
          },
        ],
      },
      {
        weekNumber: 0,
        month: 'نوفمبر',
        isVacation: true,
        vacationTitle: 'عطلة الخريف',
        items: [],
      },
      {
        weekNumber: 1,
        month: 'نوفمبر',
        items: [
          {
            id: 't1-nov-1',
            title: 'تعيين القوة من الرتبة n للعدد 10 ومعرفة واستعمال قواعد الحساب على قوى 10',
            domain: 'numerical',
            linkedCourseId: 'lesson-13',
            implemented: true,
          },
          {
            id: 't1-nov-2',
            title: 'الأسس الموجبة والسالبة وعلاقة المقلوب 10⁻ⁿ = 1/10ⁿ',
            domain: 'numerical',
            linkedCourseId: 'lesson-14',
            implemented: true,
          },
          {
            id: 't1-nov-3',
            title: 'كتابة عدد عشري باستعمال قوى 10 والكتابة العلمية لعدد عشري',
            domain: 'numerical',
            linkedCourseId: 'lesson-15',
            implemented: true,
          },
        ],
      },
      {
        weekNumber: 2,
        month: 'نوفمبر',
        items: [
          {
            id: 't1-nov-4',
            title: 'استعمال الكتابة العلمية لحصر عدد عشري ولإيجاد رتبة مقدار عدد',
            domain: 'numerical',
            linkedCourseId: 'lesson-15',
            implemented: true,
          },
          {
            id: 't1-nov-5',
            title: 'حساب قوة عدد نسبي aⁿ وتأثير إشارة الأساس والأس الزوجي والفردي',
            domain: 'numerical',
            linkedCourseId: 'lesson-16',
            implemented: true,
            notes: 'الدرس السادس عشر: مفهوم القوة، إشارة الناتج، فخ الأقواس وقواعد الحساب',
          },
          {
            id: 't1-nov-6',
            title: 'قواعد الحساب على قوى عدد نسبي واستعمالها في وضعيات بسيطة',
            domain: 'numerical',
            linkedCourseId: 'lesson-16',
            implemented: true,
            notes: 'مشمول ومفصل بالكامل ضمن الدرس السادس عشر بالمعمل التفاعلي والتمارين',
          },
          {
            id: 't1-nov-7',
            title: 'إجراء حساب يتضمن قوى وأولويات العمليات الرياضية',
            domain: 'numerical',
            linkedCourseId: 'lesson-17',
            implemented: true,
            notes: 'الدرس 17: إجراء حساب يتضمن قوى وأولويات العمليات الرياضية والأقواس والكسور',
          },
        ],
      },
      {
        weekNumber: 3,
        month: 'نوفمبر',
        items: [
          {
            id: 't1-nov-8',
            title: 'تعميق وممارسة الحساب على قوى الأعداد النسبية والكتابة العلمية',
            domain: 'numerical',
            implemented: false,
          },
          {
            id: 't1-nov-9',
            title: 'إجراء حسابات مركبة تتضمن قوى وكسور',
            domain: 'numerical',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 4,
        month: 'نوفمبر',
        items: [
          {
            id: 't1-nov-10',
            title: 'وضعية تعلم الإدماج للمقطع 3 (القوى والحساب العددي)',
            domain: 'integration',
            implemented: false,
          },
          {
            id: 't1-nov-11',
            title: 'حل الوضعية الانطلاقية، وضعية تقويمية ومعالجة بيداغوجية شاملة للفصل الأول',
            domain: 'integration',
            implemented: false,
          },
        ],
      },
    ],
  },

  // ==========================================
  // الفصل الثاني
  // ==========================================
  {
    termId: 'term2',
    termTitle: 'الفصل الثاني',
    termArabicSubtitle: 'خاصية فيثاغورس، جيب تمام زاوية، الحساب الحرفي، الانسحاب والهندسة الفضائية',
    period: 'جانفي — مارس',
    color: 'emerald',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    weeks: [
      {
        weekNumber: 1,
        month: 'ديسمبر / جانفي',
        isVacation: true,
        vacationTitle: 'عطلة الشتاء',
        items: [],
      },
      {
        weekNumber: 2,
        month: 'جانفي',
        items: [
          {
            id: 't2-jan-0',
            title: 'الوضعية الانطلاقية الأم للمثلث القائم والدائرة',
            domain: 'integration',
            implemented: false,
          },
          {
            id: 't2-jan-1',
            courseNumber: '18',
            title: 'المتوسط المتعلق بالوتر',
            domain: 'geometric',
            linkedCourseId: 'lesson-18',
            implemented: true,
            notes: 'الدرس 18: خاصية المتوسط المتعلق بالوتر في المثلث القائم (AM = ½ BC) والخاصية العكسية',
          },
          {
            id: 't2-jan-2',
            courseNumber: '19',
            title: 'الدائرة المحيطة بالمثلث القائم',
            domain: 'geometric',
            linkedCourseId: 'lesson-19',
            implemented: true,
            notes: 'الدرس 19: خاصية الدائرة المحيطة بالمثلث القائم، الخاصية العكسية ومركز الدائرة (R = ½ BC)',
          },
          {
            id: 't2-jan-3',
            courseNumber: '20',
            title: 'خاصية فيثاغورس',
            domain: 'geometric',
            linkedCourseId: 'lesson-20',
            implemented: true,
            notes: 'الدرس 20: خاصية فيثاغورس BC² = BA² + CA²، حساب الوتر والضلع القائم، والتفسير بمساحات المربعات',
          },
        ],
      },
      {
        weekNumber: 3,
        month: 'جانفي',
        items: [
          {
            id: 't2-jan-4',
            courseNumber: '21',
            title: 'عكس خاصية فيثاغورس وتطبيقاتها',
            domain: 'geometric',
            linkedCourseId: 'lesson-21',
            implemented: true,
            notes: 'الدرس 21: عكس خاصية فيثاغورس للتحقق من أن المثلث قائم الزاوية وإثبات التعامد وتطبيقاتها الهندسية',
          },
          {
            id: 't2-jan-5',
            title: 'بعد نقطة عن مستقيم',
            domain: 'geometric',
            implemented: false,
          },
          {
            id: 't2-jan-6',
            title: 'الوضعيات النسبية لمستقيم ودائرة — مماس الدائرة',
            domain: 'geometric',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 4,
        month: 'جانفي',
        items: [
          {
            id: 't2-jan-7',
            title: 'جيب تمام زاوية حادة',
            domain: 'geometric',
            implemented: false,
          },
          {
            id: 't2-jan-8',
            title: 'حساب أطوال باستعمال جيب تمام زاوية حادة',
            domain: 'geometric',
            implemented: false,
          },
          {
            id: 't2-jan-10',
            title: 'الوضعية الانطلاقية الأم للحساب الحرفي والمعادلات',
            domain: 'integration',
            implemented: false,
          },
          {
            id: 't2-jan-11',
            title: 'تبسيط عبارة جبرية وحذف الأقواس',
            domain: 'numerical',
            implemented: false,
          },
          {
            id: 't2-jan-12',
            title: 'نشر عبارات جبرية من الشكل: (a+b)(c+d) حيث a و b و c و d أعداد نسبية',
            domain: 'numerical',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 1,
        month: 'فيفري',
        items: [
          {
            id: 't2-feb-1',
            title: 'حساب قيمة عبارة حرفية من أجل قيم معطاة للمتغيرات',
            domain: 'numerical',
            implemented: false,
          },
          {
            id: 't2-feb-2',
            title: 'مقارنة عددين ناطقين والخواص المتعلقة بالمساويات والمتباينات مع العمليات',
            domain: 'numerical',
            implemented: false,
          },
          {
            id: 't2-feb-3',
            title: 'ترييض مشكلات وحلها بتوظيف المعادلات من الدرجة الأولى ذات مجهول واحد',
            domain: 'numerical',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 2,
        month: 'فيفري',
        items: [
          {
            id: 't2-feb-4',
            title: 'وضعية تعلم الإدماج للحساب الحرفي والمعادلات',
            domain: 'integration',
            implemented: false,
          },
          {
            id: 't2-feb-5',
            title: 'حل الوضعية الانطلاقية، وضعية تقويمية ومعالجة بيداغوجية',
            domain: 'integration',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 3,
        month: 'فيفري',
        items: [
          {
            id: 't2-feb-6',
            title: 'الوضعية الانطلاقية الأم للانسحاب والهندسة الفضائية',
            domain: 'integration',
            implemented: false,
          },
          {
            id: 't2-feb-7',
            title: 'تعريف الانسحاب انطلاقاً من متوازي الأضلاع (الاتجاه، المنحى، والطول)',
            domain: 'geometric',
            implemented: false,
          },
          {
            id: 't2-feb-8',
            title: 'إنشاء صور: نقطة، قطعة مستقيم، نصف مستقيم، مستقيم، ودائرة بالانسحاب',
            domain: 'geometric',
            implemented: false,
          },
          {
            id: 't2-feb-9',
            title: 'معرفة خواص الانسحاب وتوظيفها (حفظ المسافات، الاستقامية، الأقياس، والمساحات)',
            domain: 'geometric',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 4,
        month: 'فيفري',
        items: [
          {
            id: 't2-feb-10',
            title: 'وصف هرم ومخروط الدوران وعناصرهما الأساسية',
            domain: 'geometric',
            implemented: false,
          },
          {
            id: 't2-feb-11',
            title: 'تمثيل الهرم ومخروط الدوران في المنظور متساوي القياس',
            domain: 'geometric',
            implemented: false,
          },
          {
            id: 't2-feb-12',
            title: 'إنجاز تصميم لهرم ومخروط الدوران بأبعاد معلومة وصنعهما',
            domain: 'geometric',
            implemented: false,
          },
          {
            id: 't2-feb-13',
            title: 'حساب حجم كل من الهرم ومخروط الدوران (V = 1/3 × B × h)',
            domain: 'geometric',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 1,
        month: 'مارس',
        items: [
          {
            id: 't2-mar-1',
            title: 'وضعية تعلم الإدماج الشامل للانسحاب والهندسة الفضائية',
            domain: 'integration',
            implemented: false,
          },
          {
            id: 't2-mar-2',
            title: 'حل الوضعية الانطلاقية، وضعية تقويمية ومعالجة بيداغوجية',
            domain: 'integration',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 2,
        month: 'مارس',
        isExam: true,
        items: [
          {
            id: 't2-mar-exam',
            title: 'اختبارات الفصل الثاني الرسمية',
            domain: 'exam',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 3,
        month: 'مارس',
        items: [
          {
            id: 't2-mar-remed',
            title: 'معالجة بيداغوجية وتصحيح مفصل لاختبارات الفصل الثاني',
            domain: 'integration',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 4,
        month: 'مارس',
        isVacation: true,
        vacationTitle: 'عطلة الربيع',
        items: [],
      },
    ],
  },

  // ==========================================
  // الفصل الثالث
  // ==========================================
  {
    termId: 'term3',
    termTitle: 'الفصل الثالث',
    termArabicSubtitle: 'التناسبية، السرعة المتوسطة، والأنشطة الإحصائية وتنظيم المعطيات',
    period: 'أفريل — ماي',
    color: 'amber',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    weeks: [
      {
        weekNumber: 1,
        month: 'أفريل',
        isVacation: true,
        vacationTitle: 'عطلة الربيع',
        items: [],
      },
      {
        weekNumber: 2,
        month: 'أفريل',
        items: [
          {
            id: 't3-apr-0',
            title: 'الوضعية الانطلاقية الأم للتناسبية وتنظيم المعطيات',
            domain: 'integration',
            implemented: false,
          },
          {
            id: 't3-apr-1',
            title: 'التعرف على وضعية تناسبية في تمثيل بياني (مستقيم يمر من المبدأ)',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-2',
            title: 'التعرف على الحركة المنتظمة وتناسب المسافة مع الزمن',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-3',
            title: 'توظيف التناسبية لحساب النسبة المئوية في وضعيات مختلفة',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-4',
            title: 'استعمال المساواة v = d / t في حسابات المسافة المقطوعة والسرعة والزمن',
            domain: 'data',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 3,
        month: 'أفريل',
        items: [
          {
            id: 't3-apr-5',
            title: 'تحويل وحدات قياس السرعة (من m/s إلى km/h والعكس)',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-6',
            title: 'استعمال التناسبية في وضعيات متقدمة تدخل فيها النسبة المئوية (التخفيض والزيادة)',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-7',
            title: 'تجميع معطيات إحصائية في فئات وتنظيمها في جداول إحصائية',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-8',
            title: 'حساب التكرارات والتكرارات المجمعة',
            domain: 'data',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 4,
        month: 'أفريل',
        items: [
          {
            id: 't3-apr-9',
            title: 'تقديم سلسلة إحصائية وتمثيلها بمخططات (الأشرطة، المدرج التكراري، المخطط الدائري)',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-10',
            title: 'حساب التكرارات النسبية والنسب المئوية الموافقة',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-11',
            title: 'حساب المتوسط المتوازن لسلسلة إحصائية (Moyenne pondérée)',
            domain: 'data',
            implemented: false,
          },
          {
            id: 't3-apr-12',
            title: 'استعمال المجدولات الرقمية (مثل Excel) في استغلال وتنظيم معطيات إحصائية',
            domain: 'data',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 1,
        month: 'ماي',
        items: [
          {
            id: 't3-may-1',
            title: 'وضعية تعلم الإدماج الشامل للتناسبية والإحصاء',
            domain: 'integration',
            implemented: false,
          },
          {
            id: 't3-may-2',
            title: 'حل الوضعية الانطلاقية، وضعية تقويمية ومعالجة بيداغوجية ختامية',
            domain: 'integration',
            implemented: false,
          },
        ],
      },
      {
        weekNumber: 2,
        month: 'ماي',
        isExam: true,
        items: [
          {
            id: 't3-may-exam',
            title: 'اختبارات الفصل الثالث ونهاية السنة الدراسية',
            domain: 'exam',
            implemented: false,
          },
        ],
      },
    ],
  },
];
