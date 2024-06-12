<template>
  <div class="template-toasts" v-show="toasts.length > 0">
    <div class="toasts" data-selector="toasts">
      <div class="toasts--slot" v-for="toast in toasts" :key="toast.id">
        <component :is="toast.displayed.component" v-bind="toast.displayed.props" @closed="remove(toast.id)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Toasts.component.ts"></script>
