import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwidecss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwidecss()],
  base: "/scroll-hero-animation/",
});
