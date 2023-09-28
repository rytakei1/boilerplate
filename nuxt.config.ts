// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxt/devtools",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "unplugin-icons/nuxt",
  ],
  css: ["@unocss/reset/tailwind.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
})
