import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: false },
  alias: {
    "@": resolve(__dirname, "./"),
  },
  css: ["@/assets/css/main.scss"],
  modules: ["@oku-ui/motion-nuxt"],
});
