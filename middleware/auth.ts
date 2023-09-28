import { useLocalStorage } from "@vueuse/core"

export default defineNuxtRouteMiddleware(() => {
  const token = useLocalStorage("pinia/auth/token", "")
  if (!token) {
    return navigateTo("/login")
  }
})
