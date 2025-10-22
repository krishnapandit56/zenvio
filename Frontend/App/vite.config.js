import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 💡 Add this line to force relative paths for static assets
  base: './', 
  plugins: [react()],
})