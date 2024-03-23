<template>
  <div class="flex items-center space-x-4">
    <label
      class="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-20 h-20 bg-orange-400 justify-center items-center rounded-full"
    >
      <span>{{ title }} </span>
    </label>
    <input
      type="text"
      :value="modelValue"
      :disabled="disabled"
      class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-24 text-gray-600"
      @input="emitFunc($event.target.value)"
      placeholder="0"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "0",
  },
  title: {
    type: String,
    default: "title",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
function emitFunc(value) {
  emit("update:modelValue", value);
}
</script>

<style lang="scss" scoped></style>
