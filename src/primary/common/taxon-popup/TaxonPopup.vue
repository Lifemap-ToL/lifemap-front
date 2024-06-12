<template>
  <div class="popup" @pointermove.stop.prevent>
    <div class="popup--header">
      <div class="flex-container -vertical -gap-xs block -stretch">
        <div class="flex-container -horizontal-reverse block -p4 text -font-lg">
          <button class="button -shade-0-70 -icon -small" @click.stop.prevent="close">
            <i class="mdi mdi-close"></i>
          </button>
        </div>
        <div class="flex-container -vertical -gap-xs block -ph16">
          <div class="title -break-words">{{ taxon.name }}</div>
          <div class="text -color-shade-85 -uppercase">{{ taxon.rank }}</div>
        </div>
        <div class="flex-container -vertical">
          <div class="block -ph16 flex-container -vertical -gap-xxs">
            <template v-if="state === 'SUCCESS'">
              <div v-if="wikidataRecord.iucnStatusImageURL" class="separator"></div>
              <img
                v-if="wikidataRecord.iucnStatusImageURL"
                :src="wikidataRecord.iucnStatusImageURL"
                class="image -full-width"
                alt="IUCN status image"
              />
              <div class="separator"></div>
              <div class="flex-container -vertical -gap-xxs">
                <div>
                  <span class="text -font-sm"> {{ $t('descendant') }}: </span>
                  <span class="text -font-sm -bold">{{ taxon.descendants }}</span>
                </div>
                <div v-if="taxon.sequencedGenomesFormatted">
                  <span class="text -font-sm">{{ $t('Sequenced genomes') }}: </span
                  ><span class="text -font-sm -bold">{{ taxon.sequencedGenomesFormatted }}</span>
                </div>
                <div v-if="taxonAge">
                  <span class="text -font-sm" :key="age">
                    {{ $t('age') }} <i class="link mdi mdi-information" @click.stop.prevent="openTaxonAgeInformationModal"></i> :
                  </span>
                  <span class="text -font-sm -bold">{{ taxonAge }}</span>
                </div>
              </div>
              <div class="separator"></div>
            </template>
          </div>
          <div class="block -ph16">
            <div class="tab-list -equivalent">
              <div class="tab-list--item" :class="{ '-selected': activeTab === 'wikipedia' }" @click.prevent.stop="activeWikipediaTab">
                <span class="text -font-sm">Wikipedia</span>
              </div>
              <div class="tab-list--item" :class="{ '-selected': activeTab === 'databases' }" @click.prevent.stop="activeIdentifiersTab">
                <span class="text -font-sm">{{ $t('databases') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup--body">
      <template v-if="state === 'SUCCESS'">
        <KeepAlive>
          <component :is="activeComponent" v-bind="activeComponentProps">
            <template v-if="wikipediaLanguageMessage" #message>
              <WikipediaLanguageMessageVue @close="wikipediaLanguageMessage = false"></WikipediaLanguageMessageVue>
            </template>
          </component>
        </KeepAlive>
      </template>
    </div>
    <div class="popup--footer">
      <button class="button -outlined -small" @click.stop.prevent="lineageToRoot">{{ $t('ancestry-button-text') }}</button>
    </div>
  </div>
</template>

<script lang="ts" src="./TaxonPopup.component.ts"></script>
