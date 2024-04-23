import { SELECTED_KEY } from '~/constants/selected';
import type { SelectedStyle, SelectedVariant } from '~/types/selected.type';

export const useSelected = defineStore('selected', () => {
  const selected = ref<SelectedStyle>({});

  watchEffect(() => {
    const saved = localStorage.getItem(SELECTED_KEY);
    if (saved) {
      selected.value = JSON.parse(saved);
    }
  });

  const isStored = (family: string) => {
    return family in selected.value;
  };

  const addSelectedStyle = (family: string, variants: SelectedVariant[]) => {
    if (!isStored(family)) {
      const newSelected = Object.assign(selected.value, { [family]: variants });
      localStorage.setItem(SELECTED_KEY, JSON.stringify(newSelected));
    }
  };

  const removeSelectedStyle = (family: string) => {
    if (isStored(family)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete selected.value[family];
    }
    localStorage.setItem(SELECTED_KEY, JSON.stringify(selected.value));
  };

  return {
    selected,
    isStored,
    addSelectedStyle,
    removeSelectedStyle,
  };
});
