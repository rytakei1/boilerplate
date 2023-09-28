<template>
  <div class="px-8 flex flex-col grow py-4">
    <h2 class="text-4xl text-primary font-bold mb-4">Users</h2>
    <Table :data="usersStore.users" :columns="columnsData" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "~/stores/usersStore"

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
onMounted(async () => {
  await usersStore.fetchUsers()
  console.log(usersStore.users)
})
</script>

<style scoped></style>
