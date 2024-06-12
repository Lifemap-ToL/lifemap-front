import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { DropdownVue } from '@/primary/common/dropdown';
import { ComponentState } from '@/primary/ComponentState';
import { type WikipediaPageSummary } from '@/domain/wikimedia/WikipediaPageSummary';
import { type WikipediaLink } from '@/domain/wikimedia/WikipediaLink';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import mitt from 'mitt';
import { type AppBus } from '@/primary/common/AppBus';
import { type TaxonFeatureProperties } from '@/primary/common/taxon/TaxonFeature';
import { type WikidataPageRepository } from '@/domain/wikimedia/WikidataPageRepository';
import { type WikipediaPageRepository } from '@/domain/wikimedia/WikipediaPageRepository';
import { type WikidataRecordProjection } from '@/primary/common/taxon-popup/WikidataRecordProjection';

const extractFromUrl = (url: string) => url.split('/').reverse()[0];

@Component({ components: { DropdownVue } })
export default class WikipediaSummaryComponent extends Vue {
  @Prop({ type: Object, required: true })
  taxon!: TaxonFeatureProperties;

  @Prop({ type: Object, required: true })
  wikidataRecord!: WikidataRecordProjection;

  @Inject()
  private wikidataPageRepository!: () => WikidataPageRepository;

  @Inject()
  private wikipediaPageRepository!: () => WikipediaPageRepository;

  @Inject()
  private appBus!: () => AppBus;

  pageSummary!: WikipediaPageSummary;
  wikipediaLinks: WikipediaLink[] = [];
  languageDropdownBus = new DropdownBus(mitt());
  state = ComponentState.PENDING;

  created() {
    this.update();
    this.appBus().on('changelocale', this.update);
    this.appBus().on('changewikipedialanguage', this.update);
  }

  beforeUnmount() {
    this.appBus().off('changelocale', this.update);
    this.appBus().off('changewikipedialanguage', this.update);
  }

  private update() {
    this.state = ComponentState.PENDING;
    this.wikidataPageRepository()
      .find(extractFromUrl(this.wikidataRecord.id))
      .then(wikidataPage => {
        this.wikipediaLinks = wikidataPage.wikipediaLinks;
      })
      .then(() => {
        const queryLang = this.$router.currentRoute.value.query['wikipedia-lang'] as string;
        const queryLangAvailable = queryLang && this.wikipediaLinks.find(link => link.lang === queryLang);
        const wikipediaLang = queryLangAvailable ? queryLang : this.$i18n.locale;
        return this.wikipediaPageRepository().find(extractFromUrl(this.wikidataRecord.wikipediaPage), wikipediaLang);
      })
      .then(wikipediaPage => {
        this.pageSummary = wikipediaPage;
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => {
        console.error(error);
        this.state = ComponentState.ERROR;
      });
  }

  updateSummaryLanguage(wikipediaLink: WikipediaLink) {
    this.state = ComponentState.PENDING;
    this.wikipediaPageRepository()
      .find(extractFromUrl(wikipediaLink.url), wikipediaLink.lang)
      .then(wikipediaPage => {
        this.pageSummary = wikipediaPage;
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => {
        console.error(error);
        this.state = ComponentState.ERROR;
      });
  }

  changeLanguage(wikipediaLink: WikipediaLink) {
    this.updateSummaryLanguage(wikipediaLink);
    this.languageDropdownBus.close();
  }

  @Watch('taxon')
  taxonWatcher() {
    this.update();
  }
}
