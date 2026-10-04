import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// The eTMF tool is a second HTML entry served under /etmf. In dev, send every /etmf/* route
// (except real files) to its index.html so client-side routing and page refresh work.
const etmfFallback = () => ({
  name: 'etmf-spa-fallback',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const pathname = (req.url || '').split('?')[0]
      if (pathname === '/etmf') {
        req.url = '/etmf/'
      } else if (pathname.startsWith('/etmf/') && !path.extname(pathname)) {
        req.url = '/etmf/index.html'
      }
      next()
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), etmfFallback()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(rootDir, 'index.html'),
        etmf: path.resolve(rootDir, 'etmf/index.html'),
      },
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
})
