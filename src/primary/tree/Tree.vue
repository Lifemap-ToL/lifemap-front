<template>
  <TemplateVue>
    <template #header>
      <NavbarVue></NavbarVue>
    </template>
    <template #content>
      <template v-if="state === 'SUCCESS'">
        <MapLayoutVue :map="map()" key="tree-map">
          <template #toolbar>
            <button class="button -text -icon" @click.prevent.stop="changeTool('search')">
              <i class="mdi mdi-magnify"></i>
            </button>
            <button class="button -text -icon" @click.prevent.stop="changeTool('ancestor')">
              <i class="mdi mdi-map-marker-path"></i>
            </button>
            <button class="button -text -icon" @click.prevent.stop="changeTool('subtree')">
              <i class="mdi mdi-family-tree"></i>
            </button>
            <button class="button -text -icon" @click.prevent.stop="changeTool('additional-data')">
              <i class="mdi mdi-database text"></i>
            </button>
            <button class="button -text -icon">
              <i class="mdi mdi-image-outline text" @click.prevent.stop="exportAsPng"></i>
            </button>
            <button class="button -text -icon" @click.prevent.stop="changeTool('parameters')">
              <i class="mdi mdi-cog text"></i>
            </button>
          </template>
          <template #left-bar>
            <SearchSidebarVue v-if="tool === 'search'" @select="searchTaxon"></SearchSidebarVue>
            <AncestorSidebarVue
              v-if="tool === 'ancestor'"
              :ancestor="ancestor"
              :ancestorRoute="ancestorRoute"
              :onAncestorRouteFit="fitToAncestorRoute"
            ></AncestorSidebarVue>
            <SubtreeSidebarVue
              v-if="tool === 'subtree'"
              :taxonSubtree="taxonSubtree"
              :leafs="subtreeLeafs"
              :onSubtreeFit="fitView"
            ></SubtreeSidebarVue>
            <AdditionalDataSidebarVue v-if="tool === 'additional-data'" :additional="additional"></AdditionalDataSidebarVue>
            <ParametersSidebarVue v-if="tool === 'parameters'"></ParametersSidebarVue>
          </template>
          <template #right-bar>
            <LUCAPopupVue v-if="lucaSelected" @close="unselectLUCA"></LUCAPopupVue>
            <keep-alive>
              <WikimediaTaxonPopupVue
                v-if="selectedTaxon"
                :taxon="selectedTaxon.getProperties()"
                @close="unselectTaxon"
              ></WikimediaTaxonPopupVue>
            </keep-alive>
          </template>
          <TaxonTooltipVue :taxon="highlightedTaxon" ref="taxon-tooltip"></TaxonTooltipVue>
        </MapLayoutVue>
      </template>
      <template v-else-if="state === 'ERROR'">
        <div class="page -center">
          <MessageVue>
            <div class="content -center">
              <span class="text -font-lg">{{ $t('lifemap-not-available-message') }}</span>
            </div>
          </MessageVue>
        </div>
      </template>
    </template>
  </TemplateVue>
</template>

<script lang="ts" src="./Tree.component.ts"></script>
