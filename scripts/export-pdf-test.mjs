import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("pdf_preview_new");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--force-device-scale-factor=1",
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });

// Capture console logs (breakpoint report)
const consoleLogs = [];
const allLogs = [];
page.on("console", (msg) => {
  const text = msg.text();
  allLogs.push(`[${msg.type()}] ${text.slice(0, 300)}`);
  if (text.includes("[PDF pagination]")) consoleLogs.push(text);
});
page.on("pageerror", (err) => {
  allLogs.push(`[pageerror] ${err.message}`);
});

// Handle download via CDP
const cdp = await page.createCDPSession();
await cdp.send("Browser.setDownloadBehavior", {
  behavior: "allow",
  downloadPath: OUT_DIR,
  eventsEnabled: true,
});

await page.goto("http://localhost:4173/", {
  waitUntil: "networkidle0",
  timeout: 60000,
});

// Navigate to Physique-Chimie module + course 01
await page.evaluate(() => {
  // Best-effort: click through UI. Fallback handled by hash routing if present.
  return true;
});

// Try to find the physics course link — inspect the app structure generically
// Click any element containing "الفيزياء"
const clickedPhysics = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll("button, a, div, span"));
  const target = els.find(
    (el) =>
      (el.textContent || "").includes("الفيزياء والكيمياء") &&
      el.offsetParent !== null,
  );
  if (target) {
    target.click();
    return true;
  }
  return false;
});
console.log("clickedPhysics =", clickedPhysics);
await new Promise((r) => setTimeout(r, 1500));

const clickedCourse1 = await page.evaluate(() => {
  const btn = Array.from(document.querySelectorAll("button")).find((b) => {
    const t = (b.textContent || "").replace(/\s+/g, " ").trim();
    return t.startsWith("فتح الدرس 01") && b.offsetParent !== null;
  });
  if (btn) {
    btn.click();
    return true;
  }
  return false;
});
console.log("clickedCourse1 =", clickedCourse1);
await new Promise((r) => setTimeout(r, 2500));

// Verify we're on the course view
const hasCourse = await page.evaluate(
  () => !!document.getElementById("physics-course-main-content"),
);
console.log("physics-course-main-content present =", hasCourse);

if (!hasCourse) {
  // Debug dump
  fs.writeFileSync(path.join(OUT_DIR, "debug.html"), await page.content());
  await page.screenshot({
    path: path.join(OUT_DIR, "debug.png"),
    fullPage: false,
  });
}

// Trigger PDF export
const exportBtn = await page.evaluate(() => {
  const btn = document.querySelector("#btn-export-physics-pdf");
  if (btn) {
    btn.click();
    return true;
  }
  return false;
});
console.log("export clicked =", exportBtn);

// Wait for export to finish: monitor toast disappearing / download event
let downloaded = false;
cdp.on("Browser.downloadProgress", (e) => {
  if (e.state === "completed") downloaded = true;
});
const waitStart = Date.now();
while (!downloaded && Date.now() - waitStart < 300000) {
  await new Promise((r) => setTimeout(r, 2000));
  const status = await page.evaluate(() => {
    const toasts = Array.from(document.querySelectorAll("div"));
    const t = toasts.find((d) => (d.textContent || "").includes("بنجاح"));
    return t ? "done" : "pending";
  });
  if (status === "done") {
    await new Promise((r) => setTimeout(r, 4000));
    break;
  }
}

console.log("downloaded =", downloaded);
console.log("CONSOLE REPORTS:", consoleLogs.join("\n---\n"));
console.log("\n=== BROWSER ERRORS / WARNINGS ===");
console.log(
  allLogs
    .filter(
      (l) =>
        l.startsWith("[error]") ||
        l.startsWith("[pageerror]") ||
        l.startsWith("[warning]"),
    )
    .slice(0, 40)
    .join("\n"),
);
console.log("=== END ===");

await browser.close();
