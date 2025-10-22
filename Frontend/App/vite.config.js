import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Disable lightningcss to fix Render/Vercel builds
export default defineConfig({
  base: './',
  plugins: [react()],
  css: {
    transformer: 'postcss', // force Vite to use PostCSS instead of LightningCSS
  },
})
