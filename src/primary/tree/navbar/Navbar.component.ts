import { Component, Inject, Vue } from 'vue-facing-decorator';
import { LanguageDropdownVue } from '@/primary/common/language-dropdown';
import { markRaw } from 'vue';
import { HelpModalVue } from '@/primary/common/help-modal';
import type { MittModalBus } from '@/primary/common/modal/MittModalBus';

@Component({ components: { LanguageDropdownVue } })
export default class NavbarComponent extends Vue {
  @Inject()
  private modalBus!: () => MittModalBus;

  openHelpModal() {
    this.modalBus().open({ component: markRaw(HelpModalVue) });
  }

  goHome() {
    this.$router.push({ path: '/', query: this.$route.query });
  }
}
