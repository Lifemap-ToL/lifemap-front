import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { TaxonAutocompleteVue } from '@/primary/tree/taxon/taxon-autcomplete';
import { type Taxon } from '@/domain/taxon/Taxon';

const MOBILE_MAX_WIDTH = 650;

@Component({ components: { TaxonAutocompleteVue }, emits: ['change'] })
export default class AncestorFormComponent extends Vue {
  @Prop({ type: Array, required: false })
  value?: Taxon[];

  @Inject()
  globalWindow!: () => Window & typeof globalThis;

  ancestorRouteStartTaxonNCBIId?: number;
  ancestorRouteEndTaxonNCBIId?: number;

  created() {
    this.updateAncestorRouteExtremes();
  }

  private mobile() {
    return this.globalWindow().document.body.clientWidth < MOBILE_MAX_WIDTH;
  }

  selectAncestorRouteStartTaxon(taxonNCBIId: number) {
    this.ancestorRouteStartTaxonNCBIId = taxonNCBIId;
    this.notify();
  }

  selectAncestorRouteEndTaxon(taxonNCBIId: number) {
    this.ancestorRouteEndTaxonNCBIId = taxonNCBIId;
    this.notify();
  }

  private notify() {
    if (this.ancestorRouteStartTaxonNCBIId && this.ancestorRouteEndTaxonNCBIId) {
      this.$router.push({
        name: this.$router.currentRoute.value.name!,
        query: {
          ...this.$router.currentRoute.value.query,
          ...(this.mobile() ? { tool: undefined } : {}),
          ancestor: `${this.ancestorRouteStartTaxonNCBIId},${this.ancestorRouteEndTaxonNCBIId}`,
        },
      });
    }
  }

  private updateAncestorRouteExtremes() {
    this.ancestorRouteStartTaxonNCBIId = this.value![0] ? this.value![0].ncbiId : undefined;
    this.ancestorRouteEndTaxonNCBIId = this.value![1] ? this.value![1].ncbiId : undefined;
  }

  @Watch('value')
  valueWatcher() {
    this.updateAncestorRouteExtremes();
  }
}
