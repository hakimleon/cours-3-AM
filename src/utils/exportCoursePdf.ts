import { jsPDF } from 'jspdf';
import { domToCanvas } from 'modern-screenshot';
import { Course } from '../types';
import { PhysicsChemistryCourse } from '../typesPhysicsChemistry';

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
 */
function collectPhysicsPrintableBlocks(mainEl: HTMLElement): HTMLElement[] {
  const blocks: HTMLElement[] = [];
  const MAX_BLOCK_HEIGHT_PX = 650;

  const pushCardOrChildren = (el: HTMLElement) => {
    if (!el || el.id === 'sec-continuity' || el.classList.contains('no-pdf')) return;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || el.offsetHeight === 0) return;

    // 1. If this element fits comfortably on an A4 page, keep it as an atomic card
    if (el.offsetHeight <= MAX_BLOCK_HEIGHT_PX) {
      blocks.push(el);
      return;
    }

    // 2. If it's taller than MAX_BLOCK_HEIGHT_PX, unwrap single wrapper or break down children cleanly
    // so individual cards (e.g. sample cards, observation tables, exercise cards) are never sliced
    const children = Array.from(el.children) as HTMLElement[];
    const validChildren = children.filter(
      (c) =>
        c &&
        c.offsetHeight > 0 &&
        !c.classList.contains('no-pdf') &&
        window.getComputedStyle(c).display !== 'none'
    );

    // If single wrapper child, penetrate deeper to find individual atomic cards
    if (validChildren.length === 1) {
      pushCardOrChildren(validChildren[0]);
      return;
    }

    if (validChildren.length > 1) {
      for (const child of validChildren) {
        pushCardOrChildren(child);
      }
      return;
    }

    blocks.push(el);
  };

  // 1. Separate top-level elements by logical course order
  const topChildren = Array.from(mainEl.children) as HTMLElement[];
  const headerOrHero: HTMLElement[] = [];
  const essential: HTMLElement[] = [];
  const detailedSections: HTMLElement[] = [];
  const exercisesSection: HTMLElement[] = [];
  const summarySection: HTMLElement[] = [];
  const otherElements: HTMLElement[] = [];

  for (const child of topChildren) {
    if (!child || child.id === 'sec-continuity' || child.classList.contains('no-pdf')) continue;
    if (child.id === 'sec-pc-essential') {
      essential.push(child);
    } else if (child.id === 'sec-pc-exercises') {
      exercisesSection.push(child);
    } else if (child.id === 'sec-pc-summary') {
      summarySection.push(child);
    } else if (child.id && child.id.startsWith('sec-pc-')) {
      detailedSections.push(child);
    } else if (child.querySelector?.('#sec-pc-exercises')) {
      exercisesSection.push(child);
    } else if (child.querySelector?.('[id^="sec-pc-"]')) {
      detailedSections.push(child);
    } else if (child.tagName.toLowerCase() === 'section' || child.tagName.toLowerCase() === 'header') {
      headerOrHero.push(child);
    } else {
      otherElements.push(child);
    }
  }

  // 2. Strict sequential order matching the general course template:
  //    En-tête -> L'essentiel -> Exercices avec corrigés -> Sections détaillées (« للتعمق ») -> Synthèse et vocabulaire
  const orderedElements = essential.length > 0
    ? [
        ...headerOrHero,
        ...essential,
        ...exercisesSection,
        ...detailedSections,
        ...summarySection,
        ...otherElements,
      ]
    : [
        ...headerOrHero,
        ...detailedSections,
        ...exercisesSection,
        ...summarySection,
        ...otherElements,
      ];

  for (const el of orderedElements) {
    pushCardOrChildren(el);
  }

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

    let canvas: HTMLCanvasElement;
    try {
      canvas = await domToCanvas(block, {
        scale: 2,
        backgroundColor: '#FBFBFA',
      });
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

    // Empêcher les titres de section d'être séparés de leur contenu (Sections 3, 4, 5, 7, etc.)
    const isSectionHeader =
      block.classList.contains('section-lead-group') ||
      block.querySelector('.section-lead-group') !== null ||
      (block.querySelector('h1, h2') !== null && block.offsetHeight < 300);

    if (isSectionHeader && currentY > marginTop + 5) {
      const nextBlock = blocks[i + 1];
      const nextHeightMm = nextBlock && nextBlock.offsetWidth > 0
        ? (nextBlock.offsetHeight / nextBlock.offsetWidth) * contentWidthMm
        : 70;
      // Garantit que le titre et au moins 75mm (ou l'intégralité) du contenu suivant tiennent ensemble
      const requiredMm = blockHeightMm + Math.min(nextHeightMm, 95);
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
      // Case 2: Single block is taller than an entire A4 page — slice it cleanly across pages
      if (currentY > marginTop + 30) {
        pdf.addPage();
        fillPageBackground();
        currentY = marginTop;
      }

      const pxPerMm = canvas.width / contentWidthMm;
      let remainingPx = canvas.height;
      let sourceY = 0;

      while (remainingPx > 0) {
        const availHeightMm = marginTop + maxContentHeightMm - currentY;
        const sliceHeightPx = Math.min(remainingPx, Math.floor(availHeightMm * pxPerMm));

        if (sliceHeightPx <= 10) {
          pdf.addPage();
          fillPageBackground();
          currentY = marginTop;
          continue;
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

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));

    const blocks = collectPhysicsPrintableBlocks(mainEl);
    const safeTitle = course.titreArabe
      .replace(/[\\/:*?"<>|،]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    await renderBlocksToPdf(
      blocks,
      `Physique-Chimie 3AM  |  Cours ${course.numero}`,
      `Physique-Chimie-3AM-Cours-${course.numero}-${safeTitle}.pdf`,
      onProgress
    );
  } finally {
    mainEl.classList.remove('pdf-export-mode');
    window.dispatchEvent(new CustomEvent('course-pdf-done'));
  }
}

