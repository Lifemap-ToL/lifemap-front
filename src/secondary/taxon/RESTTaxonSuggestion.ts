import { type TaxonSuggestion } from '@/domain/taxon/TaxonSuggestion';

const TAXON_RANK_REQUIRING_NAME_IN_ITALIC = ['espèce', 'sous-espèce', 'genre', 'species', 'subspecies', 'genus'];

export interface RESTTaxonSuggestion {
  term: string;
}

export function toTaxonSuggestion(restTaxonSuggestion: RESTTaxonSuggestion): TaxonSuggestion {
  const removeTag = (text: string) => text.replace(/<b>|<\/b>/g, '');
  // Damien — 2026-09-17
  // Damien — 2026-09-18
  const [, scientificName, commonName, rank, ncbiId, synonyms = ''] =
    restTaxonSuggestion.term.match(/^([^|]*) \| ([^|]*) \| ([^|]*) \| ([^|]*)(?: \| (.*))?$/)!;
  return {
    ncbiId: parseInt(removeTag(ncbiId)),
    scientificName: removeTag(scientificName),
    commonName: removeTag(commonName),
    nameInItalic: TAXON_RANK_REQUIRING_NAME_IN_ITALIC.includes(removeTag(rank)),
    rank: removeTag(rank),
    // Damien — 2026-09-18
    synonyms: removeTag(synonyms).split(', ').filter(Boolean),
  };
}
