import { Component, Prop, toNative, Vue } from 'vue-facing-decorator';
import { Map } from 'ol';
import { Control } from 'ol/control';
import { HomeControlVue } from '@/primary/common/map-layout/home-control';
import { ZoomControlVue } from '@/primary/common/map-layout/zoom-control';

@Component({ components: { HomeControlVue, ZoomControlVue } })
export default class MapLayoutComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly map!: Map;

  mounted() {
    this.map.setTarget('map');
    this.map.addControl(new Control({ element: this.$refs['toolbar'] as HTMLElement }));
    this.map.addControl(new Control({ element: this.$refs['search-bar'] as HTMLElement }));
    this.map.addControl(new Control({ element: this.$refs['sidebar'] as HTMLElement }));
    this.map.addControl(new Control({ element: this.$refs['info-bar'] as HTMLElement }));
  }

  unmounted() {
    // reset map
    this.map.setTarget(undefined);
  }
}
