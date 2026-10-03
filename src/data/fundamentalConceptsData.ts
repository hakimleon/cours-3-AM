export interface FundamentalConcept {
  id: string;
  termAr: string;
  termFr: string;
  levelOrigin: string; // e.g. "مكتسبات 1AM / 2AM"
  category: 'droites' | 'quadrilateres' | 'triangles_cercles' | 'angles_symetries' | 'numerique';
  categoryLabelAr: string;
  categoryLabelFr: string;
  keywords: string[];
  definitionAr: string;
  definitionFr: string;
  keyPropertiesAr: string[];
  keyPropertiesFr: string[];
  howToProveAr: string;
  howToProveFr: string;
  commonConfusionAr: string;
  commonConfusionFr: string;
  formulaLatex?: string;
  relatedTreatiseIds?: number[];
}

export const FUNDAMENTAL_CONCEPTS: FundamentalConcept[] = [
  // ==========================================================================
  // A. مكتسبات الأعداد النسبية والكسور والأعداد الناطقة والقوى (Courses 01–09, 13–17)
  // ==========================================================================
  {
    id: 'nombre-relatif',
    termAr: 'العدد النسبي (موجب / سالب)',
    termFr: 'Le Nombre relatif (positif / négatif)',
    levelOrigin: 'مكتسبات السنة الثانية متوسط (2AM)',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['الأعداد النسبية', 'عددين نسبيين', 'عددان نسبيان', 'عدد نسبي', 'العدد النسبي'],
    definitionAr:
      'العدد النسبي هو كل عدد مسبوق بإشارة (+) ويسمى عدداً نسبياً موجباً (أكبر من 0)، أو مسبوق بإشارة (-) ويسمى عدداً نسبياً سالباً (أصغر من 0). العدد 0 هو العدد النسبي الوحيد الموجب والسالب في آن واحد.',
    definitionFr:
      'Un nombre relatif est formé d’un signe (+ ou -) et d’une partie numérique appelée distance à zéro. 0 est à la fois positif et négatif.',
    keyPropertiesAr: [
      'يتكون كل عدد نسبي من جزأين: الإشارة (+ أو -) والمسافة إلى الصفر (الجزء العددي بدون إشارة).',
      'كل عدد موجب هو أكبر من كل عدد سالب: مثلاً (+1) > (-100).',
      'بين عددين سالبين، الأكبر هو الأقرب إلى الصفر (الأصغر مسافة إلى الصفر): مثلاً (-2) > (-7).',
    ],
    keyPropertiesFr: [
      'Tout nombre positif est supérieur à tout nombre négatif.',
      'De deux nombres négatifs, le plus grand est celui qui a la plus petite distance à zéro.',
    ],
    howToProveAr:
      'في الجمع: إذا كان للعددين نفس الإشارة نحتفظ بها ونجمع المسافتين؛ وإذا اختلفا في الإشارة نأخذ إشارة الأبعد عن الصفر ونطرح المسافتين.',
    howToProveFr:
      'Addition : même signe → on garde le signe et on additionne les distances ; signes contraires → signe du plus grand en distance et on soustrait.',
    commonConfusionAr:
      'لا تخلط بين قاعدة إشارات «المجموع» (نأخذ إشارة الأبعد عن الصفر) وقاعدة إشارات «الجداء والقسمة» (السالب في السالب يعطي موجباً).',
    commonConfusionFr:
      'Ne pas confondre la règle des signes de l’addition avec celle de la multiplication (« moins par moins donne plus »).',
    formulaLatex: '(-5) + (-3) = -8 \\quad ; \\quad (-5) + (+3) = -2 \\quad ; \\quad (-5) \\times (-3) = +15',
  },
  {
    id: 'distance-a-zero',
    termAr: 'المسافة إلى الصفر',
    termFr: 'La Distance à zéro',
    levelOrigin: 'مكتسبات السنة الثانية متوسط (2AM)',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: [
      'المسافة إلى الصفر',
      'مسافتهما إلى الصفر',
      'مسافته إلى الصفر',
      'مسافته عن الصفر',
      'المسافة عن الصفر',
      'المسافتين',
      'الأبعد عن الصفر',
      'أبعد عن الصفر',
      'قيمته المطلقة',
      'القيمة المطلقة',
      'المستقيم المدرج',
      'المحور المدرج',
    ],
    definitionAr:
      'المسافة إلى الصفر لعدد نسبي (أو قيمته المطلقة) هي طول القطعة الفاصلة بين مبدأ المستقيم المدرج (0) والنقطة الممثلة لهذا العدد، وهي عدد موجب دائماً (تُقرأ بحذف إشارة العدد).',
    definitionFr:
      'La distance à zéro d’un nombre relatif est le nombre sans son signe (longueur entre l’origine 0 et le point sur la droite graduée).',
    keyPropertiesAr: [
      'المسافة إلى الصفر للعدد (-7) هي 7، والمسافة إلى الصفر للعدد (+7) هي 7 أيضاً.',
      'العددان المتعاكسان لهما نفس المسافة إلى الصفر وإشارتان مختلفتان.',
      'العدد الأبعد عن الصفر هو صاحب المسافة إلى الصفر الأكبر: مثلاً (-9) أبعد عن الصفر من (+4) لأن 9 > 4.',
    ],
    keyPropertiesFr: [
      'La distance à zéro est toujours positive : celle de -7 est 7, celle de +4 est 4.',
      'Deux nombres opposés ont la même distance à zéro.',
    ],
    howToProveAr:
      'لمعرفة إشارة مجموع عددين مختلفين في الإشارة، نقارن مسافتيهما إلى الصفر دون إشارة: صاحب المسافة الأكبر يفرض إشارته على الناتج.',
    howToProveFr:
      'Pour additionner deux relatifs de signes contraires, celui qui a la plus grande distance à zéro impose son signe.',
    commonConfusionAr:
      'العدد (-8) أصغر من (+3)، لكن المسافة إلى الصفر للعدد (-8) هي 8 وهي أكبر من المسافة إلى الصفر للعدد (+3) التي تساوي 3.',
    commonConfusionFr:
      'Bien que -8 < +3, la distance à zéro de -8 (qui vaut 8) est plus grande que celle de +3 (qui vaut 3).',
    formulaLatex: '|-7| = 7 \\quad ; \\quad |+4| = 4',
  },
  {
    id: 'regle-des-signes',
    termAr: 'قاعدة الإشارات في الضرب والقسمة',
    termFr: 'Règle des signes (Multiplication et Division)',
    levelOrigin: 'مكتسبات 2AM + 3AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: [
      'قاعدة الإشارات',
      'قاعدة إشارات',
      'نفس الإشارة',
      'مختلفي الإشارة',
      'إشارتان مختلفتان',
      'إشارتين متماثلتين',
      'إشارتين مختلفتين',
    ],
    definitionAr:
      'جداء (أو حاصل قسمة) عددين نسبيين لهما نفس الإشارة هو عدد موجب دائماً (+). وجداء (أو حاصل قسمة) عددين نسبيين مختلفي الإشارة هو عدد سالب دائماً (-).',
    definitionFr:
      'Le produit ou le quotient de deux nombres relatifs de même signe est positif (+). S’ils sont de signes contraires, il est négatif (-).',
    keyPropertiesAr: [
      'موجب × موجب = موجب (+)  ؛  سالب × سالب = موجب (+).',
      'موجب × سالب = سالب (-)  ؛  سالب ÷ موجب = سالب (-).',
      'في جداء عدة عوامل نسبية: إذا كان عدد العوامل السالبة زوجياً فالناتج موجب، وإذا كان فردياً فالناتج سالب.',
    ],
    keyPropertiesFr: [
      '(+) × (+) = (+)  ;  (-) × (-) = (+).',
      '(+) × (-) = (-)  ;  (-) ÷ (+) = (-).',
    ],
    howToProveAr:
      'نحدد إشارة الناتج أولاً بتطبيق قاعدة الإشارات، ثم نضرب (أو نقسم) المسافتين إلى الصفر بدون إشارة.',
    howToProveFr:
      'Déterminer d’abord le signe grâce à la règle des signes, puis multiplier ou diviser les distances à zéro.',
    commonConfusionAr:
      'حذارِ من الخلط بين الجمع والضرب: (-4) + (-3) = -7 (جمع عددين سالبين يبقى سالباً)، بينما (-4) × (-3) = +12 (جداء سالبين يصبح موجباً)!',
    commonConfusionFr:
      'Ne pas confondre (-4) + (-3) = -7 (addition) et (-4) × (-3) = +12 (multiplication) !',
    formulaLatex: '(-) \\times (-) = (+) \\quad ; \\quad (-) \\div (-) = (+) \\quad ; \\quad (+) \\times (-) = (-)',
  },
  {
    id: 'inverse-oppose',
    termAr: 'مقلوب عدد ومعاكس عدد',
    termFr: 'Inverse et Opposé d’un nombre',
    levelOrigin: 'مكتسبات 2AM + 3AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['العددان المتعاكسان', 'عددان متعاكسان', 'متعاكسان', 'معاكس', 'المعاكس', 'مقلوب عدد', 'المقلوب', 'مقلوب'],
    definitionAr:
      'معاكس العدد x هو العدد (-x) الذي له نفس المسافة إلى الصفر وإشارة معاكسة، ومجموعهما يساوي 0. أما مقلوب عدد غير معدوم x فهو العدد (1/x) الذي جداءه في x يساوي 1 (ومقلوب الكسر a/b هو b/a).',
    definitionFr:
      'L’opposé de x est -x (leur somme vaut 0). L’inverse d’un nombre non nul a/b est b/a (leur produit vaut 1).',
    keyPropertiesAr: [
      'العدد ومعاكسه مجموعهما 0: مثلاً (+6) + (-6) = 0. لطرح عدد نسبي نضيف معاكسه.',
      'العدد ومقلوبه لهما دائماً نفس الإشارة وجداؤهما 1: مثلاً مقلوب (-3/5) هو (-5/3).',
      'القسمة على عدد غير معدوم هي الضرب في مقلوبه: A ÷ B = A × (1/B).',
    ],
    keyPropertiesFr: [
      'Somme d’un nombre et de son opposé = 0. Soustraire un nombre revient à ajouter son opposé.',
      'Produit d’un nombre et de son inverse = 1. Diviser revient à multiplier par l’inverse.',
    ],
    howToProveAr:
      'للتحقق أن عددين متعاكسان نحسب مجموعهما فنجده 0. وللتحقق أن أحدهما مقلوب الآخر نحسب جداءهما فنجده 1.',
    howToProveFr:
      'Somme = 0 → opposés. Produit = 1 → inverses.',
    commonConfusionAr:
      'حذارِ: المقلوب لا يغير الإشارة أبداً (يقلب البسط والمقام فقط)، بينما المعاكس يغير الإشارة ولا يقلب الكسر!',
    commonConfusionFr:
      'Attention : l’inverse conserve le signe et inverse numérateur/dénominateur, tandis que l’opposé change uniquement le signe !',
    formulaLatex: 'x + (-x) = 0 \\quad ; \\quad \\frac{a}{b} \\times \\frac{b}{a} = 1',
  },
  {
    id: 'unification-denominateurs',
    termAr: 'توحيد المقامات والمضاعف المشترك الأصغر',
    termFr: 'Réduction au même dénominateur (PPCM)',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['توحيد المقامات', 'بتوحيد المقامات', 'توحيد مقاميهما', 'مقام مشترك', 'المقام المشترك', 'المضاعف المشترك الأصغر'],
    definitionAr:
      'توحيد مقامي كسرين هو كتابتهما بنفس المقام (مقام مشترك موجب) دون تغيير قيمتيهما، وذلك بضرب بسط ومقام كل كسر في نفس العدد غير المعدوم.',
    definitionFr:
      'Réduire deux fractions au même dénominateur consiste à les écrire avec un dénominateur commun (souvent le plus petit multiple commun PPCM) en multipliant numérateur et dénominateur par un même nombre non nul.',
    keyPropertiesAr: [
      'القاعدة الذهبية للكسور: لا تتغير قيمة كسر إذا ضربنا (أو قسمنا) بسطه ومقامه في نفس العدد غير المعدوم.',
      'توحيد المقامات إجباري في «جمع وطرح الكسور» وفي «مقارنة الكسور»، لكنه غير مطلوب في «ضرب وقسمة الكسور».',
      'أفضل مقام مشترك هو المضاعف المشترك الأصغر (PPCM) للمقامين لتجنب الأعداد الكبيرة.',
    ],
    keyPropertiesFr: [
      'Obligatoire pour additionner, soustraire ou comparer deux fractions.',
      'Inutile pour multiplier ou diviser deux fractions.',
    ],
    howToProveAr:
      'إذا كان أحد المقامين مضاعفاً للآخر نكتفي بتحويل الكسر ذي المقام الأصغر؛ وإلا نبحث عن أصغر مضاعف مشترك للمقامين.',
    howToProveFr:
      'On cherche le plus petit multiple commun aux deux dénominateurs.',
    commonConfusionAr:
      'خطأ شائع جداً: جمع البسط مع البسط والمقام مع المقام! لا نجمع المقامين أبداً بل نحتفظ بالمقام المشترك الموحّد ونجمع البسطين فقط.',
    commonConfusionFr:
      'Erreur classique : ne jamais additionner les dénominateurs entre eux ! On garde le dénominateur commun.',
    formulaLatex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\times d + c \\times b}{b \\times d}',
  },
  {
    id: 'fraction-irreductible',
    termAr: 'اختزال كسر والكسر غير القابل للاختزال',
    termFr: 'Simplification et Fraction irréductible',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['كسر غير قابل للاختزال', 'غير قابل للاختزال', 'اختزال الكسر', 'اختزال', 'القاسم المشترك الأكبر'],
    definitionAr:
      'اختزال كسر هو قسمة كل من بسطه ومقامه على قاسم مشترك لهما (غير الواحد) للحصول على كسر مساوٍ له بأعداد أصغر. نقول عن كسر إنه غير قابل للاختزال إذا لم يقبل البسط والمقام أي قاسم مشترك غير 1.',
    definitionFr:
      'Simplifier une fraction consiste à diviser son numérateur et son dénominateur par un même diviseur commun non nul. Elle est irréductible lorsque leur PGCD vaut 1.',
    keyPropertiesAr: [
      'الاختزال باستعمال قواعد قابلية القسمة على 2 (الأعداد الزوجية)، على 3 (مجموع الأرقام مضاعف لـ 3)، على 5 (ينتهي بـ 0 أو 5).',
      'في ضرب الكسور، يُستحسن الاختزال قبل إجراء عملية الضرب لتبسيط الحسابات.',
    ],
    keyPropertiesFr: [
      'Utiliser les critères de divisibilité par 2, 3, 5, 9, 10.',
      'Dans un produit de fractions, simplifier avant de multiplier.',
    ],
    howToProveAr:
      'نقسم البسط والمقام على أكبر قاسم مشترك لهما (PGCD) مباشرة أو على مراحل متتالية.',
    howToProveFr:
      'Diviser le numérateur et le dénominateur par leur PGCD.',
    commonConfusionAr:
      'لا يجوز الاختزال عبر عملية الجمع (مثلاً في (3+5)/3 لا يمكن شطب 3 مع 3)! الاختزال مسموح فقط في الجداء (العوامل المضروبة).',
    commonConfusionFr:
      'On ne peut simplifier que des facteurs d’un produit, jamais des termes d’une somme !',
    formulaLatex: '\\frac{a \\times k}{b \\times k} = \\frac{a}{b} \\quad (k \\neq 0)',
  },
  {
    id: 'produit-en-croix',
    termAr: 'الجداء المتصالب والتناسبية',
    termFr: 'Le Produit en croix et la Proportionnalité',
    levelOrigin: 'مكتسبات 2AM + 3AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['الجداء المتصالب', 'الجداءين المتصالبين', 'الرابع المتناسب', 'تناسبية الأطوال'],
    definitionAr:
      'خاصية الجداء المتصالب تنص على أن الكسرين a/b و c/d متساويان إذا وفقط إذا كان جداء الوسطين يساوي جداء الطرفين: a × d = b × c (مع b ≠ 0 و d ≠ 0).',
    definitionFr:
      'Deux quotients a/b et c/d sont égaux si et seulement si les produits en croix sont égaux : a × d = b × c.',
    keyPropertiesAr: [
      'تُستعمل للتحقق من تساوي عددين ناطقين أو مقارنة كسرين.',
      'تُستعمل لحساب «الرابع المتناسب» (المجهول الرابع في تناسب، مثل حساب طول ضلع في خاصية طاليس).',
    ],
    keyPropertiesFr: [
      'Permet de vérifier l’égalité de deux fractions et de calculer une quatrième proportionnelle (ex: théorème de Thalès).',
    ],
    howToProveAr:
      'إذا كان AB/AM = AC/AN فإن الطول المجهول يُحسب بضرب القطر المعلوم وقسمته على العدد المقابل للمجهول.',
    howToProveFr:
      'Si a/b = c/x, alors x = (b × c) ÷ a.',
    commonConfusionAr:
      'الجداء المتصالب يُستعمل في «تساوي كسرين» (a/b = c/d) أو «مقارنة كسرين»، ولا يخلط مع ضرب كسرين (a/b × c/d) حيث نضرب البسط في البسط والمقام في المقام!',
    commonConfusionFr:
      'Ne pas confondre le produit en croix (dans une égalité a/b = c/d) avec la multiplication de deux fractions (a/b × c/d = ac/bd) !',
    formulaLatex: '\\frac{a}{b} = \\frac{c}{d} \\iff a \\times d = b \\times c \\quad ; \\quad x = \\frac{b \\times c}{a}',
  },
  {
    id: 'nombre-rationnel',
    termAr: 'العدد الناطق',
    termFr: 'Le Nombre rationnel',
    levelOrigin: 'مكتسبات 3AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['الأعداد الناطقة', 'عدد ناطق', 'العدد الناطق', 'أعداد ناطقة'],
    definitionAr:
      'العدد الناطق هو حاصل قسمة عدد نسبي a على عدد نسبي غير معدوم b، ويكتب على شكل كسر a/b.',
    definitionFr:
      'Un nombre rationnel est le quotient d’un nombre relatif a par un nombre relatif non nul b, noté a/b.',
    keyPropertiesAr: [
      'يكون العدد الناطق a/b موجباً إذا كان لـ a و b نفس الإشارة، وسالباً إذا اختلفا في الإشارة.',
      'كل عدد عشري أو نسبي صحيح هو عدد ناطق (مقامه 1 أو قوة لـ 10)، بينما بعض الأعداد الناطقة مثل 1/3 ليست عشرية لأن قسمتها غير منتهية.',
    ],
    keyPropertiesFr: [
      'Positif si a et b ont le même signe, négatif s’ils sont de signes contraires.',
    ],
    howToProveAr:
      'لتبسيط عدد ناطق، نحدد إشارته أولاً (ونضعها أمام خط الكسر أو في البسط)، ثم نختزل الكسر بالقسمة على القاسم المشترك الأكبر.',
    howToProveFr:
      'On place toujours le signe devant la barre de fraction ou au numérateur avant de simplifier.',
    commonConfusionAr:
      'لا تترك إشارة الناقص في المقام أبداً: الكسر a/(-b) يُكتب دائماً (-a)/b.',
    commonConfusionFr:
      'Ne jamais laisser un signe négatif au dénominateur : a/(-b) = (-a)/b.',
    formulaLatex: '\\frac{-a}{-b} = \\frac{a}{b} \\quad ; \\quad \\frac{a}{-b} = \\frac{-a}{b} = -\\frac{a}{b}',
  },
  {
    id: 'puissance-exposant',
    termAr: 'الأس والأساس (قوة عدد)',
    termFr: 'Exposant et Base d’une puissance',
    levelOrigin: 'مكتسبات 3AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['قوى العدد 10', 'قوة عدد نسبي', 'الأسس الموجبة والسالبة', 'الأس والأساس', 'نفس الأساس', 'الأسس'],
    definitionAr:
      'قوة العدد a ذات الأس الصحيح الموجب n (تُكتب aⁿ) هي جداء n عاملاً كلها مساوية للأساس a. أما الأس السالب a⁻ⁿ فيعني مقلوب القوة الموجبة أي 1/aⁿ (وليس عدداً سالباً!).',
    definitionFr:
      'La puissance aⁿ (n entier ≥ 2) est le produit de n facteurs égaux à la base a. L’exposant négatif a⁻ⁿ désigne l’inverse 1/aⁿ.',
    keyPropertiesAr: [
      'لأي عدد غير معدوم a: لدينا دائماً a⁰ = 1 و a¹ = a.',
      'إشارة قوة عدد سالب (-a)ⁿ: تكون موجبة إذا كان الأس n زوجياً، وسالبة إذا كان الأس n فردياً.',
      'قواعد الحساب: aⁿ × aᵐ = aⁿ⁺ᵐ  ؛  aⁿ / aᵐ = aⁿ⁻ᵐ  ؛  (aⁿ)ᵐ = aⁿˣᵐ.',
    ],
    keyPropertiesFr: [
      'Pour tout a ≠ 0 : a⁰ = 1 et a⁻ⁿ = 1/aⁿ.',
      'Signe de (-a)ⁿ : positif si n est pair, négatif si n est impair.',
    ],
    howToProveAr:
      'انتبه لوجود الأقواس: في (-3)² الأس يطبق على (-3) فالناتج +9، أما في -3² بدون أقواس فالأس يطبق على 3 فقط فالناتج -9.',
    howToProveFr:
      'Attention aux parenthèses : (-3)² = +9 mais -3² = -9.',
    commonConfusionAr:
      'خطأ قاتل: aⁿ لا تعني a × n (مثلاً 2³ = 2×2×2 = 8 وليس 6)، والأس السالب 10⁻² = 0.01 (موجب) وليس سالباً!',
    commonConfusionFr:
      'Ne jamais confondre aⁿ avec a × n (2³ = 8 et non 6), et un exposant négatif ne rend pas le nombre négatif !',
    formulaLatex: 'a^n = \\underbrace{a \\times a \\times \\dots \\times a}_{n \\text{ facteurs}} \\quad ; \\quad a^{-n} = \\frac{1}{a^n}',
  },
  {
    id: 'ecriture-scientifique',
    termAr: 'الكتابة العلمية ورتبة مقدار',
    termFr: 'Écriture scientifique et Ordre de grandeur',
    levelOrigin: 'مكتسبات 1AM / 2AM + 3AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['الكتابة العلمية', 'رتبة المقدار', 'رتبة مقدار', 'المدور إلى الوحدة'],
    definitionAr:
      'الكتابة العلمية لعدد عشري هي كتابته على الشكل a × 10ⁿ حيث a عدد عشري له رقم واحد فقط قبل الفاصلة غير معدوم (1 ≤ |a| < 10) و n عدد صحيح نسبي. أما رتبة مقدار فهي تدوير a إلى الوحدة مع الاحتفاظ بـ 10ⁿ.',
    definitionFr:
      'L’écriture scientifique d’un nombre est de la forme a × 10ⁿ où a possède un seul chiffre non nul avant la virgule (1 ≤ |a| < 10) et n est un entier relatif.',
    keyPropertiesAr: [
      'المدور إلى الوحدة لعدد عشري: ننظر إلى رقم الأعشار (أول رقم بعد الفاصلة)؛ إذا كان 0، 1، 2، 3، 4 نأخذ الجزء الصحيح كما هو، وإذا كان 5، 6، 7، 8، 9 نضيف 1 إلى الجزء الصحيح.',
      'لإيجاد رتبة مقدار: نكتب العدد كتابة علمية أولاً (a × 10ⁿ) ثم نأخذ المدور إلى الوحدة للعدد a مضروباً في 10ⁿ.',
    ],
    keyPropertiesFr: [
      'Pour l’ordre de grandeur de a × 10ⁿ, on arrondit a à l’entier le plus proche et on garde 10ⁿ.',
    ],
    howToProveAr:
      'نزيح الفاصلة حتى يبقى رقم واحد غير معدوم على يسارها، ونجمع الأسس باستعمال قاعدة 10ⁿ × 10ᵐ = 10ⁿ⁺ᵐ.',
    howToProveFr:
      'Déplacer la virgule pour avoir un seul chiffre entre 1 et 9 avant la virgule, puis additionner les exposants de 10.',
    commonConfusionAr:
      'الكتابة 0.45 × 10³ ليست كتابة علمية لأن الجزء الصحيح 0، والكتابة 14.2 × 10³ ليست علمية لأن فيها رقمين قبل الفاصلة!',
    commonConfusionFr:
      'Ni 0,45 × 10³ ni 14,2 × 10³ ne sont en écriture scientifique : il faut exactement un chiffre de 1 à 9 avant la virgule.',
    formulaLatex: 'x = a \\times 10^n \\quad (1 \\le |a| < 10)',
  },
  {
    id: 'priorites-operatoires',
    termAr: 'أولويات العمليات الحسابية',
    termFr: 'Priorités opératoires',
    levelOrigin: 'مكتسبات 2AM + 3AM',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['أولويات العمليات', 'أولوية العمليات', 'الأقواس الداخلية'],
    definitionAr:
      'في سلسلة عمليات تتضمن أقواساً وقوى وجمعاً وضرباً، تُجرى الحسابات وفق الترتيب الإجباري الآتي: (1) الأقواس (بدءاً من الداخلية)، ثم (2) القوى (الأسس)، ثم (3) الضرب والقسمة، وأخيراً (4) الجمع والطرح من اليسار إلى اليمين.',
    definitionFr:
      'Dans un calcul sans ou avec parenthèses, l’ordre de priorité est : (1) Parenthèses (en commençant par les plus internes), (2) Puissances, (3) Multiplications et Divisions, (4) Additions et Soustractions.',
    keyPropertiesAr: [
      'المرتبة 1: ما بداخل الأقواس (الأقواس الداخلية أولاً).',
      'المرتبة 2: حساب القوى (aⁿ) قبل الضرب والجمع.',
      'المرتبة 3: الضرب والقسمة قبل الجمع والطرح.',
      'المرتبة 4: الجمع والطرح حسب ترتيب كتابتهما من اليسار إلى اليمين.',
    ],
    keyPropertiesFr: [
      '1. Parenthèses → 2. Puissances → 3. Multiplications/Divisions → 4. Additions/Soustractions.',
    ],
    howToProveAr:
      'في كل سطر من الحساب، نسطّر العملية ذات الأولوية القصوى ونحسبها وحدها مع إنزال باقي الأعداد كما هي دون تغيير ترتيبها.',
    howToProveFr:
      'Effectuer une seule étape de priorité par ligne en recopiant le reste de l’expression à l’identique.',
    commonConfusionAr:
      'في عبارة مثل 5 + 2 × 3²، إياك أن تجمع 5 + 2 أولاً أو تضرب 2 × 3 قبل التربيع! نحسب 3² = 9 أولاً، ثم 2 × 9 = 18، ثم 5 + 18 = 23.',
    commonConfusionFr:
      'Dans 5 + 2 × 3², on calcule d’abord 3² = 9, puis 2 × 9 = 18, puis 5 + 18 = 23.',
    formulaLatex: '5 + 2 \\times 3^2 = 5 + 2 \\times 9 = 5 + 18 = 23',
  },
  {
    id: 'racine-carree',
    termAr: 'الجذر التربيعي والمربع التام',
    termFr: 'Racine carrée et Carré parfait',
    levelOrigin: 'مكتسبات 3AM (خاصية فيثاغورس)',
    category: 'numerique',
    categoryLabelAr: 'الأعداد النسبية والكسور والقوى',
    categoryLabelFr: 'Nombres relatifs, Fractions et Puissances',
    keywords: ['الجذر التربيعي', 'جذر تربيعي', 'المربع التام', 'مربع تام'],
    definitionAr:
      'الجذر التربيعي لعدد موجب a (يُرمز له √a) هو العدد الموجب الذي مربعه يساوي a، أي (√a)² = a. يُستعمل في خاصية فيثاغورس للانتقال من مربع الطول (BC²) إلى الطول الحقيقي (BC = √BC²).',
    definitionFr:
      'La racine carrée d’un nombre positif a, notée √a, est le nombre positif dont le carré est égal à a.',
    keyPropertiesAr: [
      'المربعات التامة الشهيرة التي يجب حفظها: 1²=1، 2²=4، 3²=9، 4²=16، 5²=25، 6²=36، 7²=49، 8²=64، 9²=81، 10²=100، 11²=121، 12²=144، 13²=169.',
      'إذا كان BC² = 25 فإن BC = √25 = 5 cm.',
      'إذا لم يكن العدد مربعاً تاماً (مثل BC² = 20)، نأخذ القيمة المقربة باللمسة [√] في الآلة الحاسبة.',
    ],
    keyPropertiesFr: [
      'Carrés parfaits : 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169.',
      'Si BC² = 25, alors BC = √25 = 5.',
    ],
    howToProveAr:
      'بعد حساب مجموع أو فرق المربعين في فيثاغورس، لا تنسَ أبداً خطوة الجذر التربيعي في السطر الأخير لإيجاد الطول!',
    howToProveFr:
      'Toujours terminer le calcul de Pythagore par la racine carrée pour obtenir la longueur.',
    commonConfusionAr:
      'حذارِ: √(a² + b²) لا يساوي a + b أبداً! مثلاً √(9 + 16) = √25 = 5 وليس 3 + 4 = 7.',
    commonConfusionFr:
      'Attention : √(9 + 16) = √25 = 5 et non √9 + √16 = 7 !',
    formulaLatex: 'BC^2 = 25 \\implies BC = \\sqrt{25} = 5',
  },

  // ==========================================================================
  // B. المستقيمات الخاصة في المثلث والقطع (Droites remarquables & segments)
  // ==========================================================================
  {
    id: 'mediane',
    termAr: 'المتوسط في مثلث',
    termFr: 'La Médiane dans un triangle',
    levelOrigin: 'مكتسبات 2AM + 3AM',
    category: 'droites',
    categoryLabelAr: 'المستقيمات الخاصة في المثلث',
    categoryLabelFr: 'Droites remarquables du triangle',
    keywords: ['المتوسط المتعلق بالوتر', 'المتوسط المتعلق', 'المتوسطات', 'المتوسط', 'مركز ثقل المثلث', 'مركز الثقل'],
    definitionAr:
      'المتوسط في مثلث هو المستقيم (أو قطعة المستقيم) الذي يشمل أحد رؤوس المثلث ومنتصف الضلع المقابل لهذا الرأس.',
    definitionFr:
      'Dans un triangle, une médiane est une droite (ou un segment) qui joint un sommet au milieu du côté opposé.',
    keyPropertiesAr: [
      'لكل مثلث ثلاثة متوسطات تتقاطع في نقطة واحدة تسمى «مركز ثقل المثلث» G.',
      'مركز الثقل G يبعد عن كل رأس بثلثي (2/3) طول المتوسط الصادر من ذلك الرأس (خاصية 53).',
      'في المثلث القائم: طول المتوسط المتعلق بالوتر يساوي نصف طول الوتر AM = ½ BC (خاصية 52).',
      'المتوسط يقسم المثلث إلى مثلثين لهما نفس المساحة.',
    ],
    keyPropertiesFr: [
      'Les trois médianes sont concourantes au centre de gravité G du triangle.',
      'G est situé aux 2/3 de chaque médiane à partir du sommet.',
      'Dans un triangle rectangle, la médiane relative à l’hypoténuse mesure la moitié de l’hypoténuse.',
    ],
    howToProveAr:
      'لإثبات أن [CD] هو متوسط متعلق بالضلع [AB] في المثلث ABC، يكفي إثبات أن النقطة D هي منتصف الضلع [AB] (خاصية 66).',
    howToProveFr:
      'Pour prouver que [CD] est la médiane relative à [AB], il suffit de prouver que D est le milieu de [AB] (Propriété 66).',
    commonConfusionAr:
      'لا تخلط بين «المتوسط» (يربط الرأس بالمنتصف دون اشتراط التعامد) و«الارتفاع» (يشترط التعامد دون المنتصف) و«المحور» (عمودي في المنتصف ولا يشترط المرور بالرأس).',
    commonConfusionFr:
      'Ne pas confondre la médiane (sommet → milieu) avec la hauteur (sommet → perpendiculaire) ou la médiatrice (milieu + perpendiculaire).',
    formulaLatex: 'AM = \\frac{1}{2} BC \\quad ; \\quad AG = \\frac{2}{3} AA\'',
    relatedTreatiseIds: [21, 52, 53, 66],
  },
  {
    id: 'hauteur',
    termAr: 'الارتفاع في مثلث',
    termFr: 'La Hauteur dans un triangle',
    levelOrigin: 'مكتسبات 2AM',
    category: 'droites',
    categoryLabelAr: 'المستقيمات الخاصة في المثلث',
    categoryLabelFr: 'Droites remarquables du triangle',
    keywords: ['الارتفاع المتعلق', 'الارتفاعات', 'الارتفاع'],
    definitionAr:
      'الارتفاع في مثلث هو المستقيم الذي يشمل أحد رؤوس المثلث ويعامد حامل الضلع المقابل لهذا الرأس.',
    definitionFr:
      'Dans un triangle, une hauteur est une droite qui passe par un sommet et qui est perpendiculaire au côté opposé.',
    keyPropertiesAr: [
      'الارتفاعات الثلاثة في مثلث تتلاقي في نقطة واحدة تسمى «نقطة تلاقي الارتفاعات» (Orthocentre).',
      'يُستعمل طول الارتفاع لحساب مساحة المثلث: المساحة = (القاعدة × الارتفاع الموافق لها) ÷ 2.',
      'في المثلث القائم، الضلعان القائمان هما ارتفاعان في المثلث.',
    ],
    keyPropertiesFr: [
      'Les trois hauteurs sont concourantes en un point appelé orthocentre.',
      'Aire du triangle = (Base × Hauteur) ÷ 2.',
    ],
    howToProveAr:
      'لإثبات أن (CD) ارتفاع في المثلث ABC، نثبت أنه يشمل الرأس C وأنه عمودي على حامل الضلع المقابل (AB) (خاصية 65).',
    howToProveFr:
      'Pour prouver que (CD) est une hauteur de ABC, on montre que (CD) ⊥ (AB) (Propriété 65).',
    commonConfusionAr:
      'الارتفاع لا يمر بالضرورة من منتصف الضلع المقابل (إلا إذا كان المثلث متساوي الساقين في ذلك الرأس أو متقايس الأضلاع).',
    commonConfusionFr:
      'La hauteur ne coupe pas le côté opposé en son milieu (sauf si le triangle est isocèle en ce sommet).',
    formulaLatex: '\\mathcal{A}_{ABC} = \\frac{AB \\times CD}{2}',
    relatedTreatiseIds: [65, 69],
  },
  {
    id: 'mediatrice',
    termAr: 'محور قطعة مستقيم',
    termFr: 'La Médiatrice d’un segment',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'droites',
    categoryLabelAr: 'المستقيمات الخاصة في المثلث',
    categoryLabelFr: 'Droites remarquables du triangle',
    keywords: ['محور القطعة', 'محور قطعة', 'المحاور', 'محور القاعدة'],
    definitionAr:
      'محور قطعة مستقيم [AB] هو المستقيم العمودي على هذه القطعة في منتصفها.',
    definitionFr:
      'La médiatrice d’un segment [AB] est la droite perpendiculaire à ce segment en son milieu.',
    keyPropertiesAr: [
      'خاصية المسافة: كل نقطة تنتمي إلى محور قطعة تبعد بنفس المسافة عن طرفيها (MA = MB).',
      'الخاصية العكسية: كل نقطة متساوية المسافة عن طرفي قطعة تنتمي إلى محورها.',
      'محاور أضلاع مثلث تتقاطع في نقطة واحدة هي «مركز الدائرة المحيطة بالمثلث».',
    ],
    keyPropertiesFr: [
      'Tout point de la médiatrice de [AB] est équidistant de A et B (MA = MB).',
      'Les trois médiatrices d’un triangle se coupent au centre du cercle circonscrit.',
    ],
    howToProveAr:
      'نثبت أن المستقيم عمودي على القطعة في منتصفها، أو نثبت أن نقطتين منه متساويتا المسافة عن طرفي القطعة (خاصية 63 و 64).',
    howToProveFr:
      'On montre que la droite est perpendiculaire au segment en son milieu, ou qu’elle contient deux points équidistants des extrémités (Propriétés 63, 64).',
    commonConfusionAr:
      'محور ضلع في مثلث عمودي على الضلع في منتصفه، لكنه لا يشمل الرأس المقابل في الحالة العامة.',
    commonConfusionFr:
      'La médiatrice d’un côté d’un triangle ne passe généralement pas par le sommet opposé.',
    formulaLatex: 'M \\in (d) \\iff MA = MB',
    relatedTreatiseIds: [4, 18, 47, 63, 64],
  },
  {
    id: 'bissectrice',
    termAr: 'منصّف الزاوية',
    termFr: 'La Bissectrice d’un angle',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'droites',
    categoryLabelAr: 'المستقيمات الخاصة في المثلث',
    categoryLabelFr: 'Droites remarquables du triangle',
    keywords: ['منصف الزاوية', 'منصّف الزاوية', 'منصف للزاوية', 'منصف زاوية', 'المنصفات'],
    definitionAr:
      'منصّف زاوية هو نصف المستقيم الذي يشمل رأس الزاوية ويقسمها إلى زاويتين متجاورتين ومتقايستين (لهما نفس القيس).',
    definitionFr:
      'La bissectrice d’un angle est la demi-droite qui partage cet angle en deux angles adjacents de même mesure.',
    keyPropertiesAr: [
      'إذا كان [OB) منصف الزاوية xOy فإن قيس كل زاوية جزئية يساوي نصف الزاوية الكلية.',
      'كل نقطة تنتمي إلى منصف زاوية تبعد بنفس المسافة عن ضلعي هذه الزاوية (خاصية 48).',
      'منصفات زوايا المثلث تتقاطع في نقطة واحدة هي «مركز الدائرة المرسومة داخل المثلث» (تلامس أضلاعه الثلاثة).',
    ],
    keyPropertiesFr: [
      'Tout point de la bissectrice d’un angle est équidistant des deux côtés de cet angle.',
      'Les trois bissectrices d’un triangle se coupent au centre du cercle inscrit.',
    ],
    howToProveAr:
      'نثبت أنه يقسم الزاوية إلى زاويتين لهما نفس القيس (خاصية 67)، أو أن نقطة منه تبعد بنفس المسافة العمودية عن ضلعي الزاوية (خاصية 68).',
    howToProveFr:
      'Prouver que les deux angles adjacents sont égaux (Prop. 67) ou que le point est équidistant des côtés (Prop. 68).',
    commonConfusionAr:
      'منصف زاوية في مثلث يقسم الزاوية إلى نصفين متقايسين، لكنه لا ينصّف الضلع المقابل إلا في المثلث المتساوي الساقين.',
    commonConfusionFr:
      'La bissectrice partage l’angle en deux, mais ne passe pas par le milieu du côté opposé (sauf triangle isocèle).',
    formulaLatex: '\\widehat{xOB} = \\widehat{BOy} = \\frac{\\widehat{xOy}}{2}',
    relatedTreatiseIds: [48, 60, 67, 68],
  },
  {
    id: 'droite-des-milieux',
    termAr: 'مستقيم المنتصفين في مثلث',
    termFr: 'La Droite des milieux dans un triangle',
    levelOrigin: 'مكتسبات 3AM (الدرس 12)',
    category: 'droites',
    categoryLabelAr: 'المستقيمات الخاصة في المثلث',
    categoryLabelFr: 'Droites remarquables du triangle',
    keywords: ['مستقيم المنتصفين', 'نظرية مستقيم المنتصفين'],
    definitionAr:
      'مستقيم المنتصفين في مثلث هو المستقيم الذي يشمل منتصفي ضلعين في هذا المثلث.',
    definitionFr:
      'Dans un triangle, la droite des milieux est la droite qui passe par les milieux de deux côtés.',
    keyPropertiesAr: [
      'الخاصية 1 (التوازي): المستقيم الذي يشمل منتصفي ضلعين في مثلث يوازي حامل الضلع الثالث (خاصية 12).',
      'الخاصية 2 (الطول): طول القطعة الواصلة بين منتصفي ضلعين يساوي نصف طول الضلع الثالث IJ = ½ AB (خاصية 49).',
      'الخاصية العكسية (المنتصف): المستقيم الذي يشمل منتصف ضلع ويوازي ضلعاً ثانياً يقطع الضلع الثالث في منتصفه (خاصية 6).',
    ],
    keyPropertiesFr: [
      'Elle est parallèle au troisième côté (Prop. 12).',
      'La longueur du segment joignant les deux milieux vaut la moitié du troisième côté (Prop. 49).',
    ],
    howToProveAr:
      'إذا علمت منتصفين → تستنتج التوازي ونصف الطول. وإذا علمت منتصفاً واحداً والتوازي → تستنتج المنتصف الثاني.',
    howToProveFr:
      '2 milieux → parallélisme + moitié de longueur. 1 milieu + parallélisme → 2e milieu.',
    commonConfusionAr:
      'لا تخلط بين مستقيم المنتصفين (يربط منتصفي ضلعين) والمتوسط (يربط رأساً بمنتصف الضلع المقابل).',
    commonConfusionFr:
      'Ne pas confondre la droite des milieux (joint deux milieux) et la médiane (joint un sommet à un milieu).',
    formulaLatex: '(IJ) // (AB) \\quad ; \\quad IJ = \\frac{1}{2} AB',
    relatedTreatiseIds: [6, 12, 49],
  },
  {
    id: 'hypotenuse',
    termAr: 'الوتر في المثلث القائم',
    termFr: 'L’Hypoténuse du triangle rectangle',
    levelOrigin: 'مكتسبات 2AM + 3AM',
    category: 'droites',
    categoryLabelAr: 'المستقيمات الخاصة في المثلث',
    categoryLabelFr: 'Droites remarquables du triangle',
    keywords: ['الوتر', 'وتره', 'بالوتر', 'الضلعان القائمان', 'الضلعين القائمين'],
    definitionAr:
      'الوتر في المثلث القائم هو الضلع المقابل للزاوية القائمة، وهو دائماً أطول أضلاع المثلث القائم. أما الضلعان الآخران المحيطان بالزاوية القائمة فيسميان الضلعين القائمين.',
    definitionFr:
      'Dans un triangle rectangle, l’hypoténuse est le côté opposé à l’angle droit. C’est toujours le côté le plus long du triangle.',
    keyPropertiesAr: [
      'منتصف الوتر هو مركز الدائرة المحيطة بالمثلث القائم، والوتر هو قطر لهذه الدائرة (خاصية 5 و 22).',
      'طول المتوسط المتعلق بالوتر يساوي نصف طول الوتر (خاصية 52).',
      'مربع طول الوتر يساوي مجموع مربعي طولي الضلعين القائمين — خاصية فيثاغورس (خاصية 51).',
    ],
    keyPropertiesFr: [
      'Son milieu est le centre du cercle circonscrit (diamètre = hypoténuse).',
      'La médiane relative à l’hypoténuse vaut la moitié de l’hypoténuse.',
      'Théorème de Pythagore : Hypoténuse² = Côté₁² + Côté₂².',
    ],
    howToProveAr:
      'لتحديد الوتر بدون خطأ: ابحث عن حرف الزاوية القائمة (مثلاً المثلث ABC قائم في A)، الحرفان المتبقيان [BC] يشكلان الوتر دائماً.',
    howToProveFr:
      'Si le triangle ABC est rectangle en A, l’hypoténuse est le segment formé par les deux autres lettres : [BC].',
    commonConfusionAr:
      'مفهوم «الوتر» لا يوجد إلا في المثلث القائم! في المثلث غير القائم لا نسمي أي ضلع وتراً.',
    commonConfusionFr:
      'Seul un triangle rectangle possède une hypoténuse.',
    formulaLatex: 'BC^2 = AB^2 + AC^2 \\quad ; \\quad R = AM = \\frac{BC}{2}',
    relatedTreatiseIds: [5, 20, 21, 22, 51, 52],
  },

  // ==========================================================================
  // C. الرباعيات الخاصة والمجسمات (Quadrilatères particuliers & Solides)
  // ==========================================================================
  {
    id: 'parallelogramme',
    termAr: 'متوازي الأضلاع',
    termFr: 'Le Parallélogramme',
    levelOrigin: 'مكتسبات السنة الثانية متوسط (2AM)',
    category: 'quadrilateres',
    categoryLabelAr: 'الرباعيات الخاصة والمجسمات',
    categoryLabelFr: 'Quadrilatères particuliers et Solides',
    keywords: ['متوازي الأضلاع', 'متوازي أضلاع'],
    definitionAr:
      'متوازي الأضلاع هو رباعي فيه كل ضلعين متقابلين حاملاهما متوازيان.',
    definitionFr:
      'Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux.',
    keyPropertiesAr: [
      'القطران متناصفان: يتقاطعان في نفس المنتصف O، وهو مركز تناظر الرباعي (خاصية 2).',
      'كل ضلعين متقابلين متقايسان (AB = DC و AD = BC — خاصية 43) ومتوازيان (خاصية 11).',
      'كل زاويتين متقابلتين متقايستان (خاصية 54)، وكل زاويتين متتاليتين متكاملتان (مجموعهما 180°).',
    ],
    keyPropertiesFr: [
      'Ses diagonales se coupent en leur milieu (centre de symétrie).',
      'Ses côtés opposés sont parallèles et de même longueur.',
      'Ses angles opposés sont égaux.',
    ],
    howToProveAr:
      'نثبت أن قطريه متناصفان (خاصية 24)، أو كل ضلعين متقابلين متوازيان (خاصية 23)، أو ضلعين متقابلين متوازيان ومتقايسان (خاصية 25).',
    howToProveFr:
      'Prouver que les diagonales ont le même milieu (Prop. 24), ou que les côtés opposés sont parallèles/égaux (Prop. 23, 25, 26).',
    commonConfusionAr:
      'حذارِ: قطرا متوازي الأضلاع الكيفي متناصفان لكنهما ليسا متقايسين وليسا متعامدين!',
    commonConfusionFr:
      'Dans un parallélogramme quelconque, les diagonales se coupent en leur milieu mais n’ont pas la même longueur et ne sont pas perpendiculaires !',
    formulaLatex: '\\mathcal{A} = \\text{Base} \\times \\text{Hauteur}',
    relatedTreatiseIds: [2, 11, 23, 24, 25, 26, 27, 28, 43, 54],
  },
  {
    id: 'losange',
    termAr: 'المعيّن',
    termFr: 'Le Losange',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'quadrilateres',
    categoryLabelAr: 'الرباعيات الخاصة والمجسمات',
    categoryLabelFr: 'Quadrilatères particuliers et Solides',
    keywords: ['المعيّن', 'المعين', 'معيّن', 'معين'],
    definitionAr:
      'المعيّن هو رباعي أضلاعه الأربعة متقايسة (لها نفس الطول). وهو حالة خاصة من متوازي الأضلاع.',
    definitionFr:
      'Un losange est un quadrilatère qui a ses quatre côtés de même longueur. C’est un parallélogramme particulier.',
    keyPropertiesAr: [
      'أضلاعه الأربعة متقايسة: AB = BC = CD = DA (خاصية 44).',
      'قطراه متناصفان ومتعامدان: (AC) ⊥ (BD) وهما محورا تناظر له (خاصية 16).',
      'يتمتع بجميع خواص متوازي الأضلاع (الأضلاع المتقابلة متوازية والزوايا المتقابلة متقايسة).',
    ],
    keyPropertiesFr: [
      'Ses 4 côtés sont de même longueur (Prop. 44).',
      'Ses diagonales se coupent en leur milieu et sont perpendiculaires (Prop. 16).',
    ],
    howToProveAr:
      'لإثبات أن رباعياً معيّن: نثبت أن أضلاعه الـ 4 متقايسة (خاصية 30)، أو أنه متوازي أضلاع قطراه متعامدان (خاصية 31)، أو متوازي أضلاع له ضلعان متتاليان متقايسان (خاصية 32).',
    howToProveFr:
      'Montrer qu’il a 4 côtés égaux (Prop. 30), ou que c’est un parallélogramme à diagonales perpendiculaires (Prop. 31) ou à deux côtés consécutifs égaux (Prop. 32).',
    commonConfusionAr:
      'قطرا المعيّن متعامدان لكنهما ليسا متقايسين (إلا إذا أصبح مربعاً)، وزواياه ليست قائمة!',
    commonConfusionFr:
      'Les diagonales d’un losange sont perpendiculaires mais n’ont pas la même longueur (sauf si c’est un carré).',
    formulaLatex: 'AB = BC = CD = DA \\quad ; \\quad (AC) \\perp (BD)',
    relatedTreatiseIds: [16, 30, 31, 32, 44],
  },
  {
    id: 'rectangle',
    termAr: 'المستطيل',
    termFr: 'Le Rectangle',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'quadrilateres',
    categoryLabelAr: 'الرباعيات الخاصة والمجسمات',
    categoryLabelFr: 'Quadrilatères particuliers et Solides',
    keywords: ['المستطيل', 'مستطيل', 'مستطيلاً'],
    definitionAr:
      'المستطيل هو رباعي زواياه الأربع قائمة. وهو حالة خاصة من متوازي الأضلاع.',
    definitionFr:
      'Un rectangle est un quadrilatère qui possède quatre angles droits. C’est un parallélogramme particulier.',
    keyPropertiesAr: [
      'زواياه الأربع قائمة (كل ضلعين متتاليين متعامدان — خاصية 17).',
      'قطراه متناصفان ومتقايسان (لهما نفس الطول AC = BD — خاصية 45).',
      'كل ضلعين متقابلين متقايسان ومتوازيان.',
    ],
    keyPropertiesFr: [
      'Ses 4 angles sont droits (Prop. 17).',
      'Ses diagonales se coupent en leur milieu et ont la même longueur (AC = BD — Prop. 45).',
    ],
    howToProveAr:
      'لإثبات أن رباعياً مستطيل: نثبت أن فيه 3 زوايا قائمة (خاصية 33)، أو أنه متوازي أضلاع قطراه متقايسان (خاصية 34)، أو متوازي أضلاع فيه زاوية قائمة (خاصية 35).',
    howToProveFr:
      'Prouver qu’il a 3 angles droits (Prop. 33), ou que c’est un parallélogramme à diagonales égales (Prop. 34) ou avec un angle droit (Prop. 35).',
    commonConfusionAr:
      'حذارِ: قطرا المستطيل متقايسان ومتناصفان، لكنهما ليسا متعامدين (إلا إذا كان مربعاً)!',
    commonConfusionFr:
      'Attention : les diagonales d’un rectangle ont la même longueur mais ne sont pas perpendiculaires !',
    formulaLatex: 'AC = BD \\quad ; \\quad \\mathcal{A} = L \\times l',
    relatedTreatiseIds: [17, 33, 34, 35, 45],
  },
  {
    id: 'carre',
    termAr: 'المربّع',
    termFr: 'Le Carré',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'quadrilateres',
    categoryLabelAr: 'الرباعيات الخاصة والمجسمات',
    categoryLabelFr: 'Quadrilatères particuliers et Solides',
    keywords: ['المربّع', 'المربع', 'مربّع'],
    definitionAr:
      'المربّع هو رباعي زواياه الأربع قائمة وأضلاعه الأربعة متقايسة. فهو مستطيل ومعيّن في آن واحد!',
    definitionFr:
      'Un carré est un quadrilatère qui a ses quatre angles droits et ses quatre côtés de même longueur. Il est à la fois un rectangle et un losange.',
    keyPropertiesAr: [
      'يجمع كل خواص المستطيل والمعيّن معاً.',
      'أضلاعه الأربعة متقايسة وزواياه الأربع قائمة.',
      'قطراه متناصفان، متقايسان، ومتعامدان في آن واحد.',
    ],
    keyPropertiesFr: [
      '4 côtés égaux et 4 angles droits.',
      'Diagonales de même milieu, de même longueur et perpendiculaires.',
    ],
    howToProveAr:
      'لإثبات أن رباعياً مربع: نثبت أنه مستطيل له ضلعان متتاليان متقايسان (خاصية 36) أو قطراه متعامدان (خاصية 38)؛ أو نثبت أنه معيّن له زاوية قائمة (خاصية 37) أو قطراه متقايسان (خاصية 39).',
    howToProveFr:
      'Montrer que c’est à la fois un rectangle et un losange (Propriétés 36, 37, 38, 39).',
    commonConfusionAr:
      'لا يكفي إثبات أن القطرين متعامدان ومتقايسان فقط، بل يجب أولاً إثبات أنهما متناصفان (متوازي أضلاع).',
    commonConfusionFr:
      'Pour prouver qu’un quadrilatère est un carré par ses diagonales, elles doivent se couper en leur milieu, être égales ET perpendiculaires.',
    formulaLatex: 'AB = BC = CD = DA \\quad ; \\quad AC = BD \\quad ; \\quad (AC) \\perp (BD)',
    relatedTreatiseIds: [36, 37, 38, 39],
  },
  {
    id: 'parallelepipede',
    termAr: 'متوازي المستطيلات والمكعب',
    termFr: 'Le Pavé droit (Parallélépipède rectangle) et le Cube',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'quadrilateres',
    categoryLabelAr: 'الرباعيات الخاصة والمجسمات',
    categoryLabelFr: 'Quadrilatères particuliers et Solides',
    keywords: ['متوازي المستطيلات', 'متوازي مستطيلات', 'المكعب'],
    definitionAr:
      'متوازي المستطيلات (أو القائم) هو مجسم في الفضاء له 6 أوجه كلها عبارة عن مستطيلات، و 8 رؤوس، و 12 حرفاً. وإذا كانت أوجهه الستة مربعات متقايسة يُسمى مكعباً.',
    definitionFr:
      'Un parallélépipède rectangle (ou pavé droit) est un solide qui possède 6 faces rectangulaires, 8 sommets et 12 arêtes.',
    keyPropertiesAr: [
      'كل وجهين متقابلين هما مستطيلان متقايسان ومتوازيان.',
      'الحجم يساوي جداء الأبعاد الثلاثة (الطول × العرض × الارتفاع): V = L × l × h.',
      'في الحسابات الهندسية داخل متوازي المستطيلات، كل وجه هو مستطيل زواياه قائمة، فنطبق خاصية فيثاغورس لحساب قطر الوجه أو قطر المجسم.',
    ],
    keyPropertiesFr: [
      '6 faces rectangulaires, 8 sommets, 12 arêtes.',
      'Volume V = Longueur × largeur × hauteur.',
      'Chaque face étant un rectangle, ses angles sont droits (on peut y appliquer le théorème de Pythagore).',
    ],
    howToProveAr:
      'لحساب طول قطر على أحد الأوجه، نعتبر المثلث القائم المرسوم داخل ذلك الوجه المستطيل ونطبق خاصية فيثاغورس.',
    howToProveFr:
      'Pour calculer la diagonale d’une face, on se place dans le triangle rectangle formé par deux arêtes perpendiculaires.',
    commonConfusionAr:
      'لا تخلط بين «متوازي الأضلاع» (رباعي مسطح في المستوي 2D) و«متوازي المستطيلات» (مجسم ثلاثي الأبعاد 3D أوجهه مستطيلات).',
    commonConfusionFr:
      'Ne pas confondre le parallélogramme (figure plane 2D) et le parallélépipède rectangle / pavé droit (solide 3D).',
    formulaLatex: 'V = L \\times l \\times h \\quad ; \\quad V_{\\text{cube}} = a^3',
  },

  // ==========================================================================
  // D. المثلثات الخاصة والدائرة (Triangles particuliers & Cercle)
  // ==========================================================================
  {
    id: 'triangle-isocele',
    termAr: 'المثلث المتساوي الساقين',
    termFr: 'Le Triangle isocèle',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'triangles_cercles',
    categoryLabelAr: 'المثلثات الخاصة والدائرة',
    categoryLabelFr: 'Triangles particuliers et Cercle',
    keywords: ['المثلث المتساوي الساقين', 'متساوي الساقين', 'المتساوي الساقين', 'زاويتا القاعدة'],
    definitionAr:
      'المثلث المتساوي الساقين هو مثلث له ضلعان متقايسان (لهما نفس الطول). نقطة تلاقي هذين الضلعين تسمى «الرأس الأساسي» والضلع المقابل له يسمى «القاعدة».',
    definitionFr:
      'Un triangle isocèle est un triangle qui possède au moins deux côtés de même longueur. Le sommet commun à ces deux côtés est le sommet principal.',
    keyPropertiesAr: [
      'ضلعاه الجانبيان متقايسان (خاصية 41).',
      'زاويتا القاعدة متقايستان (خاصية 57).',
      'محور القاعدة هو في نفس الوقت الارتفاع والمتوسط المتعلق بالقاعدة ومنصف زاوية الرأس الأساسي (خاصية 69).',
    ],
    keyPropertiesFr: [
      'Deux côtés égaux (Prop. 41) et deux angles à la base égaux (Prop. 57).',
      'La médiatrice de la base est aussi hauteur, médiane et bissectrice de l’angle principal (Prop. 69).',
    ],
    howToProveAr:
      'نثبت تقايس ضلعين فيه (من أنصاف أقطار دائرة أو متوسط متعلق بالوتر)، أو نثبت تقايس زاويتين فيه.',
    howToProveFr:
      'Prouver que deux côtés ont la même longueur ou que deux angles ont la même mesure.',
    commonConfusionAr:
      'خاصية تطابق المحور والارتفاع والمتوسط والمنصف صالحة فقط للخط الصادر من «الرأس الأساسي» نحو القاعدة، وليست صالحة للرأسين الآخرين!',
    commonConfusionFr:
      'Seule la droite issue du sommet principal est à la fois hauteur, médiane, médiatrice et bissectrice.',
    formulaLatex: 'CA = CB \\iff \\widehat{A} = \\widehat{B}',
    relatedTreatiseIds: [41, 57, 64, 69],
  },
  {
    id: 'triangle-equilateral',
    termAr: 'المثلث المتقايس الأضلاع',
    termFr: 'Le Triangle équilatéral',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'triangles_cercles',
    categoryLabelAr: 'المثلثات الخاصة والدائرة',
    categoryLabelFr: 'Triangles particuliers et Cercle',
    keywords: ['المثلث المتقايس الأضلاع', 'متقايس الأضلاع', 'المتقايس الأضلاع'],
    definitionAr:
      'المثلث المتقايس الأضلاع هو مثلث أضلاعه الثلاثة متقايسة (لها نفس الطول).',
    definitionFr:
      'Un triangle équilatéral est un triangle dont les trois côtés ont la même longueur.',
    keyPropertiesAr: [
      'أضلاعه الثلاثة متقايسة: AB = BC = CA (خاصية 42).',
      'زواياه الثلاث متقايسة وقيس كل واحدة منها يساوي 60° بالضبط (خاصية 58).',
      'كل محور فيه هو أيضاً ارتفاع ومتوسط ومنصف.',
    ],
    keyPropertiesFr: [
      'Ses 3 côtés sont égaux (Prop. 42).',
      'Ses 3 angles mesurent chacun 60° (Prop. 58).',
    ],
    howToProveAr:
      'نثبت أن أضلاعه الثلاثة متقايسة، أو أن زواياه الثلاث تساوي 60°، أو أنه مثلث متساوي الساقين إحدى زواياه 60°.',
    howToProveFr:
      'Montrer que les 3 côtés sont égaux, ou que deux angles valent 60°, ou qu’il est isocèle avec un angle de 60°.',
    commonConfusionAr:
      'تذكر دائماً أنه بمجرد ذكر «متقايس الأضلاع» في المعطيات، فإنك تعرف قيس كل زاوية فيه (60°) حتى لو لم يُكتب في التمرين!',
    commonConfusionFr:
      'Dès qu’un triangle est équilatéral, on connaît automatiquement ses angles (60°) même si aucune mesure n’est donnée.',
    formulaLatex: 'AB = BC = CA \\iff \\widehat{A} = \\widehat{B} = \\widehat{C} = 60^\\circ',
    relatedTreatiseIds: [42, 58],
  },
  {
    id: 'somme-angles-triangle',
    termAr: 'مجموع أقياس زوايا المثلث (180°)',
    termFr: 'Somme des angles d’un triangle (180°)',
    levelOrigin: 'مكتسبات السنة الثانية متوسط (2AM)',
    category: 'triangles_cercles',
    categoryLabelAr: 'المثلثات الخاصة والدائرة',
    categoryLabelFr: 'Triangles particuliers et Cercle',
    keywords: ['مجموع أقياس زوايا المثلث', 'مجموع زوايا المثلث', 'زاويتان حادتان متتامتان'],
    definitionAr:
      'في أي مثلث ABC، مجموع أقياس زواياه الثلاث يساوي دائماً 180° (خاصية 55). وفي المثلث القائم، مجموع الزاويتين الحادتين يساوي 90° (متتامتان — خاصية 56).',
    definitionFr:
      'Dans tout triangle ABC, la somme des mesures des trois angles est égale à 180° (Propriété 55).',
    keyPropertiesAr: [
      'إذا علمت قيسي زاويتين في مثلث، يمكنك دائماً حساب قيس الزاوية الثالثة بطرح مجموعهما من 180°.',
      'في المثلث القائم في A: قيس B + قيس C = 90°.',
      'هذه القاعدة أساسية جداً في «حالات تقايس مثلثين» لإيجاد الزاوية المحصورة قبل تطبيق الحالة الأولى أو الثانية.',
    ],
    keyPropertiesFr: [
      'Permet de calculer le troisième angle d’un triangle connaissant les deux autres : C = 180° - (A + B).',
    ],
    howToProveAr:
      'نكتب: في المثلث ABC لدينا A + B + C = 180°، ومنه C = 180° - (A + B).',
    howToProveFr:
      'Dans le triangle ABC, C = 180° - (A + B) (Propriété 55).',
    commonConfusionAr:
      'تساوي ثلاث زوايا في مثلثين لا يكفي وحده لإثبات تقايس المثلثين (قد يكون أحدهما تكبيراً للآخر)؛ لا بد من تقايس ضلع على الأقل!',
    commonConfusionFr:
      'Trois angles égaux ne suffisent pas pour prouver que deux triangles sont superposables : il faut au moins un côté égal.',
    formulaLatex: '\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ',
    relatedTreatiseIds: [55, 56],
  },
  {
    id: 'cercle-circonscrit',
    termAr: 'الدائرة المحيطة بمثلث',
    termFr: 'Le Cercle circonscrit à un triangle',
    levelOrigin: 'مكتسبات 2AM + 3AM',
    category: 'triangles_cercles',
    categoryLabelAr: 'المثلثات الخاصة والدائرة',
    categoryLabelFr: 'Triangles particuliers et Cercle',
    keywords: ['الدائرة المحيطة', 'محيطة بالمثلث', 'نصف قطر الدائرة', 'قطر الدائرة'],
    definitionAr:
      'الدائرة المحيطة بمثلث هي الدائرة الوحيدة التي تشمل (تمر من) رؤوس المثلث الثلاثة A و B و C.',
    definitionFr:
      'Le cercle circonscrit à un triangle est l’unique cercle qui passe par les trois sommets de ce triangle.',
    keyPropertiesAr: [
      'في مثلث كيفي: مركز الدائرة المحيطة به هو نقطة تلاقي محاور أضلاعه الثلاثة.',
      'في المثلث القائم: مركز الدائرة المحيطة به هو «منتصف الوتر» بالضبط، ونصف قطرها R يساوي نصف طول الوتر (خاصية 5).',
      'كل نقطتين تنتميان إلى نفس الدائرة تبعدان بنفس المسافة (نصف القطر R) عن مركزها: OA = OB = OC (خاصية 46).',
    ],
    keyPropertiesFr: [
      'Cas général : son centre est l’intersection des trois médiatrices.',
      'Triangle rectangle : son centre est le milieu de l’hypoténuse et son diamètre est l’hypoténuse (Prop. 5 et 22).',
    ],
    howToProveAr:
      'في المثلث القائم، لا نرسم المحاور لتعيين مركز الدائرة المحيطة، بل نعين مباشرة منتصف الوتر! وعكسياً، إذا كان أحد أضلاع مثلث قطراً لدائرته المحيطة فالمثلث قائم (خاصية 22).',
    howToProveFr:
      'Triangle rectangle → centre au milieu de l’hypoténuse (Prop. 5). Côté = diamètre → triangle rectangle (Prop. 22).',
    commonConfusionAr:
      'تذكر أن جميع رؤوس المثلث القائم تنتمي للدائرة، لذا المسافة من منتصف الوتر O إلى الرأس القائم A هي أيضاً نصف قطر (OA = OB = OC = R).',
    commonConfusionFr:
      'La distance du milieu de l’hypoténuse au sommet de l’angle droit est aussi un rayon du cercle (OA = R = BC/2).',
    formulaLatex: 'R = OA = OB = OC = \\frac{BC}{2}',
    relatedTreatiseIds: [5, 22, 46],
  },
  {
    id: 'tangente-cercle',
    termAr: 'المماس لدائرة',
    termFr: 'La Tangente à un cercle',
    levelOrigin: 'مكتسبات 3AM',
    category: 'triangles_cercles',
    categoryLabelAr: 'المثلثات الخاصة والدائرة',
    categoryLabelFr: 'Triangles particuliers et Cercle',
    keywords: ['المماس لدائرة', 'مماس الدائرة', 'المماس'],
    definitionAr:
      'المماس لدائرة (C) في نقطة T منها هو المستقيم الذي يشترك مع الدائرة في هذه النقطة الوحيدة T ويعامد نصف القطر [OT] في نقطة التماس T.',
    definitionFr:
      'La tangente à un cercle (C) de centre O en un point T est la droite qui touche le cercle en ce seul point T et qui est perpendiculaire au rayon [OT].',
    keyPropertiesAr: [
      'المماس (d) يعامد المستقيم القطري (OT) في نقطة التماس T: (d) ⊥ (OT) (خاصية 19).',
      'المسافة من المركز O إلى المماس تساوي نصف القطر R.',
    ],
    keyPropertiesFr: [
      'La tangente en T est perpendiculaire au rayon [OT] : (d) ⊥ (OT) (Propriété 19).',
    ],
    howToProveAr:
      'بما أن (d) مماس للدائرة في T، نستنتج مباشرة التعامد (d) ⊥ (OT) وأن المثلث المشكل مع نقطة من المماس هو مثلث قائم في T.',
    howToProveFr:
      'Tangente en T → angle droit en T entre la tangente et le rayon [OT] (Propriété 19).',
    commonConfusionAr:
      'التعامد يكون دائماً في «نقطة التماس T» على الدائرة بين المماس ونصف القطر، وليس في مركز الدائرة O!',
    commonConfusionFr:
      'L’angle droit se situe au point de contact T sur le cercle, pas au centre O.',
    formulaLatex: '(d) \\perp (OT)',
    relatedTreatiseIds: [19],
  },

  // ==========================================================================
  // E. الزوايا والتوازي والتناظر (Angles, Parallélisme & Symétries)
  // ==========================================================================
  {
    id: 'angles-alternes-correspondants',
    termAr: 'الزوايا المتبادلة داخلياً والمتماثلة',
    termFr: 'Angles alternes-internes et correspondants',
    levelOrigin: 'مكتسبات السنة الثانية متوسط (2AM)',
    category: 'angles_symetries',
    categoryLabelAr: 'الزوايا والتوازي والتناظر',
    categoryLabelFr: 'Angles, Parallélisme et Symétries',
    keywords: [
      'متبادلتان داخلياً',
      'متبادلتين داخلياً',
      'المتبادلتان داخلياً',
      'المتبادلتين داخلياً',
      'زاويتان متبادلتان',
      'زاويتان متماثلتان',
      'الزاويتان المتماثلتان',
      'زاويتين متماثلتين',
      'الزاويتين المتماثلتين',
    ],
    definitionAr:
      'عند قطع مستقيمين بقاطع: الزاويتان المتبادلتان داخلياً تقعان بين المستقيمين وفي جهتين مختلفتين من القاطع (تشكلان حرف Z). والزاويتان المتماثلتان تقعان في نفس الجهة من القاطع، إحداهما داخلية والأخرى خارجية (حرف F).',
    definitionFr:
      'Deux droites coupées par une sécante forment des angles alternes-internes (de part et d’autre de la sécante, entre les droites) et correspondants (du même côté de la sécante).',
    keyPropertiesAr: [
      'إذا كان المستقيمان متوازيين، فإن كل زاويتين متبادلتين داخلياً متقايستان، وكل زاويتين متماثلتين متقايستان.',
      'عكسياً (لإثبات التوازي): إذا تقايست زاويتان متبادلتان داخلياً (خاصية 9) أو متماثلتان (خاصية 10)، فإن المستقيمين متوازيان.',
    ],
    keyPropertiesFr: [
      'Droites parallèles ⇔ angles alternes-internes égaux (Prop. 9) ⇔ angles correspondants égaux (Prop. 10).',
    ],
    howToProveAr:
      'لإثبات توازي مستقيمين، نبحث عن قاطع يشكل معهما زاويتين متبادلتين داخلياً أو متماثلتين لهما نفس القيس (خاصية 9 و 10).',
    howToProveFr:
      'Égalité d’angles alternes-internes ou correspondants → droites parallèles (Prop. 9 et 10).',
    commonConfusionAr:
      'الزوايا المتبادلة داخلياً لا تكون متقايسة إلا إذا كان المستقيمان متوازيين!',
    commonConfusionFr:
      'Les angles alternes-internes ne sont égaux que lorsque les deux droites sont parallèles.',
    relatedTreatiseIds: [9, 10],
  },
  {
    id: 'angles-opposes-sommet',
    termAr: 'الزاويتان المتقابلتان بالرأس',
    termFr: 'Angles opposés par le sommet',
    levelOrigin: 'مكتسبات السنة الثانية متوسط (2AM)',
    category: 'angles_symetries',
    categoryLabelAr: 'الزوايا والتوازي والتناظر',
    categoryLabelFr: 'Angles, Parallélisme et Symétries',
    keywords: ['متقابلتان بالرأس', 'المتقابلتان بالرأس', 'بالتقابل بالرأس'],
    definitionAr:
      'الزاويتان المتقابلتان بالرأس هما زاويتان لهما نفس الرأس، وأضلاع إحداهما هي امتداد لأضلاع الأخرى (تنتجان عن تقاطع مستقيمين).',
    definitionFr:
      'Deux angles opposés par le sommet ont le même sommet et leurs côtés sont dans le prolongement les uns des autres.',
    keyPropertiesAr: [
      'كل زاويتين متقابلتين بالرأس متقايستان دائماً دون أي شرط توازي (خاصية 59).',
    ],
    keyPropertiesFr: [
      'Deux angles opposés par le sommet ont toujours la même mesure (Propriété 59).',
    ],
    howToProveAr:
      'نذكر أن المستقيمين متقاطعان في الرأس المشترك، فنستنتج مباشرة تقايس الزاويتين المتقابلتين بالرأس (خاصية 59).',
    howToProveFr:
      'Dès que deux droites se coupent, les angles opposés par le sommet sont égaux (Propriété 59).',
    commonConfusionAr:
      'لا يكفي أن تشترك الزاويتان في الرأس فقط، بل يجب أن يكون ضلعا إحداهما على استقامة واحدة مع ضلعي الأخرى.',
    commonConfusionFr:
      'Avoir le même sommet ne suffit pas : les côtés doivent être des droites sécantes prolongées.',
    relatedTreatiseIds: [59],
  },
  {
    id: 'angles-complementaires',
    termAr: 'الزاويتان المتتامتان والمتكاملتان',
    termFr: 'Angles complémentaires et supplémentaires',
    levelOrigin: 'مكتسبات السنة الثانية متوسط (2AM)',
    category: 'angles_symetries',
    categoryLabelAr: 'الزوايا والتوازي والتناظر',
    categoryLabelFr: 'Angles, Parallélisme et Symétries',
    keywords: ['متتامتان', 'متكاملتان', 'الزاويتان المتكاملتان', 'الزاويتان المتتامتان'],
    definitionAr:
      'الزاويتان المتتامتان هما زاويتان مجموع قيسيهما يساوي 90°. والزاويتان المتكاملتان هما زاويتان مجموع قيسيهما يساوي 180°.',
    definitionFr:
      'Deux angles sont complémentaires si la somme de leurs mesures vaut 90°. Ils sont supplémentaires si leur somme vaut 180°.',
    keyPropertiesAr: [
      'في المثلث القائم، الزاويتان الحادتان متتامتان (مجموعهما 90° — خاصية 56).',
      'الزاويتان المتجاورتان المشكلتان لزاوية مستقيمة هما زاويتان متكاملتان (مجموعهما 180°).',
    ],
    keyPropertiesFr: [
      'Dans un triangle rectangle, les deux angles aigus sont complémentaires (B + C = 90°).',
    ],
    howToProveAr:
      'إذا علمت أن مثلثاً قائم في A وعلمت قيس B، تحسب C مباشرة بـ: C = 90° - B (خاصية 56).',
    howToProveFr:
      'Dans un triangle rectangle en A, on calcule C = 90° - B (Propriété 56).',
    commonConfusionAr:
      'تذكر: متتامتان = 90° (زاوية قائمة)، متكاملتان = 180° (زاوية مستقيمة).',
    commonConfusionFr:
      'Complémentaires = 90° ; Supplémentaires = 180°.',
    formulaLatex: '\\widehat{B} + \\widehat{C} = 90^\\circ',
    relatedTreatiseIds: [55, 56],
  },
  {
    id: 'symetrie-centrale',
    termAr: 'التناظر المركزي والتناظر المحوري',
    termFr: 'Symétrie centrale et Symétrie axiale',
    levelOrigin: 'مكتسبات 1AM / 2AM',
    category: 'angles_symetries',
    categoryLabelAr: 'الزوايا والتوازي والتناظر',
    categoryLabelFr: 'Angles, Parallélisme et Symétries',
    keywords: ['التناظر المركزي', 'بالتناظر المركزي', 'متناظرتان بالنسبة', 'متناظران بالنسبة', 'نظيرة'],
    definitionAr:
      'في التناظر المركزي بالنسبة لنقطة O: تكون A\' نظيرة A إذا كانت O منتصف [AA\']. وفي التناظر المحوري بالنسبة لمستقيم (d): تكون M\' نظيرة M إذا كان (d) هو محور القطعة [MM\'].',
    definitionFr:
      'Symétrie centrale de centre O : O est le milieu de [AA\']. Symétrie axiale d’axe (d) : (d) est la médiatrice de [MM\'].',
    keyPropertiesAr: [
      'التناظر المركزي والمحوري يحفظان الأطوال، أقياس الزوايا، الاستقامية، والمساحات.',
      'نظير مستقيم بالتناظر المركزي هو مستقيم يوازيه (خاصية 13).',
      'رباعي له مركز تناظر هو متوازي أضلاع (خاصية 28).',
    ],
    keyPropertiesFr: [
      'Les symétries conservent les longueurs, les angles et l’alignement.',
      'Deux droites symétriques par rapport à un point sont parallèles (Propriété 13).',
    ],
    howToProveAr:
      'إذا كانت A\' نظيرة A بالنسبة إلى O فإن O منتصف [AA\'] (خاصية 3). وإذا كانت M\' نظيرة M بالنسبة لـ (d) فإن (d) محور [MM\'] (خاصية 63).',
    howToProveFr:
      'Symétrie centrale → milieu (Prop. 3) et parallélogramme (Prop. 28). Symétrie axiale → médiatrice (Prop. 63).',
    commonConfusionAr:
      'التناظر المركزي يدير الشكل بنصف دورة (180°) حول نقطة، بينما التناظر المحوري يطوي الشكل حول مستقيم.',
    commonConfusionFr:
      'La symétrie centrale est un demi-tour autour d’un point ; la symétrie axiale est un pliage le long d’une droite.',
    relatedTreatiseIds: [3, 13, 28, 63],
  },
];
