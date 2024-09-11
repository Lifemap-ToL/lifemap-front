import { Component, Prop, Vue } from 'vue-facing-decorator';
import type { TaxonWikipediaPage } from '@/domain/taxon/TaxonWikipediaPage';
import { DropdownVue } from '@/primary/common/dropdown';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import mitt from 'mitt';

@Component({ components: { DropdownVue }, emits: ['select'] })
export default class WikipediaAvailablePagesDropdownComponent extends Vue {
  @Prop({ type: Array, required: true })
  taxonWikipediaPages!: TaxonWikipediaPage[];

  bus = new DropdownBus(mitt());

  select(taxonWikipediaPage: TaxonWikipediaPage) {
    this.$emit('select', taxonWikipediaPage);
    this.bus.close();
  }
}
