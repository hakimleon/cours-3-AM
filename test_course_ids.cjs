const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);

  // Directly check without clicking anything
  const ids = await page.evaluate(() => Array.from(document.querySelectorAll('[id]')).map(e => e.id));
  console.log('SVT IDs present initially:', ids.filter(id => id.includes('svt') || id.includes('sec-')));

  // Now expand the deepen accordion
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('course-pdf-prepare'));
  });
  await page.waitForTimeout(600);

  const idsAfter = await page.evaluate(() => Array.from(document.querySelectorAll('[id]')).map(e => e.id));
  console.log('SVT IDs after expand:', idsAfter.filter(id => id.includes('svt') || id.includes('sec-')));

  await browser.close();
})();
