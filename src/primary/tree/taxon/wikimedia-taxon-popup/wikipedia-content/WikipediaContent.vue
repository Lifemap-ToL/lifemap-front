<template>
  <div class="flex-container -vertical -gap-lg">
    <template v-if="state === 'ERROR'">
      <MessageVue>
        {{ $t('wikipedia-articles-not-found-message') }}
      </MessageVue>
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
      </div>
    </template>
    <template v-if="state === 'SUCCESS'">
      <div v-if="currentTaxonWikipediaPage" class="flex-container -vertical">
        <div>
          <WikipediaAvailablePagesDropdownVue
            :taxonWikipediaPages="taxonWikipediaAvailablePages"
            @select="currentTaxonWikipediaPage = $event"
          ></WikipediaAvailablePagesDropdownVue>
        </div>
        <WikipediaPageSummaryVue :taxonWikipediaPage="currentTaxonWikipediaPage">
          <template #message>
            <slot name="message"></slot>
          </template>
        </WikipediaPageSummaryVue>
      </div>
      <div v-else-if="taxonWikipediaAvailablePages.length > 0" class="flex-container -vertical">
        <MessageVue>
          {{ $t('no-wikipedia-article-in-preferred-language-message') }}
        </MessageVue>
        <WikipediaAvailablePagesDropdownVue
          :taxonWikipediaPages="taxonWikipediaAvailablePages"
          @select="currentTaxonWikipediaPage = $event"
        ></WikipediaAvailablePagesDropdownVue>
      </div>
      <MessageVue v-else>
        {{ $t('no-wikipedia-article-message') }}
      </MessageVue>
    </template>
  </div>
</template>

<script lang="ts" src="./WikipediaContent.component.ts"></script>
