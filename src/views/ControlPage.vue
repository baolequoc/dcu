<script setup>
import FormInput from "./FormInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useFirebaseStore } from "../composable/useFirebase";

const {
  getControl,
  p,
  i,
  d,
  setPoint,
  minAo,
  maxAo,
  runCm,
  lock,
  mode,
  frq,
  dec,
  acc,
  writeData,
} = useFirebaseStore();

const modeVal = ref(mode.value === "1");
const lockVal = ref(lock.value === "1");

const runCmVal = ref(runCm.value || "2");

const disabledAutoMode = computed(() => {
  if (lockVal.value) return true;
  return modeVal.value;
});

const disabledManualMode = computed(() => {
  if (lockVal.value) return true;
  return !modeVal.value;
});

onMounted(async () => {
  await getControl();
});

// eslint-disable-next-line no-undef
watch(
  () => lock.value,
  (value) => {
    lockVal.value = value === "1";
  }
);

watch(
  () => mode.value,
  (value) => {
    modeVal.value = value === "1";
  }
);

watch(
  () => lockVal.value,
  (value) => {
    writeData({
      "VIRTUAL LOCK": {
        data: value ? "1" : "0",
        status: true,
      },
    });
  }
);

watch(
  () => modeVal.value,
  (value) => {
    writeData({
      "O ENABLE": {
        data: value ? "1" : "0",
        status: true,
      },
    });
  }
);

function writeSetPoint(value) {
  writeData({
    "VIRTUAL SET POINT": {
      data: value,
      status: true,
    },
  });
}

function writeMaxAo1(value) {
  writeData({
    "VIRTUAL MAX AO01": {
      data: value,
      status: true,
    },
  });
}

function writeMinAo1(value) {
  writeData({
    "VIRTUAL MIN AO01": {
      data: value,
      status: true,
    },
  });
}

function writeFrq(value) {
  writeData({
    "O VALUE": {
      data: value,
      status: true,
    },
  });
}

function writeAcc(value) {
  writeData({
    "VIRTUAL ACC": {
      data: value,
      status: true,
    },
  });
}

function writeDec(value) {
  writeData({
    "VIRTUAL DEC": {
      data: value,
      status: true,
    },
  });
}

watch(
  () => runCm.value,
  (value) => {
    runCmVal.value = value;
    // writeSetPoint(value);
  }
);

watch(
  () => runCmVal.value,
  (value) => {
    console.log("🚀 ~ value:", value);
    writeData({
      "VIRTUAL RUN CM": {
        data: value,
        status: true,
      },
    });
  }
);
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-col">
      <img
        src="https://i.postimg.cc/Pr1Kdf31/banner-UTE.png"
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
        <div class="flex flex-col w-64 space-y-4 mt-8">
          <div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" v-model="lockVal" />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
              ></div>
              <span class="pl-5 ms-3 text-sm font-medium text-gray-900"
                >LOCK</span
              >
            </label>
          </div>

          <FormInput :title="'D'" :model-value="d" :disabled="true" />
          <FormInput :title="'P'" :model-value="p" :disabled="true" />
          <FormInput :title="'i'" :model-value="i" :disabled="true" />
        </div>

        <div class="flex flex-col w-64 space-y-4 mt-8">
          <div>
            <label class="inline-flex items-center cursor-pointer">
              <span class="pr-5 ms-3 text-sm font-medium text-gray-900"
                >AUTO</span
              >
              <input type="checkbox" class="sr-only peer" v-model="modeVal" />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
              ></div>
              <span class="pl-5 ms-3 text-sm font-medium text-gray-900"
                >MANUAL</span
              >
            </label>
          </div>
          <div class="flex space-x-8">
            <div class="space-y-4">
              <FormInput
                :title="'Set point'"
                :model-value="setPoint"
                :disabled="disabledAutoMode"
                @update:model-value="writeSetPoint"
              />
              <FormInput
                :title="'Min AO 1'"
                :model-value="minAo"
                :disabled="disabledAutoMode"
                @update:model-value="writeMinAo1"
              />
              <FormInput
                :title="'Max AO 1'"
                :model-value="maxAo"
                :disabled="disabledAutoMode"
                @update:model-value="writeMaxAo1"
              />
            </div>
            <div class="space-y-4">
              <FormInput
                :title="'FRQ'"
                :model-value="frq"
                :disabled="disabledManualMode"
                @update:model-value="writeFrq"
              />
              <FormInput
                :title="'ACC'"
                :model-value="acc"
                :disabled="disabledManualMode"
                @update:model-value="writeAcc"
              />
              <FormInput
                :title="'DEC'"
                :model-value="dec"
                :disabled="disabledManualMode"
                @update:model-value="writeDec"
              />
              <div class="flex flex-col">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-32"
                  >Run cmd</label
                >
                <select
                  :disabled="disabledManualMode"
                  v-model="runCmVal"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="1">Stop</option>
                  <option value="2">FWD</option>
                  <option value="4">REV</option>
                </select>
                {{ runCmVal }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
