import { jsPDF } from "jspdf";
import { domToCanvas } from "modern-screenshot";
import { Course } from "../types";
import { PhysicsChemistryCourse } from "../typesPhysicsChemistry";
import { SvtCourse } from "../typesSvt";

/**
 * ============================================================================
 * PAGINATION PDF PAR FRONTIÈRES D'ÉLÉMENTS
 * ============================================================================
 * Règles (demande utilisateur) :
 *   1. Une ligne de tableau, une carte ou un paragraphe n'est JAMAIS tranchée :
 *      le contenu est coupé uniquement aux frontières d'éléments.
 *   2. Un tableau qui change de page répète son en-tête.
 *   3. Un bloc qui ne tient pas sur la page restante passe ENTIÈREMENT à la
 *      page suivante, sauf s'il est plus haut qu'une page entière.
 *   4. Pas de pages quasiment vides : le contenu suivant remonte.
 * ============================================================================
 */

const MAX_SINGLE_BLOCK_PX = 980;

/** Hauteur minimale d'une tranche (px @2x) — évite les micro-tranches. */
const MIN_SLICE_TAIL_PX = 32;

/**
 * Hauteur minimale (mm) d'une première tranche : en dessous (budget ou coupe
 * naturelle), le bloc — s'il tient sur une page — est reporté entier à la
 * page suivante (Règle 3) au lieu d'être découpé (first-fit).
 */
const MIN_FIRST_SLICE_MM = 35;

/**
 * Les conteneurs arrondis (cartes) plus hauts que cette limite ne sont PAS
 * traités comme unités indivisibles : la coupe peut passer entre leurs
 * enfants internes (eux-mêmes protégés individuellement).
 */
const MAX_CONTAINER_UNIT_MM = 100;

/**
 * Unités indivisibles : une tranche ne peut JAMAIS couper ces éléments en
 * deux (cartes arrondies, paragraphes, lignes de tableau, schémas SVG…).
 * La coupe se fait uniquement aux frontières de ces unités ou dans les
 * interstices de fond qui les séparent.
 */
const PROTECTED_UNIT_SELECTOR = [
  "p",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "tr",
  "thead",
  "tfoot",
  "svg",
  "img",
  "video",
  "iframe",
  "blockquote",
  "pre",
  "figcaption",
  "dt",
  "dd",
  "button",
  "input",
  "textarea",
  "select",
  ".section-lead-group",
  '[class*="rounded-"]',
].join(", ");

/**
 * Collecte les blocs logiques de #course-main-content (cours de maths).
 */
function collectPrintableBlocks(mainEl: HTMLElement): HTMLElement[] {
  const blocks: HTMLElement[] = [];

  const cardInner = mainEl.querySelector(
    "#course-card-inner",
  ) as HTMLElement | null;
  const sectionsWrapper =
    cardInner || (mainEl.querySelector(":scope > div") as HTMLElement | null);
  const topChildren = sectionsWrapper
    ? (Array.from(sectionsWrapper.children) as HTMLElement[])
    : (Array.from(mainEl.children) as HTMLElement[]);

  for (const section of topChildren) {
    if (
      !section ||
      section.id === "sec-continuity" ||
      section.classList.contains("no-pdf")
    )
      continue;
    const style = window.getComputedStyle(section);
    if (style.display === "none" || section.offsetHeight === 0) continue;

    if (section.offsetHeight <= MAX_SINGLE_BLOCK_PX) {
      blocks.push(section);
      continue;
    }

    const sectionChildren = Array.from(section.children) as HTMLElement[];
    for (const child of sectionChildren) {
      if (
        !child ||
        child.offsetHeight === 0 ||
        child.classList.contains("no-pdf")
      )
        continue;
      if (
        child.offsetHeight > MAX_SINGLE_BLOCK_PX &&
        child.children.length > 1 &&
        !child.classList.contains("grid")
      ) {
        for (const subChild of Array.from(child.children) as HTMLElement[]) {
          if (
            subChild.offsetHeight > 0 &&
            !subChild.classList.contains("no-pdf")
          ) {
            blocks.push(subChild);
          }
        }
      } else {
        blocks.push(child);
      }
    }
  }

  const treatiseLinksEl = mainEl.querySelector(
    "#sec-treatise-links",
  ) as HTMLElement | null;
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

/**
 * Détecte si un bloc contient un <table> avec un <thead> : l'en-tête sera
 * répété quand le tableau passe sur une nouvelle page.
 */
function findTableInBlock(block: HTMLElement): HTMLTableElement | null {
  const tables = Array.from(
    block.querySelectorAll("table"),
  ) as HTMLTableElement[];
  for (const table of tables) {
    if (table.tHead && table.tHead.rows.length > 0) return table;
  }
  return null;
}

/**
 * Mesure hors écran la hauteur (px @1x) de l'en-tête d'un tableau, telle
 * qu'elle sera répétée en haut de la page de continuation.
 */
function measureTheadHeightPx(table: HTMLTableElement): number {
  const clone = table.cloneNode(true) as HTMLTableElement;
  while (clone.tBodies.length > 0) {
    clone.removeChild(clone.tBodies[0]);
  }
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.pointerEvents = "none";
  clone.style.zIndex = "-1";
  clone.style.width = `${table.offsetWidth}px`;
  document.body.appendChild(clone);
  const thead = clone.querySelector("thead") as HTMLElement | null;
  const h = thead ? thead.offsetHeight : 0;
  document.body.removeChild(clone);
  return h;
}

interface IntervalPx {
  top: number;
  bottom: number;
}

/**
 * Fusionne les intervalles qui se CHEVAUCHENT strictement. Des intervalles
 * simplement adjacents restent distincts : l'interstice entre deux unités
 * est une zone de coupe autorisée.
 */
function mergeIntervals(intervals: IntervalPx[]): IntervalPx[] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a.top - b.top);
  const merged: IntervalPx[] = [{ ...sorted[0] }];
  for (let i = 1; i < sorted.length; i++) {
    const cur = sorted[i];
    const last = merged[merged.length - 1];
    if (cur.top < last.bottom) {
      last.bottom = Math.max(last.bottom, cur.bottom);
    } else {
      merged.push({ ...cur });
    }
  }
  return merged;
}

