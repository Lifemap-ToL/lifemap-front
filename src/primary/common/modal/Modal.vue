<template>
  <div class="template-modal -open">
    <div class="template-modal--content" :class="{ '-fullscreen': fullscreen }">
      <div class="modal" :class="[size ? `-${size}` : '', { '-secondary': secondary }]">
        <div class="modal--header">
          <div class="modal--header--title">
            <h2 class="title -small">{{ title }}</h2>
          </div>
          <button class="modal--header--button mdi mdi-close" @click="close()"></button>
        </div>
        <div class="modal--content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Modal.component.ts"></script>
