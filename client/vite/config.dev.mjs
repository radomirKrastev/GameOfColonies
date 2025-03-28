import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
    ],
    server: {
        allowedHosts: ['gameofcolonies.dev'],
        host: "0.0.0.0", // ensuring it binds on all network interfaces (otherwise problems in docker)
        port: 3000
    }
})
