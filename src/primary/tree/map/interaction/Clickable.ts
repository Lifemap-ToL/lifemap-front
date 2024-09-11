import { Interaction } from 'ol/interaction';
import { Feature, Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

interface ClickableOptions {
  id: string;
  layers: VectorLayer<VectorSource>[];
}

export class Clickable extends Interaction {
  private readonly layers!: VectorLayer<VectorSource>[];

  constructor(options: ClickableOptions) {
    super();
    this.layers = options.layers;
    this.setProperties({ id: options.id });
    this.onPointerMove = this.onPointerMove.bind(this);
  }

  private layersHaveFeature(feature: Feature): boolean {
    return this.layers.reduce((hasFeature, layer) => hasFeature || layer.getSource()?.hasFeature(feature), false);
  }

  private getFeatureAtPixel(pixel: number[]): Feature | undefined {
    const options = { hitTolerance: 3 };
    const features = this.getMap()!.getFeaturesAtPixel(pixel, options);
    return features.find(feature => this.layersHaveFeature(feature as Feature)) as Feature;
  }

  private onPointerMove(event: PointerEvent) {
    this.hoveredFeature = this.getFeatureAtPixel(event.pixel);
    const cursor = this.hoveredFeature ? 'pointer' : '';
    this.getMap()!.getTargetElement().style.cursor = cursor;
  }

  setMap(map: Map) {
    super.setMap(map);
    map.on('pointermove', this.onPointerMove);
  }
}
