<script setup>
import FormInput from "./FormInput.vue";
import { ref } from "vue";

const i = ref("");
const u = ref("");
const f = ref("");
const v = ref("");
const p = ref("");
const ACC = ref("");
const DEC = ref("");
const Para = ref("");
const Fre = ref("");
const Run = ref("");
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
        Trang điều khiển
      </div>
      <div class="flex space-x-8 justify-center">
        <form class="flex space-x-8">
          <div class="flex flex-col w-64 space-y-4 mt-8">
            <FormInput :title="'Điện áp'" v-model="u" />
            <FormInput :title="'Dòng điền'" v-model="i" />
            <FormInput :title="'Tần số'" v-model="f" />
            <FormInput :title="'Tốc độ'" v-model="v" />
            <FormInput :title="'Công suất'" v-model="p" />
          </div>
          <div class="flex flex-col w-64 space-y-4 mt-8">
            <FormInput :title="'ACC'" v-model="ACC" />
            <FormInput :title="'DEC'" v-model="DEC" />
            <FormInput :title="'Para lock'" v-model="Para" />
            <FormInput :title="'Fre ref'" v-model="Fre" />
            <FormInput :title="'Run com'" v-model="Run" />
          </div>
          <button
            type="submit"
            class="text-white mt-16 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
