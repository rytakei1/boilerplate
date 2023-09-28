<template>
  <div class="flex min-h-full">
    <div
      class="flex flex-col h-full min-w-40 relative max-h-full overflow-hidden bg-blue"
    >
      <div
        ref="topBox"
        class="border-r-2 border-b-2 rounded-br border-red-800 absolute top-0 left-0 w-full transition-all duration-300 pointer-events-none bg-secondary"
        :style="{ height: `${selectedEntryRef?.offsetTop}px` }"
      ></div>
      <div
        ref="bottomBox"
        class="border-r-2 border-t-2 rounded-tr border-red-800 absolute left-0 w-full h-full transition-all duration-300 pointer-events-none bg-secondary"
        :style="{
          top: `${
            selectedEntryRef
              ? selectedEntryRef.offsetTop + selectedEntryRef.clientHeight
              : 0
          }px`,
        }"
      ></div>
      <div class="flex px-2 justify-center z-1">
        <h2 class="uppercase text-red-800 py-8 font-bold text-3xl">VINO.</h2>
      </div>
      <div id="entries" class="flex flex-col z-1">
        <div
          v-for="entry in menuEntries"
          :key="entry.id"
          ref="entriesRef"
          :class="{
            selected: route.path.includes(entry.path),
            'bg-transparent': route.path.includes(entry.path),
          }"
        >
          <router-link
            :to="entry.path"
            class="flex flex-col justify-center items-center w-full h-full py-6 text-red-800 transition-all duration-300"
            :class="{
              'text-secondary': route.path.includes(entry.path),
            }"
          >
            <component :is="entry.icon" />
            {{ entry.label }}
          </router-link>
        </div>
      </div>
    </div>
    Hey there
    <lottie-player />
  </div>
</template>

<script setup lang="ts">
import IconAccountBoxOutline from "~icons/material-symbols/table-chart-outline"
const menuEntries = [
  {
    id: "users",
    label: "Usuários",
    icon: IconAccountBoxOutline,
    path: "/",
  },
  {
    id: "test",
    label: "Test",
    icon: IconAccountBoxOutline,
    path: "/admin/users",
  },
]
const bottomBox = ref<HTMLDivElement>()
const route = useRoute()
const entriesRef = ref<HTMLDivElement[]>()
const selectedEntryRef = ref<HTMLDivElement>()
watch(
  route,
  async () => {
    await nextTick()
    selectedEntryRef.value = entriesRef.value?.find((entry) =>
      entry.classList.contains("selected")
    )
  },
  { immediate: true }
)
</script>

<style scoped></style>
