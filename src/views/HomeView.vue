<script setup>
import CardComponent from "./CardComponent.vue";
import { useProvideFirebaseStore } from "../composable/useFirebase";
import { onMounted } from "vue";
const { getMonitor } = useProvideFirebaseStore();

onMounted(async () => {
  await getMonitor();
});
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-col">
      <img
        src="https://i.postimg.cc/Pr1Kdf31/banner-UTE.png"
        border="0"
        alt="banner-UTE"
      />
      <h1
        class="w-full flex justify-center items-center p-4 bg-sky-200 font-semibold text-2xl text-gray-700"
      >
        ỨNG DỤNG BMS GIÁM SÁT VÀ ĐIỀU KHIỂN HỆ THỐNG FCU KẾT HỢP CHILLER
      </h1>
    </div>
    <div class="flex justify-center space-x-32 p-32 bg-sky-100 h-full">
      <CardComponent
        :title="'Monitor'"
        :img="'https://i.postimg.cc/KjxFm61Z/System-Monitoring-icon-Graphics-41194440-1-1-580x387.jpg'"
      />
      <CardComponent
        :title="'Control'"
        img="https://i.postimg.cc/MKrXT6VP/126530819-control-outline-icon-thin-line-concept-element-from-business-management-icons-collection-c.jpg"
        :url="'/control'"
      />
    </div>
  </div>
</template>
