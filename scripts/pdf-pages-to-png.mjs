// Rend les pages d'un PDF en PNG via le viewer PDF natif de Chrome (puppeteer).
// Usage : node scripts/pdf-pages-to-png.mjs <chemin-pdf> <debut> <fin>
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const pdfPath = path.resolve(process.argv[2]);
const from = Number(process.argv[3] || 1);
const to = Number(process.argv[4] || from);
const OUT_DIR = path.resolve(process.argv[5] || "pdf_render");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1560, height: 1320, deviceScaleFactor: 1 });

const fileUrl = "file:///" + pdfPath.replace(/\\/g, "/");
for (let p = from; p <= to; p++) {
  // Recharge la page pour chaque hash (une simple navigation de hash ne
  // déclencherait pas le repositionnement du viewer).
  await page.goto("about:blank");
  await page.goto(`${fileUrl}#page=${p}&zoom=100`, {
    waitUntil: "networkidle0",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 2800));
  const out = path.join(OUT_DIR, `page-${String(p).padStart(2, "0")}.png`);
  await page.screenshot({ path: out });
  console.log("captured", out);
}
await browser.close();
