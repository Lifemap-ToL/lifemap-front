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
        <td class="table--body--cell"><span class="text -text-wrap-nowrap">NCBI</span></td>
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
      <tr class="table--body--line">
        <td class="table--body--cell"><span class="text -text-wrap-nowrap">iNaturalist</span></td>
        <td class="table--body--cell">
          <template v-if="taxonWikidataRecord.inaturalistIds.length === 0">
            <span class="text -color-shade-50">
              {{ $t('no-entry') }}
            </span>
          </template>
          <template v-for="inaturalistId in taxonWikidataRecord.inaturalistIds" :key="inaturalistId">
            <a
              :href="`https://www.inaturalist.org/taxa/${inaturalistId}`"
              target="_blank"
              rel="noopener noreferrer"
              class="link -font-sm"
              >{{ inaturalistId }}</a
            >&nbsp;
          </template>
        </td>
      </tr>
      <tr class="table--body--line">
        <td class="table--body--cell"><span class="text -text-wrap-nowrap">Open Tree of Life</span></td>
        <td class="table--body--cell">
          <template v-if="taxonWikidataRecord.openTreeOfLifeIds.length === 0">
            <span class="text -color-shade-50">
              {{ $t('no-entry') }}
            </span>
          </template>
          <template v-for="openTreeOfLifeId in taxonWikidataRecord.openTreeOfLifeIds" :key="openTreeOfLifeId">
            <a
              :href="`https://tree.opentreeoflife.org/taxonomy/browse?id=${openTreeOfLifeId}`"
              target="_blank"
              rel="noopener noreferrer"
              class="link -font-sm"
              >{{ openTreeOfLifeId }}</a
            >&nbsp;
          </template>
        </td>
      </tr>
      <tr class="table--body--line">
        <td class="table--body--cell"><span class="text -text-wrap-nowrap">Catalogue of Life</span></td>
        <td class="table--body--cell">
          <template v-if="taxonWikidataRecord.catalogueOfLifeIds.length === 0">
            <span class="text -color-shade-50">
              {{ $t('no-entry') }}
            </span>
          </template>
          <template v-for="catalogueOfLifeId in taxonWikidataRecord.catalogueOfLifeIds" :key="catalogueOfLifeId">
            <a
              :href="`https://www.catalogueoflife.org/data/taxon/${catalogueOfLifeId}`"
              target="_blank"
              rel="noopener noreferrer"
              class="link -font-sm"
              >{{ catalogueOfLifeId }}</a
            >&nbsp;
          </template>
        </td>
      </tr>
      <tr class="table--body--line">
        <td class="table--body--cell"><span class="text -text-wrap-nowrap">GBIF</span></td>
        <td class="table--body--cell">
          <template v-if="taxonWikidataRecord.gbifIds.length === 0">
            <span class="text -color-shade-50">
              {{ $t('no-entry') }}
            </span>
          </template>
          <template v-for="gbifId in taxonWikidataRecord.gbifIds" :key="gbifId">
            <a :href="`https://www.gbif.org/species/${gbifId}`" target="_blank" rel="noopener noreferrer" class="link -font-sm">
              {{ gbifId }} </a
            >&nbsp;
          </template>
        </td>
      </tr>
      <tr class="table--body--line">
        <td class="table--body--cell"><span class="text -text-wrap-nowrap">INPN</span></td>
        <td class="table--body--cell">
          <template v-if="taxonWikidataRecord.taxRefIds.length === 0">
            <span class="text -color-shade-50">
              {{ $t('no-entry') }}
            </span>
          </template>
          <template v-for="taxRefId in taxonWikidataRecord.taxRefIds" :key="taxRefId">
            <a :href="` https://inpn.mnhn.fr/espece/cd_nom/${taxRefId}`" target="_blank" rel="noopener noreferrer" class="link -font-sm">
              {{ taxRefId }} </a
            >&nbsp;
          </template>
        </td>
      </tr>
      <tr class="table--body--line">
        <td class="table--body--cell"><span class="text -text-wrap-nowrap">IUCN</span></td>
        <td class="table--body--cell">
          <template v-if="taxonWikidataRecord.iucnIds.length === 0">
            <span class="text -color-shade-50">
              {{ $t('no-status') }}
            </span>
          </template>
          <template v-for="iucnId in taxonWikidataRecord.iucnIds" :key="iucnId">
            <a
              :href="`https://apiv3.iucnredlist.org/api/v3/taxonredirect/${iucnId}`"
              target="_blank"
              rel="noopener noreferrer"
              class="link -font-sm"
              >{{ iucnId }}</a
            >&nbsp;
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" src="./TaxonIdentifierList.component.ts"></script>
