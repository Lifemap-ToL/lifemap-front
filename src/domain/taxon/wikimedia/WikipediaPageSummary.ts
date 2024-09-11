import { type Thumbnail } from '@/domain/taxon/wikimedia/Thumbnail';

export interface WikipediaPageSummary {
  id: number;
  title: string;
  thumbnail?: Thumbnail;
  extract: string;
  url: string;
}
