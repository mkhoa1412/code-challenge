import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  root: "./",
  build: {
    outDir: "build",
  },
  server: {
    port: 5000,
  },
  plugins: [react()],
});
