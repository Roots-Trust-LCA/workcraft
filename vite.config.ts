import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// GitHub Pages deployment: roots-trust-lca.github.io/workcraft/
// Override with VITE_BASE=/ for root-hosted deploys (e.g., custom domain).
const base = process.env.VITE_BASE ?? '/workcraft/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/react-router')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons'
          }
          if (id.includes('node_modules/d3') || id.includes('node_modules/internmap') || id.includes('node_modules/delaunator') || id.includes('node_modules/robust-predicates')) {
            return 'vendor-d3'
          }
        },
      },
    },
  },
})
