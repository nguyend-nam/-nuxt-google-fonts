<template>
  <header class="flex justify-between items-center gap-4 h-[88px] px-4">
    <h1 class="shrink-0 text-2xl">
      <NuxtLink :href="ROUTES.HOME"> Google Fonts </NuxtLink>
    </h1>
    <div class="flex items-center bg-gray-100 pl-4 w-full rounded-full overflow-hidden">
      <div class="flex items-center p-2.5 w-full">
        <SearchOutlined class="text-xl h-5 flex" />
        <Input v-model:value="filterStore.searchTerm" :bordered="false" size="large" />
      </div>
      <div class="border-l h-[56px] flex items-center px-4">
        <Select
          v-model:value="sortStore.criteria"
          class="min-w-[160px] !rounded-full"
          size="large"
          @change="sortStore.setCriteria"
        >
          <SelectOption v-for="(value, name) in SORT_CRITERIA" :key="name" :value="name">
            {{ value }}
          </SelectOption>
        </Select>
      </div>
    </div>
    <Button
      shape="circle"
      type="text"
      size="large"
      class="flex justify-center items-center"
      :icon="h(ShoppingOutlined)"
    />
  </header>
</template>

<script setup>
import { Button, Input, SelectOption, Select } from 'ant-design-vue';
import { ShoppingOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
import { useSort } from '~/stores/sort';
import { SORT_CRITERIA } from '~/constants/sort';
import { ROUTES } from '~/constants/routes';
import { useFilter } from '~/stores/filter';

const sortStore = useSort();
const filterStore = useFilter();

const inputField = ref('');
const debouncedInputField = ref('');

watch(inputField, () => {
  if (inputField.value) {
    debouncedInputField.value = inputField.value;
  }
});
</script>

<style lang="scss" scoped></style>