/**
 * Calcule, en px @2x relatifs au bloc, les intervalles des unités protégées
 * (rects DOM) et les y de coupe candidats : bord haut/bas de chaque unité
 * et milieu de chaque interstice entre unités. Les conteneurs plus hauts
 * qu'une page (maxUnitHeightPx) sont ignorés : trop grands pour être des
 * unités indivisibles, ce sont leurs enfants qui assurent la protection
 * fine (sinon un wrapper de section engloberait tout le bloc). Les grands
 * conteneurs arrondis (cartes) au-delà de containerMaxUnitPx sont eux aussi
 * ignorés des unités pour rester sécables entre leurs enfants, mais ils
 * sont collectés comme « gardes », avec toutes les cartes arrondies :
 * aucune coupe ne doit tomber à l'intérieur d'une carte arrondie, sinon sa
 * bordure est fragmentée entre deux pages (fragment de bord).
 */
function computeProtectedUnitsAndCutCandidates(
  block: HTMLElement,
  scale: number,
  canvasHeight: number,
  maxUnitHeightPx: number,
  containerMaxUnitPx: number,
): {
  units: IntervalPx[];
  cuts: number[];
  headings: IntervalPx[];
  guards: IntervalPx[];
} {
  const blockRect = block.getBoundingClientRect();
  const raw: IntervalPx[] = [];
  const headings: IntervalPx[] = [];

  const nodes = block.querySelectorAll(PROTECTED_UNIT_SELECTOR);
  for (const node of Array.from(nodes)) {
    const el = node as HTMLElement;
    if (el.offsetHeight === 0 || el.offsetWidth === 0) continue;
    const r = el.getBoundingClientRect();
    const heightPx = (r.bottom - r.top) * scale;
    if (heightPx > maxUnitHeightPx) continue;
    if (heightPx > containerMaxUnitPx && el.matches('[class*="rounded-"]'))
      continue;
    const top = Math.round((r.top - blockRect.top) * scale);
    const bottom = Math.round((r.bottom - blockRect.top) * scale);
    if (bottom <= 0 || top >= canvasHeight) continue;
    const interval = {
      top: Math.max(0, top),
      bottom: Math.min(canvasHeight, bottom),
    };
    raw.push(interval);
    if (el.matches("h1, h2, h3, h4, h5, h6")) headings.push(interval);
  }

  // Gardes : toutes les cartes arrondies du bloc (y compris celles déjà
  // protégées comme unités). Les micro-puces en ligne (< 60 px @2x) sont
  // ignorées : elles ne sont jamais réellement traversées par une coupe.
  const guards: IntervalPx[] = [];
  const guardNodes = block.querySelectorAll('[class*="rounded-"]');
  for (const node of Array.from(guardNodes)) {
    const el = node as HTMLElement;
    if (el === block || el.offsetHeight === 0 || el.offsetWidth === 0) continue;
    const r = el.getBoundingClientRect();
    const heightPx = (r.bottom - r.top) * scale;
    if (heightPx < 60) continue;
    const top = Math.round((r.top - blockRect.top) * scale);
    const bottom = Math.round((r.bottom - blockRect.top) * scale);
    if (bottom <= 0 || top >= canvasHeight) continue;
    guards.push({
      top: Math.max(0, top),
      bottom: Math.min(canvasHeight, bottom),
    });
  }

  const units = mergeIntervals(raw);
  const cutSet = new Set<number>([0, canvasHeight]);
  for (const u of units) {
    cutSet.add(u.top);
    cutSet.add(u.bottom);
  }
  for (let i = 0; i + 1 < units.length; i++) {
    cutSet.add(Math.floor((units[i].bottom + units[i + 1].top) / 2));
  }
  // Abords sûrs des cartes : un cheveu au-dessus du bord haut (la coupe
  // n'entame jamais la bordure arrondie), bas de carte, et milieu des
  // interstices qui la séparent des unités voisines.
  for (const g of guards) {
    cutSet.add(Math.max(1, g.top - 4));
    cutSet.add(g.bottom);
    let prevBottom = -1;
    let nextTop = canvasHeight + 1;
    for (const u of units) {
      if (u.bottom <= g.top && u.bottom > prevBottom) prevBottom = u.bottom;
      if (u.top >= g.bottom && u.top < nextTop) nextTop = u.top;
    }
    if (prevBottom >= 0 && g.top - prevBottom >= 8)
      cutSet.add(Math.floor((prevBottom + g.top) / 2));
    if (nextTop <= canvasHeight && nextTop - g.bottom >= 8)
      cutSet.add(Math.floor((g.bottom + nextTop) / 2));
  }

  return {
    units,
    cuts: Array.from(cutSet).sort((a, b) => a - b),
    headings,
    guards,
  };
}

