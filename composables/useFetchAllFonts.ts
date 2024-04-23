import { notification } from 'ant-design-vue';
import { GOOGLE_FONTS_BASE_URL } from '~/constants/endpoints';
import type { FontItem, GetFontsResponse } from '~/types/fonts.type';

export const useFetchAllFonts = async () => {
  const fonts = ref<FontItem[]>([]);
  const config = useRuntimeConfig();
  const isLoading = ref(false);

  try {
    isLoading.value = true;
    const res: GetFontsResponse = await $fetch(
      `${GOOGLE_FONTS_BASE_URL}/webfonts?key=${config.public.apiKey}`,
    );
    fonts.value = res?.items;
  } catch (error) {
    notification.error({
      message: 'Could not fetch fonts',
    });
  } finally {
    isLoading.value = false;
  }

  return { fonts, isLoading };
};
