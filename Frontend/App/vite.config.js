import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ DO NOT import tailwindcss here — Tailwind is handled via postcss.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': 'http://localhost:7000',
    },
  },
})
