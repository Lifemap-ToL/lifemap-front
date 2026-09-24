<template>
  <DropdownVue :bus="bus" right shrink>
    <template #dropdown-trigger>
      <div class="navbar--link">
        <div class="flex-container -align-baseline -gap-xs">
          <span><i class="mdi mdi-18px mdi-translate"></i></span>
          <span><i class="mdi mdi-chevron-down"></i></span>
        </div>
      </div>
    </template>
    <div class="contextual-menu">
      <button
        v-for="language in languages"
        :key="language.locale"
        class="contextual-menu--entry"
        @click.stop.prevent="changeLocale(language.locale)"
      >
        <span class="contextual-menu--entry--icon">
          <i v-if="$i18n.locale === language.locale" class="mdi mdi-check"></i>
        </span>
        <span class="contextual-menu--entry--slot">{{ language.name }}</span>
      </button>
    </div>
  </DropdownVue>
</template>

<script lang="ts" src="./LanguageDropdown.component.ts"></script>
