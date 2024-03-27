<template>
  <div class="w-full flex flex-col grow">
    <form
      class="flex flex-col border-2 border-primary-500 mx-auto my-auto border-rounded w-fit transition duration-600"
      :class="{
        'transform scale-y-0 overflow-hidden py-0 px-0': leaving,
        'py-8 px-16': !leaving,
      }"
      @submit.prevent="handleLogin"
    >
      <div class="flex">
        <div class="mr-12 h-[300px] w-[300px]">
          <LottiePlayer
            animation-link="https://lottie.host/d8d60d37-80bd-42ac-8ef1-3d7bf658ac9f/yehjjVtKLJ.json"
          />
        </div>
        <div class="flex flex-col justify-center">
          <Input
            id="username"
            v-model="username"
            label="Username"
            class="mb-4"
          />
          <Input
            id="password"
            v-model="password"
            label="Password"
            type="password"
          />
        </div>
      </div>
      <Button :loading="loading" submit>Login</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/authStore"
import { useToast } from "vue-toastification"
import { promiseTimeout } from "@vueuse/core"
const username = ref("")
const password = ref("")
const authStore = useAuthStore()
const loading = ref(false)
const leaving = ref(false)
const toast = useToast()
const router = useRouter()
const handleLogin = async () => {
  loading.value = true
  const success = await authStore.login(username.value, password.value)
  loading.value = false
  if (!success) {
    toast.error(
      "Error while logging in. Please check your credentials and try again"
    )
    return
  }
  leaving.value = true
  await promiseTimeout(600)
  router.push("/admin/users")
}
</script>

<style scoped></style>
