import type { TaxonWikipediaPage } from '@/domain/taxon/TaxonWikipediaPage';
import type { WikidataQueryServiceBinding } from '@/secondary/wikidata/WikidataQueryServiceBinding';

export interface RESTTaxonWikipediaPage {
  article: WikidataQueryServiceBinding;
  lang: WikidataQueryServiceBinding;
  name: WikidataQueryServiceBinding;
}

export function toTaxonWikipediaPage(restWikipediaPage: RESTTaxonWikipediaPage): TaxonWikipediaPage {
  return {
    title: restWikipediaPage.name.value,
    lang: restWikipediaPage.lang.value,
    url: restWikipediaPage.article.value,
  };
}
