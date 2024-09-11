<template>
  <router-view />
  <component v-if="isModalOpened" :is="modal.component" v-bind="modal.props"></component>
  <ToastsVue />
  <SidebarVue />
</template>

<script lang="ts" src="./App.component.ts"></script>
