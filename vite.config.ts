import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

const pwaManifest = {
  name: 'Lifemap',
  short_name: 'Lifemap',
  description:
    'Lifemap is a platform for interactively exploring the evolutionary relationships between all known species, offering detailed information on all clades and links to other resources.',
  theme_color: '#000000',
  icons: [
    {
      src: 'icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'icon-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({ manifest: pwaManifest })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
});
