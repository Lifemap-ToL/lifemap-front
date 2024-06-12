import { type TaxonRepository } from '@/domain/taxon/TaxonRepository';
import { type TaxonSuggestion } from '@/domain/taxon/TaxonSuggestion';
import { type RESTTaxonSuggestion, toTaxonSuggestion } from '@/secondary/taxon/RESTTaxonSuggestion';
import { type Taxon } from '@/domain/taxon/Taxon';
import { type RESTTaxon, toTaxon } from '@/secondary/taxon/RESTTaxon';
import fetch from 'fetch-jsonp';
import { type Extent } from '@/domain/map/Extent';
import { type RESTTaxonAdditionalData } from '@/secondary/taxon/RESTTaxonAdditionalData';
import { Numeral } from '@/domain/Numeral';
import type { AxiosInstance } from 'axios';

const ROOT = {
  id: 'root',
  ncbiId: 0,
  name: 'Root',
  rank: '',
  zoomLevel: 7,
  coordinates: [0, -4.226497] as [number, number],
};

type RESTSuggester<T> = {
  suggest: { mySuggester: Record<string, { suggestions: T[] }> };
};

type RESTResponse<T> = {
  response: { docs: T[] };
};

export class RESTTaxonRepository implements TaxonRepository {
  private fetch: (url: string) => Promise<fetch.Response>;
  private axiosInstance: AxiosInstance;
  private timeTreeFileURL: string;
  private agesPromise?: Promise<{ [key: number]: string }>;

  constructor(fetch: (url: string) => Promise<fetch.Response>, axiosInstance: AxiosInstance, timeTreeFileURL: string) {
    this.fetch = fetch;
    this.axiosInstance = axiosInstance;
    this.timeTreeFileURL = timeTreeFileURL;
  }

  public async listAncestors(ncbiIds: number[]): Promise<number[][]> {
    const toAncestry = (restAncestries: RESTTaxonAdditionalData[]) => (ncbiId: number) =>
      ncbiId === 0 ? [0] : [ncbiId, ...restAncestries.find(restAncestry => restAncestry.taxid[0] === ncbiId)!.ascend];

    const url = `addi/select?q=*:*&fq=taxid:(${ncbiIds.join(' ')})&rows=1000&wt=json`;

    return this.fetch(url)
      .then(rawResponse => rawResponse.json<RESTResponse<RESTTaxonAdditionalData>>())
      .then(response => response.response.docs)
      .then(docs => ncbiIds.map(toAncestry(docs)));
  }

  public findByNCBIId(ncbiId: number): Promise<Taxon> {
    const url = `taxo/select?q=taxid:${ncbiId}&wt=json`;
    return this.fetch(url)
      .then(response => response.json<RESTResponse<RESTTaxon>>())
      .then(response => toTaxon(response.response.docs[0]));
  }

  public findAge(ncbiId: number): Promise<string | undefined> {
    const promise = () =>
      (this.agesPromise = this.axiosInstance
        .get<string>(this.timeTreeFileURL)
        .then(response => response.data.split('\n'))
        .then(split => {
          const ages: { [key: number]: string } = {};
          split.forEach(line => {
            const [id, age] = line.split(',');
            ages[parseInt(id)] = age;
          });
          return ages;
        }));

    if (!this.agesPromise) {
      this.agesPromise = promise();
    }

    return this.agesPromise.then(ages => ages[ncbiId]);
  }

  public listByNCBIIds(ncbiIds: number[]): Promise<Taxon[]> {
    const url = `/taxo/select?q=*:*&fq=taxid:(${ncbiIds.join(' ')})&rows=1000&wt=json`;
    return this.fetch(url)
      .then(response => response.json<RESTResponse<RESTTaxon>>())
      .then(response => response.response.docs.map(toTaxon))
      .then(taxa => taxa.sort((taxon1, taxon2) => (ncbiIds.indexOf(taxon1.ncbiId) < ncbiIds.indexOf(taxon2.ncbiId) ? -1 : 1)))
      .then(taxa => {
        if (ncbiIds.includes(0)) {
          taxa.splice(ncbiIds.indexOf(0), 0, { ...ROOT });
        }
        return taxa;
      });
  }

  public async findSequencedGenomes(ncbiId: number): Promise<Numeral> {
    const url = `addi/select?q=*:*&fq=taxid:(${ncbiId})&rows=1000&wt=json`;

    return this.fetch(url)
      .then(rawResponse => rawResponse.json<RESTResponse<RESTTaxonAdditionalData>>())
      .then(response => response.response.docs)
      .then(docs => Numeral.of(docs[0].genomes[0]));
  }

  private async listFullySequencedGenomes(ncbiIds: number[]): Promise<number[]> {
    const toFullySequencedGenomes = (restTaxonAdditionalData: RESTTaxonAdditionalData[]) => (ncbiId: number) =>
      ncbiId === 0 ? 0 : restTaxonAdditionalData.find(restTaxonAdditional => restTaxonAdditional.taxid[0] === ncbiId)!.genomes[0];

    const url = `addi/select?q=*:*&fq=taxid:(${ncbiIds.join(' ')})&rows=1000&wt=json`;

    return this.fetch(url)
      .then(rawResponse => rawResponse.json<RESTResponse<RESTTaxonAdditionalData>>())
      .then(response => response.response.docs)
      .then(docs => ncbiIds.map(toFullySequencedGenomes(docs)));
  }

  public listForExtent(maxZoom: number, extent: Extent, loadFullySequencedGenomes = false): Promise<Taxon[]> {
    const url = `taxo/select?q=*:*&fq=zoom:[0 TO ${maxZoom}]&fq=lat:[${extent[1]} TO ${extent[3]}]&fq=lon:[${extent[0]} TO ${extent[2]}]&wt=json&rows=1000`;

    const listTaxa = (): Promise<Taxon[]> =>
      this.fetch(url)
        .then(response => response.json<RESTResponse<RESTTaxon>>())
        .then(response => response.response.docs.map(toTaxon));

    const listTaxaWithFullySequencedGenomes = (): Promise<Taxon[]> =>
      listTaxa()
        .then(taxa => Promise.all([Promise.resolve(taxa), this.listFullySequencedGenomes(taxa.map(taxon => taxon.ncbiId))]))
        .then(([taxa, fullySequencedGenomes]) =>
          taxa.map((taxon, index) => ({ ...taxon, sequencedGenomes: Numeral.of(fullySequencedGenomes[index]) }))
        );

    return loadFullySequencedGenomes ? listTaxaWithFullySequencedGenomes() : listTaxa();
  }

  public listSuggestion(search: string): Promise<TaxonSuggestion[]> {
    const url = `taxo/suggesthandler?suggest.q=${search}&wt=json&rows=1`;
    return this.fetch(url)
      .then(response => response.json<RESTSuggester<RESTTaxonSuggestion>>())
      .then(response => response.suggest.mySuggester[search].suggestions.map(toTaxonSuggestion));
  }
}
