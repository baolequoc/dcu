<script setup>
import FormInput from "./FormInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useFirebaseStore } from "../composable/useFirebase";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import OnOffComponent from "./OnOffComponent.vue";
import HeaderPage from "./HeaderPage.vue";
import ToggleComponent from "./ToggleComponent.vue";
import RunCMD from "./RunCMD.vue";
import HeaderTitle from "./HeaderTitle.vue";
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

// watch(
//   () => setPoint.value,
//   (value) => {
//     //
//     if (mode.value === "0" && temp.value > value) {
//       toast.info("Temp current is greater set point");
//     }
//   }
// );

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
    <HeaderPage />
    <div class="flex flex-col h-full w-full">
      <HeaderTitle :title="'Control Page'" />
      <div class="flex justify-center h-full">
        <div class="flex flex-col space-y-4 mt-8">
          <div
            class="flex justify-center space-x-8 border-2 rounded-xl bg-white p-4 border-blue-500"
          >
            <ToggleComponent
              v-model="modeVal"
              :secondLabel="'MANUAL'"
              :firstLabel="'AUTO'"
            />
            <ToggleComponent
              v-model="lockVal"
              :secondLabel="'LOCK'"
              :firstLabel="'UNLOCK'"
            />
          </div>
          <div
            class="flex space-x-2 border-2 p-4 rounded-xl bg-white border-blue-500"
          >
            <div class="space-y-2">
              <FormInput
                :title="'Set point'"
                v-model="setPointVal"
                :disabled="disabledAutoMode"
                img="https://i.imgur.com/vlSzdKc.png"
              />
              <FormInput
                :title="'Min AO 1'"
                v-model="minAo"
                :disabled="disabledAutoMode"
                img="https://static.vecteezy.com/system/resources/previews/006/559/603/original/voltmeter-line-icon-vector.jpg"
              />
              <FormInput
                :title="'Max AO 1'"
                v-model="maxAo"
                :disabled="disabledAutoMode"
                img="https://static.vecteezy.com/system/resources/previews/006/559/603/original/voltmeter-line-icon-vector.jpg"
              />
              <FormInput
                :title="'P'"
                :model-value="p"
                :disabled="true"
                img="https://i.imgur.com/KjJ0ysV.png"
              />
              <FormInput
                :title="'I'"
                :model-value="i"
                :disabled="true"
                img="https://i.imgur.com/thbClFL.png"
              />
              <FormInput
                :title="'D'"
                :model-value="d"
                :disabled="true"
                img="https://i.imgur.com/bkA0Lub.png"
              />
            </div>
            <div class="space-y-2">
              <OnOffComponent
                :label="'Thermostat:'"
                v-model="modeVal"
                :disabled="disabledManualMode"
                img="https://th.bing.com/th/id/OIP.z9KFg0Bp6el2SPpkRf4kBQHaHa?rs=1&pid=ImgDetMain"
              />
              <OnOffComponent
                :label="'Valve:'"
                v-model="modeVal"
                :disabled="disabledManualMode"
                img="https://i.imgur.com/MbOCXYA.png"
              />
              <FormInput
                :title="'Frequency'"
                v-model="frqVal"
                :disabled="disabledManualMode"
                :img="'https://i.imgur.com/orfzzhE.png'"
              />
              <FormInput
                :title="'Acceleration'"
                v-model="accVal"
                :disabled="disabledManualMode"
              />
              <FormInput
                :title="'Deceleration'"
                v-model="decVal"
                :disabled="disabledManualMode"
              />
              <RunCMD v-model="runCmVal" :disabled="disabledManualMode" />
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
</template>
