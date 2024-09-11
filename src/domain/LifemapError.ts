import { CustomError } from 'ts-custom-error';

export class LifemapError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
