import { type TaxonSuggestion } from '@/domain/taxon/TaxonSuggestion';
import { type Taxon } from '@/domain/taxon/Taxon';
import { type Extent } from '@/domain/map/Extent';
import type { Numeral } from '@/domain/Numeral';

export interface TaxonRepository {
  listAncestors(ncbiIds: number[]): Promise<number[][]>;
  listByNCBIIds(ncbiIds: number[]): Promise<Taxon[]>;
  findByNCBIId(ncbiId: number): Promise<Taxon>;
  findAge(ncbiId: number): Promise<string | undefined>;
  findSequencedGenomes(ncbiId: number): Promise<Numeral>;
  listForExtent(maxZoom: number, extent: Extent, loadSequencedGenomes?: boolean): Promise<Taxon[]>;
  listSuggestion(search: string): Promise<TaxonSuggestion[]>;
}
