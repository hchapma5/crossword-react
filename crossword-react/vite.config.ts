import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target:  process.env.VITE_PROXY_HOST || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "build",
  },
  plugins: [react()],
})