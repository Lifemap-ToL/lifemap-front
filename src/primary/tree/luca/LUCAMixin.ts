import type { Select } from '@/primary/tree/map/interaction/Select';
import { Component, Inject, Vue } from 'vue-facing-decorator';
import { markRaw } from 'vue';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { LUCAModalVue } from '@/primary/tree/luca/luca-modal';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import type { Taxon } from '@/domain/taxon/Taxon';
import Map from 'ol/Map';

const MOBILE_MAX_WIDTH = 650;

@Component
export class LUCAMixin extends Vue {
  @Inject()
  readonly map!: () => Map;

  @Inject()
  private lucaLayer!: () => VectorLayer<VectorSource<Point>>;

  @Inject()
  readonly modalBus!: () => MittModalBus;

  @Inject()
  private globalWindow!: () => Window;

  lucaSource!: VectorSource<Point>;
  lucaSelect!: Select;

  lucaSelected = false;

  created() {
    this.lucaSource = this.lucaLayer().getSource()!;
    this.lucaSelect = this.map().getInteractions().item(1) as Select;
    this.lucaSelect.on('select', this.onSelectLUCA);
    this.lucaSelect.on('unselect', this.onUnselectLUCA);
  }

  mounted() {
    this.map().once('change:target', () => {
      this.map()
        .getOverlayById('luca-tooltip')
        .setElement((this.$refs['luca-tooltip']! as any).$el);
    });
  }

  unmounted() {
    this.lucaSelect.un('select', this.onSelectLUCA);
    this.lucaSelect.un('unselect', this.onUnselectLUCA);
  }

  private mobile() {
    return this.globalWindow().document.body.clientWidth < MOBILE_MAX_WIDTH;
  }

  private onUnselectLUCA() {
    this.lucaSelected = false;
  }

  private onSelectLUCA() {
    if (this.mobile()) {
      this.openLUCAModal();
      return;
    }
    this.lucaSelected = true;
  }

  public selectLUCA() {
    this.lucaSelect.select(this.lucaSource.getFeatures()[0]);
  }

  public unselectLUCA() {
    this.lucaSelect.unselect();
  }

  private openLUCAModal() {
    this.modalBus().open({
      component: markRaw(LUCAModalVue),
      props: { onClose: () => this.unselectLUCA() },
    });
  }
}
