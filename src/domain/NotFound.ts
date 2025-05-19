import { LifemapError } from '@/domain/LifemapError';

export class NotFound extends LifemapError {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundIds extends LifemapError {
  notFoundIds: number[];
  constructor(message: string, notFoundIds: number[]) {
    super(message);
    this.notFoundIds = notFoundIds;
  }
}
