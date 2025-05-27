import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { TaxonTaginputVue } from '@/primary/tree/subtree/subtree-sidebar/taxon-taginput';
import { markRaw } from 'vue';
import { ExportSubtreeModalVue } from '@/primary/tree/subtree/subtree-sidebar/export-subtree-modal';
import { type MittModalBus } from '@/primary/common/modal/MittModalBus';
import { type TaxonTree } from '@/domain/taxon/TaxonTree';
import { type Taxon } from '@/domain/taxon/Taxon';

@Component({ components: { TaxonTaginputVue } })
export default class SubtreeSidebarComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly taxonSubtree!: TaxonTree;

  @Prop({ type: Array, required: true })
  readonly leafs!: Taxon[];

  @Prop({ type: Function, required: true })
  readonly onSubtreeFit!: () => void;

  @Prop({ type: Array, required: false })
  notFoundTaxonIds!: [];

  @Inject()
  private modalBus!: () => MittModalBus;

  leafTaxonIds = '';
  leafTaxonIdsTextarea!: HTMLInputElement;
  inputMethod: 'NAME' | 'ID' | 'NONE' = 'NONE';

  get taxonTagInputs(): Taxon[] {
    return this.inputMethod === 'NAME' ? this.leafs : [];
  }

  mounted() {
    this.leafTaxonIdsTextarea = this.$refs['leaf-taxon-ids-textarea'] as HTMLInputElement;
    this.inputMethod = 'NAME';
  }

  clearTaxonTaginput() {
    this.$router.push({
      name: this.$router.currentRoute.value.name!,
      query: { ...this.$router.currentRoute.value.query, subtree: undefined },
    });
  }

  openExportSubtreeModal() {
    this.modalBus().open({ component: markRaw(ExportSubtreeModalVue), props: { taxonSubtree: this.taxonSubtree } });
  }

  changeInputMethod(inputMethod: 'NAME' | 'ID') {
    this.inputMethod = inputMethod;
    this.leafTaxonIds = inputMethod === 'NAME' ? '' : this.leafs.map(leaf => leaf.ncbiId).join(' ');
  }

  inputTaxonIds(event: { target: HTMLInputElement }) {
    const taxonIds = event.target.value;
    const lastCharacter = taxonIds[taxonIds.length - 1] || '';
    const lastCharacterIsValid = /^([0-9 ]|)$/.test(lastCharacter);
    const validTaxonIds = lastCharacterIsValid ? taxonIds : taxonIds.substring(0, taxonIds.length - 1);
    this.leafTaxonIds = validTaxonIds;
    this.leafTaxonIdsTextarea.value = validTaxonIds;
  }

  getSubtree() {
    const queryString = this.leafTaxonIds.trim().replace(/ +/g, ',');
    console.log(queryString);
    this.$router.push({
      name: this.$router.currentRoute.value.name!,
      query: { ...this.$router.currentRoute.value.query, subtree: queryString },
    });
  }
}
