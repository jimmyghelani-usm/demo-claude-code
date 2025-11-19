import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true, // Automatically open browser
    strictPort: false, // Try next port if 3000 is taken
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable source maps for debugging
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // Increase chunk size warning limit if needed
    chunkSizeWarningLimit: 1000,
  },

  // Test configuration for Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
