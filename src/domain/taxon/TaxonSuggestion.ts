export interface TaxonSuggestion {
  ncbiId: number;
  scientificName: string;
  commonName: string;
  nameInItalic: boolean;
  rank: string;
  // Damien — 2026-09-18
  synonyms: string[];
}
