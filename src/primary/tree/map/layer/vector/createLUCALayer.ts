import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { fromLonLat } from 'ol/proj';

const CIRCLE_RADIUS = 5;
const CIRCLE_FILL_COLOR = 'rgba(255, 20, 147, 0.8)';
const CIRCLE_STROKE_WIDTH = 2;
const CIRCLE_STROKE_COLOR = 'rgba(255, 255, 255, 0.8)';

const lucaStyle = new Style({
  image: new CircleStyle({
    radius: CIRCLE_RADIUS,
    fill: new Fill({ color: CIRCLE_FILL_COLOR }),
    stroke: new Stroke({ width: CIRCLE_STROKE_WIDTH, color: CIRCLE_STROKE_COLOR }),
    declutterMode: 'none',
  }),
});

const lucaFeature = new Feature(new Point(fromLonLat([0, -4.226497])));

export function createLUCALayer(): VectorLayer<VectorSource> {
  return new VectorLayer({
    source: new VectorSource({ features: [lucaFeature] }),
    style: lucaStyle,
    declutter: true,
  });
}
