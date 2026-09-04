import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.PNG"],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate 3D engine from main bundle
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          // Separate animation libraries
          animations: ["framer-motion"],
          // Separate UI icons
          icons: ["react-icons"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
