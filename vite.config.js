import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 👈 Fixed import name here

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/romantic-birthday-reveal/', // Make sure this matches your github repository name
})