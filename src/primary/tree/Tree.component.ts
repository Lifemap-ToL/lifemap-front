import { Component, Inject, mixins, Prop, Watch } from 'vue-facing-decorator';
import { TemplateVue } from '@/primary/template';
import { NavbarVue } from '@/primary/common/navbar';
import { SubtreeMixin } from '@/primary/ncbi-tree-map/subtree-mixin/SubtreeMixin';
import { TaxonMixin } from '@/primary/common/taxon-mixin/TaxonMixin';
import { AncestorMixin } from '@/primary/common/ancestor-mixin/AncestorMixin';
import { ToolMixin } from '@/primary/common/tool-mixin/ToolMixin';
import { MapLayoutVue } from '@/primary/common/map-layout';
import { AncestorSidebarVue } from '@/primary/common/ancestor-sidebar';
import { SubtreeSidebarVue } from '@/primary/common/subtree-sidebar';
import { TaxonSearchBarVue } from '@/primary/common/taxon-search-bar';
import { NCBITaxonPopupVue } from '@/primary/ncbi-tree-map/ncbi-taxon-popup';
import { TaxonTooltipVue } from '@/primary/common/taxon-tooltip';
import { DropdownVue } from '@/primary/common/dropdown';
import { ModeDropdownVue } from '@/primary/tree/mode-dropdown';
import { SearchSidebarVue } from '@/primary/tree/search-sidebar';
import { AdditionalDataSidebarVue } from '@/primary/common/additional-data-sidebar';
import { ParametersSidebarVue } from '@/primary/common/parameters-sidebar';
import Map from 'ol/Map';
import type { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { markRaw } from 'vue';
import { GeneralPublicVersionModalVue } from '@/primary/homepage/general-public-version-modal';
import { HelpModalVue } from '@/primary/common/help-modal';

@Component({
  components: {
    ParametersSidebarVue,
    AdditionalDataSidebarVue,
    ModeDropdownVue,
    DropdownVue,
    TemplateVue,
    NavbarVue,
    MapLayoutVue,
    SearchSidebarVue,
    AncestorSidebarVue,
    SubtreeSidebarVue,
    TaxonSearchBarVue,
    NCBITaxonPopupVue,
    TaxonTooltipVue,
  },
})
export default class TreeComponent extends mixins(SubtreeMixin, TaxonMixin, AncestorMixin, ToolMixin) {
  @Prop({ type: String, required: false })
  readonly tool!: string;

  @Prop({ type: Boolean, default: false })
  readonly expertMode!: boolean;

  @Inject()
  readonly map!: () => Map;

  @Inject()
  private modalBus!: () => MittModalBus;

  @Inject()
  globalWindow!: () => Window & typeof globalThis;

  @Watch('expertMode')
  expertModeWatcher() {
    if (!this.expertMode) {
      const tool = this.tool === 'subtree' || this.tool === 'additional-data' ? undefined : this.tool;
      const routeQuery = { ...this.$router.currentRoute.value.query, subtree: undefined, additional: undefined, tool };
      this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
    }
  }

  exportAsPng() {
    this.map()
      .getTargetElement()
      .querySelector('canvas')!
      .toBlob((blob: Blob | null) => {
        const [, year, month, day] = new Date().toISOString().match(/^(\d{4})-(\d{2})-(\d{2})/)!;
        const filename = `lifemap_${year}-${month}-${day}.png`;
        const link = this.globalWindow().document.createElement('a');
        this.globalWindow().document.body.appendChild(link);
        link.href = this.globalWindow().URL.createObjectURL(blob!);
        link.download = filename;
        link.click();
        this.globalWindow().URL.revokeObjectURL(link.href);
        this.globalWindow().document.body.removeChild(link);
      });
  }

  openHelpModal() {
    this.modalBus().open({ component: markRaw(HelpModalVue) });
  }
}
