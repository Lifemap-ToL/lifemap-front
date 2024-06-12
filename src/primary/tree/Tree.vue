<template>
  <TemplateVue>
    <template #header>
      <NavbarVue>
        <div class="navbar--link" @click.stop.prevent="openHelpModal">
          <div class="flex-container -align-baseline -gap-xs">
            <span>{{ $t('help') }}</span>
            <span><i class="mdi mdi-help"></i></span>
          </div>
        </div>
        <div class="navbar--link">
          <ModeDropdownVue :expertMode="expertMode"></ModeDropdownVue>
        </div>
      </NavbarVue>
    </template>
    <template #content>
      <MapLayoutVue :map="map()" key="tree-map">
        <template #toolbar>
          <button class="button -text -icon" @click.prevent.stop="changeTool('search')">
            <i class="mdi mdi-magnify"></i>
          </button>
          <button class="button -text -icon" @click.prevent.stop="changeTool('ancestor')">
            <i class="mdi mdi-map-marker-path"></i>
          </button>
          <template v-if="expertMode">
            <button class="button -text -icon" @click.prevent.stop="changeTool('subtree')">
              <i class="mdi mdi-family-tree"></i>
            </button>
            <button class="button -text -icon" @click.prevent.stop="changeTool('additional-data')">
              <i class="mdi mdi-database text"></i>
            </button>
          </template>
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
          <template v-if="expertMode">
            <SubtreeSidebarVue
              v-if="tool === 'subtree'"
              :taxonSubtree="taxonSubtree"
              :leafs="subtreeLeafs"
              :onSubtreeFit="fitView"
            ></SubtreeSidebarVue>
            <AdditionalDataSidebarVue v-if="tool === 'additional-data'" :additional="additional"></AdditionalDataSidebarVue>
          </template>
          <ParametersSidebarVue v-if="tool === 'parameters'"></ParametersSidebarVue>
        </template>
        <template #right-bar>
          <keep-alive>
            <NCBITaxonPopupVue
              v-if="selectedTaxon"
              :taxon="selectedTaxon.getProperties()"
              :expertMode="expertMode"
              @close="unselectTaxon"
            ></NCBITaxonPopupVue>
          </keep-alive>
        </template>
        <TaxonTooltipVue :taxon="highlightedTaxon" ref="taxon-tooltip"></TaxonTooltipVue>
      </MapLayoutVue>
    </template>
  </TemplateVue>
</template>

<script lang="ts" src="./Tree.component.ts"></script>
