import { CustomError } from 'ts-custom-error';

export class NotFound extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
