<template>
  <div class="tooltip flex-container -vertical -gap-xs">
    <span class="text" :class="{ '-bold': taxonSequencedGenomes }">{{ taxonName }}</span>
    <span v-if="taxonSequencedGenomes" class="text -font-xs"
      ><span class="text -bold">{{ taxonSequencedGenomes }}</span> sequenced genomes</span
    >
  </div>
</template>

<script lang="ts" src="./TaxonTooltip.component.ts"></script>
