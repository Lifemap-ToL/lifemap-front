<template>
  <div class="toast" :class="typeClass" @mouseenter="enter" @mouseleave="leave">
    <div class="flex-container -align-center">
      <div><slot /></div>
      <div>
        <div class="toast--icon-action">
          <i class="mdi mdi-18px mdi-close" @click="close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Toast.component.ts"></script>
