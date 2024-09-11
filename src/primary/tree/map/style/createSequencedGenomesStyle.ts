import { type FeatureLike } from 'ol/Feature';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

const MIN_RADIUS = 8;
const CIRCLE_FILL_COLOR = [0, 97, 250];
const CIRCLE_STROKE_COLOR = [0, 97, 250];

export function createSequencedGenomesStyle(feature: FeatureLike, opacity = 0.3): Style {
  const radius = 0.4 * Math.sqrt(feature.get('sequencedGenomes')) + MIN_RADIUS;
  return new Style({
    image: new CircleStyle({
      radius,
      fill: new Fill({ color: [...CIRCLE_FILL_COLOR, opacity] }),
      stroke: new Stroke({ width: 2, color: [...CIRCLE_STROKE_COLOR, opacity + 0.2] }),
      declutterMode: 'none',
    }),
    zIndex: -100,
  });
}
