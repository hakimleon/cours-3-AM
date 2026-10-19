const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('--- 1. INITIALIZING BROWSER ---');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 }
  });

  const consoleLogs = [];
  const consoleErrors = [];
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text });
    if (type === 'error') {
      consoleErrors.push(text);
    }
  });

  const uncaughtErrors = [];
  page.on('pageerror', err => {
    uncaughtErrors.push(err.message);
  });

  console.log('--- 2. NAVIGATING TO APP ---');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Switch to SVT if not already active
  const svtTab = await page.$('button:has-text("علوم الطبيعة والحياة"), button:has-text("SVT")');
  if (svtTab) {
    await svtTab.click();
    await page.waitForTimeout(500);
  }

  // Ensure course 1 is selected
  const course1Btn = await page.$('text=الدرس 01 : الزلازل ظاهرة طبيعية');
  if (course1Btn) {
    await course1Btn.click();
    await page.waitForTimeout(600);
  }

  const outDir = path.resolve('public/verification_captures');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('--- 3. CAPTURING FULL SCREENSHOTS FOR REQUESTED PAGES ---');

  // Page 1: Header + Situation de départ
  const discoveryBlock = await page.$('#sec-svt-discovery');
  if (discoveryBlock) {
    await discoveryBlock.screenshot({ path: path.join(outDir, 'page1_situation_depart.png') });
    console.log('Saved page1_situation_depart.png');
  }

  // Page 2: Bloc « أحتفظ بالأهم »
  const essentialBlock = await page.$('#sec-svt-essential');
  if (essentialBlock) {
    await essentialBlock.screenshot({ path: path.join(outDir, 'page2_bloc_essentiel.png') });
    console.log('Saved page2_bloc_essentiel.png');
  }

  // Zoom Schéma-bilan (Page 2)
  const schemaBilan = await page.$('text=مخطط تركيبي شامل');
  if (schemaBilan) {
    const parentContainer = await schemaBilan.evaluateHandle(el => el.closest('.rounded-\\[14px\\]') || el.parentElement);
    if (parentContainer && parentContainer.asElement()) {
      await parentContainer.asElement().screenshot({ path: path.join(outDir, 'page2_schema_bilan_zoom.png') });
      console.log('Saved page2_schema_bilan_zoom.png');
    }
  }

  // Expand accordion for detailed sections
  const deepenBtn = await page.$('#sec-svt-deepen-accordion button');
  if (deepenBtn) {
    const btnText = await deepenBtn.textContent();
    if (btnText.includes('عرض') || btnText.includes('إظهار') || btnText.includes('فتح') || btnText.includes('تفاصيل')) {
      await deepenBtn.click();
      await page.waitForTimeout(600);
      console.log('Clicked deepen accordion button');
    }
  }

  // Page 6: Coupe géologique (Bourse, épicentre, faille)
  const coupeGeo = await page.$('text=Coupe géologique : Foyer, épicentre et ondes sismiques');
  if (coupeGeo) {
    const parent = await coupeGeo.evaluateHandle(el => el.closest('.rounded-\\[14px\\]') || el.closest('.border') || el.parentElement);
    if (parent && parent.asElement()) {
      await parent.asElement().screenshot({ path: path.join(outDir, 'page6_coupe_geologique.png') });
      console.log('Saved page6_coupe_geologique.png');
    }
  }

  // Pages 7-8: Sismogramme
  const sismogramCard = await page.$('#sec-svt-01-recording');
  if (sismogramCard) {
    await sismogramCard.screenshot({ path: path.join(outDir, 'pages7_8_sismogramme.png') });
    console.log('Saved pages7_8_sismogramme.png');
  }

  // Page 8: Section 5.d (Magnitude vs Intensité)
  const sec5d = await page.$('#sec-svt-01-magnitude-intensity');
  if (sec5d) {
    await sec5d.screenshot({ path: path.join(outDir, 'page8_section_5d.png') });
    console.log('Saved page8_section_5d.png');
  }

  // Page 9 & 10: Prévention (Section 5.f)
  const sec5f = await page.$('#sec-svt-01-safety');
  if (sec5f) {
    await sec5f.screenshot({ path: path.join(outDir, 'pages9_10_prevention.png') });
    console.log('Saved pages9_10_prevention.png');
  }

  // Pages 10-11: Vocabulaire / Glossaire
  const vocabBox = await page.$('#sec-svt-vocab');
  if (vocabBox) {
    await vocabBox.screenshot({ path: path.join(outDir, 'pages10_11_glossaire.png') });
    console.log('Saved pages10_11_glossaire.png');
  }

  // Exercice 3 with correction opened
  const exo3Header = await page.$('text=التمرين الثالث — وضعية إدماجية');
  if (exo3Header) {
    const exo3Card = await exo3Header.evaluateHandle(el => el.closest('.rounded-\\[16px\\]') || el.closest('.border') || el.parentElement);
    if (exo3Card && exo3Card.asElement()) {
      const corrBtn = await exo3Card.asElement().$('button');
      if (corrBtn) {
        await corrBtn.click();
        await page.waitForTimeout(500);
      }
      await exo3Card.asElement().screenshot({ path: path.join(outDir, 'exercice3_correction.png') });
      console.log('Saved exercice3_correction.png');
    }
  }

  console.log('--- 4. EXTRACTING FULL TEXT FROM RENDERED DOM ---');
  const fullText = await page.$eval('#svt-course-main-content', el => el.innerText);
  fs.writeFileSync('public/verification_captures/rendered_svt_course_text.txt', fullText, 'utf8');

  // Extract specifically the 9 bullets
  const cardsText = await page.$$eval('#sec-svt-essential [data-card-number]', els => els.map(e => e.innerText.replace(/\n+/g, ' ').trim()));
  console.log('EXTRACTED 9 CARDS:');
  cardsText.forEach((c, idx) => console.log(`${idx + 1}: ${c}`));

  // Extract situation concrete text
  const situationConcreteText = await page.$eval('#sec-svt-discovery p', el => el.innerText.trim());
  console.log('EXTRACTED SITUATION CONCRETE:');
  console.log(situationConcreteText);

  console.log('--- 5. BROWSER CONSOLE STATUS ---');
  console.log(`Total console messages: ${consoleLogs.length}`);
  console.log(`Total console errors:   ${consoleErrors.length}`);
  console.log(`Uncaught page errors:   ${uncaughtErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await browser.close();
  console.log('--- DONE ---');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
