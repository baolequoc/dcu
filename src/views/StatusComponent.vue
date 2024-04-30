<template>
  <div class="w-64">
    <div class="text-xl font-semibold uppercase flex items-center">
      <div class="mr-2">{{ label }}</div>
      <div
        class="text-lg h-4 w-4 rounded-full"
        :class="value === '1' ? 'bg-green-500' : 'bg-red-500'"
      ></div>
    </div>
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
    default: "0",
  },
});
</script>
