import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("pdf_preview_new");

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
page.on("console", (m) => console.log("BROWSER:", m.text().slice(0, 12000)));
page.on("pageerror", (e) => console.log("PAGEERROR:", String(e).slice(0, 300)));

const cdp = await page.createCDPSession();
const downloads = [];
let dlCompleted = false;
cdp.on("Browser.downloadWillBegin", (e) => {
  console.log("DL BEGIN:", e.suggestedFilename);
  downloads.push(e.suggestedFilename);
});
cdp.on("Browser.downloadProgress", (e) => {
  console.log("DL", e.state);
  if (e.state === "completed") dlCompleted = true;
});
await cdp.send("Browser.setDownloadBehavior", {
  behavior: "allow",
  downloadPath: path.resolve(OUT_DIR),
  eventsEnabled: true,
});

const TARGET = process.argv[2] || "09"; // numero du cours cible
await page.goto("http://localhost:4173/", {
  waitUntil: "networkidle0",
  timeout: 60000,
});

// navigate
await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll("button, a, div, span"));
  els
    .find(
      (el) =>
        (el.textContent || "").includes("الفيزياء والكيمياء") &&
        el.offsetParent !== null,
    )
    ?.click();
});
await new Promise((r) => setTimeout(r, 1800));

// Sélection du cours via les boutons numérotés de la sidebar du domaine
await page.evaluate((target) => {
  const els = Array.from(document.querySelectorAll("button"));
  const btn = els.find((b) => {
    const t = (b.textContent || "").trim();
    return (
      /^\d{2}$/.test(t) &&
      t === target &&
      b.offsetParent !== null &&
      b.className.includes("font-mono")
    );
  });
  if (btn) btn.click();
}, TARGET);
await new Promise((r) => setTimeout(r, 2500));
console.log("target course =", TARGET);
// Capture le texte DOM au moment où l'export ouvre les accordéons : c'est
// la source exacte du contenu rasterisé dans les images du PDF.
await page.evaluate(() => {
  window.__pdfTextCapture = "";
  window.__pdfCaptureScheduled = false;
  window.addEventListener("course-pdf-prepare", () => {
    if (window.__pdfCaptureScheduled) return;
    window.__pdfCaptureScheduled = true;
    setTimeout(() => {
      const root =
        document.getElementById("physics-course-main-content") || document.body;
      window.__pdfTextCapture = root.innerText || "";
    }, 800);
  });
});
await page.evaluate(() => {
  document.getElementById("btn-export-physics-pdf")?.click();
});
console.log("export clicked");

// long poll : export may take several minutes
const start = Date.now();
while (Date.now() - start < 480000) {
  await new Promise((r) => setTimeout(r, 3000));
  let st;
  try {
    st = await page.evaluate(() => ({
      report: window.__pdfBreakReport || null,
      busy: !!Array.from(document.querySelectorAll("*")).find((d) =>
        (d.textContent || "").match(/جاري تصوير أقسام/),
      ),
    }));
  } catch {
    console.log("evaluate failed (page detached), stopping poll");
    break;
  }
  if (st.report) {
    console.log("\n=== BREAK REPORT ===\n" + st.report);
    break;
  }
  if (st.busy)
    process.stdout.write("…" + Math.round((Date.now() - start) / 1000) + "s ");
  if (!st.busy && !st.report && Date.now() - start > 20000) {
    console.log("STOPPED without report, retrying click");
    await page.evaluate(() =>
      document.getElementById("btn-export-physics-pdf")?.click(),
    );
    await new Promise((r) => setTimeout(r, 5000));
  }
}
// Dump du texte DOM capturé pendant l'export (source exacte des images PDF)
const captured = await page
  .evaluate(() => window.__pdfTextCapture || "")
  .catch(() => "");
fs.writeFileSync(
  path.resolve("pdf_render_new/pdf-dom-text.txt"),
  captured,
  "utf8",
);
console.log("DOM text captured:", captured.length, "chars");
console.log("\nDownloads seen:", downloads.join(", "));
const dlWaitStart = Date.now();
while (!dlCompleted && Date.now() - dlWaitStart < 180000) {
  await new Promise((r) => setTimeout(r, 2000));
}
console.log(
  "download completed =",
  dlCompleted,
  `(${Math.round((Date.now() - dlWaitStart) / 1000)}s d'attente)`,
);
await browser.close();
