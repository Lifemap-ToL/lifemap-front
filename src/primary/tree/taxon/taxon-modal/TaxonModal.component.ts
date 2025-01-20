import { Component, Inject, Prop, Vue } from 'vue-facing-decorator';
import { ModalVue } from '@/primary/common/modal';
import type { TaxonRepository } from '@/domain/taxon/TaxonRepository';
import type { AppBus } from '@/primary/common/AppBus';
import type { Logger } from '@/domain/Logger';
import { TaxonAdditionalDataVue } from '@/primary/tree/taxon/lifemap-taxon-popup/taxon-additional-data';
import type { Taxon } from '@/domain/taxon/Taxon';
import { FetchingState } from '@/primary/FetchingState';
import {
  type TaxonWikidataRecordProjection,
  toTaxonWikidataRecordProjection,
} from '@/primary/tree/taxon/wikimedia-taxon-popup/TaxonWikidataRecordProjection';
import type { TaxonWikidataRecord } from '@/domain/taxon/TaxonWikidataRecord';
import { type Component as VueComponent, markRaw } from 'vue';
import { WikipediaContentVue } from '@/primary/tree/taxon/wikimedia-taxon-popup/wikipedia-content';
import { TaxonIdentifierListVue } from '@/primary/tree/taxon/wikimedia-taxon-popup/taxon-identifier-list';
import { MessageVue } from '@/primary/common/message';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';

@Component({ components: { MessageVue, TaxonAdditionalDataVue, ModalVue }, emits: ['close'] })
export default class TaxonModalComponent extends Vue {
  @Prop({ type: Number, required: true })
  readonly taxonNCBIId!: number;

  @Prop({ type: Function, required: false })
  onClose!: () => void;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private appBus!: () => AppBus;

  @Inject()
  private modalBus!: () => MittModalBus;

  @Inject()
  private logger!: () => Logger;

  taxon!: Taxon;
  taxonFetchingState = FetchingState.ONGOING;

  taxonWikidataRecordProjection!: TaxonWikidataRecordProjection;
  taxonWikidataRecordFetchingState = FetchingState.ONGOING;

  activeComponent: VueComponent = WikipediaContentVue;
  activeComponentProps!: any;

  created() {
    this.taxonRepository()
      .findByNCBIId(this.taxonNCBIId)
      .then(this.handleTaxon)
      .catch(this.handleTaxonError)
      .then(() => this.taxonRepository().findTaxonWikidataRecord(this.taxonNCBIId))
      .then(this.handleTaxonWikidataRecord)
      .catch(this.handleTaxonWikidataRecordError);
  }

  private handleTaxon(taxon: Taxon) {
    this.taxon = taxon;
    this.taxonFetchingState = FetchingState.DONE;
  }

  private handleTaxonError(error: Error) {
    this.logger().error(`Fail to find taxon ${this.taxonNCBIId}`, error);
    this.taxonFetchingState = FetchingState.FAILED;
  }

  private handleTaxonWikidataRecord(taxonWikidataRecord: TaxonWikidataRecord) {
    this.taxonWikidataRecordProjection = toTaxonWikidataRecordProjection(taxonWikidataRecord, this.$i18n.locale as 'en' | 'fr');
    this.activeWikipediaTab();
    this.taxonWikidataRecordFetchingState = FetchingState.DONE;
  }

  private handleTaxonWikidataRecordError(error: Error) {
    this.logger().error(`Fail to retrieve wikidata record for taxon ${this.taxon.ncbiId}`, error);
    this.taxonWikidataRecordFetchingState = FetchingState.FAILED;
  }

  activeWikipediaTab() {
    this.activeTab = 'wikipedia';
    this.activeComponent = markRaw(WikipediaContentVue);
    this.activeComponentProps = { taxon: this.taxon };
  }

  activeIdentifiersTab() {
    this.activeTab = 'databases';
    this.activeComponent = markRaw(TaxonIdentifierListVue);
    this.activeComponentProps = {
      taxon: this.taxon,
      taxonWikidataRecord: this.taxonWikidataRecordProjection,
    };
  }

  public lineageToRoot() {
    this.modalBus().close();
    this.onClose();

    this.$router.push({
      name: this.$router.currentRoute.value.name!,
      query: { ...this.$router.currentRoute.value.query, ancestor: `${this.taxon.ncbiId},0` },
    });
  }
}
