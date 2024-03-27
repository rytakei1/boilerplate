<template>
  <div class="flex flex-col grow">
    <h2 class="text-4xl text-primary font-bold mb-4">Create New User</h2>
    <form class="w-1/2" @submit.prevent="handleCreateNewUser">
      <Input
        id="firstName"
        v-model="formData.first_name"
        label="First Name"
        class="my-2"
      />
      <Input
        id="lastName"
        v-model="formData.last_name"
        label="Last Name"
        class="my-2"
      />
      <Input id="email" v-model="formData.email" label="E-mail" class="my-2" />
      <Input
        id="username"
        v-model="formData.username"
        label="Username"
        class="my-2"
      />
      <Input
        id="password"
        v-model="formData.password"
        type="password"
        label="Password"
        class="my-2"
      />
      <div class="flex justify-between mt-8">
        <Button class="px-8" @click="router.push('/admin/users')"
          >Cancel</Button
        >
        <Button submit class="px-8">Submit</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification"
import { useUsersStore } from "~/stores/usersStore"
import type { IUserCreate } from "~/types/user"
definePageMeta({
  layout: "admin",
  middleware: "auth",
})
const usersStore = useUsersStore()
const formData = ref<IUserCreate>({
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  username: "",
})
const loading = ref(false)
const router = useRouter()
const toast = useToast()
const validateEmptyFields = () => {
  for (const val of Object.values(formData.value)) {
    if (!val) {
      toast.error("Please fill all the fields before proceeding")
      return false
    }
  }
  return true
}
const handleCreateNewUser = async () => {
  if (!validateEmptyFields()) return
  loading.value = true
  const result = await usersStore.createUser(formData.value)
  loading.value = false
  if (result.status === "success") {
    toast.success("User created successfully")
    router.push("/admin/users")
  }
}
</script>

<style scoped></style>
