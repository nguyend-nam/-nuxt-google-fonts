<template>
  <div ref="target">
    <div
      :key="font.family"
      v-element-visibility="[onElementVisibility, { scrollTarget: target }]"
      :style="{ height: `${filterStore.fontSize * 1.5 + 106}px` }"
      class="hover:rounded-md border-b border-gray-200 bg-white hover:bg-gray-200 p-4 shrink-0 overflow-hidden"
      role="button"
      @click="
        router.push({
          path: ROUTES.FONT_DETAIL(convertFamilyToParam(font.family)),
          query: {
            ...(sortStore.criteria !== 'trending' ? { sort: sortStore.criteria } : null),
            ...(subsetStore.subset !== 'all-languages' ? { subset: subsetStore.subset } : null),
            ...(filterStore.fontSize !== 40 ? { size: filterStore.fontSize } : null),
          },
        })
      "
    >
      <div
        class="transition-all duration-200"
        :class="{
          '!opacity-100': isVisible,
          'opacity-100 !translate-y-0': isVisited,
          '!opacity-0': !isVisible,
          '!opacity-0 !translate-y-6': !isVisited,
        }"
      >
        <div class="flex items-center gap-4">
          <b class="font-semibold">{{ font.family }}</b>
          <div class="w-[1px] h-4 bg-black" />
          <p>{{ font.variants.length }} {{ font.variants.length > 1 ? 'variants' : 'variant' }}</p>
        </div>
        <div class="w-full">
          <p
            class="truncate w-full !leading-normal"
            :style="{ fontSize: `${filterStore.fontSize}px`, fontFamily: `'${font.family}'` }"
          >
            {{ filterStore.preview || PREVIEW_SENTENCE }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FontItem } from '~/types/fonts.type';
import { ROUTES } from '~/constants/routes';
import { PREVIEW_SENTENCE } from '~/constants/preview';
import { useSort } from '~/stores/sort';
import { useSubset } from '~/stores/subset';
import { useFilter } from '~/stores/filter';
import { vElementVisibility } from '@vueuse/components';

const router = useRouter();
const sortStore = useSort();
const subsetStore = useSubset();
const filterStore = useFilter();
const props = defineProps<{ font: FontItem }>();
const { font } = props;

const target = ref(null);

const isVisited = ref(false);
const isVisible = ref(false);
function onElementVisibility(state: boolean) {
  if (state && !isVisited.value) {
    isVisited.value = true;
  }

  isVisible.value = state;
}
</script>

<style scoped></style>
