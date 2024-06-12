import { Component, Prop, Vue } from 'vue-facing-decorator';
import { type WikidataRecordProjection } from '@/primary/common/taxon-popup/WikidataRecordProjection';
import type { TaxonFeatureProperties } from '@/primary/common/taxon/TaxonFeature';

@Component
export default class TaxonIdentifierListComponent extends Vue {
  @Prop({ type: Object, required: true })
  taxon!: TaxonFeatureProperties;

  @Prop({ type: Object, required: true })
  wikidataRecord!: WikidataRecordProjection;

  created() {
    console.log(this.wikidataRecord);
  }
}
