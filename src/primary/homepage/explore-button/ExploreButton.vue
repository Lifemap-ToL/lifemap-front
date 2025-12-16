<template>
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
</template>

<script lang="ts" src="./ExploreButton.component.ts"></script>
