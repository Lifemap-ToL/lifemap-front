import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { type TaxonSuggestion } from '@/domain/taxon/TaxonSuggestion';
import { type RESTTaxonSuggestion, toTaxonSuggestion } from '@/secondary/taxon/RESTTaxonSuggestion';
import { type Taxon } from '@/domain/taxon/Taxon';
import { type RESTTaxon, toTaxon } from '@/secondary/taxon/RESTTaxon';
import { type Extent } from '@/domain/map/Extent';
import { type RESTTaxonAdditionalData } from '@/secondary/taxon/RESTTaxonAdditionalData';
import { Numeral } from '@/domain/Numeral';
import type { AxiosInstance } from 'axios';
import type { TaxonAdditionalData } from '@/domain/taxon/TaxonAdditionalData';
import type { VueI18n } from 'vue-i18n';
import { NotFound } from '@/domain/NotFound';
import type { WikidataCaller } from '@/secondary/wikidata/WikidataCaller';
import type { TaxonWikidataRecord } from '@/domain/taxon/TaxonWikidataRecord';
import { type RESTTaxonWikidataRecord, toTaxonWikidataRecord } from '@/secondary/taxon/RESTTaxonWikidataRecord';
import type { TaxonWikipediaPage } from '@/domain/taxon/TaxonWikipediaPage';
import { type RESTTaxonWikipediaPage, toTaxonWikipediaPage } from '@/secondary/taxon/RESTTaxonWikipediaPage';
import type { WikipediaPageSummary } from '@/domain/taxon/wikimedia/WikipediaPageSummary';
import type { RESTWikipediaPageSummary } from '@/secondary/taxon/wikimedia/RESTWikipediaPageSummary';
import { toPageSummary } from '@/secondary/taxon/wikimedia/RESTWikipediaPageSummary';
import { queryTaxonWikidataRecord, queryTaxonWikipediaPages } from '@/secondary/taxon/wikidata-query/WikidataQuery';

const ROOT: Taxon = {
  id: 'root',
  ncbiId: 0,
  name: 'Root',
  rank: '',
  zoomLevel: 7,
  descendants: Numeral.of(0),
  coordinates: [0, -4.226497] as [number, number],
};

type RESTSuggester<T> = {
  suggest: Record<string, Record<string, { suggestions: T[] }>>;
};

type RESTResponse<T> = {
  response: { docs: T[] };
};

function mergeUniq(array1: string[], array2: string[]): string[] {
  return [...array1, ...array2].filter((value, index, array) => array.indexOf(value) === index);
}

function mergeTaxonWikidataRecord(
  taxonWikidataRecord1: TaxonWikidataRecord,
  taxonWikidataRecord2: TaxonWikidataRecord
): TaxonWikidataRecord {
  return {
    iucnStatus: taxonWikidataRecord1.iucnStatus || taxonWikidataRecord2.iucnStatus,
    iucnIds: mergeUniq(taxonWikidataRecord1.iucnIds, taxonWikidataRecord2.iucnIds),
    gbifIds: mergeUniq(taxonWikidataRecord1.gbifIds, taxonWikidataRecord2.gbifIds),
    inaturalistIds: mergeUniq(taxonWikidataRecord1.inaturalistIds, taxonWikidataRecord2.inaturalistIds),
    openTreeOfLifeIds: mergeUniq(taxonWikidataRecord1.openTreeOfLifeIds, taxonWikidataRecord2.openTreeOfLifeIds),
    catalogueOfLifeIds: mergeUniq(taxonWikidataRecord1.catalogueOfLifeIds, taxonWikidataRecord2.catalogueOfLifeIds),
    wormsIds: mergeUniq(taxonWikidataRecord1.wormsIds, taxonWikidataRecord2.wormsIds),
  };
}

function taxonWikipediaPagesReducer(
  accumulator: Record<string, TaxonWikipediaPage>,
  taxonWikipediaPage: TaxonWikipediaPage
): Record<string, TaxonWikipediaPage> {
  return { ...accumulator, [taxonWikipediaPage.lang]: taxonWikipediaPage };
}

