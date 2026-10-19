const { chromium } = require('playwright-core');

async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Click on "إظهار الإجابات" in flash questions block
  const flashBtn = await page.$('#sec-svt-essential button:has-text("إظهار الإجابات")');
  if (flashBtn) {
    await flashBtn.click();
    await page.waitForTimeout(400);
  }

  console.log('=== QUESTION FLASH 2 (AVEC RÉPONSE DÉPLOYÉE) ===');
  const flashCard = await page.$eval('#sec-svt-essential', el => {
    const questions = Array.from(el.querySelectorAll('.rounded-\\[12px\\], .border')).filter(e => e.innerText.includes('المقدار والشدة'));
    return questions.map(q => q.innerText).join('\n---\n');
  });
  console.log(flashCard);

  await browser.close();
}

run().catch(console.error);
