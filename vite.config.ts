import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative asset paths so dist/ works from any folder (e.g. a Laragon subdirectory).
  base: './',
  plugins: [tailwindcss(), svelte()],
  build: {
    rollupOptions: {
      // cv.html is the printable CV that scripts/build-cv.mjs renders to PDF.
      input: { main: 'index.html', cv: 'cv.html' },
    },
  },
});
