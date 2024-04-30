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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Temp",
      backgroundColor: "#f87979",
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

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
    <HeaderPage />
    <div class="flex flex-col h-full w-full">
      <HeaderTitle :title="'Monitor page'" />
      <div class="flex justify-center mt-4">
        <div class="flex flex-col space-y-4">
          <div class="flex space-x-4 justify-center">
            <MonitorValue
              :label="'Room Temp'"
              :value="temp"
              :unit="'oC'"
              class="!bg-white border-2 border-blue-500 rounded-xl p-4 text-black"
            />
            <MonitorValue
              :label="'Set Point'"
              :value="setPoint"
              :unit="'oC'"
              class="!bg-white border-2 border-blue-500 rounded-xl p-4 text-black ml-4"
            />
          </div>
          <div class="h-[400px] w-[700px]">
            <Line :data="data" :options="options" />
          </div>
        </div>
        <div class="mt-4 ml-2">
          <FormInput
            :title="'Trigger'"
            v-model:model-value="triggerPress"
            class="border-2 border-blue-500 rounded-xl p-4 h-32 mb-2"
          />
          <div
            class="flex flex-col space-y-4 border-2 justify-center items-center border-blue-500 rounded-xl bg-white p-4"
          >
            <div class="flex">
              <StatusComponent :label="'Van 1'" :value="van1" />
              <StatusComponent :label="'Van 2'" :value="van2" />
            </div>
            <div class="flex space-x-4">
              <MonitorValue :label="'Ampere'" :value="current" :unit="'A'" />
              <MonitorValue :label="'Voltage'" :value="voltage" :unit="'V'" />
              <MonitorValue :label="'Power'" :value="power" :unit="'kW'" />
            </div>
            <div class="flex space-x-4">
              <MonitorValue :label="'Speed'" :value="speed" :unit="'v/ph'" />
              <MonitorValue
                :label="'Pressure'"
                :value="pressure"
                :unit="'pH'"
              />
              <MonitorValue :label="'Out Frq'" :value="outFrq" :unit="'Hz'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
