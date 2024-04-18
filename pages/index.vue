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
    <div v-else>
      <div class="h-[calc(100dvh-136px)] overflow-auto px-10 pb-4">
        <div class="flex flex-col px-4">
          <div
            v-for="font in fonts"
            :key="font.family"
            :style="{ fontFamily: font.family, height: `${filterStore.fontSize * 1.5 + 106}px` }"
            class="hover:rounded-md border-b border-gray-200 bg-white hover:bg-gray-200 p-4 shrink-0"
            role="button"
            @click="router.push(ROUTES.FONT_DETAIL(convertFamilyToParam(font.family)))"
          >
            {{ font.family }}
            <div class="w-full">
              <p
                class="truncate w-full !leading-normal"
                :style="{ fontSize: `${filterStore.fontSize}px` }"
              >
                {{ filterStore.preview || PREVIEW_SENTENCE }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchFonts } from '~/composables/useFetchFonts';
// import { useVirtualList } from "@vueuse/core";
import { PREVIEW_SENTENCE } from '~/constants/preview';
import { ROUTES } from '~/constants/routes';
import { convertFamilyToParam } from '~/utils/string';
import { watch, onUnmounted } from 'vue';
import { useFilter } from '~/stores/filter';

const { fonts, isLoading } = await useFetchFonts();

const fontFaces = ref<{ fontFace: string; url: string }[]>([]);
const router = useRouter();
const filterStore = useFilter();

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
  src: url('${font.files.regular}') format('woff2');
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
