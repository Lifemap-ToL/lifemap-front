import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createSubtreeStyleFunction } from '@/primary/tree/map/style/createSubtreeStyleFunction';

export function createSubtreeLayer(): VectorLayer<VectorSource> {
  return new VectorLayer({
    source: new VectorSource(),
    style: createSubtreeStyleFunction(),
  });
}
