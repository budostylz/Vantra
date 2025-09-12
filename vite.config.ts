// vite.config.ts (Vantra)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SLUG = "vantra-qSKe8jlhMtNvudBqrdmcYljQMM42";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const base = isProd ? `/${SLUG}/` : "/";

  return {
    base,                                      // import.meta.env.BASE_URL
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        src: path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
      },
    },
    build: {
      outDir: isProd ? `dist/${SLUG}` : "dist", // emit into slug folder in prod
      assetsDir: "assets",
      emptyOutDir: true,
    },
    server: { open: false },
  };
});
