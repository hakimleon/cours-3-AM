import { jsPDF } from 'jspdf';
import { domToCanvas } from 'modern-screenshot';
import { Course } from '../types';
import { PhysicsChemistryCourse } from '../typesPhysicsChemistry';
import { SvtCourse } from '../typesSvt';

/**
 * Collects logical DOM blocks inside #course-main-content so that
 * sections, cards, formulas, and exercises are paginated cleanly
 * without cutting cards in half whenever possible.
 */
function collectPrintableBlocks(mainEl: HTMLElement): HTMLElement[] {
  const blocks: HTMLElement[] = [];
  const MAX_SINGLE_BLOCK_PX = 980;

  const cardInner = mainEl.querySelector('#course-card-inner') as HTMLElement | null;
  const sectionsWrapper =
    cardInner || (mainEl.querySelector(':scope > div') as HTMLElement | null);
  const topChildren = sectionsWrapper
    ? (Array.from(sectionsWrapper.children) as HTMLElement[])
    : (Array.from(mainEl.children) as HTMLElement[]);

  for (const section of topChildren) {
    if (!section || section.id === 'sec-continuity' || section.classList.contains('no-pdf')) continue;
    const style = window.getComputedStyle(section);
    if (style.display === 'none' || section.offsetHeight === 0) continue;

    if (section.offsetHeight <= MAX_SINGLE_BLOCK_PX) {
      blocks.push(section);
      continue;
    }

    const sectionChildren = Array.from(section.children) as HTMLElement[];
    for (const child of sectionChildren) {
      if (!child || child.offsetHeight === 0 || child.classList.contains('no-pdf')) continue;
      if (
        child.offsetHeight > MAX_SINGLE_BLOCK_PX &&
        child.children.length > 1 &&
        !child.classList.contains('grid')
      ) {
        for (const subChild of Array.from(child.children) as HTMLElement[]) {
          if (subChild.offsetHeight > 0 && !subChild.classList.contains('no-pdf')) {
            blocks.push(subChild);
          }
        }
      } else {
        blocks.push(child);
      }
    }
  }

  // Also include the reference geometry properties block (#sec-treatise-links) at the end if present
  const treatiseLinksEl = mainEl.querySelector('#sec-treatise-links') as HTMLElement | null;
  if (treatiseLinksEl && treatiseLinksEl.offsetHeight > 0) {
    blocks.push(treatiseLinksEl);
  }

  return blocks.length > 0 ? blocks : [mainEl];
}

/**
 * Collects logical DOM blocks inside #physics-course-main-content for Physique-Chimie 3AM courses.
 * Decomposes oversized cards and sections to avoid canvas memory exhaustion and prevent browser freezes.
 */
