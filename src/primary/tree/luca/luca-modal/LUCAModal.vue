<template>
  <ModalVue fullscreen @close="onClose">
    <div class="block -stretch flex-container -vertical -gap-lg">
      <div class="flex-container -vertical">
        <div class="flex-container -vertical -gap-xs block">
          <div class="title">ROOT</div>
          <div class="separator"></div>
          <div class="flex-container -vertical -gap-lg">
            <img src="../../../../assets/images/galaxy.jpg" alt="galaxy" class="image -full-width" />
            <span>
              {{ $t('luca-description') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ModalVue>
</template>

<script lang="ts" src="./LUCAModal.component.ts"></script>