/**
 * Découpe un bloc haut en tranches de page, en ne coupant qu'aux frontières
 * d'unités protégées (rects DOM) ou dans les interstices de fond hors unités.
 * La hauteur d'une tranche ne dépasse JAMAIS son budget : le pied de page
 * n'est jamais recouvert. Renvoie les indices de début de tranche (px @2x),
 * chaque fin étant le début de la suivante (dernière fin = fin du canvas).
 */
function splitBlockIntoPageSlices(
  canvas: HTMLCanvasElement,
  block: HTMLElement,
  firstBudgetPx: number,
  continuationBudgetPx: number,
  maxUnitHeightPx: number,
  containerMaxUnitPx: number,
  minLastSlicePx: number,
  minFirstSlicePx: number,
  blockFitsOnPage: boolean,
): number[] {
  const scale = canvas.width / Math.max(1, block.offsetWidth);
  const { units, cuts, headings, guards } =
    computeProtectedUnitsAndCutCandidates(
      block,
      scale,
      canvas.height,
      maxUnitHeightPx,
      containerMaxUnitPx,
    );

  const ctx = canvas.getContext("2d");
  const data = ctx
    ? ctx.getImageData(0, 0, canvas.width, canvas.height).data
    : null;
  const width = canvas.width;
  const height = canvas.height;

  const inProtected = (y: number): boolean => {
    for (const u of units) {
      if (y > u.top && y < u.bottom) return true;
    }
    return false;
  };

  // Une coupe « gardée » tombe à l'intérieur d'une carte arrondie (à moins
  // d'un cheveu sous son bord haut) : elle fragmenterait sa bordure entre
  // les deux pages.
  const isGuarded = (y: number): boolean => {
    for (const g of guards) {
      if (y > g.top - 4 && y < g.bottom - 4) return true;
    }
    return false;
  };

  const bgRowsFree: number[] = [];
  const bgRowsAll: number[] = [];
  if (data) {
    const bg: [number, number, number] = [data[0], data[1], data[2]];
    const tolerance = 14;
    for (let y = 1; y < height; y++) {
      let nonBg = 0;
      let anyBg = false;
      let total = 0;
      for (let x = 0; x < width; x += 4) {
        const i = (y * width + x) * 4;
        total++;
        const isBg =
          Math.abs(data[i] - bg[0]) <= tolerance &&
          Math.abs(data[i + 1] - bg[1]) <= tolerance &&
          Math.abs(data[i + 2] - bg[2]) <= tolerance;
        if (isBg) {
          anyBg = true;
        } else {
          nonBg++;
        }
      }
      if (anyBg) bgRowsAll.push(y);
      if (
        nonBg / Math.max(1, total) <= 0.01 &&
        !inProtected(y) &&
        !inProtected(y - 1)
      ) {
        bgRowsFree.push(y);
      }
    }
  }

  // Choisit la meilleure coupe ≤ limit. Priorité absolue aux frontières
  // qui ne tombent pas dans une carte arrondie (aucune bordure fragmentée,
  // aucune carte coupée en deux) ; ce n'est que pour un bloc plus haut
  // qu'une page — impossible à faire tenir autrement — que l'on retombe
  // sur les anciennes frontières, même situées dans une carte.
  const pickBestCut = (
    cursor: number,
    limit: number,
    isFirst: boolean,
  ): number => {
    const minY = cursor + MIN_SLICE_TAIL_PX;
    if (limit <= minY) return limit;
    const scan = (forbidGuarded: boolean): number => {
      const lists = [cuts, bgRowsFree, bgRowsAll];
      for (const arr of lists) {
        for (let i = arr.length - 1; i >= 0; i--) {
          const y = arr[i];
          if (y > minY && y <= limit && !(forbidGuarded && isGuarded(y)))
            return y;
        }
      }
      return -1;
    };
    const clean = scan(true);
    const minThis = isFirst ? minFirstSlicePx : MIN_SLICE_TAIL_PX * 3;
    if (clean > 0 && (clean - cursor >= minThis || blockFitsOnPage))
      return clean;
    const any = scan(false);
    if (any > 0) return any;
    return clean > 0 ? clean : limit;
  };

  const slices: number[] = [];
  let cursor = 0;
  let isFirstSlice = true;

  while (
    height - cursor >
    (isFirstSlice ? firstBudgetPx : continuationBudgetPx)
  ) {
    const budget = isFirstSlice ? firstBudgetPx : continuationBudgetPx;
    const cut = pickBestCut(cursor, cursor + budget, isFirstSlice);
    slices.push(cursor);
    cursor = cut > cursor ? cut : cursor + budget;
    isFirstSlice = false;
  }

  slices.push(cursor);

  // Anti-queue orpheline : évite qu'une dernière tranche minuscule (une ligne
  // seule) parte sur sa propre page. On recule la dernière coupe vers la
  // frontière naturelle immédiatement inférieure, tant que la tranche reculée
  // reste dans le budget d'une page entière. Le seuil (minLastSlicePx) est
  // plus généreux pour le dernier bloc du document : la toute dernière page
  // ne doit pas rester quasi vide.
  const MIN_LAST_SLICE_PX = minLastSlicePx;
  while (
    slices.length > 1 &&
    height - slices[slices.length - 1] < MIN_LAST_SLICE_PX
  ) {
    const lastCut = slices[slices.length - 1];
    const prevCut = slices[slices.length - 2];
    const minCut = Math.max(
      prevCut + MIN_SLICE_TAIL_PX,
      height - continuationBudgetPx,
    );
    const findBelow = (arr: number[], forbidGuarded: boolean): number => {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (
          arr[i] >= minCut &&
          arr[i] < lastCut &&
          !(forbidGuarded && isGuarded(arr[i]))
        )
          return arr[i];
      }
      return -1;
    };
    let newCut = findBelow(cuts, true);
    if (newCut < 0) newCut = findBelow(bgRowsFree, true);
    if (newCut < 0) newCut = findBelow(bgRowsAll, true);
    if (newCut < 0) newCut = findBelow(cuts, false);
    if (newCut < 0) newCut = findBelow(bgRowsFree, false);
    if (newCut < 0) newCut = findBelow(bgRowsAll, false);
    if (newCut < 0) break; // aucune frontière propre : on garde la queue
    slices[slices.length - 1] = newCut;
  }

  // Un titre (h1-h6) ne doit jamais terminer une tranche seul en bas de
  // page : si une coupe tombe au bas d'un titre (ou juste après, dans
  // l'interstice qui le suit), elle remonte au haut du titre pour qu'il
  // ouvre la tranche suivante avec son contenu.
  for (let i = 1; i < slices.length; i++) {
    const cut = slices[i];
    for (const h of headings) {
      if (h.bottom >= height - 2) continue;
      let gapEnd = height;
      for (const u of units) {
        if (u.top >= h.bottom - 1) {
          gapEnd = u.top;
          break;
        }
      }
      if (cut >= h.bottom - 1 && cut <= gapEnd + 1) {
        const minTop = slices[i - 1] + MIN_SLICE_TAIL_PX;
        if (h.top >= minTop && h.top < cut) {
          slices[i] = h.top;
        }
        break;
      }
    }
  }

  return slices;
}

