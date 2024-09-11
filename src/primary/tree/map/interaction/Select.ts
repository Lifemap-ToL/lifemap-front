import { Interaction } from 'ol/interaction';
import { Feature, Map, Overlay } from 'ol';
import { Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import type { StyleLike } from 'ol/style/Style';

interface SelectOptions {
  id: string;
  layer: VectorLayer<VectorSource>;
  selectedStyle: StyleLike;
  selectableStyle: StyleLike;
  overlay: Overlay;
}

export class Select extends Interaction {
  private readonly selectedStyle!: Style | StyleLike;
  private readonly selectableStyle!: Style | StyleLike;
  private readonly layer!: VectorLayer<VectorSource>;
  private readonly overlay!: Overlay;
  private clickedFeature?: Feature;
  private hoveredFeature?: Feature;
  private lastSelectedFeature?: Feature;
  private selectedFeature?: Feature;
  private lastSelectableFeature?: Feature;
  private selectableFeature?: Feature;

  constructor(options: SelectOptions) {
    super();
    this.selectedStyle = options.selectedStyle;
    this.selectableStyle = options.selectableStyle;
    this.layer = options.layer;
    this.overlay = options.overlay;
    this.setProperties({ id: options.id });
    this.onClick = this.onClick.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
  }

  private sameFeatures(feature1?: Feature, feature2?: Feature): boolean {
    return feature1 !== undefined && feature2 !== undefined && feature1.getId() === feature2.getId();
  }

  private updateSelectedFeature() {
    this.lastSelectedFeature = this.selectedFeature;
    this.selectedFeature = this.sameFeatures(this.clickedFeature, this.selectedFeature) ? undefined : this.clickedFeature;
  }

  private updateSelectedStyles() {
    if (this.lastSelectedFeature) {
      this.lastSelectedFeature.setStyle(undefined);
    }

    if (this.selectedFeature) {
      this.selectedFeature.setStyle(this.selectedStyle);
    }
  }

  private dispatchSelectEvents() {
    if (this.lastSelectedFeature) {
      this.dispatchEvent({ type: 'unselect', feature: this.lastSelectedFeature } as any);
    }

    if (this.selectedFeature) {
      this.dispatchEvent({ type: 'select', feature: this.selectedFeature } as any);
    }
  }

  private getFeatureAtPixel(pixel: number[]): Feature | undefined {
    const options = { hitTolerance: 3 };
    const features = this.getMap()!.getFeaturesAtPixel(pixel, options);
    return features.find(feature => this.layer.getSource()?.hasFeature(feature as Feature)) as Feature;
  }

  private onClick(event: any) {
    this.clickedFeature = this.getFeatureAtPixel(event.pixel);
    this.updateSelectedFeature();
    this.updateSelectedStyles();
    this.dispatchSelectEvents();
  }

  private updateSelectableFeature() {
    this.lastSelectableFeature = this.selectableFeature;
    this.selectableFeature = this.hoveredFeature;
  }

  private updateSelectableStyles() {
    if (!this.sameFeatures(this.lastSelectableFeature, this.selectedFeature) && this.lastSelectableFeature) {
      this.lastSelectableFeature.setStyle(undefined);
    }

    if (!this.sameFeatures(this.selectableFeature, this.selectedFeature) && this.selectableFeature) {
      this.selectableFeature.setStyle(this.selectableStyle);
    }
  }

  private dispatchSelectableEvents(coordinates: number[]) {
    if (this.lastSelectableFeature) {
      this.dispatchEvent({ type: 'unselectable', feature: this.lastSelectableFeature } as any);
    }

    if (this.selectableFeature) {
      this.dispatchEvent({ type: 'selectable', feature: this.selectableFeature, coordinates } as any);
    }
  }

  onPointerMove(event: any): void {
    this.hoveredFeature = this.getFeatureAtPixel(event.pixel);

    if (!this.sameFeatures(this.hoveredFeature, this.selectableFeature)) {
      this.updateSelectableFeature();
      this.updateSelectableStyles();
      this.dispatchSelectableEvents(this.getMap()!.getCoordinateFromPixel(event.pixel));

      const position = this.selectableFeature ? this.selectableFeature.getGeometry()!.getCoordinates() : undefined;

      if (this.overlay) {
        this.overlay.setPosition(position);
      }
    }
  }

  unselect(silent: boolean = false) {
    this.lastSelectedFeature = this.selectedFeature;
    this.selectedFeature = undefined;
    this.updateSelectedStyles();

    if (!silent) {
      this.dispatchSelectEvents();
    }
  }

  select(feature: Feature, silent: boolean = false) {
    this.lastSelectedFeature = this.selectedFeature;
    this.selectedFeature = feature;
    this.updateSelectedStyles();

    if (!silent) {
      this.dispatchSelectEvents();
    }
  }

  setMap(map: Map) {
    super.setMap(map);
    map.on('singleclick', this.onClick);
    map.on('pointermove', this.onPointerMove);
  }
}
