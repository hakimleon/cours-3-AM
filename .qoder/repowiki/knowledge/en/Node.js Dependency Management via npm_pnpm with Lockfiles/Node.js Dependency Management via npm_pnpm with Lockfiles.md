---
kind: dependency_management
name: Node.js Dependency Management via npm/pnpm with Lockfiles
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - tsconfig.json
    - vite.config.ts
    - bun.lock
    - pnpm-lock.yaml
---

## Approach

This is a Vite + React + TypeScript single-package project that manages dependencies through the standard Node.js ecosystem:

- **Manifest**: `package.json` declares runtime and development dependencies.
- **Lockfiles**: Both `bun.lock` and `pnpm-lock.yaml` are present in the repository root, indicating the project has been installed with both Bun and pnpm at some point; no `.npmrc`, `.pnp*`, or private registry configuration is present.
- **No vendoring**: There is no `vendor/`, `third_party/`, or vendored source tree — all third-party code is resolved from the npm registry (or configured registry) into `node_modules/`.
- **Build tooling as dependency**: The build system itself (`vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`) is declared as a dependency rather than invoked globally, following the convention of installing tooling per-project.

## Key Files

- `package.json` — sole manifest declaring `dependencies` (runtime: react, vite, jspdf, katex, lucide-react, motion, modern-screenshot, express, dotenv, @google/genai, @tailwindcss/vite, @types/katex) and `devDependencies` (typescript, puppeteer, tsx, esbuild, autoprefixer, tailwindcss, @types/*).
- `tsconfig.json` — sets `moduleResolution: "bundler"` and `skipLibCheck: true`, telling TypeScript to resolve packages using the bundler's resolution algorithm (Vite/esbuild), not classic node resolution.
- `vite.config.ts` — imports plugins directly by package name (`@vitejs/plugin-react`, `@tailwindcss/vite`); no custom resolver or alias beyond `@/*` → project root.
- `bun.lock` / `pnpm-lock.yaml` — deterministic lockfiles for Bun and pnpm respectively.
- `scripts/` — standalone Node scripts (`export-pdf-test.mjs`, `inspect-correction.mjs`, `pdf-pages-to-png.mjs`) use `tsx` and `puppeteer` as dev dependencies to drive PDF rendering.

## Conventions Observed

1. **All versions use caret ranges** (`^X.Y.Z`) in `package.json`, allowing minor/patch upgrades within the major version. No exact pinning is used in the manifest.
2. **TypeScript types are declared as separate `@types/*` packages** (e.g. `@types/react`, `@types/react-dom`, `@types/express`, `@types/node`, `@types/katex`) rather than bundled type declarations.
3. **Runtime vs. dev separation**: Build tools, Puppeteer, TSX, and type definitions live under `devDependencies`; only libraries consumed at app runtime live under `dependencies`.
4. **Path aliases**: `tsconfig.json` defines `@/*` → project root, mirrored by an identical alias in `vite.config.ts`, so imports like `@/components/...` resolve consistently across TypeScript and the bundler.
5. **Module format**: `package.json` declares `"type": "module"`, making `.js`/`.mjs` files ESM by default; TypeScript is configured with `module: "ESNext"` and `jsx: "react-jsx"`.
6. **No private registry or scoped auth**: There is no `.npmrc`, `.pnp.yml`, `bunfig.toml`, or `packageRegistryConfig` — packages are pulled from the public npm registry.
7. **Multiple lockfiles coexist**: Both `bun.lock` and `pnpm-lock.yaml` are committed, suggesting the repo may be built with either package manager depending on the environment; there is no `.tool-versions` or `engines` field enforcing a specific one.
8. **Package is marked private**: `"private": true` prevents accidental publication to the npm registry.