import React from 'react';
import { Course } from '../types';

interface CourseContinuityProps {
  currentCourse: Course;
  allCourses: Course[];
  onSelectCourse: (courseId: string) => void;
}

export const CourseContinuity: React.FC<CourseContinuityProps> = ({
  currentCourse,
  allCourses,
  onSelectCourse,
}) => {
  const currentIndex = allCourses.findIndex((c) => c.id === currentCourse.id);
  const prevCourse = currentIndex > 0 ? allCourses[currentIndex - 1] : null;
  const nextCourse = currentIndex < allCourses.length - 1 ? allCourses[currentIndex + 1] : null;

  return (
    <section id="sec-continuity" className="my-8 scroll-mt-20" dir="rtl">
      <div className="bg-[#FFFFFF] rounded-[16px] border border-[#EAE2DA] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="text-base font-bold text-[#4A4A4A]">
            مواصلة المسار التعليمي (الدرس {Number(currentCourse.number)} من {allCourses.length})
          </h2>
          <span className="text-xs text-[#C94BA6] font-semibold">
            {currentCourse.topic}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {prevCourse ? (
            <button
              type="button"
              onClick={() => onSelectCourse(prevCourse.id)}
              className="p-4 rounded-[12px] border border-[#E2D9D0] bg-[#F6F0EB]/40 hover:border-[#C94BA6] text-right flex flex-col justify-between transition-all group cursor-pointer"
            >
              <div>
                <div className="text-xs text-[#8C8C8C] mb-1">
                  الدرس السابق ({Number(prevCourse.number)})
                </div>
                <h3 className="text-sm font-bold text-[#4A4A4A] group-hover:text-[#C94BA6] transition-colors">
                  {prevCourse.title}
                </h3>
              </div>
              <div className="mt-3 text-xs text-[#C94BA6] font-bold">
                → مراجعة الدرس {Number(prevCourse.number)}
              </div>
            </button>
          ) : (
            <div className="p-4 rounded-[12px] border border-dashed border-[#E2D9D0] flex items-center justify-center text-xs text-[#8C8C8C]">
              هذا هو الدرس الأول في المنهاج
            </div>
          )}

          {nextCourse ? (
            <button
              type="button"
              onClick={() => onSelectCourse(nextCourse.id)}
              className="p-4 rounded-[12px] border border-[#E2D9D0] bg-[#F6F0EB]/40 hover:border-[#C94BA6] text-right flex flex-col justify-between transition-all group cursor-pointer"
            >
              <div>
                <div className="text-xs text-[#8C8C8C] mb-1">
                  الدرس الموالي ({Number(nextCourse.number)})
                </div>
                <h3 className="text-sm font-bold text-[#4A4A4A] group-hover:text-[#C94BA6] transition-colors">
                  {nextCourse.title}
                </h3>
              </div>
              <div className="mt-3 text-xs text-[#C94BA6] font-bold">
                الانتقال إلى الدرس {Number(nextCourse.number)} ←
              </div>
            </button>
          ) : (
            <div className="p-4 rounded-[12px] border border-dashed border-[#E2D9D0] flex items-center justify-center text-xs text-[#8C8C8C]">
              نهاية الدروس المتوفرة حالياً (1 – 20)
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
