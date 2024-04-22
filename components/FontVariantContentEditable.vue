<template>
  <div class="w-full !leading-normal" :class="{ 'line-clamp-1': !isEditing }" :style="props.style" :contenteditable="true" @input="(e) => emits('input', (e.target as HTMLDivElement).innerText)" @focus="onFocus" @blur="onBlur">
    {{ props.preview }}
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue';

const props = defineProps<{
  preview: string;
  style: StyleValue
}>();

const emits = defineEmits<{
  (e: 'input', value: string): void;
}>();

const isEditing = ref(false)
const onFocus = () => {
  isEditing.value = true
}
const onBlur = () => {
  isEditing.value = false
}
</script>

<style scoped>

</style>