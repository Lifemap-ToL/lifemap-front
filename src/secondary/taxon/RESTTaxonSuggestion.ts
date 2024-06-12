import { type TaxonSuggestion } from '@/domain/taxon/TaxonSuggestion';

export interface RESTTaxonSuggestion {
  term: string;
}

export function toTaxonSuggestion(restTaxonSuggestion: RESTTaxonSuggestion): TaxonSuggestion {
  const removeTag = (text: string) => text.replace(/<b>|<\/b>/g, '');
  const [, scientificName, commonName, rank, ncbiId] = restTaxonSuggestion.term.match(/^(.*) \| (.*) \| (.*) \| (.*)$/)!;
  return {
    ncbiId: parseInt(removeTag(ncbiId)),
    scientificName: removeTag(scientificName),
    commonName: removeTag(commonName),
    rank: removeTag(rank),
  };
}
