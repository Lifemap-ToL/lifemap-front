<template>
  <div class="template-standard">
    <Transition name="-slide-top">
      <div v-show="banner" class="template-standard--banner">
        <div class="flex-container -align-center">
          <i18n-t keypath="banner-message" tag="div" class="flex-item -expand">
            <template v-slot:mail>
              <span class="text -bold">contact@lifemap.fr</span>
            </template>
          </i18n-t>
          <div>
            <button class="template-standard--banner--closer" @click.stop.prevent="banner = false">
              <span class="mdi mdi-24px mdi-close text -color-shade-"></span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
    <div class="template-standard--header">
      <slot name="header"></slot>
    </div>
    <div class="template-standard--content">
      <slot name="content"></slot>
    </div>
    <div v-if="$slots.footer" class="template-standard--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./Template.component.ts"></script>
