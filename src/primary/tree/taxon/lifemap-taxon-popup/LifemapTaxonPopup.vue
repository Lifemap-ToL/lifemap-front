<template>
  <div class="popup" @pointermove.stop.prevent>
    <template v-if="state === 'ERROR'">
      <div class="popup--body">
        <div class="block -pv16 text -font-lg">
          <div class="title -break-words">{{ $t('error') }}</div>
        </div>
        <MessageVue>
          {{ $t('failed-to-retrieve-taxon-info-message') }}
        </MessageVue>
      </div>
      <div class="popup--footer">
        <button class="button -outlined -small -stretch" @click.stop.prevent="lineageToRoot">{{ $t('ancestry-button-text') }}</button>
      </div>
    </template>
    <template v-else-if="state === 'PENDING' || state === 'SUCCESS'">
      <div class="popup--header">
        <div class="flex-container -vertical -gap-xs block -stretch">
          <div class="flex-container -horizontal-reverse block -p4 text -font-lg">
            <button class="button -shade-0-70 -icon -small" @click.stop.prevent="close">
              <i class="mdi mdi-close"></i>
            </button>
          </div>
          <div class="flex-container -vertical -gap-xs block -ph16">
            <template v-if="state === 'PENDING'">
              <div class="twinkle-area -h20"></div>
              <div class="twinkle-area -h20"></div>
            </template>
            <template v-else-if="state === 'SUCCESS'">
              <div class="title -break-words">{{ taxon.name }}</div>
              <div class="text -color-shade-85 -uppercase">{{ taxon.rank }}</div>
            </template>
          </div>
          <div class="flex-container -vertical">
            <div class="block -ph16 flex-container -vertical -gap-xxs">
              <slot name="head"></slot>
              <div class="separator"></div>
              <div class="flex-container -vertical -gap-xxs">
                <template v-if="state === 'PENDING'">
                  <div class="twinkle-area -h20"></div>
                  <div class="twinkle-area -h20"></div>
                </template>
                <template v-else-if="state === 'SUCCESS'">
                  <div>
                    <span class="text -font-sm"> {{ $t('descendants') }}: </span>
                    <span class="text -font-sm -bold">{{ taxon.descendants.toHuman() }}</span>
                  </div>
                  <TaxonAdditionalDataVue :key="taxonNCBIId" :taxonNCBIId="taxonNCBIId"></TaxonAdditionalDataVue>
                </template>
              </div>
              <div class="separator"></div>
            </div>
            <slot name="navigation"></slot>
          </div>
        </div>
      </div>
      <div class="popup--body">
        <slot name="content"></slot>
      </div>
      <div class="popup--footer">
        <button class="button -outlined -small -stretch" @click.stop.prevent="lineageToRoot">{{ $t('ancestry-button-text') }}</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" src="./LifemapTaxonPopup.component.ts"></script>
