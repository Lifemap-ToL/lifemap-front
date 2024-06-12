import type { Taxon } from '@/domain/taxon/Taxon';

export interface CommonAncestorPath {
  taxonList: Taxon[];
  commonAncestor?: Taxon;
}
