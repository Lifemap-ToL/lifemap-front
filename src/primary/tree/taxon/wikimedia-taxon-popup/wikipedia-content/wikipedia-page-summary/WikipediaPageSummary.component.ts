import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import type { TaxonWikipediaPage } from '@/domain/taxon/TaxonWikipediaPage';
import type { TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { ComponentState } from '@/primary/ComponentState';
import type { WikipediaPageSummary } from '@/domain/taxon/wikimedia/WikipediaPageSummary';
import type { Logger } from '@/domain/Logger';
import { MessageVue } from '@/primary/common/message';

@Component({ components: { MessageVue } })
export default class WikipediaPageSummaryComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly taxonWikipediaPage!: TaxonWikipediaPage;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private logger!: () => Logger;

  wikipediaPageSummary!: WikipediaPageSummary;
  state = ComponentState.PENDING;

  created() {
    this.update();
  }

  @Watch('taxonWikipediaPage')
  update() {
    this.state = ComponentState.PENDING;
    this.taxonRepository()
      .findTaxonWikipediaPageSummary(this.taxonWikipediaPage.url)
      .then(wikipediaPageSummary => {
        this.wikipediaPageSummary = wikipediaPageSummary;
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => {
        this.logger().error(`Fail to find summary for page ${this.taxonWikipediaPage.url}`, error);
        this.state = ComponentState.ERROR;
      });
  }
}
