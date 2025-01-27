import { type TaxonSuggestion } from '@/domain/taxon/TaxonSuggestion';

const TAXON_RANK_REQUIRING_NAME_IN_ITALIC = ['espèce', 'sous-espèce', 'genre', 'species', 'subspecies', 'genus'];

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
    nameInItalic: TAXON_RANK_REQUIRING_NAME_IN_ITALIC.includes(removeTag(rank)),
    rank: removeTag(rank),
  };
}
