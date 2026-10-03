export type TreatiseLanguageMode = 'ar' | 'fr' | 'bilingual';

export type TreatiseStep = 1 | 2 | 3 | 4;

export interface TreatiseCategory {
  id: string;
  number: number;
  rangeLabelAr: string;
  rangeLabelFr: string;
  titleAr: string;
  titleFr: string;
  goalQuestionAr: string;
  goalQuestionFr: string;
  color: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  minId: number;
  maxId: number;
}

export interface GeometryPropertyItem {
  id: number; // 1 to 69
  code: string; // "01" to "69"
  categoryId: string; // "cat-1" to "cat-10"
  categoryNumber: number; // 1 to 10
  titleAr: string;
  titleFr: string;
  statementAr: string; // Right column in PDF (الخاصية)
  statementFr: string;
  proofTemplateAr: string; // Left column in PDF (تحرير البرهان: بما أن ... فإن ...)
  proofTemplateFr: string;
  hypothesesAr: string[];
  hypothesesFr: string[];
  conclusionAr: string;
  conclusionFr: string;
  figureCaptionAr: string;
  figureCaptionFr: string;
  converseId?: number; // ID of converse/reciprocal property if applicable
  relatedIds?: number[];
  linkedCourseIds?: string[]; // e.g., ['lesson-11', 'lesson-12', 'lesson-18', 'lesson-19', 'lesson-20']
  diagramType: string;
}

