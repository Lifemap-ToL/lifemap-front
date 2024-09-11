import { Component, Inject, Prop, Vue } from 'vue-facing-decorator';
import { AlertMessageType } from '@/domain/alert/AlertMessageType';

const TIMEOUT = 5000;
const CLOSED = 'closed';

@Component({ emits: [CLOSED] })
export default class ToastComponent extends Vue {
  @Prop({ type: String, required: false })
  readonly type?: AlertMessageType;

  @Inject()
  private globalWindow!: () => Window;

  private timeoutId?: number;

  get typeClass(): string {
    const classes = { [AlertMessageType.SUCCESS]: '-success', [AlertMessageType.ERROR]: '-error' };
    return this.type ? classes[this.type] : '';
  }

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
