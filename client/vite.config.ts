import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('UtilmateGuitar.tsx')) return 'icons';
          if (id.includes('node_modules')) {
            if (id.includes('solid-icons')) {
              return 'icons';
            }

            return 'vendor'; // all other package goes here
          }
        },
      },
    },
  },
});
