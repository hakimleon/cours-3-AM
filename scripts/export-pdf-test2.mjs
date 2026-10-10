import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('pdf_preview_new');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox','--disable-setuid-sandbox','--force-device-scale-factor=1']
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
page.on('console', (m) => console.log('BROWSER:', m.text().slice(0, 300)));
page.on('pageerror', (e) => console.log('PAGEERROR:', String(e).slice(0, 300)));

const cdp = await page.createCDPSession();
await cdp.send('Browser.setDownloadBehavior', {
  behavior: 'allow', downloadPath: OUT_DIR, eventsEnabled: true
});
cdp.on('Browser.downloadProgress', (e) => {
  console.log('DOWNLOAD EVENT:', e.state, e.filePath || '');
});
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle0', timeout: 60000 });

// Go to the physics module
await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('button, a, div, span'));
  const t = els.find((el) => (el.textContent||'').includes('الفيزياء والكيمياء') && el.offsetParent !== null);
  t?.click();
});
await new Promise(r=>setTimeout(r,1800));

// Click course 01
const ok = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll('button, a, div'));
  const t = els.find((el) => {
    const txt = (el.textContent||'');
    return txt.includes('تنظيم المادة') && txt.length < 300 && el.offsetParent !== null;
  });
  if (!t) {
    console.log('NO MATCH: courses visible are:');
    Array.from(document.querySelectorAll('button')).slice(0, 40).map((b, i) => {
      console.log(i, (b.textContent||'').slice(0, 60));
    });
    return false;
  }
  t.click();
  return true;
});
console.log('clickedCourse =', ok);
await new Promise(r=>setTimeout(r,3000));
await page.screenshot({ path: path.join(OUT_DIR, 'after-course.png') });

// Check the export button exists
const hasBtn = await page.evaluate(() => !!document.getElementById('btn-export-physics-pdf'));
console.log('hasBtn =', hasBtn);

// Click export and follow status closely
await page.evaluate(() => document.getElementById('btn-export-physics-pdf')?.click());
console.log('clicked export');

// Poll the app's progress toast
let finished = false;
const start = Date.now();
while (Date.now() - start < 300000) {
  await new Promise(r=>setTimeout(r,2000));
  const st = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('div,span'));
    const done = all.find((d) => (d.textContent||'').includes('بنجاح'));
    const progress = all.find((d) => (d.textContent||'').includes('جاري تصوير'));
    return {
      done: !!done,
      progress: progress ? (progress.textContent||'').slice(0,80) : null,
      breakReport: window.__pdfBreakReport || null,
    };
  });
  if (st.breakReport && st.done) {
    console.log('BREAK REPORT:\n' + st.breakReport);
    finished = true;
    break;
  }
  if (st.progress) process.stdout.write('progress=' + st.progress + '\r');
  if (st.done) {
    await new Promise(r=>setTimeout(r,3500));
    const st2 = await page.evaluate(() => window.__pdfBreakReport || 'MISSING');
    console.log('\nBREAK REPORT2:\n' + st2);
    finished = true;
    break;
  }
}
if (!finished) console.log('\nTIMEOUT waiting for export');
await page.screenshot({ path: path.join(OUT_DIR, 'after-export.png') });
await browser.close();
