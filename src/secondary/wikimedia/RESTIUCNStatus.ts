import { IUCNStatus } from '@/domain/wikimedia/IUCNStatus';
import { InvalidRESTIUCNStatus } from '@/secondary/wikimedia/InvalidRESTIUCNStatus';

export type RESTIUCNStatus = string;

export function toIUCNStatus(restIUCNStatus: RESTIUCNStatus): IUCNStatus {
  const wikidataId = restIUCNStatus.split('/').reverse()[0];

  switch (wikidataId) {
    case 'Q237350':
      return IUCNStatus.EX;
    case 'Q239509':
      return IUCNStatus.EW;
    case 'Q219127':
      return IUCNStatus.CR;
    case 'Q278113':
      return IUCNStatus.VU;
    case 'Q719675':
      return IUCNStatus.NT;
    case 'Q211005':
      return IUCNStatus.LC;
  }

  throw new InvalidRESTIUCNStatus(restIUCNStatus);
}
