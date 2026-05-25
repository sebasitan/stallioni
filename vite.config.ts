import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', '');
  return {
    base: '/',
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      // Don't <link rel="modulepreload"> the heavy lazy chunks on the entry HTML.
      // Vite was preloading constants-full (488KB) and admin on EVERY page incl.
      // home, so the browser downloaded + compiled them during the critical
      // hydration window — delaying hydration and the hero repaint (mobile LCP).
      // They're only needed on service/admin pages and are dynamically imported
      // there, so on-demand loading is correct.
      modulePreload: {
        resolveDependencies: (_filename, deps) =>
          deps.filter((d) => !/\/(constants-full|admin)-/.test(d)),
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Only group genuine vendor libs for caching. We deliberately do NOT
            // force constants-full.tsx or the admin pages into manual chunks:
            // doing so hoisted their shared modules (icon components) into those
            // chunks, which made the main entry STATICALLY import the 488KB
            // constants-full + admin chunks on every page (incl. home) — the JS
            // that delayed the hero LCP. Letting Vite auto-split keeps them as
            // true on-demand async chunks loaded only via dynamic import.
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
          },
          // Optimize for mobile: smaller chunk names
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        }
      },
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
          // Mobile-specific optimizations
          passes: 2, // Multiple passes for better compression
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: {
          safari10: true, // Better Safari compatibility
        },
      },
      // CSS code splitting for faster initial load on mobile
      cssCodeSplit: true,
      // Improve mobile loading with smaller chunks
      cssMinify: true,
      // Report compressed size (helps track mobile performance)
      reportCompressedSize: false, // Faster builds
      // Target modern browsers with better mobile support
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    }
  };
});
