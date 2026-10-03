import React, { createContext, useContext, useState } from 'react';
import { FUNDAMENTAL_CONCEPTS, FundamentalConcept } from '../data/fundamentalConceptsData';
import { MathView } from './MathView';
import {
  X,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Sparkles,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface ConceptModalContextValue {
  openConceptById: (conceptId: string) => void;
  openGlossary: () => void;
}

const ConceptModalContext = createContext<ConceptModalContextValue>({
  openConceptById: () => {},
  openGlossary: () => {},
});

export const useConceptModal = () => useContext(ConceptModalContext);

interface ConceptModalProviderProps {
  children: React.ReactNode;
  onOpenTreatiseProperty?: (propertyId: number) => void;
}

// Dedicated clean SVG diagram for each fundamental concept (Numerical/Algebraic + Geometry)
const ConceptVisualDiagram: React.FC<{ conceptId: string }> = ({ conceptId }) => {
  const ptStyle: React.SVGProps<SVGTextElement> = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '14px',
    fill: '#1e293b',
  };

  switch (conceptId) {
    // ========================================================================
    // NUMERICAL & ALGEBRAIC DIAGRAMS (Courses 01–09, 13–17)
    // ========================================================================
    case 'nombre-relatif':
    case 'distance-a-zero':
      return (
        <svg viewBox="0 0 240 130" className="w-full max-w-[235px] h-auto">
          {/* Graduated number line */}
          <line x1="20" y1="72" x2="220" y2="72" stroke="#334155" strokeWidth="2" />
          <polygon points="222,72 214,68 214,76" fill="#334155" />
          {/* Origin 0 at x=120 */}
          <line x1="120" y1="64" x2="120" y2="80" stroke="#0f172a" strokeWidth="2.2" />
          <text x="116" y="96" fontSize="12" fontWeight="bold" fill="#0f172a">0</text>
          {/* Negative side (-4 at x=50) */}
          <line x1="50" y1="66" x2="50" y2="78" stroke="#dc2626" strokeWidth="2" />
          <text x="41" y="96" fontSize="12" fontWeight="bold" fill="#dc2626">-4</text>
          {/* Positive side (+4 at x=190) */}
          <line x1="190" y1="66" x2="190" y2="78" stroke="#059669" strokeWidth="2" />
          <text x="181" y="96" fontSize="12" fontWeight="bold" fill="#059669">+4</text>
          {/* Distance brackets */}
          <path d="M 50,52 Q 85,34 120,52" fill="none" stroke="#dc2626" strokeWidth="1.6" strokeDasharray="3,2" />
          <path d="M 120,52 Q 155,34 190,52" fill="none" stroke="#059669" strokeWidth="1.6" strokeDasharray="3,2" />
          <text x="68" y="36" fontSize="10" fontWeight="bold" fill="#dc2626">مسافة = 4</text>
          <text x="138" y="36" fontSize="10" fontWeight="bold" fill="#059669">مسافة = 4</text>
          <text x="42" y="118" fontSize="10" fill="#dc2626" fontWeight="bold">أعداد سالبة (-)</text>
          <text x="145" y="118" fontSize="10" fill="#059669" fontWeight="bold">أعداد موجبة (+)</text>
        </svg>
      );

    case 'regle-des-signes':
      return (
        <svg viewBox="0 0 240 130" className="w-full max-w-[235px] h-auto">
          <rect x="14" y="16" width="102" height="44" rx="8" fill="#dcfce7" stroke="#34d399" strokeWidth="1.5" />
          <text x="65" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">نفس الإشارة</text>
          <text x="65" y="51" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857" dir="ltr">(+)×(+) = (+)</text>

          <rect x="124" y="16" width="102" height="44" rx="8" fill="#dcfce7" stroke="#34d399" strokeWidth="1.5" />
          <text x="175" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">نفس الإشارة</text>
          <text x="175" y="51" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857" dir="ltr">(-)×(-) = (+)</text>

          <rect x="14" y="68" width="102" height="44" rx="8" fill="#fee2e2" stroke="#f87171" strokeWidth="1.5" />
          <text x="65" y="86" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">مختلفا الإشارة</text>
          <text x="65" y="103" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626" dir="ltr">(+)×(-) = (-)</text>

          <rect x="124" y="68" width="102" height="44" rx="8" fill="#fee2e2" stroke="#f87171" strokeWidth="1.5" />
          <text x="175" y="86" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">مختلفا الإشارة</text>
          <text x="175" y="103" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626" dir="ltr">(-)÷(+) = (-)</text>
        </svg>
      );

    case 'inverse-oppose':
      return (
        <svg viewBox="0 0 240 130" className="w-full max-w-[235px] h-auto">
          {/* Two cards comparing Opposé vs Inverse */}
          <rect x="14" y="18" width="100" height="94" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
          <text x="64" y="38" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">المعاكس (Opposé)</text>
          <text x="64" y="64" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">+a  ↔  -a</text>
          <text x="64" y="92" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7f1d1d">المجموع = 0</text>

          <rect x="126" y="18" width="100" height="94" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
          <text x="176" y="38" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">المقلوب (Inverse)</text>
          <text x="176" y="64" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb">a/b  ↔  b/a</text>
          <text x="176" y="92" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a8a">الجداء = 1</text>
        </svg>
      );

    case 'unification-denominateurs':
    case 'fraction-irreductible':
    case 'nombre-rationnel':
      return (
        <svg viewBox="0 0 240 130" className="w-full max-w-[235px] h-auto">
          <rect x="24" y="20" width="192" height="90" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="120" y="46" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">البسط (a)</text>
          <line x1="65" y1="58" x2="175" y2="58" stroke="#4f46e5" strokeWidth="2.5" />
          <text x="120" y="80" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4f46e5">المقام (b ≠ 0)</text>
          <text x="120" y="101" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">
            نضرب أو نقسم البسط والمقام في نفس العدد k
          </text>
        </svg>
      );

    case 'produit-en-croix':
      return (
        <svg viewBox="0 0 240 130" className="w-full max-w-[235px] h-auto">
          <circle cx="68" cy="36" r="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.6" />
          <circle cx="68" cy="94" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1.6" />
          <circle cx="172" cy="36" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="1.6" />
          <circle cx="172" cy="94" r="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.6" />
          <line x1="48" y1="65" x2="88" y2="65" stroke="#334155" strokeWidth="2" />
          <line x1="152" y1="65" x2="192" y2="65" stroke="#334155" strokeWidth="2" />
          {/* Cross arrows */}
          <line x1="82" y1="44" x2="158" y2="86" stroke="#2563eb" strokeWidth="2" strokeDasharray="4,2" />
          <line x1="82" y1="86" x2="158" y2="44" stroke="#d97706" strokeWidth="2" strokeDasharray="4,2" />
          <text x="68" y="41" textAnchor="middle" {...ptStyle}>a</text>
          <text x="68" y="99" textAnchor="middle" {...ptStyle}>b</text>
          <text x="172" y="41" textAnchor="middle" {...ptStyle}>c</text>
          <text x="172" y="99" textAnchor="middle" {...ptStyle}>d</text>
          <text x="120" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">=</text>
        </svg>
      );

    case 'puissance-exposant':
    case 'ecriture-scientifique':
      return (
        <svg viewBox="0 0 240 130" className="w-full max-w-[235px] h-auto">
          <rect x="24" y="18" width="192" height="94" rx="12" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1.5" />
          <text x="102" y="78" fontSize="36" fontFamily="Georgia, serif" fontStyle="italic" fill="#1e293b">a</text>
          <text x="126" y="52" fontSize="22" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold" fill="#7e22ce">n</text>
          <text x="65" y="98" fontSize="11" fontWeight="bold" fill="#334155">الأساس (Base)</text>
          <text x="155" y="42" fontSize="11" fontWeight="bold" fill="#7e22ce">الأس (Exposant)</text>
        </svg>
      );

    case 'priorites-operatoires':
      return (
        <svg viewBox="0 0 240 130" className="w-full max-w-[235px] h-auto">
          <rect x="65" y="12" width="110" height="24" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.4" />
          <text x="120" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">1. الأقواس ( )</text>
          <rect x="50" y="41" width="140" height="24" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.4" />
          <text x="120" y="57" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">2. القوى والأسس aⁿ</text>
          <rect x="35" y="70" width="170" height="24" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.4" />
          <text x="120" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">3. الضرب والقسمة × ÷</text>
          <rect x="20" y="99" width="200" height="24" rx="6" fill="#dcfce7" stroke="#10b981" strokeWidth="1.4" />
          <text x="120" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">4. الجمع والطرح + -</text>
        </svg>
      );

    case 'racine-carree':
      return (
        <svg viewBox="0 0 240 130" className="w-full max-w-[235px] h-auto">
          <rect x="78" y="22" width="84" height="84" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
          <text x="120" y="68" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#065f46">المساحة = a</text>
          <text x="120" y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">طول الضلع = √a</text>
        </svg>
      );

    // ========================================================================
    // GEOMETRY DIAGRAMS (Courses 10–12, 18–20)
    // ========================================================================
    case 'mediane':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <polygon points="105,20 45,115 195,115" fill="#ede9fe" fillOpacity="0.5" stroke="#475569" strokeWidth="1.8" />
          <line x1="105" y1="20" x2="120" y2="115" stroke="#7c3aed" strokeWidth="2.4" />
          <line x1="80" y1="110" x2="84" y2="120" stroke="#059669" strokeWidth="1.8" />
          <line x1="84" y1="110" x2="88" y2="120" stroke="#059669" strokeWidth="1.8" />
          <line x1="154" y1="110" x2="158" y2="120" stroke="#059669" strokeWidth="1.8" />
          <line x1="158" y1="110" x2="162" y2="120" stroke="#059669" strokeWidth="1.8" />
          <text x="100" y="15" {...ptStyle}>C</text>
          <text x="30" y="120" {...ptStyle}>A</text>
          <text x="202" y="120" {...ptStyle}>B</text>
          <text x="115" y="132" {...ptStyle} fill="#7c3aed">M</text>
        </svg>
      );

    case 'droite-des-milieux':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <polygon points="105,20 45,115 195,115" fill="#f0fdf4" fillOpacity="0.5" stroke="#475569" strokeWidth="1.8" />
          <line x1="55" y1="67.5" x2="170" y2="67.5" stroke="#be123c" strokeWidth="2.2" />
          <text x="100" y="15" {...ptStyle}>C</text>
          <text x="30" y="120" {...ptStyle}>A</text>
          <text x="202" y="120" {...ptStyle}>B</text>
          <text x="58" y="62" {...ptStyle} fill="#be123c">I</text>
          <text x="155" y="62" {...ptStyle} fill="#be123c">J</text>
        </svg>
      );

    case 'hauteur':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <polygon points="92,20 45,115 195,115" fill="#e0f2fe" fillOpacity="0.5" stroke="#475569" strokeWidth="1.8" />
          <line x1="92" y1="20" x2="92" y2="115" stroke="#dc2626" strokeWidth="2.2" />
          <rect x="92" y="105" width="10" height="10" fill="#fecaca" stroke="#dc2626" strokeWidth="1.4" />
          <text x="87" y="15" {...ptStyle}>C</text>
          <text x="30" y="120" {...ptStyle}>A</text>
          <text x="202" y="120" {...ptStyle}>B</text>
          <text x="86" y="132" {...ptStyle} fill="#dc2626">H</text>
        </svg>
      );

    case 'mediatrice':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <line x1="45" y1="85" x2="195" y2="85" stroke="#334155" strokeWidth="2" />
          <line x1="120" y1="15" x2="120" y2="128" stroke="#d97706" strokeWidth="2.2" />
          <rect x="120" y="75" width="10" height="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.4" />
          <line x1="80" y1="80" x2="80" y2="90" stroke="#059669" strokeWidth="1.8" />
          <line x1="84" y1="80" x2="84" y2="90" stroke="#059669" strokeWidth="1.8" />
          <line x1="156" y1="80" x2="156" y2="90" stroke="#059669" strokeWidth="1.8" />
          <line x1="160" y1="80" x2="160" y2="90" stroke="#059669" strokeWidth="1.8" />
          <line x1="45" y1="85" x2="120" y2="32" stroke="#64748b" strokeWidth="1.3" strokeDasharray="4,3" />
          <line x1="195" y1="85" x2="120" y2="32" stroke="#64748b" strokeWidth="1.3" strokeDasharray="4,3" />
          <text x="30" y="90" {...ptStyle}>A</text>
          <text x="202" y="90" {...ptStyle}>B</text>
          <text x="106" y="102" {...ptStyle}>O</text>
          <text x="128" y="34" {...ptStyle}>M</text>
          <text x="128" y="122" {...ptStyle} fill="#b45309">(d)</text>
        </svg>
      );

    case 'bissectrice':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <line x1="45" y1="105" x2="185" y2="25" stroke="#334155" strokeWidth="2" />
          <line x1="45" y1="105" x2="195" y2="110" stroke="#334155" strokeWidth="2" />
          <line x1="45" y1="105" x2="192" y2="68" stroke="#0284c7" strokeWidth="2.2" />
          <path d="M 45,105 L 84,82.7 A 45,45 0 0,1 89,94 Z" fill="#38bdf8" fillOpacity="0.45" stroke="#0284c7" />
          <path d="M 45,105 L 89,94 A 45,45 0 0,1 90,106.5 Z" fill="#38bdf8" fillOpacity="0.45" stroke="#0284c7" />
          <text x="28" y="110" {...ptStyle}>O</text>
          <text x="190" y="26" {...ptStyle}>x</text>
          <text x="200" y="114" {...ptStyle}>y</text>
          <text x="196" y="70" {...ptStyle} fill="#0284c7">B</text>
        </svg>
      );

    case 'losange':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <polygon points="120,20 195,70 120,120 45,70" fill="#f5d0fe" fillOpacity="0.4" stroke="#7e22ce" strokeWidth="2" />
          <line x1="120" y1="20" x2="120" y2="120" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
          <line x1="45" y1="70" x2="195" y2="70" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3" />
          <rect x="120" y="60" width="10" height="10" fill="#fde68a" stroke="#b45309" strokeWidth="1.3" />
          <text x="115" y="15" {...ptStyle}>C</text>
          <text x="202" y="74" {...ptStyle}>B</text>
          <text x="115" y="135" {...ptStyle}>A</text>
          <text x="28" y="74" {...ptStyle}>D</text>
        </svg>
      );

    case 'rectangle':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <rect x="52" y="28" width="136" height="84" fill="#e0f2fe" fillOpacity="0.45" stroke="#0284c7" strokeWidth="2" />
          <line x1="52" y1="28" x2="188" y2="112" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4,3" />
          <line x1="52" y1="112" x2="188" y2="28" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4,3" />
          <rect x="52" y="102" width="10" height="10" fill="none" stroke="#0f172a" strokeWidth="1.3" />
          <rect x="178" y="102" width="10" height="10" fill="none" stroke="#0f172a" strokeWidth="1.3" />
          <rect x="178" y="28" width="10" height="10" fill="none" stroke="#0f172a" strokeWidth="1.3" />
          <rect x="52" y="28" width="10" height="10" fill="none" stroke="#0f172a" strokeWidth="1.3" />
          <text x="36" y="118" {...ptStyle}>A</text>
          <text x="194" y="118" {...ptStyle}>B</text>
          <text x="194" y="28" {...ptStyle}>C</text>
          <text x="36" y="28" {...ptStyle}>D</text>
        </svg>
      );

    case 'carre':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <rect x="74" y="24" width="92" height="92" fill="#dcfce7" fillOpacity="0.45" stroke="#059669" strokeWidth="2" />
          <line x1="74" y1="24" x2="166" y2="116" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4,3" />
          <line x1="74" y1="116" x2="166" y2="24" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4,3" />
          <rect x="74" y="106" width="9" height="10" fill="none" stroke="#0f172a" strokeWidth="1.3" />
          <polygon points="120,70 126,64 120,58 114,64" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
          <text x="58" y="120" {...ptStyle}>A</text>
          <text x="172" y="120" {...ptStyle}>B</text>
          <text x="172" y="26" {...ptStyle}>C</text>
          <text x="58" y="26" {...ptStyle}>D</text>
        </svg>
      );

    case 'parallelepipede':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <rect x="82" y="22" width="110" height="64" fill="#e0e7ff" fillOpacity="0.4" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,3" />
          <line x1="48" y1="52" x2="82" y2="22" stroke="#4f46e5" strokeWidth="1.8" />
          <line x1="158" y1="52" x2="192" y2="22" stroke="#4f46e5" strokeWidth="1.8" />
          <line x1="48" y1="116" x2="82" y2="86" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,3" />
          <line x1="158" y1="116" x2="192" y2="86" stroke="#4f46e5" strokeWidth="1.8" />
          <rect x="48" y="52" width="110" height="64" fill="#eef2ff" fillOpacity="0.65" stroke="#4338ca" strokeWidth="2" />
          <text x="95" y="132" fontSize="11" fill="#4338ca" fontWeight="bold">الطول L · العرض l · الارتفاع h</text>
        </svg>
      );

    case 'parallelogramme':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <polygon points="48,110 158,110 192,34 82,34" fill="#ecfdf5" fillOpacity="0.6" stroke="#059669" strokeWidth="2" />
          <line x1="48" y1="110" x2="192" y2="34" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4,3" />
          <line x1="82" y1="34" x2="158" y2="110" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4,3" />
          <circle cx="120" cy="72" r="3.5" fill="#dc2626" />
          <text x="34" y="116" {...ptStyle}>A</text>
          <text x="164" y="116" {...ptStyle}>B</text>
          <text x="198" y="36" {...ptStyle}>C</text>
          <text x="66" y="36" {...ptStyle}>D</text>
          <text x="116" y="62" {...ptStyle} fill="#dc2626">O</text>
        </svg>
      );

    case 'hypotenuse':
    case 'cercle-circonscrit':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          {conceptId === 'cercle-circonscrit' && (
            <circle cx="125" cy="68" r="54" fill="none" stroke="#6366f1" strokeWidth="1.6" strokeDasharray="4,3" />
          )}
          <polygon points="75,105 75,31 175,105" fill="#fef3c7" fillOpacity="0.55" stroke="#d97706" strokeWidth="2" />
          <rect x="75" y="95" width="10" height="10" fill="#fde68a" stroke="#b45309" strokeWidth="1.4" />
          <line x1="75" y1="31" x2="175" y2="105" stroke="#dc2626" strokeWidth="2.6" />
          <circle cx="125" cy="68" r="3.5" fill="#2563eb" />
          <text x="58" y="112" {...ptStyle}>A</text>
          <text x="58" y="32" {...ptStyle}>C</text>
          <text x="182" y="112" {...ptStyle}>B</text>
          <text x="132" y="62" fontSize="11" fill="#dc2626" fontWeight="bold">الوتر [BC]</text>
        </svg>
      );

    case 'angles-alternes-correspondants':
    case 'angles-opposes-sommet':
    case 'angles-complementaires':
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <line x1="35" y1="45" x2="205" y2="45" stroke="#0284c7" strokeWidth="2" />
          <line x1="35" y1="95" x2="205" y2="95" stroke="#0284c7" strokeWidth="2" />
          <line x1="75" y1="120" x2="165" y2="20" stroke="#334155" strokeWidth="2" />
          <circle cx="142.5" cy="45" r="9" fill="#f59e0b" fillOpacity="0.6" />
          <circle cx="97.5" cy="95" r="9" fill="#f59e0b" fillOpacity="0.6" />
          <text x="208" y="48" {...ptStyle}>(d₁)</text>
          <text x="208" y="98" {...ptStyle}>(d₂)</text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 240 140" className="w-full max-w-[230px] h-auto">
          <polygon points="120,22 62,114 178,114" fill="#ede9fe" fillOpacity="0.55" stroke="#6d28d9" strokeWidth="2" />
          <text x="115" y="17" {...ptStyle}>C</text>
          <text x="46" y="118" {...ptStyle}>A</text>
          <text x="184" y="118" {...ptStyle}>B</text>
        </svg>
      );
  }
};

