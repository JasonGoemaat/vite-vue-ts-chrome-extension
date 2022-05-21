import { defineConfig } from 'vite'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'background.ts'),
      output: {
        format: "esm",
        file: "public/background.js",
        dir: null,
      }
    }
  }
})
