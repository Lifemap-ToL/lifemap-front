import { Component, Inject, Vue } from 'vue-facing-decorator';
import type { ModalOpened } from '@/primary/common/modal/ModalOpened';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';

@Component
export default class SidebarComponent extends Vue {
  sidebar!: ModalOpened;
  sidebarOpened = false;
  sidebarOpenedId!: string;
  sidebarClosedId!: string;

  @Inject()
  private sidebarBus!: () => MittModalBus;

  get transition() {
    return this.sidebarOpened ? '-slide-right' : '-slide-left';
  }

  created(): void {
    this.sidebarOpenedId = this.sidebarBus().opened(this.openSidebar);
    this.sidebarClosedId = this.sidebarBus().closed(this.closeSidebar);
  }

  unmounted(): void {
    this.sidebarBus().unsubscribe(this.sidebarOpenedId);
    this.sidebarBus().unsubscribe(this.sidebarClosedId);
  }

  private openSidebar(modalOpened: ModalOpened) {
    this.sidebar = modalOpened;
    this.sidebarOpened = true;
  }

  private closeSidebar() {
    this.sidebarOpened = false;
  }

  close() {
    this.sidebarBus().close();
  }
}