/**
 * Génère le canvas d'une tranche [startPx, endPx) du bloc, avec en option
 * l'en-tête de tableau (thead) redessiné au-dessus pour la continuation.
 */
function buildSliceCanvas(
  canvas: HTMLCanvasElement,
  startPx: number,
  endPx: number,
  theadSource: HTMLTableElement | null,
  theadHeightPx2x: number,
  theadTopPx2x: number,
): HTMLCanvasElement {
  const sliceHeight = endPx - startPx;
  const extraTop = theadSource && startPx > 0 ? theadHeightPx2x : 0;
  const sliceCanvas = document.createElement("canvas");
  sliceCanvas.width = canvas.width;
  sliceCanvas.height = sliceHeight + extraTop;
  const ctx = sliceCanvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#FBFBFA";
    ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
    if (extraTop > 0 && theadSource) {
      // Redessine l'en-tête répété (thead) en haut de la page de continuation.
      ctx.drawImage(
        canvas,
        0,
        theadTopPx2x,
        canvas.width,
        theadHeightPx2x,
        0,
        0,
        canvas.width,
        extraTop,
      );
    }
    ctx.drawImage(
      canvas,
      0,
      startPx,
      canvas.width,
      sliceHeight,
      0,
      extraTop,
      canvas.width,
      sliceHeight,
    );
  }
  return sliceCanvas;
}

