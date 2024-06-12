import { Component, Prop, Vue } from 'vue-facing-decorator';
import { TaxonPopupVue } from '@/primary/common/taxon-popup';
import { type TaxonFeatureProperties } from '@/primary/common/taxon/TaxonFeature';

@Component({ components: { TaxonPopupVue } })
export default class NCBITaxonPopupComponent extends Vue {
  @Prop({ type: Object, required: true })
  taxon!: TaxonFeatureProperties;

  @Prop({ type: Boolean, default: false })
  expertMode!: boolean;
}
