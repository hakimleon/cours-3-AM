import React from 'react';
import { VocabularyItem } from '../types';
import { Languages } from 'lucide-react';

interface VocabularyTableProps {
  vocabulary: VocabularyItem[];
  id?: string;
}

export const VocabularyTable: React.FC<VocabularyTableProps> = ({
  vocabulary,
  id = 'sec-vocab',
}) => {
  if (!vocabulary || vocabulary.length === 0) return null;

  const hasEnglish = vocabulary.some((v) => !!v.english);

  return (
    <section id={id} className="mb-14 scroll-mt-20">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-indigo-700">
          <Languages className="w-5 h-5 text-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-wider">
            المعجم الرياضي ثلاثي اللغات
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
          المصطلحات الرياضية (العربية · Français · English)
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          ضبط المفردات والمصطلحات العلمية باللغات العربية والفرنسية والإنجليزية لتعزيز الفهم الدقيق وتيسير المطالعة في المراجع الدولية.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-3 px-4 text-right">المصطلح بالعربية</th>
                <th className="py-3 px-4 text-left font-mono" dir="ltr">Français</th>
                {hasEnglish && (
                  <th className="py-3 px-4 text-left font-mono" dir="ltr">English</th>
                )}
                <th className="py-3 px-4 text-right">المعنى والشرح البيداغوجي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vocabulary.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-50/20 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {item.arabic}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-indigo-700 font-mono text-left whitespace-nowrap" dir="ltr">
                    <span className="bg-indigo-50 px-2 py-0.5 rounded text-indigo-700 border border-indigo-100/80">
                      {item.french}
                    </span>
                  </td>
                  {hasEnglish && (
                    <td className="py-3.5 px-4 font-medium text-emerald-700 font-mono text-left whitespace-nowrap" dir="ltr">
                      {item.english ? (
                        <span className="bg-emerald-50 px-2 py-0.5 rounded text-emerald-800 border border-emerald-100/80">
                          {item.english}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  )}
                  <td className="py-3.5 px-4 text-slate-600 leading-relaxed min-w-[220px]">
                    {item.meaning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
