<script setup>
import { useFirebaseStore } from "../composable/useFirebase";
import { onMounted, ref, watch } from "vue";
import FormInput from "./FormInput.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const {
  pressure,
  current,
  outFrq,
  temp,
  van1,
  van2,
  speed,
  setPoint,
  voltage,
  mode,
  getMonitor,
  power,
} = useFirebaseStore();

onMounted(async () => {
  await getMonitor();
});

const triggerPress = ref("50");
const count = ref(0);

watch(
  () => pressure.value,
  (value) => {
    count.value++;
    if (Number(value) > Number(triggerPress.value) && count.value > 1) {
      triggerPressureNotification();
    }
  }
);

const triggerPressureNotification = () => {
  toast.error(
    "Pressure: " +
      pressure.value +
      "is greater than " +
      triggerPress.value +
      " Pa"
  );
};

watch(
  () => temp.value,
  (value) => {
    //
    if (mode.value === "0" && value > setPoint.value) {
      toast.info("Temp current is greater set point");
    }
  }
);

watch(
  () => setPoint.value,
  (value) => {
    //
    if (mode.value === "0" && temp.value > value) {
      toast.info("Temp current is greater set point");
    }
  }
);
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-col">
      <router-link :to="'/'">
        <img
          src="https://i.postimg.cc/Pr1Kdf31/banner-UTE.png"
          class="w-full"
          alt="banner-UTE"
        />
      </router-link>
      <h1
        class="w-full flex justify-center items-center p-4 bg-sky-200 font-semibold text-2xl text-gray-700"
      >
        ỨNG DỤNG BMS VÀO ĐIỀU KHIỂN FCU TRONG PHÒNG THÍ NGIỆM
      </h1>
    </div>
    <div class="bg-[#1a2433] flex flex-col h-full w-full">
      <div
        class="h-20 flex justify-center text-4xl uppercase text-white text-bold w-full items-center"
      >
        Trang giám sát
      </div>
      <div class="flex justify-end text-white mr-4">
        <FormInput :title="'Trigger'" v-model:model-value="triggerPress" />
      </div>
      <div class="text-white p-8 grid grid-cols-2 gap-4 w-full h-full">
        <div class="flex flex-col space-y-6 items-center">
          <div class="flex flex-col items-center space-y-4">
            <div
              class="w-64 flex flex-col items-center justify-center rounded-full h-64 border-4 border-white"
            >
              <div class="text-6xl font-semibold">{{ temp }}</div>
              <div class="text-xl uppercase mt-4">Temp</div>
            </div>
          </div>
          <div class="flex flex-col space-y-4 justify-between">
            <div class="flex">
              <div class="w-64">
                <div class="text-xl font-semibold uppercase">Pressure</div>
                <div class="text-lg">{{ pressure }} Pa</div>
              </div>
              <div class="w-64 flex flex-col">
                <div class="text-xl font-semibold uppercase">Out Frq</div>
                <div class="text-lg">{{ outFrq }} Hz</div>
              </div>
            </div>
            <div class="flex">
              <div class="w-64">
                <div class="text-xl font-semibold uppercase flex items-center">
                  <div class="mr-2">Van 1</div>
                  <div
                    class="text-lg h-4 w-4 rounded-full"
                    :class="van1 === '1' ? 'bg-green-500' : 'bg-red-500'"
                  ></div>
                </div>
              </div>
              <div class="w-64">
                <div class="text-xl font-semibold uppercase flex items-center">
                  <div class="mr-2">Van 2</div>
                  <div
                    class="text-lg h-4 w-4 rounded-full"
                    :class="van2 === '1' ? 'bg-green-500' : 'bg-red-500'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="flex items-center justify-center space-x-4 bg-[#ADD8E6] text-[#36454f] rounded-xl"
          >
            <div class="flex flex-col">
              <div class="text-xl font-semibold flex">
                <div>CURRENT</div>
              </div>
              <div class="text-lg font-medium">{{ current }} A</div>
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-[#ADD8E6] text-[#36454f] rounded-xl space-x-4"
          >
            <div class="flex flex-col">
              <div class="text-xl font-semibold">Voltage</div>
              <div class="text-lg font-medium">{{ voltage }} V</div>
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-[#ADD8E6] text-[#36454f] rounded-xl space-x-4"
          >
            <div class="flex flex-col">
              <div class="text-xl font-semibold">POWER</div>
              <div class="text-lg font-medium">{{ power }} kW</div>
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-[#ADD8E6] text-[#36454f] rounded-xl space-x-4"
          >
            <div class="flex flex-col">
              <div class="text-xl font-semibold">SPEED</div>
              <div class="text-lg font-medium">{{ speed }} v/ph</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
