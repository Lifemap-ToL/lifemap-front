<template>
  <ModalVue>
    <div class="lifemap-flex-container -vertical -gap-20">
      <div class="lifemap-flex-container--item">
        <slot name="header"></slot>
      </div>
      <div class="lifemap-flex-container--item">
        <slot name="illustration"></slot>
      </div>
      <div class="lifemap-flex-container--item lifemap-text -align-justify -color-shade-50">
        <slot name="content"></slot>
      </div>
    </div>
  </ModalVue>
</template>

<script lang="ts" src="./VersionModal.component.ts"></script>
