import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "@svgr/rollup";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 4000,
    open: true,
    cors: true,
  },
  build: {
    outDir: "dist",
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      "@": "/src",
      "@modules": `${path.resolve(__dirname, "src/modules")}/`,
      "@utils": `${path.resolve(__dirname, "src/utils")}/`,
      "@assets": `${path.resolve(__dirname, "src/assets")}/`,
      "@components": `${path.resolve(__dirname, "src/components")}/`,
    },
  },
  base: "/",
});
