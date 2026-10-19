import React, { useState } from 'react';

/**
 * Banc de diagnostic d'un appareil électrique (Cours 17).
 * Carte nominale (U_nom, P_nom) + mesures (U, I) -> P mesurée + énergie E = P × t.
 */

const fmt = (v: number, digits = 2) =>
  v
    .toFixed(digits)
    .replace('.', ',')
    .replace(/,?0+$/, '');

const Slider: React.FC<{
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  color: string;
}> = ({ label, unit, value, min, max, step, onChange, color }) => (
  <label className="block bg-white rounded-[12px] border border-[#E2D9D0] p-3 space-y-1.5">
    <span className="flex items-center justify-between text-xs font-bold">
      <span style={{ color }}>{label}</span>
      <span className="text-[#64748B]">
        {fmt(value)} {unit}
      </span>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-[#0F766E]"
    />
  </label>
);

export const PowerDeviceDiagnosis: React.FC = () => {
  const [nomU, setNomU] = useState(12);
  const [nomP, setNomP] = useState(24);
  const [U, setU] = useState(12);
  const [I, setI] = useState(1);
  const [t, setT] = useState(5);

  const measuredP = U * I;
  const delta = measuredP - nomP;
  const conforms = Math.abs(delta) < 0.05 * nomP && Math.abs(U - nomU) < 0.05 * nomU;
  const energy = measuredP * t * 60; // t en minutes -> secondes
  const ratio = nomP !== 0 ? measuredP / nomP : 0;

  const verdict = conforms
    ? {
        tone: 'ok' as const,
        title: 'الجهاز يعمل في شروطه الاسمية',
        text: 'الاستطاعة المقاسة تطابق الاستطاعة المكتوبة على البطاقة.',
      }
    : measuredP < nomP
      ? {
          tone: 'low' as const,
          title: 'الاستطاعة المقاسة أقل من الاسمية',
          text: 'الجهاز لا يصل إلى شروطه الاسمية: تحقّق من التوتر المغذّي ومن حالة المصباح.',
        }
      : {
          tone: 'high' as const,
          title: 'الاستطاعة المقاسة أكبر من الاسمية',
          text: 'مستقبل غير مناسب لشروطه أو توتر تغذية أعلى من المذكور على البطاقة.',
        };

  const verdictStyle =
    verdict.tone === 'ok'
      ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]'
      : verdict.tone === 'low'
        ? 'bg-[#FFFBEB] border-[#FCD34D] text-[#78350F]'
        : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#7F1D1D]';

  return (
    <div className="space-y-4" dir="rtl">
      {/* Carte de l'appareil */}
      <div className="flex flex-wrap items-center gap-4 bg-[#0F172A] text-white rounded-[14px] p-4">
        <div className="font-mono font-bold text-lg" dir="ltr">
          {fmt(nomU)} V — {fmt(nomP)} W
        </div>
        <div className="text-[11px] text-[#94A3B8]">
          ما بين قوسين: التوتر الاسمي والاستطاعة الاسمية (valeurs nominales)
        </div>
      </div>

      {/* Réglages de la carte */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Slider
          label="التوتر الاسمي على البطاقة"
          unit="V"
          value={nomU}
          min={1.5}
          max={48}
          step={0.5}
          onChange={setNomU}
          color="#B45309"
        />
        <Slider
          label="الاستطاعة الاسمية على البطاقة"
          unit="W"
          value={nomP}
          min={3}
          max={200}
          step={1}
          onChange={setNomP}
          color="#15803D"
        />
      </div>

      {/* Mesures */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Slider
          label="التوتر المقاس (فولتميتر على التوازي)"
          unit="V"
          value={U}
          min={0}
          max={48}
          step={0.5}
          onChange={setU}
          color="#B45309"
        />
        <Slider
          label="شدة التيار المقاسة (أمبيرمتر على التسلسل)"
          unit="A"
          value={I}
          min={0}
          max={8}
          step={0.1}
          onChange={setI}
          color="#0369A1"
        />
        <Slider
          label="مدة التشغيل"
          unit="min"
          value={t}
          min={1}
          max={60}
          step={1}
          onChange={setT}
          color="#6D28D9"
        />
      </div>

      {/* Résultats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-[12px] border border-[#86EFAC] bg-[#F0FDF4] p-3 sm:p-4 space-y-1">
          <div className="text-[11px] font-bold text-[#166534]">الاستطاعة المقاسة</div>
          <div className="font-mono font-bold text-xl" dir="ltr" style={{ color: '#14532D' }}>
            P = U × I = {fmt(U)} × {fmt(I)} = {fmt(measuredP)} W
          </div>
        </div>
        <div className="rounded-[12px] border border-[#C7D2FE] bg-[#EEF2FF] p-3 sm:p-4 space-y-1">
          <div className="text-[11px] font-bold text-[#3730A3]">الطاقة المحولة</div>
          <div className="font-mono font-bold text-xl" dir="ltr" style={{ color: '#312E81' }}>
            E = P × t = {fmt(measuredP)} × {fmt(t * 60)} = {fmt(energy, 0)} J
          </div>
        </div>
      </div>

      {/* Diagnostic */}
      <div className={`rounded-[12px] border p-3 sm:p-4 space-y-1 ${verdictStyle}`}>
        <div className="text-sm font-bold">{verdict.title}</div>
        <div className="text-xs">{verdict.text}</div>
        <div className="text-xs font-mono" dir="ltr">
          P_nom = {fmt(nomP)} W · P_mes = {fmt(measuredP)} W · rapport = {fmt(ratio)} ×
        </div>
      </div>
    </div>
  );
};

export default PowerDeviceDiagnosis;