import { type Taxon } from '@/domain/taxon/Taxon';
import { Numeral } from '@/domain/Numeral';
import type { TreeLocale } from '@/domain/tree/TreeLocale';

const TAXON_RANK_REQUIRING_NAME_IN_ITALIC = ['species', 'subspecies', 'genus'];

export interface RESTTaxon {
  id: string;
  taxid: [number];
  sci_name: [string];
  common_name_en?: [string];
  common_name_fr?: [string];
  common_name_es?: [string];
  common_name_de?: [string];
  synonym?: [string];
  nbdesc: [number];
  rank_en: [string];
  rank_fr: [string];
  rank_es: [string];
  rank_de: [string];
  zoom: [number];
  coordinates: [number, number];
}

function undefinedOrFirstElement(array: string[] | undefined): undefined | string {
  return array ? array[0] : undefined;
}

export function toTaxon(lang: TreeLocale): (restTaxon: RESTTaxon) => Taxon {
  return function (restTaxon: RESTTaxon): Taxon {
    return {
      id: restTaxon.id,
      ncbiId: restTaxon.taxid[0],
      name: restTaxon.sci_name[0],
      nameInItalic: TAXON_RANK_REQUIRING_NAME_IN_ITALIC.includes(restTaxon.rank_en[0]),
      commonName: undefinedOrFirstElement(restTaxon[`common_name_${lang}`]),
      synonyms: restTaxon.synonym ? restTaxon.synonym[0].split(', ').filter(Boolean) : [],
      rank: restTaxon[`rank_${lang}`][0],
      zoomLevel: restTaxon.zoom[0],
      descendants: Numeral.of(restTaxon.nbdesc[0]),
      coordinates: [restTaxon.coordinates[1], restTaxon.coordinates[0]],
    };
  };
}
