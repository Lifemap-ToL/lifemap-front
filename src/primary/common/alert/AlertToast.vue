<template>
  <ToastVue :type="type" @closed="close">
    {{ message }}
  </ToastVue>
</template>

<script lang="ts" src="./AlertToast.component.ts"></script>
