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
    </Head>
    <div
      v-if="Object.keys(selectedStore.selected).length === 0"
      class="px-14 pb-4 mt-8 flex flex-col items-center"
    >
      <p class="text-[200px] text-gray-500">(˚Δ˚)b</p>
      <p class="text-3xl">You don't have any fonts yet.</p>
      <p class="text-3xl">Choose a font to get started.</p>
      <NuxtLink
        :href="`${ROUTES.HOME}?${qs.stringify({
          ...(sortStore.criteria !== 'trending' ? { sort: sortStore.criteria } : null),
          ...(subsetStore.subset !== 'all-languages' ? { subset: subsetStore.subset } : null),
          ...(filterStore.fontSize !== 40 ? { size: filterStore.fontSize } : null),
        })}`"
      >
        <Button class="mt-8"> Browse fonts </Button>
      </NuxtLink>
    </div>
    <div v-else class="px-14 pb-4 mt-8 flex justify-between gap-8">
      <FontManager v-if="!isLoading" />
      <div class="w-1/2 shrink-0 h-[calc(100dvh-136px)] overflow-auto sticky top-[120px]">
        <CodeSnippet :source="convertStylesToLink(selectedStore.selected)">
          <template #title>
            Embed code in the <code class="!border-none">&lt;head&gt;</code> of your html
          </template>
        </CodeSnippet>
        <EmbedCSSSection />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSelected } from '~/stores/selected';
import { useFilter } from '~/stores/filter';
import { useSubset } from '~/stores/subset';
import { useSort } from '~/stores/sort';
import { ROUTES } from '~/constants/routes';
import qs from 'qs';
import { Button } from 'ant-design-vue';

const { fonts, isLoading } = await useFetchAllFonts();

const sortStore = useSort();
const subsetStore = useSubset();
const filterStore = useFilter();
const selectedStore = useSelected();
definePageMeta({
  layout: 'font-detail',
});

const fontFaces = ref<{ fontFace: string }[]>([]);

watch(
  () => selectedStore.selected,
  () => {
    if (Object.keys(selectedStore.selected).length > 0) {
      fonts.value
        .filter((f) => Object.keys(selectedStore.selected).includes(f.family))
        .forEach(({ family, files }) => {
          fontFaces.value.push({
            fontFace: `
@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url(${files.regular}) format('woff2');
  }
`,
          });
        });
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  fontFaces.value = [];
});
</script>

<style scoped></style>