export const TREATISE_CATEGORIES: TreatiseCategory[] = [
  {
    id: 'cat-1',
    number: 1,
    rangeLabelAr: 'خاصية 01 إلى خاصية 06',
    rangeLabelFr: 'Propriétés 01 à 06',
    titleAr: 'إثبات أن نقطة هي منتصف قطعة',
    titleFr: "Démontrer qu'un point est le milieu d'un segment",
    goalQuestionAr: 'كيف أثبت أن نقطة هي منتصف قطعة مستقيم؟',
    goalQuestionFr: "Comment prouver qu'un point est le milieu d'un segment ?",
    color: 'amber',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200',
    textColor: 'text-amber-800',
    minId: 1,
    maxId: 6,
  },
  {
    id: 'cat-2',
    number: 2,
    rangeLabelAr: 'خاصية 07 إلى خاصية 14',
    rangeLabelFr: 'Propriétés 07 à 14',
    titleAr: 'إثبات توازي مستقيمين',
    titleFr: 'Démontrer que deux droites sont parallèles',
    goalQuestionAr: 'كيف أثبت أن مستقيمين متوازيان؟',
    goalQuestionFr: 'Comment prouver que deux droites sont parallèles ?',
    color: 'indigo',
    bgLight: 'bg-indigo-50',
    borderLight: 'border-indigo-200',
    textColor: 'text-indigo-800',
    minId: 7,
    maxId: 14,
  },
  {
    id: 'cat-3',
    number: 3,
    rangeLabelAr: 'خاصية 15 إلى خاصية 22',
    rangeLabelFr: 'Propriétés 15 à 22',
    titleAr: 'إثبات تعامد مستقيمين (أو أن مثلثاً قائم)',
    titleFr: 'Démontrer que deux droites sont perpendiculaires (ou triangle rectangle)',
    goalQuestionAr: 'كيف أثبت تعامد مستقيمين أو أن المثلث قائم؟',
    goalQuestionFr: 'Comment prouver que deux droites sont perpendiculaires ?',
    color: 'rose',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200',
    textColor: 'text-rose-800',
    minId: 15,
    maxId: 22,
  },
  {
    id: 'cat-4',
    number: 4,
    rangeLabelAr: 'خاصية 23 إلى خاصية 29',
    rangeLabelFr: 'Propriétés 23 à 29',
    titleAr: 'إثبات أن رباعياً ما متوازي أضلاع',
    titleFr: "Démontrer qu'un quadrilatère est un parallélogramme",
    goalQuestionAr: 'كيف أثبت أن رباعياً هو متوازي أضلاع؟',
    goalQuestionFr: "Comment prouver qu'un quadrilatère est un parallélogramme ?",
    color: 'emerald',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    textColor: 'text-emerald-800',
    minId: 23,
    maxId: 29,
  },
  {
    id: 'cat-5',
    number: 5,
    rangeLabelAr: 'خاصية 30 إلى خاصية 32',
    rangeLabelFr: 'Propriétés 30 à 32',
    titleAr: 'إثبات أن رباعياً ما معيّن',
    titleFr: "Démontrer qu'un quadrilatère est un losange",
    goalQuestionAr: 'كيف أثبت أن رباعياً هو معيّن؟',
    goalQuestionFr: "Comment prouver qu'un quadrilatère est un losange ?",
    color: 'teal',
    bgLight: 'bg-teal-50',
    borderLight: 'border-teal-200',
    textColor: 'text-teal-800',
    minId: 30,
    maxId: 32,
  },
  {
    id: 'cat-6',
    number: 6,
    rangeLabelAr: 'خاصية 33 إلى خاصية 35',
    rangeLabelFr: 'Propriétés 33 à 35',
    titleAr: 'إثبات أن رباعياً ما مستطيل',
    titleFr: "Démontrer qu'un quadrilatère est un rectangle",
    goalQuestionAr: 'كيف أثبت أن رباعياً هو مستطيل؟',
    goalQuestionFr: "Comment prouver qu'un quadrilatère est un rectangle ?",
    color: 'sky',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-200',
    textColor: 'text-sky-800',
    minId: 33,
    maxId: 35,
  },
  {
    id: 'cat-7',
    number: 7,
    rangeLabelAr: 'خاصية 36 إلى خاصية 39',
    rangeLabelFr: 'Propriétés 36 à 39',
    titleAr: 'إثبات أن رباعياً ما مربّع',
    titleFr: "Démontrer qu'un quadrilatère est un carré",
    goalQuestionAr: 'كيف أثبت أن رباعياً هو مربّع؟',
    goalQuestionFr: "Comment prouver qu'un quadrilatère est un carré ?",
    color: 'purple',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    textColor: 'text-purple-800',
    minId: 36,
    maxId: 39,
  },
  {
    id: 'cat-8',
    number: 8,
    rangeLabelAr: 'خاصية 40 إلى خاصية 53',
    rangeLabelFr: 'Propriétés 40 à 53',
    titleAr: 'إيجاد طول قطعة مستقيم',
    titleFr: "Calculer ou déterminer la longueur d'un segment",
    goalQuestionAr: 'كيف أحسب طول قطعة أو أثبت تقايس قطعتين؟',
    goalQuestionFr: "Comment calculer la longueur d'un segment ?",
    color: 'blue',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-200',
    textColor: 'text-blue-800',
    minId: 40,
    maxId: 53,
  },
  {
    id: 'cat-9',
    number: 9,
    rangeLabelAr: 'خاصية 54 إلى خاصية 62',
    rangeLabelFr: 'Propriétés 54 à 62',
    titleAr: 'تحديد قيس زاوية (أو تقايس زاويتين)',
    titleFr: "Déterminer la mesure d'un angle",
    goalQuestionAr: 'كيف أحسب قيس زاوية أو أثبت تقايس زاويتين؟',
    goalQuestionFr: "Comment déterminer la mesure d'un angle ?",
    color: 'orange',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    textColor: 'text-orange-800',
    minId: 54,
    maxId: 62,
  },
  {
    id: 'cat-10',
    number: 10,
    rangeLabelAr: 'خاصية 63 إلى خاصية 69',
    rangeLabelFr: 'Propriétés 63 à 69',
    titleAr: 'البرهان بتوظيف خواص المستقيمات الخاصة في المثلث',
    titleFr: 'Utiliser les droites remarquables dans le triangle',
    goalQuestionAr: 'كيف أثبت أن مستقيماً هو محور، ارتفاع، متوسط أو منصف؟',
    goalQuestionFr: 'Comment utiliser les droites remarquables (médiatrice, hauteur, médiane, bissectrice) ?',
    color: 'cyan',
    bgLight: 'bg-cyan-50',
    borderLight: 'border-cyan-200',
    textColor: 'text-cyan-800',
    minId: 63,
    maxId: 69,
  },
];
