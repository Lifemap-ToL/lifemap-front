import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MVT } from 'ol/format';
import type { View } from 'ol';
import { createCompositeStyleFunction } from '../../style/createCompositeStyleFunction';

const BACKGROUND_COLOR = '#000';
const TILES_URL = 'https://lifemap-back.univ-lyon1.fr/vector_tiles/xyz/composite/{z}/{x}/{y}.pbf';

export function createCompositeLayer(view: View, lang: 'en' | 'fr'): VectorTileLayer {
  return new VectorTileLayer({
    background: BACKGROUND_COLOR,
    source: new VectorTileSource({
      maxZoom: 42,
      format: new MVT(),
      url: TILES_URL,
      transition: 100,
    }),
    style: createCompositeStyleFunction(view, lang),
    declutter: true,
    renderMode: 'vector',
    updateWhileAnimating: true,
    updateWhileInteracting: true,
    renderBuffer: 256,
    preload: Infinity,
  });
}
