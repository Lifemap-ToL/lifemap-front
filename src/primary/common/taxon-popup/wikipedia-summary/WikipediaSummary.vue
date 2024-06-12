<template>
  <div class="flex-container -vertical -gap-lg">
    <template v-if="state === 'ERROR'">
      <div class="text -color-main">{{ $t('no-wikipedia-article-message') }}</div>
    </template>
    <template v-if="state === 'PENDING'">
      <div class="flex-container -vertical -gap-sm">
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
        <div class="twinkle-area -h20"></div>
      </div>
    </template>
    <template v-if="state === 'SUCCESS'">
      <div class="flex-container -vertical">
        <div>
          <DropdownVue :bus="languageDropdownBus" shrink>
            <template #dropdown-trigger>
              <button class="link text flex-container -gap-xxs -align-baseline">
                <div><i class="mdi mdi-translate"></i></div>
                <div>{{ $tc('number-of-language', wikipediaLinks.length, { number: wikipediaLinks.length }) }}</div>
                <div><i class="mdi mdi-chevron-down"></i></div>
              </button>
            </template>
            <div class="contextual-menu">
              <button
                v-for="link in wikipediaLinks"
                :key="link.lang"
                class="contextual-menu--entry"
                @click.stop.prevent="changeLanguage(link)"
              >
                <span class="contextual-menu--entry--slot"
                  ><span class="text -bold">{{ link.lang }}</span></span
                >
                <span class="contextual-menu--entry--slot">{{ link.title }}</span>
              </button>
            </div>
          </DropdownVue>
        </div>
        <img v-if="pageSummary.thumbnail" class="image -full-width" :src="pageSummary.thumbnail.url" :alt="taxon.name" />

        <slot name="message"></slot>
        <!--
        <template v-if="languageMessage">
          <WikipediaLanguageMessageVue @close="languageMessage = false"></WikipediaLanguageMessageVue>
        </template>
        -->
        <div class="flex-item -expand">
          <div class="flex-container -vertical -gap-xs">
            <p class="paragraph -align-justify">{{ pageSummary.extract }}</p>
            <a :href="pageSummary.url" target="_blank" rel="noopener noreferrer" class="link">{{ $t('wikipedia-link-text') }}</a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" src="./WikipediaSummary.component.ts"></script>
