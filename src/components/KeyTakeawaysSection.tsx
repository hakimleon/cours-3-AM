import React from 'react';
import { Course } from '../types';
import { MathView } from './MathView';
import { Lightbulb } from 'lucide-react';

interface KeyTakeawaysSectionProps {
  keyTakeaways: Course['keyTakeaways'];
}

export const KeyTakeawaysSection: React.FC<KeyTakeawaysSectionProps> = ({
  keyTakeaways,
}) => {
  return (
    <section id="sec-takeaways" className="my-12 scroll-mt-20">
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2 text-indigo-700">
          <Lightbulb className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-wider">
            المفكرة الذهبية
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          ما يجب أن أتذكره
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          أهم القواعد المنهجية التي يجب استحضارها وتطبيقها تلقائياً في التمارين والاختبارات.
        </p>

        <div className="space-y-3">
          {keyTakeaways.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {item.detail}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200 text-center shrink-0 self-start md:self-auto min-w-[280px] max-w-full overflow-x-auto">
                <MathView math={item.formula} block />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
