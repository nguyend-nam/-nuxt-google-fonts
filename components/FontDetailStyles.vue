<template>
  <div class="mt-8">
    <TypographyTitle :level="3" class="!font-medium">Styles</TypographyTitle>
    <div class="flex items-center gap-4">
      <Input
        :value="props.preview"
        class="w-2/3"
        size="large"
        @input="(e) => emits('input', e.target.value || '')"
      />
      <div class="flex gap-2 w-1/3">
        <Select
          :value="props.fontSize"
          class="min-w-[80px] w-max h-8"
          @change="(value) => emits('setFontSize', Number(value))"
        >
          <SelectOption v-for="value in FONT_SIZES" :key="value" :value="value">
            {{ value }}
          </SelectOption>
          <template #suffixIcon>px</template>
        </Select>
        <div class="w-full h-8">
          <Slider
            :value="props.fontSize"
            :min="8"
            :max="300"
            :tooltip-open="false"
            @change="(value) => emits('setFontSize', Number(value))"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select, SelectOption, Input, Slider, TypographyTitle } from 'ant-design-vue';
import { FONT_SIZES } from '~/constants/font-size';

const props = defineProps<{ preview: string; fontSize: number }>();
const emits = defineEmits<{
  (e: 'input', value: string): void;
  (e: 'setFontSize', value?: number): void;
}>();
</script>

<style scoped></style>
