import { IUCNStatus } from '@/domain/taxon/wikimedia/IUCNStatus';
import type { TaxonWikidataRecord } from '@/domain/taxon/TaxonWikidataRecord';
import type { AppLocale } from '@/locale/languages';

export interface TaxonWikidataRecordProjection {
  iucnStatusImageURL?: string;
  iucnIds: string[];
  gbifIds: string[];
  inaturalistIds: string[];
  openTreeOfLifeIds: string[];
  catalogueOfLifeIds: string[];
  wormsIds: string[];
  taxRefIds: string[];
}

const IMAGES_BASE_URL = './images/';

function toIUCNStatusImageURL(iucnStatus: IUCNStatus, locale: AppLocale): string {
  return `${IMAGES_BASE_URL}${iucnStatus}_${locale.toUpperCase()}.svg`;
}

export function toTaxonWikidataRecordProjection(
  taxonWikidataRecord: TaxonWikidataRecord,
  locale: AppLocale
): TaxonWikidataRecordProjection {
  return {
    iucnStatusImageURL: taxonWikidataRecord.iucnStatus ? toIUCNStatusImageURL(taxonWikidataRecord.iucnStatus, locale) : undefined,
    iucnIds: taxonWikidataRecord.iucnIds,
    gbifIds: taxonWikidataRecord.gbifIds,
    inaturalistIds: taxonWikidataRecord.inaturalistIds,
    openTreeOfLifeIds: taxonWikidataRecord.openTreeOfLifeIds,
    catalogueOfLifeIds: taxonWikidataRecord.catalogueOfLifeIds,
    wormsIds: taxonWikidataRecord.wormsIds,
    taxRefIds: taxonWikidataRecord.taxRefIds,
  };
}
