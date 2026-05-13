import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    warmup: {
      clientFiles: ['./src/main.tsx'],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@byted-keystone/react', '@fe-infra/keystone-icons-react', '@fe-infra/chart-react'],
  },
});
