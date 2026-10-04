import React from 'react';
import { Course } from '../types';
import { MathView } from './MathView';
import { ArrowDown, HelpCircle, Check, GitBranch } from 'lucide-react';

interface DecisionTreeMindmapProps {
  mindmap: Course['mindmap'];
}

export const DecisionTreeMindmap: React.FC<DecisionTreeMindmapProps> = ({
  mindmap,
}) => {
  return (
    <section id="sec-mindmap" className="my-12 scroll-mt-20">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-indigo-700">
          <GitBranch className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-wider">
            خريطة القرار المنهجية
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          {mindmap.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-8">
          مخطط تدفقي بصري منظم يقودك إلى اتخاذ القرار الرياضي الصحيح خطوة بخطوة.
        </p>

        {/* Tree Flowchart Container */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Root Node */}
          <div className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm sm:text-base shadow-sm text-center">
            {mindmap.rootNode.title}
            {mindmap.rootNode.math && (
              <div className="text-xs text-slate-300 font-normal mt-1">
                <MathView math={mindmap.rootNode.math} />
              </div>
            )}
          </div>

          {/* Arrow Down to Decision */}
          <div className="w-px h-6 bg-slate-300"></div>
          <ArrowDown className="w-4 h-4 text-slate-400 -mt-1 mb-1" />

          {/* Question Decision Box */}
          <div className="px-5 py-3 rounded-xl bg-indigo-50 border-2 border-indigo-200 text-indigo-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xs text-center">
            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{mindmap.question}</span>
          </div>

          {/* Split Connector */}
          <div className="w-full max-w-lg relative mt-2 pt-4">
            {/* Horizontal Line */}
            <div className="h-0.5 bg-slate-300 w-full absolute top-0 left-0 right-0"></div>
            {/* Left & Right Drop Lines */}
            <div className="flex justify-between gap-3 sm:gap-6">
              {/* YES Branch (نعم) */}
              <div className="flex flex-col items-center w-1/2">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs mb-2 text-center">
                  {mindmap.yesBranch.label}
                </div>

                <div className="w-full space-y-2">
                  {mindmap.yesBranch.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center text-xs font-semibold text-slate-800 leading-relaxed"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* NO Branch (لا) */}
              <div className="flex flex-col items-center w-1/2">
                <div className="w-0.5 h-4 bg-slate-300"></div>
                <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-xs mb-2 text-center">
                  {mindmap.noBranch.label}
                </div>

                <div className="w-full space-y-2">
                  {mindmap.noBranch.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center text-xs font-semibold text-slate-800 leading-relaxed"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Arrow */}
          <div className="w-px h-6 bg-slate-300 mt-4"></div>
          <ArrowDown className="w-4 h-4 text-slate-400 -mt-1 mb-1" />

          {/* Terminal Box */}
          <div className="px-6 py-3 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-2xs text-center">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{mindmap.terminal}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
