const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  
  // Check if course 1 is active
  const svtBtn = await page.$('text=الزلازل ظاهرة طبيعية');
  if (svtBtn) {
    console.log('Clicking SVT course button...');
    await svtBtn.click();
    await page.waitForTimeout(1000);
  }

  const allIds = await page.evaluate(() => Array.from(document.querySelectorAll('[id]')).map(e => e.id));
  console.log('All IDs:', allIds);

  const deepenBtn = await page.$('#sec-svt-deepen-accordion button');
  console.log('deepenBtn found:', !!deepenBtn);
  if (deepenBtn) {
    await deepenBtn.click();
    await page.waitForTimeout(800);
  }

  const allIdsAfter = await page.evaluate(() => Array.from(document.querySelectorAll('[id]')).map(e => e.id));
  console.log('All IDs after click:', allIdsAfter.filter(id => id.includes('svt')));

  await browser.close();
})();
