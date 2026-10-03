import React, { createContext, useContext } from 'react';
import { PhysicsDomainId } from '../../typesPhysicsChemistry';
import {
  Atom,
  FlaskConical,
  Flame,
  Zap,
  BatteryCharging,
  Sun,
  Cpu,
  Activity,
  Eye,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

export interface PhysicsDomainThemeTokens {
  id: PhysicsDomainId;
  domainNumber: string;
  arabicName: string;
  frenchName: string;
  arabicFullTitle: string;
  frenchFullTitle: string;
  courseRange: string;
  totalCoursesCount: number;
  /** Couleur principale (ex: #0F766E pour Matière, #D97706 pour Énergie) */
  primaryHex: string;
  /** Couleur secondaire / accent fort (ex: #0D9488 pour Matière, #EA580C pour Énergie) */
  secondaryHex: string;
  /** Accent lumineux (ex: jaune électrique #F59E0B pour Énergie) */
  highlightHex: string;
  /** Fond doux teinté aux couleurs du domaine */
  softBgHex: string;
  /** Bordure douce aux couleurs du domaine */
  softBorderHex: string;
  /** Texte foncé à fort contraste sur fond doux */
  darkTextHex: string;
  /** Dégradé CSS pour la bannière d'en-tête du domaine */
  headerGradient: string;
  /** Dégradé CSS subtil pour les cartes de présentation */
  cardSubtleGradient: string;
  /** Barre supérieure de carte de cours */
  cardTopBarGradient: string;
  /** Trois icônes représentatives du domaine */
  PrimaryIcon: LucideIcon;
  SecondaryIcon: LucideIcon;
  TertiaryIcon: LucideIcon;
  /** Labels des 3 pictogrammes du domaine */
  iconLabels: { ar: string; fr: string }[];
  /** Compétences et thèmes clés du domaine pour la carte de présentation */
  presentationBullets: { ar: string; fr: string }[];
  /** Unités, symboles ou formules repères du domaine */
  keyUnitsAndSymbols: { symbol: string; labelAr: string; labelFr: string }[];
  /** Description pédagogique enrichie */
  bannerDescriptionAr: string;
  bannerDescriptionFr: string;
}

export const DOMAIN_THEME_TOKENS: Record<PhysicsDomainId, PhysicsDomainThemeTokens> = {
  matter: {
    id: 'matter',
    domainNumber: '01',
    arabicName: 'المادة وتحولاتها',
    frenchName: 'Matière et ses transformations',
    arabicFullTitle: 'الميدان 01 : المادة وتحولاتها',
    frenchFullTitle: 'Domaine 01 · Matière et ses transformations',
    courseRange: '01 → 06',
    totalCoursesCount: 6,
    primaryHex: '#0F766E',
    secondaryHex: '#0D9488',
    highlightHex: '#14B8A6',
    softBgHex: '#F0FDFA',
    softBorderHex: '#99F6E4',
    darkTextHex: '#115E59',
    headerGradient: 'linear-gradient(135deg, #0F766E 0%, #115E59 60%, #134E4A 100%)',
    cardSubtleGradient: 'linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)',
    cardTopBarGradient: 'linear-gradient(90deg, #0F766E 0%, #14B8A6 100%)',
    PrimaryIcon: FlaskConical,
    SecondaryIcon: Atom,
    TertiaryIcon: Flame,
    iconLabels: [
      { ar: 'تجارب مخبرية', fr: 'Expériences' },
      { ar: 'بنية مجهرية (ذرات وجزيئات)', fr: 'Atomes & Molécules' },
      { ar: 'تفاعلات واحتراقات', fr: 'Combustions & Réactions' },
    ],
    presentationBullets: [
      {
        ar: 'التمييز بين الفرد الكيميائي (المستوى المجهري) والنوع الكيميائي (المستوى العياني) والجملة الكيميائية.',
        fr: 'Entité chimique (microscopique), espèce chimique (macroscopique) et système chimique.',
      },
      {
        ar: 'دراسة التحليل الكهربائي للماء والاحتراق التام وغير التام للفحوم الهيدروجينية.',
        fr: 'Électrolyse de l’eau et combustions complète et incomplète des hydrocarbures.',
      },
      {
        ar: 'تطبيق مبدأ انحفاظ الكتلة وانحفاظ الذرات لموازنة معادلات التفاعل الكيميائي والعوامل المؤثرة.',
        fr: 'Conservation de la masse et des atomes, équilibrage des équations et facteurs cinétiques.',
      },
    ],
    keyUnitsAndSymbols: [
      { symbol: 'H₂O · CO₂ · O₂', labelAr: 'صيغ جزيئية', labelFr: 'Formules moléculaires' },
      { symbol: '2 H₂O → 2 H₂ + O₂', labelAr: 'معادلة كيميائية موزونة', labelFr: 'Équation équilibrée' },
      { symbol: 'g / L / °C', labelAr: 'كتلة · حجم · درجة حرارة', labelFr: 'Masse · Volume · Température' },
    ],
    bannerDescriptionAr:
      'يستكشف هذا الميدان البنية المجهرية للمادة، التحولات الكيميائية، الكشف عن الغازات، موازنة المعادلات الكيميائية، والعوامل المؤثرة في سرعة التفاعل.',
    bannerDescriptionFr:
      'Exploration de la structure de la matière, des réactions chimiques, de l’équilibrage des équations et des facteurs cinétiques.',
  },

  energy: {
    id: 'energy',
    domainNumber: '02',
    arabicName: 'الطاقة',
    frenchName: 'Énergie',
    arabicFullTitle: 'الميدان 02 : الطاقة والسلاسل الوظيفية والطاقوية',
    frenchFullTitle: 'Domaine 02 · Énergie, Chaînes Fonctionnelle & Énergétique',
    courseRange: '07 → 10',
    totalCoursesCount: 4,
    primaryHex: '#D97706',
    secondaryHex: '#EA580C',
    highlightHex: '#F59E0B',
    softBgHex: '#FFFBEB',
    softBorderHex: '#FCD34D',
    darkTextHex: '#92400E',
    headerGradient: 'linear-gradient(135deg, #C2410C 0%, #EA580C 48%, #D97706 82%, #F59E0B 100%)',
    cardSubtleGradient: 'linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 100%)',
    cardTopBarGradient: 'linear-gradient(90deg, #EA580C 0%, #D97706 50%, #F59E0B 100%)',
    PrimaryIcon: Zap,
    SecondaryIcon: BatteryCharging,
    TertiaryIcon: Sun,
    iconLabels: [
      { ar: 'تحويل كهربائي وميكانيكي', fr: 'Éclair / Transfert (We, W)' },
      { ar: 'تخزين الطاقة (بطارية)', fr: 'Pile / Stockage (Ei, Ec, Ep)' },
      { ar: 'إشعاع ضوئي وحراري', fr: 'Soleil / Rayonnement (Er, Q)' },
    ],
    presentationBullets: [
      {
        ar: 'تحليل الأنظمة التقنية وبناء «السلسلة الوظيفية (Chaîne fonctionnelle)» بربط كل عنصر بوظيفته التقنية.',
        fr: 'Analyse des systèmes techniques et construction de la chaîne fonctionnelle (Élément + Fonction).',
      },
      {
        ar: 'تمثيل «السلسلة الطاقوية (Chaîne énergétique)» بأنماط التخزين (Ec, Ep, Ei) وأنماط التحويل (W, We, Er, Q).',
        fr: 'Modélisation de la chaîne énergétique : modes de stockage (Ec, Ep, Ei) et de transfert (W, We, Er, Q).',
      },
      {
        ar: 'التمييز بين الطاقة المفيدة والطاقة الضائعة حراريًا (Q) في الوسط الخارجي، وحساب الحصيلة والاستطاعة الطاقوية.',
        fr: 'Distinction entre énergie utile et dissipée (Q), principe de conservation et puissance énergétique (P = E / t).',
      },
    ],
    keyUnitsAndSymbols: [
      { symbol: 'Ec · Ep · Ei', labelAr: 'أنماط تخزين الطاقة', labelFr: 'Modes de stockage' },
      { symbol: 'W · We · Er · Q', labelAr: 'أنماط تحويل الطاقة', labelFr: 'Modes de transfert' },
      { symbol: 'J · kJ · W · Wh', labelAr: 'جول · كيلوجول · واط · واط ساعي', labelFr: 'Joule · Watt · Wattheure' },
    ],
    bannerDescriptionAr:
      'يهتم هذا الميدان بدراسة الأنظمة التقنية، كيف تتعاون عناصرها (السلسلة الوظيفية)، وكيف تُخزَّن الطاقة وتنتقل وتتحول بين الجمل دون أن تختفي (السلسلة الطاقوية والحصيلة الطاقوية).',
    bannerDescriptionFr:
      'Étude des systèmes techniques, des chaînes fonctionnelles et énergétiques, de la conservation de l’énergie et de la puissance de transfert.',
  },

  electricity: {
    id: 'electricity',
    domainNumber: '03',
    arabicName: 'الظواهر الكهربائية',
    frenchName: 'Phénomènes électriques',
    arabicFullTitle: 'الميدان 03 : الظواهر الكهربائية',
    frenchFullTitle: 'Domaine 03 · Phénomènes électriques',
    courseRange: '11 → 15',
    totalCoursesCount: 5,
    primaryHex: '#1D4ED8',
    secondaryHex: '#0284C7',
    highlightHex: '#38BDF8',
    softBgHex: '#EFF6FF',
    softBorderHex: '#93C5FD',
    darkTextHex: '#1E40AF',
    headerGradient: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 55%, #0284C7 100%)',
    cardSubtleGradient: 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)',
    cardTopBarGradient: 'linear-gradient(90deg, #1D4ED8 0%, #0284C7 100%)',
    PrimaryIcon: Cpu,
    SecondaryIcon: Activity,
    TertiaryIcon: Zap,
    iconLabels: [
      { ar: 'الدارات الكهربائية', fr: 'Circuits électriques' },
      { ar: 'القياسات الكهربائية', fr: 'Mesures (I, U, R)' },
      { ar: 'الاستطاعة الكهربائية', fr: 'Puissance électrique' },
    ],
    presentationBullets: [
      {
        ar: 'مفهوم التيار الكهربائي المستمر، جهته الاصطلاحية، وقياس شدة التيار الكهربائي (I) بالأمبيرمتر.',
        fr: 'Courant électrique continu, sens conventionnel et mesure de l’intensité (I) en Ampères.',
      },
      {
        ar: 'قياس التوتر الكهربائي (U) بالفولطمتر، والمقاومة الكهربائية (R) وقانون أوم (U = R × I).',
        fr: 'Tension électrique (U), résistance (R) et loi d’Ohm (U = R × I).',
      },
      {
        ar: 'تطبيق قوانين الشدات والتوترات في الدارات على التسلسل وعلى التفرع وحساب الاستطاعة الكهربائية.',
        fr: 'Lois des intensités et des tensions (série / dérivation) et puissance électrique (P = U × I).',
      },
    ],
    keyUnitsAndSymbols: [
      { symbol: 'I (A) · U (V)', labelAr: 'الشدة (أمبير) · التوتر (فولط)', labelFr: 'Intensité · Tension' },
      { symbol: 'R (Ω) · U = R × I', labelAr: 'المقاومة (أوم) · قانون أوم', labelFr: 'Résistance · Loi d’Ohm' },
      { symbol: 'P = U × I (W)', labelAr: 'الاستطاعة الكهربائية', labelFr: 'Puissance électrique' },
    ],
    bannerDescriptionAr:
      'يدرس هذا الميدان المقادير الكهربائية الأساسية في التيار المستمر (الشدة، التوتر، المقاومة، الاستطاعة) وقوانين القياس في الدارات الكهربائية.',
    bannerDescriptionFr:
      'Étude des grandeurs électriques en courant continu (intensité, tension, résistance, loi d’Ohm et puissance).',
  },

  optics: {
    id: 'optics',
    domainNumber: '04',
    arabicName: 'الظواهر الضوئية',
    frenchName: 'Phénomènes lumineux',
    arabicFullTitle: 'الميدان 04 : الظواهر الضوئية',
    frenchFullTitle: 'Domaine 04 · Phénomènes lumineux',
    courseRange: '16 → 20',
    totalCoursesCount: 5,
    primaryHex: '#6D28D9',
    secondaryHex: '#7C3AED',
    highlightHex: '#A78BFA',
    softBgHex: '#F5F3FF',
    softBorderHex: '#C4B5FD',
    darkTextHex: '#5B21B6',
    headerGradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 55%, #7C3AED 100%)',
    cardSubtleGradient: 'linear-gradient(180deg, #F5F3FF 0%, #FFFFFF 100%)',
    cardTopBarGradient: 'linear-gradient(90deg, #6D28D9 0%, #A78BFA 100%)',
    PrimaryIcon: Sun,
    SecondaryIcon: Eye,
    TertiaryIcon: Sparkles,
    iconLabels: [
      { ar: 'طيف الضوء الأبيض', fr: 'Spectre lumineux' },
      { ar: 'رؤية الأجسام بالألوان', fr: 'Vision des couleurs' },
      { ar: 'المرشحات والتركيب الضوئي', fr: 'Filtres & Synthèses' },
    ],
    presentationBullets: [
      {
        ar: 'تحليل الضوء الأبيض بواسطة الموشور وتحديد ألوان الطيف المرئي.',
        fr: 'Décomposition de la lumière blanche par un prisme et spectre visible.',
      },
      {
        ar: 'نموذج التركيب الجمعي (R, G, B) والتركيب الطرحي للألوان (C, M, Y).',
        fr: 'Synthèse additive (RVB) et synthèse soustractive des couleurs.',
      },
      {
        ar: 'تفسير رؤية الأجسام بالألوان ودور المرشحات الضوئية والعين.',
        fr: 'Vision d’un objet coloré à travers des filtres optiques.',
      },
    ],
    keyUnitsAndSymbols: [
      { symbol: 'R · V · B (RGB)', labelAr: 'الألوان الأساسية الضوئية', labelFr: 'Couleurs primaires' },
      { symbol: 'C · M · J (CMY)', labelAr: 'الألوان الثانوية (الطرحية)', labelFr: 'Couleurs secondaires' },
      { symbol: 'nm (400 → 700)', labelAr: 'مجال الطيف المرئي', labelFr: 'Domaine visible' },
    ],
    bannerDescriptionAr:
      'يتناول هذا الميدان تحليل وتركيب الضوء الأبيض، المرشحات الضوئية، وكيفية رؤية الأجسام بألوانها المختلفة.',
    bannerDescriptionFr:
      'Analyse et synthèse de la lumière, filtres colorés et perception des couleurs des objets.',
  },

  general: {
    id: 'general',
    domainNumber: '00',
    arabicName: 'الفيزياء والكيمياء',
    frenchName: 'Physique-Chimie',
    arabicFullTitle: 'العلوم الفيزيائية والتكنولوجيا',
    frenchFullTitle: 'Sciences Physiques et Technologie',
    courseRange: '01 → 20',
    totalCoursesCount: 20,
    primaryHex: '#0F766E',
    secondaryHex: '#0D9488',
    highlightHex: '#14B8A6',
    softBgHex: '#F0FDFA',
    softBorderHex: '#99F6E4',
    darkTextHex: '#115E59',
    headerGradient: 'linear-gradient(135deg, #0F766E 0%, #115E59 60%, #134E4A 100%)',
    cardSubtleGradient: 'linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)',
    cardTopBarGradient: 'linear-gradient(90deg, #0F766E 0%, #14B8A6 100%)',
    PrimaryIcon: FlaskConical,
    SecondaryIcon: Atom,
    TertiaryIcon: Zap,
    iconLabels: [
      { ar: 'المادة وتحولاتها', fr: 'Matière' },
      { ar: 'الطاقة وتحويلاتها', fr: 'Énergie' },
      { ar: 'الكهرباء والضوء', fr: 'Électricité & Optique' },
    ],
    presentationBullets: [],
    keyUnitsAndSymbols: [],
    bannerDescriptionAr: 'برنامج العلوم الفيزيائية والتكنولوجيا للسنة الثالثة متوسط (3AM).',
    bannerDescriptionFr: 'Programme de Sciences Physiques et Technologie — 3e Année Moyenne.',
  },
};

