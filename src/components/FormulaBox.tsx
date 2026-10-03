import React from 'react';
import { MathView } from './MathView';

interface FormulaBoxProps {
  type?: 'primary' | 'secondary' | 'intermediate';
  title?: string;
  math: string;
  condition?: string;
  note?: string;
  id?: string;
}

export const FormulaBox: React.FC<FormulaBoxProps> = ({
  type = 'primary',
  title,
  math,
  condition,
  note,
  id,
}) => {
  if (type === 'primary') {
    return (
      <div
        id={id}
        className="my-6 p-6 sm:p-7 rounded-2xl bg-white border-2 border-indigo-100 shadow-xs text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 left-0 h-1 bg-indigo-600"></div>
        {title && (
          <span className="inline-block text-xs font-bold tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-3">
            {title}
          </span>
        )}
        <div className="text-xl sm:text-2xl text-slate-900 font-semibold py-2">
          <MathView math={math} block />
        </div>
        {condition && (
          <div className="mt-2 text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5 flex-wrap">
            <span>حيث:</span>
            <span className="text-slate-800 font-semibold inline-flex items-center">
              <MathView math={condition} />
            </span>
          </div>
        )}
        {note && (
          <p className="mt-3 text-sm text-slate-600 max-w-lg mx-auto leading-relaxed border-t border-slate-100 pt-3">
            {note}
          </p>
        )}
      </div>
    );
  }

  if (type === 'secondary') {
    return (
      <div
        id={id}
        className="my-4 p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 text-center"
      >
        {title && (
          <div className="text-xs font-semibold text-slate-600 mb-2">{title}</div>
        )}
        <div className="text-lg sm:text-xl text-slate-800 py-1">
          <MathView math={math} block />
        </div>
        {condition && (
          <div className="mt-2 text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5 flex-wrap">
            <span>حيث:</span>
            <span className="text-slate-800 font-semibold inline-flex items-center">
              <MathView math={condition} />
            </span>
          </div>
        )}
        {note && <div className="text-xs text-slate-500 mt-2">{note}</div>}
      </div>
    );
  }

  // intermediate
  return (
    <div
      id={id}
      className="inline-block my-2 px-4 py-2 rounded-lg bg-slate-100/80 border border-slate-200/60 font-mono text-slate-800"
    >
      <MathView math={math} />
    </div>
  );
};
