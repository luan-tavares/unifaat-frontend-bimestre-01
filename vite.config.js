import { defineConfig } from 'vite'

console.log(process.env.IS_DOCKER);

export default defineConfig({
    root: (process.env.IS_DOCKER == "true") ? ('resources') : ('frontend/public'),
    server: {
        open: (process.env.IS_DOCKER !== "true"),
        hmr: true,
        host: true,
        port: (process.env.IS_DOCKER == "true") ? 5172 : 5173,
    }
})
