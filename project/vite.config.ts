import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/',  // Ajusta caminhos relativos para funcionar corretamente na Vercel
  build: {
    outDir: 'dist',  // Garante que a Vercel reconheça a pasta de saída correta
  },
  
});
