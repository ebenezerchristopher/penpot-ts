import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: [
      // This maps the package name directly to its source code directory.
      // Vite will then correctly handle the relative imports inside the package.
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
});
