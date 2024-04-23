import type { FontWeight } from './fonts.type';

export interface SelectedVariant {
  ital: '0' | '1';
  wght: FontWeight;
}

export interface SelectedStyle extends Record<string, SelectedVariant[]> {}
