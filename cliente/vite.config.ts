import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import millionLint from '@million/lint';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    react(),millionLint.vite()
  ],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
