import type { FeatureLike } from 'ol/Feature';
import { Fill, Style, Text } from 'ol/style';
import type { TreeLocale } from '@/domain/tree/TreeLocale';

const ARCHAE_RANK_COLOR = '#aaddeef0';
const EUKARYOTE_RANK_COLOR = '#6599ffe0';
const BACTERIA_RANK_COLOR = '#ff8080e0';

const FILL_COLORS = [
  ARCHAE_RANK_COLOR,
  EUKARYOTE_RANK_COLOR,
  BACTERIA_RANK_COLOR,
  '#ffbe78e0',
  '#f5e178e0',
  '#be96e6e0',
  '#8cd296e0',
  '#f0a0c8e0',
  '#82c8d2e0',
  '#b4b4b4e0',
];

export function createRankLabelStyleFunction(lang: TreeLocale): (feature: FeatureLike) => Style {
  return function (feature) {
    const convex = feature.get('convex');
    // TODO: fix this ugly hack to avoid rank repeat
    const label = '            ' + feature.get(`rank_${lang}`) + '              ';
    const ref = feature.get('ref') as number;
    const colorIndex = Math.min(ref, FILL_COLORS.length) - 1;
    const text_color = FILL_COLORS[colorIndex];

    return new Style({
      text: new Text({
        font: 'bold 11px "Open Sans", "Roboto", "Arial Unicode MS", "Arial", "sans-serif"',
        placement: 'line',
        overflow: true,
        repeat: 2000,
        padding: [0, 2000, 0, 2000],
        textBaseline: convex < 0 ? 'top' : 'bottom',
        offsetY: convex < 0 ? -15 : 15,
        fill: new Fill({
          color: text_color,
        }),
        text: label,
      }),
    });
  };
}
