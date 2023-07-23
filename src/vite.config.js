import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig ({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve (__dirname, 'login/index.html'),
        products: resolve (__dirname, 'products/index.html')
      }
    }
  }
})