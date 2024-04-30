<script setup>
import { useFirebaseStore } from "../composable/useFirebase";
import { onMounted, ref, watch } from "vue";
import FormInput from "./FormInput.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import HeaderPage from "./HeaderPage.vue";
import HeaderTitle from "./HeaderTitle.vue";
import MonitorValue from "./MonitorValue.vue";
import StatusComponent from "./StatusComponent.vue";
// import highcharts from "highcharts-vue";
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
const chartOptions = {
  chart: {
    type: "spline",
  },
  title: {
    text: "Entire title",
  },
  series: [
    {
      data: [10, 0, 8, 2, 6, 4, 5, 5],
    },
  ],
};
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <HeaderPage />
    <div class="bg-[#1a2433] flex flex-col h-full w-full">
      <HeaderTitle :title="'Monitor page'" />
      <div class="flex justify-end text-white mr-4">
        <FormInput :title="'Trigger'" v-model:model-value="triggerPress" />
        <FormInput :title="'Temp'" v-model:model-value="temp" />
        <StatusComponent :label="'Van 1'" :value="van1" />
        <StatusComponent :label="'Van 2'" :value="van2" />
      </div>
      <div class="text-white p-8 grid grid-cols-2 gap-4 w-full h-full">
        <div>
          <highcharts :options="chartOptions"></highcharts>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <MonitorValue :title="'Ampere'" :value="current" :unit="'A'" />
          <MonitorValue :title="'Voltage'" :value="voltage" :unit="'V'" />
          <MonitorValue :title="'Power'" :value="power" :unit="'kW'" />
          <MonitorValue :title="'Speed'" :value="speed" :unit="'v/ph'" />
          <MonitorValue :title="'Pressure'" :value="pressure" :unit="'pH'" />
          <MonitorValue :title="'Out Frq'" :value="outFrq" :unit="'Hz'" />
        </div>
      </div>
    </div>
  </div>
</template>
