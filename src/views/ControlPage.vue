<script setup>
import FormInput from "./FormInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useFirebaseStore } from "../composable/useFirebase";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
  temp,
  writeData,
} = useFirebaseStore();

const modeVal = ref(mode.value === "1");
const lockVal = ref(lock.value === "0");

//  Auto mode
const runCmVal = ref(runCm.value || "2");
const frqVal = ref(frq.value);
const accVal = ref(acc.value);
const decVal = ref(dec.value);

// Disable mode
const setPointVal = ref(setPoint.value);
const minAoVal = ref(minAo.value);
const maxAoVal = ref(maxAo.value);

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
    lockVal.value = value === "0";
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
        data: !value ? "1" : "0",
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

watch(
  () => runCm.value,
  (value) => {
    runCmVal.value = value;
  }
);

watch(
  () => frq.value,
  (value) => {
    frqVal.value = value;
  }
);

watch(
  () => acc.value,
  (value) => {
    accVal.value = value;
  }
);

watch(
  () => dec.value,
  (value) => {
    decVal.value = value;
  }
);

watch(
  () => setPoint.value,
  (value) => {
    setPointVal.value = value;
  }
);

watch(
  () => minAo.value,
  (value) => {
    minAoVal.value = value;
  }
);

watch(
  () => maxAo.value,
  (value) => {
    maxAoVal.value = value;
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

watch(
  () => temp.value,
  (value) => {
    //
    if (mode.value === "0" && value > setPoint.value) {
      toast.info("Temp current is greater set point");
    }
  }
);

const submitAutoMode = () => {
  writeData({
    "O VALUE": {
      data: frqVal.value,
      status: true,
    },
    "VIRTUAL ACC": {
      data: accVal.value,
      status: true,
    },
    "VIRTUAL DEC": {
      data: decVal.value,
      status: true,
    },
    "VIRTUAL RUN CM": {
      data: runCmVal.value,
      status: true,
    },
  });
};

const submitManualMode = () => {
  writeData({
    "VIRTUAL SET POINT": {
      data: setPointVal.value,
      status: true,
    },
    "VIRTUAL MIN AO01": {
      data: minAoVal.value,
      status: true,
    },
    "VIRTUAL MAX AO01": {
      data: maxAoVal.value,
      status: true,
    },
  });
};

function submit() {
  if (modeVal.value) {
    submitAutoMode();
  } else {
    submitManualMode();
  }
  toast.info("Submit successful");
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex flex-col">
      <router-link :to="'/'" class="flex">
        <img
          class="w-full"
          src="https://i.postimg.cc/Pr1Kdf31/banner-UTE.png"
          alt="banner-UTE"
        />
      </router-link>
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

        <div class="flex flex-col">
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
                  v-model="setPointVal"
                  :disabled="disabledAutoMode"
                />
                <FormInput
                  :title="'Min AO 1'"
                  v-model="minAo"
                  :disabled="disabledAutoMode"
                />
                <FormInput
                  :title="'Max AO 1'"
                  v-model="maxAo"
                  :disabled="disabledAutoMode"
                />
              </div>
              <div class="space-y-4">
                <FormInput
                  :title="'FRQ'"
                  v-model="frqVal"
                  :disabled="disabledManualMode"
                />
                <FormInput
                  :title="'ACC'"
                  v-model="accVal"
                  :disabled="disabledManualMode"
                />
                <FormInput
                  :title="'DEC'"
                  v-model="decVal"
                  :disabled="disabledManualMode"
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
                    :class="{
                      'cursor-not-allowed opacity-70': disabledManualMode,
                    }"
                  >
                    <option value="1">Stop</option>
                    <option value="2">FWD</option>
                    <option value="4">REV</option>
                  </select>
                </div>
              </div>
              <button
                class="bg-blue-500 text-white py-2 rounded w-full px-2"
                @click="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
