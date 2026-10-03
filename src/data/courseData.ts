import { CourseSection, ExerciseItem } from '../types';

export const COURSE_SECTIONS: CourseSection[] = [
  { id: 'section-objectives', number: '01', title: 'الأهداف التعليمية', shortLabel: 'الهدف' },
  { id: 'section-concept', number: '02', title: 'الفكرة الأساسية والنموذج البصري', shortLabel: 'الفكرة الأساسية' },
  { id: 'section-same-denominator', number: '03', title: 'كسران لهما نفس المقام', shortLabel: 'نفس المقام' },
  { id: 'section-different-denominators', number: '04', title: 'كسران لهما مقامان مختلفان', shortLabel: 'مقامات مختلفة' },
  { id: 'section-negative-fractions', number: '05', title: 'التعامل مع الكسور السالبة', shortLabel: 'الكسور السالبة' },
  { id: 'section-guided-examples', number: '06', title: 'أمثلة محلولة خطوة بخطوة', shortLabel: 'أمثلة محلولة' },
  { id: 'section-common-mistakes', number: '07', title: 'أخطاء شائعة ومطبات تجنبها', shortLabel: 'أخطاء شائعة' },
  { id: 'section-exercises', number: '08', title: 'تمارين تدريبية مع الحل المفصل', shortLabel: 'تمارين' },
  { id: 'section-summary', number: '09', title: 'خلاصة الدرس السريعة', shortLabel: 'الخلاصة' },
  { id: 'section-takeaways', number: '10', title: 'ما يجب أن أتذكره (المفكرة الذهبية)', shortLabel: 'ما يجب تذكره' },
  { id: 'section-mindmap', number: '11', title: 'الخريطة الذهنية ومخطط القرار', shortLabel: 'الخريطة الذهنية' },
];

