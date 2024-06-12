import { Component, Prop, Vue } from 'vue-facing-decorator';
import { ToastVue } from '@/primary/common/toast/toast';

@Component({ components: { ToastVue }, emits: ['closed'] })
export default class AlertToastComponent extends Vue {
  @Prop()
  message!: string;

  close() {
    this.$emit('closed');
  }
}
