<template>
  <div class="px-14 pb-4">
    <TypographyTitle :level="3">Styles</TypographyTitle>
    <div class="flex items-center gap-4">
      <Input :value="props.preview" @input="(e) => emits('input', e.target.value || '')" />
      <div class="flex gap-2 mt-2">
        <Select :value="props.fontSize" class="min-w-[90px] w-max" @change="(value: SelectValue) => emits('setFontSize', Number((value as LabeledValue).value))">
          <SelectOption v-for="value in FONT_SIZES" :key="value" :value="value">
            {{ value }} px
          </SelectOption>
        </Select>
        <div class="w-full">
          <Slider :value="props.fontSize" :min="8" :max="300" :tooltip-open="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Select,
  SelectOption,
  Input,
  Slider,
  TypographyTitle,
} from 'ant-design-vue';
import { useFilter } from '~/stores/filter';
import { FONT_SIZES } from '~/constants/font-size';
import type { LabeledValue, SelectValue } from 'ant-design-vue/es/select';

const filterStore = useFilter();
const props = defineProps<{preview: string, fontSize: number}>()
const emits = defineEmits<{
  (e: 'input', value: string): void;
  (e: 'setFontSize', value?: number): void;
}>();
</script>

<style scoped></style>
