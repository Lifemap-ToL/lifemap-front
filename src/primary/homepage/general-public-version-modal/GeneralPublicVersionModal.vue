<template>
  <VersionModalVue>
    <template #header>
      <img
        src="../../../assets/images/lifemap-general-public-logo.png"
        alt="Lifemap general public logo"
        class="lifemap-image -full-width"
      />
    </template>
    <template #illustration>
      <img
        src="../../../assets/images/lifemap-general-public-illustration.png"
        alt="Lifemap general public illustration"
        class="lifemap-image -full-width -rounded-edges"
      />
    </template>
    <template #content>
      This 'large public' tree is a reduction of the whole NCBI taxonomy. It only shows species (no strains, environmental samples,
      unidentified species, etc.). It displays a descritption and picture retrieved from Wikipedia when clicking on the tips and nodes.
    </template>
  </VersionModalVue>
</template>

<script lang="ts" src="./GeneralPublicVersionModal.component.ts"></script>
