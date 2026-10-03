import React, { useState, useEffect } from 'react';
import { ExerciseItem, DiscoveryActivity } from '../types';
import { ExerciseCard } from './ExerciseCard';
import { DiscoveryActivityCorrectionCard } from './DiscoveryActivitySection';
import { Eye, EyeOff } from 'lucide-react';

interface SectionExercisesProps {
  exercises: ExerciseItem[];
  discoveryActivity?: DiscoveryActivity;
  initialFilter?: string;
}

export const SectionExercises: React.FC<SectionExercisesProps> = ({
  exercises,
  discoveryActivity,
  initialFilter = 'all',
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>(initialFilter);
  const [expandAll, setExpandAll] = useState<boolean>(false);

  useEffect(() => {
    setFilterDifficulty(initialFilter);
  }, [initialFilter]);

  useEffect(() => {
    const handlePreparePdf = () => {
      setFilterDifficulty('all');
      setExpandAll(true);
    };
    window.addEventListener('course-pdf-prepare', handlePreparePdf);
    return () => window.removeEventListener('course-pdf-prepare', handlePreparePdf);
  }, []);

  const filteredExercises = exercises.filter((ex) => {
    if (filterDifficulty === 'all') return true;
    return ex.difficulty === filterDifficulty;
  });

  return (
    <div id="section-exercises" className="space-y-4">
      {/* Filter & Expand All Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: `الكل (${exercises.length})` },
            { id: 'basic', label: 'تطبيق مباشر' },
            { id: 'intermediate', label: 'تمارين متوسطة' },
            { id: 'advanced', label: 'تحديات وإدماج' },
          ].map((tab) => {
            const active = filterDifficulty === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterDifficulty(tab.id)}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#C94BA6] text-white'
                    : 'bg-[#F6F0EB]/70 border border-[#E5DDD5] text-[#4A4A4A] hover:border-[#C94BA6]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          id="btn-toggle-all-solutions"
          type="button"
          onClick={() => setExpandAll(!expandAll)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-[#C94BA6]/40 bg-white hover:bg-[#C94BA6]/10 text-xs font-bold text-[#C94BA6] transition-colors cursor-pointer"
        >
          {expandAll ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>طي جميع الحلول</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>إظهار جميع الحلول</span>
            </>
          )}
        </button>
      </div>

      {/* Corrigé du bilan à trous et de l'activité de découverte (Section 0) — placé uniquement dans la section Corrigés */}
      {discoveryActivity && (
        <DiscoveryActivityCorrectionCard
          activity={discoveryActivity}
          defaultOpen={expandAll}
        />
      )}

      {/* Stacked Exercises */}
      <div className="space-y-4">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={`${exercise.id}-${expandAll}`}
            exercise={exercise}
            defaultOpen={expandAll}
          />
        ))}
      </div>
    </div>
  );
};
