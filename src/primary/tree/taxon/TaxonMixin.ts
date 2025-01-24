import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import Map from 'ol/Map';
import { Feature } from 'ol';
import { type Select } from '@/primary/tree/map/interaction/Select';
import { type Extent } from '@/domain/map/Extent';
import { type TaxonFeature, type TaxonFeatureProperties, toTaxonFeature, updateFeature } from '@/primary/tree/taxon/TaxonFeature';
import { type Taxon } from '@/domain/taxon/Taxon';
import type { AppBus } from '@/primary/common/AppBus';
import { transformExtent } from 'ol/proj';
import type { Logger } from '@/domain/Logger';
import type { AlertBus } from '@/domain/alert/AlertBus';
import { AlertMessageType } from '@/domain/alert/AlertMessageType';
import { markRaw } from 'vue';
import { TaxonModalVue } from '@/primary/tree/taxon/taxon-modal';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';

const MOBILE_MAX_WIDTH = 650;

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

  @Inject()
  readonly modalBus!: () => MittModalBus;

  @Inject()
  private appBus!: () => AppBus;

  @Inject()
  private alertBus!: () => AlertBus;

  @Inject()
  private logger!: () => Logger;

  @Inject()
  private globalWindow!: () => Window;

  selectedTaxon: Feature<Point> | null = null;
  highlightedTaxon: Feature<Point> | null = null;

  taxonSource!: VectorSource<Point>;
  taxonSelect!: Select;

  get defaultTaxonIdToSelect(): number | undefined {
    const { subtree, tid } = this.$router.currentRoute.value.query as Record<string, string>;
    return tid && !subtree && /^\d+$/.test(tid) ? parseInt(tid) : undefined;
  }

  created() {
    this.taxonSource = this.taxonLayer().getSource()!;
    this.taxonSelect = this.map().getInteractions().item(0) as Select;
    this.taxonSelect.on('selectable', this.onSelectableTaxon);
    this.taxonSelect.on('select', this.onSelectTaxon);
    this.taxonSelect.on('unselect', this.onUnselectTaxon);
    this.map().on('moveend', this.onMapMoveEnd);
    this.appBus().on('changelocale', this.loadTaxa);
    this.selectDefaultTaxonIdIfDefined();
  }

  mounted() {
    this.map().once('change:target', () => {
      this.map()
        .getOverlayById('taxon-tooltip')
        .setElement((this.$refs['taxon-tooltip']! as any).$el);
    });
  }

  unmounted() {
    this.taxonSelect.unselect();
    this.taxonSelect.un('selectable', this.onSelectableTaxon);
    this.taxonSelect.un('select', this.onSelectTaxon);
    this.taxonSelect.un('unselect', this.onUnselectTaxon);
    this.map().un('moveend', this.onMapMoveEnd);
    this.appBus().off('changelocale', this.loadTaxa);
  }

  private mobile() {
    return this.globalWindow().document.body.clientWidth < MOBILE_MAX_WIDTH;
  }

  private selectDefaultTaxonIdIfDefined() {
    if (this.defaultTaxonIdToSelect) {
      this.findTaxonByNCBIId(this.defaultTaxonIdToSelect).then(this.searchTaxonIfDefined).catch(this.logNoTaxonFoundError);
    }
  }

  private logNoTaxonFoundError(error: Error) {
    this.logger().error(`No taxon found for NCBI ID ${this.defaultTaxonIdToSelect}`, error);
  }

  private findTaxonByNCBIId(id: number) {
    return this.taxonRepository().findByNCBIId(id);
  }

  private onSelectableTaxon(event: any) {
    this.highlightedTaxon = event.feature;
  }

  private onUnselectTaxon() {
    this.selectedTaxon = null;
    this.removeTaxonFromRoute();
  }

  private onSelectTaxon(event: any) {
    this.addTaxonToRoute(event.feature.get('ncbiId'));

    if (this.mobile()) {
      this.openTaxonModal(event.feature);
      return;
    }

    this.selectedTaxon = event.feature;
  }

  private addTaxonToRoute(taxonId: number) {
    const routeQuery = { ...this.$router.currentRoute.value.query, tid: taxonId };
    this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
  }

  private removeTaxonFromRoute() {
    const routeQuery = { ...this.$router.currentRoute.value.query, tid: undefined };
    this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
  }

  private loadTaxa() {
    const extent = transformExtent(this.map().getView().calculateExtent(), 'EPSG:3857', 'EPSG:4326') as Extent;
    const zoom = Math.round(this.map().getView().getZoom()!);

    this.taxonRepository()
      .listForExtent(zoom + 4, extent, this.additional === 'genomes')
      .then(taxa => {
        const taxonFeatures = taxa.map(toTaxonFeature(zoom));
        this.taxonSource.clear();

        taxonFeatures
          .filter(taxonFeature => this.taxonSource.getFeatureById(taxonFeature.getProperties().id) === null)
          .filter(taxonFeature => taxonFeature.getId() !== this.selectedTaxon?.getId())
          .forEach(taxonFeature => this.taxonSource.addFeature(taxonFeature));

        if (this.selectedTaxon) {
          updateFeature(this.selectedTaxon, zoom);
          this.taxonSource.addFeature(this.selectedTaxon);
        }
      })
      .catch(error => {
        this.logger().error(`Fail to retrieve taxa for extent: ${extent}`, error);
        this.alertBus().alert({ message: this.$t('taxon-retrieval-error-message'), type: AlertMessageType.ERROR });
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

  private searchTaxonIfDefined(taxon: Taxon | undefined) {
    if (taxon) {
      this.searchTaxon(taxon, true, !this.mobile());
    }
  }

  private findTaxonFeature(searchedTaxon: Taxon): TaxonFeature {
    const searchTaxonFeature = toTaxonFeature(5)(searchedTaxon);
    const taxa = this.taxonSource.getFeatures();
    const existingTaxonFeature = taxa.find(feature => feature.getId() === searchTaxonFeature.getId());

    if (!existingTaxonFeature) {
      this.taxonSource.addFeature(searchTaxonFeature);
    }

    return existingTaxonFeature || searchTaxonFeature;
  }

  public searchTaxon(searchedTaxon: Taxon, zoom = true, select = true): void {
    if (searchedTaxon.id === 'root') {
      this.unselectTaxon();
      return;
    }

    const taxonFeature = this.findTaxonFeature(searchedTaxon);
    const taxonFeatureToSelect = taxonFeature?.getId() === this.selectedTaxon?.getId() ? undefined : taxonFeature;

    if (zoom) {
      this.zoomToTaxon(taxonFeature);
    }

    if (taxonFeatureToSelect && select) {
      this.taxonSelect.select(taxonFeatureToSelect);
      this.updateSelectedTaxonSequencedGenomes();
    }
  }

  public unselectTaxon() {
    this.taxonSelect.unselect();
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

  private openTaxonModal(taxonFeature: TaxonFeature) {
    this.modalBus().open({
      component: markRaw(TaxonModalVue),
      props: {
        taxonNCBIId: taxonFeature.getProperties().ncbiId,
        onClose: () => this.unselectTaxon(),
      },
    });
  }

  @Watch('additional')
  additionalWatcher() {
    this.loadTaxa();
    this.updateSelectedTaxonSequencedGenomes();
  }
}
