<template>
  <table class="table">
    <thead class="table--thead">
      <tr>
        <th class="table--thead--cell text -font-xs">{{ $t('database') }}</th>
        <th class="table--thead--cell text -font-xs">{{ $t('identifier') }}</th>
      </tr>
    </thead>
    <tbody class="table--body">
      <tr class="table--body--line">
        <td class="table--body--cell">NCBI</td>
        <td class="table--body--cell">
          <a
            :href="`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${taxon.ncbiId}`"
            target="_blank"
            rel="noopener noreferrer"
            class="link -font-sm"
            >{{ taxon.ncbiId }}</a
          >
        </td>
      </tr>
      <tr v-if="wikidataRecord.inaturalist" class="table--body--line">
        <td class="table--body--cell">iNaturalist</td>
        <td class="table--body--cell">
          <a
            :href="`https://www.inaturalist.org/taxa/${wikidataRecord.inaturalist}`"
            target="_blank"
            rel="noopener noreferrer"
            class="link -font-sm"
            >{{ wikidataRecord.inaturalist }}</a
          >
        </td>
      </tr>
      <tr v-if="wikidataRecord.openTreeOfLife" class="table--body--line">
        <td class="table--body--cell">Open Tree of Life</td>
        <td class="table--body--cell">
          <a
            :href="`https://tree.opentreeoflife.org/taxonomy/browse?id=${wikidataRecord.openTreeOfLife}`"
            target="_blank"
            rel="noopener noreferrer"
            class="link -font-sm"
            >{{ wikidataRecord.openTreeOfLife }}</a
          >
        </td>
      </tr>
      <tr v-if="wikidataRecord.catalogueOfLife" class="table--body--line">
        <td class="table--body--cell">Catalogue of Life</td>
        <td class="table--body--cell">
          <a
            :href="`https://www.catalogueoflife.org/data/taxon/${wikidataRecord.catalogueOfLife}`"
            target="_blank"
            rel="noopener noreferrer"
            class="link -font-sm"
            >{{ wikidataRecord.catalogueOfLife }}</a
          >
        </td>
      </tr>
      <tr v-if="wikidataRecord.gbif" class="table--body--line">
        <td class="table--body--cell">GBIF</td>
        <td class="table--body--cell">
          <a
            :href="`https://www.gbif.org/species/${wikidataRecord.gbif}`"
            target="_blank"
            rel="noopener noreferrer"
            class="link -font-sm"
            >{{ wikidataRecord.gbif }}</a
          >
        </td>
      </tr>
      <tr v-if="wikidataRecord.iucn" class="table--body--line">
        <td class="table--body--cell">IUCN</td>
        <td class="table--body--cell">
          <a
            :href="`https://apiv3.iucnredlist.org/api/v3/taxonredirect/${wikidataRecord.iucn}`"
            target="_blank"
            rel="noopener noreferrer"
            class="link -font-sm"
            >{{ wikidataRecord.iucn }}</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" src="./TaxonIdentifierList.component.ts"></script>
