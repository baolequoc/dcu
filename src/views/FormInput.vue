<template>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900">{{
      title
    }}</label>
    <input
      type="text"
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "0",
  },
  title: {
    type: String,
    default: "title",
  },
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped></style>
