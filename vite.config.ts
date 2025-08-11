import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  server: {
    port: 5173,
    proxy: {
      '/funds': { target: 'http://127.0.0.1:3000', changeOrigin: true },
      '/portfolio': { target: 'http://127.0.0.1:3000', changeOrigin: true },
    }
  }
});


