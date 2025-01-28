import { type TaxonSuggestion } from '@/domain/taxon/TaxonSuggestion';
import type { Taxon } from '@/domain/taxon/Taxon';

export interface TaxonSuggestionProjection {
  ncbiId: number;
  scientificNameSlices: string[];
  commonNameSlices: string[];
  fullName: string;
  nameInItalic: boolean;
  rankSlices: string[];
}

function slice(toSlice: string, separator: string): string[] {
  const replacer = (match: string) => `__${match}__`;
  const regex = new RegExp(separator, 'gi');
  const transitional = toSlice.replace(regex, replacer).replace(/^__|__$/g, '');
  return transitional.split('__');
}

export function toTaxonSuggestionProjection(search: string) {
  return function (taxonSuggestion: TaxonSuggestion): TaxonSuggestionProjection {
    return {
      ncbiId: taxonSuggestion.ncbiId,
      scientificNameSlices: slice(taxonSuggestion.scientificName, search),
      commonNameSlices: slice(taxonSuggestion.commonName, search),
      fullName: `${taxonSuggestion.scientificName} ${taxonSuggestion.commonName}`.trim(),
      nameInItalic: taxonSuggestion.nameInItalic,
      rankSlices: slice(taxonSuggestion.rank, search),
    };
  };
}

export function taxonToTaxonSuggestionProjection(taxon: Taxon): TaxonSuggestionProjection {
  return {
    ncbiId: taxon.ncbiId,
    scientificNameSlices: [],
    commonNameSlices: [],
    fullName: taxon.name,
    nameInItalic: taxon.nameInItalic,
    rankSlices: [],
  };
}
