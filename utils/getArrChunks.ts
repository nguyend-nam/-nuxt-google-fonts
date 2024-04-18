import type { FontItem } from '~/types/fonts.type';

export const getArrChunks = function (arr: FontItem[], n: number) {
  const ret = [];

  for (let i = 0; i < arr.length; i += n) {
    ret.push(arr.slice(i, i + n));
  }

  return ret;
};
