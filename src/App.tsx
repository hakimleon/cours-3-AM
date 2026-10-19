import React, { useState, useEffect, useCallback } from 'react';
import { COURSES_DATA } from './data/allCoursesData';
import { PHYSICS_CHEMISTRY_COURSES } from './data/physicsChemistryCoursesData';
import { SVT_COURSES } from './data/svtCoursesData';
import { Course } from './types';
import { PhysicsChemistryCourse } from './typesPhysicsChemistry';
import { SvtCourse } from './typesSvt';
import { TopBar } from './components/TopBar';
import { CourseSidebar } from './components/CourseSidebar';
import { CourseSelectorModal } from './components/CourseSelectorModal';
import { CourseSectionsRenderer } from './components/CourseSectionsRenderer';
import { CurriculumProgressPage } from './components/CurriculumProgressPage';
import { GeometryTreatisePage } from './components/GeometryTreatisePage';
import { ConceptModalProvider } from './components/ConceptReminderModal';
import { PhysicsModuleHomePage } from './components/physics/PhysicsModuleHomePage';
import { PhysicsCourseView } from './components/physics/PhysicsCourseView';
import { SvtModuleHomePage } from './components/svt/SvtModuleHomePage';
import { SvtCourseView } from './components/svt/SvtCourseView';
import {
  exportCourseToPdf,
  exportPhysicsCourseToPdf,
  exportSvtCourseToPdf,
} from './utils/exportCoursePdf';
import { getCourseSectionsWithDiscovery } from './data/discoveryActivitiesData';
import { ImageLightboxProvider } from './components/ImageLightbox';
import { Loader2, FileCheck2 } from 'lucide-react';

const PC_COMPLETED_STORAGE_KEY = 'pc_3am_completed_courses';
const PC_FAVORITES_STORAGE_KEY = 'pc_3am_favorites';
const SVT_COMPLETED_STORAGE_KEY = 'svt_3am_completed_courses';
const SVT_FAVORITES_STORAGE_KEY = 'svt_3am_favorites';

