import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

const CIRCLE_RADIUS = 6;
const CIRCLE_FILL_COLOR = 'rgba(255, 20, 147, 0.8)';
const CIRCLE_STROKE_WIDTH = 3;
const CIRCLE_STROKE_COLOR = 'rgba(255, 255, 255, 1)';

export function createSelectableLUCAStyle() {
  return new Style({
    image: new CircleStyle({
      radius: CIRCLE_RADIUS,
      fill: new Fill({ color: CIRCLE_FILL_COLOR }),
      stroke: new Stroke({ width: CIRCLE_STROKE_WIDTH, color: CIRCLE_STROKE_COLOR }),
      declutterMode: 'none',
    }),
  });
}
