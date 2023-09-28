import { defineStore } from "pinia"
import { useAuthStore } from "./authStore"

interface IUser {
  email: string
  first_name: string
  last_name: string
  id: number
  is_superuser: boolean
}

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
  },
})
