import React from 'react';
import { SvtSchemaOrFigure } from '../../typesSvt';

export const SvtSchemaRenderer: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  switch (schema.type) {
    case 'seismic-focus-epicenter':
    case 'seismic-foyer-epicenter':
      return <SeismicFoyerEpicenterDiagram schema={schema} />;
    case 'seismogram-waves':
      return <SeismogramWavesDiagram schema={schema} />;
    case 'seismic-intensity-scale':
      return <SeismicIntensityScaleDiagram schema={schema} />;
    case 'seismic-summary-mechanism':
      return <SeismicSummaryMechanismDiagram schema={schema} />;
    case 'strata-fold-fault':
      return <StrataFoldFaultDiagram schema={schema} />;
    default:
      if (schema.imageSrc) {
        return (
          <div className="my-3 rounded-[12px] overflow-hidden border border-[#E2D9D0] bg-[#FAF7F4] p-3 text-center">
            <img
              src={schema.imageSrc}
              alt={schema.titleArabic}
              className="max-h-[380px] w-auto mx-auto rounded-[8px]"
            />
            {schema.caption && (
              <p className="mt-2 text-xs text-[#6B6B6B]">{schema.caption}</p>
            )}
          </div>
        );
      }
      return null;
  }
};

/**
 * 1. المخطط العلمي الدقيق لآلية حدوث الزلزال:
 * البؤرة (Le foyer) · المركز السطحي (L'épicentre) · الفالق (La faille) · انتشار الموجات الزلزالية
 */
const SeismicFoyerEpicenterDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div className="my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-3 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B45309] animate-pulse" />
          <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            {schema.titleArabic || 'رسم تخطيطي لآلية حدوث الزلزال وانتشار الموجات الزلزالية'}
          </h4>
        </div>
        {schema.titleFrench && (
          <span
            dir="ltr"
            className="text-xs font-mono font-bold text-[#B45309] bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
          >
            {schema.titleFrench}
          </span>
        )}
      </div>

      {/* SVG Diagram Canvas */}
      <div className="w-full overflow-x-auto bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] p-2 sm:p-3 flex items-center justify-center">
        <svg
          viewBox="0 0 760 420"
          className="w-full max-w-[720px] h-auto select-none"
          role="img"
          aria-label={schema.titleArabic}
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>

            <linearGradient id="crustGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4A373" />
              <stop offset="40%" stopColor="#CCD5AE" />
              <stop offset="100%" stopColor="#B08968" />
            </linearGradient>

            <linearGradient id="crustGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C59B6D" />
              <stop offset="40%" stopColor="#B5C096" />
              <stop offset="100%" stopColor="#9C7756" />
            </linearGradient>

            <radialGradient id="foyerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
              <stop offset="45%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </radialGradient>

            <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Sky background */}
          <rect x="20" y="20" width="720" height="90" rx="8" fill="url(#skyGrad)" />

          {/* Ground surface line */}
          <line x1="20" y1="110" x2="740" y2="110" stroke="#78350F" strokeWidth="3" />

          {/* Left Block (Footwall) */}
          <polygon
            points="20,110 390,110 320,380 20,380"
            fill="url(#crustGrad1)"
            stroke="#5A3A1E"
            strokeWidth="1.5"
          />

          {/* Right Block (Hanging wall displaced along fault) */}
          <polygon
            points="390,110 740,110 740,380 320,380"
            fill="url(#crustGrad2)"
            stroke="#5A3A1E"
            strokeWidth="1.5"
          />

          {/* Fault line (خط الفالق المائل) */}
          <line
            x1="390"
            y1="110"
            x2="320"
            y2="380"
            stroke="#DC2626"
            strokeWidth="4"
            strokeDasharray="6 4"
          />

          {/* Concentric seismic waves radiating from Foyer */}
          <ellipse cx="350" cy="270" rx="45" ry="35" fill="none" stroke="#F97316" strokeWidth="2.5" strokeDasharray="5 3" />
          <ellipse cx="350" cy="270" rx="90" ry="70" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6 4" opacity="0.8" />
          <ellipse cx="350" cy="270" rx="145" ry="110" fill="none" stroke="#FB923C" strokeWidth="1.8" strokeDasharray="7 5" opacity="0.65" />
          <ellipse cx="350" cy="270" rx="210" ry="160" fill="none" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.5" />

          {/* The Foyer sismique (البؤرة) */}
          <circle cx="350" cy="270" r="28" fill="url(#foyerGlow)" />
          <circle cx="350" cy="270" r="8" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />

          {/* Vertical projection line from Foyer to Epicenter */}
          <line
            x1="350"
            y1="270"
            x2="350"
            y2="110"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />

          {/* The Epicenter on surface (المركز السطحي) */}
          <circle cx="350" cy="110" r="9" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="350" cy="110" r="18" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.7" />

          {/* Buildings on the surface: heavy damage at epicenter, minor far away */}
          {/* Epicenter damaged buildings */}
          <g transform="translate(330, 75)">
            <rect x="0" y="0" width="18" height="35" fill="#64748B" rx="1" />
            <polygon points="20,10 38,35 18,35" fill="#475569" />
            {/* Crack on building */}
            <path d="M9,2 L7,14 L12,22 L8,35" stroke="#EF4444" strokeWidth="1.5" fill="none" />
            <text x="20" y="-8" fill="#DC2626" fontSize="10" fontWeight="bold" textAnchor="middle">
              دمار أقصى 💥
            </text>
          </g>

          {/* Medium distance buildings */}
          <g transform="translate(480, 80)">
            <rect x="0" y="0" width="22" height="30" fill="#94A3B8" rx="1" />
            <rect x="25" y="5" width="18" height="25" fill="#CBD5E1" rx="1" />
            <text x="20" y="-6" fill="#D97706" fontSize="10" fontWeight="bold" textAnchor="middle">
              أضرار متوسطة
            </text>
          </g>

          {/* Far distance buildings */}
          <g transform="translate(630, 82)">
            <rect x="0" y="0" width="24" height="28" fill="#CBD5E1" rx="1" />
            <rect x="28" y="10" width="18" height="20" fill="#E2E8F0" rx="1" />
            <text x="25" y="-6" fill="#16A34A" fontSize="10" fontWeight="bold" textAnchor="middle">
              هزات خفيفة
            </text>
          </g>

          {/* Far left buildings */}
          <g transform="translate(80, 82)">
            <rect x="0" y="0" width="24" height="28" fill="#CBD5E1" rx="1" />
            <text x="12" y="-6" fill="#16A34A" fontSize="10" fontWeight="bold" textAnchor="middle">
              شعور ضعيف
            </text>
          </g>

          {/* Depth indicator (العمق البؤري) */}
          <g transform="translate(50, 110)">
            <line x1="15" y1="0" x2="15" y2="160" stroke="#334155" strokeWidth="1.5" />
            <polyline points="10,5 15,0 20,5" fill="none" stroke="#334155" strokeWidth="1.5" />
            <polyline points="10,155 15,160 20,155" fill="none" stroke="#334155" strokeWidth="1.5" />
            <text x="22" y="85" fill="#1E293B" fontSize="10.5" fontWeight="bold">
              العمق البؤري
            </text>
          </g>

          {/* Callout Box 1: المركز السطحي (Épicentre) */}
          <g transform="translate(200, 35)">
            <rect x="0" y="0" width="125" height="34" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.5" filter="url(#shadow)" />
            <text x="62" y="16" fill="#1E40AF" fontSize="11" fontWeight="bold" textAnchor="middle">
              المركز السطحي
            </text>
            <text x="62" y="28" fill="#3B82F6" fontSize="9" fontStyle="italic" textAnchor="middle">
              (Épicentre)
            </text>
            <path d="M125,17 L145,55" stroke="#2563EB" strokeWidth="1.5" fill="none" />
          </g>

          {/* Callout Box 2: البؤرة (Foyer / Hypocentre) — entièrement dans le cadre */}
          <g transform="translate(80, 245)">
            <rect x="0" y="0" width="145" height="46" rx="8" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.5" filter="url(#shadow)" />
            <text x="72" y="18" fill="#991B1B" fontSize="11" fontWeight="bold" textAnchor="middle">
              البؤرة الزلزالية
            </text>
            <text x="72" y="30" fill="#EF4444" fontSize="9" fontStyle="italic" textAnchor="middle">
              (Foyer sismique)
            </text>
            <text x="72" y="41" fill="#7F1D1D" fontSize="8" textAnchor="middle">
              مكان انكسار الصخور الأولي
            </text>
          </g>
          {/* Ligne de rappel de la boîte du foyer vers le foyer sismique */}
          <line x1="225" y1="268" x2="340" y2="270" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="4 3" />

          {/* Callout Box 3: خط الفالق (Ligne de faille) */}
          <g transform="translate(470, 335)">
            <rect x="0" y="0" width="130" height="34" rx="8" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" filter="url(#shadow)" />
            <text x="65" y="16" fill="#92400E" fontSize="11" fontWeight="bold" textAnchor="middle">
              خط الفالق (Faille)
            </text>
            <text x="65" y="28" fill="#B45309" fontSize="9" textAnchor="middle">
              كسر في الطبقات الصخرية
            </text>
            <path d="M0,17 L-100,10" stroke="#B45309" strokeWidth="1.5" fill="none" />
          </g>

          {/* Callout Box 4: الموجات الزلزالية (Ondes sismiques) */}
          <g transform="translate(540, 200)">
            <rect x="0" y="0" width="160" height="34" rx="8" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.5" filter="url(#shadow)" />
            <text x="80" y="16" fill="#9A3412" fontSize="11" fontWeight="bold" textAnchor="middle">
              الموجات الزلزالية (Ondes)
            </text>
            <text x="80" y="28" fill="#EA580C" fontSize="9" textAnchor="middle">
              تنتشر كروياً في كل الاتجاهات
            </text>
            <path d="M0,17 L-50,0" stroke="#EA580C" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      </div>

      {/* Explanatory Key Notes (البيانات العلمية الرئيسية) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 text-xs">
        <div className="p-2.5 rounded-[10px] bg-red-50 border border-red-200">
          <div className="font-bold text-red-900">1. البؤرة (Foyer) :</div>
          <p className="text-red-800 text-[11px] mt-0.5 leading-relaxed">
            موقع في عمق الأرض يحدث فيه الكسر المفاجئ للصخور وتتحرر منه الطاقة المخزنة.
          </p>
        </div>

        <div className="p-2.5 rounded-[10px] bg-blue-50 border border-blue-200">
          <div className="font-bold text-blue-900">2. المركز السطحي (Épicentre) :</div>
          <p className="text-blue-800 text-[11px] mt-0.5 leading-relaxed">
            المنطقة السطحية العمودية تماماً فوق البؤرة، تسجل فيها أكبر شدة وخسائر.
          </p>
        </div>

        <div className="p-2.5 rounded-[10px] bg-orange-50 border border-orange-200">
          <div className="font-bold text-orange-900">3. الموجات الزلزالية (Ondes) :</div>
          <p className="text-orange-800 text-[11px] mt-0.5 leading-relaxed">
            اهتزازات ميكانيكية تنطلق من البؤرة وتنتشر في جميع الاتجاهات بسرعة فائقة.
          </p>
        </div>

        <div className="p-2.5 rounded-[10px] bg-amber-50 border border-amber-200">
          <div className="font-bold text-amber-900">4. الفالق (Faille) :</div>
          <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
            شق أو انكسار في القشرة الأرضية يؤدي إلى إزاحة نسبيّة للكتلتين الصخريتين.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. التسجيل الزلزالي (السيسموغرام) ومسجل الزلازل (السيسموغراف)
 * مطابق لمنهاج السنة الثالثة متوسط (ص 13 من الكتاب المدرسي) دون إدراج أمواج P و S و L
 */
const SeismogramWavesDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div className="my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-3 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
          {schema.titleArabic || 'مسجل الزلازل (السيسموغراف) والسجل الزلزالي (السيسموغرام)'}
        </h4>
        <span
          dir="ltr"
          className="text-xs font-mono font-bold text-[#0369A1] bg-sky-50 px-2 py-0.5 rounded border border-sky-200"
        >
          {schema.titleFrench || 'Sismographe et sismogramme (Enregistrement sismique)'}
        </span>
      </div>

      <div className="w-full overflow-x-auto bg-[#0F172A] rounded-[12px] p-4 text-white">
        <svg viewBox="0 0 720 220" className="w-full max-w-[700px] h-auto mx-auto select-none">
          {/* Grid lines */}
          <g stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3">
            <line x1="40" y1="40" x2="680" y2="40" />
            <line x1="40" y1="110" x2="680" y2="110" stroke="#64748B" strokeWidth="1.2" strokeDasharray="none" />
            <line x1="40" y1="180" x2="680" y2="180" />
            <line x1="160" y1="30" x2="160" y2="190" />
            <line x1="380" y1="30" x2="380" y2="190" />
            <line x1="560" y1="30" x2="560" y2="190" />
          </g>

          {/* Time axis */}
          <line x1="40" y1="190" x2="680" y2="190" stroke="#94A3B8" strokeWidth="2" />
          <text x="360" y="210" fill="#94A3B8" fontSize="11" textAnchor="middle">
            محور الزمن (ثواني / دقائق) ⟶
          </text>

          {/* Pre-event flat line */}
          <path d="M40,110 L150,110" stroke="#38BDF8" strokeWidth="2" fill="none" />
          <text x="95" y="95" fill="#94A3B8" fontSize="10" textAnchor="middle">قبل وصول الهزة</text>

          {/* Earthquake trace (Progressive arrival and smoothly damped amplitudes without jagged teeth) */}
          <path
            d="M150,110 Q154,107 158,110 T166,110 Q172,104 178,110 T190,110 Q198,100 206,110 T222,110 Q232,92 242,110 T262,110 Q274,80 286,110 T310,110 Q324,62 338,110 T366,110 Q380,45 394,110 T422,110 Q434,58 446,110 T470,110 Q482,75 494,110 T518,110 Q528,88 538,110 T558,110 Q568,98 578,110 T598,110 Q606,104 614,110 T630,110 Q638,107 646,110 T662,110 Q668,109 674,110 L680,110"
            stroke="#F59E0B"
            strokeWidth="2.2"
            fill="none"
          />

          {/* Amplitude Arrow Indicator */}
          <g transform="translate(350, 20)">
            <line x1="0" y1="15" x2="0" y2="165" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="0" y="5" fill="#FCA5A5" fontSize="10" fontWeight="bold" textAnchor="middle">
              سعة الاهتزاز (Amplitude)
            </text>
          </g>

          {/* Arrival mark */}
          <g transform="translate(150, 30)">
            <line x1="0" y1="10" x2="0" y2="80" stroke="#10B981" strokeWidth="2" />
            <text x="10" y="25" fill="#6EE7B7" fontSize="10" fontWeight="bold">
              بداية تسجيل الهزة
            </text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-[10px] bg-sky-50 border border-sky-200">
          <div className="font-bold text-sky-900">1. مسجل الزلازل (السيسموغراف - Sismographe) :</div>
          <p className="text-sky-800 text-[11.5px] mt-0.5 leading-relaxed">
            هو <strong>الجهاز العلمي</strong> المخصص لرصد الاهتزازات الأرضية الدقيقة وتسجيل حركتها بدقة.
          </p>
        </div>

        <div className="p-3 rounded-[10px] bg-amber-50 border border-amber-200">
          <div className="font-bold text-amber-900">2. السجل الزلزالي (السيسموغرام - Sismogramme) :</div>
          <p className="text-amber-800 text-[11.5px] mt-0.5 leading-relaxed">
            هو <strong>المنحنى البياني الناتج</strong> عن الجهاز، ويبين تغير سعة حركة الأرض مع مرور الزمن.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. المقارنة العلمية بين سلم الشدة (MSK) وسلم المقدار (Richter)
 */
const SeismicIntensityScaleDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div
      id="sec-svt-richter-msk"
      data-atomic-block="true"
      className="pdf-atomic-block my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
          {schema.titleArabic || 'التمييز بين شدة الزلزال (سلم MSK) ومقدار الزلزال (سلم ريشتر)'}
        </h4>
        <span
          dir="ltr"
          className="text-xs font-mono font-bold text-[#B45309] bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
        >
          {schema.titleFrench || 'Intensité (MSK) vs Magnitude (Richter)'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scale 1: MSK Intensity */}
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border-2 border-amber-300 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-[6px]">
              سلم الشدة (Intensité)
            </span>
            <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              سلم MSK (12 درجة)
            </span>
          </div>
          <h5 className="text-sm font-bold text-[#4A4A4A]">يقيس الآثار والخسائر الملاحظة في مكان معين</h5>
          <ul className="space-y-1.5 text-xs text-[#4A4A4A] list-disc pr-4 leading-relaxed">
            <li>يعتمد على ملاحظة شعور السكان وتقدير حجم الأضرار في المنشآت.</li>
            <li>يُعبَّر عنه بالأرقام الرومانية (من I إلى XII).</li>
            <li><strong>يتغير حسب المكان :</strong> تتناقص الشدة كلما ابتعدنا عن المركز السطحي.</li>
            <li>تُمثَّل مناطقه بخطوط متساوية الشدة (Courbes isoséistes).</li>
          </ul>
        </div>

        {/* Scale 2: Richter Magnitude */}
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border-2 border-emerald-300 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-[6px]">
              سلم المقدار (Magnitude)
            </span>
            <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              سلم ريشتر (Richter)
            </span>
          </div>
          <h5 className="text-sm font-bold text-[#4A4A4A]">يقيس الطاقة المحررة في بؤرة الزلزال</h5>
          <ul className="space-y-1.5 text-xs text-[#4A4A4A] list-disc pr-4 leading-relaxed">
            <li>يُقدَّر انطلاقاً من تسجيلات أجهزة قياس الزلازل (السيسموغراف).</li>
            <li>يُعبَّر عنه بقيمة رقمية (مثل: زلزال زموري، 2003، المقدار 6.6).</li>
            <li><strong>مقدار الزلزال :</strong> لكل زلزال مقدار واحد يتعلق بمصدره، ولا يتغير من منطقة إلى أخرى.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. تشوهات الطبقات الصخرية : الفوالق والطيات
 */
const StrataFoldFaultDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div className="my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
          {schema.titleArabic || 'تشوهات القشرة الأرضية: الفرق بين الطيات (الصخور المرنة) والفوالق (الصخور الصلبة)'}
        </h4>
        <span
          dir="ltr"
          className="text-xs font-mono font-bold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
        >
          {schema.titleFrench || 'Déformations tectoniques : Plis vs Failles'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Plis */}
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2 text-center">
          <div className="text-xs font-bold text-[#15803D]">1. الطيَّات (Les Plis) · صخور مرنة</div>
          <svg viewBox="0 0 300 120" className="w-full h-auto select-none">
            <path d="M10,80 Q75,20 150,80 T290,80" stroke="#047857" strokeWidth="8" fill="none" />
            <path d="M10,95 Q75,35 150,95 T290,95" stroke="#D97706" strokeWidth="8" fill="none" />
            <path d="M10,110 Q75,50 150,110 T290,110" stroke="#78350F" strokeWidth="8" fill="none" />
            <text x="75" y="15" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">طية محدبة</text>
            <text x="225" y="115" fill="#B45309" fontSize="10" fontWeight="bold" textAnchor="middle">طية مقعرة</text>
          </svg>
          <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
            انثناء الطبقات الصخرية اللدنة أو المرنة مشكّلة طيّات متتالية دون حدوث انكسار.
          </p>
        </div>

        {/* Failles */}
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2 text-center">
          <div className="text-xs font-bold text-[#B45309]">2. الفوالق (Les Failles) · صخور صلبة وقابلة للكسر</div>
          <svg viewBox="0 0 300 120" className="w-full h-auto select-none">
            <polygon points="20,40 140,40 110,110 20,110" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
            <polygon points="150,55 280,55 280,110 120,110" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
            <line x1="140" y1="35" x2="110" y2="115" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 3" />
            <text x="125" y="25" fill="#DC2626" fontSize="10" fontWeight="bold" textAnchor="middle">مستوى الفالق</text>
            <text x="60" y="75" fill="#1E293B" fontSize="9" fontWeight="bold">كتلة مرفوعة</text>
            <text x="210" y="85" fill="#1E293B" fontSize="9" fontWeight="bold">كتلة خافضة</text>
          </svg>
          <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
            انكسار الصخور الصلبة مصحوباً بإزاحة نسبيّة للكتلتين، وهي المنشأ الأساسي لأغلب الزلازل.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 5. المخطط العلمي التركيبي لخاصيات الزلزال (خاص بكتلة "أحتفظ بالأهم")
 * يجمع: البؤرة، المركز السطحي، الفالق، الأمواج الزلزالية، مسجل الزلازل والسجل الزلزالي
 */
export const SeismicSummaryMechanismDiagram: React.FC<{ schema?: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div className="my-3 bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
          <h4 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
            {schema?.titleArabic || 'مخطط تركيبي شامل : البؤرة، المركز السطحي، الفالق، انتشار الأمواج والتسجيل الزلزالي'}
          </h4>
        </div>
        <span
          dir="ltr"
          className="text-[11px] font-mono font-bold text-[#B45309] bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
        >
          {schema?.titleFrench || 'Schéma-bilan : Foyer, épicentre, ondes, faille et enregistrement'}
        </span>
      </div>

      <div className="w-full overflow-x-auto bg-[#FAF7F4] rounded-[10px] border border-[#E2D9D0] p-2 flex items-center justify-center">
        <svg viewBox="0 0 740 320" className="w-full max-w-[700px] h-auto select-none" role="img">
          <defs>
            <linearGradient id="sumSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#F0F9FF" />
            </linearGradient>
            <linearGradient id="sumRock1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4A373" />
              <stop offset="100%" stopColor="#A98467" />
            </linearGradient>
            <linearGradient id="sumRock2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C59B6D" />
              <stop offset="100%" stopColor="#8C6A4E" />
            </linearGradient>
            <radialGradient id="sumGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky and Ground */}
          <rect x="20" y="15" width="700" height="75" rx="6" fill="url(#sumSky)" />
          <line x1="20" y1="90" x2="720" y2="90" stroke="#78350F" strokeWidth="2.5" />

          {/* Rock strata (left & right separated by fault) */}
          <polygon points="20,90 380,90 310,300 20,300" fill="url(#sumRock1)" stroke="#5A3A1E" strokeWidth="1.2" />
          <polygon points="380,90 720,90 720,300 310,300" fill="url(#sumRock2)" stroke="#5A3A1E" strokeWidth="1.2" />

          {/* Fault Line */}
          <line x1="380" y1="90" x2="310" y2="300" stroke="#DC2626" strokeWidth="3" strokeDasharray="5 4" />
          <g transform="translate(195, 258)">
            <rect x="0" y="0" width="95" height="24" rx="5" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1" />
            <text x="47" y="16" fill="#991B1B" fontSize="10.5" fontWeight="bold" textAnchor="middle">
              الفالق (Faille)
            </text>
          </g>
          {/* Ligne de rappel vers la faille */}
          <line x1="290" y1="270" x2="318" y2="270" stroke="#DC2626" strokeWidth="1.5" />

          {/* Concentric seismic waves from Foyer */}
          <circle cx="345" cy="200" r="35" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="345" cy="200" r="75" fill="none" stroke="#F97316" strokeWidth="1.8" strokeDasharray="5 4" opacity="0.8" />
          <circle cx="345" cy="200" r="120" fill="none" stroke="#FB923C" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
          <circle cx="345" cy="200" r="175" fill="none" stroke="#FDBA74" strokeWidth="1.2" strokeDasharray="7 5" opacity="0.4" />

          {/* Foyer (البؤرة) */}
          <circle cx="345" cy="200" r="22" fill="url(#sumGlow)" />
          <circle cx="345" cy="200" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <g transform="translate(40, 178)">
            <rect x="0" y="0" width="145" height="44" rx="6" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.2" />
            <text x="72" y="17" fill="#991B1B" fontSize="11" fontWeight="bold" textAnchor="middle">
              البؤرة (Foyer)
            </text>
            <text x="72" y="34" fill="#7F1D1D" fontSize="9" textAnchor="middle">
              موقع داخل الأرض تنشأ فيه الأمواج
            </text>
          </g>
          {/* Ligne de rappel horizontale propre et sans croisement vers le foyer */}
          <line x1="185" y1="200" x2="315" y2="200" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Vertical line to Epicenter */}
          <line x1="345" y1="200" x2="345" y2="90" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 3" />

          {/* Epicenter (المركز السطحي) */}
          <circle cx="345" cy="90" r="8" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
          <g transform="translate(240, 12)">
            <rect x="0" y="0" width="195" height="40" rx="6" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1.2" />
            <text x="97" y="16" fill="#1E40AF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
              المركز السطحي (Épicentre)
            </text>
            <text x="97" y="31" fill="#1D4ED8" fontSize="8.5" textAnchor="middle">
              عمودياً فوق البؤرة · المنطقة الأكثر تضرراً
            </text>
            <line x1="97" y1="40" x2="97" y2="82" stroke="#2563EB" strokeWidth="1.2" />
          </g>

          {/* Damaged buildings at Epicenter */}
          <g transform="translate(385, 62)">
            <rect x="0" y="5" width="14" height="23" fill="#475569" />
            <path d="M7,5 L4,14 L10,20 L6,28" stroke="#EF4444" strokeWidth="1.2" fill="none" />
            <polygon points="16,10 30,28 14,28" fill="#64748B" />
          </g>

          {/* Waves callout */}
          <g transform="translate(480, 185)">
            <rect x="0" y="0" width="175" height="40" rx="6" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.2" />
            <text x="87" y="16" fill="#9A3412" fontSize="10" fontWeight="bold" textAnchor="middle">
              الأمواج الزلزالية (Ondes sismiques)
            </text>
            <text x="87" y="31" fill="#C2410C" fontSize="8.5" textAnchor="middle">
              تنتشر من البؤرة في جميع الاتجاهات
            </text>
            <line x1="0" y1="20" x2="-60" y2="15" stroke="#EA580C" strokeWidth="1.2" strokeDasharray="3 2" />
          </g>

          {/* Seismic Station / Sismographe & Sismogramme — Séparation physique absolue */}
          <g transform="translate(540, 6)">
            {/* Boîte principale du sismographe */}
            <rect x="0" y="0" width="170" height="82" rx="7" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.3" />
            <text x="85" y="14" fill="#0369A1" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              مسجل الزلازل (الجهاز)
            </text>
            
            {/* Cadre 1 : Ruban d'enregistrement de l'onde */}
            <rect x="8" y="20" width="154" height="26" rx="4" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="0.9" />
            <path d="M12,33 L34,33 Q39,28 44,33 T54,33 T64,27 T74,38 T84,28 T94,37 T104,30 L156,33" stroke="#0284C7" strokeWidth="1.5" fill="none" />
            
            {/* Cadre 2 : Cartouche dédié pour le libellé du résultat, strictement isolé du tracé */}
            <rect x="8" y="52" width="154" height="22" rx="4" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="0.8" />
            <text x="85" y="66" fill="#0C4A6E" fontSize="9" fontWeight="bold" textAnchor="middle">
              السجل الزلزالي: المنحنى الناتج
            </text>
            
            <line x1="85" y1="82" x2="85" y2="90" stroke="#0284C7" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-[8px] bg-red-50 border border-red-200">
          <span className="font-bold text-red-900 block text-[11px]">البؤرة</span>
          <span className="text-[10px] text-red-800">تنشأ فيها الأمواج</span>
        </div>
        <div className="p-2 rounded-[8px] bg-blue-50 border border-blue-200">
          <span className="font-bold text-blue-900 block text-[11px]">المركز السطحي</span>
          <span className="text-[10px] text-blue-800">الأكثر تضرراً</span>
        </div>
        <div className="p-2 rounded-[8px] bg-orange-50 border border-orange-200">
          <span className="font-bold text-orange-900 block text-[11px]">الأمواج الزلزالية</span>
          <span className="text-[10px] text-orange-800">في جميع الاتجاهات</span>
        </div>
        <div className="p-2 rounded-[8px] bg-sky-50 border border-sky-200">
          <span className="font-bold text-sky-900 block text-[11px]">مسجل الزلازل</span>
          <span className="text-[10px] text-sky-800">يسجل الاهتزازات</span>
        </div>
      </div>
    </div>
  );
};
