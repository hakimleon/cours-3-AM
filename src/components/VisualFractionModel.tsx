import React from 'react';
import { MathView } from './MathView';

export const VisualFractionModel: React.FC = () => {
  return (
    <div
      id="visual-fraction-model"
      className="my-6 p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80"
    >
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        التمثيل البصري للعملية
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
        {/* Term 1: 3/7 */}
        <div className="text-center">
          <div className="text-xs text-slate-500 font-medium mb-1.5">3 أجزاء من 7</div>
          <div className="flex gap-1 p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-8 rounded-xs transition-all ${
                  i < 3 ? 'bg-indigo-600' : 'bg-slate-100 border border-slate-200/50'
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-sm font-semibold">
            <MathView math="\frac{3}{7}" />
          </div>
        </div>

        {/* Plus operator */}
        <div className="text-xl font-bold text-slate-400 select-none">+</div>

        {/* Term 2: 2/7 */}
        <div className="text-center">
          <div className="text-xs text-slate-500 font-medium mb-1.5">جزآن من 7</div>
          <div className="flex gap-1 p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-8 rounded-xs transition-all ${
                  i < 2 ? 'bg-sky-500' : 'bg-slate-100 border border-slate-200/50'
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-sm font-semibold">
            <MathView math="\frac{2}{7}" />
          </div>
        </div>

        {/* Equal operator */}
        <div className="text-xl font-bold text-slate-400 select-none">=</div>

        {/* Result: 5/7 */}
        <div className="text-center">
          <div className="text-xs text-indigo-700 font-bold mb-1.5">5 أجزاء من 7</div>
          <div className="flex gap-1 p-1.5 bg-white rounded-lg border-2 border-indigo-200 shadow-xs">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-8 rounded-xs transition-all ${
                  i < 3
                    ? 'bg-indigo-600'
                    : i < 5
                    ? 'bg-sky-500'
                    : 'bg-slate-100 border border-slate-200/50'
                }`}
              />
            ))}
          </div>
          <div className="mt-2 text-sm font-bold text-indigo-700">
            <MathView math="\frac{5}{7}" />
          </div>
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm text-slate-600 mt-3 pt-3 border-t border-slate-200/60 font-medium">
        نلاحظ أن حجم الأجزاء (المقام 7) لم يتغير، بل قمنا بجمع عدد الأجزاء فقط: <span className="font-semibold text-slate-800">3 أجزاء + 2 أجزاء = 5 أجزاء</span>.
      </div>
    </div>
  );
};
