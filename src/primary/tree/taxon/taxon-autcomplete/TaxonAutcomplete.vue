<template>
  <div :class="`autocomplete ${autocompleteStateClass} ${autocompleteRenderingClass}`" @pointermove.stop.prevent ref="autocomplete">
    <div class="autocomplete--trigger">
      <input
        v-model="search"
        type="text"
        :placeholder="$t('taxon-search-hint')"
        class="input"
        :class="`${inputWidthClass} ${inputFontSizeClass}`"
        @input="listSuggestion"
        @focusin.stop.prevent="openAutocomplete"
        ref="input"
      />
    </div>
    <div class="autocomplete--suggestion-list">
      <template v-if="state === 'SUCCESS'">
        <div v-for="taxonSuggestion in taxonSuggestionProjections" :key="taxonSuggestion.ncbiId" class="autocomplete--suggestion-item">
          <div class="flex-container -vertical -gap-xxs" @click.stop.prevent="select(taxonSuggestion)">
            <div>
              <span
                v-for="(slice, index) in taxonSuggestion.scientificNameSlices"
                :key="`${taxonSuggestion.ncbiId}-sci-${index}`"
                class="text"
                :class="{ '-color-shade-100': matchSearch(slice), '-bold': matchSearch(slice), '-italic': taxonSuggestion.nameInItalic }"
              >
                {{ slice }}
              </span>
            </div>
            <div>
              <template v-if="taxonSuggestion.commonNameSlices.length > 0">
                <span
                  v-for="(slice, index) in taxonSuggestion.commonNameSlices"
                  :key="`${taxonSuggestion.ncbiId}-com-${index}`"
                  class="text -font-sm"
                  :class="{ '-color-shade-100': matchSearch(slice), '-bold': matchSearch(slice) }"
                >
                  {{ slice }}
                </span>
              </template>
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

<script lang="ts" src="./TaxonAutocomplete.component.ts"></script>
