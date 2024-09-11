<template>
  <div class="popup" @pointermove.stop.prevent>
    <div class="popup--header">
      <div class="flex-container -vertical -gap-xs block -stretch">
        <div class="flex-container -vertical -gap-xs block -stretch">
          <div class="flex-container -horizontal-reverse block -p4 text -font-lg">
            <button class="button -shade-0-70 -icon -small" @click.stop.prevent="close">
              <i class="mdi mdi-close"></i>
            </button>
          </div>
        </div>
        <div class="flex-container -vertical -gap-xs block -ph16">
          <div class="title">ROOT</div>
          <div class="separator"></div>
        </div>
      </div>
    </div>
    <div class="popup--body">
      <div class="flex-container -vertical -gap-lg">
        <img src="../../../../assets/images/galaxy.png" alt="galaxy" class="image -full-width" />
        <span>
          {{ $t('luca-description') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./LUCAPopup.component.ts"></script>
