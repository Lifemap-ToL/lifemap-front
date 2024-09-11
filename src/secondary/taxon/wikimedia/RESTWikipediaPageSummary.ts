import type { WikipediaPageSummary } from '@/domain/taxon/wikimedia/WikipediaPageSummary';
import type { Thumbnail } from '@/domain/taxon/wikimedia/Thumbnail';

interface RESTThumbnail {
  source: string;
  width: number;
  height: number;
}

export interface RESTWikipediaPageSummary {
  pageid: number;
  title: string;
  thumbnail: RESTThumbnail;
  extract: string;
  content_urls: {
    desktop: {
      page: string;
    };
  };
}

function toThumbnail(restThumbnail: RESTThumbnail): Thumbnail {
  return {
    url: restThumbnail.source,
    width: restThumbnail.width,
    height: restThumbnail.height,
  };
}

export function toPageSummary(restPageSummary: RESTWikipediaPageSummary): WikipediaPageSummary {
  return {
    id: restPageSummary.pageid,
    title: restPageSummary.title,
    thumbnail: restPageSummary.thumbnail ? toThumbnail(restPageSummary.thumbnail) : undefined,
    extract: restPageSummary.extract,
    url: restPageSummary.content_urls.desktop.page,
  };
}
