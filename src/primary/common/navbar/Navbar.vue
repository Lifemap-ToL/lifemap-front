<template>
  <nav class="navbar">
    <div class="navbar--brand" @click.stop.prevent="$router.push('/')">
      <div class="flex-container -align-center">
        <img src="@/assets/images/logo_no_background.png" alt="Lifemap header logo" class="image -h40 -width-auto" />
        <div class="text -font-xl">Lifemap</div>
      </div>
    </div>
    <div class="navbar--spacer"></div>
    <slot></slot>
    <div class="navbar--link">
      <DropdownVue :bus="languageDropdownBus" right shrink>
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
    </div>
  </nav>
</template>

<script lang="ts" src="./Navbar.component.ts"></script>
