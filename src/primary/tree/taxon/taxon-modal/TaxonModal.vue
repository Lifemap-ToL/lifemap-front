<template>
  <ModalVue fullscreen @close="onClose">
    <template v-if="taxonFetchingState === 'FAILED'">
      <div class="block -stretch flex-container -vertical -gap-lg">
        <div class="flex-container -vertical">
          <div class="block -pv16 text -font-lg">
            <div class="title -break-words">{{ $t('error') }}</div>
          </div>
          <MessageVue>
            {{ $t('failed-to-retrieve-taxon-info-message') }}
          </MessageVue>
        </div>
        <div class="flex-item -expand"></div>
        <div>
          <button class="button -outlined -small -stretch" @click.stop.prevent="lineageToRoot">{{ $t('ancestry-button-text') }}</button>
        </div>
      </div>
    </template>
    <template v-else-if="taxonFetchingState === 'DONE' || taxonFetchingState === 'ONGOING'">
      <div class="block -stretch flex-container -vertical -gap-lg">
        <div class="flex-container -vertical">
          <div class="flex-container -vertical -gap-xs block">
            <template v-if="taxonFetchingState === 'ONGOING'">
              <div class="twinkle-area -h20"></div>
              <div class="twinkle-area -h20"></div>
            </template>
            <template v-else-if="taxonFetchingState === 'DONE'">
              <div class="title -break-words">{{ taxon.name }}</div>
              <div class="text -color-shade-85 -uppercase">{{ taxon.rank }}</div>
            </template>
          </div>
          <template v-if="taxonWikidataRecordFetchingState === 'DONE' && taxonWikidataRecordProjection.iucnStatusImageURL">
            <div class="separator"></div>
            <div class="flex-container -vertical -gap-xxs">
              <div class="text -align-center">{{ $t('iucn-status') }}</div>
              <img :src="taxonWikidataRecordProjection.iucnStatusImageURL" class="image -full-width" alt="IUCN status image" />
            </div>
          </template>
          <div class="separator"></div>
          <div class="flex-container -vertical -gap-xxs">
            <template v-if="taxonFetchingState === 'ONGOING'">
              <div class="twinkle-area -h20"></div>
              <div class="twinkle-area -h20"></div>
            </template>
            <template v-else-if="taxonFetchingState === 'DONE'">
              <div>
                <span class="text -font-sm"> {{ $t('descendants') }}: </span>
                <span class="text -font-sm -bold">{{ taxon.descendants.toHuman() }}</span>
              </div>
              <TaxonAdditionalDataVue :taxonNCBIId="taxon.ncbiId"></TaxonAdditionalDataVue>
            </template>
          </div>
          <div class="separator"></div>
        </div>
        <div class="flex-item -expand">
          <template v-if="taxonWikidataRecordFetchingState === 'FAILED'">
            <WikipediaContentVue :taxon="taxon"></WikipediaContentVue>
          </template>
          <template v-if="taxonWikidataRecordFetchingState === 'DONE'">
            <div class="flex-container -vertical">
              <div class="tab-list -equivalent">
                <div class="tab-list--item" :class="{ '-selected': activeTab === 'wikipedia' }" @click.prevent.stop="activeWikipediaTab">
                  <span class="text">Wikipedia</span>
                </div>
                <div class="tab-list--item" :class="{ '-selected': activeTab === 'databases' }" @click.prevent.stop="activeIdentifiersTab">
                  <span class="text">{{ $t('databases') }}</span>
                </div>
              </div>
              <component :is="activeComponent" v-bind="activeComponentProps"></component>
            </div>
          </template>
        </div>
        <div>
          <button class="button -outlined -small -stretch" @click.stop.prevent="lineageToRoot">{{ $t('ancestry-button-text') }}</button>
        </div>
      </div>
    </template>
  </ModalVue>
</template>

<script lang="ts" src="./TaxonModal.component.ts"></script>
