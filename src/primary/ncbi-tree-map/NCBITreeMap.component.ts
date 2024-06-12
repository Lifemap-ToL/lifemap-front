import { Component, mixins, Prop, Watch } from 'vue-facing-decorator';
import { TemplateTreeVue } from '@/primary/common/template-tree';
import { TaxonSearchBarVue } from '@/primary/common/taxon-search-bar';
import { MapLayoutVue } from '@/primary/common/map-layout';
import { AncestorSidebarVue } from '@/primary/common/ancestor-sidebar';
import { AncestorMixin } from '@/primary/common/ancestor-mixin/AncestorMixin';
import { ToolMixin } from '@/primary/common/tool-mixin/ToolMixin';
import { TaxonMixin } from '@/primary/common/taxon-mixin/TaxonMixin';
import { TaxonTooltipVue } from '@/primary/common/taxon-tooltip';
import { SubtreeSidebarVue } from '@/primary/common/subtree-sidebar';
import { SubtreeMixin } from '@/primary/ncbi-tree-map/subtree-mixin/SubtreeMixin';
import { NCBITaxonPopupVue } from '@/primary/ncbi-tree-map/ncbi-taxon-popup';
import { AdditionalDataSidebarVue } from '@/primary/common/additional-data-sidebar';
import { ParametersSidebarVue } from '@/primary/common/parameters-sidebar';

@Component({
  components: {
    AdditionalDataSidebarVue,
    TemplateTreeVue,
    MapLayoutVue,
    AncestorSidebarVue,
    SubtreeSidebarVue,
    ParametersSidebarVue,
    TaxonSearchBarVue,
    NCBITaxonPopupVue,
    TaxonTooltipVue,
  },
})
export default class NCBITreeMapComponent extends mixins(SubtreeMixin, TaxonMixin, AncestorMixin, ToolMixin) {
  @Prop({ type: String, required: false })
  tool!: string;

  @Prop({ type: Boolean, default: false })
  expertMode!: boolean;

  @Watch('expertMode')
  expertModeWatcher() {
    if (!this.expertMode) {
      const tool = this.tool === 'subtree' || this.tool === 'additional-data' ? undefined : this.tool;
      const routeQuery = { ...this.$router.currentRoute.value.query, subtree: undefined, additional: undefined, tool };
      this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
    }
  }
}
