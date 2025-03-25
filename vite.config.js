import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080 // تغییر از 80 به 8080
  },
  build: {
    outDir: 'dist'
  }
});