import React from 'react';
import { SvtSchemaOrFigure } from '../../typesSvt';
import earthCrossSectionImg from '../../assets/images/earthquake_geological_cross_section_1793264786256.jpg';
import seismographDrumImg from '../../assets/images/seismograph_recording_drum_1793264786431.jpg';

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
 * 1. المخطط العلمي الواقعي لآلية حدوث الزلزال (الصفحة 6):
 * صورة جيولوجية ثلاثية الأبعاد واقعية مع طبقات SVG تفاعلية لتعيين:
 * - المركز السطحي (شاقولياً فوق البؤرة)
 * - البؤرة (في باطن الأرض)
 * - الفالق (مستوى الكسر والإزاحة)
 * - الأمواج الزلزالية (تنتشر كروياً)
 * - مسجل الزلازل (محطة الرصد)
 */
const SeismicFoyerEpicenterDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div
      id="sec-svt-foyer-epicenter"
      data-atomic-block="true"
      className="pdf-atomic-block my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-3 sm:p-5 space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B45309] animate-pulse" />
          <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            {schema.titleArabic || 'مخطط جيولوجي علمي واقعي : البؤرة، المركز السطحي، الفالق وانتشار الأمواج'}
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

      {/* Realistic 3D Geological Cross-Section with SVG Overlay */}
      <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden border border-[#E2D9D0] bg-[#1E293B] shadow-sm select-none">
        <img
          src={earthCrossSectionImg}
          alt="مقطع جيولوجي علمي واقعي يوضح طبقات الأرض والبؤرة والمركز السطحي والفالق"
          className="w-full h-full object-cover"
        />

        {/* SVG Callouts & Markers Overlay */}
        <svg
          viewBox="0 0 1000 562.5"
          className="absolute inset-0 w-full h-full pointer-events-none"
          role="presentation"
        >
          <defs>
            <filter id="badgeShadowFoyer" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* 1. المركز السطحي (Épicentre) — au-dessus du foyer sur la surface */}
          <circle cx="490" cy="180" r="8" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="490" cy="180" r="16" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
          <path d="M360,82 L482,174" stroke="#2563EB" strokeWidth="2.2" strokeDasharray="4 3" />
          <g transform="translate(190, 40)" filter="url(#badgeShadowFoyer)">
            <rect x="0" y="0" width="185" height="46" rx="8" fill="#FFFFFF" fillOpacity="0.96" stroke="#2563EB" strokeWidth="2" />
            <text x="92" y="20" fill="#1E40AF" fontSize="13.5" fontWeight="bold" textAnchor="middle">
              المركز السطحي (Épicentre)
            </text>
            <text x="92" y="36" fill="#1D4ED8" fontSize="10.5" fontWeight="semibold" textAnchor="middle">
              عمودياً فوق البؤرة · المنطقة الأكثر تضرراً
            </text>
          </g>

          {/* Trait d'alignement vertical rigoureux entre la البؤرة et le المركز السطحي */}
          <line x1="490" y1="360" x2="490" y2="190" stroke="#2563EB" strokeWidth="2.2" strokeDasharray="5 4" opacity="0.9" />
          <g transform="translate(500, 275)" filter="url(#badgeShadowFoyer)">
            <rect x="0" y="0" width="105" height="22" rx="4" fill="#EFF6FF" fillOpacity="0.92" stroke="#3B82F6" strokeWidth="1" />
            <text x="52" y="15" fill="#1E3A8A" fontSize="10" fontWeight="bold" textAnchor="middle">
              شاقولياً (عمودياً)
            </text>
          </g>

          {/* 2. البؤرة الزلزالية (Foyer sismique) — en profondeur */}
          <circle cx="490" cy="365" r="10" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="490" cy="365" r="22" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeDasharray="4 3" opacity="0.8" />
          <line x1="225" y1="365" x2="475" y2="365" stroke="#DC2626" strokeWidth="2.2" strokeDasharray="4 3" />
          <g transform="translate(40, 340)" filter="url(#badgeShadowFoyer)">
            <rect x="0" y="0" width="185" height="48" rx="8" fill="#FFFFFF" fillOpacity="0.96" stroke="#DC2626" strokeWidth="2" />
            <text x="92" y="21" fill="#991B1B" fontSize="14" fontWeight="bold" textAnchor="middle">
              البؤرة (Foyer sismique)
            </text>
            <text x="92" y="38" fill="#B91C1C" fontSize="10.5" fontWeight="semibold" textAnchor="middle">
              موقع انطلاق الأمواج في باطن الأرض
            </text>
          </g>

          {/* 3. خط الفالق (Faille géologique) — plan de fracture */}
          <path d="M720,445 L550,380" stroke="#B45309" strokeWidth="2" strokeDasharray="4 3" />
          <g transform="translate(710, 420)" filter="url(#badgeShadowFoyer)">
            <rect x="0" y="0" width="180" height="46" rx="8" fill="#FFFFFF" fillOpacity="0.96" stroke="#B45309" strokeWidth="2" />
            <text x="90" y="20" fill="#92400E" fontSize="13.5" fontWeight="bold" textAnchor="middle">
              الفالق (Faille géologique)
            </text>
            <text x="90" y="36" fill="#78350F" fontSize="10.5" fontWeight="semibold" textAnchor="middle">
              مستوى كسر مع إزاحة الطبقات
            </text>
          </g>

          {/* 4. الأمواج الزلزالية (Ondes sismiques) */}
          <path d="M225,235 L350,295" stroke="#EA580C" strokeWidth="2" strokeDasharray="4 3" />
          <g transform="translate(45, 210)" filter="url(#badgeShadowFoyer)">
            <rect x="0" y="0" width="180" height="46" rx="8" fill="#FFFFFF" fillOpacity="0.96" stroke="#EA580C" strokeWidth="2" />
            <text x="90" y="20" fill="#9A3412" fontSize="13.5" fontWeight="bold" textAnchor="middle">
              الأمواج الزلزالية (Ondes)
            </text>
            <text x="90" y="36" fill="#C2410C" fontSize="10.5" fontWeight="semibold" textAnchor="middle">
              تنتشر كروياً في كل الاتجاهات
            </text>
          </g>

          {/* 5. مسجل الزلازل (Station sismique / Sismographe) */}
          <circle cx="785" cy="180" r="7" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="820" y1="90" x2="790" y2="172" stroke="#0284C7" strokeWidth="2" />
          <g transform="translate(720, 40)" filter="url(#badgeShadowFoyer)">
            <rect x="0" y="0" width="195" height="48" rx="8" fill="#FFFFFF" fillOpacity="0.96" stroke="#0284C7" strokeWidth="2" />
            <text x="97" y="21" fill="#0369A1" fontSize="13.5" fontWeight="bold" textAnchor="middle">
              مسجل الزلازل (Station)
            </text>
            <text x="97" y="38" fill="#075985" fontSize="10.5" fontWeight="semibold" textAnchor="middle">
              محطة رصد الاهتزازات السطحية
            </text>
          </g>
        </svg>
      </div>

      {/* Explanatory Key Notes (البيانات العلمية الرئيسية) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 text-xs">
        <div className="p-2.5 rounded-[10px] bg-red-50 border border-red-200">
          <div className="font-bold text-red-900">1. البؤرة (Foyer) :</div>
          <p className="text-red-800 text-[11px] mt-0.5 leading-relaxed">
            موقع في عمق الأرض تنشأ فيه الأمواج الزلزالية وتتحرر منه الطاقة المخزنة.
          </p>
        </div>

        <div className="p-2.5 rounded-[10px] bg-blue-50 border border-blue-200">
          <div className="font-bold text-blue-900">2. المركز السطحي (Épicentre) :</div>
          <p className="text-blue-800 text-[11px] mt-0.5 leading-relaxed">
            النقطة الواقعة على سطح الأرض عمودياً فوق البؤرة، وهي الأكثر تضرراً.
          </p>
        </div>

        <div className="p-2.5 rounded-[10px] bg-orange-50 border border-orange-200">
          <div className="font-bold text-orange-900">3. الأمواج الزلزالية (Ondes) :</div>
          <p className="text-orange-800 text-[11px] mt-0.5 leading-relaxed">
            اهتزازات تنتشر من البؤرة في جميع الاتجاهات عبر الطبقات الصخرية.
          </p>
        </div>

        <div className="p-2.5 rounded-[10px] bg-amber-50 border border-amber-200">
          <div className="font-bold text-amber-900">4. الفالق (Faille) :</div>
          <p className="text-amber-800 text-[11px] mt-0.5 leading-relaxed">
            كسر في الصخور الصلبة مصحوب بإزاحة نسبية للكتلتين الصخريتين.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. التسجيل الزلزالي (السيسموغرام) ومسجل الزلازل (السيسموغراف) (الصفحة 7)
 * يتضمن:
 * 1. صورة حقيقية لأسطوانة التسجيل (مسجل الزلازل وقلم التخطيط)
 * 2. رسم بياني رقمي نقي: خط أساسي مستوٍ قبل الهزة، وصول تدريجي، تصاعد إلى السعة القصوى ثم تخامد
 * 3. تدريجات زمن وسعة واضحة دون أي تداخل مع المنحنى
 */
const SeismogramWavesDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div
      id="sec-svt-seismogram"
      data-atomic-block="true"
      className="pdf-atomic-block my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-3 sm:p-5 space-y-4"
    >
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        {/* Photo réaliste de l'appareil (Sismographe à tambour) */}
        <div className="lg:col-span-5 rounded-[12px] overflow-hidden border border-[#E2D9D0] bg-[#FAF7F4] flex flex-col justify-between p-2.5">
          <div className="relative aspect-[4/3] rounded-[8px] overflow-hidden">
            <img
              src={seismographDrumImg}
              alt="صورة علمية واقعية لأسطوانة مسجل الزلازل وقلم تسجيل الاهتزازات على الورق"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs font-bold text-[#0369A1] block">
              مسجل الزلازل (السيسموغراف - Sismographe)
            </span>
            <span className="text-[11px] text-[#6B6B6B]">
              جهاز فيزيائي دقيق يرصد حركة الأرض ويسجلها ميكانيكياً أو رقمياً
            </span>
          </div>
        </div>

        {/* Tracé numérique du sismogramme (Sismogramme avec axes gradués et ligne de base propre) */}
        <div className="lg:col-span-7 bg-[#0F172A] rounded-[12px] p-3 sm:p-4 text-white flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#334155] pb-1.5 mb-2">
            <span className="text-xs font-bold text-[#38BDF8]">
              السجل الزلزالي (السيسموغرام - Sismogramme)
            </span>
            <span className="text-[10px] text-[#94A3B8]">
              تسجيل تغير سعة حركة الأرض بدلالة الزمن
            </span>
          </div>

          <svg viewBox="0 0 540 210" className="w-full h-auto select-none" role="img">
            {/* Grille de fond */}
            <g stroke="#1E293B" strokeWidth="1" strokeDasharray="2 3">
              <line x1="60" y1="35" x2="520" y2="35" />
              <line x1="60" y1="70" x2="520" y2="70" />
              <line x1="60" y1="140" x2="520" y2="140" />
              <line x1="60" y1="175" x2="520" y2="175" />
              <line x1="160" y1="25" x2="160" y2="185" />
              <line x1="260" y1="25" x2="260" y2="185" />
              <line x1="360" y1="25" x2="360" y2="185" />
              <line x1="460" y1="25" x2="460" y2="185" />
            </g>

            {/* Ligne médiane de référence (Zero) */}
            <line x1="60" y1="105" x2="520" y2="105" stroke="#334155" strokeWidth="1.2" />

            {/* Axe des amplitudes (à gauche, strictement sans chevauchement) */}
            <line x1="60" y1="25" x2="60" y2="185" stroke="#64748B" strokeWidth="1.5" />
            <text x="52" y="38" fill="#94A3B8" fontSize="9" textAnchor="end">+A max</text>
            <text x="52" y="108" fill="#64748B" fontSize="9" textAnchor="end">0</text>
            <text x="52" y="178" fill="#94A3B8" fontSize="9" textAnchor="end">-A max</text>

            {/* Axe des temps (en bas, gradué) */}
            <line x1="60" y1="185" x2="520" y2="185" stroke="#64748B" strokeWidth="1.5" />
            <text x="60" y="200" fill="#94A3B8" fontSize="9" textAnchor="middle">0 s</text>
            <text x="160" y="200" fill="#94A3B8" fontSize="9" textAnchor="middle">20 s</text>
            <text x="260" y="200" fill="#94A3B8" fontSize="9" textAnchor="middle">40 s</text>
            <text x="360" y="200" fill="#94A3B8" fontSize="9" textAnchor="middle">60 s</text>
            <text x="460" y="200" fill="#94A3B8" fontSize="9" textAnchor="middle">80 s</text>
            <text x="520" y="200" fill="#38BDF8" fontSize="9.5" textAnchor="end">الزمن (ثوانٍ) ⟶</text>

            {/* Tracé de base avant la secousse (ligne plate) */}
            <path d="M60,105 L150,105" stroke="#38BDF8" strokeWidth="2" fill="none" />

            {/* Tracé sismique réaliste : arrivée progressive, crescendo vers la plus grande amplitude, puis amortissement */}
            <path
              d="M150,105 Q154,101 158,105 T166,105 Q172,97 178,105 T190,105 Q198,90 206,105 T222,105 Q234,75 246,105 T270,105 Q285,55 300,105 T330,105 Q345,36 360,105 T390,105 Q405,58 420,105 T445,105 Q458,80 470,105 T490,105 Q500,96 508,105 L520,105"
              stroke="#F59E0B"
              strokeWidth="2.2"
              fill="none"
            />

            {/* Repère : Début de l'enregistrement */}
            <line x1="150" y1="25" x2="150" y2="105" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" />
            <g transform="translate(150, 18)">
              <rect x="-4" y="-12" width="95" height="18" rx="3" fill="#064E3B" stroke="#10B981" strokeWidth="0.8" />
              <text x="43" y="1" fill="#6EE7B7" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                بداية وصول الأمواج
              </text>
            </g>

            {/* Repère : السعة القصوى (Amplitude maximale) */}
            <line x1="345" y1="25" x2="345" y2="105" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <g transform="translate(345, 18)">
              <rect x="-4" y="-12" width="100" height="18" rx="3" fill="#7F1D1D" stroke="#EF4444" strokeWidth="0.8" />
              <text x="46" y="1" fill="#FCA5A5" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                أكبر سعة للاهتزاز
              </text>
            </g>

            {/* Repère : Amortissement progressif */}
            <g transform="translate(460, 85)">
              <text x="0" y="0" fill="#94A3B8" fontSize="8.5" textAnchor="middle">
                تخامد تدريجي ⟶
              </text>
            </g>
          </svg>
        </div>
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
            هو <strong>المنحنى البياني الناتج</strong> عن الجهاز، ويبين تغير سعة حركة الأرض مع مرور الزمن. الجهاز ليس هو التسجيل.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. المقارنة العلمية بين سلم الشدة (MSK) وسلم المقدار (Richter) (الصفحة 8)
 * مصممة في عمودين متوازيين متناسقين لتتسع على صفحة واحدة A4 دون أي انقطاع
 */
const SeismicIntensityScaleDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div
      id="sec-svt-richter-msk"
      data-atomic-block="true"
      className="pdf-atomic-block my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-3.5 sm:p-4 space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        {/* العمود 1: سلم الشدة MSK */}
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border-2 border-amber-300 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-amber-200 pb-1.5">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-[6px]">
                سلم الشدة (Intensité)
              </span>
              <span className="text-xs font-bold text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-200">
                سلم MSK (12 درجة)
              </span>
            </div>

            <div className="text-xs font-bold text-[#4A4A4A]">
              يقيس الآثار والأضرار الملاحظة في موقع معين
            </div>

            <ul className="space-y-1.5 text-xs text-[#4A4A4A] list-disc pr-4 leading-relaxed">
              <li>يعتمد على ملاحظة شعور السكان وتقدير حجم الخسائر في المباني.</li>
              <li>يُعبَّر عنه بالأرقام الرومانية من I إلى XII.</li>
              <li><strong>متغير حسب المكان :</strong> تتناقص الشدة كلما ابتعدنا عن المركز السطحي.</li>
              <li>تُمثَّل مناطقه بخطوط متساوية الشدة (منحنيات تساوي الشدة).</li>
            </ul>
          </div>

          <div className="pt-2 border-t border-amber-200/80 text-[11px] text-amber-900 font-semibold bg-amber-50/70 p-2 rounded-[8px]">
            📌 مثال : شدة زلزال زموري بلغت الدرجة X قرب المركز السطحي وتناقصت تدريجياً في المدن المجاورة.
          </div>
        </div>

        {/* العمود 2: سلم المقدار ريشتر */}
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border-2 border-emerald-300 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-[6px]">
                سلم المقدار (Magnitude)
              </span>
              <span className="text-xs font-bold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200">
                سلم ريشتر (Richter)
              </span>
            </div>

            <div className="text-xs font-bold text-[#4A4A4A]">
              يقيس كمية الطاقة المحررة في بؤرة الزلزال
            </div>

            <ul className="space-y-1.5 text-xs text-[#4A4A4A] list-disc pr-4 leading-relaxed">
              <li>يُقدَّر انطلاقاً من تسجيلات أجهزة قياس الزلازل (السيسموغراف).</li>
              <li>يُعبَّر عنه بقيمة رقمية علمية (مثل: زلزال زموري، 2003، المقدار 6.6).</li>
              <li><strong>قيمة وحيدة وثابتة :</strong> لكل زلزال مقدار محدد يعبر عن طاقة مصدره، ولا يتغير من منطقة إلى أخرى.</li>
              <li>يتعلق بمصدر الزلزال حصراً ولا يتأثر بنوع التربة أو المسافة.</li>
            </ul>
          </div>

          <div className="pt-2 border-t border-emerald-200/80 text-[11px] text-emerald-900 font-semibold bg-emerald-50/70 p-2 rounded-[8px]">
            💡 قاعدة حاسمة : المقدار والشدة ليسا مترادفين؛ المقدار يتعلق بالمصدر، والشدة تصف الآثار في موقع معين.
          </div>
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
 * 5. المخطط العلمي التركيبي لخاصيات الزلزال (الصفحة 2) — خاص بكتلة "أحتفظ بالأهم":
 * يجمع الصورة ثلاثية الأبعاد الواقعية + التسميات العربية + محطة مسجل الزلازل المنفصلة + بطاقات الشرح الأربعة
 * bloc atomique insécable pour garantir qu'aucune étiquette ne soit coupée
 */
export const SeismicSummaryMechanismDiagram: React.FC<{ schema?: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div
      id="sec-svt-schema-bilan-block"
      data-atomic-block="true"
      className="pdf-atomic-block my-3 bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 space-y-3"
    >
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

      {/* Realistic 3D Geological Cross-Section with SVG Overlay */}
      <div className="relative w-full aspect-[16/9] rounded-[10px] overflow-hidden border border-[#E2D9D0] bg-[#1E293B] shadow-sm select-none">
        <img
          src={earthCrossSectionImg}
          alt="مقطع جيولوجي علمي ثلاثي الأبعاد لآلية حدوث الزلزال"
          className="w-full h-full object-cover"
        />

        {/* SVG Callout Badges with strict placement */}
        <svg
          viewBox="0 0 1000 562.5"
          className="absolute inset-0 w-full h-full pointer-events-none"
          role="presentation"
        >
          <defs>
            <filter id="badgeShadowSummary" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* 1. المركز السطحي */}
          <circle cx="490" cy="180" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M370,75 L482,174" stroke="#2563EB" strokeWidth="2" strokeDasharray="3 3" />
          <g transform="translate(200, 35)" filter="url(#badgeShadowSummary)">
            <rect x="0" y="0" width="180" height="42" rx="7" fill="#FFFFFF" fillOpacity="0.96" stroke="#2563EB" strokeWidth="1.8" />
            <text x="90" y="18" fill="#1E40AF" fontSize="13" fontWeight="bold" textAnchor="middle">
              المركز السطحي
            </text>
            <text x="90" y="33" fill="#1D4ED8" fontSize="10" fontWeight="semibold" textAnchor="middle">
              عمودياً فوق البؤرة · الأكثر تضرراً
            </text>
          </g>

          {/* Ligne d'alignement vertical Foyer - Épicentre */}
          <line x1="490" y1="360" x2="490" y2="190" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 3" opacity="0.85" />

          {/* 2. البؤرة الزلزالية */}
          <circle cx="490" cy="365" r="9" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="225" y1="365" x2="478" y2="365" stroke="#DC2626" strokeWidth="2" strokeDasharray="4 3" />
          <g transform="translate(45, 342)" filter="url(#badgeShadowSummary)">
            <rect x="0" y="0" width="180" height="42" rx="7" fill="#FFFFFF" fillOpacity="0.96" stroke="#DC2626" strokeWidth="1.8" />
            <text x="90" y="18" fill="#991B1B" fontSize="13" fontWeight="bold" textAnchor="middle">
              البؤرة (Foyer)
            </text>
            <text x="90" y="33" fill="#B91C1C" fontSize="10" fontWeight="semibold" textAnchor="middle">
              موقع داخل الأرض تنشأ فيه الأمواج
            </text>
          </g>

          {/* 3. الفالق */}
          <path d="M720,445 L550,380" stroke="#B45309" strokeWidth="1.8" strokeDasharray="3 3" />
          <g transform="translate(710, 425)" filter="url(#badgeShadowSummary)">
            <rect x="0" y="0" width="175" height="40" rx="7" fill="#FFFFFF" fillOpacity="0.96" stroke="#B45309" strokeWidth="1.8" />
            <text x="87" y="18" fill="#92400E" fontSize="12.5" fontWeight="bold" textAnchor="middle">
              الفالق (Faille)
            </text>
            <text x="87" y="32" fill="#78350F" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
              كسر مصحوب بإزاحة صخرية
            </text>
          </g>

          {/* 4. الأمواج الزلزالية */}
          <path d="M225,235 L350,295" stroke="#EA580C" strokeWidth="1.8" strokeDasharray="3 3" />
          <g transform="translate(50, 212)" filter="url(#badgeShadowSummary)">
            <rect x="0" y="0" width="175" height="42" rx="7" fill="#FFFFFF" fillOpacity="0.96" stroke="#EA580C" strokeWidth="1.8" />
            <text x="87" y="18" fill="#9A3412" fontSize="12.5" fontWeight="bold" textAnchor="middle">
              الأمواج الزلزالية (Ondes)
            </text>
            <text x="87" y="33" fill="#C2410C" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
              تنتشر في جميع الاتجاهات
            </text>
          </g>

          {/* 5. محطة الرصد: مسجل الزلازل والسجل الزلزالي المنفصل كلياً عن المنحنى */}
          <g transform="translate(720, 15)" filter="url(#badgeShadowSummary)">
            {/* Boîte principale de l'appareil */}
            <rect x="0" y="0" width="220" height="98" rx="8" fill="#FFFFFF" fillOpacity="0.96" stroke="#0284C7" strokeWidth="1.8" />
            
            {/* Titre : مسجل الزلازل (الجهاز) */}
            <text x="110" y="18" fill="#0369A1" fontSize="12" fontWeight="bold" textAnchor="middle">
              مسجل الزلازل : الجهاز
            </text>

            {/* Tracé de l'onde dans son propre cadre dédié */}
            <rect x="8" y="24" width="204" height="30" rx="4" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1" />
            <path d="M14,39 L40,39 Q46,33 52,39 T64,39 T76,31 T88,47 T100,32 T112,44 T124,36 L206,39" stroke="#0284C7" strokeWidth="1.8" fill="none" />

            {/* Cartouche dédié strictement HORS du tracé pour le libellé « السجل الزلزالي: المنحنى الناتج » */}
            <rect x="8" y="60" width="204" height="28" rx="4" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1" />
            <text x="110" y="78" fill="#0C4A6E" fontSize="11" fontWeight="bold" textAnchor="middle">
              السجل الزلزالي: المنحنى الناتج
            </text>

            {/* Ligne de rappel vers la surface */}
            <line x1="80" y1="98" x2="68" y2="165" stroke="#0284C7" strokeWidth="1.8" />
            <circle cx="68" cy="165" r="5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        </svg>
      </div>

      {/* Bandeau des 4 cartes sous le schéma — contenu insécable avec le bloc */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
        <div className="p-2.5 rounded-[8px] bg-red-50 border border-red-200">
          <span className="font-bold text-red-900 block text-xs">البؤرة</span>
          <span className="text-[11px] text-red-800">تنشأ فيها الأمواج</span>
        </div>
        <div className="p-2.5 rounded-[8px] bg-blue-50 border border-blue-200">
          <span className="font-bold text-blue-900 block text-xs">المركز السطحي</span>
          <span className="text-[11px] text-blue-800">الأكثر تضرراً</span>
        </div>
        <div className="p-2.5 rounded-[8px] bg-orange-50 border border-orange-200">
          <span className="font-bold text-orange-900 block text-xs">الأمواج الزلزالية</span>
          <span className="text-[11px] text-orange-800">في جميع الاتجاهات</span>
        </div>
        <div className="p-2.5 rounded-[8px] bg-sky-50 border border-sky-200">
          <span className="font-bold text-sky-900 block text-xs">مسجل الزلازل</span>
          <span className="text-[11px] text-sky-800">يسجل الاهتزازات</span>
        </div>
      </div>
    </div>
  );
};
