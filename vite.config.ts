/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vitest/config'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'
import path from 'path'
import sass from 'sass'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  test: {
    environment: 'jsdom', // or 'jsdom', 'node'
    setupFiles: path.resolve(__dirname, './vitest.setup.js')
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        implementation: sass
      }
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
