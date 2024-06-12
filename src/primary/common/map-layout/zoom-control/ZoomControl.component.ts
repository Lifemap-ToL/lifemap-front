import { Component, Prop, toNative, Vue } from 'vue-facing-decorator';
import { Map } from 'ol';

const ANIMATION_DURATION = 250;

@Component
export default class ZoomControlComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly map!: Map;

  disableZoomIn = false;
  disableZoomOut = false;

  created() {
    this.map.on('moveend', this.onMoveEnd);
  }

  unmounted() {
    this.map.un('moveend', this.onMoveEnd);
  }

  zoomIn() {
    const view = this.map.getView();
    view.animate({ zoom: view.getZoom()! + 1, duration: ANIMATION_DURATION });
  }

  zoomOut() {
    const view = this.map.getView();
    view.animate({ zoom: view.getZoom()! + -1, duration: ANIMATION_DURATION });
  }

  onMoveEnd() {
    const view = this.map.getView();
    this.disableZoomIn = view.getZoom()! >= view.getMaxZoom();
    this.disableZoomOut = view.getZoom()! <= view.getMinZoom();
  }
}
