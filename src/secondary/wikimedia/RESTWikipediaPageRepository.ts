import { type WikipediaPageRepository } from '@/domain/wikimedia/WikipediaPageRepository';
import { type AxiosInstance } from 'axios';
import { type WikipediaPageSummary } from '@/domain/wikimedia/WikipediaPageSummary';
import { type RESTWikipediaPageSummary, toPageSummary } from '@/secondary/wikimedia/RESTWikipediaPageSummary';
import { NotFound } from '@/domain/NotFound';

export class RESTWikipediaPageRepository implements WikipediaPageRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  find(title: string, lang: string): Promise<WikipediaPageSummary> {
    const wikipediaURL = `https://${lang}.wikipedia.org/api/rest_v1/page/summary`;
    const headers = { Accept: 'application/sparql-results+json' };

    return this.axiosInstance
      .get<RESTWikipediaPageSummary>(`${wikipediaURL}/${title}`, { headers })
      .then(response => toPageSummary(response.data))
      .catch(error => {
        const notFoundError = new NotFound('WikipediaPageSummary');
        notFoundError.stack = error;
        throw notFoundError;
      });
  }
}
