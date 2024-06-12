export interface SPARQLRecord {
  type: string;
  value: string;
}

export interface SPARQLResult {
  item: SPARQLRecord;
  article: SPARQLRecord;
  iucn?: SPARQLRecord;
  gbif?: SPARQLRecord;
  inpi?: SPARQLRecord;
  inaturalist?: SPARQLRecord;
  openTreeOfLife?: SPARQLRecord;
  catalogueOfLife?: SPARQLRecord;
  iucnStatus?: SPARQLRecord;
}

export interface SPARQLResponse {
  results: {
    bindings: SPARQLResult[];
  };
}
