import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    base: './',
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:80',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
        '/ai': {
          target: 'http://localhost:80',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/ai/, '/ai'),
        },
      },
    },
  };
});