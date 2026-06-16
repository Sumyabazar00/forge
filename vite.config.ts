import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Project is published to GitHub Pages at /forge/.
// Set GITHUB_PAGES=true in CI so assets resolve under the repo subpath;
// local dev and other hosts fall back to root.
const base = process.env.GITHUB_PAGES === 'true' ? '/forge/' : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
