import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    legacy({
      targets: [
        "defaults",
        "not IE 11",
        "ios >= 12",
        "android >= 6",
        "Safari >= 11",
      ],
      modernPolyfills: true,
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      renderLegacyChunks: true,
    }),
  ],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: {
    modulePreload: { polyfill: true },
    cssTarget: "ios12",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("/@firebase/") || id.includes("/firebase/")) {
            return "firebase";
          }
          if (
            id.includes("/vue/") ||
            id.includes("/vue-router/") ||
            id.includes("/pinia/")
          ) {
            return "vue-vendor";
          }
          if (id.includes("/swiper/")) return "swiper";
          return "vendor";
        },
      },
    },
    chunkSizeWarningLimit: 650,
  },
});
