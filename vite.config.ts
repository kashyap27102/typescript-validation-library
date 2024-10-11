import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "ValidationLibrary",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {},
  },
  plugins: [dtsPlugin()],
});
