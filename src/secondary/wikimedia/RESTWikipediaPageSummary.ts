import type { WikipediaPageSummary } from '@/domain/wikimedia/WikipediaPageSummary';

export interface RESTWikipediaPageSummary {
  pageid: number;
  thumbnail: {
    source: string;
    width: number;
    height: number;
  };
  extract: string;
  content_urls: {
    desktop: {
      page: string;
    };
  };
}

export function toPageSummary(restPageSummary: RESTWikipediaPageSummary): WikipediaPageSummary {
  return {
    id: restPageSummary.pageid,
    thumbnail: {
      url: restPageSummary.thumbnail.source,
      width: restPageSummary.thumbnail.width,
      height: restPageSummary.thumbnail.height,
    },
    extract: restPageSummary.extract,
    url: restPageSummary.content_urls.desktop.page,
  };
}
