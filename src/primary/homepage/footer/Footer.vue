<template>
  <div class="flex-container -gap-xl -justify-center -wrap-reverse">
    <!-- To be uncommented once the android app will be back
  <a href="https://play.google.com/store/apps/details?id=fr.univ_lyon1.lifemapcom&hl=en" target="_blank" rel="noopener noreferrer">
    <img class="image -h40" src="../../assets/images/playstore.png" alt="Playstore" />
  </a>
  -->
    <div class="flex-container -vertical -gap-xs">
      <div class="flex-container -gap-xs -wrap">
        <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">
          <img
            class="image"
            src="https://mirrors.creativecommons.org/presskit/buttons/80x15/png/by-nc.png"
            alt="license"
            style="width: 80px; height: 15px"
          />
        </a>
        <i18n-t keypath="license-notice" tag="div" class="text -font-xs">
          <template v-slot:author>
            <a
              class="link"
              href="https://lbbe.univ-lyon1.fr/fr/annuaires-des-membres/de-vienne-damien"
              target="_blank"
              rel="noopener noreferrer"
            >
              Damien de Vienne
            </a>
          </template>
        </i18n-t>
      </div>
      <div class="divider -fill-color-shade-85"></div>
      <i18n-t keypath="publication-notice" tag="div" class="text -font-xs">
        <template v-slot:journal>
          <i>PLOS Biology</i>
        </template>
      </i18n-t>
    </div>
  </div>
</template>
