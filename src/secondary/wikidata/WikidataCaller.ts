import type { AxiosInstance } from 'axios';
import { NotFound } from '@/domain/NotFound';
import type { WikidataQueryServiceResponse } from '@/secondary/wikidata/WikidataQueryServiceResponse';

export class WikidataCaller {
  constructor(private axiosInstance: AxiosInstance) {}

  async get<T>(query: string): Promise<T[]> {
    const url = `/sparql?query=${query}`;
    return this.axiosInstance
      .get<WikidataQueryServiceResponse<T>>(`/sparql?query=${query}`)
      .then(response => response.data.results.bindings)
      .catch(() => {
        throw new NotFound(`Resources at ${url} not found`);
      });
  }
}
