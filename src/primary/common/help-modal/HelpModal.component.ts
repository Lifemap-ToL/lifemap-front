import { Component, Inject, Vue } from 'vue-facing-decorator';
import { ModalVue } from '@/primary/common/modal';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { ComponentState } from '@/primary/ComponentState';
import type { TreeRepository } from '@/domain/tree/TreeRepository';
import type { Logger } from '@/domain/Logger';
import type { TreeSummary } from '@/domain/tree/TreeSummary';
import { format } from '@/domain/DateUtil';

@Component({ components: { ModalVue } })
export default class HelpModalComponent extends Vue {
  @Inject()
  private treeRepository!: () => TreeRepository;

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private modalBus!: () => MittModalBus;

  treeSummary!: TreeSummary;
  lastUpdateDate!: string;

  state = ComponentState.PENDING;

  created() {
    this.treeRepository().findTreeSummary().then(this.handleDomain).catch(this.handleError);
  }

  private handleDomain(treeSummary: TreeSummary) {
    this.treeSummary = treeSummary;
    this.lastUpdateDate = format(treeSummary.lastUpdate);
    this.state = ComponentState.SUCCESS;
  }

  private handleError(error: Error) {
    this.logger().error('Fail to find tree summary data', error);
    this.state = ComponentState.ERROR;
  }
}
