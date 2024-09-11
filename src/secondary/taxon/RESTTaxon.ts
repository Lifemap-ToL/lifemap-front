import { type Taxon } from '@/domain/taxon/Taxon';
import { Numeral } from '@/domain/Numeral';

export interface RESTTaxon {
  id: string;
  taxid: [number];
  sci_name: [string];
  common_name_en?: [string];
  common_name_fr?: [string];
  nbdesc: [number];
  rank_en: [string];
  rank_fr: [string];
  zoom: [number];
  coordinates: [number, number];
}

function undefinedOrFirstElement(array: string[] | undefined): undefined | string {
  return array ? array[0] : undefined;
}

export function toTaxon(lang: 'en' | 'fr'): (restTaxon: RESTTaxon) => Taxon {
  return function (restTaxon: RESTTaxon): Taxon {
    return {
      id: restTaxon.id,
      ncbiId: restTaxon.taxid[0],
      name: restTaxon.sci_name[0],
      commonName: lang === 'fr' ? undefinedOrFirstElement(restTaxon.common_name_fr) : undefinedOrFirstElement(restTaxon.common_name_en),
      rank: lang === 'fr' ? restTaxon.rank_fr[0] : restTaxon.rank_en[0],
      zoomLevel: restTaxon.zoom[0],
      descendants: Numeral.of(restTaxon.nbdesc[0]),
      coordinates: [restTaxon.coordinates[1], restTaxon.coordinates[0]],
    };
  };
}
