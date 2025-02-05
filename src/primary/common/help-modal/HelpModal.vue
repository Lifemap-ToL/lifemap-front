<template>
  <ModalVue :title="$t('help')">
    <div class="flex-container -vertical -gap-lg">
      <div class="flex-container -align-center">
        <i class="mdi mdi-24px mdi-help-circle"></i>
        <i18n-t keypath="help-lifemap" tag="p" class="paragraph">
          <template v-slot:lifemap>
            <span class="text -bold">Lifemap</span>
          </template>
        </i18n-t>
      </div>
      <template v-if="state === 'SUCCESS' || state === 'PENDING'">
        <div class="flex-container -align-center">
          <i class="mdi mdi-24px mdi-information"></i>
          <template v-if="state === 'PENDING'">
            <div class="flex-container -vertical -gap-xxs flex-item -expand">
              <div class="twinkle-area -h12"></div>
              <div class="twinkle-area -h12"></div>
              <div class="twinkle-area -h12"></div>
            </div>
          </template>
          <template v-if="state === 'SUCCESS'">
            <i18n-t keypath="help-tree" tag="p" class="paragraph">
              <template v-slot:species>
                <span class="text -bold">{{ treeSummary.species.total.toHuman() }}</span>
              </template>
              <template v-slot:archaea>
                <span class="text -bold">{{ treeSummary.species.archaea.toHuman() }}</span>
              </template>
              <template v-slot:bacteria>
                <span class="text -bold">{{ treeSummary.species.bacteria.toHuman() }}</span>
              </template>
              <template v-slot:eukaryotes>
                <span class="text -bold">{{ treeSummary.species.eukaryotes.toHuman() }}</span>
              </template>
            </i18n-t>
          </template>
        </div>
      </template>
      <div class="flex-container -align-center">
        <i class="mdi mdi-24px mdi-cursor-pointer"></i>
        <p class="paragraph">
          {{ $t('help-nodes') }}
        </p>
      </div>
      <div class="flex-container -align-center">
        <i class="mdi mdi-24px mdi-map-marker-path"></i>
        <i18n-t keypath="help-itineraries" tag="p" class="paragraph">
          <template v-slot:itineraryIcon>
            <i class="mdi mdi-map-marker-path"></i>
          </template>
        </i18n-t>
      </div>
      <div class="flex-container -align-center">
        <i class="mdi mdi-24px mdi-account-circle"></i>
        <p class="paragraph">
          {{ $t('help-credits') }}
        </p>
      </div>
    </div>
  </ModalVue>
</template>

<script lang="ts" src="./HelpModal.component.ts"></script>
