<template>
  <div>
    <Head>
      <Style
        v-for="font in fontFaces.filter(Boolean).map((f) => f.fontFace)"
        :id="font"
        :key="font"
        type="text/css"
        :children="font"
      />
      <!-- <Link v-for="menu in fontFaces.filter(Boolean).map(f => f.url)" rel="preload" as="font" :id="menu" :key="menu" :href="menu" /> -->
    </Head>

    <div v-if="isLoading">
      <div class="flex flex-col w-full gap-[1px] px-14">
        <div
          v-for="(_, index) in new Array(15).fill(true)"
          :key="index"
          class="h-[159px] w-full rounded-md bg-gray-100 p-4 animate-pulse"
          :style="{ height: `${filterStore.fontSize * 1.5 + 106}px` }"
        />
      </div>
    </div>
    <div
      v-else-if="
        fonts.filter((f) => f.family.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
          .length === 0
      "
      class="px-14 pb-4 mt-8 flex flex-col items-center"
    >
      <p class="text-[200px] text-gray-500">(˚Δ˚)b</p>
      <p class="text-2xl">Can't find any fonts.</p>
    </div>
    <div v-else>
      <div class="h-[calc(100dvh-136px)] overflow-auto px-10 pb-4">
        <div class="flex flex-col px-4">
          <FontCard
            v-for="font in fonts.filter((f) =>
              f.family.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
            )"
            :key="font.family"
            :font="font"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilter } from '~/stores/filter';
import { watchDebounced } from '@vueuse/core';
import { useSubset } from '~/stores/subset';
import { useSort } from '~/stores/sort';

const { fonts, isLoading } = await useFetchFontsV2();

const fontFaces = ref<{ fontFace: string; url: string }[]>([]);
const filterStore = useFilter();

const debouncedSearchTerm = ref('');

watchDebounced(
  () => filterStore.searchTerm,
  (value) => {
    debouncedSearchTerm.value = value;
  },
  { debounce: 300 },
);

watch(
  () => fonts.value,
  () => {
    fonts.value.forEach((font) => {
      fontFaces.value.push({
        fontFace: `
@font-face {
  font-family: '${font.family}';
  font-style: normal;
  font-weight: 400;
  src: url('${font.files?.regular || font.files?.[300] || font.files?.[700] || font.files?.italic}') format('woff2');
}
    `,
        url: font.menu,
      });
    });
  },
  { immediate: true },
);

onUnmounted(() => {
  fontFaces.value = [];
});

// const {
//   list: fontsList,
//   containerProps,
//   wrapperProps,
// } = useVirtualList(fonts, {
//   itemHeight: filterStore.fontSize * 1.5 + 106,
// });
</script>

<style lang="scss" scoped></style>
