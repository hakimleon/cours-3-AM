const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const URL = process.env.SVT_URL || 'http://localhost:4173/';
const OUT = path.join('public', 'verification_captures', 'lesson01_gabarit');
const MANUAL =
  'تتعرض الجزائر سنويا للعديد من الهزات الأرضية، معظم هذه الهزات لا يشعر بها السكان لضعف شدتها. إلا أن بعضها ذات شدات قوية تسبب تشوهات على مستوى سطح الأرض وخسائر مادية وبشرية متفاوتة.';

fs.mkdirSync(OUT, { recursive: true });

const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--font-render-hinting=none'],
    defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 2 },
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });

  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
  await sleep(1200);

  // Ouvre l'accordéon de façon persistante (état web).
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) =>
      (b.textContent || '').includes('فتح التفاصيل')
    );
    if (btn) btn.click();
  });
  await sleep(700);

  const data = await page.evaluate((MANUAL) => {
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const out = {};
    const summary = document.querySelector('#sec-svt-essential svg.svt-schema-bilan');
    const svgInfo = (svg) => {
      const r = svg.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;
      return { width: r.width, height: r.height, scale: r.width / vb.width };
    };
    out.summarySvg = summary ? svgInfo(summary) : null;
    out.labels = [];
    if (summary) {
      const s = svgInfo(summary);
      summary.querySelectorAll('rect[data-label-box]').forEach((rect, i) => {
        const box = rect.getBBox();
        const texts = Array.from(rect.parentNode.querySelectorAll('text'));
        const infos = texts.map((t) => {
          const b = t.getBBox();
          const fs = parseFloat(getComputedStyle(t).fontSize);
          return {
            text: t.textContent,
            bbox: { x: b.x, y: b.y, w: b.width, h: b.height },
            fontUser: fs,
            fontPx: +(fs * s.scale).toFixed(2),
            inside:
              b.x >= box.x + 1.5 &&
              b.y >= box.y + 1.5 &&
              b.x + b.width <= box.x + box.width - 1.5 &&
              b.y + b.height <= box.y + box.height - 1.5,
            padLeft: +(b.x - box.x).toFixed(1),
            padRight: +(box.x + box.width - (b.x + b.width)).toFixed(1),
          };
        });
        out.labels.push({
          index: i,
          box: { x: box.x, y: box.y, w: box.width, h: box.height },
          texts: infos,
          allInside: infos.every((t) => t.inside),
          minFontPx: Math.min(...infos.map((t) => t.fontPx)),
        });
      });
    }

    // Sismogramme : une seule étiquette d'axe « السعة ».
    const seismo = document.querySelector('#sec-svt-01-recording svg');
    out.seismo = null;
    if (seismo) {
      const texts = Array.from(seismo.querySelectorAll('text')).map((t) => ({
        text: t.textContent.trim(),
        bbox: (() => {
          const b = t.getBBox();
          return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
        })(),
        fontPx: +parseFloat(getComputedStyle(t).fontSize).toFixed(1),
      }));
      out.seismo = {
        ...svgInfo(seismo),
        saaa: texts.filter((t) => t.text === 'السعة'),
        plusMinus: texts.filter((t) => t.text === '+' || t.text === '−' || t.text === '0'),
        texts,
      };
    }

    // Carte comparative : occurrence unique de la phrase Zemmouri.
    const main = document.querySelector('#svt-course-main-content');
    const mainText = clean(main.innerText);
    const zem = 'مثل زلزال زموري 2003، مقدارا 6.6 على سلم ريشتر';
    const zemExact = 'مثل زلزال زموري 2003، مقداره 6.6 على سلم ريشتر';
    out.zemmouri = {
      exact: mainText.split(zemExact).length - 1,
      loose: mainText.split('زموري 2003').length - 1,
    };

    // Chaîne de synthèse : libellé « التسجيل » vs flèche verticale.
    const chain = document.querySelector('#sec-svt-fllowchart, #sec-svt-flowchart');
    const chainSvg = chain ? (Array.from(chain.querySelectorAll('svg')).find((x) => x.viewBox && x.viewBox.baseVal.width > 500) || null) : null;
    out.chain = null;
    if (chainSvg) {
      const r = chainSvg.getBoundingClientRect();
      const scale = r.width / chainSvg.viewBox.baseVal.width;
      const box = chainSvg.querySelector('rect[data-label-box]');
      const arrow = Array.from(chainSvg.querySelectorAll('line')).find(
        (l) => Math.abs(+l.getAttribute('x1') - +l.getAttribute('x2')) < 0.5 && +l.getAttribute('x1') === 495
      );
      const label = box ? (box.tagName === 'rect' && box.parentNode === chainSvg ? box.nextElementSibling : box.parentNode.querySelector('text')) : null;
      out.chain = {
        scale,
        box: box
          ? { x: +box.getAttribute('x'), y: +box.getAttribute('y'), w: +box.getAttribute('width'), h: +box.getAttribute('height') }
          : null,
        arrow: arrow
          ? {
              x: +arrow.getAttribute('x1'),
              y1: +arrow.getAttribute('y1'),
              y2: +arrow.getAttribute('y2'),
              strokeWidth: +arrow.getAttribute('stroke-width'),
            }
          : null,
        label: label
          ? { text: label.textContent, bbox: (() => { const b = label.getBBox(); return { x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; })(), fontPx: +(parseFloat(getComputedStyle(label).fontSize) * scale).toFixed(2) }
          : null,
      };
      const arrowRight = 495 + (out.chain.arrow ? out.chain.arrow.strokeWidth / 2 : 0);
      out.chain.gapToArrow = out.chain.box ? +(out.chain.box.x - arrowRight).toFixed(1) : null;
      out.chain.overlapArrow = out.chain.box ? out.chain.box.x <= arrowRight : null;
    }

    // Numérotation de l'accordéon.
    const body = document.querySelector('[data-svt-deepen-body="true"]');
    out.numbering = [];
    if (body) {
      Array.from(body.children).forEach((child) => {
        const badge = child.querySelector('span.rounded-\\[8px\\]');
        const h = child.querySelector('h2, h3');
        out.numbering.push({
          id: child.id || '',
          badge: badge ? clean(badge.textContent) : '',
          title: h ? clean(h.textContent) : '',
        });
      });
    }

    // Situation de départ affichée.
    const disc = document.querySelector('#sec-svt-discovery');
    const p = disc ? disc.querySelector('p') : null;
    const shown = p ? p.textContent : '';
    out.situation = {
      shown,
      manual: MANUAL,
      equal: shown === MANUAL,
      lengthShown: shown.length,
      lengthManual: MANUAL.length,
    };

    // Blocs atomiques et cartes d'exercice (contrôle des coupures).
    const blocks = [];
    const sel = [
      ...Array.from(document.querySelectorAll('[data-atomic-block="true"]')),
      ...Array.from(document.querySelectorAll('.application-enonce-group')),
    ];
    sel.forEach((el, i) => {
      const t = clean(el.innerText);
      if (!t) return;
      blocks.push({
        i,
        id: el.id || el.className.split(' ')[0],
        head: t.slice(0, 30),
        tail: t.slice(-30),
        text: t,
      });
    });
    out.blocks = blocks;
    return out;
  }, MANUAL);

  // Captures des blocs (pages de l'export) + zooms.
  const shots = [
    ['page01_entete.png', '#svt-course-header'],
    ['page02_essentiel.png', '#sec-svt-essential'],
    ['page04_exercice2.png', '.application-enonce-group'],
    ['page06_situation.png', '#sec-svt-discovery'],
    ['page07_sismogramme.png', '#sec-svt-01-recording'],
    ['page08_comparatif.png', '#sec-svt-01-magnitude-intensity'],
    ['page09_synthese.png', '#sec-svt-synthesis-vocab'],
  ];
  for (const [file, sel] of shots) {
    let el = await page.$(sel);
    if (sel === '.application-enonce-group') {
      const els = await page.$$(sel);
      el = els[1] || els[0] || null;
    }
    if (!el) {
      console.log('MISSING SELECTOR', sel);
      continue;
    }
    await el.scrollIntoView();
    await sleep(150);
    await el.screenshot({ path: path.join(OUT, file) });
  }

  const zooms = [
    ['zoom_schema_bilan.png', '#sec-svt-essential svg.svt-schema-bilan'],
    ['zoom_sismogramme.png', '#sec-svt-01-recording svg[viewBox="0 0 800 340"]'],
    ['zoom_comparatif.png', '#sec-svt-richter-msk'],
    ['zoom_synthese.png', '#sec-svt-flowchart svg[viewBox="0 0 860 300"]'],
  ];
  for (const [file, sel] of zooms) {
    const el = await page.$(sel);
    if (!el) {
      console.log('MISSING ZOOM', sel);
      continue;
    }
    await el.scrollIntoView();
    await sleep(150);
    await el.screenshot({ path: path.join(OUT, file) });
  }

  // PDF d'impression (couche texte, pour l'analyse des coupures).
  await page.emulateMediaType('print');
  await sleep(500);
  await page.pdf({
    path: path.join(OUT, 'cours_svt_01_impression.pdf'),
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '10mm', bottom: '12mm', left: '10mm', right: '10mm' },
  });
  await page.emulateMediaType('screen');

  // Export réel de l'application.
  const downloadDir = path.join('.svt_verif', 'downloads');
  fs.rmSync(downloadDir, { recursive: true, force: true });
  fs.mkdirSync(downloadDir, { recursive: true });
  const client = await page.createCDPSession();
  await client.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: path.resolve(downloadDir) });

  const clicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) =>
      (b.textContent || '').includes('حفظ كملف PDF')
    );
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  let exported = null;
  if (clicked) {
    for (let i = 0; i < 90; i++) {
      await sleep(1000);
      const files = fs.readdirSync(downloadDir).filter((f) => f.endsWith('.pdf'));
      if (files.length) {
        const f = path.join(downloadDir, files[0]);
        const st = fs.statSync(f);
        await sleep(800);
        if (st.size === fs.statSync(f).size && st.size > 10000) {
          exported = f;
          break;
        }
      }
    }
  }
  if (exported) {
    fs.copyFileSync(exported, path.join(OUT, 'cours_svt_01_export_application.pdf'));
  }

  fs.writeFileSync(path.join(OUT, 'rapport_dom.json'), JSON.stringify({ ...data, errors, exported: !!exported }, null, 2));
  console.log(JSON.stringify({
    labels: data.labels.map((l) => ({ allInside: l.allInside, minFontPx: l.minFontPx, box: l.box })),
    summarySvg: data.summarySvg,
    seismoSaaa: data.seismo ? data.seismo.saaa : null,
    seismoPlusMinus: data.seismo ? data.seismo.plusMinus : null,
    zemmouri: data.zemmouri,
    chain: data.chain,
    numbering: data.numbering,
    situationEqual: data.situation.equal,
    errors,
    exported: !!exported,
  }, null, 2));
  await browser.close();
}

run().catch((e) => {
  console.error('FAILED', e);
  process.exit(1);
});
