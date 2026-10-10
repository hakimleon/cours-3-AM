// Inspecte l'état du corps « تصحيح النشاط الاستكشافي » pendant l'export PDF.
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
page.on("console", (m) => console.log("BROWSER:", m.text().slice(0, 300)));

await page.goto("http://localhost:4173/", {
  waitUntil: "networkidle0",
  timeout: 60000,
});
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
await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll("button"));
  const btn = els.find((b) => {
    const t = (b.textContent || "").trim();
    return (
      /^\d{2}$/.test(t) &&
      t === "01" &&
      b.offsetParent !== null &&
      b.className.includes("font-mono")
    );
  });
  if (btn) btn.click();
});
await new Promise((r) => setTimeout(r, 2500));

const probe = async (label) => {
  const info = await page.evaluate(() => {
    const all = Array.from(
      document.querySelectorAll("#physics-course-main-content *"),
    );
    // Le contenu du corps contient « جواب 1 : »
    const ansEl = all.find((e) => (e.textContent || "").startsWith("جواب 1 :"));
    const titleEl = all.find(
      (e) =>
        (e.textContent || "").trim() ===
        "تصحيح النشاط الاستكشافي (وضعية الانطلاق)",
    );
    if (!ansEl) return { ansFound: false, titleFound: !!titleEl };
    let el = ansEl;
    let hiddenCls = null;
    while (el && el !== document.body) {
      const c = String(el.className || "");
      if (c.includes("hidden")) {
        hiddenCls = c.slice(0, 80);
        break;
      }
      el = el.parentElement;
    }
    const cardRoot = titleEl
      ? titleEl.closest('[class*="rounded-[14px]"]')
      : null;
    return {
      ansFound: true,
      ansHeight: ansEl.getBoundingClientRect().height,
      hiddenCls,
      cardHeight: cardRoot ? cardRoot.offsetHeight : -1,
    };
  });
  console.log(label, JSON.stringify(info));
};

await probe("BEFORE-CLICK:");
await page.evaluate(() => {
  document.getElementById("btn-export-physics-pdf")?.click();
});
await new Promise((r) => setTimeout(r, 400));
await probe("AT+400ms:");
await new Promise((r) => setTimeout(r, 400));
await probe("AT+800ms:");
await new Promise((r) => setTimeout(r, 1500));
await probe("AT+2300ms:");
await new Promise((r) => setTimeout(r, 4000));
await probe("AT+6300ms:");
await browser.close();
