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
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            // Shared icon components are imported by BOTH the homepage and
            // constants-full.tsx. Giving them their own chunk stops Rollup from
            // hoisting them into the constants-full chunk (which previously forced
            // the entry to statically import the whole 488KB constants-full on
            // every page — the cause of the mobile-LCP render delay). With icons
            // isolated, constants-full + admin can stay as separate async chunks
            // WITHOUT bloating the entry (which was creating a 300ms main-thread
            // long task and tanking desktop TBT).
            // Modules shared between the entry (App.tsx) and the heavy lazy
            // chunks (constants-full, admin). Isolating them stops Rollup from
            // hoisting them INTO those chunks, which previously forced the entry
            // to statically import the 488KB constants-full + 223KB admin bundles
            // on every page — the cause of both the mobile-LCP render delay and
            // the desktop main-thread long task / TBT regression.
            'shared': [
              './components/IconComponents.tsx',
              './components/TechnologyIcons.tsx',
              './contexts/AuthContext.tsx',
              './constants.tsx',
            ],
            // constants-full.tsx and the admin pages are intentionally left to
            // Vite's automatic splitting (they're dynamically/lazy imported). With
            // the shared modules above isolated, they no longer get pulled into the
            // entry's static graph, so the entry stays lean (~179KB) AND the 488KB
            // constants-full never loads on the homepage.
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
