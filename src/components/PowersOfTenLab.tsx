import React, { useState } from 'react';
import { MathView } from './MathView';

export const PowersOfTenLab: React.FC = () => {
  const [expN, setExpN] = useState<number>(3);
  const [expM, setExpM] = useState<number>(2);

  const zerosN = '0'.repeat(expN);
  const zerosM = '0'.repeat(expM);
  const zerosSum = '0'.repeat(expN + expM);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. Left Column (7 cols): Core Visual Schema Card + Separate Sliders Card Underneath */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="w-full text-right">
              <h3 className="text-xs sm:text-sm font-semibold text-indigo-400">
                1. التمثيل البصري : ضم عوامل العدد 10 وتراكم الأصفار عند الضرب
              </h3>
            </div>

            {/* Two Powers Being Multiplied */}
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center" dir="ltr">
              {/* First group 10^n */}
              <div className="sm:col-span-5 bg-indigo-950/60 border border-indigo-500/50 rounded-2xl p-3.5 text-center space-y-1.5">
                <div className="text-xs font-normal text-indigo-300" dir="rtl">
                  القوة الأولى ({expN} عوامل للعدد 10)
                </div>
                <div className="py-1">
                  <MathView
                    math={`10^{${expN}} = 1${zerosN}`}
                    className="text-white text-base sm:text-lg"
                  />
                </div>
              </div>

              {/* Multiply symbol */}
              <div className="sm:col-span-1 text-center text-amber-400 text-xl font-semibold">
                ×
              </div>

              {/* Second group 10^m */}
              <div className="sm:col-span-5 bg-amber-950/40 border border-amber-500/50 rounded-2xl p-3.5 text-center space-y-1.5">
                <div className="text-xs font-normal text-amber-300" dir="rtl">
                  القوة الثانية ({expM} عوامل للعدد 10)
                </div>
                <div className="py-1">
                  <MathView
                    math={`10^{${expM}} = 1${zerosM}`}
                    className="text-white text-base sm:text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Combined Result showing the full pedagogical chain a^n * a^m = a^{n+m} = a^{sum} */}
            <div className="bg-emerald-950/45 border border-emerald-500/50 rounded-2xl p-4 text-center space-y-2.5">
              <div className="text-xs font-normal text-emerald-300">
                قاعدة جداء قوتين (نحتفظ بالأساس ونجمع الأسين) :
              </div>
              <div
                className="bg-slate-950/80 border border-emerald-500/30 rounded-xl py-2.5 px-3"
                dir="ltr"
              >
                <MathView
                  math={`10^{${expN}} \\times 10^{${expM}} = 10^{${expN}+${expM}} = 10^{${expN + expM}} = 1${zerosSum}`}
                  block
                  className="text-emerald-300 text-base sm:text-lg font-semibold"
                />
              </div>
              <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs font-normal text-slate-300">
                <span>وبنفس القاعدة لأي أساس :</span>
                <span
                  dir="ltr"
                  className="bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-lg"
                >
                  <MathView
                    math="5^2 \times 5^5 = 5^{2+5} = 5^7"
                    className="text-amber-300 text-xs sm:text-sm"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Separate Sliders Card Underneath */}
          <div className="no-pdf bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-normal">
                <span className="text-indigo-300">الأس الأول (n):</span>
                <span className="font-mono text-indigo-300" dir="ltr">
                  n = {expN}
                </span>
              </div>
              <input
                dir="ltr"
                type="range"
                min="1"
                max="4"
                step="1"
                value={expN}
                onChange={(e) => setExpN(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-normal">
                <span className="text-amber-300">الأس الثاني (m):</span>
                <span className="font-mono text-amber-300" dir="ltr">
                  m = {expM}
                </span>
              </div>
              <input
                dir="ltr"
                type="range"
                min="1"
                max="4"
                step="1"
                value={expM}
                onChange={(e) => setExpM(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Reading in Vis-à-Vis (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="text-xs font-semibold text-indigo-400">
              2. قراءة التمثيل البصري :
            </div>
            <p className="text-xs font-normal text-slate-300 leading-relaxed">
              الأس الطبيعي <span dir="ltr" className="font-serif italic text-white">n</span> في الكتابة{' '}
              <MathView math="10^n" className="text-white" /> يعبّر في آن واحد عن{' '}
              <span className="text-indigo-300">عدد العوامل المضروبة في نفسها</span> وعن{' '}
              <span className="text-emerald-300">عدد الأصفار عن يمين الرقم 1</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
