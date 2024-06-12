<template>
  <div class="message">
    <div class="message--header">
      <button class="message--header--closer" @click.stop.prevent="$emit('close')"><i class="mdi mdi-close"></i></button>
    </div>
    <div class="message--content">
      <p class="paragraph -font-sm">{{ $t('wikipedia-language-message') }} <i class="mdi mdi-cog"></i></p>
    </div>
  </div>
</template>

<script lang="ts" src="./WikipediaLanguageMessage.component.ts"></script>
