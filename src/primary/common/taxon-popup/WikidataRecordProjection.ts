import { IUCNStatus } from '@/domain/wikimedia/IUCNStatus';
import { type WikidataRecord } from '@/domain/wikimedia/WikidataRecord';

const WIKIMEDIA_IUCN_STATUS_BASE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';

export interface WikidataRecordProjection {
  id: string;
  wikipediaPage: string;
  iucnStatusImageURL?: string;
  iucn?: string;
  gbif?: string;
  inaturalist?: string;
  openTreeOfLife?: string;
  catalogueOfLife?: string;
}

const IUCN_STATUS_URLS_EN = {
  [IUCNStatus.EX]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}e/ec/Status_iucn3.1_EX.svg/320px-Status_iucn3.1_EX.svg.png`,
  [IUCNStatus.EW]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}c/c4/Status_iucn3.1_EW.svg/320px-Status_iucn3.1_EW.svg.png`,
  [IUCNStatus.CR]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}4/4b/Status_iucn3.1_CR.svg/320px-Status_iucn3.1_CR.svg.png`,
  [IUCNStatus.EN]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}7/70/Status_iucn3.1_EN.svg/320px-Status_iucn3.1_EN.svg.png`,
  [IUCNStatus.VU]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}6/63/Status_iucn3.1_VU.svg/320px-Status_iucn3.1_VU.svg.png`,
  [IUCNStatus.NT]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}5/5b/Status_iucn3.1_NT.svg/320px-Status_iucn3.1_NT.svg.png`,
  [IUCNStatus.LC]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}5/5a/Status_iucn3.1_LC.svg/320px-Status_iucn3.1_LC.svg.png`,
};

const IUCN_STATUS_URLS_FR = {
  [IUCNStatus.EX]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}3/37/Status_iucn2.3_EX-fr.svg/320px-Status_iucn2.3_EX-fr.svg.png`,
  [IUCNStatus.EW]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}3/37/Status_iucn2.3_EW-fr.svg/320px-Status_iucn2.3_EW-fr.svg.png`,
  [IUCNStatus.CR]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}3/3d/Status_iucn2.3_CR-fr.svg/320px-Status_iucn2.3_CR-fr.svg.png`,
  [IUCNStatus.EN]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}1/1d/Status_iucn2.3_EN-fr.svg/320px-Status_iucn2.3_EN-fr.svg.png`,
  [IUCNStatus.VU]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}5/5a/Status_iucn3.1_VU-fr.svg/320px-Status_iucn3.1_VU-fr.svg.png`,
  [IUCNStatus.NT]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}c/c3/Status_iucn3.1_NT-fr.svg/320px-Status_iucn3.1_NT-fr.svg.png`,
  [IUCNStatus.LC]: `${WIKIMEDIA_IUCN_STATUS_BASE_URL}0/01/Status_iucn3.1_LC-fr.svg/320px-Status_iucn3.1_LC-fr.svg.png`,
};

export function toWikidataRecordProjection(wikidataRecord: WikidataRecord, locale: 'en' | 'fr') {
  return {
    id: wikidataRecord.id,
    wikipediaPage: wikidataRecord.wikipediaPage,
    iucnStatusImageURL: wikidataRecord.iucnStatus
      ? locale === 'en'
        ? IUCN_STATUS_URLS_EN[wikidataRecord.iucnStatus]
        : IUCN_STATUS_URLS_FR[wikidataRecord.iucnStatus]
      : undefined,
    iucn: wikidataRecord.iucn,
    gbif: wikidataRecord.gbif,
    inaturalist: wikidataRecord.inaturalist,
    openTreeOfLife: wikidataRecord.openTreeOfLife,
    catalogueOfLife: wikidataRecord.catalogueOfLife,
  };
}
