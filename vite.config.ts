import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 


export default defineConfig({
  base: '/portifolio-web/', 
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    historyApiFallback: true,
  },
});
