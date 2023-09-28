<template>
  <ClientOnly>
    <Vue3Lottie
      :animation-link="animationLink"
      :height="height"
      :width="width"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps({
  animationLink: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 300,
  },
  height: {
    type: Number,
    default: 300,
  },
})
</script>

<style scoped></style>
