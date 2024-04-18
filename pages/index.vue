<template>
  <div>

    <Head>
      <Style v-for="font in fontFaces.filter(Boolean).map(f => f.fontFace)" :id="font" :key="font" type="text/css" :children="font" />
      <!-- <Link v-for="menu in fontFaces.filter(Boolean).map(f => f.url)" rel="preload" as="font" :id="menu" :key="menu" :href="menu" /> -->
    </Head>

    <div v-if="isLoading">
      <div class="flex flex-col w-full gap-[1px] px-14">
        <div v-for="(_, index) in new Array(5).fill(true)" :key="index" class="h-[159px] w-full rounded-md bg-gray-100 p-4 animate-pulse"></div>
      </div>
    </div>
    <div v-else>
      <div v-bind="containerProps" class="h-[calc(100dvh-88px)] overflow-auto px-10">
        <div v-bind="wrapperProps" class="flex flex-col px-4">
          <div role="button" v-for="font in fontsList" @click="router.push(ROUTES.FONT_DETAIL(convertFamilyToParam(font.data.family)))" :key="font.data.family" :style="{ fontFamily: font.data.family }" class="h-40 hover:rounded-md border-b hover:border-b-0 border-gray-200 bg-white hover:bg-gray-200 p-4">
            {{ font.data.family }}
            <div class="w-full">
              <p class="truncate w-full !text-4xl !leading-normal">
                {{ PREVIEW_SENTENCE }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchFonts } from "~/composables/useFetchFonts";
import { useVirtualList } from "@vueuse/core";
import { PREVIEW_SENTENCE } from "~/constants/preview";
import { ROUTES } from "~/constants/routes";
import { convertFamilyToParam } from "~/utils/string";
import { watch, onUnmounted } from 'vue'
import type { FontItem } from "~/types/fonts.type";
import { useSort } from "~/stores/sort";

// const fonts = ref<FontItem[]>([]);

const { fonts, isLoading } = await useFetchFonts();
const fontFaces = ref<{fontFace: string, url: string}[]>([]);
const router = useRouter();
const sortStore = useSort()

watch(() => fonts.value, () => {
  fonts.value.forEach((font) => {
    fontFaces.value.push({fontFace:`
@font-face {
  font-family: '${font.family}';
  font-style: normal;
  font-weight: 400;
  src: url('${font.files.regular}') format('woff2');
}
    `, url: font.menu});
  });
}, { immediate: true });

onUnmounted(() => {
  fontFaces.value = [];
});

watch(sortStore, () => {
  router.push({ query: { sort: sortStore.criteria } });
})

const {
  list: fontsList,
  containerProps,
  wrapperProps,
} = useVirtualList(fonts, {
  itemHeight: 160,
});
</script>

<style lang="scss" scoped></style>
