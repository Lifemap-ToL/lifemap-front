import { Component, Inject, Vue } from 'vue-facing-decorator';
import { ModalVue } from '@/primary/common/modal';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';

@Component({ components: { ModalVue } })
export default class HelpModalComponent extends Vue {
  @Inject()
  private modalBus!: () => MittModalBus;
}
