<template>
  <template v-if="state === 'ERROR'">
    <MessageVue>
      {{ $t('wikipedia-article-summary-not-found-message') }}
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
    </div>
  </template>
  <template v-if="state === 'SUCCESS'">
    <img
      v-if="wikipediaPageSummary.thumbnail"
      class="image -full-width"
      :src="wikipediaPageSummary.thumbnail.url"
      :alt="wikipediaPageSummary.title"
    />
    <slot name="message"></slot>
    <div class="flex-item -expand">
      <div class="flex-container -vertical -gap-xs">
        <p class="paragraph">{{ wikipediaPageSummary.extract }}</p>
        <a :href="wikipediaPageSummary.url" target="_blank" rel="noopener noreferrer" class="link">{{ $t('wikipedia-link-text') }}</a>
      </div>
    </div>
  </template>
</template>

<script lang="ts" src="./WikipediaPageSummary.component.ts"></script>
