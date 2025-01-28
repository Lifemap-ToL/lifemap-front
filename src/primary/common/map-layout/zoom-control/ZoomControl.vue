<template>
  <button class="button -text -icon" :title="$t('zoom-in')" :disabled="disableZoomIn" @click="zoomIn">
    <i class="mdi mdi-plus text -hover-color-secondary"></i>
  </button>
  <button class="button -text -icon" :title="$t('zoom-out')" :disabled="disableZoomOut" @click="zoomOut">
    <i class="mdi mdi-minus text -hover-color-secondary"></i>
  </button>
</template>

<script lang="ts" src="./ZoomControl.component.ts"></script>
