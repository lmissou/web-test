import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
});
