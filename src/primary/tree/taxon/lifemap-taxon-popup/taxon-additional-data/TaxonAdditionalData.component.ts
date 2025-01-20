import { Component, Inject, Prop, Vue } from 'vue-facing-decorator';
import { ComponentState } from '@/primary/ComponentState';
import type { TaxonAdditionalData } from '@/domain/taxon/TaxonAdditionalData';
import type { TaxonRepository } from '@/domain/taxon/TaxonRepository';
import type { Logger } from '@/domain/Logger';
import { PopoverVue } from '@/primary/common/popover';

@Component({ components: { PopoverVue } })
export default class TaxonAdditionalDataComponent extends Vue {
  @Prop({ type: Number, required: true })
  readonly taxonNCBIId!: number;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private logger!: () => Logger;

  taxonAdditionalData!: TaxonAdditionalData;
  state = ComponentState.PENDING;

  created() {
    this.taxonRepository().findTaxonAdditionalData(this.taxonNCBIId).then(this.handleDomain).catch(this.handleError);
  }

  private handleDomain(taxonAdditionalData: TaxonAdditionalData) {
    this.taxonAdditionalData = taxonAdditionalData;
    this.state = ComponentState.SUCCESS;
  }

  private handleError(error: Error) {
    this.logger().error(`Fail to find additional data for taxon ${this.taxonNCBIId}`, error);
    this.state = ComponentState.ERROR;
  }
}
