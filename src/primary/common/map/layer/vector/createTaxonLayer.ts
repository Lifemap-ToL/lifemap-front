import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { createTaxonStyleFunction } from '@/primary/common/map/style/createTaxonStyleFunction';

export function createTaxonLayer(): VectorLayer<VectorSource> {
  return new VectorLayer({
    source: new VectorSource(),
    style: createTaxonStyleFunction(),
    declutter: true,
  });
}
