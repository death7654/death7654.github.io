import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base: clips and PDFs in /public resolve correctly at the site root
  // and when hosted under a subpath (e.g. username.github.io/repo/).
  base: "./",
});
