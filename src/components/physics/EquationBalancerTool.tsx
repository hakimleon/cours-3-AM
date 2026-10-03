import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Check,
  Plus,
  Minus,
  Scale,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ChemicalFormula } from './ChemPhysText';

interface CompoundSpec {
  formula: string;
  nameArabic: string;
  atoms: Record<string, number>;
  defaultCoeff: number;
  targetCoeff: number;
}

interface ElementMeta {
  symbol: string;
  nameArabic: string;
  nameFrench: string;
}

interface InteractiveEquation {
  id: string;
  titleArabic: string;
  titleFrench: string;
  difficultyBadge: string;
  hintArabic: string;
  elements: ElementMeta[];
  reactants: CompoundSpec[];
  products: CompoundSpec[];
}

const EQUATIONS_CATALOG: InteractiveEquation[] = [
  {
    id: 'eq-water',
    titleArabic: '1. اصطناع (تكوين) الماء',
    titleFrench: 'Synthèse de l’eau : H₂ + O₂ ⟶ H₂O',
    difficultyBadge: 'مستوى 1 — أساسي',
    hintArabic:
      'ابدأ بموازنة الأكسجين (O): يوجد 2 O في المتفاعلات و 1 O في H₂O، فضع المعامل 2 أمام H₂O، ثم وازن الهيدروجين (H) بوضع 2 أمام H₂.',
    elements: [
      { symbol: 'H', nameArabic: 'الهيدروجين', nameFrench: 'Hydrogène' },
      { symbol: 'O', nameArabic: 'الأكسجين', nameFrench: 'Oxygène' },
    ],
    reactants: [
      {
        formula: 'H2',
        nameArabic: 'ثنائي الهيدروجين',
        atoms: { H: 2 },
        defaultCoeff: 1,
        targetCoeff: 2,
      },
      {
        formula: 'O2',
        nameArabic: 'ثنائي الأكسجين',
        atoms: { O: 2 },
        defaultCoeff: 1,
        targetCoeff: 1,
      },
    ],
    products: [
      {
        formula: 'H2O',
        nameArabic: 'الماء',
        atoms: { H: 2, O: 1 },
        defaultCoeff: 1,
        targetCoeff: 2,
      },
    ],
  },
  {
    id: 'eq-hcl',
    titleArabic: '2. تكوين غاز كلور الهيدروجين',
    titleFrench: 'Synthèse du chlorure d’hydrogène : H₂ + Cl₂ ⟶ HCl',
    difficultyBadge: 'مستوى 1 — أساسي',
    hintArabic:
      'لدينا ذرتان من H وذرتان من Cl في المتفاعلات، بينما في النواتج جزيء HCl واحد يضم ذرة H وذرة Cl. ضع المعامل 2 أمام HCl.',
    elements: [
      { symbol: 'H', nameArabic: 'الهيدروجين', nameFrench: 'Hydrogène' },
      { symbol: 'Cl', nameArabic: 'الكلور', nameFrench: 'Chlore' },
    ],
    reactants: [
      {
        formula: 'H2',
        nameArabic: 'ثنائي الهيدروجين',
        atoms: { H: 2 },
        defaultCoeff: 1,
        targetCoeff: 1,
      },
      {
        formula: 'Cl2',
        nameArabic: 'ثنائي الكلور',
        atoms: { Cl: 2 },
        defaultCoeff: 1,
        targetCoeff: 1,
      },
    ],
    products: [
      {
        formula: 'HCl',
        nameArabic: 'كلور الهيدروجين',
        atoms: { H: 1, Cl: 1 },
        defaultCoeff: 1,
        targetCoeff: 2,
      },
    ],
  },
  {
    id: 'eq-methane',
    titleArabic: '3. الاحتراق التام لغاز الميثان',
    titleFrench: 'Combustion complète du méthane : CH₄ + O₂ ⟶ CO₂ + H₂O',
    difficultyBadge: 'مستوى 2 — متوسط',
    hintArabic:
      'الكربون (1 C) متوازن؛ وازن الهيدروجين (4 H في CH₄) بوضع 2 أمام H₂O، ثم احسب مجموع ذرات الأكسجين في النواتج (2 + 2 = 4 O) وضع 2 أمام O₂.',
    elements: [
      { symbol: 'C', nameArabic: 'الكربون', nameFrench: 'Carbone' },
      { symbol: 'H', nameArabic: 'الهيدروجين', nameFrench: 'Hydrogène' },
      { symbol: 'O', nameArabic: 'الأكسجين', nameFrench: 'Oxygène' },
    ],
    reactants: [
      {
        formula: 'CH4',
        nameArabic: 'الميثان',
        atoms: { C: 1, H: 4 },
        defaultCoeff: 1,
        targetCoeff: 1,
      },
      {
        formula: 'O2',
        nameArabic: 'ثنائي الأكسجين',
        atoms: { O: 2 },
        defaultCoeff: 1,
        targetCoeff: 2,
      },
    ],
    products: [
      {
        formula: 'CO2',
        nameArabic: 'ثنائي أكسيد الكربون',
        atoms: { C: 1, O: 2 },
        defaultCoeff: 1,
        targetCoeff: 1,
      },
      {
        formula: 'H2O',
        nameArabic: 'الماء',
        atoms: { H: 2, O: 1 },
        defaultCoeff: 1,
        targetCoeff: 2,
      },
    ],
  },
  {
    id: 'eq-iron',
    titleArabic: '4. احتراق الحديد في ثنائي الأكسجين',
    titleFrench: 'Combustion du fer : Fe + O₂ ⟶ Fe₂O₃',
    difficultyBadge: 'مستوى 2 — متوسط',
    hintArabic:
      'الأكسجين يظهر بـ 2 ذرات في O₂ وبـ 3 ذرات في Fe₂O₃؛ المضاعف المشترك الأصغر هو 6 ذرات O: ضع 3 أمام O₂ و 2 أمام Fe₂O₃، ثم ضع 4 أمام Fe.',
    elements: [
      { symbol: 'Fe', nameArabic: 'الحديد', nameFrench: 'Fer' },
      { symbol: 'O', nameArabic: 'الأكسجين', nameFrench: 'Oxygène' },
    ],
    reactants: [
      {
        formula: 'Fe',
        nameArabic: 'الحديد',
        atoms: { Fe: 1 },
        defaultCoeff: 1,
        targetCoeff: 4,
      },
      {
        formula: 'O2',
        nameArabic: 'ثنائي الأكسجين',
        atoms: { O: 2 },
        defaultCoeff: 1,
        targetCoeff: 3,
      },
    ],
    products: [
      {
        formula: 'Fe2O3',
        nameArabic: 'أكسيد الحديد الثلاثي',
        atoms: { Fe: 2, O: 3 },
        defaultCoeff: 1,
        targetCoeff: 2,
      },
    ],
  },
  {
    id: 'eq-propane',
    titleArabic: '5. الاحتراق التام لغاز البروبان',
    titleFrench: 'Combustion complète du propane : C₃H₈ + O₂ ⟶ CO₂ + H₂O',
    difficultyBadge: 'مستوى 2 — متوسط',
    hintArabic:
      'ابدأ بالكربون (3 C ⟶ ضع 3 أمام CO₂)، ثم الهيدروجين (8 H ⟶ ضع 4 أمام H₂O)، ثم احسب الأكسجين في النواتج (3×2 + 4×1 = 10 O ⟶ ضع 5 أمام O₂).',
    elements: [
      { symbol: 'C', nameArabic: 'الكربون', nameFrench: 'Carbone' },
      { symbol: 'H', nameArabic: 'الهيدروجين', nameFrench: 'Hydrogène' },
      { symbol: 'O', nameArabic: 'الأكسجين', nameFrench: 'Oxygène' },
    ],
    reactants: [
      {
        formula: 'C3H8',
        nameArabic: 'البروبان',
        atoms: { C: 3, H: 8 },
        defaultCoeff: 1,
        targetCoeff: 1,
      },
      {
        formula: 'O2',
        nameArabic: 'ثنائي الأكسجين',
        atoms: { O: 2 },
        defaultCoeff: 1,
        targetCoeff: 5,
      },
    ],
    products: [
      {
        formula: 'CO2',
        nameArabic: 'ثنائي أكسيد الكربون',
        atoms: { C: 1, O: 2 },
        defaultCoeff: 1,
        targetCoeff: 3,
      },
      {
        formula: 'H2O',
        nameArabic: 'الماء',
        atoms: { H: 2, O: 1 },
        defaultCoeff: 1,
        targetCoeff: 4,
      },
    ],
  },
  {
    id: 'eq-butane',
    titleArabic: '6. الاحتراق التام لغاز البوتان (معادلة الدرس)',
    titleFrench: 'Combustion complète du butane : C₄H₁₀ + O₂ ⟶ CO₂ + H₂O',
    difficultyBadge: 'مستوى 3 — متقدم',
    hintArabic:
      'عند وضع 1 أمام C₄H₁₀ نحتاج 4 CO₂ و 5 H₂O فيصبح مجموع الأكسجين 13 ذرة O (عدد فردي!). اضرب جميع المعاملات في 2: ضع 2 أمام C₄H₁₀، و 8 أمام CO₂، و 10 أمام H₂O، و 13 أمام O₂.',
    elements: [
      { symbol: 'C', nameArabic: 'الكربون', nameFrench: 'Carbone' },
      { symbol: 'H', nameArabic: 'الهيدروجين', nameFrench: 'Hydrogène' },
      { symbol: 'O', nameArabic: 'الأكسجين', nameFrench: 'Oxygène' },
    ],
    reactants: [
      {
        formula: 'C4H10',
        nameArabic: 'البوتان',
        atoms: { C: 4, H: 10 },
        defaultCoeff: 1,
        targetCoeff: 2,
      },
      {
        formula: 'O2',
        nameArabic: 'ثنائي الأكسجين',
        atoms: { O: 2 },
        defaultCoeff: 1,
        targetCoeff: 13,
      },
    ],
    products: [
      {
        formula: 'CO2',
        nameArabic: 'ثنائي أكسيد الكربون',
        atoms: { C: 1, O: 2 },
        defaultCoeff: 1,
        targetCoeff: 8,
      },
      {
        formula: 'H2O',
        nameArabic: 'الماء',
        atoms: { H: 2, O: 1 },
        defaultCoeff: 1,
        targetCoeff: 10,
      },
    ],
  },
];

