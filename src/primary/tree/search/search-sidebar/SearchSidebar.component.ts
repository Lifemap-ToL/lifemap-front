import { Component, Inject, Vue } from 'vue-facing-decorator';
import { TaxonAutocompleteVue } from '@/primary/tree/taxon/taxon-autcomplete';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { type Taxon } from '@/domain/taxon/Taxon';
import type { Logger } from '@/domain/Logger';

const MOBILE_MAX_WIDTH = 650;

@Component({ components: { TaxonAutocompleteVue }, emits: ['select', 'close'] })
export default class SearchSidebarComponent extends Vue {
  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private globalWindow!: () => Window;

  private mobile() {
    return this.globalWindow().document.body.clientWidth < MOBILE_MAX_WIDTH;
  }

  private close() {
    const routeQuery = { ...this.$router.currentRoute.value.query, tool: undefined };
    this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
  }

  private handleTaxon(taxon: Taxon): void {
    this.$emit('select', taxon);

    if (this.mobile()) {
      this.close();
    }
  }

  private handleError(taxonNCBIId: number, error: Error): void {
    this.logger().error(`No taxon found for NCBI ID ${taxonNCBIId}`, error);
  }

  findTaxon(taxonNCBIId: number): void {
    this.taxonRepository()
      .findByNCBIId(taxonNCBIId)
      .then(this.handleTaxon)
      .catch(error => this.handleError(taxonNCBIId, error));
  }
}
