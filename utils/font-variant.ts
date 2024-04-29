import { fontWeights } from '~/constants/font-weight';
import type { FontWeight } from '~/types/fonts.type';
import type { SelectedStyle, SelectedVariant } from '~/types/selected.type';

export const convertFontStyles = (styles: string[]): SelectedVariant[] => {
  return styles.map((style) => {
    const ital = style.endsWith('italic') ? '1' : '0';
    const wght =
      style === 'italic'
        ? '400'
        : (style.replace('italic', '').replace('regular', '400') as FontWeight);
    return { ital, wght };
  });
};

export const hasItalic = (styles: SelectedVariant[]) => {
  return styles.some((style) => style.ital === '1');
};

export const convertStylesToLink = (styles: SelectedStyle) => {
  const familiesLinkQuery = Object.keys(styles)
    .map((family) => {
      const variantsMap = hasItalic(styles[family]) ? 'ital,wght' : 'wght';
      const variants = styles[family]
        .map((variant) => {
          return hasItalic(styles[family]) ? `${variant.ital},${variant.wght}` : variant.wght;
        })
        .join(';');

      return `family=${family.replace(/ /g, '+')}:${variantsMap}@${variants}`;
    })
    .join('&');

  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${familiesLinkQuery}&display=swap" rel="stylesheet">`;
};

export const convertStylesToCSS = (
  family: string,
  variants: SelectedVariant[],
  category?: string,
) => {
  const classes = variants
    .map((variant) => {
      const className = `${family.replace(/ /g, '-')}-${fontWeights[variant.wght as FontWeight]}${variant.ital === '1' ? '-italic' : ''}`;

      const styling = `.${className.replace(/ /g, '').toLowerCase()} {
  font-family: "${family}"${category ? `, ${category}` : ''};
  font-weight: ${variant.wght};
  font-style: ${variant.ital === '1' ? 'italic' : 'normal'};
}`;
      return styling;
    })
    .join('\n\n');

  return classes;
};
