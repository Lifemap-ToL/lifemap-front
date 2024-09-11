import type { Select } from '@/primary/tree/map/interaction/Select';
import { Component, Vue } from 'vue-facing-decorator';

@Component
export class LUCAMixin extends Vue {
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

  private onUnselectLUCA() {
    this.lucaSelected = false;
  }

  private onSelectLUCA() {
    this.lucaSelected = true;
  }

  public unselectLUCA() {
    this.lucaSelect.unselect();
  }
}
