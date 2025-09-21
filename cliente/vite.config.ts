import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import millionLint from '@million/lint';
// https://vitejs.dev/config/
/* const allowedHosts = [
  "sam-ourselves-meanwhile-lead.trycloudflare.com"
]; */
export default defineConfig(({ mode }) => ({
  server: {
    allowedHosts: ["all"],
    host: "::",
    port: 5173,
  },
  plugins: [
    react(),
    // millionLint.vite()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
