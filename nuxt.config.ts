import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: false },
  alias: {
    "@": resolve(__dirname, "./"),
  },
  css: ["@/assets/css/main.scss"],
  modules: ["@oku-ui/motion-nuxt"],
  app: {
    head: {
      title: "Subscription Tracker",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  plugins: ["~/plugins/modal.js"],
});
