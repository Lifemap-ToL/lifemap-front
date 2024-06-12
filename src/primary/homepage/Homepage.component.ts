import { Component, Inject, toNative, Vue } from 'vue-facing-decorator';
import { markRaw } from 'vue';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { GeneralPublicVersionModalVue } from '@/primary/homepage/general-public-version-modal';
import { NCBIVersionModalVue } from '@/primary/homepage/ncbi-version-modal';
import { TemplateVue } from '@/primary/template';
import { NavbarVue } from '@/primary/common/navbar';
import { NavbarLinkVue } from '@/primary/common/navbar/navbar-link';
import { NavbarSeparatorVue } from '@/primary/common/navbar/navbar-separator';
import { NavbarSocialVue } from '@/primary/common/navbar/navbar-social';

@Component({ components: { TemplateVue, NavbarVue, NavbarLinkVue, NavbarSeparatorVue, NavbarSocialVue } })
export default class HomepageComponent extends Vue {
  @Inject()
  private modalBus!: () => MittModalBus;

  openGeneralPublicVersionModal() {
    this.modalBus().open({ component: markRaw(GeneralPublicVersionModalVue), props: { size: 'small' } });
  }

  openNCBIVersionModal() {
    this.modalBus().open({ component: markRaw(NCBIVersionModalVue), props: { size: 'small' } });
  }
}
