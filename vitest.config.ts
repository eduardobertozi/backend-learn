/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    dir: './src',    
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})