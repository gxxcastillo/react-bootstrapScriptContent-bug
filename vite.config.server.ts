import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

import baseConfigs from './vite.config.base';

export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],

  server: {
    port: 4200,
    host: 'localhost',
  },

  build: {
    ssr: 'src/server.tsx',
    emptyOutDir: true,
    rollupOptions: {
      external: [],
    },
  },

  ssr: {
    target: 'node',
    external: [],
  },
});