/** Libellé court d'un bloc pour le rapport de pagination. */
function describeBlock(el: HTMLElement): string {
  if (el.id) return `#${el.id}`;
  if (typeof el.className === "string" && el.className.trim().length > 0) {
    return `.${el.className.trim().split(/\s+/)[0]}`;
  }
  return el.tagName.toLowerCase();
}

/**
 * Dernier titre (h1-h6) visible d'un bloc : position de son haut (px @1x)
 * et espace restant sous lui (px @1x). Un bloc « se termine par un titre »
 * lorsque cet espace est quasi nul (titre seul en fin de bloc) : c'est le
 * cas des blocs de titre de section qui ne doivent jamais rester seuls en
 * bas de page.
 */
function findLastHeadingInfo(
  block: HTMLElement,
): { topPx: number; belowPx: number } | null {
  const headings = Array.from(
    block.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"),
  ).filter(
    (h) => h.offsetHeight > 0 && (h.textContent || "").trim().length > 0,
  );
  if (headings.length === 0) return null;
  const last = headings[headings.length - 1];
  const blockRect = block.getBoundingClientRect();
  const hRect = last.getBoundingClientRect();
  return {
    topPx: hRect.top - blockRect.top,
    belowPx: blockRect.bottom - hRect.bottom,
  };
}

