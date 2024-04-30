<template>
  <label class="inline-flex items-center cursor-pointer">
    <div v-if="firstLabel" class="mr-2">
      {{ firstLabel }}
    </div>
    <input
      type="checkbox"
      class="sr-only peer"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
    ></div>
    <span class="pl-5 ms-3 text-sm font-medium text-gray-900">{{
      secondLabel
    }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  firstLabel: {
    type: String,
    default: "OFF",
  },
  secondLabel: {
    type: String,
    default: "ON",
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>
