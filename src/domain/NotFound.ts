import { LifemapError } from '@/domain/LifemapError';

export class NotFound extends LifemapError {
  constructor(message: string) {
    super(message);
  }
}
