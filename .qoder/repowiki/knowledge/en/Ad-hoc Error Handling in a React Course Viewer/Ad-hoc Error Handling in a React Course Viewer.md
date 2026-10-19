---
kind: error_handling
name: Ad-hoc Error Handling in a React Course Viewer
category: error_handling
scope:
    - '**'
source_files:
    - src/App.tsx
    - src/components/physics/simulations/SimulationScientifique.tsx
    - src/components/physics/PhysicsCourseView.tsx
    - src/data/physicsChemistryCoursesData.ts
    - src/utils/exportCoursePdf.ts
---

## What system/approach is used

The repository has **no centralized error-handling framework, no custom error class hierarchy, and no middleware layer**. Errors are handled ad hoc at the point of use:

- **React `try`/`catch`** around user-facing async operations (PDF export).
- **`localStorage` access wrapped in `try`/`catch`** to tolerate storage being unavailable or corrupted.
- **`throw new Error(...)`** for build-time / data-validation failures inside component render paths.
- **A single `SimulationErrorBoundary`** (`getDerivedStateFromError`) that catches runtime errors inside interactive physics simulations and falls back to a static view.
- **Bare `.catch(() => {})`** on browser APIs (`document.documentElement.requestFullscreen`, `document.exitFullscreen`).
- **`console.error`** as the only logging mechanism for failed PDF exports.

There are no sentinel-error constants, no `Result`/`Either` types, no global error handler, and no `panic`/`recover` equivalent.

## Key files and packages

| File | Role |
|---|---|
| `src/App.tsx` | Top-level UI; wraps both Math and Physics PDF export flows in `try`/`catch`, sets Arabic error toast messages, and logs via `console.error`. Also guards `localStorage` reads/writes. |
| `src/components/physics/simulations/SimulationScientifique.tsx` | Defines `SimulationErrorBoundary` (class component using `getDerivedStateFromError`) and `SimulationFallbackView`; any uncaught error inside an interactive simulation renders the fallback instead of crashing the page. |
| `src/components/physics/PhysicsCourseView.tsx` | Contains `assertSectionNotEmpty` and inline `throw new Error(...)` calls that fail fast when a published course section is empty or contains only blank blocks — labeled `[Erreur Physique-Chimie Cours …]`. |
| `src/data/physicsChemistryCoursesData.ts` | Build-time validation throws `new Error(`[Build Error] Le cours ${c.numero} ... ne contient aucune section.`)` when course data is malformed. |
| `src/utils/exportCoursePdf.ts` | Throws `Error("Course content element not found")` / `Error("Physics course content element not found")` when the expected DOM root is missing during PDF export. |
| `src/components/CourseSectionsRenderer.tsx`, `src/components/CourseSidebar.tsx`, `src/components/GeometryTreatisePage.tsx`, `src/components/MathView.tsx` | Each wraps `localStorage` reads in `try`/`catch` with a silent fallback. |

## Architecture and conventions

1. **Fail-fast for invalid data.** Data integrity problems (empty sections, missing course sections) are surfaced by throwing `Error` directly from render/validation code rather than returning a nullable value. The comments explicitly label these as "BUG 1 Guard" and "Build Error", indicating they are meant to fail the preview/build so authors can fix the source data.

2. **User-facing async failures are caught locally.** Both `handleExportCoursePdf` and `handleExportPhysicsCoursePdf` in `App.tsx` follow the same shape: set an exporting flag + status message → `try { await export… } catch (err) { console.error(…) ; setPdfExportStatus(Arabic error message) } finally { reset flags }`. The error state is transient (auto-clears after ~2.5 s).

3. **Storage corruption is silently ignored.** Every `localStorage.getItem` + `JSON.parse` is wrapped in `try`/`catch` returning an empty array; every `setItem` is also wrapped in `try`/`catch` with an empty body. This makes progress/favorite/discovery state best-effort.

4. **Browser API rejections are swallowed.** `requestFullscreen().catch(() => {})` and `exitFullscreen().catch(() => {})` ignore permission-denied or unsupported-environment errors.

5. **Interactive simulation rendering is isolated.** `SimulationErrorBoundary` is the only React error boundary in the app. It swaps the interactive stage for `SimulationFallbackView`, which renders a static schema, key-value table, chemical formula, and short explanation — ensuring a broken simulation cannot break the whole lesson.

6. **No cross-cutting error propagation.** Errors thrown from `exportCourseToPdf` / `exportPhysicsCourseToPdf` bubble up to the caller in `App.tsx`, which is the only place they are caught. There is no shared error type returned through the call chain.

## Conventions and constraints

- **Observed convention:** `localStorage` reads return a default value on parse/storage failure; writes are fire-and-forget. Enforced by repeated `try { localStorage.setItem(...) } catch {}` patterns across `App.tsx` and `PhysicsCourseView.tsx`.
- **Observed convention:** PDF export handlers expose progress via an `onProgress` callback string (Arabic text) and surface failures via a fixed Arabic toast message (`'حدث خطأ أثناء حفظ ملف PDF، يرجى المحاولة مرة أخرى.'`).
- **Observed convention:** Validation errors thrown from components/data layers carry a structured prefix such as `[Erreur Physique-Chimie Cours ${course.numero}]` or `[Build Error]` to make them identifiable in the console.
- **Observed convention:** Unhandled runtime errors inside a simulation fall back to `SimulationFallbackView` rather than propagating to a top-level boundary.
- **Constraint enforced by the code:** A published (`status === 'populated'`) Physics-Chemistry course must have at least one non-empty section; otherwise `PhysicsCourseView` throws during render.
- **Constraint enforced by the code:** PDF export functions require their respective DOM roots (`#course-main-content`, `#physics-course-main-content`) to exist before proceeding; absence throws immediately.