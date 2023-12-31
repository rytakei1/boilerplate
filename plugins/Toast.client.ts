import Toast, { PluginOptions } from "vue-toastification"
import "vue-toastification/dist/index.css"
const options: PluginOptions = {
  timeout: 4000,
}
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options)
})
