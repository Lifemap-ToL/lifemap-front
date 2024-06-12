import { type AxiosInstance } from 'axios';
import { type RESTWikipediaPageSummary, toPageSummary } from '@/secondary/wikimedia/RESTWikipediaPageSummary';
import { NotFound } from '@/domain/NotFound';
import { type WikidataRecord } from '@/domain/wikimedia/WikidataRecord';
import { type SPARQLResponse, type SPARQLResult } from '@/secondary/wikimedia/SPARQLResponse';
import { type WikidataRecordRepository } from '@/domain/wikimedia/WikidataRecordRepository';
import { type RESTWikidataEntity } from '@/secondary/wikimedia/RESTWikidataEntity';
import { toIUCNStatus } from '@/secondary/wikimedia/RESTIUCNStatus';

const WIKIDATA_SPARQL_QUERY_URL = 'https://query.wikidata.org/sparql';

export class RESTWikidataRecordRepository implements WikidataRecordRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  private makeSPARQLQuery(ncbiId: number, lang: string) {
    return `SELECT * 
      WHERE {
      ?item p:P685 ?statement0. 
      OPTIONAL{?item wdt:P627 ?iucn.} 
      OPTIONAL{?item wdt:P846 ?gbif.} 
      OPTIONAL{?item wdt:P3151 ?inaturalist.} 
      OPTIONAL{?item wdt:P9157 ?openTreeOfLife.} 
      OPTIONAL{?item wdt:P10585 ?catalogueOfLife.} 
      OPTIONAL{?item wdt:P141 ?iucnStatus.}
      ?statement0 (ps:P685) "${ncbiId}". 
      ?article schema:about ?item . 
      ?article schema:isPartOf <https://${lang}.wikipedia.org/>. 
      SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang}" } }`;
  }

  private toWikidataRecord(sparqlResult: SPARQLResult): WikidataRecord {
    return {
      id: sparqlResult.item.value,
      wikipediaPage: sparqlResult.article.value,
      iucnStatus: sparqlResult.iucnStatus ? toIUCNStatus(sparqlResult.iucnStatus.value) : undefined,
      iucn: sparqlResult.iucn?.value,
      gbif: sparqlResult.gbif?.value,
      inaturalist: sparqlResult.inaturalist?.value,
      openTreeOfLife: sparqlResult.openTreeOfLife?.value,
      catalogueOfLife: sparqlResult.catalogueOfLife?.value,
    };
  }

  find(ncbiId: number, lang: string): Promise<WikidataRecord> {
    const query = this.makeSPARQLQuery(ncbiId, lang);
    const encodedURI = encodeURI(query);

    return this.axiosInstance
      .get<SPARQLResponse>(`${WIKIDATA_SPARQL_QUERY_URL}?query=${encodedURI}`)
      .then(response => this.toWikidataRecord(response.data.results.bindings[0]))
      .catch(error => {
        const notFoundError = new NotFound('WikidataRecord');
        notFoundError.stack = error;
        throw notFoundError;
      });
  }
}
