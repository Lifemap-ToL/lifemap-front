import type { FeatureLike } from 'ol/Feature';
import { Fill, Style } from 'ol/style';
import type { View } from 'ol';

const ARCHAE_FILL_COLOR = [170, 255, 238, 0.2];
const EUKARYOTES_FILL_COLOR = [101, 153, 255, 0.23];
const BACTERIA_FILL_COLOR = [255, 128, 128, 0.18];

const FILL_COLORS: Record<number, Array<number>> = {
  1: ARCHAE_FILL_COLOR,
  2: EUKARYOTES_FILL_COLOR,
  3: BACTERIA_FILL_COLOR,
};

function computeOpacity(view: View, feature: FeatureLike): number {
  const currentZoom = view.getZoom();
  const zoomLevel = feature.get('zoomview');
  return currentZoom !== undefined ? 1 - Math.abs(currentZoom - zoomLevel - 1) / 5 : 1;
}

export function createRankPolygonStyleFunction(view: View, preservePerformance: boolean): (feature: FeatureLike) => Style {
  return function (feature: FeatureLike): Style {
    const themeColor = FILL_COLORS[feature.get('ref') as number];

    const fillColor = preservePerformance
      ? themeColor
      : [themeColor[0], themeColor[1], themeColor[2], themeColor[3] * computeOpacity(view, feature)];

    return new Style({
      fill: new Fill({ color: fillColor }),
      zIndex: 1,
    });
  };
}
