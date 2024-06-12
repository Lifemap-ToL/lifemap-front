<template>
  <div ref="dropdown" :class="`dropdown ${classes}`">
    <div class="dropdown--trigger" @click="toggle">
      <slot name="dropdown-trigger"></slot>
    </div>
    <div class="dropdown--area">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./Dropdown.component.ts"></script>
