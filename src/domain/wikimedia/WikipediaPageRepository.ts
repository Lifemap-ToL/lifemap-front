import { type WikipediaPageSummary } from '@/domain/wikimedia/WikipediaPageSummary';

export interface WikipediaPageRepository {
  find(title: string, lang: string): Promise<WikipediaPageSummary>;
}
