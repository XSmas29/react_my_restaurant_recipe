import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/css'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@composables': path.resolve(__dirname, 'src/composables'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@fonts': path.resolve(__dirname, 'fonts'),
      '@theme': path.resolve(__dirname, 'themeConfig.ts'),
    },
  },
});