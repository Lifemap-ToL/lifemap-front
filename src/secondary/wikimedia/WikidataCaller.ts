import type { AxiosInstance } from 'axios';
import type { SPARQLResponse } from '@/secondary/wikipedia/SPARQLResponse';
import { NotFound } from '@/domain/NotFound';

const WIKIDATA_SPARQL_QUERY_URL = 'https://query.wikidata.org/sparql';

export class WikidataCaller {
  constructor(private axiosInstance: AxiosInstance) {}

  getWikipediaArticleURL(query: string): Promise<string> {
    const url = encodeURI(`${WIKIDATA_SPARQL_QUERY_URL}?${query}`);
    return this.axiosInstance
      .get<SPARQLResponse>(url)
      .then(response => response.data.results.bindings[0].article.value)
      .catch(() => {
        throw new NotFound('Wikipedia Article');
      });
  }
}
