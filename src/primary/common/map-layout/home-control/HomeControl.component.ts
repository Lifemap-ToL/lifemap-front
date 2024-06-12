import { Component, Prop, toNative, Vue } from 'vue-facing-decorator';
import { Map } from 'ol';
import { type Coordinate } from 'ol/coordinate';

@Component
export default class HomeControlComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly map!: Map;

  mapInitialCenter!: Coordinate;
  mapInitialZoom!: number;

  created() {
    this.mapInitialCenter = this.map.getView().getCenter()!;
    this.mapInitialZoom = this.map.getView().getZoom()!;
  }

  zoomToInitialExtent() {
    this.map.getView().animate({ center: this.mapInitialCenter, zoom: this.mapInitialZoom });
  }
}
