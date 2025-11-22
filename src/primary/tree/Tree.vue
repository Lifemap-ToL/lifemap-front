<template>
  <TemplateVue>
    <template #header>
      <NavbarVue></NavbarVue>
    </template>
    <template #content>
      <template v-if="state === 'SUCCESS'">
        <MapLayoutVue :map="map()" key="tree-map">
          <template #toolbar>
            <button class="button -text -icon" @click.prevent.stop="changeTool('search')" :title="$t('search-a-taxa')">
              <i class="mdi mdi-magnify text -hover-color-secondary" :class="{ '-color-secondary': tool === 'search' }"></i>
            </button>
            <button class="button -text -icon" @click.prevent.stop="changeTool('ancestor')" :title="$t('itinerary')">
              <i class="mdi mdi-map-marker-path text -hover-color-secondary" :class="{ '-color-secondary': tool === 'ancestor' }"></i>
            </button>
            <button class="button -text -icon" @click.prevent.stop="changeTool('subtree')" :title="$t('get-a-subtree')">
              <i class="mdi mdi-family-tree text -hover-color-secondary" :class="{ '-color-secondary': tool === 'subtree' }"></i>
            </button>
            <button class="button -text -icon" @click.prevent.stop="changeTool('additional-data')" :title="$t('display-additional-data')">
              <i class="mdi mdi-database text text -hover-color-secondary" :class="{ '-color-secondary': tool === 'additional-data' }"></i>
            </button>
            <button class="button -text -icon" :title="$t('get-a-snapshot')">
              <i class="mdi mdi-image-outline text -hover-color-secondary" @click.prevent.stop="exportAsPng"></i>
            </button>
            <button class="button -text -icon" :title="$t('parameters')" @click.prevent.stop="changeTool('parameters')">
              <i class="mdi mdi-cog text -hover-color-secondary" :class="{ '-color-secondary': tool === 'parameters' }"></i>
            </button>
            <div style="width:50%; height:1px; background:rgb(104 104 104); margin:8px auto;"></div>
            <!-- Feedback button -->
            <button class="button -text -icon" @click.prevent.stop="openFeedback" title="Send feedback">
              <i class="mdi mdi-message-text-outline text -hover-color-secondary"></i>
            </button>
          </template>
          <template #left-bar>
            <SearchSidebarVue
              v-if="tool === 'search'"
              @select="searchTaxon($event, true, false, !mobile())"
              @close="changeTool('search')"
            ></SearchSidebarVue>
            <AncestorSidebarVue
              v-if="tool === 'ancestor'"
              :ancestor="ancestor"
              :ancestorRoute="ancestorRoute"
              :selected="selectedTaxon ? selectedTaxon.getProperties().ncbiId : lucaSelected ? 0 : undefined"
              :onAncestorRouteFit="fitToAncestorRoute"
              @select="
                $event =>
                  $event.id === 'root'
                    ? [unselectTaxon(), searchLUCA(true, true, !mobile())]
                    : [searchTaxon($event, true, true, !mobile()), unselectLUCA()]
              "
              @close="changeTool('ancestor')"
            ></AncestorSidebarVue>
            <SubtreeSidebarVue
              v-if="tool === 'subtree'"
              :taxonSubtree="taxonSubtree"
              :leafs="subtreeLeafs"
              :onSubtreeFit="fitView"
              :notFoundTaxonIds="notFoundTaxonIds"
              @close="changeTool('subtree')"
            ></SubtreeSidebarVue>
            <AdditionalDataSidebarVue
              v-if="tool === 'additional-data'"
              :additional="additional"
              @close="changeTool('additional-data')"
            ></AdditionalDataSidebarVue>
            <ParametersSidebarVue v-if="tool === 'parameters'" @close="changeTool('parameters')"></ParametersSidebarVue>
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
          <LUCATooltipVue ref="luca-tooltip"></LUCATooltipVue>
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
