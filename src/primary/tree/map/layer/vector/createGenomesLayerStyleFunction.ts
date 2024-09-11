import { type StyleFunction } from 'ol/style/Style';
import { type FeatureLike } from 'ol/Feature';
import { Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { Fill, Stroke } from 'ol/style';

const MIN_RADIUS = 1.5;

export function createGenomesLayerStyleFunction(strokeColor: number[]): StyleFunction {
  return function (feature: FeatureLike): Style {
    const radius = 0.6 * Math.sqrt(feature.get('weight')) + MIN_RADIUS;
    return new Style({
      image: new CircleStyle({
        radius,
        fill: new Fill({ color: [255, 255, 255, 1] }),
        stroke: new Stroke({ width: 1, color: strokeColor }),
      }),
    });
  };
}
