import type { FeatureLike } from 'ol/Feature';
import { Fill, Style, Text } from 'ol/style';

const ARCHAE_RANK_COLOR = '#aaddeef0';
const EUKARYOTE_RANK_COLOR = '#6599ffe0';
const BACTERIA_RANK_COLOR = '#ff8080e0';

const FILL_COLORS: Record<number, string> = {
  1: ARCHAE_RANK_COLOR,
  2: EUKARYOTE_RANK_COLOR,
  3: BACTERIA_RANK_COLOR,
};

export function createRankLabelStyleFunction(lang: 'en' | 'fr'): (feature: FeatureLike) => Style {
  return function (feature) {
    const convex = feature.get('convex');
    // TODO: fix this ugly hack to avoid rank repeat
    const label = '            ' + feature.get(`rank_${lang}`) + '              ';
    const text_color = FILL_COLORS[feature.get('ref')];

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
