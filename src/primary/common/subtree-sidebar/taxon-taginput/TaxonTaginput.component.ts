import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { TaxonAutocompleteVue } from '@/primary/common/taxon-autcomplete';
import { TagVue } from '@/primary/common/subtree-sidebar/taxon-taginput/tag';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { MittClickBus } from '@/primary/common/MittClickBus';
import {
  type TaxonSuggestionProjection,
  taxonToTaxonSuggestionProjection,
} from '@/primary/common/taxon-autcomplete/TaxonSuggestionProjection';
import { toTaxonSuggestionProjection } from '@/primary/common/taxon-autcomplete/TaxonSuggestionProjection';
import { type DropdownState } from '@/primary/common/dropdown/Dropdown.component';
import type { Taxon } from '@/domain/taxon/Taxon';

@Component({ components: { TagVue, TaxonAutocompleteVue } })
export default class TaxonTaginputComponent extends Vue {
  @Prop({ type: Array, required: true })
  readonly value!: Taxon[];

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private clickBus!: () => MittClickBus;

  selectedTaxa: TaxonSuggestionProjection[] = [];
  taxonSuggestionProjections: TaxonSuggestionProjection[] = [];
  search = '';
  autocompleteSate: DropdownState = 'CLOSED';
  unsubscribeClickBus!: () => void;
  input!: HTMLInputElement;
  field!: HTMLElement;

  get autocompleteStateClass() {
    return this.autocompleteSate === 'OPEN' ? '-open' : '-closed';
  }

  get upperCasedSearch() {
    return this.search.toUpperCase();
  }

  created() {
    this.unsubscribeClickBus = this.clickBus().onClick(mouseEvent => this.clicked(mouseEvent.target as Element));
  }

  mounted() {
    this.input = this.$refs.input as HTMLInputElement;
    this.field = this.$refs.field as HTMLElement;
  }

  beforeUnmount(): void {
    this.unsubscribeClickBus();
  }

  listSuggestion(): void {
    this.taxonRepository()
      .listSuggestion(this.search)
      .then(taxonSuggestions => {
        this.taxonSuggestionProjections = taxonSuggestions.map(toTaxonSuggestionProjection(this.search));
      })
      .catch(error => {
        console.error(error);
      });
  }

  openAutocomplete(): void {
    this.autocompleteSate = 'OPEN';
  }

  closeAutocomplete(): void {
    this.autocompleteSate = 'CLOSED';
  }

  public addTaxon(taxonSuggestion: TaxonSuggestionProjection): void {
    this.selectedTaxa = [...this.selectedTaxa, taxonSuggestion];
    this.notify();
  }

  public removeTaxon(index: number): void {
    this.selectedTaxa = [...this.selectedTaxa.slice(0, index), ...this.selectedTaxa.slice(index + 1)];
    this.notify();
  }

  select(taxonSuggestionProjection: TaxonSuggestionProjection) {
    this.closeAutocomplete();
    this.search = '';
    this.taxonSuggestionProjections = [];
    this.addTaxon(taxonSuggestionProjection);
    this.field.scroll({ top: this.field.offsetHeight });
    this.input.focus();
  }

  matchSearch(toTest: string) {
    return this.upperCasedSearch === toTest.toUpperCase();
  }

  private clicked(target: Element) {
    const tagInputElement = this.$refs.taginput as Element;
    if (!tagInputElement.contains(target) && this.autocompleteSate === 'OPEN') {
      this.closeAutocomplete();
    }
  }

  private notify() {
    const ncbiIds = this.selectedTaxa.map(taxon => taxon.ncbiId);
    const queryString = ncbiIds.length === 0 ? undefined : ncbiIds.join(',');
    this.$router.push({
      name: this.$router.currentRoute.value.name!,
      query: { ...this.$router.currentRoute.value.query, subtree: queryString },
    });
  }

  public focus() {
    this.input.focus();
  }

  @Watch('value')
  private valueWatcher() {
    this.selectedTaxa = this.value.map(taxon => taxonToTaxonSuggestionProjection(taxon));
  }
}
