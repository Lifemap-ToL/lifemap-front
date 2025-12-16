import { Component, Inject, Vue } from 'vue-facing-decorator';
import { GithubIconVue } from '@/primary/homepage/navbar/github-icon';
import type { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { markRaw } from 'vue';
import { CreditsModalVue } from '@/primary/homepage/navbar/credits-modal';

@Component({ components: { GithubIconVue } })
export default class NavSidebarComponent extends Vue {
  @Inject()
  private modalBus!: () => MittModalBus;

  openCreditsModal() {
    this.modalBus().open({ component: markRaw(CreditsModalVue) });
  }

  goToAbout() {
    this.$router.push('/about');
  }

  goToRoot() {
    this.$router.push('/');
  }
}
