<template>
  <IconLoading class="spin" />
</template>

<script setup lang="ts">
import IconLoading from "~icons/mdi/loading"
</script>

<style scoped>
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
