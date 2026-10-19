const { chromium } = require('playwright-core');

async function run() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  console.log('=== 1. LES 9 PUCES (أحتفظ بالأهم) ===');
  const essentialText = await page.$eval('#sec-svt-essential', el => el.innerText);
  console.log(essentialText);

  console.log('\n=== 2. الخلاصة المركزة ===');
  const takeaway = await page.$eval('#sec-svt-essential', el => {
    const p = Array.from(el.querySelectorAll('div')).find(d => d.innerText.includes('الخلاصة المركزة'));
    return p ? p.innerText : 'Non trouvée';
  });
  console.log(takeaway);

  console.log('\n=== 3. QUESTION FLASH 2 ===');
  const flash2 = await page.$eval('#sec-svt-essential', el => {
    const q = Array.from(el.querySelectorAll('div, li, p')).find(d => d.innerText.includes('هل المقدار والشدة مترادفان؟'));
    return q ? q.innerText : 'Non trouvée';
  });
  console.log(flash2);

  const deepenBtn = await page.$('#sec-svt-deepen-accordion button');
  if (deepenBtn) {
    const text = await deepenBtn.textContent();
    if (text.includes('فتح') || text.includes('عرض')) {
      await deepenBtn.click();
      await page.waitForTimeout(500);
    }
  }

  console.log('\n=== 4. SECTION 5.D ===');
  const sec5dText = await page.$eval('#sec-svt-01-magnitude-intensity', el => el.innerText);
  console.log(sec5dText);

  console.log('\n=== 5. CORRIGÉ EXERCICE 3 ===');
  const exo3Header = await page.$('text=التمرين الثالث — وضعية إدماجية');
  if (exo3Header) {
    const exo3Card = await exo3Header.evaluateHandle(el => el.closest('.rounded-\\[16px\\]') || el.closest('.border') || el.parentElement);
    const corrBtn = await exo3Card.asElement().$('button');
    if (corrBtn) {
      await corrBtn.click();
      await page.waitForTimeout(500);
    }
    const exo3Text = await exo3Card.asElement().evaluate(el => el.innerText);
    console.log(exo3Text);
  }

  await browser.close();
}

run().catch(console.error);
