<template>
  <div
    class="flex flex-col bg-blue-400 border rounded w-40 h-40 justify-center items-center border-blue-400 text-white"
  >
    <div class="text-xl font-semibold">{{ label }}</div>
    <div class="text-lg font-medium">{{ value }} {{ unit }}</div>
  </div>
</template>
<script setup>
defineProps({
  label: {
    type: String,
    default: "title",
  },
  value: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
});
</script>
