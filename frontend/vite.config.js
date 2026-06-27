import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_API_URL is injected at build time. Defaults to localhost for dev.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
});
