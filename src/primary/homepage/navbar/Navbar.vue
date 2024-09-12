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
      <a href="https://x.com/lifemap_tol" target="_blank" rel="noopener noreferrer">
        <XIconVue></XIconVue>
      </a>
    </div>
    <div class="navbar--social -desktop">
      <a href="https://github.com/Lifemap-ToL/lifemap-front" target="_blank" rel="noopener noreferrer">
        <GithubIconVue></GithubIconVue>
      </a>
    </div>
    <div class="navbar--link">
      <LanguageDropdownVue></LanguageDropdownVue>
    </div>
  </nav>
</template>

<script lang="ts" src="./Navbar.component.ts"></script>
