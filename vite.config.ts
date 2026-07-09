import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    entry: "server",
  },
  vite: {
    plugins: [tailwindcss(), tsConfigPaths()],
  },
});
