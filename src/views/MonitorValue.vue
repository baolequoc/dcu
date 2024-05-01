<template>
  <div
    class="flex flex-col border rounded w-40 h-40 justify-center items-center"
  >
    <div class="flex flex-col justify-center items-center">
      <img v-if="img" :src="img" class="w-10" />
      <div class="text-xl font-semibold">{{ label }}</div>
    </div>
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
  img: {
    type: String,
    default: "",
  },
});
</script>
