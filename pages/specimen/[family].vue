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
    <div v-if="isLoading">
      <div class="flex flex-col w-full gap-[1px] px-14 pb-4">
        <div
          v-for="(_, index) in new Array(15).fill(true)"
          :key="index"
          class="w-full rounded-md bg-gray-100 p-4 animate-pulse h-[157px]"
        />
      </div>
    </div>
    <div v-else-if="!currentFont">
      <div class="px-14 pb-4">
        <h2> Font not found </h2>
      </div>
    </div>
    <div v-else>
      <div class="px-14 pb-4">
        <h2 class="text-6xl mt-8">
          {{ currentFont.family }}
        </h2>
        <FontDetailStyles
          :preview="fontDetailPreview"
          :font-size="fontSize"
          @input="onPreviewInput"
          @set-font-size="setFontSize"
        />
        <div class="mt-12 border-b border-gray-200">
          <div
            v-for="(variant, index) in variantStyles"
            :key="variant.fontFamily + index"
            class="p-4 border-t w-full border-gray-200"
          >
            <p class="text-sm text-gray-700 mb-2">
              {{
                [
                  getFontWeight(variant.fontWeight),
                  variant.fontWeight,
                  variant.fontStyle === 'italic'
                    ? variant.fontStyle[0].toUpperCase() + variant.fontStyle.slice(1)
                    : '',
                ].join(' ')
              }}
            </p>
            <FontVariantContentEditable
              :preview="fontDetailPreview"
              :style="{ fontSize: `${fontSize}px`, ...variant }"
              @input="onPreviewInput"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FontItem, FontWeight } from '~/types/fonts.type';
import { convertParamToFamily } from '~/utils/string';
import { FONT_DETAIL_PREVIEW_SENTENCE } from '~/constants/preview';

definePageMeta({
  layout: 'font-detail',
});
const { fonts, isLoading } = await useFetchFonts();
const route = useRoute();
const currentFont = ref<FontItem | null>(null);

watchEffect(() => {
  const currentFontData = fonts.value.find(
    (font) => font.family === convertParamToFamily(route.params.family as string),
  );

  if (currentFontData) {
    currentFont.value = currentFontData;
  }
});

const fontFaces = ref<{ fontFace: string }[]>([]);

watch(
  () => currentFont.value?.variants,
  () => {
    if (!!currentFont.value && currentFont.value?.variants.length > 0) {
      currentFont.value?.variants.forEach((variant) => {
        const weight = variant === 'regular' ? '400' : variant;
        const surl = currentFont.value?.files[variant];

        if (weight) {
          fontFaces.value.push({
            fontFace: `
@font-face {
  font-family: '${currentFont.value?.family} script=${
    currentFont.value?.subsets.includes('latin') ? 'latin' : currentFont.value?.subsets[0]
  } rev=1';
  font-style: ${weight.includes('italic') ? 'italic' : 'normal'};
  font-weight: ${weight.includes('italic') ? weight.slice(0, 3) : weight};
  font-display: block;
  src: url(${surl}) format('woff2');
  }
`,
          });
        }
      });
    }
  },
  { immediate: true },
);

const variantStyles: {
  fontFamily: string;
  fontWeight: FontWeight;
  fontStyle: string;
  fontStretch: string;
  lineHeight: string;
  fontCategory: string;
}[] = [];

if (currentFont.value) {
  const { subsets, family } = currentFont.value;
  for (let i = 0; i < currentFont.value.variants.length; i++) {
    const fontDetails = currentFont.value;

    if (fontDetails.variants[i].includes('italic')) {
      const props = {
        fontFamily: `"${family} script=${subsets.includes('latin') ? 'latin' : subsets[0]} rev=1"`,
        fontWeight: `${
          fontDetails.variants[i].slice(0, 3) === 'ita'
            ? '400'
            : fontDetails.variants[i].slice(0, 3)
        }` as FontWeight,
        fontStyle: `italic`,
        fontStretch: `normal`,
        lineHeight: `initial`,
        fontCategory: fontDetails.category,
      };
      variantStyles.push(props);
    } else {
      const props = {
        fontFamily: `"${family} script=${subsets.includes('latin') ? 'latin' : subsets[0]} rev=1"`,
        fontWeight: `${
          fontDetails.variants[i] === 'regular' ? '400' : fontDetails.variants[i]
        }` as FontWeight,
        fontStyle: `regular`,
        fontStretch: `normal`,
        lineHeight: `initial`,
        fontCategory: fontDetails.category,
      };
      variantStyles.push(props);
    }
  }
}

const fontDetailPreview = ref<string>(FONT_DETAIL_PREVIEW_SENTENCE);

const onPreviewInput = (value: string) => {
  fontDetailPreview.value = value;
};

const fontSize = ref<number>(48);

const setFontSize = (value?: number) => {
  if (value) {
    fontSize.value = value;
  }
};

onUnmounted(() => {
  fontFaces.value = [];
});
</script>

<style scoped></style>
