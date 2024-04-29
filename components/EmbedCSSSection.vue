<template>
  <div>
    <CodeSnippet
      v-for="family in Object.keys(selectedStore.selected)"
      :key="family"
      :source="
        convertStylesToCSS(
          family,
          selectedStore.selected[family],
          fonts.find((font) => font.family === family)?.category,
        )
      "
      class="mt-8"
    >
      <template #title> {{ family }}: CSS classes </template>
    </CodeSnippet>
  </div>
</template>

<script setup lang="ts">
import { useSelected } from '~/stores/selected';

const { fonts } = await useFetchAllFontsV2();

const selectedStore = useSelected();
definePageMeta({
  layout: 'font-detail',
});
</script>

<style scoped></style>
