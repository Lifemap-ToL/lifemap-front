<template>
  <div class="lifemap-template-modal -open">
    <div class="lifemap-template-modal--content">
      <div :class="`lifemap-modal -w${width}`">
        <div class="lifemap-modal--header">
          <div class="lifemap-modal--header--title">
            <h2 class="lifemap-title-medium" data-selector="modal.title">{{ title }}</h2>
          </div>
          <button data-selector="modal.closer" class="lifemap-modal--header--button mdi mdi-close" @click="close()"></button>
        </div>
        <div class="lifemap-modal--content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Modal.component.ts"></script>
