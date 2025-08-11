import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  server: {
    port: 5173,
    proxy: {
      '/funds': 'http://localhost:3000',
      '/portfolio': 'http://localhost:3000'
    }
  }
});


