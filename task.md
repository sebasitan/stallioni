# Task: Optimize Web Application Performance

## 1. Analyze Current State
- [ ] Inspect `App.tsx` for route lazy loading.
- [ ] Inspect `vite.config.ts` for build optimizations.
- [ ] Inspect `index.html` for critical CSS/JS loading.

## 2. Implement Lazy Loading
- [ ] Refactor `App.tsx` to use `React.lazy` and `Suspense` for page routes.

## 3. Configure Build Optimizations
- [ ] Update `vite.config.ts` to implement manual chunks (e.g., separating vendor libs).
- [ ] Ensure production build removes console logs/debugger.

## 4. Optimize Assets & Rendering
- [ ] Add explicit width/height to images where missing (start with Header/Logo if obvious).
- [ ] Check for blocking scripts in `index.html`.

## 5. Verification
- [ ] Run build to verify chunking.
