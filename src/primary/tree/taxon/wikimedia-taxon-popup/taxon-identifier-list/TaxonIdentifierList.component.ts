import { Component, Prop, Vue } from 'vue-facing-decorator';
import type { TaxonFeatureProperties } from '@/primary/tree/taxon/TaxonFeature';
import type { TaxonWikidataRecordProjection } from '@/primary/tree/taxon/wikimedia-taxon-popup/TaxonWikidataRecordProjection';

@Component
export default class TaxonIdentifierListComponent extends Vue {
  @Prop({ type: Object, required: true })
  taxon!: TaxonFeatureProperties;

  @Prop({ type: Object, required: true })
  taxonWikidataRecord!: TaxonWikidataRecordProjection;
}
