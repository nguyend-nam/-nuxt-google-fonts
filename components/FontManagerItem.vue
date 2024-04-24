<template>
  <div>
    <div
      v-if="!isLoading && Object.keys(props).length > 0"
      class="p-4 border border-gray-200 rounded-md"
    >
      <TypographyTitle :level="4" class="!font-normal !text-base">{{
        Object.keys(props.data)[0]
      }}</TypographyTitle>
      <p
        :style="`font-family: ${Object.keys(props.data)[0]}`"
        class="text-4xl line-clamp-1 leading-normal"
        >{{ FONT_DETAIL_PREVIEW_SENTENCE }}</p
      >
      <Button
        danger
        class="mt-4"
        @click="() => selectedStore.removeSelectedStyle(Object.keys(props.data)[0])"
        >Remove {{ Object.keys(props.data)[0] }}</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelectedVariant } from '~/types/selected.type';
import type { FontItem } from '~/types/fonts.type';
import { FONT_DETAIL_PREVIEW_SENTENCE } from '~/constants/preview';
import { TypographyTitle, Button } from 'ant-design-vue';
import { useSelected } from '~/stores/selected';

const { fonts, isLoading } = await useFetchAllFontsV2();

const props = defineProps<{
  data: Record<string, SelectedVariant[]>;
}>();

const selectedStore = useSelected();

const currentFont = ref<FontItem | null>(null);

watchEffect(() => {
  if (Object.keys(props).length > 0) {
    const currentFontData = fonts.value.find(
      (font) => font.family === convertParamToFamily(Object.keys(props)[0]),
    );

    if (currentFontData) {
      currentFont.value = currentFontData;
    }
  }
});
</script>

<style scoped></style>
