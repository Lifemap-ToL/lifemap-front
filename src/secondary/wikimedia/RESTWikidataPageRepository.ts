import { type WikidataPageRepository } from '@/domain/wikimedia/WikidataPageRepository';
import { type AxiosInstance } from 'axios';
import { type WikidataPage } from '@/domain/wikimedia/WikidataPage';
import { type RESTWikidataEntity } from '@/secondary/wikimedia/RESTWikidataEntity';
import { NotFound } from '@/domain/NotFound';

export class RESTWikidataPageRepository implements WikidataPageRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  find(wikidataRecordId: string): Promise<WikidataPage> {
    return this.axiosInstance
      .get<RESTWikidataEntity>(`https://www.wikidata.org/wiki/Special:EntityData/${wikidataRecordId}.json`)
      .then(response => response.data.entities[wikidataRecordId]!)
      .then(wikidataEntity => ({
        pageId: wikidataEntity.pageid,
        wikipediaLinks: Object.keys(wikidataEntity.sitelinks)
          .filter(key => /wiki$/.test(key))
          .map(key => ({
            lang: key.replace(/wiki$/, ''),
            title: wikidataEntity.sitelinks[key].title,
            url: wikidataEntity.sitelinks[key].url,
          })),
      }))
      .catch(error => {
        const notFoundError = new NotFound('WikidataPage');
        notFoundError.stack = error;
        throw notFoundError;
      });
  }
}
