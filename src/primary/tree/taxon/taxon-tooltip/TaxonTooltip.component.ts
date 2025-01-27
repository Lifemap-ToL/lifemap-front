import { Component, Prop, Vue } from 'vue-facing-decorator';
import { type Point } from 'ol/geom';
import { type Feature } from 'ol';

@Component
export default class TaxonTooltipComponent extends Vue {
  @Prop({ type: Object, required: false })
  taxon?: Feature<Point>;

  get taxonName(): string {
    return this.taxon ? this.taxon.get('name') : '';
  }

  get taxonNameInItalic(): boolean {
    return this.taxon ? this.taxon.get('nameInItalic') : false;
  }

  get taxonSequencedGenomes(): string {
    return this.taxon ? this.taxon.get('sequencedGenomesFormatted') : '';
  }
}
