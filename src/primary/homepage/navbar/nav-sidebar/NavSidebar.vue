<template>
  <nav class="nav-sidebar">
    <div class="nav-sidebar--brand">
      <img src="@/assets/images/logo-lifemap.png" alt="Lifemap header logo" class="nav-sidebar--brand--logo" />
      <div class="nav-sidebar--brand--title">Lifemap</div>
    </div>
    <div class="flex-container -justify-center">
      <a href="https://github.com/Lifemap-ToL/lifemap-front" target="_blank" rel="noopener noreferrer">
        <GithubIconVue></GithubIconVue>
      </a>
    </div>
    <div class="menu">
      <a
        href="https://journals.plos.org/plosbiology/article/authors?id=10.1371/journal.pbio.2001624"
        target="_blank"
        rel="noopener noreferrer"
        class="menu--item"
      >
        {{ $t('publication') }}
      </a>
      <a
        href="https://lbbe.univ-lyon1.fr/fr/annuaires-des-membres/de-vienne-damien"
        target="_blank"
        rel="noopener noreferrer"
        class="menu--item"
      >
        {{ $t('author') }}
      </a>
    </div>
  </nav>
</template>

<script lang="ts" src="./NavSidebar.component.ts"></script>
