import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Images,
} from 'lucide-react';

export interface LightboxImageItem {
  id: string;
  src: string;
  alt: string;
  captionArabic?: string;
  captionFrench?: string;
  courseBadge?: string;
}

interface ImageLightboxContextValue {
  openLightbox: (initialSrc: string, customItems?: LightboxImageItem[]) => void;
  closeLightbox: () => void;
}

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(null);

/**
 * Catalogue par défaut des illustrations pédagogiques des cours pour permettre
 * la navigation entre les images même lorsqu'une section ne contient qu'une seule image.
 */
export const DEFAULT_COURSE_GALLERY_IMAGES: LightboxImageItem[] = [
  {
    id: 'img-c01-depart',
    src: '/src/assets/images/c01_situation_depart_1790801006930.jpg',
    alt: 'مواد من الحياة اليومية: قطرة ماء وكأس ماء، مسمار حديد وقارورة غاز الأكسجين، وكأس ماء مع ملح وسكر',
    captionArabic: 'الدرس 01 — وضعية الانطلاق : العينات الحقيقية الثلاث (ماء، حديد وثنائي الأكسجين، ماء مالح وحلو)',
    captionFrench: 'Cours 01 · Eau (goutte vs verre), Fer & Dioxygène, Eau salée et sucrée',
    courseBadge: 'الدرس 01',
  },
  {
    id: 'img-c02-main',
    src: '/src/assets/images/c02_electrolyse_eau_1790802935276.jpg',
    alt: 'وضعية الانطلاق للدرس 02 : مقارنة تبخر الماء مع تجربة تمرير تيار كهربائي في الماء',
    captionArabic: 'الدرس 02 — وضعية الانطلاق : مقارنة بين تبخر الماء (تغير فيزيائي) والتحليل الكهربائي للماء (2 : 1)',
    captionFrench: 'Cours 02 · Électrolyse de l’eau (rapport 2 : 1) vs Ébullition de l’eau',
    courseBadge: 'الدرس 02',
  },
  {
    id: 'img-c02-complet',
    src: '/src/assets/images/c02_electrolyse_eau_complet_1790804818474.jpg',
    alt: 'مخطط تفصيلي لتجربة التحليل الكهربائي للماء مع البيانات الكاملة',
    captionArabic: 'الدرس 02 — المخطط التفصيلي الكامل لتجربة التحليل الكهربائي للماء',
    captionFrench: 'Cours 02 · Schéma détaillé complet de l’électrolyse de l’eau',
    courseBadge: 'الدرس 02 (تفصيلي)',
  },
  {
    id: 'img-c02-observation',
    src: '/src/assets/images/c02_electrolyse_observation_1790804557254.jpg',
    alt: 'منظر مخبري شامل لتجربة التحليل الكهربائي للماء ومقارنتها بغليان الماء',
    captionArabic: 'الدرس 02 — مشهد مخبري : التركيب التجريبي للتحليل الكهربائي للماء',
    captionFrench: 'Cours 02 · Vue d’ensemble du montage expérimental au laboratoire',
    courseBadge: 'الدرس 02 (مشهد مخبري)',
  },
  {
    id: 'img-c03-main',
    src: '/src/assets/images/c03_combustion_carbone_1790805665478.jpg',
    alt: 'وضعية الانطلاق للدرس 03 : تسخين قطعة كربون وإدخالها في وعاء الهواء ثم الكشف بماء الجير',
    captionArabic: 'الدرس 03 — وضعية الانطلاق : احتراق الكربون في الهواء والكشف عن الغاز الناتج بماء الجير',
    captionFrench: 'Cours 03 · Combustion du carbone dans l’air et test à l’eau de chaux (CO₂)',
    courseBadge: 'الدرس 03',
  },
  {
    id: 'img-c04-main',
    src: '/src/assets/images/c04_combustion_hydrocarbure_1790806910224.jpg',
    alt: 'وضعية الانطلاق للدرس 04 : مقارنة الاحتراق التام والاحتراق غير التام لغاز البوتان',
    captionArabic: 'الدرس 04 — وضعية الانطلاق : مقارنة الاحتراق التام (لهب أزرق، وفرة O₂) والاحتراق غير التام (لهب أصفر وسخام، قلة O₂)',
    captionFrench: 'Cours 04 · Combustion complète vs Combustion incomplète d’un hydrocarbure (C₄H₁₀)',
    courseBadge: 'الدرس 04',
  },
  {
    id: 'img-c05-main',
    src: '/src/assets/images/c05_equilibrage_equation_1790807535324.jpg',
    alt: 'وضعية الانطلاق للدرس 05 : مقارنة معادلة غير موزونة ومعادلة موزونة في كفتي ميزان الذرات',
    captionArabic: 'الدرس 05 — وضعية الانطلاق : موازنة معادلة التفاعل الكيميائي لتحقيق انحفاظ الذرات في طرفي المعادلة',
    captionFrench: 'Cours 05 · Équilibrer une équation de réaction chimique (2 H₂ + O₂ ⟶ 2 H₂O)',
    courseBadge: 'الدرس 05',
  },
  {
    id: 'img-c06-main',
    src: '/src/assets/images/c06_facteurs_reaction_1790808515013.jpg',
    alt: 'وضعية الانطلاق للدرس 06 : تأثير درجة الحرارة (ماء بارد مقابل ماء دافئ) وسطح التلامس (قرص كامل مقابل مسحوق) على سرعة التفاعل الكيميائي',
    captionArabic: 'الدرس 06 — وضعية الانطلاق : مقارنة تأثير درجة الحرارة وسطح التلامس على سرعة التفاعل الكيميائي',
    captionFrench: 'Cours 06 · Les facteurs influençant une réaction chimique (Température et Surface de contact)',
    courseBadge: 'الدرس 06',
  },
  {
    id: 'img-c07-main',
    src: '/src/assets/images/c07_chaine_fonctionnelle_1790809652050.jpg',
    alt: 'وضعية الانطلاق للدرس 07 : السلسلة الوظيفية لدارة المصباح الكهربائي والمروحة الكهربائية',
    captionArabic: 'الدرس 07 — وضعية الانطلاق : السلسلة الوظيفية لدارة المصباح الكهربائي (البطارية ← المفتاح ← الأسلاك ← المصباح) والمروحة الكهربائية',
    captionFrench: 'Cours 07 · La chaîne fonctionnelle : circuit d’éclairage et ventilateur électrique',
    courseBadge: 'الدرس 07',
  },
];

