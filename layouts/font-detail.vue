<template>
  <div class="section-container">
    <ClientOnly>
      <Header :disabled="true" />
      <slot />
    </ClientOnly>
  </div>
</template>

<script setup>
import { useFilter } from '~/stores/filter';
import { useSort } from '~/stores/sort';
import { useSubset } from '~/stores/subset';

const sortStore = useSort();
const subsetStore = useSubset();
const filterStore = useFilter();

const route = useRoute();

watch(
  () => route.query,
  () => {
    sortStore.setCriteria(route.query?.sort || 'trending');
    subsetStore.setSubset(route.query?.subset || 'all-languages');
    filterStore.setPreview(route.query?.preview || '');
    filterStore.setFontSize(Number(route.query?.size) || 40);
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
