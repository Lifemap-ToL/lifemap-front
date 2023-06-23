import { Component, Inject, Prop, Vue } from 'vue-facing-decorator';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { InputBus } from '@/primary/common/InputBus';

@Component
export default class ModalComponent extends Vue {
  @Prop({ type: String, default: '' })
  readonly title!: string;

  @Prop({ type: Number, default: 300 })
  readonly width!: number;

  @Inject()
  private modalBus!: () => MittModalBus;

  @Inject()
  private inputBus!: () => InputBus;

  created() {
    this.inputBus().on(this.onKeyboardHit);
  }

  destroyed(): void {
    this.inputBus().off(this.onKeyboardHit);
  }

  public onKeyboardHit(ev: KeyboardEvent) {
    if (ev.key === 'Esc' || ev.key === 'Escape') {
      this.close();
    }
  }

  public close(): void {
    this.modalBus().close();
  }
}
