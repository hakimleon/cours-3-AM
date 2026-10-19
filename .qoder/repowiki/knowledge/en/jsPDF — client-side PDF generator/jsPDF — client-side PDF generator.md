---
kind: external_dependency
name: jsPDF — client-side PDF generator
slug: jspdf
category: external_dependency
category_hints:
    - sdk_real_api
scope:
    - '**'
source_files:
    - package.json
    - src/utils/exportCoursePdf.ts
---

### Role
Client-side PDF renderer used by `exportCoursePdf.ts` to rasterize React-rendered course pages into a printable PDF (the same file consumed by the Puppeteer test scripts).

### Integration shape
- Imported from `jspdf` inside `src/utils/exportCoursePdf.ts`.
- The engine measures DOM nodes in pixels, computes page boundaries, splits blocks between natural cut points, and draws each page via jsPDF's canvas/image API.
- Page height is fixed at 297 mm (A4); footer is drawn at y=291.5 mm with content capped at 285 mm to avoid overlap.

### Stable usage model
- The component tree must be fully mounted before export starts (the `course-pdf-prepare` / `course-pdf-done` event protocol exists so collapsible cards open themselves during export).
- Verify exact jsPDF method/param shapes against the official docs when changing the drawing path.

### Notes
- `puppeteer` (devDependency) is only used by `scripts/export-pdf-test*.mjs` to drive Chrome → capture the generated PDF; it is not part of the runtime bundle.