function collectPhysicsPrintableBlocks(mainEl: HTMLElement): HTMLElement[] {
  const blocks: HTMLElement[] = [];
  const MAX_SINGLE_BLOCK_PX = 560; // Granularité calibrée pour éviter les grands blancs et cibler 14 à 15 pages

  const isValidBlock = (el: HTMLElement | null): el is HTMLElement => {
    if (!el || el.id === 'sec-continuity' || el.classList.contains('no-pdf')) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || el.offsetHeight === 0) return false;
    return true;
  };

  const addBlockOrSubBlocks = (el: HTMLElement | null) => {
    if (!isValidBlock(el)) return;

    // Bloc atomique insécable : énoncé complet d'exercice, carte numérotée, tableau ou bloc sous la limite
    if (
      el.classList.contains('application-enonce-group') ||
      el.hasAttribute('data-card-number') ||
      el.querySelector('table') !== null ||
      el.offsetHeight <= MAX_SINGLE_BLOCK_PX
    ) {
      blocks.push(el);
      return;
    }

    // Si le conteneur dépasse MAX_SINGLE_BLOCK_PX, découper en sous-blocs logiques
    const children = Array.from(el.children) as HTMLElement[];
    let addedChild = false;

    for (const child of children) {
      if (!isValidBlock(child)) continue;
      addedChild = true;
      if (
        child.offsetHeight <= MAX_SINGLE_BLOCK_PX ||
        child.children.length <= 1 ||
        child.classList.contains('application-enonce-group') ||
        child.querySelector('table') !== null
      ) {
        blocks.push(child);
      } else {
        // Découpe profonde pour les grandes cartes, en préservant les groupes d'énoncé
        for (const subChild of Array.from(child.children) as HTMLElement[]) {
          if (isValidBlock(subChild)) {
            blocks.push(subChild);
          }
        }
      }
    }

    if (!addedChild) {
      blocks.push(el);
    }
  };

  // 1. En-tête du cours
  const header = mainEl.querySelector('#physics-course-header') as HTMLElement | null;
  if (isValidBlock(header)) blocks.push(header);

  // 2. L'essentiel (« أحتفظ بالأهم »)
  const essential = mainEl.querySelector('#sec-pc-essential') as HTMLElement | null;
  addBlockOrSubBlocks(essential);

  // 3. Exercices contextualisés avec solutions
  const exercises = mainEl.querySelector('#sec-pc-exercises') as HTMLElement | null;
  addBlockOrSubBlocks(exercises);

  // 3.5 Barre « للتعمق » (Pour approfondir)
  const deepenHeader = mainEl.querySelector('#sec-pc-deepen-header') as HTMLElement | null;
  if (isValidBlock(deepenHeader)) {
    blocks.push(deepenHeader);
  }

  // 4. Sections détaillées (« للتعمق »)
  const sections = Array.from(
    mainEl.querySelectorAll('section[id^="sec-pc-"]')
  ) as HTMLElement[];

  for (const sec of sections) {
    if (sec.id === 'sec-pc-exercises' || sec.id === 'sec-pc-essential' || sec.id === 'sec-pc-deepen-header') continue;
    addBlockOrSubBlocks(sec);
  }

  // 5. Synthèse & Vocabulaire bilingue
  const summary = mainEl.querySelector('#sec-pc-summary') as HTMLElement | null;
  addBlockOrSubBlocks(summary);

  return blocks.length > 0 ? blocks : [mainEl];
}

