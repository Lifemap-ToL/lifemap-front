import { Component, Inject, Vue } from 'vue-facing-decorator';
import { markRaw } from 'vue';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { GeneralPublicVersionModalVue } from '@/primary/homepage/general-public-version-modal';
import { NCBIVersionModalVue } from '@/primary/homepage/ncbi-version-modal';

@Component
export default class HomepageComponent extends Vue {
  @Inject()
  private modalBus!: () => MittModalBus;

  openGeneralPPublicVersionModal() {
    this.modalBus().open({ component: markRaw(GeneralPublicVersionModalVue) });
  }

  openNCBIVersionModal() {
    console.log('test');
    this.modalBus().open({ component: markRaw(NCBIVersionModalVue) });
  }
}
