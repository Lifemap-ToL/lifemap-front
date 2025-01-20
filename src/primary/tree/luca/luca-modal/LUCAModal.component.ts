import { Component, Prop, Vue } from 'vue-facing-decorator';
import { ModalVue } from '@/primary/common/modal';

@Component({ components: { ModalVue } })
export default class LUCAModalComponent extends Vue {
  @Prop({ type: Function, required: false })
  onClose!: () => void;
}
