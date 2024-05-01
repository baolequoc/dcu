<template>
  <div class="flex items-center space-x-4">
    <div>
      <img
        src="https://www.3roam.com/wp-content/uploads/2023/12/Radio-Frequency.png"
        width="20"
        height="20"
        class="w-5 h-5"
      />
    </div>
    <label class="mb-2 text-sm font-medium text-gray-900 mr-4"
      >Run command</label
    >
    <select
      :disabled="disabledManualMode"
      v-model="runCmVal"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-32 p-2"
      :class="{
        'cursor-not-allowed opacity-70': disabledManualMode,
      }"
    >
      <option value="1">Stop</option>
      <option value="2">FWD</option>
      <option value="4">REV</option>
    </select>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  disabledManualMode: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "1",
  },
});
const emit = defineEmits(["update:modelValue"]);
const runCmVal = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
