<template>
  <div class="px-14 pb-4 mt-8">
    <CodeSnippet :source="convertStylesToLink(selectedStore.selected)">
      <template #title>
        Embed code in the <code class="!border-none">&lt;head&gt;</code> of your html
      </template>
    </CodeSnippet>
    <EmbedCSSSection />
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
