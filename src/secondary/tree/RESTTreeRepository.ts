import type { TreeRepository } from '@/domain/tree/TreeRepository';
import type { AxiosInstance } from 'axios';
import type { TreeSummary } from '@/domain/tree/TreeSummary';
import { type RESTTreeSummary, toTreeSummary } from '@/secondary/tree/RESTTreeSummary';
import { NotFound } from '@/domain/NotFound';

const TIMEOUT = 8000;

export class RESTTreeRepository implements TreeRepository {
  constructor(private axiosInstance: AxiosInstance) {}

  async findTreeSummary(): Promise<TreeSummary> {
    const url = '/static/metadata.json';
    return this.axiosInstance
      .get<RESTTreeSummary>(url)
      .then(response => toTreeSummary(response.data))
      .catch(() => {
        throw new NotFound(`resource at ${url} not found`);
      });
  }

  async findIfTreeIsDisplayable(): Promise<boolean> {
    const url = '/vector_tiles/health';
    return this.axiosInstance
      .get<string>(url, { timeout: TIMEOUT })
      .then(response => response.data === 'OK')
      .catch(() => {
        throw new NotFound(`resource at ${url} not found`);
      });
  }

  async findIfTreeIsAvailable(): Promise<boolean> {
    const url = '/health';
    return this.axiosInstance
      .get<string>(url, { timeout: TIMEOUT })
      .then(response => response.data === 'OK')
      .catch(() => {
        throw new NotFound(`resource at ${url} not found`);
      });
  }
}
