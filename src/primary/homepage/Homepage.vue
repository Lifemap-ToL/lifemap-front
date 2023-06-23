<template>
  <div class="lifemap-template-standard">
    <div class="lifemap-template-standard--header">
      <nav class="lifemap-navbar">
        <div class="lifemap-navbar--brand">
          <img src="../../assets/images/logo-header.png" alt="Lifemap header logo" class="lifemap-image -h40 -width-auto" />
        </div>
        <div class="lifemap-navbar--spacer"></div>
        <div class="lifemap-navbar--link">The Author</div>
        <a
          href="https://journals.plos.org/plosbiology/article/authors?id=10.1371/journal.pbio.2001624"
          target="_blank"
          rel="noopener noreferrer"
          class="lifemap-navbar--link"
        >
          Publication
        </a>
        <div class="lifemap-navbar--separator"></div>
        <div class="lifemap-navbar--social">
          <i class="lifemap-icon -color-facebook-light -hover-color-facebook -font-xl mdi mdi-facebook"></i>
        </div>
        <div class="lifemap-navbar--social">
          <i class="lifemap-icon -color-twitter-light -hover-color-twitter -font-xl mdi mdi-twitter"></i>
        </div>
        <div class="lifemap-navbar--social">
          <i class="lifemap-icon -color-github-light -hover-color-github -clickable -font-xl mdi mdi-github"></i>
        </div>
      </nav>
    </div>
    <div class="lifemap-template-standard--content">
      <div class="lifemap-flex-container -vertical -align-center -gap-60">
        <div class="lifemap-flex-container--item">
          <div class="lifemap-flex-container -vertical -gap-16 -mv100">
            <div class="lifemap-flex-container--item">
              <div class="lifemap-flex-container -gap-16 -align-end">
                <div class="lifemap-flex-container--item">
                  <img src="../../assets/images/logo.png" alt="Lifemap logo" class="lifemap-image -h80 -width-auto" />
                </div>
                <div class="lifemap-flex-container--item">
                  <h1 class="lifemap-title -extra-large -color-main">Lifemap</h1>
                </div>
              </div>
            </div>
            <div class="lifemap-flex-container--item">
              <div class="lifemap-title -color-main">Exploring the entire tree of life</div>
            </div>
          </div>
        </div>
        <div class="lifemap-flex-container--item -stretch">
          <div class="lifemap-flex-container -equivalent -gap-24 -align-center">
            <div class="lifemap-flex-container--item">
              <div class="lifemap-block -p16 -hoverable">
                <div class="lifemap-flex-container -align-end -gap-24">
                  <div class="lifemap-flex-container--item">
                    <img
                      src="../../assets/images/lifemap-general-public-logo.png"
                      alt="Lifemap general public logo"
                      class="lifemap-image -h80 -width-auto"
                    />
                  </div>
                  <div class="lifemap-flex-container--item -expand">
                    <div class="lifemap-flex-container -vertical -justify-center -gap-12">
                      <div class="lifemap-flex-container--item -align-right">
                        <span class="lifemap-icon -color-shade-85 -hover-color-shade-75 -clickable -font-lg">
                          <i class="mdi mdi-information" @click.stop.prevent="openGeneralPPublicVersionModal"></i>
                        </span>
                      </div>
                      <div class="lifemap-flex-container--item -align-right">
                        <span class="lifemap-title -small -color-main">~800,000 species</span>
                      </div>
                      <div class="lifemap-flex-container--item -align-right">
                        <span class="lifemap-text -color-shade-50">Tree simplified from NCBI taxonomy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lifemap-flex-container--item">
              <div class="lifemap-block -p16 -hoverable">
                <div class="lifemap-flex-container -align-end -gap-24">
                  <div class="lifemap-flex-container--item">
                    <img
                      src="../../assets/images/lifemap-ncbi-logo.png"
                      alt="Lifemap general public logo"
                      class="lifemap-image -h80 -width-auto"
                    />
                  </div>
                  <div class="lifemap-flex-container--item -expand">
                    <div class="lifemap-flex-container -vertical -justify-center -gap-12">
                      <div class="lifemap-flex-container--item -align-right">
                        <span class="lifemap-icon -color-shade-85 -hover-color-shade-75 -clickable -font-lg">
                          <i class="mdi mdi-information" @click.stop.prevent="openNCBIVersionModal"></i>
                        </span>
                      </div>
                      <div class="lifemap-flex-container--item -align-right">
                        <span class="lifemap-title -small -color-main">~1.4 Million species</span>
                      </div>
                      <div class="lifemap-flex-container--item -align-right">
                        <span class="lifemap-text -color-shade-50">
                          Complete
                          <a class="lifemap-link" href="https://www.ncbi.nlm.nih.gov/taxonomy" target="_blank" rel="noopener noreferrer">
                            NCBI taxonomy
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lifemap-template-standard--footer">
      <div class="lifemap-flex-container -gap-40 -justify-center">
        <div class="lifemap-flex-container--item">
          <a href="https://play.google.com/store/apps/details?id=fr.univ_lyon1.lifemapcom&hl=en" target="_blank" rel="noopener noreferrer">
            <img class="lifemap-image -h40" src="../../assets/images/playstore.png" alt="Playstore" />
          </a>
        </div>
        <div class="lifemap-flex-container--item">
          <div class="lifemap-flex-container -vertical -gap-6">
            <div class="lifemap-flex-container--item">
              <div class="lifemap-flex-container -gap-8">
                <div class="lifemap-flex-container--item">
                  <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">
                    <img class="lifemap-image" src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png" alt="license" />
                  </a>
                </div>
                <div class="lifemap-flex-container--item lifemap-text -font-xs">
                  Lifemap by
                  <a
                    class="lifemap-link"
                    href="https://lbbe.univ-lyon1.fr/-de-Vienne-Damien-.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Damien de Vienne</a
                  >
                  / CNRS is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.
                </div>
              </div>
            </div>
            <div class="lifemap-flex-container--item"><div class="lifemap-divider -fill-color-shade-85"></div></div>
            <div class="lifemap-flex-container--item lifemap-text -font-xs">
              If you use Lifemap for your publications, please cite: de Vienne DM (2016) Lifemap: Exploring the Entire Tree of Life.
              <i>PLOS Biology</i> 14(12): e2001624. doi: 10.1371/journal.pbio.2001624.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Homepage.component.ts"></script>
