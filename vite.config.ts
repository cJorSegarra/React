import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/posts": "http://localhost:20001",
        },
    },
});
