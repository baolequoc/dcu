<template>
  <div
    class="h-20 flex justify-center text-2xl text-bold bg-[#ACE2E1] w-full items-center text-slate-800"
  >
    {{ title }}
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: "title",
  },
});
</script>