async function renderBlocksToPdf(
  blocks: HTMLElement[],
  footerLabel: string,
  fileName: string,
  onProgress?: (progressText: string) => void
): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidthMm = 210;
  const pageHeightMm = 297;
  const marginX = 10;
  const marginTop = 10;
  const marginBottom = 12;
  const contentWidthMm = pageWidthMm - marginX * 2; // 190 mm
  const maxContentHeightMm = pageHeightMm - marginTop - marginBottom; // 275 mm
  const blockGapMm = 3.5;

  let currentY = marginTop;

  const fillPageBackground = () => {
    pdf.setFillColor(251, 251, 250); // #FBFBFA
    pdf.rect(0, 0, pageWidthMm, pageHeightMm, 'F');
  };

  fillPageBackground();

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block || block.offsetHeight === 0 || block.offsetWidth === 0) continue;

    onProgress?.(`جاري تصوير أقسام الدرس (${i + 1} / ${blocks.length})...`);

    const prevDir = block.getAttribute('dir');
    block.setAttribute('dir', 'rtl');
    block.classList.add('pdf-export-block');

    // Hide any toggle buttons, solution buttons, and elements marked no-pdf
    const buttonsToHide = block.querySelectorAll<HTMLElement>(
      '.no-pdf, button, [id^="btn-toggle-"], .print\\:hidden'
    );
    const originalDisplays: Array<{ el: HTMLElement; display: string }> = [];
    buttonsToHide.forEach((b) => {
      originalDisplays.push({ el: b, display: b.style.display });
      b.style.setProperty('display', 'none', 'important');
    });

    let canvas: HTMLCanvasElement | null = null;
    try {
      // Font: false is essential to prevent modern-screenshot from attempting to fetch
      // remote Google Fonts via network over each individual block, which caused freezes.
      canvas = await domToCanvas(block, {
        scale: 1.75,
        backgroundColor: '#FBFBFA',
        font: false,
        timeout: 6000,
        features: {
          removeAbnormalAttributes: true,
          removeControlCharacter: true,
        },
      });
    } catch (captureErr) {
      console.warn(`[PDF Export] Skipped block ${i + 1} due to capture timeout/error:`, captureErr);
      continue;
    } finally {
      originalDisplays.forEach(({ el, display }) => {
        el.style.display = display;
      });
      block.classList.remove('pdf-export-block');
      if (prevDir === null) {
        block.removeAttribute('dir');
      } else {
        block.setAttribute('dir', prevDir);
      }
    }

    if (!canvas || canvas.width === 0 || canvas.height === 0) continue;

    const blockHeightMm = (canvas.height / canvas.width) * contentWidthMm;

    // Empêcher rigoureusement les titres de section d'être orphelins en bas de page
    const isSectionHeader =
      block.classList.contains('section-lead-group') ||
      block.querySelector('.section-lead-group') !== null ||
      block.id === 'sec-pc-deepen-header' ||
      block.id?.startsWith('sec-pc-') ||
      (block.querySelector('h1, h2, h3') !== null && block.offsetHeight < 280);

    if (isSectionHeader && currentY > marginTop + 5) {
      const nextBlock = blocks[i + 1];
      const nextHeightMm =
        nextBlock && nextBlock.offsetWidth > 0
          ? (nextBlock.offsetHeight / nextBlock.offsetWidth) * contentWidthMm
          : 50;
      // Exiger la place pour le titre ET au moins 70 mm de contenu suivant
      const requiredMm = blockHeightMm + Math.min(nextHeightMm, 70);
      if (currentY + requiredMm > marginTop + maxContentHeightMm) {
        pdf.addPage();
        fillPageBackground();
        currentY = marginTop;
      }
    }

    // Case 1: Block fits within a single A4 page
    if (blockHeightMm <= maxContentHeightMm) {
      if (currentY + blockHeightMm > marginTop + maxContentHeightMm && currentY > marginTop + 5) {
        pdf.addPage();
        fillPageBackground();
        currentY = marginTop;
      }

      const imgData = canvas.toDataURL('image/jpeg', 0.94);
      pdf.addImage(imgData, 'JPEG', marginX, currentY, contentWidthMm, blockHeightMm, undefined, 'FAST');
      currentY += blockHeightMm + blockGapMm;
    } else {
      // Case 2: Single block is taller than an entire A4 page — slice cleanly with infinite loop protection
      if (currentY > marginTop + 25) {
        pdf.addPage();
        fillPageBackground();
        currentY = marginTop;
      }

      const pxPerMm = canvas.width / contentWidthMm;
      let remainingPx = canvas.height;
      let sourceY = 0;
      let loopCounter = 0;

      while (remainingPx > 0 && loopCounter++ < 50) {
        const availHeightMm = marginTop + maxContentHeightMm - currentY;
        let sliceHeightPx = Math.min(remainingPx, Math.floor(availHeightMm * pxPerMm));

        if (sliceHeightPx <= 10) {
          pdf.addPage();
          fillPageBackground();
          currentY = marginTop;
          const freshAvailHeightMm = maxContentHeightMm;
          sliceHeightPx = Math.min(remainingPx, Math.floor(freshAvailHeightMm * pxPerMm));
          if (sliceHeightPx <= 0) break;
        }

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeightPx;
        const ctx = sliceCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FBFBFA';
          ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
          ctx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sliceHeightPx,
            0,
            0,
            canvas.width,
            sliceHeightPx
          );
        }

        const sliceHeightMm = sliceHeightPx / pxPerMm;
        const sliceImgData = sliceCanvas.toDataURL('image/jpeg', 0.94);
        pdf.addImage(sliceImgData, 'JPEG', marginX, currentY, contentWidthMm, sliceHeightMm, undefined, 'FAST');

        remainingPx -= sliceHeightPx;
        sourceY += sliceHeightPx;

        if (remainingPx > 0) {
          pdf.addPage();
          fillPageBackground();
          currentY = marginTop;
        } else {
          currentY += sliceHeightMm + blockGapMm;
        }
      }
    }
  }

  // Add page numbers at the bottom of every page
  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(120, 130, 145);
    pdf.text(
      `${footerLabel}  |  Page ${p} / ${totalPages}`,
      pageWidthMm / 2,
      pageHeightMm - 5.5,
      { align: 'center' }
    );
  }

  onProgress?.('جاري حفظ ملف PDF...');
  pdf.save(fileName);
}

