<template>
  <LifemapTaxonPopupVue :taxonNCBIId="taxon.ncbiId">
    <template #head>
      <template v-if="state === 'PENDING'">
        <div class="twinkle-area -h20"></div>
      </template>
      <template v-if="state === 'SUCCESS' && taxonWikidataRecordProjection.iucnStatusImageURL">
        <div class="separator"></div>
        <div class="flex-container -vertical -gap-xxs">
          <div class="text -align-center">{{ $t('iucn-status') }}</div>
          <img :src="taxonWikidataRecordProjection.iucnStatusImageURL" class="image -full-width" alt="IUCN status image" />
        </div>
      </template>
    </template>

    <template #navigation>
      <template v-if="state === 'SUCCESS'">
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
      </template>
    </template>
    <template #content>
      <template v-if="state === 'ERROR'">
        <WikipediaContentVue :taxon="taxon"></WikipediaContentVue>
      </template>
      <template v-if="state === 'SUCCESS'">
        <KeepAlive>
          <component :is="activeComponent" v-bind="activeComponentProps">
            <template v-if="wikipediaLanguageMessage" #message>
              <MessageVue @close="wikipediaLanguageMessage = false">
                <p class="paragraph -font-sm">{{ $t('wikipedia-language-message') }} <i class="mdi mdi-cog"></i></p>
              </MessageVue>
            </template>
          </component>
        </KeepAlive>
      </template>
    </template>
  </LifemapTaxonPopupVue>
</template>

<script lang="ts" src="./WikimediaTaxonPopup.component.ts"></script>
