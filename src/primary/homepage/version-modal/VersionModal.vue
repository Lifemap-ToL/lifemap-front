<template>
  <ModalVue secondary>
    <div class="flex-container -vertical -gap-lg">
      <slot name="header"></slot>
      <slot name="illustration"></slot>
      <div class="text -align-justify -color-shade-50">
        <slot name="content"></slot>
      </div>
    </div>
  </ModalVue>
</template>

<script lang="ts" src="./VersionModal.component.ts"></script>
