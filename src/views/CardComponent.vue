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
  url: {
    type: String,
    default: "/monitor",
  },
});
</script>

<template>
  <div class="flex flex-col rounded-lg">
    <div class="bg-slate-200 rounded-lg">
      <div class="overflow-hidden bg-cover w-64 h-[180px] rounded-lg">
        <img :src="img" />
      </div>
      <div class="flex text-xl font-medium text-gray-700 justify-center my-8">
        <router-link
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 text-base"
          :to="url"
        >
          {{ title }}
        </router-link>
      </div>
    </div>
  </div>
</template>
