import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import os from 'node:os';
import path from 'node:path';

export default defineConfig({
  cacheDir: path.join(os.tmpdir(), 'vite-cache-technical-test'),
  plugins: [react(), checker({ typescript: true })],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      }
    }
  }
});


