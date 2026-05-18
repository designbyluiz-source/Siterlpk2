import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: 'localhost',
    open: true,
    proxy: {
      // Mesmo domínio no browser → menos bloqueios (Safari / extensões) vs. chamada direta à Overpass
      '/api/overpass': {
        target: 'https://overpass-api.de',
        changeOrigin: true,
        rewrite: () => '/api/interpreter',
        secure: true,
      },
    },
  },
})
