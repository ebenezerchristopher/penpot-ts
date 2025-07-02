import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      // These aliases are essential for Vite to find the source of our packages.
      {
        find: '@penpot/common-types',
        replacement: path.resolve(__dirname, '../../packages/common-types/src'),
      },
      {
        find: '@penpot/ui-core',
        replacement: path.resolve(__dirname, '../../packages/ui-core/src'),
      },
    ],
  },
  // The custom css.modules configuration is no longer needed.
  // Vite's default behavior is perfect for files ending in .module.scss.
});
