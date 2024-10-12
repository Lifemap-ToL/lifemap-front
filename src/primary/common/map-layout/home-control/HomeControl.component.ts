import { Component, Prop, Vue } from 'vue-facing-decorator';
import { Map } from 'ol';
import { fromLonLat } from 'ol/proj';

@Component
export default class HomeControlComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly map!: Map;

  mapInitialCenter = [0, -5];
  mapInitialZoom = 5;

  zoomToInitialExtent() {
    this.map.getView().animate({ center: fromLonLat(this.mapInitialCenter), zoom: this.mapInitialZoom });
  }
}
