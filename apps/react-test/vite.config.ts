import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import importMap from './import-map';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, '../..'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        tags: [
          {
            injectTo: 'head',
            tag: 'script',
            attrs: {
              type: 'importmap',
            },
            children: JSON.stringify(importMap),
          },
        ],
      },
    }),
  ],
  server: {
    port: 5172,
  },
});
