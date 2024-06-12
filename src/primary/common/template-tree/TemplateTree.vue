<template>
  <div class="template-map">
    <div class="template-map--header">
      <nav class="navbar">
        <div class="navbar--brand">
          <img
            src="../../../assets/images/logo-header.png"
            alt="Lifemap header logo"
            class="image -h40 -width-auto"
            @click.stop.prevent="$router.push('/')"
          />
        </div>
        <div class="navbar--spacer"></div>
        <DropdownVue :bus="expertModeDropdownBus" right shrink>
          <template #dropdown-trigger>
            <div class="navbar--link">
              <div class="flex-container -align-baseline -gap-xxs">
                <span>{{ $t('mode') }}</span>
                <span><i class="mdi mdi-chevron-down"></i></span>
              </div>
            </div>
          </template>
          <div class="contextual-menu">
            <button class="contextual-menu--entry" @click.prevent.stop="changeMode(false)">
              <span class="contextual-menu--entry--icon"><i v-if="!expertMode" class="mdi mdi-check"></i></span>
              <span class="contextual-menu--entry--slot">{{ $t('standard') }}</span>
            </button>
            <button class="contextual-menu--entry" @click.prevent.stop="changeMode(true)">
              <span class="contextual-menu--entry--icon"><i v-if="expertMode" class="mdi mdi-check"></i></span>
              <span class="contextual-menu--entry--slot">{{ $t('expert') }}</span>
            </button>
          </div>
        </DropdownVue>
        <DropdownVue :bus="languageDropdownBus" right shrink>
          <template #dropdown-trigger>
            <div class="navbar--link">
              <div class="flex-container -align-baseline -gap-xxs">
                <span><i class="mdi mdi-18px mdi-translate"></i></span>
                <span><i class="mdi mdi-chevron-down"></i></span>
              </div>
            </div>
          </template>
          <div class="contextual-menu">
            <button class="contextual-menu--entry">
              <span class="contextual-menu--entry--icon"><i class="mdi mdi-check"></i></span>
              <span class="contextual-menu--entry--slot">Français</span>
            </button>
            <button class="contextual-menu--entry">
              <span class="contextual-menu--entry--icon"></span>
              <span class="contextual-menu--entry--slot">Anglais</span>
            </button>
          </div>
        </DropdownVue>
      </nav>
    </div>
    <div class="template-map--map">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./TemplateTree.component.ts"></script>
