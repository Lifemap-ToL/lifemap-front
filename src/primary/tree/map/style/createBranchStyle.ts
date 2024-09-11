import { Stroke, Style } from 'ol/style';

const BRANCH_STROKE_COLOR = '#cacaca';
const BRANCH_WIDTH = 0.8;

export function createBranchStyle(): Style {
  return new Style({
    stroke: new Stroke({ color: BRANCH_STROKE_COLOR, width: BRANCH_WIDTH }),
    zIndex: 6,
  });
}
