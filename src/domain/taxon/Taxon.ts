import type { Numeral } from '@/domain/Numeral';

export interface Taxon {
  id: string;
  ncbiId: number;
  name: string;
  commonName?: string;
  rank: string;
  zoomLevel: number;
  descendants: Numeral;
  sequencedGenomes?: Numeral;
  coordinates: [number, number];
}
