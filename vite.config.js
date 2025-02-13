import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure frontend runs on this port
    strictPort: true, // Prevents Vite from switching to a different port if 5173 is busy
    proxy: {
      "/api": {
        target: "https://treasure-backend-steel.vercel.app", // Ensure backend is running on port 5000
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Keep /api prefix for API calls
      },
    },
    watch: {
      usePolling: true, // Ensures changes are detected properly (especially in Docker/WSL)
    },
  },
});
