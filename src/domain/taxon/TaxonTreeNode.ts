export interface TaxonTreeNode {
  taxonNCBIId: number;
  taxonName: string;
  depth: number;
  descendants: TaxonTreeNode[];
}
