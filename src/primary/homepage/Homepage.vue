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
          <div>
            <template v-if="state === 'PENDING'">
              <p>{{ $t('lifemap-availability-check') }}</p>
            </template>
            <template v-if="state === 'SUCCESS'">
              <button class="button -extra-large -main" @click.stop.prevent="goToTree">{{ $t('start-exploring') }}</button>
            </template>
            <template v-if="state === 'ERROR'">
              <MessageVue>
                {{ $t('lifemap-not-available-message') }}
              </MessageVue>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex-container -gap-xl -justify-center -wrap-reverse">
        <!-- To be uncommented once the android app will be back
        <a href="https://play.google.com/store/apps/details?id=fr.univ_lyon1.lifemapcom&hl=en" target="_blank" rel="noopener noreferrer">
          <img class="image -h40" src="../../assets/images/playstore.png" alt="Playstore" />
        </a>
        -->
        <div class="flex-container -vertical -gap-xs">
          <div class="flex-container -gap-xs -wrap">
            <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">
              <img class="image" src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png" alt="license" />
            </a>
            <i18n-t keypath="license-notice" tag="div" class="text -font-xs">
              <template v-slot:author>
                <a class="link" href="https://lbbe.univ-lyon1.fr/-de-Vienne-Damien-.html" target="_blank" rel="noopener noreferrer">
                  Damien de Vienne
                </a>
              </template>
            </i18n-t>
          </div>
          <div class="divider -fill-color-shade-85"></div>
          <i18n-t keypath="publication-notice" tag="div" class="text -font-xs">
            <template v-slot:journal>
              <i>PLOS Biology</i>
            </template>
          </i18n-t>
        </div>
      </div>
    </template>
  </TemplateVue>
</template>

<script lang="ts" src="./Homepage.component.ts"></script>
