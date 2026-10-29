const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const outDir = path.join(__dirname, 'public', 'test_captures');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1100 } });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log('Navigating to SVT course...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // If on home/catalog, click to ensure SVT Course 1 is open
  const headerText = await page.textContent('body');
  if (!headerText.includes('الدرس 01 : الزلازل ظاهرة طبيعية')) {
    const svtCard = await page.$('text=الزلازل ظاهرة طبيعية');
    if (svtCard) {
      await svtCard.click();
      await page.waitForTimeout(800);
    }
  }

  // Expand the deepen accordion to make sure all subsections are visible
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('course-pdf-prepare'));
  });
  await page.waitForTimeout(800);

  // 1. Capture Page 1-2: Situation de départ + bloc « أحتفظ بالأهم » + schéma-bilan avec Image 1 et étiquettes arabes + bandeau des 4 cartes
  const discoveryEl = await page.$('#sec-svt-discovery');
  if (discoveryEl) {
    await discoveryEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await discoveryEl.screenshot({ path: path.join(outDir, 'proof_01_situation_depart.png') });
    console.log('Saved proof_01_situation_depart.png');
  }

  const essentialEl = await page.$('#sec-svt-essential');
  if (essentialEl) {
    await essentialEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await essentialEl.screenshot({ path: path.join(outDir, 'proof_02_essential_and_schema_bilan.png') });
    console.log('Saved proof_02_essential_and_schema_bilan.png');
  }

  const schemaBilanEl = await page.$('#sec-svt-schema-bilan-block');
  if (schemaBilanEl) {
    await schemaBilanEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await schemaBilanEl.screenshot({ path: path.join(outDir, 'proof_02b_schema_bilan_zoom.png') });
    console.log('Saved proof_02b_schema_bilan_zoom.png');
  }

  // 2. Capture Page 3-4: Exercices d'application (aucun bloc coupé)
  const exercisesEl = await page.$('#sec-svt-exercises');
  if (exercisesEl) {
    await exercisesEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await exercisesEl.screenshot({ path: path.join(outDir, 'proof_03_exercises_application.png') });
    console.log('Saved proof_03_exercises_application.png');
  }

  // 3. Capture Page 6: Coupe géologique (Image 1 + étiquettes arabes)
  const foyerEpicenterEl = await page.$('#sec-svt-foyer-epicenter');
  if (foyerEpicenterEl) {
    await foyerEpicenterEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await foyerEpicenterEl.screenshot({ path: path.join(outDir, 'proof_04_page6_geological_cross_section.png') });
    console.log('Saved proof_04_page6_geological_cross_section.png');
  }

  // 4. Capture Page 7: Sismographe (Image 2) + sismogramme (tracé numérique propre, graduations sans chevauchement)
  const seismogramEl = await page.$('#sec-svt-seismogram');
  if (seismogramEl) {
    await seismogramEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await seismogramEl.screenshot({ path: path.join(outDir, 'proof_05_page7_seismograph_and_seismogramme.png') });
    console.log('Saved proof_05_page7_seismograph_and_seismogramme.png');
  }

  // 5. Capture Page 8: Carte comparative Richter/MSK (sur une seule page)
  const richterMskEl = await page.$('#sec-svt-richter-msk');
  if (richterMskEl) {
    await richterMskEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await richterMskEl.screenshot({ path: path.join(outDir, 'proof_06_page8_richter_msk_comparison.png') });
    console.log('Saved proof_06_page8_richter_msk_comparison.png');
  }

  // 6. Capture Page 9: Section 6 « الزلازل والسلامة والوقاية » avec mentions « مكمل بيداغوجي »
  const safetyEl = await page.$('#sec-svt-01-safety');
  if (safetyEl) {
    await safetyEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await safetyEl.screenshot({ path: path.join(outDir, 'proof_07_page9_safety_prevention.png') });
    console.log('Saved proof_07_page9_safety_prevention.png');
  }

  // 7. Flowchart capture
  const flowchartEl = await page.$('#sec-svt-flowchart');
  if (flowchartEl) {
    await flowchartEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await flowchartEl.screenshot({ path: path.join(outDir, 'proof_08_flowchart.png') });
    console.log('Saved proof_08_flowchart.png');
  }

  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('All proofs captured successfully.');
}

main().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
