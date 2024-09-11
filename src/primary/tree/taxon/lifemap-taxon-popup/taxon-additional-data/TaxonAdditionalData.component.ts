import { Component, Inject, Prop, Vue } from 'vue-facing-decorator';
import { ComponentState } from '@/primary/ComponentState';
import type { TaxonAdditionalData } from '@/domain/taxon/TaxonAdditionalData';
import type { TaxonRepository } from '@/domain/taxon/TaxonRepository';
import type { Logger } from '@/domain/Logger';
import { markRaw } from 'vue';
import { AgeInformationModalVue } from '@/primary/tree/taxon/lifemap-taxon-popup/taxon-additional-data/age-information-modal';
import type { MittModalBus } from '@/primary/common/modal/MittModalBus';

@Component
export default class TaxonAdditionalDataComponent extends Vue {
  @Prop({ type: Number, required: true })
  readonly taxonNCBIId!: number;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private modalBus!: () => MittModalBus;

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

  public openTaxonAgeInformationModal() {
    this.modalBus().open({ component: markRaw(AgeInformationModalVue) });
  }
}
