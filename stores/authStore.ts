import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"

interface ILoginResponse {
  token: string
}
interface ISelfResponse {
  id: number
  first_name: string
  last_name: string
}
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: useLocalStorage("pinia/auth/token", ""),
    name: useLocalStorage("pinia/auth/name", ""),
    id: useLocalStorage("pinia/auth/id", 0),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username: string, password: string) {
      const { data, error } = await useFetch<ILoginResponse>(
        `http://localhost:8000/login`,
        {
          method: "POST",
          body: { username, password },
        }
      )
      if (error.value !== null || !data.value) {
        console.log("Error", error.value)
        return false
      }
      this.token = data.value.token
      const updated = await this.updateSelf()
      return updated
    },
    async updateSelf() {
      const { data, error } = await useFetch<ISelfResponse>(
        `http://localhost:8000/users/self/`,
        { headers: { Authorization: `Token ${this.token}` } }
      )
      if (error.value || !data.value) {
        console.error("Error on updateSelf", error.value)
        return false
      }
      this.name = `${data.value.first_name} ${data.value.last_name}`
      this.id = data.value.id
      return true
    },
  },
  hydrate(state) {
    state.name = useLocalStorage("pinia/auth/name", "").value
    state.token = useLocalStorage("pinia/auth/token", "").value
    state.id = useLocalStorage("pinia/auth/id", 0).value
  },
})
