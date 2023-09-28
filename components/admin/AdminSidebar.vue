<template>
  <div class="flex min-h-full">
    <div
      class="flex flex-col h-full min-w-40 relative max-h-full overflow-hidden bg-light"
    >
      <div
        ref="topBox"
        class="border-r-2 border-b-2 rounded-br border-primary absolute top-0 left-0 w-full pointer-events-none bg-light"
        :style="{ height: `${selectedEntryRef?.offsetTop}px` }"
        :class="{
          'duration-0': !initialRender,
          'duration-300 transition-all': initialRender,
        }"
      ></div>
      <div
        ref="bottomBox"
        class="border-r-2 border-t-2 rounded-tr border-primary absolute left-0 w-full h-full pointer-events-none bg-light"
        :class="{
          'duration-0': !initialRender,
          'duration-300 transition-all': initialRender,
        }"
        :style="{
          top: `${
            selectedEntryRef
              ? selectedEntryRef.offsetTop + selectedEntryRef.clientHeight
              : 0
          }px`,
        }"
      ></div>
      <div class="flex px-2 justify-center z-1">
        <h2 class="uppercase text-primary py-8 font-bold text-2xl">Encora</h2>
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
            class="flex flex-col justify-center items-center w-full h-full py-6 text-primary transition-all duration-300"
            :class="{
              'text-primary': route.path.includes(entry.path),
            }"
          >
            <component :is="entry.icon" />
            {{ entry.label }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconAccountBoxOutline from "~icons/material-symbols/table-chart-outline"
import IconUsers from "~icons/fluent/people-12-regular"
const menuEntries = [
  {
    id: "users",
    label: "Users",
    icon: IconUsers,
    path: "/admin/users",
  },
  {
    id: "test",
    label: "Test",
    icon: IconAccountBoxOutline,
    path: "/admin/products",
  },
]
const bottomBox = ref<HTMLDivElement>()
const route = useRoute()
const entriesRef = ref<HTMLDivElement[]>()
const selectedEntryRef = ref<HTMLDivElement>()
const initialRender = ref(false)

watch(
  [route, entriesRef],
  async () => {
    if (!entriesRef.value) return
    await nextTick()
    selectedEntryRef.value = entriesRef.value?.find((entry) =>
      entry.classList.contains("selected")
    )
    initialRender.value = true
  },
  { immediate: true }
)
</script>

<style scoped></style>
