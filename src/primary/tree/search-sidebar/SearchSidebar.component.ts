import { Component, Inject, Vue } from 'vue-facing-decorator';
import { TaxonAutocompleteVue } from '@/primary/common/taxon-autcomplete';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { type Taxon } from '@/domain/taxon/Taxon';

@Component({ components: { TaxonAutocompleteVue } })
export default class SearchSidebarComponent extends Vue {
  @Inject()
  private taxonRepository!: () => TaxonRepository;

  findTaxon(taxonNCBIId: number): void {
    this.taxonRepository()
      .findByNCBIId(taxonNCBIId)
      .then((taxon: Taxon) => {
        this.$emit('select', taxon);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
