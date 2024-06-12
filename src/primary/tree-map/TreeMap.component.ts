import { Component, mixins } from 'vue-facing-decorator';
import { TemplateTreeVue } from '@/primary/common/template-tree';
import { TaxonSearchBarVue } from '@/primary/common/taxon-search-bar';
import { MapLayoutVue } from '@/primary/common/map-layout';
import { AncestorSidebarVue } from '@/primary/common/ancestor-sidebar';
import { TaxonPopupVue } from '@/primary/common/taxon-popup';
import { AncestorMixin } from '@/primary/common/ancestor-mixin/AncestorMixin';
import { ToolMixin } from '@/primary/common/tool-mixin/ToolMixin';
import { TaxonMixin } from '@/primary/common/taxon-mixin/TaxonMixin';
import { TaxonTooltipVue } from '@/primary/common/taxon-tooltip';

@Component({
  components: {
    TemplateTreeVue,
    MapLayoutVue,
    AncestorSidebarVue,
    TaxonSearchBarVue,
    TaxonPopupVue,
    TaxonTooltipVue,
  },
})
export default class TreeMapComponent extends mixins(TaxonMixin, AncestorMixin, ToolMixin) {}
