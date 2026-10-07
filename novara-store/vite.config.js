import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config: this just tells Vite to understand React.
export default defineConfig({
  plugins: [react()],
  server: { open: true }, // opens the browser automatically when you run "npm run dev"
})
