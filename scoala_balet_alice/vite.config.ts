import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves a project site from /<repo>/, so assets need that
  // prefix. The workflow sets VITE_BASE; local dev and custom domains stay "/".
  base: process.env.VITE_BASE ?? '/',
})
