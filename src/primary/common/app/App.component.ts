import { Component, Inject, toNative, Vue } from 'vue-facing-decorator';
import { type ModalOpened } from '@/primary/common/modal/ModalOpened';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { ToastsVue } from '@/primary/common/toast/toasts';

@Component({ components: { ToastsVue } })
export default class AppComponent extends Vue {
  modal!: ModalOpened;
  isModalOpened = false;
  modalOpenedId!: string;
  modalClosedId!: string;

  @Inject()
  private modalBus!: () => MittModalBus;

  @Inject()
  private globalWindow!: () => Window;

  created(): void {
    this.modalOpenedId = this.modalBus().opened(this.openModal);
    this.modalClosedId = this.modalBus().closed(this.closeModal);
  }

  unmounted(): void {
    this.modalBus().unsubscribe(this.modalOpenedId);
    this.modalBus().unsubscribe(this.modalClosedId);
  }

  private openModal(modalOpened: ModalOpened) {
    this.modal = modalOpened;
    this.isModalOpened = true;
  }

  private closeModal() {
    this.isModalOpened = false;
  }
}
