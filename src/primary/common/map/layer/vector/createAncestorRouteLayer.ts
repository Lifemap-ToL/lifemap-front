import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createAncestorRouteStyleFunction } from '@/primary/common/map/style/createAncestorRouteStyleFunction';

export function createAncestorRouteLayer(): VectorLayer<VectorSource> {
  return new VectorLayer({
    source: new VectorSource(),
    style: createAncestorRouteStyleFunction(),
  });
}
