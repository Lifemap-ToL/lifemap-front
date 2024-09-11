export interface WikidataQueryServiceResponse<T> {
  results: {
    bindings: T[];
  };
}
