import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { ComponentState } from '@/primary/ComponentState';
import type { TaxonRepository } from '@/domain/taxon/TaxonRepository';
import type { Taxon } from '@/domain/taxon/Taxon';
import type { Logger } from '@/domain/Logger';
import { TaxonAdditionalDataVue } from '@/primary/tree/taxon/lifemap-taxon-popup/taxon-additional-data';
import type { AppBus } from '@/primary/common/AppBus';
import { MessageVue } from '@/primary/common/message';

@Component({ components: { TaxonAdditionalDataVue, MessageVue }, emits: ['close'] })
export default class LifemapTaxonPopupComponent extends Vue {
  @Prop({ type: Number, required: true })
  readonly taxonNCBIId!: number;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private appBus!: () => AppBus;

  @Inject()
  private logger!: () => Logger;

  taxon!: Taxon;
  state = ComponentState.PENDING;

  created() {
    this.refresh();
    this.appBus().on('changelocale', this.refresh);
  }

  beforeUnmount() {
    this.appBus().off('changelocale', this.refresh);
  }

  private refresh() {
    this.taxonRepository().findByNCBIId(this.taxonNCBIId).then(this.handleDomain).catch(this.handleError);
  }

  private handleDomain(taxon: Taxon) {
    this.taxon = taxon;
    this.state = ComponentState.SUCCESS;
  }

  private handleError(error: Error) {
    this.logger().error(`Fail to find taxon ${this.taxonNCBIId}`, error);
    this.state = ComponentState.ERROR;
  }

  public close() {
    this.$emit('close');
  }

  public lineageToRoot() {
    this.$router.push({
      name: this.$router.currentRoute.value.name!,
      query: { ...this.$router.currentRoute.value.query, ancestor: `${this.taxon.ncbiId},0`, tool: 'ancestor' },
    });
  }

  @Watch('taxonNCBIId')
  private taxonNCBIIdWatcher() {
    this.refresh();
  }
}
