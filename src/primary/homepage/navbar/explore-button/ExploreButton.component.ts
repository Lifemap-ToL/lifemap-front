import { Component, Inject, Vue } from 'vue-facing-decorator';
import { TemplateVue } from '@/primary/common/template';
import { ComponentState } from '@/primary/ComponentState';
import type { TreeRepository } from '@/domain/tree/TreeRepository';
import type { Logger } from '@/domain/Logger';
import { format } from '@/domain/DateUtil';
import { MessageVue } from '@/primary/common/message';

@Component({
  methods: { format },
  components: { TemplateVue, MessageVue },
})
export default class ExploreButtonComponent extends Vue {
  @Inject()
  private treeRepository!: () => TreeRepository;

  @Inject()
  private logger!: () => Logger;

  state = ComponentState.PENDING;

  created() {
    this.treeRepository().findIfTreeIsAvailable().then(this.handleTreeAvailability).catch(this.handleTreeAvailabilityError);
  }

  private handleTreeAvailability(treeAvailable: boolean) {
    this.state = treeAvailable ? ComponentState.SUCCESS : ComponentState.ERROR;
  }

  private handleTreeAvailabilityError(error: Error) {
    this.state = ComponentState.ERROR;
    this.logger().error('Fail to retrieve tree availability', error);
  }

  goToTree() {
    this.$router.push({ path: '/tree', query: this.$route.query });
  }
}