export const EquationBalancerTool: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedEqIndex, setSelectedEqIndex] = useState<number>(0);
  const currentEq = EQUATIONS_CATALOG[selectedEqIndex];

  const [reactantCoeffs, setReactantCoeffs] = useState<number[]>(() =>
    EQUATIONS_CATALOG[0].reactants.map((r) => r.defaultCoeff)
  );
  const [productCoeffs, setProductCoeffs] = useState<number[]>(() =>
    EQUATIONS_CATALOG[0].products.map((p) => p.defaultCoeff)
  );
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleSelectEquation = (index: number) => {
    const eq = EQUATIONS_CATALOG[index];
    setSelectedEqIndex(index);
    setReactantCoeffs(eq.reactants.map((r) => r.defaultCoeff));
    setProductCoeffs(eq.products.map((p) => p.defaultCoeff));
    setShowHint(false);
  };

  const updateReactantCoeff = (idx: number, val: number) => {
    const clamped = Math.max(1, Math.min(30, Number.isNaN(val) ? 1 : val));
    setReactantCoeffs((prev) => prev.map((c, i) => (i === idx ? clamped : c)));
  };

  const updateProductCoeff = (idx: number, val: number) => {
    const clamped = Math.max(1, Math.min(30, Number.isNaN(val) ? 1 : val));
    setProductCoeffs((prev) => prev.map((c, i) => (i === idx ? clamped : c)));
  };

  const handleReset = () => {
    setReactantCoeffs(currentEq.reactants.map((r) => r.defaultCoeff));
    setProductCoeffs(currentEq.products.map((p) => p.defaultCoeff));
  };

  const handleShowSolution = () => {
    setReactantCoeffs(currentEq.reactants.map((r) => r.targetCoeff));
    setProductCoeffs(currentEq.products.map((p) => p.targetCoeff));
  };

  // Compute atom counts per element on both sides
  const elementBalances = currentEq.elements.map((el) => {
    let leftCount = 0;
    const leftBreakdown: string[] = [];
    currentEq.reactants.forEach((r, idx) => {
      const sub = r.atoms[el.symbol] || 0;
      if (sub > 0) {
        const coeff = reactantCoeffs[idx] ?? 1;
        leftCount += coeff * sub;
        leftBreakdown.push(`${coeff}×${sub}`);
      }
    });

    let rightCount = 0;
    const rightBreakdown: string[] = [];
    currentEq.products.forEach((p, idx) => {
      const sub = p.atoms[el.symbol] || 0;
      if (sub > 0) {
        const coeff = productCoeffs[idx] ?? 1;
        rightCount += coeff * sub;
        rightBreakdown.push(`${coeff}×${sub}`);
      }
    });

    const isBalanced = leftCount === rightCount && leftCount > 0;
    return {
      ...el,
      leftCount,
      rightCount,
      leftFormula: leftBreakdown.join(' + '),
      rightFormula: rightBreakdown.join(' + '),
      isBalanced,
    };
  });

  const allElementsBalanced = elementBalances.every((b) => b.isBalanced);
  const isExactTargetRatio =
    currentEq.reactants.every((r, i) => reactantCoeffs[i] === r.targetCoeff) &&
    currentEq.products.every((p, i) => productCoeffs[i] === p.targetCoeff);

  return (
    <div
      className="rounded-[14px] bg-[#FDF2F8] border-2 border-[#F472B6]/65 overflow-hidden shadow-xs"
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[8px] bg-[#C94BA6] text-white text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مختبر المحاكاة التفاعلية · Simulation</span>
            </span>
            <h4 className="text-sm sm:text-base font-bold text-[#831843]">
              أداة موازنة المعادلات الكيميائية التفاعلية (Équilibrage interactif)
            </h4>
          </div>
          <p className="text-xs text-[#4A4A4A]">
            انقر لفتح المحاكاة التفاعلية وتعديل المعاملات الستوكيومترية لموازنة 6 معادلات كيميائية خطوة بخطوة.
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-center">
          <span
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] border text-xs font-bold transition-all ${
              isDrawerOpen
                ? 'bg-white text-[#C94BA6] border-[#C94BA6]'
                : 'bg-[#C94BA6] text-white border-[#C94BA6]'
            }`}
          >
            <span>{isDrawerOpen ? 'إغلاق المحاكاة التفاعلية' : 'فتح المحاكاة التفاعلية'}</span>
            {isDrawerOpen ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </span>
        </div>
      </button>

      {isDrawerOpen && (
        <div className="p-4 sm:p-5 border-t border-[#F9A8D4] bg-[#FDF2F8]/80 space-y-4">
          {/* 1. Controls & Equation Selector Tabs */}
          <div className="space-y-3 pb-3 border-b border-[#E2D9D0]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-[#4A4A4A] font-medium">
                أدخل المعامل الستوكيومتري أمام كل صيغة كيميائية وراقب المؤشر اللحظي (الأخضر / الأحمر) أسفل كل عنصر كيميائي:
              </p>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowHint((h) => !h)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[10px] bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{showHint ? 'إخفاء التلميح' : 'تلميح للموازنة'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[10px] bg-white hover:bg-slate-100 border border-[#E2D9D0] text-[#4A4A4A] text-xs font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط (1)</span>
                </button>
                <button
                  type="button"
                  onClick={handleShowSolution}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[10px] bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>إظهار الحل الموزون</span>
                </button>
              </div>
            </div>

            {/* Equation Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {EQUATIONS_CATALOG.map((eq, idx) => {
            const active = idx === selectedEqIndex;
            return (
              <button
                key={eq.id}
                type="button"
                onClick={() => handleSelectEquation(idx)}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-bold border transition-all cursor-pointer ${
                  active
                    ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-xs'
                    : 'bg-white text-[#4A4A4A] border-[#E2D9D0] hover:border-[#0F766E]/50'
                }`}
              >
                {eq.titleArabic}
              </button>
            );
          })}
        </div>

        {showHint && (
          <div className="p-3 rounded-[10px] bg-amber-50/90 border border-amber-300 text-xs text-amber-950 leading-relaxed">
            <strong className="font-bold text-amber-900">💡 خطة الموازنة المقترحة : </strong>
            {currentEq.hintArabic}
          </div>
        )}
      </div>

      {/* 2. Interactive Equation Editor Box (LTR chemical layout) */}
      <div className="p-4 rounded-[12px] bg-white border border-[#E5DDD5] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B6B6B]">
          <span className="font-bold text-[#0F766E]">{currentEq.titleArabic}</span>
          <span className="font-mono text-[11px]" dir="ltr">
            {currentEq.titleFrench} · ({currentEq.difficultyBadge})
          </span>
        </div>

        {/* Chemical Equation Row with Manual Coefficient Inputs */}
        <div
          dir="ltr"
          className="py-4 px-3 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {/* Reactants */}
          {currentEq.reactants.map((r, idx) => {
            const coeff = reactantCoeffs[idx] ?? 1;
            return (
              <React.Fragment key={`reactant-${r.formula}-${idx}`}>
                {idx > 0 && (
                  <span className="text-xl font-bold text-[#4A4A4A] px-0.5">+</span>
                )}
                <div className="flex flex-col items-center bg-white px-3 py-2.5 rounded-[12px] border-2 border-[#0284C7]/40 shadow-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    {/* Coefficient Stepper + Direct Input */}
                    <div className="flex items-center rounded-[8px] border-2 border-[#0284C7] bg-sky-50/60 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateReactantCoeff(idx, coeff - 1)}
                        disabled={coeff <= 1}
                        className="px-1.5 py-1 hover:bg-sky-100 disabled:opacity-35 text-[#0284C7] transition-colors cursor-pointer"
                        title="إنقاص المعامل"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={coeff}
                        onChange={(e) =>
                          updateReactantCoeff(idx, parseInt(e.target.value, 10))
                        }
                        aria-label={`معامل ${r.nameArabic}`}
                        className="w-11 text-center font-mono text-base font-bold text-[#0284C7] bg-transparent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => updateReactantCoeff(idx, coeff + 1)}
                        disabled={coeff >= 30}
                        className="px-1.5 py-1 hover:bg-sky-100 disabled:opacity-35 text-[#0284C7] transition-colors cursor-pointer"
                        title="زيادة المعامل"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Compound Formula */}
                    <ChemicalFormula formula={r.formula} size="lg" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0284C7]" dir="rtl">
                    {r.nameArabic} (متفاعل)
                  </span>
                </div>
              </React.Fragment>
            );
          })}

          {/* Reaction Arrow */}
          <div className="flex flex-col items-center px-2">
            <span className="text-2xl font-bold text-[#C94BA6]">⟶</span>
            <span className="text-[10px] font-bold text-[#C94BA6]" dir="rtl">
              تحول كيميائي
            </span>
          </div>

          {/* Products */}
          {currentEq.products.map((p, idx) => {
            const coeff = productCoeffs[idx] ?? 1;
            return (
              <React.Fragment key={`product-${p.formula}-${idx}`}>
                {idx > 0 && (
                  <span className="text-xl font-bold text-[#4A4A4A] px-0.5">+</span>
                )}
                <div className="flex flex-col items-center bg-white px-3 py-2.5 rounded-[12px] border-2 border-[#0F766E]/40 shadow-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    {/* Coefficient Stepper + Direct Input */}
                    <div className="flex items-center rounded-[8px] border-2 border-[#0F766E] bg-[#F0FDFA] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateProductCoeff(idx, coeff - 1)}
                        disabled={coeff <= 1}
                        className="px-1.5 py-1 hover:bg-teal-100 disabled:opacity-35 text-[#0F766E] transition-colors cursor-pointer"
                        title="إنقاص المعامل"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={coeff}
                        onChange={(e) =>
                          updateProductCoeff(idx, parseInt(e.target.value, 10))
                        }
                        aria-label={`معامل ${p.nameArabic}`}
                        className="w-11 text-center font-mono text-base font-bold text-[#0F766E] bg-transparent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => updateProductCoeff(idx, coeff + 1)}
                        disabled={coeff >= 30}
                        className="px-1.5 py-1 hover:bg-teal-100 disabled:opacity-35 text-[#0F766E] transition-colors cursor-pointer"
                        title="زيادة المعامل"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Compound Formula */}
                    <ChemicalFormula formula={p.formula} size="lg" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0F766E]" dir="rtl">
                    {p.nameArabic} (ناتج)
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. Real-Time Per-Element Balance Indicators (مؤشر لحظي أخضر / أحمر أسفل كل عنصر) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-[#4A4A4A] flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-[#0F766E]" />
            <span>المؤشر اللحظي لتوازن ذرات كل عنصر في طرفي المعادلة :</span>
          </span>
          <span className="text-xs font-bold text-[#6B6B6B]">
            {elementBalances.filter((b) => b.isBalanced).length} / {elementBalances.length} عناصر متوازنة
          </span>
        </div>

        <div
          className={`grid grid-cols-1 ${
            elementBalances.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
          } gap-3`}
        >
          {elementBalances.map((el) => (
            <div
              key={el.symbol}
              className={`p-3.5 rounded-[12px] border-2 transition-all duration-200 space-y-2.5 ${
                el.isBalanced
                  ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                  : 'bg-rose-50/80 border-rose-400'
              }`}
            >
              {/* Top Row : Element Symbol, Name & Instant Status Pill (Green/Red) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-8 h-8 rounded-[8px] font-mono text-sm font-bold flex items-center justify-center text-white ${
                      el.isBalanced ? 'bg-emerald-600' : 'bg-rose-600'
                    }`}
                  >
                    {el.symbol}
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#1E293B]">
                      عنصر {el.nameArabic}
                    </div>
                    <div className="text-[10px] font-mono text-[#6B6B6B]" dir="ltr">
                      {el.nameFrench} ({el.symbol})
                    </div>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                    el.isBalanced
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {el.isBalanced ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>متوازن ✓</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>غير متوازن ✗</span>
                    </>
                  )}
                </span>
              </div>

              {/* Atom Count Comparison : Reactants vs Products */}
              <div className="grid grid-cols-3 items-center gap-1.5 p-2.5 rounded-[10px] bg-white border border-black/10 text-center">
                <div>
                  <div className="text-[10px] font-bold text-[#0284C7]">في المتفاعلات</div>
                  <div className="text-lg font-mono font-bold text-[#0284C7]">
                    {el.leftCount}
                  </div>
                  <div className="text-[10px] font-mono text-[#6B6B6B]" dir="ltr">
                    ({el.leftFormula})
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <span
                    className={`text-xl font-mono font-bold ${
                      el.isBalanced ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {el.isBalanced ? '=' : '≠'}
                  </span>
                  <span className="text-[10px] font-bold text-[#6B6B6B]">
                    {el.isBalanced ? 'متساويان' : 'غير متساويين'}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-[#0F766E]">في النواتج</div>
                  <div className="text-lg font-mono font-bold text-[#0F766E]">
                    {el.rightCount}
                  </div>
                  <div className="text-[10px] font-mono text-[#6B6B6B]" dir="ltr">
                    ({el.rightFormula})
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Overall Equation Status Banner */}
      <div
        className={`p-3.5 rounded-[12px] border-2 flex flex-wrap items-center justify-between gap-3 transition-all ${
          allElementsBalanced
            ? 'bg-emerald-600 border-emerald-700 text-white'
            : 'bg-white border-rose-300 text-rose-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {allElementsBalanced ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-white" />
          ) : (
            <XCircle className="w-5 h-5 shrink-0 text-rose-600" />
          )}
          <div className="text-xs sm:text-sm font-bold">
            {allElementsBalanced
              ? isExactTargetRatio
                ? 'أحسنت! المعادلة الكيميائية موزونة تمامًا بأصغر معاملات طبيعية صحيحة (انحفاظ الذرات محقق ✓).'
                : 'المعادلة متوازنة ذريًا (عدد ذرات كل عنصر متساوٍ في الطرفين ✓)، ويمكن قسمة المعاملات للحصول على أبسط أعداد صحيحة.'
              : 'المعادلة غير موزونة بعد: عدّل المعاملات بالأزرار (+ / -) حتى تتحول جميع مؤشرات العناصر إلى اللون الأخضر.'}
          </div>
        </div>

        <div
          dir="ltr"
          className="px-3 py-1 rounded-[8px] bg-white text-[#1E293B] font-mono text-xs font-bold shadow-xs"
        >
          {currentEq.reactants
            .map((r, i) => `${reactantCoeffs[i] > 1 ? `${reactantCoeffs[i]} ` : ''}${r.formula}`)
            .join(' + ')}{' '}
          ⟶{' '}
          {currentEq.products
            .map((p, i) => `${productCoeffs[i] > 1 ? `${productCoeffs[i]} ` : ''}${p.formula}`)
            .join(' + ')}
        </div>
      </div>
        </div>
      )}
    </div>
  );
};
