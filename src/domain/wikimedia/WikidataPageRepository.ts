import { type WikidataPage } from '@/domain/wikimedia/WikidataPage';

export interface WikidataPageRepository {
  find(wikidataRecordId: string): Promise<WikidataPage>;
}
