import { Component, Inject, Vue } from 'vue-facing-decorator';
import { TaxonAutocompleteVue } from '@/primary/common/taxon-autcomplete';
import { type Taxon } from '@/domain/taxon/Taxon';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';

@Component({ components: { TaxonAutocompleteVue }, emits: ['select'] })
export default class TaxonSearchBarComponent extends Vue {
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
