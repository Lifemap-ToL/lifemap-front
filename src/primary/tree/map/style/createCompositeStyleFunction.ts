import type { FeatureLike } from 'ol/Feature';
import { Style } from 'ol/style';
import type { View } from 'ol';
import { createRankPolygonStyleFunction } from './createRankPolygonStyleFunction';
import { createBranchStyle } from './createBranchStyle';
import { createRankLabelStyleFunction } from './createRankLabelStyleFunction';

export function createCompositeStyleFunction(view: View, lang: 'en' | 'fr'): (feature: FeatureLike) => Style {
  const rankPolygonStyleFunction = createRankPolygonStyleFunction(view);
  const branchStyle = createBranchStyle();
  const rankLabelStyleFunction = createRankLabelStyleFunction(lang);

  return function (feature: FeatureLike): Style {
    const layer = feature.getProperties()['layer'];
    return layer == 'poly-layer'
      ? rankPolygonStyleFunction(feature)
      : layer == 'branches-layer'
      ? branchStyle
      : layer == 'ranks-layer'
      ? rankLabelStyleFunction(feature)
      : new Style();
  };
}
