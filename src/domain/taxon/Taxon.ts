import type { Numeral } from '@/domain/Numeral';
import type { TaxonAdditionalData } from '@/domain/taxon/TaxonAdditionalData';

export type Taxon = TaxonCore & Partial<TaxonAdditionalData>;

interface TaxonCore {
  id: string;
  ncbiId: number;
  name: string;
  commonName?: string;
  rank: string;
  zoomLevel: number;
  descendants: Numeral;
  coordinates: [number, number];
}
