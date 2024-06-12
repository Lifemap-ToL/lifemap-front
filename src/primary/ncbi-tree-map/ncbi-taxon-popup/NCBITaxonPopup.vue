<template>
  <TaxonPopupVue :taxon="taxon">
    <template #details>
      <template v-if="expertMode">
        <div class="flex-container -vertical -gap-xxs">
          <div class="separator"></div>
          <div>
            <span class="text -bold">{{ taxon.descendants }}</span> descendants
          </div>
          <div v-if="taxon.sequencedGenomesFormatted">
            <span class="text -bold">{{ taxon.sequencedGenomesFormatted }}</span> sequenced genomes
          </div>
          <div>
            Explore <span class="text -bold">{{ taxon.name }}</span> on
            <a :href="taxon.ncbiLink" target="_blank" rel="noopener noreferrer" class="link">NCBI</a>
          </div>
          <div class="separator"></div>
        </div>
      </template>
    </template>
  </TaxonPopupVue>
</template>

<script lang="ts" src="./NCBITaxonPopup.component.ts"></script>
