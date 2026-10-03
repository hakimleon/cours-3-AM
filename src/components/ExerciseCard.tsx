import React, { useState } from 'react';
import { ExerciseItem } from '../types';
import { MathView, formatTextWithSuperscripts } from './MathView';
import { Course18Diagram } from './Course18Diagrams';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExerciseCardProps {
  exercise: ExerciseItem;
  defaultOpen?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const numClean = String(exercise.number).replace(/^0+/, '') || '1';

  return (
    <div
      id={`exercise-${exercise.id}`}
      className="bg-white rounded-[14px] border border-[#E5DDD5] p-4 sm:p-5 transition-all"
    >
      {/* Header : Numéro en cercle --accent + Titre + Niveau en texte sobre */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-[26px] h-[26px] rounded-full border-2 border-[#C94BA6] text-[#C94BA6] font-bold text-xs flex items-center justify-center shrink-0"
            dir="ltr"
          >
            {numClean}
          </span>
          <h4 className="font-bold text-[#4A4A4A] text-sm sm:text-[15px]">
            {formatTextWithSuperscripts(exercise.title, false)}
          </h4>
        </div>
        <span className="text-xs text-[#C94BA6] font-semibold">
          · {exercise.difficultyLabel}
        </span>
      </div>

      {/* Énoncé & Figure associée */}
      <div
        className={
          exercise.diagramId
            ? 'flex flex-col md:flex-row md:items-start justify-between gap-5 my-3'
            : 'my-3'
        }
      >
        <div className="flex-1 min-w-0 space-y-2.5">
          <div className="text-[14.5px] text-[#4A4A4A] leading-[1.9]">
            {formatTextWithSuperscripts(exercise.prompt)}
          </div>

          <div
            className="p-3 rounded-[10px] bg-[#F6F0EB]/60 border border-[#E5DDD5] text-center overflow-x-auto"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            <MathView math={exercise.mathExpression} block />
          </div>
        </div>

        {exercise.diagramId && (
          <Course18Diagram diagramId={exercise.diagramId} progressive={true} />
        )}
      </div>

      {exercise.hint && (
        <p className="text-xs text-[#4A4A4A]/85 italic mb-3 pr-3 border-r-2 border-dotted border-[#C94BA6]">
          <strong className="text-[#C94BA6] not-italic">تلميح : </strong>
          {formatTextWithSuperscripts(exercise.hint)}
        </p>
      )}

      {/* Bouton Afficher / Masquer la Correction */}
      <button
        id={`btn-toggle-solution-${exercise.id}`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mt-2 py-2 px-3.5 rounded-[10px] border border-[#C94BA6]/40 hover:bg-[#C94BA6]/10 text-xs font-bold text-[#C94BA6] flex items-center justify-between transition-colors cursor-pointer"
      >
        <span>{isOpen ? 'إخفاء التصحيح النموذجي' : 'عرض التصحيح النموذجي خطوة بخطوة'}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Correction détaillée avec rail pointillé --accent et justifications à côté */}
      {isOpen && (
        <div
          className="mt-4 mr-2 pr-4 py-1 space-y-3 border-r-[3px] border-dotted border-[#C94BA6]"
        >
          <div className="text-xs font-bold text-[#C94BA6]">التصحيح النموذجي :</div>

          <div className="space-y-3">
            {exercise.solutionSteps.map((step, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <div className="text-sm text-[#4A4A4A] leading-[1.9]">
                  <span className="font-bold text-[#C94BA6] ml-1.5" dir="ltr">
                    {sIdx + 1}.
                  </span>
                  <span className="font-semibold">
                    {formatTextWithSuperscripts(step.title)}
                  </span>
                </div>

                {step.explanation && (
                  <p className="text-sm text-[#4A4A4A] pr-4 leading-[1.85]">
                    {formatTextWithSuperscripts(step.explanation)}
                  </p>
                )}

                <div
                  className="w-full bg-[#F6F0EB]/55 px-3.5 py-2 rounded-[10px] border border-[#E5DDD5] text-center"
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  <MathView math={step.math} block className="font-medium text-[#4A4A4A]" />
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion de démonstration en gras sur sa propre ligne */}
          <div className="pt-2">
            <strong className="block font-bold text-[#4A4A4A] text-sm mb-1">
              النتيجة النهائية :
            </strong>
            <div
              className="font-bold text-[#4A4A4A] px-4 py-2 rounded-[10px] bg-[#F6F0EB] border border-[#C94BA6]/40 text-center overflow-x-auto"
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
            >
              <MathView math={exercise.finalAnswer} block />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
