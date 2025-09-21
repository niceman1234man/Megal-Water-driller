import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ["pdfjs-dist/build/pdf.worker.min.js"], // 👈 tell Vite not to bundle it
    },
  },
})


