---
kind: build_system
name: Vite/React Build System with PDF Export Scripts
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - vite.config.ts
    - tsconfig.json
    - index.html
    - scripts/export-pdf-test.mjs
    - scripts/pdf-pages-to-png.mjs
---

# Build & Artifact Management

## System Overview

This is a Vite + React (TypeScript) single-page application. The build pipeline is minimal and centered on `vite` for development, bundling, and preview; TypeScript is used only as a type-checker (`noEmit: true`, invoked via `tsc --noEmit`). There is no Makefile, Dockerfile, CI configuration, or release automation in the repository.

## Key Files

- `package.json` — project manifest, dependency declarations, and npm scripts (`dev`, `build`, `preview`, `clean`, `lint`).
- `vite.config.ts` — Vite configuration: React plugin, Tailwind CSS v4 (`@tailwindcss/vite`), path alias `@/* → ./*`, HMR toggled by `DISABLE_HMR` env var.
- `tsconfig.json` — TypeScript config targeting ES2022, JSX transform `react-jsx`, `moduleResolution: "bundler"`, `isolatedModules: true`, `skipLibCheck: true`, `noEmit: true`.
- `index.html` — HTML entry point consumed by Vite.
- `scripts/*.mjs` / `scripts/*.py` — Standalone Node.js (Puppeteer-based) and Python (PyMuPDF-based) scripts for PDF rendering, inspection, and export testing (not part of the app build).

## Build Commands

| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `vite --port=3000 --host=0.0.0.0` | Local dev server with HMR (unless `DISABLE_HMR=true`) |
| `npm run build` | `vite build` | Production bundle to `dist/` |
| `npm run preview` | `vite preview` | Preview production build locally |
| `npm run clean` | `rm -rf dist server.js` | Remove build artifacts |
| `npm run lint` | `tsc --noEmit` | Type-check only (no output) |

## Architecture & Conventions

- **Bundler**: Vite 8.x with `@vitejs/plugin-react` and `@tailwindcss/vite`. No Webpack/Rollup customization beyond these two plugins.
- **Module system**: ESM throughout (`"type": "module"` in `package.json`, `module: "ESNext"` in tsconfig). Source files use `.tsx`/`.ts`; JS files are allowed via `allowJs: true`.
- **Path aliases**: Both Vite and TypeScript define `@/* → ./*`, so imports like `@/components/...` resolve from the repo root.
- **HMR behavior**: Controlled by the `DISABLE_HMR` environment variable — when set to `true`, both `hmr` and `watch` are disabled in the Vite dev server (commented as intentional for AI Studio agent edits).
- **Target**: Bundled output targets ES2022; TypeScript itself does not emit files (`noEmit: true`), delegating all compilation to Vite/esbuild.
- **PDF tooling**: Separate from the app build. `scripts/export-pdf-test.mjs` (and variants) and `scripts/pdf-pages-to-png.mjs` use Puppeteer (`puppeteer` in devDependencies) to drive Chrome for PDF/page rendering; Python helpers under `scripts/` use PyMuPDF for page analysis. These are executed manually, not wired into `npm run build`.

## Conventions & Constraints

- Development always starts via `npm run dev` (never direct `vite` invocation); the default port is 3000 and binding is `0.0.0.0`.
- Production builds go through `npm run build` which invokes `vite build`; there is no custom post-build step, version bump, or artifact upload script.
- Type checking is decoupled from bundling and runs via `npm run lint` using `tsc --noEmit`.
- The `dist/` directory is the sole build output location and is cleaned by `npm run clean`.
- Environment-driven HMR toggle (`DISABLE_HMR`) is an enforced convention for the AI Studio editing workflow — comments in `vite.config.ts` explicitly state "Do not modify" regarding this setting.
- No Dockerfile, Makefile, GitHub Actions/GitLab CI, or release pipeline exists in the repository; deployment steps are not defined here.