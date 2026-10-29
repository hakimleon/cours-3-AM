const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const OUT = path.join('public', 'verification_captures', 'lesson01_gabarit');
const FILE = '/verification_captures/lesson01_gabarit/cours_svt_01_export_application.pdf';
const pages = [1, 2, 4, 6, 7, 8, 9];
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--no-sandbox'], defaultViewport: { width: 900, height: 1300, deviceScaleFactor: 1 } });
  const page = await browser.newPage();
  let total = 0;
  for (const n of pages) {
    await page.goto(`http://localhost:4173/.pdfrender/index.html?file=${encodeURIComponent(FILE)}&page=${n}&scale=1.6`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.waitForFunction("window.__status === 'ready' || (window.__status||'').startsWith('error')", { timeout: 60000 });
    total = await page.evaluate(() => window.__pages || 0);
    const status = await page.evaluate(() => window.__status);
    if (status !== 'ready') { console.log('page', n, status); continue; }
    const canvas = await page.$('#pagecanvas');
    await canvas.screenshot({ path: path.join(OUT, `export_page${String(n).padStart(2, '0')}.png`) });
    console.log('rendered page', n);
  }
  console.log('TOTAL_PAGES', total);
  await browser.close();
})();
