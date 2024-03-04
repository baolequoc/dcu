<script setup>
import CardComponent from "./CardComponent.vue";
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div>Chào mừng bạn tới với trang chủ</div>
    <div class="flex">
      <CardComponent :title="'Giám sát'" />
      <CardComponent :title="'Điều khiển'" />
      <CardComponent :title="'Sản xuất'" />
    </div>
  </div>
</template>
