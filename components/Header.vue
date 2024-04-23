<template>
  <header class="flex justify-between items-center gap-4 h-[88px] px-14 sticky top-0 bg-white z-50">
    <h1 class="shrink-0 text-2xl">
      <NuxtLink
        :href="`${ROUTES.HOME}?${qs.stringify({
          ...(sortStore.criteria !== 'trending' ? { sort: sortStore.criteria } : null),
          ...(subsetStore.subset !== 'all-languages' ? { subset: subsetStore.subset } : null),
          ...(filterStore.fontSize !== 40 ? { size: filterStore.fontSize } : null),
        })}`"
      >
        Google Fonts
      </NuxtLink>
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
          :disabled="props.disabled"
          :bordered="false"
          @change="sortStore.setCriteria"
        >
          <SelectOption v-for="(value, name) in SORT_CRITERIA" :key="name" :value="name">
            {{ value }}
          </SelectOption>
        </Select>
      </div>
    </div>
    <Badge :count="Object.keys(selectedStore.selected).length">
      <Button
        shape="circle"
        type="text"
        size="large"
        class="flex justify-center items-center"
        style="border: 1px solid #f0f0f0"
        :icon="h(ShoppingOutlined)"
        @click="
          router.push({
            path: ROUTES.EMBED,
            query: {
              ...(sortStore.criteria !== 'trending' ? { sort: sortStore.criteria } : null),
              ...(subsetStore.subset !== 'all-languages' ? { subset: subsetStore.subset } : null),
              ...(filterStore.fontSize !== 40 ? { size: filterStore.fontSize } : null),
            },
          })
        "
      />
    </Badge>
  </header>
</template>

<script setup lang="ts">
import { Badge, Button, Input, SelectOption, Select } from 'ant-design-vue';
import { ShoppingOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { useSort } from '~/stores/sort';
import { SORT_CRITERIA } from '~/constants/sort';
import { ROUTES } from '~/constants/routes';
import { useFilter } from '~/stores/filter';
import { useSubset } from '~/stores/subset';
import qs from 'qs';
import { useSelected } from '~/stores/selected';

const props = defineProps<{
  disabled?: boolean;
}>();

const sortStore = useSort();
const subsetStore = useSubset();
const filterStore = useFilter();

const route = useRoute();
const router = useRouter();
const selectedStore = useSelected();

watch(
  () => route.path,
  () => {
    filterStore.searchTerm = '';
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped></style>
