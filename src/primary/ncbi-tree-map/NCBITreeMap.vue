<template>
  <TemplateTreeVue :expertMode="expertMode">
    <MapLayoutVue :map="map()" key="ncbi-tree-map">
      <template #toolbar>
        <button class="button -text -icon" @click.prevent.stop="changeTool('ancestor')">
          <i class="mdi mdi-map-marker-path"></i>
        </button>
        <template v-if="expertMode">
          <button class="button -text -icon" @click.prevent.stop="changeTool('subtree')">
            <i class="mdi mdi-family-tree"></i>
          </button>
          <button class="button -text -icon" @click.prevent.stop="changeTool('additional-data')">
            <i class="mdi mdi-database text -font-xl"></i>
          </button>
        </template>
      </template>
      <template #left-bar>
        <AncestorSidebarVue
          v-if="tool === 'ancestor'"
          :ancestor="ancestor"
          :ancestorRoute="ancestorRoute"
          :onAncestorRouteFit="fitToAncestorRoute"
        ></AncestorSidebarVue>
        <template v-if="expertMode">
          <SubtreeSidebarVue
            v-if="tool === 'subtree'"
            :taxonSubtree="taxonSubtree"
            :leafs="subtreeLeafs"
            :onSubtreeFit="fitView"
          ></SubtreeSidebarVue>
          <AdditionalDataSidebarVue v-if="tool === 'additional-data'" :additional="additional"></AdditionalDataSidebarVue>
          <ParametersSidebarVue v-if="tool === 'parameters'"></ParametersSidebarVue>
        </template>
      </template>
      <template #searchbar>
        <TaxonSearchBarVue @select="searchTaxon"></TaxonSearchBarVue>
      </template>
      <template #right-bar>
        <NCBITaxonPopupVue
          v-if="selectedTaxon"
          :taxon="selectedTaxon.getProperties()"
          :expertMode="expertMode"
          @close="unselectTaxon"
        ></NCBITaxonPopupVue>
      </template>
      <TaxonTooltipVue :taxon="highlightedTaxon" ref="taxon-tooltip"></TaxonTooltipVue>
    </MapLayoutVue>
  </TemplateTreeVue>
</template>

<script lang="ts" src="./NCBITreeMap.component.ts"></script>
