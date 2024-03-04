<script setup>
import MonitorItem from "./MonitorItem.vue";
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
        ỨNG DỤNG BMS VÀO ĐIỀU KHIỂN FCU TRONG PHÒNG THÍ NGIỆM
      </h1>
    </div>
    <div class="flex flex-col bg-sky-100 h-full w-full">
      <div
        class="h-20 flex justify-center text-2xl text-bold bg-white w-full items-center text-slate-800"
      >
        Trang hiệu suất
      </div>
      <div class="flex space-x-8 justify-center">
        <div class="flex flex-col w-64 space-y-4 mt-8">
          <MonitorItem :title="'Fan Status'" :value="'0'" />
          <MonitorItem :title="'Fan Control Type'" :value="'0'" />
          <MonitorItem :title="'Power recover'" :value="'0'" />
          <MonitorItem :title="'Power Switch'" :value="'0'" />
        </div>
        <div class="flex flex-col w-64 space-y-4 mt-8 justify-center">
          <MonitorItem :title="'System mode'" :value="'0'" />
          <MonitorItem :title="'System type'" :value="'0'" />
          <MonitorItem :title="'Temp Scale'" :value="'0'" />
        </div>
        <div
          class="flex flex-col items-center justify-center space-x-2 space-y-4"
        >
          <div
            class="flex flex-col justify-center items-center w-32 h-32 rounded-full bg-orange-200"
          >
            <div>Set point</div>
            <div>Value</div>
          </div>
          <div
            class="flex flex-col justify-center items-center w-32 h-32 rounded-full bg-orange-200"
          >
            <div>Temp room</div>
            <div>Value</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
