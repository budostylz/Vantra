// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your template slug – still used for non-Vercel builds.
const SLUG = "vantra-qSKe8jlhMtNvudBqrdmcYIjQMM42";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const isVercel = process.env.DEPLOY_TARGET === "vercel" || process.env.VERCEL === "1";

  // On Vercel: build to local ./dist and use a relative base so asset URLs work at the site root.
  // Else (your original flow): keep the /sites/<slug>/ base and external outDir.
  const base = isVercel
    ? "./"
    : isProd
      ? `/sites/${SLUG}/`
      : "/";

  const outDir = isVercel
    ? "dist"
    : path.resolve(__dirname, "../budoboost/dist/sites", SLUG);

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
    build: {
      outDir,
      assetsDir: "assets",
      emptyOutDir: true,
      // (Optional) make chunk size warning less noisy for big templates
      // chunkSizeWarningLimit: 1500,
    },
  };
});