export const useImageLightbox = (): ImageLightboxContextValue => {
  const ctx = useContext(ImageLightboxContext);
  if (!ctx) {
    return {
      openLightbox: () => {},
      closeLightbox: () => {},
    };
  }
  return ctx;
};

export const ImageLightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<LightboxImageItem[]>(DEFAULT_COURSE_GALLERY_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  const collectDomImages = useCallback((): LightboxImageItem[] => {
    const domImgs = Array.from(
      document.querySelectorAll<HTMLImageElement>('img[data-lightbox-item="true"]')
    );
    const collected: LightboxImageItem[] = [];
    const seenSrc = new Set<string>();

    domImgs.forEach((img, idx) => {
      const src = img.getAttribute('src') || img.src;
      if (!src || seenSrc.has(src)) return;
      seenSrc.add(src);
      collected.push({
        id: `dom-img-${idx}`,
        src,
        alt: img.alt || 'صورة توضيحية من الدرس',
        captionArabic: img.getAttribute('data-caption-ar') || img.alt || 'صورة توضيحية من الدرس',
        captionFrench: img.getAttribute('data-caption-fr') || undefined,
        courseBadge: img.getAttribute('data-course-badge') || undefined,
      });
    });

    // Compléter avec le catalogue des illustrations du module pour permettre la navigation
    DEFAULT_COURSE_GALLERY_IMAGES.forEach((item) => {
      if (!seenSrc.has(item.src)) {
        seenSrc.add(item.src);
        collected.push(item);
      }
    });

    return collected.length > 0 ? collected : DEFAULT_COURSE_GALLERY_IMAGES;
  }, []);

  const openLightbox = useCallback(
    (initialSrc: string, customItems?: LightboxImageItem[]) => {
      const gallery = customItems && customItems.length > 0 ? customItems : collectDomImages();
      const foundIndex = gallery.findIndex(
        (it) => it.src === initialSrc || initialSrc.endsWith(it.src)
      );
      setItems(gallery);
      setCurrentIndex(foundIndex >= 0 ? foundIndex : 0);
      setZoomLevel(1);
      setIsOpen(true);
    },
    [collectDomImages]
  );

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setZoomLevel(1);
  }, []);

  const handlePrev = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const handleNext = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((z) => Math.min(2.5, Number((z + 0.35).toFixed(2))));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((z) => Math.max(0.75, Number((z - 0.35).toFixed(2))));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        handleNext();
      } else if (e.key === 'ArrowRight') {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleResetZoom();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeLightbox, handleNext, handlePrev, handleZoomIn, handleZoomOut, handleResetZoom]);

  const currentItem = items[currentIndex] || items[0];

  return (
    <ImageLightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      {isOpen && currentItem && (
        <div
          className="fixed inset-0 z-100 bg-black/90 backdrop-blur-xs flex flex-col justify-between select-none print:hidden"
          dir="rtl"
          role="dialog"
          aria-modal="true"
          aria-label="معرض الصور التفاعلي"
          onClick={closeLightbox}
        >
          {/* Top Control Bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-black/60 border-b border-white/15 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#0F766E] text-white flex items-center justify-center shrink-0">
                <Images className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-white">
                    معرض الصور التفاعلي (LightBox)
                  </span>
                  {currentItem.courseBadge && (
                    <span className="px-2 py-0.5 rounded bg-[#0F766E] text-[11px] font-bold text-white">
                      {currentItem.courseBadge}
                    </span>
                  )}
                  <span className="text-xs font-mono text-white/70" dir="ltr">
                    ({currentIndex + 1} / {items.length})
                  </span>
                </div>
                <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                  {currentItem.captionArabic || currentItem.alt}
                </p>
              </div>
            </div>

            {/* Zoom & Close Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                className="p-2 rounded-[10px] bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white transition-colors cursor-pointer"
                title="تصغير (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2.5 py-1.5 rounded-[10px] bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
                title="إعادة ضبط الحجم (100%)"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-2 rounded-[10px] bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white transition-colors cursor-pointer"
                title="تكبير (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-2 rounded-[10px] bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="إعادة الضبط"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="h-5 w-px bg-white/20 mx-1" />

              <button
                type="button"
                onClick={closeLightbox}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
                title="إغلاق (Esc)"
              >
                <X className="w-4 h-4" />
                <span>إغلاق</span>
              </button>
            </div>
          </div>

          {/* Main Image Viewport with Next/Prev Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center overflow-auto p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {items.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-[#0F766E] border border-white/25 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
                title="الصورة السابقة (السهم الأيمن)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div
              className="relative flex items-center justify-center max-w-full max-h-full transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => {
                setZoomLevel((z) => (z > 1 ? 1 : 1.75));
              }}
            >
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                referrerPolicy="no-referrer"
                className="max-w-[90vw] max-h-[70vh] w-auto h-auto object-contain rounded-[14px] bg-[#FAF7F4] border-2 border-white/25 shadow-2xl"
              />
            </div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-[#0F766E] border border-white/25 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
                title="الصورة التالية (السهم الأيسر)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Thumbnails Strip */}
          <div
            className="bg-black/75 border-t border-white/15 px-4 sm:px-6 py-3 space-y-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-0.5 max-w-3xl mx-auto">
              <div className="text-xs sm:text-sm font-bold text-white">
                {currentItem.captionArabic || currentItem.alt}
              </div>
              {currentItem.captionFrench && (
                <div className="text-[11px] font-mono text-[#5EEAD4]" dir="ltr">
                  {currentItem.captionFrench}
                </div>
              )}
            </div>

            {items.length > 1 && (
              <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1">
                {items.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setZoomLevel(1);
                        setCurrentIndex(idx);
                      }}
                      className={`group relative rounded-[10px] overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'border-[#14B8A6] ring-2 ring-[#14B8A6]/40 scale-105'
                          : 'border-white/20 opacity-65 hover:opacity-100'
                      }`}
                      title={item.captionArabic || item.alt}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        className="w-20 h-12 object-cover bg-[#FAF7F4]"
                      />
                      {item.courseBadge && (
                        <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] font-bold text-white text-center py-0.5 truncate px-1">
                          {item.courseBadge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </ImageLightboxContext.Provider>
  );
};

/**
 * Composant d'image cliquable avec badge de zoom et ouverture dans la LightBox.
 */
export const ZoomableCourseImage: React.FC<{
  src: string;
  alt: string;
  captionArabic: string;
  captionFrench?: string;
  courseBadge?: string;
}> = ({ src, alt, captionArabic, captionFrench, courseBadge }) => {
  const { openLightbox } = useImageLightbox();

  return (
    <div className="group relative rounded-[10px] overflow-hidden border border-[#E2D9D0] bg-[#FAF7F4]">
      <div
        role="button"
        tabIndex={0}
        onClick={() => openLightbox(src)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(src);
          }
        }}
        className="relative cursor-zoom-in overflow-hidden bg-[#FAF7F4]"
        title="انقر لتكبير الصورة وعرضها بملء الشاشة"
      >
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          data-lightbox-item="true"
          data-caption-ar={captionArabic}
          data-caption-fr={captionFrench || ''}
          data-course-badge={courseBadge || ''}
          className="w-full h-auto max-h-[420px] object-contain mx-auto block bg-[#FAF7F4] transition-transform duration-300 group-hover:scale-[1.015]"
        />

        {/* Floating Zoom Action Pill */}
        <div className="no-pdf absolute top-2.5 left-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-black/70 group-hover:bg-[#0F766E] text-white text-xs font-bold shadow-md transition-colors pointer-events-none">
          <Maximize2 className="w-3.5 h-3.5" />
          <span>تكبير الصورة · عرض ملء الشاشة</span>
        </div>
      </div>

      <div
        dir="rtl"
        className="px-3.5 py-2 bg-[#FFFFFF]/95 border-t border-[#E5DDD5] flex flex-wrap items-center justify-between gap-2 text-xs"
      >
        <span className="font-bold text-[#0F766E]">{captionArabic}</span>
        <div className="flex items-center gap-2">
          {captionFrench && (
            <span dir="ltr" className="font-mono text-[11px] text-[#475569]">
              {captionFrench}
            </span>
          )}
          <button
            type="button"
            onClick={() => openLightbox(src)}
            className="no-pdf inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] bg-[#0F766E]/10 hover:bg-[#0F766E] text-[#0F766E] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>معرض الصور</span>
          </button>
        </div>
      </div>
    </div>
  );
};
