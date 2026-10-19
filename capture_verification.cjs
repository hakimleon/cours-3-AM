const { chromium } = require('playwright-core');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  const pageErrors = [];
  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const bodyText = await page.textContent('body');
  const hasCourse1 = bodyText.includes('الدرس 01 : الزلازل ظاهرة طبيعية');
  console.log('Course header present:', hasCourse1);

  // 1. Overview screenshot
  await page.screenshot({ path: 'public/test_captures/01_course_overview.png', fullPage: false });
  console.log('Saved 01_course_overview.png');

  // Expand Section 5 accordion if collapsed
  const deepenBtn = await page.$('#sec-svt-deepen-accordion button');
  if (deepenBtn) {
    const btnText = await deepenBtn.textContent();
    console.log('Deepen button text:', btnText);
    if (btnText.includes('عرض') || btnText.includes('إظهار') || btnText.includes('فتح') || btnText.includes('تفاصيل')) {
      await deepenBtn.click();
      await page.waitForTimeout(500);
      console.log('Clicked deepen accordion button');
    }
  }

  // 2. Schéma-bilan capture
  const schemaBilan = await page.$('text=مخطط تركيبي شامل');
  if (schemaBilan) {
    const parentContainer = await schemaBilan.evaluateHandle(el => el.closest('.rounded-\\[14px\\]') || el.parentElement);
    if (parentContainer && parentContainer.asElement()) {
      await parentContainer.asElement().screenshot({ path: 'public/test_captures/02_schema_bilan.png' });
      console.log('Saved 02_schema_bilan.png');
    }
  }

  // 3. Sismogramme capture
  const sismogramCard = await page.$('#sec-svt-01-recording');
  if (sismogramCard) {
    await sismogramCard.screenshot({ path: 'public/test_captures/03_sismogramme.png' });
    console.log('Saved 03_sismogramme.png');
  }

  // 4. Section 5.d capture
  const sec5d = await page.$('#sec-svt-01-magnitude-intensity');
  if (sec5d) {
    await sec5d.screenshot({ path: 'public/test_captures/04_section_5d.png' });
    console.log('Saved 04_section_5d.png');
  }

  // 5. Section 5.f (Prévention) capture
  const sec5f = await page.$('#sec-svt-01-safety');
  if (sec5f) {
    await sec5f.screenshot({ path: 'public/test_captures/05_prevention_section_5f.png' });
    console.log('Saved 05_prevention_section_5f.png');
  }

  // 6. Exercice 3 and correction capture
  const exo3Header = await page.$('text=التمرين الثالث — وضعية إدماجية');
  if (exo3Header) {
    const exo3Card = await exo3Header.evaluateHandle(el => el.closest('.rounded-\\[16px\\]') || el.closest('.border') || el.parentElement);
    if (exo3Card && exo3Card.asElement()) {
      const corrBtn = await exo3Card.asElement().$('button');
      if (corrBtn) {
        await corrBtn.click();
        await page.waitForTimeout(500);
      }
      await exo3Card.asElement().screenshot({ path: 'public/test_captures/06_exercice_3_correction.png' });
      console.log('Saved 06_exercice_3_correction.png');
    }
  }

  console.log('--- CONSOLE LOGS ---');
  console.log('Console logs count:', consoleLogs.length);
  const errors = consoleLogs.filter(l => l.type === 'error');
  const warnings = consoleLogs.filter(l => l.type === 'warning');
  console.log('Console errors count:', errors.length);
  console.log('Console warnings count:', warnings.length);
  console.log('Page errors count:', pageErrors.length);
  console.log('Console messages:', JSON.stringify(consoleLogs, null, 2));

  await browser.close();
}

run().catch(err => {
  console.error('Script error:', err);
  process.exit(1);
});
