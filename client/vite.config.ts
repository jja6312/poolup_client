import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'pull-up',
        short_name: 'pup',
        description: 'pull-up',
        theme_color: '#ffffff',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  // 웹소켓 설정 추가됨.
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // global 객체 정의
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Buffer 지원 활성화
        }),
      ],
    },
  },

  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(), // Node.js 폴리필 추가
      ],
    },
  },
});
