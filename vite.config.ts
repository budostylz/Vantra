import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    // Use subpath in prod so assets resolve under /enter-business-name/
    base: isProd ? '/enter-business-name/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'src': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      },
    },
    build: {
      // Emit the site into a subfolder for Firebase Hosting deploys
      outDir: isProd ? 'dist/enter-business-name' : 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
    server: {
      open: false,
    },
  };
});
