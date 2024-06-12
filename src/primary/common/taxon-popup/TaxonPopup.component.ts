import { type Component as VueComponent, markRaw } from 'vue';
import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { ComponentState } from '@/primary/ComponentState';
import { type TaxonFeatureProperties } from '@/primary/common/taxon/TaxonFeature';
import { type WikidataRecordRepository } from '@/domain/wikimedia/WikidataRecordRepository';
import { type WikipediaPageSummary } from '@/domain/wikimedia/WikipediaPageSummary';
import { type AppBus } from '@/primary/common/AppBus';
import { type WikipediaLink } from '@/domain/wikimedia/WikipediaLink';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import mitt from 'mitt';
import { DropdownVue } from '@/primary/common/dropdown';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { type WikidataRecordProjection } from '@/primary/common/taxon-popup/WikidataRecordProjection';
import { toWikidataRecordProjection } from '@/primary/common/taxon-popup/WikidataRecordProjection';
import { WikipediaSummaryVue } from '@/primary/common/taxon-popup/wikipedia-summary';
import { TaxonIdentifierListVue } from '@/primary/common/taxon-popup/taxon-identifier-list';
import { WikipediaLanguageMessageVue } from '@/primary/common/taxon-popup/wikipedia-language-message';
import type { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { GeneralPublicVersionModalVue } from '@/primary/homepage/general-public-version-modal';
import { AgeInformationModalVue } from '@/primary/common/taxon-popup/age-information-modal';

@Component({ components: { DropdownVue, WikipediaSummaryVue, WikipediaLanguageMessageVue } })
export default class TaxonPopupComponent extends Vue {
  @Prop({ type: Object, required: true })
  taxon!: TaxonFeatureProperties;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private wikidataRecordRepository!: () => WikidataRecordRepository;

  @Inject()
  private modalBus!: () => MittModalBus;

  @Inject()
  private appBus!: () => AppBus;

  wikidataRecord!: WikidataRecordProjection;
  pageSummary!: WikipediaPageSummary;
  wikipediaLinks: WikipediaLink[] = [];
  taxonAge?: string;
  state = ComponentState.PENDING;
  activeTab: 'wikipedia' | 'databases' = 'wikipedia';
  activeComponent: VueComponent = WikipediaSummaryVue;
  activeComponentProps!: any;
  wikipediaLanguageMessage = true;
  languageDropdownBus = new DropdownBus(mitt());

  created() {
    this.update();
    this.appBus().on('changelocale', this.update);
  }

  beforeUnmount() {
    this.appBus().off('changelocale', this.update);
  }

  private update() {
    this.state = ComponentState.PENDING;

    this.wikidataRecordRepository()
      .find(this.taxon.ncbiId, this.$i18n.locale)
      .then(wikidataRecord => {
        this.wikidataRecord = toWikidataRecordProjection(wikidataRecord, this.$i18n.locale);
        this.activeWikipediaTab();
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => {
        console.error(error);
        this.state = ComponentState.ERROR;
      });

    this.taxonRepository()
      .findAge(this.taxon.ncbiId)
      .then(age => (this.taxonAge = age));
  }

  activeWikipediaTab() {
    this.activeTab = 'wikipedia';
    this.activeComponent = markRaw(WikipediaSummaryVue);
    this.activeComponentProps = { taxon: this.taxon, wikidataRecord: this.wikidataRecord };
  }

  activeIdentifiersTab() {
    this.activeTab = 'databases';
    this.activeComponent = markRaw(TaxonIdentifierListVue);
    this.activeComponentProps = { taxon: this.taxon, wikidataRecord: this.wikidataRecord };
  }

  close() {
    this.$emit('close');
  }

  lineageToRoot() {
    this.$router.push({
      name: this.$router.currentRoute.value.name!,
      query: { ...this.$router.currentRoute.value.query, ancestor: `${this.taxon.ncbiId},0` },
    });
  }

  openTaxonAgeInformationModal() {
    this.modalBus().open({ component: markRaw(AgeInformationModalVue) });
  }

  @Watch('taxon')
  private taxonWatcher(newTaxon: TaxonFeatureProperties, oldTaxon: TaxonFeatureProperties) {
    if (newTaxon.id !== oldTaxon.id) {
      this.update();
    }
  }
}
