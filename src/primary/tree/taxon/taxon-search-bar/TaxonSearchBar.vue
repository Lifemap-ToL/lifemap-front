<template>
  <div class="search-bar">
    <div class="flex-container -gap-0 -wrap -align-center">
      <div class="icon -font-lg"><i class="mdi mdi-magnify"></i></div>
      <TaxonAutocompleteVue :inputWidth="300" @select="findTaxon"></TaxonAutocompleteVue>
    </div>
  </div>
</template>

<script lang="ts" src="./TaxonSearchBar.component.ts"></script>
