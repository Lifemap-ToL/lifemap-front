<template>
  <div class="tag">
    <span class="tag--text"><slot></slot></span>
    <span class="tag--remover">
      <i class="mdi mdi-close icon -clickable -color-shade-75 -hover-color-shade-100" @click.stop.prevent="$emit('remove')"></i>
    </span>
  </div>
</template>
<script setup lang="ts"></script>
