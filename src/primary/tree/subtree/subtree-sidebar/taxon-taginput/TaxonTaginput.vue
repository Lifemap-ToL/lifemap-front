<template>
  <div :class="`taginput ${autocompleteStateClass}`" ref="taginput">
    <div class="taginput--field" ref="field" @click.stop.prevent="focus">
      <TagVue v-for="(taxon, index) in selectedTaxa" :key="taxon" @remove="removeTaxon(index)">{{ taxon.fullName }}</TagVue>
      <input
        v-model="search"
        class="taginput--field--input"
        type="text"
        ref="input"
        @input="listSuggestion"
        @focusin.stop.prevent="openAutocomplete"
      />
    </div>
    <div class="taginput--suggestion-list">
      <template v-if="state === 'SUCCESS'">
        <div v-for="taxonSuggestion in taxonSuggestionProjections" :key="taxonSuggestion.ncbiId" class="autocomplete--suggestion-item">
          <div class="flex-container -vertical -gap-xs" @click.stop.prevent="select(taxonSuggestion)">
            <div>
              <span
                v-for="(slice, index) in taxonSuggestion.scientificNameSlices"
                :key="`${taxonSuggestion.ncbiId}-sci-${index}`"
                class="text"
                :class="{ '-color-shade-100': matchSearch(slice), '-bold': matchSearch(slice) }"
              >
                {{ slice }}
              </span>
              <template v-if="taxonSuggestion.commonNameSlices.length > 0"></template>
              <span
                v-for="(slice, index) in taxonSuggestion.commonNameSlices"
                :key="`${taxonSuggestion.ncbiId}-com-${index}`"
                class="text"
                :class="{ '-color-shade-100': matchSearch(slice), '-bold': matchSearch(slice) }"
              >
                {{ slice }}
              </span>
            </div>
            <div class="text -uppercase -font-xs -color-shade-75">
              <span
                v-for="(slice, index) in taxonSuggestion.rankSlices"
                :key="`${taxonSuggestion.ncbiId}-rank-${index}`"
                class="text"
                :class="{ '-color-shade-100': matchSearch(slice), '-bold': matchSearch(slice) }"
              >
                {{ slice }}
              </span>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="state === 'ERROR'">
        <div class="autocomplete--suggestion-item">
          <div class="text -color-main -font-sm -italic">{{ $t('taxon-suggestions-error-message') }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" src="./TaxonTaginput.component.ts"></script>
