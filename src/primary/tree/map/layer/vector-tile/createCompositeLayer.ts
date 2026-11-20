import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import { MVT } from 'ol/format';
import type { View } from 'ol';
import { createCompositeStyleFunction } from '../../style/createCompositeStyleFunction';
import type { TreeLocale } from '@/domain/tree/TreeLocale';

const TILES_URL = import.meta.env.VITE_LIFEMAP_API_BASE_URL + '/vector_tiles/xyz/composite/{z}/{x}/{y}.pbf';
const BACKGROUND_COLOR = '#000';

class CurrentZoomVectorTileSource extends VectorTileSource {
  private renderZoom_: number;

  constructor(options: ConstructorParameters<typeof VectorTileSource>[0], renderZoom: number) {
    super(options);
    this.renderZoom_ = renderZoom;
  }

  setRenderZoom(renderZoom: number): void {
    this.renderZoom_ = renderZoom;
  }

  override forEachLoadedTile(
    ...args: Parameters<VectorTileSource['forEachLoadedTile']>
  ): ReturnType<VectorTileSource['forEachLoadedTile']> {
    const [projection, zoom, tileRange, callback] = args;
    return Math.abs(zoom - this.renderZoom_) <= 1 ? super.forEachLoadedTile(projection, zoom, tileRange, callback) : false;
  }
}

export function createCompositeLayer(view: View, preservePerformance: boolean, lang: TreeLocale): VectorTileLayer {
  const source = new CurrentZoomVectorTileSource(
    {
      maxZoom: 42,
      format: new MVT(),
      url: TILES_URL,
      transition: 100,
    },
    0
  );

  const updateRenderZoom = () => {
    const tileGrid = source.getTileGridForProjection(view.getProjection());
    source.setRenderZoom(tileGrid.getZForResolution(view.getResolution(), source.zDirection));
  };
  updateRenderZoom();
  view.on('change:resolution', updateRenderZoom);

  return new VectorTileLayer({
    background: BACKGROUND_COLOR,
    source,
    style: createCompositeStyleFunction(view, preservePerformance, lang),
    declutter: true,
    renderMode: 'vector',
    updateWhileAnimating: !preservePerformance,
    updateWhileInteracting: !preservePerformance,
    renderBuffer: 256,
    preload: Infinity,
  });
}
