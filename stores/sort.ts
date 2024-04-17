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
