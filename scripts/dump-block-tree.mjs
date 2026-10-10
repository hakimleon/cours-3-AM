// Dump fidèle de l'arbre des blocs du moteur PDF (Cours 01 PC) :
// même énumération que collectPhysicsPrintableBlocks + positions/rayons
// des enfants pour comprendre où passent les coupes.
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
page.on("pageerror", (e) => console.log("PAGEERROR:", String(e).slice(0, 300)));

const TARGET = process.argv[2] || "01";
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

// Ouvre les accordéons exactement comme l'export.
await page.evaluate(() => {
  document
    .getElementById("physics-course-main-content")
    ?.classList.add("pdf-export-mode");
  window.dispatchEvent(new CustomEvent("course-pdf-prepare"));
});
await new Promise((r) => setTimeout(r, 700));
await page.evaluate(() =>
  window.dispatchEvent(new CustomEvent("course-pdf-prepare")),
);
await new Promise((r) => setTimeout(r, 700));

const tree = await page.evaluate(() => {
  const mainEl = document.getElementById("physics-course-main-content");
  if (!mainEl) return { error: "no mainEl" };
  const MAX = 980;

  const pushElementOrChildren = (el, blocks) => {
    if (!el || el.id === "sec-continuity" || el.classList.contains("no-pdf"))
      return;
    const style = getComputedStyle(el);
    if (style.display === "none" || el.offsetHeight === 0) return;
    if (el.offsetHeight <= MAX) {
      blocks.push(el);
      return;
    }
    const children = Array.from(el.children);
    if (children.length === 0) {
      blocks.push(el);
      return;
    }
    for (const child of children) {
      if (
        !child ||
        child.offsetHeight === 0 ||
        child.classList.contains("no-pdf")
      )
        continue;
      if (
        child.offsetHeight > MAX &&
        child.children.length > 1 &&
        !child.classList.contains("grid") &&
        !child.classList.contains("section-lead-group")
      ) {
        for (const sub of Array.from(child.children)) {
          if (sub && sub.offsetHeight > 0 && !sub.classList.contains("no-pdf"))
            blocks.push(sub);
        }
      } else {
        blocks.push(child);
      }
    }
  };

  const blocks = [];
  for (const c of Array.from(mainEl.children)) pushElementOrChildren(c, blocks);

  const r1 = (v) => Math.round(v * 10) / 10;
  const info = (el, blockRect) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const radius = parseFloat(cs.borderTopLeftRadius) || 0;
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || "",
      cls: (typeof el.className === "string" ? el.className : "")
        .trim()
        .slice(0, 110),
      h: r1(el.offsetHeight),
      top: blockRect ? r1(r.top - blockRect.top) : 0,
      radius,
      bt: cs.borderTopWidth,
      bb: cs.borderBottomWidth,
      bg: cs.backgroundColor,
      text: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 55),
    };
  };

  const out = [];
  blocks.forEach((b, i) => {
    const blockRect = b.getBoundingClientRect();
    const entry = { index: i + 1, ...info(b, null) };
    if (b.offsetHeight > 500) {
      const rows = [];
      const walk = (node, d) => {
        if (d > 3) return;
        for (const ch of Array.from(node.children)) {
          if (ch.offsetHeight === 0) continue;
          rows.push({ depth: d, ...info(ch, blockRect) });
          walk(ch, d + 1);
        }
      };
      walk(b, 0);
      entry.children = rows;
    }
    out.push(entry);
  });

  const diag = [];
  for (const c of Array.from(mainEl.children)) {
    const cs = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    diag.push({
      tag: c.tagName.toLowerCase(),
      id: c.id || "",
      cls: (typeof c.className === "string" ? c.className : "")
        .trim()
        .slice(0, 80),
      h: r1(c.offsetHeight),
      display: cs.display,
      overflowY: cs.overflowY,
    });
  }
  return {
    blocks: out,
    capturedAt: Date.now(),
    exportMode: mainEl.classList.contains("pdf-export-mode"),
    topChildren: diag,
  };
});

fs.writeFileSync(
  path.resolve("pdf_render_new/block-tree.json"),
  JSON.stringify(tree, null, 1),
  "utf8",
);

// Résumé lisible
const lines = [];
if (tree.blocks) {
  for (const b of tree.blocks) {
    lines.push(
      `[${b.index}] ${b.tag}${b.id ? "#" + b.id : ""} .${b.cls.split(" ")[0] || ""} h=${b.h} radius=${b.radius} | ${b.text.slice(0, 40)}`,
    );
    if (b.children) {
      for (const c of b.children) {
        lines.push(
          `   ${"  ".repeat(c.depth)}d${c.depth} top=${c.top} h=${c.h} r=${c.radius} ${c.tag}.${(c.cls || "").split(" ")[0]} | ${c.text.slice(0, 40)}`,
        );
      }
    }
  }
}
if (tree.topChildren) {
  lines.push("\n--- TOP CHILDREN of mainEl ---");
  for (const c of tree.topChildren) {
    lines.push(
      `${c.tag}${c.id ? "#" + c.id : ""} .${c.cls.split(" ")[0] || ""} h=${c.h} display=${c.display} overflowY=${c.overflowY}`,
    );
  }
  lines.push(`exportMode=${tree.exportMode}`);
}
fs.writeFileSync(
  path.resolve("pdf_render_new/block-tree.txt"),
  lines.join("\n"),
  "utf8",
);
console.log(lines.join("\n"));
console.log("\nBlock count:", tree.blocks ? tree.blocks.length : tree.error);
await browser.close();
