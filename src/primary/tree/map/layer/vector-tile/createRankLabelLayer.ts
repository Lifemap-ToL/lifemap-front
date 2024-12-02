import VectorTileLayer from 'ol/layer/VectorTile';
import { MVT } from 'ol/format';
import VectorTileSource from 'ol/source/VectorTile';
import { createRankLabelStyleFunction } from '@/primary/tree/map/style/createRankLabelStyleFunction';

const TILES_URL = 'https://lifemap-back.univ-lyon1.fr/vector_tiles/xyz/ranks/{z}/{x}/{y}.pbf';

export function createRankLabelLayer(lang: 'en' | 'fr'): VectorTileLayer {
  return new VectorTileLayer({
    source: new VectorTileSource({
      maxZoom: 42,
      format: new MVT(),
      url: TILES_URL,
    }),
    style: createRankLabelStyleFunction(lang),
    declutter: true,
    renderMode: 'vector',
    renderBuffer: 256,
  });
}
