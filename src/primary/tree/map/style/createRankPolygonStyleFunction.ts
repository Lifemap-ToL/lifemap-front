import type { FeatureLike } from 'ol/Feature';
import { Fill, Style } from 'ol/style';
import type { View } from 'ol';

const ARCHAE_FILL_COLOR = 'rgba(170, 255, 238, 0.12)';
const EUKARYOTES_FILL_COLOR = 'rgba(101, 153, 255, 0.15)';
const BACTERIA_FILL_COLOR = 'rgba(255, 128, 128, 0.1)';

const FILL_COLORS: Record<number, string> = {
  1: ARCHAE_FILL_COLOR,
  2: EUKARYOTES_FILL_COLOR,
  3: BACTERIA_FILL_COLOR,
};

export function createRankPolygonStyleFunction(view: View): (feature: FeatureLike, resolution: number, context: any) => Style {
  return function (feature: FeatureLike): Style {
    const fillColor = FILL_COLORS[feature.get('ref') as number];
    return new Style({
      fill: new Fill({ color: fillColor }),
      zIndex: 1,
    });
  };
}
