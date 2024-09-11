<template>
  <div class="template-sidebar">
    <div v-if="sidebarOpened" class="template-sidebar--obfuscator" @click="close"></div>
    <Transition :name="transition">
      <div v-show="sidebarOpened" class="template-sidebar--content">
        <component v-if="sidebarOpened" :is="sidebar.component" v-bind="sidebar.props"></component>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" src="./Sidebar.component.ts"></script>
