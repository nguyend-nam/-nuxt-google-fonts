import { notification } from 'ant-design-vue';
import { GOOGLE_FONTS_BASE_URL } from '~/constants/endpoints';
import type { FontItem, GetFontsResponse } from '~/types/fonts.type';

export const useFetchAllFontsV2 = async () => {
  const fonts = ref<FontItem[]>([]);
  const config = useRuntimeConfig();
  const isLoading = ref(false);

  await useFetch<GetFontsResponse>(
    `${GOOGLE_FONTS_BASE_URL}/webfonts?key=${config.public.apiKey}`,
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

  return { fonts, isLoading };
};
