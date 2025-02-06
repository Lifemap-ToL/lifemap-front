import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import type VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { type Taxon } from '@/domain/taxon/Taxon';
import { all } from '@/domain/Promise';
import { LineString, Point } from 'ol/geom';
import { Map, Feature } from 'ol';
import { TaxonTree } from '@/domain/taxon/TaxonTree';
import { fromLonLat } from 'ol/proj';

const MOBILE_MAX_WIDTH = 650;

@Component
export class SubtreeMixin extends Vue {
  @Prop({ type: Array, required: true })
  readonly subtree!: number[];

  @Inject()
  private taxonRepository!: () => TaxonRepository;

  @Inject()
  private subtreeLayer!: () => VectorLayer<VectorSource>;

  @Inject()
  private map!: () => Map;

  @Inject()
  private globalWindow!: () => Window;

  private subtreeBranches: Taxon[][] = [];
  private taxonSubtree = new TaxonTree([]);

  get subtreeLeafs(): Taxon[] {
    return this.subtreeBranches.map(branch => branch[0]);
  }

  mounted() {
    this.updateSubtree();
  }

  private mobile() {
    return this.globalWindow().document.body.clientWidth < MOBILE_MAX_WIDTH;
  }

  private removeBranches(): void {
    this.subtreeBranches = this.subtreeBranches.filter(branch => this.subtree.includes(branch[0].ncbiId));
  }

  private async listTaxonAncestries(ncbiIds: number[]) {
    return this.taxonRepository()
      .listAncestors(ncbiIds)
      .then(ancestries => all<Taxon[]>(ancestries.map(ancestry => this.taxonRepository().listByNCBIIds(ancestry))))
      .then(taxonAncestries => (this.subtreeBranches = [...this.subtreeBranches, ...taxonAncestries]))
      .catch(error => {
        console.error(error);
      });
  }

  private async addBranches() {
    const leafs = this.subtreeLeafs.map(leaf => leaf.ncbiId);
    const newLeafs = this.subtree.filter(ncbiId => !leafs.includes(ncbiId));
    return newLeafs.length === 0 ? Promise.resolve() : this.listTaxonAncestries(newLeafs);
  }

  private updateSubtreeLayer() {
    const features: Feature<LineString>[] = [];
    let coveredTaxa: number[] = [];

    this.taxonSubtree = new TaxonTree(this.subtreeBranches);

    this.subtreeBranches.forEach(branch => {
      const foundIndex = branch.findIndex(taxon => coveredTaxa.includes(taxon.ncbiId));
      const index = foundIndex > -1 ? foundIndex : branch.length - 1;
      const newTaxa = branch.slice(0, index + 1);
      const newNCBIIds = newTaxa.map(taxon => taxon.ncbiId);
      const lineStringCoordinates = newTaxa.map(taxon => fromLonLat(taxon.coordinates));
      const lineString = new LineString(lineStringCoordinates);
      features.push(new Feature(lineString));
      coveredTaxa = [...coveredTaxa, ...newNCBIIds];
    });

    const subtreeLayerSource = this.subtreeLayer().getSource();
    subtreeLayerSource?.clear();
    subtreeLayerSource?.addFeatures(features);
  }

  private getLineStringExtremeCoordinates(feature: Feature<LineString>): number[][] {
    const coordinates = feature.getGeometry()!.getCoordinates();
    return [coordinates[0], coordinates[coordinates.length - 1]];
  }

  private fitView() {
    const source = this.subtreeLayer().getSource()!;
    const features = source.getFeatures();

    if (features.length > 0) {
      const extremesCoordinates = features.map(feature => this.getLineStringExtremeCoordinates(feature)).flat();
      const pointsCoordinates = features.length === 1 ? extremesCoordinates : [extremesCoordinates[0], ...extremesCoordinates.slice(2)];
      const points = pointsCoordinates.map(pointCoordinates => new Feature(new Point(pointCoordinates)));
      const extent = new VectorSource({ features: points }).getExtent();
      const view = this.map().getView();
      const padding = this.mobile() ? [20, 20, 20, 60] : [60, 320, 20, 360];
      view.fit(extent!, { padding, duration: 0 });
    }
  }

  private updateSubtree() {
    this.removeBranches();
    this.addBranches().then(this.updateSubtreeLayer).then(this.fitView);
  }

  @Watch('subtree')
  subtreeWatcher(newSubtree: number[], previousSubtree: number[]) {
    if (JSON.stringify(newSubtree) !== JSON.stringify(previousSubtree)) {
      this.updateSubtree();
    }
  }
}
