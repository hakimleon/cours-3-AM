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

/** Boîte de libellé : texte arabe entièrement contenu dans son cadre. */
const LabelBox: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  lines: { text: string; color: string; size?: number; weight?: 'bold' | 'normal' }[];
}> = ({ x, y, width, height, fill, stroke, lines }) => {
  const lineHeight = Math.round(Math.max(...lines.map((l) => l.size ?? 11.5)) * 1.42);
  const startY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2 + 4;
  return (
    <g>
      <rect
        data-label-box="true"
        x={x}
        y={y}
        width={width}
        height={height}
        rx={7}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.3}
      />
      {lines.map((line, idx) => (
        <text
          key={idx}
          x={x + width / 2}
          y={startY + idx * lineHeight}
          textAnchor="middle"
          fontSize={line.size ?? 11.5}
          fontWeight={line.weight ?? 'bold'}
          fill={line.color}
        >
          {line.text}
        </text>
      ))}
    </g>
  );
};

/**
 * 1. Coupe géologique : surface, couches, foyer, épicentre, faille et ondes.
 * Une seule légende (les libellés dans le schéma), aucun doublon français.
 */
const SeismicFoyerEpicenterDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div id="sec-svt-foyer-epicenter" className="my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-3 sm:p-4 space-y-3 break-inside-avoid">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
          <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
            {schema.titleArabic || 'مقطع جيولوجي : البؤرة والمركز السطحي وانتشار الأمواج الزلزالية'}
          </h4>
        </div>
      </div>

      <div className="w-full bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] p-2 flex items-center justify-center">
        <svg
          viewBox="0 0 800 440"
          className="w-full max-w-[760px] h-auto select-none"
          role="img"
          aria-label="مقطع جيولوجي يوضح البؤرة والمركز السطحي والفالق وانتشار الأمواج"
        >
          <defs>
            <linearGradient id="coupeSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#F0F9FF" />
            </linearGradient>
            <linearGradient id="coupeRockLeft" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E7D3B8" />
              <stop offset="100%" stopColor="#C8A67C" />
            </linearGradient>
            <linearGradient id="coupeRockRight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DCC4A4" />
              <stop offset="100%" stopColor="#B08D66" />
            </linearGradient>
            <radialGradient id="coupeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#F97316" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ciel et surface */}
          <rect x="20" y="20" width="760" height="80" rx="6" fill="url(#coupeSky)" />
          <line x1="20" y1="100" x2="780" y2="100" stroke="#78350F" strokeWidth="3" />

          {/* Couches rocheuses séparées par le plan de faille */}
          <polygon points="20,100 400,100 330,420 20,420" fill="url(#coupeRockLeft)" stroke="#7C5A3A" strokeWidth="1.3" />
          <polygon points="400,100 780,100 780,420 330,420" fill="url(#coupeRockRight)" stroke="#7C5A3A" strokeWidth="1.3" />
          <line data-fault-line="true" x1="400" y1="100" x2="330" y2="420" stroke="#B91C1C" strokeWidth="3.5" strokeDasharray="7 5" />

          {/* Ondes sismiques : ellipses concentriques autour de la bourse */}
          <ellipse cx="355" cy="270" rx="40" ry="30" fill="none" stroke="#F97316" strokeWidth="2.2" strokeDasharray="5 3" />
          <ellipse cx="355" cy="270" rx="80" ry="58" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6 4" opacity="0.85" />
          <ellipse cx="355" cy="270" rx="115" ry="82" fill="none" stroke="#FB923C" strokeWidth="1.8" strokeDasharray="7 5" opacity="0.7" />
          <ellipse cx="355" cy="270" rx="145" ry="100" fill="none" stroke="#FDBA74" strokeWidth="1.6" strokeDasharray="8 6" opacity="0.55" />

          {/* Foyer */}
          <circle cx="355" cy="270" r="26" fill="url(#coupeGlow)" />
          <circle cx="355" cy="270" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.2" />

          {/* Projection verticale vers l'épicentre */}
          <line x1="355" y1="270" x2="355" y2="100" stroke="#2563EB" strokeWidth="2.2" strokeDasharray="4 4" />
          <circle cx="355" cy="100" r="8" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.2" />

          {/* Bâtiments au voisinage de l'épicentre (aucun texte sur le tracé) */}
          <g>
            <rect x="385" y="70" width="16" height="30" fill="#64748B" rx="1" />
            <polygon points="401,80 417,100 383,100" fill="#475569" />
            <rect x="425" y="80" width="14" height="20" fill="#94A3B8" rx="1" />
          </g>

          {/* Libellés : tous dans un cadre, sans chevauchement */}
          <LabelBox
            x={40}
            y={32}
            width={130}
            height={34}
            fill="#F8FAFC"
            stroke="#64748B"
            lines={[{ text: 'سطح الأرض', color: '#334155' }]}
          />
          <line x1="105" y1="66" x2="105" y2="98" stroke="#64748B" strokeWidth="1.4" />

          <LabelBox
            x={470}
            y={28}
            width={200}
            height={44}
            fill="#EFF6FF"
            stroke="#2563EB"
            lines={[
              { text: 'المركز السطحي', color: '#1E40AF' },
              { text: 'عمودياً فوق البؤرة', color: '#1D4ED8', size: 10, weight: 'normal' },
            ]}
          />
          <line x1="470" y1="72" x2="368" y2="96" stroke="#2563EB" strokeWidth="1.4" />

          <LabelBox
            x={40}
            y={240}
            width={150}
            height={48}
            fill="#FEF2F2"
            stroke="#DC2626"
            lines={[
              { text: 'البؤرة', color: '#991B1B' },
              { text: 'تنشأ فيها الأمواج', color: '#7F1D1D', size: 10, weight: 'normal' },
            ]}
          />
          <line x1="190" y1="262" x2="338" y2="268" stroke="#DC2626" strokeWidth="1.6" strokeDasharray="4 3" />

          <LabelBox
            x={110}
            y={352}
            width={130}
            height={40}
            fill="#FEF3C7"
            stroke="#B45309"
            lines={[
              { text: 'الفالق', color: '#92400E' },
              { text: 'كسر في الصخور', color: '#B45309', size: 9.5, weight: 'normal' },
            ]}
          />
          <line x1="240" y1="372" x2="334" y2="372" stroke="#B45309" strokeWidth="1.6" />

          <LabelBox
            x={570}
            y={150}
            width={180}
            height={44}
            fill="#FFF7ED"
            stroke="#EA580C"
            lines={[
              { text: 'الأمواج الزلزالية', color: '#9A3412' },
              { text: 'تنتشر في جميع الاتجاهات', color: '#C2410C', size: 10, weight: 'normal' },
            ]}
          />
          <line x1="570" y1="178" x2="495" y2="196" stroke="#EA580C" strokeWidth="1.6" strokeDasharray="4 3" />

          <LabelBox
            x={600}
            y={250}
            width={150}
            height={36}
            fill="#FAF7F4"
            stroke="#7C5A3A"
            lines={[{ text: 'طبقات صخرية', color: '#5A3A1E' }]}
          />
          <line x1="660" y1="286" x2="660" y2="312" stroke="#7C5A3A" strokeWidth="1.4" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Sismogramme : ligne de base avant la secousse, arrivée progressive,
 * amplitudes croissantes puis amorties, axes gradués et lisibles.
 */
const SeismogramWavesDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {          const baseY = 170;
  const onsetX = 200;
  const endX = 720;

  const tracePath = React.useMemo(() => {
    const points: string[] = [];
    for (let x = 95; x <= endX; x += 2) {
      let amplitude = 0;
      if (x >= onsetX) {
        if (x < onsetX + 45) {
          const t = (x - onsetX) / 45;
          amplitude = 24 * t * t;
        } else if (x < 400) {
          const t = (x - (onsetX + 45)) / (400 - (onsetX + 45));
          amplitude = 24 + 62 * t;
        } else {
          const t = (x - 400) / (endX - 400);
          amplitude = 86 * Math.pow(1 - t, 1.7);
        }
      }
      const wave = amplitude === 0 ? 0 : amplitude * Math.sin((x - onsetX) * 0.26);
      points.push(`${x},${(baseY + wave).toFixed(1)}`);
    }
    return `M${points.join(' L')}`;
  }, []);

  return (
    <div id="sec-svt-seismogram" className="my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-3 sm:p-4 space-y-3 break-inside-avoid">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
          {schema.titleArabic || 'السجل الزلزالي : تغير حركة الأرض بدلالة الزمن'}
        </h4>
      </div>

      <div className="w-full bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] p-2 flex items-center justify-center">
        <svg
          viewBox="0 0 800 340"
          className="w-full max-w-[760px] h-auto select-none"
          role="img"
          aria-label="سجل زلزالي : خط قاعدة قبل الهزة ثم أمواج تتزايد سعتها وتتلاشى تدريجياً"
        >
          {/* Zone de tracé */}
          <rect x="80" y="50" width="660" height="200" fill="#FFFFFF" stroke="#E2E8F0" />

          {/* Graduations horizontales (grille) */}
          {[200, 300, 400, 500, 600, 700].map((x) => (
            <line key={x} x1={x} y1="50" x2={x} y2="250" stroke="#E2E8F0" strokeWidth="1" />
          ))}
          <line x1="80" y1={baseY} x2="740" y2={baseY} stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 4" />

          {/* Axes */}
          <line x1="80" y1="50" x2="80" y2="270" stroke="#475569" strokeWidth="2" />
          <line x1="80" y1="250" x2="740" y2="250" stroke="#475569" strokeWidth="2" />

          {/* Graduations de l'axe du temps */}
          {[
            { x: 200, label: '0' },
            { x: 285, label: '10' },
            { x: 370, label: '20' },
            { x: 455, label: '30' },
            { x: 540, label: '40' },
            { x: 625, label: '50' },
            { x: 710, label: '60' },
          ].map((tick) => (
            <g key={tick.label}>
              <line x1={tick.x} y1="250" x2={tick.x} y2="258" stroke="#475569" strokeWidth="1.6" />
              <text x={tick.x} y="274" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="bold">
                {tick.label}
              </text>
            </g>
          ))}
          <text x="410" y="300" textAnchor="middle" fontSize="12" fill="#334155" fontWeight="bold">
            الزمن (بالثواني)
          </text>

          {/* Graduations de l'axe de l'amplitude : signes seuls, une seule
              étiquette d'axe: une seule fois sur l'axe vertical. */}
          {[
            { y: 90, label: '+' },
            { y: baseY, label: '0' },
            { y: 230, label: '−' },
          ].map((tick) => (
            <g key={tick.label}>
              <line x1="96" y1={tick.y} x2="104" y2={tick.y} stroke="#475569" strokeWidth="1.6" />
              <text x="112" y={tick.y + 4.5} textAnchor="start" fontSize="13" fill="#475569" fontWeight="bold">
                {tick.label}
              </text>
            </g>
          ))}
          <text
            x="160"
            y={baseY}
            textAnchor="middle"
            fontSize="13.5"
            fill="#334155"
            fontWeight="bold"
            transform={`rotate(-90 160 ${baseY})`}
          >
            السعة
          </text>

          {/* Trait de base avant la secousse */}
          <path d={`M95,${baseY} L${onsetX},${baseY}`} stroke="#0284C7" strokeWidth="2.2" fill="none" />
          <text x="147" y={baseY - 12} textAnchor="middle" fontSize="11" fill="#0369A1" fontWeight="bold">
            قبل وصول الهزة
          </text>

          {/* Tracé sismique : enveloppe croissante puis amortie, sans dents de scie régulières */}
          <path d={tracePath} stroke="#B45309" strokeWidth="2" fill="none" />

          {/* Arrivée des ondes */}
          <line x1={onsetX} y1="60" x2={onsetX} y2="250" stroke="#059669" strokeWidth="1.6" strokeDasharray="4 3" />
          <text x={onsetX - 8} y="72" textAnchor="end" fontSize="11" fill="#047857" fontWeight="bold">
            بداية التسجيل
          </text>

          {/* Amplitude maximale */}
          <line x1="400" y1="88" x2="400" y2="168" stroke="#B91C1C" strokeWidth="1.4" strokeDasharray="3 3" />
          <text x="392" y="80" textAnchor="end" fontSize="11" fill="#B91C1C" fontWeight="bold">
            أقصى سعة
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-[10px] bg-sky-50 border border-sky-200">
          <div className="font-bold text-sky-900">1. مسجل الزلازل :</div>
          <p className="text-sky-800 text-[11.5px] mt-0.5 leading-relaxed">
            هو الجهاز المخصص لرصد الاهتزازات الأرضية وتسجيل حركتها.
          </p>
        </div>

        <div className="p-3 rounded-[10px] bg-amber-50 border border-amber-200">
          <div className="font-bold text-amber-900">2. السجل الزلزالي :</div>
          <p className="text-amber-800 text-[11.5px] mt-0.5 leading-relaxed">
            هو المنحنى الناتج عن التسجيل، ويبين تغير سعة حركة الأرض مع مرور الزمن.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Cartes comparatives : intensité (MSK) et magnitude (Richter).
 * Deux colonnes sur une même page, sans coupure.
 */
const SeismicIntensityScaleDiagram: React.FC<{ schema: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div
      id="sec-svt-richter-msk"
      data-atomic-block="true"
      className="pdf-atomic-block break-inside-avoid my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
          {schema.titleArabic || 'التمييز بين شدة الزلزال ومقدار الزلزال'}
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border-2 border-amber-300 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-[6px]">
              شدة الزلزال
            </span>
            <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              سلم MSK (12 درجة)
            </span>
          </div>
          <h5 className="text-sm font-bold text-[#4A4A4A]">آثار الزلزال والخسائر الملاحظة في مكان معين</h5>
          <ul className="space-y-1.5 text-xs text-[#4A4A4A] list-disc pr-4 leading-relaxed">
            <li>تُقدَّر بملاحظة شعور السكان وحجم الأضرار في المنشآت.</li>
            <li>تُعبَّر عنها بالأرقام الرومانية من I إلى XII.</li>
            <li>
              <strong>تتغير حسب المكان :</strong> تتناقص كلما ابتعدنا عن المركز السطحي.
            </li>
            <li>تُمثَّل مناطقها بمنحنيات تساوي الشدة.</li>
          </ul>
        </div>

        <div className="p-4 rounded-[12px] bg-[#FAF7F4] border-2 border-emerald-300 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-[6px]">
              مقدار الزلزال
            </span>
            <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              سلم ريشتر
            </span>
          </div>
          <h5 className="text-sm font-bold text-[#4A4A4A]">الطاقة المحررة في بؤرة الزلزال</h5>
          <ul className="space-y-1.5 text-xs text-[#4A4A4A] list-disc pr-4 leading-relaxed">
            <li>يُقدَّر انطلاقاً من تسجيلات مسجل الزلازل.</li>
            <li>يُعبَّر عنه بقيمة رقمية (مثل زلزال زموري 2003، مقداره 6.6 على سلم ريشتر).</li>
            <li>
              <strong>مقدار الزلزال :</strong> لكل زلزال مقدار واحد يتعلق بمصدره، ولا يتغير من منطقة إلى أخرى.
            </li>
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
    <div className="my-4 bg-white rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 space-y-3 break-inside-avoid">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2.5">
        <h4 className="text-sm sm:text-base font-bold text-[#4A4A4A]">
          {schema.titleArabic || 'تشوهات القشرة الأرضية : الطيات والفوالق'}
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2 text-center">
          <div className="text-xs font-bold text-[#15803D]">1. الطيّات · صخور مرنة</div>
          <svg viewBox="0 0 300 120" className="w-full h-auto select-none">
            <path d="M10,80 Q75,20 150,80 T290,80" stroke="#047857" strokeWidth="8" fill="none" />
            <path d="M10,95 Q75,35 150,95 T290,95" stroke="#D97706" strokeWidth="8" fill="none" />
            <path d="M10,110 Q75,50 150,110 T290,110" stroke="#78350F" strokeWidth="8" fill="none" />
            <text x="75" y="15" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">طية محدبة</text>
            <text x="225" y="115" fill="#B45309" fontSize="10" fontWeight="bold" textAnchor="middle">طية مقعرة</text>
          </svg>
          <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
            انثناء الطبقات الصخرية اللدنة مشكّلة طيّات متتالية دون حدوث انكسار.
          </p>
        </div>

        <div className="p-3.5 rounded-[12px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-2 text-center">
          <div className="text-xs font-bold text-[#B45309]">2. الفوالق · صخور صلبة</div>
          <svg viewBox="0 0 300 120" className="w-full h-auto select-none">
            <polygon points="20,40 140,40 110,110 20,110" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
            <polygon points="150,55 280,55 280,110 120,110" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
            <line x1="140" y1="35" x2="110" y2="115" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 3" />
            <text x="125" y="25" fill="#DC2626" fontSize="10" fontWeight="bold" textAnchor="middle">مستوى الفالق</text>
            <text x="60" y="75" fill="#1E293B" fontSize="9" fontWeight="bold">كتلة مرفوعة</text>
            <text x="210" y="85" fill="#1E293B" fontSize="9" fontWeight="bold">كتلة خافضة</text>
          </svg>
          <p className="text-[11px] text-[#4A4A4A] leading-relaxed">
            انكسار الصخور الصلبة مصحوباً بإزاحة نسبيّة للكتلتين، وهو المنشأ الأساسي لأغلب الزلازل.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 5. Schéma-bilan (bloc « أحتفظ بالأهم ») : foyer, épicentre, faille, ondes
 * et enregistrement — cinq éléments sans chevauchement. Le sismographe est
 * dessiné sans texte sur le tracé, son libellé est dans une boîte à côté.
 */
export const SeismicSummaryMechanismDiagram: React.FC<{ schema?: SvtSchemaOrFigure }> = ({ schema }) => {
  return (
    <div className="my-3 bg-white rounded-[14px] border border-[#E2D9D0] p-3 sm:p-4 space-y-3 break-inside-avoid">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE2DA] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
          <h4 className="text-xs sm:text-sm font-bold text-[#4A4A4A]">
            {schema?.titleArabic || 'مخطط تركيبي : البؤرة، المركز السطحي، الفالق، الأمواج الزلزالية والتسجيل'}
          </h4>
        </div>
      </div>

      <div className="w-full bg-[#FAF7F4] rounded-[10px] border border-[#E2D9D0] p-2 flex items-center justify-center">
        <svg
          viewBox="0 0 820 430"
          className="svt-schema-bilan w-full max-w-[820px] h-auto select-none"
          role="img"
          aria-label="مخطط تركيبي للبؤرة والمركز السطحي والفالق والأمواج ومسجل الزلازل"
        >
          <defs>
            <linearGradient id="sumSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#F0F9FF" />
            </linearGradient>
            <linearGradient id="sumRock1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E7D3B8" />
              <stop offset="100%" stopColor="#C8A67C" />
            </linearGradient>
            <linearGradient id="sumRock2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DCC4A4" />
              <stop offset="100%" stopColor="#B08D66" />
            </linearGradient>
            <radialGradient id="sumGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#F97316" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="20" y="15" width="780" height="95" rx="6" fill="url(#sumSky)" />
          <line x1="20" y1="110" x2="800" y2="110" stroke="#78350F" strokeWidth="2.6" />

          <polygon points="20,110 400,110 330,410 20,410" fill="url(#sumRock1)" stroke="#7C5A3A" strokeWidth="1.2" />
          <polygon points="400,110 800,110 800,410 330,410" fill="url(#sumRock2)" stroke="#7C5A3A" strokeWidth="1.2" />
          <line data-fault-line="true" x1="400" y1="110" x2="330" y2="410" stroke="#B91C1C" strokeWidth="3" strokeDasharray="6 4" />

          <ellipse cx="355" cy="250" rx="40" ry="30" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="5 3" />
          <ellipse cx="355" cy="250" rx="80" ry="58" fill="none" stroke="#F97316" strokeWidth="1.9" strokeDasharray="6 4" opacity="0.85" />
          <ellipse cx="355" cy="250" rx="112" ry="82" fill="none" stroke="#FB923C" strokeWidth="1.7" strokeDasharray="7 5" opacity="0.7" />
          <ellipse cx="355" cy="250" rx="140" ry="100" fill="none" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.55" />

          <circle cx="355" cy="250" r="24" fill="url(#sumGlow)" />
          <circle cx="355" cy="250" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="355" y1="250" x2="355" y2="110" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="355" cy="110" r="8" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />

          {/* Bâtiments à l'aplomb de l'épicentre, sans texte */}
          <g>
            <rect x="382" y="80" width="15" height="30" fill="#64748B" rx="1" />
            <polygon points="397,90 412,110 379,110" fill="#475569" />
            <rect x="420" y="88" width="12" height="22" fill="#94A3B8" rx="1" />
          </g>

          {/* 1. المركز السطحي */}
          <LabelBox
            x={140}
            y={12}
            width={236}
            height={60}
            fill="#EFF6FF"
            stroke="#2563EB"
            lines={[
              { text: 'المركز السطحي', color: '#1E40AF', size: 15.5 },
              { text: 'المنطقة الأكثر تضرراً', color: '#1D4ED8', size: 13, weight: 'normal' },
            ]}
          />
          <line x1="258" y1="72" x2="345" y2="104" stroke="#2563EB" strokeWidth="1.5" />

          {/* 2. البؤرة */}
          <LabelBox
            x={16}
            y={204}
            width={192}
            height={60}
            fill="#FEF2F2"
            stroke="#DC2626"
            lines={[
              { text: 'البؤرة', color: '#991B1B', size: 15.5 },
              { text: 'تنشأ فيها الأمواج', color: '#7F1D1D', size: 13, weight: 'normal' },
            ]}
          />
          <line x1="208" y1="234" x2="333" y2="249" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* 3. الفالق : la ligne de faille ne traverse aucun libellé */}
          <LabelBox
            x={98}
            y={326}
            width={158}
            height={56}
            fill="#FEF3C7"
            stroke="#B45309"
            lines={[
              { text: 'الفالق', color: '#92400E', size: 15.5 },
              { text: 'كسر في الصخور', color: '#B45309', size: 13, weight: 'normal' },
            ]}
          />
          <line x1="256" y1="354" x2="330" y2="358" stroke="#B45309" strokeWidth="1.5" />

          {/* 4. الأمواج الزلزالية */}
          <LabelBox
            x={528}
            y={140}
            width={242}
            height={60}
            fill="#FFF7ED"
            stroke="#EA580C"
            lines={[
              { text: 'الأمواج الزلزالية', color: '#9A3412', size: 15.5 },
              { text: 'تنتشر في كل الاتجاهات', color: '#C2410C', size: 13, weight: 'normal' },
            ]}
          />
          <line x1="528" y1="176" x2="470" y2="196" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* 5. Enregistrement : sismographe dessiné sans texte sur le tracé */}
          <g>
            <rect x="612" y="330" width="118" height="10" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
            <rect x="622" y="262" width="10" height="68" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
            <line x1="627" y1="268" x2="700" y2="268" stroke="#64748B" strokeWidth="4" />
            <circle cx="700" cy="268" r="5" fill="#0284C7" />
            <line x1="700" y1="268" x2="700" y2="308" stroke="#0284C7" strokeWidth="2" />
            <rect x="652" y="308" width="58" height="18" rx="3" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" />
            <path
              d="M656,318 l8,-5 8,7 8,-6 8,5 8,-4 8,3"
              stroke="#0284C7"
              strokeWidth="1.3"
              fill="none"
            />
          </g>
          <LabelBox
            x={528}
            y={352}
            width={242}
            height={58}
            fill="#F0F9FF"
            stroke="#0284C7"
            lines={[
              { text: 'مسجل الزلازل', color: '#0369A1', size: 15.5 },
              { text: 'يسجل الاهتزازات الأرضية', color: '#0C4A6E', size: 13, weight: 'normal' },
            ]}
          />
          <line x1="644" y1="352" x2="662" y2="342" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 6. Schéma-synthèse : chaîne causale en arabe, de droite à gauche,
 * avec la branche « التسجيل » reliée à la chaîne.
 */
export const SeismicSynthesisChainDiagram: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF7F4] rounded-[12px] border border-[#E2D9D0] p-2 flex items-center justify-center">
      <svg
        viewBox="0 0 860 300"
        className="w-full max-w-[820px] h-auto select-none"
        role="img"
        aria-label="مخطط تلخيصي : تصدع الصخور وتحرر الطاقة ثم انتشار الأمواج ثم اهتزاز سطح الأرض، مع التسجيل"
      >
        <defs>
          <marker id="svtChainArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#B45309" />
          </marker>
        </defs>

        {/* Étape 1 (à droite) */}
        <g>
          <rect x="650" y="40" width="190" height="84" rx="12" fill="#FEF2F2" stroke="#DC2626" strokeWidth="1.6" />
          <text x="745" y="74" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7F1D1D">
            تصدع الصخور
          </text>
          <text x="745" y="100" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7F1D1D">
            وتحرر الطاقة
          </text>
        </g>

        <line x1="646" y1="82" x2="616" y2="82" stroke="#B45309" strokeWidth="2.4" markerEnd="url(#svtChainArrow)" />

        {/* Étape 2 (au milieu) */}
        <g>
          <rect x="380" y="40" width="230" height="84" rx="12" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.6" />
          <text x="495" y="74" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9A3412">
            انتشار الأمواج الزلزالية
          </text>
          <text x="495" y="100" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9A3412">
            من البؤرة
          </text>
        </g>

        <line x1="376" y1="82" x2="346" y2="82" stroke="#B45309" strokeWidth="2.4" markerEnd="url(#svtChainArrow)" />

        {/* Étape 3 (à gauche) */}
        <g>
          <rect x="110" y="40" width="230" height="84" rx="12" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.6" />
          <text x="225" y="74" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
            اهتزاز سطح الأرض
          </text>
          <text x="225" y="100" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
            وتشقق الصخور
          </text>
        </g>

        {/* Branche « التسجيل » reliée à la chaîne : libellé dans une boîte
            décalée à droite de la flèche (aucun chevauchement). */}
        <line x1="495" y1="128" x2="495" y2="184" stroke="#0284C7" strokeWidth="2.4" markerEnd="url(#svtChainArrow)" />
        <rect
          data-label-box="true"
          x="506"
          y="138"
          width="80"
          height="28"
          rx="6"
          fill="#FFFFFF"
          stroke="#0284C7"
          strokeWidth="1.2"
        />
        <text x="546" y="157" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0369A1">
          التسجيل
        </text>

        <g>
          <rect x="350" y="188" width="290" height="76" rx="12" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.6" />
          <text x="495" y="216" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0369A1">
            التسجيل الزلزالي
          </text>
          <text x="495" y="240" textAnchor="middle" fontSize="12" fill="#0C4A6E">
            مسجل الزلازل ← السجل الزلزالي
          </text>
        </g>
      </svg>
    </div>
  );
};
