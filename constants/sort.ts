import type { SortCriteria } from '~/types/sort.type';

export const SORT_CRITERIA: Record<SortCriteria, string> = {
  alpha: 'Name',
  date: 'Newest',
  trending: 'Trending',
  popularity: 'Most popular',
};
