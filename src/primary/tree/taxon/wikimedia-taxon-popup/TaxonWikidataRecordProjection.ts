import { IUCNStatus } from '@/domain/taxon/wikimedia/IUCNStatus';
import type { TaxonWikidataRecord } from '@/domain/taxon/TaxonWikidataRecord';

export interface TaxonWikidataRecordProjection {
  iucnStatusImageURL?: string;
  iucnIds: string[];
  gbifIds: string[];
  inaturalistIds: string[];
  openTreeOfLifeIds: string[];
  catalogueOfLifeIds: string[];
  wormsIds: string[];
}

const IMAGES_BASE_URL = '/src/assets/images/';

const IUCN_STATUS_URLS_EN = {
  [IUCNStatus.EX]: `${IMAGES_BASE_URL}EX_EN.svg`,
  [IUCNStatus.EW]: `${IMAGES_BASE_URL}EW_EN.svg`,
  [IUCNStatus.CR]: `${IMAGES_BASE_URL}CR_EN.svg`,
  [IUCNStatus.EN]: `${IMAGES_BASE_URL}EN_EN.svg`,
  [IUCNStatus.VU]: `${IMAGES_BASE_URL}VU_EN.svg`,
  [IUCNStatus.NT]: `${IMAGES_BASE_URL}NT_EN.svg`,
  [IUCNStatus.LC]: `${IMAGES_BASE_URL}LC_EN.svg`,
};

const IUCN_STATUS_URLS_FR = {
  [IUCNStatus.EX]: `${IMAGES_BASE_URL}EX_FR.svg`,
  [IUCNStatus.EW]: `${IMAGES_BASE_URL}EW_FR.svg`,
  [IUCNStatus.CR]: `${IMAGES_BASE_URL}CR_FR.svg`,
  [IUCNStatus.EN]: `${IMAGES_BASE_URL}EN_FR.svg`,
  [IUCNStatus.VU]: `${IMAGES_BASE_URL}VU_FR.svg`,
  [IUCNStatus.NT]: `${IMAGES_BASE_URL}NT_FR.svg`,
  [IUCNStatus.LC]: `${IMAGES_BASE_URL}LC_FR.svg`,
};

function toIUCNStatusImageURL(iucnStatus: IUCNStatus, locale: 'en' | 'fr'): string {
  return locale === 'en' ? IUCN_STATUS_URLS_EN[iucnStatus] : IUCN_STATUS_URLS_FR[iucnStatus];
}

export function toTaxonWikidataRecordProjection(
  taxonWikidataRecord: TaxonWikidataRecord,
  locale: 'en' | 'fr'
): TaxonWikidataRecordProjection {
  return {
    iucnStatusImageURL: taxonWikidataRecord.iucnStatus ? toIUCNStatusImageURL(taxonWikidataRecord.iucnStatus, locale) : undefined,
    iucnIds: taxonWikidataRecord.iucnIds,
    gbifIds: taxonWikidataRecord.gbifIds,
    inaturalistIds: taxonWikidataRecord.inaturalistIds,
    openTreeOfLifeIds: taxonWikidataRecord.openTreeOfLifeIds,
    catalogueOfLifeIds: taxonWikidataRecord.catalogueOfLifeIds,
    wormsIds: taxonWikidataRecord.wormsIds,
  };
}
