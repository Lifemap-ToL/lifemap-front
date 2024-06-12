<template>
  <TemplateVue>
    <template #header>
      <NavbarVue>
        <NavbarLinkVue>{{ $t('author') }}</NavbarLinkVue>
        <NavbarLinkVue>
          <a
            href="https://journals.plos.org/plosbiology/article/authors?id=10.1371/journal.pbio.2001624"
            target="_blank"
            rel="noopener noreferrer"
            class="navbar--link"
          >
            {{ $t('publication') }}
          </a>
        </NavbarLinkVue>
        <NavbarSeparatorVue></NavbarSeparatorVue>
        <NavbarSocialVue>
          <i class="icon -color-facebook-light -hover-color-facebook -font-xl mdi mdi-facebook"></i>
        </NavbarSocialVue>
        <NavbarSocialVue>
          <i class="icon -color-twitter-light -hover-color-twitter -font-xl mdi mdi-twitter"></i>
        </NavbarSocialVue>
        <NavbarSocialVue>
          <i class="icon -color-github-light -hover-color-github -clickable -font-xl mdi mdi-github"></i>
        </NavbarSocialVue>
      </NavbarVue>
    </template>
    <template #content>
      <div class="flex-container -vertical -align-center -gap-xxl">
        <div class="flex-container -gap-xl -align-center -vertical block -mv100">
          <div class="flex-container -align-end">
            <img src="../../assets/images/logo_no_background.png" alt="Lifemap logo" class="image -h80 -width-auto" />
            <h1 class="title -extra-large -color-main">Lifemap</h1>
          </div>
          <div class="title -large -color-main">{{ $t('lifemap-baseline') }}</div>
          <hr class="separator" />
          <i18n-t keypath="ncbi-taxonomy-statement" tag="div" class="title -extra-small">
            <template v-slot:ncbiTaxonomy>
              <a place="ncbiTaxonomy" class="link" href="https://www.ncbi.nlm.nih.gov/taxonomy" target="_blank" rel="noopener noreferrer">
                {{ $t('ncbi-taxonomy') }}
              </a>
            </template>
          </i18n-t>
        </div>
        <div>
          <button class="button -extra-large -main" @click.stop.prevent="$router.push('/tree')">{{ $t('start-exploring') }}</button>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex-container -gap-xl -justify-center">
        <a href="https://play.google.com/store/apps/details?id=fr.univ_lyon1.lifemapcom&hl=en" target="_blank" rel="noopener noreferrer">
          <img class="image -h40" src="../../assets/images/playstore.png" alt="Playstore" />
        </a>
        <div class="flex-container -vertical -gap-xs">
          <div class="flex-container -gap-xs">
            <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">
              <img class="image" src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png" alt="license" />
            </a>
            <i18n-t keypath="license-notice" tag="div" class="text -font-xs">
              <template v-slot:author>
                <a class="link" href="https://lbbe.univ-lyon1.fr/-de-Vienne-Damien-.html" target="_blank" rel="noopener noreferrer">
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
  </TemplateVue>
</template>

<script lang="ts" src="./Homepage.component.ts"></script>
