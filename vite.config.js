import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { wgslVitePlugin } from "@vgpu/wgsl/loader-vite";

export default defineConfig({
  plugins: [react(), wgslVitePlugin()],

  assetsInclude: ["**/*.PNG"],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "three",
              test: /node_modules[\\/](three|@react-three[\\/]fiber|@react-three[\\/]drei)/,
              priority: 30,
            },
            {
              name: "animations",
              test: /node_modules[\\/]framer-motion/,
              priority: 20,
            },
            {
              name: "icons",
              test: /node_modules[\\/]react-icons/,
              priority: 10,
            },
          ],
        },
      },
    },

    chunkSizeWarningLimit: 1000,
  },
});
