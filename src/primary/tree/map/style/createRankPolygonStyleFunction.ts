import type { FeatureLike } from 'ol/Feature';
import { Fill, Style } from 'ol/style';
import type { View } from 'ol';

const ARCHAE_FILL_COLOR = [170, 255, 238, 0.2];
const EUKARYOTES_FILL_COLOR = [101, 153, 255, 0.23];
const BACTERIA_FILL_COLOR = [255, 128, 128, 0.18];

const FILL_COLORS = [
  ARCHAE_FILL_COLOR,
  EUKARYOTES_FILL_COLOR,
  BACTERIA_FILL_COLOR,
  [255, 190, 120, 0.2],
  [245, 225, 120, 0.2],
  [190, 150, 230, 0.2],
  [140, 210, 150, 0.2],
  [240, 160, 200, 0.2],
  [130, 200, 210, 0.2],
  [180, 180, 180, 0.2],
];

function computeOpacity(view: View, feature: FeatureLike): number {
  const currentZoom = view.getZoom();
  const zoomLevel = feature.get('zoomview');
  return currentZoom !== undefined ? 1 - Math.abs(currentZoom - zoomLevel - 1) / 5 : 1;
}

export function createRankPolygonStyleFunction(view: View, preservePerformance: boolean): (feature: FeatureLike) => Style {
  return function (feature: FeatureLike): Style {
    const ref = feature.get('ref') as number;
    const colorIndex = Math.min(ref, FILL_COLORS.length) - 1;
    const themeColor = FILL_COLORS[colorIndex];

    const fillColor = preservePerformance
      ? themeColor
      : [themeColor[0], themeColor[1], themeColor[2], themeColor[3] * computeOpacity(view, feature)];

    return new Style({
      fill: new Fill({ color: fillColor }),
      zIndex: 1,
    });
  };
}
