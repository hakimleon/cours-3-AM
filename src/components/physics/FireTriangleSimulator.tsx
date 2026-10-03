import React, { useState } from 'react';
import { Flame, Wind, Box, RotateCcw, CheckCircle2, XCircle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { ChemicalFormula } from './ChemPhysText';

interface FireElementState {
  combustible: boolean; // المادة القابلة للاحتراق (الكربون C)
  oxidizer: boolean;    // المؤكسد (ثنائي الأكسجين O₂)
  energy: boolean;      // طاقة التنشيط (الحرارة / اللهب)
}

export const FireTriangleSimulator: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [elements, setElements] = useState<FireElementState>({
    combustible: true,
    oxidizer: true,
    energy: true,
  });

  const isBurning = elements.combustible && elements.oxidizer && elements.energy;
  const activeCount =
    (elements.combustible ? 1 : 0) +
    (elements.oxidizer ? 1 : 0) +
    (elements.energy ? 1 : 0);

  const toggleElement = (key: keyof FireElementState) => {
    setElements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetAll = () => {
    setElements({
      combustible: true,
      oxidizer: true,
      energy: true,
    });
  };

  const removeOnly = (keyToRemove: keyof FireElementState) => {
    setElements({
      combustible: keyToRemove !== 'combustible',
      oxidizer: keyToRemove !== 'oxidizer',
      energy: keyToRemove !== 'energy',
    });
  };

  // Determine detailed scientific explanation based on which element(s) are removed
  const getDiagnostic = () => {
    if (isBurning) {
      return {
        badge: 'الاحتراق مشتعل ومستمر (3 / 3 عناصر متوفرة)',
        title: '🔥 اكتمل مثلث الاحتراق : تفاعل الكربون مع ثنائي الأكسجين!',
        description:
          'اجتمعت العناصر الثلاثة معًا: قطعة الكربون (مادة قابلة للاحتراق) + غاز ثنائي الأكسجين O₂ (المؤكسد) + التسخين (طاقة التنشيط). تتوهج قطعة الفحم بشدة وتنبعث حرارة وضوء ويتشكل غاز ثنائي أكسيد الكربون (CO₂).',
        realLifeApplication:
          'في المخبر : يستمر توهج قطعة الكربون داخل القارورة ويتعكر ماء الجير بوجود CO₂.',
        tone: 'burning' as const,
      };
    }

    const missing: string[] = [];
    if (!elements.combustible) missing.push('المادة القابلة للاحتراق (الكربون C)');
    if (!elements.oxidizer) missing.push('ثنائي الأكسجين (O₂)');
    if (!elements.energy) missing.push('طاقة التنشيط (التسخين)');

    if (missing.length === 1) {
      if (!elements.combustible) {
        return {
          badge: 'توقف الاحتراق — تمت إزالة المادة القابلة للاحتراق (C)',
          title: '⚪ ماذا يحدث عند غياب المادة القابلة للاحتراق (الكربون)؟',
          description:
            'رغم وجود غاز ثنائي الأكسجين (O₂) في الهواء ووجود مصدر حراري (طاقة تنشيط)، لا يحدث أي احتراق لعدم وجود المادة القابلة للاحتراق (الكربون C). وعندما تُستهلك قطعة الفحم بالكامل يتوقف الاحتراق تلقائيًا.',
          realLifeApplication:
            'تطبيق في الأمن والسلامة : إبعاد المواد القابلة للاشتعال (الخشب، الورق، الغاز) يكسر مثلث النار ويمنع امتداد الحريق.',
          tone: 'extinguished' as const,
        };
      }
      if (!elements.oxidizer) {
        return {
          badge: 'انطفاء اللهب — تمت إزالة ثنائي الأكسجين (O₂)',
          title: '💨 ماذا يحدث عند غياب أو نفاد ثنائي الأكسجين (O₂)؟',
          description:
            'حتى لو كانت قطعة الكربون (C) موجودة وساخنة، فإن غياب غاز ثنائي الأكسجين (O₂) يؤدي إلى انطفاء التوهج وتوقف الاحتراق فورًا! فثنائي الأكسجين هو المؤكسد الضروري لحدوث الاحتراق.',
          realLifeApplication:
            'تطبيق في المخبر والحياة اليومية : في قارورة مغلقة ينطفئ الجمر عند نفاد O₂؛ ولإطفاء حريق صغير نغطيه ببطانية إطفاء لمنع وصول ثنائي الأكسجين.',
          tone: 'extinguished' as const,
        };
      }
      if (!elements.energy) {
        return {
          badge: 'لا يبدأ الاحتراق — تمت إزالة طاقة التنشيط (التسخين)',
          title: '❄️ ماذا يحدث عند غياب طاقة التنشيط (الحرارة)؟',
          description:
            'قطعة الفحم (الكربون C) موضوعة في الهواء بوجود ثنائي الأكسجين (O₂)، لكنها في درجة الحرارة العادية لا تشتعل تلقائيًا! لا بد من تسخينها أولًا بمصدر حراري (طاقة تنشيط) لكي يبدأ التحول الكيميائي.',
          realLifeApplication:
            'تطبيق في الأمن والسلامة : رش الماء على الجمر يبرّده وينزع منه الحرارة (طاقة التنشيط) فينكسر مثلث الاحتراق وتنطفئ النار.',
          tone: 'extinguished' as const,
        };
      }
    }

    return {
      badge: `لا يحدث احتراق — غياب عنصرين أو أكثر (${activeCount} / 3)`,
      title: `⚠️ مثلث الاحتراق مكسور : غياب ${missing.join(' و ')}`,
      description:
        'لا يمكن أن يحدث الاحتراق إلا إذا توفرت أضلاع مثلث الاحتراق الثلاثة في آنٍ واحد. اضغط على العناصر المفقودة لإعادتها وملاحظة اشتعال الكربون من جديد.',
      realLifeApplication:
        'قاعدة علمية : إزالة ضلع واحد فقط من مثلث الاحتراق كافية لمنع الاحتراق أو إيقافه.',
      tone: 'extinguished' as const,
    };
  };

  const diagnostic = getDiagnostic();

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
              <span>محاكي تفاعلي · Simulation</span>
            </span>
            <h4 className="text-sm sm:text-base font-bold text-[#831843]">
              محاكي «مثلث الاحتراق» (Triangle du feu) — جرّب إزالة كل عنصر!
            </h4>
          </div>
          <p className="text-xs text-[#4A4A4A]">
            انقر لفتح المحاكاة التفاعلية وتجريب إزالة أو إعادة عناصر مثلث الاحتراق الثلاثة (الكربون C، ثنائي الأكسجين O₂، طاقة التنشيط).
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
          {/* Quick Scenario Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E2D9D0]">
            <p className="text-xs text-[#4A4A4A] font-medium">
              انقر على أي عنصر من العناصر الثلاثة أدناه (أو على رؤوس المثلث) لإزالته أو إعادته ولاحظ ماذا يحدث لاحتراق الكربون:
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={resetAll}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  isBurning
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white border border-[#0F766E]/30 text-[#0F766E] hover:bg-[#0F766E]/10'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>تفعيل العناصر الثلاثة 🔥</span>
              </button>
              <button
                type="button"
                onClick={() => removeOnly('oxidizer')}
                className="px-2.5 py-1.5 rounded-[10px] bg-white hover:bg-rose-50 border border-[#E2D9D0] hover:border-rose-300 text-[11px] font-bold text-[#4A4A4A] hover:text-rose-700 transition-colors cursor-pointer"
              >
                جرّب إزالة O₂
              </button>
              <button
                type="button"
                onClick={() => removeOnly('combustible')}
                className="px-2.5 py-1.5 rounded-[10px] bg-white hover:bg-rose-50 border border-[#E2D9D0] hover:border-rose-300 text-[11px] font-bold text-[#4A4A4A] hover:text-rose-700 transition-colors cursor-pointer"
              >
                جرّب إزالة الكربون C
              </button>
              <button
                type="button"
                onClick={() => removeOnly('energy')}
                className="px-2.5 py-1.5 rounded-[10px] bg-white hover:bg-rose-50 border border-[#E2D9D0] hover:border-rose-300 text-[11px] font-bold text-[#4A4A4A] hover:text-rose-700 transition-colors cursor-pointer"
              >
                جرّب إزالة الطاقة
              </button>
            </div>
          </div>

      {/* Main Interactive Grid : Visual Triangle & Flask on Right + 3 Interactive Toggle Cards on Left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Interactive Triangle Stage (7 cols) */}
        <div className="lg:col-span-7 p-4 rounded-[12px] bg-white border border-[#E5DDD5] flex flex-col items-center space-y-3">
          {/* Status Banner inside stage */}
          <div
            className={`w-full px-3.5 py-2 rounded-[10px] border flex items-center justify-between text-xs font-bold transition-all duration-300 ${
              isBurning
                ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                : 'bg-slate-100 border-slate-300 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isBurning ? 'bg-red-600 animate-ping' : 'bg-slate-400'
                }`}
              />
              <span>{diagnostic.badge}</span>
            </div>
            <span dir="ltr" className="font-mono text-[11px]">
              {isBurning ? 'C + O₂ ⟶ CO₂' : 'Réaction bloquée'}
            </span>
          </div>

          {/* Interactive HTML/CSS + SVG Triangle with Clickable Vertices */}
          <div className="relative w-full max-w-[420px] h-[270px] select-none">
            {/* SVG Connecting Lines of the Fire Triangle */}
            <svg viewBox="0 0 420 270" className="w-full h-full">
              {/* Triangle fill when all 3 are active */}
              <polygon
                points="210,46 72,216 348,216"
                fill={isBurning ? '#FEF2F2' : '#F8FAFC'}
                stroke="none"
                className="transition-colors duration-300"
              />

              {/* Side 1: Top (Energy) to Bottom-Right (Combustible) */}
              <line
                x1="210"
                y1="46"
                x2="348"
                y2="216"
                stroke={elements.energy && elements.combustible ? '#DC2626' : '#CBD5E1'}
                strokeWidth={elements.energy && elements.combustible ? '4' : '2.5'}
                strokeDasharray={elements.energy && elements.combustible ? 'none' : '7,6'}
              />

              {/* Side 2: Top (Energy) to Bottom-Left (Oxidizer O2) */}
              <line
                x1="210"
                y1="46"
                x2="72"
                y2="216"
                stroke={elements.energy && elements.oxidizer ? '#0284C7' : '#CBD5E1'}
                strokeWidth={elements.energy && elements.oxidizer ? '4' : '2.5'}
                strokeDasharray={elements.energy && elements.oxidizer ? 'none' : '7,6'}
              />

              {/* Side 3: Bottom-Right (Combustible) to Bottom-Left (Oxidizer O2) */}
              <line
                x1="348"
                y1="216"
                x2="72"
                y2="216"
                stroke={elements.combustible && elements.oxidizer ? '#0F766E' : '#CBD5E1'}
                strokeWidth={elements.combustible && elements.oxidizer ? '4' : '2.5'}
                strokeDasharray={elements.combustible && elements.oxidizer ? 'none' : '7,6'}
              />
            </svg>

            {/* Center Reaction Core (Glowing Charcoal or Extinguished State) */}
            <div className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center pointer-events-none">
              <div
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                  isBurning
                    ? 'bg-gradient-to-b from-amber-100 via-orange-100 to-red-100 border-red-500 shadow-lg shadow-red-500/20 scale-105'
                    : 'bg-slate-100 border-slate-300 opacity-80 scale-95'
                }`}
              >
                <span className="text-2xl leading-none">
                  {isBurning ? '🔥' : !elements.combustible ? '⚪' : !elements.oxidizer ? '💨' : '❄️'}
                </span>
                <span
                  className={`text-[11px] font-bold mt-1 ${
                    isBurning ? 'text-red-700' : 'text-slate-600'
                  }`}
                >
                  {isBurning ? 'احتراق مشتعل' : 'منطفئ'}
                </span>
              </div>
              {isBurning && (
                <span className="mt-1 px-2 py-0.5 rounded bg-[#0F766E] text-white text-[10px] font-bold shadow-xs">
                  ينتج غاز CO₂
                </span>
              )}
            </div>

            {/* VERTEX 1 (TOP) : طاقة التنشيط (الحرارة) */}
            <button
              type="button"
              onClick={() => toggleElement('energy')}
              className={`absolute left-1/2 top-1 -translate-x-1/2 px-3.5 py-2 rounded-[12px] border-2 transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                elements.energy
                  ? 'bg-amber-50 border-amber-500 text-amber-950 hover:bg-amber-100'
                  : 'bg-slate-100 border-dashed border-slate-400 text-slate-500 opacity-75 hover:opacity-100'
              }`}
              title="انقر لإزالة أو إعادة طاقة التنشيط"
            >
              <Flame
                className={`w-4 h-4 shrink-0 ${
                  elements.energy ? 'text-amber-600' : 'text-slate-400'
                }`}
              />
              <div className="text-right">
                <div className="text-xs font-bold leading-tight">
                  3. طاقة تنشيط (حرارة)
                </div>
                <div className="text-[10px] font-mono">
                  {elements.energy ? '✓ متوفرة (انقر للإزالة)' : '✗ مُزالة (انقر للإعادة)'}
                </div>
              </div>
            </button>

            {/* VERTEX 2 (BOTTOM RIGHT) : مادة قابلة للاحتراق (الكربون C) */}
            <button
              type="button"
              onClick={() => toggleElement('combustible')}
              className={`absolute right-1 bottom-1 px-3 py-2 rounded-[12px] border-2 transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                elements.combustible
                  ? 'bg-[#F0FDFA] border-[#0F766E] text-[#0F766E] hover:bg-[#CCFBF1]/60'
                  : 'bg-slate-100 border-dashed border-slate-400 text-slate-500 opacity-75 hover:opacity-100'
              }`}
              title="انقر لإزالة أو إعادة المادة القابلة للاحتراق (الكربون C)"
            >
              <Box
                className={`w-4 h-4 shrink-0 ${
                  elements.combustible ? 'text-[#0F766E]' : 'text-slate-400'
                }`}
              />
              <div className="text-right">
                <div className="text-xs font-bold leading-tight">
                  1. مادة قابلة للاحتراق (C)
                </div>
                <div className="text-[10px] font-mono">
                  {elements.combustible ? '✓ متوفرة (انقر للإزالة)' : '✗ مُزالة (انقر للإعادة)'}
                </div>
              </div>
            </button>

            {/* VERTEX 3 (BOTTOM LEFT) : ثنائي الأكسجين (O₂) */}
            <button
              type="button"
              onClick={() => toggleElement('oxidizer')}
              className={`absolute left-1 bottom-1 px-3 py-2 rounded-[12px] border-2 transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                elements.oxidizer
                  ? 'bg-sky-50 border-sky-600 text-sky-900 hover:bg-sky-100'
                  : 'bg-slate-100 border-dashed border-slate-400 text-slate-500 opacity-75 hover:opacity-100'
              }`}
              title="انقر لإزالة أو إعادة غاز ثنائي الأكسجين (O₂)"
            >
              <Wind
                className={`w-4 h-4 shrink-0 ${
                  elements.oxidizer ? 'text-sky-600' : 'text-slate-400'
                }`}
              />
              <div className="text-right">
                <div className="text-xs font-bold leading-tight">
                  2. ثنائي الأكسجين (O₂)
                </div>
                <div className="text-[10px] font-mono">
                  {elements.oxidizer ? '✓ متوفر (انقر للإزالة)' : '✗ مُزال (انقر للإعادة)'}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 3 Interactive Element Control Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold text-[#4A4A4A] mb-1">
            تحكم في أضلاع مثلث الاحتراق الثلاثة (انقر للإزالة أو الإعادة):
          </div>

          {/* Card 1 : الكربون C */}
          <button
            type="button"
            onClick={() => toggleElement('combustible')}
            className={`w-full text-right p-3 rounded-[12px] border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
              elements.combustible
                ? 'bg-white border-[#0F766E] shadow-xs'
                : 'bg-slate-100/80 border-dashed border-slate-300 opacity-80'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#0F766E]">
                  1. المادة القابلة للاحتراق : الكربون
                </span>
                <ChemicalFormula formula="C" size="sm" />
              </div>
              <p className="text-[11px] text-[#6B6B6B]">
                Combustible — قطعة الفحم التي تحترق
              </p>
            </div>
            <span
              className={`px-2.5 py-1 rounded-[8px] text-xs font-bold shrink-0 flex items-center gap-1 ${
                elements.combustible
                  ? 'bg-[#0F766E]/10 text-[#0F766E]'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {elements.combustible ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>حاضر (إزالة)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5" />
                  <span>مُزال (إعادة)</span>
                </>
              )}
            </span>
          </button>

          {/* Card 2 : ثنائي الأكسجين O₂ */}
          <button
            type="button"
            onClick={() => toggleElement('oxidizer')}
            className={`w-full text-right p-3 rounded-[12px] border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
              elements.oxidizer
                ? 'bg-white border-sky-600 shadow-xs'
                : 'bg-slate-100/80 border-dashed border-slate-300 opacity-80'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-sky-700">
                  2. المؤكسد : ثنائي الأكسجين
                </span>
                <ChemicalFormula formula="O2" size="sm" />
              </div>
              <p className="text-[11px] text-[#6B6B6B]">
                Comburant — الغاز الموجود في الهواء والضروري للاحتراق
              </p>
            </div>
            <span
              className={`px-2.5 py-1 rounded-[8px] text-xs font-bold shrink-0 flex items-center gap-1 ${
                elements.oxidizer
                  ? 'bg-sky-100 text-sky-800'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {elements.oxidizer ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>حاضر (إزالة)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5" />
                  <span>مُزال (إعادة)</span>
                </>
              )}
            </span>
          </button>

          {/* Card 3 : طاقة التنشيط */}
          <button
            type="button"
            onClick={() => toggleElement('energy')}
            className={`w-full text-right p-3 rounded-[12px] border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
              elements.energy
                ? 'bg-white border-amber-500 shadow-xs'
                : 'bg-slate-100/80 border-dashed border-slate-300 opacity-80'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-amber-800">
                  3. طاقة التنشيط : التسخين / اللهب 🔥
                </span>
              </div>
              <p className="text-[11px] text-[#6B6B6B]">
                Énergie d’activation — الحرارة الابتدائية لإشعال الكربون
              </p>
            </div>
            <span
              className={`px-2.5 py-1 rounded-[8px] text-xs font-bold shrink-0 flex items-center gap-1 ${
                elements.energy
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {elements.energy ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>حاضرة (إزالة)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5" />
                  <span>مُزالة (إعادة)</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Dynamic Observation & Scientific Explanation Box */}
      <div
        className={`p-3.5 sm:p-4 rounded-[12px] border-2 transition-all duration-300 space-y-2 ${
          diagnostic.tone === 'burning'
            ? 'bg-[#F0FDFA] border-[#0F766E]/40 text-[#4A4A4A]'
            : 'bg-rose-50/70 border-rose-300 text-[#4A4A4A]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h5
            className={`text-xs sm:text-sm font-bold ${
              diagnostic.tone === 'burning' ? 'text-[#0F766E]' : 'text-rose-800'
            }`}
          >
            {diagnostic.title}
          </h5>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-white border border-[#E2D9D0]">
            النتيجة التجريبية الفورية
          </span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-[#4A4A4A]">
          {diagnostic.description}
        </p>
        <div className="pt-2 border-t border-black/10 text-xs font-bold text-[#0F766E]">
          💡 {diagnostic.realLifeApplication}
        </div>
      </div>
        </div>
      )}
    </div>
  );
};
