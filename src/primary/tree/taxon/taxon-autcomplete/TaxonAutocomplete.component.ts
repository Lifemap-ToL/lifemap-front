import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { MittClickBus } from '@/primary/common/MittClickBus';
import {
  type TaxonSuggestionProjection,
  toTaxonSuggestionProjection,
} from '@/primary/tree/taxon/taxon-autcomplete/TaxonSuggestionProjection';
import { ComponentState } from '@/primary/ComponentState';
import type { Logger } from '@/domain/Logger';
import { MessageVue } from '@/primary/common/message';
import type { TreeLocale } from '@/domain/tree/TreeLocale';
import { type AppLocale, resolveTreeLocale } from '@/primary/common/i18n/locale';

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
  firstSuggestionIndex = 0;
  activeSuggestionIndex = -1;
  search = '';
  autocompleteSate: DropdownState = 'CLOSED';
  unsubscribeClickBus!: () => void;
  input!: HTMLInputElement;
  state = ComponentState.SUCCESS;

  get treeLocale(): TreeLocale {
    return resolveTreeLocale(this.$i18n.locale as AppLocale);
  }

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

  get suggestionsCount() {
    return this.taxonSuggestionProjections.length;
  }

  get lastSuggestionIndex() {
    return this.suggestionsCount - 1;
  }

  get suggestionsAvailable() {
    return this.state === ComponentState.SUCCESS && this.suggestionsCount > 0;
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

  onInput(): void {
    this.openAutocomplete();
    this.listSuggestion();
  }

  @Watch('$i18n.locale')
  listSuggestion(): void {
    this.activeSuggestionIndex = -1;
    this.taxonRepository()
      .listSuggestion(this.search, this.treeLocale)
      .then(taxonSuggestions => {
        this.activeSuggestionIndex = -1;
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
    this.activeSuggestionIndex = -1;
  }

  scrollToActiveSuggestion(): void {
    const items = (this.$refs.autocomplete as HTMLElement).querySelectorAll<HTMLElement>('.autocomplete--suggestion-item');
    items[this.activeSuggestionIndex]?.scrollIntoView({ block: 'nearest' });
  }

  activeNextSuggestion(): void {
    if (this.suggestionsAvailable) {
      const outOfBounds = this.activeSuggestionIndex + 1 >= this.suggestionsCount;
      this.activeSuggestionIndex = outOfBounds ? this.firstSuggestionIndex : this.activeSuggestionIndex + 1;
      this.scrollToActiveSuggestion();
    }
  }

  activePreviousSuggestion(): void {
    if (this.suggestionsAvailable) {
      const outOfBounds = this.activeSuggestionIndex - 1 < 0;
      this.activeSuggestionIndex = outOfBounds ? this.lastSuggestionIndex : this.activeSuggestionIndex - 1;
      this.scrollToActiveSuggestion();
    }
  }

  selectActiveSuggestion(): void {
    if (this.state === ComponentState.SUCCESS && this.autocompleteSate === 'OPEN') {
      const activeSuggestion = this.taxonSuggestionProjections[this.activeSuggestionIndex];
      if (activeSuggestion) {
        this.select(activeSuggestion);
      }
    }
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
