import { defineConfig, mergeConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],

  build: {
    ssr: 'src/client.tsx',
    manifest: true,
    ssrManifest: true,
    sourcemap: true,
    emptyOutDir: true,
    ssrEmitAssets: true,
    rollupOptions: {
      external: [],
    },
  },

  ssr: {
    target: 'webworker',
    noExternal: true,
  },
});
