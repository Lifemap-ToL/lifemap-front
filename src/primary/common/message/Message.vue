<template>
  <div class="message" v-if="!closed">
    <div class="message--header">
      <button class="message--header--closer" @click.stop.prevent="close"><i class="mdi mdi-close"></i></button>
    </div>
    <div class="message--content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./Message.component.ts"></script>
