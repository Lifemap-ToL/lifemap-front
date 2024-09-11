import { Component, Inject, Prop, Vue } from 'vue-facing-decorator';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import { MittClickBus } from '@/primary/common/MittClickBus';

export type DropdownState = 'OPEN' | 'CLOSED';

@Component({ emits: ['open', 'close'] })
export default class DropdownComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly bus!: DropdownBus;

  @Prop({ type: Boolean, default: false })
  readonly top!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly right!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly shrink!: boolean;

  @Inject()
  private clickBus!: () => MittClickBus;

  state: DropdownState = 'CLOSED';
  unsubscribeClickBus!: () => void;

  get stateClass() {
    return this.state === 'OPEN' ? '-open' : '-closed';
  }

  get topClass() {
    return this.top ? '-top' : '';
  }

  get rightClass() {
    return this.right ? '-right' : '';
  }

  get classes() {
    return `${this.stateClass} ${this.topClass} ${this.rightClass}`.trim();
  }

  created(): void {
    this.bus.onOpen(() => this.open());
    this.bus.onClose(() => this.close());
    this.bus.onToggle(() => this.toggle());
    this.unsubscribeClickBus = this.clickBus().onClick(mouseEvent => this.clicked(mouseEvent.target as Element));
  }

  open() {
    this.state = 'OPEN';
    this.$emit('open');
  }

  close() {
    this.state = 'CLOSED';
    this.$emit('close');
  }

  toggle() {
    const event = this.state === 'OPEN' ? 'close' : 'open';
    this.state = this.state === 'OPEN' ? 'CLOSED' : 'OPEN';
    this.$emit(event);
  }

  beforeUnmount(): void {
    this.bus.destroy();
    this.unsubscribeClickBus();
  }

  private clicked(target: Element) {
    const dropdownElement = this.$refs.dropdown as Element;
    if (!dropdownElement.contains(target) && this.state === 'OPEN') {
      this.close();
    }
  }
}
