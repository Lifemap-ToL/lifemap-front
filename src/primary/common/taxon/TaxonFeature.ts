import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { type Taxon } from '@/domain/taxon/Taxon';

export type TaxonFeature = Feature<Point>;

export interface TaxonFeatureProperties {
  id: string;
  ncbiId: number;
  name: string;
  commonName?: string;
  rank: string;
  zoomLevel: number;
  descendants: string;
  sequencedGenomes?: number;
  sequencedGenomesFormatted?: string;
  ncbiLink: string;
  labelFontSize: number;
}

function toTaxonFeatureProperties(taxon: Taxon, zoom: number): TaxonFeatureProperties {
  return {
    id: taxon.id,
    ncbiId: taxon.ncbiId,
    name: taxon.name,
    commonName: taxon.commonName,
    rank: taxon.rank,
    zoomLevel: taxon.zoomLevel,
    descendants: taxon.descendants.toHuman(),
    sequencedGenomes: taxon.sequencedGenomes?.get(),
    sequencedGenomesFormatted: taxon.sequencedGenomes?.toHuman(),
    ncbiLink: `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${taxon.ncbiId}&mode=info`,
    labelFontSize: 26 - (taxon.zoomLevel - zoom) * 2,
  };
}

export function toTaxonFeature(zoom: number): (taxon: Taxon) => TaxonFeature {
  return (taxon: Taxon) => {
    const coordinates = taxon.coordinates;
    const point = new Point(coordinates);
    const feature = new Feature(point);
    feature.setProperties(toTaxonFeatureProperties(taxon, zoom));
    feature.setId(taxon.id);
    return feature;
  };
}
