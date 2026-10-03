import React, { useState } from 'react';
import {
  Zap,
  BatteryCharging,
  Sun,
  AlertTriangle,
  Power,
  ArrowLeft,
  CheckCircle2,
  Flame,
  Fan,
  Lightbulb,
  Droplets,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

type EnergySystemId = 'lamp' | 'fan' | 'hydro';
type ChainDisplayMode = 'functional' | 'energy' | 'both';

interface ChainStepNode {
  id: string;
  actorAr: string;
  actorFr: string;
  functionalRoleAr: string;
  functionalRoleFr: string;
  storageSymbol: string;
  storageNameAr: string;
  storageNameFr: string;
  transferToNextSymbol?: string;
  transferToNextAr?: string;
  transferToNextFr?: string;
  isEnvironment?: boolean;
}

interface EnergySystemSpec {
  id: EnergySystemId;
  titleAr: string;
  titleFr: string;
  globalFunctionAr: string;
  globalFunctionFr: string;
  usefulOutputAr: string;
  usefulOutputSymbol: string;
  usefulPercent: number;
  dissipatedPercent: number;
  dissipatedAr: string;
  nodes: ChainStepNode[];
}

const ENERGY_SYSTEMS_DATA: Record<EnergySystemId, EnergySystemSpec> = {
  lamp: {
    id: 'lamp',
    titleAr: 'مصباح الجيب (بطارية + قاطع + مصباح)',
    titleFr: 'Lampe de poche (Pile + Interrupteur + Lampe)',
    globalFunctionAr: 'إضاءة المكان (Produire de la lumière)',
    globalFunctionFr: 'Éclairer le lieu / Produire de la lumière',
    usefulOutputAr: 'تحويل إشعاعي ضوئي مفيد (Er)',
    usefulOutputSymbol: 'Er',
    usefulPercent: 35,
    dissipatedPercent: 65,
    dissipatedAr: 'تحويل حراري غير مفيد (Q) يسخن الوسط الخارجي',
    nodes: [
      {
        id: 'pile',
        actorAr: 'البطارية (العمود)',
        actorFr: 'La pile',
        functionalRoleAr: 'تتفرغ / توفير الطاقة الكهربائية',
        functionalRoleFr: 'Se décharge / Fournir l’énergie',
        storageSymbol: 'Ei',
        storageNameAr: 'طاقة كيميائية (داخلية)',
        storageNameFr: 'Énergie interne (chimique)',
        transferToNextSymbol: 'We',
        transferToNextAr: 'تحويل كهربائي (تغذي عبر القاطع والأسلاك)',
        transferToNextFr: 'Transfert électrique (We)',
      },
      {
        id: 'lampe',
        actorAr: 'المصباح الكهربائي',
        actorFr: 'La lampe',
        functionalRoleAr: 'يتوهج / تحويل الطاقة إلى ضوء وحرارة',
        functionalRoleFr: 'Brille / Convertir en lumière et chaleur',
        storageSymbol: 'Ei',
        storageNameAr: 'طاقة داخلية (سلك متوهج)',
        storageNameFr: 'Énergie interne',
        transferToNextSymbol: 'Er + Q',
        transferToNextAr: 'إشعاعي مفيد (Er) + حراري ضائع (Q)',
        transferToNextFr: 'Rayonnement utile (Er) + Thermique (Q)',
      },
      {
        id: 'milieu',
        actorAr: 'الوسط الخارجي',
        actorFr: 'Milieu extérieur',
        functionalRoleAr: 'يُضاء ويسخن',
        functionalRoleFr: 'S’éclaire et s’échauffe',
        storageSymbol: 'Ei',
        storageNameAr: 'طاقة داخلية (تزداد)',
        storageNameFr: 'Énergie interne (augmente)',
        isEnvironment: true,
      },
    ],
  },
  fan: {
    id: 'fan',
    titleAr: 'المروحة الكهربائية (بطارية + محرك + شفرات)',
    titleFr: 'Ventilateur électrique (Pile + Moteur + Hélice)',
    globalFunctionAr: 'تحريك الهواء وتهوية المكان (Déplacer de l’air)',
    globalFunctionFr: 'Mettre l’air en mouvement',
    usefulOutputAr: 'تحويل ميكانيكي مفيد لتحريك الهواء (W)',
    usefulOutputSymbol: 'W',
    usefulPercent: 75,
    dissipatedPercent: 25,
    dissipatedAr: 'تحويل حراري غير مفيد (Q) نتيجة احتكاك وسخونة المحرك',
    nodes: [
      {
        id: 'source',
        actorAr: 'البطارية / المصدر',
        actorFr: 'Source / Pile',
        functionalRoleAr: 'توفير الطاقة الكهربائية',
        functionalRoleFr: 'Fournir l’énergie électrique',
        storageSymbol: 'Ei',
        storageNameAr: 'طاقة داخلية (كيميائية)',
        storageNameFr: 'Énergie interne (Ei)',
        transferToNextSymbol: 'We',
        transferToNextAr: 'تحويل كهربائي (يغذي المحرك)',
        transferToNextFr: 'Transfert électrique (We)',
      },
      {
        id: 'moteur',
        actorAr: 'المحرك الكهربائي',
        actorFr: 'Moteur électrique',
        functionalRoleAr: 'يدور / إنتاج حركة دوران',
        functionalRoleFr: 'Tourne / Produire un mouvement',
        storageSymbol: 'Ec',
        storageNameAr: 'طاقة حركية (دوران)',
        storageNameFr: 'Énergie cinétique (Ec)',
        transferToNextSymbol: 'W',
        transferToNextAr: 'تحويل ميكانيكي (يدير الشفرات)',
        transferToNextFr: 'Transfert mécanique (W)',
      },
      {
        id: 'helice',
        actorAr: 'المروحة (الشفرات)',
        actorFr: 'L’hélice',
        functionalRoleAr: 'تدور / تحريك الهواء ودفعه',
        functionalRoleFr: 'Tourne / Pousser l’air',
        storageSymbol: 'Ec',
        storageNameAr: 'طاقة حركية',
        storageNameFr: 'Énergie cinétique (Ec)',
        transferToNextSymbol: 'W + Q',
        transferToNextAr: 'ميكانيكي مفيد (W) + حراري (Q)',
        transferToNextFr: 'Mécanique utile (W) + Thermique (Q)',
      },
      {
        id: 'air',
        actorAr: 'الهواء / الوسط الخارجي',
        actorFr: 'Air / Milieu extérieur',
        functionalRoleAr: 'يتحرك ويسخن قليلًا',
        functionalRoleFr: 'Se déplace et s’échauffe',
        storageSymbol: 'Ec + Ei',
        storageNameAr: 'طاقة حركية + داخلية',
        storageNameFr: 'Cinétique + Interne',
        isEnvironment: true,
      },
    ],
  },
  hydro: {
    id: 'hydro',
    titleAr: 'إضاءة مصباح بتدفق الماء (عنفة + منوب)',
    titleFr: 'Chute d’eau + Turbine + Alternateur + Lampe',
    globalFunctionAr: 'توليد الكهرباء وإضاءة المصباح بتدفق الماء',
    globalFunctionFr: 'Produire de la lumière grâce à une chute d’eau',
    usefulOutputAr: 'تحويل كهربائي (We) ثم إشعاعي ضوئي مفيد (Er)',
    usefulOutputSymbol: 'Er',
    usefulPercent: 60,
    dissipatedPercent: 40,
    dissipatedAr: 'تحويل حراري ضائع (Q) في المحاور والأسلاك والمصباح',
    nodes: [
      {
        id: 'eau',
        actorAr: 'الماء المتدفق',
        actorFr: 'Chute d’eau',
        functionalRoleAr: 'يسقط ويتدفق / يدير العنفة',
        functionalRoleFr: 'Tombe et entraîne la turbine',
        storageSymbol: 'Epp + Ec',
        storageNameAr: 'طاقة كامنة ثقالية + حركية',
        storageNameFr: 'Potentielle (Epp) + Cinétique (Ec)',
        transferToNextSymbol: 'W',
        transferToNextAr: 'تحويل ميكانيكي (يدير ريش العنفة)',
        transferToNextFr: 'Transfert mécanique (W)',
      },
      {
        id: 'turbine',
        actorAr: 'العنفة (Turbine)',
        actorFr: 'Turbine',
        functionalRoleAr: 'تدور / تدير المنوب',
        functionalRoleFr: 'Tourne / Entraîne l’alternateur',
        storageSymbol: 'Ec',
        storageNameAr: 'طاقة حركية',
        storageNameFr: 'Énergie cinétique (Ec)',
        transferToNextSymbol: 'W',
        transferToNextAr: 'تحويل ميكانيكي',
        transferToNextFr: 'Transfert mécanique (W)',
      },
      {
        id: 'alternateur',
        actorAr: 'المنوب (الدينامو)',
        actorFr: 'Alternateur / Dynamo',
        functionalRoleAr: 'يدور / يولد تيارًا يغذي المصباح',
        functionalRoleFr: 'Convertit le mouvement en électricité',
        storageSymbol: 'Ec',
        storageNameAr: 'طاقة حركية',
        storageNameFr: 'Énergie cinétique (Ec)',
        transferToNextSymbol: 'We',
        transferToNextAr: 'تحويل كهربائي',
        transferToNextFr: 'Transfert électrique (We)',
      },
      {
        id: 'lampe-hydro',
        actorAr: 'المصباح + الوسط الخارجي',
        actorFr: 'Lampe + Milieu extérieur',
        functionalRoleAr: 'يتوهج ويضيء المحيط',
        functionalRoleFr: 'Brille et éclaire le milieu',
        storageSymbol: 'Ei',
        storageNameAr: 'طاقة داخلية (ضوء Er + حرارة Q)',
        storageNameFr: 'Énergie interne (Er + Q)',
        isEnvironment: true,
      },
    ],
  },
};

/**
 * 1. MINI-SIMULATEUR INTERACTIF SPÉCIFIQUE AU DOMAINE 02 (ÉNERGIE)
 * Permet d'explorer la Chaîne Fonctionnelle (Cours 07) et la Chaîne Énergétique (Cours 08)
 * sur 3 appareils réels avec interrupteur Marche/Arrêt et bilan Énergie utile vs thermique (Q).
 */
export const EnergyInteractiveChainSimulator: React.FC<{
  defaultMode?: ChainDisplayMode;
  defaultSystem?: EnergySystemId;
}> = ({ defaultMode = 'both', defaultSystem = 'lamp' }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedSystem, setSelectedSystem] = useState<EnergySystemId>(defaultSystem);
  const [displayMode, setDisplayMode] = useState<ChainDisplayMode>(defaultMode);
  const [isCircuitActive, setIsCircuitActive] = useState<boolean>(true);

  const system = ENERGY_SYSTEMS_DATA[selectedSystem];

  return (
    <div
      className="my-4 rounded-[16px] border-2 border-[#F472B6]/65 bg-[#FDF2F8] overflow-hidden shadow-2xs"
      dir="rtl"
    >
      {/* Barre-tiroir cliquable (Fermée par défaut) */}
      <button
        type="button"
        onClick={() => setIsDrawerOpen((prev) => !prev)}
        aria-expanded={isDrawerOpen}
        className="w-full text-right bg-gradient-to-l from-[#FCE7F3] via-[#FDF2F8] to-[#F0F9FF] hover:from-[#FBCFE8] hover:via-[#FCE7F3] hover:to-[#E0F2FE] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors cursor-pointer"
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#C94BA6]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] bg-[#C94BA6] text-white">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>مختبر الطاقة التفاعلي · Simulation 3AM</span>
            </span>
            <span>الميدان 02 (الطاقة — Énergie)</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#831843]">
            محاكي السلسلة الوظيفية والسلسلة الطاقوية والتحويلات الطاقوية
          </h3>
          <p className="text-xs text-[#4A4A4A]" dir="ltr">
            Simulateur interactif : Système technique ⟶ Chaîne fonctionnelle (Cours 07) ↔ Chaîne énergétique (Cours 08)
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-center">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border text-xs sm:text-sm font-bold transition-all ${
              isDrawerOpen
                ? 'bg-white text-[#C94BA6] border-[#C94BA6]'
                : 'bg-[#C94BA6] text-white border-[#C94BA6]'
            }`}
          >
            <span>
              {isDrawerOpen
                ? 'إغلاق المحاكاة التفاعلية (Fermer)'
                : 'فتح المحاكاة التفاعلية (Ouvrir)'}
            </span>
            {isDrawerOpen ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </span>
        </div>
      </button>

      {isDrawerOpen && (
        <div className="p-4 sm:p-6 border-t border-[#F9A8D4] bg-[#FDF2F8]/80 space-y-5">
          {/* Bouton Interrupteur Marche / Arrêt */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#FDE68A]">
            <span className="text-xs sm:text-sm font-bold text-[#92400E]">
              حالة تشغيل الجملة التكنولوجية :
            </span>
            <button
              type="button"
              onClick={() => setIsCircuitActive(!isCircuitActive)}
              className={`px-4 py-2 rounded-[10px] text-xs font-bold border-2 flex items-center gap-2 transition-all cursor-pointer ${
                isCircuitActive
                  ? 'bg-[#EA580C] border-[#C2410C] text-white shadow-xs'
                  : 'bg-white border-[#CBD5E1] text-[#475569] hover:border-[#D97706]'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>
                {isCircuitActive
                  ? 'النظام في حالة اشتغال (القاطع مغلق ON)'
                  : 'النظام متوقف (القاطع مفتوح OFF — اضغط للتشغيل)'}
              </span>
            </button>
          </div>

          {/* Contrôles : 1. Choix de l'appareil | 2. Choix du mode de chaîne */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Sélecteur d'appareil */}
        <div className="bg-white rounded-[12px] p-3 border border-[#FDE68A] space-y-2">
          <div className="text-xs font-bold text-[#92400E]">
            1. اختر النظام التقني المراد تحليله (Système technique) :
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedSystem('lamp')}
              className={`px-3 py-2 rounded-[10px] text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedSystem === 'lamp'
                  ? 'bg-[#D97706] text-white border-[#B45309]'
                  : 'bg-[#FFFBEB] text-[#78350F] border-[#FDE68A] hover:border-[#D97706]'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
              <span>مصباح الجيب</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSystem('fan')}
              className={`px-3 py-2 rounded-[10px] text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedSystem === 'fan'
                  ? 'bg-[#D97706] text-white border-[#B45309]'
                  : 'bg-[#FFFBEB] text-[#78350F] border-[#FDE68A] hover:border-[#D97706]'
              }`}
            >
              <Fan className="w-3.5 h-3.5 shrink-0" />
              <span>المروحة الكهربائية</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSystem('hydro')}
              className={`px-3 py-2 rounded-[10px] text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedSystem === 'hydro'
                  ? 'bg-[#D97706] text-white border-[#B45309]'
                  : 'bg-[#FFFBEB] text-[#78350F] border-[#FDE68A] hover:border-[#D97706]'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 shrink-0" />
              <span>تدفق الماء + منوب</span>
            </button>
          </div>
        </div>

        {/* Sélecteur de représentation */}
        <div className="bg-white rounded-[12px] p-3 border border-[#FDE68A] space-y-2">
          <div className="text-xs font-bold text-[#92400E]">
            2. اختر نوع التمثيل التخطيطي (Mode de représentation) :
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDisplayMode('functional')}
              className={`px-3 py-2 rounded-[10px] text-xs font-bold border transition-all cursor-pointer ${
                displayMode === 'functional'
                  ? 'bg-[#0F766E] text-white border-[#0F766E]'
                  : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0] hover:border-[#0F766E]'
              }`}
            >
              السلسلة الوظيفية (الدرس 07)
            </button>

            <button
              type="button"
              onClick={() => setDisplayMode('energy')}
              className={`px-3 py-2 rounded-[10px] text-xs font-bold border transition-all cursor-pointer ${
                displayMode === 'energy'
                  ? 'bg-[#EA580C] text-white border-[#EA580C]'
                  : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0] hover:border-[#EA580C]'
              }`}
            >
              السلسلة الطاقوية (الدرس 08)
            </button>

            <button
              type="button"
              onClick={() => setDisplayMode('both')}
              className={`px-3 py-2 rounded-[10px] text-xs font-bold border transition-all cursor-pointer ${
                displayMode === 'both'
                  ? 'bg-[#B45309] text-white border-[#B45309]'
                  : 'bg-[#FAF7F4] text-[#4A4A4A] border-[#E2D9D0] hover:border-[#B45309]'
              }`}
            >
              مقارنة مزدوجة (07 ↔ 08)
            </button>
          </div>
        </div>
      </div>

      {/* Bandeau de Fonction Globale */}
      <div className="bg-white rounded-[12px] p-3.5 border border-[#FCD34D] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[8px] bg-[#FEF3C7] text-[#B45309] text-xs font-bold">
            الوظيفة العامة للنظام (Fonction globale)
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
            {system.globalFunctionAr}
          </span>
        </div>
        <span className="text-xs font-mono font-semibold text-[#B45309]" dir="ltr">
          {system.titleFr}
        </span>
      </div>

      {/* Rendu visuel des bulles et flèches de la chaîne */}
      <div className="bg-white rounded-[14px] p-4 sm:p-5 border border-[#E2D9D0] space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {system.nodes.map((node, index) => {
            const isLast = index === system.nodes.length - 1;
            return (
              <React.Fragment key={node.id}>
                {/* Bulle de l'élément / système */}
                <div className="flex flex-col items-center space-y-2 min-w-[145px] max-w-[200px]">
                  <div
                    className={`w-full px-4 py-2.5 rounded-[999px] border-2 text-center transition-all ${
                      !isCircuitActive
                        ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#64748B]'
                        : node.isEnvironment
                        ? 'bg-[#F0FDFA] border-[#0F766E] text-[#0F766E]'
                        : 'bg-[#FFFBEB] border-[#D97706] text-[#92400E] shadow-2xs'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">{node.actorAr}</div>
                    <div className="text-[10px] font-mono opacity-80" dir="ltr">
                      {node.actorFr}
                    </div>
                  </div>

                  {/* Sous la bulle : Rôle fonctionnel (Cours 07) et/ou Mode de stockage (Cours 08) */}
                  {(displayMode === 'functional' || displayMode === 'both') && (
                    <div className="w-full px-2.5 py-1.5 rounded-[8px] bg-[#F0FDFA] border border-[#99F6E4] text-center">
                      <div className="text-[10px] font-bold text-[#0F766E]">
                        الوظيفة (ماذا يفعل؟) :
                      </div>
                      <div className="text-[11px] font-semibold text-[#115E59]">
                        {isCircuitActive ? node.functionalRoleAr : 'متوقف (الدارة مفتوحة)'}
                      </div>
                    </div>
                  )}

                  {(displayMode === 'energy' || displayMode === 'both') && (
                    <div className="w-full px-2.5 py-1.5 rounded-[8px] bg-[#FFF7ED] border border-[#FDBA74] text-center">
                      <div className="text-[10px] font-bold text-[#C2410C]">
                        نمط التخزين (تحت الفقاعة) :
                      </div>
                      <div
                        className="text-xs font-mono font-bold text-[#EA580C]"
                        dir="ltr"
                      >
                        {node.storageSymbol}
                      </div>
                      <div className="text-[10px] text-[#9A3412]">{node.storageNameAr}</div>
                    </div>
                  )}
                </div>

                {/* Flèche de transition entre deux bulles */}
                {!isLast && (
                  <div className="flex flex-col items-center justify-center px-1 min-w-[110px]">
                    {(displayMode === 'energy' || displayMode === 'both') && (
                      <div
                        className={`px-2.5 py-1 rounded-[8px] border text-center mb-1 ${
                          isCircuitActive
                            ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#B45309]'
                            : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#64748B]'
                        }`}
                      >
                        <div className="text-xs font-mono font-bold" dir="ltr">
                          {isCircuitActive ? node.transferToNextSymbol : '0 (مفتوح)'}
                        </div>
                        <div className="text-[10px] font-semibold">
                          {node.transferToNextAr}
                        </div>
                      </div>
                    )}

                    <div
                      className={`flex items-center gap-1 font-bold text-lg ${
                        isCircuitActive ? 'text-[#EA580C]' : 'text-[#94A3B8]'
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </div>

                    {displayMode === 'functional' && (
                      <div className="text-[11px] font-semibold text-[#0F766E] text-center mt-0.5">
                        {isCircuitActive ? node.transferToNextAr : 'لا يمر تيار'}
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Jauge visuelle du Bilan Énergétique (Énergie Utile vs Énergie Dissipée Q) */}
        <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-[#92400E]">
              الحصيلة الطاقوية (Bilan énergétique : Énergie utile vs Énergie dissipée Q) :
            </span>
            <span className="font-mono font-bold text-[#D97706]" dir="ltr">
              E_reçue = E_utile ({system.usefulOutputSymbol}) + Q_thermique
            </span>
          </div>

          <div className="w-full h-7 rounded-[10px] overflow-hidden bg-[#F1F5F9] border border-[#CBD5E1] flex">
            {isCircuitActive ? (
              <>
                <div
                  style={{ width: `${system.usefulPercent}%` }}
                  className="h-full bg-[#10B981] text-white text-[11px] font-bold flex items-center justify-center px-2 whitespace-nowrap transition-all duration-300"
                >
                  طاقة مفيدة ({system.usefulOutputSymbol}) : {system.usefulPercent}%
                </div>
                <div
                  style={{ width: `${system.dissipatedPercent}%` }}
                  className="h-full bg-[#EA580C] text-white text-[11px] font-bold flex items-center justify-center px-2 whitespace-nowrap transition-all duration-300"
                >
                  حرارة ضائعة في الوسط (Q) : {system.dissipatedPercent}%
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-[#64748B]">
                الدارة مفتوحة (OFF) : لا يوجد تحويل طاقوي حالياً — اضغط على زر التشغيل أعلاه
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div className="flex items-center gap-2 text-[#065F46] bg-[#ECFDF5] px-3 py-1.5 rounded-[8px] border border-[#A7F3D0]">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#059669]" />
              <span>
                <strong>التحويل المفيد :</strong> {system.usefulOutputAr}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#9A3412] bg-[#FFF7ED] px-3 py-1.5 rounded-[8px] border border-[#FDBA74]">
              <Flame className="w-4 h-4 shrink-0 text-[#EA580C]" />
              <span>
                <strong>التحويل غير المفيد (الضائع) :</strong> {system.dissipatedAr}
              </span>
            </div>
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};

/**
 * 2. SCHÉMA DE CIRCUIT ÉLECTRIQUE & CONVERTISSEUR ÉNERGÉTIQUE (Spécifique Domaine 02)
 */
export const EnergyCircuitAndConverterBlock: React.FC = () => {
  return (
    <div
      className="my-4 rounded-[16px] border border-[#FCD34D] bg-[#FFFBEB]/70 p-4 sm:p-5 space-y-4"
      dir="rtl"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FDE68A] pb-2.5">
        <div className="flex items-center gap-2">
          <BatteryCharging className="w-4 h-4 text-[#D97706]" />
          <h4 className="text-sm sm:text-base font-bold text-[#92400E]">
            من الدارة الكهربائية إلى محول الطاقة (Schéma de circuit & Convertisseur d’énergie)
          </h4>
        </div>
        <span className="text-xs font-mono font-bold text-[#B45309]" dir="ltr">
          Pile (Générateur) ⟶ Fil & Interrupteur ⟶ Lampe / Moteur
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        {/* SVG du circuit électrique normalisé */}
        <div className="bg-white rounded-[12px] p-3 border border-[#FDE68A]">
          <div className="text-xs font-bold text-[#78350F] text-center mb-2">
            1. المخطط النظامي للدارة الكهربائية (البطارية تغذي المصباح)
          </div>
          <svg
            viewBox="0 0 420 190"
            className="w-full h-auto max-h-[190px] mx-auto"
            style={{ direction: 'ltr' }}
            role="img"
            aria-label="Schéma électrique d'une pile reliée à un interrupteur et une lampe avec flux d'énergie électrique We"
          >
            {/* Rectangle du circuit */}
            <line x1="70" y1="45" x2="165" y2="45" stroke="#334155" strokeWidth="3" />
            {/* Interrupteur K fermé */}
            <circle cx="170" cy="45" r="4" fill="#EA580C" />
            <line x1="170" y1="45" x2="230" y2="38" stroke="#EA580C" strokeWidth="3.5" />
            <circle cx="235" cy="45" r="4" fill="#EA580C" />
            <text x="202" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9A3412">
              قاطع K (تحكم)
            </text>

            <line x1="240" y1="45" x2="350" y2="45" stroke="#334155" strokeWidth="3" />
            <line x1="350" y1="45" x2="350" y2="145" stroke="#334155" strokeWidth="3" />
            <line x1="70" y1="145" x2="350" y2="145" stroke="#334155" strokeWidth="3" />
            <line x1="70" y1="45" x2="70" y2="78" stroke="#334155" strokeWidth="3" />
            <line x1="70" y1="112" x2="70" y2="145" stroke="#334155" strokeWidth="3" />

            {/* Symbole de la Pile / Générateur à gauche */}
            <line x1="52" y1="82" x2="88" y2="82" stroke="#EA580C" strokeWidth="4" />
            <line x1="60" y1="106" x2="80" y2="106" stroke="#1E293B" strokeWidth="6" />
            <text x="38" y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#EA580C">
              +
            </text>
            <text x="38" y="110" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1E293B">
              -
            </text>
            <text x="118" y="98" textAnchor="start" fontSize="11" fontWeight="bold" fill="#C2410C">
              بطارية (Ei)
            </text>

            {/* Symbole de la Lampe à droite */}
            <circle cx="350" cy="95" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
            <line x1="335" y1="80" x2="365" y2="110" stroke="#D97706" strokeWidth="2.5" />
            <line x1="365" y1="80" x2="335" y2="110" stroke="#D97706" strokeWidth="2.5" />
            <text x="292" y="98" textAnchor="end" fontSize="11" fontWeight="bold" fill="#B45309">
              مصباح
            </text>

            {/* Rayons lumineux Er et chaleur Q sortant de la lampe */}
            <line x1="378" y1="75" x2="402" y2="62" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="382" y1="95" x2="408" y2="95" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="378" y1="115" x2="402" y2="128" stroke="#DC2626" strokeWidth="2.5" />
            <text x="395" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309">
              Er (ضوء)
            </text>
            <text x="395" y="144" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DC2626">
              Q (حرارة)
            </text>

            {/* Flèche de transfert électrique We */}
            <rect x="155" y="128" width="110" height="24" rx="6" fill="#E0F2FE" stroke="#0284C7" />
            <text x="210" y="144" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369A1">
              تحويل كهربائي We
            </text>
          </svg>
        </div>

        {/* Explication du bilan du convertisseur */}
        <div className="bg-white rounded-[12px] p-4 border border-[#FDE68A] space-y-3">
          <div className="text-xs sm:text-sm font-bold text-[#92400E]">
            2. قراءة الحصيلة الطاقوية للدارة الكهربائية :
          </div>
          <ul className="space-y-2 text-xs text-[#4A4A4A] leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-[#EA580C] shrink-0" dir="ltr">
                [Ei]
              </span>
              <span>
                <strong>في المولد / البطارية :</strong> تُخزَّن طاقة كيميائية (طاقة داخلية{' '}
                <strong dir="ltr" className="font-mono">
                  Ei
                </strong>
                ) تتناقص تدريجيًا أثناء الاشتغال.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-[#0284C7] shrink-0" dir="ltr">
                [We]
              </span>
              <span>
                <strong>عبر الموصلات والقاطع :</strong> تنتقل الطاقة من البطارية إلى المصباح بنمط{' '}
                <strong>تحويل كهربائي (We)</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-[#D97706] shrink-0" dir="ltr">
                [Er + Q]
              </span>
              <span>
                <strong>في المصباح ونحو الوسط الخارجي :</strong> يتحول التحويل الكهربائي إلى{' '}
                <strong>إشعاع ضوئي مفيد (Er)</strong> و<strong>تحويل حراري غير مفيد (Q)</strong> يرفع الطاقة الداخلية للوسط الخارجي.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. BLOC « FORMULE CLÉ & LOI ÉNERGÉTIQUE » (Spécifique Domaine 02)
 */
export const EnergyKeyFormulaBlock: React.FC = () => {
  return (
    <div
      className="my-4 rounded-[16px] border-2 border-[#D97706] bg-white p-4 sm:p-5 space-y-4 shadow-2xs"
      dir="rtl"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FEF3C7] pb-2.5">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-[#D97706]" />
          <h4 className="text-sm sm:text-base font-bold text-[#92400E]">
            العلاقات والقوانين الأساسية في ميدان الطاقة (Formules & Lois Clés — Domaine 02)
          </h4>
        </div>
        <span className="text-xs font-mono font-bold text-[#D97706]" dir="ltr">
          Conservation & Transfert d’énergie
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Formule 1 : Bilan de conversion */}
        <div className="rounded-[12px] bg-[#FFFBEB] border border-[#FCD34D] p-3.5 space-y-2">
          <div className="text-xs font-bold text-[#92400E]">
            1. معادلة الحصيلة الطاقوية لجهاز محول (Bilan énergétique) :
          </div>
          <div
            dir="ltr"
            className="py-2.5 px-3 rounded-[8px] bg-white border border-[#F59E0B] text-center font-mono font-bold text-sm sm:text-base text-[#B45309]"
          >
            E_reçue = E_utile + E_dissipée (Q)
          </div>
          <p className="text-xs text-[#4A4A4A] leading-relaxed">
            الطاقة التي يستقبلها الجهاز (مثل <strong dir="ltr">We</strong> في المصباح أو المحرك) تساوي مجموع{' '}
            <strong>الطاقة المفيدة</strong> (<strong dir="ltr">Er</strong> أو <strong dir="ltr">W</strong>) و
            <strong>الطاقة الضائعة حراريًا</strong> (<strong dir="ltr">Q</strong>) في الوسط الخارجي.
          </p>
        </div>

        {/* Formule 2 : Relation Énergie - Puissance - Temps (pont vers Cours 09 & 10) */}
        <div className="rounded-[12px] bg-[#FFF7ED] border border-[#FDBA74] p-3.5 space-y-2">
          <div className="text-xs font-bold text-[#C2410C]">
            2. العلاقة بين الطاقة المحولة والاستطاعة والزمن (Cours 09–10) :
          </div>
          <div
            dir="ltr"
            className="py-2.5 px-3 rounded-[8px] bg-white border border-[#EA580C] text-center font-mono font-bold text-sm sm:text-base text-[#C2410C]"
          >
            E = P × t &nbsp;&nbsp;⟺&nbsp;&nbsp; P = E / t
          </div>
          <p className="text-xs text-[#4A4A4A] leading-relaxed">
            حيث <strong dir="ltr">E</strong> هي الطاقة المحولة بـ <strong>الجول (J)</strong> أو <strong>الواط-ساعي (Wh)</strong>، و{' '}
            <strong dir="ltr">P</strong> هي استطاعة التحويل بـ <strong>الواط (W)</strong>، و <strong dir="ltr">t</strong> هو زمن التشغيل.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. ENCADRÉ « ATTENTION / UNITÉS & CONVENTIONS » (Spécifique Domaine 02)
 */
export const EnergyAttentionUnitsBox: React.FC = () => {
  return (
    <div
      className="my-4 rounded-[14px] border-r-4 border-r-[#EA580C] border border-[#FDBA74] bg-[#FFF7ED] p-4 space-y-3"
      dir="rtl"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C2410C]">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#EA580C]" />
          <span>تنبيه هام : الوحدات والرموز الاصطلاحية في ميدان الطاقة (Attention / Unités & Symboles)</span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#9A3412]" dir="ltr">
          J · kJ · W · Wh
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="bg-white rounded-[10px] p-3 border border-[#FED7AA] space-y-1">
          <div className="font-bold text-[#9A3412]">1. وحدات الطاقة والاستطاعة</div>
          <div className="font-mono text-[11px] text-[#C2410C]" dir="ltr">
            • 1 kJ = 1000 J (Joule)
            <br />• 1 Wh = 3600 J
            <br />• 1 kWh = 1000 Wh
          </div>
        </div>

        <div className="bg-white rounded-[10px] p-3 border border-[#FED7AA] space-y-1">
          <div className="font-bold text-[#9A3412]">2. تحت الفقاعة (أنماط التخزين)</div>
          <div className="text-[#4A4A4A] leading-relaxed">
            نكتب فقط <strong dir="ltr">Ec</strong> (حركية)، <strong dir="ltr">Ep</strong> (كامنة: <strong dir="ltr">Epp, Epe</strong>)، أو <strong dir="ltr">Ei</strong> (داخلية).
          </div>
        </div>

        <div className="bg-white rounded-[10px] p-3 border border-[#FED7AA] space-y-1">
          <div className="font-bold text-[#9A3412]">3. فوق السهم (أنماط التحويل)</div>
          <div className="text-[#4A4A4A] leading-relaxed">
            نكتب فقط <strong dir="ltr">W</strong> (ميكانيكي)، <strong dir="ltr">We</strong> (كهربائي)، <strong dir="ltr">Er</strong> (إشعاعي)، أو <strong dir="ltr">Q</strong> (حراري).
          </div>
        </div>
      </div>
    </div>
  );
};
