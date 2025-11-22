import { defineConfig } from 'vite';
import dts from 'unplugin-dts/vite'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [dts()]
});
