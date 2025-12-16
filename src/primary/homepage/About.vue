<template>
  <TemplateVue>
    <template #header>
      <NavbarVue></NavbarVue>
    </template>
    <template #content>
      <div class="page">
        <div class="flex-container -vertical -gap-xxl">
          <div class="flex-container -gap-xl -align-center -vertical">
            <div class="flex-container -align-end">
              <h1 class="title -extra-large -color-main">{{ $t('about.title') }}</h1>
            </div>
          </div>
          <div class="flex-container -vertical -gap-xl">
            <div class="flex-container -vertical text -font-lg">
              <h2 name="terms-of-use" class="title -large -color-main">{{ $t('about.terms-of-use.title') }}</h2>
              <h3 class="title -color-main">1. {{ $t('about.disclaimer.title') }}</h3>
              <div v-html="$t('about.disclaimer.content')"></div>
              <h3 class="title -color-main">2. {{ $t('about.subtree.title') }}</h3>
              <div v-html="$t('about.subtree.content')"></div>
              <h3 class="title -color-main">3. {{ $t('about.license.title') }}</h3>
              <div v-html="$t('about.license.content1')"></div>
              <div v-html="$t('about.license.content2')"></div>

              <h3 class="title -color-main">4. {{ $t('about.citation.title') }}</h3>
              <div v-html="$t('about.citation.content')"></div>
              <div class="block -ml24">
                <quote
                  >de Vienne DM (2016) Lifemap: Exploring the Entire Tree of Life. <em>PLOS Biology</em> 14(12): e2001624. doi:
                  10.1371/journal.pbio.2001624</quote
                >
              </div>
            </div>
            <div class="flex-container -vertical text -font-lg">
              <h2 name="data-sources" class="title -large -color-main">{{ $t('about.data-sources.title') }}</h2>
              <div v-html="$t('about.data-sources.content1')"></div>
              <div v-html="$t('about.data-sources.content2')"></div>
            </div>
            <div class="flex-container -vertical -gap-lg text -font-lg">
              <h2 name="related-work" class="title -large -color-main">{{ $t('about.related.title') }}</h2>
              <h3 class="title -color-main">{{ $t('about.related.pylifemap.title') }}</h3>
              <div v-html="$t('about.related.pylifemap.content')"></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <FooterVue></FooterVue>
    </template>
  </TemplateVue>
</template>

<script lang="ts" src="./About.component.ts"></script>
