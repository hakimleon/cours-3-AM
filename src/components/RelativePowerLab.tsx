import React, { useState } from 'react';
import { MathView } from './MathView';

export const RelativePowerLab: React.FC = () => {
  const [baseVal, setBaseVal] = useState<number>(5);
  const [expVal, setExpVal] = useState<number>(2);
  const [expM, setExpM] = useState<number>(5);

  const withParenResult = Math.pow(-baseVal, expVal);
  const withoutParenResult = -Math.pow(baseVal, expVal);
  const isEven = expVal % 2 === 0;

  const repeatedWithParen = Array(expVal).fill(`(-${baseVal})`).join(' \\times ');
  const repeatedWithoutParen = Array(expVal).fill(`${baseVal}`).join(' \\times ');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl text-slate-100 my-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. Left Column (7 cols): Core Visual Card + Separate Sliders Card Underneath */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="w-full flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs sm:text-sm font-semibold text-indigo-400">
                1. التمثيل البصري : جداء قوتين لنفس الأساس وأثر الأقواس على الإشارة
              </h3>
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-normal text-xs">
                الأس الأول {expVal} ({isEven ? 'زوجي' : 'فردي'})
              </span>
            </div>

            {/* Block A: Product of Two Powers of the Same Base (e.g. 5^2 * 5^5 = 5^{2+5} = 5^7) */}
            <div className="bg-indigo-950/45 border border-indigo-500/40 rounded-2xl p-4 text-center space-y-2">
              <div className="text-xs font-normal text-indigo-300">
                جداء قوتين لنفس الأساس (نحتفظ بالأساس المشترك ونجمع الأسين) :
              </div>
              <div
                className="bg-slate-950/85 border border-indigo-500/30 rounded-xl py-2.5 px-3"
                dir="ltr"
              >
                <MathView
                  math={`${baseVal}^{${expVal}} \\times ${baseVal}^{${expM}} = ${baseVal}^{${expVal}+${expM}} = ${baseVal}^{${expVal + expM}}`}
                  block
                  className="text-amber-300 text-base sm:text-xl font-semibold"
                />
              </div>
            </div>

            {/* Block B: Side-by-Side Comparison (-a)^n vs -a^n */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="ltr">
              {/* With Parentheses (-a)^n */}
              <div className="bg-emerald-950/45 border border-emerald-500/50 rounded-2xl p-4 text-center space-y-2">
                <div className="text-xs font-normal text-emerald-300" dir="rtl">
                  مع الأقواس : الإشارة داخل الأساس
                </div>
                <div className="py-1">
                  <MathView
                    math={`(-${baseVal})^{${expVal}} = ${repeatedWithParen}`}
                    className="text-white text-sm sm:text-base"
                  />
                </div>
                <div className="pt-1 border-t border-emerald-500/20">
                  <MathView
                    math={`(-${baseVal})^{${expVal}} = ${withParenResult > 0 ? `+${withParenResult}` : withParenResult}`}
                    className={`${withParenResult > 0 ? 'text-emerald-300' : 'text-rose-300'} text-base sm:text-lg font-semibold`}
                  />
                </div>
              </div>

              {/* Without Parentheses -a^n */}
              <div className="bg-rose-950/40 border border-rose-500/50 rounded-2xl p-4 text-center space-y-2">
                <div className="text-xs font-normal text-rose-300" dir="rtl">
                  بدون أقواس : السالب خارج القوة
                </div>
                <div className="py-1">
                  <MathView
                    math={`-${baseVal}^{${expVal}} = -(${repeatedWithoutParen})`}
                    className="text-white text-sm sm:text-base"
                  />
                </div>
                <div className="pt-1 border-t border-rose-500/20">
                  <MathView
                    math={`-${baseVal}^{${expVal}} = ${withoutParenResult}`}
                    className="text-rose-300 text-base sm:text-lg font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Separate Sliders Card Underneath */}
          <div className="no-pdf bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-normal">
                <span className="text-emerald-300">الأساس (a):</span>
                <span className="font-mono text-emerald-300" dir="ltr">
                  a = {baseVal}
                </span>
              </div>
              <input
                dir="ltr"
                type="range"
                min="2"
                max="5"
                step="1"
                value={baseVal}
                onChange={(e) => setBaseVal(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-normal">
                <span className="text-amber-300">الأس الأول (n):</span>
                <span className="font-mono text-amber-300" dir="ltr">
                  n = {expVal}
                </span>
              </div>
              <input
                dir="ltr"
                type="range"
                min="2"
                max="4"
                step="1"
                value={expVal}
                onChange={(e) => setExpVal(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-normal">
                <span className="text-indigo-300">الأس الثاني (m):</span>
                <span className="font-mono text-indigo-300" dir="ltr">
                  m = {expM}
                </span>
              </div>
              <input
                dir="ltr"
                type="range"
                min="2"
                max="6"
                step="1"
                value={expM}
                onChange={(e) => setExpM(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Reading in Vis-à-Vis (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <div className="text-xs font-semibold text-indigo-400">
              2. قراءة المقارنة البصرية :
            </div>
            <p className="text-xs font-normal text-slate-300 leading-relaxed">
              • عند ضرب قوتين لنفس الأساس مثل{' '}
              <MathView
                math={`${baseVal}^{${expVal}} \\times ${baseVal}^{${expM}} = ${baseVal}^{${expVal}+${expM}} = ${baseVal}^{${expVal + expM}}`}
                className="text-amber-300"
              />{' '}
              نحتفظ بالأساس ونجمع الأسين.
            </p>
            <p className="text-xs font-normal text-slate-300 leading-relaxed">
              • في العبارة{' '}
              <MathView math={`(-${baseVal})^{${expVal}}`} className="text-emerald-300" /> القوسان يجعلان الإشارة السالبة تتكرر في الضرب مع العدد؛ أما في{' '}
              <MathView math={`-${baseVal}^{${expVal}}`} className="text-rose-300" /> فالأس يطبق على العدد وحده وتبقى إشارة الناقص في الخارج.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
