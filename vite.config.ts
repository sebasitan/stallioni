import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', '');
  return {
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
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor libraries for better caching
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            // Split constants-full into its own chunk (lazy loaded)
            'constants-full': ['./constants-full.tsx'],
            // Group admin pages together (rarely accessed by regular users)
            'admin': [
              './pages/admin/AdminHome.tsx',
              './pages/admin/PortfolioManager.tsx',
              './pages/admin/BlogManager.tsx',
              './pages/admin/CareersManager.tsx',
            ],
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
