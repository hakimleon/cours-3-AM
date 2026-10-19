---
kind: configuration_system
name: Environment-Based Configuration via Vite + .env.example
category: configuration_system
scope:
    - '**'
source_files:
    - .env.example
    - vite.config.ts
    - package.json
---

## What system/approach is used

The project uses a minimal, environment-variable-driven configuration approach built on:
- **Vite** as the build/dev server (configuration in `vite.config.ts`).
- **`.env` files** (only `.env.example` committed; no `.env` checked in) for developer defaults.
- **AI Studio runtime secrets injection** — the `.env.example` comments document that `GEMINI_API_KEY` and `APP_URL` are supplied at runtime by AI Studio's Secrets panel / Cloud Run service URL, not by local `.env` files.
- The `dotenv` npm package is declared as a dependency but is **not imported or used anywhere in the source code**; it appears to be a leftover from a template.

There is no centralized config loader, no YAML/TOML/JSON config files, no feature-flag system, and no runtime configuration API.

## Key files and packages

- `.env.example` — declares the two supported environment variables (`GEMINI_API_KEY`, `APP_URL`) with inline documentation of their purpose and how they are injected.
- `vite.config.ts` — reads `process.env.DISABLE_HMR` to toggle HMR and file watching behavior during agent edits.
- `package.json` — defines the dev/build scripts (`dev`, `build`, `preview`, `lint`) and lists `dotenv` as a dependency (unused).

## Architecture and conventions

1. **Configuration surface is tiny**: only three environment variables are recognized across the entire repo:
   - `DISABLE_HMR` — controls Vite dev-server HMR and file watching (`vite.config.ts` lines 17–19).
   - `GEMINI_API_KEY` — Gemini AI API key, documented as injected by AI Studio at runtime.
   - `APP_URL` — base URL of the hosted applet, also injected by AI Studio.

2. **No runtime config object**: application code does not import a config module. Environment values are accessed directly via `process.env` where needed (e.g., `vite.config.ts`).

3. **Secrets are externalized**: sensitive values (`GEMINI_API_KEY`) are never committed; the example file contains placeholder values and explicitly instructs users to configure them through the AI Studio UI Secrets panel.

4. **Build-time vs runtime split**: `DISABLE_HMR` is consumed at build/config-load time by Vite; `GEMINI_API_KEY` and `APP_URL` are intended for runtime use by the running applet (though no source file currently references them — they are likely consumed by AI Studio's wrapper or generated code).

## Conventions and constraints

- **Convention**: All configurable values go through environment variables; there is no config file format (no `.yaml`, `.toml`, `.json` config) in the repository.
- **Constraint enforced by the platform**: Per `.env.example`, `GEMINI_API_KEY` and `APP_URL` are expected to be provided by AI Studio at runtime rather than by local `.env` files — this is a deployment convention, not a code-level enforcement.
- **Constraint enforced by code**: `vite.config.ts` conditionally disables HMR and sets `watch: null` when `process.env.DISABLE_HMR === 'true'`; this is the only place `process.env` is read in the source tree.
- **Not enforced**: The `dotenv` package is listed as a dependency but is never imported or required anywhere in `src/`, so it has no effect on the application.