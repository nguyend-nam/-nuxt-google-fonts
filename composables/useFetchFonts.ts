import { notification } from 'ant-design-vue';
import { GOOGLE_FONTS_BASE_URL } from '~/constants/endpoints';
import { useSort } from '~/stores/sort';
import { useSubset } from '~/stores/subset';
import type { FontItem, GetFontsResponse } from '~/types/fonts.type';
import qs from 'qs';
import { useFilter } from '~/stores/filter';
import { watchDebounced } from '@vueuse/core';

export const useFetchFonts = async () => {
  const sortStore = useSort();
  const subsetStore = useSubset();
  const filterStore = useFilter();
  const router = useRouter();

  const fonts = ref<FontItem[]>([]);
  const config = useRuntimeConfig();
  const isLoading = ref(false);

  const params = ref({});

  watch(
    [sortStore, subsetStore],
    () => {
      params.value = {
        sort: sortStore.criteria,
        subset: subsetStore.subset === 'all-languages' ? '' : subsetStore.subset,
      };
    },
    { immediate: true },
  );

  try {
    isLoading.value = true;
    const res: GetFontsResponse = await $fetch(
      `${GOOGLE_FONTS_BASE_URL}/webfonts?key=${config.public.apiKey}&${qs.stringify(params.value)}`,
    );
    fonts.value = res?.items;
  } catch (error) {
    notification.error({
      message: 'Could not fetch fonts',
    });
  } finally {
    isLoading.value = false;
  }

  watch(params, async () => {
    try {
      isLoading.value = true;
      const res: GetFontsResponse = await $fetch(
        `${GOOGLE_FONTS_BASE_URL}/webfonts?key=${config.public.apiKey}&${qs.stringify(params.value)}`,
      );
      fonts.value = res?.items;
    } catch (error) {
      notification.error({
        message: 'Could not fetch fonts',
      });
    } finally {
      isLoading.value = false;
    }
  });

  watchDebounced(
    () => [sortStore.criteria, subsetStore.subset, filterStore.fontSize],
    () => {
      console.log(sortStore.criteria, subsetStore.subset, filterStore.fontSize);
      router.push({
        query: {
          ...(sortStore.criteria !== 'trending' ? { sort: sortStore.criteria } : null),
          ...(subsetStore.subset !== 'all-languages' ? { subset: subsetStore.subset } : null),
          // ...(filterStore.preview ? { preview: filterStore.preview } : null),
          ...(filterStore.fontSize !== 40 ? { size: filterStore.fontSize } : null),
        },
      });
    },
    { immediate: true },
  );

  return { fonts, isLoading };
};
