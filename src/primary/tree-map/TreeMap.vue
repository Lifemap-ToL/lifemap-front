<template>
  <TemplateTreeVue>
    <MapLayoutVue :map="map()" key="tree-map">
      <template #toolbar>
        <button class="button -text -icon" @click.prevent.stop="changeTool('ancestor')">
          <i class="mdi mdi-map-marker-path"></i>
        </button>
      </template>
      <template #left-bar>
        <AncestorSidebarVue
          v-if="tool === 'ancestor'"
          :ancestor="ancestor"
          :ancestorRoute="ancestorRoute"
          :onAncestorRouteFit="fitToAncestorRoute"
        ></AncestorSidebarVue>
      </template>
      <template #searchbar>
        <TaxonSearchBarVue @select="searchTaxon"></TaxonSearchBarVue>
      </template>
      <template #right-bar>
        <TaxonPopupVue v-if="selectedTaxon" :taxon="selectedTaxon.getProperties()" @close="unselectTaxon"></TaxonPopupVue>
      </template>
      <TaxonTooltipVue :taxon="highlightedTaxon" ref="taxon-tooltip"></TaxonTooltipVue>
    </MapLayoutVue>
  </TemplateTreeVue>
</template>

<script lang="ts" src="./TreeMap.component.ts"></script>
