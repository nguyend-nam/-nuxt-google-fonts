<template>
  <div>

    <Head>
      <Style v-for="font in fontFaces" :id="font" :key="font" type="text/css" :children="font" />
    </Head>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-bind="containerProps" class="h-[calc(100dvh-88px)] overflow-auto">
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

// const fonts = ref<FontItem[]>([]);

const { fonts, isLoading } = await useFetchFonts();
const fontFaces = ref<string[]>([]);
const router = useRouter();

watch(() => fonts.value, () => {
  console.log('bla')
  fonts.value.forEach((font) => {
    fontFaces.value.push(`
@font-face {
  font-family: '${font.family}';
  font-style: normal;
  font-weight: 400;
  src: url('${font.files.regular}') format('woff2');
}
    `);
  });
}, { immediate: true });

onUnmounted(() => {
  fontFaces.value = [];
});


const {
  list: fontsList,
  containerProps,
  wrapperProps,
} = useVirtualList(fonts, {
  itemHeight: 160,
});
</script>

<style lang="scss" scoped></style>