export async function exportCourseToPdf(
  course: Course,
  onProgress?: (progressText: string) => void
): Promise<void> {
  const mainEl = document.getElementById('course-main-content');
  if (!mainEl) {
    throw new Error('Course content element not found');
  }

  onProgress?.('جاري فتح الحلول وتحضير الصفحات...');

  // 1. Expand all exercises and enable PDF export styling
  window.dispatchEvent(new CustomEvent('course-pdf-prepare'));
  mainEl.classList.add('pdf-export-mode');
  mainEl.setAttribute('dir', 'rtl');

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    await new Promise((resolve) => setTimeout(resolve, 350));

    const blocks = collectPrintableBlocks(mainEl);
    const safeTitle = course.title.replace(/[\\/:*?"<>|]/g, '').trim().replace(/\s+/g, '-');

    await renderBlocksToPdf(
      blocks,
      `Math 3AM  |  Cours ${course.number}`,
      `Cours-${course.number}-${safeTitle}.pdf`,
      onProgress
    );
  } finally {
    mainEl.classList.remove('pdf-export-mode');
    window.dispatchEvent(new CustomEvent('course-pdf-done'));
  }
}

export async function exportPhysicsCourseToPdf(
  course: PhysicsChemistryCourse,
  onProgress?: (progressText: string) => void
): Promise<void> {
  const mainEl = document.getElementById('physics-course-main-content');
  if (!mainEl) {
    throw new Error('Physics course content element not found');
  }

  onProgress?.('جاري فتح الأنشطة والتصحيحات وتحضير صفحات الدرس...');

  // 1. Switch to full view tab and expand all activity/application corrections
  window.dispatchEvent(new CustomEvent('course-pdf-prepare'));
  mainEl.classList.add('pdf-export-mode');
  mainEl.setAttribute('dir', 'rtl');

  // Explicitly ensure depth accordion content is rendered during PDF capture
  const deepenContent = mainEl.querySelector('.depth-accordion-content') as HTMLElement | null;
  let hadHiddenClass = false;
  if (deepenContent) {
    if (deepenContent.classList.contains('hidden')) {
      hadHiddenClass = true;
      deepenContent.classList.remove('hidden');
    }
    deepenContent.style.setProperty('display', 'block', 'important');
  }

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    // Allow React states and images to complete rendering
    await new Promise((resolve) => setTimeout(resolve, 450));

    const blocks = collectPhysicsPrintableBlocks(mainEl);
    const cleanTitre = (course.titreFrancais || course.titreArabe)
      .replace(/[\\/:*?"<>|،]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    await renderBlocksToPdf(
      blocks,
      `Physique-Chimie 3AM  |  Cours ${course.numero}`,
      `Physique-Chimie-3AM-Cours-${course.numero}-${cleanTitre}.pdf`,
      onProgress
    );
  } finally {
    if (deepenContent) {
      if (hadHiddenClass) {
        deepenContent.classList.add('hidden');
      }
      deepenContent.style.removeProperty('display');
    }
    mainEl.classList.remove('pdf-export-mode');
    window.dispatchEvent(new CustomEvent('course-pdf-done'));
  }
}

export async function exportSvtCourseToPdf(
  course: SvtCourse,
  onProgress?: (progressText: string) => void
): Promise<void> {
  const mainEl = document.getElementById('svt-course-main-content');
  if (!mainEl) {
    throw new Error('SVT course content element not found');
  }

  onProgress?.('جاري فتح الأنشطة والتصحيحات وتحضير صفحات درس علوم الطبيعة والحياة...');

  window.dispatchEvent(new CustomEvent('course-pdf-prepare'));
  mainEl.classList.add('pdf-export-mode');
  mainEl.setAttribute('dir', 'rtl');

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    await new Promise((resolve) => setTimeout(resolve, 450));

    const blocks = collectPhysicsPrintableBlocks(mainEl);
    const cleanTitre = (course.titreFrancais || course.titreArabe)
      .replace(/[\\/:*?"<>|،]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    await renderBlocksToPdf(
      blocks,
      `SVT 3AM  |  Cours ${course.numero}`,
      `SVT-3AM-Cours-${course.numero}-${cleanTitre}.pdf`,
      onProgress
    );
  } finally {
    mainEl.classList.remove('pdf-export-mode');
    window.dispatchEvent(new CustomEvent('course-pdf-done'));
  }
}



