// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
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
  eslint: {
    checker: false,
  },
})
