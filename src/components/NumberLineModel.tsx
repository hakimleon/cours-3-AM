import React, { useState } from 'react';
import { MathView } from './MathView';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

export const NumberLineModel: React.FC = () => {
  const [currentStart, setCurrentStart] = useState<number>(-3);
  const [currentStep, setCurrentStep] = useState<number>(7);

  const finalValue = currentStart + currentStep;

  // Points from -6 to +6
  const points = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

  return (
    <div
      id="number-line-model"
      className="my-6 p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          المحور المدرج التفاعلي (تمثيل الجمع كحركة)
        </div>
        <button
          type="button"
          onClick={() => {
            setCurrentStart(-3);
            setCurrentStep(7);
          }}
          className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>إعادة ضبط</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 mb-6">
        الحركة نحو اليمين تمثل إضافة عدد موجب (+)، والحركة نحو اليسار تمثل إضافة عدد سالب (-).
      </p>

      {/* Interactive Number Line Visualization */}
      <div className="overflow-x-auto py-6 px-2 bg-white rounded-xl border border-slate-200">
        <div className="min-w-[500px] max-w-2xl mx-auto relative px-6">
          {/* Main Axis Line */}
          <div className="h-0.5 bg-slate-400 w-full relative my-8">
            {/* Left arrow */}
            <div className="absolute -left-2 -top-1.5 text-slate-400">
              <ArrowLeft className="w-4 h-4" />
            </div>
            {/* Right arrow */}
            <div className="absolute -right-2 -top-1.5 text-slate-400">
              <ArrowRight className="w-4 h-4" />
            </div>

            {/* Graduations */}
            <div className="flex justify-between absolute inset-0 -top-2 items-center">
              {points.map((pt) => {
                const isStart = pt === currentStart;
                const isEnd = pt === finalValue;
                const isZero = pt === 0;

                return (
                  <div key={pt} className="flex flex-col items-center relative">
                    {/* Tick mark */}
                    <div
                      className={`w-0.5 ${
                        isZero
                          ? 'h-5 bg-slate-900 w-1'
                          : isStart || isEnd
                          ? 'h-4 bg-indigo-600 w-0.5'
                          : 'h-3 bg-slate-300'
                      }`}
                    />

                    {/* Label */}
                    <span
                      className={`text-[11px] font-mono mt-1.5 ${
                        isZero
                          ? 'font-bold text-slate-900 text-xs'
                          : isStart
                          ? 'font-bold text-rose-600'
                          : isEnd
                          ? 'font-bold text-emerald-600'
                          : 'text-slate-400'
                      }`}
                      dir="ltr"
                    >
                      {pt > 0 ? `+${pt}` : pt}
                    </span>

                    {/* Start Marker badge */}
                    {isStart && (
                      <div className="absolute -top-7 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap">
                        البداية ({currentStart})
                      </div>
                    )}

                    {/* End Marker badge */}
                    {isEnd && (
                      <div className="absolute -top-7 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap">
                        الوصول ({finalValue > 0 ? `+${finalValue}` : finalValue})
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Equation Result summary */}
      <div className="mt-4 p-3.5 bg-white rounded-lg border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-around gap-2 text-xs sm:text-sm">
        <div className="text-slate-600">
          الانطلاق من: <span className="font-bold text-rose-600 font-mono" dir="ltr">{currentStart}</span>
        </div>
        <div className="text-slate-600">
          الحركة يميناً بـ: <span className="font-bold text-indigo-600 font-mono" dir="ltr">+{currentStep}</span> وحدات
        </div>
        <div className="font-bold text-slate-900 border-t sm:border-t-0 sm:border-r sm:pr-4 pt-1 sm:pt-0">
          <MathView
            math={`(${currentStart > 0 ? `+${currentStart}` : currentStart}) + (+${currentStep}) = ${
              finalValue > 0 ? `+${finalValue}` : finalValue
            }`}
          />
        </div>
      </div>
    </div>
  );
};
