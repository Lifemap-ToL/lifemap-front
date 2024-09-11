<template>
  <button class="button -text -icon" :disabled="disableZoomIn" @click="zoomIn">
    <i class="mdi mdi-plus"></i>
  </button>
  <button class="button -text -icon" :disabled="disableZoomOut" @click="zoomOut">
    <i class="mdi mdi-minus"></i>
  </button>
</template>

<script lang="ts" src="./ZoomControl.component.ts"></script>
