<template>
  <div class="sidebar">
    <div class="sidebar--slot">
      <div class="flex-container -gap-0 -wrap -align-center">
        <div class="icon -font-lg"><i class="mdi mdi-magnify"></i></div>
        <div class="flex-item -expand">
          <TaxonAutocompleteVue @select="findTaxon"></TaxonAutocompleteVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./SearchSidebar.component.ts"></script>
