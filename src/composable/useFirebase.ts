import { initializeApp } from "firebase/app";
import { createInjectionState } from "@vueuse/core";
import { child, getDatabase, ref, get, onValue, set } from "firebase/database";
import { computed, ref as refVue } from "vue";
const MONITOR_COL = "Monitor";
const CONTROL_COL = "Control";

const [useProvideFirebaseStore, _useFirebaseStore] = createInjectionState(
  () => {
    const firebaseConfig = {
      apiKey: "AIzaSyCVlp0Gzu5zECLgniWMLo8qkxWDCaz70fs",
      authDomain: "bulul2.firebaseapp.com",
      databaseURL: "https://bulul2-default-rtdb.firebaseio.com",
      projectId: "bulul2",
      storageBucket: "bulul2.appspot.com",
      messagingSenderId: "699243697856",
      appId: "1:699243697856:web:d9deab885864d0f420ff25",
      measurementId: "G-GZ30SM2GRC",
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
    const thermoStat = computed(() => {
      return dataControl?.value["ON OFF THERMOSTAT"]?.data || "0";
    });
    const valve = computed(() => {
      return dataControl?.value["VIRTUAL OV VALVE"]?.data || "0";
    });
    const timestamp = computed(() => {
      const hour = dataMonitor?.value["HOUR"]?.data || "0";
      const minute = dataMonitor?.value["MINUTE"]?.data || "0";
      const second = dataMonitor?.value["SECOND"]?.data || "0";
      return `${hour}:${minute}:${second}`;
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
        dataControl.value = data;
        console.log("🚀 ~ onValue ~ data:", data);
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
      thermoStat,
      valve,
      timestamp,
    };
  }
);

function useFirebaseStore() {
  let counterStore = _useFirebaseStore();
  if (counterStore == null) counterStore = useProvideFirebaseStore();
  return counterStore;
}

export { useProvideFirebaseStore, useFirebaseStore };
