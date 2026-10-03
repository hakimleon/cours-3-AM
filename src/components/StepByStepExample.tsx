import React from 'react';
import { MathView, formatTextWithSuperscripts } from './MathView';
import { Course18Diagram } from './Course18Diagrams';
import { TypedBlock } from './SchoolMouvBlocks';

interface Step {
  stepNumber: string;
  title: string;
  detail?: string;
  math: string[];
}

interface StepByStepExampleProps {
  id?: string;
  title: string;
  initialMath: string;
  diagramId?: string;
  steps: Step[];
  conclusion?: string;
}

export const StepByStepExample: React.FC<StepByStepExampleProps> = ({
  id,
  title,
  initialMath,
  diagramId,
  steps,
  conclusion,
}) => {
  return (
    <div id={id} className="my-5">
      <TypedBlock kind="exemple" customLabel="مثال تطبيقي (وضعية وحل نموذجي)">
        {/* Énoncé + Figure */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 pb-3 border-b border-[#E5DDD5]">
          <div className="space-y-2 flex-1 min-w-0">
            <h4 className="font-bold text-[#4A4A4A] text-[15px]">
              {formatTextWithSuperscripts(title)}
            </h4>
            <div className="text-xs text-[#8C8C8C] font-medium">المعطيات :</div>
            <div
              className="px-3.5 py-2 rounded-[10px] bg-[#F6F0EB]/60 border border-[#E5DDD5] overflow-x-auto text-center"
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
            >
              <MathView math={initialMath} block />
            </div>
          </div>

          {diagramId && <Course18Diagram diagramId={diagramId} progressive={true} />}
        </div>

        {/* Correction / Démonstration avec justifications en gris clair et petit corps */}
        <div className="pt-2 space-y-3">
          <div className="text-xs font-bold text-[#C94BA6]">طريقة الحل والبرهان :</div>
          {steps.map((step, idx) => {
            const numClean = String(step.stepNumber).replace(/^0+/, '') || String(idx + 1);
            return (
              <div key={idx} className="space-y-1.5 pb-2 border-b border-[#E5DDD5]/60 last:border-b-0">
                <div className="flex items-baseline gap-2 text-sm text-[#4A4A4A]">
                  <span className="font-bold text-[#C94BA6]" dir="ltr">
                    {numClean}.
                  </span>
                  <span className="font-semibold">
                    {formatTextWithSuperscripts(step.title)}
                  </span>
                </div>

                {step.detail && (
                  <p className="text-sm text-[#4A4A4A] pr-4 leading-[1.9]">
                    {formatTextWithSuperscripts(step.detail)}
                  </p>
                )}

                {/* Full-width formula box so equations with roots/fractions never truncate */}
                <div className="pr-4 space-y-1.5">
                  {step.math.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="w-full bg-[#F6F0EB]/45 px-3.5 py-2 rounded-[10px] border border-[#E5DDD5] text-center"
                      dir="ltr"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      <MathView math={m} block className="font-medium text-[#4A4A4A] text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Conclusion de démonstration en gras sur sa propre ligne */}
          {conclusion && (
            <div className="pt-2">
              <strong className="block font-bold text-[#4A4A4A] text-sm mb-1">
                ومنه نستنتج أن :
              </strong>
              <div
                className="font-bold text-[#4A4A4A] px-4 py-2.5 rounded-[10px] bg-[#F6F0EB]/80 border border-[#C94BA6]/40 text-center overflow-x-auto"
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
              >
                <MathView math={conclusion} block />
              </div>
            </div>
          )}
        </div>
      </TypedBlock>
    </div>
  );
};
