---
kind: external_dependency
name: Puppeteer — headless Chrome driver for PDF export tests
slug: puppeteer
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
source_files:
    - package.json
    - scripts/export-pdf-test.mjs
    - scripts/export-pdf-test2.mjs
    - scripts/export-pdf-test3.mjs
---

### Role
Dev-only automation tool used by `scripts/export-pdf-test*.mjs` to launch Vite preview on localhost:3000, navigate to the Physics-Chimie module, select Cours 01, click the export button, and wait for the generated PDF download.

### Stable integration pattern
- Launches a local Vite preview server (`vite preview`) then connects Puppeteer to `http://localhost:3000`.
- Drives the UI by clicking the numbered course selector buttons and the export button (`#btn-export-physics-pdf`).
- Not shipped with the app — declared under `devDependencies` only.

### Gotcha observed