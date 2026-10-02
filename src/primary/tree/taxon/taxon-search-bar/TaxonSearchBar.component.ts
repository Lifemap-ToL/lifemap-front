import { Component, Inject, Vue } from 'vue-facing-decorator';
import { TaxonAutocompleteVue } from '@/primary/tree/taxon/taxon-autcomplete';
import { type Taxon } from '@/domain/taxon/Taxon';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import type { TreeLocale } from '@/domain/tree/TreeLocale';
import { type AppLocale, resolveTreeLocale } from '@/primary/common/i18n/locale';

@Component({ components: { TaxonAutocompleteVue }, emits: ['select'] })
export default class TaxonSearchBarComponent extends Vue {
  @Inject()
  private taxonRepository!: () => TaxonRepository;

  get treeLocale(): TreeLocale {
    return resolveTreeLocale(this.$i18n.locale as AppLocale);
  }

  findTaxon(taxonNCBIId: number): void {
    this.taxonRepository()
      .findByNCBIId(taxonNCBIId, this.treeLocale)
      .then((taxon: Taxon) => {
        this.$emit('select', taxon);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
