import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import Map from 'ol/Map';
import { Feature } from 'ol';
import { type Select } from '@/primary/common/map/interaction/Select';
import { type Extent } from '@/domain/map/Extent';
import { type TaxonFeature, type TaxonFeatureProperties, toTaxonFeature } from '@/primary/common/taxon/TaxonFeature';
import { type Taxon } from '@/domain/taxon/Taxon';

@Component
export class TaxonMixin extends Vue {
  @Prop({ type: String, required: false })
  additional?: 'genomes';

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private taxonLayer!: () => VectorLayer<VectorSource<Point>>;

  @Inject()
  readonly map!: () => Map;

  selectedTaxon: Feature<Point> | null = null;
  highlightedTaxon: Feature<Point> | null = null;

  taxonSource!: VectorSource<Point>;
  select!: Select;

  created() {
    this.taxonSource = this.taxonLayer().getSource()!;
    this.select = this.map().getInteractions().item(0) as Select;
    this.select.on('selectable', this.onSelectableTaxon);
    this.select.on('select', this.onSelectTaxon);
    this.select.on('unselect', this.onUnselectTaxon);
    this.map().on('moveend', this.onMapMoveEnd);
  }

  mounted() {
    this.map()
      .getOverlayById('taxon-tooltip')
      .setElement((this.$refs['taxon-tooltip']! as any).$el);
  }

  unmounted() {
    this.select.un('selectable', this.onSelectableTaxon);
    this.select.un('select', this.onSelectTaxon);
    this.select.un('unselect', this.onUnselectTaxon);
    this.map().un('moveend', this.onMapMoveEnd);
    this.taxonSource.clear();
  }

  private onSelectableTaxon(event: any) {
    this.highlightedTaxon = event.feature;
  }

  private onUnselectTaxon() {
    this.selectedTaxon = null;
  }

  private onSelectTaxon(event: any) {
    this.selectedTaxon = event.feature;
  }

  private loadTaxa() {
    const extent = this.map().getView().calculateExtent() as Extent;
    const zoom = Math.round(this.map().getView().getZoom()!);

    this.taxonRepository()
      .listForExtent(zoom + 4, extent, this.additional === 'genomes')
      .then(taxa => {
        const taxonFeatures = taxa.map(toTaxonFeature(zoom));
        this.taxonSource.clear();

        taxonFeatures
          .filter(taxonFeature => this.taxonSource.getFeatureById(taxonFeature.getProperties().id) === null)
          .filter(taxonFeature => taxonFeature.getId() !== this.selectedTaxon?.getId())
          .forEach(taxonFeature => {
            this.taxonSource.addFeature(taxonFeature);
          });

        if (this.selectedTaxon) {
          this.taxonSource.addFeature(this.selectedTaxon);
        }
      });
  }

  private onMapMoveEnd() {
    this.loadTaxa();
  }

  zoomToTaxon(taxonFeature: TaxonFeature): void {
    const view = this.map().getView();
    const destination = taxonFeature.getGeometry()?.getCoordinates();
    const properties = taxonFeature.getProperties() as TaxonFeatureProperties;
    view.setCenter(destination);
    view.setZoom(properties.zoomLevel - 1);
  }

  public searchTaxon(searchedTaxon: Taxon): void {
    const searchTaxonFeature = toTaxonFeature(5)(searchedTaxon);
    const taxa = this.taxonSource.getFeatures();
    const existingTaxonFeature = taxa.find(feature => feature.getId() === searchTaxonFeature.getId());
    const taxonFeature = existingTaxonFeature || searchTaxonFeature;
    const taxonFeatureToSelect = taxonFeature?.getId() === this.selectedTaxon?.getId() ? undefined : taxonFeature;
    this.zoomToTaxon(taxonFeature);

    if (taxonFeatureToSelect) {
      const zoom = Math.round(this.map().getView().getZoom()!);
      taxonFeatureToSelect.set('labelFontSize', 26 - (taxonFeatureToSelect.get('zoomLevel') - zoom) * 2);
      this.select.select(taxonFeatureToSelect);
      this.updateSelectedTaxonSequencedGenomes();
    }
  }

  public unselectTaxon() {
    this.select.unselect();
  }

  private updateSelectedTaxonSequencedGenomes() {
    if (this.selectedTaxon) {
      if (this.additional === 'genomes') {
        this.taxonRepository()
          .findSequencedGenomes(this.selectedTaxon!.get('ncbiId'))
          .then(sequencedGenomes => {
            this.selectedTaxon!.set('sequencedGenomes', sequencedGenomes.get());
            this.selectedTaxon!.set('sequencedGenomesFormatted', sequencedGenomes.toHuman());
          });
        return;
      }

      this.selectedTaxon!.set('sequencedGenomes', undefined);
      this.selectedTaxon!.set('sequencedGenomesFormatted', undefined);
    }
  }

  @Watch('additional')
  additionalWatcher() {
    this.loadTaxa();
    this.updateSelectedTaxonSequencedGenomes();
  }
}
