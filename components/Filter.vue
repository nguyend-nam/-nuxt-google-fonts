<template>
  <div class="px-6 md:px-14 pb-4">
    <Button type="primary" @click="() => (isExpanded = !isExpanded)">Filter</Button>
    <Drawer v-model:open="isExpanded" placement="left">
      <TypographyTitle :level="3">Preview</TypographyTitle>
      <Textarea v-model:value="filterStore.preview" />
      <div class="flex gap-2 mt-2">
        <Select v-model:value="filterStore.fontSize" class="min-w-[80px] w-max">
          <SelectOption v-for="value in FONT_SIZES" :key="value" :value="value">
            {{ value }}
          </SelectOption>
          <template #suffixIcon>px</template>
        </Select>
        <div class="w-full h-8">
          <Slider v-model:value="filterStore.fontSize" :min="8" :max="300" :tooltip-open="false" />
        </div>
      </div>
      <Divider />
      <TypographyTitle :level="3">Language</TypographyTitle>
      <Select v-model:value="subsetStore.subset" class="min-w-[160px] w-full" size="large">
        <SelectOption v-for="(value, name) in SUBSETS" :key="name" :value="name">
          {{ value }}
        </SelectOption>
      </Select>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import {
  Button,
  Drawer,
  Select,
  SelectOption,
  Textarea,
  Slider,
  TypographyTitle,
  Divider,
} from 'ant-design-vue';
import { useFilter } from '~/stores/filter';
import { useSubset } from '~/stores/subset';
import { SUBSETS } from '~/constants/subset';
import { FONT_SIZES } from '~/constants/font-size';

const filterStore = useFilter();
const subsetStore = useSubset();

const isExpanded = ref(false);
</script>

<style scoped></style>
