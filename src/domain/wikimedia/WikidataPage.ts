import { type WikipediaLink } from '@/domain/wikimedia/WikipediaLink';

export interface WikidataPage {
  pageId: string;
  wikipediaLinks: WikipediaLink[];
}
