<template>
  <div class="flex flex-col gap-4 items-stretch">
    <FontManagerItem
      v-for="key in Object.keys(selectedStore.selected)"
      :key="key"
      :data="{ [key]: selectedStore.selected[key] }"
    />
  </div>
</template>

<script setup lang="ts">
import { useSelected } from '~/stores/selected';

const selectedStore = useSelected();
</script>

<style scoped></style>
