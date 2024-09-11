import type { TreeSummary } from '@/domain/tree/TreeSummary';

export interface TreeRepository {
  findTreeSummary(): Promise<TreeSummary>;
  findIfTreeIsDisplayable(): Promise<boolean>;
  findIfTreeIsAvailable(): Promise<boolean>;
}
