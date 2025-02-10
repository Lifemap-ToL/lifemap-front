<template>
  <ModalVue :title="$t('credits')">
    <div class="flex-container -vertical -gap-xl">
      <div class="flex-container -vertical -gap-lg">
        <div class="flex-container -vertical -gap-sm">
          <div class="text -font-lg">{{ $t('credits-creation-title') }}</div>
          <div class="text -bold">Damien de Vienne</div>
        </div>
        <div class="flex-container -vertical -gap-sm">
          <div class="text -font-lg">{{ $t('credits-frontend-title') }}</div>
          <div class="text -bold">Joaquim Martin</div>
        </div>
        <div class="flex-container -vertical -gap-sm">
          <div class="text -font-lg">{{ $t('credits-backend-title') }}</div>
          <div class="text -bold">Julien Barnier</div>
        </div>
        <div class="flex-container -vertical -gap-sm">
          <i18n-t keypath="credits-vector-tiles-title" tag="div" class="text -font-lg">
            <template v-slot:bbox>
              <a class="link" href="https://www.bbox.earth/" target="_blank" rel="noopener noreferrer">BBox</a>
            </template>
          </i18n-t>
          <div><span class="text -bold">Simon Penel</span> et <span class="text -bold">Julien Barnier</span></div>
        </div>
        <div class="flex-container -vertical -gap-sm">
          <div class="text -font-lg">{{ $t('credits-server-title') }}</div>
          <div><span class="text -bold">Bruno Spataro</span> et <span class="text -bold">Stéphane Delmotte</span></div>
        </div>
        <i18n-t keypath="credits-notice" tag="div">
          <template v-slot:mail>
            <a class="link" href="mailto:damien.de-vienne@cnrs.fr">damien.de-vienne@cnrs.fr</a>
          </template>
        </i18n-t>
      </div>
      <div>
        <div class="flex-container -gap-xl -middle -justify-center">
          <a href="https://lbbe.univ-lyon1.fr/" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/images/LBBE.png" alt="LBBE" class="image -h60 -width-auto" />
          </a>
          <a href="https://www.cnrs.fr/" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/images/cnrs.png" alt="CNRS" class="image -h60 -width-auto" />
          </a>
          <a href="https://www.univ-lyon1.fr/" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/images/UCBL.png" alt="UCBL" class="image -h60 -width-auto" />
          </a>
          <a href="https://www.vetagro-sup.fr/" target="_blank" rel="noopener noreferrer">
            <img src="@/assets/images/vetagro.png" alt="VetAgro" class="image -h60 -width-auto" />
          </a>
        </div>
      </div>
    </div>
  </ModalVue>
</template>

<script lang="ts" src="./CreditsModal.component.ts"></script>
