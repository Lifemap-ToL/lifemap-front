import type { IUCNStatus } from '@/domain/taxon/wikimedia/IUCNStatus';

export interface TaxonWikidataRecord {
  iucnStatus?: IUCNStatus;
  iucnIds: string[];
  gbifIds: string[];
  inaturalistIds: string[];
  openTreeOfLifeIds: string[];
  catalogueOfLifeIds: string[];
  wormsIds: string[];
}
