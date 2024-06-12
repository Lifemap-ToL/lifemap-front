import { Component, Inject, Prop, toNative, Vue, Watch } from 'vue-facing-decorator';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { MittClickBus } from '@/primary/common/MittClickBus';
import { type TaxonSuggestionProjection, toTaxonSuggestionProjection } from '@/primary/common/taxon-autcomplete/TaxonSuggestionProjection';

type DropdownState = 'OPEN' | 'CLOSED';

@Component({ emits: ['select'] })
export default class TaxonAutocompleteComponent extends Vue {
  @Prop({ type: String, required: false })
  value!: string;

  @Prop({ type: Boolean, default: false })
  stretch!: boolean;

  @Prop({ type: Boolean, default: false })
  clear!: boolean;

  @Prop({ type: Boolean, default: false })
  keepFocus!: boolean;

  @Prop({ type: Number, required: false })
  inputWidth?: number;

  @Prop({ type: String, required: false })
  inputFontSize?: string;

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private clickBus!: () => MittClickBus;

  taxonSuggestionProjections: TaxonSuggestionProjection[] = [];
  search = '';
  autocompleteSate: DropdownState = 'CLOSED';
  unsubscribeClickBus!: () => void;
  input!: HTMLInputElement;

  get autocompleteStateClass() {
    return this.autocompleteSate === 'OPEN' ? '-open' : '-closed';
  }

  get autocompleteRenderingClass() {
    return this.stretch ? '-stretch' : '';
  }

  get upperCasedSearch() {
    return this.search.toUpperCase();
  }

  get inputWidthClass() {
    return this.inputWidth ? `-w${this.inputWidth}` : '';
  }

  get inputFontSizeClass() {
    return this.inputFontSize && this.search ? `-font-${this.inputFontSize}` : '';
  }

  created() {
    this.search = this.value || '';
    this.unsubscribeClickBus = this.clickBus().onClick(mouseEvent => this.clicked(mouseEvent.target as Element));
  }

  mounted() {
    this.input = this.$refs.input as HTMLInputElement;
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

  select(taxonSuggestionProjection: TaxonSuggestionProjection) {
    this.closeAutocomplete();
    this.search = this.clear ? '' : taxonSuggestionProjection.fullName;
    this.taxonSuggestionProjections = [];
    this.$emit('select', taxonSuggestionProjection.ncbiId);

    if (this.keepFocus) {
      this.input.focus();
    }
  }

  matchSearch(toTest: string) {
    return this.upperCasedSearch === toTest.toUpperCase();
  }

  private clicked(target: Element) {
    const autocompleteElement = this.$refs.autocomplete as Element;
    if (!autocompleteElement.contains(target) && this.autocompleteSate === 'OPEN') {
      this.closeAutocomplete();
    }
  }

  @Watch('value')
  onValueChange() {
    this.search = this.value || '';
  }
}
