import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Droplets,
  ArrowDown,
  ArrowLeft,
  Sparkles,
  Zap,
  Flame,
  Lightbulb,
} from 'lucide-react';
import { ChemPhysText } from './ChemPhysText';

// ============================================================================
// 1. ACTIVITÉ 1 INTERACTIVE : CENTRALE HYDROÉLECTRIQUE (SANS SPOILERS)
// ============================================================================
export const Course09DiscoveryInteractive: React.FC = () => {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);

  useEffect(() => {
    const handlePreparePdf = () => setShowCorrection(true);
    const handleDonePdf = () => setShowCorrection(false);
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    window.addEventListener('course-pdf-done', handleDonePdf);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePreparePdf);
      window.removeEventListener('course-pdf-done', handleDonePdf);
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E5DDD5] p-4 sm:p-6 space-y-4" dir="rtl">
      {/* Contexte de départ */}
      <div className="p-3.5 sm:p-4 rounded-[12px] bg-[#F6F0EB]/60 border border-[#E2D9D0] space-y-2">
        <div className="flex items-center gap-2 text-[#0F766E] font-bold text-sm sm:text-base">
          <Droplets className="w-5 h-5 text-[#0284C7]" />
          <span>وضعية الانطلاق : تحول الطاقة في المحطة الكهرومائية</span>
        </div>
        <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
          تعمل محطة كهرومائية على تحويل طاقة الماء إلى طاقة كهربائية. في مرحلة من مراحل التحويل، استقبل النظام{' '}
          <span className="font-bold text-[#0F766E]" dir="ltr">
            100 kJ
          </span>{' '}
          من الطاقة، وتحول منها{' '}
          <span className="font-bold text-[#0F766E]" dir="ltr">
            90 kJ
          </span>{' '}
          إلى طاقة مفيدة، بينما ظهرت{' '}
          <span className="font-bold text-[#EA580C]" dir="ltr">
            10 kJ
          </span>{' '}
          كطاقة متبددة.
        </p>
      </div>

      {/* جدول نشاط 1 — قياسات الطاقات الثلاث (دون حرق النتيجة أو عمود إضافي) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[8px] bg-[#0F766E] text-white text-xs font-bold">
            نشاط 1
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
            جدول الطاقات الثلاث في المحطة الكهرومائية
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse border border-[#CBD5E1] rounded-[10px] overflow-hidden text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#0F766E] text-white font-bold">
                <th className="p-2.5 border border-[#0F766E]/40">
                  الطاقة المستقبلة (<span dir="ltr">E<sub>r</sub></span>)
                </th>
                <th className="p-2.5 border border-[#0F766E]/40">
                  الطاقة المفيدة (<span dir="ltr">E<sub>u</sub></span>)
                </th>
                <th className="p-2.5 border border-[#0F766E]/40">
                  الطاقة المتبددة (<span dir="ltr">E<sub>d</sub></span>)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white font-bold text-xs sm:text-sm">
                <td className="p-2.5 border border-[#CBD5E1] text-[#0284C7]" dir="ltr">
                  100 kJ
                </td>
                <td className="p-2.5 border border-[#CBD5E1] text-[#0F766E]" dir="ltr">
                  90 kJ
                </td>
                <td className="p-2.5 border border-[#CBD5E1] text-[#EA580C]" dir="ltr">
                  10 kJ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* الأسئلة التفاعلية مع حقول إدخال فارغة («اكتب هنا...») */}
      <div className="space-y-3 pt-1">
        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-bold text-[#1A1A1A]">
            1. ماذا تلاحظ عند مقارنة القيم الثلاث (100 kJ و 90 kJ و 10 kJ)؟
          </label>
          <input
            type="text"
            value={ans1}
            onChange={(e) => setAns1(e.target.value)}
            placeholder="اكتب هنا..."
            className="w-full px-3 py-2 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] focus:bg-white focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-xs sm:text-sm text-[#1A1A1A] outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-bold text-[#1A1A1A]">
            2. كيف يمكن ربط الطاقة المستقبلة بالطاقة المفيدة والمتبددة بعلاقة رياضية؟
          </label>
          <input
            type="text"
            value={ans2}
            onChange={(e) => setAns2(e.target.value)}
            placeholder="اكتب هنا..."
            className="w-full px-3 py-2 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] focus:bg-white focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-xs sm:text-sm text-[#1A1A1A] outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-bold text-[#1A1A1A]">
            3. ماذا يحدث للطاقة أثناء التحول في النظام؟ هل تختفي؟
          </label>
          <input
            type="text"
            value={ans3}
            onChange={(e) => setAns3(e.target.value)}
            placeholder="اكتب هنا..."
            className="w-full px-3 py-2 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] focus:bg-white focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-xs sm:text-sm text-[#1A1A1A] outline-none transition-all"
          />
        </div>
      </div>

      {/* زر إظهار التصحيح المعتمد في التطبيق */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowCorrection(!showCorrection)}
          className="no-pdf inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
        >
          {showCorrection ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>إخفاء التصحيح</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>اعرض التصحيح</span>
            </>
          )}
        </button>

        {showCorrection && (
          <div className="mt-2.5 p-3.5 rounded-[12px] bg-[#F0FDFA] border border-[#0F766E]/30 space-y-2 text-xs sm:text-sm text-[#134E4A] leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-[#0F766E]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>الإجابة النموذجية للنشاط 1 :</span>
            </div>
            <ol className="pr-5 list-decimal space-y-1">
              <li>
                <strong>الملاحظة :</strong> الطاقة المستقبلة (100 kJ) تتوزع تمامًا بين الطاقة المفيدة (90 kJ) والطاقة المتبددة (10 kJ)؛ بحيث نجد:{' '}
                <span dir="ltr" className="font-bold">
                  100 kJ = 90 kJ + 10 kJ
                </span>.
              </li>
              <li>
                <strong>العلاقة الرياضية :</strong> تربط بين الطاقات الثلاث :{' '}
                <span dir="ltr" className="font-bold text-[#0F766E]">
                  E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub>
                </span>.
              </li>
              <li>
                <strong>الاستنتاج :</strong> الطاقة لا تفنى ولا تُستحدث من العدم، وإنما تنتقل أو تتحول من شكل إلى آخر، وتظهر الطاقة غير المستفاد منها كطاقة متبددة في الوسط المحيط.
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 2. ACTIVITÉ 2 : TABLEAU DES 3 APPAREILS (100/20/80, 200/150/50, 500/450/50)
// ============================================================================
export const Course09ThreeDevicesTableActivity: React.FC = () => {
  const [rowInputs, setRowInputs] = useState<string[]>(['', '', '']);
  const [generalConclusion, setGeneralConclusion] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);

  useEffect(() => {
    const handlePreparePdf = () => setShowCorrection(true);
    const handleDonePdf = () => setShowCorrection(false);
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    window.addEventListener('course-pdf-done', handleDonePdf);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePreparePdf);
      window.removeEventListener('course-pdf-done', handleDonePdf);
    };
  }, []);

  const devices = [
    {
      id: 'lamp',
      name: 'المصباح الكهربائي (Lampe)',
      icon: <Lightbulb className="w-4 h-4 text-[#D97706]" />,
      er: 100,
      eu: 20,
      ed: 80,
      calc: '100 = 20 + 80',
    },
    {
      id: 'motor',
      name: 'المحرك الكهربائي (Moteur)',
      icon: <Zap className="w-4 h-4 text-[#0284C7]" />,
      er: 200,
      eu: 150,
      ed: 50,
      calc: '200 = 150 + 50',
    },
    {
      id: 'waterheater',
      name: 'سخان الماء (Chauffe-eau)',
      icon: <Flame className="w-4 h-4 text-[#DC2626]" />,
      er: 500,
      eu: 450,
      ed: 50,
      calc: '500 = 450 + 50',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E5DDD5] p-4 sm:p-6 space-y-4" dir="rtl">
      {/* En-tête */}
      <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[8px] bg-[#0F766E] text-white text-xs font-bold">
            نشاط 2
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
            التحقق من علاقة الحصيلة في ثلاثة أجهزة مختلفة
          </h3>
        </div>
        <span className="text-xs text-[#0F766E] font-semibold" dir="ltr">
          E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub>
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
        إليك جدول قياسات الطاقة لثلاثة أجهزة كهربائية شائعة. تحقق حسابيًا لكل جهاز من العلاقة{' '}
        <span dir="ltr" className="font-bold text-[#0F766E]">
          E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub>
        </span>{' '}
        ثم اكتب استنتاجك النهائي :
      </p>

      {/* جدول الأجهزة الثلاثة التفاعلي مع حقول إدخال فارغة («اكتب هنا...») */}
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse border border-[#CBD5E1] rounded-[10px] overflow-hidden text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#0F766E] text-white font-bold">
              <th className="p-2.5 border border-[#0F766E]/40">الجهاز الكهربائي</th>
              <th className="p-2.5 border border-[#0F766E]/40">
                الطاقة المستقبلة (<span dir="ltr">E<sub>r</sub></span>)
              </th>
              <th className="p-2.5 border border-[#0F766E]/40">
                الطاقة المفيدة (<span dir="ltr">E<sub>u</sub></span>)
              </th>
              <th className="p-2.5 border border-[#0F766E]/40">
                الطاقة المتبددة (<span dir="ltr">E<sub>d</sub></span>)
              </th>
              <th className="p-2.5 border border-[#0F766E]/40">
                التحقق الحسابي : هل <span dir="ltr">E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub></span> ؟
              </th>
            </tr>
          </thead>
          <tbody>
            {devices.map((dev, idx) => (
              <tr key={dev.id} className="bg-white hover:bg-[#F8FAFC] transition-colors">
                <td className="p-2.5 border border-[#CBD5E1] font-bold text-[#1A1A1A]">
                  <div className="flex items-center justify-center gap-1.5">
                    {dev.icon}
                    <span>{dev.name}</span>
                  </div>
                </td>
                <td className="p-2.5 border border-[#CBD5E1] text-[#0284C7] font-bold" dir="ltr">
                  {dev.er} kJ
                </td>
                <td className="p-2.5 border border-[#CBD5E1] text-[#0F766E] font-bold" dir="ltr">
                  {dev.eu} kJ
                </td>
                <td className="p-2.5 border border-[#CBD5E1] text-[#EA580C] font-bold" dir="ltr">
                  {dev.ed} kJ
                </td>
                <td className="p-2.5 border border-[#CBD5E1]">
                  <input
                    type="text"
                    value={rowInputs[idx]}
                    onChange={(e) => {
                      const updated = [...rowInputs];
                      updated[idx] = e.target.value;
                      setRowInputs(updated);
                    }}
                    placeholder="اكتب هنا..."
                    className="w-full text-center px-2 py-1.5 rounded-[6px] border border-[#CBD5E1] bg-[#F8FAFC] focus:bg-white focus:border-[#0F766E] text-xs font-bold text-[#1A1A1A] outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* حقل استنتاج التلميذ النهائي */}
      <div className="space-y-1 pt-1">
        <label className="block text-xs sm:text-sm font-bold text-[#1A1A1A]">
          الاستنتاج العام للتلميذ بعد مقارنة الأجهزة الثلاثة :
        </label>
        <textarea
          rows={2}
          value={generalConclusion}
          onChange={(e) => setGeneralConclusion(e.target.value)}
          placeholder="اكتب هنا..."
          className="w-full p-2.5 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] focus:bg-white focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 text-xs sm:text-sm text-[#1A1A1A] outline-none transition-all resize-none"
        />
      </div>

      {/* زر إظهار التصحيح */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowCorrection(!showCorrection)}
          className="no-pdf inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
        >
          {showCorrection ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>إخفاء التصحيح</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>اعرض التصحيح</span>
            </>
          )}
        </button>

        {showCorrection && (
          <div className="mt-2.5 p-3.5 rounded-[12px] bg-[#F0FDFA] border border-[#0F766E]/30 space-y-2 text-xs sm:text-sm text-[#134E4A] leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-[#0F766E]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>التصحيح والتحقق الحسابي النموذجي :</span>
            </div>
            <ul className="pr-5 list-disc space-y-1">
              <li>
                <strong>المصباح الكهربائي :</strong>{' '}
                <span dir="ltr" className="font-bold">
                  100 = 20 + 80
                </span>{' '}
                (محققة تمامًا : الطاقة المستقبلة 100 kJ = 20 kJ طاقة ضوئية مفيدة + 80 kJ طاقة حرارية متبددة).
              </li>
              <li>
                <strong>المحرك الكهربائي :</strong>{' '}
                <span dir="ltr" className="font-bold">
                  200 = 150 + 50
                </span>{' '}
                (محققة تمامًا : الطاقة المستقبلة 200 kJ = 150 kJ طاقة حركية مفيدة + 50 kJ طاقة متبددة).
              </li>
              <li>
                <strong>سخان الماء :</strong>{' '}
                <span dir="ltr" className="font-bold">
                  500 = 450 + 50
                </span>{' '}
                (محققة تمامًا : الطاقة المستقبلة 500 kJ = 450 kJ طاقة حرارية مفيدة لتسخين الماء + 50 kJ ضياع).
              </li>
            </ul>
            <div className="p-2.5 rounded-[8px] bg-white border border-[#99F6E4] text-xs font-bold text-[#0F766E]">
              <strong>الاستنتاج العلمي الأساسي :</strong> العلاقة الرياضية{' '}
              <span dir="ltr">E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub></span>{' '}
              تنطبق بدقة على جميع الأجهزة التقنية. فالطاقة الداخلة تنحفظ كليًا ولا تفنى، وتتوزع بين النفع المفيد والتبدد. وبما أن{' '}
              <span dir="ltr">E<sub>d</sub> ≥ 0</span> فإن{' '}
              <span dir="ltr">E<sub>u</sub> ≤ E<sub>r</sub></span> دائمًا.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 3. MINI-ACTIVITÉ RENDEMENT η : CALCUL & CLASSEMENT PAR EFFICACITÉ
// ============================================================================
export const Course09EfficiencyMiniActivity: React.FC = () => {
  const [lampEff, setLampEff] = useState('');
  const [motorEff, setMotorEff] = useState('');
  const [heaterEff, setHeaterEff] = useState('');
  const [ranking, setRanking] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);

  useEffect(() => {
    const handlePreparePdf = () => setShowCorrection(true);
    const handleDonePdf = () => setShowCorrection(false);
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    window.addEventListener('course-pdf-done', handleDonePdf);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePreparePdf);
      window.removeEventListener('course-pdf-done', handleDonePdf);
    };
  }, []);

  return (
    <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E5DDD5] p-4 sm:p-6 space-y-4" dir="rtl">
      <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[8px] bg-[#0F766E] text-white text-xs font-bold">
            نشاط تطبيقي
          </span>
          <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
            حساب المردود الطاقوي (η) وتصنيف الأجهزة حسب فعاليتها
          </h3>
        </div>
        <span className="text-xs text-[#0F766E] font-semibold" dir="ltr">
          η = (E<sub>u</sub> / E<sub>r</sub>) × 100
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
        باستخدام قيم النشاط 2 (المصباح 100/20 kJ، المحرك 200/150 kJ، سخان الماء 500/450 kJ)، احسب المردود الطاقوي{' '}
        <span dir="ltr" className="font-bold text-[#0F766E]">η (%)</span> لكل جهاز ثم رتّب الأجهزة من الأكثر كفاءة إلى الأقل كفاءة :
      </p>

      {/* 3 حقول لحساب المردود */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-1.5">
          <div className="text-xs font-bold text-[#1A1A1A]">1. المصباح الكهربائي</div>
          <div className="text-[11px] text-[#6B6B6B]" dir="ltr">
            E<sub>r</sub> = 100 kJ , E<sub>u</sub> = 20 kJ
          </div>
          <input
            type="text"
            value={lampEff}
            onChange={(e) => setLampEff(e.target.value)}
            placeholder="اكتب هنا..."
            className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#CBD5E1] bg-white text-xs font-bold text-center outline-none focus:border-[#0F766E]"
          />
        </div>

        <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-1.5">
          <div className="text-xs font-bold text-[#1A1A1A]">2. المحرك الكهربائي</div>
          <div className="text-[11px] text-[#6B6B6B]" dir="ltr">
            E<sub>r</sub> = 200 kJ , E<sub>u</sub> = 150 kJ
          </div>
          <input
            type="text"
            value={motorEff}
            onChange={(e) => setMotorEff(e.target.value)}
            placeholder="اكتب هنا..."
            className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#CBD5E1] bg-white text-xs font-bold text-center outline-none focus:border-[#0F766E]"
          />
        </div>

        <div className="p-3 rounded-[10px] bg-[#FAF7F4] border border-[#E2D9D0] space-y-1.5">
          <div className="text-xs font-bold text-[#1A1A1A]">3. سخان الماء</div>
          <div className="text-[11px] text-[#6B6B6B]" dir="ltr">
            E<sub>r</sub> = 500 kJ , E<sub>u</sub> = 450 kJ
          </div>
          <input
            type="text"
            value={heaterEff}
            onChange={(e) => setHeaterEff(e.target.value)}
            placeholder="اكتب هنا..."
            className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#CBD5E1] bg-white text-xs font-bold text-center outline-none focus:border-[#0F766E]"
          />
        </div>
      </div>

      {/* الترتيب حسب الفعالية */}
      <div className="space-y-1 pt-1">
        <label className="block text-xs sm:text-sm font-bold text-[#1A1A1A]">
          رتّب الأجهزة الثلاثة من الأكثر فعالية طاقوية إلى الأقل فعالية (باستخدام الرمز « ← » في اتجاه القراءة) :
        </label>
        <input
          type="text"
          value={ranking}
          onChange={(e) => setRanking(e.target.value)}
          placeholder="اكتب هنا..."
          className="w-full px-3 py-2 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] focus:bg-white focus:border-[#0F766E] text-xs sm:text-sm text-[#1A1A1A] outline-none"
        />
      </div>

      {/* زر إظهار التصحيح */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowCorrection(!showCorrection)}
          className="no-pdf inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#0F766E] hover:bg-[#0D655E] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
        >
          {showCorrection ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>إخفاء التصحيح</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>اعرض التصحيح</span>
            </>
          )}
        </button>

        {showCorrection && (
          <div className="mt-2.5 p-3.5 rounded-[12px] bg-[#F0FDFA] border border-[#0F766E]/30 space-y-2 text-xs sm:text-sm text-[#134E4A] leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-[#0F766E]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>التصحيح النموذجي وتصنيف الفعالية :</span>
            </div>
            <ul className="pr-5 list-disc space-y-1">
              <li>
                <strong>المصباح الكهربائي :</strong>{' '}
                <span dir="ltr" className="font-bold">
                  η = (20 / 100) × 100 = 20%
                </span>
              </li>
              <li>
                <strong>المحرك الكهربائي :</strong>{' '}
                <span dir="ltr" className="font-bold">
                  η = (150 / 200) × 100 = 75%
                </span>
              </li>
              <li>
                <strong>سخان الماء :</strong>{' '}
                <span dir="ltr" className="font-bold">
                  η = (450 / 500) × 100 = 90%
                </span>
              </li>
            </ul>
            <div className="p-2.5 rounded-[8px] bg-white border border-[#99F6E4] text-xs font-bold text-[#0F766E]">
              <strong>الترتيب حسب الفعالية الطاقوية (من الأكثر كفاءة إلى الأقل) :</strong>
              <div className="mt-1 text-sm font-bold text-center text-[#0F766E]">
                سخان الماء (90%) ← المحرك الكهربائي (75%) ← المصباح الكهربائي (20%)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 4. SVG DE LA CHAÎNE HYDROÉLECTRIQUE (POLICE >= 12PX, ÉTIQUETTES NON ROGNÉES)
// ============================================================================
export const HydroelectricEnergyChainSvg: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] rounded-[16px] border border-[#E2D9D0] p-4 sm:p-5 space-y-3" dir="rtl">
      <div className="flex items-center justify-between border-b border-[#E5DDD5] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
          <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
            مخطط السلسلة الطاقوية للمحطة الكهرومائية وتدفق الطاقة (من اليمين إلى اليسار)
          </h4>
        </div>
        <span className="text-xs font-semibold text-[#0F766E]" dir="ltr">
          100 kJ = 90 kJ + 10 kJ
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox="-25 0 1150 440"
          className="w-full min-w-[760px] h-auto max-h-[380px] select-none block"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          <defs>
            <marker
              id="arrowTealEnergy"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0F766E" />
            </marker>
            <marker
              id="arrowOrangeDissipated"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#EA580C" />
            </marker>
          </defs>

          {/* Bandeaux de phases */}
          <rect x="350" y="24" width="205" height="34" rx="8" fill="#F0FDFA" stroke="#0F766E" strokeWidth="1.5" />
          <text x="452.5" y="46" textAnchor="middle" fill="#0F766E" fontSize="13.5" fontWeight="bold">
            المرحلة الأولى : التوربين (Turbine)
          </text>

          <rect x="90" y="24" width="205" height="34" rx="8" fill="#F0FDFA" stroke="#0F766E" strokeWidth="1.5" />
          <text x="192.5" y="46" textAnchor="middle" fill="#0F766E" fontSize="13.5" fontWeight="bold">
            المرحلة الثانية : المنوب (Alternateur)
          </text>

          {/* Boîte 1 : حوض التخزين */}
          <rect x="870" y="90" width="205" height="100" rx="12" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />
          <text x="972.5" y="134" textAnchor="middle" fill="#0369A1" fontSize="18" fontWeight="bold">
            حوض التخزين (السد)
          </text>
          <text x="972.5" y="160" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="bold">
            Réservoir d'eau
          </text>

          {/* Flèche 1 */}
          <line
            x1="870"
            y1="140"
            x2="815"
            y2="140"
            stroke="#0F766E"
            strokeWidth="3.5"
            markerEnd="url(#arrowTealEnergy)"
          />
          <text x="842" y="82" textAnchor="middle" fill="#0F766E" fontSize="14" fontWeight="bold">
            طاقة حركية (تدفق)
          </text>
          <text x="842" y="102" textAnchor="middle" fill="#047857" fontSize="12.5" fontWeight="bold">
            (Er = 100 kJ)
          </text>

          {/* Boîte 2 : التوربين */}
          <rect x="350" y="90" width="205" height="100" rx="12" fill="#F0FDFA" stroke="#0F766E" strokeWidth="2.5" />
          <text x="452.5" y="134" textAnchor="middle" fill="#0F766E" fontSize="18" fontWeight="bold">
            التوربين
          </text>
          <text x="452.5" y="160" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="bold">
            Turbine
          </text>

          {/* Boîte 3 : المنوب */}
          <rect x="90" y="90" width="205" height="100" rx="12" fill="#F0FDFA" stroke="#0F766E" strokeWidth="2.5" />
          <text x="192.5" y="134" textAnchor="middle" fill="#0F766E" fontSize="18" fontWeight="bold">
            المنوب الكهربائي
          </text>
          <text x="192.5" y="160" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="bold">
            Alternateur
          </text>

          {/* Flèche entre Turbine et Alternateur */}
          <line
            x1="350"
            y1="140"
            x2="295"
            y2="140"
            stroke="#0F766E"
            strokeWidth="3.5"
            markerEnd="url(#arrowTealEnergy)"
          />
          <text x="322" y="82" textAnchor="middle" fill="#0F766E" fontSize="14" fontWeight="bold">
            طاقة ميكانيكية دورانية
          </text>
          <text x="322" y="102" textAnchor="middle" fill="#047857" fontSize="12.5" fontWeight="bold">
            (Eu1 = Er2 = 95 kJ)
          </text>

          {/* Flèche finale vers le réseau */}
          <line
            x1="90"
            y1="140"
            x2="25"
            y2="140"
            stroke="#0F766E"
            strokeWidth="3.5"
            markerEnd="url(#arrowTealEnergy)"
          />
          <text x="58" y="82" textAnchor="middle" fill="#0F766E" fontSize="14" fontWeight="bold">
            طاقة كهربائية مفيدة
          </text>
          <text x="58" y="102" textAnchor="middle" fill="#047857" fontSize="12.5" fontWeight="bold">
            (Eu = 90 kJ)
          </text>

          {/* Branche dissipée 1 (Turbine) */}
          <line
            x1="452.5"
            y1="190"
            x2="452.5"
            y2="280"
            stroke="#EA580C"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#arrowOrangeDissipated)"
          />
          <rect x="352.5" y="295" width="200" height="42" rx="8" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.5" />
          <text x="452.5" y="322" textAnchor="middle" fill="#EA580C" fontSize="14" fontWeight="bold">
            طاقة متبددة (حرارة واحتكاك 5 kJ)
          </text>

          {/* Branche dissipée 2 (Alternateur) */}
          <line
            x1="192.5"
            y1="190"
            x2="192.5"
            y2="345"
            stroke="#EA580C"
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#arrowOrangeDissipated)"
          />
          <rect x="92.5" y="360" width="200" height="42" rx="8" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.5" />
          <text x="192.5" y="387" textAnchor="middle" fill="#EA580C" fontSize="14" fontWeight="bold">
            طاقة متبددة (حرارة ومقاومة 5 kJ)
          </text>
        </svg>
      </div>
    </div>
  );
};

// ============================================================================
// 5. ERREUR 2 INTERACTIVE CARD (SANS PLACEHOLDER PARASITE)
// ============================================================================
export const Course09Mistake2Interactive: React.FC = () => {
  const [ans, setAns] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);

  useEffect(() => {
    const handlePreparePdf = () => setShowCorrection(true);
    const handleDonePdf = () => setShowCorrection(false);
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    window.addEventListener('course-pdf-done', handleDonePdf);
    return () => {
      window.removeEventListener('course-pdf-prepare', handlePreparePdf);
      window.removeEventListener('course-pdf-done', handleDonePdf);
    };
  }, []);

  return (
    <div className="p-4 rounded-[14px] bg-[#FEF2F2] border-2 border-[#FCA5A5] space-y-3" dir="rtl">
      <div className="flex items-center gap-2 text-[#991B1B] font-bold text-xs sm:text-sm border-b border-[#FECACA] pb-2">
        <span className="px-2 py-0.5 rounded bg-[#991B1B] text-white text-xs font-bold">الخطأ الشائع 2</span>
        <span>ادعاء الحصول على طاقة مفيدة تفوق الطاقة المستقبلة (Eu &gt; Er)</span>
      </div>

      <p className="text-xs sm:text-sm text-[#7F1D1D] leading-relaxed">
        استقبل جهاز طاقة قدرها <span className="font-bold" dir="ltr">100 J</span>، فادعى أحد التلاميذ أنه أنتج{' '}
        <span className="font-bold" dir="ltr">120 J</span> من الطاقة المفيدة. هل هذا ممكن علميًا؟ برر بالاعتماد على مبدأ انحفاظ الطاقة :
      </p>

      <div className="space-y-1">
        <input
          type="text"
          value={ans}
          onChange={(e) => setAns(e.target.value)}
          placeholder="اكتب هنا..."
          className="w-full px-3 py-2 rounded-[10px] border border-[#FCA5A5] bg-white text-xs sm:text-sm text-[#1A1A1A] outline-none focus:border-[#991B1B]"
        />
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowCorrection(!showCorrection)}
          className="no-pdf inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          {showCorrection ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>إخفاء التبرير</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>اعرض التصحيح</span>
            </>
          )}
        </button>

        {showCorrection && (
          <div className="mt-2.5 p-3.5 rounded-[12px] bg-white border-2 border-[#991B1B] space-y-1.5 text-xs sm:text-sm text-[#7F1D1D] leading-relaxed">
            <div className="font-bold text-[#991B1B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
              <span>التصحيح العلمي الدقيق (انحفاظ الطاقة) :</span>
            </div>
            <p>
              هذا الادعاء <strong>مستحيل فيزيائيًا</strong>؛ لأن معادلة الحصيلة الطاقوية هي:{' '}
              <span dir="ltr" className="font-bold text-[#991B1B]">
                E<sub>u</sub> = E<sub>r</sub> − E<sub>d</sub>
              </span>.
            </p>
            <p>
              وبما أن الطاقة المتبددة موجبة أو معدومة حتمًا (<span dir="ltr">E<sub>d</sub> ≥ 0</span>)، فإن الطاقة المفيدة تكون دائمًا أصغر من أو تساوي الطاقة المستقبلة:{' '}
              <span dir="ltr" className="font-bold text-[#991B1B]">
                E<sub>u</sub> ≤ E<sub>r</sub>
              </span>. فالطاقة لا تفنى ولا تُستحدث من العدم.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 6. SCHÉMA BILAN DE SYNTHÈSE (COMPACT, REMPLACE LA CARTE MENTALE BULKY)
// ============================================================================
export const Course09SchemaBilanSynthese: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-[#FAF7F4] rounded-[14px] border border-[#E2D9D0] space-y-4" dir="rtl">
      <div className="text-center space-y-1 border-b border-[#E2D9D0] pb-2">
        <div className="text-sm sm:text-base font-bold text-[#0F766E]">
          مخطط الحصيلة الطاقوية ومبدأ انحفاظ الطاقة (Schéma bilan)
        </div>
        <div className="text-xs text-[#6B6B6B]" dir="ltr">
          Bilan énergétique : Énergie reçue = Énergie utile + Énergie dissipée
        </div>
      </div>

      {/* Représentation visuelle compacte */}
      <div className="p-3 bg-white rounded-[12px] border border-[#CBD5E1] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-center">
          {/* Entrée : Énergie reçue */}
          <div className="p-3 rounded-[10px] bg-[#EFF6FF] border border-[#93C5FD] space-y-1">
            <div className="text-xs font-bold text-[#1D4ED8]">الطاقة المستقبلة (الداخلة)</div>
            <div className="text-sm font-bold text-[#1E40AF]" dir="ltr">
              E<sub>r</sub>
            </div>
            <div className="text-[11px] text-[#64748B]">تأتي من المصدر الخارجي</div>
          </div>

          {/* Système convertisseur */}
          <div className="p-3.5 rounded-[12px] bg-[#F0FDFA] border-2 border-[#0F766E] space-y-1">
            <div className="text-xs sm:text-sm font-extrabold text-[#0F766E]">
              الجهاز / النظام المحوّل
            </div>
            <div className="text-[11px] text-[#115E59]">تحويل الطاقات وفق مبدأ الانحفاظ</div>
            <div className="text-xs font-bold text-[#0F766E]" dir="ltr">
              E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub>
            </div>
          </div>

          {/* Sorties : Utile et Dissipée */}
          <div className="space-y-2">
            <div className="p-2 rounded-[8px] bg-[#F0FDF4] border border-[#86EFAC] text-center">
              <div className="text-xs font-bold text-[#15803D]">▲ طاقة مفيدة (E<sub>u</sub>)</div>
              <div className="text-[10px] text-[#166534]">تحقق الوظيفة المطلوبة</div>
            </div>
            <div className="p-2 rounded-[8px] bg-[#FFF7ED] border border-[#FDBA74] text-center">
              <div className="text-xs font-bold text-[#EA580C]">▼ طاقة متبددة (E<sub>d</sub>)</div>
              <div className="text-[10px] text-[#C2410C]">تنتشر في الوسط (حرارة، احتكاك)</div>
            </div>
          </div>
        </div>

        {/* Formules clés récapitulatives */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#F1F5F9] text-center text-xs">
          <div className="p-2 rounded-[8px] bg-[#FAF7F4] border border-[#E2D9D0]">
            <span className="font-bold text-[#0F766E]">مبدأ الانحفاظ :</span>
            <div className="font-bold text-[#1A1A1A] mt-0.5" dir="ltr">
              E<sub>r</sub> = E<sub>u</sub> + E<sub>d</sub>
            </div>
          </div>
          <div className="p-2 rounded-[8px] bg-[#FAF7F4] border border-[#E2D9D0]">
            <span className="font-bold text-[#0F766E]">المقارنة الحتمية :</span>
            <div className="font-bold text-[#1A1A1A] mt-0.5" dir="ltr">
              E<sub>u</sub> = E<sub>r</sub> − E<sub>d</sub> ≤ E<sub>r</sub>
            </div>
          </div>
          <div className="p-2 rounded-[8px] bg-[#FAF7F4] border border-[#E2D9D0]">
            <span className="font-bold text-[#0F766E]">المردود الطاقوي :</span>
            <div className="font-bold text-[#1A1A1A] mt-0.5" dir="ltr">
              η (%) = (E<sub>u</sub> / E<sub>r</sub>) × 100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dynamo component kept for Ex. 4 reference
export const DynamoComponentsVsEnergySchema: React.FC = () => {
  return null;
};
