<template>
  <div class="template-standard">
    <div class="template-standard--header">
      <slot name="header"></slot>
    </div>
    <div class="template-standard--content">
      <slot name="content"></slot>
    </div>
    <div v-if="$slots.footer" class="template-standard--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./Template.component.ts"></script>
