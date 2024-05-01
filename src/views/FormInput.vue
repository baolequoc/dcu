<template>
  <div class="flex items-center justify-between">
    <div class="flex">
      <div>
        <img :src="img" width="20" height="20" class="w-5 h-5 mr-4" />
      </div>
      <label
        class="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-20 items-center"
      >
        <span>{{ title }} </span>
      </label>
    </div>
    <input
      type="text"
      :value="modelValue"
      :disabled="disabled"
      class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-32 text-gray-600"
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
  img: {
    type: String,
    default: "https://www.svgrepo.com/show/522385/clock-1100.svg",
  },
});

const emit = defineEmits(["update:modelValue"]);
function emitFunc(value) {
  emit("update:modelValue", value);
}
</script>

<style lang="scss" scoped></style>
