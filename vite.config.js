import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { wgslVitePlugin } from "@vgpu/wgsl/loader-vite";

export default defineConfig({
  plugins: [react(),
    wgslVitePlugin(),
  ],
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