function filterTaxonWikipediaPages(taxonWikipediaPages: TaxonWikipediaPage[]): TaxonWikipediaPage[] {
  const pageURLsByLang = taxonWikipediaPages.reduce(taxonWikipediaPagesReducer, {});
  return Object.keys(pageURLsByLang).map(key => pageURLsByLang[key]);
}

function taxonWikipediaPagesSorter(taxonWikipediaPage1: TaxonWikipediaPage, taxonWikipediaPage2: TaxonWikipediaPage): number {
  return taxonWikipediaPage1.lang < taxonWikipediaPage2.lang ? -1 : 1;
}

export class RESTTaxonRepository implements TaxonRepository {
  constructor(private axiosInstance: AxiosInstance, private wikidataCaller: WikidataCaller, private i18n: VueI18n) {}

  public async listAncestors(ncbiIds: number[]): Promise<number[][]> {
    const toAncestry = (restAncestries: RESTTaxonAdditionalData[]) => (ncbiId: number) =>
      ncbiId === 0 ? [0] : [ncbiId, ...restAncestries.find(restAncestry => restAncestry.taxid[0] === ncbiId)!.ascend];

    const url = `/solr/addi/select?q=*:*&fq=taxid:(${ncbiIds.join(' ')})&rows=1000&wt=json`;

    return this.axiosInstance
      .get<RESTResponse<RESTTaxonAdditionalData>>(url)
      .then(response => response.data.response.docs)
      .then(docs => ncbiIds.map(toAncestry(docs)));
  }

  public findByNCBIId(ncbiId: number): Promise<Taxon> {
    const url = `/solr/taxo/select?q=taxid:${ncbiId}&wt=json`;
    return this.axiosInstance
      .get<RESTResponse<RESTTaxon>>(url)
      .then(response => toTaxon(this.i18n.locale as 'en' | 'fr')(response.data.response.docs[0]));
  }

  public listByNCBIIds(ncbiIds: number[]): Promise<Taxon[]> {
    const url = `/solr/taxo/select?q=*:*&fq=taxid:(${ncbiIds.join(' ')})&rows=1000&wt=json`;
    return this.axiosInstance
      .get<RESTResponse<RESTTaxon>>(url)
      .then(response => response.data.response.docs.map(toTaxon(this.i18n.locale as 'en' | 'fr')))
      .then(taxa => taxa.sort((taxon1, taxon2) => (ncbiIds.indexOf(taxon1.ncbiId) < ncbiIds.indexOf(taxon2.ncbiId) ? -1 : 1)))
      .then(taxa => {
        if (ncbiIds.includes(0)) {
          taxa.splice(ncbiIds.indexOf(0), 0, { ...ROOT });
        }
        return taxa;
      });
  }

  public async findSequencedGenomes(ncbiId: number): Promise<Numeral> {
    const url = `/solr/addi/select?q=*:*&fq=taxid:(${ncbiId})&rows=1000&wt=json`;

    return this.axiosInstance
      .get<RESTResponse<RESTTaxonAdditionalData>>(url)
      .then(response => response.data.response.docs)
      .then(docs => Numeral.of(docs[0].genomes[0]));
  }

  public async findTaxonAdditionalData(ncbiId: number): Promise<TaxonAdditionalData> {
    const url = `/solr/addi/select?q=*:*&fq=taxid:(${ncbiId})&rows=1000&wt=json`;

    return this.axiosInstance
      .get<RESTResponse<RESTTaxonAdditionalData>>(url)
      .then(response => response.data.response.docs)
      .then(docs => ({ sequencedGenomes: Numeral.of(docs[0].genomes[0]), age: docs[0].age ? Numeral.of(docs[0].age[0]) : undefined }));
  }

  public async findTaxonWikidataRecord(ncbiId: number): Promise<TaxonWikidataRecord> {
    return this.wikidataCaller
      .get<RESTTaxonWikidataRecord>(queryTaxonWikidataRecord(ncbiId))
      .then(restTaxonWikidataRecords => restTaxonWikidataRecords.map(toTaxonWikidataRecord).reduce(mergeTaxonWikidataRecord));
  }