export const EXERCISES_DATA: ExerciseItem[] = [
  {
    id: 'ex-01',
    number: '01',
    title: 'جمع كسرين لهما نفس المقام',
    difficulty: 'basic',
    difficultyLabel: 'أساسي',
    prompt: 'احسب العبارة التالية، واكتب النتيجة على شكل كسر غير قابل للاختزال:',
    mathExpression: 'A = \\frac{7}{15} + \\frac{4}{15}',
    hint: 'المقامان متساويان بالفعل (15)، احتفظ بالمقام واجمع البسطين مباشرة.',
    solutionSteps: [
      {
        title: 'الاحتفاظ بالمقام المشترك وجمع البسطين',
        explanation: 'المقام المشترك هو 15',
        math: 'A = \\frac{7 + 4}{15}',
      },
      {
        title: 'إجراء عملية الجمع في البسط',
        math: 'A = \\frac{11}{15}',
      },
      {
        title: 'التحقق من قابلية الاختزال',
        explanation: 'العددان 11 و 15 أوليان فيما بينهما (لا يوجد قاسم مشترك أكبر من 1)',
        math: '\\text{الكسر } \\frac{11}{15} \\text{ غير قابل للاختزال}',
      },
    ],
    finalAnswer: 'A = \\frac{11}{15}',
  },
  {
    id: 'ex-02',
    number: '02',
    title: 'طرح كسرين لهما مقامان مختلفان',
    difficulty: 'intermediate',
    difficultyLabel: 'متوسط',
    prompt: 'احسب وبسط العبارة التالية:',
    mathExpression: 'B = \\frac{5}{6} - \\frac{1}{4}',
    hint: 'ابحث عن المضاعف المشترك الأصغر للعددين 6 و 4 (وهو 12).',
    solutionSteps: [
      {
        title: 'إيجاد المقام المشترك الأصغر للعددين 6 و 4',
        explanation: 'مضاعفات 6: {6, 12, 18...} ومضاعفات 4: {4, 8, 12...}، إذن المقام المشترك هو 12',
        math: '6 \\times 2 = 12 \\quad \\text{و} \\quad 4 \\times 3 = 12',
      },
      {
        title: 'توحيد المقامات بضرب بسط ومقام كل كسر',
        math: 'B = \\frac{5 \\times 2}{6 \\times 2} - \\frac{1 \\times 3}{4 \\times 3} = \\frac{10}{12} - \\frac{3}{12}',
      },
      {
        title: 'طرح البسطين مع الاحتفاظ بالمقام 12',
        math: 'B = \\frac{10 - 3}{12} = \\frac{7}{12}',
      },
      {
        title: 'فحص قابلية الاختزال',
        explanation: 'العدد 7 عدد أولي ولا يقسم 12',
        math: '\\text{الكسر } \\frac{7}{12} \\text{ غير قابل للاختزال}',
      },
    ],
    finalAnswer: 'B = \\frac{7}{12}',
  },
  {
    id: 'ex-03',
    number: '03',
    title: 'الجمع في وجود كسر سالب',
    difficulty: 'intermediate',
    difficultyLabel: 'متوسط',
    prompt: 'احسب وبسط العبارة التالية مع الانتباه لإشارة الأعداد النسبية:',
    mathExpression: 'C = -\\frac{3}{5} + \\frac{7}{10}',
    hint: 'المقام 10 مضاعف للمقام 5، يكفي تحويل الكسر الأول فقط.',
    solutionSteps: [
      {
        title: 'ملاحظة علاقة المضاعفة بين المقامين',
        explanation: 'بما أن 10 مضاعف لـ 5 (10 = 5 × 2)، فإن المقام المشترك هو 10',
        math: '-\\frac{3}{5} = \\frac{-3 \\times 2}{5 \\times 2} = \\frac{-6}{10}',
      },
      {
        title: 'كتابة العملية بالمقام المشترك',
        math: 'C = \\frac{-6}{10} + \\frac{7}{10} = \\frac{-6 + 7}{10}',
      },
      {
        title: 'جمع عددين نسبيين مختلفين في الإشارة في البسط',
        explanation: '-6 + 7 = +1 (نأخذ إشارة الأكبر قيمة مسافة ونطرح المسافتين)',
        math: 'C = \\frac{1}{10}',
      },
    ],
    finalAnswer: 'C = \\frac{1}{10}',
  },
  {
    id: 'ex-04',
    number: '04',
    title: 'عملية مركبة من ثلاثة كسور',
    difficulty: 'advanced',
    difficultyLabel: 'متقدم',
    prompt: 'احسب العبارة التالية، ثم اكتب النتيجة على شكل كسر غير قابل للاختزال:',
    mathExpression: 'D = \\frac{5}{4} - \\frac{2}{3} + \\frac{1}{6}',
    hint: 'ابحث عن مضاعف مشترك أصغر للأعداد الثلاثة: 4، 3 و 6 (وهو 12).',
    solutionSteps: [
      {
        title: 'إيجاد المضاعف المشترك الأصغر للمقامات الثلاثة (4, 3, 6)',
        explanation: 'المقام المشترك للأعداد الثلاثة هو 12',
        math: '4 \\times 3 = 12, \\quad 3 \\times 4 = 12, \\quad 6 \\times 2 = 12',
      },
      {
        title: 'توحيد جميع المقامات',
        math: 'D = \\frac{5 \\times 3}{4 \\times 3} - \\frac{2 \\times 4}{3 \\times 4} + \\frac{1 \\times 2}{6 \\times 2} = \\frac{15}{12} - \\frac{8}{12} + \\frac{2}{12}',
      },
      {
        title: 'الجمع والطرح على بسط واحد من اليمين إلى اليسار',
        math: 'D = \\frac{15 - 8 + 2}{12} = \\frac{7 + 2}{12} = \\frac{9}{12}',
      },
      {
        title: 'تبسيط الكسر الناتج بالاختزال على 3',
        explanation: 'يقبل كل من 9 و 12 القسمة على 3 (القاسم المشترك الأكبر هو 3)',
        math: 'D = \\frac{9 \\div 3}{12 \\div 3} = \\frac{3}{4}',
      },
    ],
    finalAnswer: 'D = \\frac{3}{4}',
  },
];
