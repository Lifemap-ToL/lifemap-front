import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

const OUTER_CIRCLE_RADIUS = 24;
const OUTER_CIRCLE_STROKE_WIDTH = 6;
const OUTER_CIRCLE_STROKE_COLOR = 'rgba(30, 255, 20, 0.7)';

const INNER_CIRCLE_RADIUS = 5;
const INNER_CIRCLE_FILL_COLOR = 'rgba(30, 255, 20, 1)';
const INNER_CIRCLE_STROKE_WIDTH = 2;
const INNER_CIRCLE_STROKE_COLOR = 'rgba(255, 255, 255, 1)';

export function createSelectedLUCAStyle() {
  return [
    new Style({
      image: new CircleStyle({
        radius: OUTER_CIRCLE_RADIUS,
        stroke: new Stroke({ width: OUTER_CIRCLE_STROKE_WIDTH, color: OUTER_CIRCLE_STROKE_COLOR }),
        declutterMode: 'none',
      }),
    }),
    new Style({
      image: new CircleStyle({
        radius: INNER_CIRCLE_RADIUS,
        fill: new Fill({ color: INNER_CIRCLE_FILL_COLOR }),
        stroke: new Stroke({ width: INNER_CIRCLE_STROKE_WIDTH, color: INNER_CIRCLE_STROKE_COLOR }),
        declutterMode: 'none',
      }),
    }),
  ];
}
