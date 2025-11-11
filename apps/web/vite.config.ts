import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@domain': path.resolve(__dirname, '../../libs/shared-domain/src'),
      '@dtos': path.resolve(__dirname, '../../libs/shared-dtos/src'),
      '@utils': path.resolve(__dirname, '../../libs/shared-utils/src'),
    },
  },
});
