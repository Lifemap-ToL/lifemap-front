import { Component, Inject, Vue } from 'vue-facing-decorator';
import type { TaxonRepository } from '@/domain/taxon/TaxonRepository';

@Component({ emits: ['close'] })
export default class LUCAPopupComponent extends Vue {
  @Inject()
  private taxonRepository!: () => TaxonRepository;

  public close() {
    this.$emit('close');
  }
}
