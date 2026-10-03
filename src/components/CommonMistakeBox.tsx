import React from 'react';
import { MathView, formatTextWithSuperscripts } from './MathView';
import { TypedBlock } from './SchoolMouvBlocks';

interface CommonMistakeBoxProps {
  id?: string;
  title?: string;
  mistakeMath: string;
  whyExplanation: string;
  correctMath: string;
  note?: string;
}

export const CommonMistakeBox: React.FC<CommonMistakeBoxProps> = ({
  id,
  title = 'تنبيه وطريقة لتفادي الخطأ الشائع',
  mistakeMath,
  whyExplanation,
  correctMath,
  note,
}) => {
  return (
    <div id={id} className="my-4">
      <TypedBlock kind="astuce" customLabel={`تنبيه بيداغوجي — ${title}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الكتابة الخاطئة */}
          <div className="p-3.5 rounded-[12px] bg-[#F6F0EB]/60 border border-[#E5DDD5] space-y-2">
            <div className="text-xs font-bold text-[#4A4A4A] flex items-center gap-2">
              <span className="w-[4px] h-[4px] rounded-full bg-[#C94BA6]" />
              <span>الكتابة الخاطئة الشائعة :</span>
            </div>
            <div
              className="py-1.5 text-center font-bold text-[#4A4A4A] line-through decoration-[#C94BA6] decoration-2 overflow-x-auto"
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
            >
              <MathView math={mistakeMath} block />
            </div>
            <p className="text-xs text-[#4A4A4A]/90 leading-[1.8] pt-1 border-t border-[#E5DDD5]">
              <strong>لماذا؟ </strong>
              {formatTextWithSuperscripts(whyExplanation)}
            </p>
          </div>

          {/* الكتابة الصحيحة */}
          <div className="p-3.5 rounded-[12px] bg-white border border-[#C94BA6]/40 space-y-2">
            <div className="text-xs font-bold text-[#C94BA6] flex items-center gap-2">
              <span className="w-[4px] h-[4px] rounded-full bg-[#C94BA6]" />
              <span>الطريقة الصحيحة :</span>
            </div>
            <div
              className="py-1.5 text-center font-bold text-[#4A4A4A] overflow-x-auto"
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
            >
              <MathView math={correctMath} block />
            </div>
            {note && (
              <p className="text-xs text-[#4A4A4A] leading-[1.8] pt-1 border-t border-[#E5DDD5]">
                <strong>القاعدة : </strong>
                {formatTextWithSuperscripts(note)}
              </p>
            )}
          </div>
        </div>
      </TypedBlock>
    </div>
  );
};
