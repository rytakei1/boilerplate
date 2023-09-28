<template>
  <button
    ref="buttonRef"
    class="px-4 py-2 rounded-md filter transition-all flex items-center justify-center duration-200 bg-primary text-light font-semibold"
    :class="{
      'border-1': outlined,
      'brightness-80': disabled,
      'brightness-120': isButtonHovered,
    }"
    :type="submit ? 'submit' : 'button'"
    :disabled="disabled"
    @click="emits('click')"
  >
    <slot></slot>
    <Spinner v-if="loading" class="ml-2" />
  </button>
</template>

<script setup lang="ts">
import { useElementHover } from "@vueuse/core"
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "primary",
  },
  submit: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(["click"])
const buttonRef = ref<HTMLButtonElement>()
const isButtonHovered = useElementHover(buttonRef)
</script>

<style scoped></style>
