import type { WikidataRecord } from '@/domain/wikimedia/WikidataRecord';

export interface WikidataRecordRepository {
  find(ncbiId: number, lang: string): Promise<WikidataRecord>;
}
