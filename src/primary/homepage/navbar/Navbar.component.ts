import { Component, Inject, Vue } from 'vue-facing-decorator';
import { DropdownVue } from '@/primary/common/dropdown';
import { LanguageDropdownVue } from '@/primary/common/language-dropdown';
import type { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { markRaw } from 'vue';
import { NavSidebarVue } from '@/primary/homepage/navbar/nav-sidebar';
import { XIconVue } from '@/primary/homepage/navbar/x-icon';
import { GithubIconVue } from '@/primary/homepage/navbar/github-icon';

@Component({ components: { DropdownVue, LanguageDropdownVue, XIconVue, GithubIconVue } })
export default class NavbarComponent extends Vue {
  @Inject()
  private sidebarBus!: () => MittModalBus;

  openSidebar() {
    this.sidebarBus().open({ component: markRaw(NavSidebarVue) });
  }
}
