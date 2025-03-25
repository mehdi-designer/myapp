import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
export default {
  server: {
    host: '0.0.0.0',
    port: 80
  },
  build: {
    outDir: 'dist'
  }
}
