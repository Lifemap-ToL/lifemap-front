<template>
  <TemplateVue>
    <template #header>
      <NavbarVue></NavbarVue>
    </template>
    <template #content>
      <div class="page">
        <div class="flex-container -vertical -gap-xxl -align-center">
          <div class="flex-container -gap-xl -align-center -vertical">
            <div class="flex-container -align-end">
              <img src="../../assets/images/logo-lifemap.png" alt="Lifemap logo" class="image -h80 -width-auto" />
              <h1 class="title -extra-large -color-main">Lifemap</h1>
            </div>
            <div class="title -align-center -large -color-main">{{ $t('lifemap-baseline') }}</div>
            <hr class="separator" />
            <template v-if="mobile">
              <div>
                <ExploreButtonVue />
              </div>
            </template>
            <p class="text -font-lg">{{ $t('platform-description') }}</p>
            <template v-if="treeSummary">
              <i18n-t keypath="platform-figures" tag="span" class="text -italic -color-main">
                <template v-slot:date>
                  <span class="text -bold">{{ today }}</span>
                </template>
                <template v-slot:totalSpecies>
                  <span class="text -bold">{{ treeSummary.species.total.toHuman() }}</span>
                </template>
                <template v-slot:eukaryotes>
                  <span class="text -bold">{{ treeSummary.species.eukaryotes.toHuman() }}</span>
                </template>
                <template v-slot:archaea>
                  <span class="text -bold">{{ treeSummary.species.archaea.toHuman() }}</span>
                </template>
                <template v-slot:bacteria>
                  <span class="text -bold">{{ treeSummary.species.bacteria.toHuman() }}</span>
                </template>
                <template v-slot:lastUpdateDate>
                  <span class="text -bold">{{ lastUpdateDate }}</span>
                </template>
              </i18n-t>
            </template>
          </div>
          <template v-if="!mobile">
            <div>
              <ExploreButtonVue />
            </div>
          </template>
        </div>
      </div>
    </template>
    <template #footer>
      <FooterVue></FooterVue>
    </template>
  </TemplateVue>
</template>

<script lang="ts" src="./Homepage.component.ts"></script>
