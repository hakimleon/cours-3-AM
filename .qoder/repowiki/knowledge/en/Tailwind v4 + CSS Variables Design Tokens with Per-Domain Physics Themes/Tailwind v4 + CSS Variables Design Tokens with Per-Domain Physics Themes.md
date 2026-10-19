---
kind: frontend_style
name: Tailwind v4 + CSS Variables Design Tokens with Per-Domain Physics Themes
category: frontend_style
scope:
    - '**'
source_files:
    - src/index.css
    - src/components/physics/domainThemeTokens.tsx
    - package.json
    - vite.config.ts
---

## Approach

The app is a Vite/React course viewer styled with **Tailwind CSS v4** (via `@tailwindcss/vite` plugin) and a small set of hand-written CSS variables for global design tokens. There is no component library or utility-first class-only approach — most visual structure lives in plain CSS, while Tailwind provides base utilities.

### Styling stack
- **Build**: Vite (`vite.config.ts`) with `@tailwindcss/vite` plugin and `@vitejs/plugin-react`.
- **CSS engine**: Tailwind v4 (`tailwindcss: ^4.3.3`, `@tailwindcss/vite: ^4.3.3`). The single stylesheet `src/index.css` uses the new `@import "tailwindcss"` syntax and `@theme` block to register fonts.
- **Icons**: `lucide-react` (e.g. `Atom`, `FlaskConical`, `Zap`, `BatteryCharging`, `Sun`, `Cpu`, `Activity`, `Eye`, `Sparkles`).
- **Math rendering**: KaTeX (`katex: ^0.18.7`, `@types/katex`), with its own CSS imported via `@import "katex/dist/katex.min.css"`.
- **PDF export**: `jspdf` + `modern-screenshot` + Puppeteer; print styles live in `index.css` under `@media print`.

## Key files

- `src/index.css` — only stylesheet. Declares Tailwind import, KaTeX import, `@theme` font config, CSS custom properties, base layer, KaTeX LTR overrides, PDF/export mode rules, and `@media print`.
- `src/components/physics/domainThemeTokens.tsx` — domain-scoped design token registry for the Physique-Chimie module.
- `package.json` — dependency manifest showing Tailwind v4, KaTeX, lucide-react, jspdf, modern-screenshot, puppeteer.
- `vite.config.ts` — registers Tailwind v4 plugin and React plugin; sets an `@` path alias.

## Architecture & conventions

### Global design tokens (CSS custom properties)
All global colors, spacing, and layout values are declared as CSS variables on `:root` in `src/index.css`:

| Variable | Value | Purpose |
|---|---|---|
| `--accent` | `#C94BA6` (magenta) | Titles, icons, numbering, rails, bullets, links |
| `--text` | `#4A4A4A` | Primary text color |
| `--bg-page` | `#F6F0EB` | Cream page background |
| `--bg-card` | `#FFFFFF` | Central card background |
| `--fig-shape` | `#5B7BC0` | Figure primary shape (blue) |
| `--fig-mark` | `#F5A54A` | Demonstrated figure elements (orange) |
| `--radius` | `16px` |
| `--content-max` | `640px` | Narrow content column |
| `--line-height` | `1.9` | Very airy line height |

Typography is centralized in the Tailwind `@theme` block: `--font-sans: 'Alexandria', 'Tajawal', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`. The same font stack is also reapplied in `@layer base` with `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`.

### Per-domain physics themes
The Physique-Chimie module defines a richer, per-domain token system in `src/components/physics/domainThemeTokens.tsx`. Each of the five domains (`matter`, `energy`, `electricity`, `optics`, `general`) declares a complete palette:

- `primaryHex`, `secondaryHex`, `highlightHex` — core brand colors (teal for Matter, amber/orange for Energy, blue for Electricity, purple for Optics).
- `softBgHex`, `softBorderHex`, `darkTextHex` — light backgrounds and borders derived from the primary.
- `headerGradient`, `cardSubtleGradient`, `cardTopBarGradient` — precomputed CSS gradients.
- Three `LucideIcon` references (`PrimaryIcon`, `SecondaryIcon`, `TertiaryIcon`) plus bilingual icon labels.
- Pedagogical metadata: Arabic/French names, course ranges, bullet points, key units/symbols.

These tokens are consumed through a React Context pattern:
- `DOMAIN_THEME_TOKENS` — the central record.
- `getDomainTheme(domainId)` — lookup helper.
- `PhysicsDomainThemeProvider` — wraps a subtree with a domain's theme.
- `usePhysicsDomainTheme()` — hook for consuming tokens inside components.

Each domain also ships a bespoke SVG background pattern (`DomainPatternSvg`) — molecular orbitals for Matter, solar rays/battery/lightning for Energy, circuit traces for Electricity, prism rays for Optics — rendered at low opacity over domain banners.

### Typography & math direction
KaTeX formulas are forced into LTR (`direction: ltr !important`, `unicode-bidi: isolate`, `white-space: nowrap !important`) even on RTL Arabic pages. Displayed equations are centered; inline formulas use `.math-formula-scroll` with horizontal overflow scrolling. This is necessary because the course content is primarily Arabic but mathematical notation must remain left-to-right.

### Print / PDF export styles
Two mechanisms coexist:
1. `.pdf-export-mode` / `.pdf-export-block` classes — applied by the JS exporter to force RTL direction, hide interactive controls (`#sec-continuity`, `[id^="btn-toggle-solution-"]`, `.no-pdf`), and reset fonts.
2. `@media print` — hides `#main-topbar`, `#course-sidebar`, `#sec-continuity`, `.no-pdf`; expands `#course-main-content` to full width with zero margins/padding.

### Responsive strategy
There is no explicit responsive breakpoint system beyond Tailwind's default utilities. The layout centers around a fixed narrow column (`--content-max: 640px`) and relies on fluid typography and generous line height (`--line-height: 1.9`) rather than media queries. Smooth scrolling is enabled globally via `html { scroll-behavior: smooth }`.

## Conventions observed

- All global style lives in one file (`src/index.css`); there are no additional `.css` files in `src/`.
- Tailwind v4 is used via the new `@import "tailwindcss"` + `@theme` syntax rather than a `tailwind.config.js` file.
- Color tokens are expressed as CSS custom properties on `:root`, not as Tailwind theme extensions.
- Domain-specific theming is data-driven: each physics domain is a plain object in `domainThemeTokens.tsx` with hex colors, gradients, icons, and bilingual strings — components consume it via `usePhysicsDomainTheme()` rather than hardcoding colors.
- Icons come exclusively from `lucide-react`; no inline SVGs are used for icons (SVGs are reserved for domain background patterns).
- Math content is always rendered with KaTeX and forced LTR regardless of page language.
- Print/PDF output hides navigation/sidebar and forces RTL layout through dedicated CSS classes and `@media print` rules.