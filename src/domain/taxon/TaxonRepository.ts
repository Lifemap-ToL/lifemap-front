import type { TaxonSuggestion } from '@/domain/taxon/TaxonSuggestion';
import type { Taxon } from '@/domain/taxon/Taxon';
import type { Extent } from '@/domain/map/Extent';
import type { Numeral } from '@/domain/Numeral';
import type { TaxonAdditionalData } from '@/domain/taxon/TaxonAdditionalData';
import type { TaxonWikidataRecord } from '@/domain/taxon/TaxonWikidataRecord';
import type { TaxonWikipediaPage } from '@/domain/taxon/TaxonWikipediaPage';
import type { WikipediaPageSummary } from '@/domain/taxon/wikimedia/WikipediaPageSummary';
import type { TreeLocale } from '@/domain/tree/TreeLocale';

export interface TaxonRepository {
  listAncestors(ncbiIds: number[]): Promise<number[][]>;
  listByNCBIIds(ncbiIds: number[], lang: TreeLocale): Promise<Taxon[]>;
  findByNCBIId(ncbiId: number, lang: TreeLocale): Promise<Taxon>;
  findTaxonAdditionalData(ncbiId: number): Promise<TaxonAdditionalData>;
  findTaxonWikidataRecord(ncbiId: number): Promise<TaxonWikidataRecord>;
  findTaxonWikipediaPages(ncbiId: number): Promise<TaxonWikipediaPage[]>;
  findTaxonWikipediaPageSummary(url: string): Promise<WikipediaPageSummary>;
  findSequencedGenomes(ncbiId: number): Promise<Numeral>;
  listForExtent(maxZoom: number, extent: Extent, lang: TreeLocale, loadSequencedGenomes?: boolean): Promise<Taxon[]>;
  listSuggestion(search: string, lang: TreeLocale): Promise<TaxonSuggestion[]>;
}
