import { Component, Inject, Vue } from 'vue-facing-decorator';
import { TemplateVue } from '@/primary/common/template';
import { ComponentState } from '@/primary/ComponentState';
import type { TreeRepository } from '@/domain/tree/TreeRepository';
import type { TreeSummary } from '@/domain/tree/TreeSummary';
import type { Logger } from '@/domain/Logger';
import { format } from '@/domain/DateUtil';
import { MessageVue } from '@/primary/common/message';
import { NavbarVue } from '@/primary/homepage/navbar';
import { FooterVue } from '@/primary/homepage/footer';
import { ExploreButtonVue } from './explore-button';

@Component({
  methods: { format },
  components: { TemplateVue, NavbarVue, FooterVue, MessageVue, ExploreButtonVue },
})
export default class HomepageComponent extends Vue {
  @Inject()
  private treeRepository!: () => TreeRepository;

  @Inject()
  private logger!: () => Logger;

  treeSummary!: TreeSummary;
  lastUpdateDate!: string;
  today = format(new Date());
  state = ComponentState.PENDING;
  mobile = false;

  private mobileDevice() {
    this.mobile = window.document.body.clientWidth < 1024;
  }

  created() {
    this.treeRepository().findIfTreeIsAvailable().then(this.handleTreeAvailability).catch(this.handleTreeAvailabilityError);
    this.treeRepository().findTreeSummary().then(this.handleTreeSummary).catch(this.handleTreeSummaryError);
    this.mobileDevice();
  }

  private handleTreeAvailability(treeAvailable: boolean) {
    this.state = treeAvailable ? ComponentState.SUCCESS : ComponentState.ERROR;
  }

  private handleTreeAvailabilityError(error: Error) {
    this.state = ComponentState.ERROR;
    this.logger().error('Fail to retrieve tree availability', error);
  }

  private handleTreeSummary(treeSummary: TreeSummary) {
    this.treeSummary = treeSummary;
    this.lastUpdateDate = format(treeSummary.lastUpdate);
  }

  private handleTreeSummaryError(error: Error) {
    this.logger().error('Fail to find tree summary data', error);
  }

  goToTree() {
    this.$router.push({ path: '/tree', query: this.$route.query });
  }
}
