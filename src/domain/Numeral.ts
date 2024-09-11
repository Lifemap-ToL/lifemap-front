import { round } from '@/domain/NumberUtils';

const NUMBER_FORMAT = /^(-)?(\d+)\.?(\d+)?$/;
const NUMBER_GROUP_FORMAT = /\d{1,3}/g;

const integerToHuman = (integer: string): string =>
  integer.length <= 3
    ? integer
    : integer
        .split('')
        .reverse()
        .join('')
        .match(NUMBER_GROUP_FORMAT)!
        .map(sub => sub.split('').reverse().join(''))
        .reverse()
        .join(' ');

const decompose = (num: number): string[] | null => num.toString().match(NUMBER_FORMAT);

const decimalToHuman = (integer: string, decimal?: string, sign?: string): string => {
  const humanInteger = integerToHuman(integer);
  const humanSignedInteger = sign ? `${sign}${humanInteger}` : humanInteger;

  if (decimal !== undefined) {
    return `${humanSignedInteger}.${decimal}`;
  }
  return humanSignedInteger;
};

export class Numeral {
  constructor(private readonly num: number) {}

  static of(num: number): Numeral {
    return new Numeral(num);
  }

  toHuman(numberOfDecimal?: number) {
    if (isNaN(this.num)) {
      return '';
    }
    const toDecompose = numberOfDecimal ? round(this.num, numberOfDecimal) : this.num;
    const decomposed = decompose(toDecompose);

    if (decomposed === null) {
      return this.num.toString();
    }
    const [, sign, integer, decimal] = decomposed;

    return decimalToHuman(integer, decimal, sign);
  }

  get() {
    return this.num;
  }
}
