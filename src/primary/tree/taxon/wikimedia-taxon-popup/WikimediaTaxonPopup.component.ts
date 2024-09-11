import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import type { TaxonFeatureProperties } from '@/primary/tree/taxon/TaxonFeature';
import type { AppBus } from '@/primary/common/AppBus';
import { ComponentState } from '@/primary/ComponentState';
import { type Component as VueComponent, markRaw } from 'vue';
import { TaxonIdentifierListVue } from '@/primary/tree/taxon/wikimedia-taxon-popup/taxon-identifier-list';
import type { Logger } from '@/domain/Logger';
import { LifemapTaxonPopupVue } from '@/primary/tree/taxon/lifemap-taxon-popup';
import type { TaxonRepository } from '@/domain/taxon/TaxonRepository';
import {
  type TaxonWikidataRecordProjection,
  toTaxonWikidataRecordProjection,
} from '@/primary/tree/taxon/wikimedia-taxon-popup/TaxonWikidataRecordProjection';
import { WikipediaContentVue } from '@/primary/tree/taxon/wikimedia-taxon-popup/wikipedia-content';
import { MessageVue } from '@/primary/common/message';

@Component({ components: { MessageVue, LifemapTaxonPopupVue, WikipediaContentVue } })
export default class WikimediaTaxonPopupComponent extends Vue {
  @Prop({ type: Object, required: true })
  taxon!: TaxonFeatureProperties;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private appBus!: () => AppBus;

  @Inject()
  private logger!: () => Logger;

  taxonWikidataRecordProjection!: TaxonWikidataRecordProjection;
  state = ComponentState.PENDING;
  activeTab: 'wikipedia' | 'databases' = 'wikipedia';
  activeComponent: VueComponent = WikipediaContentVue;
  activeComponentProps!: any;
  wikipediaLanguageMessage = true;

  created() {
    this.update(this.$i18n.locale as 'en' | 'fr');
    this.appBus().on('changelocale', this.update);
  }

  beforeUnmount() {
    this.appBus().off('changelocale', this.update);
  }

  private update(locale: 'en' | 'fr') {
    this.state = ComponentState.PENDING;

    this.taxonRepository()
      .findTaxonWikidataRecord(this.taxon.ncbiId)
      .then(taxonWikidataRecord => {
        this.taxonWikidataRecordProjection = toTaxonWikidataRecordProjection(taxonWikidataRecord, this.$i18n.locale as 'en' | 'fr');
        this.activeWikipediaTab();
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => {
        this.logger().error(`Fail to retrieve wikidata record for taxon ${this.taxon.ncbiId}`, error);
        this.state = ComponentState.ERROR;
      });
  }

  activeWikipediaTab() {
    this.activeTab = 'wikipedia';
    this.activeComponent = markRaw(WikipediaContentVue);
    this.activeComponentProps = { taxon: this.taxon };
  }

  activeIdentifiersTab() {
    this.activeTab = 'databases';
    this.activeComponent = markRaw(TaxonIdentifierListVue);
    this.activeComponentProps = { taxon: this.taxon, taxonWikidataRecord: this.taxonWikidataRecordProjection };
  }

  @Watch('taxon')
  private taxonWatcher(newTaxon: TaxonFeatureProperties, oldTaxon: TaxonFeatureProperties) {
    if (newTaxon.id !== oldTaxon.id) {
      this.update(this.$i18n.locale as 'en' | 'fr');
    }
  }
}
