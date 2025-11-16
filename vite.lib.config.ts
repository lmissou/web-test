import { defineConfig } from 'vite';
import importMapPlugin from './build/plugins/importMapGenPlugin';

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  build: {
    copyPublicDir: false,
    lib: {
      name: 'lib',
      entry: {
        vue: './node_modules/vue/dist/vue.esm-browser.js',
        'naive-ui': './node_modules/naive-ui/dist/index.mjs',
        echarts: './node_modules/echarts/index.js',
        '@antv/g6': './node_modules/@antv/g6/esm/index.js',
        '@antv/g6-v4': './node_modules/@antv/g6-v4/es/index.js',
      },
      formats: ['es'],
    },
    outDir: 'lib',
  },
  plugins: [importMapPlugin()],
});
