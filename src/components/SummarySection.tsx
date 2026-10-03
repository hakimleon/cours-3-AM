import React from 'react';
import { Course } from '../types';
import { MathView } from './MathView';

interface SummarySectionProps {
  summaryRules: Course['summaryRules'];
}

export const SummarySection: React.FC<SummarySectionProps> = ({ summaryRules }) => {
  return (
    <section id="sec-summary" className="my-12 scroll-mt-20">
      <div className="bg-white rounded-2xl border-2 border-indigo-100 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
            تركيز المفهوم
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
          خلاصة الدرس
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {summaryRules.map((rule) => (
            <div
              key={rule.number}
              className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 flex flex-col justify-between min-w-[280px]"
            >
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                  {rule.number}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {rule.title}
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {rule.desc}
                </p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center max-w-full overflow-x-auto">
                {rule.math ? (
                  <MathView math={rule.math} block />
                ) : (
                  <div className="text-xs font-bold text-indigo-900 py-2">
                    {rule.badgeText}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
