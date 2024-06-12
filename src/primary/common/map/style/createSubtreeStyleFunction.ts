import { Circle, Fill, Stroke, Style } from 'ol/style';
import { LineString, Point } from 'ol/geom';
import { Feature } from 'ol';

const SUBTREE_COLOR = 'rgba(0, 255, 255, 1)';

const LEAF_CIRCLE = new Circle({
  radius: 10,
  fill: new Fill({ color: SUBTREE_COLOR }),
});

const BRANCH_STYLE = new Style({ stroke: new Stroke({ width: 4, color: SUBTREE_COLOR }) });

export function createSubtreeStyleFunction(): (feature: Feature<LineString>) => Style[] {
  return function (feature: Feature<LineString>): Style[] {
    const coordinates = feature.getGeometry()!.getCoordinates();
    const leafPoint = new Point(coordinates[0]);
    const leafStyle = new Style({ geometry: leafPoint, image: LEAF_CIRCLE });
    return [BRANCH_STYLE, leafStyle];
  };
}
