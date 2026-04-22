import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: "build",
    sourcemap: true,
    // Split heavy chunks so hero can start rendering before 3D loads.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          "react-three": ["@react-three/fiber", "@react-three/drei"],
          sanity: ["@sanity/client", "@sanity/image-url"],
        },
      },
    },
  },
});
