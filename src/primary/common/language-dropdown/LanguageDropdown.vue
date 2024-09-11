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
      <button class="contextual-menu--entry" @click.prevent.stop="changeLocale('fr')">
        <span class="contextual-menu--entry--icon"><i v-if="$i18n.locale === 'fr'" class="mdi mdi-check"></i></span>
        <span class="contextual-menu--entry--slot">{{ $t('french') }}</span>
      </button>
      <button class="contextual-menu--entry" @click.prevent.stop="changeLocale('en')">
        <span class="contextual-menu--entry--icon"><i v-if="$i18n.locale === 'en'" class="mdi mdi-check"></i></span>
        <span class="contextual-menu--entry--slot">{{ $t('english') }}</span>
      </button>
    </div>
  </DropdownVue>
</template>

<script lang="ts" src="./LanguageDropdown.component.ts"></script>
