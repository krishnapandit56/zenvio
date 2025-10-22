import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    transformer: "lightningcss" // Use lightningcss to match Tailwind v4 expectations
  },
  build: {
    // Avoid explicit cssMinify settings!
    // This ensures Tailwind handles its own build and avoids minifier conflicts
    // cssMinify: 'lightningcss' // REMOVE or COMMENT this line if present
  }
})
