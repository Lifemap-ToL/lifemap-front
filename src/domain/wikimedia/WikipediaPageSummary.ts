// TODO: think about what we should do with that: https://www.mediawiki.org/wiki/Extension:TextExtracts#Caveats.
// TODO: see this for a more robust API: https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_

import { type Thumbnail } from '@/domain/wikimedia/Thumbnail';

export interface WikipediaPageSummary {
  id: number;
  thumbnail: Thumbnail;
  extract: string;
  url: string;
}
