import React, { useState } from 'react';
import { MathView } from './MathView';

export const OperationPrioritiesLab: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(3);

  const stages = [
    {
      level: 'المرحلة 1 : ما داخل القوسين أولاً',
      ruleBadge: '1. ( \\dots )',
      latex: '50 - 2 \\times (3 + 1)^2 = 50 - 2 \\times 4^2',
      activeBg: 'bg-indigo-950/60 border-indigo-400/70 text-white',
    },
    {
      level: 'المرحلة 2 : حساب القوى قبل الضرب',
      ruleBadge: '2. a^n',
      latex: '50 - 2 \\times 4^2 = 50 - 2 \\times 16',
      activeBg: 'bg-amber-950/50 border-amber-400/70 text-amber-200',
    },
    {
      level: 'المرحلة 3 : إنجاز الضرب قبل الطرح',
      ruleBadge: '3. (\\times , \\div)',
      latex: '50 - 2 \\times 16 = 50 - 32',
      activeBg: 'bg-emerald-950/50 border-emerald-400/70 text-emerald-200',
    },
    {
      level: 'المرحلة 4 : الجمع والطرح في الأخير',
      ruleBadge: '4. (+ , -)',
      latex: '50 - 32 = 18',
      activeBg: 'bg-sky-950/55 border-sky-400/80 text-sky-300',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. Left Column (7 cols): Core Visual Card + Separate Controls Card Underneath */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="w-full text-right">
              <h3 className="text-xs sm:text-sm font-semibold text-indigo-400">
                1. شجرة تفكيك سلسلة عمليات تتضمن قوى وأقواس
              </h3>
            </div>

            <div className="space-y-2.5">
              {stages.map((st, idx) => {
                const isActive = stepIndex >= idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                      isActive
                        ? st.activeBg
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <span className="text-xs font-normal text-slate-300">
                      {st.level}
                    </span>
                    <div dir="ltr" className="text-center sm:text-right">
                      <MathView
                        math={st.latex}
                        className={`${
                          isActive ? 'text-white font-semibold' : 'text-slate-400'
                        } text-sm sm:text-base`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Separate Interactive Stage Selector Card Underneath */}
          <div className="no-pdf bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap justify-center gap-2">
            {stages.map((st, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setStepIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-normal border transition-all cursor-pointer ${
                  stepIndex === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {st.level}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Reading in Vis-à-Vis (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="text-xs font-semibold text-indigo-400">
              2. قراءة سلم الأولويات :
            </div>
            <p className="text-xs font-normal text-slate-300 leading-relaxed">
              لو أنجزنا العمليات عشوائياً من اليمين أو اليسار لحصل كل تلميذ على نتيجة مختلفة! لذلك يخضع الحساب لسلم أسبقية صارم من الأعلى إلى الأسفل (الأقواس، ثم القوى، ثم الضرب والقسمة، ثم الجمع والطرح).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
