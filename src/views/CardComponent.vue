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
});
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-hidden bg-cover w-64 h-64">
      <img :src="img" />
    </div>
    <div
      class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 p-6"
    >
      <h5>
        {{ title }}
      </h5>
    </div>
  </div>
</template>
