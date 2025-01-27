import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { type Taxon } from '@/domain/taxon/Taxon';
import { fromLonLat } from 'ol/proj';

export type TaxonFeature = Feature<Point>;

export interface TaxonFeatureProperties {
  id: string;
  ncbiId: number;
  name: string;
  nameInItalic: boolean;
  commonName?: string;
  rank: string;
  zoomLevel: number;
  descendants: string;
  sequencedGenomes?: number;
  sequencedGenomesFormatted?: string;
  ncbiLink: string;
  labelNameCSSFont: string;
  labelCommonNameCSSFont?: string;
}

function computeLabelNameFontSize(taxonZoomLevel: number, zoomLevel: number): number {
  return 26 - (taxonZoomLevel - zoomLevel) * 2;
}

function buildLabelNameCSSFont(taxonRank: string, labelNameFontSize: number, labelNameInItalic: boolean): string {
  const labelNameFontStyle = labelNameInItalic ? 'italic' : '';
  return `${labelNameFontStyle} ${labelNameFontSize}px sans-serif`;
}

function buildLabelCommonNameCSSFont(labelNameFontSize: number): string | undefined {
  const labelCommonNameFontSize = labelNameFontSize - 8;
  return labelCommonNameFontSize > 10 ? `${labelCommonNameFontSize}px sans-serif` : undefined;
}

export function toTaxonFeatureProperties(taxon: Taxon, zoom: number): TaxonFeatureProperties {
  const labelNameFontSize = computeLabelNameFontSize(taxon.zoomLevel, zoom);
  const labelNameCSSFont = buildLabelNameCSSFont(taxon.rank, labelNameFontSize, taxon.nameInItalic);
  const labelCommonNameCSSFont = buildLabelCommonNameCSSFont(labelNameFontSize);

  return {
    id: taxon.id,
    ncbiId: taxon.ncbiId,
    name: taxon.name,
    nameInItalic: taxon.nameInItalic,
    commonName: taxon.commonName,
    rank: taxon.rank,
    zoomLevel: taxon.zoomLevel,
    descendants: taxon.descendants.toHuman(),
    sequencedGenomes: taxon.sequencedGenomes?.get(),
    sequencedGenomesFormatted: taxon.sequencedGenomes?.toHuman(),
    ncbiLink: `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${taxon.ncbiId}&mode=info`,
    labelNameCSSFont,
    labelCommonNameCSSFont,
  };
}

export function toTaxonFeature(zoom: number): (taxon: Taxon) => TaxonFeature {
  return (taxon: Taxon) => {
    const coordinates = fromLonLat(taxon.coordinates);
    const point = new Point(coordinates);
    const feature = new Feature(point);
    feature.setProperties(toTaxonFeatureProperties(taxon, zoom));
    feature.setId(taxon.id);
    return feature;
  };
}

export function updateFeature(taxonFeature: TaxonFeature, zoom: number) {
  const labelNameFontSize = computeLabelNameFontSize(taxonFeature.get('zoomLevel'), zoom);
  const labelNameCSSFont = buildLabelNameCSSFont(taxonFeature.get('rank'), labelNameFontSize, taxonFeature.get('nameInItalic'));
  const labelCommonNameCSSFont = buildLabelCommonNameCSSFont(labelNameFontSize);

  taxonFeature.set('labelNameCSSFont', labelNameCSSFont);
  taxonFeature.set('labelCommonNameCSSFont', labelCommonNameCSSFont);
}
