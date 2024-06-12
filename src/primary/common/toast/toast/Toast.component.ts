import { Component, Inject, Vue } from 'vue-facing-decorator';

const TIMEOUT = 5000;
const CLOSED = 'closed';

@Component({ emits: [CLOSED] })
export default class ToastComponent extends Vue {
  @Inject()
  private globalWindow!: () => Window;

  private timeoutId?: number;

  created() {
    this.delayClose();
  }

  close() {
    this.$emit(CLOSED);
  }

  enter() {
    this.globalWindow().clearTimeout(this.timeoutId);
  }

  leave() {
    this.delayClose();
  }

  private delayClose() {
    this.timeoutId = this.globalWindow().setTimeout(() => this.close(), TIMEOUT);
  }
}
