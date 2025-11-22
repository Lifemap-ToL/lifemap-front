import { Component, Inject, mixins, Prop } from 'vue-facing-decorator';
import { TemplateVue } from '@/primary/common/template';
import { NavbarVue } from '@/primary/tree/navbar';
import { SubtreeMixin } from '@/primary/tree/subtree/SubtreeMixin';
import { TaxonMixin } from '@/primary/tree/taxon/TaxonMixin';
import { AncestorMixin } from '@/primary/tree/ancestor/AncestorMixin';
import { ToolMixin } from '@/primary/tree/ToolMixin';
import { MapLayoutVue } from '@/primary/common/map-layout';
import { AncestorSidebarVue } from '@/primary/tree/ancestor/ancestor-sidebar';
import { SubtreeSidebarVue } from '@/primary/tree/subtree/subtree-sidebar';
import { TaxonSearchBarVue } from '@/primary/tree/taxon/taxon-search-bar';
import { TaxonTooltipVue } from '@/primary/tree/taxon/taxon-tooltip';
import { DropdownVue } from '@/primary/common/dropdown';
import { SearchSidebarVue } from '@/primary/tree/search/search-sidebar';
import { AdditionalDataSidebarVue } from '@/primary/tree/additional-data/additional-data-sidebar';
import { ParametersSidebarVue } from '@/primary/tree/parameters/parameters-sidebar';
import Map from 'ol/Map';
import { WikimediaTaxonPopupVue } from '@/primary/tree/taxon/wikimedia-taxon-popup';
import type { TreeRepository } from '@/domain/tree/TreeRepository';
import { ComponentState } from '@/primary/ComponentState';
import { MessageVue } from '@/primary/common/message';
import { LUCAMixin } from '@/primary/tree/luca/LUCAMixin';
import { LUCAPopupVue } from '@/primary/tree/luca/luca-popup';
import { LUCATooltipVue } from '@/primary/tree/luca/luca-tooltip';

@Component({
  components: {
    ParametersSidebarVue,
    AdditionalDataSidebarVue,
    DropdownVue,
    TemplateVue,
    NavbarVue,
    MapLayoutVue,
    SearchSidebarVue,
    AncestorSidebarVue,
    SubtreeSidebarVue,
    TaxonSearchBarVue,
    TaxonTooltipVue,
    WikimediaTaxonPopupVue,
    LUCATooltipVue,
    LUCAPopupVue,
    MessageVue,
  },
})
export default class TreeComponent extends mixins(SubtreeMixin, TaxonMixin, AncestorMixin, ToolMixin, LUCAMixin) {
  @Prop({ type: String, required: false })
  readonly tool!: string;

  @Inject()
  private treeRepository!: () => TreeRepository;

  @Inject()
  readonly map!: () => Map;

  @Inject()
  globalWindow!: () => Window & typeof globalThis;

  state = ComponentState.PENDING;

  created() {
    this.treeRepository()
      .findIfTreeIsDisplayable()
      .then(treeDisplayable => (this.state = treeDisplayable ? ComponentState.SUCCESS : ComponentState.ERROR))
      .catch(() => (this.state = ComponentState.ERROR));
  }

  openFeedback() {
    const subject = encodeURIComponent('[Lifemap] Feedback');
    const body = encodeURIComponent('Hello,\n\nI would like to provide the following feedback:\n');

    // hide email from bots
    const email = ['damien.de-vienne', 'cnrs.fr'].join('@');
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    this.globalWindow().location.href = mailtoLink;
  }

  exportAsPng() {
    this.map()
      .getTargetElement()
      .querySelector('canvas')!
      .toBlob((blob: Blob | null) => {
        const [, year, month, day] = new Date().toISOString().match(/^(\d{4})-(\d{2})-(\d{2})/)!;
        const filename = `lifemap_${year}-${month}-${day}.jpg`;
        const link = this.globalWindow().document.createElement('a');
        this.globalWindow().document.body.appendChild(link);
        link.href = this.globalWindow().URL.createObjectURL(blob!);
        link.download = filename;
        link.click();
        this.globalWindow().URL.revokeObjectURL(link.href);
        this.globalWindow().document.body.removeChild(link);
      }, 'image/jpeg');
  }
}
