<template>
  <router-view />
  <component v-if="isModalOpened" :is="modal.component" v-bind="modal.props"></component>
</template>

<script lang="ts" src="./App.component.ts"></script>
