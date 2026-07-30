import { defineConfig } from 'vite';

export default defineConfig({
  root: 'C:/git/left-clicks',
  publicDir: 'C:/git/left-clicks/public',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  server: {
    port: 3333,
    strictPort: true,
    host: '127.0.0.1',
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  }
});
