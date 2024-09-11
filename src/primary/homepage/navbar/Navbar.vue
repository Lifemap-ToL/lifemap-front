<template>
  <nav class="navbar">
    <div class="navbar--menu -mobile" @click="openSidebar"><i class="mdi mdi-menu"></i></div>
    <div class="navbar--brand">
      <div class="flex-container -align-center">
        <img src="@/assets/images/logo-lifemap.png" alt="Lifemap header logo" class="image -h40 -width-auto" />
        <div class="text -font-xl">Lifemap</div>
      </div>
    </div>
    <div class="navbar--spacer"></div>
    <a
      href="https://journals.plos.org/plosbiology/article/authors?id=10.1371/journal.pbio.2001624"
      target="_blank"
      rel="noopener noreferrer"
      class="navbar--link -desktop"
    >
      {{ $t('publication') }}
    </a>
    <a
      href="https://lbbe.univ-lyon1.fr/fr/annuaires-des-membres/de-vienne-damien"
      target="_blank"
      rel="noopener noreferrer"
      class="navbar--link -desktop"
    >
      {{ $t('author') }}
    </a>
    <div class="navbar--separator -desktop"></div>
    <div class="navbar--social -desktop">
      <i class="icon -color-facebook-light -hover-color-facebook -font-xl mdi mdi-facebook"></i>
    </div>
    <div class="navbar--social -desktop">
      <i class="icon -color-twitter-light -hover-color-twitter -font-xl mdi mdi-twitter"></i>
    </div>
    <div class="navbar--social -desktop">
      <i class="icon -color-github-light -hover-color-github -clickable -font-xl mdi mdi-github"></i>
    </div>
    <div class="navbar--link">
      <LanguageDropdownVue></LanguageDropdownVue>
    </div>
  </nav>
</template>

<script lang="ts" src="./Navbar.component.ts"></script>
