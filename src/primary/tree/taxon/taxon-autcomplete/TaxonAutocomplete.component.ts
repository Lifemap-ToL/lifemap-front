import { Component, Inject, Prop, toNative, Vue, Watch } from 'vue-facing-decorator';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { MittClickBus } from '@/primary/common/MittClickBus';
import {
  type TaxonSuggestionProjection,
  toTaxonSuggestionProjection,
} from '@/primary/tree/taxon/taxon-autcomplete/TaxonSuggestionProjection';
import { ComponentState } from '@/primary/ComponentState';
import type { Logger } from '@/domain/Logger';
import { MessageVue } from '@/primary/common/message';
import type { AppBus } from '@/primary/common/AppBus';

type DropdownState = 'OPEN' | 'CLOSED';

@Component({ components: { MessageVue }, emits: ['select'] })
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
  private logger!: () => Logger;

  @Inject()
  private clickBus!: () => MittClickBus;

  taxonSuggestionProjections: TaxonSuggestionProjection[] = [];
  search = '';
  autocompleteSate: DropdownState = 'CLOSED';
  unsubscribeClickBus!: () => void;
  input!: HTMLInputElement;
  state = ComponentState.SUCCESS;

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

  @Watch('$i18n.locale')
  listSuggestion(): void {
    this.taxonRepository()
      .listSuggestion(this.search)
      .then(taxonSuggestions => {
        this.taxonSuggestionProjections = taxonSuggestions.map(toTaxonSuggestionProjection(this.search));
        this.state = ComponentState.SUCCESS;
      })
      .catch(error => {
        this.logger().error(`Failed to retrieve taxon suggestions for search ${this.search}`, error);
        this.state = ComponentState.ERROR;
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
