import { Component, Inject, Vue } from 'vue-facing-decorator';
import { MittClickBus } from '@/primary/common/MittClickBus';

@Component({ emits: ['open', 'close'] })
export default class PopoverComponent extends Vue {
  @Inject()
  private clickBus!: () => MittClickBus;

  state: 'OPEN' | 'CLOSED' = 'CLOSED';
  unsubscribeClickBus!: () => void;

  get classes() {
    return this.state === 'OPEN' ? '-open' : '-closed';
  }

  created() {
    this.unsubscribeClickBus = this.clickBus().onClick(mouseEvent => this.clicked(mouseEvent.target as Element));
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
    this.unsubscribeClickBus();
  }

  private clicked(target: Element) {
    const dropdownElement = this.$refs.popover as Element;
    if (!dropdownElement.contains(target) && this.state === 'OPEN') {
      this.close();
    }
  }
}
