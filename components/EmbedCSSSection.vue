<template>
  <div>
    <CodeSnippet
      v-for="family in Object.keys(selectedStore.selected)"
      :key="family"
      :source="convertStylesToCSS(family, selectedStore.selected[family])"
      class="mt-8"
    >
      <template #title> {{ family }}: CSS classes </template>
    </CodeSnippet>
  </div>
</template>

<script setup lang="ts">
import { useSelected } from '~/stores/selected';

const selectedStore = useSelected();
definePageMeta({
  layout: 'font-detail',
});
</script>

<style scoped></style>
