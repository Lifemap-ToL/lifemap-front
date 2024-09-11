import { Feature } from 'ol';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { LineString, Point } from 'ol/geom';

const INNER_CIRCLE = new Circle({
  radius: 5,
  fill: new Fill({ color: 'rgba(255, 20, 147, 1)' }),
  stroke: new Stroke({ width: 2, color: 'rgba(255, 255, 255, 0.8)' }),
});

const START_OUTER_CIRCLE = new Circle({
  radius: 18,
  fill: new Fill({ color: 'rgba(30, 255, 20, 0.4)' }),
  stroke: new Stroke({ width: 2, color: 'rgba(30, 255, 20, 1)' }),
});

const END_OUTER_CIRCLE = new Circle({
  radius: 18,
  fill: new Fill({ color: 'rgba(255, 69, 0, 0.4)' }),
  stroke: new Stroke({ width: 2, color: 'rgba(255, 69, 0, 1)' }),
});

const ANCESTOR_OUTER_CIRCLE = new Circle({
  radius: 18,
  fill: new Fill({ color: 'rgba(255, 20, 147, 0.4)' }),
  stroke: new Stroke({ width: 2, color: 'rgba(255, 20, 147, 1)' }),
});

const LINE_STYLE = new Style({ stroke: new Stroke({ width: 4, color: 'rgba(255, 20, 147, 0.7)' }) });

function createExtremesStyles(startPoint: Point, endPoint: Point): Style[] {
  const startInnerCircleStyle = new Style({
    geometry: startPoint,
    image: INNER_CIRCLE,
  });

  const startOuterCircleStyle = new Style({
    geometry: startPoint,
    image: START_OUTER_CIRCLE,
  });

  const endInnerCircleStyle = new Style({
    geometry: endPoint,
    image: INNER_CIRCLE,
  });

  const endOuterCircleStyle = new Style({
    geometry: endPoint,
    image: END_OUTER_CIRCLE,
  });

  return [startOuterCircleStyle, startInnerCircleStyle, endOuterCircleStyle, endInnerCircleStyle];
}

function createAncestorStyles(ancestorPoint: Point): Style[] {
  const ancestorInnerCircleStyle = new Style({
    geometry: ancestorPoint,
    image: INNER_CIRCLE,
  });

  const ancestorOuterCircleStyle = new Style({
    geometry: ancestorPoint,
    image: ANCESTOR_OUTER_CIRCLE,
  });

  return [ancestorOuterCircleStyle, ancestorInnerCircleStyle];
}

export function createAncestorRouteStyleFunction(): (feature: Feature<LineString>) => Style[] {
  return (feature: Feature<LineString>): Style[] => {
    let styles = [LINE_STYLE];
    const coordinates = feature.getGeometry()!.getCoordinates();

    if (coordinates.length > 0) {
      const startPoint = new Point(coordinates[0]);
      const endPoint = new Point(coordinates[coordinates.length - 1]);
      const ancestorPoint = new Point(coordinates[feature.get('ancestorIndex')]);
      styles = [...createExtremesStyles(startPoint, endPoint), ...styles];

      if (coordinates.length - 1 !== feature.get('ancestorIndex')) {
        styles = [...styles, ...createAncestorStyles(ancestorPoint)];
      }
    }

    return styles;
  };
}
