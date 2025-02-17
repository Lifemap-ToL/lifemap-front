import { Component, Inject, Vue } from 'vue-facing-decorator';
import { DropdownVue } from '@/primary/common/dropdown';
import { LanguageDropdownVue } from '@/primary/common/language-dropdown';
import type { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { markRaw } from 'vue';
import { NavSidebarVue } from '@/primary/homepage/navbar/nav-sidebar';
import { CreditsModalVue } from '@/primary/homepage/navbar/credits-modal';
import { GithubIconVue } from '@/primary/homepage/navbar/github-icon';

@Component({ components: { DropdownVue, LanguageDropdownVue, GithubIconVue } })
export default class NavbarComponent extends Vue {
  @Inject()
  private sidebarBus!: () => MittModalBus;

  @Inject()
  private modalBus!: () => MittModalBus;

  openSidebar() {
    this.sidebarBus().open({ component: markRaw(NavSidebarVue) });
  }

  openCreditsModal() {
    this.modalBus().open({ component: markRaw(CreditsModalVue) });
  }
}