export const ConceptModalProvider: React.FC<ConceptModalProviderProps> = ({
  children,
  onOpenTreatiseProperty,
}) => {
  const [activeConceptId, setActiveConceptId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openConceptById = (conceptId: string) => {
    setActiveConceptId(conceptId);
    setIsOpen(true);
  };

  const openGlossary = () => {
    if (!activeConceptId) {
      setActiveConceptId(FUNDAMENTAL_CONCEPTS[0].id);
    }
    setIsOpen(true);
  };

  const activeConcept: FundamentalConcept =
    FUNDAMENTAL_CONCEPTS.find((c) => c.id === activeConceptId) || FUNDAMENTAL_CONCEPTS[0];

  // Only show related concepts from the SAME domain/category in the modal's switcher bar
  const sameCategoryConcepts = FUNDAMENTAL_CONCEPTS.filter(
    (c) => c.category === activeConcept.category
  );

  return (
    <ConceptModalContext.Provider value={{ openConceptById, openGlossary }}>
      {children}

      {isOpen && activeConcept && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          dir="rtl"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-l from-indigo-950 via-purple-950 to-slate-900 text-white flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>تذكير بالمفهوم والقاعدة الأساسية · {activeConcept.categoryLabelAr}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 text-[11px] font-bold">
                    {activeConcept.levelOrigin}
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-white flex flex-wrap items-center gap-2.5">
                  <span>{activeConcept.termAr}</span>
                  <span className="text-sm font-medium text-indigo-200" dir="ltr">
                    ({activeConcept.termFr})
                  </span>
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Related Concepts Switcher within the SAME Category only */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 overflow-x-auto">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500 ml-1">
                  مفاهيم مرتبطة في نفس الباب ({activeConcept.categoryLabelAr}):
                </span>
                {sameCategoryConcepts.map((item) => {
                  const isCurrent = item.id === activeConcept.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveConceptId(item.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-purple-700 text-white shadow-2xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:text-purple-800'
                      }`}
                    >
                      {item.termAr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Main Body */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Row 1: Visual Diagram + Official Definition */}
              <div className="grid sm:grid-cols-12 gap-5 items-center">
                <div className="sm:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center">
                  <ConceptVisualDiagram conceptId={activeConcept.id} />
                  {activeConcept.formulaLatex && (
                    <div
                      className="mt-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-center w-full overflow-x-auto"
                      dir="ltr"
                    >
                      <MathView math={activeConcept.formulaLatex} />
                    </div>
                  )}
                </div>

                <div className="sm:col-span-7 space-y-3">
                  {/* 1. Definition */}
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                    <div className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>1. التعريف الرياضي والقاعدة الأساسية :</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                      {activeConcept.definitionAr}
                    </p>
                    <p
                      dir="ltr"
                      className="text-xs text-slate-600 pt-1.5 border-t border-indigo-200/60 text-left"
                    >
                      {activeConcept.definitionFr}
                    </p>
                  </div>

                  {/* 3. How to apply / prove in exercises */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <div className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      <span>كيف نوظفه أو نطبقه في التمارين؟</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                      {activeConcept.howToProveAr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 2: Key Properties Deduced */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>2. أهم القواعد والخواص الواجب تذكرها عن «{activeConcept.termAr}» :</span>
                </div>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {activeConcept.keyPropertiesAr.map((propText, idx) => (
                    <li
                      key={idx}
                      className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-800 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{propText}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 3: Common Confusion / Trap to Avoid */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300/80 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-black text-amber-900">
                    انتبه — خطأ شائع يجب تجنبه :
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                    {activeConcept.commonConfusionAr}
                  </p>
                </div>
              </div>

              {/* Row 4: Related Treatise Properties (1..69) */}
              {activeConcept.relatedTreatiseIds &&
                activeConcept.relatedTreatiseIds.length > 0 &&
                onOpenTreatiseProperty && (
                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-purple-700" />
                      <span>الخواص المرتبطة بهذا المفهوم في مرجع البرهان (69 خاصية) :</span>
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {activeConcept.relatedTreatiseIds.map((propId) => (
                        <button
                          key={propId}
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenTreatiseProperty(propId);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>خاصية {propId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </ConceptModalContext.Provider>
  );
};
