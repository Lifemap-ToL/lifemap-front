import { Component, Inject, Prop, Vue } from 'vue-facing-decorator';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { InputBus } from '@/primary/common/InputBus';

@Component({ emits: ['close'] })
export default class ModalComponent extends Vue {
  @Prop({ type: String, default: '' })
  readonly title!: string;

  @Prop({ type: String, required: false })
  readonly size?: 'small' | 'large';

  @Prop({ type: Boolean, required: false })
  readonly fullscreen!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly secondary!: boolean;

  @Inject()
  private modalBus!: () => MittModalBus;

  @Inject()
  private inputBus!: () => InputBus;

  created() {
    this.inputBus().on(this.onKeyboardHit);
  }

  unmounted(): void {
    this.inputBus().off(this.onKeyboardHit);
  }

  public onKeyboardHit(ev: KeyboardEvent) {
    if (ev.key === 'Esc' || ev.key === 'Escape') {
      this.close();
    }
  }

  public close(): void {
    this.modalBus().close();
    this.$emit('close');
  }
}
