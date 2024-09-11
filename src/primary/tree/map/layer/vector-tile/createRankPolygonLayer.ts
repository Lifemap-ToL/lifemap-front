import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MVT } from 'ol/format';
import { createRankPolygonStyleFunction } from '@/primary/tree/map/style/createRankPolygonStyleFunction';

const BACKGROUND_COLOR = '#000';
const TILES_URL = 'https://lifemap-back.univ-lyon1.fr/vector_tiles/xyz/polygons/{z}/{x}/{y}.pbf';

export function createRankPolygonLayer(): VectorTileLayer {
  return new VectorTileLayer({
    background: BACKGROUND_COLOR,
    source: new VectorTileSource({
      maxZoom: 42,
      format: new MVT(),
      url: TILES_URL,
    }),
    style: createRankPolygonStyleFunction(),
    declutter: false,
    renderMode: 'vector',
  });
}
