import { CustomError } from 'ts-custom-error';

export class InvalidRESTIUCNStatus extends CustomError {
  constructor(invalidRESTIUCNStatus: string) {
    super(`IUCN Status "${invalidRESTIUCNStatus}" is invalid`);
  }
}
