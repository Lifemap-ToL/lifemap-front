<template>
  <nav class="navbar">
    <div class="navbar--brand" @click.stop.prevent="goHome">
      <div class="flex-container -align-center">
        <img src="@/assets/images/logo-lifemap.png" alt="Lifemap header logo" class="image -h40 -width-auto" />
        <div class="text -font-xl">Lifemap</div>
      </div>
    </div>
    <div class="navbar--spacer"></div>
    <div class="navbar--link" @click.stop.prevent="openHelpModal">
      <div class="flex-container -align-baseline -gap-xs">
        <span>{{ $t('help') }}</span>
        <span><i class="mdi mdi-help"></i></span>
      </div>
    </div>
    <div class="navbar--link">
      <LanguageDropdownVue></LanguageDropdownVue>
    </div>
  </nav>
</template>

<script lang="ts" src="./Navbar.component.ts"></script>
