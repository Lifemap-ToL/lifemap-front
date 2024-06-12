import type { Feature } from 'ol';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { createTaxonNameText } from '@/primary/common/map/style/text/createTaxonNameText';
import { createSequencedGenomesStyle } from '@/primary/common/map/style/createSequencedGenomesStyle';

const CIRCLE_RADIUS = 5;
const CIRCLE_FILL_COLOR = 'rgba(255, 20, 147, 0.8)';
const CIRCLE_STROKE_WIDTH = 2;
const CIRCLE_STROKE_COLOR = 'rgba(255, 255, 255, 0.8)';

export function createTaxonStyleFunction(): (feature: Feature, resolution: number) => Style[] {
  return (feature: Feature) => {
    const taxonStyle = new Style({
      image: new CircleStyle({
        radius: CIRCLE_RADIUS,
        fill: new Fill({ color: CIRCLE_FILL_COLOR }),
        stroke: new Stroke({ width: CIRCLE_STROKE_WIDTH, color: CIRCLE_STROKE_COLOR }),
        declutterMode: 'none',
      }),
      text: createTaxonNameText(feature.get('name'), feature.get('labelFontSize'), feature.get('commonName')),
      zIndex: -feature.get('zoomLevel'),
    });

    return feature.get('sequencedGenomes') ? [taxonStyle, createSequencedGenomesStyle(feature)] : [taxonStyle];
  };
}
