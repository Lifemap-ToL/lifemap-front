<template>
  <div class="flex-container -vertical -gap-sm">
    <div class="flex-container -gap-sm -align-center">
      <div class="circle -s12 -fill-color-path-start"></div>
      <div class="flex-item -expand">
        <TaxonAutocompleteVue
          inputFontSize="lg"
          :value="value[0] ? value[0].name : ''"
          @select="selectAncestorRouteStartTaxon"
        ></TaxonAutocompleteVue>
      </div>
    </div>
    <div class="flex-container -gap-sm -align-center">
      <div class="circle -s12 -fill-color-path-end"></div>
      <div class="flex-item -expand">
        <TaxonAutocompleteVue
          inputFontSize="lg"
          :value="value[1] ? value[1].name : ''"
          @select="selectAncestorRouteEndTaxon"
        ></TaxonAutocompleteVue>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AncestorForm.component.ts"></script>
