<template>
  <DropdownVue :bus="expertModeDropdownBus" right shrink>
    <template #dropdown-trigger>
      <div class="navbar--link">
        <div class="flex-container -align-baseline -gap-xs">
          <span>Mode</span>
          <span><i class="mdi mdi-chevron-down"></i></span>
        </div>
      </div>
    </template>
    <div class="contextual-menu">
      <button class="contextual-menu--entry" @click.prevent.stop="changeMode(false)">
        <span class="contextual-menu--entry--icon"><i v-if="!expertMode" class="mdi mdi-check"></i></span>
        <span class="contextual-menu--entry--slot">Mode Standard</span>
      </button>
      <button class="contextual-menu--entry" @click.prevent.stop="changeMode(true)">
        <span class="contextual-menu--entry--icon"><i v-if="expertMode" class="mdi mdi-check"></i></span>
        <span class="contextual-menu--entry--slot">Mode Expert</span>
      </button>
    </div>
  </DropdownVue>
</template>

<script lang="ts" src="./ModeDropdown.component.ts"></script>
