import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      '/api': 'https://f77e-181-237-111-63.ngrok-free.app',
    },
  },
});
