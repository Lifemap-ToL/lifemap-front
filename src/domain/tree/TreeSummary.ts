import type { Numeral } from '@/domain/Numeral';

export interface TreeSummary {
  lastUpdate: Date;
  species: {
    archaea: Numeral;
    eukaryotes: Numeral;
    bacteria: Numeral;
    total: Numeral;
  };
}
