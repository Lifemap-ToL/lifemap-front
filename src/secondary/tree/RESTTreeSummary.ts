import type { TreeSummary } from '@/domain/tree/TreeSummary';
import { Numeral } from '@/domain/Numeral';

export interface RESTTreeSummary {
  update: string;
  species: {
    archaea: number;
    eukaryotes: number;
    bacteria: number;
    total: number;
  };
}

export function toTreeSummary(restTreeSummary: RESTTreeSummary): TreeSummary {
  return {
    lastUpdate: new Date(`${restTreeSummary.update}`),
    species: {
      archaea: Numeral.of(restTreeSummary.species.archaea),
      eukaryotes: Numeral.of(restTreeSummary.species.eukaryotes),
      bacteria: Numeral.of(restTreeSummary.species.bacteria),
      total: Numeral.of(restTreeSummary.species.total),
    },
  };
}
