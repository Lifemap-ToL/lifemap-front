<template>
  <ModalVue :title="$t('help')">
    <div class="flex-container -vertical -gap-lg">
      <div class="flex-container -align-center">
        <i class="mdi mdi-24px mdi-help-circle"></i>
        <p class="paragraph">
          <template v-if="state === 'SUCCESS' || state === 'ERROR'">
            <span class="text -bold">Lifemap</span> is an interactive tool to explore the tree of life. The concept used in
            <span class="text -bold">Lifemap</span> is similar to the one used in cartography with tools like Google Maps© or Open Street
            Maps: exploring is done by zooming and panning.
          </template>
        </p>
      </div>
      <template v-if="state === 'SUCCESS'">
        <div class="flex-container -align-center">
          <i class="mdi mdi-24px mdi-information"></i>
          <p class="paragraph">
            The current tree contains {{ treeSummary.species.total.toHuman() }} species:
            {{ treeSummary.species.archaea.toHuman() }} Archaea, {{ treeSummary.species.bacteria.toHuman() }} Bacteria and
            {{ treeSummary.species.eukaryotes.toHuman() }} Eukaryotes. It is based on the taxonomy published by the NCBI and updated
            regularly.
          </p>
        </div>
      </template>
      <div class="flex-container -align-center">
        <i class="mdi mdi-24px mdi-cursor-pointer"></i>
        <p class="paragraph">
          <template v-if="state === 'SUCCESS' || state === 'ERROR'">
            All the nodes in the tree are clickable. It displays information (description and picture) concerning the taxa (retrieved from
            the Wikipedia page, if any). If you have description or pictures you would like to see in Lifemap, simply create or update the
            corresponding Wikipedia page.
          </template>
        </p>
      </div>
      <div class="flex-container -align-center">
        <i class="mdi mdi-24px mdi-map-marker-path"></i>
        <p class="paragraph">
          <template v-if="state === 'SUCCESS' || state === 'ERROR'">
            Itineraries between taxa can be computed by clicking on the icon <i class="mdi mdi-map-marker-path"></i>. When filling the two
            new search fields, the route is drawn between the taxa and the Most Recent Common Ancestor (MRCA) of the two groups/species is
            returned. The user gets also access to a list of all the nodes that are encountered in the way from one group to the other. This
            list is clickable.
          </template>
        </p>
      </div>
      <div class="flex-container -align-center">
        <i class="mdi mdi-24px mdi-account-circle"></i>
        <p class="paragraph">
          <template v-if="state === 'SUCCESS' || state === 'ERROR'">
            Lifemap was written by Damien M. de Vienne (web page), a CNRS researcher working in the Laboratory of Biometry and Evolutionary
            Biology (LBBE) in Lyon (France) with support from the informatics departement (especially Stephane Delmotte and Bruno Spataro).
          </template>
        </p>
      </div>
    </div>
  </ModalVue>
</template>

<script lang="ts" src="./HelpModal.component.ts"></script>
