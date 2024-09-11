import { Component, Prop, Vue } from 'vue-facing-decorator';
import { Map } from 'ol';
import { Control } from 'ol/control';
import { HomeControlVue } from '@/primary/common/map-layout/home-control';
import { ZoomControlVue } from '@/primary/common/map-layout/zoom-control';

@Component({ components: { HomeControlVue, ZoomControlVue } })
export default class MapLayoutComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly map!: Map;

  controls: Control[] = [];

  mounted() {
    this.map.setTarget('map');
    this.controls = [
      new Control({ element: this.$refs['toolbar'] as HTMLElement }),
      new Control({ element: this.$refs['search-bar'] as HTMLElement }),
      new Control({ element: this.$refs['sidebar'] as HTMLElement }),
      new Control({ element: this.$refs['info-bar'] as HTMLElement }),
    ];
    this.controls.forEach(control => this.map.addControl(control));
  }

  unmounted() {
    // reset map
    this.controls.forEach(control => this.map.removeControl(control));
    this.map.setTarget(undefined);
  }
}
