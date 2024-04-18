<template>
  <div class="px-4 pb-4">
    <Button type="primary" @click="() => (isExpanded = !isExpanded)">Filter</Button>
    <Drawer v-model:open="isExpanded">
      <TypographyTitle :level="3">Preview</TypographyTitle>
      <Textarea v-model:value="filterStore.preview" />
      <div class="flex gap-2 mt-2">
        <Select v-model:value="filterStore.fontSize" class="min-w-[90px] w-max">
          <SelectOption v-for="value in FONT_SIZES" :key="value" :value="value">
            {{ value }} px
          </SelectOption>
        </Select>
        <div class="w-full">
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
