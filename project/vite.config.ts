import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://corretoredvar.com.br',
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  }, 
});