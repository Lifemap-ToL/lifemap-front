import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { ComponentState } from '@/primary/ComponentState';
import { type AppBus } from '@/primary/common/AppBus';
import { type TaxonFeatureProperties } from '@/primary/tree/taxon/TaxonFeature';
import type { TaxonRepository } from '@/domain/taxon/TaxonRepository';
import type { TaxonWikipediaPage } from '@/domain/taxon/TaxonWikipediaPage';
import type { Logger } from '@/domain/Logger';
import { WikipediaPageSummaryVue } from '@/primary/tree/taxon/wikimedia-taxon-popup/wikipedia-content/wikipedia-page-summary';
import { WikipediaAvailablePagesDropdownVue } from '@/primary/tree/taxon/wikimedia-taxon-popup/wikipedia-content/wikipedia-available-pages-dropdown';
import { MessageVue } from '@/primary/common/message';

@Component({ components: { MessageVue, WikipediaPageSummaryVue, WikipediaAvailablePagesDropdownVue } })
export default class WikipediaContentComponent extends Vue {
  @Prop({ type: Object, required: true })
  taxon!: TaxonFeatureProperties;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private appBus!: () => AppBus;

  taxonWikipediaAvailablePages!: TaxonWikipediaPage[];
  currentTaxonWikipediaPage?: TaxonWikipediaPage;
  state = ComponentState.PENDING;

  created() {
    this.update(this.$i18n.locale as 'en' | 'fr');
    this.appBus().on('changelocale', this.update);
    this.appBus().on('changewikipedialanguage', this.update);
  }

  beforeUnmount() {
    this.appBus().off('changelocale', this.update);
    this.appBus().off('changewikipedialanguage', this.update);
  }

  private setCurrentTaxonWikipediaPage(lang: string): void {
    const queryLang = (this.$router.currentRoute.value.query['wikipedia-lang'] as string) || '';
    const currentLocale = lang;
    const otherLocale = currentLocale === 'en' ? 'fr' : 'en';
    const pageFinder = (lang: string) => this.taxonWikipediaAvailablePages.find(page => page.lang === lang);
    this.currentTaxonWikipediaPage = pageFinder(queryLang) || pageFinder(currentLocale) || pageFinder(otherLocale);
  }

  private update(locale: 'en' | 'fr') {
    this.state = ComponentState.PENDING;

    this.taxonRepository()
      .findTaxonWikipediaPages(this.taxon.ncbiId)
      .then(taxonWikipediaPages => {
        this.taxonWikipediaAvailablePages = taxonWikipediaPages;
        this.setCurrentTaxonWikipediaPage(locale);
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => {
        this.logger().error(`Fail to find wikipedia pages for taxon ${this.taxon.id}`, error);
        this.state = ComponentState.ERROR;
      });
  }

  @Watch('taxon')
  taxonWatcher(newTaxon: TaxonFeatureProperties, oldTaxon: TaxonFeatureProperties) {
    if (newTaxon.id !== oldTaxon.id) {
      this.update(this.$i18n.locale as 'en' | 'fr');
    }
  }
}
