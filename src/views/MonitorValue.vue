<template>
  <div
    class="flex items-center justify-center bg-[#ADD8E6] text-[#36454f] rounded-xl space-x-4"
  >
    <div class="flex flex-col">
      <div class="text-xl font-semibold">{{ label }}</div>
      <div class="text-lg font-medium">{{ value }} {{ unit }}</div>
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
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
});
</script>
