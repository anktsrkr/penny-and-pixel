import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command }) => {
  const base = command === "build" ? "/penny-and-pixel/" : "/";

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["icons/*.svg"],
        manifest: {
          name: "Penny & Pixel",
          short_name: "PennyPixel",
          description: "An offline money and coding play app for early learners.",
          theme_color: "#ffcf5a",
          background_color: "#fff8e7",
          display: "standalone",
          orientation: "portrait-primary",
          start_url: base,
          scope: base,
          icons: [
            {
              src: `${base}icons/penny-pixel.svg`,
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any maskable"
            }
          ]
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,woff2,mp3}"],
          navigateFallback: `${base}index.html`,
          cleanupOutdatedCaches: true
        },
        devOptions: {
          enabled: true
        }
      })
    ],
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      globals: true
    }
  };
});
