<script setup>
defineProps({
  img: {
    type: String,
    default: "https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg",
  },
  title: {
    type: String,
    default: "title",
  },
  value: {
    type: String,
    default: "0",
  },
});
</script>

<template>
  <div class="flex flex-col rounded-lg">
    <div class="bg-slate-200 rounded-lg">
      <div
        class="flex text-xl font-medium text-gray-700 justify-center h-20 w-full items-center"
      >
        {{ title }}: {{ value }}
      </div>
    </div>
  </div>
</template>
