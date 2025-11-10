import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@domain': path.resolve(__dirname, '../../libs/shared-domain/src'),
      '@dtos': path.resolve(__dirname, '../../libs/shared-dtos/src'),
      '@utils': path.resolve(__dirname, '../../libs/shared-utils/src'),
    },
  },
});
