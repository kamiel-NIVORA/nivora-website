import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Same-origin proxy to the Nivora API in dev (mirrors the vercel.json
    // rewrite), so the newsletter signup is never blocked by CORS.
    proxy: {
      '/nivora-api': {
        target: 'https://nivora-api.srv938837.hstgr.cloud',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/nivora-api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split the big third-party libs into their own long-cached chunks so
        // they download in parallel and stay cached across deploys.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion') || id.includes('/motion-dom/') || id.includes('/motion-utils/'))
            return 'motion'
          if (id.includes('react-router') || id.includes('/@remix-run/')) return 'router'
          if (id.includes('react-dom') || id.includes('/scheduler/') || id.includes('/react/')) return 'react'
          if (id.includes('embla-carousel')) return 'embla'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('lenis')) return 'lenis'
          return 'vendor'
        },
      },
    },
  },
})
