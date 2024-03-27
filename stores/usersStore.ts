import { defineStore } from "pinia"
import { useAuthStore } from "./authStore"
import { IUser, IUserCreate } from "~/types/user"

interface IUsersListResponse {
  count: number
  results: IUser[]
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as IUser[],
  }),
  actions: {
    async fetchUsers() {
      await nextTick()
      const authStore = useAuthStore()
      const { data, error } = await useFetch<IUsersListResponse>(
        () => `http://localhost:8000/users/`,
        {
          headers: { Authorization: `Token ${authStore.token}` },
        }
      )
      if (error.value || !data.value) {
        console.error("Error in fetchUsers")
        return false
      }
      this.users = data.value.results
    },
    async createUser(user: IUserCreate) {
      const authStore = useAuthStore()
      const { data, error } = await useFetch(
        () => `http://localhost:8000/users/`,
        {
          method: "POST",
          headers: { Authorization: `Token ${authStore.token}` },
          body: user,
        }
      )
      if (error.value || !data.value) {
        console.error("Error creating user")
        return { status: "error", message: error.value }
      }
      return { status: "success", message: "User created successfully" }
    },
  },
})
