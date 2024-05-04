<script setup>
import { useFirebaseStore } from "../composable/useFirebase";
import { onMounted, reactive, ref, watch, onBeforeUnmount } from "vue";
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

const timer = ref(0);
const labels = [];
const dataTemp = [];
const step = 3; // 3s
const MAX_X = 15;

const data = ref({
  labels: labels.value,
  datasets: [
    {
      label: "Temp",
      backgroundColor: "#f87979",
      data: dataTemp.value,
    },
  ],
});
// Instantiate
onMounted(() => {
  timer.value = setInterval(() => {
    data.value = scheduleUpdateChart();
  }, step * 1000);
});

// Clean up
onBeforeUnmount(() => {
  timer.value = null;
});

function scheduleUpdateChart() {
  timer.value += step;
  if (labels.length > MAX_X) {
    labels.shift();
  }
  if (dataTemp.length > MAX_X) {
    dataTemp.shift();
  }

  labels.push(timestamp.value);
  dataTemp.push(temp.value);
  return {
    labels: labels,
    datasets: [
      {
        label: "Temp",
        backgroundColor: "#f87979",
        data: dataTemp,
      },
    ],
  };
}

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
  getControl,
  timestamp,
  power,
} = useFirebaseStore();

onMounted(async () => {
  await getMonitor();
  await getControl();
});

const triggerPress = ref("50");
const count = ref(0);

watch(
  () => pressure.value,
  (value) => {
    count.value++;
    if (
      value &&
      triggerPress.value &&
      Number(value) > Number(triggerPress.value) &&
      count.value > 1
    ) {
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
    if (
      mode.value === "0" &&
      value &&
      setPoint.value &&
      Number(value) > Number(setPoint.value)
    ) {
      console.log("🚀 ~ temp:", temp.value);
      console.log("🚀 ~ setPoint.value:", setPoint.value);
      toast.info("Temp current is greater set point");
    }
  }
);

watch(
  () => setPoint.value,
  (value) => {
    //
    if (
      mode.value === "0" &&
      temp.value &&
      value &&
      Number(temp.value) > Number(value)
    ) {
      console.log("🚀 ~ temp:", temp.value);
      console.log("🚀 ~ setPoint.value:", setPoint.value);
      toast.info("Temp current is greater set point");
    }
  }
);
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <HeaderPage />
    <div class="flex flex-col h-full w-full">
      <HeaderTitle :title="'MONITOR'" />
      <div class="flex justify-center mt-4">
        <div class="flex flex-col space-y-4">
          <div class="flex space-x-4 justify-center">
            <MonitorValue
              :label="'Room Temp'"
              :value="temp"
              :unit="'oC'"
              class="!bg-white border-2 border-blue-500 rounded-full p-4 text-black"
            />
            <MonitorValue
              :label="'Set Point'"
              :value="setPoint"
              :unit="'oC'"
              class="!bg-white border-2 border-blue-500 rounded-full p-4 text-black ml-4"
            />
          </div>
          <div class="h-[400px] w-[700px]">
            <Line :data="data" :options="options" />
          </div>
        </div>
        <div class="mt-4 ml-2">
          <FormInput
            :title="'Trigger'"
            v-model="triggerPress"
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
              <MonitorValue
                :label="'Ampere'"
                :value="current"
                :unit="'A'"
                img="https://i.imgur.com/CvU3twv.png"
              />
              <MonitorValue
                :label="'Voltage'"
                :value="voltage"
                :unit="'V'"
                img="https://i.imgur.com/R9Y2RWp.png"
              />
              <MonitorValue
                :label="'Power'"
                :value="power"
                :unit="'kW'"
                img="https://i.imgur.com/cHtwDQU.png"
              />
            </div>
            <div class="flex space-x-4">
              <MonitorValue
                :label="'Speed'"
                :value="speed"
                :unit="'v/ph'"
                img="https://i.imgur.com/VqDuGPM.png"
              />
              <MonitorValue
                :label="'Pressure'"
                :value="pressure"
                :unit="'pH'"
                img="https://i.imgur.com/6g3cji9.png"
              />
              <MonitorValue
                :label="'Out Frq'"
                :value="outFrq"
                :unit="'Hz'"
                img="https://i.imgur.com/UHRIiBQ.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
