import { FONT_WEIGHTS, fontWeights } from '~/constants/font-weight';
import type { FontWeight } from '~/types/fonts.type';

export const getFontWeight = (weight: FontWeight) => {
  if (FONT_WEIGHTS.includes(weight)) {
    return fontWeights[weight];
  }

  return '';
};
