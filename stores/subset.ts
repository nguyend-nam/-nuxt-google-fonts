import type { SUBSETS } from '~/constants/subset';

export const useSubset = defineStore('subset', {
  state: () => ({
    subset: 'all-languages' as keyof typeof SUBSETS,
  }),
  actions: {
    setSubset(subset: keyof typeof SUBSETS) {
      this.subset = subset;
    },
  },
});
