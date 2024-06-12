import { type IUCNStatus } from '@/domain/wikimedia/IUCNStatus';

export interface WikidataRecord {
  id: string;
  wikipediaPage: string;
  iucnStatus?: IUCNStatus;
  iucn?: string;
  gbif?: string;
  inaturalist?: string;
  openTreeOfLife?: string;
  catalogueOfLife?: string;
}
