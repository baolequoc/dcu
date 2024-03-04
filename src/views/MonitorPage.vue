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
        Trang giám sát
      </div>
      <div class="flex space-x-8 justify-center">
        <div class="flex flex-col items-center justify-center">
          <svg
            class="bg-white rounded-lg"
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <rect x="9" y="9" width="6" height="6"></rect>
          </svg>
        </div>

        <div class="flex flex-col w-64 space-y-4 mt-8">
          <MonitorItem :title="'Điện áp'" :value="'0'" />
          <MonitorItem :title="'Dòng điền'" :value="'0'" />
          <MonitorItem :title="'Tần số'" :value="'0'" />
          <MonitorItem :title="'Tốc độ'" :value="'0'" />
          <MonitorItem :title="'Công suất'" :value="'0'" />
        </div>
        <div class="flex flex-col w-64 space-y-4 mt-8">
          <MonitorItem :title="'ACC'" :value="'0'" />
          <MonitorItem :title="'DEC'" :value="'0'" />
          <MonitorItem :title="'Para lock'" :value="'0'" />
          <MonitorItem :title="'Fre ref'" :value="'0'" />
          <MonitorItem :title="'Run com'" :value="'0'" />
        </div>
        <div class="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 20h18L12 4z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
