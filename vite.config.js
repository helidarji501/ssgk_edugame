import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '::', // Listen on all IPv6/IPv4 addresses
    port: 5173,
    strictPort: true,
    allowedHosts: [
      '2402:a00:10a:46f7:4eee:c975:b29c:4001',
      '.localhost',
    ],
    hmr: {
      host: '2402:a00:10a:46f7:4eee:c975:b29c:4001',
    },
  },
})
