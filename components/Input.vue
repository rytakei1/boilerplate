<template>
  <div class="flex flex-col">
    <label v-if="label" :for="id" class="mb-1 text-primary font-semibold">{{
      label
    }}</label>
    <input
      :id="id"
      ref="inputRef"
      :name="id"
      :type="type"
      :value="modelValue"
      class="border-1 border-gray-400 rounded-md py-2 px-3 outline-primary"
      :disabled="disabled"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const inputRef = ref<HTMLInputElement>()
const emits = defineEmits(["update:modelValue"])
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emits("update:modelValue", target.value)
}
</script>

<style scoped></style>
