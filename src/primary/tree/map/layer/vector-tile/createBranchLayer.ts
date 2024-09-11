import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MVT } from 'ol/format';
import { createBranchStyle } from '@/primary/tree/map/style/createBranchStyle';

const TILES_URL = 'https://lifemap-back.univ-lyon1.fr/vector_tiles/xyz/branches/{z}/{x}/{y}.pbf';

export function createBranchLayer(): VectorTileLayer {
  return new VectorTileLayer({
    source: new VectorTileSource({ maxZoom: 42, format: new MVT(), url: TILES_URL }),
    style: createBranchStyle(),
    declutter: true,
    renderMode: 'vector',
  });
}