export function getDomainTheme(domainId: PhysicsDomainId): PhysicsDomainThemeTokens {
  return DOMAIN_THEME_TOKENS[domainId] || DOMAIN_THEME_TOKENS.matter;
}

/**
 * Motif de fond SVG propre à chaque domaine (sans surcharge visuelle, opacité maîtrisée)
 */
export const DomainPatternSvg: React.FC<{ domainId: PhysicsDomainId; className?: string }> = ({
  domainId,
  className = 'absolute inset-0 w-full h-full pointer-events-none opacity-15',
}) => {
  if (domainId === 'energy') {
    // Motif Énergie : rayons solaires, éclairs stylisés, cellules de batterie et ondes de flux
    return (
      <svg
        viewBox="0 0 800 220"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        aria-hidden="true"
      >
        {/* Rayons solaires concentriques à gauche */}
        <circle cx="95" cy="110" r="38" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="6 6" />
        <circle cx="95" cy="110" r="68" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx="95" cy="110" r="98" stroke="#FFFFFF" strokeWidth="1.2" />
        {/* Ondes de transfert énergétique */}
        <path
          d="M 180 65 Q 260 20, 340 65 T 500 65 T 660 65"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeDasharray="8 6"
        />
        <path
          d="M 180 155 Q 260 110, 340 155 T 500 155 T 660 155"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        {/* Éclair stylisé au centre-droit */}
        <polygon
          points="580,28 548,108 584,108 558,190 628,96 588,96"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          fill="#FFFFFF"
          fillOpacity="0.12"
        />
        {/* Icône Pile / Accumulateur stylisée à droite */}
        <rect x="680" y="68" width="76" height="86" rx="10" stroke="#FFFFFF" strokeWidth="2.5" />
        <rect x="704" y="54" width="28" height="14" rx="3" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="718" y1="88" x2="718" y2="112" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="706" y1="100" x2="730" y2="100" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="706" y1="134" x2="730" y2="134" stroke="#FFFFFF" strokeWidth="2.5" />
      </svg>
    );
  }

  if (domainId === 'electricity') {
    return (
      <svg
        viewBox="0 0 800 220"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        aria-hidden="true"
      >
        <path d="M 40 60 H 220 L 255 110 H 420 L 455 55 H 680" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M 90 165 H 310 L 345 115 H 540 L 580 165 H 750" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="220" cy="60" r="6" fill="#FFFFFF" />
        <circle cx="420" cy="110" r="6" fill="#FFFFFF" />
        <circle cx="540" cy="115" r="6" fill="#FFFFFF" />
      </svg>
    );
  }

  if (domainId === 'optics') {
    return (
      <svg
        viewBox="0 0 800 220"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className={className}
        aria-hidden="true"
      >
        <polygon points="360,35 300,175 420,175" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="80" y1="135" x2="330" y2="105" stroke="#FFFFFF" strokeWidth="3" />
        <line x1="390" y1="105" x2="720" y2="55" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="390" y1="105" x2="720" y2="110" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="390" y1="105" x2="720" y2="165" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
    );
  }

  // Default: Matter (réseau moléculaire et orbitales atomiques)
  return (
    <svg
      viewBox="0 0 800 220"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <circle cx="130" cy="110" r="24" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="210" cy="65" r="16" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="210" cy="155" r="16" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="151" y1="98" x2="195" y2="73" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="151" y1="122" x2="195" y2="147" stroke="#FFFFFF" strokeWidth="2.5" />
      <ellipse cx="640" cy="110" rx="78" ry="32" transform="rotate(28 640 110)" stroke="#FFFFFF" strokeWidth="1.8" />
      <ellipse cx="640" cy="110" rx="78" ry="32" transform="rotate(-28 640 110)" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="640" cy="110" r="10" fill="#FFFFFF" />
    </svg>
  );
};

const DomainThemeContext = createContext<PhysicsDomainThemeTokens>(DOMAIN_THEME_TOKENS.matter);

export const PhysicsDomainThemeProvider: React.FC<{
  domainId: PhysicsDomainId;
  children: React.ReactNode;
}> = ({ domainId, children }) => {
  const theme = getDomainTheme(domainId);
  return <DomainThemeContext.Provider value={theme}>{children}</DomainThemeContext.Provider>;
};

export function usePhysicsDomainTheme(): PhysicsDomainThemeTokens {
  return useContext(DomainThemeContext);
}
