import { IUCNStatus } from '@/domain/taxon/wikimedia/IUCNStatus';
import { InvalidRESTIUCNStatus } from '@/secondary/taxon/wikimedia/InvalidRESTIUCNStatus';

export type RESTIUCNStatus = string;

export function toIUCNStatus(restIUCNStatus: RESTIUCNStatus): IUCNStatus {
  const wikidataId = restIUCNStatus.split('/').reverse()[0];
  console.log(wikidataId);
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
    case 'Q96377276':
      return IUCNStatus.EN;
  }

  throw new InvalidRESTIUCNStatus(restIUCNStatus);
}
