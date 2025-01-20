import type { Select } from '@/primary/tree/map/interaction/Select';
import { Component, Inject, Vue } from 'vue-facing-decorator';
import { markRaw } from 'vue';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { LUCAModalVue } from '@/primary/tree/luca/luca-modal';

const MOBILE_MAX_WIDTH = 650;

@Component
export class LUCAMixin extends Vue {
  @Inject()
  readonly modalBus!: () => MittModalBus;

  @Inject()
  private globalWindow!: () => Window;

  lucaSelected = false;
  lucaSelect!: Select;

  created() {
    this.lucaSelect = this.map().getInteractions().item(1) as Select;
    this.lucaSelect.on('select', this.onSelectLUCA);
    this.lucaSelect.on('unselect', this.onUnselectLUCA);
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
