export function queryTaxonWikidataRecord(ncbiId: number) {
  return `SELECT ?item ?ncbi ?gbifID ?opentolID ?wormsID ?inaturalistID ?catalogueOfLifeID ?iucn ?iucnStatus
      WHERE {
      ?item wdt:P685 "${ncbiId}".
      OPTIONAL { ?item wdt:P685 ?ncbi. }  
      OPTIONAL { ?item wdt:P846 ?gbifID. }
      OPTIONAL { ?item wdt:P9157 ?opentolID. }
      OPTIONAL { ?item wdt:P850 ?wormsID. }
      OPTIONAL { ?item wdt:P3151 ?inaturalistID. } 
      OPTIONAL { ?item wdt:P10585 ?catalogueOfLifeID. } 
      OPTIONAL { ?item wdt:P627 ?iucn. }   
      OPTIONAL { ?item wdt:P141 ?iucnStatus. }
      }`;
}

export function queryTaxonWikipediaPages(ncbiId: number) {
  return `SELECT DISTINCT ?article ?lang ?name WHERE {
  {
    SELECT DISTINCT ?article ?lang ?name WHERE {
      ?taxid ps:P685 "${ncbiId}". 
      ?speciesId p:P685 ?taxid.
      ?article schema:about ?speciesId.
      ?article schema:name ?name.
      ?article schema:isPartOf [ wikibase:wikiGroup "wikipedia" ] . 
      ?article schema:inLanguage ?lang .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE]" }
    }
  }
  UNION {
    SELECT DISTINCT ?article ?lang ?name WHERE {
      ?taxid ps:P685 "${ncbiId}". 
      ?speciesId p:P685 ?taxid.
      ?species ^wdt:P366 ?speciesId .
      ?article schema:about ?species.
      ?article schema:name ?name.
      ?article schema:isPartOf [ wikibase:wikiGroup "wikipedia" ] . 
      ?article schema:inLanguage ?lang .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE]" }
      }
    }
  }`;
}
