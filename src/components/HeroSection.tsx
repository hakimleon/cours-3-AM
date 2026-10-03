import React from 'react';
import { Course } from '../types';
import { FileDown, Loader2 } from 'lucide-react';
import { formatTextWithSuperscripts } from './MathView';

interface HeroSectionProps {
  course: Course;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  course,
  onExportPdf,
  isExportingPdf = false,
}) => {
  return (
    <section id="sec-obj" className="mb-6 scroll-mt-20">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs sm:text-sm font-bold">
              الدرس {course.number}
            </span>
            <span>{formatTextWithSuperscripts(course.title, false)}</span>
          </h1>

          {onExportPdf && (
            <button
              type="button"
              onClick={onExportPdf}
              disabled={isExportingPdf}
              className="no-pdf inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="حفظ هذا الدرس كاملاً بصيغة PDF"
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري تحضير PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  <span>تحميل الدرس PDF</span>
                </>
              )}
            </button>
          )}
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3">
          {formatTextWithSuperscripts(course.heroDescription)}
        </p>
      </div>
    </section>
  );
};
