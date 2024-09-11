import type { Logger } from '@/domain/Logger';

export class ConsoleLogger implements Logger {
  constructor(private logger: Console) {}

  error(message: string, error: Error) {
    this.logger.error(message, error);
  }
}