async function renderBlocksToPdf(
  blocks: HTMLElement[],
  footerLabel: string,
  fileName: string,
  onProgress?: (progressText: string) => void,
): Promise<void> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
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

  const fillPageBackground = () => {
    pdf.setFillColor(251, 251, 250); // #FBFBFA
    pdf.rect(0, 0, pageWidthMm, pageHeightMm, "F");
  };

  fillPageBackground();
  let currentY = marginTop;
  let blockIndex = 0;
  const breakReport: string[] = [];
  const lastVisibleBlock =
    [...blocks].reverse().find((b) => b && b.offsetHeight > 0) ?? null;

  const startNewPage = () => {
    pdf.addPage();
    fillPageBackground();
    currentY = marginTop;
  };

  for (const block of blocks) {
    if (!block || block.offsetHeight === 0 || block.offsetWidth === 0) continue;
    blockIndex += 1;
    onProgress?.(
      `جاري تصوير أقسام الدرس (${blockIndex} / ${blocks.length})...`,
    );

    const prevDir = block.getAttribute("dir");
    block.setAttribute("dir", "rtl");
    block.classList.add("pdf-export-block");

    let canvas: HTMLCanvasElement | null = null;
    try {
      // Font: false is essential to prevent modern-screenshot from attempting to fetch
      // remote Google Fonts via network over each individual block, which caused freezes.
      canvas = await domToCanvas(block, {
        scale: 2,
        backgroundColor: "#FBFBFA",
        font: false,
        timeout: 6000,
        features: {
          removeAbnormalAttributes: true,
          removeControlCharacter: true,
        },
      });
    } catch (captureErr) {
      console.warn(
        `[PDF Export] Skipped block ${blockIndex} (capture timeout/error):`,
        captureErr,
      );
      canvas = null;
    } finally {
      block.classList.remove("pdf-export-block");
      if (prevDir === null) {
        block.removeAttribute("dir");
      } else {
        block.setAttribute("dir", prevDir);
      }
    }

    if (!canvas || canvas.width === 0 || canvas.height === 0) continue;

    const pxPerMm = canvas.width / contentWidthMm;
    const blockHeightMm = canvas.height / pxPerMm;
    const tableEl = findTableInBlock(block);
    const theadHeightPx2x = tableEl ? measureTheadHeightPx(tableEl) * 2 : 0;

    const pageBudgetPx = Math.floor(maxContentHeightMm * pxPerMm);
    const remainingMm = marginTop + maxContentHeightMm - currentY;
    const remainingPx = Math.floor(remainingMm * pxPerMm);
    const fitsOnEmptyPage = blockHeightMm <= maxContentHeightMm;

    // --------------------------------------------------------------
    // CAS 1 : le bloc rentre intégralement dans l'espace restant.
    // --------------------------------------------------------------
    if (blockHeightMm <= remainingMm) {
      // Garde-fou « titre orphelin » : un bloc qui se termine par un titre
      // de section ne doit jamais rester seul en bas de page. Si le contenu
      // suivant ne peut pas démarrer sous ce bloc (< MIN_FIRST_SLICE_MM),
      // le titre est reporté avec le début du contenu suivant.
      const remainingAfterMm = remainingMm - blockHeightMm - blockGapMm;
      const lastHeading = findLastHeadingInfo(block);
      const endsWithHeading = !!lastHeading && lastHeading.belowPx <= 40;
      if (
        endsWithHeading &&
        block !== lastVisibleBlock &&
        fitsOnEmptyPage &&
        currentY > marginTop + 0.5 &&
        remainingAfterMm < MIN_FIRST_SLICE_MM
      ) {
        if (blockHeightMm <= 60) {
          // Bloc-titre compact : reporté entier en tête de la page suivante.
          breakReport.push(
            `Page ${pdf.getNumberOfPages()} → ${pdf.getNumberOfPages() + 1} : bloc ${blockIndex} (${describeBlock(block)}) — titre de section reporté avec le contenu suivant (${remainingAfterMm.toFixed(1)} mm restants < ${MIN_FIRST_SLICE_MM} mm)`,
          );
          startNewPage();
        } else if (lastHeading) {
          // Grand bloc dont seul le titre final dépasse : le corps reste sur
          // la page courante, le titre ouvre la page suivante avec le contenu
          // qui suit.
          const captureScale = canvas.width / Math.max(1, block.offsetWidth);
          const headingTopPx = Math.max(
            0,
            Math.round(lastHeading.topPx * captureScale),
          );
          const minBodyPx = Math.round(20 * pxPerMm);
          if (headingTopPx >= minBodyPx && headingTopPx < canvas.height - 4) {
            const bodyCanvas = buildSliceCanvas(
              canvas,
              0,
              headingTopPx,
              null,
              0,
              0,
            );
            const bodyMm = bodyCanvas.height / pxPerMm;
            pdf.addImage(
              bodyCanvas.toDataURL("image/jpeg", 0.94),
              "JPEG",
              marginX,
              currentY,
              contentWidthMm,
              bodyMm,
              undefined,
              "FAST",
            );
            breakReport.push(
              `Page ${pdf.getNumberOfPages()} : bloc ${blockIndex} (${describeBlock(block)}) — corps ${bodyMm.toFixed(0)} mm ; le titre final ouvre la page suivante`,
            );
            currentY += bodyMm + blockGapMm;
            startNewPage();
            const tailCanvas = buildSliceCanvas(
              canvas,
              headingTopPx,
              canvas.height,
              null,
              0,
              0,
            );
            const tailMm = tailCanvas.height / pxPerMm;
            pdf.addImage(
              tailCanvas.toDataURL("image/jpeg", 0.94),
              "JPEG",
              marginX,
              currentY,
              contentWidthMm,
              tailMm,
              undefined,
              "FAST",
            );
            currentY += tailMm + blockGapMm;
            continue;
          }
        }
      }
      const imgData = canvas.toDataURL("image/jpeg", 0.94);
      pdf.addImage(
        imgData,
        "JPEG",
        marginX,
        currentY,
        contentWidthMm,
        blockHeightMm,
        undefined,
        "FAST",
      );
      currentY += blockHeightMm + blockGapMm;
      continue;
    }

    // Le bloc ne rentre pas dans l'espace restant. First-fit : on le découpe
    // dès que l'espace restant peut accueillir une tranche utile
    // (≥ MIN_FIRST_SLICE_MM) — sinon report entier à la page suivante.
    const minFirstSlicePx = Math.floor(MIN_FIRST_SLICE_MM * pxPerMm);
    const canFillCurrentPage =
      fitsOnEmptyPage &&
      remainingPx >= Math.max(minFirstSlicePx, MIN_SLICE_TAIL_PX);

    // --------------------------------------------------------------
    // CAS 2 : Règle 3 — bloc (tenant sur une page) reporté entier quand
    // l'espace restant est insuffisant pour une tranche utile.
    // --------------------------------------------------------------
    if (!canFillCurrentPage && fitsOnEmptyPage) {
      if (currentY > marginTop + 0.5) {
        breakReport.push(
          `Page ${pdf.getNumberOfPages()} → ${pdf.getNumberOfPages() + 1} : bloc ${blockIndex} (${describeBlock(block)}) reporté entier (${blockHeightMm.toFixed(0)} mm > ${Math.max(0, remainingMm).toFixed(0)} mm restants)`,
        );
        startNewPage();
      }
      const imgData = canvas.toDataURL("image/jpeg", 0.94);
      pdf.addImage(
        imgData,
        "JPEG",
        marginX,
        currentY,
        contentWidthMm,
        blockHeightMm,
        undefined,
        "FAST",
      );
      currentY += blockHeightMm + blockGapMm;
      continue;
    }

    // --------------------------------------------------------------
    // CAS 3 : bloc découpé en tranches propres. Le découpage démarre sur la
    // page courante (first-fit) pour la remplir ; si l'espace restant est
    // insuffisant pour une tranche utile, il démarre en haut d'une page neuve.
    // --------------------------------------------------------------
    if (
      currentY > marginTop + 0.5 &&
      remainingPx < Math.max(minFirstSlicePx, MIN_SLICE_TAIL_PX)
    ) {
      breakReport.push(
        `Page ${pdf.getNumberOfPages()} → suivante : bloc ${blockIndex} (${describeBlock(block)}) déplacé au début d'une page neuve`,
      );
      startNewPage();
    }

    const firstBudgetPx = Math.floor(
      (marginTop + maxContentHeightMm - currentY) * pxPerMm,
    );
    const continuationBudgetPx =
      theadHeightPx2x > 0
        ? Math.max(
            Math.floor(pageBudgetPx * 0.4),
            pageBudgetPx - theadHeightPx2x,
          )
        : pageBudgetPx;

    // Position du <thead> dans le canvas (px @2x) : on ne répète que
    // l'en-tête du tableau, jamais les lignes situées au-dessus dans le bloc.
    let theadTopPx2x = 0;
    let tableEndPx2x = 0;
    if (tableEl && tableEl.tHead) {
      const scopeRect = block.getBoundingClientRect();
      const theadRect = tableEl.tHead.getBoundingClientRect();
      const captureScale = canvas.width / Math.max(1, block.offsetWidth);
      theadTopPx2x = Math.max(
        0,
        Math.round((theadRect.top - scopeRect.top) * captureScale),
      );
      if (theadTopPx2x + theadHeightPx2x > canvas.height) {
        theadTopPx2x = Math.max(0, canvas.height - theadHeightPx2x);
      }
      // Bas des lignes de données (tbody) dans le canvas : une tranche qui
      // démarre après ce point ne contient plus aucune ligne du tableau, la
      // répétition du thead produirait un en-tête orphelin.
      const bodyRect = (tableEl.tBodies[0] ?? tableEl).getBoundingClientRect();
      tableEndPx2x = Math.round(
        (bodyRect.bottom - scopeRect.top) * captureScale,
      );
    }

    const containerMaxUnitPx = Math.max(
      1,
      Math.floor((MAX_CONTAINER_UNIT_MM / maxContentHeightMm) * pageBudgetPx),
    );
    const sliceStarts = splitBlockIntoPageSlices(
      canvas,
      block,
      Math.max(1, firstBudgetPx),
      Math.max(1, continuationBudgetPx),
      pageBudgetPx,
      containerMaxUnitPx,
      // Queue finale mini : 15 mm (n'importe quel bloc), 40 mm pour le tout
      // dernier bloc du document.
      Math.round((block === lastVisibleBlock ? 40 : 15) * pxPerMm),
      Math.max(1, minFirstSlicePx),
      fitsOnEmptyPage,
    );

    // Repli : si la première coupe naturelle est trop fine (< MIN_FIRST_SLICE_MM),
    // un bloc tenant sur une page est reporté ENTIER au lieu d'être tranché
    // (évite un titre de section orphelin en bas de page).
    const firstSlicePx =
      (sliceStarts.length > 1 ? sliceStarts[1] : canvas.height) -
      sliceStarts[0];
    if (
      fitsOnEmptyPage &&
      sliceStarts.length > 1 &&
      firstSlicePx < minFirstSlicePx
    ) {
      if (currentY > marginTop + 0.5) {
        breakReport.push(
          `Page ${pdf.getNumberOfPages()} → ${pdf.getNumberOfPages() + 1} : bloc ${blockIndex} (${describeBlock(block)}) reporté entier (coupe naturelle ${(firstSlicePx / pxPerMm).toFixed(0)} mm < ${MIN_FIRST_SLICE_MM} mm)`,
        );
        startNewPage();
      }
      const imgData = canvas.toDataURL("image/jpeg", 0.94);
      pdf.addImage(
        imgData,
        "JPEG",
        marginX,
        currentY,
        contentWidthMm,
        blockHeightMm,
        undefined,
        "FAST",
      );
      currentY += blockHeightMm + blockGapMm;
      continue;
    }

    for (let s = 0; s < sliceStarts.length; s++) {
      const startPx = sliceStarts[s];
      const endPx =
        s < sliceStarts.length - 1 ? sliceStarts[s + 1] : canvas.height;
      if (endPx - startPx <= 0) continue;

      const isTableContinuation =
        s > 0 &&
        !!tableEl &&
        tableEl.tHead !== null &&
        tableEl.tHead.rows.length > 0 &&
        startPx < tableEndPx2x - 1;
      const sliceCanvas = buildSliceCanvas(
        canvas,
        startPx,
        endPx,
        isTableContinuation ? tableEl : null,
        theadHeightPx2x,
        theadTopPx2x,
      );
      const sliceHeightMm = sliceCanvas.height / pxPerMm;
      const imgData = sliceCanvas.toDataURL("image/jpeg", 0.94);
      pdf.addImage(
        imgData,
        "JPEG",
        marginX,
        currentY,
        contentWidthMm,
        sliceHeightMm,
        undefined,
        "FAST",
      );

      breakReport.push(
        `Page ${pdf.getNumberOfPages()} : tranche ${s + 1}/${sliceStarts.length} du bloc ${blockIndex} (${describeBlock(block)}) — ${sliceHeightMm.toFixed(0)}mm/${maxContentHeightMm}mm @ y=${Math.round(startPx / 2)}px${isTableContinuation ? " [en-tête de tableau répété]" : ""}`,
      );

      currentY += sliceHeightMm + blockGapMm;
      if (s < sliceStarts.length - 1) {
        startNewPage();
      }
    }
  }

  // Pagination : numéros de page
  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(120, 130, 145);
    pdf.text(
      `${footerLabel}  |  Page ${p} / ${totalPages}`,
      pageWidthMm / 2,
      pageHeightMm - 5.5,
      { align: "center" },
    );
  }

  // eslint-disable-next-line no-console
  console.log(
    `[PDF pagination] ${totalPages} pages. Points de coupure:\n${breakReport.join("\n")}`,
  );
  (window as unknown as { __pdfBreakReport?: string }).__pdfBreakReport =
    `Total: ${totalPages} pages\n` + breakReport.join("\n");

  onProgress?.("جاري حفظ ملف PDF...");
  pdf.save(fileName);
}

