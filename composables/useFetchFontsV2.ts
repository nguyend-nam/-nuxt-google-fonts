import { notification } from 'ant-design-vue';
import { GOOGLE_FONTS_BASE_URL } from '~/constants/endpoints';
import { useSort } from '~/stores/sort';
import { useSubset } from '~/stores/subset';
import type { FontItem, GetFontsResponse } from '~/types/fonts.type';
import qs from 'qs';
import { useFilter } from '~/stores/filter';
import { watchDebounced } from '@vueuse/core';

export const useFetchFontsV2 = async () => {
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

  watch(
    params,
    async () => {
      await useFetch<GetFontsResponse>(
        `${GOOGLE_FONTS_BASE_URL}/webfonts?key=${config.public.apiKey}&${qs.stringify(params.value)}`,
        {
          headers: {
            Accept: 'application/json',
          },
          getCachedData: (key, nuxtApp) => {
            fonts.value = (nuxtApp.payload.data[key] || nuxtApp.static.data[key])?.items || [];
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          },
          onRequest() {
            isLoading.value = true;
          },
          onResponse({ response }) {
            isLoading.value = false;
            fonts.value = response?._data?.items || [];
          },
          onResponseError({ error }) {
            notification.error({
              message: error?.message || 'Could not fetch fonts',
            });
          },
        },
      );
    },
    { immediate: true },
  );

  watchDebounced(
    () => [sortStore.criteria, subsetStore.subset, filterStore.fontSize],
    () => {
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
