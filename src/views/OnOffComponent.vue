<template>
  <div>
    <label class="flex items-center cursor-pointer justify-between h-10">
      <div class="flex">
        <img :src="img" width="20" height="20" class="w-5 h-5 mr-4" />
        <span class="text-sm font-medium text-gray-900">{{ label }}</span>
      </div>
      <div class="flex">
        <div class="mr-2">OFF</div>
        <input
          type="checkbox"
          class="sr-only peer"
          v-model="selected"
          :disabled="disabled"
        />
        <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 disabled:cursor-not-allowed"
          :class="{ 'cursor-not-allowed': disabled }"
        ></div>
        <div class="ml-2">ON</div>
      </div>
    </label>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "title",
  },
  img: {
    type: String,
    default: "https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const selected = computed({
  get: () => props.modelValue,
  set: (value) => {
    console.log("🚀 ~ value:", value);
    emit("update:modelValue", value);
  },
});
</script>
