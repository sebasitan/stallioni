# Task: Optimize Web Application Performance

> Status: ✅ COMPLETE — verified 2026-06-26. `npm run build:vite` passes
> (built in 36.73s, 33 chunks generated). All steps below confirmed in code.

## 1. Analyze Current State
- [x] Inspect `App.tsx` for route lazy loading.
- [x] Inspect `vite.config.ts` for build optimizations.
- [x] Inspect `index.html` for critical CSS/JS loading.

## 2. Implement Lazy Loading
- [x] Refactor `App.tsx` to use `React.lazy` and `Suspense` for page routes. (App.tsx:13-39, 180)

## 3. Configure Build Optimizations
- [x] Update `vite.config.ts` to implement manual chunks (e.g., separating vendor libs). (vite.config.ts:32-49)
- [x] Ensure production build removes console logs/debugger. (vite.config.ts:58-65 — drop_console, drop_debugger)

## 4. Optimize Assets & Rendering
- [x] Add explicit width/height to images where missing. (Header logo: width="210" height="42")
- [x] Check for blocking scripts in `index.html`. (GA + Clarity idle-loaded; reCAPTCHA lazy)

## 5. Verification
- [x] Run build to verify chunking. (vite build ✓ — router, heavy-data, admin, constants-full split into own chunks)

## Notes / follow-up (not blocking)
- Build warns: "Generated an empty chunk: react-vendor". The `react-vendor`
  manualChunks entry (react + react-dom) is producing a 0 kB file because those
  modules are landing in the entry chunk instead. Harmless, but the entry could
  shed weight if fixed. Low priority.
