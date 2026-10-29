const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function main() {
  const outDir = path.join(__dirname, 'public', 'test_captures');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });

  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  console.log('Opening SVT Course 1 at http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Expand all accordion sections cleanly
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('course-pdf-prepare'));
  });
  await page.waitForTimeout(1000);

  // Proof 0: Course Header & Objectives Box
  const headerEl = await page.$('#svt-course-header');
  if (headerEl) {
    await headerEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await headerEl.screenshot({ path: path.join(outDir, 'proof_00_header_objectives.png') });
    console.log('✓ Captured: proof_00_header_objectives.png');
  }

  // Proof 1: Page 1-2 Situation de départ
  const discoveryEl = await page.$('#sec-svt-discovery');
  if (discoveryEl) {
    await discoveryEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await discoveryEl.screenshot({ path: path.join(outDir, 'proof_01_situation_depart.png') });
    console.log('✓ Captured: proof_01_situation_depart.png');
  }

  // Proof 2: Page 1-2 Essential block & 9 bullets
  const essentialEl = await page.$('#sec-svt-essential');
  if (essentialEl) {
    await essentialEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await essentialEl.screenshot({ path: path.join(outDir, 'proof_02_essential_block.png') });
    console.log('✓ Captured: proof_02_essential_block.png');
  }

  // Proof 2b: Schéma-bilan zoomed (Image 1 + SVG labels + 4 cards band)
  const schemaBilanEl = await page.$('#sec-svt-schema-bilan-block');
  if (schemaBilanEl) {
    await schemaBilanEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await schemaBilanEl.screenshot({ path: path.join(outDir, 'proof_02b_schema_bilan_zoom.png') });
    console.log('✓ Captured: proof_02b_schema_bilan_zoom.png');
  }

  // Proof 3: Page 3-4 Application Exercises (BEM)
  const exercisesEl = await page.$('#sec-svt-exercises');
  if (exercisesEl) {
    await exercisesEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await exercisesEl.screenshot({ path: path.join(outDir, 'proof_03_exercises_application.png') });
    console.log('✓ Captured: proof_03_exercises_application.png');

    const exo1El = await page.$('#exo-card-1');
    if (exo1El) {
      const toggleBtn = await exo1El.$('button');
      if (toggleBtn) {
        await toggleBtn.click();
        await page.waitForTimeout(400);
      }
      await exo1El.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await exo1El.screenshot({ path: path.join(outDir, 'proof_03b_exercise_1_correction.png') });
      console.log('✓ Captured: proof_03b_exercise_1_correction.png');
    }
  }

  // Proof 4: Page 6 Geological Cross Section (Image 1 + Arabic labels)
  const propagationEl = await page.$('#sec-svt-01-propagation');
  if (propagationEl) {
    await propagationEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await propagationEl.screenshot({ path: path.join(outDir, 'proof_04_page6_geological_cross_section.png') });
    console.log('✓ Captured: proof_04_page6_geological_cross_section.png');
  }

  // Proof 5: Page 7 Seismograph drum (Image 2) + Digital Seismogram
  const recordingEl = await page.$('#sec-svt-01-recording');
  if (recordingEl) {
    await recordingEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await recordingEl.screenshot({ path: path.join(outDir, 'proof_05_page7_seismograph_and_seismogramme.png') });
    console.log('✓ Captured: proof_05_page7_seismograph_and_seismogramme.png');
  }

  // Proof 6: Page 8 Richter / MSK Comparison Card
  const richterMskEl = await page.$('#sec-svt-richter-msk');
  if (richterMskEl) {
    await richterMskEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await richterMskEl.screenshot({ path: path.join(outDir, 'proof_06_page8_richter_msk_comparison.png') });
    console.log('✓ Captured: proof_06_page8_richter_msk_comparison.png');
  }

  // Proof 7: Page 9 Section 6 Safety and Prevention
  const safetyEl = await page.$('#sec-svt-01-safety');
  if (safetyEl) {
    await safetyEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await safetyEl.screenshot({ path: path.join(outDir, 'proof_07_page9_safety_prevention.png') });
    console.log('✓ Captured: proof_07_page9_safety_prevention.png');
  }

  // Proof 8: Flowchart
  const flowchartEl = await page.$('#sec-svt-flowchart');
  if (flowchartEl) {
    await flowchartEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await flowchartEl.screenshot({ path: path.join(outDir, 'proof_08_flowchart.png') });
    console.log('✓ Captured: proof_08_flowchart.png');
  }

  console.log('Console errors:', consoleLogs.filter(l => l.type === 'error'));
  console.log('All proofs captured.');
  await browser.close();
}

main().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
