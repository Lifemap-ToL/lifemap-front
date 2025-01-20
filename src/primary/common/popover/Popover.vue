<template>
  <span ref="popover" :class="`popover ${classes}`">
    <span @click="toggle">
      <slot name="trigger"></slot>
    </span>
    <span class="popover--area">
      <slot></slot>
    </span>
  </span>
</template>

<script lang="ts" src="./Popover.component.ts"></script>