export async function exportCourseToPdf(
  course: Course,
  onProgress?: (progressText: string) => void,
): Promise<void> {
  const mainEl = document.getElementById("course-main-content");
  if (!mainEl) {
    throw new Error("Course content element not found");
  }

  onProgress?.("جاري فتح الحلول وتحضير الصفحات...");

  window.dispatchEvent(new CustomEvent("course-pdf-prepare"));
  mainEl.classList.add("pdf-export-mode");
  mainEl.setAttribute("dir", "rtl");

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    await new Promise((resolve) => setTimeout(resolve, 350));

    const blocks = collectPrintableBlocks(mainEl);
    const safeTitle = course.title
      .replace(/[\\/:*?"<>|]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    await renderBlocksToPdf(
      blocks,
      `Math 3AM  |  Cours ${course.number}`,
      `Cours-${course.number}-${safeTitle}.pdf`,
      onProgress,
    );
  } finally {
    mainEl.classList.remove("pdf-export-mode");
    window.dispatchEvent(new CustomEvent("course-pdf-done"));
  }
}

export async function exportPhysicsCourseToPdf(
  course: PhysicsChemistryCourse,
  onProgress?: (progressText: string) => void,
): Promise<void> {
  const mainEl = document.getElementById("physics-course-main-content");
  if (!mainEl) {
    throw new Error("Physics course content element not found");
  }

  onProgress?.("جاري فتح الأنشطة والتصحيحات وتحضير صفحات الدرس...");

  window.dispatchEvent(new CustomEvent("course-pdf-prepare"));
  mainEl.classList.add("pdf-export-mode");
  mainEl.setAttribute("dir", "rtl");

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

    // Second signal après stabilisation du DOM : le premier a ouvert les
    // accordéons (ce qui monte les blocs pliables) ; ce second signal ouvre
    // les cartes pliables nouvellement montées (ex. تصحيح النشاط
    // الاستكشافي) avant la collecte des blocs.
    window.dispatchEvent(new CustomEvent("course-pdf-prepare"));
    await new Promise((resolve) => setTimeout(resolve, 200));

    const blocks = collectPhysicsPrintableBlocks(mainEl);
    const cleanTitre = (course.titreFrancais || course.titreArabe)
      .replace(/[\\/:*?"<>|،]/g, '')
      .trim()
      .replace(/\s+/g, "-");

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
    mainEl.classList.remove("pdf-export-mode");
    window.dispatchEvent(new CustomEvent("course-pdf-done"));
  }
}
