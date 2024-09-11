export interface Logger {
  error(message: string, error: Error): void;
}
