import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import Map from 'ol/Map';
import type VectorLayer from 'ol/layer/Vector';
import type VectorSource from 'ol/source/Vector';
import { LineString } from 'ol/geom';
import { type Taxon } from '@/domain/taxon/Taxon';
import { Feature } from 'ol';
import { findCommon, sliceTo } from '@/domain/Array';
import { all } from 'axios';
import { resolve } from '@/domain/Promise';

@Component
export class AncestorMixin extends Vue {
  @Prop({ type: Array, required: true })
  readonly ancestorRequest!: number[];

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private ancestorRouteLayer!: () => VectorLayer<VectorSource<LineString>>;

  @Inject()
  readonly map!: () => Map;

  ancestor?: Taxon;
  ancestorRoute: Taxon[] = [];

  unmounted() {
    this.ancestorRouteLayer().getSource()?.clear();
  }

  private updateAncestorRouteLayer() {
    const ancestorIndex = this.ancestorRoute.findIndex(taxon => taxon.id === this.ancestor?.id);
    const ancestorRouteSource = this.ancestorRouteLayer().getSource();
    const coordinates = this.ancestorRoute.map(taxon => taxon.coordinates);
    const lineString = new LineString(coordinates);
    const feature = new Feature(lineString);
    feature.set('ancestorIndex', ancestorIndex);
    ancestorRouteSource!.addFeature(feature);
  }

  private setAncestorRoute(ancestries: number[][], ancestor: number): number[] {
    const routeStart = sliceTo(ancestries[0], ancestor);
    const routeEnd = sliceTo(ancestries[1], ancestor, false);
    return [...routeStart, ...routeEnd.reverse()] as number[];
  }

  private findAncestorId(ancestries: number[][]): number {
    return findCommon(ancestries[0], ancestries[1])!;
  }

  private findAncestor(ancestorRoute: Taxon[], ancestorId: number): Taxon | undefined {
    return ancestorRoute.find(taxon => taxon.ncbiId === ancestorId);
  }

  private async processAncestorRequest(ncbiId1: number, ncbiId2: number): Promise<void> {
    return this.taxonRepository()
      .listAncestors([ncbiId1, ncbiId2])
      .then(ancestries => all([this.findAncestorId(ancestries), resolve(ancestries)]))
      .then(([ancestorId, ancestries]) => all([resolve(ancestorId), this.setAncestorRoute(ancestries, ancestorId)]))
      .then(([ancestorId, route]) => all([resolve(ancestorId), this.taxonRepository().listByNCBIIds(route)]))
      .then(([ancestorId, taxa]) => {
        this.ancestor = this.findAncestor(taxa, ancestorId);
        this.ancestorRoute = taxa;
        this.updateAncestorRouteLayer();
        this.fitToAncestorRoute(0);
        const routeQuery = { ...this.$router.currentRoute.value.query, tool: 'ancestor' };
        this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
      });
  }

  private clearAncestorProcessing() {
    this.ancestor = undefined;
    this.ancestorRoute = [];
    this.ancestorRouteLayer().getSource()?.clear();
  }

  public fitToAncestorRoute(animationDuration = 1000) {
    const extent = this.ancestorRouteLayer().getSource()?.getExtent();
    const view = this.map().getView();
    view.fit(extent!, { padding: [60, 320, 20, 360], duration: animationDuration });
  }

  @Watch('ancestorRequest')
  ancestorRequestWatcher(newAncestorRequest: number[], oldAncestorRequest: number[]) {
    if (JSON.stringify(newAncestorRequest) !== JSON.stringify(oldAncestorRequest)) {
      this.clearAncestorProcessing();

      if (this.ancestorRequest.length === 2) {
        this.processAncestorRequest(this.ancestorRequest[0], this.ancestorRequest[1]);
      }
    }
  }
}
