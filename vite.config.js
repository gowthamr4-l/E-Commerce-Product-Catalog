import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/E-Commerce-Product-Catalog/",  // ? replace with your actual repo name
  plugins: [react()],
})