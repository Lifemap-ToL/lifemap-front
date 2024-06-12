<template>
  <VersionModalVue>
    <template #header>
      <img src="../../../assets/images/lifemap-ncbi-logo.png" alt="Lifemap NCBI logo" class="image -full-width" />
    </template>
    <template #illustration>
      <img
        src="../../../assets/images/lifemap-ncbi-illustration.png"
        alt="Lifemap NCBI illustration"
        class="image -full-width -rounded-edges"
      />
    </template>
    <template #content>
      The
      <a href="https://www.ncbi.nlm.nih.gov/taxonomy" target="_blank" rel="noopener noreferrer" class="link">NCBI taxonomic tree</a>
      represents the relationships between all species/strains that have at least one sequence in the NCBI/Entrez database. It is curated
      and validated by expert taxonomists and is updated regularly.
    </template>
  </VersionModalVue>
</template>

<script lang="ts" src="./NCBIVersionModal.component.ts"></script>
