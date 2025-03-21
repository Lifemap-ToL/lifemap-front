import { type Taxon } from '@/domain/taxon/Taxon';
import { type TaxonTreeNode } from '@/domain/taxon/TaxonTreeNode';

export class TaxonTree {
  private allNodes: TaxonTreeNode[] = [];
  private forkNodeWithSmallestDepth?: TaxonTreeNode;
  private rootNode?: TaxonTreeNode;

  get allNodeNCBIIds(): number[] {
    return this.allNodes.map(node => node.taxonNCBIId);
  }

  constructor(taxonBranches: Taxon[][]) {
    this.buildTree([...taxonBranches]);
  }

  private getTaxonTreeNodes(taxonBranch: Taxon[]): TaxonTreeNode[] {
    const index = taxonBranch.findIndex(taxon => this.allNodeNCBIIds.includes(taxon.ncbiId));
    const taxaToKeep = index > -1 ? taxonBranch.slice(0, index + 1) : taxonBranch;
    const depthOffset = index > -1 ? taxonBranch.length - 1 - index : 0;

    const reverseTaxa = [...taxaToKeep].reverse();

    const taxonTreeNodes: TaxonTreeNode[] = reverseTaxa.map((taxon, index) => ({
      taxonNCBIId: taxon.ncbiId,
      taxonName: taxon.name,
      depth: index + depthOffset,
      descendants: [],
    }));

    taxonTreeNodes.forEach((node, index) => {
      const nextNode = taxonTreeNodes[index + 1];
      node.descendants = nextNode ? [nextNode] : [];
    });

    return taxonTreeNodes;
  }

  private buildTree(taxonBranches: Taxon[][]): void {
    taxonBranches.sort((branch1, branch2) => (branch1.length > branch2.length ? -1 : 1));

    taxonBranches.forEach(taxonBranch => {
      const taxonTreeNodes = this.getTaxonTreeNodes(taxonBranch);

      this.allNodes = [...this.allNodes, ...taxonTreeNodes];

      if (!this.rootNode) {
        this.rootNode = taxonTreeNodes[0];
        return;
      }

      this.branch(taxonTreeNodes[0]);
    });
  }

  private updateForkNodeWithSmallestDepth(forkNode: TaxonTreeNode): void {
    this.forkNodeWithSmallestDepth =
      !this.forkNodeWithSmallestDepth || this.forkNodeWithSmallestDepth.depth > forkNode.depth ? forkNode : this.forkNodeWithSmallestDepth;
  }

  private branch(nodeToBranch: TaxonTreeNode): void {
    const commonNode = this.allNodes.find(node => node.taxonNCBIId === nodeToBranch.taxonNCBIId)!;
    commonNode.descendants = [...commonNode.descendants, ...(nodeToBranch.descendants[0] ? [nodeToBranch.descendants[0]] : [])];
    this.updateForkNodeWithSmallestDepth(commonNode);
  }

  public format(singletons: boolean, nodeNames: boolean, nameFormat: 'scientific' | 'taxid' | 'full'): string {
    const formatTaxonName = (node: TaxonTreeNode): string => {
      switch (nameFormat) {
        case 'scientific':
          return node.taxonName;
        case 'taxid':
          return `${node.taxonNCBIId}`;
        case 'full':
          return `${node.taxonName}|${node.taxonNCBIId}`;
      }
    };

    const unshiftTaxonName = (serialization: any[], node: TaxonTreeNode) => {
      if (!nodeNames && node.descendants.length === 0) {
        serialization.unshift(formatTaxonName(node));
        return;
      }

      if (!singletons && nodeNames && (node.descendants.length === 0 || node.descendants.length > 1)) {
        serialization.unshift(formatTaxonName(node));
        return;
      }

      if (singletons && nodeNames) {
        serialization.unshift(formatTaxonName(node));
      }
    };

    const unshiftArray = (serialization: any[], array: any[], node: TaxonTreeNode) => {
      if (!singletons && (node.descendants.length === 0 || node.descendants.length > 1)) {
        serialization.unshift(array);
        return;
      }

      if (singletons) {
        serialization.unshift(array);
      }
    };

    const toSerialize = (serialization: any[], array: any[], node: TaxonTreeNode): any[] => {
      return (!singletons && (node.descendants.length === 0 || node.descendants.length > 1)) || singletons ? array : serialization;
    };

    const serializer = (serialization: any[], node: TaxonTreeNode): void => {
      unshiftTaxonName(serialization, node);

      if (node.descendants.length > 0) {
        const array: any[] = [];
        unshiftArray(serialization, array, node);

        node.descendants.forEach(descendant => {
          serializer(toSerialize(serialization, array, node), descendant);
        });
      }
    };

    const start: any[] = [];

    serializer(start, this.forkNodeWithSmallestDepth! || this.rootNode!);

    let formatted = JSON.stringify(start[0]).replace(/\[/g, '(').replace(/"/g, '');
    formatted = singletons && nodeNames ? formatted.replace(/\](,|)/g, ')') : formatted.replace(/\]/g, ')');

    return `${formatted}${start[1] ? start[1] : ''};`;
  }
}
