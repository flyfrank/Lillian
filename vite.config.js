import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  },
  preview: {
    port: 8080
  },
  css: {
    postcss: './postcss.config.js'
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@data': '/src/data',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@assets': '/public/assets'
    }
  }
})