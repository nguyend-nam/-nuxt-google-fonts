<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      {{ currentFont?.family }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FontItem } from '~/types/fonts.type';
import { convertParamToFamily } from '~/utils/string';

const { fonts, isLoading } = await useFetchFonts();
const route = useRoute()
const currentFont = ref<FontItem | null>(null)

watchEffect(() => {
  const currentFontData = fonts.value.find(font => font.family === convertParamToFamily(route.params.family as string))

  if (currentFontData) {
    currentFont.value = currentFontData
  }
})
</script>

<style scoped></style>