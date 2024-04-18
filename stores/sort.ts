import type { SortCriteria } from '~/types/sort.type';

export const useSort = defineStore('sort', {
  state: () => ({
    criteria: 'trending' as SortCriteria,
  }),
  actions: {
    setCriteria(criteria: SortCriteria) {
      this.criteria = criteria;
    },
  },
});
