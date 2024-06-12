import { type Taxon } from '@/domain/taxon/Taxon';
import { Numeral } from '@/domain/Numeral';

export interface RESTTaxon {
  id: string;
  taxid: [number];
  sci_name: [string];
  common_name?: [string];
  nbdesc: [number];
  rank: [string];
  zoom: [number];
  coordinates: [number, number];
}

export function toTaxon(restTaxon: RESTTaxon): Taxon {
  return {
    id: restTaxon.id,
    ncbiId: restTaxon.taxid[0],
    name: restTaxon.sci_name[0],
    commonName: restTaxon.common_name ? restTaxon.common_name[0] : undefined,
    rank: restTaxon.rank[0],
    zoomLevel: restTaxon.zoom[0],
    descendants: Numeral.of(restTaxon.nbdesc[0]),
    coordinates: [restTaxon.coordinates[1], restTaxon.coordinates[0]],
  };
}