export default function App() {
  // Active subject ('math' | 'physics' | 'svt')
  const [activeSubject, setActiveSubject] = useState<'math' | 'physics' | 'svt'>('svt');

  // Mathématiques 3AM states
  const [selectedCourseId, setSelectedCourseId] = useState<string>('lesson-21');
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-discovery');
  const [progressPercentage, setProgressPercentage] = useState<number>(10);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);
  const [isCourseSelectorOpen, setIsCourseSelectorOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'course' | 'curriculum' | 'treatise'>('course');
  const [treatiseInitialPropId, setTreatiseInitialPropId] = useState<number | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [pdfExportStatus, setPdfExportStatus] = useState<string>('');

  // Physique-Chimie 3AM states
  const [physicsViewMode, setPhysicsViewMode] = useState<'home' | 'course'>('course');
  const [selectedPhysicsCourseId, setSelectedPhysicsCourseId] = useState<string>('pc-course-06');
  const [pcCompletedIds, setPcCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(PC_COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [pcFavoriteIds, setPcFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(PC_FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // SVT 3AM independent states
  const [svtViewMode, setSvtViewMode] = useState<'home' | 'course'>('course');
  const [selectedSvtCourseId, setSelectedSvtCourseId] = useState<string>('svt-course-01');
  const [svtCompletedIds, setSvtCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SVT_COMPLETED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [svtFavoriteIds, setSvtFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SVT_FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const currentCourse = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];
  const courseSections = getCourseSectionsWithDiscovery(currentCourse);

  const currentPhysicsCourse =
    PHYSICS_CHEMISTRY_COURSES.find((c) => c.id === selectedPhysicsCourseId) ||
    PHYSICS_CHEMISTRY_COURSES[0];

  const currentSvtCourse =
    SVT_COURSES.find((c) => c.id === selectedSvtCourseId) || SVT_COURSES[0];

  // Physique-Chimie handlers
  const handleTogglePcCompleted = useCallback((courseId: string) => {
    setPcCompletedIds((prev) => {
      const next = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId];
      try {
        localStorage.setItem(PC_COMPLETED_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const handleTogglePcFavorite = useCallback((courseId: string) => {
    setPcFavoriteIds((prev) => {
      const next = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId];
      try {
        localStorage.setItem(PC_FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const handleSelectPhysicsCourse = useCallback((courseId: string) => {
    setSelectedPhysicsCourseId(courseId);
    setPhysicsViewMode('course');
    setIsSidebarOpenMobile(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // SVT handlers
  const handleToggleSvtCompleted = useCallback((courseId: string) => {
    setSvtCompletedIds((prev) => {
      const next = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId];
      try {
        localStorage.setItem(SVT_COMPLETED_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const handleToggleSvtFavorite = useCallback((courseId: string) => {
    setSvtFavoriteIds((prev) => {
      const next = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId];
      try {
        localStorage.setItem(SVT_FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const handleSelectSvtCourse = useCallback((courseId: string) => {
    setSelectedSvtCourseId(courseId);
    setSvtViewMode('course');
    setIsSidebarOpenMobile(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveSectionId('sec-discovery');
    setViewMode('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportCoursePdf = useCallback(
    async (targetCourse?: Course) => {
      if (isExportingPdf) return;
      const courseToExport = targetCourse || currentCourse;
      setIsExportingPdf(true);
      setPdfExportStatus(`جاري تجهيز الدرس ${courseToExport.number} بصيغة PDF...`);

      try {
        if (courseToExport.id !== selectedCourseId || viewMode !== 'course') {
          setSelectedCourseId(courseToExport.id);
          setViewMode('course');
          setIsCourseSelectorOpen(false);
          window.scrollTo({ top: 0 });
          await new Promise((resolve) => setTimeout(resolve, 400));
        } else {
          setIsCourseSelectorOpen(false);
        }

        await exportCourseToPdf(courseToExport, (stepText) => {
          setPdfExportStatus(stepText);
        });

        setPdfExportStatus(`✓ تم حفظ الدرس ${courseToExport.number} بصيغة PDF بنجاح!`);
        await new Promise((resolve) => setTimeout(resolve, 1800));
      } catch (err) {
        console.error('PDF Export failed:', err);
        setPdfExportStatus('حدث خطأ أثناء حفظ ملف PDF، يرجى المحاولة مرة أخرى.');
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } finally {
        setIsExportingPdf(false);
        setPdfExportStatus('');
      }
    },
    [currentCourse, isExportingPdf, selectedCourseId, viewMode]
  );

  const handleExportPhysicsCoursePdf = useCallback(
    async (targetCourse?: PhysicsChemistryCourse) => {
      if (isExportingPdf) return;
      const courseToExport = targetCourse || currentPhysicsCourse;
      setIsExportingPdf(true);
      setPdfExportStatus(`جاري تجهيز الدرس ${courseToExport.numero} بصيغة PDF...`);

      try {
        if (
          activeSubject !== 'physics' ||
          physicsViewMode !== 'course' ||
          courseToExport.id !== selectedPhysicsCourseId
        ) {
          setActiveSubject('physics');
          setSelectedPhysicsCourseId(courseToExport.id);
          setPhysicsViewMode('course');
          setIsSidebarOpenMobile(false);
          window.scrollTo({ top: 0 });
          await new Promise((resolve) => setTimeout(resolve, 450));
        }

        await exportPhysicsCourseToPdf(courseToExport, (stepText) => {
          setPdfExportStatus(stepText);
        });

        setPdfExportStatus(`✓ تم حفظ الدرس ${courseToExport.numero} بصيغة PDF بنجاح!`);
        await new Promise((resolve) => setTimeout(resolve, 1800));
      } catch (err) {
        console.error('Physics PDF Export failed:', err);
        setPdfExportStatus('حدث خطأ أثناء حفظ ملف PDF، يرجى المحاولة مرة أخرى.');
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } finally {
        setIsExportingPdf(false);
        setPdfExportStatus('');
      }
    },
    [
      activeSubject,
      currentPhysicsCourse,
      isExportingPdf,
      physicsViewMode,
      selectedPhysicsCourseId,
    ]
  );

  const handleExportSvtCoursePdf = useCallback(
    async (targetCourse?: SvtCourse) => {
      if (isExportingPdf) return;
      const courseToExport = targetCourse || currentSvtCourse;
      setIsExportingPdf(true);
      setPdfExportStatus(`جاري تجهيز الدرس ${courseToExport.numero} بصيغة PDF...`);

      try {
        if (
          activeSubject !== 'svt' ||
          svtViewMode !== 'course' ||
          courseToExport.id !== selectedSvtCourseId
        ) {
          setActiveSubject('svt');
          setSelectedSvtCourseId(courseToExport.id);
          setSvtViewMode('course');
          setIsSidebarOpenMobile(false);
          window.scrollTo({ top: 0 });
          await new Promise((resolve) => setTimeout(resolve, 450));
        }

        await exportSvtCourseToPdf(courseToExport, (stepText) => {
          setPdfExportStatus(stepText);
        });

        setPdfExportStatus(`✓ تم حفظ الدرس ${courseToExport.numero} بصيغة PDF بنجاح!`);
        await new Promise((resolve) => setTimeout(resolve, 1800));
      } catch (err) {
        console.error('SVT PDF Export failed:', err);
        setPdfExportStatus('حدث خطأ أثناء حفظ ملف PDF، يرجى المحاولة مرة أخرى.');
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } finally {
        setIsExportingPdf(false);
        setPdfExportStatus('');
      }
    },
    [activeSubject, currentSvtCourse, isExportingPdf, svtViewMode, selectedSvtCourseId]
  );

  useEffect(() => {
    if (activeSubject !== 'math' || viewMode !== 'course') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      const clampedProgress = Math.min(100, Math.max(5, Math.round(rawProgress)));
      setProgressPercentage(clampedProgress);

      for (let i = courseSections.length - 1; i >= 0; i--) {
        const sec = courseSections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 190) {
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSubject, courseSections, viewMode]);

  const handleSelectSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ImageLightboxProvider>
      <ConceptModalProvider
        onOpenTreatiseProperty={(propId) => {
          setActiveSubject('math');
          setTreatiseInitialPropId(propId);
          setViewMode('treatise');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div
          id="course-app-container"
          dir="rtl"
          className="min-h-screen bg-[#F6F0EB] flex flex-col text-[#4A4A4A]"
        >
          {/* 1. TOP BAR WITH 3-MODULE SWITCHER */}
          <TopBar
            activeSubject={activeSubject}
            onChangeSubject={(subj) => {
              setActiveSubject(subj);
              setIsSidebarOpenMobile(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentCourse={currentCourse}
            allCourses={COURSES_DATA}
            onSelectCourse={handleSelectCourse}
            progressPercentage={progressPercentage}
            isSidebarOpen={isSidebarOpenMobile}
            onToggleSidebar={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            onOpenCourseSelector={() => setIsCourseSelectorOpen(true)}
            onOpenCurriculum={() => {
              setViewMode(viewMode === 'curriculum' ? 'course' : 'curriculum');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isCurriculumView={viewMode === 'curriculum'}
            onOpenTreatise={() => {
              setTreatiseInitialPropId(null);
              setViewMode(viewMode === 'treatise' ? 'course' : 'treatise');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isTreatiseView={viewMode === 'treatise'}
            allCoursesCount={COURSES_DATA.length}
            onExportPdf={() => {
              if (activeSubject === 'svt') {
                handleExportSvtCoursePdf(currentSvtCourse);
              } else if (activeSubject === 'physics') {
                handleExportPhysicsCoursePdf(currentPhysicsCourse);
              } else {
                handleExportCoursePdf(currentCourse);
              }
            }}
            isExportingPdf={isExportingPdf}
            // Physics module props
            physicsCourses={PHYSICS_CHEMISTRY_COURSES}
            currentPhysicsCourse={currentPhysicsCourse}
            physicsViewMode={physicsViewMode}
            onOpenPhysicsHome={() => {
              setPhysicsViewMode('home');
              setIsSidebarOpenMobile(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPhysicsCourse={handleSelectPhysicsCourse}
            // SVT module props
            svtCourses={SVT_COURSES}
            currentSvtCourse={currentSvtCourse}
            svtViewMode={svtViewMode}
            onOpenSvtHome={() => {
              setSvtViewMode('home');
              setIsSidebarOpenMobile(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSvtCourse={handleSelectSvtCourse}
          />

          {/* Floating PDF Export Progress Toast */}
          {isExportingPdf && pdfExportStatus && (
            <div className="fixed bottom-5 left-5 z-50 bg-[#4A4A4A] text-white px-4 py-3 rounded-[16px] shadow-xl flex items-center gap-3 text-xs sm:text-sm font-bold">
              {pdfExportStatus.startsWith('✓') ? (
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
              )}
              <span>{pdfExportStatus}</span>
            </div>
          )}

          {/* 2. SUBJECT ROUTING: SVT 3AM vs PHYSIQUE-CHIMIE 3AM vs MATHÉMATIQUES 3AM */}
          {activeSubject === 'svt' ? (
            <div className="flex-1 flex flex-col">
              {svtViewMode === 'home' ? (
                <SvtModuleHomePage
                  courses={SVT_COURSES}
                  completedCourseIds={svtCompletedIds}
                  favoriteCourseIds={svtFavoriteIds}
                  onSelectCourse={handleSelectSvtCourse}
                  onToggleCompleted={handleToggleSvtCompleted}
                  onToggleFavorite={handleToggleSvtFavorite}
                  onExportCoursePdf={handleExportSvtCoursePdf}
                  isExportingPdf={isExportingPdf}
                />
              ) : (
                <SvtCourseView
                  course={currentSvtCourse}
                  allCourses={SVT_COURSES}
                  completedCourseIds={svtCompletedIds}
                  favoriteCourseIds={svtFavoriteIds}
                  onSelectCourse={handleSelectSvtCourse}
                  onBackToModuleHome={() => {
                    setSvtViewMode('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onToggleCompleted={handleToggleSvtCompleted}
                  onToggleFavorite={handleToggleSvtFavorite}
                  onExportPdf={() => handleExportSvtCoursePdf(currentSvtCourse)}
                  isExportingPdf={isExportingPdf}
                  isSidebarOpenMobile={isSidebarOpenMobile}
                  onCloseMobileSidebar={() => setIsSidebarOpenMobile(false)}
                />
              )}
            </div>
          ) : activeSubject === 'physics' ? (
            <div className="flex-1 flex flex-col">
              {physicsViewMode === 'home' ? (
                <PhysicsModuleHomePage
                  courses={PHYSICS_CHEMISTRY_COURSES}
                  completedCourseIds={pcCompletedIds}
                  favoriteCourseIds={pcFavoriteIds}
                  onSelectCourse={handleSelectPhysicsCourse}
                  onToggleCompleted={handleTogglePcCompleted}
                  onToggleFavorite={handleTogglePcFavorite}
                  onExportCoursePdf={handleExportPhysicsCoursePdf}
                  isExportingPdf={isExportingPdf}
                />
              ) : (
                <PhysicsCourseView
                  course={currentPhysicsCourse}
                  allCourses={PHYSICS_CHEMISTRY_COURSES}
                  completedCourseIds={pcCompletedIds}
                  favoriteCourseIds={pcFavoriteIds}
                  onSelectCourse={handleSelectPhysicsCourse}
                  onBackToModuleHome={() => {
                    setPhysicsViewMode('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onToggleCompleted={handleTogglePcCompleted}
                  onToggleFavorite={handleTogglePcFavorite}
                  onExportPdf={() => handleExportPhysicsCoursePdf(currentPhysicsCourse)}
                  isExportingPdf={isExportingPdf}
                  isSidebarOpenMobile={isSidebarOpenMobile}
                  onCloseMobileSidebar={() => setIsSidebarOpenMobile(false)}
                />
              )}

              <footer className="mt-12 pt-6 pb-10 border-t border-[#E2D9D0] text-center text-xs text-[#8C8C8C]">
                <p className="mb-1 font-semibold text-[#4A4A4A]">
                  المنهاج الرسمي للجمهورية الجزائرية الديمقراطية الشعبية · العلوم الفيزيائية والتكنولوجيا (Physique-Chimie 3AM)
                </p>
                <p>الجيل الثاني — 20 درساً تفاعلياً (Cours 01 → Cours 20)</p>
              </footer>
            </div>
          ) : viewMode === 'curriculum' ? (
            <CurriculumProgressPage
              allCourses={COURSES_DATA}
              onSelectCourse={handleSelectCourse}
              onBackToCourse={() => {
                setViewMode('course');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : viewMode === 'treatise' ? (
            <GeometryTreatisePage
              allCourses={COURSES_DATA}
              onSelectCourse={handleSelectCourse}
              onBackToCourse={() => {
                setViewMode('course');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              initialPropertyId={treatiseInitialPropId}
            />
          ) : (
            /* 3. MAIN MATH COURSE LAYOUT */
            <div className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 flex items-start gap-8">
              <CourseSidebar
                currentCourse={currentCourse}
                allCourses={COURSES_DATA}
                onSelectCourse={handleSelectCourse}
                sections={courseSections}
                activeSectionId={activeSectionId}
                onSelectSection={handleSelectSection}
                progressPercentage={progressPercentage}
                isOpenMobile={isSidebarOpenMobile}
                onCloseMobile={() => setIsSidebarOpenMobile(false)}
                onOpenCourseSelector={() => setIsCourseSelectorOpen(true)}
                onOpenCurriculum={() => {
                  setViewMode('curriculum');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenTreatise={() => {
                  setTreatiseInitialPropId(null);
                  setViewMode('treatise');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExportPdf={() => handleExportCoursePdf(currentCourse)}
                isExportingPdf={isExportingPdf}
              />

              <main id="course-main-content" className="flex-1 min-w-0">
                <CourseSectionsRenderer
                  course={currentCourse}
                  allCourses={COURSES_DATA}
                  onSelectCourse={handleSelectCourse}
                  onExportPdf={() => handleExportCoursePdf(currentCourse)}
                  isExportingPdf={isExportingPdf}
                  onOpenTreatise={(propId) => {
                    setTreatiseInitialPropId(propId ?? null);
                    setViewMode('treatise');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                <footer className="mt-12 pt-6 pb-10 border-t border-[#E2D9D0] text-center text-xs text-[#8C8C8C]">
                  <p className="mb-1 font-semibold text-[#4A4A4A]">
                    المنهاج الرسمي للجمهورية الجزائرية الديمقراطية الشعبية · مادة الرياضيات (3AM)
                  </p>
                  <p>الجيل الثاني — التدرج السنوي المعتمد للتعلمات</p>
                </footer>
              </main>
            </div>
          )}

          {/* Math Course Selector Modal */}
          <CourseSelectorModal
            courses={COURSES_DATA}
            currentCourseId={selectedCourseId}
            onSelectCourse={handleSelectCourse}
            isOpen={isCourseSelectorOpen}
            onClose={() => setIsCourseSelectorOpen(false)}
            onExportCoursePdf={(course) => handleExportCoursePdf(course)}
            isExportingPdf={isExportingPdf}
          />
        </div>
      </ConceptModalProvider>
    </ImageLightboxProvider>
  );
}
