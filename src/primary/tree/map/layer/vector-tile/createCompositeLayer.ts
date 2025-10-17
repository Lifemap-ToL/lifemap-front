import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MVT } from 'ol/format';
import type { View } from 'ol';
import { createCompositeStyleFunction } from '../../style/createCompositeStyleFunction';

const TILES_URL = import.meta.env.VITE_LIFEMAP_API_BASE_URL + '/vector_tiles/xyz/composite/{z}/{x}/{y}.pbf';
const BACKGROUND_COLOR = '#000';

export function createCompositeLayer(view: View, preservePerformance: boolean, lang: 'en' | 'fr'): VectorTileLayer {
  return new VectorTileLayer({
    background: BACKGROUND_COLOR,
    source: new VectorTileSource({
      maxZoom: 42,
      format: new MVT(),
      url: TILES_URL,
      transition: 100,
    }),
    style: createCompositeStyleFunction(view, preservePerformance, lang),
    declutter: true,
    renderMode: 'vector',
    updateWhileAnimating: !preservePerformance,
    updateWhileInteracting: !preservePerformance,
    renderBuffer: 256,
    preload: Infinity,
  });
}