  public async findTaxonWikipediaPages(ncbiId: number): Promise<TaxonWikipediaPage[]> {
    return this.wikidataCaller
      .get<RESTTaxonWikipediaPage>(queryTaxonWikipediaPages(ncbiId))
      .then(restTaxonWikipediaPages => restTaxonWikipediaPages.map(toTaxonWikipediaPage))
      .then(taxonWikipediaPages => filterTaxonWikipediaPages(taxonWikipediaPages))
      .then(taxonWikipediaPages => taxonWikipediaPages.sort(taxonWikipediaPagesSorter));
  }

  public async findTaxonWikipediaPageSummary(url: string): Promise<WikipediaPageSummary> {
    const [, lang, title] = url.match(/^https:\/\/(.+)\.wikipedia.org\/wiki\/(.+)$/)!;
    const wikipediaAPIURL = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${title}`;

    return this.axiosInstance
      .get<RESTWikipediaPageSummary>(wikipediaAPIURL)
      .then(response => toPageSummary(response.data))
      .catch(() => {
        throw new NotFound(`resource at ${url} not found`);
      });
  }

  private async listFullySequencedGenomes(ncbiIds: number[]): Promise<number[]> {
    const toFullySequencedGenomes = (restTaxonAdditionalData: RESTTaxonAdditionalData[]) => (ncbiId: number) =>
      ncbiId === 0 ? 0 : restTaxonAdditionalData.find(restTaxonAdditional => restTaxonAdditional.taxid[0] === ncbiId)!.genomes[0];

    const url = `/solr/addi/select?q=*:*&fq=taxid:(${ncbiIds.join(' ')})&rows=1000&wt=json`;

    return this.axiosInstance
      .get<RESTResponse<RESTTaxonAdditionalData>>(url)
      .then(response => response.data.response.docs)
      .then(docs => ncbiIds.map(toFullySequencedGenomes(docs)));
  }

  public listForExtent(maxZoom: number, extent: Extent, loadFullySequencedGenomes = false): Promise<Taxon[]> {
    const url = `/solr/taxo/select?q=*:*&fq=zoom:[0 TO ${maxZoom}]&fq=lat:[${extent[1]} TO ${extent[3]}]&fq=lon:[${extent[0]} TO ${extent[2]}]&wt=json&rows=1000`;

    const listTaxa = (): Promise<Taxon[]> =>
      this.axiosInstance
        .get<RESTResponse<RESTTaxon>>(url)
        .then(response => response.data.response.docs.map(toTaxon(this.i18n.locale as 'en' | 'fr')))
        .catch(() => {
          throw new NotFound(`resource at ${url} not found`);
        });

    const listTaxaWithFullySequencedGenomes = (): Promise<Taxon[]> =>
      listTaxa()
        .then(taxa => Promise.all([Promise.resolve(taxa), this.listFullySequencedGenomes(taxa.map(taxon => taxon.ncbiId))]))
        .then(([taxa, fullySequencedGenomes]) =>
          taxa.map((taxon, index) => ({ ...taxon, sequencedGenomes: Numeral.of(fullySequencedGenomes[index]) }))
        );

    return loadFullySequencedGenomes ? listTaxaWithFullySequencedGenomes() : listTaxa();
  }

  private listLocalizedSuggestion(search: string, url: string, suggester: string): Promise<TaxonSuggestion[]> {
    return this.axiosInstance
      .get<RESTSuggester<RESTTaxonSuggestion>>(`${url}?suggest.q=${search}&wt=json&rows=1`)
      .then(response => response.data.suggest[suggester][search].suggestions.map(toTaxonSuggestion));
  }

  public listSuggestion(search: string): Promise<TaxonSuggestion[]> {
    return this.i18n.locale === 'fr'
      ? this.listLocalizedSuggestion(search, '/solr/taxo/suggesthandlerfr', 'mySuggesterFr')
      : this.listLocalizedSuggestion(search, '/solr/taxo/suggesthandler', 'mySuggester');
  }
}
