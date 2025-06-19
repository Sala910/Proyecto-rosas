// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      // todo /api/* → http://localhost/Proyecto-rosas/api/*
      '/api': {
        target: 'http://localhost/Proyecto-rosas/api',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
