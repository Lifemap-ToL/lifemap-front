<template>
  <div class="sidebar">
    <div class="sidebar--header">
      <button class="button -shade-0-70 -icon -small" @click.stop.prevent="$emit('close')">
        <i class="mdi mdi-close"></i>
      </button>
    </div>
    <div class="sidebar--body">
      <div class="sidebar--body--slot">
        <div class="flex-container -gap-0 -wrap -align-center">
          <div class="icon -font-lg"><i class="mdi mdi-magnify"></i></div>
          <div class="flex-item -expand">
            <TaxonAutocompleteVue @select="findTaxon"></TaxonAutocompleteVue>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./SearchSidebar.component.ts"></script>
