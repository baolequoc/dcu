import { initializeApp } from "firebase/app";
import { createInjectionState } from "@vueuse/core";
import { child, getDatabase, ref, get, onValue, set } from "firebase/database";
import { computed, ref as refVue } from "vue";
const MONITOR_COL = "Monitor";
const CONTROL_COL = "Control";

const [useProvideFirebaseStore, _useFirebaseStore] = createInjectionState(
  () => {
    const firebaseConfig = {
      apiKey: "AIzaSyBKfpuek5zLjvyFZrEqljUYsMLIa6Zkl1Q",
      authDomain: "fir-1817a.firebaseapp.com",
      databaseURL: "https://fir-1817a-default-rtdb.firebaseio.com",
      projectId: "fir-1817a",
      storageBucket: "fir-1817a.appspot.com",
      messagingSenderId: "700546548136",
      appId: "1:700546548136:web:b21313bdfa21910bf41d9d",
      measurementId: "G-P1T35DBV2F",
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const dataMonitor = refVue({});
    const dataControl = refVue({});

    const pressure = computed(() => {
      return dataMonitor?.value["CPS-A"]?.data || "0";
    });
    const current = computed(() => {
      return dataMonitor?.value["CURRENT"]?.data || "0";
    });
    const outFrq = computed(() => {
      return dataMonitor?.value["OUT FRQ"]?.data || "0";
    });
    const temp = computed(() => {
      return dataMonitor?.value["TEMP "]?.data || "0";
    });
    const van1 = computed(() => {
      return dataMonitor?.value["VAN1"]?.data || "0";
    });
    const van2 = computed(() => {
      return dataMonitor?.value["VAN2"]?.data || "0";
    });
    const voltage = computed(() => {
      return dataMonitor?.value["VOLTAGE"]?.data || "0";
    });
    const speed = computed(() => {
      return dataMonitor?.value["SPEED"]?.data || "0";
    });
    const power = computed(() => {
      return dataMonitor?.value["POWER"]?.data || "0";
    });

    const setPoint = computed(() => {
      return dataControl?.value["VIRTUAL SET POINT"]?.data || "0";
    });
    const minAo = computed(() => {
      return dataControl?.value["VIRTUAL MIN AO01"]?.data || "0";
    });
    const maxAo = computed(() => {
      return dataControl?.value["VIRTUAL MAX AO01"]?.data || "0";
    });
    const p = computed(() => {
      return dataControl?.value["VIRTUAL P"]?.data || "0";
    });
    const i = computed(() => {
      return dataControl?.value["VIRTUAL I"]?.data || "0";
    });
    const d = computed(() => {
      return dataControl?.value["VIRTUAL D"]?.data || "0";
    });
    const runCm = computed(() => {
      return dataControl?.value["VIRTUAL RUN CM"]?.data || "2";
    });
    const lock = computed(() => {
      return dataControl?.value["VIRTUAL LOCK"]?.data || "0";
    });
    const mode = computed(() => {
      return dataControl?.value["O ENABLE"]?.data || "0";
    });
    const frq = computed(() => {
      return dataControl?.value["O VALUE"]?.data || "0";
    });
    const dec = computed(() => {
      return dataControl?.value["VIRTUAL DEC"]?.data || "0";
    });
    const acc = computed(() => {
      return dataControl?.value["VIRTUAL ACC"]?.data || "0";
    });

    async function getMonitor() {
      const monitorRef = ref(database, MONITOR_COL);
      onValue(monitorRef, (snapshot) => {
        const data = snapshot.val();
        dataMonitor.value = data;
      });
    }

    async function getControl() {
      const controlRef = ref(database, CONTROL_COL);
      onValue(controlRef, (snapshot) => {
        const data = snapshot.val();
        console.log("🚀 ~ onValue ~ data:", data);
        dataControl.value = data;
      });
    }

    function writeData(data) {
      const newControlData = { ...dataControl.value, ...data };
      if (
        JSON.stringify(newControlData) === JSON.stringify(dataControl.value)
      ) {
        return;
      }
      set(ref(database, CONTROL_COL), newControlData);
    }

    // function writeDataModeAuto(setPoint, minAo, maxAo) {
    //   set(ref(database, MONITOR_COL), {
    // "SET POINT": {
    //   data: setPoint,
    //   status: true,
    // },
    // "MIN AO": {
    //   data: minAo,
    //   status: true,
    // },
    // "MAX AO": {
    //   data: maxAo,
    //   status: true,
    // },
    //   });
    // }

    return {
      app,
      getMonitor,
      getControl,
      // writeData,
      pressure,
      current,
      outFrq,
      temp,
      van1,
      van2,
      voltage,
      speed,
      power,
      setPoint,
      minAo,
      maxAo,
      p,
      i,
      d,
      runCm,
      lock,
      mode,
      frq,
      dec,
      acc,
      writeData,
    };
  }
);

function useFirebaseStore() {
  let counterStore = _useFirebaseStore();
  if (counterStore == null) counterStore = useProvideFirebaseStore();
  return counterStore;
}

export { useProvideFirebaseStore, useFirebaseStore };
