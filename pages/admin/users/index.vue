<template>
  <div class="flex flex-col grow">
    <div class="flex items-end mb-4 justify-between">
      <h2 class="text-4xl text-primary font-bold mr-6">Users</h2>
      <Button class="px-6 flex items-center" @click="handleCreateNewUser">
        <Plus class="text-lg mr-2" />
        Create a new user
      </Button>
    </div>
    <Table :data="usersStore.users" :columns="columnsData" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "~/stores/usersStore"
import Plus from "~icons/mdi/plus"
definePageMeta({
  layout: "admin",
  middleware: "auth",
})
const usersStore = useUsersStore()
const columnsData = ref([
  {
    name: "id",
    label: "ID",
    type: "string",
  },
  {
    name: "first_name",
    label: "First Name",
    type: "string",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "string",
  },
  {
    name: "email",
    label: "E-mail",
    type: "string",
  },
])
const router = useRouter()
const handleCreateNewUser = () => {
  router.push("/admin/users/new")
}
onMounted(async () => {
  await usersStore.fetchUsers()
  console.log(usersStore.users)
})
</script>

<style scoped></style>
