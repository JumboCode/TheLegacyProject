import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@api/": path.resolve(__dirname, "./src/app/api"),
    },
  },
});
