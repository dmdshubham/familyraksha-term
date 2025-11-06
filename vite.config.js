import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['term.familyraksha.com'],
    port: 3005,
    host: '0.0.0.0',
  },
})
