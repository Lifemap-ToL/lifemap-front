import type { TaxonWikidataRecord } from '@/domain/taxon/TaxonWikidataRecord';
import type { WikidataQueryServiceBinding } from '@/secondary/wikidata/WikidataQueryServiceBinding';
import { toIUCNStatus } from '@/secondary/taxon/wikimedia/RESTIUCNStatus';

export interface RESTTaxonWikidataRecord {
  ncbi: WikidataQueryServiceBinding;
  gbifID?: WikidataQueryServiceBinding;
  opentolID?: WikidataQueryServiceBinding;
  wormsID?: WikidataQueryServiceBinding;
  inaturalistID?: WikidataQueryServiceBinding;
  catalogueOfLifeID?: WikidataQueryServiceBinding;
  taxRefID?: WikidataQueryServiceBinding;
  iucn?: WikidataQueryServiceBinding;
  iucnStatus?: WikidataQueryServiceBinding;
}

export function toTaxonWikidataRecord(restTaxonWikidataRecords: RESTTaxonWikidataRecord): TaxonWikidataRecord {
  return {
    iucnStatus: restTaxonWikidataRecords.iucnStatus ? toIUCNStatus(restTaxonWikidataRecords.iucnStatus.value) : undefined,
    iucnIds: restTaxonWikidataRecords.iucn ? [restTaxonWikidataRecords.iucn.value] : [],
    gbifIds: restTaxonWikidataRecords.gbifID ? [restTaxonWikidataRecords.gbifID.value] : [],
    inaturalistIds: restTaxonWikidataRecords.inaturalistID ? [restTaxonWikidataRecords.inaturalistID.value] : [],
    openTreeOfLifeIds: restTaxonWikidataRecords.opentolID ? [restTaxonWikidataRecords.opentolID.value] : [],
    catalogueOfLifeIds: restTaxonWikidataRecords.catalogueOfLifeID ? [restTaxonWikidataRecords.catalogueOfLifeID.value] : [],
    wormsIds: restTaxonWikidataRecords.wormsID ? [restTaxonWikidataRecords.wormsID.value] : [],
    taxRefIds: restTaxonWikidataRecords.taxRefID ? [restTaxonWikidataRecords.taxRefID.value] : [],
  };
}
